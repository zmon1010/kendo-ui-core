(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    module("resizing", {
        setup: function() {
            sheet = new Sheet(1000, 100, 10, 10, 10, 10);
        }
    });

    var DUMMY_VIEW = { ref: rangeRef(0,0, 100, 100), top: 0, left: 0, mergedCellLeft: 0, mergedCellTop: -10 };

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

    test("renders the resize handler for column", function() {
        var pane = createPane(0, 0);

        sheet.positionResizeHandle(new CellRef(-Infinity, 0)); // first column

        pane._currentView = DUMMY_VIEW;

        var handle = pane.renderResizeHandler();

        equal(handle.attr.style.height, "10px");
        equal(handle.attr.style.width, "14px");
        equal(handle.attr.className, "k-resize-handle");
        equal(handle.attr.style.left, "3px");
    });

    test("renders the resize handler for row", function() {
        var pane = createPane(0, 0);

        sheet.positionResizeHandle(new CellRef(0, -Infinity)); // first row

        pane._currentView = DUMMY_VIEW;

        var handle = pane.renderResizeHandler();

        equal(handle.attr.style.height, "14px");
        equal(handle.attr.style.width, "10px");
        equal(handle.attr.className, "k-resize-handle");
        equal(handle.attr.style.top, "13px");
    });

    test("renders the resize hint for column", function() {
        var pane = createPane(0, 0);

        sheet.positionResizeHandle(new CellRef(-Infinity, 0));
        sheet.startResizing({ x: 10 + 10, y: 10 });
        sheet.resizeHintPosition({ x: 10 + 20, y: 10 }); // move the hint with 20px

        pane._currentView = DUMMY_VIEW;

        var handle = pane.renderResizeHint();

        equal(handle.attr.style.width, "14px");
        equal(handle.attr.className, "k-resize-hint");
        equal(handle.attr.style.left, "30px");
    });

    test("renders the resize hint for row", function() {
        var pane = createPane(0, 0);

        sheet.positionResizeHandle(new CellRef(0, -Infinity));
        sheet.startResizing({ x: 10, y: 10 });
        sheet.resizeHintPosition({ x: 10, y: 10 + 20 }); // move the hint with 20px

        pane._currentView = DUMMY_VIEW;

        var handle = pane.renderResizeHint();

        equal(handle.attr.style.height, "14px");
        equal(handle.attr.className, "k-resize-hint");
        equal(handle.attr.style.top, "30px");
    });

    test("set the column width", function() {
        var pane = createPane(0, 0);

        var initialWidth = sheet.columnWidth(0);

        sheet.positionResizeHandle(new CellRef(-Infinity, 0));
        sheet.startResizing({ x: 10 + 20, y: 10 });
        sheet.resizeHintPosition({ x: 10+20+20, y: 10 }); // move the hint with 20px
        sheet.completeResizing();

        equal(sheet.columnWidth(0), initialWidth + 20);
    });

    test("set the row height", function() {
        var pane = createPane(0, 0);

        var initialHeight = sheet.rowHeight(0);

        sheet.positionResizeHandle(new CellRef(0, -Infinity));
        sheet.startResizing({ x: 10, y: 10 });
        sheet.resizeHintPosition({ x: 10, y: 10 + 20 }); // move the hint with 20px
        sheet.completeResizing();

        equal(sheet.rowHeight(0), initialHeight + 20);
    });

})();
