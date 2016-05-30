var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
    columns: 10,
    rows: 20
}).data("kendoSpreadsheet");

var sheet = spreadsheet.activeSheet();
var calc = kendo.spreadsheet.calc;

function fill(sheet, data) {
    for (var i in data) {
        var val = data[i];
        var ref = calc.parseReference(i);
        var x = calc.parse("sheet1", ref.row, ref.col, val);
        if (x.type == "exp") {
            sheet.range(ref.row, ref.col).formula(calc.compile(x));
        } else {
            sheet.range(ref.row, ref.col).value(x.value);
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

    A11: "a",
    B11: '=IFERROR(VLOOKUP("a", A11:A12, 1, FALSE), VLOOKUP("b", A11:A12, 1, FALSE))'
});

sheet.range("G2:G11").values([
    [1],[2],[3],[4],[5],[6],[7],[8],[9],[10]
]);

sheet.range("A5:A9").values([
    ["foo"],
    ["bar"],
    ["3-Non-Admin"],
    ["wak"],
    ["3-Non-Admin"]
]);
sheet.range("C5").formula('countif(A:A, "3-Non-Admin")');
sheet.range("F4:H6").enable(false);

sheet.range("D2").link("http://google.com/");

sheet.range("E5:E7")
    .value(new Date(1979, 2, 8))
    .format("yyyy-mm-dd")
    .validation({
        dataType: "date",
        showButton: true,
        comparerType: "between",
        from: "DATEVALUE(\"1/1/1900\")",
        to: "DATEVALUE(\"1/1/1998\")",
        allowNulls: true,
        type: "reject",
        titleTemplate: "Birth Date validaiton error",
        messageTemplate: "Birth Date should be between 1899 and 1998 year."
    })
    .select();
