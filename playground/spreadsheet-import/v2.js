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
var SEL_ROW = ["sheetData", "row"];
var SEL_SHEET = ["sheets", "sheet"];

function readWorkbook(zip, spreadsheet) {
    var strings = readStrings(zip), index = 0;
    var relationships = readRelationships(zip, "workbook.xml");
    var styles = readStyles(zip);
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
                    readSheet(zip, file, sheet, strings, styles);
                }, { recalc: true });
            }
        }
    });
    console.timeEnd("read");
}

function readSheet(zip, file, sheet, strings, styles) {
    var ref, type, value, formula, formulaRange, styleIndex;
    parse(zip, "xl/" + file, {
        enter: function(tag, attrs) {
            if (this.is(SEL_CELL)) {
                value = null;
                formula = null;
                formulaRange = null;
                styleIndex = attrs.s;
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
            else if (this.is(SEL_COL)) {
                var start = integer(attrs.min) - 1;
                var stop = integer(attrs.max) - 1;

                // XXX: magic numbers below.
                var maximumDigitWidth = 7; // for example.
                var width = parseFloat(attrs.width);

                // the formula below is taken from the OOXML spec.
                // why not complicate things if it's possible, right?
                width = Math.floor((256 * width + Math.floor(128 / maximumDigitWidth)) / 256) * maximumDigitWidth;

                sheet._columns.values.value(start, stop, width);
            }
            else if (this.is(SEL_ROW)) {
                if (attrs.ht) {
                    var height = parseFloat(attrs.ht);
                    height *= 1.5625; // XXX: totally unscientific conversion of points into pixels
                    var row = integer(attrs.r) - 1;
                    sheet._rows.values.value(row, row, height);
                }
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
                        if (type != null) {
                            if (type == "n") {
                                value = parseFloat(value);
                            } else if (type == "b") {
                                value = new Boolean(value).valueOf();
                            } else if (type == "s") {
                                value = strings[integer(value)];
                            }
                            range.value(value);
                        } else {
                            range.input(value);
                        }
                    }
                }
                if (styleIndex != null) {
                    applyStyle(sheet, ref, styles, styleIndex);
                }
            }
        },
        text: function(text) {
            var attrs;
            if (this.is(SEL_VALUE)) {
                value = text;
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

var BORDER_WIDTHS = {
    none             : 0,
    thin             : 1,
    medium           : 2,
    dashed           : 1,
    dotted           : 1,
    thick            : 3,
    double           : 3,
    hair             : 1,
    mediumDashed     : 2,
    dashDot          : 1,
    mediumDashDot    : 2,
    dashDotDot       : 1,
    mediumDashDotDot : 2,
    slantDashDot     : 1
};

var DEFAULT_FORMATS = {
    0  : "General",
    1  : "0",
    2  : "0.00",
    3  : "#,##0",
    4  : "#,##0.00",
    9  : "0%",
    10 : "0.00%",
    11 : "0.00E+00",
    12 : "# ?/?",
    13 : "# ??/??",
    14 : "mm-dd-yy",
    15 : "d-mmm-yy",
    16 : "d-mmm",
    17 : "mmm-yy",
    18 : "h:mm AM/PM",
    19 : "h:mm:ss AM/PM",
    20 : "h:mm",
    21 : "h:mm:ss",
    22 : "m/d/yy h:mm",
    37 : "#,##0 ;(#,##0)",
    38 : "#,##0 ;[Red](#,##0)",
    39 : "#,##0.00;(#,##0.00)",
    40 : "#,##0.00;[Red](#,##0.00)",
    45 : "mm:ss",
    46 : "[h]:mm:ss",
    47 : "mmss.0",
    48 : "##0.0E+0",
    49 : "@"
};

function applyStyle(sheet, ref, styles, styleIndex) {
    var range = sheet.range(ref);
    var xf = styles.inlineStyles[styleIndex], base, value;
    if (xf.xfId) {
        base = styles.namedStyles[xf.xfId];
    }
    if (shouldSet("applyBorder", "borderId")) {
        setBorder(styles.borders[value]);
    }
    if (shouldSet("applyFont", "fontId")) {
        setFont(styles.fonts[value]);
    }
    if (shouldSet("applyAlignment", "textAlign")) {
        range.textAlign(value);
    }
    if (shouldSet("applyAlignment", "verticalAlign")) {
        range.verticalAlign(value);
    }
    if (shouldSet("applyAlignment", "wrapText")) {
        // don't use range.wrap to avoid recomputing row height
        range._property("wrap", value);
    }
    if (shouldSet("applyFill", "fillId")) {
        setFill(styles.fills[value]);
    }
    if (shouldSet("applyNumberFormat", "numFmtId")) {
        setFormat(styles.numFmts[value] || DEFAULT_FORMATS[value]);
    }
    function setFormat(f) {
        var format = typeof f == "string" ? f : f.formatCode;
        if (format != null && !/^general$/i.test(format)) {
            // XXX: drop locale info.
            // http://stackoverflow.com/questions/894805/excel-number-format-what-is-409
            // not supported by the formatting library.
            format = format.replace(/^\[\$-[0-9]+\]/, "");
            range.format(format);
        }
    }
    function setFill(f) {
        if (f.type == "solid") {
            range.background(f.fgColor+"");
        }
    }
    function setFont(f) {
        range.fontFamily(f.name);
        //range.fontSize(f.size); //XXX: will recalc row height.
        range._property("fontSize", f.size);
    }
    function setBorder(b) {
        function border(side) {
            var width = BORDER_WIDTHS[side.style];
            if (width == null) {
                width = 1;
            }
            var color = side.color;
            if (color == null) {
                color = "#000";
            }
            return { size: width, color: color+"" };
        }
        if (b.left) {
            range.borderLeft(border(b.left));
        }
        if (b.top) {
            range.borderTop(border(b.top));
        }
        if (b.right) {
            range.borderRight(border(b.right));
        }
        if (b.bottom) {
            range.borderBottom(border(b.bottom));
        }
    }
    function shouldSet(applyName, propName) {
        var t = xf[applyName];
        if (t != null && !t) {
            return false;
        }
        value = xf[propName];
        if (base && value == null) {
            t = base[applyName];
            if (t != null && !t) {
                return false;
            }
            value = base[propName];
        }
        return value != null;
    }
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

var SEL_FONT = ["fonts", "font"];
var SEL_FILL = ["fills", "fill"];
var SEL_BORDER = ["borders", "border"];
var SEL_INDEXED_COLOR = ["colors", "indexedColors", "rgbColor"];
var SEL_NAMED_STYLE = ["cellStyleXfs", "xf"];
var SEL_INLINE_STYLE = ["cellXfs", "xf"];
var SEL_NUM_FMT = ["numFmts", "numFmt"];
function readStyles(zip) {
    var styles = {
        fonts        : [],
        numFmts      : {},
        fills        : [],
        borders      : [],
        colors       : [],
        namedStyles  : [],
        inlineStyles : []
    };
    var font = null;
    var fill = null;
    var border = null;
    var xf = null;
    parse(zip, "xl/styles.xml", {
        enter: function(tag, attrs, closed) {
            if (this.is(SEL_INDEXED_COLOR)) {
                styles.colors.push(toCSSColor(attrs.rgb));
            }
            else if (this.is(SEL_NUM_FMT)) {
                styles.numFmts[attrs.numFmtId] = attrs;
            }
            else if (this.is(SEL_FONT)) {
                styles.fonts.push(font = {});
            } else if (font) {
                if (tag == "sz") {
                    font.size = parseFloat(attrs.val);
                } else if (tag == "name") {
                    font.name = attrs.val;
                }
            }
            else if (this.is(SEL_FILL)) {
                styles.fills.push(fill = {});
            } else if (fill) {
                if (tag == "patternFill") {
                    fill.type = attrs.patternType;
                } else if (tag == "fgColor" || tag == "bgColor") {
                    fill[tag] = getColor(attrs);
                }
            }
            else if (this.is(SEL_BORDER)) {
                styles.borders.push(border = {});
            } else if (border) {
                if (/^(?:left|top|right|bottom)$/.test(tag) && attrs.style) {
                    border[tag] = { style: attrs.style };
                }
                if (tag == "color") {
                    var side = this.stack[this.stack.length - 2].$tag;
                    border[side].color = getColor(attrs);
                }
            }
            else if (this.is(SEL_NAMED_STYLE)) {
                xf = getXf(attrs);
                styles.namedStyles.push(xf);
                if (closed) {
                    xf = null;
                }
            } else if (this.is(SEL_INLINE_STYLE)) {
                xf = getXf(attrs);
                styles.inlineStyles.push(getXf(attrs));
                if (closed) {
                    xf = null;
                }
            } else if (xf) {
                if (tag == "alignment") {
                    if (/^(?:left|center|right|justify)$/.test(attrs.horizontal)) {
                        xf.textAlign = attrs.horizontal;
                    }
                    if (/^(?:top|center|bottom)$/.test(attrs.vertical)) {
                        xf.verticalAlign = attrs.vertical;
                    }
                    if (xf.wrapText != null) {
                        xf.wrapText = bool(xf.wrapText);
                    }
                }
            }
        },
        leave: function(tag, attrs) {
            if (this.is(SEL_FONT)) {
                font = null;
            } else if (this.is(SEL_FILL)) {
                fill = null;
            } else if (this.is(SEL_BORDER)) {
                border = null;
            } else if (tag == "xf") {
                xf = null;
            }
        }
    });

    function getXf(attrs) {
        var xf = {
            borderId          : integer(attrs.borderId),
            fillId            : integer(attrs.fillId),
            fontId            : integer(attrs.fontId),
            numFmtId          : integer(attrs.numFmtId),
            pivotButton       : bool(attrs.pivotButton),
            quotePrefix       : bool(attrs.quotePrefix),
            xfId              : integer(attrs.xfId)
        };
        addBool("applyAlignment");
        addBool("applyBorder");
        addBool("applyFill");
        addBool("applyFont");
        addBool("applyNumberFormat");
        addBool("applyProtection");
        function addBool(name) {
            if (attrs[name] != null) {
                xf[name] = bool(attrs[name]);
            }
        }
        return xf;
    }

    function toCSSColor(rgb) {
        var m = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(rgb);
        return "rgba(" +
            parseInt(m[2], 16) + ", " +
            parseInt(m[3], 16) + ", " +
            parseInt(m[4], 16) + ", " +
            parseInt(m[1], 16) / 255 + ")";
    }

    function getColor(attrs) {
        if (attrs.rgb) {
            return toCSSColor(attrs.rgb);
        } else if (attrs.indexed) {
            return new Color(attrs.indexed);
        }
    }

    function Color(index) {
        this.index = index;
    }
    Color.prototype.toString = Color.prototype.valueOf = function() {
        return styles.colors[this.index];
    };

    return styles;
}

function integer(val) {
    return val == null ? null : parseInt(val, 10);
}

function bool(val) {
    return val == "true" || val == true || val == 1;
}
