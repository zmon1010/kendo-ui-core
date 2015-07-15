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
        ok(spreadsheet.undoRedoStack instanceof kendo.util.UndoRedoStack);
    });

    test("changing formulaBar pushes command to undoRedo stack", function() {
        spreadsheet.formulaBar.trigger("change", { value: "foo" });

        ok(spreadsheet.undoRedoStack.canUndo());
    });

    test("execute pushes command to undo/redo stack", function() {
        var command = new kendo.spreadsheet.EditCommand({ value: "bar" });

        spreadsheet.execute(command);

        ok(spreadsheet.undoRedoStack.canUndo());
    });
})();
