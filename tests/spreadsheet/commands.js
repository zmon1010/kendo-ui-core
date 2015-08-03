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

        command.categoryFilter("b");
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

    test("executed with specific format applies it immediately", function() {
        sheet.range("A1").value("1");

        var c = command(kendo.spreadsheet.FormatCellsCommand, { format: "baz" });

        c.exec();

        equal(sheet.range("A1").format(), "baz");
        equal($(".k-spreadsheet-window").length, 0);
    });

    test("command can be undone", function() {
        sheet.range("A1").value("11/11/2011").format("mm-yy");

        var c = command(kendo.spreadsheet.FormatCellsCommand, { format: "baz" });

        c.exec();
        c.undo();

        equal(sheet.range("A1").format(), "mm-yy");
    });

    test("redo does not open popup window", function() {
        var command = formatCellsCommand();

        command.exec();

        command.set("format", "foo");

        command.apply();

        command.redo();

        equal($(".k-spreadsheet-window").length, 0);
    });

    var BorderChangeCommand = kendo.spreadsheet.BorderChangeCommand;

    module("SpreadSheet BorderChangeCommand", moduleOptions);

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

    test("borderLeft commands sets border only on the leftColumn", function() {
        var command = new BorderChangeCommand({ border: "leftBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B1:C2"));

        command.exec();
        equal(getBorders(sheet.range("B1")), "left");
        equal(getBorders(sheet.range("B2")), "left");
        equal(getBorders(sheet.range("C1")), "");
        equal(getBorders(sheet.range("C2")), "");
    });

    test("borderRight commands sets border only on the rightColumn", function() {
        var command = new BorderChangeCommand({ border: "rightBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "");
        equal(getBorders(sheet.range("B1")), "right");
        equal(getBorders(sheet.range("B2")), "right");
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

    test("borderBottom commands sets border only on the bottomRow", function() {
        var command = new BorderChangeCommand({ border: "bottomBorder", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("A1:B2"));

        command.exec();
        equal(getBorders(sheet.range("A1")), "");
        equal(getBorders(sheet.range("A2")), "bottom");
        equal(getBorders(sheet.range("B1")), "");
        equal(getBorders(sheet.range("B2")), "bottom");
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

    test("insideBorders commands sets borders inside the selection", function() {
        var command = new BorderChangeCommand({ border: "insideBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "right,bottom");
        equal(getBorders(sheet.range("B3")), "top,right");
        equal(getBorders(sheet.range("C2")), "left,bottom");
        equal(getBorders(sheet.range("C3")), "left,top");
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

    test("insideVerticalBorders commands sets bottomRight to each column of the selection except the last one", function() {
        var command = new BorderChangeCommand({ border: "insideVerticalBorders", style: { size: "1px", color: "#F00" } });
        command.range(sheet.range("B2:C3"));

        command.exec();
        equal(getBorders(sheet.range("B2")), "right");
        equal(getBorders(sheet.range("B3")), "right");
        equal(getBorders(sheet.range("C2")), "left");
        equal(getBorders(sheet.range("C3")), "left");
    });
})();
