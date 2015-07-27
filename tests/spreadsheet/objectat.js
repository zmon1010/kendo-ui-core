(function() {
    var element;
    var sheet;
    var spreadsheet;
    var view;

    module("spreadsheet view paneAt", {
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

    test("paneAt clicking at the top gets the first pane", function() {
        sheet.frozenRows(3);
        sheet.frozenColumns(3);

        var pane = view.paneAt(10, 10);
        equal(pane._grid.top, 0);
        equal(pane._grid.left, 0);
    });

    test("top corner mousedown returns the topcorner object", function() {
        equal(view.objectAt(3, 3).type, "topcorner");
    });

    test("left side returns row header", function() {
        view.refresh(kendo.spreadsheet.ALL_REASONS);
        var result = view.objectAt(3, 45);
        equal(result.type, "rowheader");
        equal(result.row, 1); // second row, minus the header size
    });
})();
