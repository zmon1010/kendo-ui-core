var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
    columns: 10,
    rows: 20
}).data("kendoSpreadsheet");

var sheet = spreadsheet.activeSheet();
var calc = kendo.spreadsheet.calc;

function fill(sheet, data) {
    for (var i in data) {
        var val = data[i];
        var ref = calc.parse_reference(i);
        var x = calc.parse("sheet1", ref.row, ref.col, val);
        if (x.type == "exp") {
            sheet.range(ref.row-1, ref.col-1).formula(calc.compile(x));
        } else {
            sheet.range(ref.row-1, ref.col-1).value(x.value);
        }
    }

    spreadsheet.refresh();
};

fill(sheet, {
    A1: 1, A2: 4, A3: 7,
    B1: 2, B2: 5, B3: 8,
    C1: 3, C2: 6, C3: 9,

    D1: "=sum(a1,b1,c1)",
    D2: "=sum(a1:c3)",
    //E1: "=sum(A:D)",
});
