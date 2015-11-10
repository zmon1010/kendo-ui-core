(function(f, define){
    define([ "../kendo.core", "../kendo.binder" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;
    var ObservableObject = kendo.data.ObservableObject;

    var MESSAGES = kendo.spreadsheet.messages.dialogs = {
        apply: "Apply",
        save: "Save",
        cancel: "Cancel",
        remove: "Remove",
        okText: "OK",
        formatCellsDialog: {
            title: "Format",
            categories: {
                number: "Number",
                currency: "Currency",
                date: "Date"
            }
        },
        fontFamilyDialog: {
            title: "Font"
        },
        fontSizeDialog: {
            title: "Font size"
        },
        bordersDialog: {
            title: "Borders"
        },
        alignmentDialog: {
            title: "Alignment",
            buttons: {
                justtifyLeft: "Align left",
                justifyCenter: "Center",
                justifyRight: "Align right",
                justifyFull: "Justify",
                alignTop: "Align top",
                alignMiddle: "Align middle",
                alignBottom: "Align bottom"
            }
        },
        mergeDialog: {
            title: "Merge cells",
            buttons: {
                mergeCells: "Merge all",
                mergeHorizontally: "Merge horizontally",
                mergeVertically: "Merge vertically",
                unmerge: "Unmerge"
            }
        },
        freezeDialog: {
            title: "Freeze panes",
            buttons: {
                freezePanes: "Freeze panes",
                freezeRows: "Freeze rows",
                freezeColumns: "Freeze columns",
                unfreeze: "Unfreeze panes"
            }
        },
        validationDialog: {
            title: "Data Validation",
            hintMessage: "Please enter a valid {0} value {1}.",
            hintTitle: "Validation {0}",
            criteria: {
                any: "Any value",
                number: "Number",
                text: "Text",
                date: "Date",
                custom: "Custom Formula",
                list: "List"
            },
            comparers: {
                greaterThan: "greater than",
                lessThan: "less than",
                between: "between",
                notBetween: "not between",
                equalTo: "equal to",
                notEqualTo: "not equal to",
                greaterThanOrEqualTo: "greater than or equal to",
                lessThanOrEqualTo: "less than or equal to"
            },
            comparerMessages: {
                greaterThan: "greater than {0}",
                lessThan: "less than {0}",
                between: "between {0} and {1}",
                notBetween: "not between {0} and {1}",
                equalTo: "equal to {0}",
                notEqualTo: "not equal to {0}",
                greaterThanOrEqualTo: "greater than or equal to {0}",
                lessThanOrEqualTo: "less than or equal to {0}",
                custom: "that satisfies the formula: {0}"
            },
            labels: {
                criteria: "Criteria",
                comparer: "Comparer",
                min: "Min",
                max: "Max",
                value: "Value",
                start: "Start",
                end: "End",
                onInvalidData: "On invalid data",
                rejectInput: "Reject input",
                showWarning: "Show warning",
                showHint: "Show hint",
                hintTitle: "Hint title",
                hintMessage: "Hint message"
            },
            placeholders: {
                typeTitle: "Type title",
                typeMessage: "Type message"
            }
        },
        saveAsDialog: {
            title: "Save As...",
            labels: {
                fileName: "File name",
                saveAsType: "Save as type"
            }
        },
        excelExportDialog: {
            title: "Export to Excel..."
        },
        modifyMergedDialog: {
            errorMessage: "Cannot change part of a merged cell."
        },
        useKeyboardDialog: {
            title: "Copying and pasting",
            errorMessage: "These actions cannot be invoked through the menu. Please use the keyboard shortcuts instead:",
            labels: {
                forCopy: "for copy",
                forCut: "for cut",
                forPaste: "for paste"
            }
        },
        unsupportedSelectionDialog: {
            errorMessage: "That action cannot be performed on multiple selection."
        }
    };

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
            title: MESSAGES.formatCellsDialog.title,
            className: "k-spreadsheet-format-cells",
            categories: [
                { type: "number", name: MESSAGES.formatCellsDialog.categories.number },
                { type: "currency", name: MESSAGES.formatCellsDialog.categories.currency },
                { type: "date", name: MESSAGES.formatCellsDialog.categories.date }
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
                    "<button class='k-button k-primary' data-bind='click: apply'>" + MESSAGES.apply + "</button>" +
                    "<button class='k-button' data-bind='click: close'>" + MESSAGES.cancel + "</button>" +
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
                okText: MESSAGES.okText,
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
            title: MESSAGES.fontFamilyDialog.title,
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
            title: MESSAGES.fontSizeDialog.title,
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
                    value: kendo.parseInt(e.sender.value()[0])
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
            title: MESSAGES.bordersDialog.title,
            width: 177,
            template:   "<div></div>" +
                        "<div class='k-action-buttons'>" +
                            "<button class='k-button k-primary' data-bind='click: apply'>" + MESSAGES.apply + "</button>" +
                            "<button class='k-button' data-bind='click: close'>" + MESSAGES.cancel + "</button>" +
                        "</div>"
        },
        apply: function() {
            SpreadsheetDialog.fn.apply.call(this);

            var state = this.value();

            this.trigger("action", {
                command: "BorderChangeCommand",
                options: {
                    border: state.type,
                    style: { size: 1, color: state.color }
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
                            "<button class='k-button k-primary' data-bind='click: apply'>" + MESSAGES.apply + "</button>" +
                            "<button class='k-button' data-bind='click: close'>" + MESSAGES.cancel + "</button>" +
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
                { property: "textAlign",     value: "left",    iconClass: "justify-left",   text: MESSAGES.alignmentDialog.buttons.justtifyLeft },
                { property: "textAlign",     value: "center",  iconClass: "justify-center", text: MESSAGES.alignmentDialog.buttons.justifyCenter },
                { property: "textAlign",     value: "right",   iconClass: "justify-right",  text: MESSAGES.alignmentDialog.buttons.justifyRight },
                { property: "textAlign",     value: "justify", iconClass: "justify-full",   text: MESSAGES.alignmentDialog.buttons.justifyFull },
                { property: "verticalAlign", value: "top",     iconClass: "align-top",      text: MESSAGES.alignmentDialog.buttons.alignTop },
                { property: "verticalAlign", value: "center",  iconClass: "align-middle",   text: MESSAGES.alignmentDialog.buttons.alignMiddle },
                { property: "verticalAlign", value: "bottom",  iconClass: "align-bottom",   text: MESSAGES.alignmentDialog.buttons.alignBottom }
            ]
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: this.options.buttons }),
                template: "<a title='#=text#' data-property='#=property#' data-value='#=value#'>" +
                                "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>" +
                                "#=text#" +
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
            title: MESSAGES.mergeDialog.title,
            template: "<ul class='k-list k-reset'></ul>",
            buttons: [
                { value: "cells",        iconClass: "merge-cells",        text: MESSAGES.mergeDialog.buttons.mergeCells },
                { value: "horizontally", iconClass: "merge-horizontally", text: MESSAGES.mergeDialog.buttons.mergeHorizontally },
                { value: "vertically",   iconClass: "merge-vertically",   text: MESSAGES.mergeDialog.buttons.mergeVertically },
                { value: "unmerge",      iconClass: "normal-layout",      text: MESSAGES.mergeDialog.buttons.unmerge }
            ]
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: this.options.buttons }),
                template: "<a title='#=text#' data-value='#=value#'>" +
                            "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>#=text#" +
                          "</a>",
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

    var FreezeDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this._list();
        },
        options: {
            title: MESSAGES.freezeDialog.title,
            template: "<ul class='k-list k-reset'></ul>",
            buttons: [
                { value: "panes",    iconClass: "freeze-panes",  text: MESSAGES.freezeDialog.buttons.freezePanes },
                { value: "rows",     iconClass: "freeze-row",    text: MESSAGES.freezeDialog.buttons.freezeRows },
                { value: "columns",  iconClass: "freeze-col",    text: MESSAGES.freezeDialog.buttons.freezeColumns },
                { value: "unfreeze", iconClass: "normal-layout", text: MESSAGES.freezeDialog.buttons.unfreeze }
            ]
        },
        _list: function() {
            var ul = this.dialog().element.find("ul");

            this.list = new kendo.ui.StaticList(ul, {
                dataSource: new kendo.data.DataSource({ data: this.options.buttons }),
                template: "<a title='#=text#' data-value='#=value#'>" +
                            "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>#=text#" +
                          "</a>",
                change: this.apply.bind(this)
            });

            this.list.dataSource.fetch();
        },
        apply: function(e) {
            var dataItem = e.sender.value()[0];
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "FreezePanesCommand",
                options: {
                    value: dataItem.value
                }
            });
        }
    });

    kendo.spreadsheet.dialogs.register("freeze", FreezeDialog);

    var ValidationViewModel = kendo.spreadsheet.ValidationCellsViewModel = ObservableObject.extend({
        init: function(options) {
            ObservableObject.fn.init.call(this, options);

            this.bind("change", (function(e) {

                if (e.field === "criterion") {
                    this.reset();

                    if (this.criterion === "custom" || this.criterion === "list") {
                        this.setHintMessageTemplate();
                    }
                }

                if (e.field === "comparer") {
                    this.setHintMessageTemplate();
                }

                if ((e.field == "hintMessage" || e.field == "hintTitle") && !this._mute) {
                    this.shouldBuild = false;
                }

                if ((e.field == "from" || e.field == "to" || e.field == "hintMessageTemplate" || e.field == "type") && this.shouldBuild) {
                    this.buildMessages();
                }
            }).bind(this));

            this.reset();
        },
        buildMessages: function() {
            this._mute = true;
            this.set("hintTitle", this.hintTitleTemplate ? kendo.format(this.hintTitleTemplate, this.type) : "");
            this.set("hintMessage", this.hintMessageTemplate ? kendo.format(this.hintMessageTemplate, this.from, this.to) : "");
            this._mute = false;
        },
        reset: function() {
            this.setComparers();
            this.set("comparer", this.comparers[0].type);
            this.set("from", null);
            this.set("to", null);

            this.set("useCustomMessages", false);

            this.shouldBuild = true;

            this.hintTitleTemplate = this.defaultHintTitle;
            this.buildMessages();
        },
        //TODO: refactor
        setComparers: function() {
            var all = this.defaultComparers;
            var comparers = [];

            if (this.criterion === "text") {
                var text_comparers = ["equalTo", "notEqualTo"];
                for (var idx = 0; idx < all.length; idx++) {
                    if (text_comparers[0] == all[idx].type) {
                        comparers.push(all[idx]);
                        text_comparers.shift();
                    }
                }
            } else {
                comparers = all.slice();
            }

            this.set("comparers", comparers);
        },
        setHintMessageTemplate: function() {
           if (this.criterion !== "custom" && this.criterion !== "list") {
               this.set("hintMessageTemplate", kendo.format(this.defaultHintMessage, this.criterion, this.comparerMessages[this.comparer]));
           } else {
               this.set("hintMessageTemplate", "");
               this.set("hintMessage", "");
           }
        },
        isAny: function() {
            return this.get("criterion") === "any";
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
        isList: function() {
            return this.get("criterion") === "list";
        },
        isCustom: function() {
            return this.get("criterion") === "custom";
        },
        showRemove: function() {
            return this.get("hasValidation");
        },
        showTo: function() {
            return this.get("comparer") == "between" || this.get("comparer") == "notBetween";
        },
        update: function(validation) {
            this.set("hasValidation", !!validation);

            if (validation) {
                this.fromValidationObject(validation);
            }
        },
        fromValidationObject: function(validation) {
            this.set("criterion", validation.dataType);
            this.set("comparer", validation.comparerType);
            this.set("from", validation.from);
            this.set("to", validation.to);
            this.set("type", validation.type);

            if (validation.messageTemplate || validation.titleTemplate) {
                this.hintMessageTemplate = validation.messageTemplate;
                this.hintMessage = validation.messageTemplate;
                this.hintTitle = validation.titleTemplate;
                this.useCustomMessages = true;
                this.buildMessages();
            } else {
                this.useCustomMessages = false;
            }
        },
        toValidationObject: function() {
            if (this.criterion === "any") {
                return null;
            }

            var options = {
                type: this.type,
                dataType: this.criterion,
                comparerType: this.comparer,
                from: this.from,
                to: this.to
            };

            if (this.useCustomMessages) {
                options.messageTemplate = this.shouldBuild ? this.hintMessageTemplate : this.hintMessage;
                options.titleTemplate = this.hintTitle;
            }

            return options;
        }
    });

    var ValidationDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);
        },
        options: {
            width: 420,
            title: MESSAGES.validationDialog.title,
            criterion: "any",
            type: "reject",
            hintMessage: MESSAGES.validationDialog.hintMessage,
            hintTitle: MESSAGES.validationDialog.hintTitle,
            useCustomMessages: false,
            criteria: [
                { type: "any", name: "Any value" },
                { type: "number", name: "Number" },
                { type: "text", name: "Text" },
                { type: "date", name: "Date" },
                { type: "custom", name: "Custom Formula" },
                { type: "list", name: "List" }
            ],
            comparers: [
                { type: "greaterThan", name: MESSAGES.validationDialog.comparers.greaterThan },
                { type: "lessThan",    name: MESSAGES.validationDialog.comparers.lessThan },
                { type: "between",     name: MESSAGES.validationDialog.comparers.between },
                { type: "notBetween",  name: MESSAGES.validationDialog.comparers.notBetween },
                { type: "equalTo",     name: MESSAGES.validationDialog.comparers.equalTo },
                { type: "notEqualTo",  name: MESSAGES.validationDialog.comparers.notEqualTo },
                { type: "greaterThanOrEqualTo", name: MESSAGES.validationDialog.comparers.greaterThanOrEqualTo },
                { type: "lessThanOrEqualTo",    name: MESSAGES.validationDialog.comparers.lessThanOrEqualTo }
            ],
            comparerMessages: MESSAGES.validationDialog.comparerMessages,
            template:
                '<div class="k-edit-form-container">' +
                    '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.criteria + ':</label></div>' +
                    '<div class="k-edit-field">' +
                        '<select data-role="dropdownlist" ' +
                            'data-text-field="name" ' +
                            'data-value-field="type" ' +
                            'data-bind="value: criterion, source: criteria" />' +
                    '</div>' +

                    '<div data-bind="visible: isNumber">' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.comparer + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<select data-role="dropdownlist" ' +
                                'data-text-field="name" ' +
                                'data-value-field="type" ' +
                                'data-bind="value: comparer, source: comparers" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.min + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input placeholder="e.g. 10" class="k-textbox" data-bind="value: from" />' +
                        '</div>' +
                        '<div data-bind="visible: showTo">' +
                            '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.max + ':</label></div>' +
                            '<div class="k-edit-field">' +
                                '<input placeholder="e.g. 100" class="k-textbox" data-bind="value: to" />' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isText">' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.comparer + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<select data-role="dropdownlist" ' +
                                'data-text-field="name" ' +
                                'data-value-field="type" ' +
                                'data-bind="value: comparer, source: comparers" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.value + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: from" />' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isDate">' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.comparer + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<select data-role="dropdownlist" ' +
                                'data-text-field="name" ' +
                                'data-value-field="type" ' +
                                'data-bind="value: comparer, source: comparers" />' +
                        '</div>' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.start + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: from" />' +
                        '</div>' +
                        '<div data-bind="visible: showTo">' +
                            '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.end + ':</label></div>' +
                            '<div class="k-edit-field">' +
                                '<input class="k-textbox" data-bind="value: to" />' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isCustom">' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.value + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: from" />' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="visible: isList">' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.value + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input class="k-textbox" data-bind="value: from" />' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="invisible: isAny">' +
                        '<div class="k-action-buttons"></div>' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.onInvalidData + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input type="radio" id="validationTypeReject" name="validationType" value="reject" data-bind="checked: type" class="k-radio" />' +
                            '<label for="validationTypeReject" class="k-radio-label">' +
                                 MESSAGES.validationDialog.labels.rejectInput +
                            '</label> ' +
                            '<input type="radio" id="validationTypeWarning" name="validationType" value="warning" data-bind="checked: type" class="k-radio" />' +
                            '<label for="validationTypeWarning" class="k-radio-label">' +
                                 MESSAGES.validationDialog.labels.showWarning +
                            '</label>' +
                        '</div>' +
                    '</div>' +

                    '<div data-bind="invisible: isAny">' +
                        '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.showHint + ':</label></div>' +
                        '<div class="k-edit-field">' +
                            '<input type="checkbox" name="useCustomMessages" id="useCustomMessages" class="k-checkbox" data-bind="checked: useCustomMessages" />' +
                            '<label class="k-checkbox-label" for="useCustomMessages"></label>' +
                        '</div>' +

                        '<div data-bind="visible: useCustomMessages">' +
                            '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.hintTitle + ':</label></div>' +
                            '<div class="k-edit-field">' +
                                '<input class="k-textbox" placeholder="' + MESSAGES.validationDialog.placeholders.typeTitle + '" data-bind="value: hintTitle" />' +
                            '</div>' +
                            '<div class="k-edit-label"><label>' + MESSAGES.validationDialog.labels.hintMessage + ':</label></div>' +
                            '<div class="k-edit-field">' +
                                '<input class="k-textbox" placeholder="' + MESSAGES.validationDialog.placeholders.typeMessage + '" data-bind="value: hintMessage" />' +
                            '</div>' +
                        '</div>' +
                    '</div>' +

                    '<div class="k-action-buttons">' +
                        '<button class="k-button" data-bind="visible: showRemove, click: remove">' + MESSAGES.remove + '</button>' +
                        '<button class="k-button k-primary" data-bind="click: apply">' + MESSAGES.apply + '</button>' +
                        '<button class="k-button" data-bind="click: close">' + MESSAGES.cancel + '</button>' +
                    "</div>" +
                "</div>"
        },
        open: function(range) {
            var options = this.options;
            var element;

            this.viewModel = new ValidationViewModel({
                type: options.type,
                defaultHintMessage: options.hintMessage,
                defaultHintTitle: options.hintTitle,
                defaultComparers: options.comparers.slice(0),
                comparerMessages: options.comparerMessages,
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
            this.viewModel.set("criterion", "any");
            this.apply();
        }
    });

    kendo.spreadsheet.dialogs.register("validation", ValidationDialog);
    kendo.spreadsheet.dialogs.ValidationDialog = ValidationDialog;

    var SaveAsDialog = SpreadsheetDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);

            this.viewModel = kendo.observable({
                name: this.options.name,
                extension: this.options.extension,
                fileFormats: this.options.fileFormats,
                fileName: function() {
                    return this.name + this.extension;
                },

                apply: this.apply.bind(this),
                close: this.close.bind(this)
            });

            kendo.bind(this.dialog().element, this.viewModel);
        },
        options: {
            title: MESSAGES.saveAsDialog.title,
            name: "Workbook",
            extension: ".xlsx",
            editExtension: true,
            fileFormats: [{
                description: "Excel Workbook (.xlsx)",
                extension: ".xlsx"
            }],
            width: 350,
            template:
                "<div class='k-edit-label'><label>" + MESSAGES.saveAsDialog.labels.fileName + ":</label></div>" +
                    "<div class='k-edit-field'>" +
                    "<input class='k-textbox' data-bind='value: name' />" +
                "</div>" +
                "<div data-bind='visible: editExtension'>" +
                    "<div class='k-edit-label'><label>" + MESSAGES.saveAsDialog.labels.saveAsType + ":</label></div>" +
                        "<div class='k-edit-field'>" +
                        "<select data-role='dropdownlist' class='k-file-format' " +
                            "data-text-field='description' " +
                            "data-value-field='extension' " +
                            "data-bind='value: extension, source: fileFormats' />" +
                    "</div>" +
                "</div>" +

                "<div class='k-action-buttons'>" +
                    "<button class='k-button k-primary' data-bind='click: apply'>" + MESSAGES.save + "</button>" +
                    "<button class='k-button' data-bind='click: close'>" + MESSAGES.cancel + "</button>" +
                "</div>"
        },
        apply: function() {
            SpreadsheetDialog.fn.apply.call(this);

            this.trigger("action", {
                command: "SaveAsCommand",
                options: {
                    fileName: this.viewModel.fileName()
                }
            });
        }
    });
    kendo.spreadsheet.dialogs.register("saveAs", SaveAsDialog);

    var ExcelExportDialog = SaveAsDialog.extend({
        options: {
            title: MESSAGES.excelExportDialog.title,
            editExtension: false
        }
    });
    kendo.spreadsheet.dialogs.register("excelExport", ExcelExportDialog);

    var ModifyMergedDialog = MessageDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);
        },
        options: {
            template: MESSAGES.modifyMergedDialog.errorMessage +
                '<div class="k-action-buttons">' +
                    "<button class='k-button k-primary' data-bind='click: close, text: okText' />" +
                "</div>"
        }
    });

    kendo.spreadsheet.dialogs.register("modifyMerged", ModifyMergedDialog);

    var UseKeyboardDialog = MessageDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);
        },
        options: {
            title: MESSAGES.useKeyboardDialog.title,
            template: MESSAGES.useKeyboardDialog.errorMessage +
                "<div>Ctrl+C " + MESSAGES.useKeyboardDialog.labels.forCopy + "</div>" +
                "<div>Ctrl+X " + MESSAGES.useKeyboardDialog.labels.forCut + "</div>" +
                "<div>Ctrl+V " + MESSAGES.useKeyboardDialog.labels.forPaste + "</div>" +
                '<div class="k-action-buttons">' +
                    "<button class='k-button k-primary' data-bind='click: close, text: okText' />" +
                "</div>"
        }
    });

    kendo.spreadsheet.dialogs.register("useKeyboard", UseKeyboardDialog);

    var UnsupportedSelectionDialog = MessageDialog.extend({
        init: function(options) {
            SpreadsheetDialog.fn.init.call(this, options);
        },
        options: {
            template: MESSAGES.unsupportedSelectionDialog.errorMessage +
                '<div class="k-action-buttons">' +
                    "<button class='k-button k-primary' data-bind='click: close, text: okText' />" +
                "</div>"
        }
    });

    kendo.spreadsheet.dialogs.register("unsupportedSelection", UnsupportedSelectionDialog);

})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
