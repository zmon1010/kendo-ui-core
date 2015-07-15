(function(f, define){
    define([ "../kendo.core", "../kendo.binder", "../kendo.window" ], f);
})(function(){

(function(kendo) {
    var Command = kendo.spreadsheet.Command = kendo.Class.extend({
        range: function(range) {
            if (range !== undefined) {
                this._range = range;
            }

            return this._range;
        },
        redo: function() {
            this.exec();
        }
    });

    var PropertyChangeCommand = kendo.spreadsheet.PropertyChangeCommand = Command.extend({
        init: function(options) {
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
            this._dialogOptions = options && options.dialogOptions;
        },
        popup: function() {
            return this._popup;
        },
        template: "",
        exec: function() {
            this._popup = $("<div class='k-spreadsheet-window k-action-window' />")
                .append(this.template)
                .appendTo(document.body)
                .kendoWindow($.extend({
                    scrollable: false,
                    resizable: false,
                    maximizable: false,
                    modal: true,
                    width: 400,
                    title: this.title,
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
        template: "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +
                  "<div class='k-action-buttons'>" +
                      "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                      "<button class='k-button' data-bind='click: cancel'>Cancel</button>" +
                  "</div>"
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
