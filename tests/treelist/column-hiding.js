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

        var headerCols = instance.thead.prev().children();
        var contentCols = instance.tbody.prev().children();

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

        var headerCols = instance.thead.prev().children();

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

        var headerCols = instance.thead.prev().children();
        var contentCols = instance.tbody.prev().children();

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

        var headerCells = instance.thead.find("th");

        equal(headerCells.length, 3);
        ok(!headerCells.eq(0).is(":visible"));
        ok(headerCells.eq(1).is(":visible"));
        ok(headerCells.eq(2).is(":visible"));
    });

    test("hideColumn hides th element", function() {
        createTreeList();

        instance.hideColumn(1);
        var headerCells = instance.thead.find("th");

        equal(headerCells.length, 3);
        ok(headerCells.eq(0).is(":visible"));
        ok(!headerCells.eq(1).is(":visible"), "column header is still visible");
        ok(headerCells.eq(2).is(":visible"));
    });

    test("intially hidden column renders data cells hidden", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, hidden: true },
                { field: "parentid", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        var cells = instance.content.find("tr").first().children();

        equal(cells.length, 3);
        ok(!cells.eq(0).is(":visible"), "data cell is still visible");
        ok(cells.eq(1).is(":visible"));
        ok(cells.eq(2).is(":visible"));
    });

    test("hideColumn hides data cells", function() {
        createTreeList();

        instance.hideColumn(1);
        var cells = instance.content.find("tr").first().children();

        equal(cells.length, 3);
        ok(cells.eq(0).is(":visible"));
        ok(!cells.eq(1).is(":visible"), "data cell is still visible");
        ok(cells.eq(2).is(":visible"));
    });

    test("intially hidden column renders footer cell hidden", function() {
        createTreeList({
            columns: [
                { footerTemplate: "foo", field: "id", width: 10, hidden: true },
                { footerTemplate: "foo", field: "parentid", width: 20 },
                { footerTemplate: "foo", field: "text", width: 30 }
            ]
        });

        var cells = instance.content.find(".k-footer-template").first().children();

        equal(cells.length, 3);
        ok(!cells.eq(0).is(":visible"), "footer cell is still visible");
        ok(cells.eq(1).is(":visible"));
        ok(cells.eq(2).is(":visible"));
    });

    test("hideColumn hides footer cell", function() {
        createTreeList({
            columns: [
                { footerTemplate: "foo", field: "id", width: 10 },
                { footerTemplate: "foo", field: "parentid", width: 20 },
                { footerTemplate: "foo", field: "text", width: 30 }
            ]
        });

        instance.hideColumn(1);
        var cells = instance.content.find(".k-footer-template").first().children();

        equal(cells.length, 3);
        ok(cells.eq(0).is(":visible"));
        ok(!cells.eq(1).is(":visible"), "footer cell is still visible");
        ok(cells.eq(2).is(":visible"));
    });

    test("showColumn marks column as visible", function() {
        createTreeList();

        instance.hideColumn(1);
        instance.showColumn(1);

        ok(!instance.columns[1].hidden);
    });

    test("col is rendered on showing initially hidden column", function() {
        createTreeList({
            columns: [
                { field: "id", width: 10, hidden: true },
                { field: "parentid", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        instance.showColumn(0);

        var headerCols = instance.thead.prev().children();
        var contentCols = instance.tbody.prev().children();

        equal(headerCols.length, 3);
        equal(headerCols[0].style.width, "10px");
        equal(headerCols[1].style.width, "20px");
        equal(headerCols[2].style.width, "30px");

        equal(contentCols.length, 3);
        equal(contentCols[0].style.width, "10px");
        equal(contentCols[1].style.width, "20px");
        equal(contentCols[2].style.width, "30px");
    });

    test("col is rendered on showing initially hidden column (not scrollable)", function() {
        createTreeList({
            scrollable: false,
            columns: [
                { field: "id", width: 10, hidden: true },
                { field: "parentId", width: 20 },
                { field: "text", width: 30 }
            ]
        });

        instance.showColumn(0);
        var headerCols = instance.thead.prev().children();

        equal(headerCols.length, 3);
        equal(headerCols[0].style.width, "10px");
        equal(headerCols[1].style.width, "20px");
        equal(headerCols[2].style.width, "30px");
    });

    test("showColumn add col element", function() {
        createTreeList();

        instance.hideColumn(1);
        instance.showColumn(1);

        var headerCols = instance.thead.prev().children();
        var contentCols = instance.tbody.prev().children();

        equal(headerCols.length, 3);
        equal(headerCols[0].style.width, "10px");
        equal(headerCols[1].style.width, "20px");
        equal(headerCols[2].style.width, "30px");

        equal(contentCols.length, 3);
        equal(contentCols[0].style.width, "10px");
        equal(contentCols[1].style.width, "20px");
        equal(contentCols[2].style.width, "30px");
    });

    test("showColumn shows th element", function() {
        createTreeList();

        instance.hideColumn(1);
        instance.showColumn(1);

        var headerCells = instance.thead.find("th");

        equal(headerCells.length, 3);
        ok(headerCells.eq(0).is(":visible"));
        ok(headerCells.eq(1).is(":visible"), "column header is still not visible");
        ok(headerCells.eq(2).is(":visible"));
    });

    test("showColumn shows data cells", function() {
        createTreeList();

        instance.hideColumn(1);
        instance.showColumn(1);

        var cells = instance.content.find("tr").first().children();

        equal(cells.length, 3);
        ok(cells.eq(0).is(":visible"));
        ok(cells.eq(1).is(":visible"), "data cell is still not visible");
        ok(cells.eq(2).is(":visible"));
    });

    test("showColumn shows footer cell", function() {
        createTreeList({
            columns: [
                { footerTemplate: "foo", field: "id", width: 10 },
                { footerTemplate: "foo", field: "parentid", width: 20 },
                { footerTemplate: "foo", field: "text", width: 30 }
            ]
        });

        instance.hideColumn(1);
        instance.showColumn(1);

        var cells = instance.content.find(".k-footer-template").first().children();

        equal(cells.length, 3);
        ok(cells.eq(0).is(":visible"));
        ok(cells.eq(1).is(":visible"), "footer cell is still not visible");
        ok(cells.eq(2).is(":visible"));
    });

    test("hideColumn accepts field as argument", function() {
        createTreeList();

        instance.hideColumn("text");

        ok(instance.columns[2].hidden);
    });

    test("showColumn accepts field as argument", function() {
        createTreeList();

        instance.hideColumn("text");
        instance.showColumn("text");

        ok(!instance.columns[2].hidden);
    });

    test("hideColumn accepts column as argument", function() {
        createTreeList();

        instance.hideColumn(instance.columns[2]);

        ok(instance.columns[2].hidden);
    });

    test("showColumn accepts column as argument", function() {
        createTreeList();

        instance.hideColumn("text");
        instance.showColumn(instance.columns[2]);

        ok(!instance.columns[2].hidden);
    });

    test("hideColumn triggers event", 2, function() {
        createTreeList({
            columnHide: function(e) {
                ok(e.column);
                equal(e.column.field, "text");
            }
        });

        instance.hideColumn("text");
    });

    test("showColumn triggers event", 2, function() {
        createTreeList({
            columnShow: function(e) {
                ok(e.column);
                equal(e.column.field, "text");
            }
        });

        instance.hideColumn("text");
        instance.showColumn("text");
    });

    test("hideColumn doesn't trigger event if the column is already hidden", function() {
        var wasCalled = false;
        createTreeList({
            columns: [ "id", "parentId", { field: "text", hidden: true }],
            columnHide: function() {
                wasCalled = true;
            }
        });

        instance.hideColumn("text");

        ok(!wasCalled, "event was triggered on already hidden column");
    });

    test("hideMinScreenCols hides the column initially when there is not enough width", function() {
        createTreeList({
            columns: [ { field: "id", minScreenWidth: 50000 }, "parentId", { field: "text", hidden: true }],
        });

        equal(instance.columns[0].hidden, true);
    });

    test("hideMinScreenCols shows the column when there is enough width", function() {
        createTreeList({
            columns: [ { field: "id", minScreenWidth: 50000 }, "parentId", { field: "text", hidden: true }],
        });

        var firstCol = instance.columns[0];

        equal(firstCol.hidden, true);

        firstCol.minScreenWidth = 0;
        $(window).trigger('resize');

        equal(firstCol.hidden, false);
    });

    test("showColumn doesn't trigger event if the column is already visible", function() {
        var wasCalled = false;
        createTreeList({
            columnHide: function() {
                wasCalled = true;
            }
        });

        instance.showColumn("text");

        ok(!wasCalled, "event was triggered on already visible column");
    });
})();
