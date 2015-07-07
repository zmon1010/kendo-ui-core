(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("filtering", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("filter hides rows that don't match the values", function() {
        sheet.range("A1:B2").values(
            [1, 2],
            [2, 3]
        ).filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [1]
            })
        });

        equal(sheet.rowHeight(1), 0);
    });
})();
