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
        create: function(name, options) {
            var dialogClass = registry[name];

            if (dialogClass) {
                return new dialogClass(options);
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
                    .append(this.options.template)
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

    function formattedValue(value, format) {
        var dom = kendo.spreadsheet.formatting.format(value, format);
        return dom.children[0].nodeValue;
    }

    var FormatCellsViewModel = kendo.spreadsheet.FormatCellsViewModel = ObservableObject.extend({
        init: function(options) {
            ObservableObject.fn.init.call(this, options);

            this.useCategory(this.category);
        },
        useCategory: function(category) {
            var type = category && category.type || "number";
            var formatCurrency = type == "currency";

            this.category = category;

            this.set("showCurrencyFilter", formatCurrency && this.currencies.length > 1);

            if (!formatCurrency) {
                this.set("formats", this.allFormats[type + "Formats"]);
            } else {
                this.currency(this.currencies[0]);
            }

            this.useFirstFormat();
        },
        useFirstFormat: function() {
            if (this.formats.length) {
                this.set("format", this.formats[0].value);
            }
        },
        currency: function(currency) {
            if (currency !== undefined) {
                this._currency = currency;

                var info = currency.value;
                var formats = [
                    { currency: info, decimals: true },
                    { currency: info, decimals: true, iso: true },
                    { currency: info, decimals: false }
                ];

                formats = formats.map(function(format) {
                    format = FormatCellsViewModel.convertFormat(format);

                    return { value: format, name: formattedValue(1000, format) };
                });

                this.set("formats", formats);

                this.useFirstFormat();
            }

            return this._currency || this.currencies[0];
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
                return formattedValue(value, format);
            } else {
                return value;
            }
        }
    });

    FormatCellsViewModel.convertFormat = function(options) {
        function repeat(token, n) {
            return new Array(n+1).join(token);
        }

        // convert culture info to spreadsheet format
        var info = options.currency;
        var format = info.pattern[1];

        if (options.decimals) {
            format = format.replace(/n/g, "n" + info["."] + repeat("0", info.decimals));
        }

        if (options.iso) {
            format = '"' + info.abbr + '" ' + format.replace(/\s*\$\s*/g, "");
        } else {
            format = format.replace(/\$/g, info.symbol);
        }

        format = format.replace(/n/g, "?");

        return format;
    };

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
            currencies: $.map(kendo.cultures, function(culture, name) {
                if (name != culture.name) {
                    return;
                }

                var currency = culture.numberFormat.currency;
                var description = kendo.format(
                    "{0} ({1}, {2})",
                    currency.name,
                    currency.abbr,
                    currency.symbol
                );

                return { description: description, value: currency };
            }),
            numberFormats: [
                { value: "#.00%", name: "100.00%" },
                { value: "#%", name: "100%" },
                { value: "#.00", name: "1024.00" },
                { value: "#,###.00", name: "1,024.00" }
            ],
            // TODO: generate from current culture
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
            ],
            template:
                "<div class='k-root-tabs' data-role='tabstrip' " +
                     "data-text-field='name' " +
                     "data-bind='source: categories, value: categoryFilter' " +
                     "data-animation='false' />" +

                "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +

                "<script type='text/x-kendo-template' id='format-item-template'>" +
                    "#: data.name #" +
                "</script>" +

                "<select data-role='dropdownlist' class='k-format-filter' " +
                    "data-text-field='description' " +
                    "data-value-field='value.name' " +
                    "data-bind='visible: showCurrencyFilter, value: currency, source: currencies' />" +

                "<ul data-role='staticlist' tabindex='0' " +
                    "class='k-list k-reset' " +
                    "data-template='format-item-template' " +
                    "data-value-primitive='true' " +
                    "data-value-field='value' " +
                    "data-bind='source: formats, value: format' />" +

                "<div class='k-action-buttons'>" +
                    "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                    "<button class='k-button' data-bind='click: close'>Cancel</button>" +
                "</div>"
        },
        open: function(range) {
            var options = this.options;
            var value = range.value();
            var categories = options.categories.slice(0);
            var element;

            this.viewModel = new FormatCellsViewModel({
                currencies: options.currencies.slice(0),
                allFormats: {
                    numberFormats: options.numberFormats.slice(0),
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

            var currencyFilter = element.find("select.k-format-filter").data("kendoDropDownList");

            if (options.currencies.length > 10) {
                currencyFilter.setOptions({ filter: "contains" });
            }

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

    var MessageDialog = SpreadsheetDialog.extend({
        options: {
            className: "k-spreadsheet-message",
            title: "",
            text: "",
            template:
                "<div class='k-spreadsheet-message-content' data-bind='text: text' />" +
                "<div class='k-action-buttons'>" +
                    "<button class='k-button k-primary' data-bind='click: close, text: okText' />" +
                "</div>"
        },
        open: function() {
            SpreadsheetDialog.fn.open.call(this);

            kendo.bind(this.dialog().element, {
                text: this.options.text,
                okText: "OK",
                close: this.close.bind(this)
            });
        }
    });

    kendo.spreadsheet.dialogs.register("message", MessageDialog);

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
