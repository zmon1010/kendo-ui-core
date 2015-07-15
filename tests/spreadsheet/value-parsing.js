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

    test("parses the string TRUE as a boolean", function() {
        range.value("TRUE");

        equal(sheet._properties.get("value", 0), true);
    });

    test("parses the string FALSE as a boolean", function() {
        range.value("FALSE");

        equal(sheet._properties.get("value", 0), false);
    });

    test("parses numeric strings as numbers", function() {
        range.value("1.2");

        equal(sheet._properties.get("value", 0), 1.2);
    });

    test("prevent parsing", function() {
        range.value("1.2", false);

        equal(sheet._properties.get("value", 0), "1.2");
    });

    test("parses date strings as numbers", function() {
        range.value("1/1/1899");

        equal(typeof sheet._properties.lists["value"].value(0, 0), "number");
    });

    test("number string escaping", function() {
        range.value("'1.2");

        equal(sheet._properties.get("value", 0), "1.2");
    });
})();
