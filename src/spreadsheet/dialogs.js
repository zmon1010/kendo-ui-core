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

    var SpreadsheetDialog = kendo.spreadsheet.SpreadsheetDialog = kendo.Observable.extend({
        init: function(options) {
            kendo.Observable.fn.init.call(this, options);

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
                        width: this.options.width || 320,
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
                    format = FormatCellsViewModel.convert.currency(format);

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
                return formattedValue(value, format);
            } else {
                return value;
            }
        }
    });

    FormatCellsViewModel.convert = {
        currency: function(options) {
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
        },
        date: function(format) {
            if ((/T|Z/).test(format)) {
                return "";
            }

            return format.toLowerCase().replace(/tt/g, "AM/PM").replace(/'/g, '"');
        }
    };

    function uniqueBy(field, array) {
        var result = [];
        var values = [];

        for (var i = 0; i < array.length; i++) {
            if ($.inArray(array[i][field], values) == -1) {
                result.push(array[i]);
                values.push(array[i][field]);
            }
        }

        return result;
    }

    var FormatCellsDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this._generateFormats();
        },
        options: {
            title: "Format number",
            className: "k-spreadsheet-format-cells",
            categories: [
                { type: "number", name: "Number" },
                { type: "currency", name: "Currency" },
                { type: "date", name: "Date" }
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
        _generateFormats: function() {
            var options = this.options;

            if (!options.currencies) {
                options.currencies = FormatCellsDialog.currenciesFrom(kendo.cultures);
            }

            if (!options.numberFormats) {
                options.numberFormats = [
                    { value: "#.00%", name: "100.00%" },
                    { value: "#%", name: "100%" },
                    { value: "#.00", name: "1024.00" },
                    { value: "#,###.00", name: "1,024.00" }
                ];
            }

            if (!options.dateFormats) {
                var calendarPatterns = kendo.cultures.current.calendars.standard.patterns;

                options.dateFormats = uniqueBy("value", $.map(calendarPatterns, function(format) {
                    format = FormatCellsViewModel.convert.date(format);

                    if (!format) {
                        return;
                    }

                    return { value: format, name: formattedValue(34567.7678, format) };
                }));
            }
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

            this.trigger("action", {
                command: "PropertyChangeCommand",
                options: {
                    property: "format",
                    value: format
                }
            });
        }
    });

    FormatCellsDialog.currenciesFrom = function (cultures) {
        return uniqueBy("description", $.map(cultures, function(culture, name) {
            if (!(/-/).test(name)) {
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
        }));
    };

    kendo.spreadsheet.dialogs.register("formatCells", FormatCellsDialog);

    kendo.spreadsheet.dialogs.FormatCellsDialog = FormatCellsDialog;

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

    var FontFamilyDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this._list();
        },
        options: {
            title: "Font",
            template: "<ul class='k-list k-reset'></ul>"
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");
            var fonts = this.options.fonts;
            var defaultFont = this.options.defaultFont;

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: fonts }),
                template: "#:data#",
                value: defaultFont,
                change: this.apply.bind(this)
            });

            this.list.dataSource.fetch();
        },
        apply: function(e) {
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "PropertyChangeCommand",
                options: {
                    property: "fontFamily",
                    value: e.sender.value()[0]
                }
            });
        }
    });

    kendo.spreadsheet.dialogs.register("fontFamily", FontFamilyDialog);

    var FontSizeDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this._list();
        },
        options: {
            title: "Font Size",
            template: "<ul class='k-list k-reset'></ul>"
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");
            var sizes = this.options.sizes;
            var defaultSize = this.options.defaultSize;

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: sizes }),
                template: "#:data#",
                value: defaultSize,
                change: this.apply.bind(this)
            });

            this.list.dataSource.fetch();
        },
        apply: function(e) {
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "PropertyChangeCommand",
                options: {
                    property: "fontSize",
                    value: kendo.parseInt(e.sender.value()[0]) + "px"
                }
            });
        }
    });

    kendo.spreadsheet.dialogs.register("fontSize", FontSizeDialog);

    var BordersDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this.element = this.dialog().element;
            this._borderPalette();

            this.viewModel = kendo.observable({
                apply: this.apply.bind(this),
                close: this.close.bind(this)
            });

            kendo.bind(this.element.find(".k-action-buttons"), this.viewModel);
        },
        options: {
            title: "Borders",
            width: 177,
            template:   "<div></div>" +
                        "<div class='k-action-buttons'>" +
                            "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                            "<button class='k-button' data-bind='click: close'>Cancel</button>" +
                        "</div>"
        },
        apply: function() {
            SpreadsheetDialog.fn.apply.call(this);

            var state = this.value();

            this.trigger("action", {
                command: "BorderChangeCommand",
                options: {
                    border: state.type,
                    style: { size: "1px", color: state.color }
                }
            });
        },
        _borderPalette: function() {
            var element = this.dialog().element.find("div:first");

            this.borderPalette = new kendo.spreadsheet.BorderPalette(element, {
                change: this.value.bind(this)
            });
        },
        value: function(state) {
            if (state === undefined) {
                return this._state;
            } else {
                this._state = state;
            }
        }
    });

    kendo.spreadsheet.dialogs.register("borders", BordersDialog);

    var ColorPickerDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this.element = this.dialog().element;
            this._colorPalette();
            this.property = options.property;
            this.options.title = options.title;

            this.viewModel = kendo.observable({
                apply: this.apply.bind(this),
                close: this.close.bind(this)
            });

            kendo.bind(this.element.find(".k-action-buttons"), this.viewModel);
        },
        options: {
            width: 177,
            template:   "<div></div>" +
                        "<div class='k-action-buttons'>" +
                            "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                            "<button class='k-button' data-bind='click: close'>Cancel</button>" +
                        "</div>"
        },
        apply: function() {
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "PropertyChangeCommand",
                options: {
                    property: this.property,
                    value: this.value()
                }
            });
        },
        _colorPalette: function() {
            var element = this.dialog().element.find("div:first");
            this.colorPalette = element.kendoColorPalette({
                palette: [ //metro palette
                    "#ffffff", "#000000", "#d6ecff", "#4e5b6f", "#7fd13b", "#ea157a", "#feb80a", "#00addc", "#738ac8", "#1ab39f",
                    "#f2f2f2", "#7f7f7f", "#a7d6ff", "#d9dde4", "#e5f5d7", "#fad0e4", "#fef0cd", "#c5f2ff", "#e2e7f4", "#c9f7f1",
                    "#d8d8d8", "#595959", "#60b5ff", "#b3bcca", "#cbecb0", "#f6a1c9", "#fee29c", "#8be6ff", "#c7d0e9", "#94efe3",
                    "#bfbfbf", "#3f3f3f", "#007dea", "#8d9baf", "#b2e389", "#f272af", "#fed46b", "#51d9ff", "#aab8de", "#5fe7d5",
                    "#a5a5a5", "#262626", "#003e75", "#3a4453", "#5ea226", "#af0f5b", "#c58c00", "#0081a5", "#425ea9", "#138677",
                    "#7f7f7f", "#0c0c0c", "#00192e", "#272d37", "#3f6c19", "#750a3d", "#835d00", "#00566e", "#2c3f71", "#0c594f"
                ],
                change: this.value.bind(this)
            }).data("kendoColorPalette");
        },
        value: function(e) {
            if (e === undefined) {
                return this._value;
            } else {
                this._value = e.value;
            }
        }
    });

    kendo.spreadsheet.dialogs.register("colorPicker", ColorPickerDialog);

    var AlignmentDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this._list();
        },
        options: {
            title: "Alignment",
            template: "<ul class='k-list k-reset'></ul>",
            buttons: [
                { property: "textAlign",     value: "left",    iconClass: "justify-left" },
                { property: "textAlign",     value: "center",  iconClass: "justify-center" },
                { property: "textAlign",     value: "right",   iconClass: "justify-right" },
                { property: "textAlign",     value: "justify", iconClass: "justify-full" },
                { property: "verticalAlign", value: "top",     iconClass: "align-top" },
                { property: "verticalAlign", value: "middle",  iconClass: "align-middle" },
                { property: "verticalAlign", value: "bottom",  iconClass: "align-bottom" }
            ]
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: this.options.buttons }),
                template: "<a title='Align #=value#' data-property='#=property#' data-value='#=value#'>" +
                                "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>" +
                                "Align #=value#" +
                           "</a>",
                change: this.apply.bind(this)
            });

            this.list.dataSource.fetch();
        },
        apply: function(e) {
            var dataItem = e.sender.value()[0];
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "PropertyChangeCommand",
                options: {
                    property: dataItem.property,
                    value: dataItem.value
                }
            });
        }
    });

    kendo.spreadsheet.dialogs.register("alignment", AlignmentDialog);

    var MergeDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this._list();
        },
        options: {
            title: "Merge cells",
            template: "<ul class='k-list k-reset'></ul>",
            buttons: [
                { value: "cells",        iconClass: "merge-cells" },
                { value: "horizontally", iconClass: "merge-horizontally" },
                { value: "vertically",   iconClass: "merge-vertically" },
                { value: "unmerge",      iconClass: "normal-layout" }
            ]
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: this.options.buttons }),
                template: function(data) {
                    var title = data.value === "unmerge" ? "Unmerge" : "Merge " + data.value;

                    return "<a title='" + title + "' data-value=" + data.value + ">" +
                                "<span class='k-icon k-font-icon k-i-" + data.iconClass + "'></span>" + title +
                           "</a>";
                },
                change: this.apply.bind(this)
            });

            this.list.dataSource.fetch();
        },
        apply: function(e) {
            var dataItem = e.sender.value()[0];
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "MergeCellCommand",
                options: {
                    value: dataItem.value
                }
            });
        }
    });

    kendo.spreadsheet.dialogs.register("merge", MergeDialog);

    var ValidationViewModel = kendo.spreadsheet.ValidationCellsViewModel = ObservableObject.extend({
        init: function(options) {
            ObservableObject.fn.init.call(this, options);

            this.bind("change", (function(e) {
                if (e.field === "criterion") {
                    this.clear();
                }
            }).bind(this));

            this._init();
        },
        _init: function() {
            this.number = {};
            this.text = {};
            this.date = {};
            this.custom = {};
            this.clear();
        },
        clear: function() {
            this.set("number.comparer", "greaterThan");
            this.set("number.from", null);
            this.set("number.to", null);

            this.set("text.comparer", "greaterThan");
            this.set("text.from", null);

            this.set("date.comparer", "greaterThan");
            this.set("date.from", null);
            this.set("date.to", null);

            this.set("custom.from", null);
        },
        isNumber: function() {
            return this.get("criterion") === "number";
        },
        isText: function() {
            return this.get("criterion") === "text";
        },
        isDate: function() {
            return this.get("criterion") === "date";
        },
        isCustom: function() {
            return this.get("criterion") === "custom";
        },
        showRemove: function() {
            return this.get("hasValidation");
        },
        reset: function() {
            this.set("criterion", "any");
        },
        update: function(validation) {
            this.set("hasValidation", !!validation);

            if (validation) {
                var context = this[validation.dataType || "text"];

                context.comparer = validation.comparerType;
                context.from = validation.from;
                context.to = validation.to;

                this.criterion = validation.dataType;
                this.type = validation.type;
            }
        },
        toValidationObject: function() { //TODO: build proper validation object here
            var criterion = this.criterion;
            var context = this[criterion];

            if (!context) {
                return null;
            }

            return {
                type: this.type,
                dataType: criterion !== "custom" ? criterion : "",
                comparerType: context.comparer,
                from: context.from,
                to: context.to
            };
        }
    });

    var ValidationDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);
        },
        options: {
            width: 420,
            title: "Data Validation",
            criterion: "any",
            type: "reject",
            hint: "Please enter message!",
            criteria: [
                { type: "any", name: "Any value" },
                { type: "number", name: "Number" },
                { type: "text", name: "Text" },
                { type: "date", name: "Date" },
                { type: "custom", name: "Custom Formula" }
            ],
            comparers: [
                { type: "greaterThan", name: "greater than" },
                { type: "lessThan", name: "less than" },
                { type: "between", name: "between" },
                { type: "notBetween", name: "not between" },
                { type: "equalTo", name: "equal to" },
                { type: "notEqualTo", name: "not equal to" },
                { type: "greaterThanOrEqualTo", name: "greater than or equal to" },
                { type: "lessThanOrEqualTo", name: "less than or equal to" }
            ],
            template:
                '<div class="k-edit-form-container">' +
                    '<div class="k-edit-label"><label>Criteria:</label></div>' +
                    '<div class="k-edit-field">' +
                        '<select data-role="dropdownlist" ' +
                            'data-text-field="name" ' +
                            'data-value-field="type" ' +
                            'data-bind="value: criterion, source: criteria" />' +
                    '</div>' +

                    '<div data-bind="visible: isNumber">' +
                        '<div class="k-edit-label"><label>Data:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<select data-role="dropdownlist" ' +
                                'data-text-field="name" ' +
                                'data-value-field="type" ' +
                                'data-bind="value: number.comparer, source: comparers" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>Min:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input placeholder="e.g. 10" class="k-textbox" data-bind="value: number.from" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>Max:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input placeholder="e.g. 100" class="k-textbox" data-bind="value: number.to" />' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isText">' +
                        '<div class="k-edit-label"><label>Data:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<select data-role="dropdownlist" ' +
                                'data-text-field="name" ' +
                                'data-value-field="type" ' +
                                'data-bind="value: text.comparer, source: comparers" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>Value:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: text.from" />' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isDate">' +
                        '<div class="k-edit-label"><label>Data:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<select data-role="dropdownlist" ' +
                                'data-text-field="name" ' +
                                'data-value-field="type" ' +
                                'data-bind="value: text.comparer, source: comparers" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>Start:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: date.from" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>End:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: date.to" />' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isCustom">' +
                        '<div class="k-edit-label"><label>Value:</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: custom.from" />' +
                        '</div>' +
                    '</div>' +

                    '<div class="k-edit-label"><label>On invalid data:</label></div>' +
                    '<div class="k-edit-field">' +
                        '<input type="radio" name="validationType" value="reject" data-bind="checked: type" />' +
                        'Reject input' +
                    '</div>' +
                    '<div class="k-edit-field">' +
                        '<input type="radio" name="validationType" value="warning" data-bind="checked: type" />' +
                        'Show warning' +
                    '</div>' +

                    '<div class="k-edit-label"><label>Hint message:</label></div>' +
                    '<div class="k-edit-field">' +
                        '<input class="k-textbox" placeholder="Type message" data-bind="value: hint" />' +
                    '</div>' +

                    '<div class="k-action-buttons">' +
                        '<button class="k-button" data-bind="visible: showRemove, click: remove">Remove</button>' +
                        '<button class="k-button k-primary" data-bind="click: apply">Apply</button>' +
                        '<button class="k-button" data-bind="click: close">Cancel</button>' +
                    "</div>" +
                "</div>"
        },
        open: function(range) {
            var options = this.options;
            var element;

            this.viewModel = new ValidationViewModel({
                type: options.type,
                hint: options.hint,
                comparers: options.comparers.slice(0),
                criteria: options.criteria.slice(0),
                criterion: options.criterion,
                apply: this.apply.bind(this),
                close: this.close.bind(this),
                remove: this.remove.bind(this)
            });

            this.viewModel.update(range.validation());

            SpreadsheetDialog.fn.open.call(this);

            element = this.dialog().element;

            kendo.bind(element, this.viewModel);
        },
        apply: function() {
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "EditValidationCommand",
                options: {
                    value: this.viewModel.toValidationObject()
                }
            });
        },
        remove: function() {
            this.viewModel.reset();
            this.apply();
        }
    });

    kendo.spreadsheet.dialogs.register("validation", ValidationDialog);
    kendo.spreadsheet.dialogs.ValidationDialog = ValidationDialog;

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
