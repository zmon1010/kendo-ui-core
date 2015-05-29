
$("#spreadsheet").kendoSpreadsheet();

var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");
var sheet = spreadsheet.activeSheet();
var calc = kendo.spreadsheet.calc;

for (var i = 10, len = 50; i < len; i++) {
    for (var j = 10, len = 200; j < len; j++) {
        sheet.range(i, j).value(i + j);
    }
}

// sheet.columnWidth(1, 120);
/*
sheet.columnWidth(2, 120);
sheet.rowHeight(1, 40);
sheet.rowHeight(50, 200);
*/

sheet.range(1, 0, 50).background("green");
sheet.range(3, 3, 6, 6).background("teal");

for (var i = 0, len = 50; i < len; i++) {
    var x = calc.parse("sheet1", i, 0, "=AVERAGE(L:L)");
    sheet.range(i, 0).formula(kendo.spreadsheet.calc.compile(x));
}

spreadsheet.refresh();
