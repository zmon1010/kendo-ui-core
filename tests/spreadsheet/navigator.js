(function() {
    var sheet, navigator;
    var defaults = kendo.ui.Spreadsheet.prototype.options;
    var success = $.proxy(ok, null, true);
    var failure = $.proxy(ok, null, false);

    function selectionEqual(ref) {
        ref = kendo.spreadsheet.calc.parseReference(ref);
        selection = sheet.select();
        ok(selection.eq(ref), ref.print() + " expected, was " + selection.print());
    }

    module("Sheet Navigator edges", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(defaults.rows, defaults.columns,
            defaults.rowHeight, defaults.columnWidth);
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
