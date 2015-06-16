(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("rowHeight sets the height of the specified row", function() {
        sheet.rowHeight(0, 100);

        equal(sheet._grid._rows.values.iterator(0, 0).at(0), 100);
    });

    test("rowHeight returns the height of the specified row", function() {
        equal(sheet.rowHeight(0), defaults.rowHeight);
    });

    test("columnWidth sets the width of the specified column", function() {
        sheet.columnWidth(0, 100);

        equal(sheet._grid._columns.values.iterator(0, 0).at(0), 100);
    });

    test("columnWidth returns the width of the specified column", function() {
        equal(sheet.columnWidth(0), defaults.columnWidth);
    });

    test("range returns a Range object by row and col index", function() {
        ok(sheet.range(0, 0) instanceof kendo.spreadsheet.Range);
    });

    test("range returns a Range object by A1 reference", function() {
        var range = sheet.range("A1:B1");
        ok(range instanceof kendo.spreadsheet.Range);
        equal(range._ref.topLeft.row, 0);
        equal(range._ref.topLeft.col, 0);
        equal(range._ref.bottomRight.col, 1);
        equal(range._ref.bottomRight.row, 0);
    });
})();
