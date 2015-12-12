(function(f, define){
    define([ "../kendo.core", "../kendo.color", "../util/parse-xml" ], f);
})(function(){
    "use strict";

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    /* global JSZip */

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true */
    /* jshint latedef: nofunc */

    var parseXML = kendo.util.parseXML;

    var SEL_CELL = ["sheetData", "row", "c"];
    var SEL_VALUE = ["sheetData", "row", "c", "v"];
    var SEL_FORMULA = ["sheetData", "row", "c", "f"];
    var SEL_STRING = ["sheetData", "row", "c", "is"];
    var SEL_MERGE = ["mergeCells", "mergeCell"];
    var SEL_TEXT = ["t"];
    var SEL_COL = ["cols", "col"];
    var SEL_ROW = ["sheetData", "row"];
    var SEL_SHEET = ["sheets", "sheet"];
    var SEL_DEFINED_NAME = ["definedNames", "definedName"];

    function readExcel(file, workbook, complete) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var zip = new JSZip(e.target.result);
            readWorkbook(zip, workbook);

            if (complete) {
                complete({
                    activeSheet: 0
                });
            }
        };

        reader.readAsArrayBuffer(file);
    }

    function readWorkbook(zip, workbook) {
        var strings = readStrings(zip);
        var relationships = readRelationships(zip, "workbook.xml");
        var theme = readTheme(zip, relationships.byType.theme);
        var styles = readStyles(zip, theme);
        parse(zip, "xl/workbook.xml", {
            enter: function(tag, attrs) {
                if (this.is(SEL_SHEET)) {
                    var relId = attrs["r:id"];
                    var file = relationships.byId[relId];
                    var name = attrs.name;
                    var sheet = workbook.insertSheet();
                    sheet.batch(function(){
                        sheet.name(name);
                        readSheet(zip, file, sheet, strings, styles);
                    }, { recalc: true });
                }
            },
            text: function(text) {
                var attrs = this.is(SEL_DEFINED_NAME);
                if (attrs && !(bool(attrs["function"]) || bool(attrs.vbProcedure))) {
                    var ref = kendo.spreadsheet.calc.parseReference(text);
                    workbook.defineName(attrs.name, ref, bool(attrs.hidden));
                }
            }
        });
    }

    function readSheet(zip, file, sheet, strings, styles) {
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

                    var styleIndex = attrs.s;
                    if (styleIndex != null) {
                        applyStyle(sheet, ref, styles, styleIndex);
                    }
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

                    sheet._columns.values.value(start, stop, width|0);

                    if (attrs.hidden === "1") {
                        for (var ci = start; ci <= stop; ci++) {
                            sheet.hideColumn(ci);
                        }
                    }
                }
                else if (this.is(SEL_ROW)) {
                    var row = integer(attrs.r) - 1;

                    if (attrs.ht) {
                        var height = parseFloat(attrs.ht);
                        height *= 1.5625; // XXX: totally unscientific conversion of points into pixels
                        sheet._rows.values.value(row, row, height|0);
                    }

                    if (attrs.hidden === "1") {
                        sheet.hideRow(row);
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
                        var range = sheet.range(ref);

                        if (type == "str") {
                            range.formula(value);
                        } else if (!range.formula()) {
                            // Check for "shared" formulas before applying a value.
                            if (!type || type == "n") {
                                value = parseFloat(value);
                            } else if (type == "s") {
                                value = strings[integer(value)];
                            } else if (type == "b") {
                                value = value === "1";
                            } else if (type == "d") {
                                value = kendo.parseDate(value);
                            }

                            range.value(value);
                        }
                    }
                } else if (tag == "cols") {
                    sheet._columns._refresh();
                } else if (tag == "sheetData") {
                    sheet._rows._refresh();
                }
            },
            text: function(text) {
                var attrs;
                if (this.is(SEL_VALUE) || this.is(SEL_STRING)) {
                    value = text;
                } else if ((attrs = this.is(SEL_FORMULA))) {
                    formula = text;
                    if (attrs.t == "shared") {
                        formulaRange = attrs.ref;
                    }
                }
            }
        });
    }

    var BORDER_WIDTHS = {
        "none"            : 0,
        "thin"            : 1,
        "medium"          : 2,
        "dashed"          : 1,
        "dotted"          : 1,
        "thick"           : 3,
        "double"          : 3,
        "hair"            : 1,
        "mediumDashed"    : 2,
        "dashDot"         : 1,
        "mediumDashDot"   : 2,
        "dashDotDot"      : 1,
        "mediumDashDotDot": 2,
        "slantDashDot"    : 1
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

    var GENERAL_REGEX = /^general$/i;
    var LOCALE_REGEX = /^\[\$-[0-9]+\]/;
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
            if (format != null && !GENERAL_REGEX.test(format)) {
                // XXX: drop locale info.
                // http://stackoverflow.com/questions/894805/excel-number-format-what-is-409
                // not supported by the formatting library.
                format = format.replace(LOCALE_REGEX, "");
                range.format(format);
            }
        }

        function setFill(f) {
            if (f.type == "solid") {
                range.background(f.color);
            }
        }

        function setFont(f) {
            range.fontFamily(f.name);
            //range.fontSize(f.size); //XXX: will recalc row height.
            range._property("fontSize", f.size);
            if (f.bold) {
                range.bold(true);
            }
            if (f.italic) {
                range.italic(true);
            }
        }

        function setBorder(b) {
            function set(side, prop) {
                var border = b[side];
                if (!border) {
                    return;
                }

                var width = BORDER_WIDTHS[border.style];
                if (width === 0) {
                    return;
                }

                var color = border.color;
                if (color == null) {
                    color = "#000";
                }

                range._property(prop, { size: width, color: color });
            }

            set("left", "borderLeft");
            set("top", "borderTop");
            set("right", "borderRight");
            set("bottom", "borderBottom");
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
        var part = zip.files[file];
        if (part) {
            parseXML(part.asUint8Array(), callbacks);
        }
    }

    function readStrings(zip) {
        var strings = [];
        parse(zip, "xl/sharedStrings.xml", {
            text: function(text) {
                if (this.is(SEL_TEXT)) {
                    strings.push(text);
                }
            }
        });
        return strings;
    }

    function readRelationships(zip, file) {
        var map = { byId: {}, byType: {} };
        parse(zip, "xl/_rels/" + file + ".rels", {
            enter: function(tag, attrs) {
                if (tag == "Relationship") {
                    map.byId[attrs.Id] = attrs.Target;
                    map.byType[attrs.Type.match(/\w+$/)[0]] = attrs.Target;
                }
            }
        });
        return map;
    }

    var SEL_FONT = ["fonts", "font"];
    var SEL_FILL = ["fills", "fill"];
    var SEL_BORDER = ["borders", "border"];
    var SEL_NAMED_STYLE = ["cellStyleXfs", "xf"];
    var SEL_INLINE_STYLE = ["cellXfs", "xf"];
    var SEL_NUM_FMT = ["numFmts", "numFmt"];
    var INDEXED_COLORS = [
        toCSSColor("FF000000"),
        toCSSColor("FFFFFFFF"),
        toCSSColor("FFFF0000"),
        toCSSColor("FF00FF00"),
        toCSSColor("FF0000FF"),
        toCSSColor("FFFFFF00"),
        toCSSColor("FFFF00FF"),
        toCSSColor("FF00FFFF"),
        toCSSColor("FF000000"),
        toCSSColor("FFFFFFFF"),
        toCSSColor("FFFF0000"),
        toCSSColor("FF00FF00"),
        toCSSColor("FF0000FF"),
        toCSSColor("FFFFFF00"),
        toCSSColor("FFFF00FF"),
        toCSSColor("FF00FFFF"),
        toCSSColor("FF800000"),
        toCSSColor("FF008000"),
        toCSSColor("FF000080"),
        toCSSColor("FF808000"),
        toCSSColor("FF800080"),
        toCSSColor("FF008080"),
        toCSSColor("FFC0C0C0"),
        toCSSColor("FF808080"),
        toCSSColor("FF9999FF"),
        toCSSColor("FF993366"),
        toCSSColor("FFFFFFCC"),
        toCSSColor("FFCCFFFF"),
        toCSSColor("FF660066"),
        toCSSColor("FFFF8080"),
        toCSSColor("FF0066CC"),
        toCSSColor("FFCCCCFF"),
        toCSSColor("FF000080"),
        toCSSColor("FFFF00FF"),
        toCSSColor("FFFFFF00"),
        toCSSColor("FF00FFFF"),
        toCSSColor("FF800080"),
        toCSSColor("FF800000"),
        toCSSColor("FF008080"),
        toCSSColor("FF0000FF"),
        toCSSColor("FF00CCFF"),
        toCSSColor("FFCCFFFF"),
        toCSSColor("FFCCFFCC"),
        toCSSColor("FFFFFF99"),
        toCSSColor("FF99CCFF"),
        toCSSColor("FFFF99CC"),
        toCSSColor("FFCC99FF"),
        toCSSColor("FFFFCC99"),
        toCSSColor("FF3366FF"),
        toCSSColor("FF33CCCC"),
        toCSSColor("FF99CC00"),
        toCSSColor("FFFFCC00"),
        toCSSColor("FFFF9900"),
        toCSSColor("FFFF6600"),
        toCSSColor("FF666699"),
        toCSSColor("FF969696"),
        toCSSColor("FF003366"),
        toCSSColor("FF339966"),
        toCSSColor("FF003300"),
        toCSSColor("FF333300"),
        toCSSColor("FF993300"),
        toCSSColor("FF993366"),
        toCSSColor("FF333399"),
        toCSSColor("FF333333"),
        toCSSColor("FF000000"), // System Foreground
        toCSSColor("FFFFFFFF")  // System Background
    ];

    function readStyles(zip, theme) {
        var styles = {
            fonts        : [],
            numFmts      : {},
            fills        : [],
            borders      : [],
            namedStyles  : [],
            inlineStyles : []
        };
        var font = null;
        var fill = null;
        var border = null;
        var xf = null;
        parse(zip, "xl/styles.xml", {
            enter: function(tag, attrs, closed) {
                if (this.is(SEL_NUM_FMT)) {
                    styles.numFmts[attrs.numFmtId] = attrs;
                }
                else if (this.is(SEL_FONT)) {
                    styles.fonts.push(font = {});
                } else if (font) {
                    if (tag == "sz") {
                        font.size = parseFloat(attrs.val);
                    } else if (tag == "name") {
                        font.name = attrs.val;
                    } else if (tag == "b") {
                        font.bold = bool(attrs.val);
                    } else if (tag == "i") {
                        font.italic = bool(attrs.val);
                    }
                }
                else if (this.is(SEL_FILL)) {
                    styles.fills.push(fill = {});
                } else if (fill) {
                    if (tag == "patternFill") {
                        fill.type = attrs.patternType;
                    } else if (tag == "fgColor" && fill.type === "solid") {
                        fill.color = getColor(attrs);
                    } else if (tag == "bgColor" && fill.type !== "solid") {
                        fill.color = getColor(attrs);
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
                    styles.inlineStyles.push(xf);
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
                        if (attrs.wrapText != null) {
                            xf.wrapText = bool(attrs.wrapText);
                        }
                    }
                }
            },
            leave: function(tag) {
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

        function getColor(attrs) {
            if (attrs.rgb) {
                return toCSSColor(attrs.rgb);
            } else if (attrs.indexed) {
                return INDEXED_COLORS[integer(attrs.indexed)];
            } else if (attrs.theme) {
                var themeColor = theme.colorScheme[integer(attrs.theme)];
                var color = kendo.parseColor(themeColor);

                if (attrs.tint) {
                    color = color.toHSL();

                    var tint = parseFloat(attrs.tint);
                    if (tint < 0) {
                        color.l = color.l * (1 + tint);
                    } else {
                        color.l = color.l * (1 - tint) + (100 - 100 * (1 - tint));
                    }
                }

                return color.toCssRgba();
            }
        }

        return styles;
    }

    var SEL_SCHEME_SYSCLR = ["a:clrScheme", "*", "a:sysClr"];
    var SEL_SCHEME_RGBCLR = ["a:clrScheme", "*", "a:srgbClr"];
    function readTheme(zip, rel) {
        var scheme = [];
        var theme = {
            colorScheme: scheme
        };

        var file = "xl/" + rel;
        if (zip.files[file]) {
            parse(zip, file, {
                enter: function(tag, attrs) {
                    if (this.is(SEL_SCHEME_SYSCLR)) {
                        scheme.push(toCSSColor(
                            attrs.val == "window" ? "FFFFFFFF" : "FF000000"
                        ));
                    } else if (this.is(SEL_SCHEME_RGBCLR)) {
                        scheme.push(toCSSColor("FF" + attrs.val));
                    }
                }
            });

            if (scheme.length > 3) {
                // lt1 <-> dk1
                swap(scheme, 0, 1);
                // lt2 <-> dk2
                swap(scheme, 2, 3);
            }
        }

        function swap(arr, a, b) {
            var tmp = arr[a];
            arr[a] = arr[b];
            arr[b] = tmp;
        }

        return theme;
    }

    function integer(val) {
        return val == null ? null : parseInt(val, 10);
    }

    function bool(val) {
        return val == "true" || val === true || val == 1;
    }

    function toCSSColor(rgb) {
        var m = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(rgb);
        return "rgba(" +
            parseInt(m[2], 16) + ", " +
            parseInt(m[3], 16) + ", " +
            parseInt(m[4], 16) + ", " +
            parseInt(m[1], 16) / 255 + ")";
    }

    kendo.spreadsheet.readExcel = readExcel;
    kendo.spreadsheet._readSheet = readSheet;
    kendo.spreadsheet._readStrings = readStrings;
    kendo.spreadsheet._readStyles = readStyles;
    kendo.spreadsheet._readTheme = readTheme;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
