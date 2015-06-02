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
    });

    var Grid = kendo.Class.extend({
        init: function(rows, columns, rowCount, columnCount) {
            this.rowCount = rowCount;
            this.columnCount = columnCount;
            this._columns = columns;
            this._rows = rows;
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

        cellRef: function(index) {
            return new CellRef(index % this.rowCount, (index / this.rowCount) >> 0);
        },

        cellRefIndex: function(ref) {
            return this.index(ref.row, ref.col);
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
        },

        pane: function(options) {
            return new PaneGrid(
                new kendo.spreadsheet.PaneAxis(this._rows, options.row, options.rowCount),
                new kendo.spreadsheet.PaneAxis(this._columns, options.column, options.columnCount),
                this
            );
        }
    });

    var PaneGrid = kendo.Class.extend({
        init: function(rows, columns, grid) {
            this._rows = rows;
            this._columns = columns;
            this._grid = grid;
        },

        index: function(row, column) {
            return this._grid.index(row, column);
        },

        rectangle: function(width, height) {
            var columns = this._columns.range(width);
            var rows = this._rows.range(height);

            return new Rectangle(columns.start, rows.start, columns.end, rows.end);
        },

        width: function(start, end) {
            return this._columns.size(start, end);
        },

        height: function(start, end) {
            return this._rows.size(start, end);
        },

        boundingRectangle: function(ref) {
            return this._grid.rectangle(ref);
        },

        cellRefIndex: function(ref) {
            return this._grid.cellRefIndex(ref);
        },

        translate: function(rectangle, left, top) {
            var top = this._rows.translate(rectangle.top, top);
            var left = this._columns.translate(rectangle.left, left);

            return new kendo.spreadsheet.Rectangle(left, top, rectangle.width, rectangle.height);
        },

        adjustHorizontal: function(value) {
            return this._columns.normalize(value);
        },

        adjustVertical: function(value) {
            return this._rows.normalize(value);
        },

        visible: function(rectangle) {
            return {
                rows: this._rows.visible(rectangle.top, rectangle.bottom),
                columns: this._columns.visible(rectangle.left, rectangle.right)
            };
        }
    });

    kendo.spreadsheet.Grid = Grid;
    kendo.spreadsheet.PaneGrid = PaneGrid;
    kendo.spreadsheet.Rectangle = Rectangle;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
