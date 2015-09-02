
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

        forEachSelectedColumn: function(callback) {
            var sheet = this._sheet;

            sheet.batch(function() {
                sheet._select().forEachColumnIndex(function(index, i) {
                    callback(sheet, index, i);
                });
            }, true);
        },

        forEachSelectedRow: function(callback) {
            var sheet = this._sheet;

            sheet.batch(function() {
                sheet._select().forEachRowIndex(function(index, i) {
                    callback(sheet, index, i);
                });
            }, true);
        },

        includesHiddenColumns: function(ref) {
            return this._sheet._grid._columns.includesHidden(ref.topLeft.col, ref.bottomRight.col);
        },

        includesHiddenRows: function(ref) {
            return this._sheet._grid._rows.includesHidden(ref.topLeft.row, ref.bottomRight.row);
        },

        selectionIncludesHiddenColumns: function() {
            return this.includesHiddenColumns(this._sheet.select());
        },

        selectionIncludesHiddenRows: function() {
            return this.includesHiddenRows(this._sheet.select());
        },

        deleteSelectedColumns: function() {
            this.forEachSelectedColumn(function(sheet, index, i) {
                sheet.deleteColumn(index - i);
            });
        },

        deleteSelectedRows: function() {
            this.forEachSelectedRow(function(sheet, index, i) {
                sheet.deleteRow(index - i);
            });
        },

        hideSelectedColumns: function() {
            this.forEachSelectedColumn(function(sheet, index, i) {
                sheet.hideColumn(index);
            });
        },

        hideSelectedRows: function() {
            this.forEachSelectedRow(function(sheet, index, i) {
                sheet.hideRow(index);
            });
        },

        unhideSelectedColumns: function() {
            this.forEachSelectedColumn(function(sheet, index, i) {
                sheet.unhideColumn(index);
            });
        },

        unhideSelectedRows: function() {
            this.forEachSelectedRow(function(sheet, index, i) {
                sheet.unhideRow(index);
            });
        }
    });

    kendo.spreadsheet.AxisManager = AxisManager;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
