(function(){

var editor;

editor_module("editor block formatter", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

var BlockFormatter = kendo.ui.editor.BlockFormatter;
var options = kendo.ui.Editor.fn.options;

var justifyLeft = new BlockFormatter(options.formats.justifyLeft);
var justifyCenter = new BlockFormatter(options.formats.justifyCenter);
var justifyRight = new BlockFormatter(options.formats.justifyRight);

test("apply format on suitable block node", function() {
    editor.value('<div>foo</div>');

    justifyCenter.apply([editor.body.firstChild.firstChild]);

    equal(editor.value(), '<div style="text-align:center;">foo</div>');
});

test("apply wraps single node", function() {
    editor.value('foo');

    justifyCenter.apply([editor.body.firstChild]);

    equal(editor.value(), '<div style="text-align:center;">foo</div>');
});

test("apply wraps all inline nodes", function() {
    editor.value('<span>foo</span><span>bar</span>');

    justifyCenter.apply([editor.body.firstChild.firstChild, editor.body.childNodes[1].firstChild]);
    equal(editor.value(), '<div style="text-align:center;"><span>foo</span><span>bar</span></div>');
});

test("apply wraps block and inline nodes", function() {
    editor.value('<div>foo</div><span>bar</span>');

    justifyCenter.apply([editor.body.firstChild.firstChild, editor.body.childNodes[1].firstChild]);
    equal(editor.value(), '<div style="text-align:center;">foo</div><div style="text-align:center;"><span>bar</span></div>');
});

test("apply for block nodes", function() {
    editor.value('<div>foo</div><div>bar</div>');

    justifyCenter.apply([editor.body.firstChild.firstChild, editor.body.childNodes[1].firstChild]);
    equal(editor.value(), '<div style="text-align:center;">foo</div><div style="text-align:center;">bar</div>');
});

test("apply for text and block", function() {
    editor.value('foo<div>bar</div>baz');

    justifyCenter.apply([editor.body.firstChild, editor.body.childNodes[1].firstChild, editor.body.childNodes[2]]);

    equal(editor.value(), '<div style="text-align:center;">foo</div><div style="text-align:center;">bar</div><div style="text-align:center;">baz</div>');
});

test("apply text node and inline elements", function() {
    editor.value('foo<span></span>bar<span></span>baz');

    justifyCenter.apply([editor.body.childNodes[2]]);

    equal(editor.value(), '<div style="text-align:center;">foo<span></span>bar<span></span>baz</div>');
});

test("remove unwraps text node", function() {
    editor.value('<div style="text-align:center">foo</div>');

    justifyCenter.remove([editor.body.firstChild.firstChild]);

    equal(editor.value(), 'foo');
});

test("remove preserves paragraphs", function() {
    editor.value('<p style="text-align:center">foo</p>');

    justifyCenter.remove([editor.body.firstChild.firstChild]);
    equal(editor.value(), '<p>foo</p>');
});

test("remove unwraps block nodes", function() {
    editor.value('<div style="text-align:center">foo</div><div style="text-align:center">bar</div>');
    justifyCenter.remove([editor.body.firstChild.firstChild, editor.body.childNodes[1].firstChild]);
    equal(editor.value(), 'foobar');
});

test("remove preserves headings", function() {
    editor.value('<h1 style="text-align:center">foo</h1>');

    justifyCenter.remove([editor.body.firstChild.firstChild]);

    equal(editor.value(), '<h1>foo</h1>');
});

test("remove preserves div elements with a class name", function() {
    editor.value('<div class="bar" style="text-align:center">foo</div>');

    justifyCenter.remove([editor.body.firstChild.firstChild]);

    equal(editor.value(), '<div class="bar">foo</div>');
});


test("toggle applies format if format is not found", function() {
    var range = createRangeFromText(editor, '|fo|');

    var argument;
    withMock(justifyCenter, "apply", function (a) { argument = a; }, function() {
        justifyCenter.toggle(range);

        ok($.isArray(argument));
    });
});

test("toggle removes format if format is found", function() {
    var range = createRangeFromText(editor, '<div style="text-align:center">|fo|</div>');
    var argument;

    withMock(justifyCenter, "remove", function (a) { argument = a; }, function() {

        justifyCenter.toggle(range);

        ok($.isArray(argument));
    });
});

test("toggle and empty range", function() {
    editor.value('foo');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 0);
    range.setEnd(editor.body.firstChild, 0);

    justifyCenter.toggle(range);

    equal(editor.value(), '<div style="text-align:center;">foo</div>');
});

test("toggle on image", function() {
    editor.value('<img src="foo" />');

    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);

    justifyRight.toggle(range);

    equal(editor.value(), '<img src="foo" style="float:right;" />');
});

test("toggle on image in paragarph", function() {
    editor.value('<p><img src="foo" /></p>');

    var range = editor.createRange();
    range.selectNode(editor.body.firstChild.firstChild);

    justifyRight.toggle(range);

    equal(editor.value(), '<p><img src="foo" style="float:right;" /></p>');
});

test("apply on image and sibling element", function() {
    editor.value('<img src="foo" /><p>foo</p>');

    justifyRight.apply([ editor.body.firstChild, editor.body.childNodes[1] ]);

    equal(editor.value(), '<img src="foo" style="float:right;" /><p style="text-align:right;">foo</p>');
});

test("apply on image and sibling text", function() {
    editor.value('<img src="foo" />foo');

    justifyRight.apply([ editor.body.firstChild, editor.body.childNodes[1] ]);

    equal(editor.value(), '<div style="text-align:right;"><img src="foo" style="float:right;" />foo</div>');
});

test("remove on image", function() {
    editor.value('<img style="float:right" src="foo" />');

    justifyRight.remove([editor.body.firstChild]);

    equal(editor.value(), '<img src="foo" />');
});

test("apply attribute on td", function() {
    editor.value('<table><tr><td>foo</td></tr></table>');
    var td = $('td', editor.body)[0];

    justifyRight.apply([td.firstChild]);

    equal(editor.value(), '<table><tbody><tr><td style="text-align:right;">foo</td></tr></tbody></table>');
});

test("apply wrap in td", function() {
    editor.value('<table><tr><td>foo</td></tr></table>');
    var td = $('td', editor.body)[0];
    var formatter = new BlockFormatter([{tags:['p']}]);

    formatter.apply([td.firstChild]);

    equal(editor.value(), '<table><tbody><tr><td><p>foo</p></td></tr></tbody></table>');
});

test("apply to selection of block elements", function() {
    editor.value('<div>foo</div><div>bar</div><div>baz</div>');

    justifyRight.apply([editor.body.firstChild.firstChild, editor.body.firstChild.nextSibling.firstChild]);

    equal(editor.value(), '<div style="text-align:right;">foo</div><div style="text-align:right;">bar</div><div>baz</div>');
});

test("apply wraps in div", function() {
    editor.value('<div>foo</div>');
    var formatter = new BlockFormatter([{tags:['p']}]);

    formatter.apply([editor.body.firstChild.firstChild]);

    equal(editor.value(), '<div><p>foo</p></div>');
});

test("apply empty container", function() {
    editor.value('');
    editor.focus();
    editor.exec('justifyRight');
    var range = editor.getRange();
    range.insertNode(editor.document.createElement('a'));
    equal(editor.value(), '<div style="text-align:right;"><a></a></div>');
});


test("apply text nodes in inline element", function() {
    editor.value('<span>foo<strong>bar</strong></span>');

    justifyRight.apply([editor.body.firstChild.firstChild, editor.body.firstChild.lastChild.firstChild]);

    equal(editor.value(), '<div style="text-align:right;"><span>foo<strong>bar</strong></span></div>');
});

test("remove className format", function() {
    editor.value("<p class='left'>foo</p>");

    var formatter = new BlockFormatter([{ tags: ["p"], attr: { className: "left" } }]);

    formatter.remove([editor.body.firstChild.firstChild]);

    equal(editor.value(), "<p>foo</p>");
});

test("does not apply formatting on inline editor body", function() {
    var inline = new kendo.ui.Editor("#inline");

    inline.value("foo");

    justifyCenter.apply([inline.body.firstChild]);

    equal(inline.value(), '<div style="text-align:center;">foo</div>');
});

test("applying right align to lists adds list-style-position:inside", function() {
    editor.value("<ul><li>foo</li></ul>");

    justifyRight.apply([editor.body.firstChild.firstChild.firstChild]);

    equal(editor.value(), '<ul><li style="text-align:right;list-style-position:inside;">foo</li></ul>');
});

test("applying left align to lists removes list-style-position", function() {
    editor.value('<ul><li style="text-align:right;list-style-position:inside;">foo</li></ul>');

    justifyLeft.apply([editor.body.firstChild.firstChild.firstChild]);

    equal(editor.value(), '<ul><li style="text-align:left;">foo</li></ul>');
});

editor_module("editor block formatter", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
       setupImmutables();
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

var setupImmutables = function () {
    editor.options.immutables = true;
    editor._initializeImmutableElements();
    justifyRight.editor = editor;
    justifyCenter.editor = editor;
    justifyLeft.editor = editor;
}
var firstInnerChild = function(element){
    while (element && element.firstChild ) {
        element = element.firstChild;
        if (element.nodeName == "BR") {
            element = element.nextSibling;
        }
    }
    return element;
};
var immutableHtml = '<span contenteditable="false">test</span>';

test("toggle on immutable element", function() {
    editor.value(immutableHtml);

    var range = editor.createRange();
    range.selectNode(firstInnerChild(editor.body));

    justifyRight.toggle(range);

    equal(editor.value(), '<span contenteditable="false" style="float:right;">test</span>');
});

test("toggle on immutable element in paragarph", function() {
    editor.value('<p>' + immutableHtml + '</p>');

    var range = editor.createRange();
    range.selectNode(firstInnerChild(editor.body));

    justifyRight.toggle(range);

    equal(editor.value(), '<p><span contenteditable="false" style="float:right;">test</span></p>');
});

test("apply on immutable element and sibling element", function() {
    editor.value(immutableHtml + '<p>foo</p>');

    justifyRight.apply([ firstInnerChild(editor.body), firstInnerChild(editor.body.childNodes[1]) ]);

    equal(editor.value(), '<span contenteditable="false" style="float:right;">test</span><p style="text-align:right;">foo</p>');
});

test("apply on immutable element and sibling text", function() {
    editor.value(immutableHtml + 'foo');

    justifyRight.apply([ editor.body.firstChild, editor.body.childNodes[1] ]);

    equal(editor.value(), '<div style="text-align:right;"><span contenteditable="false" style="float:right;">test</span>foo</div>');
});

test("remove on immutable element", function() {
    editor.value('<span contenteditable="false" style="float:right;">test</span>');

    justifyRight.remove([firstInnerChild(editor.body)]);

    equal(editor.value(), immutableHtml);
});

test("apply justifyCenter on immutable element", function() {
    editor.value(immutableHtml);

    justifyCenter.apply([ firstInnerChild(editor.body) ]);

    equal(editor.value(), '<span contenteditable="false" style="display:block;margin-left:auto;margin-right:auto;">test</span>');
});

test("remove justifyCenter on immutable element", function() {
    editor.value('<span contenteditable="false" style="display:block;margin-left:auto;margin-right:auto;">test</span>');

    justifyCenter.remove([ firstInnerChild(editor.body) ]);

    equal(editor.value(), immutableHtml);
});

test("apply justifyLeft on immutable element", function() {
    editor.value(immutableHtml);

    justifyLeft.apply([ firstInnerChild(editor.body) ]);

    equal(editor.value(), '<span contenteditable="false" style="float:left;">test</span>');
});

test("remove justifyCenter on immutable element", function() {
    editor.value('<span contenteditable="false" style="float:left;">test</span>');

    justifyLeft.remove([ firstInnerChild(editor.body) ]);

    equal(editor.value(), immutableHtml);
});

}());
