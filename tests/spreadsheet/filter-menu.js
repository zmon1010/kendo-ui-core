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
})();
