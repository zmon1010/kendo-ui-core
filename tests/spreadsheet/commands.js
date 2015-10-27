(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var oldTextHeight = kendo.spreadsheet.util.getTextHeight;
    var moduleOptions = {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(4, 4, defaults.rowHeight, defaults.columnWidth);
        },
        teardown: function() {
            sheet.unbind();

            kendo.spreadsheet.util.getTextHeight = oldTextHeight;
        }
    };

    function singleCellRange(row, col) {
        var RangeRef = kendo.spreadsheet.RangeRef;
        var CellRef = kendo.spreadsheet.CellRef;
        return new RangeRef(new CellRef(row, col), new CellRef(row, col));
    }

    function command(commandType, options) {
        var c = new commandType(options);
        c.range(sheet.range("A1"));
        return c;
    }

    module("SpreadSheet PropertyChange", moduleOptions);

    test("command can be undone", function() {
        sheet.range("B1:C1").background("#0F0");

        var c = new kendo.spreadsheet.PropertyChangeCommand({ property: "background", value: "#F00" });
        c.range(sheet.range("A1:C1"));

        c.exec();
        c.undo();

        equal(sheet.range("A1").background(), null);
        equal(sheet.range("B1").background(), "#0F0");
        equal(sheet.range("C1").background(), "#0F0");
    });

    test("command can be undone (union range)", function() {
        sheet.range("A1,B2:C2").background("#0F0");

        var c = new kendo.spreadsheet.PropertyChangeCommand({ property: "background", value: "#F00" });
        c.range(sheet.range("A1:B2"));

        c.exec();
        c.undo();

        equal(sheet.range("A1").background(), "#0F0");
        equal(sheet.range("A2").background(), null);
        equal(sheet.range("B1").background(), null);
        equal(sheet.range("B2").background(), "#0F0");
        equal(sheet.range("C2").background(), "#0F0");
    });

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

    test("command can be undone", function() {
        sheet.range("B1:C1").value("11/11/2011").format("mm-yy");

        var c = new kendo.spreadsheet.PropertyChangeCommand({ property: "format", value: "d-mmm" });
        c.range(sheet.range("A1:C1"));

        c.exec();
        c.undo();

        equal(sheet.range("A1").format(), null);
        equal(sheet.range("B1").format(), "mm-yy");
        equal(sheet.range("C1").format(), "mm-yy");
    });

    var BorderChangeCommand = kendo.spreadsheet.BorderChangeCommand;

    module("SpreadSheet BorderChange", moduleOptions);

    function getBorders(range) {
        var borders = [];

        if (range.collapsedBorderLeft()) { borders.push("left"); }
        if (range.collapsedBorderTop()) { borders.push("top"); }
        if (range.collapsedBorderRight()) { borders.push("right"); }
        if (range.collapsedBorderBottom()) { borders.push("bottom"); }

        return borders.toString();
    }

    test("allBorders command sets borders to all cells", function() {
        var command = new BorderChangeCommand({ border: "allBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "left,top,right,bottom");
        equal(getBorders(sheet.range("A2")), "left,top,right,bottom");
        equal(getBorders(sheet.range("B1")), "left,top,right,bottom");
        equal(getBorders(sheet.range("B2")), "left,top,right,bottom");
    });

    test("allBorders command sets borders to all cells (union range)", function() {
        var command = new BorderChangeCommand({ border: "allBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2, C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "left,top,right,bottom");
        equal(getBorders(sheet.range("C3")), "left,top,right,bottom");
    });

    test("allBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "allBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2, C3"));
        command.exec();
    });

    test("allBorders command can be undone", function() {
        var oldState = { size: 1, color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "allBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A2:C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");

        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });

    test("noBorders command clears all borders", function() {
        var command = new BorderChangeCommand({ border: "allBorders", style: { size: 1, color: "#F00" } });
        var command = new BorderChangeCommand({ border: "noBorders", style: {} });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B1")), "");
        equal(getBorders(sheet.range("B2")), "");
    });

    test("noBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "noBorders", style: {} });
        command.range(sheet.range("B2, C3"));
        command.exec();
    });

    test("noBorders command can be undone", function() {
        var oldState = { size: 1, color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "noBorders", style: {} });
        command.range(sheet.range("A2:C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });

    test("borderLeft commands sets border only on the leftColumn", function() {
        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B1:C2"));

        command.exec();
        equal(getBorders(sheet.range("B1")), "left");
        equal(getBorders(sheet.range("B2")), "left");
        equal(getBorders(sheet.range("C1")), "");
        equal(getBorders(sheet.range("C2")), "");
    });

    test("borderLeft commands sets border only on the leftColumn (union range)", function() {
        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B1:B2, C2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B1")), "left");
        equal(getBorders(sheet.range("B2")), "left,right");
        equal(getBorders(sheet.range("B3")), "right");
        equal(getBorders(sheet.range("C1")), "");
        equal(getBorders(sheet.range("C2")), "left");
        equal(getBorders(sheet.range("C3")), "left");
    });

    test("borderLeft command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B1:B2, C2:C3"));
        command.exec();
    });

    test("borderLeft command can be undone", function() {
        var oldState = { size: 1, color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });

    test("borderRight commands sets border only on the rightColumn", function() {
        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B1")), "right");
        equal(getBorders(sheet.range("B2")), "right");
    });

    test("borderRight commands sets border only on the rightColumn (union range)", function() {
        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B1:B2,C2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B1")), "right");
        equal(getBorders(sheet.range("B2")), "right");
        equal(getBorders(sheet.range("B3")), "");
        equal(getBorders(sheet.range("C1")), "left");
        equal(getBorders(sheet.range("C2")), "left,right");
        equal(getBorders(sheet.range("C3")), "right");
    });

    test("borderRight command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B1:B2,C2:C3"));
        command.exec();
    });

    test("borderTop commands sets border only on the topRow", function() {
        var command = new BorderChangeCommand({ border: "topBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A2:B3"));

        command.exec();
        equal(getBorders(sheet.range("A2")), "top");
        equal(getBorders(sheet.range("A3")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("B3")), "");
    });

    test("borderTop commands sets border only on the topRow (union range)", function() {
        var command = new BorderChangeCommand({ border: "topBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:B3, 3:3"));

        command.exec();
        equal(getBorders(sheet.range("A2")), "bottom");
        equal(getBorders(sheet.range("A3")), "top");
        equal(getBorders(sheet.range("B2")), "top,bottom");
        equal(getBorders(sheet.range("B3")), "top");
        equal(getBorders(sheet.range("C2")), "bottom");
        equal(getBorders(sheet.range("C3")), "top");
    });

    test("borderTop command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "topBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:B3, 3:3"));
        command.exec();
    });

    test("borderBottom commands sets border only on the bottomRow", function() {
        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "bottom");
        equal(getBorders(sheet.range("B1")), "");
        equal(getBorders(sheet.range("B2")), "bottom");
    });

    test("borderBottom commands sets border only on the bottomRow (union range)", function() {
        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:B3, 2:2"));

        command.exec();
        equal(getBorders(sheet.range("A2")), "bottom");
        equal(getBorders(sheet.range("A3")), "top");
        equal(getBorders(sheet.range("B2")), "bottom");
        equal(getBorders(sheet.range("B3")), "top,bottom");
        equal(getBorders(sheet.range("C2")), "bottom");
        equal(getBorders(sheet.range("C3")), "top");
    });

    test("borderBottom command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:B3, 2:2"));
        command.exec();
    });

    test("outsideBorders commands sets borders around the selection", function() {
        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "left,top");
        equal(getBorders(sheet.range("B3")), "left,bottom");
        equal(getBorders(sheet.range("C2")), "top,right");
        equal(getBorders(sheet.range("C3")), "right,bottom");
    });

    test("outsideBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

    test("outsideBorders command can be undone", function() {
        var oldState = { size: 1, color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A2,C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });

    test("insideBorders commands sets borders inside the selection", function() {
        var command = new BorderChangeCommand({ border: "insideBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "right,bottom");
        equal(getBorders(sheet.range("B3")), "top,right");
        equal(getBorders(sheet.range("C2")), "left,bottom");
        equal(getBorders(sheet.range("C3")), "left,top");
    });

    test("insideBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "insideBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

    test("insideHorizontalBorders commands sets bottomBorder to each row of the selection except the last one", function() {
        var command = new BorderChangeCommand({ border: "insideHorizontalBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "bottom");
        equal(getBorders(sheet.range("B3")), "top");
        equal(getBorders(sheet.range("C2")), "bottom");
        equal(getBorders(sheet.range("C3")), "top");
    });

    test("insideHorizontalBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "insideHorizontalBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

    test("insideVerticalBorders commands sets bottomRight to each column of the selection except the last one", function() {
        var command = new BorderChangeCommand({ border: "insideVerticalBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "right");
        equal(getBorders(sheet.range("B3")), "right");
        equal(getBorders(sheet.range("C2")), "left");
        equal(getBorders(sheet.range("C3")), "left");
    });

    test("insideVerticalBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "insideVerticalBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

    test("insideVerticalBorders command can be undone", function() {
        var oldState = { size: 1, color: "#0F0" };
        sheet.range("B2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: 1, color: "#F00" } });
        command.range(sheet.range("A2,C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "");
        equal(sheet.range("B2").borderTop().color, oldState.color);
    });

    var MergeCellCommand = kendo.spreadsheet.MergeCellCommand;

    function mergeCommand(value, range) {
        var command = new MergeCellCommand({ value: value });
        command.range(sheet.range(range));
        return command;
    }

    module("SpreadSheet MergeCell", moduleOptions);

    test("command 'mergeCells' merges all cells", function() {
        var command = mergeCommand("cells", "A1:B2");
        command.exec();

        var merged = sheet._mergedCells;
        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:B2");
    });

    test("command 'mergeCells' makes merged cell an activeCell", function() {
        var command = mergeCommand("cells", "A1:B2");
        command.exec();

        equal(sheet.activeCell().toString(), "A1:B2");
    });

    test("command 'mergeCells' can be undone", function() {
        sheet.range("A1:B2").background("#f00").values([ [1, 2], [3, 4] ]);

        var command = mergeCommand("cells", "A1:B2");
        command.exec();
        command.undo();

        equal(sheet.activeCell().toString(), "A1:A1", "Top left cell of the range is active");
        equal(sheet.range("A1:B2").values().toString(), "1,2,3,4");
    });

    test("command 'mergeHorizontally' merges all rows", function() {
        var command = mergeCommand("horizontally", "A1:B2");
        command.exec();

        var merged = sheet._mergedCells;
        equal(merged.length, 2);
        equal(merged[0].toString(), "A1:B1");
        equal(merged[1].toString(), "A2:B2");
    });

    test("command 'mergeHorizontally' merges all rows (union range)", function() {
        var command = mergeCommand("horizontally", "A1:A2,B2:C3");
        command.exec();

        var merged = sheet._mergedCells;
        equal(merged.length, 4);
        equal(merged[0].toString(), "A1:A1");
        equal(merged[1].toString(), "A2:A2");
        equal(merged[2].toString(), "B2:C2");
        equal(merged[3].toString(), "B3:C3");
    });

    test("command 'mergeHorizontally' makes first merged row an activeCell", function() {
        var command = mergeCommand("horizontally", "A1:B2");
        command.exec();

        equal(sheet.activeCell().toString(), "A1:B1");
    });

    test("command 'mergeHorizontally' can be undone", function() {
        sheet.range("A1:B2").background("#f00").values([ [1, 2], [3, 4] ]);

        var command = mergeCommand("horizontally", "A1:B2");
        command.exec();
        command.undo();

        equal(sheet.activeCell().toString(), "A1:A1", "Top left cell of the range is active");
        equal(sheet.range("A1:B2").values().toString(), "1,2,3,4");
    });

    test("command 'mergeVertically' merges all columns", function() {
        var command = mergeCommand("vertically", "A1:B2");
        command.exec();

        var merged = sheet._mergedCells;
        equal(merged.length, 2);
        equal(merged[0].toString(), "A1:A2");
        equal(merged[1].toString(), "B1:B2");
    });

    test("command 'mergeVertically' merges all columns (union range)", function() {
        var command = mergeCommand("vertically", "A1:A2,B2:C3");
        command.exec();

        var merged = sheet._mergedCells;
        equal(merged.length, 3);
        equal(merged[0].toString(), "A1:A2");
        equal(merged[1].toString(), "B2:B3");
        equal(merged[2].toString(), "C2:C3");
    });

    test("command 'mergeVertically' makes first merged column an activeCell", function() {
        var command = mergeCommand("vertically", "A1:B2");
        command.exec();

        equal(sheet.activeCell().toString(), "A1:A2");
    });

    test("command 'mergeVertically' can be undone", function() {
        sheet.range("A1:B2").background("#f00").values([ [1, 2], [3, 4] ]);

        var command = mergeCommand("vertically", "A1:B2");
        command.exec();
        command.undo();

        equal(sheet.activeCell().toString(), "A1:A1", "Top left cell of the range is active");
        equal(sheet.range("A1:B2").values().toString(), "1,2,3,4");
    });

    test("command 'unmerge' unmerges", function() {
        sheet.range("B2:C2").merge();
        var command = mergeCommand("unmerge", "A1:B2");
        command.exec();

        equal(sheet._mergedCells.length, 0);
    });

    test("command 'unmerge' makes topLeft cell an activeCell", function() {
        sheet.range("B2:C2").merge();
        var command = mergeCommand("unmerge", "A1:B2");
        command.exec();

        equal(sheet.activeCell().toString(), "A1:A1");
    });

    test("previously merged cells are restored when command 'unmerge' is undone", function() {
        sheet.range("A2:B2").merge();

        var command = mergeCommand("unmerge", "A1:B2");
        command.exec();
        command.undo();

        equal(sheet._mergedCells.length, 1);
    });

    var FreezePanesCommand = kendo.spreadsheet.FreezePanesCommand;

    function freezePanesCommand(value, range) {
        var command = new FreezePanesCommand({ value: value });
        command.range(sheet.range(range));
        return command;
    }

    module("SpreadSheet FreezePanesCommand", moduleOptions);

    test("command freeze panes freezes all cols and rows above topLeft corner of the range", function() {
        var command = freezePanesCommand("panes", "B2:C3");
        command.exec();

        var frozenRows = sheet.frozenRows();
        var frozenColumns = sheet.frozenColumns();

        equal(frozenRows, 1);
        equal(frozenColumns, 1);
    });

    test("command freeze rows freezes all rows above topLeft corner of the range", function() {
        var command = freezePanesCommand("rows", "B2:C3");
        command.exec();

        var frozenRows = sheet.frozenRows();
        var frozenColumns = sheet.frozenColumns();

        equal(frozenRows, 1);
        equal(frozenColumns, 0);
    });

    test("command freeze cols freezes all cols left from topLeft corner of the range", function() {
        var command = freezePanesCommand("columns", "B2:C3");
        command.exec();

        var frozenRows = sheet.frozenRows();
        var frozenColumns = sheet.frozenColumns();

        equal(frozenRows, 0);
        equal(frozenColumns, 1);
    });

    test("command unfreeze unfreezes all cols and rows", function() {
        sheet.frozenColumns(1).frozenRows(1);
        var command = freezePanesCommand("unfreeze", "B2:C3");
        command.exec();

        var frozenRows = sheet.frozenRows();
        var frozenColumns = sheet.frozenColumns();

        equal(frozenRows, 0);
        equal(frozenColumns, 0);
    });

    test("commands 'freeze rows' and 'freeeze cols' stacks", function() {
        var command1 = freezePanesCommand("rows", "B2:C3");
        command1.exec();

        var command2 = freezePanesCommand("columns", "B2:C3");
        command2.exec();

        var frozenRows = sheet.frozenRows();
        var frozenColumns = sheet.frozenColumns();

        equal(frozenRows, 1);
        equal(frozenColumns, 1);
    });

    module("SpreadSheet AdjustDecimals", moduleOptions);

    var adjustDecimalsCommand = $.proxy(command, this, kendo.spreadsheet.AdjustDecimalsCommand);

    test("adds decimal points", function() {
        sheet.range("A1").format("#.00");

        var command = adjustDecimalsCommand({ decimals: -1 });
        command.exec();

        equal(sheet.range("A1").format(), "#.0;@");
    });

    test("removes decimal points", function() {
        sheet.range("A1").format("#.0");

        var command = adjustDecimalsCommand({ decimals: +1 });
        command.exec();

        equal(sheet.range("A1").format(), "#.00;@");
    });

    test("can be undone", function() {
        sheet.range("A1").format("#.00");

        var command = adjustDecimalsCommand({ decimals: -1 });
        command.exec();
        command.undo();

        equal(sheet.range("A1").format(), "#.00");
    });

    test("does not break on cells with no format", function() {
        sheet.range("A1").format(null);

        var command = adjustDecimalsCommand({ decimals: -1 });
        command.exec();

        equal(sheet.range("A1").format(), null);
    });

    test("adds decimals to cells without format", function() {
        sheet.range("A1").format(null);

        var command = adjustDecimalsCommand({ decimals: +1 });
        command.exec();

        equal(sheet.range("A1").format(), "#.0;@");
    });

    module("SpreadSheet TextWrapCommand", moduleOptions);

    var TextWrapCommand = $.proxy(command, this, kendo.spreadsheet.TextWrapCommand);

    test("Expands the row height", function() {
        kendo.spreadsheet.util.getTextHeight = function() { return 50; };

        var command = TextWrapCommand({ value: true });
        command.exec();

        equal(sheet.rowHeight(0), 50);
    });

    test("Undo collapses the row height", function() {
        kendo.spreadsheet.util.getTextHeight = function() { return 50; };

        var command = TextWrapCommand({ value: true });
        command.exec();
        command.undo();

        equal(sheet.rowHeight(0), 20);
    });

    module("SpreadSheet FilterCommand", moduleOptions);

    var FilterCommand = $.proxy(command, this, kendo.spreadsheet.FilterCommand);

    test("Enables filtering", function() {
        var command = FilterCommand({});
        var range = sheet.range("A1:B2");

        command.exec();

        ok(range.hasFilter());
    });

    test("Disables filtering if sheet already has filter", function() {
        var command = FilterCommand({});
        var range = sheet.range("A1:B2");

        range.filter(true);
        command.exec();

        ok(!range.hasFilter());
    });

    test("can be undone", function() {
        var command = FilterCommand({});
        var range = sheet.range("A1:B2");

        command.exec();
        command.undo();

        ok(!range.hasFilter());
    });

    module("SpreadSheet SortCommand", moduleOptions);

    var sortCommand = $.proxy(command, this, kendo.spreadsheet.SortCommand);

    test("Sorts range ascending", function() {
        var command = sortCommand({ sheet: false, asc: true });

        sheet.range("A1:B3").values([
            [ 3, "a" ],
            [ 2, "b" ],
            [ 1, "c" ]
        ]);

        sheet.select("A1:B2");
        command.range(sheet.range("A1:B2"));

        command.exec();

        var valuesA = sheet.range("A1:A3").values();

        equal(valuesA[0], 2);
        equal(valuesA[1], 3);
        equal(valuesA[2], 1);

        var valuesB = sheet.range("B1:B3").values();

        equal(valuesB[0], "b");
        equal(valuesB[1], "a");
        equal(valuesB[2], "c");
    });

    test("Sorts range descending", function() {
        var command = sortCommand({ sheet: false, asc: false });

        sheet.range("A1:B3").values([
            [ 2, "a" ],
            [ 3, "b" ],
            [ 1, "c" ]
        ]);

        sheet.select("A1:B2");
        command.range(sheet.range("A1:B2"));

        command.exec();

        var valuesA = sheet.range("A1:A3").values();

        equal(valuesA[0], 3);
        equal(valuesA[1], 2);
        equal(valuesA[2], 1);

        var valuesB = sheet.range("B1:B3").values();

        equal(valuesB[0], "b");
        equal(valuesB[1], "a");
        equal(valuesB[2], "c");
    });

    test("Sorts sheet ascending", function() {
        var command = sortCommand({ sheet: true, asc: true });

        sheet.range("A1:B3").values([
            [ 3, "a" ],
            [ 2, "b" ],
            [ 1, "c" ]
        ]);

        sheet.select("A1:B2");
        command.range(sheet.range("A1:B2"));

        command.exec();

        var valuesA = sheet.range("A1:A3").values();

        equal(valuesA[0], 1);
        equal(valuesA[1], 2);
        equal(valuesA[2], 3);

        var valuesB = sheet.range("B1:B3").values();

        equal(valuesB[0], "c");
        equal(valuesB[1], "b");
        equal(valuesB[2], "a");
    });

    test("Sorts sheet descending", function() {
        var command = sortCommand({ sheet: true, asc: false });

        sheet.range("A1:B3").values([
            [ 1, "a" ],
            [ 2, "b" ],
            [ 3, "c" ]
        ]);

        sheet.select("A1:B2");
        command.range(sheet.range("A1:B2"));

        command.exec();

        var valuesA = sheet.range("A1:A3").values();

        equal(valuesA[0], 3);
        equal(valuesA[1], 2);
        equal(valuesA[2], 1);

        var valuesB = sheet.range("B1:B3").values();

        equal(valuesB[0], "c");
        equal(valuesB[1], "b");
        equal(valuesB[2], "a");
    });

    module("SpreadSheet ApplyFilterCommand", moduleOptions);

    var applyFilterCommand = $.proxy(command, this, kendo.spreadsheet.ApplyFilterCommand);

    test("exec applies value filter on range", function() {
        var command = applyFilterCommand({
            valueFilter: { values: [ 1 ] }
        });
        var range = sheet.range("A1:B2").filter(true);

        command.range(range);
        command.exec();

        ok(range.hasFilter());

        var column = sheet.filter().columns[0];

        equal(column.index, 0);
        ok(column.filter instanceof kendo.spreadsheet.ValueFilter);

        var filter = column.filter.toJSON();

        deepEqual(filter.filter, "value");
        deepEqual(filter.values, [ 1 ]);
    });

    test("exec applies custom filter on range", function() {
        var command = applyFilterCommand({
            customFilter: {
                logic: "and",
                criteria: [
                    { operator: "eq", value: 1 },
                    { operator: "eq", value: 2 }
                ]
            }
        });

        var range = sheet.range("A1:B2").filter(true);

        command.range(range);
        command.exec();

        ok(range.hasFilter());

        var column = sheet.filter().columns[0];

        equal(column.index, 0);
        ok(column.filter instanceof kendo.spreadsheet.CustomFilter);

        var filter = column.filter.toJSON();

        equal(filter.logic, "and");
        deepEqual(filter.criteria, [ { operator: "eq", value: 1 }, { operator: "eq", value: 2 } ]);
    });

    test("exec applies filter on passed column", function() {
        var command = applyFilterCommand({
            column: 1,
            valueFilter: { values: [ 1 ] }
        });
        var range = sheet.range("A1:B3").filter(true);

        command.range(range);
        command.exec();

        var column = sheet.filter().columns[0];

        equal(column.index, 1);
    });

    test("undo clears filter", function() {
        var command = applyFilterCommand({
            column: 1,
            valueFilter: { values: [ 1 ] }
        });

        var range = sheet.range("A1:B3").filter(true);

        command.range(range);
        command.exec();
        command.undo();

        var columns = sheet.filter().columns;
        equal(columns.length, 0);
    });

    test("undo restores previous filter", function() {
        var first = applyFilterCommand({ column: 1, valueFilter: { values: [ 1 ] } });
        var second = applyFilterCommand({ column: 1, valueFilter: { values: [ 2 ] } });

        var range = sheet.range("A1:B3").filter(true);

        first.range(range);
        first.exec();

        second.range(range);
        second.exec();
        second.undo();

        equal(sheet.filter().columns.length, 1);

        var column = sheet.filter().columns[0];
        var filter = column.filter.toJSON();

        deepEqual(filter.filter, "value");
        deepEqual(filter.values, [ 1 ]);
    });

    module("SpreadSheet ClearFilterCommand", moduleOptions);

    var clearFilterCommand = $.proxy(command, this, kendo.spreadsheet.ClearFilterCommand);

    test("clear filter command clears filter of a column", function() {
        //apply filter
        var filterCommand = applyFilterCommand({
            column: 1,
            valueFilter: { values: [ 1 ] }
        });

        var range = sheet.range("A1:B3").filter(true);

        filterCommand.range(range);
        filterCommand.exec();

        //clear filter
        var clearCommand = clearFilterCommand({ column: 1 });

        clearCommand.range(range);
        clearCommand.exec();

        var columns = sheet.filter().columns;
        equal(columns.length, 0);
    });

    test("clear filter command undo restores previous filter", function() {
        //apply filter
        var filterCommand = applyFilterCommand({
            column: 1,
            valueFilter: { values: [ 1 ] }
        });

        var range = sheet.range("A1:B3").filter(true);

        filterCommand.range(range);
        filterCommand.exec();

        //clear filter
        var clearCommand = clearFilterCommand({ column: 1 });

        clearCommand.range(range);
        clearCommand.exec();
        clearCommand.undo();

        var columns = sheet.filter().columns;
        equal(columns.length, 1);
    });

    module("Spreadsheet SaveAsCommand", moduleOptions);

    var SaveAsCommand = $.proxy(command, this, kendo.spreadsheet.SaveAsCommand);

    test("Saves workbook with specified name", function() {
        var command = SaveAsCommand({
            workbook: {
                saveAsExcel: function(e) {
                    equal(e.fileName, "Foo.xlsx");
                }
            },
            fileName: "Foo.xlsx"
        });

        command.exec();
    });


})();
