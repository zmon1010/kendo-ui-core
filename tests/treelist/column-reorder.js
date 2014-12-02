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

    test("reorder col elements in scrollable widget", function() {
        createTreeList();

        instance.reorderColumn(1, instance.columns[2]);

        var headerCols = instance.header.prev().children();
        var contentCols = instance.content.prev().children();

        equal(headerCols[0].style.width, "10px");
        equal(headerCols[1].style.width, "30px");
        equal(headerCols[2].style.width, "20px");

        equal(contentCols[0].style.width, "10px");
        equal(contentCols[1].style.width, "30px");
        equal(contentCols[2].style.width, "20px");
    });

    test("reorder col elements in non-scrollable widget", function() {
        createTreeList({ scrollable: false });

        instance.reorderColumn(1, instance.columns[2]);

        var headerCols = instance.header.prev().children();

        equal(headerCols[0].style.width, "10px");
        equal(headerCols[1].style.width, "30px");
        equal(headerCols[2].style.width, "20px");
    });

    test("reorder data cells", function() {
        createTreeList();

        instance.reorderColumn(1, instance.columns[2]);

        var tds = instance.content.find("tr:first").children();

        equal(tds.eq(0).text(), "1");
        equal(tds.eq(1).text(), "foo");
        equal(tds.eq(2).text(), "");
    });

    test("move header cell to the left", function() {
        createTreeList();

        instance.reorderColumn(1, instance.columns[2]);

        var ths = instance.header.find("tr:first").children();

        equal(ths.eq(0).text(), "id");
        equal(ths.eq(1).text(), "text");
        equal(ths.eq(2).text(), "parentId");
    });

    test("move header cell to the right", function() {
        createTreeList();

        instance.reorderColumn(0, instance.columns[1]);

        var ths = instance.header.find("tr:first").children();

        equal(ths.eq(0).text(), "parentId");
        equal(ths.eq(1).text(), "id");
        equal(ths.eq(2).text(), "text");
    });

    test("sort icons is in correct header cell", function() {
        createTreeList({
            sortable: true
        });

        instance.dataSource.sort({
            field: "parentId",
            dir: "asc"
        });
        instance.reorderColumn(0, instance.columns[1]);

        var ths = instance.header.find("tr:first").children();

        equal(ths.eq(0).text(), "parentId");
        ok(ths.eq(0).find(".k-i-arrow-n")[0]);
    });
})();
