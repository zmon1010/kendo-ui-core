(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var range;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
            range = sheet.range(0, 0);
        },
        teardown: function() {
            sheet.unbind();
        }
    });

    test("value sets the value of the range", function() {
        range.value("foo");

        equal(sheet._properties.get("value", 0), "foo");
    });

    test("merge triggers the change event of the sheet", 1, function() {
       sheet.bind("change", function() {
           ok(true);
       });

       sheet.range("A1:A2").merge();
    });

    test("unmerge triggers the change event of the sheet", 1, function() {
       sheet.bind("change", function() {
           ok(true);
       });

       sheet.range("A1:A2").unmerge();
    });

    test("setting range property triggers the change event of the sheet", 2, function() {
       sheet.bind("change", function() {
           ok(true);
       });

       sheet.range("A1").background("red");
       sheet.range("A1").value("A1");
    });

    test("removing the last style value sets the style to null", function() {
       equal(sheet.range("A1").background("red").background(null).background(), null);
    });

    test("setting values triggers the change event of the sheet", 1, function() {
       sheet.bind("change", function() {
           ok(true);
       });

       sheet.range("A1").values([["red"]]);
    });

    test("value sets the value of a multiple row range", function() {
        range = sheet.range(0, 0, 2);

        range.value("foo");

        equal(sheet._properties.iterator("value", 0, 3).at(1), "foo");
        equal(sheet._properties.iterator("value", 0, 3).at(2), null);
    });

    test("value sets the value of a multiple row and column range", function() {
        range = sheet.range(0, 0, 2, 2);

        range.value("foo");

        equal(sheet._properties.iterator("value", 0, 3).at(3), "foo");
        equal(sheet._properties.iterator("value", 0, 3).at(2), null);
    });

    test("value returns the value of the range", function() {
        range.value("foo");

        equal(range.value(), "foo");
    });

    test("background returns the background of a range", function() {
        range.background("foo");

        equal(range.background(), "foo");
    });

    test("color returns the color of a range", function() {
        range.color("foo");

        equal(range.color(), "foo");
    });

    test("fontFamily returns the fontFamily of a range", function() {
        range.fontFamily("foo");

        equal(range.fontFamily(), "foo");
    });

    test("textDecoration returns the textDecorationfontLine of a range", function() {
        range.textDecoration("foo");

        equal(range.textDecoration(), "foo");
    });

    test("fontLine returns the fontLine of a range", function() {
        range.fontSize("12px");

        equal(range.fontSize(), "12px");
    });

    test("fontStyle returns the fontStyle of a range", function() {
        range.fontSize("italic");

        equal(range.fontSize(), "italic");
    });

    test("fontWeight returns the fontWeight of a range", function() {
        range.fontWeight("bold");

        equal(range.fontWeight(), "bold");
    });

    test("textAlign returns the textAlign of a range", function() {
        range.textAlign("foo");

        equal(range.textAlign(), "foo");
    });

    test("verticalAlignment returns the horizontalAlignment of a range", function() {
        range.verticalAlignment("foo");

        equal(range.verticalAlignment(), "foo");
    });

    test("borderLeft symmetry", function() {
        range.borderLeft({ color: "#f00" });

        equal(range.borderLeft().color, "#f00");
    });

    test("borderRight symmetry", function() {
        range.borderRight({ color: "#f00" });

        equal(range.borderRight().color, "#f00");
    });

    test("borderTop symmetry", function() {
        range.borderTop({ color: "#f00" });

        equal(range.borderTop().color, "#f00");
    });

    test("borderBottom symmetry", function() {
        range.borderBottom({ color: "#f00" });

        equal(range.borderBottom().color, "#f00");
    });

    test("borderTop triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true));

        sheet.range(2, 2).borderTop({ color: "#f00" });
    });

    test("borderLeft triggers one change", 1, function() {
        sheet.bind("change", ok.bind(this, true));

        sheet.range(2, 2).borderLeft({ color: "#f00" });
    });

    test("borderLeft returns correct range", function() {
        var range = sheet.range(2, 2);

        equal(range.borderLeft({ color: "#f00" }), range);
    });

    test("borderTop returns correct range", function() {
        var range = sheet.range(2, 2);

        equal(range.borderTop({ color: "#f00" }), range);
    });

    test("borderBottom gets borderTop of cell below", function() {
        sheet.range(1, 0).borderTop({ color: "#f00" });

        equal(sheet.range(0, 0).borderBottom().color, "#f00");
    });

    test("borderTop gets borderBottom of cell above", function() {
        sheet.range(0, 0).borderBottom({ color: "#f00" });

        equal(sheet.range(1, 0).borderTop().color, "#f00");
    });

    test("borderRight gets borderLeft of cell on the right", function() {
        sheet.range(0, 1).borderLeft({ color: "#f00" });

        equal(sheet.range(0, 0).borderRight().color, "#f00");
    });

    test("borderLeft gets borderRight of cell on the left", function() {
        sheet.range(0, 0).borderRight({ color: "#f00" });

        equal(sheet.range(0, 1).borderLeft().color, "#f00");
    });

    test("borderTop persists background style", function() {
        var range = sheet.range("A2:A3").background("#afa").borderTop({ color: "#f00" });

        equal(sheet.range("A2").background(), "#afa");
    });

    test("wrap returns the wrap of a range", function() {
        range.wrap(true);

        equal(range.wrap(), true);
    });

    test("setting style property to null removes it from the style object", function() {
        range.background("red");
        range.color("red");
        range.background(null);

        equal(range.background(), null);
        equal(range.color(), "red");
    });

    test("values returns two dimensional array containing cell values", function() {
        sheet.range("A1").value("A1");
        sheet.range("B1").value("B1");
        sheet.range("A2").value("A2");
        sheet.range("B2").value("B2");
        sheet.range("A3").value("A3");
        sheet.range("B3").value("B3");

        var values = sheet.range("A1:B3").values();

        equal(values.length, 3);
        equal(values[0].length, 2);
        equal(values[0][0], "A1");
        equal(values[0][1], "B1");
        equal(values[1][0], "A2");
        equal(values[1][1], "B2");
        equal(values[2][0], "A3");
        equal(values[2][1], "B3");
    });

    test("values with cell range", function() {
        sheet.range("A1").value("A1");

        var values = sheet.range("A1").values();

        equal(values.length, 1);
        equal(values[0].length, 1);
        equal(values[0][0], "A1");
    });

    test("values throws error with union range", 1, function() {
        try {
            sheet.range("A1,A5").values();
        } catch(e) {
            ok(true);
        }
    });

    test("set less values than range size", function() {
        sheet.range("A1:C3").values([
            ["A1", "B1"],
            ["A2", "B2"]
        ]);

        equal(sheet.range("A1").value(), "A1");
        equal(sheet.range("B1").value(), "B1");
        equal(sheet.range("A2").value(), "A2");
        equal(sheet.range("B2").value(), "B2");
    });

    test("values sets the values of the cells in the range", function() {
        sheet.range("A1:C3").values([
            ["A1", "B1", "C1"],
            ["A2", "B2", "C2"],
            ["A3", "B3", "C3"]
        ]);

        equal(sheet.range("A1").value(), "A1");
        equal(sheet.range("B1").value(), "B1");
        equal(sheet.range("C1").value(), "C1");
        equal(sheet.range("A2").value(), "A2");
        equal(sheet.range("B2").value(), "B2");
        equal(sheet.range("C2").value(), "C2");
        equal(sheet.range("A3").value(), "A3");
        equal(sheet.range("B3").value(), "B3");
        equal(sheet.range("C3").value(), "C3");
    });

    test("clear set the range content and style to default", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clear();

        equal(sheet.range("A1").background(), null);
        equal(sheet.range("A2").background(), null);
        equal(sheet.range("A3").background(), null);

        equal(sheet.range("A1").value(), null);
        equal(sheet.range("A2").value(), null);
        equal(sheet.range("A3").value(), null);
    });

    test("clear clears the range content and style when options is empty object", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clear({});

        equal(sheet.range("A1").background(), null);
        equal(sheet.range("A2").background(), null);
        equal(sheet.range("A3").background(), null);

        equal(sheet.range("A1").value(), null);
        equal(sheet.range("A2").value(), null);
        equal(sheet.range("A3").value(), null);
    });

    test("clear clears only the range content when called with contentsOnly option", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clear({ contentsOnly: true });

        equal(sheet.range("A1").background(), "red");
        equal(sheet.range("A2").background(), "red");
        equal(sheet.range("A3").background(), "red");

        equal(sheet.range("A1").value(), null);
        equal(sheet.range("A2").value(), null);
        equal(sheet.range("A3").value(), null);
    });

    test("clear clears only the range style when called with formatOnly option", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clear({ formatOnly: true });

        equal(sheet.range("A1").background(), null);
        equal(sheet.range("A2").background(), null);
        equal(sheet.range("A3").background(), null);

        equal(sheet.range("A1").value(), "foo");
        equal(sheet.range("A2").value(), "foo");
        equal(sheet.range("A3").value(), "foo");
    });

    test("clear clears only the range content when called with contentsOnly=true formatOnly=false option", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clear({ contentsOnly: true, formatOnly: false });

        equal(sheet.range("A1").background(), "red");
        equal(sheet.range("A2").background(), "red");
        equal(sheet.range("A3").background(), "red");

        equal(sheet.range("A1").value(), null);
        equal(sheet.range("A2").value(), null);
        equal(sheet.range("A3").value(), null);
    });

    test("clearContent clears only the range content", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clearContent();

        equal(sheet.range("A1").background(), "red");
        equal(sheet.range("A2").background(), "red");
        equal(sheet.range("A3").background(), "red");

        equal(sheet.range("A1").value(), null);
        equal(sheet.range("A2").value(), null);
        equal(sheet.range("A3").value(), null);
    });

    test("clearContent clears the formula", function() {
        sheet.range("A1").value(1);

        sheet.range("A2")
            .formula("=SUM(A1:A1)")
            .clearContent();

        equal(sheet.range("A2").formula(), null);
        equal(sheet.range("A2").value(), null);
    });

    test("clearFormat clears only the range style", function() {
        sheet.range("A1:A3")
            .value("foo")
            .background("red")
            .clearFormat();

        equal(sheet.range("A1").background(), null);
        equal(sheet.range("A2").background(), null);
        equal(sheet.range("A3").background(), null);

        equal(sheet.range("A1").value(), "foo");
        equal(sheet.range("A2").value(), "foo");
        equal(sheet.range("A3").value(), "foo");
    });

    test("clearFormat unmerge cells", function() {
        sheet.range("A1:A3")
            .merge()
            .clearFormat();

        equal(sheet._mergedCells.length, 0);
    });

    test("clearFormat clears format", function() {
        sheet.range("A1:A3")
            .format("foo")
            .clearFormat();

        equal(sheet.range("A1:A3").format(), null);
    });

    test("clearFormat triggers only one change", 1, function() {
        sheet.bind("change", function() {
            ok(true);
        });

        sheet.range("A1:A3")
            .clearFormat();
    });

    test("setting formula to null triggers change", 2, function() {
        sheet.bind("change", function() {
            ok(true);
        });

        sheet.range("A2")
            .formula(null);

        equal(sheet.range("A2").formula(), null);
    });

    test("background set background to entire row", function() {
        sheet.range("1:1")
            .background("red");

        equal(sheet.range("1:1").background(), "red");
    });

    test("editableValue returns numeric value", function() {
        sheet.range("A1").value(123);

        equal(sheet.range("A1")._editableValue(), "123");
    });

    test("editableValue returns numeric string value", function() {
        sheet.range("A1").value("foo");

        equal(sheet.range("A1")._editableValue(), "foo");
    });

    test("editableValue returns numeric string value", function() {
        sheet.range("A1").value("'123");

        equal(sheet.range("A1")._editableValue(), "'123");
    });

    test("editableValue returns formatted date", function() {
        sheet.range("A1").value(new Date(2015, 0, 1));

        equal(sheet.range("A1")._editableValue(), "1/1/2015");
    });

    test("editableValue returns formula", function() {
        var formula = "=SUM(A1:A1)";
        sheet.range("A1").formula(formula);

        equal(sheet.range("A1")._editableValue(), formula);
    });

    test("editableValue sets formula", function() {
        var formula = "=SUM(A1:A1)";
        sheet.range("A1")._editableValue(formula);

        equal(sheet.range("A1").formula(), formula);
    });

    test("editableValue sets value", function() {
        sheet.range("A1")._editableValue("foo");

        equal(sheet.range("A1").value(), "foo");
    });

    test("editableValue removes formula when value is set", function() {
        sheet.range("A1").formula("=SUM(A1:A1)")._editableValue("foo");

        equal(sheet.range("A1").formula(), null);
    });

    test("editableValue triggers one change event", function() {
        var handler = spy();

        sheet.bind("change", handler);

        sheet.range("A1")._editableValue("bar");

        equal(handler.calls, 1);
    });

})();
