(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var NameEditor = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);
            element.addClass("k-spreadsheet-name-editor");
            this.input = $("<input />").appendTo(element);
        },
        value: function(val) {
            if (val === undefined) {
                return this.input.val();
            } else {
                this.input.val(val);
            }
        }
    });

    kendo.spreadsheet.NameEditor = NameEditor;
})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
