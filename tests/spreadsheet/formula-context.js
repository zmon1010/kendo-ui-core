(function() {
    var context, sheet;

    var makeCellRef = kendo.spreadsheet.calc.Runtime.makeCellRef;

    function FormulaContext(sheets) {
        this.sheets = sheets;
    }

    FormulaContext.prototype = {
        getRefCells: function(ref) {
            var sheet = this.sheet(ref);
            var formula = sheet.range(ref.row-1, ref.col-1).formula() || null;
            var value = sheet.range(ref.row-1, ref.col-1).value();

            if (formula != null || value != null) {
                return [ this.state(formula, value, ref) ];
                return [{ formula: formula, value: value, row: ref.row, col: ref.col, sheet: sheet.name() }];
            } else {
                return [];
            }

        },

        sheet: function(cellRef) {
            return this.sheets[cellRef.sheet];
        },

        state: function(formula, value, ref) {
            return {
                formula: formula,
                value: value,
                row: ref.row,
                col: ref.col,
                sheet: ref.sheet
            };
        }
    };

    module("Formula Context", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(10, 10, 10, 10);
            sheet.name("Sheet1");
            sheet.range(0, 0, 1, 1).value(1000);

            var sheets = {
                "Sheet1": sheet
            };

            context = new FormulaContext(sheets);
        }
    });

    test("gets the correct cell state as a reference", function() {
        var ref = makeCellRef(1, 1).setSheet("Sheet1");
        var states = context.getRefCells(ref);

        equal(states.length, 1);

        var state = states[0];

        equal(state.value, 1000);
        equal(state.row, 1);
        equal(state.col, 1);
        equal(state.sheet, "Sheet1");
    });

    test("returns empty array for empty cells", function() {
        var ref = makeCellRef(9, 9).setSheet("Sheet1");
        var states = context.getRefCells(ref);

        equal(states.length, 0);
    });
})();
