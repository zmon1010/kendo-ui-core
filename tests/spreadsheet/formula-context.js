(function() {
    var context, sheet;
    var spreadsheet = kendo.spreadsheet;
    var CellRef = spreadsheet.CellRef;
    var RangeRef = spreadsheet.RangeRef;

    function FormulaContext(sheets) {
        this.sheets = sheets;
    }

    FormulaContext.prototype = {
        getRefCells: function(ref) {
            if (ref instanceof CellRef) {
                var sheet = this.sheet(ref);
                var formula = sheet.range(ref.row, ref.col).formula() || null;
                var value = sheet.range(ref.row, ref.col).value();

                if (formula != null || value != null) {
                    return [{
                        formula: formula,
                        value: value,
                        row: ref.row,
                        col: ref.col,
                        sheet: ref.sheet
                    }];
                } else {
                    return [];
                }
            }
            if (ref instanceof RangeRef) {
                var sheet = this.sheet(ref);

                var tl = sheet._grid.normalize(ref.topLeft);
                var br = sheet._grid.normalize(ref.bottomRight);

                var startCellIndex = sheet._grid.cellRefIndex(tl);
                var endCellIndex = sheet._grid.cellRefIndex(br);

                var formulas = sheet._formulas.iterator(startCellIndex, endCellIndex);
                var values = sheet._values.iterator(startCellIndex, endCellIndex);

                var states = [];

                for (var col = tl.col; col <= br.col; ++col) {
                    for (var row = tl.row; row <= br.row; ++row) {
                        var index = sheet._grid.index(row, col);
                        var formula = formulas.at(index) || null;
                        var value = values.at(index);
                        if (formula != null || value != null) {
                            states.push({ formula: formula, value: value, row: row, col: col, sheet: ref.sheet });
                        }
                    }
                }

                return states;
            }
        },

        sheet: function(cellRef) {
            return this.sheets[cellRef.sheet];
        },

        state: function(formula, value, ref) {
            return ;
        }
    };

    module("Formula Context", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(10, 10, 10, 10);
            sheet.name("Sheet1");
            sheet.range(0, 0).value(1000);
            sheet.range(0, 1).value(2000);
            sheet.range(1, 1).value(3000);

            var sheets = {
                "Sheet1": sheet
            };

            context = new FormulaContext(sheets);
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
