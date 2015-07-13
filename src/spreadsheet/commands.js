(function(f, define){
    define([ "../kendo.core", "../kendo.binder", "../kendo.window" ], f);
})(function(){

(function(kendo) {
    var Command = kendo.spreadsheet.Command = kendo.Class.extend({
        init: function(options) {
            this._sheet = options.sheet;
            this._ref = options.ref;
        },
        range: function() {
            return this._sheet.range(this._ref);
        },
        redo: function() {
            this.exec();
        }
    });

    var PropertyChangeCommand = kendo.spreadsheet.PropertyChangeCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._property = options.property;
            this._value = options.value;
        },
        exec: function() {
            var range = this.range();
            this._state = range[this._property]();
            range[this._property](this._value);
        },
        undo: function() {
            this.range()[this._property](this._state);
        }
    });

    var EditCommand = kendo.spreadsheet.EditCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "_editableValue";
            PropertyChangeCommand.fn.init.call(this, options);
        }
    });

    var PopupCommand = kendo.spreadsheet.PopupCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._dialogOptions = options.dialogOptions;
        },
        popup: function() {
            return this._popup;
        },
        template: "",
        exec: function() {
            this._popup = $("<div class='k-spreadsheet-window' />")
                .append(this.template)
                .appendTo(document.body)
                .kendoWindow($.extend({
                    modal: true,
                    title: this.title,
                    width: 300,
                    height: 200,
                    open: function() {
                        this.center();
                    },
                    deactivate: function() {
                        this.destroy();
                    }
                }, this._dialogOptions))
                .data("kendoWindow");

            kendo.bind(this._popup.element, this);
        }
    });

    var FormatCellsCommand = kendo.spreadsheet.FormatCellsCommand = PopupCommand.extend({
        preview: function() {
            return this.range().value();
        },
        title: "Format Cells",
        template: "<div class='k-spreadsheet-preview' data-bind='text: preview' />"
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
