(function(f, define){
    define([], f);
})(function(){

(function(kendo) {
    var FormulaBar = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);

            element = this.element;

            element.addClass("k-spreadsheet-formula-bar");

            this._valueInput = $("<input class='k-spreadsheet-formula-input'>").appendTo(element);
        },
        value: function(value) {
            this._valueInput.val(value);
        },
        destroy: function() {
            this._valueInput = null;
        }
    });

    kendo.spreadsheet.FormulaBar = FormulaBar;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
