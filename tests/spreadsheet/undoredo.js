(function() {
    var sheet;
    var spreadsheet;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Spreadsheet undo/redo", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();

            sheet.range("A1").select();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("stack is available", function() {
        ok(spreadsheet._workbook.undoRedoStack instanceof kendo.util.UndoRedoStack);
    });

    test("execute pushes command to undo/redo stack", function() {
        spreadsheet._workbook.execute({ command: "EditCommand", options: { value: "bar" } });

        ok(spreadsheet._workbook.undoRedoStack.canUndo());
    });

    ///// formulas

    test("undo after insert restores formulas", function(){
        sheet.range("A1").formula("sum(B1:B3)");
        sheet.range("2:2").select();
        sheet._workbook.execute({ command: "AddRowCommand", options: { value: "above" } });
        equal(sheet.range("A1").formula(), "sum(B1:B4)"); // it's updated
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").formula(), "sum(B1:B3)"); // it's back
    });

    test("undo after delete restores null references in formulas", function(){
        sheet.range("A1").formula("sum(B1:B3)");
        sheet.range("B:B").select();
        sheet._workbook.execute({ command: "DeleteColumnCommand" });
        equal(sheet.range("A1").formula(), "sum(#NULL!)"); // becomes null
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").formula(), "sum(B1:B3)"); // it's back
    });

    test("undo after insert restores formulas in another sheet", function(){
        sheet.range("A1").formula("sum(Sheet2!B1:B3)");
        var sheet2 = spreadsheet.insertSheet({ name: "Sheet2" });
        spreadsheet.activeSheet(sheet2);
        sheet2.range("2:2").select();
        sheet2._workbook.execute({ command: "AddRowCommand", options: { value: "above" } });
        equal(sheet.range("A1").formula(), "sum(Sheet2!B1:B4)"); // it's updated
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").formula(), "sum(Sheet2!B1:B3)"); // it's back
    });

    test("undo after delete restores null references in formulas in another sheet", function(){
        sheet.range("A1").formula("sum(Sheet2!B1:B3)");
        var sheet2 = spreadsheet.insertSheet({ name: "Sheet2" });
        spreadsheet.activeSheet(sheet2);
        sheet2.range("B:B").select();
        sheet2._workbook.execute({ command: "DeleteColumnCommand" });
        equal(sheet.range("A1").formula(), "sum(#NULL!)"); // becomes null
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").formula(), "sum(Sheet2!B1:B3)"); // it's back
    });

    ///// validations

    test("undo after insert restores validations", function(){
        sheet.range("A1").validation({
            dataType: "list",
            from: "B1:B3"
        });
        sheet.range("2:2").select();
        sheet._workbook.execute({ command: "AddRowCommand", options: { value: "above" } });
        equal(sheet.range("A1").validation().from, "B1:B4"); // it's updated
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").validation().from, "B1:B3"); // it's back
    });

    test("undo after delete restores null references in validations", function(){
        sheet.range("A1").validation({
            dataType: "list",
            from: "B1:B3"
        });
        sheet.range("B:B").select();
        sheet._workbook.execute({ command: "DeleteColumnCommand" });
        equal(sheet.range("A1").validation().from, "#NULL!"); // becomes null
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").validation().from, "B1:B3"); // it's back
    });

    test("undo after insert restores validations in another sheet", function(){
        sheet.range("A1").validation({
            dataType: "list",
            from: "Sheet2!B1:B3"
        });
        var sheet2 = spreadsheet.insertSheet({ name: "Sheet2" });
        spreadsheet.activeSheet(sheet2);
        sheet2.range("2:2").select();
        sheet2._workbook.execute({ command: "AddRowCommand", options: { value: "above" } });
        equal(sheet.range("A1").validation().from, "Sheet2!B1:B4"); // it's updated
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").validation().from, "Sheet2!B1:B3"); // it's back
    });

    test("undo after delete restores null references in validations in another sheet", function(){
        sheet.range("A1").validation({
            dataType: "list",
            from: "Sheet2!B1:B3"
        });
        var sheet2 = spreadsheet.insertSheet({ name: "Sheet2" });
        spreadsheet.activeSheet(sheet2);
        sheet2.range("B:B").select();
        sheet2._workbook.execute({ command: "DeleteColumnCommand" });
        equal(sheet.range("A1").validation().from, "#NULL!"); // becomes null
        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A1").validation().from, "Sheet2!B1:B3"); // it's back
    });

    test("undo after delete row restores contents of the entire row", function(){
        sheet.range("3:3").value("foo");
        sheet.range("C3").select();
        sheet._workbook.execute({ command: "DeleteRowCommand" });
        sheet._workbook.undoRedoStack.undo();
        equal(sheet.range("A3").value(), "foo");
    });

    test("undo after delete column restores contents of the entire column", function(){
        sheet.range("C:C").value("foo");
        sheet.range("C3").select();
        sheet._workbook.execute({ command: "DeleteColumnCommand" });
        sheet._workbook.undoRedoStack.undo();
        equal(sheet.range("C1").value(), "foo");
    });

})();
