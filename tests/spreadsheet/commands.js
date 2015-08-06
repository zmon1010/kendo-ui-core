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

        if (range.borderLeft()) { borders.push("left"); }
        if (range.borderTop()) { borders.push("top"); }
        if (range.borderRight()) { borders.push("right"); }
        if (range.borderBottom()) { borders.push("bottom"); }

        return borders.toString();
    }

    test("allBorders command sets borders to all cells", function() {
        var command = new BorderChangeCommand({ border: "allBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "right,bottom");
        equal(getBorders(sheet.range("A2")), "top,right,bottom");
        equal(getBorders(sheet.range("B1")), "left,right,bottom");
        equal(getBorders(sheet.range("B2")), "left,top,right,bottom");
    });

    test("allBorders command sets borders to all cells (union range)", function() {
        var command = new BorderChangeCommand({ border: "allBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2, C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "left,top,right,bottom");
        equal(getBorders(sheet.range("C3")), "left,top,right,bottom");
    });

    test("allBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "allBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2, C3"));
        command.exec();
    });

/*
    test("allBorders command can be undone", function() {
        var oldState = { size: "1px", color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "allBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A2:C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });
*/
    test("noBorders command clears all borders", function() {
        var command = new BorderChangeCommand({ border: "allBorders", style: { size: "1px", color: "#F00" } });
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

/*
    test("noBorders command can be undone", function() {
        var oldState = { size: "1px", color: "#0F0" };
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
*/

    test("borderLeft commands sets border only on the leftColumn", function() {
        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B1:C2"));

        command.exec();
        equal(getBorders(sheet.range("B1")), "left");
        equal(getBorders(sheet.range("B2")), "left");
        equal(getBorders(sheet.range("C1")), "");
        equal(getBorders(sheet.range("C2")), "");
    });

    test("borderLeft commands sets border only on the leftColumn (union range)", function() {
        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: "1px", color: "#F00" } });
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

        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B1:B2, C2:C3"));
        command.exec();
    });

/*
    test("borderLeft command can be undone", function() {
        var oldState = { size: "1px", color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });
*/

    test("borderRight commands sets border only on the rightColumn", function() {
        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B1")), "right");
        equal(getBorders(sheet.range("B2")), "right");
    });

    test("borderRight commands sets border only on the rightColumn (union range)", function() {
        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: "1px", color: "#F00" } });
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

        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B1:B2,C2:C3"));
        command.exec();
    });

    test("borderTop commands sets border only on the topRow", function() {
        var command = new BorderChangeCommand({ border: "topBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A2:B3"));

        command.exec();
        equal(getBorders(sheet.range("A2")), "top");
        equal(getBorders(sheet.range("A3")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("B3")), "");
    });

    test("borderTop commands sets border only on the topRow (union range)", function() {
        var command = new BorderChangeCommand({ border: "topBorder", style: { size: "1px", color: "#F00" } });
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

        var command = new BorderChangeCommand({ border: "topBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:B3, 3:3"));
        command.exec();
    });

    test("borderBottom commands sets border only on the bottomRow", function() {
        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "bottom");
        equal(getBorders(sheet.range("B1")), "");
        equal(getBorders(sheet.range("B2")), "bottom");
    });

    test("borderBottom commands sets border only on the bottomRow (union range)", function() {
        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: "1px", color: "#F00" } });
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

        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:B3, 2:2"));
        command.exec();
    });

    test("outsideBorders commands sets borders around the selection", function() {
        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "left,top");
        equal(getBorders(sheet.range("B3")), "left,bottom");
        equal(getBorders(sheet.range("C2")), "top,right");
        equal(getBorders(sheet.range("C3")), "right,bottom");
    });

    test("outsideBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

/*
    test("outsideBorders command can be undone", function() {
        var oldState = { size: "1px", color: "#0F0" };
        sheet.range("B2:C2").borderTop(oldState);

        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A2,C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B2")), "top");
        equal(getBorders(sheet.range("C2")), "top");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });
*/

    test("insideBorders commands sets borders inside the selection", function() {
        var command = new BorderChangeCommand({ border: "insideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "right,bottom");
        equal(getBorders(sheet.range("B3")), "top,right");
        equal(getBorders(sheet.range("C2")), "left,bottom");
        equal(getBorders(sheet.range("C3")), "left,top");
    });

    test("insideBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "insideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

    test("insideHorizontalBorders commands sets bottomBorder to each row of the selection except the last one", function() {
        var command = new BorderChangeCommand({ border: "insideHorizontalBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "bottom");
        equal(getBorders(sheet.range("B3")), "top");
        equal(getBorders(sheet.range("C2")), "bottom");
        equal(getBorders(sheet.range("C3")), "top");
    });

    test("insideHorizontalBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "insideHorizontalBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

    test("insideVerticalBorders commands sets bottomRight to each column of the selection except the last one", function() {
        var command = new BorderChangeCommand({ border: "insideVerticalBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "right");
        equal(getBorders(sheet.range("B3")), "right");
        equal(getBorders(sheet.range("C2")), "left");
        equal(getBorders(sheet.range("C3")), "left");
    });

    test("insideVerticalBorders command triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true))

        var command = new BorderChangeCommand({ border: "insideVerticalBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));
        command.exec();
    });

/*
    test("insideVerticalBorders command can be undone", function() {
        var oldState = { size: "1px", color: "#0F0" };
        sheet.range("B2:C2").borderLeft(oldState);

        var command = new BorderChangeCommand({ border: "outsideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A2,C2"));

        command.exec();
        command.undo();

        equal(getBorders(sheet.range("A2")), "right");
        equal(getBorders(sheet.range("B2")), "left,right");
        equal(getBorders(sheet.range("C2")), "left");
        equal(sheet.range("B2").borderTop().color, oldState.color);
        equal(sheet.range("C2").borderTop().color, oldState.color);
    });
*/

})();
