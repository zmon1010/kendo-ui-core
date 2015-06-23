(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet formulas", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
                defaults.rowHeight, defaults.columnWidth);

            sheet.name("sheet1");
            sheet.context(new kendo.spreadsheet.FormulaContext({ "sheet1": sheet }));
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
        sheet.range("A4").formula("=(A3)")
        sheet.range("A2").value(3);

        equal(sheet.range("A4").value(), 4);
    });
})();
