(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Sheet API", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(3, 3, defaults.rowHeight, defaults.columnWidth);
        }
    });

    test("sort sorts the range by ascending order", function() {
        sheet.range("A1:A3")
             .values([
              [ 3 ] ,
              [ 2 ],
              [ 1 ]
            ])
        .sort();

        var values = sheet.range("A1:A3").values();

        equal(values[0], 1);
        equal(values[1], 2);
        equal(values[2], 3);
    });

    test("sort triggers the change event of the sheet", 1, function() {
        sheet.bind("change", function() {
            ok(true);
        }).range("A1:A3").sort();
    });

    test("sorting a range by arbitrary column", function() {
        sheet.range("A1:B3")
             .values([
              [ 0, 3 ] ,
              [ 0, 2 ],
              [ 0, 1 ]
            ])
        .sort(1);

        var values = sheet.range("B1:B3").values();
        equal(values[0], 1);
        equal(values[1], 2);
        equal(values[2], 3);
    });

    test("sort by spec object", function() {
        sheet.range("A1:B3")
             .values([
              [ 0, 3 ] ,
              [ 0, 2 ],
              [ 0, 1 ]
            ])
        .sort({ index: 1 });

        var values = sheet.range("B1:B3").values();
        equal(values[0], 1);
        equal(values[1], 2);
        equal(values[2], 3);
    });

    test("multiple column sort", function() {
        sheet.range("A1:B3").values(
            [
                [1, 1],
                [0, 2],
                [1, 0]
            ]
        ).sort([{ index: 0 }, { index: 1 }]);

        var values = sheet.range("A1:B3").values();
        equal(values[0][1], 2);
        equal(values[1][1], 0);
        equal(values[2][1], 1);
    });

    test("descending sort", function() {
        sheet.range("A1:B3")
             .values([
              [ 0, 1 ] ,
              [ 0, 2 ],
              [ 0, 1 ]
            ])
        .sort({ index: 1, ascending: false });

        var values = sheet.range("B1:B3").values();
        equal(values[0], 2);
        equal(values[1], 1);
        equal(values[2], 1);
    });

    test("sorting sets the sort state of the sheet", function() {
        sheet.range("A1:B3").values(
            [
                [1, 1],
                [0, 2],
                [1, 0]
            ]
        ).sort([{ index: 0 }, { index: 1 }]);

        var sort = sheet._sort;
        equal(sort.ref.toString(), "A1:B3");
        equal(sort.columns.length, 2);
        equal(sort.columns[1].index, 1);
    });
})();
