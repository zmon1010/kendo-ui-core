(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var SheetEditor = kendo.Observable.extend({
        init: function(view) {
            kendo.Observable.fn.init.call(this);

            this.view = view;
            this.formulaBar = view.formulaBar;

            this.barInput = view.formulaBar.formulaInput;
            this.cellInput = view.formulaInput;

            this.barInput.syncWith(this.cellInput);
            this.cellInput.syncWith(this.barInput);
        },

        events: [
            "activate",
            "deactivate",
            "change"
        ],

        activate: function(rect) {
            this._active = true;

            this.position(rect);
            this.cellInput.resize(rect);

            this.trigger("activate");
        },

        deactivate: function() {
            var cellInput = this.cellInput;

            if (!this._active) {
                return;
            }

            this._active = false;

            cellInput.hide();

            if (cellInput.value() != this._value) {
                this.trigger("change", { value: cellInput.value() });
            }

            this.trigger("deactivate");
        },

        barElement: function() {
            return this.barInput.element;
        },

        cellElement: function() {
            return this.cellInput.element;
        },

        focus: function(inputType) {
            inputType = inputType || "cell";

            if (inputType === "cell") {
                this.cellInput.element.focus();
            } else {
                this.barInput.element.focus();
            }
        },

        isActive: function() {
            return this._active;
        },

        //TODO Test and find better name
        keep: function() {
            return this.barInput.popup.visible() || this.cellInput.popup.visible();
        },

        scale: function() {
            this.cellInput.scale();
        },

        position: function(rect) {
            this.cellInput.position(rect);
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
        }
    });

    kendo.spreadsheet.SheetEditor = SheetEditor;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
