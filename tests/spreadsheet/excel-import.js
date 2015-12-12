(function() {
    "use strict";

    var zip;

    function addFile(name, content) {
        zip.files[name] = {
            asUint8Array: () =>
                Uint8Array.from(content, (c, i) => content.charCodeAt(i))
        };
    }

    // ------------------------------------------------------------
    module("Spreadsheet / Excel Import", {
        setup: function() {
            zip = { files: {} };
        }
    });

    test("sets solid fill to ARGB fgColor", function() {
        var THEME = {};
        var STYLESHEET = `
            <styleSheet>
              <fills>
                <fill>
                  <patternFill patternType="solid">
                    <fgColor rgb="FFCCFF00"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(204, 255, 0, 1)");
    });

    test("sets solid fill to indexed fgColor", function() {
        var THEME = {};
        var STYLESHEET = `
            <styleSheet>
              <fills>
                <fill>
                  <patternFill patternType="solid">
                    <fgColor indexed="64"/>
                    <bgColor rgb="FFCCFF00"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(0, 0, 0, 1)");
    });

    test("sets solid fill to theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(204, 255, 0, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills>
                <fill>
                  <patternFill patternType="solid">
                    <fgColor theme="0"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(204, 255, 0, 1)");
    });

    test("reads border style", function() {
        var THEME = {};
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left style="thick">
                <color indexed="64"/>
              </left>
              <right/>
              <top/>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.left.style, "thick");
    });

    test("reads border indexed color", function() {
        var THEME = { };
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left/>
              <right style="thick">
                <color indexed="64"/>
              </right>
              <top/>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.right.color, "rgba(0, 0, 0, 1)");
    });

    test("reads border theme color", function() {
        var THEME = {
            colorScheme: ["rgba(255, 0, 0, 1)"]
        };
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left/>
              <right/>
              <top style="thick">
                <color theme="0"/>
              </top>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.top.color, "rgba(255, 0, 0, 1)");
    });

    test("reads border theme tinted color", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
          <styleSheet>
          <borders>
            <border>
              <left/>
              <right/>
              <top style="thick">
                <color theme="0" tint="-0.25"/>
              </top>
              <bottom/>
              <diagonal/>
            </border>
          </borders>
          </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        var border = styles.borders[0];

        equal(border.top.color, "rgba(18, 135, 195, 1)");
    });

    test("sets solid fill to -tinted theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills>
                <fill>
                  <patternFill patternType="solid">
                    <fgColor theme="0" tint="-0.25"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(18, 135, 195, 1)");
    });

    test("sets solid fill to +tinted theme fgColor", function() {
        var THEME = {
            colorScheme: ["rgba(48, 172, 236, 1)"]
        };
        var STYLESHEET = `
            <styleSheet>
              <fills>
                <fill>
                  <patternFill patternType="solid">
                    <fgColor theme="0" tint="0.6"/>
                    <bgColor indexed="64"/>
                  </patternFill>
                </fill>
              </fills>
            </styleSheet>
        `;

        addFile("xl/styles.xml", STYLESHEET);

        var styles = kendo.spreadsheet._readStyles(zip, THEME);
        equal(styles.fills[0].color, "rgba(172, 222, 247, 1)");
    });

    test("reads theme colors", function() {
        var THEME = `
            <a:theme name="Office Theme">
              <a:themeElements>
                <a:clrScheme name="Office">
                  <a:dk1>
                    <a:sysClr val="windowText" lastClr="000000"/>
                  </a:dk1>
                  <a:lt1>
                    <a:sysClr val="window" lastClr="FFFFFF"/>
                  </a:lt1>
                  <a:dk2>
                    <a:srgbClr val="44546A"/>
                  </a:dk2>
                  <a:lt2>
                    <a:srgbClr val="E7E6E6"/>
                  </a:lt2>
                  <a:accent1>
                    <a:srgbClr val="5B9BD5"/>
                  </a:accent1>
                  <a:accent2>
                    <a:srgbClr val="ED7D31"/>
                  </a:accent2>
                  <a:accent3>
                    <a:srgbClr val="A5A5A5"/>
                  </a:accent3>
                  <a:accent4>
                    <a:srgbClr val="FFC000"/>
                  </a:accent4>
                  <a:accent5>
                    <a:srgbClr val="4472C4"/>
                  </a:accent5>
                  <a:accent6>
                    <a:srgbClr val="70AD47"/>
                  </a:accent6>
                  <a:hlink>
                    <a:srgbClr val="0563C1"/>
                  </a:hlink>
                  <a:folHlink>
                    <a:srgbClr val="954F72"/>
                  </a:folHlink>
                </a:clrScheme>
              </a:themeElements>
            </a:theme>
        `;

        addFile("xl/theme/theme1.xml", THEME);

        var theme = kendo.spreadsheet._readTheme(zip, "theme/theme1.xml");

        deepEqual(theme.colorScheme, [
            // Notice lt1 <-> dk1 swap,
            // system color defaults
            "rgba(255, 255, 255, 1)",
            "rgba(0, 0, 0, 1)",

            // Notice lt2 <-> dk2 swap
            "rgba(231, 230, 230, 1)",
            "rgba(68, 84, 106, 1)",

            "rgba(91, 155, 213, 1)",
            "rgba(237, 125, 49, 1)",
            "rgba(165, 165, 165, 1)",
            "rgba(255, 192, 0, 1)",
            "rgba(68, 114, 196, 1)",
            "rgba(112, 173, 71, 1)",
            "rgba(5, 99, 193, 1)",
            "rgba(149, 79, 114, 1)"
        ]);
    });

    test("reads strings", function() {
        var STRINGS = `
            <sst count="2" uniqueCount="2">
              <si>
                <t>String 1</t>
              </si>
              <si>
                <t>String 2</t>
              </si>
            </sst>
        `;

        addFile("xl/sharedStrings.xml", STRINGS);

        var strings = kendo.spreadsheet._readStrings(zip);
        deepEqual(strings, ["String 1", "String 2"]);
    });

    test("does not fail if no strings are defined", 0, function() {
        kendo.spreadsheet._readStrings(zip);
    });

    test("reads untyped cell data as numbers", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="C1">
                    <v>123</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => ok(val === 123),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads number cell data", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="B1" t="n">
                    <v>1</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => ok(val === 1),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads string cell data", function() {
        var STRINGS = ["Foo"];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="A1" t="s">
                    <v>0</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => equal(val, "Foo"),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads inline string cell data", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="A1" t="inlineStr">
                    <is>foo</is>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => equal(val, "foo"),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads boolean (true) cell data", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="E1" t="b">
                    <v>1</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => equal(val, true),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads boolean (false) cell data", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="E1" t="b">
                    <v>0</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => equal(val, false),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads date cell data", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="E1" t="d">
                    <v>2015-12-09</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: val => equal(val.toString(), new Date("2015/12/09").toString()),
                formula: () => null,
                _get: () => null
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads formula", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="B1">
                    <f>SUM(A1:A1000)</f>
                    <v>0</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: () => null,
                formula: val => equal(val, "SUM(A1:A1000)"),
                _get: () => true
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads formula with error", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="A1" t="e">
                    <f>1/0</f>
                    <v>#DIV/0!</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: () => null,
                formula: val => equal(val, "1/0"),
                _get: () => true
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads string formula", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetData>
                <row r="1">
                  <c r="B1" t="str">
                    <v>SUM(A1:A1000)</v>
                  </c>
                </row>
              </sheetData>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            range: ref => ({
                value: () => null,
                formula: val => equal(val, "SUM(A1:A1000)"),
                _get: () => true
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads column widths", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <cols>
                <col min="1" max="2" width="80" customWidth="1"/>
              </cols>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            _columns: {
                values: {
                    value: (start, end, width) => {
                        equal(start, 0, "start");
                        equal(end, 1, "end");
                        equal(width, 560, "width");
                    }
                },
                _refresh: () => null
            },
            range: ref => ({
                value: () => null,
                formula: () => null,
                _get: () => true
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("does not apply default column widths", 0, function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <cols>
                <col min="35" max="16384" width="1"/>
              </cols>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            _columns: {
                values: {
                    value: () => ok(false)
                },
                _refresh: () => null
            },
            range: ref => ({
                value: () => null,
                formula: val => equal(val, "SUM(A1:A1000)"),
                _get: () => true
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("sets active cell", function() {
        var STRINGS = [];
        var STYLES = {};
        var SHEET = `
            <worksheet>
              <sheetViews>
                <sheetView>
                  <selection activeCell="G17"/>
                </sheetView>
              </sheetViews>
            </worksheet>
        `;

        addFile("xl/worksheets/sheet1.xml", SHEET);
        var sheet = {
            select: (ref, active) => {
                equal(ref.toString(), "G17")
                equal(active, true);
            },
            _columns: {
                values: {
                    value: () => ok(false)
                },
                _refresh: () => null
            },
            range: ref => ({
                value: () => null,
                formula: val => equal(val, "SUM(A1:A1000)"),
                _get: () => true
            }),
            _rows: {
                _refresh: () => null
            }
        };

        kendo.spreadsheet._readSheet(zip, "worksheets/sheet1.xml", sheet, STRINGS, STYLES);
    });

    test("reads sheet dimensions", function() {
        const RELS = `
            <Relationships>
              <Relationship Id="rId1"
                Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
                Target="worksheets/sheet1.xml"/>
            </Relationships>
        `;
        const WORKBOOK = `
            <workbook>
              <sheets>
                <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
              </sheets>
            </workbook>
        `;
        const SHEET = `
            <worksheet>
              <dimension ref="A1:AA100"/>
            </worksheet>
        `;

        addFile("xl/_rels/workbook.xml.rels", RELS);
        addFile("xl/workbook.xml", WORKBOOK);
        addFile("xl/worksheets/sheet1.xml", SHEET);

        const workbook = {
            options: { },
            insertSheet: options => {
                equal(options.rows, 100, "rows");
                equal(options.columns, 27, "columns");

                let sheet = {
                    suspendChanges: () => sheet,
                    triggerChange: () => null
                };

                return sheet;
            },
            recalcSheets: () => null,
            triggerChange: () => null,
            activeSheet: () => null
        };

        kendo.spreadsheet._readWorkbook(zip, workbook);
    });

    test("applies default dimensions", function() {
        const RELS = `
            <Relationships>
              <Relationship Id="rId1"
                Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
                Target="worksheets/sheet1.xml"/>
            </Relationships>
        `;
        const WORKBOOK = `
            <workbook>
              <sheets>
                <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
              </sheets>
            </workbook>
        `;
        const SHEET = `
            <worksheet>
              <dimension ref="A1:AA100"/>
            </worksheet>
        `;

        addFile("xl/_rels/workbook.xml.rels", RELS);
        addFile("xl/workbook.xml", WORKBOOK);
        addFile("xl/worksheets/sheet1.xml", SHEET);

        const workbook = {
            options: {
                rows: 1000,
                columns: 100
            },
            insertSheet: options => {
                equal(options.rows, 1000, "rows");
                equal(options.columns, 100, "columns");

                let sheet = {
                    suspendChanges: () => sheet,
                    triggerChange: () => null
                };

                return sheet;
            },
            recalcSheets: () => null,
            triggerChange: () => null,
            activeSheet: () => null
        };

        kendo.spreadsheet._readWorkbook(zip, workbook);
    });

    test("reads default column width and row height", function() {
        const RELS = `
            <Relationships>
              <Relationship Id="rId1"
                Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
                Target="worksheets/sheet1.xml"/>
            </Relationships>
        `;
        const WORKBOOK = `
            <workbook>
              <sheets>
                <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
              </sheets>
            </workbook>
        `;
        const SHEET = `
            <worksheet>
              <dimension ref="A1:AA100"/>
              <sheetFormatPr defaultColWidth="1" defaultRowHeight="15.68" />
            </worksheet>
        `;

        addFile("xl/_rels/workbook.xml.rels", RELS);
        addFile("xl/workbook.xml", WORKBOOK);
        addFile("xl/worksheets/sheet1.xml", SHEET);

        const workbook = {
            options: { },
            insertSheet: options => {
                equal(options.columnWidth, 7, "width");
                equal(options.rowHeight, 24.5, "height");

                let sheet = {
                    suspendChanges: () => sheet,
                    triggerChange: () => null,
                    _columns: {
                        values: {
                            value: () => null
                        },
                        _refresh: () => null
                    }
                };

                return sheet;
            },
            recalcSheets: () => null,
            triggerChange: () => null,
            activeSheet: () => null
        };

        kendo.spreadsheet._readWorkbook(zip, workbook);
    });

    test("reads active sheet", function() {
        const RELS = `
            <Relationships>
              <Relationship Id="rId1"
                Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
                Target="worksheets/sheet1.xml"/>
              <Relationship Id="rId2"
                Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"
                Target="worksheets/sheet2.xml"/>
            </Relationships>
        `;
        const WORKBOOK = `
            <workbook>
              <bookViews>
                <workbookView activeTab="1"/>
              </bookViews>
              <sheets>
                <sheet name="Sheet1" sheetId="1" r:id="rId1"/>
                <sheet name="Sheet2" sheetId="2" r:id="rId2"/>
              </sheets>
            </workbook>
        `;
        const SHEET = `
            <worksheet>
            </worksheet>
        `;

        addFile("xl/_rels/workbook.xml.rels", RELS);
        addFile("xl/workbook.xml", WORKBOOK);
        addFile("xl/worksheets/sheet1.xml", SHEET);
        addFile("xl/worksheets/sheet2.xml", SHEET);

        const workbook = {
            options: { },
            insertSheet: options => {
                let sheet = {
                    select: () => null,
                    name: () => options.name,
                    suspendChanges: () => sheet,
                    triggerChange: () => null,
                    _columns: {
                        values: {
                            value: () => null
                        },
                        _refresh: () => null
                    }
                };

                return sheet;
            },
            recalcSheets: () => null,
            triggerChange: () => null,
            activeSheet: sheet => equal(sheet.name(), "Sheet2")
        };

        kendo.spreadsheet._readWorkbook(zip, workbook);
    });
})();
