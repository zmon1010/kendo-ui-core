(function() {
    var AutoLinkCommand = kendo.ui.editor.AutoLinkCommand;

    var editor;

    editor_module("editor autolink command", {
        setup: function () {
            editor = $("#editor-fixture").data("kendoEditor");
        }
    });

    test("wrap previous word in anchor", function () {
        var cmd = newAutoLinkCommandForText("link http://www.telerik.com/||");
        cmd.exec();

        equal(editor.value(), 'link <a href="http://www.telerik.com/">http://www.telerik.com/</a>');
    });

    test("no autolink if after whitespace", function () {
        var cmd = newAutoLinkCommandForText("link http://www.telerik.com/  ||text");
        cmd.exec();

        equal(editor.value(), 'link http://www.telerik.com/  text');
    });

    test("no autolink if missing web protocol", function () {
        var cmd = newAutoLinkCommandForText("link telerik.com ||");
        cmd.exec();

        equal(editor.value(), "link telerik.com ");
    });

    test("autolink if missing web protocol, but prefixed with www", function() {
        var cmd = newAutoLinkCommandForText("link www.telerik.com ||");
        cmd.exec();

        equal(editor.value(), 'link <a href="http://www.telerik.com">www.telerik.com</a> ');
    });

    test("autolink with protocol prefix only", function () {
        var cmd = newAutoLinkCommandForText("link http://telerik.com/ ||");
        cmd.exec();

        equal(editor.value(), 'link <a href="http://telerik.com/">http://telerik.com/</a> ');
    });

    test("range is after the link", function () {
        var cmd = newAutoLinkCommandForText("link http://www.telerik.com/ ||");
        cmd.exec();

        var link = $(editor.body).find("a");
        var resultRange = editor.getRange();
        equal(link[0], resultRange.startContainer.previousSibling);
    });

    test("autoLink formatted content", function () {
        var cmd = newAutoLinkCommandForText("link http://te<strong>le</strong>rik.com/ ||");
        cmd.exec();

        equal(editor.value(), 'link <a href="http://telerik.com/">http://te<strong>le</strong>rik.com/</a> ');
    });

    test("range is in next empty paragraph", function() {
        var cmd = newAutoLinkCommandForText("<p>link http://telerik.com</p><p>||</p>")
        cmd.exec();

        equal(editor.value(), '<p>link <a href="http://telerik.com">http://telerik.com</a></p><p></p>');
    });

    test("range is in next empty paragraph with formatting", function() {
        var cmd = newAutoLinkCommandForText("<p>link http://telerik.com</p><p><strong>||</strong></p>")
        debugger
        cmd.exec();

        equal(editor.value(), '<p>link <a href="http://telerik.com">http://telerik.com</a></p><p><strong></strong></p>');
    });

    function newAutoLinkCommandForText(text) {
        var range = createRangeFromText(editor, text);
        return createAutoLinkCommand(range);
    }

    function createAutoLinkCommand(range) {
        var command = new AutoLinkCommand({range: range});
        command.editor = editor;
        return command;
    }
})();

