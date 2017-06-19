
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
            var indexes = [];
            this.forEachSelectedColumn(function(sheet, index, i) {
                index -= i;
                var formulas = [];
                indexes.unshift({
                    index    : index,
                    formulas : formulas,
                    width    : sheet.columnWidth(index)
                });
                sheet._saveModifiedFormulas(formulas, function(){
                    sheet.deleteColumn(index);
                });
            });
            return indexes;
        },

        deleteSelectedRows: function() {
            var indexes = [];
            this.forEachSelectedRow(function(sheet, index, i) {
                index -= i;
                var formulas = [];
                indexes.unshift({
                    index    : index,
                    formulas : formulas,
                    height   : sheet.rowHeight(index)
                });
                sheet._saveModifiedFormulas(formulas, function(){
                    sheet.deleteRow(index);
                });
            });
            return indexes;
        },

        hideSelectedColumns: function() {
            this.forEachSelectedColumn(function(sheet, index) {
                sheet.hideColumn(index);
            });
            var sheet = this._sheet;
            var ref = sheet.select().toRangeRef();
            var left = ref.topLeft.col;
            var right = ref.bottomRight.col;
            var sel = null;
            while (true) {
                var hasRight = right < sheet._columns._count;
                var hasLeft = left >= 0;
                if (!hasLeft && !hasRight) {
                    break;
                }
                if (hasRight && !sheet.isHiddenColumn(right)) {
                    sel = right;
                    break;
                }
                if (hasLeft && !sheet.isHiddenColumn(left)) {
                    sel = left;
                    break;
                }
                left--;
                right++;
            }
            if (sel !== null) {
                ref = new kendo.spreadsheet.RangeRef(
                    new kendo.spreadsheet.CellRef(0, sel),
                    new kendo.spreadsheet.CellRef(sheet._rows._count - 1, sel)
                );
                sheet.range(ref).select();
            }
        },

        hideSelectedRows: function() {
            this.forEachSelectedRow(function(sheet, index) {
                sheet.hideRow(index);
            });
            var sheet = this._sheet;
            var ref = sheet.select().toRangeRef();
            var top = ref.topLeft.row;
            var bottom = ref.bottomRight.row;
            var sel = null;
            while (true) {
                var hasBottom = bottom < sheet._rows._count;
                var hasTop = top >= 0;
                if (!hasTop && !hasBottom) {
                    break;
                }
                if (hasBottom && !sheet.isHiddenRow(bottom)) {
                    sel = bottom;
                    break;
                }
                if (hasTop && !sheet.isHiddenRow(top)) {
                    sel = top;
                    break;
                }
                top--;
                bottom++;
            }
            if (sel !== null) {
                ref = new kendo.spreadsheet.RangeRef(
                    new kendo.spreadsheet.CellRef(sel, 0),
                    new kendo.spreadsheet.CellRef(sel, sheet._columns._count - 1)
                );
                sheet.range(ref).select();
            }
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

        preventAddRow: function() {
            var range = this._sheet.select().toRangeRef();
            var rowCount = range.height();
            return this._sheet.preventInsertRow(0, rowCount);
        },

        preventAddColumn: function() {
            var range = this._sheet.select().toRangeRef();
            var columnCount = range.width();
            return this._sheet.preventInsertColumn(0, columnCount);
        },

        addColumnLeft: function() {
            var sheet = this._sheet;
            var base, count = 0;
            sheet.batch(function(){
                sheet.select().forEachColumnIndex(function(index) {
                    if (!base) {
                        base = index;
                    }
                    sheet.insertColumn(base);
                    ++count;
                });
            }, { recalc: true, layout: true });
            return { base: base, count: count };
        },

        addColumnRight: function() {
            var sheet = this._sheet;
            var base, count = 0;
            sheet.batch(function(){
                sheet.select().forEachColumnIndex(function(index) {
                    base = index + 1;
                    ++count;
                });
                for (var i = 0; i < count; ++i) {
                    sheet.insertColumn(base);
                }
            }, { recalc: true, layout: true });
            return { base: base, count: count };
        },

        addRowAbove: function() {
            var sheet = this._sheet;
            var base, count = 0;
            sheet.batch(function(){
                sheet.select().forEachRowIndex(function(index) {
                    if (!base) {
                        base = index;
                    }
                    sheet.insertRow(base);
                    ++count;
                });
            }, { recalc: true, layout: true });
            return { base: base, count: count };
        },

        addRowBelow: function() {
            var sheet = this._sheet;
            var base, count = 0;
            sheet.batch(function(){
                sheet.select().forEachRowIndex(function(index) {
                    base = index + 1;
                    ++count;
                });
                for (var i = 0; i < count; ++i) {
                    sheet.insertRow(base);
                }
            }, { recalc: true, layout: true });
            return { base: base, count: count };
        }
    });

    kendo.spreadsheet.AxisManager = AxisManager;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
