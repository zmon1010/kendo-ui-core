(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    function Sheet(rows, columns, rowHeight, columnWidth, fixed) {
        this._columns = new kendo.spreadsheet.Axis(columns, columnWidth, fixed);
        this._rows = new kendo.spreadsheet.Axis(rows, rowHeight, fixed);

        var cellsCount = rows * columns - 1;

        this._values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
        this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);
        this._backgrounds = new kendo.spreadsheet.SparseRangeList(0, cellsCount, null);

        this._grid = new kendo.spreadsheet.Grid(rows, columns);
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

        view: function(rectangle) {
            return {
                rows: this._rows.visible(rectangle.top, rectangle.bottom),
                columns: this._columns.visible(rectangle.left, rectangle.right)
            };
        },
        columnWidth: function(columnIndex, width) {
            return this._columns.value(columnIndex, columnIndex, width);
        },
        rowHeight: function(rowIndex, height) {
            return this._rows.value(rowIndex, rowIndex, height);
        },
        totalHeight: function() {
            return this._rows.total;
        },
        totalWidth: function() {
            return this._columns.total;
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
