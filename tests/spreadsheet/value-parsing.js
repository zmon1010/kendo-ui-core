(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var range;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
            range = sheet.range(0, 0);
        },
        teardown: function() {
            sheet.unbind();
        }
    });

    test("dates are stored as numbers", function() {
        var date = new Date("1/1/1900");

        range.value(date);

        equal(sheet._properties.lists["value"].value(0, 0), 2);
        equal(sheet._properties.get("format", 0), "m/d/yyyy");
    });

})();
