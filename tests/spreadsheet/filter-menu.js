(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    module("filter header rendering", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    var DUMMY_VIEW = { ref: rangeRef(0,0, 100, 100), top: 0, left: 0 };

    function createPane(row, column, rowCount, columnCount) {
        return new Pane(sheet, sheet._grid.pane({
            row: row,
            column: column,
            rowCount: rowCount,
            columnCount: columnCount
        }));
    }

    function rangeRef(topLeftRow, topLeftCol, bottomRightRow, bottomRightCol) {
        var ref = new RangeRef(
            new CellRef(topLeftRow, topLeftCol),
            new CellRef(bottomRightRow, bottomRightCol)
        );

        return ref;
    }

    test("renders in top filtered cell", function() {
        var pane = createPane(0, 0);

        sheet.range("A1:A5").filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter({
                values: [3]
            })
        });

        pane._currentView = DUMMY_VIEW;

        var filterHeaders = pane.renderFilterHeaders().children;

        equal(filterHeaders.length, 1);
    });

    test("renders icons for each column", function() {
        var pane = createPane(0, 0);

        sheet.range("A5:C5").filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter({
                values: [3]
            })
        });

        pane._currentView = DUMMY_VIEW;

        var filterHeaders = pane.renderFilterHeaders().children;

        equal(filterHeaders.length, 3);
    });

    test("does not render filter buttons if no filter is set", function() {
        var pane = createPane(0, 0);

        pane._currentView = DUMMY_VIEW;

        var filterHeaders = pane.renderFilterHeaders().children;

        equal(filterHeaders.length, 0);
    });

    /*

    test("adds k-state-active to headers with applied filtering", function() {
        var pane = createPane(0, 0);

        var valueFilter = new kendo.spreadsheet.ValueFilter({ values: [3] });

        sheet.range("A1:B5").filter([
            { column: 0, filter: valueFilter },
            { column: 1, filter: valueFilter }
        ]);

        pane._currentView = DUMMY_VIEW;

        var filterHeaders = pane.renderFilterHeaders().children;

        ok(filterHeaders[0].attr.className.indexOf("k-state-active") >= 0);
        ok(filterHeaders[1].attr.className.indexOf("k-state-active") >= 0);
    });

    */

    module("filter menu creation", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { rows: 3, columns: 3 });

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("initialises filterMenu for each column of the filter range", function() {
        sheet.range("A1:B2").filter(true);

        equal(spreadsheet._view.filterMenus.length, 2);
    });

    test("destroys filterMenus after filtration is disabled", function() {
        sheet.range("A1:B2").filter(true);
        sheet.range("A1:B2").filter(false);

        equal(spreadsheet._view.filterMenus.length, 0);
    });

    test("destroys previous filterMenus after filter range is changed", function() {
        sheet.range("A1:B2").filter(true);
        sheet.range("A1:C2").filter(true);

        equal(spreadsheet._view.filterMenus.length, 3);
    });

    test("spreadsheet filter headers has data-index attribute", 2, function() {
        sheet.range("A1:B2").filter(true);
        $(".k-link.k-spreadsheet-filter").each(function(index, element) {
            equal($(element).data("index"), index);
        });
    });

    test("click on filter header opens the corresponding filter menu", function() {
        sheet.range("A1:B2").filter(true);
        $(".k-link.k-spreadsheet-filter").eq(1).trigger("click");

        ok(!spreadsheet._view.filterMenus[0].popup.visible());
        ok(spreadsheet._view.filterMenus[1].popup.visible());
    });

    test("click on filter header opens the corresponding filter menu with correct anchor", function() {
        sheet.range("A1:B2").filter(true);
        $(".k-link.k-spreadsheet-filter").eq(1).trigger("click");

        equal(spreadsheet._view.filterMenus[1].popup.options.anchor.data("index"), 1);
    });

    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var range;
    var sheet;
    var filterMenu;

    function createWithValues(values) {
        range = sheet.range("A1:A3").values(values);
        return new kendo.spreadsheet.FilterMenu({ range: range });
    }

    module("filter menu: filter by value", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("creates TreeView", function() {
        filterMenu = createWithValues([ ["A1"], ["A2"], ["A3"] ]);
        ok(filterMenu.valuesTreeView instanceof kendo.ui.TreeView);
    });

    test("loads range values in TreeView", function() {
        filterMenu = createWithValues([ ["A1"], ["A2"], ["A3"] ]);
        var data = filterMenu.valuesTreeView.dataSource.data();

        equal(data.length, 1, "has only one 'all' rote node");

        var root = data[0];
        var children = root.children.data();

        equal(children.length, 3, "values are listed under the root node");

        equal(children[0].text, "A1");
        equal(children[1].text, "A2");
        equal(children[2].text, "A3");
    });

    test("gets only distinct values", function() {
        filterMenu = createWithValues([ ["A1"], ["A2"], ["A1"] ]);

        var values = filterMenu.getValues()[0].items;

        equal(values.length, 2, "distinct values are loaded");

        equal(values[0].text, "A1");
        equal(values[1].text, "A2");
    });

    test("gets empty values", function() {
        filterMenu = createWithValues([ ["A1"], ["A1"] ]);

        var values = filterMenu.getValues()[0].items;

        equal(values[0].text, "(Blanks)");
        equal(values[1].text, "A1");
    });

    test("recognizes number dataType", function() {
        sheet.range("A1").value(123);

        filterMenu = new kendo.spreadsheet.FilterMenu({ range: sheet.range("A1") });

        var values = filterMenu.getValues()[0].items;

        equal(values[0].dataType, "number");
    });

    test("recognizes date dataType", function() {
        sheet.range("A1").value(new Date(2015,1,1)).format("dd/mm/yyyy");

        filterMenu = new kendo.spreadsheet.FilterMenu({ range: sheet.range("A1") });

        var values = filterMenu.getValues()[0].items;

        equal(values[0].dataType, "date");
    });

    test("recognizes string dataType", function() {
        sheet.range("A1").value("A1");

        filterMenu = new kendo.spreadsheet.FilterMenu({ range: sheet.range("A1") });

        var values = filterMenu.getValues()[0].items;

        equal(values[0].dataType, "string");
    });

    test("recognizes blank dataType", function() {
        filterMenu = new kendo.spreadsheet.FilterMenu({ range: sheet.range("A1") });

        var values = filterMenu.getValues()[0].items;

        equal(values[0].dataType, "blank");
    });

    test("sorts the values according their dataType (blank, number, date, string)", function() {
        sheet.range("A1").value(new Date(2015,1,1)).format("dd/mm/yyyy");
        sheet.range("A2").value(123);
        sheet.range("A3");

        filterMenu = new kendo.spreadsheet.FilterMenu({ range: sheet.range("A1:A3") });

        var values = filterMenu.getValues()[0].items;

        equal(values[0].dataType, "blank");
        equal(values[1].dataType, "number");
        equal(values[2].dataType, "date");
    });

})();
