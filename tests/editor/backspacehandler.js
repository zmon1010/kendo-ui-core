(function(){

    var editor;
    var BackspaceHandler = kendo.ui.editor.BackspaceHandler;
    var defaultPrevented;

    editor_module("editor backspace handler", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.focus();
            defaultPrevented = false;
        }
    });

    function handleBackspace() {
        var handler = new BackspaceHandler(editor);

        handler.keydown({
            preventDefault: function() {
                defaultPrevented = true;
            },
            keyCode: kendo.keys.BACKSPACE
        });
    }

    test("removes selected content", function() {
        editor.selectRange(createRangeFromText(editor, 'foo|bar|baz'));

        handleBackspace();

        equal(editor.value(), "foobaz");
    });

    test("removes table content", function() {
        var range = createRangeFromText(editor, '|<table><tr><td>foo</td><td>bar</td></tr></table>|');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '');
    });

    test("removes table content", function() {
        var range = createRangeFromText(editor, '<table><tr><td>|foo</td><td>bar|</td></tr></table>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '');
    });

    test("removes all bom characters before caret without preventing default action", function() {
        var range = createRangeFromText(editor, 'foo\ufeff\ufeff||bar');
        editor.selectRange(range);

        handleBackspace();

        var text = editor.body.firstChild;

        equal(text.nodeValue.replace(/\ufeff/g, "BOM"), "foobar");
        ok(!defaultPrevented);
    });

    test("converts empty list to paragraph", function() {
        var range = createRangeFromText(editor, '<ul><li>\ufeff||foo</li></ul>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), "<p>foo</p>");
        ok(defaultPrevented);
    });

    test("caret position is kept in element", function() {
        editor.value('<ul><li><em>foo</em></li></ul>');
        var range = editor.createRange();
        range.setStart(editor.body.firstChild.firstChild.firstChild.firstChild, 0);
        range.collapse(true);
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<p><em><a></a>foo</em></p>");
    });

}());
