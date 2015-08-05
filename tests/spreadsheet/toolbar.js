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

    /*
    module("SpreadSheet PopupTool", moduleOptions);

    var popupTool = $.proxy(command, this, kendo.spreadsheet.PopupTool);

    test("exec opens window", function() {
        var command = popupTool();

        command.exec();

        equal($(".k-window").length, 1);
        equal($(".k-spreadsheet-window").length, 1);
    });

    test("closing window destroys it", function() {
        var command = popupTool();

        command.exec();

        command.popup().close();

        equal($(".k-spreadsheet-window").length, 0);
    });

    module("SpreadSheet FormatCellsTool", moduleOptions);

    var formatCellsTool = $.proxy(command, this, kendo.spreadsheet.FormatCellsTool, {
        formats: [
            { category: "a", name: "Null", value: null },
            { category: "a", name: "Foo", value: "foo" },
            { category: "a", name: "Bar", value: "bar" },
            { category: "b", name: "Date", value: "mm-yy" }
        ]
    });

    test("shows preview text", function() {
        sheet.range("A1").value("bar");

        var command = formatCellsTool();

        command.exec();

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "bar");
    });

    test("clicking apply closes window", function() {
        var command = formatCellsTool();

        command.exec();

        command.popup().element.find(".k-button.k-primary").click();

        equal($(".k-spreadsheet-window").length, 0);
    });

    test("setting format previews it with sample", function() {
        var command = formatCellsTool();

        command.exec();

        command.set("format", "foo");

        equal(command.preview(), "foo");
    });

    test("apply sets cell format", function() {
        var command = formatCellsTool();

        command.exec();

        command.set("format", "foo");

        command.apply();

        equal(sheet.range("A1").format(), "foo");
    });

    test("clicking format previews it", function() {
        var command = formatCellsTool();

        command.exec();

        command.set("format", "bar");

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "bar");
    });

    test("changing date format", function() {
        sheet.range("A1").value("11/11/2015");

        var command = formatCellsTool();

        command.exec();

        command.categoryFilter("b");
        command.set("format", "mm-yy");

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "11-15");
    });

    test("date format is pre-set", function() {
        sheet.range("A1").value("11/11/2011").format("mm-yy");

        var command = formatCellsTool();

        command.exec();

        equal(command.format, "mm-yy");
    });

    test("lists categories", function() {
        var command = formatCellsTool();

        command.exec();

        deepEqual(command.categories(), [ "a", "b" ]);
    });
    */

})();
