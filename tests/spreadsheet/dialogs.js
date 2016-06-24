(function() {
    var element;
    var sheet;
    var spreadsheet;
    var dialog;
    var colorPalette;

    var moduleOptions = {
        setup: function() {
            kendo.effects.disable();

            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { rows: 3, columns: 3 });

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.effects.enable();
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
        }
    };

    module("spreadsheet dialogs", {
        setup: moduleOptions.setup,
        teardown: moduleOptions.teardown
    });

    test("opens formatCells dialog", function() {
        spreadsheet.openDialog("formatCells");

        equal($(".k-spreadsheet-format-cells").length, 1);
    });

    test("passes options to dialog", function() {
        var dialog = spreadsheet.openDialog("message", { text: "Foo" });

        equal(dialog.options.text, "Foo");
    });

    test("provides API for closing windows", function() {
        var dialog = spreadsheet.openDialog("message", { text: "Foo" });

        ok(dialog.close);
    });

    test("close method triggers close event when dialog close animation is completed", function() {
        var dialog = spreadsheet.openDialog("message", { text: "Foo" });

        dialog.bind("close", function() {
            ok(true);
        });

        dialog.close();
    });

    test("open method triggers activate event when dialog opening animation is completed", 1, function() {
        spreadsheet.openDialog("message", { text: "Foo", activate: function() {
                ok(true);
            }
        });
    });

    test("opening error dialog focuses the button inside", 1, function() {
        spreadsheet._view.showError({ text: "Foo"});

        ok($(document.activeElement).is(".k-button"));
    });

    test("opening error dialog without text loads default text for type", 1, function() {
        spreadsheet._view.showError({ type: "validationError"});

        equal($(document.activeElement).closest(".k-spreadsheet-message").text(), "The value that you entered violates the validation rules set on the cell.RetryRevert");
    });

    test("opening error dialog with text loads it instead of default message for type", 1, function() {
        spreadsheet._view.showError({ type: "validationError", body: "Custom message."});

        equal($(document.activeElement).closest(".k-spreadsheet-message").text(), "Custom message.RetryRevert");
    });

    test("closing error dialog calls the provided callback", 1, function() {
        spreadsheet._view.showError({ body: "Foo"}, function() {
            ok(true);
        });

        $(".k-spreadsheet-message .k-button").trigger("click");
    });

    test("error dialog callback receive revert action as event parameter", 1, function() {
        spreadsheet._view.showError(
            { body: "Foo", type: "validationError" },
            function(enable, focusLastActive, event) {
                equal(event.action, "revert");
            }.bind(this, true, true)
        );

        $(".k-spreadsheet-message .k-button:not(.k-primary)").trigger("click");
    });

    test("error dialog callback receive close action as event parameter", 1, function() {
        spreadsheet._view.showError(
            { body: "Foo", type: "validationError" },
            function(enable, focusLastActive, event) {
                equal(event.action, "close");
            }.bind(this, true, true)
        );

        $(".k-spreadsheet-message .k-button").trigger("click", {kur: 12321});
    });

    test("error dialog have retry button", 1, function() {
        spreadsheet._view.showError({ body: "Foo", type: "validationError" });

        equal($(".k-spreadsheet-message .k-button.k-primary").text(), "Retry");
    });

    test("error dialog have revert button", 1, function() {
        spreadsheet._view.showError({ body: "Foo", type: "validationError"});

        equal($(".k-spreadsheet-message .k-button:not(.k-primary)").text(), "Revert");
    });

    var viewModel;
    var usCurrencyInfo = kendo.cultures["en-US"].numberFormat.currency;
    var bgCurrencyInfo = kendo.cultures["bg-BG"].numberFormat.currency;
    var FormatCellsViewModel = kendo.spreadsheet.FormatCellsViewModel;

    module("SpreadSheet FormatCellsViewModel", {
        setup: function() {
            viewModel = new FormatCellsViewModel({
                value: 100,
                currencies: [],
                allFormats: {
                    numberFormats: [],
                    dateFormats: []
                }
            });
        }
    });

    test("preview of string value", function() {
        viewModel.set("value", "bar");

        equal(viewModel.preview(), "bar");
    });

    test("preview uses custom format", function() {
        viewModel.set("format", "foo");

        equal(viewModel.preview(), "foo");
    });

    test("preview uses date format", function() {
        viewModel.set("value", 0);
        viewModel.set("format", "mm-yy");

        equal(viewModel.preview(), "12-99");
    });

    test("showCurrencyFilter is false for single currency", function() {
        viewModel = new FormatCellsViewModel({
            value: 100,
            category: { type: "currency" },
            currencies: [
                { name: "Foo", value: usCurrencyInfo }
            ]
        });

        ok(!viewModel.showCurrencyFilter);
    });

    test("showCurrencyFilter is true for multiple currencies", function() {
        viewModel = new FormatCellsViewModel({
            value: 100,
            category: { type: "currency" },
            currencies: [
                { name: "Foo", value: usCurrencyInfo },
                { name: "Bar", value: bgCurrencyInfo }
            ]
        });

        ok(viewModel.showCurrencyFilter);
    });

    test("convert currency format", function() {
        var convert = FormatCellsViewModel.convert.currency;

        var prefixFoo = {
            abbr: "FOO",
            pattern: ["($n)", "$n"],
            decimals: 2,
            ",": ";",
            ".": "_",
            groupSize: [3],
            symbol: "f"
        };

        equal(convert({ currency: prefixFoo, decimals: true, iso: true  }), '"FOO" ?_00');
        equal(convert({ currency: prefixFoo, iso: true  }), '"FOO" ?');
        equal(convert({ currency: prefixFoo, decimals: true }), 'f?_00');
        equal(convert({ currency: prefixFoo, decimals: false }), 'f?');


        var suffixFoo = kendo.deepExtend({}, prefixFoo);
        suffixFoo.pattern[1] = "n$";

        equal(convert({ currency: suffixFoo, decimals: true, iso: true  }), '"FOO" ?_00');
        equal(convert({ currency: suffixFoo, iso: true  }), '"FOO" ?');
        equal(convert({ currency: prefixFoo, decimals: true }), '?_00f');
        equal(convert({ currency: prefixFoo, decimals: false }), '?f');
    });

    test("convert date format", function() {
        var convert = FormatCellsViewModel.convert.date;

        equal(convert("MMMM dd, yyyy"), "mmmm dd, yyyy");
        equal(convert("h:mm tt"), "h:mm AM/PM");
        equal(convert("h:mm tt Z"), "");
        equal(convert("ddTHH"), "");
        equal(convert("'-'hh"), '"-"hh');
    });

    module("FormatCellsDialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("formatCells");
        },
        teardown: moduleOptions.teardown
    });

    test("apply executes PropertyChangeCommand", 3, function() {
        var formats = dialog.viewModel.formats;
        var format = formats[formats.length-1].value;

        dialog.one("action", function(e) {
            equal(e.command, "PropertyChangeCommand");
            equal(e.options.property, "format");
            equal(e.options.value, format);
        });

        dialog.viewModel.set("format", format);

        dialog.apply();
    });

    test("close does not trigger action event", 0, function() {
        dialog.one("action", function(e) {
            ok(false);
        });

        dialog.close();
    });

    function cultureMock(name, currencyName, abbr, symbol) {
        return {
            name: name,
            numberFormat: {
                currency: {
                    name: currencyName,
                    abbr: abbr,
                    symbol: symbol
                }
            }
        };
    }

    var currenciesFrom = kendo.spreadsheet.dialogs.FormatCellsDialog.currenciesFrom;

    test("currency formats do not include current culture", function() {
        var cultures = {
            "foo-BAR": cultureMock("foo-BAR", "Foo dolbar", "FBAR", "fb")
        };

        cultures.current = cultures["foo-BAR"];

        var currencies = currenciesFrom(cultures);

        equal(currencies.length, 1);
    });

    test("currency formats have a formatted description", function() {
        var currencies = currenciesFrom({
            "foo-BAR": cultureMock("foo-BAR", "Foo dolbar", "FBAR", "fb")
        });

        equal(currencies[0].description, "Foo dolbar (FBAR, fb)");
    });

    test("duplicate currencies are skipped", function() {
        var currencies = currenciesFrom({
            "de-DE": cultureMock("de-DE", "Euro", "EUR", "€"),
            "el-GR": cultureMock("el-GR", "Euro", "EUR", "€")
        });

        equal(currencies.length, 1);
    });

    test("does not show currencies for neutral cultures", function() {
        var currencies = currenciesFrom({
            "de": cultureMock("de", "", "", "€"),
            "el-GR": cultureMock("el-GR", "Euro", "EUR", "€")
        });

        equal(currencies.length, 1);
    });

    var list;

    module("FontFamiltyDialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("fontFamily", { fonts: ["foo", "bar"], defaultFont: "foo" });
            list = dialog.dialog().wrapper.find("[data-role=staticlist]").data("kendoStaticList");
        },
        teardown: moduleOptions.teardown
    });

    test("initializes list with fonts", function() {
        ok(list.dataSource.data().length);
        ok(list.items().length);
    });

    test("has default value", function() {
        ok(list.value().length);
    });

    test("list change event triggers PropertyChangeCommand", 3, function() {
        dialog.one("action", function(e) {
            equal(e.command, "PropertyChangeCommand");
            equal(e.options.property, "fontFamily");
            equal(e.options.value, "bar");
        });

        list.value(["bar"]);
        list.trigger("change");
    });

    test("close does not trigger action event", 0, function() {
        dialog.one("action", function(e) {
            ok(false);
        });

        dialog.close();
    });

    var list;

    module("FontSizeDialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("fontSize", { sizes: [11, 12, 13], defaultSize: 12 });
            list = dialog.dialog().wrapper.find("[data-role=staticlist]").data("kendoStaticList");
        },
        teardown: moduleOptions.teardown
    });

    test("initializes list with sizes", function() {
        equal(list.dataSource.data().length, 3);
        equal(list.items().length, 3);
    });

    test("has default value", function() {
        ok(list.value().length);
    });

    test("list change event triggers PropertyChangeCommand", 3, function() {
        dialog.one("action", function(e) {
            equal(e.command, "PropertyChangeCommand");
            equal(e.options.property, "fontSize");
            equal(e.options.value, 11);
        });

        list.value([11]);
        list.trigger("change");
    });

    test("close does not trigger action event", 0, function() {
        dialog.one("action", function(e) {
            ok(false);
        });

        dialog.close();
    });

    module("BorderPalette dialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("borders");
        },
        teardown: moduleOptions.teardown
    });

    test("initializes borderPalette", function() {
        var element = dialog.dialog().element;
        ok(element.find("[data-role=borderpalette]").length);
    });

    test("triggers BorderChangeCommand when apply is clicked", function() {
        dialog.one("action", function(e) {
            equal(e.command, "BorderChangeCommand");
            equal(e.options.border, "allBorders");
        });

        spreadsheet.activeSheet().select("A1:B2");

        dialog.value({ type: "allBorders", style: { size: 1, color: "#ff0000" } });
        dialog.apply();
    });

    test("close does not trigger action event", 0, function() {
        dialog.one("action", function(e) {
            ok(false);
        });

        dialog.close();
    });

    module("ColorPicker dialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("colorPicker", { title: "background", property: "background" });
            colorPalette = dialog.colorPalette;
        },
        teardown: moduleOptions.teardown
    });

    test("initializes colorPalette", function() {
        ok(colorPalette instanceof kendo.ui.ColorPalette);
    });

    test("triggers PropertyChangeCommand when apply is clicked", 3, function() {
        dialog.one("action", function(e) {
            equal(e.command, "PropertyChangeCommand");
            equal(e.options.property, "background");
            equal(e.options.value, "#ff0000");
        });

        colorPalette.value("#ff0000");
        colorPalette.trigger("change", { value: "#ff0000" });
        dialog.apply();
    });

    test("close does not trigger action event", 0, function() {
        dialog.one("action", function(e) {
            ok(false);
        });

        dialog.close();
    });

    test("sets correct window title", function() {
        equal(dialog.dialog().options.title, "background");
    });

    module("Alignment dialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("alignment");
        },
        teardown: moduleOptions.teardown
    });

    test("sets correct window title", function() {
        equal(dialog.dialog().options.title, "Alignment");
    });

    test("triggers PropertyChangeCommand when command is clicked", 3, function() {
        dialog.one("action", function(e) {
            equal(e.command, "PropertyChangeCommand");
            equal(e.options.property, "textAlign");
            equal(e.options.value, "right");
        });

        $(".k-item a[data-value='right']").trigger("click");
    });

    module("Merge dialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("merge");
        },
        teardown: moduleOptions.teardown
    });

    test("sets correct window title", function() {
        equal(dialog.dialog().options.title, "Merge cells");
    });

    test("triggers MergeCellsCommand when item is clicked", 2, function() {
        dialog.one("action", function(e) {
            equal(e.command, "MergeCellCommand");
            equal(e.options.value, "vertically");
        });

        $(".k-item a[data-value='vertically']").trigger("click");
    });

    module("ExportAs dialog", {
        setup: function() {
            moduleOptions.setup();
            var defaultOptions = {
                excelExport: {
                    proxyURL: "",
                    fileName: "Workbook.xlsx"
                },
                pdfExport: {
                    fileName  : "Workbook.pdf",
                    proxyURL  : "",
                    paperSize : "a4",
                    landscape : false,
                    margin    : null,
                    title     : null,
                    author    : null,
                    subject   : null,
                    keywords  : null,
                    creator   : "Kendo UI PDF Generator",
                    date      : null
                }
            }
            dialog = spreadsheet.openDialog("exportAs", defaultOptions);
        },
        teardown: moduleOptions.teardown
    });

    test("sets correct window title", function() {
        equal(dialog.dialog().options.title, "Export...");
    });

    test("triggers SaveAsCommand with default name", 2, function() {
        stubMethod(kendo.ooxml.Workbook.fn, "toDataURL", function() {
            return "";
        }, function() {
            stubMethod(kendo, "saveAs", function(options) { }, function() {
                dialog.one("action", function(e) {
                    equal(e.command, "SaveAsCommand");
                    equal(e.options.name + e.options.extension, "Workbook.xlsx");
                });

                dialog.apply();
            });
        });
    });

    test("triggers SaveAsCommand with set name", 2, function() {
        stubMethod(kendo.ooxml.Workbook.fn, "toDataURL", function() {
            return "";
        }, function() {
            stubMethod(kendo, "saveAs", function(options) { }, function() {
                $(".k-textbox").val("Name").trigger("change");

                dialog.one("action", function(e) {
                    equal(e.command, "SaveAsCommand");
                    equal(e.options.name + e.options.extension, "Name.xlsx");
                });

                dialog.apply();
            });
        });
    });

    test("close does not trigger action event", 0, function() {
        dialog.one("action", function(e) {
            ok(false);
        });

        dialog.close();
    });

    module("Validation dialog", {
        setup: function() {
            moduleOptions.setup();
        },
        teardown: moduleOptions.teardown
    });

    test("attach validator to the form", function() {
        dialog = spreadsheet.openDialog("validation");

        ok(dialog.dialog().element.find(".k-edit-form-container").data("kendoValidator"));
    });

    test("apply calls the validate method before closing the dialog", 2, function() {
        dialog = spreadsheet.openDialog("validation");

        dialog.bind("action", function() {
            ok(true);
        });

        dialog.validatable.validate = function() {
            ok(true);
            return false;
        };

        dialog.apply();

        ok(dialog.dialog().element.find(".k-edit-form-container").data("kendoValidator"));
    });

    test("validation dialog is loading validation options correctly", function() {
        var options = {
            "from":"0",
            "dataType":"number",
            "type":"reject",
            "comparerType":"greaterThan",
            "allowNulls":false,
            "messageTemplate":"messagess",
            "titleTemplate":"titlett"
        };

        sheet.range("A1").validation(options);

        dialog = spreadsheet.openDialog("validation");

        equal(dialog.viewModel.comparer, options.comparerType);
        equal(dialog.viewModel.criterion, options.dataType);
        equal(dialog.viewModel.from, options.from);
        equal(dialog.viewModel.hintMessage, options.messageTemplate);
        equal(dialog.viewModel.hintTitle, options.titleTemplate);
        equal(dialog.viewModel.ignoreBlank, options.allowNulls);
        equal(dialog.viewModel.type, options.type);
        equal(dialog.viewModel.useCustomMessages, true);
    });
})();
