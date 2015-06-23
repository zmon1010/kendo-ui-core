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

    test("sets the cell values according to formula", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("A3").formula("=(A1+A2)")

        equal(sheet.range("A3").value(), 3);
    });

    test("updates cell value when formula argument changes", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("A3").formula("=(A1+A2)")
        sheet.range("A2").value(3);

        equal(sheet.range("A3").value(), 4);
    });

    test("updates cell value when dependend formula changes", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("A3").formula("=(A1+A2)")
        sheet.range("A4").formula("=(A3+0)")
        sheet.range("A2").value(3);

        equal(sheet.range("A4").value(), 4);
    });
})();
