
$("#spreadsheet").kendoSpreadsheet();

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
var sheet = spreadsheet.activeSheet();

for (var i = 0, len = 50; i < len; i++) {
    for (var j = 0, len = 200; j < len; j++) {
        var idx = i * 200 + j;
        sheet.values.value(idx, idx, i + ":" + j);
    }
}

sheet.columnWidth(1, 120);
sheet.columnWidth(2, 120);
sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);

sheet.colors.value(1, 50, "green");

spreadsheet.refresh();
