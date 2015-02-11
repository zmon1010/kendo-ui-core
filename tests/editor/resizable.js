(function(){

var Editor = kendo.ui.Editor;
var editor, textarea, div;

module("editor resizable option", {
    setup: function() {
        textarea = $("<textarea />").appendTo(QUnit.fixture);
        div = $("<div contentEditable />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

function resizeHandle() {
    return (editor.wrapper || editor.element).find(".k-resize-handle");
}

test("renders resize handle", function() {
    editor = new Editor(textarea, { resizable: true });

    equal(resizeHandle().length, 1);
});

test("does not render resize handle on inline editor", function() {
    editor = new Editor(div, { resizable: true });

    equal(resizeHandle().length, 0);
});

test("does not render resize handle if false", function() {
    editor = new Editor(textarea, { resizable: false });

    equal(resizeHandle().length, 0);
});

test("initializes resizable on editor wrapper", function() {
    editor = new Editor(textarea, { resizable: true });

    ok(editor.wrapper.data("kendoResizable"));
});

function initReizableEditor() {
    editor = new Editor(textarea, { resizable: true });

    return editor.wrapper.data("kendoResizable");
}

test("adds overlay during resizing", function() {
    editor = new Editor(textarea, { resizable: true });

    var resizable = editor.wrapper.data("kendoResizable");

    resizable.press(resizeHandle());
    resizable.move(10);

    equal(editor.wrapper.find(".k-overlay").length, 1);

    resizable.end();

    equal(editor.wrapper.find(".k-overlay").length, 0);
});

test("passes options to resizable", function() {
    editor = new Editor(textarea, {
        resizable: {
            min: 123,
            max: 1021
        }
    });

    var resizable = editor.wrapper.data("kendoResizable");

    equal(resizable.options.min, 123);
    equal(resizable.options.max, 1021);
});

}());
