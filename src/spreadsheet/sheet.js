(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Sheet(rows, columns, rowHeight, columnWidth, fixed) {
        this._columns = new kendo.spreadsheet.Axis(columns, columnWidth, fixed);
        this._rows = new kendo.spreadsheet.Axis(rows, rowHeight, fixed);

        var cellsCount = rows * columns - 1;

        this._values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, "");
        this._formulas = new kendo.spreadsheet.SparseRangeList(0, cellsCount, "");
        this._backgrounds = new kendo.spreadsheet.SparseRangeList(0, cellsCount, "beige");

        this._grid = new kendo.spreadsheet.Grid(rows, columns);
    }

    Sheet.prototype = {
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
            return new kendo.spreadsheet.Range(this, row, column, numRows, numColumns);
        }
    };

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
