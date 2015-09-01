
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

        sortedAxis: function(ref, axis) {
            var sorted = [];

            var method = axis === 'row' ? 'forEachRow' : 'forEachColumn';

            ref[method](function(segment) {
                var index = segment.first()[axis];
                if (sorted.indexOf(index) === -1) {
                    sorted.push(index);
                }
            });

            sorted.sort();
            return sorted;
        },

        deleteColumn: function(ref) {
            var sheet = this._sheet;
            var sortedColumns = this.sortedAxis(ref, 'col');

            sheet.batch(function() {
                for (var i = 0, len = sortedColumns.length; i < len; i++) {
                    sheet.deleteColumn(sortedColumns[i] - i);
                }
            }, true);
        },

        deleteRow: function(ref) {
            var sheet = this._sheet;
            var sortedRows = this.sortedAxis(ref, 'row');

            sheet.batch(function() {
                for (var i = 0, len = sortedRows.length; i < len; i++) {
                    sheet.deleteRow(sortedRows[i] - i);
                }
            }, true);
        },

        deleteSelectedColumns: function() {
            this.deleteColumn(this._sheet.select());
        },

        deleteSelectedRows: function() {
            this.deleteRow(this._sheet.select());
        }
    });

    kendo.spreadsheet.AxisManager = AxisManager;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
