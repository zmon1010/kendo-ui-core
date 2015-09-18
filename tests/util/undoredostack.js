(function(){

var undoRedoStack;

module("UndoRedoStack", {
    setup: function() {
        undoRedoStack = new kendo.util.UndoRedoStack();
    }
});

function command() {
    return {
        undo: spy(),
        redo: spy()
    };
}

test("stack is initially empty", function() {
    ok(!undoRedoStack.canUndo());
    ok(!undoRedoStack.canRedo());
});

test("canUndo returns true after command is pushed in stack", function() {
    undoRedoStack.push({});

    ok(undoRedoStack.canUndo());
    ok(!undoRedoStack.canRedo());
});

test("canRedo returns true after undo", function() {
    undoRedoStack.push(command());
    undoRedoStack.undo();

    ok(undoRedoStack.canRedo());
});

test("canUndo returns false when at the bottom of the stack", function() {
    undoRedoStack.push(command());
    undoRedoStack.undo();

    ok(!undoRedoStack.canUndo());
});

test("canRedo returns false when a new command is pushed", function() {
    undoRedoStack.push(command());
    undoRedoStack.undo();
    undoRedoStack.push(command());

    ok(!undoRedoStack.canRedo());
    ok(undoRedoStack.canUndo());
});

test("undo delegates undo to current command", function() {
    var c = command();

    undoRedoStack.push(c);
    undoRedoStack.undo();

    equal(c.undo.calls, 1);
});

test("redo delegates to exec to current command", function() {
    var c = command();

    undoRedoStack.push(c);
    undoRedoStack.undo();
    undoRedoStack.redo();

    equal(c.redo.calls, 1);
    ok(!undoRedoStack.canRedo());
    ok(undoRedoStack.canUndo());
});

test("redo does not delegate to exec when at top of stack", function() {
    var c = command();

    undoRedoStack.push(c);
    undoRedoStack.redo();

    ok(!c.redo.calls);
});

test("canUndo is true after undoing the second command", function() {
    undoRedoStack.push(command());
    undoRedoStack.push(command());
    undoRedoStack.undo();

    ok(undoRedoStack.canUndo());
});

test("clear clears stack", function() {
    undoRedoStack.push(command());
    undoRedoStack.clear();

    ok(!undoRedoStack.canUndo());
});

test("undo triggers undo event", function() {
    var handler = spy();
    var c = command();
    undoRedoStack.bind("undo", handler);
    undoRedoStack.push(c);
    undoRedoStack.undo();

    equal(handler.calls, 1);
    deepEqual(handler.args[0][0].command, c);
});

test("redo triggers redo event", function() {
    var handler = spy();
    var c = command();
    undoRedoStack.bind("redo", handler);
    undoRedoStack.push(c);
    undoRedoStack.undo();
    undoRedoStack.redo();

    equal(handler.calls, 1);
    deepEqual(handler.args[0][0].command, c);
});

}());
