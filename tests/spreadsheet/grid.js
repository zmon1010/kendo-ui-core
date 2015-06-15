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

    var grid, paneGrid;
    module("Sheet Pane Grid", {
        setup: function() {
            grid = new Grid(new Axis(100, 30), new Axis(200, 10), 100, 200, 16, 24);
        }
    });

    function testPaneDimension(name, config, results) {
        test(name, function() {
            paneGrid = grid.pane(config);
            paneGrid.refresh(1200, 800);

            results = results.split(" ");

            equal(paneGrid.style.top, results[0] + "px");
            equal(paneGrid.style.left, results[1] + "px");
            equal(paneGrid.style.width, results[2] + "px");
            equal(paneGrid.style.height, results[3] + "px");
        });
    }

    testPaneDimension(
        "calculates the correct style for the wrapper, single pane",
        { row: 0, column: 0 },
        "0 0 1200 800"
    );

    testPaneDimension(
        "calculates the correct style for the wrapper, left pane",
        { row: 0, column: 0, columnCount: 5 },
        "0 0 74 800"
    );


    testPaneDimension("calculates the correct style for the wrapper, right pane",
        { row: 0, column: 5 },
        "0 74 1126 800"
    );

    testPaneDimension("calculates the correct style for the wrapper, top pane",
        { row: 0, column: 0, rowCount: 5 },
        "0 0 1200 166"
    );

    testPaneDimension("calculates the correct style for the wrapper, bottom pane",
        { row: 5, column: 0 },
        "166 0 1200 634"
    );

    testPaneDimension("calculates the correct style for the wrapper, fixed pane",
        { row: 0, column: 0, rowCount: 5, columnCount: 5 },
        "0 0 74 166"
    );

    testPaneDimension("calculates the correct style for the wrapper, topright pane",
        { row: 0, column: 5, rowCount: 5 },
        "0 74 1126 166"
    );

    testPaneDimension("calculates the correct style for the wrapper, bottomleft pane",
        { row: 5, column: 0, columnCount: 5 },
        "166 0 74 634"
    );

    testPaneDimension("calculates the correct style for the wrapper, bottomright pane",
        { row: 5, column: 5 },
        "166 74 1126 634"
    );

    module("Sheet Pane Grid View", {
        setup: function() {
            grid = new Grid(new Axis(50, 10), new Axis(50, 10), 50, 50, 15, 15);
        }
    });

    function testPaneView(name, config, scrollLeft, scrollTop, topLeftRow, topLeftCol, bottomRightRow, bottomRightCol, rowOffset, columnOffset) {
        test(name, function() {
            paneGrid = grid.pane(config);
            paneGrid.refresh(200, 200);

            var view = paneGrid.view(scrollLeft, scrollTop);
            var ref = view.ref;

            equal(ref.topLeft.row, topLeftRow);
            equal(ref.topLeft.col, topLeftCol);
            equal(ref.bottomRight.row, bottomRightRow);
            equal(ref.bottomRight.col, bottomRightCol);
            equal(view.rowOffset, rowOffset);
            equal(view.columnOffset, columnOffset);
        });
    }

    testPaneView("s pane gives initial frame", { row: 0, column: 0 }, 0, 0,
        0,
        0,
        18,
        18,
        15,
        15
    );

    testPaneView("s pane gives final frame", { row: 0, column: 0 }, (50 * 10 + 15 - 200), (50 * 10 + 15 - 200),
        31,
        31,
        49,
        49,
        10,
        10
    );


    testPaneView("tl pane remains fixed", { row: 0, column: 0, rowCount: 5, columnCount: 5 }, 0, 0,
        0,
        0,
        5,
        5,
        15,
        15
    );

    testPaneView("tl pane remains fixed (scrolled)", { row: 0, column: 0, rowCount: 5, columnCount: 5 }, 100, 100,
        0,
        0,
        5,
        5,
        15,
        15
    );

    testPaneView("br pane calculates the offset", { row: 5, column: 5 }, 0, 0,
        5,
        5,
        18,
        18,
        0,
        0
    );
    testPaneView("br pane calculates the offset", { row: 5, column: 5 }, (50 * 10 + 15 - 200), (50 * 10 + 15 - 200),
        36,
        36,
        49,
        49,
        -5,
        -5
    );

    /*
    test("returns correct view range ref", function() {
        paneGrid = grid.pane({ row: 0, column: 0 });
        paneGrid.refresh(1200, 800);

        var view = paneGrid.view(0, 0);

        equal(view.ref.topLeft.row, 0);
        equal(view.ref.topLeft.col, 0);

        equal(view.ref.bottomRight.row, 26);
        equal(view.ref.bottomRight.col, 120);
    });
    */
})();
