(function() {
    var TableResizing = kendo.ui.editor.TableResizing;
    var editor;
    var initialWidth;
    var nestedTable;
    var nestedTableColumn;
    var tableElement;
    var tableResizing;
    var wrapper;

    var DOT = ".";
    var CONTENT_EDITABLE = "contenteditable";
    var FIRST_COLUMN = "td:first";
    var MAX = 123456;
    var MOUSE_DOWN = "mousedown";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var PERCENTAGE = "%";
    var RTL_MODIFIER = -1;
    var PX = "px";
    var SELECT = "select";
    var SHOW = "show";
    var TIMEOUT = 100;

    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";

    var ROW = "tr";
    var COLUMN = "td";

    var TABLE_HTML =
        '<table id="table" class="k-table" style="border:1px solid black;">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="border:1px solid blue;">col 11</td>' +
                '<td id="col12" class="col" style="border:1px solid blue;">col 12</td>' +
                '<td id="col13" class="col" style="border:1px solid blue;">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="border:1px solid blue;">col 21</td>' +
                '<td id="col22" class="col" style="border:1px solid blue;">col 22</td>' +
                '<td id="col23" class="col" style="border:1px solid blue;">col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col" style="border:1px solid blue;">col 31</td>' +
                '<td id="col32" class="col" style="border:1px solid blue;">col 32</td>' +
                '<td id="col33" class="col" style="border:1px solid blue;">col 33</td>' +
            '</tr>' +
        '</table>';
    var NESTED_TABLE_HTML =
        '<table id="table" class="k-table" style="border:1px solid red;">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="border:1px solid blue;">' +
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
    var NESTED_TABLE_HTML_IN_PERCENTAGES =
        '<table id="table" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">' +
                    '<table id="nestedTable" style="width:100%">' +
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
    var INNER_ELEMENT_HTML = "<div id='innerElement'>inner</div>"
    var CONTENT_HTML =
        '<div id="wrapper">' +
            INNER_ELEMENT_HTML +
            TABLE_HTML +
        '</div>';

    function triggerEvent(element, eventOptions) {
        var options = $.extend({
            type: "mousedown",
            clientX: 0,
            clientY: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    function triggerResize(element, from, to) {
        var doc = $((element[0] || element).ownerDocument.documentElement);
        var resizeHandle = $(element);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        triggerResizeStart(element, from, to);

        doc.trigger($.Event(MOUSE_MOVE, {
            pageX: position.left + to,
            pageY: position.top + to
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

    function getColumnWidths(table, columnIndex) {
        var columns = $(table).find(ROW).children(COLUMN)
            .filter(function() {
                return ($(this).index() === columnIndex);
            });

        return calculateColumnWidths(columns);
    }

    function calculateColumnWidths(columns) {
        return columns.map(function() {
            return this.style.width;
        });
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
        equal(editor.tableResizing.options.appendHandlesTo, editor.body);
    });

    test("clicking a table should init resize handles", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(editor.tableResizing.handles.length, 8);
    });

    editor_module("editor table resizing initialization in inline edit mode", {
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

            kendo.destroy(QUnit.fixture);
        }
    }, {
        element: "<div id='editor-fixture'></div>"
    });

    test("clicking a table should initialize table resizing with custom options", function() {
        triggerEvent(tableElement, { type: MOUSE_DOWN });

        equal(editor.tableResizing.options.rtl, false);
        equal(editor.tableResizing.options.rootElement, editor.body);
        equal(editor.tableResizing.options.appendHandlesTo, editor.body);
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

    test("clicking on the content should destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");

        triggerEvent(editor.body, { type: MOUSE_DOWN });

        equal(destroySpy.calls("destroy"), 1);
    });

    test("clicking on an element with data attribute equal to table should not destroy table resizing", function() {
        var destroySpy = spy(editor.tableResizing, "destroy");
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
            appendHandlesTo: null,
            rtl: false,
            rootElement: null,
            minWidth: 10,
            minHeight: 10,
            handles: [{
                direction: NORTHWEST
            }, {
                direction: NORTH
            }, {
                direction: NORTHEAST
            }, {
                direction: EAST
            }, {
                direction: SOUTHEAST
            }, {
                direction: SOUTH
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
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture);
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            tableResizing = new TableResizing(tableElement, {
                rootElement: wrapper[0],
                appendHandlesTo: wrapper[0]
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
            direction: "northwest",
            resizableElement: tableResizing.element,
            rootElement: tableResizing.options.rootElement
        };

        tableResizing.showResizeHandles();

        equal(tableResizing.handles[0].options.appendTo, customOptions.appendTo);
        equal(tableResizing.handles[0].options.direction, customOptions.direction);
        equal(tableResizing.handles[0].options.resizableElement, customOptions.resizableElement);
        equal(tableResizing.handles[0].options.rootElement, customOptions.rootElement);
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

    test("should set contenteditable to false on handle mouseover", function() {
        $(tableResizing.options.rootElement).attr(CONTENT_EDITABLE, "true");
        tableResizing.showResizeHandles();

        triggerEvent(tableResizing.handles[0].element, { type: "mouseover" });

        equal($(tableResizing.options.rootElement).attr(CONTENT_EDITABLE), "false");
    });

    test("should set contenteditable to true on handle mouseout", function() {
        $(tableResizing.options.rootElement).attr(CONTENT_EDITABLE, "false");
        tableResizing.showResizeHandles();

        triggerEvent(tableResizing.handles[0].element, { type: "mouseout" });

        equal($(tableResizing.options.rootElement).attr(CONTENT_EDITABLE), "true");
    });

    test("should change opacity on handle dragStart", function() {
        tableResizing.showResizeHandles();

        triggerEvent(tableResizing.handles[0].element, { type: MOUSE_DOWN });
        triggerEvent(tableResizing.handles[0].element, { type: MOUSE_MOVE });

        equal($(tableResizing.element).hasClass("k-table-resizing"), true);
    });

    test("should change opacity on handle dragEnd", function() {
        tableResizing.showResizeHandles();

        triggerEvent(tableResizing.handles[0].element, { type: MOUSE_DOWN });
        triggerEvent(tableResizing.handles[0].element, { type: MOUSE_MOVE });
        triggerEvent(tableResizing.handles[0].element, { type: MOUSE_UP });

        equal($(tableResizing.element).hasClass("k-table-resizing"), false);
    });

    module("editor table resizing resize width in pixels", {
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
            tableElement = $(wrapper).find("#table").css("width", "50%");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            initialWidthInPixels = tableElement.outerWidth();
            initialParentWidthInPixels = tableElement.parent().width();
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase width", function() {
        var initialWidthInPercentages = (initialWidthInPixels / initialParentWidthInPixels) * 100;
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialParentWidthInPixels) * 100;

        tableResizing.resize({ deltaX: differenceInPixels });

        roughlyEqual(tableElement[0].style.width, initialWidthInPercentages + differenceInPercentages + PERCENTAGE, 0.001);
    });

    test("should decrease width", function() {
        var initialWidthInPercentages = (initialWidthInPixels / initialParentWidthInPixels) * 100;
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialParentWidthInPixels) * 100;

        tableResizing.resize({ deltaX: (-1) * differenceInPixels });

        roughlyEqual(tableElement[0].style.width, initialWidthInPercentages + (-1) * differenceInPercentages + PERCENTAGE, 0.001);
    });

    test("should be decreased to min", function() {
        var minInPercentages = (tableResizing.options.minWidth / initialParentWidthInPixels) * 100;

        tableResizing.resize({ deltaX: (-1) * MAX });

        roughlyEqual(parseFloat(tableElement[0].style.width), minInPercentages, 0.00001);
    });

    test("should be resized more than 100%", function() {
        tableResizing.resize({ deltaX: MAX });

        equal(tableElement[0].style.width, "100%");
    });

    module("editor table resizing resize width in pixels in scrolled container", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css({
                border: "1px solid red",
                width: "400px",
                overflow: "scroll"
            });
            innerElement = $(wrapper).find("#innerElement").css({
                border: "1px solid blue",
                width: $(wrapper).width() + 200
            });
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

    test("should set width according to scroll", function() {
        var scrollValue = 20;
        var initialWrapperWidth = wrapper.width();
        $(wrapper).scrollLeft(scrollValue);

        tableResizing.resize({ deltaX: MAX });

        equal(tableElement[0].style.width, initialWrapperWidth + scrollValue + PX);
    });

    module("editor table resizing resize width in percentages in scrolled container", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css({
                border: "1px solid red",
                width: "400px",
                overflow: "scroll"
            });
            innerElement = $(wrapper).find("#innerElement").css({
                border: "1px solid blue",
                width: $(wrapper).width() + 200
            });
            tableElement = $(wrapper).find("#table").css("width", "100%");
            tableResizing = new TableResizing(tableElement[0]);
            initialWidthInPixels = tableElement.outerWidth();
            initialParentWidthInPixels = tableElement.parent().width();
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set width greater than 100%", function() {
        var initialWidthInPercentages = (initialWidthInPixels / initialParentWidthInPixels) * 100;
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels / initialParentWidthInPixels) * 100;

        $(wrapper).scrollLeft(differenceInPixels * 2);
        tableResizing.resize({ deltaX: differenceInPixels });

        roughlyEqual(tableElement[0].style.width, initialWidthInPercentages + differenceInPercentages + PERCENTAGE, 0.001);
    });

    test("should set max width equal to parent width and scroll", function() {
        var scrollValue = 20;
        var scrollValueInPercentages = (scrollValue / initialParentWidthInPixels) * 100;

        $(wrapper).scrollLeft(scrollValue);
        tableResizing.resize({ deltaX: MAX });

        roughlyEqual(tableElement[0].style.width, 100 + scrollValueInPercentages + PERCENTAGE, 0.001);
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
        var initialHeight = tableElement.outerHeight();
        var deltaY = 20;

        tableResizing.resize({ deltaY: deltaY });

        equal(tableElement[0].style.height, initialHeight + deltaY + PX);
    });

    test("should decrease height", function() {
        var initialHeight = tableElement.outerHeight();
        var deltaY = 20;

        tableResizing.resize({ deltaY: (-1) * deltaY });

        equal(tableElement[0].style.height, initialHeight + (-1) *  deltaY + PX);
    });
    test("should change height when style height is smaller", function() {
        tableElement.css("height", "1px");
        var initialHeight = tableElement.outerHeight();
        var deltaY = 20;

        tableResizing.resize({ deltaY: deltaY });

        equal(tableElement[0].style.height, initialHeight + deltaY + PX);
    });

    test("should not set height lower than min", function() {
        tableResizing.resize({ deltaY: (-1) * MAX });

        ok(parseFloat(tableElement.css("height")) >= tableResizing.options.minHeight);
    });

    test("should not set height greater than parent height", function() {
        wrapper.outerHeight($(tableElement).outerHeight() + 20);

        tableResizing.resize({ deltaY: MAX });

        equal(tableElement[0].style.height, wrapper.outerHeight() + PX);
    });

    module("editor table resizing resize height in percentages", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css("height", "400px").css("border", "1px solid red");
            tableElement = $(QUnit.fixture).find("#table").css("height", "50%");
            tableResizing = new TableResizing(tableElement[0], {
                rootElement: QUnit.fixture
            });
            initialHeightInPixels = tableElement.outerHeight();
            initialParentHeightInPixels = tableElement.parent().height();
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should increase height", function() {
        var initialHeightInPercentages = (initialHeightInPixels / initialParentHeightInPixels) * 100;
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialParentHeightInPixels) * 100;

        tableResizing.resize({ deltaY: differenceInPixels });

        roughlyEqual(tableElement[0].style.height, initialHeightInPercentages + differenceInPercentages +PERCENTAGE, 0.001);
    });

    test("should decrease height", function() {
        var initialHeightInPercentages = (initialHeightInPixels / initialParentHeightInPixels) * 100;
        var differenceInPixels = 40;
        var differenceInPercentages = (differenceInPixels / initialParentHeightInPixels) * 100;

        tableResizing.resize({ deltaY: (-1) * differenceInPixels });

        roughlyEqual(tableElement[0].style.height, initialHeightInPercentages + (-1) * differenceInPercentages + PERCENTAGE, 0.001);
    });

    test("should be decreased to min", function() {
        var minInPercentages = (tableResizing.options.minHeight / initialParentHeightInPixels) * 100;

        tableResizing.resize({ deltaY: (-1) * MAX });

        roughlyEqual(parseFloat(tableElement[0].style.height), minInPercentages, 0.00001);
    });

    test("should be resized more than 100%", function() {
        tableResizing.resize({ deltaY: MAX });

        equal(tableElement[0].style.height, "100%");
    });

    module("editor table resizing resize height in pixels in scrolled container", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css({
                border: "1px solid red",
                height: "400px",
                overflow: "scroll"
            });
            innerElement = $(wrapper).find("#innerElement").css({
                border: "1px solid blue",
                height: $(wrapper).height() + 200
            });
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

    test("should set width according to scroll", function() {
        var scrollValue = 20;
        var initialWrapperHeight = wrapper.height();
        $(wrapper).scrollTop(scrollValue);

        tableResizing.resize({ deltaY: MAX });

        equal(tableElement[0].style.height, initialWrapperHeight + scrollValue + PX);
    });

    module("editor table resizing resize height in percentages in scrolled container", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css({
                border: "1px solid red",
                height: "400px",
                overflow: "scroll"
            });
            innerElement = $(wrapper).find("#innerElement").css({
                border: "1px solid blue",
                height: $(wrapper).height() + 200
            });
            tableElement = $(wrapper).find("#table").css("height", "100%");
            tableResizing = new TableResizing(tableElement[0]);
            initialheHghtInPixels = tableElement.outerHeight();
            initialParentheHghtInPixels = tableElement.parent().height();
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set height greater than 100%", function() {
        var initialheHghtInPercentages = (initialheHghtInPixels / initialParentheHghtInPixels) * 100;
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels / initialParentheHghtInPixels) * 100;

        $(wrapper).scrollTop(differenceInPixels * 2);
        tableResizing.resize({ deltaY: differenceInPixels });

        roughlyEqual(tableElement[0].style.height, initialheHghtInPercentages + differenceInPercentages + PERCENTAGE, 0.001);
    });

    test("should set max height equal to parent height and scroll", function() {
        var scrollValue = 20;
        var scrollValueInPercentages = (scrollValue / initialParentheHghtInPixels) * 100;

        $(wrapper).scrollTop(scrollValue);
        tableResizing.resize({ deltaY: MAX });

        roughlyEqual(tableElement[0].style.height, 100 + scrollValueInPercentages + PERCENTAGE, 0.001);
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

    module("editor table resizing resize width in scrolled container rtl", {
        setup: function() {
            wrapper = $(CONTENT_HTML).appendTo(QUnit.fixture).css({
                border: "1px solid red",
                width: "400px",
                overflow: "scroll"
            });
            innerElement = $(wrapper).find("#innerElement").css({
                border: "1px solid blue",
                width: $(wrapper).width() + 200
            });
            tableElement = $(QUnit.fixture).find("#table");
            tableResizing = new TableResizing(tableElement[0], {
                rtl: true
            });
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set width according to scroll", function() {
        var scrollValue = 20;
        var initialWrapperWidth = wrapper.width();
        $(wrapper).scrollLeft(scrollValue);

        tableResizing.resize({ deltaX: RTL_MODIFIER * MAX });

        equal(tableElement[0].style.width, wrapper.width() + (RTL_MODIFIER * scrollValue) + PX);
    });

    module("editor table resizing nested table without explicit dimensions", {
        setup: function() {
            $(NESTED_TABLE_HTML).appendTo(QUnit.fixture);
            tableElement = $(QUnit.fixture).find("#table");
            nestedTable = $(QUnit.fixture).find("#nestedTable");
            initialWidth = nestedTable.outerWidth();
            tableResizing = new TableResizing(nestedTable[0]);
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set width in column without explicit dimensions", function() {
        var firstColumn = $(tableElement).find(FIRST_COLUMN);
        var firstColumnWidth = firstColumn.width();

        tableResizing.resize({ deltaX: firstColumnWidth });

        equal(nestedTable[0].style.width, initialWidth + firstColumnWidth + PX);
    });

    module("editor table resizing nested table width in percentages", {
        setup: function() {
            $(NESTED_TABLE_HTML_IN_PERCENTAGES).appendTo(QUnit.fixture);
            tableElement = $(QUnit.fixture).find("#table");
            nestedTable = $(QUnit.fixture).find("#nestedTable");
            tableResizing = new TableResizing(nestedTable[0]);
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not change width in column without explicit dimensions", function() {
        var initialStyleWidth = nestedTable[0].style.width;

        tableResizing.resize({ deltaX: MAX });

        equal(nestedTable[0].style.width, initialStyleWidth);
    });

    test("should set width to adjacent columns", function() {
        var columns = nestedTable.closest(ROW).children();
        var columnWidths = calculateColumnWidths(columns);

        tableResizing.resize({ deltaX: 10 });

        for (var i = 0; i < columns.length; i++) {
            ok(columns[i].style.width !== columnWidths[i]);
        }
    });

    test("should not set width to columns in other rows", function() {
        var otherColumns = tableElement.children("tbody").children(ROW).filter(function() {
            return (this !== nestedTable.closest(ROW)[0]);
        }).children();
        var columnWidths = calculateColumnWidths(otherColumns);

        tableResizing.resize({ deltaX: 10 });

        for (var i = 0; i < otherColumns.length; i++) {
            equal(otherColumns[i].style.width, columnWidths[i]);
        }
    });

    module("editor table resizing nested table with k-table class", {
        setup: function() {
            $(NESTED_TABLE_HTML).appendTo(QUnit.fixture);
            tableElement = $(QUnit.fixture).find("#table");
            nestedTable = $(QUnit.fixture).find("#nestedTable");
            tableResizing = new TableResizing(nestedTable[0]);
        },

        teardown: function() {
            tableResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set width to adjacent columns", function() {
        var columns = nestedTable.closest(ROW).children();
        var columnWidths = calculateColumnWidths(columns);

        tableResizing.resize({ deltaX: 10 });

        for (var i = 0; i < columns.length; i++) {
            ok(columns[i].style.width !== columnWidths[i]);
        }
    });

    test("should not set width to columns in other rows", function() {
        var otherColumns = tableElement.children("tbody").children(ROW).filter(function() {
            return (this !== nestedTable.closest(ROW)[0]);
        }).children();
        var columnWidths = calculateColumnWidths(otherColumns);

        tableResizing.resize({ deltaX: 10 });

        for (var i = 0; i < otherColumns.length; i++) {
            equal(otherColumns[i].style.width, columnWidths[i]);
        }
    });

    editor_module("editor table resizing resize handles", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            tableElement = $(NESTED_TABLE_HTML).appendTo(editor.body)[0];
            tableResizing = editor.tableResizing = new TableResizing(tableElement);
        },

        afterEach: function() {
            if (editor.tableResizing) {
                editor.tableResizing.destroy();
            }

            if (editor) {
                $(editor.body).find("*").remove();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be shown on selection change", function() {
        var showSpy = spy(tableResizing, "showResizeHandles");

        editor.trigger(SELECT);

        equal(showSpy.calls("showResizeHandles"), 1);
    });

    asyncTest("should be shown on keypress", function() {
        var showSpy = spy(tableResizing, "showResizeHandles");

        triggerEvent(editor.body, { type: "keypress" });

        setTimeout(function() {
            start();
            equal(showSpy.calls("showResizeHandles"), 1);
        }, TIMEOUT);
    });
}
})();
