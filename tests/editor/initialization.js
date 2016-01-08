(function(){

var editor, textarea;

module("editor initialization", {
   setup: function() {
       textarea = $("<textarea></textarea>").appendTo(QUnit.fixture);
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

function setup(content, options) {
    editor = textarea.val(content).kendoEditor(options).data("kendoEditor");
}

test("editor gets its value from textarea", function() {
    setup("foo");

    equal(editor.value(), "foo");
});

test("editor uses defaultValue if encoded and has encoded value", function() {
    textarea[0].defaultValue = "<strong>foo</strong>";
    setup("&lt;strong&gt;foo&lt;/strong&gt;", { encoded: true });

    equal(editor.value(), "<strong>foo</strong>");
});

test("color tools react to palette definition", function() {
    var palette = ["#ff1ff1"];

    setup("bar", {
        tools: [
            { name: "foreColor", palette: palette }
        ]
    });

    var colorpicker = $("[data-role=colorpicker]").eq(0);

    equal(colorpicker.length, 1);
    deepEqual(colorpicker.data("kendoColorPicker").options.palette, palette);
});

test("define global ColorTool palette", function() {
    var palette = ["#ff1ff1"];

    var defaultPalette = kendo.ui.editor.ColorTool.fn.options.palette;
    kendo.ui.editor.ColorTool.fn.options.palette = palette;

    setup("baz", {
        tools: [ "foreColor", "backColor" ]
    });

    var colorpickers = $("[data-role=colorpicker]");

    deepEqual(colorpickers.eq(0).data("kendoColorPicker").options.palette, palette);
    deepEqual(colorpickers.eq(1).data("kendoColorPicker").options.palette, palette);

    kendo.ui.editor.ColorTool.fn.options.palette = defaultPalette;
});

test("tool options are passed to toolbar", function() {
    setup("foo", {
        tools: [ { name: "bold", tooltip: "foo" } ]
    });

    equal($(".k-tool").attr("title"), "foo");
});

test("editor iframe copies the textarea tabIndex", function () {
    textarea[0].tabIndex = 2;
    setup("", {});

    equal(editor.wrapper.find("iframe")[0].tabIndex, textarea[0].tabIndex);
});

module("initialization from div[contentEditable]", {
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("returns proper initial content", function() {
    var dom = $("<div contentEditable='true'><p>foo</p></div>").appendTo(QUnit.fixture);
    dom.kendoEditor();

    equal(dom.data("kendoEditor").value(), "<p>foo</p>");
});

test("adds k-editor class to contentEditable", function() {
    var dom = $("<div contentEditable='true'><p>foo</p></div>").appendTo(QUnit.fixture);

    dom.kendoEditor();

    ok(dom.hasClass("k-editor"));
    ok(dom.hasClass("k-editor-inline"));
    ok(dom.hasClass("k-widget"));
});

test("shows popup toolbar within the viewport boundaries", 2, function () {
    var dom = $("<div contentEditable='true' style='position:absolute;top:-100px;left:-100px'><p>foo</p></div>").appendTo(QUnit.fixture);
    dom.kendoEditor();

    dom.focus();

    var editorToolbarWindow = dom.data("kendoEditor").toolbar.window.wrapper;

    ok(parseInt(editorToolbarWindow.css("top"), 10) >= 0);
    ok(parseInt(editorToolbarWindow.css("left"), 10) >= 0);
});

if (!kendo.support.browser.msie) {
    test("processes value when initializing", function() {
        var dom = $("<div contentEditable><p></p></div>").appendTo(QUnit.fixture);
        dom.kendoEditor();

        equal(dom.find("br").length, 1);
    });
}

}());
