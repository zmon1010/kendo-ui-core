(function(f, define){
    define([ ], f);
})(function() {


    var spreadsheet = kendo.spreadsheet;
    var Class = kendo.Class;
    var Ref = kendo.spreadsheet.Ref;
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;

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

        getData: function(ref) {
            if (ref instanceof Ref) {
                var data = this.getRefCells(ref).map(function(cell){
                    return cell.value;
                });
                return ref instanceof CellRef ? data[0] : data;
            }
            return ref;
        },

        onFormula: function() {
        },

        sheet: function(cellRef) {
            return this.sheets[cellRef.sheet];
        },

        state: function(formula, value, ref) {
            return ;
        }
    };

    spreadsheet.FormulaContext = FormulaContext;
    /*
    var Glue = {
        getRefCells: function(ref) {
            if (ref instanceof calc.Runtime.CellRef) {
                var formula = sheet.range(ref.row-1, ref.col-1).formula() || null;
                var value = sheet.range(ref.row-1, ref.col-1).value();
                if (formula != null || value != null)
                    return [{ formula: formula, value: value, row: ref.row, col: ref.col, sheet: "sheet1" }];

            }

            if (ref instanceof calc.Runtime.RangeRef) {
                // ref = ref.intersect(this.getSheetBounds());
                // if (!(ref instanceof calc.Runtime.RangeRef))
                //     return this.getRefCells(ref);
                var startCellIndex = sheet._grid.index(ref.topLeft.row-1, ref.topLeft.col-1);
                var endCellIndex = sheet._grid.index(ref.bottomRight.row-1, ref.bottomRight.col-1);
                var formulas = sheet._formulas.iterator(startCellIndex, endCellIndex);
                var values = sheet._values.iterator(startCellIndex, endCellIndex);
                var a = [];
                for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                        var index = sheet._grid.index(row-1, col-1);
                        var formula = formulas.at(index) || null;
                        var value = values.at(index);
                        console.log(row, col, index, value);
                        if (formula != null || value != null) {
                            a.push({ formula: formula, value: value, row: row, col: col, sheet: "sheet1" });
                        }
                    }
                }

                return a;
            }

            if (ref instanceof calc.Runtime.UnionRef) {
                var a = [], self = this;
                ref.refs.forEach(function(ref){
                    a = a.concat(self.getRefCells(ref));
                });
                return a;
            }

            if (ref instanceof calc.Runtime.NullRef) {
                return [];
            }

            console.error("Unsupported reference", ref);
            return [];
        },

        getData: function(ref) {
            var self = this;
            if (ref instanceof calc.Runtime.Ref) {
                var data = self.getRefCells(ref).map(function(cell){
                    return cell.value;
                });
                return ref instanceof calc.Runtime.CellRef ? data[0] : data;
            }
            return ref;
        },

        onFormula: function(sheetName, row, col, val) {
            console.log("onFormula:", sheetName, row, col, val);
        }
    };
    */

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
