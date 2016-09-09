(function() {
    var RowResizing = kendo.ui.editor.RowResizing;
    var initialHeight;
    var nestedTable;
    var nestedTableCell;
    var options;
    var row;
    var rowResizing;
    var tableElement;

    var NS = "kendoEditorRowResizing"
    var HANDLE_SELECTOR = ".k-row-resize-handle";
    var MARKER_SELECTOR = ".k-row-resize-marker";
    var RESIZE_HANDLE_CLASS = "k-row-resize-handle";
    var RESIZE_HANDLE_MARKER_WRAPPER_CLASS = "k-row-resize-marker-wrapper";
    var RESIZE_MARKER_CLASS = "k-row-resize-marker";
    var MAX = 123456;

    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";

    var TR = "tr";
    var TABLE = "table";
    var TBODY = "tbody";

    var CONTENT_EDITABLE = "contenteditable";
    var DOT = ".";
    var FIRST_ROW = "tr:first";
    var SECOND_ROW = "tr:nth-child(2)";
    var FIRST_COLUMN = "td:first";
    var PX = "px";
    var PERCENTAGE = "%";

    var ROW = "tr";
    var COLUMN = "td";

    var FALSE = "false";
    var TRUE = "true";

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
            '<tr id="row4" class="row">' +
                '<td id="col41" class="col">col 41</td>' +
                '<td id="col42" class="col">col 42</td>' +
                '<td id="col43" class="col">col 43</td>' +
            '</tr>' +
            '<tr id="row5" class="row">' +
                '<td id="col51" class="col">col 51</td>' +
                '<td id="col52" class="col">col 52</td>' +
                '<td id="col53" class="col">col 53</td>' +
            '</tr>' +
        '</table>';

    var NESTED_TABLE_HTML =
        '<table id="outerTable" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">' +
                    '<table id="nestedTable" class="k-table">' +
                        '<tr id="row1" class="row">' +
                            '<td id="col11" class="col">col 11</td>' +
                            '<td id="col12" class="col">col 12</td>' +
                        '</tr>' +
                        '<tr id="row2" class="row">' +
                            '<td id="col21" class="col">col 21</td>' +
                            '<td id="col22" class="col">col 22</td>' +
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

    var TABLE_IN_PIXELS_WITH_ROWS_IN_PIXELS =
        '<table id="table" class="k-table" style="width: 400px";padding:20px;>' +
            '<tr id="row1" class="row" style="height:100px;">' +
                '<td id="col11" class="col" style="border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="border:1px solid red;">col 13</td>' +
                '<td id="col14" class="col" style="border:1px solid red;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row" style="height:100px;">' +
                '<td id="col21" class="col" style="border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 23</td>' +
                '<td id="col24" class="col" style="border:1px solid red;">col 24</td>' +
            '</tr>' +
            '<tr id="row3" class="row" style="height:100px;">' +
                '<td id="col31" class="col" style="border:1px solid red;">col 31</td>' +
                '<td id="col32" class="col" style="border:1px solid red;">col 32</td>' +
                '<td id="col33" class="col" style="border:1px solid red;">col 33</td>' +
                '<td id="col34" class="col" style="border:1px solid red;">col 34</td>' +
            '</tr>' +
        '</table>';

    var TABLE_WITH_ROWS_IN_PERCENTAGES =
        '<table id="table" class="k-table" style="height: 500px;";>' +
            '<tr id="row1" class="row" style="height:20%;">' +
                '<td id="col11" class="col" style="border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="border:1px solid red;">col 13</td>' +
                '<td id="col14" class="col" style="border:1px solid red;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row" style="height:20%;">' +
                '<td id="col21" class="col" style="border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="border:1px solid red;">col 23</td>' +
                '<td id="col24" class="col" style="border:1px solid red;">col 24</td>' +
            '</tr>' +
            '<tr id="row3" class="row" style="height:20%;">' +
                '<td id="col31" class="col" style="border:1px solid red;">col 31</td>' +
                '<td id="col32" class="col" style="border:1px solid red;">col 32</td>' +
                '<td id="col33" class="col" style="border:1px solid red;">col 33</td>' +
                '<td id="col34" class="col" style="border:1px solid red;">col 34</td>' +
            '</tr>' +
            '<tr id="row4" class="row" style="height:20%;">' +
                '<td id="col41" class="col" style="border:1px solid red;">col 41</td>' +
                '<td id="col42" class="col" style="border:1px solid red;">col 42</td>' +
                '<td id="col43" class="col" style="border:1px solid red;">col 43</td>' +
                '<td id="col44" class="col" style="border:1px solid red;">col 44</td>' +
            '</tr>' +
            '<tr id="row5" class="row" style="height:20%;">' +
                '<td id="col51" class="col" style="border:1px solid red;">col 51</td>' +
                '<td id="col52" class="col" style="border:1px solid red;">col 52</td>' +
                '<td id="col53" class="col" style="border:1px solid red;">col 53</td>' +
                '<td id="col54" class="col" style="border:1px solid red;">col 54</td>' +
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
            pageY: position.top + to,
            buttons: 0
        }));
    }

    function triggerResizeStart(element, from, to) {
        var resizeHandle = $(QUnit.fixture).find(HANDLE_SELECTOR);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        resizeHandle.trigger($.Event(MOUSE_DOWN, {
            pageX: 0,
            pageY: position.top + from,
            buttons: 0
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
            buttons: 0
        });
    }

    function triggerEvent(element, eventOptions) {
        var options = $.extend({
            type: "mousedown",
            pageX: 0,
            pageY: 0,
            buttons: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    function calculateRowsHeight(rows) {
        var rowsHeights = rows.map(function() {
            return $(this).outerHeight();
        });

        return rowsHeights;
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
            tags: [TR],
            min: 20,
            rootElement: null,
            eventNamespace: DOT + NS,
            rtl: false,
            handle: {
                dataAttribute: "row",
                width: 0,
                height: 10,
                classNames: {
                    handle: RESIZE_HANDLE_CLASS,
                    marker: RESIZE_MARKER_CLASS,
                },
                template:
                    '<div class="' + RESIZE_HANDLE_CLASS + '" unselectable="on" contenteditable="false">' +
                        '<div class="' + RESIZE_HANDLE_MARKER_WRAPPER_CLASS + '">' +
                            '<div class="' + RESIZE_MARKER_CLASS + '"></div>' +
                        '</div>'+
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
            nestedTable = $(tableElement).find("#nestedTable")[0];
            nestedTableCell = $(nestedTable).find(FIRST_COLUMN);
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }

            if (editor.rowResizing) {
                editor.rowResizing.destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a nested table should stop event propagation", function() {
        var enterEvent = $.Event({ type: MOUSE_ENTER });
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        $(nestedTable).trigger(enterEvent);

        equal(enterEvent.isPropagationStopped(), true);
    });

    test("hovering a nested table should init new row resizing", function() {
        editor.rowResizing = new RowResizing(tableElement, {});
        triggerEvent(tableElement, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, nestedTable);
    });

    test("hovering a nested table should destroy current row resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        var destroySpy = spy(editor.rowResizing, "destroy");

        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("leaving a nested table should stop event propagation", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        $(nestedTable).trigger(leaveEvent);

        equal(leaveEvent.isPropagationStopped(), true);
    });

    test("leaving a nested table should init new row resizing with parent table", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });

        triggerEvent(nestedTable, { type: MOUSE_LEAVE });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, tableElement);
    });

    test("leaving a row in nested table should not init new row resizing when resizing is in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return true; };

        triggerEvent(nestedTableCell, { type: MOUSE_LEAVE });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, nestedTable);
    });

    test("leaving a row in nested table should init new row resizing when resizing is not in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return false; };

        triggerEvent(nestedTableCell, { type: MOUSE_LEAVE });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, tableElement);
    });

    test("leaving a row in nested table should not init new row resizing if resize handle exists", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return false; };
        editor.rowResizing.resizeHandle = $();

        triggerEvent(nestedTableCell, { type: MOUSE_LEAVE });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, nestedTable);
    });

    test("leaving a row in nested table should init new row resizing when resize handle does not exist", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return false; };

        triggerEvent(nestedTableCell, { type: MOUSE_LEAVE });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, tableElement);
    });

    editor_module("editor row resizing nested table initialization on mouseup", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            tableElement = $(NESTED_TABLE_HTML).appendTo(editor.body)[0];
            nestedTable = $(tableElement).find("#nestedTable")[0];
            nestedTableCell = $(nestedTable).find(FIRST_COLUMN);
            anotherTable = $(TABLE_HTML).appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }

            if (editor.rowResizing) {
                editor.rowResizing.destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("should init new row resizing if resizing is in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return true; };

        triggerEvent(editor.body, { type: MOUSE_UP, target: $(anotherTable).find(FIRST_COLUMN)[0] });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, anotherTable);
    });

    test("should not init new row resizing if resizing is not in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return false; };

        triggerEvent(editor.body, { type: MOUSE_UP, target: $(anotherTable).find(FIRST_COLUMN)[0] });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
        equal(editor.rowResizing.element, nestedTable);
    });

    test("should destroy current row resizing if resizing is in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return true; };
        var destroySpy = spy(editor.rowResizing, "destroy");

        triggerEvent(editor.body, { type: MOUSE_UP, target: $(anotherTable).find(FIRST_COLUMN)[0] });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("should force resizing if resizing is in progress", function() {
        triggerEvent(tableElement, { type: MOUSE_ENTER });
        triggerEvent(nestedTable, { type: MOUSE_ENTER });
        editor.rowResizing.resizingInProgress = function() { return true; };
        editor.rowResizing.showResizeHandle(nestedTableCell, { buttons: 0, target: nestedTableCell });
        var resizeEndSpy = spy(editor.rowResizing._resizable.userEvents, "_end");

        triggerEvent(editor.body, { type: MOUSE_UP, target: $(anotherTable).find(FIRST_COLUMN)[0] });

        equal(resizeEndSpy.calls("_end"), 1);
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

            if (editor.rowResizing) {
                editor.rowResizing.destroy();
            }

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

    test("should not be shown if mouse button is pressed", function() {
        rowResizing.showResizeHandle(row, { buttons: 1 });

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).length, 0);
    });

    test("should be shown if mouse button is not pressed", function() {
        rowResizing.showResizeHandle(row, { buttons: 0 });

        equal($(rowResizing.options.rootElement).children(HANDLE_SELECTOR).length, 1);
    });

    module("editor column resizing resize handle show", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_HTML).appendTo(wrapper);
            rowResizing = new RowResizing(tableElement[0], {
                rootElement: wrapper
            });
            cell = $(rowResizing.element).find(FIRST_COLUMN);
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should disable editing in the root element", function() {
        rowResizing.showResizeHandle(cell, { buttons: 0 });

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), FALSE);
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
            rowResizing.destroy();
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

    module("editor row resizing resize marker", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement, {
                rootElement: QUnit.fixture
            });
            row = $(rowResizing.element).find(FIRST_ROW);
            initialHeight = row.outerHeight();
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be visible on row border hover", function() {
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

    module("editor row resizing resize handle position top offset", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture);
            tableElement.find("tr").css({
                height: "50px"
            });
            rowResizing = new RowResizing(tableElement[0], {
                rtl: true,
                rootElement: QUnit.fixture
            });
            options = rowResizing.options;
            tbody = tableElement.find(TBODY);
            row = $(rowResizing.element).find(SECOND_ROW);
            topOffset = row.offset().top;
            initialHeight = row.outerHeight();
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be increased while resizing", function() {
        var differenceInPixels = 10;

        triggerResize(row, 0, differenceInPixels);

        roughlyEqual(rowResizing.resizeHandle.css("top"), topOffset + initialHeight + differenceInPixels - (options.handle.height / 2) + PX, 0.01);
    });

    test("should be decreased while resizing", function() {
        var differenceInPixels = (-1) * 10;

        triggerResize(row, 0, differenceInPixels);

        roughlyEqual(rowResizing.resizeHandle.css("top"), topOffset + initialHeight + differenceInPixels - (options.handle.height / 2) + PX, 0.01);
    });
    test("should not be lower than min", function() {
        triggerResize(row, 0, (-1) * MAX);

        roughlyEqual(rowResizing.resizeHandle.css("top"), row.offset().top + options.min + PX, 0.01);
    });

    test("should not be greater than max", function() {
        triggerResize(row, 0, MAX);

        roughlyEqual(rowResizing.resizeHandle.css("top"), tbody.offset().top + tbody.outerHeight() - options.handle.height - options.min + PX, 0.01);
    });

    module("editor row resizing resize handle position", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_HTML).appendTo(wrapper);
            tableElement.find("tr").css({
                height: "50px"
            });
             rowResizing = new RowResizing(tableElement[0], {
                rootElement: wrapper
            });
            options = rowResizing.options;
            tbody = tableElement.find(TBODY);
            row = $(rowResizing.element).find(SECOND_ROW);
            topOffset = row.offset().top;
            initialHeight = row.outerHeight();
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("left offset should be set", function() {
        var row = $(rowResizing.element).find(SECOND_ROW);

        triggerResize(row, 0, 1);

        roughlyEqual(rowResizing.resizeHandle.css("left"), row.offset().left + PX, 0.01);
    });

    module("editor row resizing resizingInProgress()", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture);
            rowResizing = new RowResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            row = $(rowResizing.element).find(SECOND_ROW);
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be equal to false before resizing", function() {
        equal(rowResizing.resizingInProgress(), false);
    });

    test("should be equal to true while resizing", function() {
        triggerResize(row, 0, 10);

        equal(rowResizing.resizingInProgress(), true);
    });

    test("should be equal to false after resizing", function() {
        resizeRow(row, 0, 10);

        equal(rowResizing.resizingInProgress(), false);
    });

    module("editor row resizing resizable", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture);
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

    test("hovering a row should initialize resizable", function() {
        triggerBorderHover(row);

        ok(rowResizing._resizable instanceof kendo.ui.Resizable);
    });

    test("hovering a second row should destroy the resizable of the initial row", function() {
        triggerBorderHover(row);
        var secondRow = $(rowResizing.element).find(SECOND_ROW);
        var destroySpy = spy(rowResizing._resizable, "destroy");

        triggerBorderHover(secondRow);

        equal(destroySpy.calls("destroy"), 1);
    });

    test("hovering a second row should create resizable for second row", function() {
        triggerBorderHover(row);
        var secondRow = $(rowResizing.element).find(SECOND_ROW);

        triggerBorderHover(secondRow);

        equal(rowResizing._resizable.element[0], secondRow[0]);
    });

    module("editor row resizing content editable", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            tableElement = $(TABLE_HTML).appendTo(wrapper);
            rowResizing = new RowResizing(tableElement[0], {
                rootElement: wrapper
            });
            row = $(rowResizing.element).find(FIRST_ROW);
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of a row should disable editing in the root element", function() {
        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), FALSE);
    });

    test("hovering the border of a row should disable the editing in editable root element", function() {
        $(wrapper).removeAttr(CONTENT_EDITABLE);
        $(wrapper).removeAttr(CONTENT_EDITABLE, "");

        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), undefined);
    });

    test("hovering the border of a row should not disable editing in non-editable root element", function() {
        $(wrapper).removeAttr(CONTENT_EDITABLE);

        triggerBorderHover(row);

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), undefined);
    });

    test("leaving the border of a row should enable editing in the root element", function() {
        triggerBorderHover(row);

        triggerEvent(row, { type: MOUSE_MOVE, pageY: MAX });

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), TRUE);
    });

    test("leaving a row should not change editing of the root element when resizing is in progress", function() {
        var editable = $(rowResizing.options.rootElement).attr(CONTENT_EDITABLE);
        rowResizing.resizingInProgress = function() { return true; };
        triggerBorderHover(row);

        triggerEvent(row, { type: MOUSE_MOVE, pageY: MAX });

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), editable);
    });

    test("leaving a row should enable editing in the root element when resizing is not progress", function() {
        rowResizing.resizingInProgress = function() { return false; };
        triggerBorderHover(row);

        triggerEvent(row, { type: MOUSE_MOVE, pageY: MAX });

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), TRUE);
    });

    test("resizing a row should not change the editing of the root element", function() {
        var editable = $(rowResizing.options.rootElement).attr(CONTENT_EDITABLE);
        var initialHeight = row.outerHeight();

        resizeRow(row, initialHeight, initialHeight + 10);

        equal($(rowResizing.options.rootElement).attr(CONTENT_EDITABLE), editable);
    });

    editor_module("editor row resizing editor initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            $(editor.body).append($(CONTENT_HTML)[0]);
            $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
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
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        ok(editor.rowResizing instanceof kendo.ui.editor.RowResizing);
    });

    test("hovering a table should initialize row resizing with table element", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(editor.rowResizing.element, table);
    });

    test("hovering a table should initialize row resizing with custom options", function() {
        var table = $(editor.body).find("#table")[0];

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(editor.rowResizing.options.rtl, false);
        equal(editor.rowResizing.options.rootElement, editor.body);
    });

    test("hovering a different table should destroy current row resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var anotherTable = $(editor.body).find("#table2")[0];
        var rowResizing = editor.rowResizing = new RowResizing(table, {});
        trackMethodCall(rowResizing, "destroy");

        triggerEvent(anotherTable, { type: MOUSE_ENTER });

        equal(rowResizing.destroy.callCount, 1);
    });

    test("hovering the same table twice should not destroy current row resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var rowResizing = editor.rowResizing = new RowResizing(table, {});
        trackMethodCall(rowResizing, "destroy");

        triggerEvent(table, { type: MOUSE_ENTER });

        equal(rowResizing.destroy.callCount, 0);
    });

    test("leaving a table should not destroy row resizing", function() {
        var table = $(editor.body).find("#table")[0];
        var rowResizing = editor.rowResizing = new RowResizing(table, {});
        editor.rowResizing.resizingInProgress = function() { return false; };
        var mock = editor.rowResizing;
        trackMethodCall(mock, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(mock.destroy.callCount, 0);
        notEqual(editor.rowResizing, null);
    });

    test("leaving a table should not destroy table resizing if resizing is in progress", function() {
        var table = $(editor.body).find("#table")[0];
        var rowResizing = editor.rowResizing = new RowResizing(table, {});
        editor.rowResizing.resizingInProgress = function() { return false; };
        var mock = editor.rowResizing;
        trackMethodCall(mock, "destroy");

        triggerEvent(table, { type: MOUSE_LEAVE });

        equal(editor.rowResizing.destroy.callCount, 0);
    });

    editor_module("editor row resizing nested table editor initialization", {
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

    editor_module("editor row resizing editor initialization resizing in progress", {
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

    editor_module("editor row resizing leaving editor content resizing in progress", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.rowResizing = null;
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }

            if (editor.rowResizing) {
                editor.rowResizing.destroy();
            }

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

    module("editor row resizing in pixels", {
        setup: function() {
            tableElement = $(TABLE_IN_PIXELS_WITH_ROWS_IN_PIXELS).appendTo(QUnit.fixture);
            rowResizing = new RowResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            options = rowResizing.options;
            row = $(rowResizing.element).find(FIRST_ROW);
            initialHeightInPixels = row.outerHeight();
            rows = tableElement.find(TBODY).children(TR);
            initialRowsHeights = calculateRowsHeight(rows);
            options = rowResizing.options;
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase table height when resizing", function() {
        var tableHeight = tableElement.outerHeight();
        var differenceInPixels = 10;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        equal(tableElement[0].style.height, tableHeight + differenceInPixels + PX);
    });

    test("should decrease table height when resizing", function() {
        var tableHeight = tableElement.outerHeight();
        var differenceInPixels = (-1) * 10;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels +differenceInPixels);

        equal(tableElement[0].style.height, tableHeight +differenceInPixels + PX);
    });

    test("should decrease row height", function() {
        var differenceInPixels = (-1) * 10;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        equal(row[0].style.height, (initialHeightInPixels + differenceInPixels) + PX);
    });

    test("should not set row height to be lower than min", function() {
        resizeRow(row, initialHeightInPixels, initialHeightInPixels + (-1) * MAX);

        equal(row[0].style.height, options.min + PX);
    });

    test("should not set row height to be greater than the height of the table body", function() {
        var initialTableBodyHeight = $(rowResizing.element).find(TBODY).height();

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + MAX);

        equal(row[0].style.height, initialTableBodyHeight - options.min +PX);
    });

    test("should set computed dimensions to all rows", function() {
        triggerResize(row, initialHeightInPixels, initialHeightInPixels + 10);

        for (var i = 0; i < rows.length; i++) {
            equal(rows[i].style.height, initialRowsHeights[i] + PX);
        }
    });

    test("should not change other rows height", function() {
        var otherRows = rows.filter(function() {
            return (this !== row[0]);
        });
        var initialOtherRowsHeights = calculateRowsHeight(otherRows);
        for (var i = 0; i < otherRows.length; i++) {
            otherRows[i].style.height = initialOtherRowsHeights[i]+PX;
        }

        triggerResize(row, initialHeightInPixels, initialHeightInPixels + 10);

        for (var i = 0; i < initialOtherRowsHeights.length; i++) {
            equal(otherRows[i].style.height, initialOtherRowsHeights[i] + PX);
        }
    });

    module("editor row resizing in percentages", {
        setup: function() {
            tableElement = $(TABLE_WITH_ROWS_IN_PERCENTAGES).appendTo(QUnit.fixture);
            rowResizing = new RowResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            options = rowResizing.options;
            row = $(rowResizing.element).find(SECOND_ROW);
            rows = $(rowResizing.element).find(ROW);
            initialHeightInPixels = row.outerHeight();
            tableBody = $(tableElement).children(TBODY);
            tableBodyHeight = $(tableElement).children(TBODY).height();
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase row height", function() {
        var differenceInPixels = 25;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        roughlyEqual(row[0].style.height, ((initialHeightInPixels + differenceInPixels) / tableBody.height() * 100) + PERCENTAGE, 0.18);
    });

    test("should decrease row height", function() {
        var differenceInPixels = (-1) * 25;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        roughlyEqual(row[0].style.height, ((initialHeightInPixels + differenceInPixels) / tableBody.height() * 100) + PERCENTAGE, 0.15);
    });

    test("should not set row height to be lower than min", function() {
        resizeRow(row, initialHeightInPixels, initialHeightInPixels + (-1) * MAX);

        roughlyEqual(row[0].style.height, (options.min / tableBody.height() * 100) + PERCENTAGE, 0.9);
    });

    test("should not set row height to be greater than the height of the table body", function() {
        var differenceInPixels = (-1) * 25;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + MAX);

        roughlyEqual(row[0].style.height, ((tableBodyHeight - options.min) / tableBody.height() * 100) + PERCENTAGE, 0.2);
    });

    test("should change other rows height", function() {
        var otherRows = rows.filter(function() {
            return (this !== row[0]);
        });
        var initialOtherRowsHeights = calculateRowsHeight(otherRows);
        var differenceInPixels = 25;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        for (var i = 0; i < initialOtherRowsHeights.length; i++) {
            roughlyEqual(otherRows[i].style.height, (initialOtherRowsHeights[i]/ tableBody.height() * 100) + PERCENTAGE, 0.2);
        }
    });

    module("editor row resizing without explicit dimensions", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture);
            rowResizing = new RowResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            options = rowResizing.options;
            row = $(rowResizing.element).find(FIRST_ROW);
            initialHeightInPixels = row.outerHeight();
            rows = $(rowResizing.element).find(ROW);
            options = rowResizing.options;
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set computed style height in pixels to its element", function() {
        var tableHeight = $(tableElement).outerHeight();
        var differenceInPixels = 10;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        equal(tableElement[0].style.height, tableHeight + differenceInPixels + PX);
    });

    test("should override table style height", function() {
        tableElement[0].style.height = "1px";
        var tableHeight = $(tableElement).outerHeight();
        var differenceInPixels = 10;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        equal(tableElement[0].style.height, tableHeight + differenceInPixels + PX);
    });

    test("should set computed style height in percentages to its element", function() {
        tableElement[0].style.height = "50%";

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + 5);

        roughlyEqual(tableElement[0].style.height, ((tableElement.outerHeight() / tableElement.parent().height() * 100) + PERCENTAGE), 0.1);
    });

    test("row height should be increased when resizing", function() {
        var differenceInPixels = 10;

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + differenceInPixels);

        equal(row[0].style.height, (initialHeightInPixels + differenceInPixels + PX));
    });

    test("row height should not be lower than min", function() {
        resizeRow(row, initialHeightInPixels, initialHeightInPixels + (-1) * MAX);

        equal(row[0].style.height, options.min + PX);
    });

    test("row height should not be greater than table body height", function() {
        var initialTableBodyHeight = $(rowResizing.element).find(TBODY).height();

        resizeRow(row, initialHeightInPixels, initialHeightInPixels + MAX);

        equal(row[0].style.height, initialTableBodyHeight - options.min + PX);
    });

    test("should not change other rows height", function() {
        var otherRows = rows.filter(function() {
            return (this !== row[0]);
        });
        var initialOtherRowsHeights = calculateRowsHeight(otherRows);
        for (var i = 0; i < otherRows.length; i++) {
            otherRows[i].style.height = initialOtherRowsHeights[i] + PX;
        }

        triggerResize(row, initialHeightInPixels, initialHeightInPixels + 10);

        for (var i = 0; i < initialOtherRowsHeights.length; i++) {
            equal(otherRows[i].style.height, initialOtherRowsHeights[i] + PX);
        }
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
