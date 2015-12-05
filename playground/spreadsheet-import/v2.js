"use strict";

var S = $("#spreadsheet").kendoSpreadsheet({
    rows: 1000,
    columns: 1000
}).data("kendoSpreadsheet");

$("#file").on("change", function(e) {
    var file = e.target.files[0];
    e.target.parentNode.reset();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    spreadsheet.fromJSON({ sheets: [] });
    kendo.ooxml.importFile(file, {
        sheet: function(sheet) {
            var worksheet;
            if (sheet.index === 0) {
                worksheet = spreadsheet.sheetByIndex(0);
            } else {
                worksheet = spreadsheet.insertSheet();

                // XXX: ?
                // spreadsheet.sheetByIndex(sheet.index - 1)
                //     .suspendChanges(false)
                //     .triggerChange();
            }

            worksheet.name(sheet.name);
            worksheet.triggerChange();
            // worksheet.suspendChanges(true);
            return worksheet;
        }
    });
});

kendo.ooxml.importFile = function(file, visitors) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var zip = new JSZip(e.target.result);
        readWorkbook(zip, visitors);
    };
    reader.readAsArrayBuffer(file);
};

function readWorkbook(zip, visitors) {
    var strings = readStrings(zip), i = 0;
    console.time("read");
    parse(zip, "xl/workbook.xml", {
        enter: function(tag, attrs) {
            if (tag == "sheet") {
                var id = parseInt( attrs["r:id"].replace("rId", ""), 10 );
                var name = attrs.name;
                var sheet = { name: name, index: i++ };
                sheet = visitors.sheet(sheet);
                sheet.batch(function(){
                    readSheet(zip, id, sheet, strings, visitors);
                }, { recalc: true });
            }
        }
    });
    console.timeEnd("read");
}

var SEL_CELL = ["sheetData", "row", "c"];
var SEL_VALUE = ["sheetData", "row", "c", "v"];
var SEL_FORMULA = ["sheetData", "row", "c", "f"];
var SEL_MERGE = ["mergeCells", "mergeCell"];
var SEL_TEXT = ["t"];

// <XXX optimize calc.parseReference for the simplest case — A1>

function getcol(str) {
    str = str.toUpperCase();
    for (var col = 0, i = 0; i < str.length; ++i) {
        col = col * 26 + str.charCodeAt(i) - 64;
    }
    return col - 1;
}

function parseRef(str) {
    var m = /^([a-z]+)([0-9]+)$/i.exec(str);
    return {
        row: parseInt(m[2], 10) - 1,
        col: getcol(m[1])
    };
}

// </XXX>

function readSheet(zip, id, sheet, strings, visitors) {
    var ref, type, value, formula, formulaRange;
    parse(zip, "xl/worksheets/sheet" + id + ".xml", {
        enter: function(tag, attrs) {
            if (this.is(SEL_CELL)) {
                value = null;
                formula = null;
                formulaRange = null;
                ref = parseRef(attrs.r);

                // XXX: can't find no type actually, so everything is
                // interpreted as string.  Additionally, cells having
                // a formula will contain both <f> and <v> nodes,
                // which makes the value take precedence because it's
                // the second node; hence, the hack is to keep note of
                // them in the `text` handler, and apply the
                // appropriate one in the `leave` handler below.
                type = attrs.t;
            }
            else if (this.is(SEL_MERGE)) {
                sheet.range(attrs.ref).merge();
            }
        },
        leave: function(tag) {
            if (this.is(SEL_CELL)) {
                if (formula != null) {
                    try {
                        if (formulaRange != null) {
                            sheet.range(formulaRange)
                                .formula(formula)
                                .background("#c0ffee"); // XXX
                        } else {
                            sheet.range(ref.row, ref.col)
                                .formula(formula)
                                .background("#c0ffee"); // XXX
                        }
                    } catch(ex) {
                        // console.error(text);
                    }
                } else if (value != null) {
                    // XXX because "shared" formulas might have been
                    // already set on this cell, we need to check
                    // whether the formula is present before applying
                    // the value.  This is ruining a dozen
                    // micro-optimizations I've made. ;-\
                    if (!sheet.range(ref.row, ref.col).formula()) {
                        sheet.range(ref.row, ref.col).value(value);
                    }
                }
            }
        },
        text: function(text) {
            var attrs;
            if (this.is(SEL_VALUE)) {
                value = text;
                if (type == "n") {
                    value = parseFloat(text);
                } else if (type == "b") {
                    value = new Boolean(text);
                } else if (type == "s") {
                    value = strings[parseInt(text, 10)];
                }
            }
            else if ((attrs = this.is(SEL_FORMULA))) {
                formula = text;
                if (attrs.t == "shared") {
                    formulaRange = attrs.ref;
                }
            }
        }
    });
}

function parse(zip, file, callbacks) {
    XML.parse(zip.files[file].asUint8Array(), callbacks);
}

function readStrings(zip) {
    console.time("readStrings");
    var strings = [];
    parse(zip, "xl/sharedStrings.xml", {
        text: function(text) {
            if (this.is(SEL_TEXT)) {
                strings.push(text);
            }
        }
    });
    console.timeEnd("readStrings");
    return strings;
}
