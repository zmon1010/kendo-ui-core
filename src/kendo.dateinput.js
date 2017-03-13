(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dateinput",
    name: "DateInput",
    category: "web",
    description: "The DateInput widget allows to edit date by typing.",
    depends: [ "core" ]
};

(function ($, undefined) {
    var global = window;
    var kendo = global.kendo;
    var caret = kendo.caret;
    var Class = kendo.Class;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var ns = ".kendoDateInput";
    var proxy = $.proxy;

    var INPUT_EVENT_NAME = (kendo.support.propertyChangeEvent ? "propertychange" : "input") + ns;
    var STATEDISABLED = "k-state-disabled";
    var DISABLED = "disabled";
    var READONLY = "readonly";
    var CHANGE = "change";


    //TODO: class that will be able to work with partially filled dates.
    var customDateTime = function () {
        var zeros = ["", "0", "00", "000", "0000"];
        function pad(number, digits, end) {
            number = number + "";
            digits = digits || 2;
            end = digits - number.length;

            if (end) {
                return zeros[digits].substring(0, end) + number;
            }

            return number;
        }
        var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|zzz|zz|z|"[^"]*"|'[^']*'/g;
        var date = null, months = null, calendar = null, days = null, returnsFormat = false;
        var matcher = function (match) {
            var minutes, sign;
            var result;

            switch (match) {
                case ("d"): result = date.getDate(); break;
                case ("dd"): result = pad(date.getDate()); break;
                case ("ddd"): result = days.namesAbbr[date.getDay()]; break;
                case ("dddd"): result = days.names[date.getDay()]; break;

                case ("M"): result = date.getMonth() + 1; break;
                case ("MM"): result = pad(date.getMonth() + 1); break;
                case ("MMM"): result = months.namesAbbr[date.getMonth()]; break;
                case ("MMMM"): result = months.names[date.getMonth()]; break;

                case ("yy"): result = pad(date.getFullYear() % 100); break;
                case ("yyyy"): result = pad(date.getFullYear(), 4); break;

                case ("h"): result = date.getHours() % 12 || 12; break;
                case ("hh"): result = pad(date.getHours() % 12 || 12); break;
                case ("H"): result = date.getHours(); break;
                case ("HH"): result = pad(date.getHours()); break;
                case ("m"): result = date.getMinutes(); break;
                case ("mm"): result = pad(date.getMinutes()); break;
                case ("s"): result = date.getSeconds(); break;
                case ("ss"): result = pad(date.getSeconds()); break;
                case ("f"): result = math.floor(date.getMilliseconds() / 100); break;
                case ("ff"):
                    result = date.getMilliseconds();
                    if (result > 99) {
                        result = math.floor(result / 10);
                    }
                    result = pad(result);
                    break;
                case ("fff"): result = pad(date.getMilliseconds(), 3); break;
                case ("tt"): result = date.getHours() < 12 ? calendar.AM[0] : calendar.PM[0]; break;
                case ("zzz"):
                    minutes = date.getTimezoneOffset();
                    sign = minutes < 0;
                    result = math.abs(minutes / 60).toString().split(".")[0];
                    minutes = math.abs(minutes) - (result * 60);
                    result = (sign ? "+" : "-") + pad(result);
                    result += ":" + pad(minutes);
                    break;
                case ("z"):
                case ("zz"):
                    result = date.getTimezoneOffset() / 60;
                    sign = result < 0;
                    result = math.abs(result).toString().split(".")[0];
                    result = (sign ? "+" : "-") + (match === "zz" ? pad(result) : result);
                    break;
            }
            result !== undefined ? result : match.slice(1, match.length - 1);

            if (returnsFormat) {
                result = "" + result;
                var formatResult = "";
                for (var i = 0; i < result.length; i++) {
                    formatResult += match[0];
                }
                return formatResult;
            } else {
                return result;
            }
        }

        function generateMatcher(culture, format, date1, retFormat = false) {
            returnsFormat = retFormat;
            calendar = culture.calendars.standard;
            format = calendar.patterns[format] || format;
            days = calendar.days;
            date = date1;
            months = calendar.months;
            return matcher;
        }

        this.formatDate = function (date, format, culture) {
            if (!format) {
                //TODO: revise this
                return ["", ""];
                //return date !== undefined ? value : "";
            }
            culture = kendo.getCulture(culture);
            //console.log(format.replace(dateFormatRegExp, generateMatcher(culture, format, date, false)));
            //console.log(format.replace(dateFormatRegExp, generateMatcher(culture, format, date, true)));

            return [format.replace(dateFormatRegExp, generateMatcher(culture, format, date, false)),
            format.replace(dateFormatRegExp, generateMatcher(culture, format, date, true))];
        }
    }

    var DateInput = Widget.extend({
        init: function (element, options) {
            var that = this;
            var DOMElement;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            options.format = kendo._extractFormat(options.format || kendo.getCulture(options.culture).calendars.standard.patterns.d);

            element = that.element;
            DOMElement = element[0];
            that.wrapper = element;
            that._form();

            that.element
                .addClass("k-textbox")
                .attr("autocomplete", "off")
                .on("focus" + ns, function () {
                    var value = DOMElement.value;
                })
                .on("focusout" + ns, function () {
                    var value = element.val();
                    that._change();
                });

            var disabled = element.is("[disabled]") || $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(element.is("[readonly]"));
            }

            that.value(that.options.value || element.val());

            kendo.notify(that);
        },

        options: {
            name: "DateInput",
            culture: "",
            value: "",
            format: ""
        },

        events: [
            CHANGE
        ],

        setOptions: function (options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);
            this._unbindInput();
            this._bindInput();
        },

        destroy: function () {
            var that = this;

            that.element.off(ns);

            if (that._formElement) {
                that._formElement.off("reset", that._resetHandler);
            }

            Widget.fn.destroy.call(that);
        },

        value: function (value) {
            var element = this.element;
            var options = this.options;

            if (value === undefined) {
                return this.element.val();
            }

            if (value === null) {
                value = "";
            }
            var dt = new customDateTime();

            element.val(dt.formatDate(new Date(), options.format, options.culture)[0]);
        },

        readonly: function (readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function (enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        _bindInput: function () {
            var that = this;

            that.element
                .on("keydown" + ns, proxy(that._keydown, that))
                .on("paste" + ns, proxy(that._paste, that))
                .on(INPUT_EVENT_NAME, proxy(that._input, that));

        },

        _unbindInput: function () {
            this.element
                .off("keydown" + ns)
                .off("paste" + ns)
                .off(INPUT_EVENT_NAME);
        },

        _editable: function (options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;

            that._unbindInput();

            if (!readonly && !disable) {
                element.removeAttr(DISABLED)
                    .removeAttr(READONLY)
                    .removeClass(STATEDISABLED);

                that._bindInput();
            } else {
                element.attr(DISABLED, disable)
                    .attr(READONLY, readonly)
                    .toggleClass(STATEDISABLED, disable);
            }
        },

        _change: function () {
            var that = this;
            var value = that.value();

            if (value !== that._oldValue) {
                that._oldValue = value;

                that.trigger(CHANGE);
                that.element.trigger(CHANGE);
            }
        },

        _input: function () {
            var that = this;
            var element = that.element[0];
            var value = element.value;
            var options = that.options;

            if (kendo._activeElement() !== element) {
                return;
            }

            //TODO, do the magic here
        },

        _paste: function (e) {
            that._pasting = true;
        },

        _form: function () {
            var that = this;
            var element = that.element;
            var formId = element.attr("form");
            var form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function () {
                    setTimeout(function () {
                        that.value(element[0].value);
                    });
                };

                that._formElement = form.on("reset", that._resetHandler);
            }
        },

        _keydown: function (e) {
            var key = e.keyCode;
            var element = this.element[0];
            var selection = caret(element);
            var start = selection[0];
            var end = selection[1];
            //TODO: keyboard navigation
        }
    });

    ui.plugin(DateInput);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
