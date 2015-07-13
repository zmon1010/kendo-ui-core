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
        equal(sheet._properties.get("type", 0), "date");
    });

    test("sets type of multiple values", function() {
        sheet.range("A1:B2").values([
            [1, "foo"],
            [new Date(), "TRUE"]
        ]);

        equal(sheet._properties.get("type", 0), "number");
        equal(sheet._properties.get("type", 1), "date");
        equal(sheet._properties.get("type", 3), "string");
        equal(sheet._properties.get("type", 4), "boolean");
    });

    test("returns date objects", function() {
        var date = new Date("1/1/1900");
        range.value(date);
        equal(range.value().toUTCString(), date.toUTCString());
    });

    test("values returns date objects", function() {
        var date = new Date("1/1/1900");
        range.value(date);
        equal(range.values()[0][0].toUTCString(), date.toUTCString());
    });

    test("stores number type", function() {
        range.value(1);

        equal(sheet._properties.get("type", 0), "number");
    });

    test("stores string type", function() {
        range.value("foo");

        equal(sheet._properties.get("type", 0), "string");
    });

    test("stores boolean type", function() {
        range.value(true);

        equal(sheet._properties.get("type", 0), "boolean");
    });

    test("parses the string TRUE as a boolean", function() {
        range.value("TRUE");

        equal(sheet._properties.get("value", 0), true);
        equal(sheet._properties.get("type", 0), "boolean");
    });

    test("parses the string FALSE as a boolean", function() {
        range.value("FALSE");

        equal(sheet._properties.get("value", 0), false);
        equal(sheet._properties.get("type", 0), "boolean");
    });

    test("parses numeric strings as numbers", function() {
        range.value("1.2");

        equal(sheet._properties.get("value", 0), 1.2);
        equal(sheet._properties.get("type", 0), "number");
    });

    test("prevent parsing", function() {
        range.value("1.2", false);

        equal(sheet._properties.get("value", 0), "1.2");
        equal(sheet._properties.get("type", 0), "string");
    });

    test("parses date strings as numbers", function() {
        range.value("1/1/1990");

        equal(sheet._properties.get("type", 0), "date");
    });

    test("number string escaping", function() {
        range.value("'1.2");

        equal(sheet._properties.get("value", 0), "1.2");
        equal(sheet._properties.get("type", 0), "string");
    });
})();
