(function() {
    var RowResizing = kendo.ui.editor.RowResizing;
    var rowResizing;
    var tableElement;
    var DOT = ".";
    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var NS = "kendoEditorRowResizing"
    var TABLE_HTML =
        '<table id="table" class="k-table" style="border:1px solid red">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">col 11</td>' +
                '<td id="col12" class="col">col 12</td>' +
                '<td id="col13" class="col">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col">col 21</td>' +
                '<td id="col22" class="col">col 22</td>' +
                '<td id="col23" class="col">col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col">col 31</td>' +
                '<td id="col32" class="col">col 32</td>' +
                '<td id="col33" class="col">col 33</td>' +
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
            pageX: 0,
            pageY: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    module("editor row resizing initialization", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
        },

        teardown: function() {
            $(".table").remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be initialized with element that is different from table", function() {
        rowResizing = new RowResizing(QUnit.fixture, {});

        equal(rowResizing.element, undefined);
    });

    test("should be initialized with table element", function() {
        rowResizing = new RowResizing(tableElement, {});

        equal(rowResizing.element, tableElement);
    });

    test("should be initialized with default options", function() {
        var defaultOptions = {
            tags: ["tr"],
            rootElement: null,
            rtl: false
        };

        rowResizing = new RowResizing(tableElement, {});

        deepEqual(rowResizing.options, defaultOptions);
    });

    test("should be initialized with custom tags", function() {
        var options = { tags: ["th"] };

        rowResizing = new RowResizing(tableElement, options);

        deepEqual(rowResizing.options.tags, ["th"]);
    });

    test("should be initialized with an array of tags", function() {
        var options = { tags: "tag" };

        rowResizing = new RowResizing(tableElement, options);

        deepEqual(rowResizing.options.tags, ["tag"]);
    });

    test("mousemove handlers should be attached to all rows", function() {
        rowResizing = new RowResizing(tableElement, {});

        assertEvent(tableElement, { type: MOUSE_MOVE, selector: "tr", namespace: NS });
    });

    module("editor row resizing destroy", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement);
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should detach event handlers", function() {
        rowResizing.destroy();

        equal(jQueryEvents(rowResizing.element), undefined);
    });

    test("should set element to null", function() {
        rowResizing.destroy();

        equal(rowResizing.element, null);
    });

    editor_module("editor row resizing initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            $(editor.body).append($(CONTENT_HTML)[0]);
            tableElement = $(editor.body).find("#table")[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.rowResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a table should initialize row resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
    });

    test("hovering a table should initialize row resizing with table element", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        equal(editor.rowResizing.element, tableElement);
    });

    test("hovering a table should initialize row resizing with custom options", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        equal(editor.rowResizing.options.rtl, false);
        equal(editor.rowResizing.options.rootElement, editor.body);
    });

    test("hovering a different table should destroy current row resizing", function() {
        var anotherTable = $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
        var rowResizing = editor.rowResizing = new RowResizing(tableElement, {});
        var destroySpy = spy(rowResizing, "destroy");

        triggerEvent(anotherTable, { type: MOUSE_ENTER });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("hovering the same table twice should not destroy current row resizing", function() {
        var rowResizing = editor.rowResizing = new RowResizing(tableElement, {});
        var destroySpy = spy(rowResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_ENTER });

        equal(destroySpy.calls("destroy"), 0);
    });

    test("leaving a table should not destroy row resizing", function() {
        var rowResizing = editor.rowResizing = new RowResizing(tableElement, {});
        editor.rowResizing.resizingInProgress = function() { return false; };
        var destroySpy = spy(rowResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_LEAVE });

        equal(destroySpy.calls("destroy"), 0);
        notEqual(editor.rowResizing, null);
    });

    test("leaving a table should not destroy table resizing if resizing is in progress", function() {
        var rowResizing = editor.rowResizing = new RowResizing(tableElement, {});
        editor.rowResizing.resizingInProgress = function() { return false; };
        var destroySpy = spy(rowResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_LEAVE });

        equal(destroySpy.calls("destroy"), 0);
    });

    editor_module("editor row resizing nested table initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            tableElement = $(NESTED_TABLE_HTML).appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.rowResizing);
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
        editor.rowResizing = new RowResizing(tableElement, {});
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, nestedTable);
    });

    test("hovering a nested table should destroy current table resizing", function() {
        var nestedTable = $(tableElement).find("#nestedTable")[0];
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");

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

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, tableElement);
    });

    editor_module("editor row resizing initialization resizing in progress", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
            anotherTable = $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.rowResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering another table while resizing is in progress should not destroy current row resizing", function() {
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");
        editor.rowResizing.resizingInProgress = function() { return true; };

        $(anotherTable).trigger(enterEvent);

        equal(destroySpy.calls("destroy"), 0);
    });

    test("hovering another table while resizing is not in progress should destroy current row resizing", function() {
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");
        editor.rowResizing.resizingInProgress = function() { return false; };

        $(anotherTable).trigger(enterEvent);

        equal(destroySpy.calls("destroy"), 1);
    });

    editor_module("editor table resizing leaving editor content", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.rowResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not destroy row resizing if resizing is in progress", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");
        editor.rowResizing.resizingInProgress = function() { return true; };

        $(editor.body).trigger(leaveEvent);

        equal(destroySpy.calls("destroy"), 0);
    });

    test("should destroy row resizing if resizing is not in progress", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");
        editor.rowResizing.resizingInProgress = function() { return false; };

        $(editor.body).trigger(leaveEvent);

        equal(destroySpy.calls("destroy"), 1);
    });
})();
