(function() {
    var Grid = kendo.spreadsheet.Grid;
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;

    module("Sheet Grid", {
        setup: function() {
        }
    });

    test("gets address index", function() {
        var grid = new Grid(1000, 1000);
        equal(grid.index(2, 2), 2002);
    });

    test("gets ref from index", function() {
        var grid = new Grid(1000, 1000);
        var ref = grid.cellRef(2002);

        equal(ref.row, 2);
        equal(ref.col, 2);
    });

    test("iterates over each column with the corresponding segment", function() {
        var grid = new Grid(4, 5);

        var area = new RangeRef(new CellRef(1, 2), new CellRef(3, 2));
        var i = 0;

        var maxAddress = 14; // fourth column should be the last processed

        grid.forEachColumn(area, 15, function(start, end) {
            if (i == 0) {
                equal(start, 1)
                equal(end, 3);
            }
            if (i == 1) {
                equal(start, 5)
                equal(end, 7);
            }
            if (i == 2) {
                equal(start, 9)
                equal(end, 11);
            }
            if (i == 3) {
                equal(start, 13)
                equal(end, 15);
            }
            i++;
        });

        equal(i, 4);
    });
})();
