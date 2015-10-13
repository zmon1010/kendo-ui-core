(function() {
    var handler;

    module("TreeList events", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
           handler = spy();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            dom.remove();

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend({
            dataSource: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ],
            columns: [ "id", "parentId" ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    function controlledRead() {
        var queue = [];

        var read = function(options) {
            var deferred = $.Deferred();

            deferred.then(options.success, options.error);

            queue.push(deferred);
        };

        read.resolve = function(value) {
            if (!queue.length) {
                throw new Error("Tried to resolve a request that hasn't been executed.");
            }
            queue.shift().resolve(value);
        };

        read.reject = function(value) {
            queue.shift().reject(value);
        };

        return read;
    }

    function dragEvent(x, y, handle) {
        return {
            x: { location: x, startLocation: x },
            y: { location: y, startLocation: y },
            currentTarget: handle
        };
    }

    test("dataBound is fired upon refresh", function() {
        createTreeList({
            dataBound: handler
        });

        equal(handler.calls, 1);
    });

    test("dataBound is not triggered when expanding loaded item", function() {
        createTreeList({
            dataBound: handler
        });

        instance.content.find(".k-i-expand").mousedown();

        equal(handler.calls, 1);
    });

    test("dataBound is triggered once per remote loading", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } },
            dataBound: handler
        });

        read.resolve([ { id: 1, hasChildren: true } ]);

        equal(handler.calls, 1);

        instance.content.find(".k-i-expand").mousedown();

        equal(handler.calls, 1);

        read.resolve([ { id: 2, parentId: 1 } ]);

        equal(handler.calls, 2);
    });

    test("dataBound is not triggered upon error when loading item", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } },
            dataBound: handler
        });

        read.resolve([ { id: 1, hasChildren: true } ]);

        instance.content.find(".k-i-expand").mousedown();

        read.reject();

        equal(handler.calls, 1);
    });

    test("dataBinding is triggered before dataBound", function() {
        var beforeDataBound = true;
        createTreeList({
            dataBinding: function() {
                ok(beforeDataBound);
            },
            dataBound: function() {
                beforeDataBound = false;
            }
        });
    });

    test("change is fired upon select", function() {
        createTreeList({
            selectable: true,
            change: handler
        });

        clickAt(instance.content.find("tr:first"));

        equal(handler.calls, 1);
    });

    test("filterMenuInit is fired upon filter menu initialization", function() {
        createTreeList({
            filterable: true,
            filterMenuInit: handler
        });

        instance.thead.find(".k-grid-filter:first").click();

        equal(handler.calls, 1);
    });

    test("expand is fired upon row expanding", function() {
        createTreeList({
            expand: handler
        });

        instance.content.find(".k-i-expand").mousedown();

        equal(handler.calls, 1);
    });

    test("expand event can be prevented", function() {
        createTreeList({
            expand: function(e) {
                e.preventDefault();
            }
        });

        instance.content.find(".k-i-expand").mousedown();

        equal(instance.content.find("tr:visible").length, 1);
    });

    test("collapse is fired upon row collapse", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ],
            collapse: handler
        });

        instance.content.find(".k-i-collapse").mousedown();

        equal(handler.calls, 1);
    });

    test("collapse event can be prevented", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ],
            collapse: function(e) {
                e.preventDefault();
            }
        });

        instance.content.find(".k-i-collapse").mousedown();

        equal(instance.content.find("tr:visible").length, 2);
    });

    test("columnResize event is fired upon resizing", function() {
        var handler = spy();

        createTreeList({
            resizable: true,
            dataSource: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ],
            columnResize: handler
        });

        var th = instance.wrapper.find("th:first");
        instance._positionResizeHandle({
            currentTarget: th[0],
            clientX: th.offset().left + th.outerWidth() - 2
        });

        var handle = instance.wrapper.find(".k-resize-handle");
        var resizable = instance.resizable;
        resizable.press(handle)
        resizable.move(10);
        resizable.end();

        equal(handler.calls, 1);
    });

    function moveRow(options) {
        var sourceUid = instance.dataSource.get(options.row).uid;
        var destinationUid = instance.dataSource.get(options.to).uid;
        var sourceRow = dom.find("[" + kendo.attr("uid") + "=" + sourceUid + "]");
        var destinationRow = dom.find("[" + kendo.attr("uid") + "=" + destinationUid + "]");
        var startOffset = sourceRow.offset();
        var endOffset = destinationRow.offset();

        press(sourceRow, startOffset.left + 1, startOffset.top + 1);
        move(destinationRow, endOffset.left + 1, endOffset.top + 1);
        release(destinationRow, endOffset.left + 2, endOffset.top + 2);
    }

    function createDraggableTreeList(options) {
        return createTreeList($.extend({
            editable: { move: true },
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 }
            ]
        }, options));
    }

    test("triggers dragstart event", function() {
        createDraggableTreeList({
            dragstart: handler
        });

        moveRow({ row: 2, to: 3 });

        equal(handler.calls, 1);
    });

    test("triggers drag event", function() {
        createDraggableTreeList({
            editable: { move: true },
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 }
            ],
            drag: handler
        });

        moveRow({ row: 2, to: 3 });

        equal(handler.calls, 1);
    });

    test("triggers drop event", function() {
        createDraggableTreeList({
            editable: { move: true },
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 }
            ],
            drop: handler
        });

        moveRow({ row: 2, to: 3 });

        equal(handler.calls, 1);
    });

    test("triggers dragend event", function() {
        createDraggableTreeList({
            editable: { move: true },
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 }
            ],
            dragend: handler
        });

        moveRow({ row: 2, to: 3 });

        equal(handler.calls, 1);
    });

    test("new parentId is set in dragend", function() {
        createDraggableTreeList({
            dragend: function(e) {
                equal(e.source.parentId, 3);
                equal(e.destination.id, 3);
            }
        });

        moveRow({ row: 2, to: 3 });
    });

    test("dragstart provides model instead of node", function() {
        createDraggableTreeList({
            dragstart: function(e) {
                ok(e.source instanceof kendo.data.TreeListModel);
                equal(e.source.id, 2);
            }
        });

        moveRow({ row: 2, to: 3 });
    });

    test("drop event provides model", function() {
        createDraggableTreeList({
            drop: function(e) {
                ok(e.source instanceof kendo.data.TreeListModel);
                ok(e.destination instanceof kendo.data.TreeListModel);
                equal(e.source.id, 2);
                equal(e.destination.id, 3);
            }
        });

        moveRow({ row: 2, to: 3 });
    });

    test("drag provides source as model, target as jQuery", function() {
        createDraggableTreeList({
            drag: function(e) {
                ok(e.source instanceof kendo.data.TreeListModel);
                equal(e.source.id, 2);

                ok(e.target instanceof jQuery);
            }
        });

        moveRow({ row: 2, to: 3 });
    });

    test("dragstart can be prevented", 0, function() {
        createDraggableTreeList({
            dragstart: function(e) {
                e.preventDefault();
            },
            drag: function(e) {
                ok(false);
            }
        });

        moveRow({ row: 2, to: 3 });
    });

    test("drop can be prevented", 0, function() {
        createDraggableTreeList({
            drop: function(e) {
                e.preventDefault();
            },
            dragend: function(e) {
                ok(false);
            }
        });

        moveRow({ row: 2, to: 3 });
    });
})();
