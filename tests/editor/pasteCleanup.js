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

    function equalClean(input, expected) {
        equal(cleaner.clean(input), expected);
    }

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

        editor.paste('<div>some content</div><script>script</script>');

        okContent('<div>some content</div><telerik:script>script</telerik:script>');
    });

    test("spans are stripped", function() {
        editor.options.pasteCleanup.span = true;

        editor.paste('<div>some <span>inline</span> content</div>');

        okContent('<div>some inline content</div>');
    });

    function okContent(html) {
        equal(editor.value(), html);
    }
})();
