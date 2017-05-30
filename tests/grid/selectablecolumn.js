(function() {
   var Grid = kendo.ui.Grid,
        DataSource = kendo.data.DataSource,
        SELECTED = "k-state-selected",
        CHECKBOX = "input.k-checkbox",
        SELECTROW = "Select row",
        DESELECTROW = "Deselect row",
        SELECTROWS = "Select all rows",
        DESELECTROWS = "Deselect all rows",
        div,
        grid;

    module("Grid checkbox column selection", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
            var options = {
                columns: [ { selectable: true }, "foo", "bar" ],
                dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}]
            };
            grid = new Grid(div, options);
        },
        teardown: function() {
            grid.destroy();
            div.remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Clicking on the checkbox selects the row", function() {
        var firstItem = grid.items().first();
        var checkbox = firstItem.find(CHECKBOX)
        checkbox.click();
        equal(firstItem.hasClass(SELECTED), true);
        equal(checkbox.attr("aria-label"), DESELECTROW);
    });

    test("Checking all the checkboxes checks the header checkbox", function() {
        grid.items().each(function(){
            $(this).find(CHECKBOX).click();
        });
        var headerCheckbox = grid.thead.find(CHECKBOX);
        equal(headerCheckbox.attr("aria-label"), DESELECTROWS);
        equal(headerCheckbox.prop("checked"), true);
    });

    test("Unckecking a checkbox unchecks the header checkbox", function() {
        grid.items().each(function () {
            $(this).find(CHECKBOX).click();
        });
        grid.items().first().find(CHECKBOX).click();
        var headerCheckbox = grid.thead.find(CHECKBOX);
        equal(headerCheckbox.prop("checked"), false);
        equal(headerCheckbox.attr("aria-label"), SELECTROWS);
    });

    test("Checking the header checkbox selects all items", function() {
        var areItemsSelected = true;
        grid.thead.find(CHECKBOX).click();

        grid.items().each(function () {
            var item = $(this);
            var checkbox = item.find(CHECKBOX);
            if(!item.hasClass(SELECTED) || !checkbox.prop("checked") || checkbox.attr("aria-label") !== DESELECTROW) {
                areItemsSelected = false;
            }
        });
        equal(areItemsSelected, true);
        equal(grid.select().length, grid.items().length);
    });

    test("clearSelection works correctly with checkbox column", function() {
        var areItemsDeselected = true;
        var headerCheckbox = grid.thead.find(CHECKBOX);
        headerCheckbox.click();
        grid.clearSelection();
        grid.items().each(function () {
            var item = $(this);
            var checkbox = item.find(CHECKBOX);
            if(item.hasClass(SELECTED) || item.find(CHECKBOX).prop("checked") || checkbox.attr("aria-label") !== SELECTROW) {
                areItemsDeselected = false;
            }
        });

        equal(areItemsDeselected, true);
        equal(headerCheckbox.prop("checked"), false);
        equal(headerCheckbox.attr("aria-label"), SELECTROWS);
    });

    test("Unchecking the header checkbox unchecks all items", function() {
        var areItemsDeselected = true;
        grid.thead.find(CHECKBOX).click();
        grid.thead.find(CHECKBOX).click();

        grid.items().each(function () {
            var item = $(this);
            var checkbox = item.find(CHECKBOX);
            if(item.hasClass(SELECTED) || item.find(CHECKBOX).prop("checked") || checkbox.attr("aria-label") !== SELECTROW) {
                areItemsDeselected = false;
            }
        });
        equal(areItemsDeselected, true);
        equal(grid.select().length, 0);
    });

    test("Unchecking a single item unckecks the header", function() {
        grid.thead.find(CHECKBOX).click();
        grid.items().first().find(CHECKBOX).click();

        equal(grid.thead.find(CHECKBOX).prop("checked"), false);
    });

    module("Grid checkbox column with frozen columns", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            grid.destroy();
            div.remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Selecting an item selects in both tables(locked and not locked)", function() {
        grid = new Grid(div, {
                columns: [ { selectable: true, locked:true, width:50 }, { field:"foo", width:50 }, { field:"bar", width:50 } ],
                dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}]
            });
        grid.items().first().find(CHECKBOX).click();
        equal(grid.select().length, 2);
    });

    test("Selecting all items correctly checks header checkbox in locked table", function() {
        grid = new Grid(div, {
                columns: [ { selectable: true, locked:true, width:50 }, { field:"foo", width:50 }, { field:"bar", width:50 } ],
                dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}]
            });
        grid.items().find(CHECKBOX).click();
        equal(grid.lockedHeader.find(CHECKBOX).prop("checked"), true);
    });

    test("Selecting all items correctly checks header checkbox in non-locked table", function() {
        grid = new Grid(div, {
                columns: [ { selectable: true, width:50 }, { field:"foo", locked:true, width:50 }, { field:"bar", locked:true, width:50 } ],
                dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}]
        });
        grid.items().find(CHECKBOX).click();
        equal(grid.thead.find(CHECKBOX).prop("checked"), true);
    });

    module("Grid checkbox column in hierarchy", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
            var options = {
                columns: [ { selectable: true }, "foo", "bar" ],
                dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}],
                dataBound: function() {
                            this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                detailInit: function (e) {
                    $("<div/>").appendTo(e.detailCell).kendoGrid({
                         columns: [ { selectable: true }, "foo", "bar" ],
                         dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}]
                    });
                }
            };
            grid = new Grid(div, options);
        },
        teardown: function() {
            grid.destroy();
            div.remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Checking the master header checkbox only selects the rows in the master level", function() {
        grid.thead.find(CHECKBOX).click();
        equal(grid.select().length, grid.items().length);
        equal(grid.tbody.find(".k-detail-row").find(".k-state-selected").length, 0);
    });

    test("Checking the child header checkbox only selects the rows in the child level", function() {
        var detailRow = grid.tbody.find(".k-detail-row");
        var detailGrid = detailRow.find(".k-grid").getKendoGrid();
        detailRow.find(".k-grid-header " + CHECKBOX).click();
        equal(detailGrid.select().length, detailGrid.items().length);
        equal(grid.select().length, 0);
    });

    test("Unchecking an item in leven N unchecks the header in level N", function() {
        var masterHeaderCheckBox = grid.thead.find(CHECKBOX);
        var detailRow = grid.tbody.find(".k-detail-row");
        var detailGrid = detailRow.find(".k-grid").getKendoGrid();
        var detailHeaderCheckBox =  detailRow.find(".k-grid-header " + CHECKBOX);
        masterHeaderCheckBox.click();
        grid.items().first().find(CHECKBOX).click();
        equal(masterHeaderCheckBox.prop("checked"), false);
        detailHeaderCheckBox.click();
        detailGrid.items().first().find(CHECKBOX).click();
        equal(detailHeaderCheckBox.prop("checked"), false);
    });

    test("Checking all items in leven N checks the header in level N", function() {
        var masterHeaderCheckBox = grid.thead.find(CHECKBOX);
        var detailRow = grid.tbody.find(".k-detail-row");
        var detailGrid = detailRow.find(".k-grid").getKendoGrid();
        var detailHeaderCheckBox =  detailRow.find(".k-grid-header " + CHECKBOX);

        grid.items().each(function() {
            $(this).find(CHECKBOX).click();
        });

        equal(masterHeaderCheckBox.prop("checked"), true);
        equal(detailHeaderCheckBox.prop("checked"), false);
        equal(detailGrid.select().length, 0);
        masterHeaderCheckBox.click();

        detailGrid.items().each(function() {
            $(this).find(CHECKBOX).click();
        });

        equal(masterHeaderCheckBox.prop("checked"), false);
        equal(detailHeaderCheckBox.prop("checked"), true);
        equal(grid.select().length, 0);
    });

    module("Grid checkbox column works with multi-column headers", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
            var options = {
                columns: [  "foo", { title: "Multi-column", columns:["bar", { selectable: true } ] }],
                dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}]
            };
            grid = new Grid(div, options);
        },
        teardown: function() {
            grid.destroy();
            div.remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Checking the header checkbox selects the rows", function() {
        grid.thead.find(CHECKBOX).click();
        equal(grid.select().length, grid.items().length);
    });

    test("Checking a checkbox selects a row", function() {
        grid.tbody.find(CHECKBOX).first().click();
        equal(grid.select().length, 1);
    });

    module("Grid checkbox column works with persistSelection", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture);
            var options = {
                persistSelection: true,
                pageable: { pageSize :2 },
                columns: [  "foo", "bar", { selectable: true } ],
                dataSource: {
                    data:[{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}, {foo: 4, bar:4}],
                    schema: {
                        model: {
                            id: "bar"
                        }
                    }
                }
            };
            grid = new Grid(div, options);
        },
        teardown: function() {
            grid.destroy();
            div.remove();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Header checkbox is cleared when paging", function() {
        var headerCheckbox = grid.thead.find(CHECKBOX);
        headerCheckbox.click();
        grid.dataSource.page(2);
        equal(headerCheckbox.prop("checked"), false);
        equal(headerCheckbox.attr("aria-label"), SELECTROWS);
    });

    test("Selected rows are correctly persisted", function() {
        var headerCheckbox = grid.thead.find(CHECKBOX);
        headerCheckbox.click();
        grid.dataSource.page(2);
        grid.dataSource.page(1);
        equal(headerCheckbox.prop("checked"), true);
        equal(headerCheckbox.attr("aria-label"), DESELECTROWS);
        equal(grid.select().length, grid.items().length);
    });
})();
