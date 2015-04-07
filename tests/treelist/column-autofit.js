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
                    { id: 2, text: "baz baz baz", parentId: 1 }
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

    test("autofit column increases the width of the column", function() {
        createTreeList({
            resizable: true
        });

        var oldWidth = instance.columns[2].width;
        instance.autoFitColumn(2);
        ok(oldWidth < instance.columns[2].width)
    });

    test("autofit sets lockedContainer width after toggling row", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var oldWidth = instance.columns[2].width;
        var firstRow = instance.tbody.find("tr:first");

        instance.collapse(firstRow);
        instance.autoFitColumn(2);
        instance.expand(firstRow);
        equal(instance.lockedContent.height(), 220);
    });
})();
