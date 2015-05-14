
$("#spreadsheet").kendoSpreadsheet();

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
var sheet = spreadsheet.activeSheet();

for (var i = 0, len = 50; i < len; i++) {
    for (var j = 0, len = 200; j < len; j++) {
        sheet.range(i, j).value(i + ":" + j);
    }
}

sheet.columnWidth(1, 120);
sheet.columnWidth(2, 120);
sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);
sheet.range(1, 0, 50).background("green");
spreadsheet.refresh();
