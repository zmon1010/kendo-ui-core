(function(){

var editor;

var CleanFormatCommand = kendo.ui.editor.CleanFormatCommand;

editor_module("editor clean format command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.focus();
   }
});

function cleanCommand(range) {
    var command = new CleanFormatCommand({ range: range });
    command.editor = editor;
    return command;
}

function selectAll(editor) {
    var range = editor.createRange();

    range.selectNodeContents(editor.body);

    return range;
}

function cleanedContent(html) {
    editor.value(html);

    var range = selectAll(editor);

    var command = cleanCommand(range);
    command.exec();

    return editor.value();
}

function cleanMarkedContent(html) {
    var range = createRangeFromText(editor, html);

    var command = cleanCommand(range);
    command.exec();

    return editor.value();
}

test("removes strong tag", function() {
    equal(cleanedContent('<strong>foo</strong>'), 'foo');
});

test("removes multiple elements", function() {
    equal(cleanedContent('<strong>foo</strong><em>bar</em>'), 'foobar');
});

test("removes span tags", function() {
    equal(cleanedContent('<span style="color: #f00">foo</span>'), 'foo');
});

test("removes nested formatting", function() {
    equal(cleanedContent('<strong>foo<em>bar</em></strong>'), 'foobar');
});

test("removes deeply nested formatting", function() {
    equal(cleanedContent('<strong>foo<em>bar<span style="color: #f00">baz</span></em></strong>'), 'foobarbaz');
});

test("keeps paragraphs", function() {
    equal(cleanedContent('<p>foo<em>bar</em></p>'), '<p>foobar</p>');
});

test("removes style attributes", function() {
    equal(cleanedContent('<p style="color: #f00;">foo</p>'), '<p>foo</p>');
});

test("removes style attributes of fully selected nodes", function() {
    equal(
        cleanMarkedContent(
            '<p style="color: #f00;">|foo</p>' +
            '<p style="color: #00f;">bar|</p>'
        ),

        '<p>foo</p><p>bar</p>'
    );
});

test("removes class attribute", function() {
    equal(cleanedContent('<p class="red">foo</p>'), '<p>foo</p>');
});

test("removes superscript", function() {
    equal(cleanedContent('<p><sup>foo</sup></p>'), '<p>foo</p>');
});

test("removes subscript", function() {
    equal(cleanedContent('<p><sub>foo</sub></p>'), '<p>foo</p>');
});

test("removes strikethrough", function() {
    equal(cleanedContent('<p><del>foo</del></p>'), '<p>foo</p>');
});

test("unwraps lists", function() {
    equal(cleanedContent('<ul><li>foo</li></ul>'), '<p>foo</p>');
    equal(cleanedContent('<ul><li>foo</li><li>bar</li></ul>'), '<p>foo</p><p>bar</p>');
    equal(cleanedContent('<ul><li>foo<ul><li>bar</li></ul></li></ul>'), '<p>foo</p><p>bar</p>');

    equal(cleanedContent('<ol><li>foo</li></ol>'), '<p>foo</p>');
    equal(cleanedContent('<ol><li>foo</li><li>bar</li></ol>'), '<p>foo</p><p>bar</p>');
});

test("clean single list items", function() {
    equal(cleanMarkedContent('<ul><li>f|o|o</li><li>bar</li></ul>'), '<p>foo</p><ul><li>bar</li></ul>');
});

test("clean two list items", function() {
    equal(cleanMarkedContent('<ol><li>f|oo</li><li>ba|r</li></ol>'), '<p>foo</p><p>bar</p>');
});

test("clean multiple list items", function() {
    equal(cleanMarkedContent('<ul><li>f|oo</li><li>bar</li><li>ba|s</li></ul>'), '<p>foo</p><p>bar</p><p>bas</p>');
    equal(cleanMarkedContent('<ul> <li>f|oo</li> <li>ba|r</li> <li>bas</li></ul> '), '<p>foo</p><p>bar</p><ul><li>bas</li></ul>');
});

test("clean inline formatting in list", function() {
    equal(cleanMarkedContent('<ol><li>f|o<strong>o</strong></li><li>ba|r</li></ol>'), '<p>foo</p><p>bar</p>');
});

test("unwraps blockquotes", function() {
    equal(cleanedContent('<blockquote>foo</blockquote>'), '<p>foo</p>');
});

test("removes presentational tags", function() {
    equal(cleanedContent('<p><i>foo</i></p>'), '<p>foo</p>');
    equal(cleanedContent('<p><b>foo</b></p>'), '<p>foo</p>');
    equal(cleanedContent('<p><u>foo</u></p>'), '<p>foo</p>');
});

}());
