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

    /*
    function recalculate(callback) {
        var formulaCells = Glue.getRefCells(Glue.getSheetBounds()).filter(function(cell){
            if (cell.formula) {
                cell.formula.reset();
                return true;
            }
        });
        var count = formulaCells.length;
        if (!count && callback) {
            return callback();
        }
        formulaCells.forEach(function(cell){
            cell.formula.exec(Glue, "sheet1", cell.row, cell.col, function(){
                if (callback && !--count) {
                    callback();
                }
            });
        });
    }
    */

    var View = kendo.Class.extend({
        init: function(element, fixed) {
            this.wrapper = $(element);
            this.wrapper.addClass("k-spreadsheet");
            this.element = $("<div class=k-spreadsheet-view />").appendTo(this.wrapper);

            this.container = this.element;

            if (fixed) {
                this.element.wrap("<div class=k-spreadsheet-fixed-wrapper></div>").parent();
                this.container = this.element.parent();
            }

            this.tree = new kendo.dom.Tree(this.element[0]);
            this.wrapper.on("scroll", this.scroll.bind(this));
        },

        scroll: function() {
            this.renderAt(this.visibleRectangle());
        },

        sheet: function(sheet) {
            this._sheet = sheet;
            this.container[0].style.height = sheet._grid.totalHeight() + "px";
            this.container[0].style.width = sheet._grid.totalWidth() + "px";
        },

        context: function(context) {
            this._context = context;
        },

        render: function() {
            this.renderAt(this.visibleRectangle());
        },

        visibleRectangle: function() {
            var element = this.wrapper[0];

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

            return {
                left: left,
                top: top,
                right: right,
                bottom: bottom
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

            var mergedCells = this.renderMergedCells(promises);

            $.when.apply(null, promises).then(function() {
                this.tree.render([table.toDomTree(columns.offset, rows.offset)].concat(mergedCells) );
            }.bind(this));
        },

        renderMergedCells: function(promises) {
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

                mergedCells.push(table.toDomTree(rectangle.x, rectangle.y));
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
