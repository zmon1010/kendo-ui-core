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
        init: function(element, fixed) {
            this.wrapper = $(element);
            this.wrapper.addClass("k-spreadsheet");
            this.fixed = fixed;
        },

        sheet: function(sheet) {
            this._sheet = sheet;
            this.element = $("<div class=k-spreadsheet-view />").appendTo(this.wrapper);
            this.element[0].style.height = sheet._grid.totalHeight() + "px";
            this.element[0].style.width = sheet._grid.totalWidth() + "px";
            this.tree = new kendo.dom.Tree(this.element[0]);

            this.panes = [
                new Pane(this.element, this.fixed, sheet, { x: 5, y: 5 }),
                new Pane(this.element, this.fixed, sheet, { x: 0, y: 5, width: 5 }),
                new Pane(this.element, this.fixed, sheet, { x: 5, y: 0, height: 5 }),
                new Pane(this.element, this.fixed, sheet, { x: 0, y: 0, width: 5, height: 5 })
            ];

            this.wrapper.on("scroll", this.render.bind(this));
        },

        render: function() {
            var result = this.panes.map(function(pane) {
                return pane.render(this.wrapper[0]);
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
    })

    var Pane = kendo.Class.extend({
        init: function(element, fixed, sheet, rectangle) {
            this.rectangle = rectangle;
            this._sheet = sheet;
            this.container = this.element;
            this.x = sheet._columns.sum(0, rectangle.x - 1);
            this.y = sheet._rows.sum(0, rectangle.y - 1);
        },

        context: function(context) {
            this._context = context;
        },

        render: function(element) {
            return this.renderAt(this.visibleRectangle(element));
        },

        visibleRectangle: function(element) {
            var top = element.scrollTop;
            var bottom = top + element.clientHeight;

            if (top < 0) {
                bottom -= top;
                top = 0;
            }

            var left = element.scrollLeft;
            var right = left + element.clientWidth;

            if (left < 0) {
                right -= left;
                left = 0;
            }

            var pane = {
                top: top + this.y,
                left: left + this.x
            };

            if (this.rectangle.width) {
                pane.width = this._sheet._columns.sum(this.rectangle.x, this.rectangle.x + this.rectangle.width - 1);
            } else {
                pane.width = element.clientWidth - this.x;
            }

            if (this.rectangle.height) {
                pane.height = this._sheet._rows.sum(this.rectangle.y, this.rectangle.y + this.rectangle.height - 1);
            } else {
                pane.height = element.clientHeight - this.y;
            }

            var leftOffset = (this.rectangle.width ? this.x : left + this.x);
            var topOffset = (this.rectangle.height ? this.y : top + this.y);

            return {
                pane: pane,
                left:  leftOffset,
                top:  topOffset,
                right: leftOffset + pane.width,
                bottom: topOffset + pane.height
            };
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

            var style = {};

            style.width = rectangle.pane.width + "px";
            style.height = rectangle.pane.height + "px";
            style.top = rectangle.pane.top + "px";
            style.left = rectangle.pane.left + "px";

            var x = columns.offset - rectangle.pane.left;

            if (this.rectangle.width) {
                x = 0;
            }

            var y = rows.offset - rectangle.pane.top

            if (this.rectangle.height) {
                y = 0;
            }

            return kendo.dom.element("div", { style: style, className: "k-spreadsheet-pane" }, [table.toDomTree(x, y)].concat(mergedCells));
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
