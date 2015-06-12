(function() {
    var Grid = kendo.spreadsheet.Grid;
    var Axis = kendo.spreadsheet.Axis;
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;

    module("Sheet Grid", {
        setup: function() {
        }
    });

    test("gets address index", function() {
        var grid = new Grid(null, null, 1000, 800);
        equal(grid.index(2, 2), 1000 * 2 + 2);
    });

    test("gets ref from index", function() {
        var grid = new Grid(null, null, 1000, 1000);
        var ref = grid.cellRef(2002);

        equal(ref.row, 2);
        equal(ref.col, 2);
    });

    test("gets index from ref", function() {
        var grid = new Grid(null, null, 1000, 1000);
        equal(grid.cellRefIndex({row: 2, col: 2}), 2002)
    });

    test("iterates over each column with the corresponding segment", function() {
        var grid = new Grid(null, null, 4, 5);

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

    test("width returns the sum of column values within the specified range", function() {
        var grid = new Grid(null, new Axis(5, 10));

        equal(grid.width(1, 3), 3 * 10);
    });

    test("totalWidth returns the sum of column values", function() {
        var grid = new Grid(null, new Axis(5, 13), 0, 0, 0, 0);

        equal(grid.totalWidth(), 5 * 13);
    });

    test("height returns the sum of row values within the specified range", function() {
        var grid = new Grid(new Axis(5, 6));

        equal(grid.height(1, 3), 3 * 6);
    });

    test("totalHeight returns the sum of row values", function() {
        var grid = new Grid(new Axis(5, 6), null, 0, 0, 0, 0);

        equal(grid.totalHeight(), 5 * 6);
    });

    test("returns rectangle by range reference", function() {
        var grid = new Grid(new Axis(5, 6), new Axis(4, 3));

        var rectangle = grid.rectangle({
            topLeft: {
               row: 1,
               col: 2
            },
            bottomRight: {
               row: 3,
               col: 2
            }
        });

        equal(rectangle.top, 1 * 6);
        equal(rectangle.left, 2 * 3);
        equal(rectangle.bottom, 1 * 6 + 3 * 6);
        equal(rectangle.right, 2 * 3 + 1 * 3);
        equal(rectangle.width, 3);
        equal(rectangle.height, 18);
    });
})();
