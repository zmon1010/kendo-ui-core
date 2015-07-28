(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    module("pane", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    function createPane(row, column, rowCount, columnCount) {
        return new Pane(sheet, sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
    }

    test("doesn't render hidden columns", function() {
        sheet.range("C1:C1").value("foo");
        sheet.hideColumn(1);

        var pane = createPane(0, 0, 3, 3);
        pane.refresh()

        var table = pane.render(0, 0).children[0];

        equal(table.children[0].children.length, 2);

        var tr = table.children[1].children[0];

        equal(tr.children.length, 2);
        equal(tr.children[1].children[0].nodeValue, "foo");
    });

    test("doesn't render hidden rows", function() {
        sheet.hideRow(1);

        var pane = createPane(0, 0, 3, 3);
        pane.refresh()

        var table = pane.render(0, 0).children[0];

        equal(table.children[1].children.length, 2);
    });

    test("adds background color style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { background: "red" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].backgroundColor, "red");
    });

    test("adds fontColor style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { color: "red" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].color, "red");
    });

    test("adds font-family style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { fontFamily: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontFamily, "foo");
    });

    test("adds text-decoration style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { fontLine: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].textDecoration, "foo");
    });

    test("adds font-size style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { fontSize: 12 });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontSize, 12);
    });

    test("adds font-style style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { fontStyle: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontStyle, "foo");
    });

    test("adds font-weight style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { fontWeight: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontWeight, "foo");
    });

    test("adds text-align  style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { horizontalAlignment: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].textAlign, "foo");
    });

    test("adds vertical-align  style to the cell", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { verticalAlignment: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].verticalAlign, "foo");
    });

    test("adds white-space nowrap style to the cell if wrap is false", function() {
        var pane = createPane(0, 0, 3, 3);

        var table = stub({}, "addCell");

        pane.addCell(table, {}, { wrap: false });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].whiteSpace, "nowrap");
    });

})();
