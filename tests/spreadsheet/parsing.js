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

        equal(sheet._values.value(0, 0), 2);
        equal(sheet._types.value(0, 0), "date");
    });

    test("returns date objects", function() {
        var date = new Date("1/1/1900");
        range.value(date);
        equal(range.value().toUTCString(), date.toUTCString());
    })

    test("stores number type", function() {
        range.value(1);

        equal(sheet._types.value(0, 0), "number");
    });

    test("stores string type", function() {
        range.value("foo");

        equal(sheet._types.value(0, 0), "string");
    });

    test("stores boolean type", function() {
        range.value(true);

        equal(sheet._types.value(0, 0), "boolean");
    });

    test("parses the string TRUE as a boolean", function() {
        range.value("TRUE");

        equal(sheet._values.value(0, 0), true);
        equal(sheet._types.value(0, 0), "boolean");
    });

    test("parses the string FALSE as a boolean", function() {
        range.value("FALSE");

        equal(sheet._values.value(0, 0), false);
        equal(sheet._types.value(0, 0), "boolean");
    });

    test("parses numeric strings as numbers", function() {
        range.value("1.2");

        equal(sheet._values.value(0, 0), 1.2);
        equal(sheet._types.value(0, 0), "number");
    });

    test("parses date strings as numbers", function() {
        range.value("1/1/1990");

        equal(sheet._types.value(0, 0), "date");
    });

    test("number string escaping", function() {
        range.value("'1.2");

        equal(sheet._values.value(0, 0), "1.2");
        equal(sheet._types.value(0, 0), "string");
    });
})();
