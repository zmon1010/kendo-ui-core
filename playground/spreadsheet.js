kendo.support.kineticScrollNeeded = true;

var Sheet = kendo.spreadsheet.Sheet;

var fixed = !kendo.support.kineticScrollNeeded;

///////////////////////////////////////////////////////////////////////////////////////////////

var COLUMNS = 1000;
var ROWS = 1000;
var COLUMN_WIDTH = 64;
var ROW_HEIGHT = 20;

var sheet = new Sheet(COLUMNS, ROWS, COLUMN_WIDTH, ROW_HEIGHT);

for (var i = 0, len = 100; i < len; i++) {
    for (var j = 0, len = 100; j < len; j++) {
        var idx = i * ROWS + j;
        sheet.values.value(idx, idx, ((i + 1)  * (j + 1)));
    }
}

sheet.widths.value(1, 5, 120);
sheet.widths.value(50, 50, 200);
sheet.heights.value(1, 1, 40);
sheet.heights.value(50, 50, 200);

sheet.colors.value(1, 50, "green");

var sheetView = new kendo.spreadsheet.View(document.getElementById("spreadsheet"), fixed);

sheetView.sheet(sheet);

sheetView.render();

/*
var Area = kendo.spreadsheet.Area;
var Address = kendo.spreadsheet.Address;
var Sorter = kendo.spreadsheet.Sorter;

var sorter = new Sorter(grid, [ cellValues, colors ]);
*/

