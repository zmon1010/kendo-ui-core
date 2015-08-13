(function() {
    var spreadsheet;
    var element;
    var moduleOptions = {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
            toolbarElement = $("<div>").appendTo(QUnit.fixture);
            kendo.effects.disable();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            tool && tool.destroy();
            kendo.effects.enable();
        }
    };

    module("Spreadsheet toolbar", moduleOptions);

    function createSpreadsheet(options) {
        options = options || { toolbar: true };
        spreadsheet = new kendo.ui.Spreadsheet(element, options);
        return spreadsheet;
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

        ok(spreadsheet._view.toolbar instanceof kendo.ui.ToolBar);
    });

    function createWithTools(tools) {
        return createSpreadsheet({
            toolbar: {
                tools: tools
            }
        });
    }

    test("expands tools to items", function() {
        createWithTools([
            [ "bold", "italic", "underline" ]
        ]);

        equal(element.find(".k-toolbar .k-button").length, 3);
    });

    test("creates multiple button groups", function() {
        createWithTools([
            [ "bold", "italic", "underline" ],
            [ "alignLeft", "alignCenter", "alignRight" ]
        ]);

        equal(element.find(".k-toolbar .k-button").length, 6);
        equal(element.find(".k-toolbar .k-button-group").length, 2);
    });

    test("bold executes correct command", function() {
        createWithTools([ [ "bold" ] ]);

        spreadsheet._view.toolbar.bind("execute", function(e) {
            equal(e.commandType, "PropertyChangeCommand");
            equal(e.property, "bold");
            equal(e.value, true);
        });

        tap($(".k-i-bold"));
    });

    test("bold toggle off triggers execute with value null", function() {
        createWithTools([ [ "bold" ] ]);

        tap($(".k-i-bold"));

        spreadsheet._view.toolbar.bind("execute", function(e) {
            equal(e.value, null);
        });

        tap($(".k-i-bold"));
    });

    test("custom tool", function() {
        createWithTools([
            [ { type: "button", icon: "refresh", text: "Button" } ]
        ]);

        equal($(".k-i-refresh").length, 1);
    });

    var tool, toolbar;

    module("SpreadSheet PopupTool", moduleOptions);

    function createToolBar(options) {
        options = options || {};

        options.range = function() {
            var sheet = spreadsheet.activeSheet();
            return sheet.range(sheet.activeCell());
        };

        return new kendo.spreadsheet.ToolBar(toolbarElement, options);
    }

    function popupTool() {
        var toolbar = createToolBar();
        return new kendo.spreadsheet.toolbar.PopupTool({}, toolbar);
    }

    test("popup opens window", function() {
        tool = popupTool();

        tool.open();

        equal($(".k-window").length, 1);
        equal($(".k-spreadsheet-window").length, 1);
    });

    test("closing window destroys it", function() {
        tool = popupTool();

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

    module("SpreadSheet FormatPopup", moduleOptions);

    function formatPopup() {
        var toolbar = createToolBar();
        return new kendo.spreadsheet.toolbar.FormatPopupTool({}, toolbar);
    }

    test("can be opened twice", function() {
        tool = formatPopup();

        tool.open();
        tool.close();
        tool.open();

        ok(true);
    });

})();
