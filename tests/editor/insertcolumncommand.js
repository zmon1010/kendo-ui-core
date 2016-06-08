(function(){

var InsertColumnCommand = kendo.ui.editor.InsertColumnCommand;

var editor;

editor_module("editor insert column command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});

function execInsertColumnCommand(options) {
    var command = new InsertColumnCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

var range, command;

test("exec creates column after cursor", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 1);
    equal(dom.find("td").length, 2);
});

test("exec creates column after cursor on every row", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr><tr><td>bar</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    var rows = dom.find("tr");
    equal(rows[0].cells.length, 2);
    equal(rows[1].cells.length, 2);
});

test("exec with position:'before' inserts column before selection", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range, position: "before" });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 1);
    equal(dom.find("td:first").text(), "");
    equal(dom.find("td:last").text(), "foo");
});

test("cell classes are copied when creating new columns", function() {
    range = createRangeFromText(editor, "<table><tr><td class='a'>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("td.a").length, 2);
});

test("inserted row do not copy text content", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("td").text(), "foo");
});

test("insert row after non-table element and cell", function() {
    range = createRangeFromText(editor, "<table><tr> <td>f||oo</td></tr></table>");

    execInsertColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("td").text(), "foo");
});


editor_module("editor immutables enabled insert column command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.options.immutables = true;
    },

    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});


test("insert column in immutable table should not be possible", function() {
    range = createRangeFromText(editor, '<table contenteditable="false"><tbody><tr><td>f||oo</td></tr></tbody></table>');
    execInsertColumnCommand({ range: range });
    equal(editor.value(), '<table contenteditable="false"><tbody><tr><td>foo</td></tr></tbody></table>');
});


test("insert column in table child of immutable element should not be possible", function() {
    range = createRangeFromText(editor, '<div contenteditable="false"><table><tbody><tr><td>f||oo</td></tr></tbody></table></div>');
    execInsertColumnCommand({ range: range });
    equal(editor.value(), '<div contenteditable="false"><table><tbody><tr><td>foo</td></tr></tbody></table></div>');
});


}());
