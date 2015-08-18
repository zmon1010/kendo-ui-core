(function() {
    var element;
    var sheet;
    var spreadsheet;

    module("spreadsheet dialogs", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { rows: 3, columns: 3 });

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
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

    module("SpreadSheet FormatCellsViewModel", {
        setup: function() {
            viewModel = new kendo.spreadsheet.FormatCellsViewModel({
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
        viewModel = new kendo.spreadsheet.FormatCellsViewModel({
            value: 100,
            category: { type: "currency" },
            currencies: [
                { name: "Foo", value: usCurrencyInfo }
            ]
        });

        ok(!viewModel.showCurrencyFilter);
    });

    test("showCurrencyFilter is true for multiple currencies", function() {
        viewModel = new kendo.spreadsheet.FormatCellsViewModel({
            value: 100,
            category: { type: "currency" },
            currencies: [
                { name: "Foo", value: usCurrencyInfo },
                { name: "Bar", value: bgCurrencyInfo }
            ]
        });

        ok(viewModel.showCurrencyFilter);
    });

})();
