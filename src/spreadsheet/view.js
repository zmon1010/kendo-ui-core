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
            if (!text) {
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

    var VIEW_CONTENTS = '<div class=k-spreadsheet-fixed-container></div><div class=k-spreadsheet-scroller><div class=k-spreadsheet-view-size></div></div><textarea tabindex="0" class="k-spreadsheet-clipboard" wrap="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>';

    function within(value, min, max) {
        return value >= min && value <= max;
    }

    var ACTIONS = {
       "up": "up",
       "down": "down",
       "left": "left",
       "right": "right",
       "home": "first-col",
       "ctrl+left": "first-col",
       "end": "last-col",
       "ctrl+right": "last-col",
       "ctrl+up": "first-row",
       "ctrl+down": "last-row",
       "ctrl+home": "first",
       "ctrl+end": "last",
       "pageup": "prev-page",
       "pagedown": "next-page"
    };

    var ACTION_KEYS = [];

    for (var key in ACTIONS) {
        ACTION_KEYS.push(key);
    }

    var View = kendo.Class.extend({
        init: function(element) {
            element.append(VIEW_CONTENTS);
            this.container = element.find(".k-spreadsheet-fixed-container")[0];
            this.scroller = element.find(".k-spreadsheet-scroller")[0];
            this.clipboard = element.find(".k-spreadsheet-clipboard");
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

        moveActiveCell: function(direction) {
            var sheet = this._sheet;
            var scroller = this.scroller;
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
                    row = rows.nextPage(bottomRight.row, scroller.clientHeight);
                    scroller.scrollTop += scroller.clientHeight;
                    break;
                case "prev-page":
                    row = rows.prevPage(bottomRight.row, scroller.clientHeight);
                    scroller.scrollTop -= scroller.clientHeight;
                    break;
            }

            sheet.select(new CellRef(row, column));
        },

        handleKbd: function() {
            var container = $(this.container);
            var clipboard = this.clipboard;
            var that = this;

            // Warning - DO NOT extract var sheet = that._sheet.
            // This reference may change at runtime.

            var listener = this.listener = new kendo.spreadsheet.EventListener(container);
            var keyListener = this.keyListener = new kendo.spreadsheet.EventListener(this.clipboard);

            keyListener.on(ACTION_KEYS, function(event, action) {
                that.moveActiveCell(ACTIONS[action]);
                event.preventDefault();
            });

            listener.on("mousedown", function(event, action) {
                var offset = container.offset();
                var object = this.objectAt(event.pageX - offset.left, event.pageY - offset.top);
                if (object.type === "cell") {
                    that._sheet.select(object.ref);
                }

                clipboard.css({
                    left: event.pageX - offset.left - 4,
                    top: event.pageY - offset.top - 4
                });

                setTimeout(function() {
                    clipboard.select().focus();
                });
            }.bind(this));

            keyListener.on("mouseup", function(event, action) {
                clipboard.css({
                    left: -10000,
                    top: -10000
                });
            });

            keyListener.on("cut", function(event, action) {
                setTimeout(function() {
                    that._sheet.selection().value("");
                });
            });

            keyListener.on("paste", function(event, action) {
                setTimeout(function() {
                    that._sheet.selection().value(clipboard.val());
                });
            });
        },

        objectAt: function(x, y) {
            var grid = this._sheet._grid;

            if (x < grid._headerWidth && y < grid._headerHeight) {
                return { type: "topcorner" };
            }

            var pane = this.paneAt(x, y);
            var row = pane._grid.rows.index(y, this.scroller.scrollTop);
            var column = pane._grid.columns.index(x, this.scroller.scrollLeft);

            if (x < grid._headerWidth) {
                return { type: "rowheader", row: row };
            }

            if (y < grid._headerHeight) {
                return { type: "columnheader", column: column };
            }

            return { type: "cell", ref: new CellRef(row, column) };
        },

        paneAt: function(x, y) {
            return this.panes.filter(function paneLocationWithin(pane) {
                var grid = pane._grid;
                return within(y, grid.top, grid.bottom) && within(x, grid.left, grid.right);
            })[0];
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

            var text = this._sheet.selection().values().map(function(row) {
                return row.join("\t");
            }).join("\r\n");

            this.clipboard.val(text).select().focus();

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

            var deltaX = e.originalEvent.deltaX;
            var deltaY = e.originalEvent.deltaY;

            if (e.originalEvent.deltaMode === 1) {
                deltaX *= 10;
                deltaY *= 10;
            }

            element.scrollLeft += deltaX;
            element.scrollTop += deltaY;

            e.preventDefault();
        }
    });

    function orientedClass(defaultClass, left, top, right, bottom) {
        var classes = [defaultClass];

        if (top) {
            classes.push("k-top");
        }

        if (right) {
            classes.push("k-right");
        }

        if (bottom) {
            classes.push("k-bottom");
        }

        if (left) {
            classes.push("k-left");
        }

        return classes.join(" ");
    }


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

                sheet.forEach(view.ref.leftColumn(), function(row, col, cell) {
                    var text = row + 1;
                    rowHeader.addCell(row - view.ref.topLeft.row, text, {}, this.headerClassName(row, "row"));
                }.bind(this));

                children.push(rowHeader.toDomTree(0, view.rowOffset, "k-spreadsheet-row-header"));
            }

            if (grid.hasColumnHeader) {
                var columnHeader = new HtmlTable(grid.headerHeight, this.columnWidth);

                view.columns.values.forEach(function(width) {
                    columnHeader.addColumn(width);
                });

                columnHeader.addRow(grid.headerHeight);

                sheet.forEach(view.ref.topRow(), function(row, col, cell) {
                    var text = kendo.spreadsheet.Ref.display(null, Infinity, col);
                    columnHeader.addCell(0, text, {}, this.headerClassName(col, "col"));
                }.bind(this));

                children.push(columnHeader.toDomTree(view.columnOffset, 0, "k-spreadsheet-column-header"));
            }

            return kendo.dom.element("div", {
                style: grid.style,
                className: orientedClass("k-spreadsheet-pane", grid.hasRowHeader, grid.hasColumnHeader)
            }, children);
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

            this._sheet.forEach(view.ref, function(row, col, cell) {
                this.addCell(table, row - view.ref.topLeft.row, cell);
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
            var style = {};

            if (cell.background) {
                style.backgroundColor = cell.background;
            }

            if (cell.fontColor) {
                style.color = cell.fontColor;
            }

            if (cell.fontFamily) {
                style.fontFamily = cell.fontFamily;
            }

            if (cell.fontLine) {
                style.textDecoration = cell.fontLine;
            }

            if (cell.fontStyle) {
                style.fontStyle = cell.fontStyle;
            }

            if (cell.horizontalAlignment) {
                style.textAlign = cell.horizontalAlignment;
            }

            if (cell.verticalAlignment) {
                style.verticalAlign = cell.verticalAlignment;
            }

            if (cell.fontWeight) {
                style.fontWeight = cell.fontWeight;
            }

            if (cell.fontSize) {
                style.fontSize = cell.fontSize;
            }

            if (cell.wrap === false) {
                style.whiteSpace = "nowrap";
            }

            if (cell.borderRight) {
                style.borderRight = this._border(cell.borderRight);
            }

            if (cell.borderBottom) {
                style.borderBottom = this._border(cell.borderBottom);
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
            var grid = this._grid;
            var sheet = this._sheet;
            var view = this._currentView;
            var activeCell = sheet.activeCell().toRangeRef();
            var className = orientedClass(
                 "k-spreadsheet-active-cell",
                !activeCell.move(0, -1).intersects(view.ref),
                !activeCell.move(-1, 0).intersects(view.ref),
                !activeCell.move(0, 1).intersects(view.ref),
                !activeCell.move(1, 0).intersects(view.ref)
            );

            if (sheet.select().eq(activeCell)) {
                className += " k-single";
            }

            sheet.select().forEach(function(ref) {
                if (ref === kendo.spreadsheet.NULLREF) {
                    return;
                }

                this._addDiv(selections, ref, "k-spreadsheet-selection");
            }.bind(this));

            this._addTable(selections, activeCell, className);

            return kendo.dom.element("div", { className: "k-selection-wrapper" }, selections);
        },

        _addDiv: function(collection, ref, className) {
            var view = this._currentView;

            if (view.ref.intersects(ref)) {
                var div = this._rectangle(ref).resize(1, 1).toDiv(className);
                collection.push(div);
            }
        },

        _addTable: function(collection, ref, className) {
            var sheet = this._sheet;
            var view = this._currentView;

            if (view.ref.intersects(ref)) {
                sheet.forEach(ref.collapse(), function(row, col, cell) {
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
