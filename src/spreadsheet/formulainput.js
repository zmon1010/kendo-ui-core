(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo, window) {
    var $ = kendo.jQuery;
    var Widget = kendo.ui.Widget;
    var ns = ".kendoFormulaInput";
    var classNames = {
        wrapper: "k-spreadsheet-formula-input"
    };
    var styles = [
        "font-family",
        "font-size",
        "font-stretch",
        "font-style",
        "font-weight",
        "letter-spacing",
        "text-transform",
        "line-height"
    ];

    var FormulaInput = Widget.extend({
        init: function(element, options) {
            Widget.call(this, element, options);

            this.element.addClass(FormulaInput.classNames.wrapper)
                        .attr("contenteditable", true);

            if (this.options.autoScale) {
                this.element.on("input", this.scale.bind(this));
            }
        },

        options: {
            name: "FormulaInput",
            autoScale: false
        },

        isActive: function() {
            return this.element.is(":focus");
        },

        caretToEnd: function() {
            var nodes = this.element[0].childNodes;
            var length = nodes.length;

            if (!length || !this.isActive()) {
                return;
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.setStartAfter(nodes[nodes.length - 1]);

            selection.removeAllRanges();
            selection.addRange(range);
        },

        hide: function() {
            this.element.hide();
        },

        show: function() {
            this.element.show();
        },

        position: function(rectangle) {
            if (!rectangle) {
                return;
            }

            this.element
                .show()
                .css({
                    "top": rectangle.top + "px",
                    "left": rectangle.left + "px"
                });
        },

        resize: function(rectangle) {
            if (!rectangle) {
                return;
            }

            this.element.css({
                width: rectangle.width,
                height: rectangle.height
            });
        },

        syncWith: function(formulaInput) {
            var eventName = "input" + ns;

            this._editorToSync = formulaInput;
            this.element.off(eventName).on(eventName, this._sync.bind(this));
        },

        _sync: function() {
            if (this._editorToSync && this.isActive()) {
                this._editorToSync.value(this.value());
            }
        },

        scale: function() {
            if (!this._span) {
                this._textContainer();
            }

            this._span.html(this.element.html());

            this.element.width(this._span.width());
        },

        _textContainer: function() {
            var computedStyles = kendo.getComputedStyles(this.element[0], styles);

            computedStyles.position = "absolute";
            computedStyles.visibility = "hidden";
            computedStyles.top = -3333;
            computedStyles.left = -3333;

            this._span = $("<span/>").css(computedStyles).insertAfter(this.element);
        },

        value: function(value) {
            if (value === undefined) {
                return this.element.text();
            }

            this.element.text(value);
        },

        destroy: function() {
            this._editorToSync = null;

            this.element.off(ns);

            Widget.fn.destroy.call(this);
        }
    });

    kendo.spreadsheet.FormulaInput = FormulaInput;
    $.extend(true, FormulaInput, { classNames: classNames });
})(kendo, window);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
