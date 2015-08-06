(function() {
    var spreadsheet;
    var element;
    var moduleOptions = {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    };

    module("Spreadsheet toolbar", moduleOptions);

    function createSpreadsheet(options) {
        options = options || { toolbar: true };
        spreadsheet = new kendo.ui.Spreadsheet(element, options);
    }

    test("does not render if option is not set", function() {
        createSpreadsheet({ toolbar: false });

        equal(element.find(".k-toolbar").length, 0);
    });

    test("renders if option is set", function() {
        createSpreadsheet({ toolbar: true });

        equal(element.find(".k-toolbar").length, 1);
    });

    test("sets toolbar field", function() {
        createSpreadsheet();

        ok(spreadsheet.toolbar instanceof kendo.ui.ToolBar);
    });

    var PopupTool = kendo.spreadsheet.toolbar.PopupTool;
    var tool, toolbar;

    module("SpreadSheet PopupTool", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
            toolbar = new kendo.spreadsheet.ToolBar(element, {});
            tool = new PopupTool({}, spreadsheet.toolbar);
            kendo.effects.disable();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            tool && tool.destroy();
            kendo.effects.enable();
        }
    });

    test("popup opens window", function() {
        tool.open();

        equal($(".k-window").length, 1);
        equal($(".k-spreadsheet-window").length, 1);
    });

    test("closing window destroys it", function() {
        tool.open();

        tool.close();

        equal($(".k-spreadsheet-window").length, 0);
    });

    var viewModel;

    module("SpreadSheet FormatCellsViewModel", {
        setup: function() {
            viewModel = new kendo.spreadsheet.toolbar.FormatCellsViewModel({
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

    test("lists categories", function() {
        deepEqual(viewModel.categories(), [ "a", "b" ]);
    });

})();
