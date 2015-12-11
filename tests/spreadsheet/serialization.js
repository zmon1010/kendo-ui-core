(function() {
    var sheet;
    var spreadsheet;

    module("Sheet serialization", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("toJSON returns rows array", function() {
        ok($.isArray(sheet.toJSON().rows));
    });

    test("toJSON serializes rows that have data", function() {
        sheet.range("A1").value("foo");
        sheet.range("A2").value("bar");

        var json = sheet.toJSON();

        equal(json.rows.length, 2);
    });

    test("toJSON serializes validations", function() {
        var validationOptions = {
            from: "A2",
            to: "",
            comparerType: "greaterThan",
            dataType: "date",
            messageTemplate: "message"
        };

        sheet.range("A1").validation($.extend({}, validationOptions));

        var json = sheet.toJSON();

        var parsedJSON = json.rows[0].cells[0].validation;

        equal(json.rows.length, 1);
        equal(parsedJSON.from, validationOptions.from);
        equal(parsedJSON.to, validationOptions.to);
        equal(parsedJSON.dataType, validationOptions.dataType);
        equal(parsedJSON.comparerType, validationOptions.comparerType);
        equal(parsedJSON.messageTemplate, "message");
    });

    test("toJSON serializes the index of the row", function() {
        sheet.range("A2").value("bar");

        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].index, 1);
    });

    test("toJSON serializes cells that have value", function() {
        sheet.range("B2").value("bar");
        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells.length, 1);
    });

    test("toJSON serializes merged cells", function() {
        sheet.range("A1:A2").merge();
        sheet.range("B1:D3").merge();

        var json = sheet.toJSON();

        equal(json.mergedCells.length, 2);
        equal(json.mergedCells[0], "A1:A2");
        equal(json.mergedCells[1], "B1:D3");
    });

    test("toJSON serializes sort state", function() {
        sheet.range("A1:B2").sort([{ column: 0, ascending: false }, { column: 1 }]);

        var json = sheet.toJSON();

        equal(json.sort.ref, "A1:B2");
        equal(json.sort.columns.length, 2);
        equal(json.sort.columns[0].index, 0);
        equal(json.sort.columns[0].ascending, false);
        equal(json.sort.columns[1].ascending, true);
    });

    test("toJSON serializes filter state", function() {
        sheet.range("A1:B2").filter([{ column: 0, filter: new kendo.spreadsheet.ValueFilter({ values:[0,1] }) } ]);

        var json = sheet.toJSON();

        equal(json.filter.ref, "A1:B2");
        equal(json.filter.columns.length, 1);
        equal(json.filter.columns[0].index, 0);
        equal(json.filter.columns[0].filter, "value");
        equal(json.filter.columns[0].values[0], 0);
        equal(json.filter.columns[0].values[1], 1);
    });

    test("toJSON serializes custom filter state", function() {
        sheet.range("A1:B2").filter([
            {
                column: 0,
                filter: new kendo.spreadsheet.CustomFilter({
                    criteria:[
                        { operator: "eq", value: "foo" },
                        { operator: "gte", value: 3 }
                    ]
                })
            }
        ]);

        var json = sheet.toJSON();

        equal(json.filter.ref, "A1:B2");
        equal(json.filter.columns.length, 1);
        equal(json.filter.columns[0].index, 0);
        equal(json.filter.columns[0].filter, "custom");
        equal(json.filter.columns[0].logic, "and");
        equal(json.filter.columns[0].criteria[0].operator, "eq");
        equal(json.filter.columns[0].criteria[0].value, "foo");
        equal(json.filter.columns[0].criteria[1].operator, "gte");
        equal(json.filter.columns[0].criteria[1].value, 3);
    });

    test("toJSON serializes top filter", function() {
        sheet.range("A1:B2").filter([
            {
                column: 0,
                filter: new kendo.spreadsheet.TopFilter({
                    type: "topPercent",
                    value: 13
                })
            }
        ]);

        var json = sheet.toJSON();

        equal(json.filter.ref, "A1:B2");
        equal(json.filter.columns.length, 1);
        equal(json.filter.columns[0].index, 0);
        equal(json.filter.columns[0].filter, "top");
        equal(json.filter.columns[0].type, "topPercent");
        equal(json.filter.columns[0].value, 13);
    });

    test("toJSON serializes dynamic filter", function() {
        sheet.range("A1:B2").filter([
            {
                column: 0,
                filter: new kendo.spreadsheet.DynamicFilter({
                    type: "january"
                })
            }
        ]);

        var json = sheet.toJSON();

        equal(json.filter.ref, "A1:B2");
        equal(json.filter.columns.length, 1);
        equal(json.filter.columns[0].index, 0);
        equal(json.filter.columns[0].filter, "dynamic");
        equal(json.filter.columns[0].type, "january");
    });

    test("toJSON serializes cells that have format", function() {
        sheet.range("B2").format("#.#");
        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells.length, 1);
    });

    test("toJSON serializes cell format", function() {
        sheet.range("B2").format("#.#");
        var json = sheet.toJSON();

        equal(json.rows[0].cells[0].format, "#.#");
    });

    test("toJSON serializes cell index", function() {
        sheet.range("B2").value("bar");
        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells[0].index, 1);
    });

    test("toJSON serializes cell value", function() {
        sheet.range("B2").value("bar");
        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells[0].value, "bar");
    });

    test("toJSON serializes cells with style", function() {
        sheet.range("B2").background("red");
        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells[0].background, "#ff0000");
    });

    test("toJSON doesn't serialize null value", function() {
        sheet.range("B2").background("red");
        var json = sheet.toJSON();

        ok(!json.rows[0].cells[0].hasOwnProperty("value"));
    });

    test("toJSON serializes cells with formulas", function() {
        sheet.range("B2").formula("SUM(A1,A2)");
        var json = sheet.toJSON();

        equal(json.rows[0].cells[0].formula, "SUM(A1, A2)");

        equal(Object.keys(json.rows[0].cells[0]).length, 3);
    });

    test("toJSON doesn't serialize empty style", function() {
        sheet.range("B2").value("foo");
        var json = sheet.toJSON();

        ok(!json.rows[0].cells[0].hasOwnProperty("style"));
    });

    test("toJSON serializes rows with non-default height", function() {
        sheet.rowHeight(1, 33);

        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].height, 33);
        equal(json.rows[0].index, 1);
    });

    test("toJSON serializes rows with non-default height and their cells", function() {
        sheet.rowHeight(1, 33);
        sheet.range("A2").value("foo");

        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].height, 33);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells.length, 1);
    });

    test("toJSON serializes columns with non-default width", function() {
        sheet.columnWidth(1, 33);

        var json = sheet.toJSON();

        equal(json.columns.length, 1);
        equal(json.columns[0].width, 33);
        equal(json.columns[0].index, 1);
    });

    test("toJSON serializes frozenColumns and frozenRows", function() {
        sheet.frozenColumns(1);
        sheet.frozenRows(1);

        var json = sheet.toJSON();
        equal(json.frozenColumns, 1);
        equal(json.frozenRows, 1);
    });

    test("fromJSON loads column widths", function() {
        sheet.fromJSON({
            columns: [
                { index: 1, width: 33 }
            ]
        });

        equal(sheet.columnWidth(1), 33);
    });

    test("fromJSON loads column widths with implicit index", function() {
        sheet.fromJSON({
            columns: [
                { width: 33 }
            ]
        });

        equal(sheet.columnWidth(0), 33);
    });

    test("fromJSON loads row heights", function() {
        sheet.fromJSON({
            rows: [
                { index: 1, height: 33 }
            ]
        });

        equal(sheet.rowHeight(1), 33);
    });

    test("fromJSON loads row heights with implicit index", function() {
        sheet.fromJSON({
            rows: [
                { height: 33 }
            ]
        });

        equal(sheet.rowHeight(0), 33);
    });

    test("fromJSON loads row cells", function() {
        sheet.fromJSON({
            rows: [
                {
                    index: 1,
                    cells: [
                        {
                            index: 1,
                            value: "B2"
                        }
                    ]
                }
            ]
        });

        equal(sheet.range("B2").value(), "B2");
    });

    test("fromJSON doesn't parse cell values", function() {
        sheet.fromJSON({
            rows: [
                {
                    index: 1,
                    cells: [
                        {
                            index: 1,
                            value: "TRUE"
                        }
                    ]
                }
            ]
        });

        equal(sheet.range("B2").value(), "TRUE");
    });

    test("fromJSON loads row cells with implicit row index", function() {
        sheet.fromJSON({
            rows: [
                {
                    cells: [
                        {
                            index: 1,
                            value: "B1"
                        }
                    ]
                }
            ]
        });

        equal(sheet.range("B1").value(), "B1");
    });

    test("fromJSON loads row cells with implicit cell index", function() {
        sheet.fromJSON(singleCell({ value: "A1" }));

        equal(sheet.range("A1").value(), "A1");
    });

    test("fromJSON loads cell style", function() {
        sheet.fromJSON(singleCell({ background: "red" }));

        equal(sheet.range("A1").background(), "red");
    });

    test("fromJSON loads borders", function() {
        var border = { color: "#f00", size: 3 };

        sheet.fromJSON(singleCell({ borderBottom: border }));
        deepEqual(sheet.range("A1").borderBottom(), border);

        sheet.fromJSON(singleCell({ borderTop: border }));
        deepEqual(sheet.range("A1").borderTop(), border);

        sheet.fromJSON(singleCell({ borderLeft: border }));
        deepEqual(sheet.range("A1").borderLeft(), border);

        sheet.fromJSON(singleCell({ borderRight: border }));
        deepEqual(sheet.range("A1").borderRight(), border);
    });

    test("fromJSON loads cell formula", function() {
        sheet.fromJSON(singleCell({ formula: "SUM(B1,B2)" }));
        equal(sheet.range("A1").formula(), "SUM(B1, B2)");
    });

    test("fromJSON loads cell formula", function() {
        sheet.fromJSON(singleCell({ format: "#.#" }));

        equal(sheet.range("A1").format(), "#.#");
    });

    test("fromJSON triggers the change event once", 1, function() {
        sheet.bind("change", function() {
            ok(true);
        }).fromJSON({
            rows: [
                {
                    cells: [
                        {
                            background: "red",
                            value: "foo"
                        },
                        {
                            background: "red",
                            value: "foo"
                        }
                    ]
                }
            ]
        });
    });

    test("fromJSON loads frozenColumns and frozenRows", function() {
        sheet.fromJSON({
            frozenColumns: 1,
            frozenRows: 1
        });

        equal(sheet.frozenColumns(), 1);
        equal(sheet.frozenRows(), 1);
    });

    test("fromJSON loads merged cells", function() {
        sheet.fromJSON({
            mergedCells: [
                "A1:B1", "A3:A5"
            ]
        });

        equal(sheet._mergedCells.length, 2);
        equal(sheet._mergedCells[0].toString(), "A1:B1");
        equal(sheet._mergedCells[1].toString(), "A3:A5");
    });

    test("fromJSON loads sort state", function() {
        sheet.fromJSON({
            sort: {
                ref: "A1:B1",
                columns: [
                    { index: 1, ascending: false },
                    { index: 0, ascending: true }
                ]
            }
        });

        equal(sheet._sort.ref.toString(), "A1:B1");
        equal(sheet._sort.columns.length, 2);
        equal(sheet._sort.columns[1].index, 0);
        equal(sheet._sort.columns[1].ascending, true);
    });

    test("fromJSON loads filter state", function() {
        sheet.fromJSON({
            filter: {
                ref: "A1:B1",
                columns: [
                    { index: 1, filter: "custom", criteria: [ { operator: "eq", value: "foo" } ] },
                    { index: 0, filter: "value", values: [1, 2] },
                    { index: 2, filter: "top", type: "topPercent", value: 1 }
                ]
            }
        });

        equal(sheet._filter.ref.toString(), "A1:B1");
        equal(sheet._filter.columns[0].index, 1);
        ok(sheet._filter.columns[0].filter instanceof kendo.spreadsheet.CustomFilter);
        ok(sheet._filter.columns[1].filter instanceof kendo.spreadsheet.ValueFilter);
        ok(sheet._filter.columns[2].filter instanceof kendo.spreadsheet.TopFilter);
    });

    test("fromJSON applies new filter state", function() {
        sheet.fromJSON({
            rows: [
                {
                    cells: [
                        { value: 1 }
                    ]
                },
                {
                    cells: [
                        { value: 2 }
                    ]
                }
            ],
            filter: {
                ref: "A1:A2",
                columns: [
                    { index: 0, filter: "value", values: [1] }
                ]
            }
        });

        equal(sheet.rowHeight(1), 0);
    });

    test("fromJSON skips invalid filter state", function() {
        sheet.fromJSON({
            filter: { }
        });

        ok(!sheet._filter);
    });

    // ------------------------------------------------------------
    module("Workbook serialization", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);
            spreadsheet = new kendo.ui.Spreadsheet(element);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("toJSON serializes the sheets of the spreadsheet", function() {
        var json = spreadsheet.toJSON();

        equal(json.sheets.length, 1);
        equal(json.sheets[0].rows.length, 0);
    });

    test("toJSON serializes multiple sheets", function() {
        spreadsheet.insertSheet();

        var json = spreadsheet.toJSON();

        equal(json.sheets.length, 2);
        equal(json.sheets[1].rows.length, 0);
    });

    test("toJSON serializes sheet names", function() {
        spreadsheet.insertSheet();

        var json = spreadsheet.toJSON();

        equal(json.sheets[1].name, spreadsheet.sheets()[1].name());
    });

    test("toJSON serializes active sheet", function() {
        spreadsheet.insertSheet({
            name: "Foo"
        });
        spreadsheet.activeSheet(spreadsheet.sheetByIndex(1));

        var json = spreadsheet.toJSON();

        equal(json.activeSheet, "Foo");
    });

    test("toJSON serializes selection and active cell", function() {
        sheet.range("A1:C3").select();

        var json = sheet.toJSON();

        equal(json.selection, "A1:C3");
        equal(json.activeCell, "A1:A1");
    });

    test("fromJSON loads spreadsheet sheets", function() {
        spreadsheet.fromJSON({
            sheets: [
                singleCell({ background: "red" }),
                singleCell({ background: "yellow" })
            ]
        });

        equal(spreadsheet.sheets()[1].range("A1").background(), "yellow");
    });

    test("fromJSON refresh the view", function() {
        spreadsheet.fromJSON({
            sheets: [
                singleCell({ background: "red" }),
                singleCell({ background: "yellow" })
            ]
        });

        var firstCell = spreadsheet._view.element.find(".k-spreadsheet-cell")[0];

        equal(firstCell.style.backgroundColor, "red");
    });

    test("fromJSON remove old spreadsheet sheets", function() {
        spreadsheet.insertSheet();

        spreadsheet.fromJSON({
            sheets: [
                singleCell({ background: "yellow" })
            ]
        });

        equal(spreadsheet.sheets().length, 1);
        equal(spreadsheet.sheets()[0].range("A1").background(), "yellow");
        equal(spreadsheet.activeSheet().range("A1").background(), "yellow");
    });

    test("fromJSON insert sheets with specified names", function() {
        spreadsheet.insertSheet();

        var name = "Sheet2";

        spreadsheet.fromJSON({
            sheets: [
                $.extend(singleCell({ background: "yellow"}), { name:  name })
            ]
        });

        equal(spreadsheet.sheets().length, 1);
        equal(spreadsheet.activeSheet().name(), name);
    });

    test("fromJSON sets active sheet", function() {
        spreadsheet.fromJSON({
            activeSheet: "Bar",
            sheets: [{
                name: "Foo"
            }, {
                name: "Bar"
            }]
        });

        equal(spreadsheet.activeSheet().name(), "Bar");
    });

    test("fromJSON loads selection and active cell", function() {
        sheet.fromJSON({
            selection: "A1:C3",
            activeCell: "A1:A1"
        });

        equal(sheet.select().toString(), "A1:C3");
        equal(sheet.activeCell().toString(), "A1:A1");
    });

    test("fromJSON loads original selection and active cell", function() {
        sheet.fromJSON({
            selection: "A1:C3",
            activeCell: "A1:A1"
        });

        equal(sheet._viewSelection.originalSelection.toString(), "A1:C3");
        equal(sheet._viewSelection.originalActiveCell.toString(), "A1:A1");
    });

    function singleCell(cell) {
        return { rows: [ { cells: [ cell ] } ] };
    }

    test("fromJSON loads filter state", function() {
        sheet.fromJSON({
            filter: {
                ref: "A1:B1",
                columns: [
                    { index: 1, filter: "custom", criteria: [ { operator: "eq", value: "foo" } ] },
                    { index: 0, filter: "value", values: [1, 2] },
                    { index: 2, filter: "top", type: "topPercent", value: 1 }
                ]
            }
        });

        equal(sheet._filter.ref.toString(), "A1:B1");
        equal(sheet._filter.columns[0].index, 1);
        ok(sheet._filter.columns[0].filter instanceof kendo.spreadsheet.CustomFilter);
        ok(sheet._filter.columns[1].filter instanceof kendo.spreadsheet.ValueFilter);
        ok(sheet._filter.columns[2].filter instanceof kendo.spreadsheet.TopFilter);
    });

    test("fromJSON loads validations", function() {
        var validationObject = JSON.parse('{"from":"A4",' +
            '"to":"",' +
            '"dataType":"date",' +
            '"type":"warning",' +
            '"comparerType":"greaterThan",' +
            '"row":0,' + '"col":0,' + ' "allowNulls":"true",' +
            '"sheet":"Sheet1",' +
            '"tooltipMessageTemplate":"",' +
            '"tooltipTitleTemplate":"",' +
            '"messageTemplate":"Please enter a valid {0} value {1}.",' +
            '"titleTemplate":"Validation {0}"}');

        sheet.fromJSON(singleCell({ validation: validationObject }));

        var validationOptions = sheet.range("A1").validation();

        equal(validationOptions.type, validationObject.type);
        equal(validationOptions.dataType, validationObject.dataType);
        equal(validationOptions.sheet, validationObject.sheet);
        equal(validationOptions.row, validationObject.row);
        equal(validationOptions.col, validationObject.col);
        equal(validationOptions.col, validationObject.col);
    });
})();
