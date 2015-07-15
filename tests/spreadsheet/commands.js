(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var moduleOptions = {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        },
        teardown: function() {
            sheet.unbind();
            $(".k-spreadsheet-window").kendoWindow("destroy");
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
        var command = popupCommand({ dialogOptions: { animation: false } });

        command.exec();

        command.popup().close();

        equal($(".k-spreadsheet-window").length, 0);
    });

    module("SpreadSheet FormatCellsCommand", moduleOptions);

    var formatCellsCommand = $.proxy(command, this, kendo.spreadsheet.FormatCellsCommand);

    test("shows preview text", function() {
        sheet.range("A1").value("bar");

        var command = formatCellsCommand();

        command.exec();

        var preview = command.popup().element.find(".k-spreadsheet-preview");

        equal(preview.text(), "bar");
    });
})();
