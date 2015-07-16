(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var moduleOptions = {
        setup: function() {
            kendo.effects.disable();
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        },
        teardown: function() {
            sheet.unbind();
            $(".k-spreadsheet-window").kendoWindow("destroy");
            kendo.effects.enable();
        }
    };

    function singleCellRange(row, col) {
        var RangeRef = kendo.spreadsheet.RangeRef;
        var CellRef = kendo.spreadsheet.CellRef;
        return new RangeRef(new CellRef(row, col), new CellRef(row, col));
    }

    function command(commandType, options) {
        var command =  new commandType(options);
        command.range(sheet.range("A1"));
        return command;
    }

    module("SpreadSheet EditCommand", moduleOptions);

    var editCommand = $.proxy(command, this, kendo.spreadsheet.EditCommand);

    test("exec changes cell value", function() {
        var command = editCommand({ value: "foo" });
        command.exec();

        equal(sheet.range("A1").value(), "foo");
    });

    test("undo reverts cell value", function() {
        sheet.range("A1").value("bar");

        var command = editCommand({ value: "foo" });

        command.exec();
        command.undo();

        equal(sheet.range("A1").value(), "bar");
    });

    test("redo applies undone command", function() {
        sheet.range("A1").value("bar");

        var command = editCommand({ value: "foo" });

        command.exec();
        command.undo();
        command.redo();

        equal(sheet.range("A1").value(), "foo");
    });

    module("SpreadSheet PopupCommand", moduleOptions);

    var popupCommand = $.proxy(command, this, kendo.spreadsheet.PopupCommand);

    test("exec opens window", function() {
        var command = popupCommand();

        command.exec();

        equal($(".k-window").length, 1);
        equal($(".k-spreadsheet-window").length, 1);
    });

    test("closing window destroys it", function() {
        var command = popupCommand();

        command.exec();

        command.popup().close();

        equal($(".k-spreadsheet-window").length, 0);
    });

    module("SpreadSheet FormatCellsCommand", moduleOptions);

    var formatCellsCommand = $.proxy(command, this, kendo.spreadsheet.FormatCellsCommand, {
        formats: [
            { category: "a", name: "Null", value: null },
            { category: "a", name: "Foo", value: "foo" },
            { category: "a", name: "Bar", value: "bar" },
            { category: "b", name: "Date", value: "mm-yy" }
        ]
    });

    test("shows preview text", function() {
        sheet.range("A1").value("bar");

        var command = formatCellsCommand();

        command.exec();

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "bar");
    });

    test("clicking cancel closes window", function() {
        var command = formatCellsCommand();

        command.exec();

        command.popup().element.find(".k-button:not(.k-primary)").click();

        equal($(".k-spreadsheet-window").length, 0);
    });

    test("clicking apply closes window", function() {
        var command = formatCellsCommand();

        command.exec();

        command.popup().element.find(".k-button.k-primary").click();

        equal($(".k-spreadsheet-window").length, 0);
    });

    test("setting format previews it with sample", function() {
        var command = formatCellsCommand();

        command.exec();

        command.set("format", "foo");

        equal(command.preview(), "foo");
    });

    test("apply sets cell format", function() {
        var command = formatCellsCommand();

        command.exec();

        command.set("format", "foo");

        command.apply();

        equal(sheet.range("A1").format(), "foo");
    });

    test("clicking format previews it", function() {
        var command = formatCellsCommand();

        command.exec();

        command.set("format", "bar");

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "bar");
    });

    test("changing date format", function() {
        sheet.range("A1").value("11/11/2015");

        var command = formatCellsCommand();

        command.exec();

        command.set("format", "mm-yy");

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "11-15");
    });

    test("date format is pre-set", function() {
        sheet.range("A1").value("11/11/2011").format("mm-yy");

        var command = formatCellsCommand();

        command.exec();

        equal(command.format, "mm-yy");
    });

    test("lists categories", function() {
        var command = formatCellsCommand();

        command.exec();

        deepEqual(command.categories(), [ "a", "b" ]);
    });
})();
