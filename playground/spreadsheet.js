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

timeFunction(kendo.spreadsheet.View, "refresh", "View::refresh");
timeFunction(kendo.spreadsheet.Sheet, "recalc", "Sheet::recalc");
timeFunction(kendo.spreadsheet.FormulaContext, "getRefCells");


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

sheet.range("K10").value("'123");
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
    .borderLeft({ size: "3px", color: "#0f0" })
    .borderRight({ size: "3px", color: "#00f" });

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
    kendo.drawing.drawDOM("#spreadsheet .k-spreadsheet-view").then(function(group){
        group.options.set("pdf.margin", "1cm");
        kendo.drawing.pdf.saveAs(group, "spreadsheet.pdf");
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

sheet.range("C1").formula("=sum(Sheet2!A1:B3)");
sheet.range("D1").formula("=sum(sHEEt2!A1:B3)");

sheet2.range("D1").input("Sheet1!A1");
sheet2.range("D2").input("Sheet2!B3");
sheet2.range("D3").input("=sum( indirect(D1):indirect(D2) )");

sheet2.range("D5").input("=sum(sheet1!E11:AX200)");
sheet2.range("D6").input("=sum(sheet1!A:AX)");
sheet2.range("D7").input("=sum(sheet1!A:AX)");








sheet.range("E2").input('=SUM(A1:C3, 100, B2, 200, D1, INDIRECT("A1:C3"))');
