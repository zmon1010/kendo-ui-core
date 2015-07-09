(function() {
    var sheet;
    var spreadsheet;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Spreadsheet undo/redo", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();
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
})();
