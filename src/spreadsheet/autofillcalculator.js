(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var AutoFillCalculator = kendo.Class.extend({
        init: function(grid) {
            this._grid = grid;
        },

        rectIsVertical: function(start, end, x, y) {
            var startRect = this._grid.rectangle(start.toRangeRef());
            var endRect = this._grid.rectangle(end.toRangeRef());
            return Math.abs(endRect[y] - startRect[y]) > Math.abs(startRect[x] - endRect[x]);
        },

        autoFillDest: function(selection, cursor) {
            var topLeft = selection.topLeft;
            var bottomRight = selection.bottomRight;

            var quadrant;
            var lower = cursor.row >= topLeft.row;
            var further = cursor.col >= topLeft.col;

            if (lower) {
                quadrant = further ? 4 : 3;
            } else {
                quadrant = further ? 2 : 1;
            }

            var pivot, opposite, cornerResult, expanding;

            if (quadrant === 4) {
                pivot = topLeft;
                opposite = bottomRight;

                expanding = cursor.row > opposite.row || cursor.col > opposite.col;

                if (expanding) {
                    cursor = new CellRef(Math.max(cursor.row, opposite.row), Math.max(cursor.col, opposite.col));
                }

                if (this.rectIsVertical(opposite, cursor, 'right', 'bottom')) { // vertical
                    cornerResult = new CellRef(cursor.row, opposite.col);
                } else {
                    cornerResult = new CellRef(opposite.row, cursor.col);
                }
            } else if (quadrant === 3) {
                var bottomLeft = new CellRef(topLeft.col, bottomRight.row);

                if (cursor.row > bottomRight.row && this.rectIsVertical(bottomLeft, cursor, 'left', 'bottom')) { // vertical
                    pivot = topLeft;
                    cornerResult = new CellRef(cursor.row, bottomRight.col);
                } else {
                    pivot = bottomRight;
                    cornerResult = new CellRef(topLeft.row, cursor.col);
                }
            } else if (quadrant === 2){
                var topRight = new CellRef(topLeft.row, bottomRight.col);

                if (cursor.col > bottomRight.col && !this.rectIsVertical(topRight, cursor, 'right', 'top')) { // horizontal
                    pivot = topLeft;
                    cornerResult = new CellRef(bottomRight.row, cursor.col);
                } else {
                    pivot = bottomRight;
                    cornerResult = new CellRef(cursor.row, topLeft.col);
                }
            } else {
                pivot = bottomRight;
                if (this.rectIsVertical(topLeft, cursor, 'left', 'top')) { // horizontal
                    cornerResult = new CellRef(cursor.row, topLeft.col);
                } else {
                    cornerResult = new CellRef(topLeft.row, cursor.col);
                }
            }

            return this._grid.normalize(new RangeRef(pivot, cornerResult));
        }
    });

    kendo.spreadsheet.AutoFillCalculator = AutoFillCalculator;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
