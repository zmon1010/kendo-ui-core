(function() {
    var dom;
    var instance;
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeList column menu", {
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
            columnMenu: true,
            columns: [
                { field: "id", width: 10 },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("column menu in config options", function() {
        strictEqual(kendo.ui.TreeList.fn.options.columnMenu, false);
    });

    test("column menu is initialized in each header", function() {
        createTreeList();

        var th = instance.header.find("th");
        ok(th.eq(0).data("kendoColumnMenu") instanceof kendo.ui.ColumnMenu);
        ok(th.eq(1).data("kendoColumnMenu") instanceof kendo.ui.ColumnMenu);
        ok(th.eq(2).data("kendoColumnMenu") instanceof kendo.ui.ColumnMenu);
    });

    test("column menu is not initialized for command column", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10 },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 },
                { command: [ "edit" ] }
            ]
        });

        var th = instance.header.find("th");
        ok(!th.eq(3).data("kendoColumnMenu"));
    });

    test("column menu is not initialized for column without field", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10 },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 },
                { template: "foo" }
            ]
        });

        var th = instance.header.find("th");
        ok(!th.eq(3).data("kendoColumnMenu"));
    });

    test("column menu is not initialized when disabled", function() {
        createTreeList({ columnMenu: false });

        var th = instance.header.find("th");
        ok(!th.eq(0).data("kendoColumnMenu"));
        ok(!th.eq(1).data("kendoColumnMenu"));
        ok(!th.eq(2).data("kendoColumnMenu"));
    });
})();
