(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var SheetEditor = kendo.Observable.extend({
        init: function(view) {
            kendo.Observable.fn.init.call(this);

            this.view = view;
            this.formulaBar = view.formulaBar;

            this.barInput = view.formulaBar.formulaInput;
            this.cellInput = view.formulaInput;

            this.barInput.syncWith(this.cellInput);
            this.cellInput.syncWith(this.barInput);

            this.barInput.bind("keyup", this._triggerUpdate.bind(this));
            this.cellInput.bind("keyup", this._triggerUpdate.bind(this));

            this.barInput.bind("focus", this._focus.bind(this));
            this.cellInput.bind("focus", this._focus.bind(this));
        },

        events: [
            "activate",
            "deactivate",
            "change",
            "update"
        ],

        _focus: function(e) {
            this.lastActive = e.sender == this.barInput ? "bar" : "cell";
        },

        _triggerUpdate: function() {
            this.trigger("update", { value: this.value() });
        },

        activeEditor: function() {
            var editor = null;
            var activeElement = kendo._activeElement();

            if (this.barElement()[0] === activeElement) {
                editor = this.barInput;
            } else if (this.cellElement()[0] === activeElement) {
                editor = this.cellInput;
            }

            return editor;
        },

        activate: function(options) {
            this._active = true;
            this._rect = options.rect;

            this.cellInput.position(options.rect);
            this.cellInput.resize(options.rect);
            this.cellInput.tooltip(options.tooltip);
            this.cellInput.activeCell = this.barInput.activeCell = options.range.topLeft;

            this.trigger("activate");

            return this;
        },

        deactivate: function() {
            var cellInput = this.cellInput;

            if (!this._active) {
                return;
            }

            if (cellInput.value() != this._value) {
                if (this.trigger("change", { value: cellInput.value() })) {
                    return;
                }
            }

            this._active = false;
            this._rect = null;

            cellInput.hide();

            this.trigger("deactivate");
        },

        enable: function(enable) {
            this.barInput.enable(enable);
        },

        barElement: function() {
            return this.barInput.element;
        },

        cellElement: function() {
            return this.cellInput.element;
        },

        focusLastActive: function () {
            this.focus(this.lastActive);
        },

        focus: function(inputType) {
            inputType = inputType || "cell";

            if (inputType === "cell") {
                this.cellInput.element.focus();
                this.cellInput.end();
            } else {
                this.barInput.element.focus();
            }
        },

        isActive: function() {
            return this._active;
        },

        isFiltered: function() {
            return this.barInput.popup.visible() || this.cellInput.popup.visible();
        },

        canInsertRef: function(isKeyboardAction) {
            var editor = this.activeEditor();
            return editor && editor.canInsertRef(isKeyboardAction);
        },

        highlightedRefs: function() {
            var editor = this.activeEditor();
            var refs = [];

            if (editor) {
                refs = editor.highlightedRefs();
            }

            return refs;
        },

        scale: function() {
            this.cellInput.scale();
        },

        toggleTooltip: function(rect) {
            this.cellInput.toggleTooltip(notEqual(this._rect, rect));
        },

        value: function(value) {
            if (value === undefined) {
                return this.barInput.value();
            }

            if (value === null) {
                value = "";
            }

            this._value = value;

            this.barInput.value(value);
            this.cellInput.value(value);
        },

        insertNewline: function() {
            var val = this.value();
            var pos = this.activeEditor().getPos();
            val = val.substr(0, pos.begin) + "\n" + val.substr(pos.end);
            this.value(val);
            this.activeEditor().setPos(pos.begin + 1);
            this.scale();
        }
    });

    function notEqual(oldRect, newRect) {
        return oldRect && (oldRect.top !== newRect.top || oldRect.left !== newRect.left);
    }

    kendo.spreadsheet.SheetEditor = SheetEditor;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
