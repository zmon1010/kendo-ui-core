(function(){

    var editor;
    var BackspaceHandler = kendo.ui.editor.BackspaceHandler;
    var defaultPrevented;

    editor_module("editor backspace handler", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            defaultPrevented = false;
        }
    });

    function handleKey(key) {
        return function() {
            var handler = new BackspaceHandler(editor);

            handler.keydown({
                preventDefault: function() {
                    defaultPrevented = true;
                },
                keyCode: key
            });
        };
    }

    var handleBackspace = handleKey(kendo.keys.BACKSPACE);
    var handleDelete = handleKey(kendo.keys.DELETE);

    test("removes selected content", function() {
        editor.selectRange(createRangeFromText(editor, 'foo|bar|baz'));

        handleBackspace();

        equal(editor.value(), "foobaz");
    });

    test("removes table content from complete selection", function() {
        var range = createRangeFromText(editor, '|<table><tr><td>foo</td><td>bar</td></tr></table>|');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '');
    });

    test("removes table content from partially selection", function() {
        var range = createRangeFromText(editor, '<table><tr><td><em>f|oo</em></td><td>test</td><td>b|ar</td></tr></table>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<table><tbody><tr><td><em>f</em></td><td>&nbsp;</td><td>ar</td></tr></tbody></table>');
    });

    test("removes fully selected anchor when selection ends outside the element", function() {
        var range = createRangeFromText(editor, 'foo <a src="#">|test text</a>| baz');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foo baz');
    });

    test("removes anchor when selection is outside the element", function() {
        var range = createRangeFromText(editor, 'foo |<a src="#">test text</a>| baz');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foo baz');
    });

    test("removes anchor when selection is outside the element", function() {
        var range = createRangeFromText(editor, 'foo |<a src="#">test text</a>| baz');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foo baz');
    });

    test("anchor remains when text is partially selected from start", function() {
        var range = createRangeFromText(editor, 'foo <a src="#">|test| text</a> baz');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foo <a src="#"> text</a> baz');
    });

    test("anchor remains when text is partially selected to end", function() {
        var range = createRangeFromText(editor, 'foo <a src="#">test| text|</a> baz');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foo <a src="#">test</a> baz');
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

    test("unwraps block to text node", function() {
        editor.value('foo <p>bar</p>');
        var range = editor.createRange();
        range.setStart(editor.body.childNodes[1].firstChild, 0);
        range.collapse(true);
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "foo <a></a>bar");
    });

    test("unwraps block to text node by skipping whitespace", function() {
        editor.value('foo \ufefe<p>bar</p>');
        var range = editor.createRange();
        range.setStart(editor.body.childNodes[1].firstChild, 0);
        range.collapse(true);
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "foo \ufefe<a></a>bar");
    });

    test("does not change selection unnecessarily", function() {
        editor.selectRange(createRangeFromText(editor, 'foo||bar'));

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "foo<a></a>bar");
    });

    test("delete clears table contents", function() {
        var range = createRangeFromText(editor, '<table><tr><td>fo|o</td><td>b|ar</td></tr></table>');
        editor.selectRange(range);

        handleDelete();

        equal(editor.value(), '<table><tbody><tr><td>fo</td><td>ar</td></tr></tbody></table>');
    });

    test("backspace at start of element joins it with previous", function() {
        editor.value('<h3>foo</h3><h3>bar</h3>');
        var range = editor.createRange();
        range.setStart($("h3", editor.body)[1].firstChild, 0);
        range.collapse(true);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<h3>foobar</h3>');

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), '<h3>foo<a></a>bar</h3>');
    });

    test("at the start of block element should update the range", function() {
        editor.value('<h3>123</h3><h3>456</h3>');
        var firstBlockElement = $(editor.body).find("h3")[0];
        var range = editor.createRange();
        range.setStart($(editor.body).find("h3")[1].firstChild, 0);
        range.setEnd($(editor.body).find("h3")[1].firstChild, 0);
        editor.selectRange(range);

        handleBackspace();

        assertRange(editor.getRange(), {
            commonAncestorContainer: firstBlockElement,
            startContainer: firstBlockElement,
            endContainer: firstBlockElement,
            startOffset: 1,
            endOffset: 1
        });
    });

    test("at the start of a block element should join it with previous by skipping whitespace", function() {
        editor.value('<p id="block1">123</p>\ufeff<p id="block2">45</p><p>6789</p>');
        var range = editor.createRange();
        range.setStart($(editor.body).find("#block2")[0].firstChild, 0);
        range.setEnd($(editor.body).find("#block2")[0].firstChild, 0);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<p id="block1">12345</p><p>6789</p>');
    });

    test("at the start of a block element before whitespace should update the range", function() {
        editor.value('<p id="block1">123</p>\ufeff<p id="block2">45</p><p>6789</p>');
        var firstBlockElement = $(editor.body).find("#block1")[0];
        var range = editor.createRange();
        range.setStart($(editor.body).find("#block2")[0].firstChild, 0);
        range.setEnd($(editor.body).find("#block2")[0].firstChild, 0);
        editor.selectRange(range);

        handleBackspace();

        assertRange(editor.getRange(), {
            commonAncestorContainer: firstBlockElement,
            startContainer: firstBlockElement,
            endContainer: firstBlockElement,
            startOffset: 1,
            endOffset: 1
        });
    });

    test("at the first element of the content area should not delete content", function() {
        editor.value('<p id="block1">123</p>');
        var range = editor.createRange();
        range.setStart($(editor.body).find("#block1")[0].firstChild, 0);
        range.setEnd($(editor.body).find("#block1")[0].firstChild, 0);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<p id="block1">123</p>');
    });

    test("at the first element of the content area before whitespace should not delete content", function() {
        editor.value('\ufeff<p id="block1">123</p>');
        var range = editor.createRange();
        range.setStart($(editor.body).find("#block1")[0].firstChild, 0);
        range.setEnd($(editor.body).find("#block1")[0].firstChild, 0);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<p id="block1">123</p>');
    });

    test("at the first element of the content area before whitespace should not change range", function() {
        editor.value('\ufeff<p id="block1">123</p>');
        var range = editor.createRange();
        range.setStart($(editor.body).find("#block1")[0].firstChild, 0);
        range.setEnd($(editor.body).find("#block1")[0].firstChild, 0);
        editor.selectRange(range);

        handleBackspace();

        assertRange(editor.getRange(), range);
    });

    test("prevents default action if handling range selection", function() {
        var range = createRangeFromText(editor, '<p>foo |bar |baz</p>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), "<p>foo baz</p>");
    });

    test("fully removes selected content", function() {
        var range = createRangeFromText(editor, '<p>fo|o</p><p>b|ar</p>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), "<p>foar</p>");
    });

    test("positions cursor at location of removed content", function() {
        var range = createRangeFromText(editor, '<p>fo|o</p><p>b|ar</p>');
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<p>fo<a></a>ar</p>");
    });

    test("does not join table cells", function() {
        var range = createRangeFromText(editor, '<table><tbody><tr><td>fo|o</td><td>b|ar</td></tbody></table>');
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<table><tbody><tr><td>fo<a></a></td><td>ar</td></tr></tbody></table>");
    });

    test("joins header and paragraph", function() {
        var range = createRangeFromText(editor, '<h1>fo|o</h1><p>b|ar</p>');
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<h1>fo<a></a>ar</h1>");
    });

    test("positions cursor when deleting data", function() {
        var range = createRangeFromText(editor, '<p>fo|ob|ar</p>');
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<p>fo<a></a>ar</p>");
    });

    test("positions cursor when deleting data at start", function() {
        var range = createRangeFromText(editor, '<p>|foob|ar</p>');
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<p><a></a>ar</p>");
    });

    test("joins paragraphs upon delete", function() {
        var range = createRangeFromText(editor, '<p>foo||</p><p>bar</p>');
        editor.selectRange(range);

        handleDelete();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<p>foo<a></a>bar</p>");
    });

    test("does not attempt to join at end of content", function() {
        var range = createRangeFromText(editor, '<p>foo||</p>');
        editor.selectRange(range);

        handleDelete();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), "<p>foo<a></a></p>");
    });

    test("fully removes paragraphs", function() {
        var range = createRangeFromText(editor, '<p></p><p></p><p>||</p>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<p>&nbsp;</p><p>&nbsp;</p>');
    });

    test("unwraps empty list", function() {
        var range = createRangeFromText(editor, '<ul><li>||</li></ul>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '');
    });

    test("does not unwrap complete ul", function() {
        var range = createRangeFromText(editor, '<ul><li><em>||</em></li><li>foo</li></ul>');
        editor.selectRange(range);

        handleBackspace();

        editor.getRange().insertNode(editor.document.createElement("a"));

        equal(editor.value(), '<p><em><a></a></em></p><ul><li>foo</li></ul>');
    });

    test("does not delete li", function() {
        var range = createRangeFromText(editor, '<ul><li>foo</li><li>||</li></ul>');
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<ul><li>foo</li></ul>');
    });

    test("removing empty paragraph should not insert bom and set caret after the li", function() {
        var range = createRangeFromText(editor, '<ul><li>test</li></ul><p>||</p>');
        editor.selectRange(range);

        handleBackspace();

        var list = $(editor.body).find("ul").get(0);
        equal(list.childNodes.length, 1);
    });

    test("selection starts from immutable element", function() {
        var range = createRangeFromText(editor, 'test<span contenteditable="false">immutab|le</span><span>test |test</span>');
        editor.selectRange(range);

        withMock(kendo.ui.Editor.fn, "selectRange", $.noop, function() {
            editor.immutables = new kendo.ui.editor.Immutables(editor);
            handleBackspace();
            delete editor.immutables;
        });

        notOk($(editor.body).find("[contenteditable]").length);
    });

    test("unlink command after link", function() {
        editor.value('foo <a>test</a> baz');
        var range = editor.createRange();
        range.setStart(editor.body.getElementsByTagName("a")[0], 1);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foo test baz');
    });

    test("unlink command after link with nested elements", function() {
        editor.value('<a><span><strong>test</strong></span></a>');
        var range = editor.createRange();
        range.setStart(editor.body.getElementsByTagName("a")[0], 1);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<span><strong>test</strong></span>');
    });

    test("unlink command after empty link", function() {
        editor.value('foo<a></a>baz');
        var range = editor.createRange();
        range.setStart(editor.body.getElementsByTagName("a")[0], 0);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), 'foobaz');
    });

    test("unlink command between two links", function() {
        editor.value('<p>before <a href="http://test.com" title="test1">link1</a><a href="http://test.com" title="test2">link2</a> after</p>');
        var range = editor.createRange();
        var p = editor.body.getElementsByTagName("p")[0];
        range.setStart(p, 2);
        range.setEnd(p, 2);
        editor.selectRange(range);

        handleBackspace();

        equal(editor.value(), '<p>before link1<a href="http://test.com" title="test2">link2</a> after</p>');
    });
}());
