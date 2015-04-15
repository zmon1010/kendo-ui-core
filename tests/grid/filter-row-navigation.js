(function() {
   var Grid = kendo.ui.Grid,
        DataSource = kendo.data.DataSource,
        keys = kendo.keys,
        div;

    function setup(options) {
        options = $.extend(true, {
            columns: [ "foo", "bar" ],
            dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}],
            navigatable: true,
            filterable: {
                mode: "row"
            }
        },
        options);
        return new Grid(div, options);
    }

    module("Grid filter row navigation", {
        setup: function() {
            div = $("<div></div>").appendTo(QUnit.fixture);

            $.fn.press = function(key, ctrl, shift, alt) {
                return this.trigger( { type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt } );
            }
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            div.remove();
            $(".k-animation-container").remove();
        }
    });

    test("moves DOWN from header cell to filter cell", function() {
        var grid = setup();
        grid.current(grid.thead.find("th:first"));
        grid.thead.parent().press(keys.DOWN);
        ok(grid.current().parent().hasClass("k-filter-row"));
    });

    test("moves DOWN from filter cell to data cell", function() {
        var grid = setup();
        grid.current(grid.thead.find(".k-filter-row th:first"));
        grid.thead.parent().press(keys.DOWN);
        equal(grid.current()[0], grid.tbody.find("td:first")[0]);
    });

    test("moves DOWN from header cell to filter cell inside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.lockedHeader.find("th:first"));
        grid.lockedHeader.find("table").press(keys.DOWN);
        ok(grid.current().parent().hasClass("k-filter-row"));
    });

    test("moves DOWN from filter cell to data cell inside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.lockedHeader.find(".k-filter-row th:first"));
        grid.lockedHeader.find("table").press(keys.DOWN);
        equal(grid.current()[0], grid.lockedTable.find("td:first")[0]);
    });

    test("moves DOWN from header cell to filter-cell outside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.thead.find("th:first"));
        grid.thead.parent().press(keys.DOWN);
        ok(grid.current().parent().hasClass("k-filter-row"));
    });

    test("moves DOWN from filter cell to data-cell outside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.thead.find(".k-filter-row th:first"));
        grid.thead.parent().press(keys.DOWN);
        equal(grid.current()[0], grid.tbody.find("td:first")[0]);
    });

    test("moves UP from data cell to filter cell", function() {
        var grid = setup();
        grid.current(grid.tbody.find("td:first"));
        grid.table.press(keys.UP);
        equal(grid.current()[0], grid.thead.find(".k-filter-row th:first")[0]);
    });

    test("moves UP from filter cell to header cell", function() {
        var grid = setup();
        grid.current(grid.thead.find(".k-filter-row th:first"));
        grid.thead.parent().press(keys.UP);
        equal(grid.current()[0], grid.thead.find("th:first")[0]);
    });

    test("moves UP from data cell to filter cell inside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.lockedTable.find("td:first"));
        grid.lockedTable.press(keys.UP);
        equal(grid.current()[0], grid.lockedHeader.find(".k-filter-row th:first")[0]);
    });

    test("moves UP from filter cell to header cell inside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.lockedHeader.find(".k-filter-row th:first"));
        grid.lockedTable.press(keys.UP);
        equal(grid.current()[0], grid.lockedHeader.find("th:first")[0]);
    });

    test("moves UP from data cell to filter cell outside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.tbody.find("td:first"));
        grid.table.press(keys.UP);
        equal(grid.current()[0], grid.thead.find(".k-filter-row th:first")[0]);
    });

    test("moves UP from filter cell to header cell outside locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.thead.find(".k-filter-row th:first"));
        grid.thead.parent().press(keys.UP);
        equal(grid.current()[0], grid.thead.find("th:first")[0]);
    });

    test("moves RIGHT from locked filter cell", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.lockedHeader.find(".k-filter-row th:last"));
        grid.lockedHeader.find("table").press(keys.RIGHT);
        equal(grid.current()[0], grid.thead.find(".k-filter-row th")[0]);
    });

    test("moves LEFT to locked filter cell", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.thead.find(".k-filter-row th:first"));
        grid.thead.parent().press(keys.LEFT);
        equal(grid.current()[0], grid.lockedHeader.find(".k-filter-row th:last")[0]);
    });

    test("moves RIGHT from leaf th cell", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.lockedHeader.find("tr:first th:last"));
        grid.lockedHeader.find("table").press(keys.RIGHT);
        equal(grid.current()[0], grid.thead.find("th")[0]);
    });

    test("moves LEFT from th leaf", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, { field: "bar"}]
        });
        grid.current(grid.thead.find("tr:first th:first"));
        grid.thead.parent().press(keys.LEFT);
        equal(grid.current()[0], grid.lockedHeader.find("tr:first th:last")[0]);
    });

    test("multicolumn moves DOWN from header leaf cell to filter cell", function() {
        var grid = setup({
            columns: [
                { width: 300, columns: [{ width: 300, field: "foo" }] },
                { field: "bar" }
            ]
        });
        grid.current(grid.thead.find("tr:first th:last"));
        grid.thead.parent().press(keys.DOWN);
        equal(grid.current()[0], grid.thead.find(".k-filter-row th:last")[0]);
    });

    test("multicolumn moves DOWN from header leaf cell to filter cell with frozen columns", function() {
        var grid = setup({
            columns: [
                { template: "", locked : true },
                { width: 300, columns: [{ width: 300, field: "foo" }] },
                { field: "bar" }
            ]
        });
        grid.current(grid.thead.find("tr:first th:last"));
        grid.thead.parent().press(keys.DOWN);
        equal(grid.current()[0], grid.thead.find(".k-filter-row th:last")[0]);
    });

    test("multicolumn moves DOWN from header leaf cell to filter cell with grouping", function() {
        var grid = setup({
            dataSource: {
                group: { field: "foo" }
            },
            columns: [
                { width: 300, columns: [{ width: 300, field: "foo" }] },
                { field: "bar" }
            ]
        });
        grid.current(grid.thead.find("tr:first th:last"));
        grid.thead.parent().press(keys.DOWN);
        equal(grid.current()[0], grid.thead.find(".k-filter-row th:last")[0]);
    });

})();
