(function() {
    var sheet;
    var sheet2;
    var spreadsheet;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet serialization", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();
            sheet2 = spreadsheet.insertSheet({ name: "Sheet2" });
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("sets the cell values according to formula", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("A3").formula("(A1+A2)")

        equal(sheet.range("A3").value(), 3);
    });

    test("updates cell value when formula argument changes", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("A3").formula("(A1+A2)")
        sheet.range("A2").value(3);

        equal(sheet.range("A3").value(), 4);
    });

    test("updates cell value when dependend formula changes", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("A3").formula("(A1+A2)")
        sheet.range("A4").formula("(A3+0)")
        sheet.range("A2").value(3);

        equal(sheet.range("A4").value(), 4);
    });

    test("updates adjacent cells when receiving a matrix", function(){
        sheet.range("A1").formula("{1,2;3,4}*2");
        equal(sheet.range("A1").value(), 2);
        equal(sheet.range("B1").value(), 4);
        equal(sheet.range("A2").value(), 6);
        equal(sheet.range("B2").value(), 8);
    });

    test("sorting recalculates the formulas", function() {
        sheet.range("A1").value(1);
        sheet.range("A2").value(2);
        sheet.range("B1").formula("(A1+0)");
        sheet.range("A1:A2").sort({ column: 0, ascending: false});
        equal(sheet.range("B1").value(), 2);
    });

    test("insertRow / deleteRow adjusts formula", function(){
        sheet.range("D2").formula("sum(A1:C3)");
        sheet.insertRow(1);
        equal(sheet.range("D3").formula(), "sum(A1:C4)");
        sheet.insertRow(0);
        equal(sheet.range("D4").formula(), "sum(A2:C5)");
        sheet.insertRow(5);
        equal(sheet.range("D4").formula(), "sum(A2:C5)");
        sheet.insertRow(4);
        equal(sheet.range("D4").formula(), "sum(A2:C6)");
        sheet.deleteRow(4);
        equal(sheet.range("D4").formula(), "sum(A2:C5)");
        sheet.deleteRow(1);
        equal(sheet.range("D3").formula(), "sum(A2:C4)");
        sheet.deleteRow(3);
        equal(sheet.range("D3").formula(), "sum(A2:C3)");
        sheet.deleteRow(1);
        equal(sheet.range("D2").formula(), "sum(A2:C2)");
    });

    test("insertColumn / deleteColumn adjusts formulas", function(){
        sheet.range("H1").formula("sum(A1:D5)");
        equal(sheet.range("H1").value(), 0);
        sheet.range("A1:D5").value(5);
        equal(sheet.range("H1").value(), 100);
        sheet.insertColumn(1);
        equal(sheet.range("I1").formula(), "sum(A1:E5)");
        sheet.insertColumn(0);
        equal(sheet.range("J1").formula(), "sum(B1:F5)");
        sheet.deleteColumn(0);
        equal(sheet.range("I1").formula(), "sum(A1:E5)");
        sheet.deleteColumn(0);
        equal(sheet.range("H1").formula(), "sum(A1:D5)");
        sheet.deleteColumn(3);
        equal(sheet.range("G1").formula(), "sum(A1:C5)");
        equal(sheet.range("G1").value(), 50);
    });

    test("insert/delete row/col keeps cross-sheet references", function(){
        sheet.range("C3").formula("sum(Sheet2!A1:C3)");
        sheet.insertColumn(1);
        equal(sheet.range("D3").formula(), "sum(Sheet2!A1:C3)");
        sheet.deleteColumn(1);
        equal(sheet.range("C3").formula(), "sum(Sheet2!A1:C3)");
        sheet.insertRow(1);
        equal(sheet.range("C4").formula(), "sum(Sheet2!A1:C3)");
        sheet.deleteRow(1);
        equal(sheet.range("C3").formula(), "sum(Sheet2!A1:C3)");
    });

    test("insert/delete row/col updates cross-sheet references", function(){
        sheet.range("C3").formula("sum(Sheet2!A1:C3)");
        sheet2.insertColumn(1);
        equal(sheet.range("C3").formula(), "sum(Sheet2!A1:D3)");
        sheet2.deleteColumn(0);
        equal(sheet.range("C3").formula(), "sum(Sheet2!A1:C3)");
        sheet2.insertRow(1);
        equal(sheet.range("C3").formula(), "sum(Sheet2!A1:C4)");
        sheet2.deleteRow(0);
        equal(sheet.range("C3").formula(), "sum(Sheet2!A1:C3)");
    });

    test("a formula containing invalid refs produces #REF! error", function(){
        sheet.range("A1:B2").values([
            [ 3, 4 ],
            [ 5, 6 ]
        ]);
        sheet.range("C3").formula("sum(A2:B2)");
        sheet.range("C1:C2").fillFrom("C3");
        var values = sheet.range("C1:C3").values();
        ok(values[0][0] instanceof kendo.spreadsheet.CalcError && values[0][0] == "#REF!");
        equal(values[1][0], 7);
        equal(values[2][0], 11);
    });

})();
