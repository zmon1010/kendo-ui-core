(function() {
    var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource;

    module("kendo.ui.Grid aria", {
        setup: function() {
            table = document.createElement("table");
            table.id = "test";

            QUnit.fixture[0].appendChild(table);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            $(table).closest(".k-grid").remove();
        }
    });

    test("Grid renders role=grid", function() {
        var table = $("<table />").appendTo(QUnit.fixture).kendoGrid({ dataSource: [] });

        equal(table.attr("role"), "grid");
    });

    test("Grid renders role=row to the tr", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal($(table).find("tr").attr("role"), "row");
    });

    test("Grid renders role=cell to the td", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal($(table).find("td").attr("role"), "gridcell");
    });

    test("Grid renders aria-describedby to the td", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            navigatable: true
        });

        equal($(table).find("td").first().attr("aria-describedby"), grid.wrapper.find("th")[0].id);
        equal($(table).find("td").last().attr("aria-describedby"), grid.wrapper.find("th")[1].id);
    });

    test("Grid does not render aria-describedby when navigatable option is set to false", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            navigatable: false
        });

        ok(!$(table).find("td").first().attr("aria-describedby"));
        ok(!$(table).find("td").last().attr("aria-describedby"));
    });

    test("Grid renders role=columnheader to the th (scrollable: false)", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            scrollable: false
        });

        equal($(table).find("th").attr("role"), "columnheader");
    });

    test("Grid renders role=grid to the header table", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            scrollable: true
        });

        equal(grid.thead.parent().attr("role"), "grid");
    });

    test("Grid sets active element on focus", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            navigatable: true
        });

        grid.table.focus();
        var item = grid.current();

        equal(item.attr("id"), "test_active_cell");
        equal(grid.table.attr("aria-activedescendant"), "test_active_cell");
    });

    test("Grid sets active element on focus", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.thead.parent().focus();
        var item = grid.current();

        equal(item.attr("id"), "test_active_cell");
        equal(grid.thead.parent().attr("aria-activedescendant"), "test_active_cell");
    });

    test("Grid role is treegrid when has details", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"],
            detailTemplate: "details"
        });

        equal(grid.element.attr("role"), "treegrid");
        equal(grid.element.find("tbody td:first a").attr("aria-label"), "Expand");
    });

    test("Grid set expanded state on expand", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"],
            detailTemplate: "details"
        });
        grid.table.focus().find(".k-icon:first").click();
        equal(grid.current().attr("aria-expanded"), "true");
        equal(grid.element.find("tbody td:first a").attr("aria-label"), "Collapse");
    });

    test("Grid set expanded state on collapse", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"],
            detailTemplate: "details"
        });

        grid.table.focus().find(".k-icon:first").click().click();

        equal(grid.current().attr("aria-expanded"), "false");
        equal(grid.element.find("tbody td:first a").attr("aria-label"), "Expand");
    });

    test("Grid set expanded state on group expand", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.dataSource.group({ field: "foo" });
        var row = grid.table.find("tr:first");
        grid.collapseGroup(row);
        grid.expandGroup(row);
        var expandedCell = grid.table.find("tr td:first");
        equal(expandedCell.attr("aria-expanded"), "true");
        equal(expandedCell.find("a").attr("aria-label"), "Collapse");
    });

    test("Grid set expanded state on group collapse", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.dataSource.group({ field: "foo" });
        var row = grid.table.find("tr:first");
        grid.collapseGroup(row);

        var expandedCell = grid.table.find("tr td:first");
        equal(expandedCell.attr("aria-expanded"), "false");
        equal(expandedCell.find("a").attr("aria-label"), "Expand");
    });

    test("Grid set expanded state is set for group cell", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo" ]
        });

        grid.dataSource.group({ field: "foo" });

        var expandedCell = grid.table.find("tr td:first");
        equal(expandedCell.attr("aria-expanded"), "true");
        equal(expandedCell.find("a").attr("aria-label"), "Collapse");
    });

    test("Grid commands have role attribute set", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ {
                command: ["edit", "destroy"]
            } ],
        });

        equal(grid.table.find(".k-grid-edit").attr("role"), "button");
        equal(grid.table.find(".k-grid-delete").attr("role"), "button");
    });

    test("Grid with details th should be empty if expand/collapse header text is not set", function() {
        var headerText = "E/C";
        var grid = new Grid(table, {
            detailTemplate: kendo.template("<p>details</p>"),
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo" ]
        });

        var firstTh = grid.wrapper.find("th:first");
        equal(firstTh.text().trim(), "");
    });

    test("Grid with details th should not be empty if expand/collapse header text is set", function() {
        var headerText = "E/C";
        var grid = new Grid(table, {
            detailTemplate: kendo.template("<p>details</p>"),
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo" ],
            messages: {
                expandCollapseColumnHeader: headerText
            }
        });

        var firstTh = grid.wrapper.find("th:first");
        equal(firstTh.text().trim(), headerText);
    });


    test("Grid with grouping th should be empty if expand/collapse header text is not set", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo" ]
        });

        grid.dataSource.group({ field: "foo" });

        var firstTh = grid.wrapper.find("th:first");
        equal(firstTh.text().trim(), "");
    });

    test("Grid with grouping th should not be empty if expand/collapse header text is set", function() {
        var headerText = "E/C";
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo" ],
            messages: {
                expandCollapseColumnHeader: headerText
            }
        });

        grid.dataSource.group({ field: "foo" });

        var firstTh = grid.wrapper.find("th:first");
        equal(firstTh.text().trim(), headerText);
    });

})();
