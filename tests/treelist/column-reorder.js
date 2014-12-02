(function() {
    var dom;
    var instance;
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeList column reorder", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend(true, {}, {
            dataSource: {
                data: [
                    { id: 1, text: "foo", parentId: null, expanded: true },
                    { id: 3, text: "bar", parentId: null, expanded: true },
                    { id: 2, text: "baz", parentId: 1 }
                ]
            },
            columns: [
                { field: "id", width: 10 },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("reorderable in config options", function() {
        strictEqual(kendo.ui.TreeList.fn.options.reorderable, false);
    });

    test("Reorderable widget is initialized over TreeList wrapper", function() {
        createTreeList({
            reorderable: true
        });

        ok(instance.wrapper.data("kendoReorderable") instanceof kendo.ui.Reorderable);
    });

    test("destroy reorderable", function() {
        createTreeList({
            reorderable: true
        });

        instance.destroy();

        ok(!instance.wrapper.data("kendoReorderable"));
        equal(instance.reorderable, null);
    });

    test("move column to the left before another column, reorders columns collection", function() {
        createTreeList();

        instance.reorderColumn(1, instance.columns[2], true);

        var columns = instance.columns;
        equal(columns[0].field, "id");
        equal(columns[1].field, "text");
        equal(columns[2].field, "parentId");
    });

    test("move column to the left after another column, reorders columns collection", function() {
        createTreeList();

        instance.reorderColumn(0, instance.columns[2], false);

        var columns = instance.columns;
        equal(columns[0].field, "id");
        equal(columns[1].field, "text");
        equal(columns[2].field, "parentId");
    });

    test("move column to the right before another column, reorders columns collection", function() {
        createTreeList();

        instance.reorderColumn(2, instance.columns[0], true);

        var columns = instance.columns;
        equal(columns[0].field, "parentId");
        equal(columns[1].field, "id");
        equal(columns[2].field, "text");
    });

    test("move column to the right after another column, reorders columns collection", function() {
        createTreeList();

        instance.reorderColumn(2, instance.columns[0], false);

        var columns = instance.columns;
        equal(columns[0].field, "parentId");
        equal(columns[1].field, "text");
        equal(columns[2].field, "id");
    });

    test("move column to the left without explicit before parameter", function() {
        createTreeList();

        instance.reorderColumn(1, instance.columns[2]);

        var columns = instance.columns;
        equal(columns[0].field, "id");
        equal(columns[1].field, "text");
        equal(columns[2].field, "parentId");
    });

    test("move column to the right without explicit before parameter", function() {
        createTreeList();

        instance.reorderColumn(1, instance.columns[0]);

        var columns = instance.columns;
        equal(columns[0].field, "parentId");
        equal(columns[1].field, "id");
        equal(columns[2].field, "text");
    });
})();
