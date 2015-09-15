
(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var PARTIAL = "k-selection-partial";
    var FULL = "k-selection-full";

    module("editor selection", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    var DUMMY_VIEW = { ref: rangeRef(0,0, 100, 100), top: 0, left: 0 };

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

    test("selects the range", function() {
        var pane = createPane(0, 0);
        var ref = kendo.spreadsheet.calc.parseReference("A1:C2");

        pane._currentView = DUMMY_VIEW;

        sheet._editorSelection = [{
            ref: ref,
            series: 0
        }];

        var selections = pane.renderEditorSelection().children;
        var div = selections[0];

        equal(selections.length, 1);
        equal(div.attr.style.height, 1 + 2 * 10 + "px");
        equal(div.attr.style.width, 1 + 3 * 10 + "px");
        equal(div.attr.className, "k-spreadsheet-selection-dashed k-series-a");
    });

    test("selects a list of ranges", function() {
        var pane = createPane(0, 0);
        var ref1 = kendo.spreadsheet.calc.parseReference("A1:C2");
        var ref2 = kendo.spreadsheet.calc.parseReference("C2:D3");

        pane._currentView = DUMMY_VIEW;

        sheet._editorSelection = [
            { ref: ref1, series: 0 },
            { ref: ref2, series: 1 }
        ];

        var selections = pane.renderEditorSelection().children;
        var divA1C2 = selections[0];
        var divC2D3 = selections[1];

        equal(selections.length, 2);

        equal(divA1C2.attr.style.height, 1 + 2 * 10 + "px");
        equal(divA1C2.attr.style.width, 1 + 3 * 10 + "px");
        equal(divA1C2.attr.className, "k-spreadsheet-selection-dashed k-series-a");

        equal(divC2D3.attr.style.height, 1 + 2 * 10 + "px");
        equal(divC2D3.attr.style.width, 1 + 2 * 10 + "px");
        equal(divC2D3.attr.className, "k-spreadsheet-selection-dashed k-series-b");
    });

    test("selection uses first color if series is not valid", function() {
        var pane = createPane(0, 0);
        var ref = kendo.spreadsheet.calc.parseReference("A1:C2");

        pane._currentView = DUMMY_VIEW;

        sheet._editorSelection = [{
            ref: ref,
            series: 10
        }];

        var selections = pane.renderEditorSelection().children;
        var div = selections[0];

        equal(selections.length, 1);
        equal(div.attr.style.height, 1 + 2 * 10 + "px");
        equal(div.attr.style.width, 1 + 3 * 10 + "px");
        equal(div.attr.className, "k-spreadsheet-selection-dashed k-series-a");
    });

    test("selection skips NULLREF", function() {
        var pane = createPane(0, 0);
        var ref = kendo.spreadsheet.calc.parseReference("C2:D3");

        pane._currentView = DUMMY_VIEW;

        sheet._editorSelection = [
            { ref: kendo.spreadsheet.NULLREF, series: 0 },
            { ref: ref, series: 1 }
        ];

        var selections = pane.renderEditorSelection().children;
        var divC2D3 = selections[0];

        equal(selections.length, 1);

        equal(divC2D3.attr.style.height, 1 + 2 * 10 + "px");
        equal(divC2D3.attr.style.width, 1 + 2 * 10 + "px");
        equal(divC2D3.attr.className, "k-spreadsheet-selection-dashed k-series-b");
    });

    test("selection returns empty wrapper if no editor selection", function() {
        var pane = createPane(0, 0);
        var ref = kendo.spreadsheet.calc.parseReference("C2:D3");

        pane._currentView = DUMMY_VIEW;

        sheet._editorSelection = [ ];

        var selections = pane.renderEditorSelection().children;
        var divC2D3 = selections[0];

        equal(selections.length, 0);
    });
})();
