(function(f, define){
    define([ ], f);
})(function() {

    var spreadsheet = kendo.spreadsheet;
    var Class = kendo.Class;
    var Ref = kendo.spreadsheet.Ref;
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var UnionRef = kendo.spreadsheet.UnionRef;

    var FormulaContext = kendo.Class.extend({
        init: function (sheets) {
            this.sheets = sheets;
        },

        getRefCells: function(ref) {
            if (ref instanceof CellRef) {
                var sheet = this.sheet(ref);
                var formula = sheet.compiledFormula(ref);
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

                var values = sheet._values.iterator(startCellIndex, endCellIndex);

                var states = [];

                for (var col = tl.col; col <= br.col; ++col) {
                    for (var row = tl.row; row <= br.row; ++row) {
                        var index = sheet._grid.index(row, col);
                        var formula = sheet._compiledFormulas.value(index, index);
                        var value = values.at(index);
                        if (formula != null || value != null) {
                            states.push({ formula: formula, value: value, row: row, col: col, sheet: ref.sheet });
                        }
                    }
                }

                return states;
            }
            if (ref instanceof UnionRef) {
                var a = [];
                for (var i = 0; i < ref.refs.length; ++i) {
                    a = a.concat(this.getRefCells(ref.refs[i]));
                }
                return a;
            }
            return [];
        },

        getData: function(ref) {
            var data = this.getRefCells(ref).map(function(cell){
                if (cell.formula && ("value" in cell.formula)) {
                    return cell.formula.value;
                }
                return cell.value;
            });
            return ref instanceof CellRef ? data[0] : data;
        },

        onFormula: function(sheet, row, col, value) {
            this.sheets[sheet].value(row, col, value);
        },

        sheet: function(cellRef) {
            return this.sheets[cellRef.sheet];
        },

        state: function(formula, value, ref) {
            return ;
        }

    });

    spreadsheet.FormulaContext = FormulaContext;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
