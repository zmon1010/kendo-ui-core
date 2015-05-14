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
        this.container[0].style.width = sheet.widths.total + "px";
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
        var grid = sheet.grid;
        var rows = view.rows;
        var columns = view.columns;

        var table = new HtmlTable(this.rowHeight, this.columnWidth);

        for (var ri = rows.start; ri <= rows.end; ri ++) {
            table.addRow(rows.values.at(ri));
        }

        for (ci = columns.start; ci <= columns.end; ci ++) {
            var startCellIndex = grid.index(ci, rows.start);
            var endCellIndex = grid.index(ci, rows.end);

            var values = sheet.values.iterator(startCellIndex, endCellIndex);
            var backgrounds = sheet.colors.iterator(startCellIndex, endCellIndex);

            table.addColumn(columns.values.at(ci));

            for (ri = rows.start; ri <= rows.end; ri ++) {
                var index = grid.index(ci, ri);
                table.addCell(ri - rows.start, values.at(index), { backgroundColor: backgrounds.at(index) } );
            }
        }

        this.tree.render([ table.toDomTree(columns.offset, rows.offset) ]);
    }

    kendo.spreadsheet.View = View;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
