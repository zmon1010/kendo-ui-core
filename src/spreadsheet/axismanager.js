
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

            sheet.batch(function() {
                ref.forEachColumnIndex(function(index, i) {
                    sheet.deleteColumn(index - i);
                });
            }, true);
        },

        deleteRow: function(ref) {
            var sheet = this._sheet;

            sheet.batch(function() {
                ref.forEachRowIndex(function(index, i) {
                    sheet.deleteRow(index - i);
                });
            }, true);
        },

        hideColumn: function(ref) {
            var sheet = this._sheet;

            sheet.batch(function() {
                ref.forEachColumnIndex(function(index, i) {
                    sheet.hideColumn(index - i);
                });
            }, true);
        },

        hideRow: function(ref) {
            var sheet = this._sheet;

            sheet.batch(function() {
                ref.forEachRowIndex(function(index, i) {
                    sheet.hideRow(index - i);
                });
            }, true);
        },

        deleteSelectedColumns: function() {
            this.deleteColumn(this._sheet.select());
        },

        deleteSelectedRows: function() {
            this.deleteRow(this._sheet.select());
        },

        hideSelectedColumns: function() {
            this.hideColumn(this._sheet.select());
        },

        hideSelectedRows: function() {
            this.hideRow(this._sheet.select());
        }
    });

    kendo.spreadsheet.AxisManager = AxisManager;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
