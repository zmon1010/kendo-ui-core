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
            this.input = $("<input />").appendTo(element)
                .on("keydown", this._on_keyDown.bind(this))
                .on("focus", this._on_focus.bind(this));
        },
        value: function(val) {
            if (val === undefined) {
                return this.input.val();
            } else {
                this.input.val(val);
            }
        },
        // blur: function() {
        //     this.input.blur();
        // },
        // focus: function() {
        //     this.input.focus();
        //     this.input.select();
        // },

        _on_keyDown: function(ev) {
            switch (ev.keyCode) {
              case 27:
                this.input.val(this._prevValue);
                this.trigger("cancel");
                break;
              case 13:
                this.trigger("enter");
                break;
            }
        },
        _on_focus: function() {
            this._prevValue = this.input.val();
        }
    });

    kendo.spreadsheet.NameEditor = NameEditor;
})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
