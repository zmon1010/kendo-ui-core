(function() {
    var sheet, navigator;
    var CellRef = kendo.spreadsheet.CellRef;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    function newSheet() {
       return new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns, defaults.rowHeight, defaults.columnWidth);
    }

    function selectionEqual(ref) {
        ref = kendo.spreadsheet.calc.parseReference(ref);
        var selection = sheet.select();
        ok(selection.eq(ref), "selection " + ref.toString() + " expected, was " + selection.toString());
    }

    function activeCellEqual(ref) {
        ref = kendo.spreadsheet.calc.parseReference(ref);
        var cell = sheet.activeCell();
        ok(cell.eq(ref), "active cell " + ref.toString() + " expected, was " + cell.toString());
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

    test("next skips merged cells (end)", function() {
        sheet.range("B2:C3").merge();
        sheet.range("A2:C3").select();
        activeCellEqual("A2");

        next();
        activeCellEqual("B2:C3");
        next();
        activeCellEqual("A3");
        next();
        activeCellEqual("A2");
    });

    test("next moves to the next range", function() {
        sheet.range("B2:C3,D4:E5").select();
        activeCellEqual("D4");
        next(4);
        activeCellEqual("B2");
    });

    test("next eventually comes back to the first range", function() {
        sheet.range("B2:C3,D4:E5").select();
        next(8);
        activeCellEqual("D4");
    });

    module("previous navigation", {
        setup: function() {
            sheet = newSheet();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    function previous(times) {
        times = times || 1;
        for (var i = 0; i < times; i++) {
            navigator.navigateInSelection("previous");
        }
    }

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

    test("previous skips merged cells (end)", function() {
        sheet.range("B2:C3").merge();
        sheet.range("A2:C3").select();
        activeCellEqual("A2");

        previous();
        activeCellEqual("A3");
        previous();
        activeCellEqual("B2:C3");
        previous();
        activeCellEqual("A2");
    });

    test("previous moves to the previous range", function() {
        sheet.range("B2:C3,D4:E5").select();
        activeCellEqual("D4");
        previous(2);
        activeCellEqual("B3");
    });

    test("previous eventually comes back to the first range", function() {
        sheet.range("B2:C3,D4:E5").select();
        previous(8);
        activeCellEqual("D4");
    });

    module("lower navigation", {
        setup: function() {
            sheet = newSheet();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    function lower(times) {
        times = times || 1;
        for (var i = 0; i < times; i++) {
            navigator.navigateInSelection("lower");
        }
    }

    test("moves over the entire sheet if selection is a single cell", function() {
        sheet.range("B2").select();
        lower();
        activeCellEqual("B3");
        selectionEqual("B3");
    });

    test("selects lower cell in selection", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        lower();
        activeCellEqual("B3");
    });

    test("moves to the next col", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        lower(2);
        activeCellEqual("C2");
    });

    test("rewinds back to the first cell", function() {
        sheet.range("B2:C3").select();
        lower(4);
        activeCellEqual("B2");
    });

    test("skips merged cells", function() {
        sheet.range("B2:C3").merge();
        sheet.range("B2:D4").select();
        activeCellEqual("B2:C3");
        lower();
        activeCellEqual("B4");
        lower();
        activeCellEqual("C4");
        lower();
        activeCellEqual("D2");
    });

    test("skips merged cells (end)", function() {
        sheet.range("B2:C3").merge();
        sheet.range("B1:C3").select();
        activeCellEqual("B1");
        lower();
        activeCellEqual("B2:C3");
        lower();
        activeCellEqual("C1");
        lower();
        activeCellEqual("B1");
    });

    test("moves to the lower range", function() {
        sheet.range("B2:C3,D4:E5").select();
        activeCellEqual("D4");
        lower(4);
        activeCellEqual("B2");
    });

    test("eventually comes back to the first range", function() {
        sheet.range("B2:C3,D4:E5").select();
        lower(8);
        activeCellEqual("D4");
    });

    module("upper navigation", {
        setup: function() {
            sheet = newSheet();
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    function upper(times) {
        times = times || 1;
        for (var i = 0; i < times; i++) {
            navigator.navigateInSelection("upper");
        }
    }

    test("moves over the entire sheet if selection is a single cell", function() {
        sheet.range("B2").select();
        upper();
        activeCellEqual("B1");
        selectionEqual("B1");
    });

    test("selects upper cell in selection", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        upper();
        activeCellEqual("C3");
    });

    test("moves to the next col", function() {
        sheet.range("B2:C3").select();
        activeCellEqual("B2");
        upper(2);
        activeCellEqual("C2");
    });

    test("rewinds back to the first cell", function() {
        sheet.range("B2:C3").select();
        upper(4);
        activeCellEqual("B2");
    });

    test("skips merged cells (end)", function() {
        sheet.range("B2:C3").merge();
        sheet.range("B2:C4").select();
        activeCellEqual("B2:C3");
        upper();
        activeCellEqual("C4");
        upper();
        activeCellEqual("B4");
        upper();
        activeCellEqual("B2:C3");
    });

    test("moves to the upper range", function() {
        sheet.range("B2:C3,D4:E5").select();
        activeCellEqual("D4");
        upper(4);
        activeCellEqual("B2");
    });

    test("eventually comes back to the first range", function() {
        sheet.range("B2:C3,D4:E5").select();
        upper(8);
        activeCellEqual("D4");
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

    test("expands and beyond merged cells (right)", function() {
        sheet.range('B2:C2').merge();
        sheet.range('A3').select();
        navigator.modifySelection('expand-right');
        selectionEqual('A3:B3');
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

    module('composite navigation', {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
            navigator = new kendo.spreadsheet.SheetNavigator(sheet, 1000);
        }
    });

    test("navigator selection adds up stuff", function() {
        navigator.select(new CellRef(1, 1), 'cell');
        navigator.select(new CellRef(2, 2), 'cell', true);
        navigator.select(new CellRef(3, 3), 'cell', true);
        selectionEqual('B2:B2,C3:C3,D4:D4');
    });

    test("navigator modifies selection from the active cell sub range (mouse)", function() {
        navigator.select(new CellRef(1, 1), 'cell');
        navigator.select(new CellRef(2, 2), 'cell', true);
        navigator.select(new CellRef(3, 3), 'cell', true);
        selectionEqual('B2:B2,C3:C3,D4:D4');
        navigator.extendSelection(new CellRef(4,4), 'range');
        selectionEqual('B2:B2,C3:C3,D4:E5');
    });

    test("navigator modifies selection from the active cell sub range (keyboard)", function() {
        navigator.select(new CellRef(1, 1), 'cell');
        navigator.select(new CellRef(2, 2), 'cell', true);
        navigator.select(new CellRef(3, 3), 'cell', true);
        selectionEqual('B2:B2,C3:C3,D4:D4');
        activeCellEqual("D4");
        navigator.navigateInSelection("previous");
        activeCellEqual("C3");
        navigator.modifySelection("expand-right", true);
        selectionEqual('B2:B2,C3:D3,D4:D4');
    });
})();
