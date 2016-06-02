(function() {
    var TableResizing = kendo.ui.editor.TableResizing;
    var editor;
    var content;
    var table;
    var tableResizing;
    var wrapper;
    var DOT = ".";
    var NS = "kendoEditor";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
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
    var CONTENT_HTML = '<div id="wrappe">' + TABLE_HTML + '</div>';

    function triggerEvent(element, eventOptions) {
        var options = $.extend({
            type: "mousedown",
            clientX: 0,
            clientY: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    editor_module("editor table resizing", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            $(editor.body).append($(CONTENT_HTML)[0]);
            content = $(CONTENT_HTML).appendTo(QUnit.fixture)[0];
            table = $(QUnit.fixture).find("#table")[0];
            wrapper = $(QUnit.fixture).find("#wrapper")[0];
        },

        afterEach: function() {
            if (editor) {
                editor.body.remove("*");
            }
            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a table should initialize table resizing", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
    });

    test("hovering a table should initialize table resizing with table element", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(editor.tableResizing.element, table);
    });

    test("hovering a table should initialize table resizing with empty options", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        deepEqual(editor.tableResizing.options, {});
    });

    test("hovering out of a table should call table resizing destroy", function() {
        var table = $(editor.body).find("#table")[0];
        editor.tableResizing = tableResizing = new TableResizing(table, {});
        trackMethodCall(tableResizing, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(tableResizing.destroy.callCount, 1);

    });

    test("hovering out of a table should remove table resizing", function() {
        var table = $(editor.body).find("#table")[0];
        editor.tableResizing = new TableResizing(table, {});

        triggerEvent(table, { type: MOUSE_LEAVE });

        ok(editor.tableResizing === null);
    });

    test("table resizing should be initialized with custom options", function() {
        var options = {
            property: "value"
        };
        tableResizing = new TableResizing(table, options);

        ok(tableResizing.options, options);
    });

    test("column resizing should be initialized from table resizing", function() {
        tableResizing = new TableResizing(table, {});

        ok(tableResizing.columnResizing instanceof kendo.ui.editor.ColumnResizing);
    });

    test("column resizing should not be initialized with custom options", function() {
        tableResizing = new TableResizing(table, {});

        notDeepEqual(tableResizing.columnResizing.options, {});
    });

    test("column resizing should be initialized with table element", function() {
        tableResizing = new TableResizing(table, {});

        equal(tableResizing.columnResizing.element, table);
    });

    test("table resizing should be destroyed on editor destroy", function() {
        var editor = $('<textarea id="editor-fixture"></textarea>').appendTo("body").kendoEditor({}).getKendoEditor();
        var tableResizing = editor.tableResizing = new TableResizing(table, {});
        trackMethodCall(tableResizing, "destroy");

        editor.destroy();

        equal(tableResizing.destroy.callCount, 1);
    });

    test("destroy should call column resizing destory", function() {
        var columnResizing;
        tableResizing = new TableResizing(table, {});
        columnResizing = tableResizing.columnResizing;
        trackMethodCall(columnResizing, "destroy");

        tableResizing.destroy();

        equal(columnResizing.destroy.callCount, 1);
    });

    test("destroy should detach event handlers", function() {
        tableResizing.destroy();

        ok(jQueryEvents(tableResizing.element) === undefined);
    });
})();
