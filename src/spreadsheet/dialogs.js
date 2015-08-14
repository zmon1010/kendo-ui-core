(function(f, define){
    define([ "../kendo.core", "../kendo.binder" ], f);
})(function(){

(function(kendo) {
    var $ = kendo.jQuery;
    var ObservableObject = kendo.data.ObservableObject;

    var DialogRegistry = kendo.Class.extend({
        init: function() {
            this._registry = {};
        },
        register: function(name, dialog) {
            this._registry[name] = dialog;
        },
        open: function(name, range) {
            var dialogClass = this._registry[name];

            if (dialogClass) {
                var dialog = new dialogClass();
                dialog.open(range);
            }
        }
    });

    kendo.spreadsheet.dialogs = new DialogRegistry();

    var SpreadsheetDialog = kendo.Class.extend({
        init: function(options) {
            this.dialog();

            this.options = options;
        },
        dialog: function() {
            if (!this._dialog) {
                this._dialog = $("<div class='k-spreadsheet-window k-action-window' />")
                    .addClass(this.options.className || "")
                    .append(this.template)
                    .appendTo(document.body)
                    .kendoWindow({
                        scrollable: false,
                        resizable: false,
                        maximizable: false,
                        modal: true,
                        visible: false,
                        width: 400,
                        title: this.title,
                        open: function() {
                            this.center();
                        },
                        deactivate: function() {
                            this._dialog.destroy();
                            this._dialog = null;
                        }.bind(this)
                    })
                    .data("kendoWindow");
            }

            return this._dialog;
        },
        destroy: function() {
            if (this._dialog) {
                this._dialog.destroy();
                this._dialog = null;
            }
        },
        open: function() {
            this.dialog().open();
        },
        apply: function() {
            this.close();
        },
        close: function() {
            this.dialog().close();
        }
    });

    var FormatCellsViewModel = kendo.spreadsheet.FormatCellsViewModel = ObservableObject.extend({
        init: function(options) {
            ObservableObject.fn.init.call(this, options);

            this.useCategory(this.category);
        },
        useCategory: function(category) {
            var formats = this.allFormats.filter(function(x) { return x.category == category; });
            this.set("formats", formats);
            this.category = category;
        },
        categoryFor: function(format) {
            var formats = this.allFormats;
            var category = formats[0].category;

            for (var i = 0; i < formats.length; i++) {
                if (formats[i].format == format) {
                    category = formats[i].category;
                    break;
                }
            }

            return category;
        },
        categoryFilter: function(category) {
            if (category !== undefined) {
                this.useCategory(category);
            }

            return this.category || this.categoryFor(this.format);
        },
        categories: function() {
            var category = function (x) { return x.category; };
            var unique = function (x, index, self) { return self.indexOf(x) === index; };

            return this.allFormats.map(category).filter(unique);
        },
        preview: function() {
            var format = this.get("format");
            var value = this.value || 0;

            if (format && format.length) {
                // get formatted text from virtual dom node
                value = kendo.spreadsheet.formatting.format(value, format);
                return value.children[0].nodeValue;
            } else {
                return value;
            }
        }
    });

    var FormatCellsDialog = SpreadsheetDialog.extend({
        init: function(options, toolbar) {
            options = options || {};

            options.className = "k-spreadsheet-format-cells";
            options.formats = options.formats || this.options.formats;
        },
        options: {
            formats: [
                { category: "Number", value: "?.00%", name: "100.00%" },
                { category: "Currency", value: "$?", name: "U.S. Dollar" },
                { category: "Date", value: "m/d", name: "3/14" },
                { category: "Date", value: "m/d/yy", name: "3/14/01" },
                { category: "Date", value: "mm/dd/yy", name: "03/14/01" },
                { category: "Date", value: "d-mmm", name: "14-Mar" },
                { category: "Date", value: "d-mmm-yy", name: "14-Mar-01" },
                { category: "Date", value: "dd-mmm-yy", name: "14-Mar-01" },
                { category: "Date", value: "mmm-yy", name: "Mar-01" },
                { category: "Date", value: "mmmm-yy", name: "March-01" },
                { category: "Date", value: "mmmm dd, yyyy", name: "March 14, 2001" },
                { category: "Date", value: "m/d/yy hh:mm AM/PM", name: "3/14/01 1:30 PM" },
                { category: "Date", value: "m/d/yy h:mm", name: "3/14/01 13:30" },
                { category: "Date", value: "mmmmm", name: "M" },
                { category: "Date", value: "mmmmm-yy", name: "M-01" },
                { category: "Date", value: "m/d/yyyy", name: "3/14/2001" },
                { category: "Date", value: "d-mmm-yyyy", name: "14-Mar-2001" }
            ]
        },
        template: "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +

                  "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +

                  "<div class='k-simple-tabs' " +
                      "data-role='tabstrip' " +
                      "data-bind='source: categories, value: categoryFilter' " +
                      "data-animation='false' />" +

                  "<script type='text/x-kendo-template' id='format-item-template'>" +
                      "#: data.name #" +
                  "</script>" +

                  "<ul data-role='staticlist' tabindex='0' " +
                      "class='k-list k-reset' " +
                      "data-template='format-item-template' " +
                      "data-value-primitive='true' " +
                      "data-value-field='value' " +
                      "data-bind='source: formats, value: format' />",
        open: function(range) {
            var formats = this.options.formats.slice(0);
            var value = range.value();

            this.viewModel = new FormatCellsViewModel({
                allFormats: formats,
                format: range.format(),
                category: value instanceof Date ? "Date" : null,
                apply: this.apply.bind(this),
                value: value
            });

            SpreadsheetDialog.fn.open.call(this);

            kendo.bind(this.dialog().element, this.viewModel);
        },
        apply: function() {
            var format = this.viewModel.format;

            SpreadsheetDialog.fn.apply.call(this);

            this.toolbar.trigger("execute", {
                commandType: "PropertyChangeCommand",
                property: "format",
                value: format
            });
        }
    });

    kendo.spreadsheet.dialogs.register("formatCells", FormatCellsDialog);

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
