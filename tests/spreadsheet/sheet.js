(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.columns, defaults.rows,
            defaults.columnWidth, defaults.rowHeight);
        }
    });

    test("rowHeight sets the height of the specified row", function() {
        sheet.rowHeight(0, 100);

        equal(sheet._rows.values.iterator(0, 0).at(0), 100);
    });

    test("rowHeight returns the height of the specified row", function() {
        equal(sheet.rowHeight(0), defaults.rowHeight);
    });

    test("columnWidth sets the width of the specified column", function() {
        sheet.columnWidth(0, 100);

        equal(sheet._columns.values.iterator(0, 0).at(0), 100);
    });

    test("columnWidth returns the width of the specified column", function() {
        equal(sheet.columnWidth(0), defaults.columnWidth);
    });
})();
