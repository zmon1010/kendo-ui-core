(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var Clipboard = kendo.Class.extend({
        init: function(workbook) {
            this.workbook = workbook;
        },

        copy: function() {
            var sheet = this.workbook.activeSheet();
            this.origin = sheet.select();
            this.contents = sheet.selection().getState();
        },

        paste: function() {
            var sheet = this.workbook.activeSheet();
            var destination = sheet.activeCell().first();
            var originActiveCell = this.origin.first();
            var rowDelta = originActiveCell.row - destination.row;
            var colDelta = originActiveCell.col - destination.col;
            var pasteRef = this.origin.relative(rowDelta, colDelta, 3);

            sheet.range(pasteRef).setState(this.contents);
            sheet.triggerChange(kendo.spreadsheet.ALL_REASONS);
        }
    });

    kendo.spreadsheet.Clipboard = Clipboard;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
