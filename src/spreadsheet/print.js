(function(f, define){
    define([ "../kendo.drawing", "./sheet", "./range", "./references", "./numformat" ], f);
})(function(){

    "use strict";

    var spreadsheet = kendo.spreadsheet;
    var SHEETREF = spreadsheet.SHEETREF;
    var CellRef = spreadsheet.CellRef;
    var drawing = kendo.drawing;
    var formatting = spreadsheet.formatting;
    var geo = kendo.geometry;

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
        var boxWidth = 0, boxHeight = 0;
        sheet.forEach(range, function(row, col, cell){
            if (sheet.isHiddenColumn(col)) {
                return;
            }
            var id = new CellRef(row, col).print();
            var isSecondary = mergedCells.secondary[id];
            var isVisible = !isSecondary && shouldDrawCell(row, cell);
            if (isVisible) {
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

            if (isVisible) {
                cell.left = currentX;
                cell.top = currentY;
                cell.right = currentX + cell.width;
                cell.bottom = currentY + cell.height;
                boxWidth = Math.max(boxWidth, cell.right);
                boxHeight = Math.max(boxHeight, cell.bottom);
            }
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

        return {
            width  : boxWidth,
            height : boxHeight,
            cells  : cells.sort(normalOrder)
        };
    }

    function normalOrder(a, b) {
        if (a.top < b.top) {
            return -1;
        } else if (a.top == b.top) {
            if (a.left < b.left) {
                return -1;
            } else if (a.left == b.left) {
                return 0;
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    }

    function drawLayout(layout, group, options) {
        // options:
        // - pageWidth
        // - pageHeight
        // - fitWidth?
        // - center?
        var ncols = Math.ceil(layout.width / options.pageWidth);
        var nrows = Math.ceil(layout.height / options.pageHeight);

        for (var i = 0; i < ncols; ++i) {
            for (var j = 0; j < nrows; ++j) {
                addPage(j, i);
            }
        }

        function addPage(row, col) {
            var left = col * options.pageWidth;
            var right = left + options.pageWidth;
            var top = row * options.pageHeight;
            var bottom = top + options.pageHeight;
            var cells = layout.cells.filter(function(cell){
                return !(cell.right <= left || cell.left > right ||
                         cell.bottom <= top || cell.top > bottom);
            });
            if (cells.length > 0) {
                var page = new drawing.Group();
                group.append(page);
                page.clip(drawing.Path.fromRect(
                    new geo.Rect([ 0, 0 ],
                                 [ options.pageWidth, options.pageHeight ])));
                var content = new drawing.Group();
                page.append(content);
                content.transform(geo.Matrix.translate(-left, -top));
                cells.forEach(function(cell){
                    drawCell(cell, content);
                });
            }
        }
    }

    function drawCell(cell, group) {
        var g = new drawing.Group();
        group.append(g);
        var rect = new geo.Rect([ cell.left, cell.top ],
                                [ cell.width, cell.height ]);
        if (cell.background) {
            g.append(
                new drawing.Rect(rect)
                    .fill(cell.background)
                    .stroke(null)
            );
        }
        g.append(new drawing.Rect(rect, { stroke: { width: 0.01, color: "#888" } }));
        if (cell.borderLeft) {
            g.append(
                new drawing.Path({ stroke: cell.borderLeft })
                    .moveTo(cell.left, cell.top)
                    .lineTo(cell.left, cell.bottom)
                    .close()
            );
        }
        if (cell.borderTop) {
            g.append(
                new drawing.Path({ stroke: cell.borderTop })
                    .moveTo(cell.left, cell.top)
                    .lineTo(cell.right, cell.top)
                    .close()
            );
        }
        if (cell.borderRight) {
            g.append(
                new drawing.Path({ stroke: cell.borderRight })
                    .moveTo(cell.right, cell.top)
                    .lineTo(cell.right, cell.bottom)
                    .close()
            );
        }
        if (cell.borderBottom) {
            g.append(
                new drawing.Path({ stroke: cell.borderBottom })
                    .moveTo(cell.left, cell.bottom)
                    .lineTo(cell.right, cell.bottom)
                    .close()
            );
        }
        var val = cell.value;
        if (val != null) {
            var clip = new drawing.Group();
            clip.clip(drawing.Path.fromRect(rect));
            g.append(clip);
            var f;
            if (cell.format) {
                f = formatting.textAndColor(val, cell.format);
                val = f.text;
            } else {
                val += "";
            }
            // XXX: missing alignment and wrapping
            var tmp = new drawing.Text(val, [ cell.left + 2, cell.top + 2 ]);
            if (f && f.color) {
                tmp.fill(f.color);
            }
            clip.append(tmp);
        }
    }

    spreadsheet.Sheet.prototype.draw = function(range, options, callback) {
        var layout = makeCellLayout(this, this._ref(range), 800, 600);
        var group = new drawing.Group();
        var paper = kendo.pdf.getPaperOptions(options);
        group.options.set("pdf", {
            multiPage : true,
            paperSize : paper.paperSize,
            margin    : paper.margin
        });
        var pageWidth = paper.paperSize[0];
        var pageHeight = paper.paperSize[1];
        if (paper.margin) {
            pageWidth -= paper.margin.left + paper.margin.right;
            pageHeight -= paper.margin.top + paper.margin.bottom;
        }
        drawLayout(layout, group, {
            pageWidth: pageWidth,
            pageHeight: pageHeight
        });
        callback(group);
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
