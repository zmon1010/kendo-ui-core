(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var range;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
            range = sheet.range(0, 0);
        }
    });

    test("value sets the value of the range", function() {
        range.value("foo");

        equal(sheet._values.iterator(0,0).at(0), "foo");
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

    test("value sets the value of a multiple row range", function() {
        range = sheet.range(0, 0, 2);

        range.value("foo");

        equal(sheet._values.iterator(0, 3).at(1), "foo");
        equal(sheet._values.iterator(0, 3).at(2), null);
    });

    test("value sets the value of a multiple row and column range", function() {
        range = sheet.range(0, 0, 2, 2);

        range.value("foo");

        equal(sheet._values.iterator(0, 3).at(3), "foo");
        equal(sheet._values.iterator(0, 3).at(2), null);
    });

    test("value returns the value of the range", function() {
        range.value("foo");

        equal(range.value(), "foo");
    });

    test("background returns the background of a range", function() {
        range.background("foo");

        equal(range.background(), "foo");
    });

    test("fontColor returns the fontColor of a range", function() {
        range.fontColor("foo");

        equal(range.fontColor(), "foo");
    });

    test("fontFamily returns the fontFamily of a range", function() {
        range.fontFamily("foo");

        equal(range.fontFamily(), "foo");
    });

    test("fontLine returns the fontLine of a range", function() {
        range.fontLine("foo");

        equal(range.fontLine(), "foo");
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

    test("horizontalAlignment returns the horizontalAlignment of a range", function() {
        range.horizontalAlignment("foo");

        equal(range.horizontalAlignment(), "foo");
    });

    test("verticalAlignment returns the horizontalAlignment of a range", function() {
        range.verticalAlignment("foo");

        equal(range.verticalAlignment(), "foo");
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
})();
