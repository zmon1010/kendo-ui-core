(function() {
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;

    var element;
    var sheet;
    var spreadsheet;
    var view;

    module("spreadsheet view paneAt", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();

            view = spreadsheet._view;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("paneAt clicking at the top gets the first pane", function() {
        sheet.frozenRows(3);
        sheet.frozenColumns(3);

        var pane = view.paneAt(10, 10);
        equal(pane._grid.top, 0);
        equal(pane._grid.left, 0);
    });

    test("top corner mousedown returns the topcorner object", function() {
        equal(view.objectAt(3, 3).type, "topcorner");
    });

    test("left side returns row header", function() {
        view.refresh(kendo.spreadsheet.ALL_REASONS);
        var result = view.objectAt(3, 50);
        equal(result.type, "rowheader");
        equal(result.ref.row, 1); // second row, minus the header size
    });

    test("bottom border of row header column returns rowresizehandle", function() {
        view.refresh(kendo.spreadsheet.ALL_REASONS);
        var result = view.objectAt(3, 20 + 20 + 20); // columnheader + two rows
        equal(result.type, "rowresizehandle");
        equal(result.ref.row, 1);
    });

    test("top side returns column header", function() {
        view.refresh(kendo.spreadsheet.ALL_REASONS);
        var result = view.objectAt(32+64+32, 3);// rowheader + first column + half of 2nd
        equal(result.type, "columnheader");
        equal(result.ref.col, 1); // second column
    });

    test("right border of the header column returns columnresizehandle", function() {
        view.refresh(kendo.spreadsheet.ALL_REASONS);
        var result = view.objectAt(32+64+64, 3);// rowheader + two columns
        equal(result.type, "columnresizehandle");
        equal(result.ref.col, 1); // second column
    });

    test("right border of the header column returns columnresizehandle after column resize", function() {
        view.refresh(kendo.spreadsheet.ALL_REASONS);

        view._sheet.columnWidth(1, 200);

        var result = view.objectAt(32+64+200, 3);// rowheader + two columns
        equal(result.type, "columnresizehandle");
        equal(result.ref.col, 1); // second column
    });

    test("containingPane returns first pane based on the containing cell", function() {
        sheet.frozenRows(3);
        sheet.frozenColumns(3);

        var cell = new CellRef(0 , 0);
        var ref = new RangeRef(cell, cell);

        var pane = view.containingPane(ref);

        equal(pane._grid.top, 0);
        equal(pane._grid.left, 0);
    });

    test("containingPane returns fourth pane based on the containing cell", function() {
        var rows = 3;
        var columns = 3;

        sheet.frozenRows(rows);
        sheet.frozenColumns(columns);

        var cell = new CellRef(4 , 4);
        var ref = new RangeRef(cell, cell);

        var pane = view.containingPane(ref);
        var grid = pane._grid;

        ok(grid.rows.contains(rows, rows));
        ok(grid.columns.contains(columns, columns));
    });

    test("filter icon returns filtericon", function() {
        sheet.range("A1").filter(true);

        var result = view.objectAt(32+64-10, 16+10);// rowheader + right of column
        equal(result.type, "filtericon");
    });

    test("cell with no filter returns cell", function() {
        sheet.range("A1").filter(false);

        var result = view.objectAt(32+64-10, 16+10);// rowheader + right of column
        equal(result.type, "cell");
    });

    test("filter icon in frozen pane", function() {
        sheet.frozenRows(1);
        sheet.frozenColumns(1);

        sheet.range("B2").filter(true);

        var result = view.objectAt(32+64*2-10, 16+20+10);// headers + one row/col
        equal(result.type, "filtericon");
    });

    test("filter icon in frozen pane", function() {
        sheet.range("A1:A3").select();

        // 5 by 5 size

        var Y = 20 + 20 * 3 - 5;
        var X = 32 + 64  - 5;

        var result = view.objectAt(X, Y);// headers + one row/col
        equal(result.type, "autofill");
    });
})();
