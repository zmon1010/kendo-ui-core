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

    test("sortable is initialized in locked column headers", function() {
        createTreeList({
            sortable: true
        });

        ok(instance.lockedHeader.find("th").data("kendoColumnSorter"));
    });

    test("filter menu is initialized in locked column headers", function() {
        createTreeList({
            filterable: true
        });

        ok(instance.lockedHeader.find("th").data("kendoFilterMenu"));
    });

    test("column menu is initialized in locked column headers", function() {
        createTreeList({
            columnMenu: true
        });

        ok(instance.lockedHeader.find("th").data("kendoColumnMenu"));
    });

    test("single cell selection", function() {
        createTreeList({
            selectable: "cell"
        });

        var cell = instance.table.find("td").eq(0);
        instance.select(cell);

        ok(cell.hasClass("k-state-selected"));
    });

    test("single row selection", function() {
        createTreeList({
            selectable: "row"
        });

        var row = instance.table.find("tr").eq(0);
        instance.select(row);

        ok(row.hasClass("k-state-selected"));
        ok(instance.lockedTable.find("tr").eq(0).hasClass("k-state-selected"));
    });

    test("render inline editor spans over locked and non-locked row", function() {
        createTreeList({
            editable: "inline"
        });

        instance.editRow(instance.table.find("tr").first());

        var lockedRow = instance.lockedTable.find("tr").first();
        var row = instance.table.find("tr").first();

        ok(lockedRow.hasClass("k-grid-edit-row"));
        equal(lockedRow.find("td[data-container-for]").length, 1, "doesn't have container for locked cells");
        equal(lockedRow.find("input:visible").length, 1, "doesn't have input for locked cells");

        ok(row.hasClass("k-grid-edit-row"));
        equal(row.find("td[data-container-for]").length, 2, "doesn't have container for non-locked cells");
        equal(row.find("input:visible").length, 2, "doesn't have input for non-locked cells");
    });

    test("alt row rendering", function() {
        createTreeList();

        var lockedRows = instance.lockedTable.find("tr");
        var rows = instance.table.find("tr");

        ok(!lockedRows.eq(0).hasClass("k-alt"));
        ok(lockedRows.eq(1).hasClass("k-alt"));

        ok(!rows.eq(0).hasClass("k-alt"));
        ok(rows.eq(1).hasClass("k-alt"));
    });

    test("reorderColumn sets column as locked in columns collection", function() {
        createTreeList();

        var column = instance.columns[2];
        instance.reorderColumn(0, column, false);

        ok(instance.columns[1].field, "text");
        ok(instance.columns[1].locked);
    });

    test("reorderColumn sets column as non-locked in columns collection", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30, locked: true }
            ]
        });

        var column = instance.columns[1];
        instance.reorderColumn(2, column, true);

        ok(instance.columns[1].field, "text");
        ok(!instance.columns[1].locked);
    });

    test("reorder column to locked container repaints the header", function() {
        createTreeList();

        var column = instance.columns[2];
        instance.reorderColumn(0, column, false);

        var lockedCells = instance.lockedHeader.find("th");
        var cells = instance.thead.find("th");

        equal(lockedCells.length, 2);
        equal(cells.length, 1);
        equal(lockedCells.eq(0).text(), "id");
        equal(lockedCells.eq(1).text(), "text");
        equal(cells.eq(0).text(), "parentId");
    });

    test("reorder column to non-locked container repaints the header", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30, locked: true }
            ]
        });

        var column = instance.columns[1];
        instance.reorderColumn(2, column, true);

        var lockedCells = instance.lockedHeader.find("th");
        var cells = instance.thead.find("th");

        equal(lockedCells.length, 1);
        equal(cells.length, 2);
        equal(lockedCells.eq(0).text(), "id");
        equal(cells.eq(0).text(), "text");
        equal(cells.eq(1).text(), "parentId");
    });

    test("header width is re-calculated on column reorder", function() {
        createTreeList();

        var column = instance.columns[2];
        instance.reorderColumn(0, column, false);

        equal(instance.lockedHeader.width(), 40);
        equal(instance.thead.parent().width(), 20);
    });

    test("column is not moved to locked container if is last non-locked", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20, locked: true },
                { field: "text", width: 30 }
            ]
        });

        var columns = instance.columns;
        instance.reorderColumn(0, columns[2]);

        ok(columns[0].locked);
        ok(columns[1].locked);
        ok(!columns[2].locked);

        equal(columns[0].field, "id");
        equal(columns[1].field, "parentId");
        equal(columns[2].field, "text");
    });

    test("column is not moved to non-locked container if is last locked", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, locked: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var columns = instance.columns;
        instance.reorderColumn(1, columns[0]);

        ok(columns[0].locked);
        ok(!columns[1].locked);
        ok(!columns[2].locked);

        equal(columns[0].field, "id");
        equal(columns[1].field, "parentId");
        equal(columns[2].field, "text");
    });
})();
