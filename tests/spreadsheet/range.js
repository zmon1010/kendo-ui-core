(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var range;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);

            range = new kendo.spreadsheet.Range(sheet, 0, 0);
        }
    });

    test("value sets the value of the range", function() {
        range.value("foo");

        equal(sheet._values.iterator(0,0).at(0), "foo");
    });

    test("value sets the value of a multiple row range", function() {
        range = new kendo.spreadsheet.Range(sheet, 0, 0, 2);

        range.value("foo");

        equal(sheet._values.iterator(0, 3).at(1), "foo");
        equal(sheet._values.iterator(0, 3).at(2), null);
    });

    test("value sets the value of a multiple row and column range", function() {
        range = new kendo.spreadsheet.Range(sheet, 0, 0, 2, 2);

        range.value("foo");

        equal(sheet._values.iterator(0, 3).at(3), "foo");
        equal(sheet._values.iterator(0, 3).at(2), null);
    });

    test("value returns the value of the range", function() {
        range.value("foo");

        equal(range.value(), "foo");
    });

    test("background returns the background of a range", function() {
        range.background("foo");

        equal(range.background(), "foo");
    });

})();
