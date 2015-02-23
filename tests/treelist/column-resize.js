(function() {
    var dom;
    var instance;
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeList column resizing", {
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

    test("Resizable widget is initialized over TreeList wrapper", function() {
        createTreeList({
            resizable: true
        });

        ok(instance.wrapper.data("kendoResizable") instanceof kendo.ui.Resizable);
    });

    test("destroy reorderable", function() {
        createTreeList({
            resizable: true
        });

        instance.destroy();

        ok(!instance.wrapper.data("kendoResizable"));
        equal(instance.resizable, null);
    });

})();
