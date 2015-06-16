(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    module("merged cells", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    function createPane(row, column, rowCount, columnCount) {
        return new Pane(sheet, sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
    }

    function rangeRef(topLeftRow, topLeftCol, bottomRightRow, bottomRightCol) {
        return new RangeRef(
            new CellRef(topLeftRow, topLeftCol),
            new CellRef(bottomRightRow, bottomRightCol)
        );
    }

    test("pane renders merged cell", function() {
        var pane = createPane(0, 0);

        sheet.range(0, 0, 2, 3).merge().value("foo");

        var mergedCells = pane.renderMergedCells(rangeRef(0,0, 100, 100), 0, 0);
        var table = mergedCells[0];

        equal(mergedCells.length, 1);
        equal(table.attr.style.height, 2 * 10 + "px");
        equal(table.attr.style.width, 3 * 10 + "px");
        equal(table.attr.className, "k-spreadsheet-merged-cell");
        var cell = table.children[1].children[0].children[0];
        equal(cell.children[0].nodeValue, "foo")
    });

    test("pane renders multiple merged cell", function() {
        var pane = createPane(0, 0);

        sheet.range(0, 0, 2, 2).merge();
        sheet.range(2, 2, 2, 2).merge();

        var mergedCells = pane.renderMergedCells(rangeRef(0,0, 100, 100), 0, 0);

        equal(mergedCells.length, 2);
    });

    test("pane does not render merged cells which are invisible", function() {
        var pane = createPane(0, 0);

        sheet.range(0, 0, 2, 2).merge();

        var mergedCells = pane.renderMergedCells(rangeRef(0, 3, 100, 100), 0, 0);

        equal(mergedCells.length, 0);
    });

})();
