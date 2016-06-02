(function() {
    var ColumnResizing = kendo.ui.editor.ColumnResizing;
    var editor;
    var columnResizing;
    var fixture;
    var resizeHandle;
    var table;
    var FIXTURE_SELECTOR = "#qunit-fixture";
    var HANDLE_SELECTOR = ".k-resize-handle";
    var FIRST_COLUMN = "td:first";
    var PX = "px";
    var DOT = ".";
    var NS = "kendoEditor";
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

    function eventHandler() { }

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

    module("editor table resizing", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("resizing should not be initialized with element that is different from table", function() {
        columnResizing = new ColumnResizing($("<div />")[0], {});

        equal(columnResizing.element, undefined);
    });

    test("resizing should be initialized with table element", function() {
        columnResizing = new ColumnResizing(table, {});

        equal(columnResizing.element, table);
    });

    test("resizing should be initialized with default options", function() {
        var options = {
            tags: ["td"],
            handle: {
                width: 20,
                height: 10,
                appendTo: "#qunit-fixture",
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

    test("resizing should be initialized with array of tags", function() {
        var options = { tags: "tag" };

        columnResizing = new ColumnResizing(table, options);

        deepEqual(columnResizing.options.tags, ["tag"]);
    });

    test("move handlers should be attached to all columns", function() {
        columnResizing = new ColumnResizing(table, {});

        assertEvent(table, { type: MOUSE_MOVE, selector: "td", namespace: NS, handler: eventHandler });
    });

    test("move handlers should be attached to all tags", function() {
        columnResizing = new ColumnResizing(table, { tags: ["td", "th"] });

        assertEvent(table, { type: MOUSE_MOVE, selector: "td,th", namespace: NS, handler: eventHandler });
    });

    module("resize handle", {
        setup: function() {
            fixture = $(FIXTURE_SELECTOR);
            table = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            columnResizing = new ColumnResizing(table, {
                handle: {
                    appendTo: FIXTURE_SELECTOR
                }
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("hovering the border of first cell should create resize handle", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(fixture.children(HANDLE_SELECTOR).length, 1);
    });

    test("resize handle should be appended", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(fixture.children(HANDLE_SELECTOR)[0], columnResizing.resizeHandle[0]);
    });

    test("resize handle left offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("left"), cell[0].offsetWidth - columnResizing.options.handle.width + PX);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("top"), cell.position().top + PX);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("width"), columnResizing.options.handle.width + PX);
    });

    test("resize handle top offset should be set", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("height"), columnResizing.options.handle.height + PX);
    });

    test("resize handle should be shown", function() {
        var cell = $(columnResizing.element).find(FIRST_COLUMN);

        triggerHover(cell);

        equal(columnResizing.resizeHandle.css("display"), "block");
    });

    test("resize handle should be hidden", function() {
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
})();
