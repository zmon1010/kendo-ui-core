(function() {
    var sheet, navigator;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    function newSheet() {
       return new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns, defaults.rowHeight, defaults.columnWidth);
    }

    function selectionEqual(ref) {
        ref = kendo.spreadsheet.calc.parseReference(ref);
        var selection = sheet.select();
        ok(selection.eq(ref), "selection " + ref.print() + " expected, was " + selection.print());
    }

    function activeCellEqual(ref) {
        ref = kendo.spreadsheet.calc.parseReference(ref);
        var cell = sheet.activeCell();
        ok(cell.eq(ref), "active cell " + ref.print() + " expected, was " + cell.print());
    }

    module("entry navigation", {
        setup: function() {
            sheet = newSheet();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    test("secondary merged cells should be skipped", function() {
        sheet.range("B2:C3").merge();
        ok(!navigator.shouldSkip(1, 1)); // top left is ok
        ok(navigator.shouldSkip(1, 2)); // rest are not
        ok(navigator.shouldSkip(2, 1));
        ok(navigator.shouldSkip(2, 2));
    });

    function next(times) {
        times = times || 1;
        for (var i = 0; i < times; i++) {
            navigator.navigateInSelection("next");
        }
    }

    function previous(times) {
        times = times || 1;
        for (var i = 0; i < times; i++) {
            navigator.navigateInSelection("previous");
        }
    }

    module("next navigation", {
        setup: function() {
            sheet = newSheet();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    test("next moves over the entire sheet if selection is a single cell", function() {
        sheet.range("B2").select();
        next();
        activeCellEqual("C2");
        selectionEqual("C2");
    });

    test("next selects next cell in selection", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        next();
        activeCellEqual("C2");
    });

    test("next moves to the next row", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        next(2);
        activeCellEqual("B3");
    });

    test("next rewinds back to the first cell", function() {
        sheet.range("B2:C3").select();
        next(4);
        activeCellEqual("B2");
    });

    test("next skips merged cells", function() {
        sheet.range("B2:C3").merge();
        sheet.range("B2:D4").select();
        activeCellEqual("B2:C3");

        next();
        activeCellEqual("D2");
        next();
        activeCellEqual("D3");
        next();
        activeCellEqual("B4");
        next(3);
        activeCellEqual("B2:C3");
    });

    test("next moves to the next range", function() {
        sheet.range("B2:C3,D4:E5").select();
        next(4);
        activeCellEqual("D4");
    });

    test("next eventually comes back to the first range", function() {
        sheet.range("B2:C3,D4:E5").select();
        next(8);
        activeCellEqual("B2");
    });

    module("previous navigation", {
        setup: function() {
            sheet = newSheet();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    test("moves over the entire sheet if selection is a single cell", function() {
        sheet.range("B2").select();
        previous();
        activeCellEqual("A2");
        selectionEqual("A2");
    });

    test("previous selects previous cell in selection", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        previous();
        activeCellEqual("C3");
    });

    test("previous moves to the previous row", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        previous(2);
        activeCellEqual("B3");
    });

    test("previous rewinds back to the first cell", function() {
        sheet.range("B2:C3").select();
        previous(4);
        activeCellEqual("B2");
    });

    test("previous skips merged cells", function() {
        sheet.range("B2:C3").merge();
        sheet.range("B2:D4").select();
        activeCellEqual("B2:C3");

        previous(4);
        activeCellEqual("D3");
        previous();
        activeCellEqual("D2");
    });

    test("previous moves to the previous range", function() {
        sheet.range("B2:C3,D4:E5").select();
        previous(2);
        activeCellEqual("D5");
    });

    test("previous eventually comes back to the first range", function() {
        sheet.range("B2:C3,D4:E5").select();
        previous(8);
        activeCellEqual("B2");
    });

    module("Sheet Navigator edges", {
        setup: function() {
            sheet = newSheet();
            sheet.range('B2:C3').merge();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    test("prev left edge knows about merged cells", function() {
        navigator.colEdge.boundary(1, 2);
        equal(navigator.colEdge.prevLeft(10), 9);     // regular
        equal(navigator.colEdge.prevLeft(3), 1);      // over merged cell
        navigator.colEdge.boundary(3, 4);
        equal(navigator.colEdge.prevLeft(3), 2);      // under merged cell
    });

    test("next left edge knows about merged cells", function() {
        navigator.colEdge.boundary(1, 2);
        equal(navigator.colEdge.nextLeft(10), 11);    // regular
        equal(navigator.colEdge.nextLeft(1), 3);      // over merged cell
        navigator.colEdge.boundary(3, 4);
        equal(navigator.colEdge.nextLeft(0), 1);      // under merged cell
    });

    test("prev right edge knows about merged cells", function() {
        navigator.colEdge.boundary(1, 2);
        equal(navigator.colEdge.prevRight(10), 9);     // regular
        equal(navigator.colEdge.prevRight(2), 0);      // over merged cell
        navigator.colEdge.boundary(3, 4);
        equal(navigator.colEdge.prevRight(2, 3, 4), 1);      // under merged cell
    });

    test("next right edge knows about merged cells", function() {
        navigator.colEdge.boundary(1, 2);
        equal(navigator.colEdge.nextRight(10), 11);     // regular
        equal(navigator.colEdge.nextRight(0), 2);      // over merged cell
        navigator.colEdge.boundary(3, 4);
        equal(navigator.colEdge.nextRight(1), 2);      // under merged cell
    });

    test("prev left edge knows about merged cells", function() {
        navigator.rowEdge.boundary(1, 2);
        equal(navigator.rowEdge.prevLeft(10), 9);     // regular
        equal(navigator.rowEdge.prevLeft(3), 1);      // over merged cell
        navigator.rowEdge.boundary(3, 4);
        equal(navigator.rowEdge.prevLeft(3), 2);      // under merged cell
    });

    test("next left edge knows about merged cells", function() {
        navigator.rowEdge.boundary(1, 2);
        equal(navigator.rowEdge.nextLeft(10), 11);    // regular
        equal(navigator.rowEdge.nextLeft(1), 3);      // over merged cell
        navigator.rowEdge.boundary(3, 4);
        equal(navigator.rowEdge.nextLeft(0), 1);      // under merged cell
    });

    test("prev right edge knows about merged cells", function() {
        navigator.rowEdge.boundary(1, 2);
        equal(navigator.rowEdge.prevRight(10), 9);     // regular
        equal(navigator.rowEdge.prevRight(2), 0);      // over merged cell
        navigator.rowEdge.boundary(3, 4);
        equal(navigator.rowEdge.prevRight(2), 1);      // under merged cell
    });

    test("next right edge knows about merged cells", function() {
        navigator.rowEdge.boundary(1, 2);
        equal(navigator.rowEdge.nextRight(10), 11);     // regular
        equal(navigator.rowEdge.nextRight(0), 2);      // over merged cell
        navigator.rowEdge.boundary(3, 4);
        equal(navigator.rowEdge.nextRight(1), 2);      // under merged cell
    });

    module("Sheet Navigator selection", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    test("expands selection to the left", function() {
        sheet.range('C3').select();
        navigator.modifySelection('expand-left');
        selectionEqual('B3:C3');
    });

    test("expands and beyond merged cells", function() {
        sheet.range('B2:C3').merge();
        sheet.range('D3').select();
        navigator.modifySelection('expand-left');
        selectionEqual('B2:D3');
        navigator.modifySelection('expand-left');
        selectionEqual('A2:D3');
    });

    test("expands and beyond merged cells (right)", function() {
        sheet.range('B2:C3').merge();
        sheet.range('A3').select();
        navigator.modifySelection('expand-right');
        selectionEqual('A2:C3');
        navigator.modifySelection('expand-right');
        selectionEqual('A2:D3');
    });

    test("expands and shrinks over merged cells", function() {
        sheet.range('B2:C3').merge();
        sheet.range('D3').select();
        navigator.modifySelection('expand-left');
        selectionEqual('B2:D3');
        navigator.modifySelection('shrink-right');
        selectionEqual('D3:D3');
    });

    test("expands after merged cell maintains the original row", function() {
        sheet.range('B2:C3').merge();
        sheet.range('D3').select();
        navigator.modifySelection('expand-left');
        navigator.modifySelection('expand-left');
        navigator.modifySelection('shrink-right');
        navigator.modifySelection('shrink-right');
        selectionEqual('D3:D3');
    });

    test("shrinks correctly if merged cell is blocking the action", function() {
        sheet.range('B2:C3').merge();
        sheet.range('D1:D3').select();
        navigator.modifySelection('expand-left');
        navigator.modifySelection('expand-left');
        navigator.modifySelection('shrink-right');
        navigator.modifySelection('shrink-right');
        selectionEqual('D1:D3');
    });

    test("expands after merged cell maintains the original row", function() {
        sheet.range('B2:C3').merge();
        sheet.range('A3').select();
        navigator.modifySelection('expand-right');
        navigator.modifySelection('expand-right');
        navigator.modifySelection('shrink-left');
        navigator.modifySelection('shrink-left');
        selectionEqual('A3:A3');
    });

    test("falls back to the other direction if merged cell keeps it expanded", function() {
        sheet.range('B3:D3').merge();
        sheet.range('C4').select();
        navigator.modifySelection('expand-up');
        selectionEqual('B3:D4');
        navigator.modifySelection('shrink-right');
        navigator.modifySelection('shrink-right');
        selectionEqual('B3:F4');
    });
})();
