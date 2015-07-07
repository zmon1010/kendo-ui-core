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

            this._values = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._types = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._formats = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._compiledFormulas = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
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
            this._sorter = new kendo.spreadsheet.Sorter(this._grid, [this._values]);

            this._background = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._borderBottom = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._borderRight = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._fontColor = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._fontFamily = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._fontLine = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._fontSize = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._fontStyle = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._fontWeight = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._horizontalAlignment = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._verticalAlignment = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
            this._wrap = new kendo.spreadsheet.SparseRangeList(0, cellCount, null);
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

        deleteRow: function(rowIndex) {

            this.batch(function() {
                var grid = this._grid;
                var rowCount = grid.rowCount;

                for (var ri = rowIndex; ri < rowCount; ri++) {
                    var ref = new RangeRef(new CellRef(ri, 0), new CellRef(ri, Infinity));

                    new Range(ref, this).clear();

                    if (ri == rowCount - 1) {
                        break;
                    }

                    var topLeft = grid.normalize(ref.topLeft);
                    var bottomRight = grid.normalize(ref.bottomRight);

                    var start = topLeft.row;
                    var end = bottomRight.row;

                    for (var ci = topLeft.col; ci <= bottomRight.col; ci++) {

                        var cellRef = new CellRef(start+1, ci);

                        var nextRef = new RangeRef(cellRef, cellRef);

                        var nextIndex = nextRef.topLeft.col * rowCount + nextRef.topLeft.row;

                        var sourceIndex = ci * rowCount + start;

                        this._background.swap(nextIndex, nextIndex, sourceIndex);
                        this._values.swap(nextIndex, nextIndex, sourceIndex);
                        this._borderBottom.swap(nextIndex, nextIndex, sourceIndex);
                        this._borderRight.swap(nextIndex, nextIndex, sourceIndex);
                        this._fontColor.swap(nextIndex, nextIndex, sourceIndex);
                        this._fontFamily.swap(nextIndex, nextIndex, sourceIndex);
                        this._fontLine.swap(nextIndex, nextIndex, sourceIndex);
                        this._fontSize.swap(nextIndex, nextIndex, sourceIndex);
                        this._fontStyle.swap(nextIndex, nextIndex, sourceIndex);
                        this._fontWeight.swap(nextIndex, nextIndex, sourceIndex);
                        this._horizontalAlignment.swap(nextIndex, nextIndex, sourceIndex);
                        this._verticalAlignment.swap(nextIndex, nextIndex, sourceIndex);
                        this._wrap.swap(nextIndex, nextIndex, sourceIndex);
                        this._types.swap(nextIndex, nextIndex, sourceIndex);
                        this._formulas.swap(nextIndex, nextIndex, sourceIndex);
                        this._formats.swap(nextIndex, nextIndex, sourceIndex);
                        this._compiledFormulas.swap(nextIndex, nextIndex, sourceIndex);
                    }

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

        forEach: function(ref, callback) {
            var topLeft = this._grid.normalize(ref.topLeft);
            var bottomRight = this._grid.normalize(ref.bottomRight);

            for (var ci = topLeft.col; ci <= bottomRight.col; ci ++) {
                var startCellIndex = this._grid.index(topLeft.row, ci);
                var endCellIndex = this._grid.index(bottomRight.row, ci);

                var values = this._values.iterator(startCellIndex, endCellIndex);
                var types = this._types.iterator(startCellIndex, endCellIndex);
                var formulas = this._formulas.iterator(startCellIndex, endCellIndex);
                var formats = this._formats.iterator(startCellIndex, endCellIndex);


                var background = this._background.iterator(startCellIndex, endCellIndex);
                var borderBottom = this._borderBottom.iterator(startCellIndex, endCellIndex);
                var borderRight = this._borderRight.iterator(startCellIndex, endCellIndex);
                var fontColor = this._fontColor.iterator(startCellIndex, endCellIndex);
                var fontFamily = this._fontFamily.iterator(startCellIndex, endCellIndex);
                var fontLine = this._fontLine.iterator(startCellIndex, endCellIndex);
                var fontSize = this._fontSize.iterator(startCellIndex, endCellIndex);
                var fontStyle = this._fontStyle.iterator(startCellIndex, endCellIndex);
                var fontWeight = this._fontWeight.iterator(startCellIndex, endCellIndex);
                var horizontalAlignment = this._horizontalAlignment.iterator(startCellIndex, endCellIndex);
                var verticalAlignment = this._verticalAlignment.iterator(startCellIndex, endCellIndex);
                var wrap = this._wrap.iterator(startCellIndex, endCellIndex);

                for (var ri = topLeft.row; ri <= bottomRight.row; ri ++) {
                    var index = this._grid.index(ri, ci);

                    callback({
                        row: ri,
                        col: ci,
                        value: values.at(index),
                        type: types.at(index),
                        formula: formulas.at(index),
                        format: formats.at(index),
                        style: {
                            background: background.at(index),
                            borderBottom: borderBottom.at(index),
                            borderRight: borderRight.at(index),
                            fontColor: fontColor.at(index),
                            fontFamily: fontFamily.at(index),
                            fontLine: fontLine.at(index),
                            fontSize: fontSize.at(index),
                            fontStyle: fontStyle.at(index),
                            fontWeight: fontWeight.at(index),
                            horizontalAlignment: horizontalAlignment.at(index),
                            verticalAlignment: verticalAlignment.at(index),
                            wrap: wrap.at(index)
                        }
                    });
                }
            }
        },

        values: function(ref, values) {
            var topLeftRow = ref.topLeft.row;
            var topLeftCol = ref.topLeft.col;
            var bottomRightRow = ref.bottomRight.row;
            var bottomRightCol = ref.bottomRight.col;
            var ci, ri, index;

            if (values === undefined) {
                values = new Array(ref.height());

                for (var vi = 0; vi < values.length; vi++) {
                    values[vi] = new Array(ref.width());
                }

                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    var startCellIndex = this._grid.index(topLeftRow, ci);
                    var endCellIndex = this._grid.index(bottomRightRow, ci);

                    var iterator = this._values.iterator(startCellIndex, endCellIndex);

                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        index = this._grid.index(ri, ci);

                        values[ri - topLeftRow][ci - topLeftCol] = iterator.at(index);
                    }
                }

                return values;
            } else {
                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        index = this._grid.index(ri, ci);

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

            this.forEach(kendo.spreadsheet.SHEETREF, function(data) {
                var value = data.value;
                var formula = data.formula;
                var format = data.format;
                var background = data.style.background;
                var borderBottom = data.style.borderBottom;
                var borderRight = data.style.borderRight;
                var fontColor = data.style.fontColor;
                var fontFamily = data.style.fontFamily;
                var fontLine = data.style.fontLine;
                var fontSize = data.style.fontSize;
                var fontStyle = data.style.fontStyle;
                var fontWeight = data.style.fontWeight;
                var horizontalAlignment = data.style.horizontalAlignment;
                var verticalAlignment = data.style.verticalAlignment;
                var wrap = data.style.wrap;

                var hasBackground = background !== null;
                var hasBorderBottom = borderBottom !== null;
                var hasBorderRight = borderRight !== null;
                var hasFontColor = fontColor !== null;
                var hasFontFamily = fontFamily !== null;
                var hasFontLine = fontLine !== null;
                var hasFontSize = fontSize !== null;
                var hasFontStyle = fontStyle !== null;
                var hasFontWeight = fontWeight !== null;
                var hasHorizontalAlignment = horizontalAlignment !== null;
                var hasVerticalAlignment = verticalAlignment !== null;
                var hasWrap = wrap !== null;
                var hasValue = value !== null;
                var hasFormula = formula !== null;
                var hasFormat = format !== null;

                if (!hasValue && !hasFormula && !hasFormat &&
                    !hasBackground && !hasBorderBottom && !hasBorderRight &&
                    !hasFontColor && !hasFontFamily && !hasFontLine && !hasFontSize &&
                    !hasFontStyle && !hasFontWeight && !hasHorizontalAlignment &&
                    !hasVerticalAlignment && !hasWrap) {
                    return;
                }

                var position = positions[data.row];

                if (position === undefined) {
                    position = rows.length;

                    rows.push({ index: data.row });

                    positions[data.row] = position;
                }

                var row = rows[position];

                var cell = { index: data.col };

                if (hasValue) {
                    cell.value = value;
                }

                if (hasBackground) {
                    cell.background = background;
                }

                if (hasBorderBottom) {
                    cell.borderBottom = borderBottom;
                }

                if (hasBorderRight) {
                    cell.borderRight = borderRight;
                }

                if (hasFontColor) {
                    cell.fontColor = fontColor;
                }

                if (hasFontFamily) {
                    cell.fontFamily = fontFamily;
                }

                if (hasFontLine) {
                    cell.fontLine = fontLine;
                }

                if (hasFontSize) {
                    cell.fontSize = fontSize;
                }

                if (hasFontStyle) {
                    cell.fontStyle = fontStyle;
                }

                if (hasFontWeight) {
                    cell.fontWeight = fontWeight;
                }

                if (hasHorizontalAlignment) {
                    cell.horizontalAlignment = horizontalAlignment;
                }

                if (hasVerticalAlignment) {
                    cell.verticalAlignment = verticalAlignment;
                }

                if (hasWrap) {
                    cell.wrap = wrap;
                }

                if (hasFormula) {
                    cell.formula = formula;
                }

                if (hasFormat) {
                    cell.format = format;
                }

                if (row.cells === undefined) {
                    row.cells = [];
                }

                row.cells.push(cell);
            });

            var json = {
                rows: rows,
                columns: columns,
                mergedCells: this._mergedCells.map(function(ref) {
                    return ref.toString();
                })
            };

            if (this._sort) {
               json.sort = {
                   ref: this._sort.ref.toString(),
                   columns: this._sort.columns.map(function(column) {
                      return {
                          index: column.index,
                          ascending: column.ascending === undefined ? true : column.ascending
                      };
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

                                if (cell.value !== null) {
                                    this.range(rowIndex, columnIndex).value(cell.value, false);
                                }

                                if (cell.background) {
                                    this.range(rowIndex, columnIndex).background(cell.background);
                                }

                                if (cell.borderBottom) {
                                    this.range(rowIndex, columnIndex).borderBottom(cell.borderBottom);
                                }

                                if (cell.borderRight) {
                                    this.range(rowIndex, columnIndex).borderRight(cell.borderRight);
                                }

                                if (cell.fontColor) {
                                    this.range(rowIndex, columnIndex).fontColor(cell.fontColor);
                                }

                                if (cell.fontFamily) {
                                    this.range(rowIndex, columnIndex).fontFamily(cell.fontFamily);
                                }

                                if (cell.fontLine) {
                                    this.range(rowIndex, columnIndex).fontLine(cell.fontLine);
                                }

                                if (cell.fontSize) {
                                    this.range(rowIndex, columnIndex).fontSize(cell.fontSize);
                                }

                                if (cell.fontStyle) {
                                    this.range(rowIndex, columnIndex).fontStyle(cell.fontStyle);
                                }

                                if (cell.fontWeight) {
                                    this.range(rowIndex, columnIndex).fontWeight(cell.fontWeight);
                                }

                                if (cell.horizontalAlignment) {
                                    this.range(rowIndex, columnIndex).horizontalAlignment(cell.horizontalAlignment);
                                }

                                if (cell.verticalAlignment) {
                                    this.range(rowIndex, columnIndex).verticalAlignment(cell.verticalAlignment);
                                }

                                if (cell.wrap) {
                                    this.range(rowIndex, columnIndex).wrap(cell.wrap);
                                }

                                if (cell.formula !== null) {
                                    this.range(rowIndex, columnIndex).formula(cell.formula);
                                }

                                if (cell.format !== null) {
                                    this.range(rowIndex, columnIndex).format(cell.format);
                                }
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
            }.bind(this));
        },

        compiledFormula: function(ref) {
            var index = this._grid.cellRefIndex(ref);

            return this._compiledFormulas.value(index, index);
        },

        recalc: function(context) {
            var formulas = this._formulas.values();
            var compiledFormulas = [];

            formulas.forEach(function(formula) {
                for (var index = formula.start; index <= formula.end; index++) {
                    var cell = this._grid.cellRef(index);

                    var compiled = this._compiledFormulas.value(index, index);

                    if (compiled === null) {
                        var x = kendo.spreadsheet.calc.parse(this._name, cell.row, cell.col, formula.value);

                        compiled = kendo.spreadsheet.calc.compile(x);

                        this._compiledFormulas.value(index, index, compiled);
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

        value: function(row, col, value) {
            if (value instanceof kendo.spreadsheet.calc.runtime.Matrix) {
                value.each(function(value, row, col) {
                    this._setValue(row, col, value);
                }.bind(this));
            } else {
                this._setValue(row, col, value);
            }
        },

        _setValue: function(row, col, value) {
            var result = this._parse(row, col, value, false);
            var index = this._grid.index(row, col);
            this._values.value(index, index, result.value);
            this._types.value(index, index, result.type);
        },

        _parse: function(row, col, value, parseStrings) {
            var type = null;

            if (value !== null) {
                if (value instanceof Date) {
                    value = kendo.spreadsheet.calc.runtime.dateToSerial(value);
                    type = "date";
                } else {
                    type = typeof value;
                    if (type === "string" && parseStrings !== false) {
                        var parseResult = kendo.spreadsheet.calc.parse(this._name, row, col, value);
                        value = parseResult.value;
                        type = parseResult.type;
                    }
                }
            }

            return {
                type: type,
                value: value
            };
        },

        batch: function(callback, recalc) {
            var suspended = this.suspendChanges();

            this.suspendChanges(true);

            callback();

            return this.suspendChanges(suspended).triggerChange(recalc);
        },

        _sortBy: function(ref, columns) {
            var indices = null;

            this._sort = {
                ref: ref,
                columns: columns
            };

            columns.forEach(function(column) {
                var ascending = true;

                if (typeof column === "object") {
                    ascending = column.ascending !== false;
                    column = column.index;
                }

                if (typeof column === "number") {
                    ref = ref.toColumn(column);
                }

                indices = this._sorter.sortBy(ref, this._values, ascending, indices);
            }, this);

            this.triggerChange(true);
        }
    });

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
