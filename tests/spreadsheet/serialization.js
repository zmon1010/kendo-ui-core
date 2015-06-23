(function() {
    var sheet;
    var spreadsheet;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet serialization", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
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

    test("toJSON serializes rows with non-default height", function() {
        sheet.rowHeight(1, 33);

        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].height, 33);
        equal(json.rows[0].index, 1);
    });

    test("toJSON serializes rows with non-default height and their cells", function() {
        sheet.rowHeight(1, 33);
        sheet.range("A2").value("foo");

        var json = sheet.toJSON();

        equal(json.rows.length, 1);
        equal(json.rows[0].height, 33);
        equal(json.rows[0].index, 1);
        equal(json.rows[0].cells.length, 1);
    });

    test("toJSON serializes columns with non-default width", function() {
        sheet.columnWidth(1, 33);

        var json = sheet.toJSON();

        equal(json.columns.length, 1);
        equal(json.columns[0].width, 33);
        equal(json.columns[0].index, 1);
    });

    test("toJSON serializes the sheets of the spreadsheet", function() {
        var json = spreadsheet.toJSON();

        equal(json.sheets.length, 1);
        equal(json.sheets[0].rows.length, 0);
    });

})();
