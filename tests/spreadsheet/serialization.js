(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet serialization", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
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
        equal(json.rows[0].cells[0].style.background, "red");
    });

    test("toJSON doesn't serialize null value", function() {
        sheet.range("B2").background("red");
        var json = sheet.toJSON();

        ok(!json.rows[0].cells[0].hasOwnProperty("value"));
    });

    test("toJSON doesn't serialize empty style", function() {
        sheet.range("B2").value("foo");
        var json = sheet.toJSON();

        ok(!json.rows[0].cells[0].hasOwnProperty("style"));
    });
})();
