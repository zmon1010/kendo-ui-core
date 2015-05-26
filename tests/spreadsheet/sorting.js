(function() {
    var SparseRangeList = kendo.spreadsheet.SparseRangeList;
    var Grid = kendo.spreadsheet.Grid;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var Sorter = kendo.spreadsheet.Sorter;

    var grid, area, sorter, values;
    module("rangelist sorter", {
        setup: function() {
            grid = new Grid(null, null, 4, 2);
            area = new RangeRef(new CellRef(0, 0), new CellRef(2, 0));

            values = new SparseRangeList(0, 100, 0);
            values.value(0, 0, 2);
            values.value(1, 1, 1);
            values.value(2, 2, 3);
            values.value(4, 4, 8);
            values.value(5, 5, 9);
            values.value(6, 6, 10);

            colors = new SparseRangeList(0, 100, "default");
            colors.value(0, 0, "red");
            colors.value(2, 2, "blue");

            sorter = new Sorter(grid, [ values, colors ]);
        }
    });

    test("gets sorted indices", function() {
        var indices = sorter.indices(area, values).map(function(item) { return item.index; });

        equal(indices.length, 3);
        equal(indices[0], 1);
        equal(indices[1], 0);
        equal(indices[2], 2);
    })

    test("sorts based on a given column", function() {
        sorter.sortBy(area, values);

        equal(values.value(0), 1);
        equal(values.value(1), 2);
        equal(values.value(2), 3);

        equal(values.value(4), 9);
        equal(values.value(5), 8);
        equal(values.value(6), 10);

        equal(colors.value(0), "default");
        equal(colors.value(1), "red");
        equal(colors.value(2), "blue");
    })
})();
