(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var CellRef = kendo.spreadsheet.CellRef;

    function Grid(rowCount, columnCount, rowHeight, columnWidth, fixed) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this._columns = new kendo.spreadsheet.Axis(columnCount, columnWidth, fixed);
        this._rows = new kendo.spreadsheet.Axis(rowCount, rowHeight, fixed);
    }

    Grid.prototype = {
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

        index: function(row, column) {
            return column * this.rowCount + row;
        },

        cellRefIndex: function(ref) {
            return this.index(ref.row, ref.col);
        },

        cellRef: function(index) {
            return new CellRef(index % this.rowCount, (index / this.rowCount) >> 0);
        },

        normalize: function(cellRef) {
            var clone = cellRef.clone();
            clone.col = Math.max(0, Math.min(this.columnCount - 1, cellRef.col));
            clone.row = Math.max(0, Math.min(this.rowCount - 1, cellRef.row));
            return clone;
        },

        rectangle: function(ref) {
            return {
                x: this._columns.sum(0, ref.topLeft.col - 1),
                y: this._rows.sum(0, ref.topLeft.row - 1),
                width: this._columns.sum(ref.topLeft.col, ref.bottomRight.col),
                height: this._rows.sum(ref.topLeft.row, ref.bottomRight.row)
            };
        },

        forEachColumn: function(sample, max, callback) {
            var start = sample.topLeft.row;
            var end = sample.bottomRight.row;
            var lastColumn = this.cellRef(max).col;

            for (var ci = 0; ci <= lastColumn; ci++) {
                callback(ci * this.rowCount + start, ci * this.rowCount + end);
            }
        }
    };

    kendo.spreadsheet.Grid = Grid;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
