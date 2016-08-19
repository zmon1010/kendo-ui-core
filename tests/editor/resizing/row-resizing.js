(function() {
    var RowResizing = kendo.ui.editor.RowResizing;
    var row;
    var rowResizing;
    var tableElement;

    var NS = "kendoEditorRowResizing"
    var HANDLE_SELECTOR = ".k-row-resize-handle";
    var MARKER_SELECTOR = ".k-row-resize-marker";
    var MAX = 123456;

    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";

    var TR = "tr";
    var TABLE = "table";
    var TBODY = "tbody";

    var DOT = ".";
    var FIRST_ROW = "tr:first";
    var SECOND_ROW = "tr:nth-child(2)";
    var PX = "px";

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

    function resizeRow(element, from, to, options) {
        triggerBorderHover(element, options);

        triggerResize(element, from, to, options);

        triggerResizeEnd(element);
    }

    function triggerResize(element, from, to, options) {
        triggerBorderHover(element, options);

        var doc = $(element[0].ownerDocument.documentElement);
        var resizeHandle = $(QUnit.fixture).find(HANDLE_SELECTOR);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        triggerResizeStart(element, from, to);

        doc.trigger($.Event(MOUSE_MOVE, {
            pageX: 0,
            pageY: position.top + to
        }));
    }

    function triggerResizeStart(element, from, to) {
        var resizeHandle = $(QUnit.fixture).find(HANDLE_SELECTOR);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        resizeHandle.trigger($.Event(MOUSE_DOWN, {
            pageX: 0,
            pageY: position.top + from
        }));
    }

    function triggerResizeEnd(column) {
        $(column[0].ownerDocument.documentElement).trigger($.Event(MOUSE_UP));
    }

    function triggerBorderHover(element, options) {
        var rtl = (options || {}).rtl;
        var height = rtl ? 0 : $(element).outerHeight();

        triggerEvent(element, {
            type: MOUSE_MOVE,
            clientX: 0,
            clientY: $(element).offset().top + height - $(element.ownerDocument).scrollTop(),
        });
    }

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
            min: 20,
            rootElement: null,
            rtl: false,
            handle: {
                height: 10,
                template:
                    '<div class="k-row-resize-handle">' +
                        '<div class="k-row-resize-marker-wrapper">' +
                            '<div class="k-row-resize-marker"></div>' +
                        '</div>' +
                    '</div>'
            }
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

    editor_module("editor row resizing editor initialization", {
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
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");
        editor.rowResizing.resizingInProgress = function() { return true; };

        triggerEvent(editor.body, { type: MOUSE_LEAVE });

        equal(destroySpy.calls("destroy"), 0);
    });

    test("should destroy row resizing if resizing is not in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");
        editor.rowResizing.resizingInProgress = function() { return false; };

        triggerEvent(editor.body, { type: MOUSE_LEAVE });

        equal(destroySpy.calls("destroy"), 1);
    });

    module("editor row resizing resize handle", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            options = rowResizing.options;
            row = $(rowResizing.element).find(FIRST_ROW);
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of the first row should append resize handle", function() {
        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    test("hovering the border of the first row multiple times should append only one resize handle", function() {
        triggerBorderHover(row);
        triggerBorderHover(row);
        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    test("hovering the last row should not create resize handle", function() {
        var row = $(rowResizing.element).find("tr:last");

        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).length, 0);
    });

    test("resize handle should be stored as a reference", function() {
        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR)[0], rowResizing.resizeHandle[0]);
    });

    test("left offset should be set", function() {
        var leftOffset = row.offset().left;

        triggerBorderHover(row);

        roughlyEqual(rowResizing.resizeHandle.css("left"), leftOffset + PX, 0.01);
    });

    test("top offset should be set", function() {
        var height = row.outerHeight();
        var topOffset = row.offset().top;

        triggerBorderHover(row);

        roughlyEqual(rowResizing.resizeHandle.css("top"), (topOffset + height - (options.handle.height / 2)) + PX, 0.01);
    });

    test("width should be equal to table body width", function() {
        triggerBorderHover(row);

        equal(rowResizing.resizeHandle[0].style.width, $(tableElement).find(TBODY).width() + PX);
    });

    test("height should be equal to options height", function() {
        triggerBorderHover(row);

        equal(rowResizing.resizeHandle[0].style.height, options.handle.height + PX);
    });

    test("should be shown on hover", function() {
        triggerBorderHover(row);

        equal(rowResizing.resizeHandle.css("display"), "table");
    });

    test("should be removed when leaving the row border", function() {
        triggerBorderHover(row);
        $(rowResizing.resizeHandle).show();

        triggerEvent(row, { type: MOUSE_MOVE, pageY: MAX });

        equal($(rowResizing.options.rootElement).find(HANDLE_SELECTOR).length, 0);
    });

    test("should store data about resizing row", function() {
        triggerBorderHover(row);

        equal(rowResizing.resizeHandle.data("row"), row[0]);
    });

    test("should be recreated when resizing a different row", function() {
        triggerBorderHover(row);
        var initialResizeHandle = rowResizing.resizeHandle;
        var secondRow = $(rowResizing.element).find(SECOND_ROW);

        triggerBorderHover(secondRow);

        ok(rowResizing.resizeHandle !== initialResizeHandle);
    });

    test("should be removed when resizing a different row", function() {
        triggerBorderHover(row);
        var secondRow = $(rowResizing.element).find(SECOND_ROW);

        triggerBorderHover(secondRow);

        equal($(rowResizing.options.rootElement).find(HANDLE_SELECTOR).length, 1);
    });

    test("resize handle should be re-created when hovering a different row", function() {
        triggerBorderHover(row);
        var secondRow = $(rowResizing.element).find(SECOND_ROW);

        triggerBorderHover(secondRow);

        equal($(rowResizing.options.rootElement).find(HANDLE_SELECTOR).length, 1);
    });

    editor_module("editor row resizing resize handle", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.tableResizing = null;
            $(editor.body).append($(TABLE_HTML)[0]);
            tableElement = $(editor.body).find("#table")[0];
            rowResizing = editor.rowResizing = new RowResizing(tableElement, {
                rootElement: QUnit.fixture
            });
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be removed when moving out of a table ", function() {
        triggerBorderHover($(rowResizing.element).find(FIRST_ROW));

        triggerEvent(tableElement, { type: MOUSE_LEAVE });

        equal($(rowResizing.options.rootElement).find(HANDLE_SELECTOR).length, 1);
    });

    test("should be initialized when hovering a scrolled editor document", function() {
        $(tableElement).height($(editor.document).height() + 100);
        $(editor.document).scrollTop(20);

        triggerBorderHover($(tableElement).find(SECOND_ROW)[0]);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    module("editor row resizing existing resize handle", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            row = $(rowResizing.element).find(FIRST_ROW);
            initialHeight = row.outerHeight();
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be shown when hovering a row", function() {
        triggerBorderHover(row);

        equal(rowResizing.resizeHandle.css("display"), "table");
    });

    test("should be shown when hovering a row for a second time", function() {
        triggerBorderHover(row);
        triggerEvent(row, { type: MOUSE_MOVE, pageX: MAX });

        triggerBorderHover(row);

        equal(rowResizing.resizeHandle.css("display"), "table");
    });

    test("should be shown when resizing is in progress", function() {
        triggerBorderHover(row);
        rowResizing.resizingInProgress = function() { return true; };

        triggerResize(row, initialHeight, initialHeight + 10);

        equal(rowResizing.resizeHandle.css("display"), "table");
    });

    test("should be shown when resizing is not in progress", function() {
        triggerBorderHover(row);
        rowResizing.resizingInProgress = function() { return false; };

        triggerResize(row, initialHeight, initialHeight + 10);

        equal(rowResizing.resizeHandle.css("display"), "table");
    });

    module("editor row resizing resize hint marker", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            row = $(rowResizing.element).find(FIRST_ROW);
            initialHeight = row.outerHeight();
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resize hint marker should not be visible on row border hover", function() {
        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).find(MARKER_SELECTOR).css("display"), "none");
    });

    test("should be visible on resize start", function() {
        triggerBorderHover(row);

        triggerResizeStart(row, initialHeight, initialHeight + 10);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).find(MARKER_SELECTOR).css("display"), "block");
    });

    test("should be visible while resizing", function() {
        triggerResize(row, initialHeight, initialHeight + 10);

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).find(MARKER_SELECTOR).css("display"), "block");
    });

    test("should be visible on resize handle mouse down", function() {
        triggerBorderHover(row);

        triggerEvent(rowResizing.resizeHandle, { type: MOUSE_DOWN });

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).find(MARKER_SELECTOR).css("display"), "block");
    });

    test("should not be visible on resize handle mouse up", function() {
        triggerBorderHover(row);

        triggerEvent(rowResizing.resizeHandle, { type: MOUSE_UP });

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).find(MARKER_SELECTOR).css("display"), "none");
    });

    module("editor row resizing destroy", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            row = $(rowResizing.element).find(FIRST_ROW);
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

    test("should remove resize handle from DOM", function() {
        triggerBorderHover(row);

        rowResizing.destroy();

        equal($(rowResizing.options.rootElement).find(HANDLE_SELECTOR).length, 0);
    });

    test("should set resize handle to null", function() {
        triggerBorderHover(row);

        rowResizing.destroy();

        equal(rowResizing.resizeHandle, null);
    });
})();
