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

    test("ranges that overlap bottom right are combined", function() {
        sheet.range("A1:B3").merge();
        sheet.range("B2:C4").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].print(0), "A1:C4");
    });

    test("ranges that overlap top left are combined", function() {
        sheet.range("B2:C4").merge();
        sheet.range("A1:B3").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:C4");
    });

    test("ranges that overlap top right are combined", function() {
        sheet.range("A4:C8").merge();
        sheet.range("C1:D4").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:D8");
    });

    test("ranges that overlap bottom left are combined", function() {
        sheet.range("C1:D4").merge();
        sheet.range("A4:C8").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:D8");
    });

    test("combining multiple overlapping ranges", function() {
        sheet.range("A1:B1").merge();
        sheet.range("D1:E1").merge();
        sheet.range("B1:D1").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:E1");
    });

    test("combining overlapping ranges leaves non overlapping ranges", function() {
        sheet.range("A1:B1").merge();
        sheet.range("E1:F1").merge();
        sheet.range("B1:D1").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 2);
        equal(merged[0].toString(), "E1:F1");
        equal(merged[1].toString(), "A1:D1");
    });
})();
