(function(f, define){
    define([ "../kendo.core", "../kendo.binder", "../kendo.window", "../kendo.list" ], f);
})(function(){

(function(kendo) {
    var Command = kendo.spreadsheet.Command = kendo.data.ObservableObject.extend({
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
            Command.fn.init.call(this);
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
            Command.fn.init.call(this);
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
        init: function(options) {
            PopupCommand.fn.init.call(this, options);

            var formats = (options && options.formats || this.options.formats).slice(0);
            this.formats = new kendo.data.ObservableArray(formats);
        },
        options: {
            formats: [
                { category: "general", value: null, name: "General" },
                { category: "date", value: "m/d", name: "3/14" },
                { category: "date", value: "m/d/yy", name: "3/14/01" },
                { category: "date", value: "mm/dd/yy", name: "03/14/01" },
                { category: "date", value: "d-mmm", name: "14-Mar" },
                { category: "date", value: "d-mmm-yy", name: "14-Mar-01" },
                { category: "date", value: "dd-mmm-yy", name: "14-Mar-01" },
                { category: "date", value: "mmm-yy", name: "Mar-01" },
                { category: "date", value: "mmmm-yy", name: "March-01" },
                { category: "date", value: "mmmm dd, yyyy", name: "March 14, 2001" },
                { category: "date", value: "m/d/yy hh:mm AM/PM", name: "3/14/01 1:30 PM" },
                { category: "date", value: "m/d/yy h:mm", name: "3/14/01 13:30" },
                { category: "date", value: "mmmmm", name: "M" },
                { category: "date", value: "mmmmm-yy", name: "M-01" },
                { category: "date", value: "m/d/yyyy", name: "3/14/2001" },
                { category: "date", value: "d-mmm-yyyy", name: "14-Mar-2001" }
            ]
        },
        format: null,
        preview: function() {
            var format = this.get("format");
            var value = this.range().value() || 0;

            if (format) {
                value = kendo.spreadsheet.formatting.format(value, format);
                return value.children[0].nodeValue; // :(
            } else {
                return value;
            }
        },
        exec: function() {
            this.format = this.range().format();

            PopupCommand.fn.exec.call(this);
        },
        apply: function() {
            this.range().format(this.format);
            this.close();
        },
        close: function() {
            this.popup().close();
        },
        title: "Format Cells",
        template: "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +

                  "<script type='text/x-kendo-template' id='format-item-template'>" +
                      "#: data.name #" +
                  "</script>" +

                  "<ul data-role='staticlist' " +
                      "class='k-list k-reset' " +
                      "data-template='format-item-template' " +
                      "data-value-primitive='true' " +
                      "data-value-field='value' " +
                      "data-bind='source: formats, value: format' />" +

                  "<div class='k-action-buttons'>" +
                      "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                      "<button class='k-button' data-bind='click: close'>Cancel</button>" +
                  "</div>"
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
