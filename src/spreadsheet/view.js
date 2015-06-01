(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var HtmlTable = kendo.Class.extend({
        init: function(rowHeight, columnWidth) {
            this.rowHeight = rowHeight;
            this.columnWidth = columnWidth;
            this.cols = [];
            this.trs = [];
        },

        addColumn: function(width) {
            this.cols.push(kendo.dom.element("col", { style: { width: width + "px" } }));
        },

        addRow: function(height) {
            var attr = null;

            if (height != this.rowHeight) {
                attr = { style: { height: height + "px" } };
            }

            this.trs.push(kendo.dom.element("tr", attr));
        },

        addCell: function(rowIndex, text, style) {
            if (text === null) {
                text = "";
            }

            var td = kendo.dom.element("td", { style: style }, [ kendo.dom.text(text) ]);
            this.trs[rowIndex].children.push(td);
            return td;
        },

        toDomTree: function(x, y, className) {
            return kendo.dom.element("table", { style: { left: x + "px", top: y + "px" }, className: className },
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

            this.panes = [ new Pane(this._sheet, { row: frozenRows, col: frozenColumns }) ];

            if (frozenColumns > 0) {
                this.panes.push(new Pane(this._sheet, { row: frozenRows, col: 0, columnCount: frozenColumns }));
            }

            if (frozenRows > 0) {
                this.panes.push(new Pane(this._sheet, { row: 0, col: frozenColumns, rowCount: frozenRows }));
            }

            if (frozenRows > 0 && frozenColumns > 0) {
                this.panes.push(new Pane(this._sheet, { row: 0, col: 0, rowCount: frozenRows, columnCount: frozenColumns }));
            }

            this.panes.forEach(function(pane) {
                pane.context(this._context);
                pane.refresh(this.wrapper[0].clientWidth, this.wrapper[0].clientHeight);
            }, this);
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
        init: function(sheet, config) {
            this.col = config.col;
            this.row = config.row;
            this.columnCount = config.columnCount;
            this.rowCount = config.rowCount;
            this._sheet = sheet;
        },

        context: function(context) {
            this._context = context;
        },

        refresh: function(width, height) {
            this._rectangle = this.rectangle(width, height);
        },

        render: function(scrollLeft, scrollTop) {
            return this.renderAt(this.visibleRectangle(scrollLeft, scrollTop));
        },

        visibleRectangle: function(scrollLeft, scrollTop) {
            var rectangle = this._rectangle;
            var top = rectangle.top;
            var left = rectangle.left;

            if (!this.rowCount) {
                top += scrollTop;
            }

            if (!this.columnCount) {
                left += scrollLeft;
            }

            return new kendo.spreadsheet.Rectangle(left, top, rectangle.width, rectangle.height);
        },

        rectangle: function(elementWidth, elementHeight) {
            var grid = this._sheet._grid;
            var row = this.row;
            var col = this.col;

            var top = grid.height(0, row - 1);
            var left = grid.width(0, col - 1);

            var width, height;

            if (this.columnCount) {
                width = grid.width(col, col + this.columnCount - 1);
            } else {
                width = elementWidth - left;
            }

            if (this.rowCount) {
                height = grid.height(row, row + this.rowCount - 1);
            } else {
                height = elementHeight - top;
            }

            return new kendo.spreadsheet.Rectangle(left, top, width, height);
        },

        renderAt: function(rectangle) {
            var sheet = this._sheet;
            var view = sheet._grid.view(rectangle);
            var grid = sheet._grid;
            var rows = view.rows;
            var columns = view.columns;

            var table = new HtmlTable(this.rowHeight, this.columnWidth);

            var formulaRanges = this._sheet._formulas.values();

            for (var i = 0, len = formulaRanges.length; i < len; i++) {
                formulaRanges[i].value.reset();
            }

            for (var ri = rows.start; ri <= rows.end; ri ++) {
                table.addRow(rows.values.at(ri));
            }

            var promises = [];

            for (var ci = columns.start; ci <= columns.end; ci ++) {
                var startCellIndex = grid.index(rows.start, ci);
                var endCellIndex = grid.index(rows.end, ci);

                var values = sheet._values.iterator(startCellIndex, endCellIndex);
                var formulas = sheet._formulas.iterator(startCellIndex, endCellIndex);
                var backgrounds = sheet._backgrounds.iterator(startCellIndex, endCellIndex);

                table.addColumn(columns.values.at(ci));

                for (ri = rows.start; ri <= rows.end; ri ++) {
                    var index = grid.index(ri, ci);
                    var formula = formulas.at(index);

                    var td = table.addCell(ri - rows.start, values.at(index), { backgroundColor: backgrounds.at(index) } );

                    if (formula) {
                        var promise = $.Deferred();

                        formula.exec(this._context, sheet.name(), ri, ci, function(value) {
                            this.children[0].nodeValue = value;
                            promise.resolve();
                        }.bind(td));

                        promises.push(promise);
                    }
                }
            }

            var x = columns.offset;

            if (this.columnCount) {
                x = 0;
            }

            var y = rows.offset;

            if (this.rowCount) {
                y = 0;
            }

            var mergedCells = this.renderMergedCells(promises, rectangle.left, rectangle.top);

            var style = {};

            style.width = this._rectangle.width + "px";
            style.height = this._rectangle.height + "px";
            style.top = this._rectangle.top  + "px";
            style.left = this._rectangle.left   + "px";

            return kendo.dom.element("div", { style: style, className: "k-spreadsheet-pane" }, [table.toDomTree(x, y)].concat(mergedCells));
        },

        renderMergedCells: function(promises, left, top) {
            var mergedCells = [];
            var sheet = this._sheet;
            var grid = sheet._grid;

            for (var i = 0, len = this._sheet._mergedCells.length; i < len; i++) {
                var ref = this._sheet._mergedCells[i];
                var rectangle = grid.rectangle(ref);
                var cell = ref.topLeft;
                var index = grid.cellRefIndex(cell);
                var value = sheet._values.value(index, index);
                var background = sheet._backgrounds.value(index, index);
                // var formula = sheet._backgrounds.value(index, index);

                var table = new HtmlTable(this.rowHeight, this.columnWidth);
                table.addColumn(rectangle.width);
                table.addRow(rectangle.height);
                table.addCell(0, value, { backgroundColor: background } );

                mergedCells.push(table.toDomTree(rectangle.left - left, rectangle.top - top, "k-spreadsheet-merged-cell"));
            }

            return mergedCells;
        }
    });

    //
    // MergedCellView
    // - range: RangeRef
    // intersects(view: sheet.view)
    //
    kendo.spreadsheet.View = View;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
