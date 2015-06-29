$("#spreadsheet").kendoSpreadsheet();

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

spreadsheet.autoRefresh(false);

var sheet = spreadsheet.activeSheet();

sheet.range("E11:AX200").formula("=RANDBETWEEN(1, 100)");

//sheet.hideColumn(1);
//sheet.hideColumn(5);
//sheet.hideRow(5);

sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);

sheet.range(1, 0, 50).background("green");
sheet.range(2, 2, 8, 6).background("teal").value("foo").merge();

sheet.range("I1:I4").values([[10], [9], [10], [11]]).format('[<10]"<10"* 0;[>10]">10"* 0;"=10"* 0');

sheet.frozenColumns(3).frozenRows(6);

sheet.range("K11:M16,12:12").select();

for (var i = 0, len = 50; i < len; i++) {
    sheet.range(i, 0).formula("=AVERAGE(L:L)");
}

spreadsheet.autoRefresh(true);

$("#copy").on("click", function(e) {
    var range = sheet.range("K11:M16");

    range.select();
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
});

$("#sort").on("click", function() {
    sheet.range("I1:I4").sort();
});
