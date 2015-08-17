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

    var viewModel;

    module("SpreadSheet FormatCellsViewModel", {
        setup: function() {
            viewModel = new kendo.spreadsheet.FormatCellsViewModel({
                value: 100,
                allFormats: [
                    { category: "a", name: "Null", value: null },
                    { category: "a", name: "Foo", value: "foo" },
                    { category: "a", name: "Bar", value: "bar" },
                    { category: "b", name: "Date", value: "mm-yy" }
                ]
            });
        }
    });

    test("preview of value", function() {
        viewModel.set("value", "bar");

        equal(viewModel.preview(), "bar");
    });

    test("setting format previews it with sample", function() {
        viewModel.set("format", "foo");

        equal(viewModel.preview(), "foo");
    });

    test("changing date format", function() {
        viewModel.set("value", 0);
        viewModel.set("format", "mm-yy");

        equal(viewModel.preview(), "12-99");
    });

    test("formatCurrency is set when category is currency", function() {
        viewModel = new kendo.spreadsheet.FormatCellsViewModel({
            value: 100,
            category: { type: "currency", name: "Currency" },
            categories: [
                { type: "currency", name: "Currency" },
                { type: "date", name: "Date" }
            ],
            allFormats: {
                dateFormats: [
                    { name: "Date", value: "mmmm yyyy" }
                ],
                currencyFormats: [
                    { name: "Foo", id: "FOO", sign: "foo" },
                ]
            }
        });

        ok(viewModel.formatCurrency);
    });

})();
