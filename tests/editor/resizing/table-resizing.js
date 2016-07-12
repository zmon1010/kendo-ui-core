(function() {
    var TableResizing = kendo.ui.editor.TableResizing;
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var editor;
    var tableElement;
    var tableResizing;
    var DOT = ".";
    var HANDLE_SELECTOR = ".k-resize-handle";
    var NS = "kendoEditor";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var SOUTHEAST = "southeast";
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
    var NESTED_TABLE_HTML =
        '<table id="table" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">' +
                    '<table id="nestedTable" class="k-table">' +
                        '<tr id="row1" class="row">' +
                            '<td id="col11" class="col">col 11</td>' +
                        '</tr>' +
                        '<tr id="row2" class="row">' +
                            '<td id="col21" class="col">col 21</td>' +
                        '</tr>' +
                    '</table>' +
                '</td>' +
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
    var CONTENT_HTML = '<div id="wrapper">' + TABLE_HTML + '</div>';

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
            editor.tableResizing = null;
            $(editor.body).append($(CONTENT_HTML)[0]);
            $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
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

    test("hovering a table should initialize table resizing with custom options", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(editor.tableResizing.options.rtl, false);
        equal(editor.tableResizing.options.rootElement, editor.body);
    });

    test("hovering a different table should destroy current table resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var newTable = $(editor.body).find("#table2")[0];
        var tableResizing = editor.tableResizing = new TableResizing(table, {});
        trackMethodCall(tableResizing, "destroy");

        triggerEvent(newTable, { type: MOUSE_ENTER });

        equal(tableResizing.destroy.callCount, 1);
    });

    test("hovering the same table twice should not destroy current table resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var tableResizing = editor.tableResizing = new TableResizing(table, {});
        trackMethodCall(tableResizing, "destroy");

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(tableResizing.destroy.callCount, 0);
    });

    test("leaving a table should destroy table resizing", function() {
        var table = $(editor.body).find("#table")[0];
        editor.tableResizing = new TableResizing(table, {});
        editor.tableResizing.resizingInProgress = function() { return false; };
        var mock = editor.tableResizing;
        trackMethodCall(mock, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(mock.destroy.callCount, 1);
        equal(editor.tableResizing, null);
    });

    test("leaving a table should not destroy table resizing if resizing is in progress", function() {
        var table = $(editor.body).find("#table")[0];
        editor.tableResizing = new TableResizing(table, {});
        editor.tableResizing.resizingInProgress = function() { return true; };
        trackMethodCall(editor.tableResizing, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(editor.tableResizing.destroy.callCount, 0);
    });

    editor_module("editor table resizing", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.tableResizing = null;
            tableElement = $(NESTED_TABLE_HTML).appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a nested table should stop event propagation", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        $(nestedTable).trigger(enterEvent);

        equal(enterEvent.isPropagationStopped(), true);
    });

    test("hovering a nested table should init new table resizing", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        editor.tableResizing = new TableResizing(tableElement, {});
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, nestedTable);
    });

    test("hovering a nested table should destroy current table resizing", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("leaving a nested table should stop event propagation", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        $(nestedTable).trigger(leaveEvent);

        equal(leaveEvent.isPropagationStopped(), true);
    });

    test("leaving a nested table should init new table resizing with parent table", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_LEAVE });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, tableElement);
    });

    module("editor table resizing", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            },

        teardown: function() {
            if (tableResizing) {
                tableResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be initialized with default options", function() {
        var defaultOptions = {
            rtl: false,
            rootElement: null,
            handles: [{
                direction: SOUTHEAST
            }]
        };
        tableResizing = new TableResizing(tableElement);

        deepEqual(tableResizing.options, defaultOptions);
    });

    test("should be initialized with custom options", function() {
        tableResizing = new TableResizing(tableElement, { rtl: true });

        deepEqual(tableResizing.options.rtl, true);
    });

    module("editor table resizing column resizing", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
        },

        teardown: function() {
            if (tableResizing) {
                tableResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be initialized from table resizing", function() {
        tableResizing = new TableResizing(tableElement, {});

        ok(tableResizing.columnResizing instanceof kendo.ui.editor.ColumnResizing);
    });

    test("should be initialized with custom table resizing options", function() {
        var options = {
            rootElement: "element"
        };
        tableResizing = new TableResizing(tableElement, options);

        deepEqual(tableResizing.columnResizing.options.rootElement, "element");
    });

    test("should be initialized with table element", function() {
        tableResizing = new TableResizing(tableElement, {});

        equal(tableResizing.columnResizing.element, tableElement);
    });

    module("editor table resizing destroy", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            tableResizing = new TableResizing(tableElement, {});
        },

        teardown: function() {
            if (tableResizing) {
                tableResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should call column resizing destroy", function() {
        var columnResizing = tableResizing.columnResizing;
        trackMethodCall(columnResizing, "destroy");

        tableResizing.destroy();

        equal(columnResizing.destroy.callCount, 1);
    });

    test("should detach event handlers", function() {
        tableResizing.destroy();

        ok(jQueryEvents(tableResizing.element) === undefined);
    });

    test("should call resize handles destroy", function() {
        var destroySpies = [];
        tableResizing.showResizeHandles();
        for (var i = 0; i < tableResizing.handles.length; i++) {
            destroySpies.push(spy(tableResizing.handles[i], "destroy"));
        }

        tableResizing.destroy();

        for (var i = 0; i < destroySpies.length; i++) {
            equal(destroySpies[i].calls("destroy"), 1);
        }
    });

    module("editor table resizing resizingInProgress", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            tableResizing = new TableResizing(tableElement, {});
        },

        teardown: function() {
            if (tableResizing) {
                tableResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be true while resizing columns", function() {
        var columnResizing = tableResizing.columnResizing = new ColumnResizing(tableResizing.element, {});

        columnResizing.resizable = { resizing: true, destroy: $.noop };

        equal(tableResizing.resizingInProgress(), true);
    });

    test("should be false when column resizing is stopped", function() {
        var columnResizing = tableResizing.columnResizing = new ColumnResizing(tableResizing.element, {});

        columnResizing.resizable = { resizing: false, destroy: $.noop };

        equal(tableResizing.resizingInProgress(), false);
    });

    module("editor table resizing resize handle", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            tableResizing = new TableResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            if (tableResizing) {
                tableResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be of type TableResizeHandle", function() {
        tableResizing.showResizeHandles();

        for (var i = 0; i < tableResizing.handles.length; i++) {
            ok(tableResizing.handles[i] instanceof kendo.ui.editor.TableResizeHandle);
        }
    });

    test("should be initialized with custom options", function() {
        var customOptions = {
            appendTo: tableResizing.options.rootElement,
            direction: "southeast",
            resizableElement: tableResizing.element
        };

        tableResizing.showResizeHandles();

        equal(tableResizing.handles[0].options.appendTo, customOptions.appendTo);
        equal(tableResizing.handles[0].options.direction, customOptions.direction);
        equal(tableResizing.handles[0].options.resizableElement, customOptions.resizableElement);
    });

    test("should be shown on table click", function() {
        tableResizing.showResizeHandles();
        var showSpy = spy(tableResizing.handles[0], "show");

        triggerEvent(tableResizing.element, { type: "click" });

        equal(showSpy.calls("show"), 1);
    });

    test("should call resize handle show() on showResizeHandles()", function() {
        tableResizing.showResizeHandles();
        var showSpy = spy(tableResizing.handles[0], "show");

        tableResizing.showResizeHandles();

        equal(showSpy.calls("show"), 1);
    });

    module("editor table resizing", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            tableResizing = new TableResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            if (tableResizing) {
                tableResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("click event on editor body should be removed on destroy", function() {
        tableResizing.destroy();

        equal(jQueryEventsInfo(tableResizing.options.rootElement, "click"), undefined);
    });
})();
