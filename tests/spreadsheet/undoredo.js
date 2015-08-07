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

    test("changing formulaBar pushes command to undoRedo stack", function() {
        spreadsheet._view.formulaBar.trigger("change", { value: "foo" });

        ok(spreadsheet._workbook.undoRedoStack.canUndo());
    });

    test("execute pushes command to undo/redo stack", function() {
        var command = new kendo.spreadsheet.EditCommand({ value: "bar" });

        spreadsheet._workbook.execute(command);

        ok(spreadsheet._workbook.undoRedoStack.canUndo());
    });
})();
