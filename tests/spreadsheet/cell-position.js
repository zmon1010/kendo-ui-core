(function() {
    var CellRef = kendo.spreadsheet.CellRef;
    var RangeRef = kendo.spreadsheet.RangeRef;

    var element;
    var sheet;
    var spreadsheet;
    var view;

    module("spreadsheet view cell position", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

            sheet = spreadsheet.activeSheet();

            view = spreadsheet._view;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("cellRectangle returns rectangle offset information", function() {
        sheet.frozenRows(3);
        sheet.frozenColumns(3);

        var cell = new CellRef(0 , 0);
        var ref = new RangeRef(cell, cell);

        var grid = sheet._grid;
        var rect = grid.rectangle(ref);

        var expectedTop = rect.top + grid._headerHeight;
        var expectedLeft = rect.left + grid._headerWidth;

        var rectangle = view.cellRectangle(ref);

        equal(rectangle.top, expectedTop);
        equal(rectangle.left, expectedLeft);
        equal(rectangle.width, rect.width);
        equal(rectangle.height, rect.height);
    });

    test("cellRectangle returns rectangle offset honoring scroll position", function() {
        sheet.frozenRows(3);
        sheet.frozenColumns(3);

        var cell = new CellRef(100 , 100);
        var ref = new RangeRef(cell, cell);

        view.scrollIntoView(ref);

        var grid = sheet._grid;
        var rect = grid.rectangle(ref);

        var expectedTop = rect.top + grid._headerHeight + view.scroller.scrollTop;
        var expectedLeft = rect.left + grid._headerWidth + view.scroller.scrollLeft;

        var rectangle = view.cellRectangle(ref);

        equal(rectangle.top, expectedTop);
        equal(rectangle.left, expectedLeft);
        equal(rectangle.width, rect.width);
        equal(rectangle.height, rect.height);
    });

})();
