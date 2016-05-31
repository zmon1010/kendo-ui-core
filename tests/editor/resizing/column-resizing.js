(function() {
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var editor;
    var columnResizing;
    var table;
    var DOT = ".";
    var NS = "kendoEditor";
    var MOUSE_MOVE = "mousemove";
    var TABLE_HTML =
        '<table id="table" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">col 11</td>' +
                '<td id="col12" class="col">col 12</td>' +
                '<td id="col13" class="col">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col">+col 21</td>' +
                '<td id="col22" class="col">+col 22</td>' +
                '<td id="col23" class="col">+col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col">+col 31</td>' +
                '<td id="col32" class="col">+col 32</td>' +
                '<td id="col33" class="col">+col 33</td>' +
            '</tr>' +
        '</table>';

    function eventHandler() { }

    editor_module("editor table resizing", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            QUnit.fixture.append('<textarea id="editor"></textarea>');
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resizing should not be initialized with element that is different from table", function() {
        columnResizing = new ColumnResizing($("<div />")[0], {});

        equal(undefined, columnResizing.element);
    });

    test("resizing should be initialized with table element", function() {
        columnResizing = new ColumnResizing(table, {});

        equal(table, columnResizing.element);
    });

    test("resizing should be initialized with default options", function() {
        columnResizing = new ColumnResizing(table, {});

        deepEqual({tags: ["td"]}, columnResizing.options);
    });

    test("resizing should be initialized with custom options", function() {
        var options = { tags: ["th"] };

        columnResizing = new ColumnResizing(table, options);

        deepEqual(options, columnResizing.options);
    });

    test("resizing should be initialized with array of tags", function() {
        var options = { tags: "tag" };

        columnResizing = new ColumnResizing(table, options);

        deepEqual({ tags: ["tag"]}, columnResizing.options);
    });

    test("move handlers should be attached to all cells", function() {
        assertEvent(table, { type: MOUSE_MOVE, selector: "td", namespace: NS, handler: eventHandler });
    });
})();
