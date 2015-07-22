(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var EdgeNavigator = kendo.Class.extend({
        init: function(field, axis, rangeGetter, union) {
            this.rangeGetter = rangeGetter;

            this.prevLeft = function(index) {
                var current = union(this.range(index));
                var range = this.range(axis.prevVisible(current.topLeft[field]));
                return union(range).topLeft[field];
            };

            this.nextRight = function(index) {
                var current = union(this.range(index));
                var range = this.range(axis.nextVisible(current.bottomRight[field]));
                return union(range).bottomRight[field];
            };

            // these two don't look like the other ones, as they "shrink"
            this.nextLeft = function(index) {
                var range = union(this.range(index));
                return axis.nextVisible(range.bottomRight[field]);
            };

            this.prevRight = function(index) {
                var range = union(this.range(index));
                return axis.prevVisible(range.topLeft[field]);
            };
        },

        boundary: function(top, bottom) {
            this.top = top;
            this.bottom = bottom;
        },

        range: function(index) {
            return this.rangeGetter(index, this.top, this.bottom);
        }
    });

    var SheetNavigator = kendo.Class.extend({
        init: function(sheet, viewPortHeight) {
            this._sheet = sheet;
            this.columns = this._sheet._grid._columns;
            this._viewPortHeight = viewPortHeight;

            this.colEdge = new EdgeNavigator("col", this._sheet._grid._columns, this.columnRange.bind(this), this.union.bind(this));
            this.rowEdge = new EdgeNavigator("row", this._sheet._grid._rows, this.rowRange.bind(this), this.union.bind(this));
        },

        union: function(ref) {
            return this._sheet.unionWithMerged(ref);
        },

        columnRange: function(col, topRow, bottomRow) {
            return this._sheet._ref(topRow, col, bottomRow - topRow, 1);
        },

        rowRange: function(row, leftCol, rightCol) {
            return this._sheet._ref(row, leftCol, 1, rightCol - leftCol);
        },

        modifySelection: function(direction) {
            var sheet = this._sheet;
            var viewPortHeight = this._viewPortHeight;
            var rows = sheet._grid._rows;
            var columns = sheet._grid._columns;

            var originalSelection = sheet.originalSelect();
            var selection = sheet.select();
            var activeCell = sheet.activeCell();

            var topLeft = originalSelection.topLeft.clone();
            var bottomRight = originalSelection.bottomRight.clone();

            var scrollInto;

            this.colEdge.boundary(selection.topLeft.row, selection.bottomRight.row);
            this.rowEdge.boundary(selection.topLeft.col, selection.bottomRight.col);

            switch (direction) {
                case "expand-left": // <| |
                    topLeft.col = this.colEdge.prevLeft(topLeft.col);
                    scrollInto = topLeft;
                    break;
                case "shrink-right": // |>|
                    topLeft.col = this.colEdge.nextLeft(topLeft.col);
                    scrollInto = topLeft;
                    break;
                case "expand-right": // | |>
                    bottomRight.col = this.colEdge.nextRight(bottomRight.col);
                    scrollInto = bottomRight;
                    break;
                case "shrink-left": // |<|
                    bottomRight.col = this.colEdge.prevRight(bottomRight.col);
                    scrollInto = bottomRight;
                    break;

                // four actions below mirror the upper ones, on the vertical axis
                case "expand-up":
                    topLeft.row = this.rowEdge.prevLeft(topLeft.row);
                    scrollInto = topLeft;
                    break;
                case "shrink-down":
                    topLeft.row = this.rowEdge.nextLeft(topLeft.row);
                    scrollInto = topLeft;
                    break;
                case "expand-down":
                    bottomRight.row = this.rowEdge.nextRight(bottomRight.row);
                    scrollInto = bottomRight;
                    break;
                case "shrink-up":
                    bottomRight.row = this.rowEdge.prevRight(bottomRight.row);
                    scrollInto = bottomRight;
                    break;

                // pageup/down - may need improvement
                case "expand-page-up":
                    topLeft.row = rows.prevPage(topLeft.row, viewPortHeight);
                    break;
                case "shrink-page-up":
                    bottomRight.row = rows.prevPage(bottomRight.row, viewPortHeight);
                    break;
                case "expand-page-down":
                    bottomRight.row = rows.nextPage(bottomRight.row, viewPortHeight);
                    break;
                case "shrink-page-down":
                    topLeft.row = rows.nextPage(topLeft.row, viewPortHeight);
                    break;

                case "first-col":
                    topLeft.col = columns.firstVisible();
                    bottomRight.col = activeCell.bottomRight.col;
                    scrollInto = topLeft;
                    break;
                case "last-col":
                    bottomRight.col = columns.lastVisible();
                    topLeft.col = activeCell.topLeft.col;
                    scrollInto = bottomRight;
                    break;
                case "first-row":
                    topLeft.row = rows.firstVisible();
                    bottomRight.row = activeCell.bottomRight.row;
                    scrollInto = topLeft;
                    break;
                case "last-row":
                    bottomRight.col = rows.lastVisible();
                    topLeft.row = activeCell.topLeft.row;
                    scrollInto = bottomRight;
                    break;
                case "last":
                    bottomRight.row = rows.lastVisible();
                    bottomRight.col = columns.lastVisible();
                    topLeft = activeCell.topLeft;
                    scrollInto = bottomRight;
                    break;
                case "first":
                    topLeft.row = rows.firstVisible();
                    topLeft.col = columns.firstVisible();
                    bottomRight = activeCell.bottomRight;
                    scrollInto = topLeft;
                    break;
            }

            if (scrollInto) {
                sheet.focus(scrollInto);
            }

            sheet.select(new RangeRef(topLeft, bottomRight), false);
        },

        moveActiveCell: function(direction) {
            var sheet = this._sheet;
            var activeCell = sheet.activeCell();
            var topLeft = activeCell.topLeft;
            var bottomRight = activeCell.bottomRight;

            var cell = sheet.originalActiveCell();
            var rows = sheet._grid._rows;
            var columns = sheet._grid._columns;

            var row = cell.row;
            var column = cell.col;

            switch (direction) {
                case "left":
                    column = columns.prevVisible(topLeft.col);
                    break;
                case "up":
                    row = rows.prevVisible(topLeft.row);
                    break;
                case "right":
                    column = columns.nextVisible(bottomRight.col);
                    break;
                case "down":
                    row = rows.nextVisible(bottomRight.row);
                    break;
                case "first-col":
                    column = columns.firstVisible();
                    break;
                case "last-col":
                    column = columns.lastVisible();
                    break;
                case "first-row":
                    row = rows.firstVisible();
                    break;
                case "last-row":
                    row = rows.lastVisible();
                    break;
                case "last":
                    row = rows.lastVisible();
                    column = columns.lastVisible();
                    break;
                case "first":
                    row = rows.firstVisible();
                    column = columns.firstVisible();
                    break;
                case "next-page":
                    row = rows.nextPage(bottomRight.row, this._viewPortHeight);
                    break;
                case "prev-page":
                    row = rows.prevPage(bottomRight.row, this._viewPortHeight);
                    break;
            }

            sheet.select(new CellRef(row, column));
        }
    });

    kendo.spreadsheet.SheetNavigator = SheetNavigator;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
