(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var classNames = {
        wrapper: "k-spreadsheet-formula-bar"
    };

    var FormulaBar = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);

            element = this.element.addClass(FormulaBar.classNames.wrapper);

            this.formulaInput = new kendo.spreadsheet.FormulaInput($("<div/>").appendTo(element));
        },

        destroy: function() {
            if (this.formulaInput) {
                this.formulaInput.destroy();
            }
            this.formulaInput = null;
        }
    });

    kendo.spreadsheet.FormulaBar = FormulaBar;
    $.extend(true, FormulaBar, { classNames: classNames });
})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
