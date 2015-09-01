
(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var AxisManager = kendo.Class.extend({
        init: function(sheet) {
            this._sheet = sheet;
        },

        deleteColumn: function(ref) {
            var sheet = this._sheet;
            var sortedColumns = [];

            ref.forEachColumn(function(column) {
                var col = column.first().col;
                if (sortedColumns.indexOf(col) === -1) {
                    sortedColumns.push(col);
                }
            });

            sortedColumns.sort();

            sheet.batch(function() {
                for (var i = 0, len = sortedColumns.length; i < len; i++) {
                    sheet.deleteColumn(sortedColumns[i] - i);
                }
            }, true);
        },

        deleteSelectedColumns: function() {
            this.deleteColumn(this._sheet.select());
        }
    });

    kendo.spreadsheet.AxisManager = AxisManager;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
