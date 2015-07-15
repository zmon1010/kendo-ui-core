(function() {
    var sheet;
    var spreadsheet;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

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
        equal(json.filter.columns[0].type, "value");
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
        equal(json.filter.columns[0].type, "custom");
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
                    kind: "topPercent",
                    value: 13
                })
            }
        ]);

        var json = sheet.toJSON();

        equal(json.filter.ref, "A1:B2");
        equal(json.filter.columns.length, 1);
        equal(json.filter.columns[0].index, 0);
        equal(json.filter.columns[0].type, "top");
        equal(json.filter.columns[0].kind, "topPercent");
        equal(json.filter.columns[0].value, 13);
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
        equal(json.rows[0].cells[0].background, "red");
    });

    test("toJSON doesn't serialize null value", function() {
        sheet.range("B2").background("red");
        var json = sheet.toJSON();

        ok(!json.rows[0].cells[0].hasOwnProperty("value"));
    });

    test("toJSON serializes cells with formulas", function() {
        sheet.range("B2").formula("=SUM(A1,A2)");
        var json = sheet.toJSON();

        equal(json.rows[0].cells[0].formula, "=SUM(A1,A2)");

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


    test("toJSON serializes the sheets of the spreadsheet", function() {
        var json = spreadsheet.toJSON();

        equal(json.sheets.length, 1);
        equal(json.sheets[0].rows.length, 0);
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

    function singleCell(cell) {
        return { rows: [ { cells: [ cell ] } ] };
    }

    test("fromJSON loads row cells with implicit cell index", function() {
        sheet.fromJSON(singleCell({ value: "A1" }));

        equal(sheet.range("A1").value(), "A1");
    });

    test("fromJSON loads cell style", function() {
        sheet.fromJSON(singleCell({ background: "red" }));

        equal(sheet.range("A1").background(), "red");
    });

    test("fromJSON loads cell formula", function() {
        sheet.fromJSON(singleCell({ formula: "=SUM(B1,B2)" }));

        equal(sheet.range("A1").formula(), "=SUM(B1,B2)");
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

    test("fromJSON loads spreadsheet sheets", function() {
        spreadsheet.fromJSON({
            sheets: [
                singleCell({ background: "red" })
            ]
        });

        equal(sheet.range("A1").background(), "red");
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
                    { index: 1, type: "custom", criteria: [ { operator: "eq", value: "foo" } ] },
                    { index: 0, type: "value", values: [1, 2] },
                    { index: 2, type: "top", kind: "bottomPercent", value: 1 }
                ]
            }
        });

        equal(sheet._filter.ref.toString(), "A1:B1");
        equal(sheet._filter.columns[0].index, 1);
        ok(sheet._filter.columns[0].filter instanceof kendo.spreadsheet.CustomFilter);
        ok(sheet._filter.columns[1].filter instanceof kendo.spreadsheet.ValueFilter);
        ok(sheet._filter.columns[2].filter instanceof kendo.spreadsheet.TopFilter);
    });
})();
