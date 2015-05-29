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

        toDomTree: function(x, y) {
            return kendo.dom.element("table", { style: { left: x + "px", top: y + "px" }},
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
            this.element[0].style.height = sheet._grid.totalHeight() + "px";
            this.element[0].style.width = sheet._grid.totalWidth() + "px";
            this.tree = new kendo.dom.Tree(this.fixedContainer[0]);

            this.panes = [
                new Pane(this.wrapper, sheet, { col: 5, row: 5 }),
                new Pane(this.wrapper, sheet, { col: 0, row: 5, columnCount: 5 }),
                new Pane(this.wrapper, sheet, { col: 5, row: 0, rowCount: 5 }),
                new Pane(this.wrapper, sheet, { col: 0, row: 0, columnCount: 5, rowCount: 5 })
            ];

            this.wrapper.on("scroll", this.render.bind(this));
        },

        render: function() {
            var result = this.panes.map(function(pane) {
                return pane.render();
            }, this);

            var merged = [];
            merged = Array.prototype.concat.apply(merged, result);
            this.tree.render(merged);
        },

        context: function(context) {
            this.panes.forEach(function(pane) {
                pane.context(context);
            });
        }
    });

    var Pane = kendo.Class.extend({
        init: function(scrollable, sheet, config) {
            this.col = config.col;
            this.row = config.row;
            this.columnCount = config.columnCount;
            this.rowCount = config.rowCount;

            this.scrollable = scrollable;
            this._sheet = sheet;
            this._rectangle = this.rectangle();

            var style = {};

            style.width = this._rectangle.width + "px";
            style.height = this._rectangle.height + "px";
            style.top = this._rectangle.top  + "px";
            style.left = this._rectangle.left   + "px";

            this._paneStyle = style;
        },

        context: function(context) {
            this._context = context;
        },

        render: function() {
            return this.renderAt(this.visibleRectangle());
        },

        visibleRectangle: function() {
            var element = this.scrollable[0];
            var scrollTop = element.scrollTop;
            var scrollLeft = element.scrollLeft;
            var rectangle = this._rectangle;
            var top = rectangle.top;
            var left = rectangle.left;

            if (scrollTop < 0) {
                scrollTop = 0;
            }

            if (scrollLeft < 0) {
                scrollLeft = 0;
            }

            if (!this.rowCount) {
                top += scrollTop;
            }

            if (!this.columnCount) {
                left += scrollLeft;
            }

            return {
                left: left,
                top: top,
                right: left + rectangle.width,
                bottom: top + rectangle.height
            };
        },

        rectangle: function() {
            var element = this.scrollable[0];

            var pane = {
                top: this._sheet._rows.sum(0, this.row - 1),
                left: this._sheet._columns.sum(0, this.col - 1)
            };

            if (this.columnCount) {
                pane.width = this._sheet._columns.sum(this.col, this.col + this.columnCount - 1);
            } else {
                pane.width = element.clientWidth - pane.left;
            }

            if (this.rowCount) {
                pane.height = this._sheet._rows.sum(this.row, this.row + this.rowCount - 1);
            } else {
                pane.height = element.clientHeight - pane.top;
            }

            return pane;
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

            var mergedCells = this.renderMergedCells(promises, rectangle.x, rectangle.y);

            var x = columns.offset;

            if (this.columnCount) {
                x = 0;
            }

            var y = rows.offset;

            if (this.rowCount) {
                y = 0;
            }

            return kendo.dom.element("div", { style: this._paneStyle, className: "k-spreadsheet-pane" }, [table.toDomTree(x, y)].concat(mergedCells));
        },

        renderMergedCells: function(promises, x, y) {
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

                mergedCells.push(table.toDomTree(rectangle.x + x, rectangle.y + y));
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
