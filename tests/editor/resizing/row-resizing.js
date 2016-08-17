(function() {
    var RowResizing = kendo.ui.editor.RowResizing;
    var rowResizing;
    var tableElement;
    var DOT = ".";
    var MOUSE_MOVE = "mousemove";
    var NS = "kendoEditorRowResizing"
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
        '</table>';

    module("editor table resizing", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement, {});
        },

        teardown: function() {
            rowResizing.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not be initialized with element that is different from table", function() {
        rowResizing = new RowResizing($("<div />")[0], {});

        equal(undefined, rowResizing.element);
    });

    test("should be initialized with table element", function() {
        rowResizing = new RowResizing(tableElement, {});

        equal(tableElement, rowResizing.element);
    });

    test("should be initialized with default options", function() {
        var defaultOptions = {
            tags: ["tr"]
        };

        rowResizing = new RowResizing(tableElement, {});

        deepEqual(rowResizing.options, defaultOptions);
    });
    
    test("should be initialized with custom options", function() {
        var options = { tags: ["th"] };

        rowResizing = new RowResizing(tableElement, options);

        deepEqual(options, rowResizing.options);
    });

    test("should be initialized with array of tags", function() {
        var options = { tags: "tag" };

        rowResizing = new RowResizing(tableElement, options);

        deepEqual({ tags: ["tag"] }, rowResizing.options);
    });

    test("move handlers should be attached to all rows", function() {
        assertEvent(tableElement, { type: MOUSE_MOVE, selector: "tr", namespace: NS, handler: $.noop });
    });

    module("editor row resizing destroy", {
        setup: function() {
            tableElement = $(TABLE_HTML).appendTo(QUnit.fixture)[0];
            rowResizing = new RowResizing(tableElement);
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
})();
