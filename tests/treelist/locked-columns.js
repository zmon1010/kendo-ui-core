(function() {
    var dom;
    var instance;
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeList locked columns", {
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
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("locked column appear befor non locked columns", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20, locked: false },
                { field: "text", width: 30, locked: true }
            ]
        });

        var columns = instance.columns;
        equal(columns[0].field, "id");
        equal(columns[1].field, "text");
        equal(columns[2].field, "parentId");
    });

    test("first locked column is expandable", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: false },
                { field: "parentId", width: 20, locked: false },
                { field: "text", width: 30, locked: true }
            ]
        });

        var columns = instance.columns;
        equal(columns[0].field, "text");
        ok(columns[0].expandable);
    });

    test("header col elements rendering", function() {
        createTreeList();

        var lockedCols = instance.lockedHeader.find("col");
        var cols = instance.thead.prev().children();

        equal(lockedCols.length, 1);
        equal(lockedCols[0].style.width, "10px");

        equal(cols.length, 2);
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "30px");
    });

    test("content col elements rendering", function() {
        createTreeList();

        var lockedCols = instance.lockedContent.find("col");
        var cols = instance.tbody.prev().children();

        equal(lockedCols.length, 1);
        equal(lockedCols[0].style.width, "10px");

        equal(cols.length, 2);
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "30px");
    });

    test("header cells rendering", function() {
        createTreeList();

        var lockedCells = instance.lockedHeader.find("th");
        var cells = instance.thead.find("th");

        equal(lockedCells.length, 1);
        equal(lockedCells.eq(0).text(), "id");

        equal(cells.length, 2);
        equal(cells.eq(0).text(), "parentId");
        equal(cells.eq(1).text(), "text");
    });

    test("content cells rendering", function() {
        createTreeList();

        var lockedCells = instance.lockedContent.find("tr:eq(0) td");
        var cells = instance.content.find("tr:eq(0) td");

        equal(lockedCells.length, 1);
        equal(lockedCells.eq(0).text(), "1");

        equal(cells.length, 2);
        equal(cells.eq(0).text(), "null");
        equal(cells.eq(1).text(), "foo");
    });
})();
