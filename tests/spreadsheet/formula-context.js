(function() {
    var context, sheet;
    var spreadsheet = kendo.spreadsheet;
    var CellRef = spreadsheet.CellRef;
    var RangeRef = spreadsheet.RangeRef;
    var Workbook = spreadsheet.Workbook;
    var FormulaContext = spreadsheet.FormulaContext;

    module("Formula Context", {
        setup: function() {
            var workbook = new Workbook({
                rows: 10,
                columns: 10,
                rowHeight: 20,
                columnWidth: 50,
                headerHeight: 30,
                headerWidth: 30
            });

            sheet = workbook.activeSheet();
            sheet._name("Sheet1");
            sheet.range(0, 0).value(1000);
            sheet.range(0, 1).value(2000);
            sheet.range(1, 1).value(3000);

            context = new FormulaContext(workbook);
        }
    });

    test("gets the correct cell state as a reference", function() {
        var ref = new CellRef(0, 0);
        ref.setSheet("Sheet1");
        var states = context.getRefCells(ref);

        equal(states.length, 1);

        var state = states[0];

        equal(state.value, 1000);
        equal(state.row, 0);
        equal(state.col, 0);
        equal(state.sheet, "Sheet1");
    });

    test("returns empty array for empty cells", function() {
        var ref = new CellRef(9, 9);
        ref.setSheet("Sheet1");
        var states = context.getRefCells(ref);

        equal(states.length, 0);
    });

    test("gets the correct range state as a reference", function() {
        var a1 = new CellRef(0, 0);
        var b2 = new CellRef(1, 1);

        a1.setSheet("Sheet1");
        b2.setSheet("Sheet1");

        var range = new RangeRef(a1, b2);
        range.setSheet("Sheet1");

        var states = context.getRefCells(range);
        equal(states.length, 3);
        equal(states[1].value, 2000);
    });

    test("gets the correct range state as a reference (col)", function() {
        var a1 = new CellRef(-Infinity, 0);
        var b2 = new CellRef(1, Infinity);

        a1.setSheet("Sheet1");
        b2.setSheet("Sheet1");

        var range = new RangeRef(a1, b2);
        range.setSheet("Sheet1");

        var states = context.getRefCells(range);
        equal(states.length, 3);
        equal(states[1].value, 2000);
    });

    test("gets the correct range state as a reference (row)", function() {
        var AA = new RangeRef(new CellRef(0, -Infinity), new CellRef(0, Infinity));

        AA.setSheet("Sheet1");

        var states = context.getRefCells(AA);
        equal(states.length, 2);
        equal(states[1].value, 2000);
    });
})();
