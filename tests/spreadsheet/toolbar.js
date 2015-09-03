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
            var command = e.command;
            ok(command instanceof kendo.spreadsheet.PropertyChangeCommand);
            equal(command.options.property, "bold");
            equal(command.options.value, true);
        });

        tap($(".k-i-bold"));
    });

    test("bold toggle off triggers execute with value null", 1, function() {
        createWithTools([ "bold" ]);

        sheet.range("A1").bold(true);

        toolbar.one("execute", function(e) {
            equal(e.command.options.value, null);
        });

        tap($(".k-i-bold"));
    });

    test("mergeCell click triggers execute with correct value", 1, function() {
        createWithTools([ "mergeCells" ]);

        toolbar.one("execute", function(e) {
            equal(e.command.options.value, "cells");
        });

        sheet.select("A1:B2");
        tap(toolbar.element.find("[data-tool=mergeCells]"));
    });

    test("mergeCells click triggers execute with correct value", 1, function() {
        createWithTools([ "mergeSplitButton" ]);

        toolbar.one("execute", function(e) {
            equal(e.command.options.value, "cells");
        });

        sheet.select("A1:B2");
        tap(toolbar.element.find("[data-tool=mergeSplitButton]"));
    });

    test("mergeCells buttons have data-tool attribute", function() {
        createWithTools([ "mergeSplitButton" ]);

        //adding +1 because of the hamburger buttons
        equal($("[data-tool=mergeSplitButton]").length, 1 + 1);
        equal($("[data-tool=mergeHorizontally]").length, 1 + 1);
        equal($("[data-tool=mergeVertically]").length, 1 + 1);
        equal($("[data-tool=unmerge]").length, 1 + 1);
    });

    test("mergeCells buttons have title attribute", function() {
        createWithTools([ "mergeSplitButton" ]);

        equal($("[data-tool=mergeSplitButton]").attr("title"), "Merge cells");
        equal($("[data-tool=mergeHorizontally]").attr("title"), "Merge horizontally");
        equal($("[data-tool=mergeVertically]").attr("title"), "Merge vertically");
        equal($("[data-tool=unmerge]").attr("title"), "Unmerge");
    });

    test("textAlign button click triggers execute with correct value", 2, function() {
        createWithTools([ [ "alignLeft", "alignCenter", "alignRight" ] ]);

        toolbar.one("execute", function(e) {
            equal(e.command.options.property, "textAlign");
            equal(e.command.options.value, "right");
        });

        sheet.select("A1:B2");
        tap(toolbar.element.find("[data-tool=alignRight]"));
    });

    test("verticalAlign button click triggers execute with correct value", 2, function() {
        createWithTools([ [ "alignTop", "alignMiddle", "alignBottom" ] ]);

        toolbar.one("execute", function(e) {
            equal(e.command.options.property, "verticalAlign");
            equal(e.command.options.value, "middle");
        });

        sheet.select("A1:B2");
        tap(toolbar.element.find("[data-tool=alignMiddle]"));
    });

    test("formatCurrency button click triggers execute with correct value", 2, function() {
        createWithTools([ [ "formatCurrency", "formatPercentage", "formatDecreaseDecimal", "formatIncreaseDecimal" ] ]);

        toolbar.one("execute", function(e) {
            equal(e.command.options.property, "format");
            equal(e.command.options.value, "$?");
        });

        sheet.select("A1:B2");
        tap(toolbar.element.find("[data-tool=formatCurrency]"));
    });

    test("formatPercentage button click triggers execute with correct value", 2, function() {
        createWithTools([ [ "formatCurrency", "formatPercentage", "formatDecreaseDecimal", "formatIncreaseDecimal" ] ]);

        toolbar.one("execute", function(e) {
            equal(e.command.options.property, "format");
            equal(e.command.options.value, "?.00%");
        });

        sheet.select("A1:B2");
        tap(toolbar.element.find("[data-tool=formatPercentage]"));
    });

    test("custom tool", function() {
        createWithTools([
            [ { type: "button", icon: "refresh", text: "Button" } ]
        ]);

        equal($(".k-i-refresh").length, 1 + 1); //+1 because of the overflow hamburger
    });

    test("buttons has title attribute", function() {
        createWithTools([ "bold", "textWrap" ]);

        equal(toolbar.element.find("[data-property=bold]").attr("title"), "Bold");
        equal(toolbar.element.find("[data-property=wrap]").attr("title"), "Wrap text");
    });

    test("refreshes toggle button state", function() {
        createWithTools([ "bold" ]);

        sheet.range("A1").bold(true);

        ok(toolbar.element.find("[data-property=bold]").hasClass("k-state-active"));
    });

    test("refreshes textAlign buttons", function() {
        createWithTools([
            [ "alignLeft", "alignCenter", "alignRight" ],
        ]);

        sheet.range("A1").textAlign("center");

        ok(!toolbar.element.find("a[data-tool=alignLeft]").hasClass("k-state-active"));
        ok(toolbar.element.find("a[data-tool=alignCenter]").hasClass("k-state-active"));
        ok(!toolbar.element.find("a[data-tool=alignRight]").hasClass("k-state-active"));
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

        ok(toolbar.element.find("[data-tool=textWrap]").hasClass("k-state-active"));
    });

    test("refreshes fontFamilty overflow button state", function() {
        createWithTools([ "fontFamily" ]);

        sheet.range("A1").fontFamily("Georgia");

        var text = toolbar.popup.element.find("[data-tool=fontFamily] .k-text").text();
        equal(text, "Font (Georgia) ...");
    });

    test("refreshes fontSize overflow button state", function() {
        createWithTools([ "fontSize" ]);

        sheet.range("A1").fontSize("9px");

        var text = toolbar.popup.element.find("[data-tool=fontSize] .k-text").text();
        equal(text, "Font size (9px) ...");
    });

    test("refreshes filter button state", function() {
        createWithTools([ "filter" ]);

        var range = sheet.range("A1:B2");

        range
            .values([ [1, 2], [2, 3] ])
            .filter({
                column: 0,
                filter: new kendo.spreadsheet.ValueFilter( {
                    values: [2]
                })
            });

        ok(toolbar.element.find("[data-property=hasFilter]").hasClass("k-state-active"));

        range.filter(false);

        ok(!toolbar.element.find("[data-property=hasFilter]").hasClass("k-state-active"));
    });

})();
