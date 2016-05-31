(function() {
    var TableResizing = kendo.ui.editor.TableResizing;
    var editor;
    var content;
    var table;
    var tableResizing;
    var wrapper;
    var DOT = ".";
    var NS = "kendoEditor";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_OVER = "mouseover";
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
    var CONTENT_HTML = '<div id="wrappe">' + TABLE_HTML + '</div>';

    function eventHandler() { }

    editor_module("editor table resizing", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            content = $(CONTENT_HTML).appendTo(QUnit.fixture)[0];
            table = $(QUnit.fixture).find("#table")[0];
            wrapper = $(QUnit.fixture).find("#wrappe")[0];
        },
        teardown: function() {
            editor.body.remove("*");
            kendo.destroy(QUnit.fixture);
        }
    });

    test("table resizing should be initialized with editor body", function() {
        deepEqual(editor.body, editor.tableResizing.element);
    });

    test("table resizing should initialize column resizing", function() {
        tableResizing = new TableResizing(content, {});

        ok(tableResizing.columnResizing instanceof kendo.ui.editor.ColumnResizing);
    });

    test("table resizing should not initialize column resizing with empty options", function() {
        tableResizing = new TableResizing(content, {});

        notDeepEqual({}, tableResizing.columnResizing.options);
    });

    test("column resizing should be initialized with table element", function() {
        tableResizing = new TableResizing(content, {});

        equal(table, tableResizing.columnResizing.element);
    });

    test("mouseenter handlers should be attached to table", function() {
        tableResizing = new TableResizing(content, {});

        assertEvent(wrapper, { type: MOUSE_OVER, selector: "table", namespace: NS, handler: eventHandler });
    });
})();
