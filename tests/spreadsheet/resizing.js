(function() {
    var Pane = kendo.spreadsheet.Pane;
    var Sheet = kendo.spreadsheet.Sheet;
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var element, spreadsheet, sheet;

    module("resizing", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
            spreadsheet = new kendo.ui.Spreadsheet(element, {
                rows         : 1000,
                columns      : 100,
                rowHeight    : 10,
                columnWidth  : 10,
                headerHeight : 10,
                headerWidth  : 10
            });
            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    var DUMMY_VIEW = { ref: rangeRef(0,0, 100, 100), top: 0, left: 0, mergedCellLeft: 0, mergedCellTop: -10 };

    function rangeRef(topLeftRow, topLeftCol, bottomRightRow, bottomRightCol) {
        var ref = new RangeRef(
            new CellRef(topLeftRow, topLeftCol),
            new CellRef(bottomRightRow, bottomRightCol)
        );

        return ref;
    }

    test("renders the resize handler for column", function() {
        sheet.positionResizeHandle(new CellRef(-Infinity, 0)); // first column
        var pane = spreadsheet._workbook._view.panes[0];
        pane._currentView = DUMMY_VIEW;

        var handle = pane.renderResizeHandler();

        equal(handle.attr.style.height, "10px");
        equal(handle.attr.style.width, "7px");
        equal(handle.attr.className, "k-resize-handle");
        equal(handle.attr.style.left, "6.5px");
    });

    test("renders the resize handler for row", function() {
        sheet.positionResizeHandle(new CellRef(0, -Infinity)); // first row
        var pane = spreadsheet._workbook._view.panes[0];
        pane._currentView = DUMMY_VIEW;

        var handle = pane.renderResizeHandler();

        equal(handle.attr.style.height, "7px");
        equal(handle.attr.style.width, "10px");
        equal(handle.attr.className, "k-resize-handle");
        equal(handle.attr.style.top, "16.5px");
    });

    test("set the column width + undo", function() {
        var initialWidth = sheet.columnWidth(0);

        sheet.positionResizeHandle(new CellRef(-Infinity, 0));
        sheet.startResizing({ x: 10 + 20, y: 10 });
        sheet.resizeHintPosition({ x: 10+20+20, y: 10 }); // move the hint with 20px
        sheet.completeResizing();
        equal(sheet.columnWidth(0), initialWidth + 20);

        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.columnWidth(0), initialWidth);
    });

    test("set the row height + undo", function() {
        var initialHeight = sheet.rowHeight(0);

        sheet.positionResizeHandle(new CellRef(0, -Infinity));
        sheet.startResizing({ x: 10, y: 10 });
        sheet.resizeHintPosition({ x: 10, y: 10 + 20 }); // move the hint with 20px
        sheet.completeResizing();
        equal(sheet.rowHeight(0), initialHeight + 20);

        spreadsheet._workbook.undoRedoStack.undo();
        equal(sheet.rowHeight(0), initialHeight);
    });

    module("view resizing hing rendering", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { rows: 3, columns: 3 });

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("renders the resize hint for column", function() {
        sheet.positionResizeHandle(new CellRef(-Infinity, 0));
        sheet.startResizing({ x: 10 + 10, y: 10 });
        sheet.resizeHintPosition({ x: 10 + 20, y: 10 }); // move the hint with 20px

        sheet.trigger("change", { resize: true });

        var handle = element.find(".k-resize-hint")[0];

        equal(handle.style.width, "7px");
        equal(handle.style.left, "30px");
    });

    test("renders the resize hint for row", function() {
        sheet.positionResizeHandle(new CellRef(0, -Infinity));
        sheet.startResizing({ x: 10, y: 10 });
        sheet.resizeHintPosition({ x: 10, y: 10 + 20 }); // move the hint with 20px

        sheet.trigger("change", { resize: true });

        var handle = element.find(".k-resize-hint")[0];

        equal(handle.style.height, "7px");
        equal(handle.style.top, "30px");
    });

})();
