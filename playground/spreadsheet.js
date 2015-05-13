
$("#spreadsheet").kendoSpreadsheet();

var sheet = $("#spreadsheet").data("kendoSpreadsheet");

for (var i = 0, len = 50; i < len; i++) {
    for (var j = 0, len = 200; j < len; j++) {
        var idx = i * 200 + j;
        sheet.activeSheet.values.value(idx, idx, i + ":" + j);
    }
}

sheet.activeSheet.widths.value(1, 5, 120);
sheet.activeSheet.heights.value(1, 1, 40);
sheet.activeSheet.heights.value(50, 50, 200);

sheet.activeSheet.colors.value(1, 50, "green");

sheet.view.render();
