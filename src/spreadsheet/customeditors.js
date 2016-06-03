(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.calendar", "../kendo.listview.js", "./sheet" ], f);
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
        var key = this._properties.get("editor", this._grid.cellRefIndex(cell));
        var editor;

        if (key != null) {
            editor = EDITORS[key];
        }
        else if (val && val.showButton) {
            key = "_validation_" + val.dataType;
            editor = EDITORS[key];
        }

        if (typeof editor == "function") {
            editor = EDITORS[key] = editor();
        }

        return editor;
    };

    registerEditor("_validation_date", function(){
        var context, calendar, popup;

        function create() {
            if (!calendar) {
                calendar = $("<div>").kendoCalendar();
                popup = $("<div>").kendoPopup();
                calendar.appendTo(popup);
                calendar = calendar.getKendoCalendar();
                popup = popup.getKendoPopup();

                calendar.bind("change", function(){
                    popup.close();
                    var date = calendar.value();
                    context.callback(kendo.spreadsheet.dateToNumber(date));
                });
            }
            popup.setOptions({
                anchor: context.view.element.find(".k-spreadsheet-editor-button")
            });
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
                        return !kendo.spreadsheet.validation
                            .validationComparers[val.comparerType](date, from, to);
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

    registerEditor("_validation_list", function(){
        var context, list, popup;
        function create() {
            if (!list) {
                list = $("<div/>").kendoStaticList({
                    template   : "<div>#:value#</div>",
                    selectable : true,
                    autoBind   : false
                });
                popup = $("<div>").kendoPopup();
                list.appendTo(popup);
                popup = popup.getKendoPopup();
                list = list.getKendoStaticList();

                list.bind("change", function(){
                    popup.close();
                    var item = list.value()[0];
                    if (item) {
                        context.callback(item.value);
                    }
                });
            }
            popup.setOptions({
                anchor: context.view.element.find(".k-spreadsheet-editor-button")
            });
        }
        function open() {
            create();
            var matrix = context.validation.from.value;
            var data = [];
            if (matrix) {
                matrix.each(function(el){
                    data.push({ value: el });
                });
            }
            var dataSource = new kendo.data.DataSource({ data: data });
            list.setDataSource(dataSource);
            dataSource.read();
            popup.open();
        }
        return {
            edit: function(options) {
                context = options;
                open();
            },
            icon: "k-i-arrow-s"
        };
    });

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
