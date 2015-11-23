(function(f, define){
    define([ "../kendo.drawing", "./sheet", "./range", "./references" ], f);
})(function(){

    "use strict";

    var SHEETREF = kendo.spreadsheet.SHEETREF;
    var CellRef = kendo.spreadsheet.CellRef;

    /* jshint eqnull:true, laxbreak:true, shadow:true, -W054 */
    /* jshint latedef: nofunc */

    function getMergedCells(sheet, range) {
        var grid = sheet._grid;
        var primary = {};
        var secondary = {};

        sheet.forEachMergedCell(range, function(ref) {
            var topLeft = ref.topLeft;
            grid.forEach(ref, function(cellRef) {
                if (topLeft.eq(cellRef)) {
                    primary[cellRef.print()] = ref;
                } else {
                    secondary[cellRef.print()] = true;
                }
            });
        });

        return { primary: primary, secondary: secondary };
    }

    function makeCellLayout(sheet, range) {
        var mergedCells = getMergedCells(sheet, range);
        var currentY = 0;
        var currentX = 0;
        var prevWidth = 0;
        var topRow = null;
        var cells = [];
        sheet.forEach(range, function(row, col, cell){
            if (sheet.isHiddenColumn(col)) {
                return;
            }
            var id = new CellRef(row, col).print();
            var isSecondary = mergedCells.secondary[id];
            if (!isSecondary && shouldDrawCell(row, cell)) {
                cells.push(cell);
            }
            if (topRow == null) {
                topRow = row;
            }
            if (row == topRow) {
                currentY = 0;
                currentX += prevWidth;
            }

            prevWidth = cell.width = sheet.columnWidth(col);
            var height = cell.height = sheet.rowHeight(row);
            var m = mergedCells.primary[id];
            if (m) {
                var rowspan = m.height();
                var colspan = m.width();
                for (var i = 1; i < colspan; ++i) {
                    cell.width += sheet.columnWidth(col + i);
                }
                for (var i = 1; i < rowspan; ++i) {
                    cell.height += sheet.rowHeight(row + i);
                }
            }

            cell.left = currentX;
            cell.top = currentY;
            currentY += height;
        });

        function shouldDrawCell(row, cell) {
            return !sheet.isHiddenRow(row)  &&
                (cell.value != null         ||
                 cell.background != null    ||
                 cell.borderTop != null     ||
                 cell.borderRight != null   ||
                 cell.borderBottom != null  ||
                 cell.borderLeft != null);
        }

        return cells;
    }

    kendo.spreadsheet.Sheet.prototype.print = function() {
        var cells = makeCellLayout(this, SHEETREF, 800, 600);
        console.log(cells);
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
