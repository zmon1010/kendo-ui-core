(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var Range = kendo.spreadsheet.Range;

    var Sheet = kendo.Observable.extend({
        init: function(rowCount, columnCount, rowHeight, columnWidth, headerHeight, headerWidth) {
            kendo.Observable.prototype.init.call(this);

            var cellsCount = rowCount * columnCount - 1;

            this._values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._styles = new kendo.spreadsheet.SparseRangeList(0, cellsCount, "{}");
            this._rows = new kendo.spreadsheet.Axis(rowCount, rowHeight);
            this._columns = new kendo.spreadsheet.Axis(columnCount, columnWidth);
            this._mergedCells = [];
            this._frozenRows = 0;
            this._frozenColumns = 0;
            this._suspendChanges = false;
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

        _property: function(accessor, value) {
            if (value === undefined) {
                return accessor();
            } else {
                accessor(value);

                return this.triggerChange();
            }
        },

        _field: function(name, value) {
            if (value === undefined) {
                return this[name];
            } else {
                this[name] = value;

                return this.triggerChange();
            }
        },

        suspendChanges: function(value) {
            if (value === undefined) {
                return this._suspendChanges;
            }

            this._suspendChanges = value;

            return this;
        },

        triggerChange: function() {
            if (!this._suspendChanges) {
                this.trigger("change");
            }
            return this;
        },

        hideColumn: function(columnIndex) {
            return this._property(this._columns.hide.bind(this._columns), columnIndex);
        },

        unhideColumn: function(columnIndex) {
            return this._property(this._columns.unhide.bind(this._columns), columnIndex);
        },

        hideRow: function(rowIndex) {
            return this._property(this._rows.hide.bind(this._rows), rowIndex);
        },

        unhideRow: function(rowIndex) {
            return this._property(this._rows.unhide.bind(this._rows), rowIndex);
        },

        columnWidth: function(columnIndex, width) {
            return this._property(this._columns.value.bind(this._columns, columnIndex, columnIndex), width);
        },

        rowHeight: function(rowIndex, height) {
            return this._property(this._rows.value.bind(this._rows, rowIndex, rowIndex), height);
        },

        frozenRows: function(value) {
            return this._field("_frozenRows", value);
        },

        frozenColumns: function(value) {
            return this._field("_frozenColumns", value);
        },

        _ref: function(row, column, numRows, numColumns) {
            var ref = null;

            if (row instanceof kendo.spreadsheet.Ref) {
                return row;
            }

            if (typeof row === "string") {
                ref = kendo.spreadsheet.calc.parseReference(row);
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
                var styles = this._styles.iterator(startCellIndex, endCellIndex);

                for (var ri = ref.topLeft.row; ri <= ref.bottomRight.row; ri ++) {
                    var index = this._grid.index(ri, ci);

                    callback({
                        row: ri,
                        col: ci,
                        value: values.at(index),
                        formula: formulas.at(index),
                        style: JSON.parse(styles.at(index))
                    });
                }
            }
        },

        values: function(ref, values) {
            var topLeftRow = ref.topLeft.row;
            var topLeftCol = ref.topLeft.col;
            var bottomRightRow = ref.bottomRight.row;
            var bottomRightCol = ref.bottomRight.col;

            if (values === undefined) {
                values = new Array(ref.height());

                for (var vi = 0; vi < values.length; vi++) {
                    values[vi] = new Array(ref.width());
                }

                for (var ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    var startCellIndex = this._grid.index(topLeftRow, ci);
                    var endCellIndex = this._grid.index(bottomRightRow, ci);

                    var iterator = this._values.iterator(startCellIndex, endCellIndex);

                    for (var ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        var index = this._grid.index(ri, ci);

                        values[ri - topLeftRow][ci - topLeftCol] = iterator.at(index);
                    }
                }

                return values;
            } else {
                for (var ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (var ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        var index = this._grid.index(ri, ci);

                        var row = values[ri - topLeftRow];

                        if (row) {
                            var value = row[ci - topLeftCol];

                            if (value !== undefined) {
                                this._values.value(index, index, value);
                            }
                        }
                    }
                }

                return this.triggerChange();
            }
        },

        select: function(ref) {
            if (ref) {
                var mergedCells = this._mergedCells;

                this._selection = this._ref(ref).map(function(ref) {
                    return ref.toRangeRef().union(mergedCells);
                });

                this.trigger("change");
            }

            return this._selection;
        },

        selection: function() {
            return new Range(this._selection, this);
        },

        selectedHeaders: function() {
            var selection = this.select();

            var rows = {};
            var cols = {};
            var allCols = false;
            var allRows = false;

            selection.forEach(function(ref) {
                var rowState = "active";
                var colState = "active";
                ref = ref.toRangeRef();

                var bottomRight = ref.bottomRight;

                var rowSelection = bottomRight.col === Infinity;
                var colSelection = bottomRight.row === Infinity;

                if (colSelection) { //column selection
                    allRows = true;
                    colState = "selected";
                }

                if (rowSelection) { //row selection
                    allCols = true;
                    rowState = "selected";
                }

                if (!colSelection) { //column selection
                    for (var i = ref.topLeft.row; i <= bottomRight.row; i++) {
                        if (rows[i] !== "selected") {
                            rows[i] = rowState;
                        }
                    }
                }

                if (!rowSelection) {
                    for (var i = ref.topLeft.col; i <= bottomRight.col; i++) {
                        if (cols[i] !== "selected") {
                            cols[i] = colState;
                        }
                    }
                }
            });

            return {
                rows: rows,
                cols: cols,
                allRows: allRows,
                allCols: allCols
            };
        }
    });

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
