$("#spreadsheet").kendoSpreadsheet();

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

spreadsheet.autoRefresh(false);

var sheet = spreadsheet.activeSheet();

sheet.range("E11:AX200").formula("=RANDBETWEEN(1, 100)");

//sheet.hideColumn(1);
//sheet.hideColumn(5);
sheet.hideRow(12);

sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);

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
    .borderRight({ size: "3px", color: "#00f" })

sheet.frozenColumns(3).frozenRows(6);

sheet.range("K11:M16,12:12").select();

for (var i = 3, len = 50; i < len; i++) {
    sheet.range(i, 0).formula("=AVERAGE(L:L)");
}

spreadsheet.autoRefresh(true);

$("#copy").on("click", function(e) {
    var range = sheet.range("K11:M16");

    range.select();
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

        console.log(e.target.value, values);

        spreadsheet.activeSheet().selection().values(values);
    });;
});

$("body").on("mousedown", ".k-spreadsheet-selection", function(e) {
    try {
        var text = spreadsheet.activeSheet().selection().values().map(function(row) {
            return row.join("\t");
        }).join("\r\n");

        $("#clipboard-container").css({
            left: e.clientX,
            top: e.clientY
        });

        setTimeout(function() {
            $("#clipboard").val(text).select().focus();
        });
    } catch(e) {
        console.error(e);
    }
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
