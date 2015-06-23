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

        offset: function(left, top) {
            return new Rectangle(this.left + left, this.top + top, this.width, this.height);
        },

        toDiv: function(className) {
            return kendo.dom.element("div", {
                className: className,
                style: {
                    width:  this.width + "px",
                    height: this.height + "px",
                    top:    this.top + "px",
                    left:   this.left + "px"
                }
            });
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
            var topLeft = this.normalize(ref.topLeft);
            var bottomRight = this.normalize(ref.bottomRight);
            return new Rectangle(
                this.width(0, topLeft.col - 1),
                this.height(0, topLeft.row - 1),
                this.width(topLeft.col, bottomRight.col),
                this.height(topLeft.row, bottomRight.row)
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
                new kendo.spreadsheet.PaneAxis(this._rows, options.row, options.rowCount, this._headerHeight),
                new kendo.spreadsheet.PaneAxis(this._columns, options.column, options.columnCount, this._headerWidth),
                this
            );
        }
    });

    var PaneGrid = kendo.Class.extend({
        init: function(rows, columns, grid) {
            this.rows = rows;
            this.columns = columns;
            this._grid = grid;

            this.headerHeight = rows.headerSize;
            this.headerWidth = columns.headerSize;
            this.hasRowHeader = columns.hasHeader;
            this.hasColumnHeader = rows.hasHeader;
        },

        refresh: function(width, height) {
            this.columns.viewSize(width);
            this.rows.viewSize(height);

            var x = this.columns.paneSegment();
            var y = this.rows.paneSegment();

            this.style = {
                top: y.offset  + "px",
                left: x.offset + "px",
                height: y.length + "px",
                width: x.length + "px"
            };
        },

        view: function(left, top) {
            var rows = this.rows.visible(top);
            var columns = this.columns.visible(left);

            return {
                rows: rows,
                columns: columns,

                rowOffset: rows.offset,
                columnOffset: columns.offset,

                mergedCellLeft: columns.start,
                mergedCellTop: rows.start,

                ref: new RangeRef(new CellRef(rows.values.start, columns.values.start), new CellRef(rows.values.end, columns.values.end))
            };
        },

        index: function(row, column) {
            return this._grid.index(row, column);
        },

        boundingRectangle: function(ref) {
            return this._grid.rectangle(ref);
        },

        cellRefIndex: function(ref) {
            return this._grid.cellRefIndex(ref);
        }
    });

    kendo.spreadsheet.Grid = Grid;
    kendo.spreadsheet.PaneGrid = PaneGrid;
    kendo.spreadsheet.Rectangle = Rectangle;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
