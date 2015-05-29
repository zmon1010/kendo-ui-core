(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var Range = kendo.spreadsheet.Range;

    var Sheet = kendo.Class.extend({
        init: function(rowCount, columnCount, rowHeight, columnWidth) {
            var cellsCount = rowCount * columnCount - 1;

            this._values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._backgrounds = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
            this._rows = new kendo.spreadsheet.Axis(rowCount, rowHeight);
            this._columns = new kendo.spreadsheet.Axis(columnCount, columnWidth);
            this._mergedCells = [];
            this._frozenRows = 0;
            this._frozenColumns = 0;

            this._grid = new kendo.spreadsheet.Grid(this._rows, this._columns, rowCount, columnCount);
        },

        name: function(value) {
            if (!value) {
                return this._name;
            }

            this._name = value;

            return this;
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

        range: function(row, column, numRows, numColumns) {
            if (!numRows) {
                numRows = 1;
            }

            if (!numColumns) {
                numColumns = 1;
            }

            return new Range(new RangeRef(new CellRef(row, column), new CellRef(row + numRows - 1, column + numColumns - 1)), this);
        }
    });

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
