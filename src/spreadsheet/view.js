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
            pane.refresh(this.wrapper[0].clientWidth, this.wrapper[0].clientHeight);
            return pane;
        },

        render: function() {
            var element = this.wrapper[0];
            var grid = this._sheet._grid;

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

            var topCorner = kendo.dom.element("div", { style: { width: grid._headerWidth + "px", height: grid._headerHeight + "px" }, className: "k-spreadsheet-top-corner" });
            merged.push(topCorner);

            this.tree.render(merged);
        }
    });

    var Pane = kendo.Class.extend({
        init: function(sheet, grid) {
            this._sheet = sheet;
            this._grid = grid;
        },

        refresh: function(width, height) {
            this._grid.refresh(width, height);
        },

        render: function(scrollLeft, scrollTop) {
            var sheet = this._sheet;
            var grid = this._grid;

            var view = grid.view(scrollLeft, scrollTop);
            this._currentView = view;
            this._selectedHeaders = sheet.selectedHeaders();

            var children = [];

            children.push(this.renderData());

            children.push(this.renderMergedCells());

            children.push(this.renderSelection());

            var selectedHeaders = sheet.selectedHeaders();

            if (grid.hasRowHeader) {
                var rowHeader = new HtmlTable(this.rowHeight, grid.headerWidth);
                rowHeader.addColumn(grid.headerWidth);

                view.rows.values.forEach(function(height) {
                    rowHeader.addRow(height);
                });

                sheet.forEach(view.ref.leftColumn(), function(cell) {
                    var text = cell.row + 1;
                    rowHeader.addCell(cell.row - view.ref.topLeft.row, text, {}, this.headerClassName(cell.row, "row"));
                }.bind(this));

                children.push(rowHeader.toDomTree(0, view.rowOffset, "k-spreadsheet-row-header"));
            }

            if (grid.hasColumnHeader) {
                var columnHeader = new HtmlTable(grid.headerHeight, this.columnWidth);

                view.columns.values.forEach(function(width) {
                    columnHeader.addColumn(width);
                });

                columnHeader.addRow(grid.headerHeight);

                sheet.forEach(view.ref.topRow(), function(cell) {
                    var text = kendo.spreadsheet.Ref.display(null, Infinity, cell.col);
                    columnHeader.addCell(0, text, {}, this.headerClassName(cell.col, "col"));
                }.bind(this));

                children.push(columnHeader.toDomTree(view.columnOffset, 0, "k-spreadsheet-column-header"));
            }

            return kendo.dom.element("div", { style: grid.style, className: "k-spreadsheet-pane" }, children);
        },

        headerClassName: function(index, type) {
            var selectedHeaders = this._selectedHeaders;

            var itemSelection;
            var allHeaders;

            if (type === "row") {
                itemSelection = selectedHeaders.rows[index];
                allHeaders = selectedHeaders.allRows;
            } else {
                itemSelection = selectedHeaders.cols[index];
                allHeaders = selectedHeaders.allCols;
            }

            var className = itemSelection || (selectedHeaders.all ? "selected" : (allHeaders ? "active" : "default"));

            if (className) {
                className = "k-state-" + className;
            }

            return className;
        },

        renderData: function() {
            var table = new HtmlTable(this.rowHeight, this.columnWidth);
            var view = this._currentView;

            view.rows.values.forEach(function(height) {
                table.addRow(height);
            });

            view.columns.values.forEach(function(width) {
                table.addColumn(width);
            });

            this._sheet.forEach(view.ref, function(cell) {
                this.addCell(table, cell.row - view.ref.topLeft.row, cell);
            }.bind(this));

            return table.toDomTree(view.columnOffset, view.rowOffset, "k-spreadsheet-data");
        },

        addCell: function(table, row, cell) {
            var styleMap = {
                background: "backgroundColor",
                borderRightColor: "borderRightColor",
                borderLeftColor: "borderLeftColor",
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

            if (cell.style) {
                Object.keys(cell.style).forEach(function(key) {
                   style[styleMap[key]] = cell.style[key];
                });

                if (cell.style.wrap === false) {
                    style.whiteSpace = "nowrap";
                }
            }

            if (!style.textAlign) {
                switch (cell.type) {
                   case "number":
                   case "date":
                       style.textAlign = "right";
                   break;
                   case "boolean":
                       style.textAlign = "center";
                   break;
                }
            }

            var td = table.addCell(row, cell.value, style);

            if (cell.format && cell.value !== null) {
                var formatter = kendo.spreadsheet.formatting.compile(cell.format);
                td.children[0] = formatter(cell.value);
            }
        },

        renderMergedCells: function() {
            var mergedCells = [];
            var sheet = this._sheet;
            var view = this._currentView;

            sheet.forEachMergedCell(function(ref) {
                this._addTable(mergedCells, ref, "k-spreadsheet-merged-cell");
            }.bind(this));

            return kendo.dom.element("div", { className: "k-merged-cells-wrapper" }, mergedCells);
        },

        renderSelection: function() {
            var selections = [];
            var sheet = this._sheet;
            var view = this._currentView;

            sheet.select().forEach(function(ref) {
                if (ref === kendo.spreadsheet.NULLREF) {
                    return;
                }

                this._addDiv(selections, ref, "k-spreadsheet-selection");
            }.bind(this));

            this._addTable(selections, sheet.activeCell().toRangeRef(),  "k-spreadsheet-active-cell");

            return kendo.dom.element("div", { className: "k-selection-wrapper" }, selections);
        },

        _addDiv: function(collection, ref, className) {
            var view = this._currentView;

            if (view.ref.intersects(ref)) {
                collection.push(this._rectangle(ref).toDiv(className));
            }
        },

        _addTable: function(collection, ref, className) {
            var sheet = this._sheet;
            var view = this._currentView;

            if (view.ref.intersects(ref)) {
                sheet.forEach(ref.collapse(), function(cell) {
                    var rectangle = this._rectangle(ref);

                    var table = new HtmlTable(this.rowHeight, this.columnWidth);
                    table.addColumn(rectangle.width);
                    table.addRow(rectangle.height);
                    this.addCell(table, 0, cell);

                    collection.push(table.toDomTree(rectangle.left, rectangle.top, className));
                }.bind(this));
            }
        },

        _rectangle: function(ref) {
            return this._grid.boundingRectangle(ref.toRangeRef()).offset(-this._currentView.mergedCellLeft, -this._currentView.mergedCellTop);
        }
    });

    kendo.spreadsheet.View = View;
    kendo.spreadsheet.Pane = Pane;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
