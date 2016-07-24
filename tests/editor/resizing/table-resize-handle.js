(function() {
    var TableResizeHandle = kendo.ui.editor.TableResizeHandle;
    var handle;
    var element;
    var wrapper;
    var tableElement;
    var DOT = ".";
    var CONTENT_EDITABLE = "contenteditable";
    var HANDLE_SELECTOR = ".k-table-resize-handle";
    var PX = "px";
    var DELTA_X = 20;
    var DELTA_Y = 30;
    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var MOUSE_UP = "mouseup";
    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";
    var TRUE = "true";
    var FALSE = "false";
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

    function setupHandle(customOptions) {
        wrapper = $("<div id='wrapper' />").appendTo(QUnit.fixture);
        tableElement = $(TABLE_HTML).css({ left: 10, top: 20 }).appendTo(wrapper[0]);

        var options = $.extend({}, {
            appendTo: QUnit.fixture,
            resizableElement: tableElement[0]
        }, customOptions);

        handle = new TableResizeHandle(options);

        element = $(handle.element).css({
            width: 8,
            height: 8
        });
    }

    function assertDragDelta(testOptions) {
        var args = {};
        handle.bind("drag", function(e) {
            args.deltaX = e.deltaX;
            args.deltaY = e.deltaY;
        });

        triggerDrag(handle.element, { deltaX: testOptions.deltaX, deltaY: testOptions.deltaY });

        equal(args.deltaX, testOptions.expectedDeltaX);
        equal(args.deltaY, testOptions.expectedDeltaY);
    }

    function triggerDrag(element, options) {
        var doc = $((element[0] || element).ownerDocument.documentElement);
        var resizeHandle = $(element);
        var position = resizeHandle.position();
        var deltaX = options.deltaX || 0;
        var deltaY = options.deltaY || 0;

        triggerDragStart(element, deltaX, deltaY);

        doc.trigger($.Event(MOUSE_MOVE, {
            pageX: position.left + deltaX,
            pageY: position.top + deltaY,
        }));
    }

    function triggerDragStart(element, options) {
        var resizeHandle = $(element);
        var position = resizeHandle.position();
        var deltaX = options.deltaX || 0;
        var deltaY = options.deltaY || 0;

        resizeHandle.trigger($.Event(MOUSE_DOWN, {
            pageX: position.left + deltaX,
            pageY: position.top + deltaY
        }));
    }

    module("editor table resize handle", {
        setup: function() {
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should be initialized with default optionsy", function() {
        var defaultOptions = {
            appendTo: null,
            direction: SOUTHEAST,
            resizableElement: null,
            template: "<div class='k-table-resize-handle' unselectable='on' contenteditable='false'></div>"
        };

        handle = new TableResizeHandle({});

        deepEqual(handle.options, defaultOptions);
    });

    test("should be initialized with custom options", function() {
        var customOptions = {
            resizableElement: "element"
        };

        handle = new TableResizeHandle(customOptions);

        deepEqual(handle.options.resizableElement, customOptions.resizableElement);
    });

    module("editor table resize handle destroy", {
        setup: function() {
            handle = new TableResizeHandle({
                resizableElement: QUnit.fixture
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should remove element", function() {
        handle.destroy();

        equal($(QUnit.fixture).children().length, 0);
    });

    test("should remove the reference to element", function() {
        handle.destroy();

        equal(handle.element, null);
    });

    module("editor table resize handle styles", {
        setup: function() {
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should have direction class east", function() {
        setupHandle({ direction: "east" });

        equal($(handle.element).hasClass("k-resize-e"), true);
    });

    test("should have direction class north", function() {
        setupHandle({ direction: "north" });

        equal($(handle.element).hasClass("k-resize-n"), true);
    });

    test("should have direction class northeast", function() {
        setupHandle({ direction: "northeast" });

        equal($(handle.element).hasClass("k-resize-ne"), true);
    });

    test("should have direction class northwest", function() {
        setupHandle({ direction: "northwest" });

        equal($(element).hasClass("k-resize-nw"), true);
    });

    test("should have direction class south", function() {
        setupHandle({ direction: "south" });

        equal($(element).hasClass("k-resize-s"), true);
    });

    test("should have direction class southeast", function() {
        setupHandle({ direction: "southeast" });

        equal($(element).hasClass("k-resize-se"), true);
    });

    test("should have direction class southwest", function() {
        setupHandle({ direction: "southwest" });

        equal($(element).hasClass("k-resize-sw"), true);
    });

    test("should have direction class west", function() {
        setupHandle({ direction: "west" });

        equal($(element).hasClass("k-resize-w"), true);
    });

    module("editor table resize handle data", {
        setup: function() {
            setupHandle();
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set info about table", function() {
        equal($(element).data("table"), tableElement[0]);
    });

    module("editor table resize handle position east", {
        setup: function() {
            setupHandle({
                direction: "east"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top + (tableElement.outerHeight() / 2) - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left + tableElement.outerWidth() - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle position north", {
        setup: function() {
            setupHandle({
                direction: "north"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left + (tableElement.outerWidth() / 2) - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle position northeast", {
        setup: function() {
            setupHandle({
                direction: "northeast"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left + tableElement.outerWidth() - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle position northwest", {
        setup: function() {
            setupHandle({
                direction: "northwest"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left - (element.outerHeight() / 2) + PX);
    });

    module("editor table resize handle position south", {
        setup: function() {
            setupHandle({
                direction: "south"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top + tableElement.outerHeight() - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left + (tableElement.outerWidth() / 2) - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle position southeast", {
        setup: function() {
            setupHandle({
                direction: "southeast"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top + tableElement.outerHeight() - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left + tableElement.outerWidth() - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle position southwest", {
        setup: function() {
            setupHandle({
                direction: "southwest"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top + tableElement.outerHeight() - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle position west", {
        setup: function() {
            setupHandle({
                direction: "west"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set top offset", function() {
        handle.show();

        equal(element.css("top"), tableElement.offset().top + (tableElement.outerHeight() / 2) - (element.outerHeight() / 2) + PX);
    });

    test("should set left offset", function() {
        handle.show();

        equal(element.css("left"), tableElement.offset().left - (element.outerWidth() / 2) + PX);
    });

    module("editor table resize handle draggable", {
        setup: function() {
            setupHandle();
        },

        teardown: function() {
            handle.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should initialize draggable widget", function() {
        ok(handle._draggable instanceof kendo.ui.Draggable);
    });

    test("should set handle element as draggable element", function() {
        equal(handle._draggable.element[0], handle.element);
    });

    test("should be destroyed on handle destroy", function() {
        var destroySpy = spy(handle._draggable, "destroy");

        handle.destroy();

        equal(destroySpy.calls("destroy"), 1);
    });

    test("should remove destroy reference on handle restroy", function() {
        handle.destroy();

        equal(handle._draggable, null);
    });

    module("editor table resize handle events", {
        setup: function() {
            setupHandle();
        },

        teardown: function() {
            handle.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should fire drag event", function() {
        var eventFired = false;
        handle.bind("drag", function(e) {
            eventFired = true;
        });

        triggerDrag(handle.element, { deltaX: 10 });

        equal(eventFired, true);
    });

    module("editor table resize handle dragging", {
        teardown: function() {
            handle.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should adjust dragging delta for east direction", function() {
        setupHandle({ direction: "east" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: DELTA_X,
            expectedDeltaY: 0
        });
    });

    test("should adjust dragging delta for north direction", function() {
        setupHandle({ direction: "north" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: 0,
            expectedDeltaY: DELTA_Y
        });
    });

    test("should adjust dragging delta for northeast direction", function() {
        setupHandle({ direction: "northeast" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: DELTA_X,
            expectedDeltaY: DELTA_Y
        });
    });

    test("should adjust dragging delta for northwest direction", function() {
        setupHandle({ direction: "northwest" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: DELTA_X,
            expectedDeltaY: DELTA_Y
        });
    });

    test("should adjust dragging delta for south direction", function() {
        setupHandle({ direction: "south" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: 0,
            expectedDeltaY: DELTA_Y
        });
    });

    test("should adjust dragging delta for southeast direction", function() {
        setupHandle({ direction: "southeast" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: DELTA_X,
            expectedDeltaY: DELTA_Y
        });
    });

    test("should adjust dragging delta for southwest direction", function() {
        setupHandle({ direction: "southwest" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: DELTA_X,
            expectedDeltaY: DELTA_Y
        });
    });

    test("should adjust dragging delta for west direction", function() {
        setupHandle({ direction: "west" });

        assertDragDelta({
            deltaX: DELTA_X,
            deltaY: DELTA_Y,
            expectedDeltaX: DELTA_X,
            expectedDeltaY: 0
        });
    });
})();
