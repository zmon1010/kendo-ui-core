
$("#spreadsheet").kendoSpreadsheet();

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

spreadsheet.autoRefresh(false);

var sheet = spreadsheet.activeSheet();
var calc = kendo.spreadsheet.calc;

for (var i = 10, len = 50; i < len; i++) {
    for (var j = 10, len = 200; j < len; j++) {
        sheet.range(i, j).value(i + ":" + j);
    }
}

//sheet.columnWidth(1, 120);
//sheet.columnWidth(2, 120);
sheet.hideColumn(1);
sheet.hideColumn(5);
sheet.hideRow(5);

sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);

sheet.range(1, 0, 50).background("green");
sheet.range(2, 2, 8, 6).background("teal").value("foo").merge();

sheet.range("I1:I3").values([[9], [10], [11]]).format('[<10]"<10"* 0;[>10]">10"* 0;"=10"* 0');

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

$("#clipboard").on("paste", function(e) {
    setTimeout(function() {
        var values = e.target.value.split("\n");

        values = values.filter(function(value) { return value.length > 0; });

        values = values.map(function(value) {
            return value.split(/\s+/);
        });

        console.log(e.target.value, values);

        spreadsheet.activeSheet().selection().values(values);
    });
});

$(".k-spreadsheet-selection").on("mousedown", function(e) {
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
