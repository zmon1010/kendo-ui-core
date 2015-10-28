
(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var AxisManager = kendo.Class.extend({
        init: function(sheet) {
            this._sheet = sheet;
        },

        forEachSelectedColumn: function(callback) {
            var sheet = this._sheet;

            sheet.batch(function() {
                sheet.select().forEachColumnIndex(function(index, i) {
                    callback(sheet, index, i);
                });
            }, { layout: true, recalc: true });
        },

        forEachSelectedRow: function(callback) {
            var sheet = this._sheet;

            sheet.batch(function() {
                sheet.select().forEachRowIndex(function(index, i) {
                    callback(sheet, index, i);
                });
            }, { layout: true, recalc: true });
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
            this.forEachSelectedColumn(function(sheet, index) {
                sheet.hideColumn(index);
            });
        },

        hideSelectedRows: function() {
            this.forEachSelectedRow(function(sheet, index) {
                sheet.hideRow(index);
            });
        },

        unhideSelectedColumns: function() {
            this.forEachSelectedColumn(function(sheet, index) {
                sheet.unhideColumn(index);
            });
        },

        unhideSelectedRows: function() {
            this.forEachSelectedRow(function(sheet, index) {
                sheet.unhideRow(index);
            });
        },

        addColumnLeft: function() {
            this.forEachSelectedColumn(function(sheet, index, i) {
                sheet.insertColumn(index - i);
            });
        },

        addColumnRight: function() {
            this.forEachSelectedColumn(function(sheet, index, i) {
                sheet.insertColumn(index + (i+1));
            });
        },

        canAddRow: function() {
            var range = this._sheet.select().toRangeRef();
            var rowCount = range.height();

            return this._sheet.canInsertRow(0, rowCount);
        },

        addRowAbove: function() {
            this.forEachSelectedRow(function(sheet, index, i) {
                sheet.insertRow(index - i);
            });
        },

        addRowBelow: function() {
            this.forEachSelectedRow(function(sheet, index, i) {
                sheet.insertRow(index + (i+1));
            });
        }
    });

    kendo.spreadsheet.AxisManager = AxisManager;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
