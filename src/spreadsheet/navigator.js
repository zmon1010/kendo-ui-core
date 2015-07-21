(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var SheetNavigator = kendo.Class.extend({
        init: function(sheet, viewPortHeight) {
            this._sheet = sheet;
            this._viewPortHeight = viewPortHeight;
        },

        modifySelection: function(direction) {
            var sheet = this._sheet;
            var viewPortHeight = this._viewPortHeight;
            var selection = sheet.select();
            var activeCell = sheet.activeCell();
            var topLeft = selection.topLeft.clone();
            var bottomRight = selection.bottomRight.clone();

            var rows = sheet._grid._rows;
            var columns = sheet._grid._columns;

            var leftMode = activeCell.topLeft.col == topLeft.col;
            var topMode = activeCell.topLeft.row == topLeft.row;

            var scrollInto;

            switch (direction) {
                case "shrink-left":
                    bottomRight.col = columns.prevVisible(bottomRight.col);
                    scrollInto = bottomRight;
                    break;
                case "expand-left":
                    topLeft.col = columns.prevVisible(topLeft.col);
                    scrollInto = topLeft;
                    break;
                case "expand-right":
                    bottomRight.col = columns.nextVisible(bottomRight.col);
                    scrollInto = bottomRight;
                    break;
                case "shrink-right":
                    topLeft.col = columns.nextVisible(topLeft.col);
                    scrollInto = topLeft;
                    break;
                case "shrink-up":
                    bottomRight.row = rows.prevVisible(bottomRight.row);
                    scrollInto = bottomRight;
                    break;
                case "expand-up":
                    topLeft.row = rows.prevVisible(topLeft.row);
                    scrollInto = topLeft;
                    break;
                case "shrink-page-up":
                    bottomRight.row = rows.prevPage(bottomRight.row, viewPortHeight);
                    break;
                case "expand-page-up":
                    topLeft.row = rows.prevPage(topLeft.row, viewPortHeight);
                    break;
                case "expand-down":
                    bottomRight.row = rows.nextVisible(bottomRight.row);
                    scrollInto = bottomRight;
                    break;
                case "shrink-down":
                    topLeft.row = rows.nextVisible(topLeft.row);
                    scrollInto = topLeft;
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
