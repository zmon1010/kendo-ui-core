(function() {
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var TableResizing = kendo.ui.editor.TableResizing;
    var columnResizing;
    var fixture;
    var table;
    var FIXTURE_SELECTOR = "#qunit-fixture";
    var HANDLE_SELECTOR = ".k-resize-handle";
    var FIRST_COLUMN = "td:first";
    var PX = "px";
    var DOT = ".";
    var NS = "kendoEditor";
    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var TABLE_HTML =
        '<table id="table" class="k-table">' +
            '<tr id="row1" class="row">' +
                '<td id="col11" class="col">&nbsp;</td>' +
                '<td id="col12" class="col">col 12</td>' +
                '<td id="col13" class="col">col 13</td>' +
            '</tr>' +
            '<tr id="row2" class="row">' +
                '<td id="col21" class="col">&nbsp;</td>' +
                '<td id="col22" class="col">col 22</td>' +
                '<td id="col23" class="col">col 23</td>' +
            '</tr>' +
            '<tr id="row3" class="row">' +
                '<td id="col31" class="col">&nbsp;</td>' +
                '<td id="col32" class="col">col 32</td>' +
                '<td id="col33" class="col">col 33</td>' +
            '</tr>' +
        '</table>';

    function triggerBorderHover(element) {
        triggerEvent(element, {
            type: MOUSE_MOVE,
            clientX: element.offset().left + element.outerWidth(),
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
            min: 10,
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

    test("mouseleave handlers should stop propagation on cells", function() {
        var event = $.Event(MOUSE_LEAVE, {});
        columnResizing = new ColumnResizing(table, {});

        $(table).find("td:first").trigger(event);

        ok(event.isPropagationStopped());
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

        equal(columnResizing.resizeHandle.css("left"), cellWidth + leftOffset - (columnResizing.options.handle.width / 2) + PX);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerBorderHover(cell);

        equal(columnResizing.resizeHandle.css("top"), cell.position().top + PX);
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

    module("editor column resizing", {
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

    test("cell width should be increased when resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell[0].offsetWidth;
        var newWidth = initialWidth + 12;

        resizeColumn(cell, initialWidth, newWidth);

        equal(cell[0].offsetWidth, newWidth);
    });

    test("cell width should be decreased when resizing", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN).outerWidth(100);
        var initialWidth = cell[0].offsetWidth;
        var newWidth = initialWidth - 20;

        resizeColumn(cell, initialWidth, newWidth);

        equal(cell[0].offsetWidth, newWidth);
    });

    test("cell width should not be lower than min", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell[0].offsetWidth;
        var newWidth = -123;

        resizeColumn(cell, initialWidth, newWidth);

        equal(cell[0].offsetWidth, columnResizing.options.min);
    });

    test("cell width should not be greater than table width", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var initialWidth = cell[0].offsetWidth;
        var initialTableWidth = $(columnResizing.element).outerWidth();

        resizeColumn(cell, initialWidth, initialWidth + 123456);

        equal(cell[0].offsetWidth, initialTableWidth);
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
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = 1;
        var rows = $(columnResizing.element).find("tr");
        var initialWidth = cell.outerWidth();
        var newWidth = initialWidth + 20;

        resizeColumn(cell, initialWidth, newWidth);

        for (var i = 0; i < rows.length; i++) {
            ok($(rows[i]).children()[cellIndex].offsetWidth === newWidth);
        }
    });

    test("all columns with different index in other rows should not be resized", function() {
        var cell = $(columnResizing.element).find("tr:first td:nth-child(2)");
        var cellIndex = 1;
        var otherColumns = $(columnResizing.element).find("td").filter(function() { return $(this).index() !== cellIndex; });
        var initialWidth = cell.outerWidth();
        var newWidth = initialWidth + 20;

        resizeColumn(cell, initialWidth, newWidth);

        for (var i = 0; i < otherColumns.length; i++) {
            ok(otherColumns[i].offsetWidth !== newWidth);
        }
    });

    module("editor column resizing", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
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
})();
