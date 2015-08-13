(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var classNames = {
        wrapper: "k-spreadsheet-formula-bar"
    };

    var FormulaBar = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);

            element = this.element;

            element.addClass(FormulaBar.classNames.wrapper);

            this._formulaInput = new kendo.spreadsheet.FormulaInput($("<div/>").appendTo(element), {
                change: this._onChange.bind(this)
            });

            //TODO: should be removed
            this._formulaInput.element.on("blur", (function() {
                this.trigger("change", {
                    value: this._formulaInput.value()
                });
            }).bind(this));
        },
        events: [
            "change"
        ],
        _onChange: function(e) {
            this.trigger("change", e);
        },
        value: function(value) {
            if (value === undefined) {
                return this._formulaInput.value();
            }

            this._formulaInput.value(value);
        },
        destroy: function() {
            if (this._formulaInput) {
                this._formulaInput.destroy();
            }
            this._formulaInput = null;
        }
    });

    kendo.spreadsheet.FormulaBar = FormulaBar;
    $.extend(true, FormulaBar, { classNames: classNames });
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
