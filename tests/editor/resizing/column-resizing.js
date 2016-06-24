(function() {
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var TableResizing = kendo.ui.editor.TableResizing;
    var columnResizing;
    var fixture;
    var options;
    var table;
    var tableWidth;
    var FIXTURE_SELECTOR = "#qunit-fixture";
    var HANDLE_SELECTOR = ".k-resize-handle";
    var FIRST_COLUMN = "td:first";
    var PX = "px";
    var DOT = ".";
    var NS = "kendoEditor";
    var MAX = 123456;
    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var PERCENTAGE = "%";
    var ROW = "tr";
    var COLUMN = "td";
    var TABLE_HTML =
        '<table id="table" class="k-table" style="width: 400px">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="width:100px;">col 11</td>' +
                '<td id="col12" class="col" style="width:100px;">col 12</td>' +
                '<td id="col13" class="col" style="width:100px;">col 13</td>' +
                '<td id="col14" class="col" style="width:100px;">col 14</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="width:100px;">col 21</td>' +
                '<td id="col22" class="col" style="width:100px;">col 22</td>' +
                '<td id="col23" class="col" style="width:100px;">col 23</td>' +
                '<td id="col24" class="col" style="width:100px;">col 24</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col" style="width:100px;">col 31</td>' +
                '<td id="col32" class="col" style="width:100px;">col 32</td>' +
                '<td id="col33" class="col" style="width:100px;">col 33</td>' +
                '<td id="col34" class="col" style="width:100px;">col 34</td>' +
            '</tr>' +
        '</table>';
    var TABLE_IN_PERCENTAGES =
        '<table id="table" class="k-table" style="width:200px";>' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col" style="width:25%;border:1px solid red;">col 11</td>' +
                '<td id="col12" class="col" style="width:25%;border:1px solid red;">col 12</td>' +
                '<td id="col13" class="col" style="width:25%;border:1px solid red;">col 13</td>' +
                '<td id="col13" class="col" style="width:25%;border:1px solid red;">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col" style="width:25%;border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col21" class="col" style="width:25%;border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
            '</tr>' +
            '<tr id="row4" class="row">' +
                '<td id="col21" class="col" style="width:25%;border:1px solid red;">col 21</td>' +
                '<td id="col22" class="col" style="width:25%;border:1px solid red;">col 22</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
                '<td id="col23" class="col" style="width:25%;border:1px solid red;">col 23</td>' +
            '</tr>' +
        '</table>';

    function triggerBorderHover(element) {
        triggerEvent(element, {
            type: MOUSE_MOVE,
            clientX: $(element).offset().left + $(element).outerWidth(),
            clientY: 0
        });
    }

    function triggerResize(element, from, to) {
        triggerBorderHover(element);

        var doc = $(element[0].ownerDocument.documentElement);
        var resizeHandle = element.find(HANDLE_SELECTOR);
        var position = resizeHandle.position();
        var from = from || 0;
        var to = to || 0;

        resizeHandle.trigger($.Event(MOUSE_DOWN, {
            pageX: position.left + from,
            pageY: 0
        }));

        doc.trigger($.Event(MOUSE_MOVE, {
            pageX: position.left + to,
            pageY: 0
        }));
    }

    function triggerEvent(element, eventOptions) {
        var options = $.extend({
            type: "mousedown",
            pageX: 0,
            pageY: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    function resizeColumn(column, from, to) {
        triggerBorderHover(column);

        triggerResize(column, from, to);

        $(column[0].ownerDocument.documentElement).trigger($.Event(MOUSE_UP));
    }

    function getColumnWidths(table, columnIndex) {
        var columns = $(table).find(ROW).children(COLUMN)
            .filter(function() {
                return ($(this).index() === columnIndex);
            });

        return calculateColumnWidths(columns);
    }

    function calculateColumnWidths(columns) {
        var columnWidths = columns.map(function() {
            var cell = this;
            var width = !isNaN(parseFloat(cell.style.width)) ? parseFloat(cell.style.width) : $(cell).width();
            return width;
        });

        return columnWidths;
    }

    module("editor column resizing", {
        setup: function() {
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
        },

        teardown: function() {
            $(".table").remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resizing should not be initialized with element that is different from table", function() {
        columnResizing = new ColumnResizing(QUnit.fixture, {});

        equal(columnResizing.element, undefined);
    });

    test("resizing should be initialized with table element", function() {
        columnResizing = new ColumnResizing(table, {});

        equal(columnResizing.element, table);
    });

    test("resizing should be initialized with default options", function() {
        var options = {
            tags: ["td", "th"],
            min: 5,
            handle: {
                width: 10,
                height: 10,
                template:
                    '<div class="k-resize-handle">' +
                        '<div class="k-resize-handle-inner"></div>' +
                      '</div>'
            }
        };

        columnResizing = new ColumnResizing(table, {});

        deepEqual(columnResizing.options, options);
    });

    test("resizing should be initialized with custom tags", function() {
        var options = { tags: ["th"] };

        columnResizing = new ColumnResizing(table, options);

        deepEqual(columnResizing.options.tags, ["th"]);
    });

    test("resizing should be initialized with an array of tags", function() {
        var options = { tags: "tag" };

        columnResizing = new ColumnResizing(table, options);

        deepEqual(columnResizing.options.tags, ["tag"]);
    });

    test("mousemove handlers should be attached to all columns", function() {
        columnResizing = new ColumnResizing(table, {});

        assertEvent(table, { type: MOUSE_MOVE, selector: "td,th", namespace: NS });
    });

    test("mousemove handlers should be attached to custom tags", function() {
        columnResizing = new ColumnResizing(table, { tags: ["th", "td"] });

        assertEvent(table, { type: MOUSE_MOVE, selector: "th,td", namespace: NS });
    });

    module("editor column resizing", {
        setup: function() {
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of the first cell should append resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        ok(cell.children(HANDLE_SELECTOR).length === 1);
    });

    test("hovering the border of the first cell multiple times should append only one resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);
        triggerBorderHover(cell);
        triggerBorderHover(cell);

        ok(cell.children(HANDLE_SELECTOR).length === 1);
    });

    test("hovering the last cell should not create resize handle", function() {
        var cell = $(columnResizing.element).find("tr:first td:last");

        triggerBorderHover(cell);

        ok(cell.children(HANDLE_SELECTOR).length === 0);
    });

    module("editor column resizing", {
        setup: function() {
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resize handle should be stored as a reference", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(cell.children(HANDLE_SELECTOR)[0], columnResizing.resizeHandle[0]);
    });

    test("resize handle left offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellWidth = cell[0].offsetWidth;
        var leftOffset = cell.offset().left;

        triggerBorderHover(cell);

        roughlyEqual(columnResizing.resizeHandle.css("left"), cellWidth + leftOffset - (columnResizing.options.handle.width / 2) + PX, 0.01);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        roughlyEqual(columnResizing.resizeHandle.css("top"), cell.position().top + PX, 0.00001);
    });

    test("resize handle width should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("width"), columnResizing.options.handle.width + PX);
    });

    test("resize handle height should be equal to cell height", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("height"), cell[0].offsetHeight + PX);
    });

    test("resize handle should be shown on hover", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("resize handle should be hidden when leaving the cell border", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        $(columnResizing.resizeHandle).show();

        triggerEvent(cell, {
            type: MOUSE_MOVE,
            clientX: 0,
            clientY: 0
        });

        equal(columnResizing.resizeHandle.css("display"), "none");
    });

    test("resize handle should store data about resizing cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        ok(columnResizing.resizeHandle.data("column") == cell[0]);
    });

    test("resize handle should be recreated when resizing a different column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var initialResizeHandle = columnResizing.resizeHandle;
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(columnResizing.resizeHandle !== initialResizeHandle);
    });

    test("resize handle should be removed when resizing a different column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(cell.find(HANDLE_SELECTOR).length === 0);
    });

    test("resize handle should be appended to the column when resizing a different column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(secondCell.find(HANDLE_SELECTOR).length === 1);
    });

    test("existing resize handle should be shown when hovering a column", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        columnResizing.resizeHandle = $("<div class='k-resize-handle' style='display: none;' />").appendTo(cell);

        triggerBorderHover(cell);

        ok(columnResizing.resizeHandle.css("display") === "block");
    });

    test("existing resize handle should be hidden while resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();
        columnResizing.resizeHandle = $("<div class='k-resize-handle' style='display: none;' />").appendTo(cell);
        columnResizing.resizingInProgress = function() { return true; };

        triggerResize(cell, initialWidth, initialWidth + 10);

        ok(columnResizing.resizeHandle.css("display") === "none");
    });

    test("existing resize handle should be shown if resizing is not in progress", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();
        columnResizing.resizeHandle = $("<div class='k-resize-handle' style='display: none;' />").appendTo(cell);
        columnResizing.resizingInProgress = function() { return false; };

        triggerResize(cell, initialWidth, initialWidth + 10);

        ok(columnResizing.resizeHandle.css("display") === "block");
    });

    editor_module("editor column resizing", {
        beforeEach: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.tableResizing = null;
            $(editor.body).append($(TABLE_HTML)[0]);
        },

        afterEach: function() {
            if (editor) {
                $(editor.body).find("*").remove();
            }
            removeMocksIn(editor.tableResizing);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("moving out of a table should remove column resize handle", function() {
        var table = $(editor.body).find("#table")[0];
        var tableResizing = editor.tableResizing = new TableResizing(table, {});
        var columnResizing = tableResizing.columnResizing;
        var column = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(column, { type: MOUSE_ENTER });

        triggerEvent(table, { type: MOUSE_LEAVE });

        ok($(columnResizing.element).find(HANDLE_SELECTOR).length === 0);
    });

    module("editor column resizing", {
        setup: function() {
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("destroy should detach event handlers", function() {
        columnResizing.destroy();

        ok(jQueryEvents(columnResizing.element) === undefined);
    });

    test("destroy should set element to null", function() {
        columnResizing.destroy();

        ok(columnResizing.element === null);
    });

    test("destroy should remove resize handle from DOM", function() {
        $('<div class="k-resize-handle" />').appendTo(columnResizing.element);

        columnResizing.destroy();

        ok($(columnResizing.element).find(HANDLE_SELECTOR).length === 0);
    });

    test("destroy should call resizable destroy", function() {
        var resizable = columnResizing.resizable = new kendo.ui.Resizable($("<div />")[0], {});
        trackMethodCall(resizable, "destroy");

        columnResizing.destroy();

        equal(resizable.destroy.callCount, 1);
    });

    test("destroy should remove resizable reference", function() {
        var resizable = columnResizing.resizable = new kendo.ui.Resizable($("<div />")[0], {});

        columnResizing.destroy();

        ok(columnResizing.resizable === null);
    });

    module("editor column resizable", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            if(columnResizing) {
                columnResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a cell should initialize resizable", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        ok(cell.data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    test("hovering a cell should initialize resizable with handle selector", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        ok(cell.data("kendoResizable").options.handle === HANDLE_SELECTOR);
    });

    test("hovering a second cell should destroy the resizable of the initial cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(cell.data("kendoResizable") === undefined);
    });
    
    test("hovering a second cell should create resizable for second cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(secondCell.data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    test("hovering a second cell should initialize resizable with handle selector", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);
        var secondCell = $(columnResizing.element).find("tr:first td:nth-child(2)");

        triggerBorderHover(secondCell);

        ok(secondCell.data("kendoResizable").options.handle === HANDLE_SELECTOR);
    });

    module("editor column resizing in pixels", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
            options = columnResizing.options;
            tableWidth = $(columnResizing.element).outerWidth();
        },

        teardown: function() {
            if(columnResizing) {
                columnResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("cell width should be increased when resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var differenceInPixels = 60;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPercentages + differenceInPercentages) + PERCENTAGE);
    });

    test("cell width should be decreased when resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var differenceInPixels = (-1) * 60;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        roughlyEqual(cell[0].style.width, (initialWidthInPercentages + differenceInPercentages) + PERCENTAGE, 2);
    });

    test("cell width should not be lower than min", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidthInPixels = cell.width();
        var minInPercentages = (options.min / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        equal(cell[0].style.width, minInPercentages + PERCENTAGE);
    });

    test("cell width should not be greater than the sum of column and adjacent column width", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var differenceInPixels = MAX;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;
        var adjacentColumnWidthInPercentages = (cell.next().width() / tableWidth) * 100;
        var minInPercentages = (options.min / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPercentages + adjacentColumnWidthInPercentages - minInPercentages) + PERCENTAGE, 2);
    });

    test("resize handle should be removed from the column on resize end", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell[0].offsetWidth;
        triggerBorderHover(cell);

        resizeColumn(cell, initialWidth, initialWidth + 10);

        ok(cell.children(HANDLE_SELECTOR).length === 0);
    });

    test("resize handle reference should be removed on resize end", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerBorderHover(cell);

        resizeColumn(cell, cell[0].offsetWidth, cell[0].offsetWidth + 10);

        ok(columnResizing.resizeHandle === null);
    });

    test("all columns with the same index in other rows should be resized", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = 60;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex].style.width, (initialWidthInPercentages + differenceInPercentages) + PERCENTAGE);
        }
    });

    test("all columns to the right in other rows should be decreased", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = 60;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;
        var adjacentColumnWidthInPercentages = (cell.next().width() / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (adjacentColumnWidthInPercentages - differenceInPercentages) + PERCENTAGE);
        }
    });

    test("all columns to the right in other rows should be increased", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = (-1) * 60;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;
        var adjacentColumnWidthInPercentages = (cell.next().width() / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (adjacentColumnWidthInPercentages - differenceInPercentages) + PERCENTAGE);
        }
    });

    test("width of all columns to the right in other rows should not be lower than min", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = MAX;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;
        var adjacentColumnWidthInPercentages = (cell.next().width() / tableWidth) * 100;
        var minInPercentages = (options.min / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, minInPercentages + PERCENTAGE);
        }
    });

    test("width of all columns to the right in other rows should not be greater than the sum of column and adjacent column width", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = (-1) * MAX;
        var differenceInPercentages = (differenceInPixels / tableWidth) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = (initialWidthInPixels / tableWidth) * 100;
        var adjacentColumnWidthInPercentages = (cell.next().width() / tableWidth) * 100;
        var minInPercentages = (options.min / tableWidth) * 100;

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width,
                (initialWidthInPercentages + adjacentColumnWidthInPercentages - minInPercentages) + PERCENTAGE);
        }
    });

    test("all columns with different index in other rows should not be resized", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = 1;
        var initialWidth = cell.outerWidth();
        var newWidth = initialWidth + 20;
        var otherColumns = $(columnResizing.element).find(COLUMN).filter(function() {
            return $(this).index() !== cellIndex && $(this).index() !== (cellIndex + 1);
        });
        var columnWidths = calculateColumnWidths(otherColumns);

        resizeColumn(cell, initialWidth, newWidth);

        for (var i = 0; i < otherColumns.length; i++) {
            roughlyEqual($(otherColumns[i]).width(), columnWidths[i], 1);
        }
    });

    module("editor column resizing", {
        setup: function() {
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            if (columnResizing) {
                columnResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resizingInProgress should be false on resize start", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        triggerBorderHover(cell);

        ok(columnResizing.resizingInProgress() === false);
    });

    test("resizingInProgress should be true during resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        triggerResize(cell, initialWidth, initialWidth + 10);
    
        ok(columnResizing.resizingInProgress() === true);
    });

    test("resizingInProgress should be false after resize end", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell.outerWidth();

        resizeColumn(cell, initialWidth, initialWidth + 10);

        ok(columnResizing.resizingInProgress() === false);
    });

    module("editor column resizing in percentages", {
        setup: function() {
            table = $(TABLE_IN_PERCENTAGES).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
            options = columnResizing.options;
        },

        teardown: function() {
            if (columnResizing) {
                columnResizing.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should resize column in percentages", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels / $(table).outerWidth()) * 100;
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = parseFloat(cell[0].style.width);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        equal(cell[0].style.width, (initialWidthInPercentages + differenceInPercentages) + PERCENTAGE);
    });

    test("column width should not be greater than the sum of column and adjacent column width", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = parseFloat(cell[0].style.width);
        var adjacentColumnWidth = parseFloat(cell.next()[0].style.width);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        equal(cell[0].style.width, (initialWidthInPercentages + adjacentColumnWidth - options.min) + PERCENTAGE);
    });

    test("column width should not be lower than min", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var initialWidthInPixels = cell.width();

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        equal(cell[0].style.width, options.min + PERCENTAGE);
    });

    test("all columns with the same index in other rows should be resized", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels / $(table).outerWidth()) * 100;
        var initialWidthInPixels = cell.width();
        var initialAdjacentColumnWidths = getColumnWidths(table, cellIndex + 1);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex].style.width, (initialAdjacentColumnWidths[i] + differenceInPercentages) + PERCENTAGE);
        }
    });

    test("all columns to the right in other rows should be resized", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var differenceInPixels = 20;
        var differenceInPercentages = (differenceInPixels /  $(table).outerWidth()) * 100;
        var initialWidthInPixels = cell.width();
        var initialAdjacentColumnWidths = getColumnWidths(table, cellIndex + 1);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + differenceInPixels);
        
        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (initialAdjacentColumnWidths[i] - differenceInPercentages) + PERCENTAGE);
        }
    });

    test("width of all columns with the same index should not be greater than the sum of column and adjacent column width", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = parseFloat(cell[0].style.width);
        var initialAdjacentColumnWidths = getColumnWidths(table, cellIndex);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex].style.width, (initialWidthInPercentages + initialAdjacentColumnWidths[i] - options.min) + PERCENTAGE);
        }
    });

    test("width of all columns with the same index should not be lower than 0", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var initialWidthInPixels = cell.width();

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex].style.width, options.min + PERCENTAGE);
        }
    });

    test("width of all columns to the right should not be greater than the sum of column and adjacent column width", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var rows = $(columnResizing.element).find(ROW);
        var initialWidthInPixels = cell.width();
        var initialWidthInPercentages = parseFloat(cell[0].style.width);
        var initialAdjacentColumnWidths = getColumnWidths(table, cellIndex + 1);

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + (-1) * MAX);
        
        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, (initialWidthInPercentages + initialAdjacentColumnWidths[i] - options.min) + PERCENTAGE);
        }
    });

    test("width of all columns to the right should not be lower than min", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();;
        var rows = $(columnResizing.element).find(ROW);
        var initialWidthInPixels = cell.width();

        resizeColumn(cell, initialWidthInPixels, initialWidthInPixels + MAX);

        for (var i = 0; i < rows.length; i++) {
            equal($(rows[i]).children()[cellIndex + 1].style.width, options.min + PERCENTAGE);
        }
    });

    test("all columns with different index in other rows should not be resized", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = cell.index();
        var initialWidth = cell.width();
        var newWidth = initialWidth + 20;
        var otherColumns = $(columnResizing.element).find(COLUMN).filter(function() {
            return $(this).index() !== cellIndex && $(this).index() !== (cellIndex + 1);
        });
        var columnWidths = calculateColumnWidths(otherColumns);

        resizeColumn(cell, initialWidth, newWidth);

        for (var i = 0; i < otherColumns.length; i++) {
            equal(otherColumns[i].style.width, columnWidths[i] + PERCENTAGE);
        }
    });
})();
