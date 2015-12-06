"use strict";

var S = $("#spreadsheet").kendoSpreadsheet({
    rows: 1000,
    columns: 1000
}).data("kendoSpreadsheet");

$("#file").on("change", function(e) {
    var file = e.target.files[0];
    e.target.parentNode.reset();

    var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
    kendo.ooxml.importFile(file, spreadsheet);
});

kendo.ooxml.importFile = function(file, spreadsheet) {
    spreadsheet.fromJSON({ sheets: [] });
    var reader = new FileReader();
    reader.onload = function(e) {
        var zip = new JSZip(e.target.result);
        readWorkbook(zip, spreadsheet);
    };
    reader.readAsArrayBuffer(file);
};

var SEL_CELL = ["sheetData", "row", "c"];
var SEL_VALUE = ["sheetData", "row", "c", "v"];
var SEL_FORMULA = ["sheetData", "row", "c", "f"];
var SEL_MERGE = ["mergeCells", "mergeCell"];
var SEL_TEXT = ["t"];
var SEL_COL = ["cols", "col"];
var SEL_ROW = ["rows", "row"];
var SEL_SHEET = ["sheets", "sheet"];

function readWorkbook(zip, spreadsheet) {
    var strings = readStrings(zip), index = 0;
    var relationships = readRelationships(zip, "workbook.xml");
    console.time("read");
    parse(zip, "xl/workbook.xml", {
        enter: function(tag, attrs) {
            if (this.is(SEL_SHEET)) {
                var relId = attrs["r:id"];
                var file = relationships[relId];
                var name = attrs.name;
                var sheet = spreadsheet.sheetByIndex(index++) ||
                    spreadsheet.insertSheet();
                sheet.batch(function(){
                    sheet.name(name);
                    readSheet(zip, file, sheet, strings);
                }, { recalc: true });
            }
            else if (this.is(SEL_COL)) {
                var start = parseInt(attr.min, 10) - 1;
                var stop = parseInt(attr.max, 10) - 1;
                // XXX: magic numbers below.  The spec is from another planet.
                var width = parseInt(attr.width, 10) * 9;
                sheet._columns.values.value(start, stop, width);
            }
            else if (this.is(SEL_ROW)) {
                var start = parseInt(attr.min, 10) - 1;
                var stop = parseInt(attr.max, 10) - 1;
                // XXX: magic numbers below.  The spec is from another planet.
                var height = parseInt(attr.height, 10) * 9;
                sheet._rows.values.value(start, stop, height);
            }
        }
    });
    console.timeEnd("read");
}

function readSheet(zip, file, sheet, strings) {
    var ref, type, value, formula, formulaRange;
    parse(zip, "xl/" + file, {
        enter: function(tag, attrs) {
            if (this.is(SEL_CELL)) {
                value = null;
                formula = null;
                formulaRange = null;
                ref = attrs.r;

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
                        sheet.range(formulaRange || ref).formula(formula);
                    } catch(ex) {
                        sheet.range(formulaRange || ref).value(formula)
                            .background("#ffaaaa");
                        // console.error(text);
                    }
                } else if (value != null) {
                    // XXX because "shared" formulas might have been
                    // already set on this cell, we need to check
                    // whether the formula is present before applying
                    // the value.  This is ruining a dozen
                    // micro-optimizations I've made. ;-\
                    var range = sheet.range(ref);
                    if (!range.formula()) {
                        range.value(value);
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
    console.log(file);
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

function readRelationships(zip, file) {
    var map = {};
    parse(zip, "xl/_rels/" + file + ".rels", {
        enter: function(tag, attrs) {
            if (tag == "Relationship") {
                map[attrs.Id] = attrs.Target;
            }
        }
    });
    return map;
}
