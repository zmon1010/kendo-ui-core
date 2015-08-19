(function() {
    var spreadsheet;
    var sheet;
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
        sheet = spreadsheet.activeSheet();
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

    var toolbar;

    function createWithTools(tools) {
        createSpreadsheet({
            toolbar: {
                tools: tools
            }
        });

        toolbar = spreadsheet._view.toolbar;
    }

    test("expands tools to items", function() {
        createWithTools([
            [ "bold", "italic", "underline" ]
        ]);

        equal(element.find(".k-toolbar .k-button").length, 3 + 1); //+1 because of the overflow hamburger
    });

    test("creates multiple button groups", function() {
        createWithTools([
            [ "bold", "italic", "underline" ],
            [ "alignLeft", "alignCenter", "alignRight" ]
        ]);

        equal(element.find(".k-toolbar .k-button").length, 6 + 1); //+1 because of the overflow hamburger
        equal(element.find(".k-toolbar .k-button-group").length, 2);
    });

    test("bold executes correct command", 3, function() {
        createWithTools([ "bold" ]);

        toolbar.one("execute", function(e) {
            equal(e.commandType, "PropertyChangeCommand");
            equal(e.property, "bold");
            equal(e.value, true);
        });

        tap($(".k-i-bold"));
    });

    test("bold toggle off triggers execute with value null", 1, function() {
        createWithTools([ "bold" ]);

        sheet.range("A1").bold(true);

        toolbar.one("execute", function(e) {
            equal(e.value, null);
        });

        tap($(".k-i-bold"));
    });

    test("custom tool", function() {
        createWithTools([
            [ { type: "button", icon: "refresh", text: "Button" } ]
        ]);

        equal($(".k-i-refresh").length, 1 + 1); //+1 because of the overflow hamburger
    });

    test("refreshes toggle button state", function() {
        createWithTools([ "bold" ]);

        sheet.range("A1").bold(true);

        ok(toolbar.element.find("[data-property=bold]").hasClass("k-state-active"));
    });

    test("refreshes color picker state", function() {
        createWithTools([ "backgroundColor" ]);

        var color = "#ff0000";

        sheet.range("A1").background(color);

        var colorpicker = toolbar.element.find("[data-role=colorpicker]").data("kendoColorPicker");

        equal(colorpicker.value(), color);
    });

    test("refreshes font size state", function() {
        createWithTools([ "fontSize" ]);

        sheet.range("A1").fontSize("15px");

        var combobox = toolbar.element.find("[data-role=combobox]").data("kendoComboBox");

        equal(combobox.value(), 15);
    });

    test("refreshes font size state", function() {
        createWithTools([ "fontSize" ]);

        sheet.range("A1").fontSize("15px");

        var combobox = toolbar.element.find("[data-role=combobox]").data("kendoComboBox");

        equal(combobox.value(), 15);
    });

    test("refreshes font family state", function() {
        createWithTools([ "fontFamily" ]);

        sheet.range("A1").fontFamily("Arial");

        var ddl = toolbar.element.find("[data-role=dropdownlist]").data("kendoDropDownList");

        equal(ddl.value(), "Arial");
    });

    test("refreshes text wrap state", function() {
        createWithTools([ "textWrap" ]);

        sheet.range("A1").wrap(true);

        ok(toolbar.element.find("[data-command=TextWrapCommand]").hasClass("k-state-active"));
    });

})();
