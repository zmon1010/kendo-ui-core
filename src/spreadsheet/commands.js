(function(f, define){
    define([ "../kendo.core", "../kendo.binder", "../kendo.window", "../kendo.listview" ], f);
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
        init: function(options) {
            PopupCommand.fn.init.call(this, options);

            this.formats = (options && options.formats || this.options.formats).slice(0);
        },
        options: {
            formats: [
                { category: "general", value: null, name: "Automatic" },
                { category: "date", value: "m/d", name: "3/14" },
                { category: "date", value: "m/d/y", name: "3/14/01" },
                { category: "date", value: "mm/dd/y", name: "03/14/01" },
                { category: "date", value: "d-mmm", name: "14-Mar" },
                { category: "date", value: "d-mmm-y", name: "14-Mar-01" },
                { category: "date", value: "dd-mmm-y", name: "14-Mar-01" },
                { category: "date", value: "mmm-y", name: "Mar-01" },
                { category: "date", value: "mmmm-y", name: "March-01" },
                { category: "date", value: "mmmm dd, yyyy", name: "March 14, 2001" },
                { category: "date", value: "m/d/y hh:mm AM/PM", name: "3/14/01 1:30 PM" },
                { category: "date", value: "m/d/y h:mm", name: "3/14/01 13:30" },
                { category: "date", value: "mmmmm", name: "M" },
                { category: "date", value: "mmmmm-y", name: "M-01" },
                { category: "date", value: "m/d/yyyy", name: "3/14/2001" },
                { category: "date", value: "d-mmm-yyyy", name: "14-Mar-2001" },
            ]
        },
        _formatChange: function(e) {
            var listview = e.sender;
            var dataItem = listview.dataItem(listview.select());
            this.format(dataItem.value);
        },
        format: function(format) {
            if (format !== undefined) {
                this._format = format;
            }

            return this._format;
        },
        preview: function() {
            var format = this.format();
            var value = this.range().value() || 0;

            if (format) {
                value = kendo.spreadsheet.formatting.format(value, format);
                return value.children[0].nodeValue; // :(
            } else {
                return value;
            }
        },
        apply: function() {
            this.close();
        },
        close: function() {
            this.popup().close();
        },
        title: "Format Cells",
        template: "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +

                  "<script type='text/x-kendo-template' id='formats-template'>" +
                      "<li class='k-item' data-value='#= data.value #'>#: data.name #</li>" +
                  "</script>" +

                  "<ul data-role='listview' " +
                      "data-template='formats-template' " +
                      "data-selectable='true' " +
                      "data-bind='source: formats, events: { change: _formatChange }' />" +

                  "<div class='k-action-buttons'>" +
                      "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                      "<button class='k-button' data-bind='click: close'>Cancel</button>" +
                  "</div>"
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
