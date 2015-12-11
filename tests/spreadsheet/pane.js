(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var drawCell = kendo.spreadsheet.drawCell;
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

        var div = $("<div>");
        pane.render(0, 0).render(div[0], div);
        var columnHeaders = div.find(".k-spreadsheet-column-header div div");

        equal(columnHeaders.length, 2);
        equal(columnHeaders.eq(0).text(), "A");
        equal(columnHeaders.eq(1).text(), "D");
    });

    test("doesn't render hidden columns", function() {
        sheet.range("C1:C1").value("foo");
        sheet.range("B1:B1").value("bar");
        sheet.hideColumn(1);

        var pane = createPane(0, 0, 3, 3);
        pane.refresh();

        var data = pane.render(0, 0).children[0];

        var cells = data.children.filter(function(element) { return element.attr.className.indexOf('k-spreadsheet-cell') > - 1 });

        equal(cells.length, 1);
        equal(text(cells[0]), "foo");
    });

    test("doesn't render hidden rows", function() {
        sheet.hideRow(1);
        sheet.range("A1:A3").value("bar");

        var pane = createPane(0, 0, 3, 3);
        pane.refresh();

        var data = pane.render(0, 0).children[0];
        var cells = data.children.filter(function(element) { return element.attr.className.indexOf('k-spreadsheet-cell') > - 1 });

        equal(cells.length, 2);
    });

    function testCellAttributes(options, attr, value) {
        test("passing " + JSON.stringify(options) + " sets " + attr + " to " + value, function() {
            var cell = drawCell([], options, "dummy");
            equal(cell.attr.style[attr], value);
        });
    }

    testCellAttributes({ background: "red" }, "backgroundColor", "red");
    testCellAttributes({ color: "red" }, "color", "red");
    testCellAttributes({ fontFamily: "foo" }, "fontFamily", "foo");
    testCellAttributes({ fontFamily: "foo" }, "fontFamily", "foo");
    testCellAttributes({ underline: true}, "textDecoration", "underline");
    testCellAttributes({ fontSize: 12}, "fontSize", "12px");
    testCellAttributes({ italic: true}, "fontStyle", "italic");
    testCellAttributes({ bold: true}, "fontWeight", "bold");
    testCellAttributes({ wrap: true}, "whiteSpace", "pre-wrap");

    test("verticalAlign applies class to a child element", function() {
            var cell = drawCell([], { value: "foo", verticalAlign: "bottom" }, "dummy");
            equal(cell.children[0].attr.className, "k-vertical-align-bottom");
    })

    test("adds 'k-state-disabled' classname to the cell", function() {
        var cell = drawCell([], { value: "foo", verticalAlign: "bottom" }, "k-state-disabled");
        ok(cell.attr.className.indexOf("k-state-disabled") > -1);
    })
})();
