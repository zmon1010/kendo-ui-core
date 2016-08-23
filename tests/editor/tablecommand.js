(function(){

var editor;
var TableCommand = kendo.ui.editor.TableCommand;
var PERCENTAGE = "%";
var TD = "td";
var TR = "tr";
var WIDTH = "width";
var HEIGHT = "height";
var range;

editor_module("editor table command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.focus();
    },
    teardown: function() {
        $(".k-window,.k-overlay").remove();
        editor.options.pasteCleanup.keepNewLines = false;
        editor.options.pasteCleanup.all = false;
    }
});

function execTableCommand(options) {
    var command = new TableCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

function stripTableElementAttributes(html) {
    return stripStyleHeight(stripStyleWidth(html));
}


function stripStyleWidth(html) {
    return html.replace(/\s+style=\"width\:\d*\.?\d+%?\;\"/gi, "");
}

function stripStyleHeight(html) {
    return html.replace(/\s+style=\"height\:\d*\.?\d+%?\;\"/gi, "");
}

test("exec createTable creates table at cursor", function() {
    range = createRangeFromText(editor, 'foo||');

    execTableCommand({ range:range });

    equal(stripTableElementAttributes(editor.value()), "foo<table><tbody><tr><td></td></tr></tbody></table>");
});

    test("table command should skip cleaners", function() {
        var cmd = new TableCommand({ range: createRangeFromText(editor, "foo||") });
        ok(cmd.options.skipCleaners);

    });

test("exec createTable creates table with given rows", function() {
    editor.value("foo");

    range = editor.createRange();
    range.setStart(editor.body.firstChild, 0);
    range.collapse(true);

    execTableCommand({ range: range, rows: 3, columns: 2 });

    equal(stripTableElementAttributes(editor.value()), "<table><tbody><tr><td></td><td></td></tr><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table>foo");
});

test("exec createTable creates table with given columns", function() {
    editor.value("foo");

    range = editor.createRange();
    range.setStart(editor.body.firstChild, 0);
    range.collapse(true);

    execTableCommand({ range:range, rows: 1, columns: 2 });

    equal(stripTableElementAttributes(editor.value()), "<table><tbody><tr><td></td><td></td></tr></tbody></table>foo");
});

function stripAttr(html) {
    return html.replace(/<(\w+)[^>]*>/i, "<$1>");
}

test("empty table cells have the empty table cell content", function() {
    range = createRangeFromText(editor, '||');

    execTableCommand({ range:range });

    equal(stripAttr(editor.document.getElementsByTagName("td")[0].innerHTML), stripAttr(kendo.ui.editor.emptyTableCellContent));
});

test("table has k-table class", function() {
    range = createRangeFromText(editor, '||');

    execTableCommand({ range:range });

    equal(editor.document.getElementsByTagName("table")[0].className, "k-table");
});

test("exec splits paragraph", function() {
    range = createRangeFromText(editor, '<p>foo||bar</p>');

    execTableCommand({ range:range });

    equal(stripTableElementAttributes(editor.value()), "<p>foo</p><table><tbody><tr><td></td></tr></tbody></table><p>bar</p>");
});

test("first cell is focused after insertion", function() {
    range = createRangeFromText(editor, 'foo||');

    execTableCommand({ range:range });

    range = editor.getRange();

    ok(range.collapsed);

    range.insertNode(editor.document.createElement("a"));

    equal(stripTableElementAttributes(editor.value()), "foo<table><tbody><tr><td><a></a></td></tr></tbody></table>");
});

test("table holds its position after undo/redo", function() {
    editor.selectRange(createRangeFromText(editor, '<p>foo||bar</p>'));

    editor.exec("createTable");
    editor.exec("undo");

    equal(editor.value(), "<p>foobar</p>");

    editor.exec("redo");

    equal(stripTableElementAttributes(editor.value()).replace(/<br[^>]*>/g, ""), "<p>foo</p><table><tbody><tr><td></td></tr></tbody></table><p>bar</p>");
});

editor_module("editor table command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.value("");
        range = editor.createRange();
    }
});

test("creates one column with width equal to 100%", function() {
    execTableCommand({ rows: 1, columns: 1, range: range });

    equal("100%", $(editor.body).find(TD)[0].style.width);
});

test("creates 4 columns with width equal to 25%", function() {
    var columns = [];

    execTableCommand({ rows: 1, columns: 4, range: range });

    columns = $(editor.body).find(TD);
    for (var i = 0; i < columns.length; i++) {
        equal("25%", $(editor.body).find(TD)[0].style.width);
    }
});

test("creates 3 columns with width roughly equal to 33.3%", function() {
    var columns = [];

    execTableCommand({ rows: 1, columns: 3, range: range });

    columns = $(editor.body).find(TD);
    for (var i = 0; i < columns.length; i++) {
        roughlyEqual("33.3333%", columns[i].style.width, 0.01);
    }
});

    test("create table despite pasteCleanup.all or pasteCleanup.keepNewLines", function() {
        range = createRangeFromText(editor, 'foo||');

        editor.options.pasteCleanup.keepNewLines = true;
        execTableCommand({ range:range });

        equal(stripTableElementAttributes(editor.value()), "foo<table><tbody><tr><td></td></tr></tbody></table>");
    });

    editor_module("editor table command", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.value("");
            range = editor.createRange();
        }
    });

    test("creates one row with height equal to 100%", function() {
        execTableCommand({ rows: 1, columns: 1, range: range });

        equal("100%", $(editor.body).find(TR)[0].style[HEIGHT]);
    });

    test("creates 4 rows with width equal to 25%", function() {
        var row = [];

        execTableCommand({ rows: 4, columns: 4, range: range });

        row = $(editor.body).find(TR);
        for (var i = 0; i < row.length; i++) {
            equal("25%", $(editor.body).find(TR)[0].style[HEIGHT]);
        }
    });

    test("creates 3 rows with width roughly equal to 33.3%", function() {
        var rows = [];

        execTableCommand({ rows: 3, columns: 3, range: range });

        rows = $(editor.body).find(TR);
        for (var i = 0; i < rows.length; i++) {
            roughlyEqual("33.3333%", rows[i].style[HEIGHT], 0.01);
        }
    });

