var STATS = {};

function timeFunction(obj, func, name) {
    var orig = obj.prototype[func];
    if (!name) {
        name = func;
    }
    var tm = STATS[name] = {
        min: null, max: null, avg: null, timer: null, tot: 0, calls: 0, last: 0, lastCalls: 0
    };
    function update(t1, t2) {
        var dt = t2 - t1;
        tm.calls++;
        tm.lastCalls++;
        if (tm.min == null || dt < tm.min) tm.min = dt;
        if (tm.max == null || dt > tm.max) tm.max = dt;
        tm.tot += dt;
        tm.last += dt;
        tm.avg = tm.tot / tm.calls;
        clearTimeout(tm.timer);
        tm.timer = setTimeout(function(){
            var last = tm.last;
            delete tm.timer;
            delete tm.last;
            console.log(name + " (last: " + last.toFixed(3) + "ms) " + JSON.stringify(tm, null, 2));
            tm.last = 0;
            tm.lastCalls = 0;
        });
    }
    obj.prototype[func] = function() {
        var t1 = performance.now();
        var result = orig.apply(this, arguments);
        var t2 = performance.now();
        update(t1, t2);
        return result;
    };
}

// timeFunction(kendo.spreadsheet.View, "refresh", "View::refresh");
// timeFunction(kendo.spreadsheet.Sheet, "recalc", "Sheet::recalc");
// timeFunction(kendo.spreadsheet.FormulaContext, "getRefCells");


$("#spreadsheet").kendoSpreadsheet({
    toolbar: {
        home: kendo.spreadsheet.ToolBar.fn.options.tools["home"].concat([
            {
                type: "button",
                text: "Foo",
                spriteCssClass: "k-icon k-font-icon k-i-cog",
                click: function(e) {
                    window.alert("custom tool");
                }
            }
        ])
    }
});

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

spreadsheet.autoRefresh(false);

var sheet = spreadsheet.activeSheet();

spreadsheet.insertSheet();
spreadsheet.insertSheet();
spreadsheet.insertSheet();

sheet.range("E11:AX200").formula("=RANDBETWEEN(1, 100)").format("[Red][<50]#;[Green][>50]#;[Blue]0.00");

//sheet.hideColumn(1);
//sheet.hideColumn(5);
sheet.hideRow(12);

sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);

sheet.range("K10").value("123");
sheet.range("J10").value(new Date(2015,1,1));

sheet.range("A1:B3").values([
    [1, 2],
    [3, 4],
    [5, 6]
]);

sheet.range(1, 0, 50).background("#afa");
sheet.range(2, 2, 8, 6).background("#aff").value("foo").merge();

sheet.range("I1:I4").values([[10], [9], [10], [11]]).format('[<10]"<10"* 0;[>10]">10"* 0;"=10"* 0');

sheet.range("E15:E20")
    .background("#afa")
    .borderTop({ color: "#000" })
    .borderBottom({ color: "#f00" })
    .borderLeft({ color: "#0f0" })
    .borderRight({ color: "#00f" });

sheet.frozenColumns(3).frozenRows(6);

sheet.range("K11:M16").select();

for (var i = 3, len = 50; i < len; i++) {
    sheet.range(i, 0).formula("=AVERAGE(L:L)");
}

spreadsheet.autoRefresh(true);

$("#copy").on("click", function(e) {
    spreadsheet._view.selectClipBoardContents();
    document.execCommand("copy");
});

$("#select-first").on("click", function(e) {
    sheet.range("A1:A1").select();
});

$("#select-all").on("click", function(e) {
    var range = sheet.range("#SHEET");
    range.select();
});

$("#activate-merged-cell").on("click", function(e) {
    sheet.range("C3").select();
});

$("#clipboard").on("paste", function(e) {
    setTimeout(function() {
        var values = e.target.value.split("\n");

        values = values.filter(function(value) { return value.length > 0; });

        values = values.map(function(value) {
            return value.split(/\s+/);
        });

        window.console.log(e.target.value, values);

        spreadsheet.activeSheet().selection().values(values);
    });
});

var ascending = true;
$("#sort").on("click", function() {
    sheet.range("I1:I4").sort({ column: 0, ascending: ascending });
    ascending = !ascending;
});

var filtered = false;
$("#filter").on("click", function() {
    if (filtered) {
        sheet.clearFilter(0);
    } else {
        sheet.range("A1:B3").filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter({
                values: [3]
            })
        });
    }
    filtered = !filtered;
});

$("#pdf").on("click", function(){
    // kendo.drawing.drawDOM("#spreadsheet .k-spreadsheet-view").then(function(group){
    //     group.options.set("pdf.margin", "1cm");
    //     kendo.drawing.pdf.saveAs(group, "spreadsheet.pdf");
    // });

    spreadsheet.activeSheet().draw(kendo.spreadsheet.SHEETREF, {
        paperSize : "A4",
        margin    : "1cm",
        landscape : true
    }, function(group){
        kendo.drawing.pdf.saveAs(group, "sheet.pdf");
    });
});

