(function() {
    var Grid = kendo.spreadsheet.Grid;
    var Address = kendo.spreadsheet.Address;
    var Area = kendo.spreadsheet.Area;

    module("Sheet Grid", {
        setup: function() {
        }
    });

    test("gets address index", function() {
        var grid = new Grid(1000, 1000);
        equal(grid.index(new Address(2, 2)), 2002);
    });

    test("gets address address from index", function() {
        var grid = new Grid(1000, 1000);
        var address = grid.address(2002);
        equal(address.row, 2);
        equal(address.column, 2);
    });

    test("iterates over each column with the corresponding segment", function() {
        var grid = new Grid(5, 4);

        var area = new Area(new Address(2, 1), new Address(2, 3));
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
