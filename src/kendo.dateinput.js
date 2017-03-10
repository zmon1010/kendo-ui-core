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

(function($, undefined) {
    var global = window;
    var Array = global.Array;
    var kendo = global.kendo;
    var caret = kendo.caret;
    var keys = kendo.keys;
    var Class = kendo.Class;
    var isFunction = kendo.isFunction;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var ns = ".kendoDateInput";
    var proxy = $.proxy;

    var INPUT_EVENT_NAME = (kendo.support.propertyChangeEvent ? "propertychange" : "input") + ns;
    var STATEDISABLED = "k-state-disabled";
    var DISABLED = "disabled";
    var READONLY = "readonly";
    var CHANGE = "change";

    function isString(value) {
        return (typeof value === "string");
    }

    var DateInput = Widget.extend({
        init: function(element, options) {
            var that = this;
            var DOMElement;

            Widget.fn.init.call(that, element, options);
            that._rules = $.extend({}, that.rules, that.options.rules);

            element = that.element;
            DOMElement = element[0];
            that.wrapper = element;
            that._form();

            that.element
                .addClass("k-textbox")
                .attr("autocomplete", "off")
                .on("focus" + ns, function() {
                    var value = DOMElement.value;
                })
                .on("focusout" + ns, function() {
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

        setOptions: function(options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);
            this._unbindInput();
            this._bindInput();            
        },

        destroy: function() {
            var that = this;

            that.element.off(ns);

            if (that._formElement) {
                that._formElement.off("reset", that._resetHandler);
            }

            Widget.fn.destroy.call(that);
        },

        value: function(value) {
            var element = this.element;
            var options = this.options;

            if (value === undefined) {
                return this.element.val();
            }

            if (value === null) {
                value = "";
            }

            element.val(kendo.toString(new Date(), options.format, options.culture));
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        _bindInput: function() {
            var that = this;

                that.element
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("paste" + ns, proxy(that._paste, that))
                    .on(INPUT_EVENT_NAME, proxy(that._propertyChange, that));
            
        },

        _unbindInput: function() {
            this.element
                .off("keydown" + ns)
                .off("paste" + ns)
                .off(INPUT_EVENT_NAME);
        },

        _editable: function(options) {
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

        _change: function() {
            var that = this;
            var value = that.value();

            if (value !== that._oldValue) {
                that._oldValue = value;

                that.trigger(CHANGE);
                that.element.trigger(CHANGE);
            }
        },

        _propertyChange: function() {
            var that = this;
            var element = that.element[0];
            var value = element.value;
            var options = that.options;

            if (kendo._activeElement() !== element) {
                return;
            }

            //TODO, do the magic here
        },

        _paste: function(e) {
            that._pasting = true;
        },

        _form: function() {
            var that = this;
            var element = that.element;
            var formId = element.attr("form");
            var form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(element[0].value);
                    });
                };

                that._formElement = form.on("reset", that._resetHandler);
            }
        },

        _keydown: function(e) {
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
