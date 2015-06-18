(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

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

        var selections = pane.renderSelection(rangeRef(0,0, 100, 100));
        var table = selections[0];

        equal(selections.length, 1);
        equal(table.attr.style.height, 2 * 10 + "px");
        equal(table.attr.style.width, 3 * 10 + "px");
        equal(table.attr.className, "k-spreadsheet-selection");
    });

})();
