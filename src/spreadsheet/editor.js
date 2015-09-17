(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var SheetEditor = kendo.Observable.extend({
        init: function(view) {
            kendo.Observable.fn.init.call(this);

            this.view = view;
            this.formulaBar = view.formulaBar;

            this.barInput = view.formulaBar.formulaInput;
            this.cellInput = view.formulaInput;

            this.barInput.syncWith(this.cellInput);
            this.cellInput.syncWith(this.barInput);

            //XXX: Trigger formulaInput events intead of wiring keyup here
            this.barInput.element
                .add(this.cellInput.element)
                .on("keyup", (function() {
                    this.trigger("update", { value: this.value() });
                }).bind(this));
        },

        events: [
            "activate",
            "deactivate",
            "change",
            "update"
        ],

        activeEditor: function() {
            var editor = null;

            if (this.barElement().is(":focus")) {
                editor = this.barInput;
            } else if (this.cellElement().is(":focus")) {
                editor = this.cellInput;
            }

            return editor;
        },

        activate: function(options) {
            this._active = true;

            this.position(options.rect);
            this.cellInput.resize(options.rect);

            this.trigger("activate");

            return this;
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
                this.cellInput.setPos(this.value().length);
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

        //TODO: Test
        insertRef: function() {
            var editor = this.activeEditor();
            return editor && editor.canInsertRef();
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
