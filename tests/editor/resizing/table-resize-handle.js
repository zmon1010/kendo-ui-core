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
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
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
        var options = $.extend({}, {
            appendTo: QUnit.fixture
        }, customOptions);

        handle = new TableResizeHandle(options);

        element = handle.element;
    }

    function setupPositioningTest(customOptions) {
        wrapper = $("<div id='wrapper' />").appendTo(QUnit.fixture);
        tableElement = $(TABLE_HTML).css({ left: 10, top: 20 }).appendTo(wrapper[0]);

        var options = $.extend({}, {
            appendTo: QUnit.fixture,
            resizableElement: tableElement,
            direction: "southeast"
        }, customOptions);

        handle = new TableResizeHandle(options);

        element = $(handle.element).css({
            width: 8,
            height: 8
        });
    }

    module("editor table resize handle", {
        setup: function() {
            handle = new TableResizeHandle({});
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
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            handle = new TableResizeHandle({
                appendTo: QUnit.fixture,
                direction: "southeast",
                resizableElement: tableElement
            });
            element = handle.element;
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should set info about table", function() {
        equal($(element).data("table"), tableElement);
    });

    module("editor table resize handle events", {
        setup: function() {
            wrapper = $("<div id='wrapper' contenteditable='true' />").appendTo(QUnit.fixture)[0];
            handle = new TableResizeHandle({
                appendTo: QUnit.fixture,
                direction: "southeast",
                rootElement: wrapper
            });
            element = handle.element;
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should stop event propagation on mouseup", function() {
        var enterEvent = $.Event({ type: MOUSE_UP });

        $(element).trigger(enterEvent);

        equal(enterEvent.isPropagationStopped(), true);
    });

    module("editor table resize handle position east", {
        setup: function() {
            setupPositioningTest({
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
            setupPositioningTest({
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
            setupPositioningTest({
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
            setupPositioningTest({
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
            setupPositioningTest({
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
            setupPositioningTest({
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
            setupPositioningTest({
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
            setupPositioningTest({
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
})();
