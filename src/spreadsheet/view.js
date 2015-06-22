(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var CellRef = kendo.spreadsheet.CellRef;

    var HtmlTable = kendo.Class.extend({
        init: function(rowHeight, columnWidth) {
            this.rowHeight = rowHeight;
            this.columnWidth = columnWidth;
            this.cols = [];
            this.trs = [];
            this._height = 0;
            this._width = 0;
        },

        addColumn: function(width) {
            this._width += width;

            var col = kendo.dom.element("col", { style: { width: width + "px" } });

            col.visible = width > 0;

            this.cols.push(col);
        },

        addRow: function(height) {
            var attr = null;

            attr = { style: { height: height + "px" } };

            this._height += height;

            var tr = kendo.dom.element("tr", attr);

            tr.visible = height > 0;

            this.trs.push(tr);
        },

        addCell: function(rowIndex, text, style, className) {
            if (text === null) {
                text = "";
            }

            var td = kendo.dom.element("td", { style: style, className: className }, [ kendo.dom.text(text) ]);
            this.trs[rowIndex].children.push(td);
            return td;
        },

        toDomTree: function(x, y, className) {
            this.trs = this.trs.filter(function(tr) {
                return tr.visible;
            });

            this.cols = this.cols.filter(function(col, ci) {
                if (!col.visible) {
                    this.trs.forEach(function(tr) {
                        tr.children.splice(ci, 1);
                    });
                }

                return col.visible;
            }, this);

            return kendo.dom.element("table", { style: { left: x + "px", top: y + "px", height: this._height + "px", width: this._width + "px" }, className: className },
                [
                    kendo.dom.element("colgroup", null, this.cols),
                    kendo.dom.element("tbody", null, this.trs)
                ]);
        }
    });

    var View = kendo.Class.extend({
        init: function(element, fixedContainer) {
            this.wrapper = $(element);
            this.fixedContainer = fixedContainer;
        },

        sheet: function(sheet) {
            this._sheet = sheet;
            this.element = $("<div class=k-spreadsheet-view />").appendTo(this.wrapper);
            this.tree = new kendo.dom.Tree(this.fixedContainer[0]);

            this.wrapper.on("scroll", this.render.bind(this));
        },

        refresh: function() {
            this.element[0].style.height = this._sheet._grid.totalHeight() + "px";
            this.element[0].style.width = this._sheet._grid.totalWidth() + "px";

            var frozenColumns = this._sheet.frozenColumns();
            var frozenRows = this._sheet.frozenRows();

            // main or bottom or right pane
            this.panes = [ this._pane(frozenRows, frozenColumns) ];

            // left pane
            if (frozenColumns > 0) {
                this.panes.push(this._pane(frozenRows, 0, null, frozenColumns));
            }

            // top pane
            if (frozenRows > 0) {
                this.panes.push(this._pane(0, frozenColumns, frozenRows, null));
            }

            // left-top "fixed" pane
            if (frozenRows > 0 && frozenColumns > 0) {
                this.panes.push(this._pane(0, 0, frozenRows, frozenColumns));
            }
        },

        _pane: function(row, column, rowCount, columnCount) {
            var pane = new Pane(this._sheet, this._sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
            pane.context(this._context);
            pane.refresh(this.wrapper[0].clientWidth, this.wrapper[0].clientHeight);
            return pane;
        },

        render: function() {
            var element = this.wrapper[0];

            var scrollTop = element.scrollTop;
            var scrollLeft = element.scrollLeft;

            if (scrollTop < 0) {
                scrollTop = 0;
            }

            if (scrollLeft < 0) {
                scrollLeft = 0;
            }

            var result = this.panes.map(function(pane) {
                return pane.render(scrollLeft, scrollTop);
            }, this);

            var merged = [];
            merged = Array.prototype.concat.apply(merged, result);
            this.tree.render(merged);
        },

        context: function(context) {
            this._context = context;
        }
    });


    var Pane = kendo.Class.extend({
        init: function(sheet, grid) {
            this._sheet = sheet;
            this._grid = grid;
        },

        context: function(context) {
            this._context = context;
        },

        refresh: function(width, height) {
            this._grid.refresh(width, height);
        },

        render: function(scrollLeft, scrollTop) {
            var sheet = this._sheet;
            var grid = this._grid;

            var view = grid.view(scrollLeft, scrollTop);

            var rows = view.rows;

            var columns = view.columns;

            var table = new HtmlTable(this.rowHeight, this.columnWidth);

            var formulaRanges = this._sheet._formulas.values();

            for (var i = 0, len = formulaRanges.length; i < len; i++) {
                formulaRanges[i].value.reset();
            }

            rows.values.forEach(function(height) {
                table.addRow(height);
            });

            columns.values.forEach(function(width) {
                table.addColumn(width);
            });

            sheet.forEach(view.ref, function(cell) {
                this.addCell(table, cell.row - view.ref.topLeft.row, cell);
            }.bind(this));

            var children = [];
            var selectedHeaders = sheet.selectedHeaders();

            children.push(table.toDomTree(view.columnOffset, view.rowOffset));

            if (grid.hasRowHeader) {
                var rowHeader = new HtmlTable(this.rowHeight, grid.headerWidth);
                rowHeader.addColumn(grid.headerWidth);

                rows.values.forEach(function(height) {
                    rowHeader.addRow(height);
                });

                sheet.forEach(view.ref.leftColumn(), function(cell) {
                    var className = selectedHeaders.rows[cell.row] || (selectedHeaders.allRows ? "active" : "");
                    rowHeader.addCell(cell.row - view.ref.topLeft.row, cell.row + 1, {}, className);
                });

                children.push(rowHeader.toDomTree(0, view.rowOffset, "k-spreadsheet-row-header"));
            }

            if (grid.hasColumnHeader) {
                var columnHeader = new HtmlTable(grid.headerHeight, this.columnWidth);

                columns.values.forEach(function(width) {
                    columnHeader.addColumn(width);
                });

                columnHeader.addRow(grid.headerHeight);

                sheet.forEach(view.ref.topRow(), function(cell) {
                    var className = selectedHeaders.cols[cell.col] || (selectedHeaders.allCols ? "active" : "");
                    columnHeader.addCell(0, kendo.spreadsheet.Ref.display(null, Infinity, cell.col), {}, className);
                });

                children.push(columnHeader.toDomTree(view.columnOffset, 0, "k-spreadsheet-column-header"));
            }

            children = children.concat(this.renderMergedCells(view.ref, view.mergedCellLeft, view.mergedCellTop));

            children = children.concat(this.renderSelection(view.ref, view.mergedCellLeft, view.mergedCellTop));

            return kendo.dom.element("div", { style: grid.style, className: "k-spreadsheet-pane" }, children);
        },

        addCell: function(table, row, cell) {
            var formula = cell.formula;

            var styleMap = {
                background: "backgroundColor",
                fontColor: "color",
                fontFamily: "fontFamily",
                fontLine: "textDecoration",
                fontSize: "fontSize",
                fontStyle: "fontStyle",
                fontWeight: "fontWeight",
                horizontalAlignment: "textAlign",
                verticalAlignment: "verticalAlign"
            };

            var style = {};

            Object.keys(cell.style).forEach(function(key) {
               style[styleMap[key]] = cell.style[key];
            });

            if (cell.style.wrap === false) {
                style.whiteSpace = "nowrap";
            }

            var td = table.addCell(row, cell.value, style);

            if (formula) {
                formula.exec(this._context, this._sheet.name(), cell.row, cell.col, function(value) {
                    this.children[0].nodeValue = value;
                }.bind(td));
            }
        },

        _addTable: function(ref, className, left, top, cell) {
            var rectangle = this._grid.boundingRectangle(ref.toRangeRef());
            var table = new HtmlTable(this.rowHeight, this.columnWidth);
            table.addColumn(rectangle.width);
            table.addRow(rectangle.height);
            if (cell) {
                this.addCell(table, 0, cell);
            } else {
                table.addCell(0, '');
            }

            return table.toDomTree(rectangle.left - left, rectangle.top - top, className);
        },

        renderMergedCells: function(visibleRangeRef, left, top) {
            var mergedCells = [];
            var sheet = this._sheet;

            sheet.forEachMergedCell(function(ref) {
                if (visibleRangeRef.intersects(ref)) {
                    sheet.forEach(ref.collapse(), function(cell) {
                        mergedCells.push(this._addTable(ref, "k-spreadsheet-merged-cell", left, top, cell));
                    }.bind(this));
                }
            }.bind(this));

            return mergedCells;
        },

        renderSelection: function(visibleRangeRef, left, top) {
            var selections = [];
            var sheet = this._sheet;

            sheet.select().forEach(function(ref) {
                if (ref === kendo.spreadsheet.NULLREF) {
                    return;
                }
                if (visibleRangeRef.intersects(ref)) {
                    selections.push(this._addTable(ref, "k-spreadsheet-selection", left, top));
                }
            }.bind(this));

            return selections;
        }
    });

    kendo.spreadsheet.View = View;
    kendo.spreadsheet.Pane = Pane;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
