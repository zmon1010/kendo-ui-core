(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var addCell = kendo.spreadsheet.addCell;
    var sheet;

    module("pane", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    function createPane(row, column, rowCount, columnCount) {
        return new Pane(sheet, sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
    }

    function text(node) {
        var children = node.children || [];
        return node.nodeValue || children.map(text).join(" ");
    }

    test("correct columns are rendered when multiple subsequent columns are hidden", function() {
        sheet.hideColumn(1);
        sheet.hideColumn(2);

        var pane = createPane(0, 0, 4, 4);
        pane.refresh();

        var header = pane.render(0, 0).children[7];

        equal(header.children[1].children.length, 1);

        var tds = header.children[1].children[0].children;

        equal(tds.length, 2);
        equal(text(tds[0]), "A");
        equal(text(tds[1]), "D");
    });

    test("doesn't render hidden columns", function() {
        sheet.range("C1:C1").value("foo");
        sheet.hideColumn(1);

        var pane = createPane(0, 0, 3, 3);
        pane.refresh();

        var table = pane.render(0, 0).children[0];

        equal(table.children[0].children.length, 2);

        var tds = table.children[1].children[0].children;

        equal(tds.length, 2);
        equal(text(tds[1]), "foo");
    });

    test("doesn't render hidden rows", function() {
        sheet.hideRow(1);

        var pane = createPane(0, 0, 3, 3);
        pane.refresh();

        var table = pane.render(0, 0).children[0];

        equal(table.children[1].children.length, 2);
    });

    test("adds background color style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { background: "red" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].backgroundColor, "red");
    });

    test("adds fontColor style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { color: "red" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].color, "red");
    });

    test("adds font-family style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { fontFamily: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontFamily, "foo");
    });

    test("adds text-decoration style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { underline: true });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].textDecoration, "underline");
    });

    test("adds font-size style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { fontSize: 12 });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontSize, "12px");
    });

    test("adds font-style style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { italic: true });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontStyle, "italic");
    });

    test("adds font-weight style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { bold: true });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].fontWeight, "bold");
    });

    test("adds text-align  style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { textAlign: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].textAlign, "foo");
    });

    test("adds vertical-align  style to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { verticalAlign: "foo" });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].verticalAlign, "foo");
    });

    test("adds white-space nowrap style to the cell if wrap is false", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { wrap: true });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[2].whiteSpace, "pre-wrap");
    });

    test("adds 'k-state-disabled' classname to the cell", function() {
        var table = stub({}, "addCell");

        addCell(table, {}, { enable: false });

        equal(table.calls("addCell"), 1);
        equal(table.args("addCell", 0)[3], "k-state-disabled");
    });

})();
