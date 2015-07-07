(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

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

    test("rowHeight triggers the change event", 1, function() {
       sheet.bind("change", success).rowHeight(0, 0);
    });

    test("columnWidth triggers the change event", 1, function() {
       sheet.bind("change", success).columnWidth(0, 0);
    });

    test("hideColumn triggers the change event", 1, function() {
       sheet.bind("change", success).hideColumn(0);
    });

    test("hideRow triggers the change event", 1, function() {
       sheet.bind("change", success).hideRow(0);
    });

    test("unhideColumn triggers the change event", 1, function() {
       sheet.bind("change", success).unhideColumn(0);
    });

    test("unhideRow triggers the change event", 1, function() {
       sheet.bind("change", success).unhideRow(0);
    });

    test("frozenRows triggers the change event", 1, function() {
       sheet.bind("change", success).frozenRows(2);
    });

    test("frozenColumns triggers the change event", 1, function() {
       sheet.bind("change", success).frozenColumns(2);
    });

    test("select triggers the change event", 1, function() {
       sheet.bind("change", success).range("A1:A1").select();
    });

    test("triggerChange triggers the change event", 1, function() {
       sheet.bind("change", success).triggerChange();
    });

    test("triggerChange doesn't trigger the change event if changes are suspended", 0, function() {
       sheet.bind("change", failure).suspendChanges(true).triggerChange();
    });

    test("deleteRow triggers the change event", 1, function() {
       sheet.bind("change", success).deleteRow(0);
    });

    test("deleteRow move the bottom row values to the deleted one", function() {
        sheet.range("2:2").value("foo");

        sheet.deleteRow(0);

        equal(sheet.range("1:1").value(), "foo");
        equal(sheet.range("2:2").value(), null);
    });

    test("deleteRow move the bottom row background to the deleted one", function() {
        sheet.range("2:2").background("foo");

        sheet.deleteRow(0);

        equal(sheet.range("1:1").background(), "foo");
        equal(sheet.range("2:2").background(), null);
    });

})();