$("#recalc").on("click", function(){
    //console.time("recalc");
    spreadsheet.refresh({ recalc: true });
    //console.timeEnd("recalc");
});

var sheet1 = spreadsheet.sheetByName("Sheet1")
sheet1.range("C17").formula("=SUM(A1:B1)");
sheet1.range("C18").formula("=SUM(A1:B1, A2:B2, A3:B3)");

var sheet2 = spreadsheet.sheetByName("Sheet2");
sheet2.range("A1").formula("=Sheet1!A1:B3 ^ 2");

sheet.range("C1").formula("=sum(Sheet2!A1:B3, Sheet1!A1:B3)");
sheet.range("D1").formula("=sum(sHEEt2!A1:B3)");

sheet2.range("D1").input("Sheet1!A1");
sheet2.range("D2").input("Sheet2!B3");
sheet2.range("D3").input("=sum( indirect(D1):indirect(D2) )");

sheet2.range("D5").input("=sum(sheet1!E11:AX200)");
sheet2.range("D6").input("=sum(sheet1!A:AX)");
sheet2.range("D7").input("=sum(sheet1!A:AX)");








sheet.range("E2").input('=SUM(A1:C3, 100, B2, 200, D1, INDIRECT("A1:C3"))');

sheet2.insertColumn(2);
sheet2.hideColumn(2);
sheet2.range("B4:D7")
    .merge().value("FOO")
    .background("yellow")
    .borderLeft({ color: "red" })
    .borderTop({ color: "red" })
    .borderRight({ color: "red" })
    .borderBottom({ color: "red" });
sheet2.range("B9:D9").values([[ "A", "B", "C" ]]);




// autofill

var sheet3 = spreadsheet.sheetByName("Sheet3");
sheet3.batch(function(){
    sheet3.range("A1:B2").values([ [1, 3], [2, 6] ]).background("yellow");
    sheet3.range("A3:B10").fillFrom("A1:B2").background("#c0ffee");
    sheet3.range("C1:G2").fillFrom("A1:B2").background("#c0ffee");

    sheet3.range("D7:D12").values([ [1], [2], [3], [2], [3], [4] ]).background("yellow");
    sheet3.range("D4:D6").fillFrom("D7:D12").background("#c0ffee");
    sheet3.range("D13:D18").fillFrom("D7:D12").background("#c0ffee");

    sheet3.range("A12").value(2).background("yellow");
    sheet3.range("A13:A18").fillFrom("A12").background("#c0ffee");

    sheet3.range("F4:G4").values([[ "Mon", "Wed" ]]).background("yellow");
    sheet3.range("H4:L4").fillFrom("F4:G4").background("#c0ffee");

    sheet3.range("F5").values([[ "Sun" ]]).background("yellow");
    sheet3.range("G5:L5").fillFrom("F5").background("#c0ffee");

    sheet3.range("F6").values([[ "Foo 1" ]]).background("yellow");
    sheet3.range("G6:L6").fillFrom("F6").background("#c0ffee");

    sheet3.range("F7").values([[ "Foo 1.5" ]]).background("yellow");
    sheet3.range("G7:L7").fillFrom("F7").background("#c0ffee");

    sheet3.range("F8:G8").values([[ "Foo 10", "Foo 8" ]]).background("yellow");
    sheet3.range("H8:L8").fillFrom("F8:G8").background("#c0ffee");

    sheet3.range("F10:F13").values([[ 1 ], [ 4 ], [ "Bar 2" ], [ "Bar 2.5" ]]).background("yellow");
    sheet3.range("F14:F30").fillFrom("F10:F13").background("#c0ffee");

    sheet3.range("G10:G11").values([ ["January"], ["June"] ]).background("yellow");
    sheet3.range("G12:G30").fillFrom("G10:G11").background("#c0ffee");

    sheet3.range("H10:H12").values([ ["Jan"], [ "May" ], [ "Feb" ]]).background("yellow");
    sheet3.range("H13:H30").fillFrom("H10:H12").background("#c0ffee");

    sheet3.range("I10:I12").values([ ["Jan"], ["Feb"], [2] ]).background("yellow");
    sheet3.range("I13:I30").fillFrom("I10:I12").background("#c0ffee");

    sheet3.range("J10").value(new Date()).background("yellow");
    sheet3.range("J11:J30").fillFrom("J10").background("#c0ffee");

    sheet3.range("C5").formula("A5*B5").background("yellow").bold(true);
    sheet3.range("C6").formula("B6-A6").background("yellow").italic(true);
    sheet3.range("C7:C10").fillFrom("C5:C6").background("#c0ffee");

    sheet3.range("C17:C19").values([ [2], [4], [6] ]).background("yellow");
    sheet3.range("C12:C16").fillFrom("c17:c19").background("#c0ffee");

    //disabled
    sheet.range("A1:A3").enable(false);
});
