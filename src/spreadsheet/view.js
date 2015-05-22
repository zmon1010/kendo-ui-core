(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function HtmlTable(rowHeight, columnWidth) {
        this.rowHeight = rowHeight;
        this.columnWidth = columnWidth;
        this.cols = [];
        this.trs = [];
    }

    HtmlTable.prototype = {
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
            this.trs[rowIndex].children.push(kendo.dom.element("td", { style: style }, [ kendo.dom.text(text) ]));
        },

        toDomTree: function(x, y) {
            return kendo.dom.element("table", { style: { left: x + "px", top: y + "px" }},
                [
                    kendo.dom.element("colgroup", null, this.cols),
                    kendo.dom.element("tbody", null, this.trs)
                ]);
        }
    }

    var Glue = {
        getRefCells: function(ref) {
            if (ref instanceof calc.Runtime.CellRef) {
                var formula = sheet.range(ref.row-1, ref.col-1).formula() || null;
                var value = sheet.range(ref.row-1, ref.col-1).value();
                if (formula != null || value != null)
                    return [{ formula: formula, value: value, row: ref.row, col: ref.col, sheet: "sheet1" }];

            }

            if (ref instanceof calc.Runtime.RangeRef) {
                // ref = ref.intersect(this.getSheetBounds());
                // if (!(ref instanceof calc.Runtime.RangeRef))
                //     return this.getRefCells(ref);
                var startCellIndex = sheet._grid.index(ref.topLeft.row-1, ref.topLeft.col-1);
                var endCellIndex = sheet._grid.index(ref.bottomRight.row-1, ref.bottomRight.col-1);
                var formulas = sheet._formulas.iterator(startCellIndex, endCellIndex);
                var values = sheet._values.iterator(startCellIndex, endCellIndex);
                var a = [];
                for (var col = ref.topLeft.col; col <= ref.bottomRight.col; ++col) {
                    for (var row = ref.topLeft.row; row <= ref.bottomRight.row; ++row) {
                        var index = sheet._grid.index(row-1, col-1);
                        var formula = formulas.at(index) || null;
                        var value = values.at(index);
                        console.log(row, col, index, value);
                        if (formula != null || value != null) {
                            a.push({ formula: formula, value: value, row: row, col: col, sheet: "sheet1" });
                        }
                    }
                }

                return a;
            }

            if (ref instanceof calc.Runtime.UnionRef) {
                var a = [], self = this;
                ref.refs.forEach(function(ref){
                    a = a.concat(self.getRefCells(ref));
                });
                return a;
            }

            if (ref instanceof calc.Runtime.NullRef) {
                return [];
            }

            console.error("Unsupported reference", ref);
            return [];
        },

        getData: function(ref) {
            var self = this;
            if (ref instanceof calc.Runtime.Ref) {
                var data = self.getRefCells(ref).map(function(cell){
                    return cell.value;
                });
                return ref instanceof calc.Runtime.CellRef ? data[0] : data;
            }
            return ref;
        },

        onFormula: function(sheetName, row, col, val) {
            console.log("onFormula:", sheetName, row, col, val);
        }
    };

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

    function View(element, fixed) {
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
    }

    View.prototype.scroll = function() {
        this.renderAt(this.visibleRectangle());
    }

    View.prototype.sheet = function(sheet) {
        this._sheet = sheet;
        this.container[0].style.height = sheet.totalHeight() + "px";
        this.container[0].style.width = sheet.totalWidth() + "px";
    }

    View.prototype.render = function() {
        this.renderAt(this.visibleRectangle());
    }

    View.prototype.visibleRectangle = function() {
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
        }
    }

    View.prototype.renderAt = function(rectangle) {
        var sheet = this._sheet;
        var view = sheet.view(rectangle);
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

        for (ci = columns.start; ci <= columns.end; ci ++) {
            var startCellIndex = grid.index(rows.start, ci);
            var endCellIndex = grid.index(rows.end, ci);

            var values = sheet._values.iterator(startCellIndex, endCellIndex);
            var formulas = sheet._formulas.iterator(startCellIndex, endCellIndex);
            var backgrounds = sheet._backgrounds.iterator(startCellIndex, endCellIndex);

            table.addColumn(columns.values.at(ci));

            for (ri = rows.start; ri <= rows.end; ri ++) {
                var index = grid.index(ri, ci);
                var formula = formulas.at(index);

                table.addCell(ri - rows.start, values.at(index), { backgroundColor: backgrounds.at(index) } );

                if (formula) {
                    formula.exec(Glue, "sheet1", ri, ci, function() {

                    });
                }
            }
        }

        this.tree.render([ table.toDomTree(columns.offset, rows.offset) ]);
    }

    kendo.spreadsheet.View = View;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
