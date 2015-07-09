(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("SpreadSheet commands", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        },
        teardown: function() {
            sheet.unbind();
        }
    });

    var EditCommand = kendo.spreadsheet.EditCommand;

    function singleCellRange(row, col) {
        var RangeRef = kendo.spreadsheet.RangeRef;
        var CellRef = kendo.spreadsheet.CellRef;
        return new RangeRef(new CellRef(row, col), new CellRef(row, col));
    }

    function createCommand(value) {
        return new EditCommand({
            value: value,
            ref: singleCellRange(0,0),
            sheet: sheet
        })
    }

    test("exec changes cell value", function() {
        var command = createCommand("foo");
        command.exec();

        equal(sheet.range("A1").value(), "foo");
    });

    test("undo reverts cell value", function() {
        sheet.range("A1").value("bar");

        var command = createCommand("foo");

        command.exec();
        command.undo();

        equal(sheet.range("A1").value(), "bar");
    });

    test("redo applies undone command", function() {
        sheet.range("A1").value("bar");

        var command = createCommand("foo");

        command.exec();
        command.undo();
        command.redo();

        equal(sheet.range("A1").value(), "foo");
    });
})();
