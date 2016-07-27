(function() {
    var TableResizing = kendo.ui.editor.TableResizing;
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var editor;
    var initialWidth;
    var tableElement;
    var tableResizing;
    var anotherTable;
    var nestedTable;
    var nestedTableColumn;
    var wrapper;

    var DESTROY = "destroy";
    var DOT = ".";
    var FIRST_COLUMN = "td:first";
    var HANDLE_SELECTOR = ".k-resize-handle";
    var NS = "kendoEditor";
    var MAX = 123456;
    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var PERCENTAGE = "%";
    var RTL_MODIFIER = -1;
    var PX = "px";
    var SHOW = "show";

    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";

    var TABLE_HTML =
        '<table id="table" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="border:1px solid blue;">col 11</td>' +
                '<td id="col12" class="col" style="border:1px solid blue;">col 12</td>' +
                '<td id="col13" class="col" style="border:1px solid blue;">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="border:1px solid blue;">+col 21</td>' +
                '<td id="col22" class="col" style="border:1px solid blue;">+col 22</td>' +
                '<td id="col23" class="col" style="border:1px solid blue;">+col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col" style="border:1px solid blue;">+col 31</td>' +
                '<td id="col32" class="col" style="border:1px solid blue;">+col 32</td>' +
                '<td id="col33" class="col" style="border:1px solid blue;">+col 33</td>' +
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

    function triggerResize(element, from, to, options) {
        var doc = $((element[0] || element).ownerDocument.documentElement);
        var resizeHandle = $(element);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        triggerResizeStart(element, from, to);

        doc.trigger($.Event(MOUSE_MOVE, {
            pageX: position.left + to,
            pageY: position.top + to,
        }));
    }

    function triggerResizeStart(element, from, to) {
        var resizeHandle = $(element);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        resizeHandle.trigger($.Event(MOUSE_DOWN, {
            pageX: position.left + from,
            pageY: position.top + from
        }));
    }

//table resizing is natively supported in IE and Firefox
if (!kendo.support.browser.msie && !kendo.support.browser.mozilla) {

    editor_module("editor table resizing nested table initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.tableResizing = null;
            tableElement = $(NESTED_TABLE_HTML).appendTo(editor.body)[0];
            nestedTable = $(tableElement).find("#nestedTable")[0];
            nestedTableColumn = $(nestedTable).find(FIRST_COLUMN)[0];
        },

        afterEach: function() {
            if (editor.tableResizing) {
                editor.tableResizing.destroy();
            }

            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("clicking a nested table should init table resizing", function() {
        triggerEvent(nestedTable, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, nestedTable);
    });

    test("clicking a column in nested table should init table resizing", function() {
        triggerEvent(nestedTableColumn, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, nestedTable);
    });

    test("clicking from parent table to nested table should destroy current table resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(nestedTable, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("clicking from parent table to column in nested table should destroy current table resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(nestedTableColumn, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("clicking from parent table to nested table should init new table resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        triggerEvent(nestedTable, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, nestedTable);
    });

    test("clicking from parent table to column in nested table should init new table resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        triggerEvent(nestedTableColumn, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, nestedTable);
    });

    test("clicking from nested table to parent table should destroy current table resizing", function() {
        triggerEvent(nestedTable, { type: MOUSE_DOWN });
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("clicking from nested table to parent table should init new table resizing", function() {
        triggerEvent(nestedTable, { type: MOUSE_DOWN });

        triggerEvent(tableElement, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, tableElement);
    });

    test("clicking from column in nested table to parent table should destroy current table resizing", function() {
        triggerEvent(nestedTableColumn, { type: MOUSE_DOWN });
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("clicking from column in nested table to parent table should init new table resizing", function() {
        triggerEvent(nestedTableColumn, { type: MOUSE_DOWN });
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
        equal(editor.tableResizing.element, tableElement);
    });

    editor_module("editor table resizing initialization", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.tableResizing = null;
            $(editor.body).append($(CONTENT_HTML)[0]);
            tableElement = $(editor.body).find("#table")[0];
        },

        afterEach: function() {
            if (editor.tableResizing) {
                editor.tableResizing.destroy();
            }

            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("clicking a table should initialize table resizing", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        ok(editor.tableResizing instanceof kendo.ui.editor.TableResizing);
    });

    test("clicking a table should initialize table resizing with table element", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(editor.tableResizing.element, tableElement);
    });

    test("clicking a table should initialize table resizing with custom options", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(editor.tableResizing.options.rtl, false);
        equal(editor.tableResizing.options.rootElement, editor.body);
    });

    test("clicking a table should init resize handles", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(editor.tableResizing.handles.length, 8);
    });

    editor_module("editor table resizing destroying on leave", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
            anotherTable = $(TABLE_HTML).attr("id", "table2").appendTo(editor.body)[0];
            editor.tableResizing = new TableResizing(tableElement);
        },

        afterEach: function() {
            if (editor.tableResizing) {
                editor.tableResizing.destroy();
            }

            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("leaving the editor content should not destroy table resizing if resizing is in progress", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        var destroySpy = spy(editor.tableResizing, "destroy");
        editor.tableResizing.resizingInProgress = function() { return true; };

        $(editor.body).trigger(leaveEvent);

        equal(destroySpy.calls("destroy"), 0);
    });

    test("leaving the editor content should destroy table resizing if resizing is not in progress", function() {
        var leaveEvent = $.Event({ type: MOUSE_LEAVE });
        var destroySpy = spy(editor.tableResizing, "destroy");
        editor.tableResizing.resizingInProgress = function() { return false; };

        $(editor.body).trigger(leaveEvent);

        equal(destroySpy.calls("destroy"), 1);
    });

    editor_module("editor table resizing destroying on click", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            tableElement = $(TABLE_HTML).appendTo(editor.body)[0];
            editor.tableResizing = new TableResizing(tableElement);
        },

        afterEach: function() {
            if (editor.tableResizing) {
                editor.tableResizing.destroy();
            }

            if (editor) {
                $(editor.body).find("*").remove();
            }

            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("clicking on the resizing element should not destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 0);
    });

    test("clicking on a child element should not destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent($(tableElement).find(FIRST_COLUMN)[0], { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 0);
    });

    test("clicking on the content while resizing is in progress should not destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");
        editor.tableResizing.resizingInProgress = function() { return true; };

        triggerEvent(editor.body, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 0);
    });

    test("clicking on the content while resizing is not in progress should destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");
        editor.tableResizing.resizingInProgress = function() { return false; };

        triggerEvent(editor.body, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("clicking on an element with data attribute equal to table should not destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");
        editor.tableResizing.resizingInProgress = function() { return false; };
        editor.tableResizing.showResizeHandles();

        triggerEvent(editor.tableResizing.handles[0].element, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 0);
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
            minWidth: 50,
            minHeight: 50,
            handles: [{
                direction: EAST
            }, {
                direction: NORTH
            }, {
                direction: NORTHEAST
            }, {
                direction: NORTHWEST
            }, {
                direction: SOUTH
            }, {
                direction: SOUTHEAST
            }, {
                direction: SOUTHWEST
            }, {
                direction: WEST
            }]
        };
        tableResizing = new TableResizing(tableElement);

        deepEqual(tableResizing.options, defaultOptions);
    });

    test("should be initialized with custom options", function() {
        tableResizing = new TableResizing(tableElement, { rtl: true });

        deepEqual(tableResizing.options.rtl, true);
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

    module("editor table resizing resize", {
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

    test("should call showResizeHandles()", function() {
        tableResizing.showResizeHandles();
        var showSpy = spy(tableResizing, "showResizeHandles");

        tableResizing.resize();

        equal(showSpy.calls("showResizeHandles"), 1);
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
            direction: "east",
            resizableElement: tableResizing.element
        };

        tableResizing.showResizeHandles();

        equal(tableResizing.handles[0].options.appendTo, customOptions.appendTo);
        equal(tableResizing.handles[0].options.direction, customOptions.direction);
        equal(tableResizing.handles[0].options.resizableElement, customOptions.resizableElement);
    });

    test("should call resize handle show() on showResizeHandles()", function() {
        tableResizing.showResizeHandles();
        var showSpy = spy(tableResizing.handles[0], SHOW);

        tableResizing.showResizeHandles();

        equal(showSpy.calls(SHOW), 1);
    });

    test("should call resize() on resize handle drag event", function() {
        var resizeSpy = spy(tableResizing, "resize");
        tableResizing.showResizeHandles();

        triggerResize(tableResizing.handles[0].element, 0, 20);

        equal(resizeSpy.calls("resize"), 1);
    });

    test("should call resize() with deltaX argument on resize handle drag event", function() {
        var resizeSpy = spy(tableResizing, "resize");
        var deltaX = 20;
        tableResizing.showResizeHandles();

        triggerResize(tableResizing.handles[0].element, 0, deltaX);

        equal(resizeSpy.args("resize")[0]["deltaX"], deltaX);
    });

    test("should call resize() with deltaY argument on resize handle drag event", function() {
        var resizeSpy = spy(tableResizing, "resize");
        var deltaY = 30;
        tableResizing.showResizeHandles();

        triggerResize(tableResizing.handles[1].element, 0, deltaY);

        equal(resizeSpy.args("resize")[0]["deltaY"], deltaY);
    });

    module("editor table resizing resize width", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture);
            tableElement = $(QUnit.fixture).find("#table");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase width", function() {
        var initialWidth = tableElement.width();
        var deltaX = 20;

        tableResizing.resize({ deltaX: deltaX });

        equal(tableElement.css("width"), initialWidth + deltaX + PX);
    });

    test("should decrease width", function() {
        var initialWidth = tableElement.width();
        var deltaX = 20;

        tableResizing.resize({ deltaX: (-1) * deltaX });

        equal(tableElement.css("width"), initialWidth + (-1) * deltaX + PX);
    });

    test("should change width when style width is smaller", function() {
        tableElement.css("width", "1px");
        var initialWidth = tableElement.width();
        var deltaX = 20;

        tableResizing.resize({ deltaX: deltaX });

        equal(tableElement.css("width"), initialWidth + deltaX + PX);
    });

    test("should not set width lower than min", function() {
        tableResizing.resize({ deltaX: (-1) * MAX });

        ok(parseFloat(tableElement.css("width")) >= tableResizing.options.minWidth);
    });

    test("should not set width greater than parent width", function() {
        wrapper.css("padding", "20px");

        tableResizing.resize({ deltaX: MAX });

        equal(tableElement[0].style.width, wrapper.width() + PX);
    });

    module("editor table resizing resize width in percentages", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css("width", "400px").css("border", "1px solid red");
            tableElement = $(QUnit.fixture).find("#table").css("width", "50%");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase width", function() {
        var initialWidthInPixels = tableElement.width();
        var initialWidthInPercentages = parseFloat(tableElement[0].style.width);
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialWidthInPixels) * 100;

        tableResizing.resize({ deltaX: differenceInPixels });

        equal(tableElement[0].style.width, initialWidthInPercentages + differenceInPercentages + PERCENTAGE);
    });

    test("should decrease width", function() {
        var initialWidthInPixels = tableElement.width();
        var initialWidthInPercentages = parseFloat(tableElement[0].style.width);
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialWidthInPixels) * 100;

        tableResizing.resize({ deltaX: (-1) * differenceInPixels });

        equal(tableElement[0].style.width, initialWidthInPercentages + (-1) * differenceInPercentages + PERCENTAGE);
    });

    test("should should not be lower than min", function() {
        var initialWidthInPixels = tableElement.width();
        var minInPercentages = (tableResizing.options.minWidth / initialWidthInPixels) * 100;

        tableResizing.resize({ deltaX: (-1) * MAX });

        ok(parseFloat(tableElement[0].style.width) >= minInPercentages);
    });

    test("should should not be lower than max", function() {
        tableResizing.resize({ deltaX: MAX });

        equal(tableElement[0].style.width, "100%");
    });

    module("editor table resizing resize height in pixels", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css("height", "800px");
            tableElement = $(QUnit.fixture).find("#table");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase height", function() {
        var initialHeight = tableElement.height();
        var deltaY = 20;

        tableResizing.resize({ deltaY: deltaY });

        equal(tableElement.css("height"), initialHeight + deltaY + PX);
    });

    test("should decrease height", function() {
        var initialHeight = tableElement.height();
        var deltaY = 20;

        tableResizing.resize({ deltaY: (-1) * deltaY });

        equal(tableElement[0].style.height, initialHeight + (-1) *  deltaY + PX);
    });
    test("should change height when style height is smaller", function() {
        tableElement.css("height", "1px");
        var initialHeight = tableElement.height();
        var deltaY = 20;

        tableResizing.resize({ deltaY: deltaY });

        equal(tableElement.css("height"), initialHeight + deltaY + PX);
    });

    test("should not set height lower than min", function() {
        tableResizing.resize({ deltaY: (-1) * MAX });

        ok(parseFloat(tableElement.css("height")) >= tableResizing.options.minHeight);
    });

    test("should not set height greater than parent height", function() {
        wrapper.outerHeight($(tableElement).outerHeight() + 20);

        tableResizing.resize({ deltaY: MAX });

        equal(tableElement.css("height"), wrapper.outerHeight() + PX);
    });

    module("editor table resizing resize height in percentages", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css("height", "400px").css("border", "1px solid red");
            tableElement = $(QUnit.fixture).find("#table").css("height", "50%");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase height", function() {
        var initialHeightInPixels = tableElement.height();
        var initialHeightInPercentages = parseFloat(tableElement[0].style.height);
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialHeightInPixels) * 100;

        tableResizing.resize({ deltaY: differenceInPixels });

        equal(tableElement[0].style.height, initialHeightInPercentages + differenceInPercentages + PERCENTAGE);
    });

    test("should decrease height", function() {
        var initialHeightInPixels = tableElement.height();
        var initialHeightInPercentages = parseFloat(tableElement[0].style.height);
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialHeightInPixels) * 100;

        tableResizing.resize({ deltaY: (-1) * differenceInPixels });

        equal(tableElement[0].style.height, initialHeightInPercentages + (-1) * differenceInPercentages + PERCENTAGE);
    });

    test("should should not be lower than min", function() {
        var initialHeightInPixels = tableElement.height();
        var minInPercentages = (tableResizing.options.minHeight / initialHeightInPixels) * 100;

        tableResizing.resize({ deltaY: (-1) * MAX });

        ok(parseFloat(tableElement[0].style.height) >= minInPercentages);
    });

    test("should should not be lower than max", function() {
        tableResizing.resize({ deltaY: MAX });

        equal(tableElement[0].style.height, "100%");
    });

    module("editor table resizing resize width in pixels rtl", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css("border", "1px solid red");
            tableElement = $(QUnit.fixture).find("#table").css("width", "400px");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture,
                rtl: true
            });
            initialWidth = tableElement.width();
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should decrease width", function() {
        var deltaX = 20;

        tableResizing.resize({ deltaX: deltaX });

        equal(tableElement.css("width"), initialWidth + (RTL_MODIFIER * deltaX) + PX);
    });

    test("should increase width", function() {
        var deltaX = 20;

        tableResizing.resize({ deltaX: RTL_MODIFIER * deltaX });

        equal(tableElement.css("width"), initialWidth + deltaX + PX);
    });

    test("should not set width lower than min", function() {
        tableResizing.resize({ deltaX: MAX });

        ok(parseFloat(tableElement.css("width")) >= tableResizing.options.minWidth);
    });

    test("should not set width greater than parent width", function() {
        wrapper.css("padding", "20px");

        tableResizing.resize({ deltaX: RTL_MODIFIER * MAX });

        equal(tableElement[0].style.width, wrapper.width() + PX);
    });
}
})();
