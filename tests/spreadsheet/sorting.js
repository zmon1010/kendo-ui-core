(function() {
    var sheet;
    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("sorting", {
        setup: function() {
            sheet = new kendo.spreadsheet.Sheet(4, 4, defaults.rowHeight, defaults.columnWidth);
            sheet.name("Sheet1");
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

    test("sorting a range by arbitrary column changes the order of the rows in the sheet", function() {
        sheet.range("A1:B3")
             .values([
              [ 4, 3 ] ,
              [ 9, 2 ],
              [ 3, 1 ]
            ])
        .sort(1);

        var values = sheet.range("A1:A3").values();
        equal(values[0], 3);
        equal(values[1], 9);
        equal(values[2], 4);
    });

    test("sort by spec object", function() {
        sheet.range("A1:B3")
             .values([
              [ 0, 3 ] ,
              [ 0, 2 ],
              [ 0, 1 ]
            ])
        .sort({ column: 1 });

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
        ).sort([{ column: 0 }, { column: 1 }]);

        var values = sheet.range("A1:B3").values();
        equal(values[0][0], 0);
        equal(values[0][1], 2);
        equal(values[1][1], 0);
        equal(values[2][1], 1);
    });

    test("sorts properties", function() {
        sheet.range("A1").value("foo");
        sheet.range("A2").value(2)
                         .color("green")
                         .fontFamily("Arial")
                         .underline(true)
                         .fontSize(1)
                         .italic(true)
                         .bold(true)
                         .format("#")
                         .background("green")
                         .textAlign("right")
                         .verticalAlign("top")
                         .wrap(false)
                         .borderBottom({size: 3, color: "green"})
                         .borderRight({size: 3, color: "green"});

        sheet.range("A1:A2").sort();

        equal(sheet.range("A1").color(), "green");
        equal(sheet.range("A1").fontFamily(), "Arial");
        equal(sheet.range("A1").underline(), true);
        equal(sheet.range("A1").fontSize(), 1);
        equal(sheet.range("A1").italic(), true);
        equal(sheet.range("A1").bold(), true);
        equal(sheet.range("A1").background(), "green");
        equal(sheet.range("A1").wrap(), false);
        equal(sheet.range("A1").textAlign(), "right");
        equal(sheet.range("A1").verticalAlign(), "top");
        equal(sheet.range("A1").format(), "#");
        equal(sheet.range("A1").borderBottom(), null);
        equal(sheet.range("A1").borderRight(), null);


        sheet.range("A1").value("foo");
        sheet.range("A2").value(2).formula("1+2");

        sheet.range("A1:A2").sort();

        equal(sheet.range("A1").formula(), "1+2");
    });

    test("descending sort", function() {
        sheet.range("A1:B3")
             .values([
              [ 0, 1 ] ,
              [ 0, 2 ],
              [ 0, 1 ]
            ])
        .sort({ column: 1, ascending: false });

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
        ).sort([{ column: 0 }, { column: 1 }]);

        var sort = sheet._sort;
        equal(sort.ref.toString(), "A1:B3");
        equal(sort.columns.length, 2);
        equal(sort.columns[1].index, 1);
    });

    test("sort re-applies filter", function() {
        sheet.range("A1:B4").values(
            [
                [0, 1], // header
                [3, 0], // hide
                [1, 0], // hide
                [2, 2]  // show
            ]
        )
        .filter({
            column: 1,
            filter: new kendo.spreadsheet.ValueFilter( {
                values: [2]
            })
        })

        sheet.range("A2:B4").sort([
            { column: 0, ascending: true }
        ]);

        ok(sheet.rowHeight(0) > 0, "header is shown");
        ok(sheet.rowHeight(1) === 0, "first filtered out row remains hidden");
        ok(sheet.rowHeight(2) > 0, "row that matches filter is shown");
        ok(sheet.rowHeight(3) === 0, "second filtered out row remains hidden");
    });
})();
