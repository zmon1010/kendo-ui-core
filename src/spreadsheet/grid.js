(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;

    var Rectangle = kendo.Class.extend({
        init: function(left, top, width, height) {
            this.left = left;
            this.width = width;
            this.right = left + width;

            this.top = top;
            this.height = height;
            this.bottom = top + height;
        },

        translate: function(left, top) {
            return new Rectangle(left, top, this.width, this.height);
        }
    });

    var Grid = kendo.Class.extend({
        init: function(rows, columns, rowCount, columnCount, headerHeight, headerWidth) {
            this.rowCount = rowCount;
            this.columnCount = columnCount;
            this._columns = columns;
            this._rows = rows;
            this._headerHeight = headerHeight;
            this._headerWidth = headerWidth;
        },

        width: function(start, end) {
            return this._columns.sum(start, end);
        },

        height: function(start, end) {
            return this._rows.sum(start, end);
        },

        totalHeight: function() {
            return this._rows.total + this._headerHeight;
        },

        totalWidth: function() {
            return this._columns.total + this._headerWidth;
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
                this._headerHeight,
                this._headerWidth,
                this
            );
        }
    });

    var PaneGrid = kendo.Class.extend({
        init: function(rows, columns, headerHeight, headerWidth, grid) {
            this.rows = rows;
            this.columns = columns;
            this._grid = grid;
            this.headerHeight = headerHeight;
            this.headerWidth = headerWidth;

            this.hasRowHeader = columns.hasHeader;
            this.hasColumnHeader = rows.hasHeader;

            this.columnOffset = this.hasRowHeader ? headerWidth : 0;
            this.rowOffset = this.hasColumnHeader ? headerHeight : 0;
        },

        refresh: function(width, height) {
            this._rectangle = this.rectangle(width, height);

            if (!this.hasRowHeader) {
                this._rectangle.left += this.headerWidth;
                this._rectangle.right -= this.headerWidth;
                this._rectangle.width -= this.headerWidth;
            } else {
                this._rectangle.right += this.headerWidth;
                this._rectangle.width += this.headerWidth;
            }

            if (!this.hasColumnHeader) {
                this._rectangle.top += this.headerHeight;
                this._rectangle.bottom -= this.headerHeight;
                this._rectangle.height -= this.headerHeight;
            } else {
                this._rectangle.bottom += this.headerHeight;
                this._rectangle.height += this.headerHeight;
            }

            this.style = {
                height: this._rectangle.height + "px",
                top: this._rectangle.top  + "px",
                width: this._rectangle.width + "px",
                left: this._rectangle.left + "px"
            };
        },

        index: function(row, column) {
            return this._grid.index(row, column);
        },

        rectangle: function(width, height) {
            var columns = this.columns.range(width);
            var rows = this.rows.range(height);

            return new Rectangle(columns.start, rows.start, columns.end, rows.end);
        },

        boundingRectangle: function(ref) {
            return this._grid.rectangle(ref);
        },

        cellRefIndex: function(ref) {
            return this._grid.cellRefIndex(ref);
        },

        translate: function(left, top) {
            var rectangle = this._rectangle.translate(this.columns.translate(this._rectangle.left, left), this.rows.translate(this._rectangle.top, top));

            if (!this.hasRowHeader) {
                rectangle.left -= this.headerWidth;
            }

            rectangle.width -= this.headerWidth;
            rectangle.right -= this.headerWidth;

            if (!this.hasColumnHeader) {
                rectangle.top -= this.headerHeight;
            }

            rectangle.height -= this.headerHeight;
            rectangle.bottom -= this.headerHeight;

            return rectangle;
        },

        visible: function(rectangle) {
            var rows = this.rows.visible(rectangle.top, rectangle.bottom);
            var columns = this.columns.visible(rectangle.left, rectangle.right);

            return {
                rows: rows,
                columns: columns,
                ref: new RangeRef(new CellRef(rows.values.start, columns.values.start), new CellRef(rows.values.end, columns.values.end))
            };
        }
    });

    kendo.spreadsheet.Grid = Grid;
    kendo.spreadsheet.PaneGrid = PaneGrid;
    kendo.spreadsheet.Rectangle = Rectangle;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
