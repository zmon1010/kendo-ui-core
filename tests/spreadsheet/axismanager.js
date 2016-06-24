(function() {
    var sheet;
    var manager;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var AxisManager = kendo.spreadsheet.AxisManager;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    function getRef(ref) {
        return sheet._ref(ref);
    }

    module("Axis manager", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns, defaults.rowHeight, defaults.columnWidth);
            manager = new AxisManager(sheet);
        }
    });

    test("deletes columns for the given range", function() {
        sheet.range("D:D").value("foo");
        sheet.range("C:C,A:B,C:C").select();
        manager.deleteSelectedColumns();
        equal(sheet.range("A:A").value(), "foo");
    });

    test("knows about hidden columns", function() {
        ok(!manager.includesHiddenColumns(getRef("A:D")));
        sheet.range("C:C").select();
        manager.hideSelectedColumns();
        ok(manager.includesHiddenColumns(getRef("A:D")));
    });

    test("hideSelectedRows updates selection", function(){
        sheet.range("C:C").select();
        manager.hideSelectedColumns();
        equal(sheet.select()+"", "D1:D200");
        sheet.range("B:B").select();
        manager.hideSelectedColumns();
        equal(sheet.select()+"", "A1:A200");
    });

    test("hideSelectedColumns updates selection", function(){
        sheet.range("4:4").select();
        manager.hideSelectedRows();
        equal(sheet.select()+"", "A5:AX5");
        sheet.range("3:3").select();
        manager.hideSelectedRows();
        equal(sheet.select()+"", "A2:AX2");
    });

})();
