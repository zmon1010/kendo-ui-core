(function() {
    var TableResizeHandle = kendo.ui.editor.TableResizeHandle;
    var handle;
    var wrapper;
    var DOT = ".";
    var HANDLE_SELECTOR = ".k-table-resize-handle";
    var PX = "px";
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
            direction: "southeast",
            resizableElement: null,
            template: "<div class='k-table-resize-handle'></div>",
            width: 20,
            height: 20
        };

        handle = new TableResizeHandle({});

        deepEqual(handle.options, defaultOptions);
    });

    test("should be initialized with custom optionsy", function() {
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
            handle = new TableResizeHandle({
                appendTo: QUnit.fixture,
                direction: "southeast"
            });
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should have default width", function() {
        equal($(handle.element).css("width"), handle.options.width + PX);
    });

    test("should have default height", function() {
        equal($(handle.element).css("height"), handle.options.width + PX);
    });

    test("should have direction class", function() {
        equal($(handle.element).hasClass("k-resize-se"), true);
    });

    module("editor table resize handle southeast position", {
        setup: function() {
            wrapper = $("<div id='wrapper' />").appendTo(QUnit.fixture);
            tableElement = $(TABLE_HTML).css({ left: 10, top: 20 }).appendTo(wrapper[0]);
            handle = new TableResizeHandle({
                appendTo: wrapper[0],
                resizableElement: tableElement,
                direction: "southeast"
            });
            element = $(handle.element);
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

        equal(element.css("left"), tableElement.offset().left + tableElement.outerWidth() - (element.outerHeight() / 2) + PX);
    });
})();
