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
})();
