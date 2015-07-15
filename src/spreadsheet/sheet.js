(function(f, define){
    define([ "../kendo.core", "./runtime", "./references" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var Range = kendo.spreadsheet.Range;

    var Sheet = kendo.Observable.extend({
        init: function(rowCount, columnCount, rowHeight, columnWidth, headerHeight, headerWidth) {
            kendo.Observable.prototype.init.call(this);

            var cellCount = rowCount * columnCount - 1;

            this._rows = new kendo.spreadsheet.Axis(rowCount, rowHeight);
            this._columns = new kendo.spreadsheet.Axis(columnCount, columnWidth);
            this._mergedCells = [];
            this._frozenRows = 0;
            this._frozenColumns = 0;
            this._suspendChanges = false;
            this._selection = kendo.spreadsheet.NULLREF;
            this._activeCell = kendo.spreadsheet.FIRSTREF.toRangeRef();
            this._originalActiveCell = kendo.spreadsheet.FIRSTREF;
            this._grid = new kendo.spreadsheet.Grid(this._rows, this._columns, rowCount, columnCount, headerHeight, headerWidth);
            this._properties = new kendo.spreadsheet.PropertyBag(cellCount);
            this._sorter = new kendo.spreadsheet.Sorter(this._grid, this._properties.sortable());
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

        triggerChange: function(recalc) {
            if (!this._suspendChanges) {
                this.trigger("change", { recalc: recalc });
            }
            return this;
        },

        hideColumn: function(columnIndex) {
            return this._property(this._columns.hide.bind(this._columns), columnIndex);
        },

        unhideColumn: function(columnIndex) {
            return this._property(this._columns.unhide.bind(this._columns), columnIndex);
        },

        _copyRange: function(sourceRangeRef, targetRef) {
            var grid = this._grid;
            var rowCount = grid.rowCount;

            var nextRefTopLeft = grid.normalize(sourceRangeRef.topLeft);
            var nextRefBottomRight = grid.normalize(sourceRangeRef.bottomRight);

            var nextIndex = nextRefTopLeft.col * rowCount + nextRefTopLeft.row;
            var nextBottomIndex = nextRefBottomRight.col * rowCount + nextRefBottomRight.row;

            var targetIndex = targetRef.col * rowCount + targetRef.row;

            this._properties.copy(nextIndex, nextBottomIndex, targetIndex);
        },

        insertRow: function(rowIndex) {
            this.batch(function() {

                var grid = this._grid;
                var columnCount = grid.columnCount;
                var rowCount = grid.rowCount;

                var frozenRows = this.frozenRows();

                if (rowIndex < frozenRows) {
                    this.frozenRows(frozenRows + 1);
                }

                for (var ci = 0; ci < columnCount; ci++) {
                    var ref = new RangeRef(new CellRef(rowIndex, ci), new CellRef(rowIndex, ci));

                    var topLeft = grid.normalize(ref.topLeft);
                    var bottomRight = grid.normalize(ref.bottomRight);

                    var nextRef = new RangeRef(
                        new CellRef(topLeft.row, topLeft.col),
                        new CellRef(rowCount - 2, bottomRight.col)
                    );

                    this._copyRange(nextRef, new CellRef(topLeft.row + 1, topLeft.col));

                    new Range(ref, this).clear();
                }
            }.bind(this));

            return this;
        },

        deleteRow: function(rowIndex) {
            this.batch(function() {
                var grid = this._grid;
                var columnCount = grid.columnCount;
                var rowCount = grid.rowCount;

                var frozenRows = this.frozenRows();
                if (rowIndex < frozenRows) {
                    this.frozenRows(frozenRows - 1);
                }

                for (var ci = 0; ci < columnCount; ci++) {
                    var ref = new RangeRef(new CellRef(rowIndex, ci), new CellRef(rowIndex, ci));

                    new Range(ref, this).clear();

                    var topLeft = grid.normalize(ref.topLeft);
                    var bottomRight = grid.normalize(ref.bottomRight);

                    var nextRef = new RangeRef(
                        new CellRef(topLeft.row + 1, topLeft.col),
                        new CellRef(Infinity, bottomRight.col)
                    );

                    this._copyRange(nextRef, topLeft);

                    var nextRefBottomRight = grid.normalize(nextRef.bottomRight);

                    new Range(new RangeRef(nextRefBottomRight, nextRefBottomRight), this).clear();
                }

            }.bind(this));

            return this;
        },

        insertColumn: function(columnIndex) {
            this.batch(function() {
                var grid = this._grid;
                var columnCount = grid.columnCount;
                var rowCount = grid.rowCount;

                var frozenColumns = this.frozenColumns();

                if (columnIndex < frozenColumns) {
                    this.frozenColumns(frozenColumns + 1);
                }

                for (var ci = columnCount; ci >= columnIndex; ci--) {
                    var ref = new RangeRef(new CellRef(0, ci), new CellRef(Infinity, ci));

                    new Range(ref, this).clear();

                    if (ci == columnIndex) {
                        break;
                    }

                    var topLeft = grid.normalize(ref.topLeft);
                    var bottomRight = grid.normalize(ref.bottomRight);

                    var nextRef = new RangeRef(
                        new CellRef(topLeft.row, topLeft.col - 1),
                        new CellRef(bottomRight.row, bottomRight.col - 1)
                    );

                    this._copyRange(nextRef, topLeft);
                }
            }.bind(this));

            return this;
        },

        deleteColumn: function(columnIndex) {
            this.batch(function() {
                var grid = this._grid;
                var columnCount = grid.columnCount;
                var rowCount = grid.rowCount;

                var frozenColumns = this.frozenColumns();

                if (columnIndex < frozenColumns) {
                    this.frozenColumns(frozenColumns - 1);
                }

                for (var ci = columnIndex; ci < columnCount; ci++) {
                    var ref = new RangeRef(new CellRef(0, ci), new CellRef(Infinity, ci));

                    new Range(ref, this).clear();

                    if (ci == columnCount - 1) {
                        break;
                    }

                    var topLeft = grid.normalize(ref.topLeft);
                    var bottomRight = grid.normalize(ref.bottomRight);

                    var nextRef = new RangeRef(
                        new CellRef(topLeft.row, topLeft.col + 1),
                        new CellRef(bottomRight.row, bottomRight.col + 1)
                    );

                    this._copyRange(nextRef, topLeft);
                }
            }.bind(this));

            return this;
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
                if (row.toLowerCase() === "#sheet") {
                    ref = kendo.spreadsheet.SHEETREF;
                } else {
                    ref = kendo.spreadsheet.calc.parseReference(row);
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

        forEach: function(ref, callback, serializableOnly) {
            var topLeft = this._grid.normalize(ref.topLeft);
            var bottomRight = this._grid.normalize(ref.bottomRight);

            for (var ci = topLeft.col; ci <= bottomRight.col; ci ++) {
                var ri = topLeft.row;

                var startCellIndex = this._grid.index(ri, ci);
                var endCellIndex = this._grid.index(bottomRight.row, ci);

                this._properties.forEach(startCellIndex, endCellIndex, function(value) {
                    callback(ri++, ci, value);
                }, serializableOnly);
            }
        },

        select: function(ref) {
            if (ref) {
                var mergedCells = this._mergedCells;

                this._selection = this._ref(ref).map(function(ref) {
                    return ref.toRangeRef().union(mergedCells);
                });

                this.activeCell(this._selection.first());
            }

            return this._selection;
        },

        activeCell: function(ref) {
            if (ref) {
                var mergedCells = this._mergedCells;

                this._originalActiveCell = ref;
                this._activeCell = ref.toRangeRef().union(mergedCells);

                this.trigger("change");
            }

            return this._activeCell;
        },

        originalActiveCell: function() {
            return this._originalActiveCell;
        },

        selection: function() {
            return new Range(this._grid.normalize(this._selection), this);
        },

        selectedHeaders: function() {
            var selection = this.select();

            var rows = {};
            var cols = {};
            var allCols = false;
            var allRows = false;

            selection.forEach(function(ref) {
                var i;
                var rowState = "partial";
                var colState = "partial";
                ref = ref.toRangeRef();

                var bottomRight = ref.bottomRight;

                var rowSelection = bottomRight.col === Infinity;
                var colSelection = bottomRight.row === Infinity;

                if (colSelection) { //column selection
                    allRows = true;
                    colState = "full";
                }

                if (rowSelection) { //row selection
                    allCols = true;
                    rowState = "full";
                }

                if (!colSelection) { //column selection
                    for (i = ref.topLeft.row; i <= bottomRight.row; i++) {
                        if (rows[i] !== "full") {
                            rows[i] = rowState;
                        }
                    }
                }

                if (!rowSelection) {
                    for (i = ref.topLeft.col; i <= bottomRight.col; i++) {
                        if (cols[i] !== "full") {
                            cols[i] = colState;
                        }
                    }
                }
            });

            return {
                rows: rows,
                cols: cols,
                allRows: allRows,
                allCols: allCols,
                all: allRows && allCols
            };
        },

        toJSON: function() {
            var positions = {};

            var rows = this._rows.toJSON("height", positions);
            var columns = this._columns.toJSON("width", {});

            this.forEach(kendo.spreadsheet.SHEETREF, function(row, col, cell) {
                if (Object.keys(cell).length === 0) {
                    return;
                }

                var position = positions[row];

                if (position === undefined) {
                    position = rows.length;

                    rows.push({ index: row });

                    positions[row] = position;
                }

                var row = rows[position];

                cell.index = col;

                if (row.cells === undefined) {
                    row.cells = [];
                }

                row.cells.push(cell);
            }, true);

            var json = {
                rows: rows,
                columns: columns,
                frozenRows: this.frozenRows(),
                frozenColumns: this.frozenColumns(),
                mergedCells: this._mergedCells.map(function(ref) {
                    return ref.toString();
                })
            };

            if (this._sort) {
               json.sort = {
                   ref: this._sort.ref.toString(),
                   columns: this._sort.columns.map(function(column, index) {
                       return {
                           index: column.index,
                           ascending: column.ascending
                       };
                   })
               };
            }

            if (this._filter) {
               json.filter = {
                   ref: this._filter.ref.toString(),
                   columns: this._filter.columns.map(function(column, index) {
                        var filter = column.filter.toJSON();
                        filter.index = column.index;
                        return filter;
                   })
               };
            }

            return json;
        },

        fromJSON: function(json) {
            this.batch(function() {
                if (json.frozenColumns !== undefined) {
                    this.frozenColumns(json.frozenColumns);
                }

                if (json.frozenRows !== undefined) {
                    this.frozenRows(json.frozenRows);
                }

                if (json.columns !== undefined) {
                    this._columns.fromJSON("width", json.columns);
                }

                if (json.rows !== undefined) {
                    this._rows.fromJSON("height", json.rows);

                    for (var ri = 0; ri < json.rows.length; ri++) {
                        var row = json.rows[ri];
                        var rowIndex = row.index;

                        if (rowIndex === undefined) {
                            rowIndex = ri;
                        }

                        if (row.cells) {
                            for (var ci = 0; ci < row.cells.length; ci++) {
                                var cell = row.cells[ci];
                                var columnIndex = cell.index;

                                if (columnIndex === undefined) {
                                    columnIndex = ci;
                                }

                                this._properties.fromJSON(this._grid.index(rowIndex, columnIndex), cell);
                            }
                        }
                    }
                }

                if (json.mergedCells) {
                    json.mergedCells.forEach(function(ref) {
                       this.range(ref).merge();
                    }, this);
                }

                if (json.sort) {
                    this._sort = {
                        ref: this._ref(json.sort.ref),
                        columns: json.sort.columns.slice(0)
                    };
                }

                if (json.filter) {
                    this._filter = {
                        ref: this._ref(json.filter.ref),
                        columns: json.filter.columns.map(function(column) {
                            return {
                                index: column.index,
                                filter: kendo.spreadsheet.Filter.create(column)
                            };
                        })
                    };
                }
            }.bind(this));
        },

        compiledFormula: function(ref) {
            return this._properties.get("compiledFormula", this._grid.cellRefIndex(ref));
        },

        recalc: function(context) {
            var formulas = this._properties.get("formula").values();
            var compiledFormulas = [];

            formulas.forEach(function(formula) {
                for (var index = formula.start; index <= formula.end; index++) {
                    var cell = this._grid.cellRef(index);

                    var compiled = this._properties.get("compiledFormula", index);

                    if (compiled === null) {
                        var x = kendo.spreadsheet.calc.parse(this._name, cell.row, cell.col, formula.value);

                        compiled = kendo.spreadsheet.calc.compile(x);

                        this._properties.set("compiledFormula", index, compiled);
                    }

                    compiled.reset();

                    compiledFormulas.push({
                        cell: cell,
                        index: index,
                        formula: compiled
                    });
                }
            }, this);

            compiledFormulas.forEach(function(value) {
                value.formula.exec(context, this._name, value.cell.row, value.cell.col);
            }, this);
        },

        _value: function(row, col, value, parseStrings) {
            var index = this._grid.index(row, col);

            if (value !== undefined) {
                this._properties.set("value", index, index, value, parseStrings);
            } else {
                return this._properties.get("value", index);
            }
        },

        _set: function(ref, name, value, parseStrings) {
            var topLeft = this._grid.normalize(ref.topLeft);

            var bottomRight = this._grid.normalize(ref.bottomRight);

            for (var ci = topLeft.col; ci <= bottomRight.col; ci++) {
                var start = this._grid.index(topLeft.row, ci);
                var end = this._grid.index(bottomRight.row, ci);

                this._properties.set(name, start, end, value, parseStrings);
            }
        },

        _get: function(ref, name) {
            var topLeft = this._grid.normalize(ref.topLeft);

            var index = this._grid.index(topLeft.row, topLeft.col);

            return this._properties.get(name, index);
        },

        batch: function(callback, recalc) {
            var suspended = this.suspendChanges();

            this.suspendChanges(true);

            callback();

            return this.suspendChanges(suspended).triggerChange(recalc);
        },

        _sortBy: function(ref, columns) {
            var indices = null;

            columns.forEach(function(column) {
                indices = this._sorter.sortBy(ref, column.index, this._properties.get("value"), column.ascending, indices);
            }, this);

            this._sort = {
                ref: ref,
                columns: columns
            };

            this.triggerChange(true);
        },
        _filterBy: function(ref, columns) {
            this.batch(function() {
                for (var ri = ref.topLeft.row; ri <= ref.bottomRight.row; ri++) {
                    if (this._rows.hidden(ri)) {
                        this._rows.unhide(ri);
                    }
                }

                columns.forEach(function(column) {
                    var columnRef = ref.toColumn(column.index);

                    column.filter.prepare(new Range(columnRef, this));

                    this.forEach(columnRef, function(row, col, cell) {
                        var value = column.filter.value(cell);

                        if (column.filter.matches(value) === false) {
                            this.hideRow(row);
                        } else {
                            this.unhideRow(row);
                        }
                    }.bind(this), true);
                }, this);

                this._filter = {
                    ref: ref,
                    columns: columns
                };
            }.bind(this));
        },
        clearFilter: function(spec) {
            this._clearFilter(spec instanceof Array ? spec : [spec]);
        },
        _clearFilter: function(indices) {
            if (this._filter) {
                this.batch(function() {
                    var columns = this._filter.columns.filter(function(column) {
                        return indices.indexOf(column.index) < 0;
                    });

                    this._filterBy(this._filter.ref, columns);
                }.bind(this));
            }
        }
    });

    Sheet.parse = function(value, parseStrings) {
        var type = null;

        if (value !== null) {
            if (value instanceof Date) {
                value = kendo.spreadsheet.calc.runtime.dateToSerial(value);
                type = "date";
            } else {
                type = typeof value;
                if (type === "string" && parseStrings !== false) {
                    var parseResult = kendo.spreadsheet.calc.parse(null, 0, 0, value);
                    value = parseResult.value;
                    type = parseResult.type;
                }
            }
        }

        return {
            type: type,
            value: value
        };
    };

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
