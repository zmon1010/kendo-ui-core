(function() {
    var spreadsheet;
    var element;

    module("Spreadsheet toolbar", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

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

})();
