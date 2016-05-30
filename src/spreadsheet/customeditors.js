(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "./view" ], f);
})(function(){

(function(kendo) {

    "use strict";

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    // jshint eqnull:true

    var EDITORS = {};

    var registerEditor = kendo.spreadsheet.registerEditor = function(name, editor) {
        EDITORS[name] = editor;
    };

    kendo.spreadsheet.Sheet.prototype.activeCellCustomEditor = function() {
        var cell = this.activeCell().first();
        var val = this.validation(cell);

        if (val && val.showButton) {
            var key = "_validation_" + val.dataType;
            var editor = EDITORS[key];
            if (typeof editor == "function") {
                editor = EDITORS[key] = editor();
            }
            return editor;
        }
    };

    registerEditor("_validation_date", function(){
        var context, calendar, popup;

        function create() {
            if (!calendar) {
                calendar = $("<div>").kendoCalendar();
                popup = $("<div>").kendoPopup({
                    anchor: ".k-spreadsheet-editor-button" // XXX: what if there are two spreadsheets?
                });
                calendar.appendTo(popup);
                calendar = calendar.getKendoCalendar();
                popup = popup.getKendoPopup();

                calendar.bind("change", function(){
                    popup.close();
                    var date = calendar.value();
                    context.callback(kendo.spreadsheet.dateToNumber(date));
                });
            }
        }

        function open() {
            create();
            var date = context.range.value();
            if (date != null) {
                calendar.value(kendo.spreadsheet.numberToDate(date));
            }
            var val = context.validation;
            if (val) {
                var min = null, max = null;
                if (/^(?:greaterThan|between)/.test(val.comparerType)) {
                    min = kendo.spreadsheet.numberToDate(val.from.value);
                }
                if (val.comparerType == "between") {
                    max = kendo.spreadsheet.numberToDate(val.to.value);
                }
                if (val.comparerType == "greaterThan") {
                    max = kendo.spreadsheet.numberToDate(val.from.value);
                }
                calendar.setOptions({
                    disableDates: function(date) {
                        var from = val.from.value | 0;
                        var to = val.to.value | 0;
                        date = kendo.spreadsheet.dateToNumber(date) | 0;
                        switch (val.comparerType) {
                          case "greaterThan":
                            return !(date > from);
                          case "lessThan":
                            return !(date < from);
                          case "between":
                            return !(date >= from && date <= to);
                          case "equalTo":
                            return !(date == from);
                          case "notEqualTo":
                            return !(date != from);
                          case "greaterThanOrEqualTo":
                            return !(date >= from);
                          case "lessThanOrEqualTo":
                            return !(date <= from);
                          case "notBetween":
                            return !(date < from || date > to);
                        }
                    },
                    min: min,
                    max: max
                });
            } else {
                calendar.setOptions({ disableDates: null, min: null, max: null });
            }
            popup.open();
        }

        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "k-i-calendar"
        };
    });

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
