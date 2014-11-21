(function() {
    var dom;
    var instance;
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeList column hiding", {
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

    test("col is not rendered for initially hidden column", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, hidden: true },
                { field: "parentid", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var headerCols = instance.header.prev().children();
        var contentCols = instance.content.prev().children();

        equal(headerCols.length, 2);
        equal(headerCols[0].style.width, "20px");
        equal(headerCols[1].style.width, "30px");

        equal(contentCols.length, 2);
        equal(contentCols[0].style.width, "20px");
        equal(contentCols[1].style.width, "30px");
    });

    test("col is not rendered for initially hidden column (not scrollable)", function() {
        createTreeList({
            scrollable: false,
            columns: [
                { field: "id", width: 10, hidden: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var headerCols = instance.header.prev().children();

        equal(headerCols.length, 2);
        equal(headerCols[0].style.width, "20px");
        equal(headerCols[1].style.width, "30px");
    });

    test("hideColumn marks column as hidden", function() {
        createTreeList();

        instance.hideColumn(1);

        ok(instance.columns[1].hidden);
    });

    test("hideColumn removes col element", function() {
        createTreeList();

        instance.hideColumn(1);

        var headerCols = instance.header.prev().children();
        var contentCols = instance.content.prev().children();

        equal(headerCols.length, 2);
        equal(headerCols[0].style.width, "10px");
        equal(headerCols[1].style.width, "30px");

        equal(contentCols.length, 2);
        equal(contentCols[0].style.width, "10px");
        equal(contentCols[1].style.width, "30px");
    });

    test("intially hidden column renders header cell hidden", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, hidden: true },
                { field: "parentid", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var headerCells = instance.header.find("th");

        equal(headerCells.length, 3);
        ok(!headerCells.eq(0).is(":visible"));
        ok(headerCells.eq(1).is(":visible"));
        ok(headerCells.eq(2).is(":visible"));
    });

    test("hideColumn hides th element", function() {
        createTreeList();

        instance.hideColumn(1);
        var headerCells = instance.header.find("th");

        equal(headerCells.length, 3);
        ok(headerCells.eq(0).is(":visible"));
        ok(!headerCells.eq(1).is(":visible"), "column header is still visible");
        ok(headerCells.eq(2).is(":visible"));
    });
})();
