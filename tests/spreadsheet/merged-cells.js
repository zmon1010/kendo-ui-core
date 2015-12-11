(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;
    var sheet;

    module("merged cells", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });


    function createPane(row, column, rowCount, columnCount) {
        return new Pane(sheet, sheet._grid.pane({ row: row, column: column, rowCount: rowCount, columnCount: columnCount }));
    }

    function rangeRef(topLeftRow, topLeftCol, bottomRightRow, bottomRightCol) {
        var ref = new RangeRef(
            new CellRef(topLeftRow, topLeftCol),
            new CellRef(bottomRightRow, bottomRightCol)
        );

        return ref;
    }

    function isMergedCell(element) {
        return element.attr.className.indexOf('k-spreadsheet-merged-cell') > -1
    }

    var DUMMY_VIEW = { ref: rangeRef(0, 0, 100, 100), top: 0, left: 0 };
    var DUMMY_RECT = { width: 1000, height: 1000, left: 0, top: 0, right: 1000, bottom: 1000 };

    test("pane renders merged cell", function() {
        var pane = createPane(0, 0);

        sheet.range(0, 0, 2, 3).merge().value("foo");

        pane._currentView = DUMMY_VIEW;
        pane._currentRect = DUMMY_RECT;
        var elements = pane.renderData().children;

        var mergedCell = elements.find(isMergedCell)

        // console.log(JSON.stringify(mergedCell))

        equal(mergedCell.attr.style.height, (2 * 10 - 1) + "px");
        equal(mergedCell.attr.style.width, (3 * 10 - 1) + "px");
        equal(mergedCell.children[0].children[0].nodeValue, "foo");
    });

    test("pane renders multiple merged cell", function() {
        var pane = createPane(0, 0);

        sheet.range(0, 0, 2, 2).merge();
        sheet.range(2, 2, 2, 2).merge();

        pane._currentView = DUMMY_VIEW;
        pane._currentRect = DUMMY_RECT;
        equal(pane.renderData().children.filter(isMergedCell).length, 2);
    });

    test("pane does not render merged cells which are invisible", function() {
        var pane = createPane(0, 0);

        sheet.range(0, 0, 2, 2).merge();

        pane._currentView = { ref: rangeRef(0, 3, 100, 100) , top: 0, left: 0 };
        pane._currentRect = DUMMY_RECT;

        var mergedCells = pane.renderData().children.filter(isMergedCell);

        equal(mergedCells.length, 0);
    });

    test("ranges that overlap bottom right are combined", function() {
        sheet.range("A1:B3").merge();
        sheet.range("B2:C4").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:C4");
    });

    test("ranges that overlap top left are combined", function() {
        sheet.range("B2:C4").merge();
        sheet.range("A1:B3").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:C4");
    });

    test("ranges that overlap top right are combined", function() {
        sheet.range("A4:C8").merge();
        sheet.range("C1:D4").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:D8");
    });

    test("ranges that overlap bottom left are combined", function() {
        sheet.range("C1:D4").merge();
        sheet.range("A4:C8").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:D8");
    });

    test("combining multiple overlapping ranges", function() {
        sheet.range("A1:B1").merge();
        sheet.range("D1:E1").merge();
        sheet.range("B1:D1").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:E1");
    });

    test("combining overlapping ranges leaves non overlapping ranges", function() {
        sheet.range("A1:B1").merge();
        sheet.range("E1:F1").merge();
        sheet.range("B1:D1").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 2);
        equal(merged[0].toString(), "E1:F1");
        equal(merged[1].toString(), "A1:D1");
    });

    test("merge unsets the value of all cells but the topleft", function() {
        sheet.range("A1:A1").value("foo");
        sheet.range("B1:B1").value("bar");
        sheet.range("A1:C1").merge();

        equal(sheet.range("B1:B1").value(), null);
        equal(sheet.range("B1:C1").value(), null);
        equal(sheet.range("A1:A1").value(), "foo");
        equal(sheet.range("A1:B1").value(), "foo");
    });

    test("merge uses the value of the top left cell during combination", function() {
        sheet.range("A1:B1").value("foo").merge();
        sheet.range("D1:E1").value("bar").merge();
        sheet.range("B1:D1").merge();

        equal(sheet.range("A1:E1").value(), "foo");
    });

    test("merge unsets the background of all cells but the topleft", function() {
        sheet.range("A1:A1").background("red");
        sheet.range("B1:B1").background("blue");
        sheet.range("A1:C1").merge();

        equal(sheet.range("B1:B1").background(), null);
        equal(sheet.range("B1:C1").background(), null);
        equal(sheet.range("A1:A1").background(), "red");
        equal(sheet.range("A1:B1").background(), "red");
    });

    test("merge uses the background of the top left cell during combination", function() {
        sheet.range("A1:B1").background("red").merge();
        sheet.range("D1:E1").background("blue").merge();
        sheet.range("B1:D1").merge();

        equal(sheet.range("A1:E1").background(), "red");
    });

    test("ranges with UnionRefs merge each ref", function() {
        sheet.range("A1:B1,A3:B3").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 2);
        equal(merged[0].toString(), "A1:B1");
        equal(merged[1].toString(), "A3:B3");
    });

    test("ranges with UnionRefs merge each ref", function() {
        sheet.range("A1").merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 0);
    });

    test("ranges with UnionRefs merge each ref", function() {
        var range = sheet.range("A1:B1,D1");
        range.merge();

        var merged = sheet._mergedCells;

        equal(merged.length, 1);
        equal(merged[0].toString(), "A1:B1");

        equal(range._ref.refs.length, 2);
        ok(range._ref.refs[0].toString(), "A1:B1");
        ok(range._ref.refs[1].toString(), "D1");
    });

    test("unmerge removes ref from mergedcells", function() {
        sheet.range("A1:B1").merge();
        sheet.range("A1:B1").unmerge();

        equal(sheet._mergedCells.length, 0);
    });

    test("unmerge removes all merged cells that intersect with the range", function() {
        sheet.range("A1:B1").merge();
        sheet.range("A2:B2").merge();
        sheet.range("A1:B2").unmerge();

        equal(sheet._mergedCells.length, 0);
    });

    test("unmerge sets the value of the topleft cell and resets the other", function() {
        sheet.range("A1:B1").value("foo").merge();
        sheet.range("A1:B1").unmerge();

        equal(sheet.range("A1:A1").value(), "foo");
        equal(sheet.range("B1:B1").value(), null);

    });

    test("union ref merge clears all ranges", function() {
        sheet.range("A1").value("foo1");
        sheet.range("A2").value("foo2");
        sheet.range("B1").value("bar1");
        sheet.range("B2").value("bar2");

        sheet.range("A1:A2,B1:B2").merge();

        equal(sheet.range("A2").value(), null);
        equal(sheet.range("B2").value(), null);

        equal(sheet.range("A1").value(), "foo1");
        equal(sheet.range("B1").value(), "bar1");
    });

    test("merging re-applies the selection", function() {
        equal(sheet.select().toString(), "A1:A1");
        sheet.range("A1:B3").merge();
        equal(sheet.select().toString(), "A1:B3");
    });
})();
