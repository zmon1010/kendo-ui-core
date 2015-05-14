(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Sheet(columns, rows, columnWidth, rowHeight, fixed) {
        this.widths = new kendo.spreadsheet.Axis(columns, columnWidth, fixed);
        this._heights = new kendo.spreadsheet.Axis(rows, rowHeight, fixed);

        var cellsCount = rows * columns - 1;

        this.values = new kendo.spreadsheet.SparseRangeList(0, cellsCount, "");
        this.colors = new kendo.spreadsheet.SparseRangeList(0, cellsCount, "beige");

        this.grid = new kendo.spreadsheet.Grid(columns, rows);
    }

    Sheet.prototype = {
        view: function(rectangle) {
            return {
                rows: this._heights.visible(rectangle.top, rectangle.bottom),
                columns: this.widths.visible(rectangle.left, rectangle.right)
            };
        },
        rowHeight: function(rowIndex, height) {
            return this._heights.value(rowIndex, rowIndex, height);
        },
        totalHeight: function() {
            return this._heights.total;
        }
    }

    kendo.spreadsheet.Sheet = Sheet;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
