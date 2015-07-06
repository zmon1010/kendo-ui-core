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

    var RefTranslator = {
        down: function(ref) {
            return new CellRef(ref.bottomRight.row + 1, ref.topLeft.col);
        },
        up: function(ref) {
            return new CellRef(ref.topLeft.row - 1, ref.topLeft.col);
        },
        left: function(ref) {
            return new CellRef(ref.topLeft.row, ref.topLeft.col - 1);
        },
        right: function(ref) {
            return new CellRef(ref.topLeft.row, ref.bottomRight.col + 1);
        }
    };

    var VIEW_CONTENTS = '<div class=k-spreadsheet-fixed-container tabindex=0></div><div class=k-spreadsheet-scroller><div class=k-spreadsheet-view-size></div></div>';

    var View = kendo.Class.extend({
        init: function(element) {
            element.append(VIEW_CONTENTS);
            this.container = element.children()[0];
            this.scroller = element.children()[1];
            this.viewSize = $(this.scroller.firstChild);

            this.tree = new kendo.dom.Tree(this.container);

            var scrollbar = kendo.support.scrollbar();

            $(this.container).css({
                width: element[0].clientWidth - scrollbar,
                height: element[0].clientHeight - scrollbar
            }).on("wheel", this._passWheelEvent.bind(this));

            $(this.scroller).on("scroll", this.render.bind(this));

            this.handleKbd();
        },

        sheet: function(sheet) {
            this._sheet = sheet;
        },

        handleKbd: function() {
            $(this.container).on("click", function() {
                this.focus();
            });

            $(this.container).on("keydown", function(e) {
                var sheet = this._sheet;
                var activeCell = sheet.activeCell();
                var nextCell;

                switch (e.keyCode) {
                    case kendo.keys.LEFT:
                        nextCell = RefTranslator.left(activeCell);
                        break;
                    case kendo.keys.UP:
                        nextCell = RefTranslator.up(activeCell);
                        break;
                    case kendo.keys.RIGHT:
                        nextCell = RefTranslator.right(activeCell);
                        break;
                    case kendo.keys.DOWN:
                        nextCell = RefTranslator.down(activeCell);
                        break;
                }

                if (nextCell) {
                    sheet.activeCell(sheet._grid.normalize(nextCell));
                }

            }.bind(this));
        },

        refresh: function() {
            this.viewSize[0].style.height = this._sheet._grid.totalHeight() + "px";
            this.viewSize[0].style.width = this._sheet._grid.totalWidth() + "px";

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

            this.scrollIntoView();
        },

        scrollIntoView: function() {
            var activeCell = this._sheet.activeCell().toRangeRef();
            var theGrid;

            this.panes.forEach(function(pane) {
                var grid = pane._grid;
                if (!theGrid && grid.contains(activeCell)) {
                    theGrid = grid;
                }
            });

            var boundaries = theGrid.scrollBoundaries(activeCell);

            var scroller = this.scroller;
            var scrollTop = theGrid.rows.frozen ? 0 : scroller.scrollTop;
            var scrollLeft = theGrid.columns.frozen ? 0 : scroller.scrollLeft;

            if (boundaries.top < scrollTop) {
                scroller.scrollTop = boundaries.top;
            }

            if (boundaries.bottom > scrollTop) {
                scroller.scrollTop = boundaries.bottom;
            }

            if (boundaries.left < scrollLeft) {
                scroller.scrollLeft = boundaries.left;
            }

            if (boundaries.right > scrollLeft) {
                scroller.scrollLeft = boundaries.right;
            }
        },

        render: function() {
            var grid = this._sheet._grid;

            var scrollTop = this.scroller.scrollTop;
            var scrollLeft = this.scroller.scrollLeft;

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
        },

        _pane: function(row, column, rowCount, columnCount) {
            var pane = new Pane(this._sheet, this._sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
            pane.refresh(this.scroller.clientWidth, this.scroller.clientHeight);
            return pane;
        },

        _passWheelEvent: function(e) {
            var element = this.scroller;

            element.scrollTop += e.originalEvent.deltaY;
            element.scrollLeft += e.originalEvent.deltaX;

            e.preventDefault();
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

        isVisible: function(scrollLeft, scrollTop, ref) {
            return this._grid.view(scrollLeft, scrollTop).ref.intersects(ref);
        },

        _className: function() {
            var grid = this._grid;
            var classes = ["k-spreadsheet-pane"];

            if (grid.hasRowHeader) {
                classes.push("k-spreadsheet-pane-left");
            }

            if (grid.hasColumnHeader) {
                classes.push("k-spreadsheet-pane-top");
            }

            return classes.join(" ");
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

            return kendo.dom.element("div", { style: grid.style, className: this._className() }, children);
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

            var className = itemSelection || (selectedHeaders.all ? "full" : (allHeaders ? "partial" : "none"));

            if (className) {
                className = "k-selection-" + className;
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

        _border: function(value) {
            var json = JSON.parse(value);
            return [
                "solid",
                json.size || "1px",
                json.color || "#000"
            ].join(" ");
        },

        addCell: function(table, row, cell) {
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
            var cellStyle = cell.style;

            if (cellStyle) {
                Object.keys(cellStyle).forEach(function(key) {
                   style[styleMap[key]] = cellStyle[key];
                });

                if (cellStyle.wrap === false) {
                    style.whiteSpace = "nowrap";
                }

                if (cellStyle.borderRight) {
                    style.borderRight = this._border(cellStyle.borderRight);
                }

                if (cellStyle.borderBottom) {
                    style.borderBottom = this._border(cellStyle.borderBottom);
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
                var div = this._rectangle(ref).toDiv(className);
                var style = div.attr.style;
                style.height = (parseInt(style.height, 10) + 1) + "px";
                style.width = (parseInt(style.width, 10) + 1) + "px";
                collection.push(div);
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
