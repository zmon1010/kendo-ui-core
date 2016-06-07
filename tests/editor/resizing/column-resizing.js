(function() {
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var columnResizing;
    var fixture;
    var table;
    var FIXTURE_SELECTOR = "#qunit-fixture";
    var HANDLE_SELECTOR = ".k-resize-handle";
    var FIRST_COLUMN = "td:first";
    var PX = "px";
    var DOT = ".";
    var NS = "kendoEditor";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_LEAVE = "mouseleave";
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

    function triggerHover(element, eventOptions) {
        triggerEvent(element, {
            type: MOUSE_MOVE,
            clientX: element.offset().left + element.outerWidth()
        });
    }

    function triggerEvent(element, eventOptions) {
        var options = $.extend({
            type: "mousedown",
            clientX: 0,
            clientY: 0
        }, eventOptions || {});

        $(element).trigger(options);
    }

    module("editor column resizing", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
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
            columnResizing = new ColumnResizing(table, {
                handle: {
                    appendTo: QUnit.fixture
                }
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of first cell should append resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        ok(cell.children(HANDLE_SELECTOR).length === 1);
    });

    test("hovering a second cell should remove previous resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerHover(cell);

        triggerHover($(columnResizing.element).find("td:last"));

        ok(cell.children(HANDLE_SELECTOR).length === 1);
    });

    test("hovering the last cell should not create resize handle", function() {
        var cell = $(columnResizing.element).find("tr:first td:last");

        triggerHover(cell);

        ok(cell.children(HANDLE_SELECTOR).length === 0);
    });

    test("resize handle should be preserved", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(cell.children(HANDLE_SELECTOR)[0], columnResizing.resizeHandle[0]);
    });

    test("resize handle left offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        var cellWidth = cell[0].offsetWidth;
        var leftOffset = cell.offset().left;

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("left"), cellWidth + leftOffset - (columnResizing.options.handle.width / 2) + PX);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("top"), cell.position().top + PX);
    });

    test("resize handle width should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("width"), columnResizing.options.handle.width + PX);
    });

    test("resize handle height should be equal to cell height", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("height"), cell[0].offsetHeight + PX);
    });

    test("resize handle should be shown on hover", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("resize handle should be hidden on leaving the cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerHover(cell);
        $(columnResizing.resizeHandle).show();

        triggerEvent(cell, {
            type: MOUSE_MOVE,
            clientX: 0,
            clientY: 0
        });

        equal(columnResizing.resizeHandle.css("display"), "none");
    });

    test("resize handle should be removed on leaving the cell", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);
        triggerHover(cell);

        triggerEvent(cell, {
            type: MOUSE_LEAVE,
            clientX: 0,
            clientY: 0
        });

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

    test("destroy should detach event handlers", function() {
        columnResizing.destroy();

        ok(jQueryEvents(columnResizing.element) === undefined);
    });

    test("destroy should remove resize handle from DOM", function() {
        $('<div class="k-resize-handle" />').appendTo(columnResizing.element);

        columnResizing.destroy();

        ok($(columnResizing.element).find(HANDLE_SELECTOR).length === 0);
    });

    module("editor column resizable", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {});
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering a cell should initialize resizable", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        ok(cell.data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    test("hovering a cell should initialize resizable with handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        ok(cell.data("kendoResizable").options.handle === HANDLE_SELECTOR);
    });
})();
