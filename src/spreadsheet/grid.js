(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var CellRef = kendo.spreadsheet.CellRef;

    var Rectangle = kendo.Class.extend({
        init: function(left, top, width, height) {
            this.left = left;
            this.width = width;
            this.right = left + width;

            this.top = top;
            this.height = height;
            this.bottom = top + height;
        }
    })

    var Grid = kendo.Class.extend({
        init: function(rows, columns, rowCount, columnCount) {
            this.rowCount = rowCount;
            this.columnCount = columnCount;
            this._columns = columns;
            this._rows = rows;
        },

        view: function(rectangle) {
            return {
                rows: this._rows.visible(rectangle.top, rectangle.bottom),
                columns: this._columns.visible(rectangle.left, rectangle.right)
            };
        },

        width: function(start, length) {
            return this._columns.sum(start, length);
        },

        height: function(start, length) {
            return this._rows.sum(start, length);
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
            return new Rectangle(
                this.width(0, ref.topLeft.col - 1),
                this.height(0, ref.topLeft.row - 1),
                this.width(ref.topLeft.col, ref.bottomRight.col),
                this.height(ref.topLeft.row, ref.bottomRight.row)
            );
        },

        forEachColumn: function(sample, max, callback) {
            var start = sample.topLeft.row;
            var end = sample.bottomRight.row;
            var lastColumn = this.cellRef(max).col;

            for (var ci = 0; ci <= lastColumn; ci++) {
                callback(ci * this.rowCount + start, ci * this.rowCount + end);
            }
        }
    });

    kendo.spreadsheet.Grid = Grid;
    kendo.spreadsheet.Rectangle = Rectangle;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
