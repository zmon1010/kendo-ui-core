(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "./view" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var EDITORS = {};

    var registerEditor = kendo.spreadsheet.registerEditor = function(name, editor) {
        EDITORS[name] = editor;
    };

    kendo.spreadsheet.View.prototype.openCustomEditor = function() {
        var cell = this._sheet.activeCell().first();
        var val = this._sheet.validation(cell);
        var r = this.activeCellRectangle();

        var editor = EDITORS["_validation_date"];
        if (typeof editor == "function") {
            editor = EDITORS["_validation_date"] = editor();
        }

        var range = this._sheet.range(cell);
        editor.edit(range, r, function(value, parse){
            // XXX: should set through command, because undo.
            if (parse) {
                range.input(value);
            } else {
                range.value(value);
            }
        });
    };

    registerEditor("_validation_date", function(){
        var sheet, range, callback, popup, calendar;

        calendar = $("<div>").kendoCalendar();
        popup = $("<div>").kendoPopup({
            anchor: ".k-edit-button" // XXX: what if there are two spreadsheets?
        });
        calendar.appendTo(popup);
        calendar = calendar.getKendoCalendar();
        popup = popup.getKendoPopup();

        calendar.bind("change", function(){
            popup.close();
            var date = calendar.value();
            callback(kendo.spreadsheet.dateToNumber(date));
        });

        return {
            edit: function(r, pos, f) {
                range = r;
                sheet = r.sheet();
                callback = f;

                var date = range.value();
                if (date != null) {
                    calendar.value(kendo.spreadsheet.numberToDate(date));
                }

                popup.open();
            }
        };
    });

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
