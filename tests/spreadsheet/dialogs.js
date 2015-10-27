(function() {
    var element;
    var sheet;
    var spreadsheet;
    var dialog;
    var colorPalette;

    var moduleOptions = {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { rows: 3, columns: 3 });

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
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

        equal($(".k-window").length, 1);
    });

    test("passes options to dialog", function() {
        var dialog = spreadsheet.openDialog("message", { text: "Foo" });

        equal(dialog.options.text, "Foo");
    });

    test("provides API for closing windows", function() {
        var dialog = spreadsheet.openDialog("message", { text: "Foo" });

        ok(dialog.close);
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

    module("ExcelExport dialog", {
        setup: function() {
            moduleOptions.setup();

            dialog = spreadsheet.openDialog("excelExport");
        },
        teardown: moduleOptions.teardown
    });

    test("sets correct window title", function() {
        equal(dialog.dialog().options.title, "Export to Excel...");
    });

    test("triggers SaveAsCommand with default name", 2, function() {
        stubMethod(kendo.ooxml.Workbook.fn, "toDataURL", function() {
            return "";
        }, function() {
            stubMethod(kendo, "saveAs", function(options) { }, function() {
                dialog.one("action", function(e) {
                    equal(e.command, "SaveAsCommand");
                    equal(e.options.fileName, "Workbook.xlsx");
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
                    equal(e.options.fileName, "Name.xlsx");
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

})();
