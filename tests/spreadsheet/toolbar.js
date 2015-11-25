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

    test("renders all toolbars if option is set", function() {
        createSpreadsheet({ toolbar: true });

        equal(element.find(".k-toolbar").length, 3); //home, insert, data toolbars
    });

    test("stores reference to each toolbar", function() {
        createSpreadsheet();
        var tabstrip = spreadsheet._view.tabstrip;
        var homeToolBar = tabstrip.toolbars["home"];
        var insertToolBar = tabstrip.toolbars["insert"];
        var dataToolBar = tabstrip.toolbars["data"];

        ok(homeToolBar instanceof kendo.ui.ToolBar);
        ok(insertToolBar instanceof kendo.ui.ToolBar);
        ok(dataToolBar instanceof kendo.ui.ToolBar);
    });

    test("renders only specified toolbars", function() {
        createSpreadsheet({
            toolbar: {
               home: false,
               insert: true,
               formulas: false,
               data: false
            }
        });

        equal(element.find(".k-toolbar").length, 1);
    });

    test("not explicitly set to false toolbars are rendered", function() {
        createSpreadsheet({
            toolbar: {
               formulas: false,
            }
        });

        equal(element.find(".k-toolbar").length, 3);
    });

    test("propagates options to the toolbar instance", function() {
        createSpreadsheet({
            toolbar: {
                home: [ ["bold", "italic", "underline"] ],
                insert: false
            }
        });

        equal(element.find(".k-toolbar").length, 2);

        var homeToolBar = spreadsheet._view.tabstrip.toolbars["home"];
        ok(homeToolBar.options.items.length, 1);
    });

    var toolbar;

    function createWithTools(tools) {
        createSpreadsheet({
            toolbar: {
                home: tools,
                insert: false,
                formulas: false,
                data: false
            }
        });

        toolbar = spreadsheet._view.tabstrip.toolbars["home"];
    }

    test("expands tools to items", function() {
        createWithTools([
            [ "bold", "italic", "underline" ]
        ]);

        equal(element.find(".k-toolbar .k-button").length, 3 + 1); //+1 because of the overflow hamburger
    });

    test("creates multiple button groups", function() {
        createWithTools([
            [ "cut", "copy", "paste" ],
            [ "bold", "italic", "underline" ],
        ]);

        equal(element.find(".k-toolbar .k-button").length, 6 + 1); //+1 because of the overflow hamburger
        equal(element.find(".k-toolbar .k-button-group").length, 2);
    });

    test("bold triggers activate with correct args", 3, function() {
        createWithTools([ "bold" ]);

        toolbar.one("action", function(e) {
            equal(e.command, "PropertyChangeCommand");
            equal(e.options.property, "bold");
            equal(e.options.value, true);
        });

        clickAt($(".k-i-bold"));
    });

    test("bold toggle off triggers action event with value null", 1, function() {
        createWithTools([ "bold" ]);

        sheet.range("A1").bold(true);

        toolbar.one("action", function(e) {
            equal(e.options.value, null);
        });

        clickAt($(".k-i-bold"));
    });

    test("mergeCell click triggers action event with correct value", 1, function() {
        createWithTools([ "merge" ]);

        toolbar.one("action", function(e) {
            equal(e.options.value, "cells");
        });

        sheet.select("A1:B2");
        $("[data-value=cells]").trigger("click");
    });

    test("mergeCells buttons have title attribute", function() {
        createWithTools([ "merge" ]);

        equal($(".k-popup .k-button:not(.k-overflow-button)[title='Merge all']").attr("data-value"), "cells");
        equal($(".k-popup [title='Merge horizontally']").attr("data-value"), "horizontally");
        equal($(".k-popup [title='Merge vertically']").attr("data-value"), "vertically");
        equal($(".k-popup [title='Unmerge']").attr("data-value"), "unmerge");
    });

    test("textAlign button click triggers action event with correct value", 2, function() {
        createWithTools([ "alignment" ]);

        toolbar.one("action", function(e) {
            equal(e.options.property, "textAlign");
            equal(e.options.value, "right");
        });

        sheet.select("A1:B2");
        $("[data-property=textAlign][data-value=right]").trigger("click");
    });

    test("verticalAlign button click triggers action event with correct value", 2, function() {
        createWithTools([ "alignment" ]);

        toolbar.one("action", function(e) {
            equal(e.options.property, "verticalAlign");
            equal(e.options.value, "center");
        });

        sheet.select("A1:B2");
        $("[data-property=verticalAlign][data-value=center]").trigger("click");
    });

    test("custom tool", function() {
        createWithTools([
            [ { type: "button", icon: "refresh", text: "Button" } ]
        ]);

        equal($(".k-i-refresh").length, 1 + 1); //+1 because of the overflow hamburger
    });

    test("click on a custom button does not throw JS error", 0, function() {
        createWithTools([
            [ { type: "button", icon: "refresh", text: "Button", id: "foo" } ]
        ]);

        try {
            tap($("#foo"));
        } catch (e) {
            ok(false);
        }
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

    /* comment temporary, works on playground
    test("refreshes textAlign buttons", function() {
        createWithTools([ "alignment" ]);

        sheet.range("A1").textAlign("center");

        ok(!toolbar.element.find("[data-property=textAlign][data-value=left]").hasClass("k-state-active"));
        ok(toolbar.element.find("[data-property=textAlign][data-value=center]").hasClass("k-state-active"));
        ok(!toolbar.element.find("[data-property=textAlign][data-value=right]").hasClass("k-state-active"));
    });
    */

    test("refreshes color palette state", function() {
        createWithTools([ "backgroundColor" ]);

        var color = "#7fd13b";

        sheet.range("A1").background(color);

        var colorPicker = $("[data-property=background]").data("colorPicker");

        equal(colorPicker.colorChooser.value(), color);
    });

    test("refreshes font size state", function() {
        createWithTools([ "fontSize" ]);

        sheet.range("A1").fontSize(15);

        var combobox = toolbar.element.find("[data-role=combobox]").data("kendoComboBox");

        equal(combobox.value(), 15);
    });

    test("refreshes font size state", function() {
        createWithTools([ "fontSize" ]);

        sheet.range("A1").fontSize(15);

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

        sheet.range("A1").fontSize(9);

        var text = toolbar.popup.element.find("[data-tool=fontSize] .k-text").text();
        equal(text, "Font size (9) ...");
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

    test("tabstrip bubbles toolbar dialog requests", 1, function() {
        createSpreadsheet();

        var tabstrip = spreadsheet._view.tabstrip;
        var toolbar = tabstrip.toolbars["home"];

        tabstrip.bind("dialog", function(e) {
            equal(e.name, "foo");
        });

        toolbar.dialog({ name: "foo" });
    });

})();
