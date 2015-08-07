(function(f, define){
    define([ ], f);
})(function() {

    /* jshint eqnull:true */

    var spreadsheet = kendo.spreadsheet;
    var Class = kendo.Class;
    var Ref = kendo.spreadsheet.Ref;
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var UnionRef = kendo.spreadsheet.UnionRef;

    var FormulaContext = kendo.Class.extend({
        init: function (workbbok) {
            this.workbbok = workbbok;
        },

        getRefCells: function(ref, hiddenInfo) {
            var sheet = this.workbbok.getSheetByName(ref.sheet), formula, value;
            if (ref instanceof CellRef) {
                formula = sheet.compiledFormula(ref);
                value = sheet.range(ref.row, ref.col).value();

                if (formula != null || value != null) {
                    return [{
                        formula: formula,
                        value: value,
                        row: ref.row,
                        col: ref.col,
                        sheet: ref.sheet,
                        hidden: hiddenInfo ? (sheet.columnWidth(ref.col) === 0 || sheet.rowHeight(ref.row) === 0) : false
                    }];
                } else {
                    return [];
                }
            }
            if (ref instanceof RangeRef) {
                var tl = sheet._grid.normalize(ref.topLeft);
                var br = sheet._grid.normalize(ref.bottomRight);

                var startCellIndex = sheet._grid.cellRefIndex(tl);
                var endCellIndex = sheet._grid.cellRefIndex(br);

                var values = sheet._properties.iterator("value", startCellIndex, endCellIndex);

                var states = [];

                for (var col = tl.col; col <= br.col; ++col) {
                    for (var row = tl.row; row <= br.row; ++row) {
                        var index = sheet._grid.index(row, col);
                        formula = sheet._properties.get("compiledFormula", index);
                        value = values.at(index);
                        if (formula != null || value != null) {
                            states.push({
                                formula: formula,
                                value: value,
                                row: row,
                                col: col,
                                sheet: ref.sheet,
                                hidden: hiddenInfo ? (sheet.columnWidth(col) === 0 || sheet.rowHeight(row) === 0) : false
                            });
                        }
                    }
                }

                return states;
            }
            if (ref instanceof UnionRef) {
                var a = [];
                for (var i = 0; i < ref.refs.length; ++i) {
                    a = a.concat(this.getRefCells(ref.refs[i], hiddenInfo));
                }
                return a;
            }
            return [];
        },

        getData: function(ref) {
            var data = this.getRefCells(ref).map(function(cell){
                return cell.value;
            });
            return ref instanceof CellRef ? data[0] : data;
        },

        onFormula: function(sheet, row, col, value) {
            sheet = this.workbbok.getSheetByName(sheet);

            if (value instanceof kendo.spreadsheet.calc.runtime.Matrix) {
                value.each(function(value, row, col) {
                    sheet._value(row, col, value, false);
                });
            } else {
                sheet._value(row, col, value, false);
            }
        }
    });

    spreadsheet.FormulaContext = FormulaContext;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
