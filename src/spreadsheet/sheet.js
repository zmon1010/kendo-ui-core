(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    function Sheet(rows, columns, rowHeight, columnWidth, fixed) {
        var cellsCount = rows * columns - 1;

        this._values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
        this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
        this._backgrounds = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
        this._mergedCells = [];
        this._grid = new kendo.spreadsheet.Grid(rows, columns, rowHeight, columnWidth, fixed);
    }

    Sheet.prototype = {
        name: function(value) {
            if (!value) {
                return this._name;
            }
            else {
                this._name = value;
            }
        },

        columnWidth: function(columnIndex, width) {
            return this._grid.columnWidth(columnIndex, width);
        },

        rowHeight: function(rowIndex, height) {
            return this._grid.rowHeight(rowIndex, height);
        },

        range: function(row, column, numRows, numColumns) {
            if (!numRows) {
                numRows = 1;
            }

            if (!numColumns) {
                numColumns = 1;
            }

            return new kendo.spreadsheet.Range(new RangeRef(new CellRef(row, column), new CellRef(row + numRows - 1, column + numColumns - 1)), this);
        }
    };

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
