(function(f, define){
    define([ "../kendo.drawing", "./sheet", "./range", "./references", "./numformat" ], f);
})(function(){

    "use strict";

    var spreadsheet = kendo.spreadsheet;
    var CellRef = spreadsheet.CellRef;
    var drawing = kendo.drawing;
    var formatting = spreadsheet.formatting;
    var geo = kendo.geometry;

    /* jshint eqnull:true, laxbreak:true, shadow:true, -W054 */
    /* jshint latedef: nofunc */

    // This takes a list of row heights and the page height, and
    // produces a list of Y coordinates for each row, such that rows
    // are not truncated across pages.  However, the algorithm will
    // decide to truncate a row in the event that more than 0.2 of the
    // available space would otherwise be left blank.
    //
    // It will be used for horizontal splitting too (will receive
    // column widths and page width, and produce a list of X coords).
    function distributeCoords(heights, pageHeight) {
        var curr = 0;
        var out = [];
        var threshold = 0.2 * pageHeight;
        var bottom = pageHeight;
        heights.forEach(function(h){
            if (curr + h > bottom) {
                if (bottom - curr < threshold) {
                    // align to next page
                    curr = pageHeight * Math.ceil(curr / pageHeight);
                }
                // update bottom anyway; don't just add pageHeight, as
                // we might need multiple pages for the pathological
                // case of one row higher than the page.
                bottom += pageHeight * Math.ceil(h / pageHeight);
            }
            out.push(curr);
            curr += h;
        });
        out.push(curr);
        return out;
    }

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

    function doLayout(sheet, range, pageWidth, pageHeight) {
        // 1. obtain the list of cells that need to be printed, the
        //    row heights and column widths.  Place in each cell row,
        //    col (relative to range, i.e. first is 0,0), rowspan,
        //    colspan and merged.
        var cells = [];
        var rowHeights = [];
        var colWidths = [];
        var mergedCells = getMergedCells(sheet, range);
        sheet.forEach(range, function(row, col, cell){
            var relrow = row - range.topLeft.row;
            var relcol = col - range.topLeft.col;
            if (!relcol) {
                rowHeights.push(sheet.rowHeight(row));
            }
            if (!relrow) {
                colWidths.push(sheet.columnWidth(col));
            }
            if (sheet.isHiddenColumn(col)
                || sheet.isHiddenRow(row)
                || !shouldDrawCell(cell)) {
                return;
            }
            var id = new CellRef(row, col).print();
            if (mergedCells.secondary[id]) {
                return;
            }
            var m = mergedCells.primary[id];
            if (m) {
                cell.merged = true;
                cell.rowspan = m.height();
                cell.colspan = m.width();
            } else {
                cell.rowspan = 1;
                cell.colspan = 1;
            }
            cell.row = relrow;
            cell.col = relcol;
            cells.push(cell);
        });

        // 2. calculate top, left, bottom, right, width and height for
        //    printable cells.  Merged cells will be split across
        //    pages, unless the first row/col is shifted to next page.
        //    boxWidth and boxHeight get the complete drawing size.
        //    Note that cell coordinates keep increasing, i.e. they
        //    are not reset to zero for a new page (in fact, we don't
        //    even care about page dimensions here).  The print
        //    function translates the view to current page.
        var ys = distributeCoords(rowHeights, pageHeight);
        var xs = distributeCoords(colWidths, pageWidth);
        var boxWidth = 0;
        var boxHeight = 0;
        cells.forEach(function(cell){
            cell.left = xs[cell.col];
            cell.top = ys[cell.row];
            if (cell.merged) {
                cell.right = orlast(xs, cell.col + cell.colspan);
                cell.bottom = orlast(ys, cell.row + cell.rowspan);
                cell.width = cell.right - cell.left;
                cell.height = cell.bottom - cell.top;
            } else {
                cell.width = colWidths[cell.col];
                cell.height = rowHeights[cell.row];
                cell.bottom = cell.top + cell.height;
                cell.right = cell.left + cell.width;
            }
            boxWidth = Math.max(boxWidth, cell.right);
            boxHeight = Math.max(boxHeight, cell.bottom);
        });

        return {
            width  : boxWidth,
            height : boxHeight,
            cells  : cells.sort(normalOrder),
            xs     : xs,
            ys     : ys
        };
    }

    function orlast(a, i) {
        return i < a.length ? a[i] : a[a.length - 1];
    }

    function shouldDrawCell(cell) {
        return cell.value != null
            || cell.background != null
            || cell.borderTop != null
            || cell.borderRight != null
            || cell.borderBottom != null
            || cell.borderLeft != null;
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
                return !(cell.right <= left || cell.left >= right ||
                         cell.bottom <= top || cell.top >= bottom);
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
            var tmp = new drawing.Text(val, [ cell.left + 2, cell.top + 2 ], {
                font: makeFontDef(cell),
                fill: { color: f ? f.color : "#000" }
            });
            clip.append(tmp);
        }
    }

    function makeFontDef(cell) {
        var font = [];
        if (cell.italic) {
            font.push("italic");
        }
        if (cell.bold) {
            font.push("bold");
        }
        font.push((cell.fontSize || 12) + "px");
        font.push((cell.fontFamily || "Arial"));
        return font.join(" ");
    }

    spreadsheet.Sheet.prototype.draw = function(range, options, callback) {
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
        var layout = doLayout(this, this._ref(range), pageWidth, pageHeight);
        drawLayout(layout, group, {
            pageWidth: pageWidth,
            pageHeight: pageHeight
        });
        callback(group);
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
