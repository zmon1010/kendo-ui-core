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

        _copyRange: function(sourceRangeRef, targetRef) {
            var grid = this._grid;
            var rowCount = grid.rowCount;

            var nextRefTopLeft = grid.normalize(sourceRangeRef.topLeft);
            var nextRefBottomRight = grid.normalize(sourceRangeRef.bottomRight);

            var nextIndex = nextRefTopLeft.col * rowCount + nextRefTopLeft.row;
            var nextBottomIndex = nextRefBottomRight.col * rowCount + nextRefBottomRight.row;

            var targetIndex = targetRef.col * rowCount + targetRef.row;

            this._background.copy(nextIndex, nextBottomIndex, targetIndex);
            this._values.copy(nextIndex, nextBottomIndex, targetIndex);
            this._borderBottom.copy(nextIndex, nextBottomIndex, targetIndex);
            this._borderRight.copy(nextIndex, nextBottomIndex, targetIndex);
            this._fontColor.copy(nextIndex, nextBottomIndex, targetIndex);
            this._fontFamily.copy(nextIndex, nextBottomIndex, targetIndex);
            this._fontLine.copy(nextIndex, nextBottomIndex, targetIndex);
            this._fontSize.copy(nextIndex, nextBottomIndex, targetIndex);
            this._fontStyle.copy(nextIndex, nextBottomIndex, targetIndex);
            this._fontWeight.copy(nextIndex, nextBottomIndex, targetIndex);
            this._horizontalAlignment.copy(nextIndex, nextBottomIndex, targetIndex);
            this._verticalAlignment.copy(nextIndex, nextBottomIndex, targetIndex);
            this._wrap.copy(nextIndex, nextBottomIndex, targetIndex);
            this._types.copy(nextIndex, nextBottomIndex, targetIndex);
            this._formulas.copy(nextIndex, nextBottomIndex, targetIndex);
            this._formats.copy(nextIndex, nextBottomIndex, targetIndex);
            this._compiledFormulas.copy(nextIndex, nextBottomIndex, targetIndex);
        },

        insertRow: function(rowIndex) {

            this.batch(function() {

                var grid = this._grid;
                var columnCount = grid.columnCount;
                var rowCount = grid.rowCount;

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

        _copyColumn: function(ref, fromNextColumn) {
            var grid = this._grid;
            var rowCount = grid.rowCount;
        },

        insertColumn: function(columnIndex) {

            this.batch(function() {
                var grid = this._grid;
                var columnCount = grid.columnCount;
                var rowCount = grid.rowCount;

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
            var ci, ri;

            if (values === undefined) {
                values = new Array(ref.height());

                for (var vi = 0; vi < values.length; vi++) {
                    values[vi] = new Array(ref.width());
                }

                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        values[ri - topLeftRow][ci - topLeftCol] = this._getValue(ri, ci);
                    }
                }

                return values;
            } else {
                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        var row = values[ri - topLeftRow];

                        if (row) {
                            var value = row[ci - topLeftCol];

                            if (value !== undefined) {
                                this._setValue(ri, ci, value);
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
                    this._setValue(row, col, value, false);
                }.bind(this));
            } else {
                this._setValue(row, col, value, false);
            }
        },

        _setValue: function(row, col, value, parseStrings) {
            var result = Sheet.parse(value, parseStrings);
            var index = this._grid.index(row, col);

            if (result.type === "date") {
                this._formats.value(index, index, toExcelFormat(kendo.culture().calendar.patterns.d));
            }

            this._values.value(index, index, result.value);
            this._types.value(index, index, result.type);
        },
        _getValue: function(row, col) {
            var index = this._grid.index(row, col);

            var type = this._types.value(index, index);

            var value = this._values.value(index, index);

            if (type === "date") {
                value = kendo.spreadsheet.calc.runtime.serialToDate(value);
            }

            return value;
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

                indices = this._sorter.sortBy(ref.toColumn(column.index), this._values, column.ascending, indices);
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

                    var values = this._values.iterator(this._grid.cellRefIndex(columnRef.topLeft),
                        this._grid.cellRefIndex(columnRef.bottomRight));

                    values.forEach(function(value, index) {
                        var row = this._grid.cellRef(index).row;

                        if (column.filter.matches(value) === false) {
                            this.hideRow(row);
                        } else {
                            this.unhideRow(row);
                        }
                    }.bind(this));
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

    function toExcelFormat(format) {
        return format.replace(/M/g, "m").replace(/'/g, '"').replace(/tt/, "am/pm");
    }

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
