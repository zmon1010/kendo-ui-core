(function() {
    var cleaner, editor;

    module("ScriptCleaner", {
        beforeEach: function() {
            cleaner = new kendo.ui.editor.ScriptCleaner();
        }
    });

    test("not applicable when options.none", function() {
        cleaner.options.none = true;
        ok(!cleaner.applicable("<script>"));
    });

    test("applicable when script is defined", function() {
        ok(cleaner.applicable("<script>"));
    });

    module("HtmlTagsCleaner", {
        beforeEach: function() {
            cleaner = new kendo.ui.editor.HtmlTagsCleaner();
        }
    });

    test("not applicable when no span", function() {
        ok(!cleaner.applicable("<div>content</div>"));
    });

    test("applicable for spans", function() {
        cleaner = new kendo.ui.editor.HtmlTagsCleaner({span: true});
        ok(cleaner.applicable("<span>content</span>"));
    });

    test("unwrap spans", function() {
        cleaner.options.span = true;

        equalClean(
            '<div>some <span>inline</span> content</div>',
            '<div>some inline content</div>');
    });

    module("HtmlAttrCleaner");

    test("not applicable when options.css is off", function() {
        cleaner = new kendo.ui.editor.HtmlAttrCleaner({ css: false });
        ok(!cleaner.applicable());
    });

    test("applicable when style and class attrs", function() {
        cleaner = new kendo.ui.editor.HtmlAttrCleaner({ css: true });
        ok(cleaner.applicable());
    });

    test("remove style", function() {
        cleaner = new kendo.ui.editor.HtmlAttrCleaner({ css: true });

        equalClean(
            "<div style='color: green;'>content</div>",
            "<div>content</div>");
    });

    test("remove class", function() {
        cleaner = new kendo.ui.editor.HtmlAttrCleaner({ css: true });

        equalClean(
            "<div class='toggle'>content</div>",
            "<div>content</div>");
    });

    module("keep new lines with HtmlContentCleaner", {
        beforeEach: function() {
            cleaner = new kendo.ui.editor.HtmlContentCleaner({ keepNewLines: true });
        }
    });

    test("not applicable", function() {
        cleaner.options.all = false;
        cleaner.options.keepNewLines = false;
        ok(!cleaner.applicable());
    });

    test("applicable for keepNewLines", function() {
        cleaner.options.keepNewLines = true;
        ok(cleaner.applicable());
    });

    test("cleans text", function() {
        equalClean("content", "content");
    });

    test("adds breaks when new line char found", function() {
        equalClean("line1\nline2", "line1<br/>line2");
    });

    test("cleans text from inline node", function() {
        equalClean("some <span>content</span>", "some content");
    });

    test("cleans text from inline nodes", function() {
        equalClean("<span>some </span><span>content</span>", "some content");
    });

    test("cleans text from inline nodes", function() {
        equalClean(
            "<span>so<strong>me</strong> </span><span>content</span>",
            "some content");
    });

    test("cleans two div nodes", function() {
        equalClean("<div>line1</div><div>line2</div>", "line1<br/>line2");
    });

    test("list", function() {
        equalClean(
            "text <ul><li>item1</li><li>item2</li></ul>",
            "text <br/>item1<br/>item2");
    });

    test("one cell table", function() {
        equalClean(
            "text <table><tr><td>cell</td></tr></table>",
            "text <br/>cell");
    });

    test("two cell table creates single line", function() {
        equalClean(
            "text <table><tr><td>cell1</td><td>cell2</td></tr></table>",
            "text <br/>cell1 cell2");
    });

    test("two cell with block containers creates single line", function() {
        equalClean(
            "text <table><tr><td><p>p1</p><p>p2</p></td><td>cell2</td></tr></table>",
            "text <br/>p1 p2 cell2");
    });

    test("two rows in a table", function() {
        equalClean(
            "text <table><tr><td>cell1</td></tr><tr><td>cell2</td></tr></table>",
            "text <br/>cell1<br/>cell2");
    });

    function equalClean(input, expected) {
        equal(cleaner.clean(input), expected);
    }

    var htmlLines;
    module("HtmlTextLines", {
        beforeEach: function() {
            htmlLines = new kendo.ui.editor.HtmlTextLines({text: " ", line: "<br/>" });
        }
    });

    test("append text", function() {
        htmlLines.appendText("content");
        equal(htmlLines.html(" ", "<br/>"), "content");
    });

    test("append multiple lines", function() {
        htmlLines.appendText("line1");
        htmlLines.endLine();
        htmlLines.appendText("line2");

        equal(htmlLines.html(" ", "<br/>"), "line1<br/>line2");
    });

    test("append inline block text", function() {
        htmlLines.appendInlineBlockText("cell1");
        htmlLines.appendInlineBlockText("cell2");

        equal(htmlLines.html(), "cell1 cell2");
    });

    test("add empty lines", function() {
        htmlLines.appendText("line1");
        htmlLines.endLine();
        htmlLines.endLine();

        equal(htmlLines.html(), "line1<br/><br/>");
    });

    editor_module("pasteCleanup integration", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
        },
        afterEach: function() {
            editor.value("");
        }
    });

    test("scripts are stripped", function() {
        editor.options.pasteCleanup.span = true;

        editor.paste('<div>some content</div><script>var a = 1;</script>');

        okContent('<div>some content</div><telerik:script>var a = 1;</telerik:script>');
    });

    test("spans are stripped", function() {
        editor.options.pasteCleanup.span = true;

        editor.paste('<div>some <span>inline</span> content</div>');

        okContent('<div>some inline content</div>');
    });

    test("css styling of elements is stripped", function() {
        editor.options.pasteCleanup.css = true;

        editor.paste("<div class='toggle' style='width: auto;'>content</div>");

        okContent("<div>content</div>");
    });

    test("keepNewLines paste", function() {
        editor.options.pasteCleanup.keepNewLines = true;

        editor.paste("<p>line1</p><p>line2</p>");

        okContent("line1<br />line2");
    });

    test("all cleanup paste", function() {
        editor.options.pasteCleanup.all = true;

        editor.paste("<p>line1</p><p>line2</p>");

        okContent("line1 line2");
    });

    function okContent(html) {
        equal(editor.value(), html);
    }
})();
