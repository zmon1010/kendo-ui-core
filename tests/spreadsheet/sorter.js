(function() {
    var SparseRangeList = kendo.spreadsheet.SparseRangeList;
    var Grid = kendo.spreadsheet.Grid;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var Sorter = kendo.spreadsheet.Sorter;
    var CalcError = kendo.spreadsheet.calc.runtime.CalcError;

    var grid, area, sorter, values, colors;

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
    });

    test("sorts based on a given column", function() {
        sorter.sortBy(area, 0, values);

        equal(values.value(0), 1);
        equal(values.value(1), 2);
        equal(values.value(2), 3);

        equal(colors.value(0), "default");
        equal(colors.value(1), "red");
        equal(colors.value(2), "blue");
    });

    test("sorts in descending order", function() {
        sorter.sortBy(area, 0, values, false);

        equal(values.value(0), 3);
        equal(values.value(1), 2);
        equal(values.value(2), 1);

    });

    test("empty values remain at the end after sorting", function() {
        values = new SparseRangeList(0, 100, 0);
        values.value(0, 0, 3);
        values.value(1, 1, null);
        values.value(2, 2, 2);
        sorter = new Sorter(grid, [ values ]);

        sorter.sortBy(area, 0, values, true);

        equal(values.value(0), 2);
        equal(values.value(1), 3);
        equal(values.value(2), null);
    });

    test("empty values remain at the end after descending sorting", function() {
        values = new SparseRangeList(0, 100, 0);
        values.value(0, 0, 2);
        values.value(1, 1, null);
        values.value(2, 2, 3);
        sorter = new Sorter(grid, [ values ]);

        sorter.sortBy(area, 0, values, false);

        equal(values.value(0), 3);
        equal(values.value(1), 2);
        equal(values.value(2), null);
    });

    test("alphanumeric sorting", function() {
        // https://support.microsoft.com/en-us/kb/322067
        values = new SparseRangeList(0, 100, 0);
        values.value(0, 0, "a1");
        values.value(1, 1, "a2");
        values.value(2, 2, "a3");
        values.value(3, 3, 1);
        values.value(4, 4, "1a");
        values.value(5, 5, 2);
        values.value(6, 6, "2a");
        values.value(7, 7, 3);
        values.value(8, 8, "3a");

        grid = new Grid(null, null, 100, 2);
        sorter = new Sorter(grid, [ values ]);

        area = new RangeRef(new CellRef(0, 0), new CellRef(8, 0));
        sorter.sortBy(area, 0, values, true);
        equal(values.value(0), 1);
        equal(values.value(1), 2);
        equal(values.value(2), 3);
        equal(values.value(3), "1a");
        equal(values.value(4), "2a");
        equal(values.value(5), "3a");
        equal(values.value(6), "a1");
        equal(values.value(7), "a2");
        equal(values.value(8), "a3");
    });

    test("sorting affects only the target column", function() {
        values.value(0, 0, 2);
        values.value(1, 1, 1);

        values.value(4, 4, 2);
        values.value(5, 5, 1);

        area = new RangeRef(new CellRef(0, 0), new CellRef(3, 0));
        sorter.sortBy(area, 0, values, true);

        equal(values.value(4), 2);
        equal(values.value(5), 1);
    });

    test("sorting is stable", function() {
        values = new SparseRangeList(0, 100, 0);
        values.value(5, 5, 1);

        grid = new Grid(null, null, 11, 2);
        sorter = new Sorter(grid, [ values ]);

        area = new RangeRef(new CellRef(0, 0), new CellRef(11, 0));

        var indices = sorter.indices(area, values, true);

        equal(indices[0].index, 0);
        equal(indices[indices.length - 1].index, 5);
    });

    test("numbers are before strings", function() {
        equal(Sorter.ascendingComparer(2, "1"), -1);
    });

    test("numbers are before null", function() {
        equal(Sorter.ascendingComparer(2, null), -1);
    });

    test("numbers are before booleans", function() {
        equal(Sorter.ascendingComparer(2, true), -1);
        equal(Sorter.ascendingComparer(2, false), -1);
    });

    test("numbers are before errors", function() {
        equal(Sorter.ascendingComparer(2, new CalcError("NAME")), -1);
    });

    test("strings are after numbers", function() {
        equal(Sorter.ascendingComparer("2", 1), 1);
    });

    test("strings are before booleans", function() {
        equal(Sorter.ascendingComparer("2", true), -1);
        equal(Sorter.ascendingComparer("2", false), -1);
    });

    test("strings are before null", function() {
        equal(Sorter.ascendingComparer("2", null), -1);
    });

    test("strings are before errors", function() {
        equal(Sorter.ascendingComparer("2", new CalcError("NAME")), -1);
    });

    test("booleans are after numbers", function() {
        equal(Sorter.ascendingComparer(true, 2), 1);
        equal(Sorter.ascendingComparer(false, 2), 1);
    });

    test("booleans are after strings", function() {
        equal(Sorter.ascendingComparer(true, "2"), 1);
        equal(Sorter.ascendingComparer(false, "2"), 1);
    });

    test("booleans are after strings", function() {
        equal(Sorter.ascendingComparer(true, "2"), 1);
        equal(Sorter.ascendingComparer(false, "2"), 1);
    });

    test("booleans are before null", function() {
        equal(Sorter.ascendingComparer(true, null), -1);
    });

    test("false is before true", function() {
        equal(Sorter.ascendingComparer(false, true), -1);
    });

    test("true is after false", function() {
        equal(Sorter.ascendingComparer(true, false), 1);
    });

    test("booleans are after errors", function() {
        equal(Sorter.ascendingComparer(true, new CalcError("NAME")), -1);
    });

    test("null is after numbers", function() {
        equal(Sorter.ascendingComparer(null, 2), 1);
    });

    test("null is after strings", function() {
        equal(Sorter.ascendingComparer(null, "2"), 1);
    });

    test("null is after booleans", function() {
        equal(Sorter.ascendingComparer(null, true), 1);
        equal(Sorter.ascendingComparer(null, false), 1);
    });

    test("nulls are equal", function() {
        equal(Sorter.ascendingComparer(null, null), 0);
        equal(Sorter.descendingComparer(null, null), 0);
    });

    test("null is after errors", function() {
        equal(Sorter.ascendingComparer(null, new CalcError("NAME")), 1);
    });

    test("errors are after numbers", function() {
        equal(Sorter.ascendingComparer(new CalcError("NAME"), 2), 1);
    });

    test("errors are after strings", function() {
        equal(Sorter.ascendingComparer(new CalcError("NAME"), "2"), 1);
    });

    test("errors are after booleans", function() {
        equal(Sorter.ascendingComparer(new CalcError("NAME"), true), 1);
    });

    test("errors are before null", function() {
        equal(Sorter.ascendingComparer(new CalcError("NAME"), null), -1);
    });

    test("errors are equal", function() {
        equal(Sorter.ascendingComparer(new CalcError("NAME"), new CalcError("DIV/0")), 0);
    });

})();
