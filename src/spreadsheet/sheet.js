(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var Range = kendo.spreadsheet.Range;

    var Sheet = kendo.Class.extend({
        init: function(rowCount, columnCount, rowHeight, columnWidth, headerHeight, headerWidth) {
            var cellsCount = rowCount * columnCount - 1;

            this._values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._backgrounds = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._rows = new kendo.spreadsheet.Axis(rowCount, rowHeight);
            this._columns = new kendo.spreadsheet.Axis(columnCount, columnWidth);
            this._mergedCells = [];
            this._frozenRows = 0;
            this._frozenColumns = 0;
            this._selection = kendo.spreadsheet.NULLREF;

            this._grid = new kendo.spreadsheet.Grid(this._rows, this._columns, rowCount, columnCount, headerHeight, headerWidth);
        },

        name: function(value) {
            if (!value) {
                return this._name;
            }

            this._name = value;

            return this;
        },

        hideColumn: function(columnIndex) {
            return this._columns.unhide(columnIndex);
        },

        unhideColumn: function(columnIndex) {
            return this._columns.unhide(columnIndex);
        },

        hideRow: function(rowIndex) {
            return this._rows.hide(rowIndex);
        },

        unhideRow: function(rowIndex) {
            return this._rows.unhide(rowIndex);
        },

        columnWidth: function(columnIndex, width) {
            return this._columns.value(columnIndex, columnIndex, width);
        },

        rowHeight: function(rowIndex, height) {
            return this._rows.value(rowIndex, rowIndex, height);
        },

        frozenRows: function(value) {
            if (!value) {
                return this._frozenRows;
            }

            this._frozenRows = value;
            return this;
        },

        frozenColumns: function(value) {
            if (!value) {
                return this._frozenColumns;
            }

            this._frozenColumns = value;
            return this;
        },

        _ref: function(row, column, numRows, numColumns) {
            var ref = null;

            if (row instanceof kendo.spreadsheet.Ref) {
                return row;
            }

            if (typeof row === "string") {
                var refs = kendo.spreadsheet.calc.parse(this._name, 0, 0, "=(" + row + ")").refs;
                refs.forEach(function(ref) {
                    ref.sheet = null;
                });
                if (refs.length === 1) {
                    ref = refs[0];
                } else {
                    ref = new kendo.spreadsheet.UnionRef(refs);
                }
            } else {
                if (!numRows) {
                    numRows = 1;
                }

                if (!numColumns) {
                    numColumns = 1;
                }
                ref = new RangeRef(new CellRef(row, column), new CellRef(row + numRows - 1, column + numColumns - 1));
            }

            return ref;
        },

        range: function(row, column, numRows, numColumns) {
            return new Range(this._ref(row, column, numRows, numColumns), this);
        },

        forEachMergedCell: function(callback) {
            this._mergedCells.forEach(callback);
        },

        forEach: function(ref, callback) {
            for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col; ci ++) {
                var startCellIndex = this._grid.index(ref.topLeft.row, ci);
                var endCellIndex = this._grid.index(ref.bottomRight.row, ci);

                var values = this._values.iterator(startCellIndex, endCellIndex);
                var formulas = this._formulas.iterator(startCellIndex, endCellIndex);
                var backgrounds = this._backgrounds.iterator(startCellIndex, endCellIndex);

                for (var ri = ref.topLeft.row; ri <= ref.bottomRight.row; ri ++) {
                    var index = this._grid.index(ri, ci);

                    callback({
                        row: ri,
                        col: ci,
                        value: values.at(index),
                        formula: formulas.at(index),
                        background: backgrounds.at(index)
                    });
                }
            }
        },

        select: function(ref) {
            if (ref) {
                this._selection = this._ref(ref);
            }

            return this._selection;
        }
    });

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
