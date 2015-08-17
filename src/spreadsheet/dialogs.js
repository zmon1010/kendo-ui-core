(function(f, define){
    define([ "../kendo.core", "../kendo.binder" ], f);
})(function(){

(function(kendo) {
    var $ = kendo.jQuery;
    var ObservableObject = kendo.data.ObservableObject;

    var registry = {};
    kendo.spreadsheet.dialogs = {
        register: function(name, dialogClass) {
            registry[name] = dialogClass;
        },
        create: function(name) {
            var dialogClass = registry[name];

            if (dialogClass) {
                return new dialogClass();
            }
        }
    };

    var SpreadsheetDialog = kendo.spreadsheet.SpreadsheetDialog = kendo.Class.extend({
        init: function(options) {
            this.options = $.extend(true, {}, this.options, options);
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
                        width: 320,
                        title: this.options.title,
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
            var type = category && category.type || "number";
            this.category = category;
            this.set("formatCurrency", type == "currency");

            if (!this.formatCurrency) {
                this.set("formats", this.allFormats[type + "Formats"]);
            } else {
                var currencyFormats = this.allFormats.currencyFormats;
                var info = this.currencyFilter(currencyFormats[0]);
                this.set("formats", currencyFormats.map(function() {
                    return { value: info.id + "?", name: info.id + "1,000" };
                }));
            }
        },
        currencyFilter: function(currency) {
            if (currency !== undefined) {
                this.currency = currency;
            }

            return this.currency;
        },
        categoryFilter: function(category) {
            if (category !== undefined) {
                this.useCategory(category);
            }

            return this.category;
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
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);
        },
        options: {
            title: "Format number",
            className: "k-spreadsheet-format-cells",
            categories: [
                { type: "number", name: "Number" },
                { type: "currency", name: "Currency" },
                { type: "date", name: "Date" }
            ],
            numberFormats: [
                { value: "?.00%", name: "100.00%" }
            ],
            currencyFormats: [
                { name: "US Dollar (USD, $)", id: "USD", sign: "$", verbose: "US$" },
                { name: "British Pound Sterling (GBP, \u00a3)", id: "GBP", sign: "\u00a3", verbose: "GB\u00a3" },
                { name: "Euro (EUR, \u20ac)", id: "EUR", sign: "\u20ac" }
            ],
            dateFormats: [
                { value: "m/d", name: "3/14" },
                { value: "m/d/yy", name: "3/14/01" },
                { value: "mm/dd/yy", name: "03/14/01" },
                { value: "d-mmm", name: "14-Mar" },
                { value: "d-mmm-yy", name: "14-Mar-01" },
                { value: "dd-mmm-yy", name: "14-Mar-01" },
                { value: "mmm-yy", name: "Mar-01" },
                { value: "mmmm-yy", name: "March-01" },
                { value: "mmmm dd, yyyy", name: "March 14, 2001" },
                { value: "m/d/yy hh:mm AM/PM", name: "3/14/01 1:30 PM" },
                { value: "m/d/yy h:mm", name: "3/14/01 13:30" },
                { value: "mmmmm", name: "M" },
                { value: "mmmmm-yy", name: "M-01" },
                { value: "m/d/yyyy", name: "3/14/2001" },
                { value: "d-mmm-yyyy", name: "14-Mar-2001" }
            ]
        },
        template: "<div class='k-root-tabs' data-role='tabstrip' " +
                       "data-text-field='name' " +
                       "data-bind='source: categories, value: categoryFilter' " +
                       "data-animation='false' />" +

                  "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +

                  "<script type='text/x-kendo-template' id='format-item-template'>" +
                      "#: data.name #" +
                  "</script>" +

                  "<select data-role='dropdownlist' class='k-format-filter' " +
                      "data-text-field='name' " +
                      "data-bind='visible: formatCurrency, value: currencyFilter, source: allFormats.currencyFormats' />" +

                  "<ul data-role='staticlist' tabindex='0' " +
                      "class='k-list k-reset' " +
                      "data-template='format-item-template' " +
                      "data-value-primitive='true' " +
                      "data-value-field='value' " +
                      "data-bind='source: formats, value: format' />" +

                  "<div class='k-action-buttons'>" +
                      "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                      "<button class='k-button' data-bind='click: close'>Cancel</button>" +
                  "</div>",
        open: function(range) {
            var options = this.options;
            var value = range.value();
            var categories = options.categories.slice(0);
            var element;

            this.viewModel = new FormatCellsViewModel({
                allFormats: {
                    numberFormats: options.numberFormats.slice(0),
                    currencyFormats: options.currencyFormats.slice(0),
                    dateFormats: options.dateFormats.slice(0)
                },
                categories: categories,
                format: range.format(),
                category: value instanceof Date ? categories[2] : categories[0],
                apply: this.apply.bind(this),
                close: this.close.bind(this),
                value: value
            });

            SpreadsheetDialog.fn.open.call(this);

            element = this.dialog().element;

            kendo.bind(element, this.viewModel);

            element.find(kendo.roleSelector("staticlist")).parent().addClass("k-list-wrapper");
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
