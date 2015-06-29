(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var ACTIVE = "k-state-active";
    var SELECTED = "k-state-selected";

    module("selection", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    function createPane(row, column, rowCount, columnCount) {
        return new Pane(sheet, sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
    }

    function rangeRef(topLeftRow, topLeftCol, bottomRightRow, bottomRightCol) {
        var ref = new RangeRef(
            new CellRef(topLeftRow, topLeftCol),
            new CellRef(bottomRightRow, bottomRightCol)
        );

        return ref;
    }

    test("selects the range", function() {
        var pane = createPane(0, 0);

        sheet.range("A1:C2").select();

        var selections = pane.renderSelection(rangeRef(0,0, 100, 100)).children;
        var table = selections[0];

        equal(selections.length, 1);
        equal(table.attr.style.height, 2 * 10 + "px");
        equal(table.attr.style.width, 3 * 10 + "px");
        equal(table.attr.className, "k-spreadsheet-selection");
    });

    test("selects the union", function() {
        var pane = createPane(0, 0);

        sheet.range("A1:C2,C2:D3").select();

        var selections = pane.renderSelection(rangeRef(0,0, 100, 100)).children;

        equal(selections.length, 2);

        var tableA1C2 = selections[0];

        equal(tableA1C2.attr.style.height, 2 * 10 + "px");
        equal(tableA1C2.attr.style.width, 3 * 10 + "px");
        equal(tableA1C2.attr.className, "k-spreadsheet-selection");

        var tableC2D3 = selections[1];

        equal(tableC2D3.attr.style.height, 2 * 10 + "px");
        equal(tableC2D3.attr.style.width, 2 * 10 + "px");
        equal(tableC2D3.attr.className, "k-spreadsheet-selection");
    });

    test("selects the cell", function() {
        var pane = createPane(0, 0);

        sheet.range("B3:B3").select();

        var selections = pane.renderSelection(rangeRef(0,0, 100, 100)).children;

        equal(selections.length, 1);

        var table = selections[0];

        equal(table.attr.style.height, 1 * 10 + "px");
        equal(table.attr.style.width, 1 * 10 + "px");
        equal(table.attr.className, "k-spreadsheet-selection");
    });

    test("selects the union of range and cell", function() {
        var pane = createPane(0, 0);

        sheet.range("C2:D3,B5:B5").select();

        var selections = pane.renderSelection(rangeRef(0,0, 100, 100)).children;

        equal(selections.length, 2);

        var tableC2D3 = selections[0];

        equal(tableC2D3.attr.style.height, 2 * 10 + "px");
        equal(tableC2D3.attr.style.width, 2 * 10 + "px");
        equal(tableC2D3.attr.className, "k-spreadsheet-selection");

        var tableB5B5 = selections[1];

        equal(tableB5B5.attr.style.height, 1 * 10 + "px");
        equal(tableB5B5.attr.style.width, 1 * 10 + "px");
        equal(tableB5B5.attr.className, "k-spreadsheet-selection");
    });

    test("expands the selection ref around merged cell", function() {
        var pane = createPane(0, 0);

        sheet.range("B2:C3").merge().value("foo");
        var ref = sheet.select("A1:B2");

        equal(ref.topLeft.row, 0);
        equal(ref.topLeft.col, 0);
        equal(ref.bottomRight.row, 2);
        equal(ref.bottomRight.col, 2);
    });

    test("expands the selection around merged cell", function() {
        var pane = createPane(0, 0);

        sheet.range("B2:C3").merge().value("foo");
        sheet.range("A1:B2").select();

        var selections = pane.renderSelection(rangeRef(0,0, 100, 100)).children;

        equal(selections.length, 1);

        var tableA1C3 = selections[0];

        equal(tableA1C3.attr.style.height, 3 * 10 + "px");
        equal(tableA1C3.attr.style.width, 3 * 10 + "px");
        equal(tableA1C3.attr.className, "k-spreadsheet-selection");
    });

    test("selection sets the selected headers for range and cell", function() {
        sheet.range("A1:B2,D3").select();

        var selectedHeaders = sheet.selectedHeaders();

        equal(Object.keys(selectedHeaders.cols).length, 3);
        equal(selectedHeaders.cols[0], "active")
        equal(selectedHeaders.cols[1], "active")
        equal(selectedHeaders.cols[3], "active")

        equal(Object.keys(selectedHeaders.rows).length, 3);
        equal(selectedHeaders.rows[0], "active")
        equal(selectedHeaders.rows[1], "active")
        equal(selectedHeaders.rows[2], "active")
    });

    test("selection sets the selected headers for range and row", function() {
        sheet.range("A3:C7,10:10").select();

        var selectedHeaders = sheet.selectedHeaders();

        equal(Object.keys(selectedHeaders.cols).length, 3);
        equal(selectedHeaders.cols[0], "active")
        equal(selectedHeaders.cols[1], "active")
        equal(selectedHeaders.cols[2], "active")
        equal(selectedHeaders.allRows, false);

        equal(Object.keys(selectedHeaders.rows).length, 6);
        equal(selectedHeaders.rows[2], "active")
        equal(selectedHeaders.rows[3], "active")
        equal(selectedHeaders.rows[4], "active")
        equal(selectedHeaders.rows[5], "active")
        equal(selectedHeaders.rows[6], "active")

        equal(selectedHeaders.rows[9], "selected")
        equal(selectedHeaders.allCols, true);
    });

    test("visually selects the selected headers for range and cell", function() {
        var pane = createPane(0, 0, 100, 100);

        sheet.range("A1:B2,D3").select();

        var tables = pane.render(1000, 1000).children;

        var rowHeaderCells = tables[3].children[1].children;
        var colHeaderCells = tables[4].children[1].children[0].children;

        equal(rowHeaderCells[0].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[1].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[2].children[0].attr.className, ACTIVE);

        equal(colHeaderCells[0].attr.className, ACTIVE);
        equal(colHeaderCells[1].attr.className, ACTIVE);
        equal(colHeaderCells[3].attr.className, ACTIVE);
    });

    test("visually selects the selected headers for range and row", function() {
        var pane = createPane(0, 0, 100, 100);

        sheet.range("A3:C7,10:10").select();

        var tables = pane.render(1000, 1000).children;

        var rowHeaderCells = tables[3].children[1].children;
        var colHeaderCells = tables[4].children[1].children[0].children;

        equal(rowHeaderCells[2].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[3].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[4].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[5].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[6].children[0].attr.className, ACTIVE);

        equal(rowHeaderCells[9].children[0].attr.className, SELECTED);

        //row 10 is selected => all colHeaders should be active
        for (var i = 0; i < colHeaderCells.length; i++) {
            equal(colHeaderCells[i].attr.className, ACTIVE);
        }
    });

    test("visually selects the selected headers for row and range", function() {
        var pane = createPane(0, 0, 100, 100);

        sheet.range("4:4,A3:C7").select();

        var tables = pane.render(1000, 1000).children;

        var rowHeaderCells = tables[3].children[1].children;
        var colHeaderCells = tables[4].children[1].children[0].children;

        equal(rowHeaderCells[2].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[3].children[0].attr.className, SELECTED);
        equal(rowHeaderCells[4].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[5].children[0].attr.className, ACTIVE);
        equal(rowHeaderCells[6].children[0].attr.className, ACTIVE);

        //row 10 is selected => all colHeaders should be active
        for (var i = 0; i < colHeaderCells.length; i++) {
            equal(colHeaderCells[i].attr.className, ACTIVE);
        }
    });

    test("visually selects the selected headers for range and col", function() {
        var pane = createPane(0, 0, 100, 100);

        sheet.range("A3:C7,C:C").select();

        var tables = pane.render(1000, 1000).children;

        var rowHeaderCells = tables[3].children[1].children;
        var colHeaderCells = tables[4].children[1].children[0].children;

        //col C is selected => all rowHeaders should be active
        for (var i = 0; i < colHeaderCells.length; i++) {
            equal(rowHeaderCells[i].children[0].attr.className, ACTIVE);
        }

        equal(colHeaderCells[0].attr.className, ACTIVE);
        equal(colHeaderCells[1].attr.className, ACTIVE);
        equal(colHeaderCells[2].attr.className, SELECTED);
    });

})();