editor_module("editor with immutables true table command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.options.immutables = true;
        editor.focus();
    },
    teardown: function() {
        $(".k-window,.k-overlay").remove();
    }
});

function getResultValue() {
    return stripTableElementAttributes(editor.value());
}

function testTableCommandExecution(initialContent, expectedContent) {
    range = createRangeFromText(editor, initialContent);
    execTableCommand({range: range});
    equal(getResultValue(stripTableElementAttributes(editor.value())), expectedContent);
}

test("exec the immutable in which the selection is", function() {
    testTableCommandExecution('<div contenteditable="false">|foo|bar</div>',  '<table><tbody><tr><td></td></tr></tbody></table>');
});

test("exec deletest immutable inline element in which the selection is", function() {
    testTableCommandExecution('<span contenteditable="false">|foo|bar</span>','<table><tbody><tr><td></td></tr></tbody></table>');
});

test("exec when selection is in partially selected immutable start container", function() {
    testTableCommandExecution('<div contenteditable="false">foo|bar</div> text |text','<table><tbody><tr><td></td></tr></tbody></table>text');
});

test("exec when selection is in partially selected only block child in immutable start container", function() {
    testTableCommandExecution('<div contenteditable="false"><div>foo|bar</div></div> text |text','<table><tbody><tr><td></td></tr></tbody></table>text');
});

test("exec when selection is in partially selected immutable end container", function() {
    testTableCommandExecution('text |text<div contenteditable="false">foo|bar</div>','text <table><tbody><tr><td></td></tr></tbody></table>');
});

test("exec when selection is in partially selected immutable start and end containers", function() {
    testTableCommandExecution('<div contenteditable="false">foo|bar</div>test text<div contenteditable="false">foo|bar</div>','<table><tbody><tr><td></td></tr></tbody></table>');
});


test("exec when selection is in partially selected immutable start and end containers and paragraph is in between", function() {
    testTableCommandExecution('<div contenteditable="false">foo|bar</div><p>test text</p><div contenteditable="false">foo|bar</div>','<table><tbody><tr><td></td></tr></tbody></table>');
});

}());
