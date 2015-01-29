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
            height: 100,
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

    test("locked containers width is set to the sum of locked columns", function() {
        createTreeList();

        equal(instance.lockedHeader.width(), 10);
        equal(instance.lockedContent.width(), 10);

        equal(instance.lockedHeader.find("table")[0].style.width, "");
        equal(instance.lockedTable[0].style.width, "");
    });

    test("locked containers width when locked columns width is larget then the wrapper", function() {
        dom.width(200);
        createTreeList({
            columns: [
                { field: "id", width: 200, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var expectedWidth = 200 - 3 * kendo.support.scrollbar();
        equal(instance.lockedHeader.width(), expectedWidth);
        equal(instance.lockedContent.width(), expectedWidth);
    });

    test("non-locked containers width is set to the sum of non-locked columns", function() {
        createTreeList();

        equal(instance.thead.parent().width(), 50);
        equal(instance.table.width(), 50);
    });

    test("set width of header wrap and content elements", function() {
        var lockedColumnWidth = 100;
        dom.width(200);
        createTreeList({
            columns: [
                { field: "id", width: lockedColumnWidth, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var expectedWidth = dom.width() - 2 - lockedColumnWidth;
        equal(instance.thead.closest(".k-grid-header-wrap").width(), expectedWidth - kendo.support.scrollbar());
        equal(instance.content.width(), expectedWidth);
    });

    test("set height of the locked content", function() {
        createTreeList();

        equal(instance.lockedContent.height(), instance.content.height());
    });

    test("set height of the locked content when horizontal scrollbar over non-locked content", function() {
        dom.width(20);
        createTreeList();

        equal(instance.lockedContent.height(), instance.content.height() - kendo.support.scrollbar());
    });

    test("synchronize row width", function() {
        createTreeList();

        var lockedRows = instance.lockedTable.find("tr");
        var nonLockedRows = instance.table.find("tr");

        equal(lockedRows.eq(0).height(), nonLockedRows.eq(0).height());
        equal(lockedRows.eq(1).height(), nonLockedRows.eq(1).height());
        equal(lockedRows.eq(2).height(), nonLockedRows.eq(2).height());
    });

    test("vertical scroll the locked content on scroll of non-locked", function() {
        createTreeList({ height: 50 });

        instance.content.scrollTop(10).trigger("scroll");
        equal(instance.lockedContent.scrollTop(), instance.content.scrollTop());
    });
})();
