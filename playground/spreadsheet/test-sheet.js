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
sheet.range("G4:G6").enable(false);

sheet.range("D2").link("http://google.com/");

sheet.range("E5").value(new Date(1979, 2, 8)).select();

sheet.range("E5:E8")
    .format("yyyy-mm-dd")
    .validation({
        dataType: "date",
        showButton: true,
        comparerType: "between",
        from: 'DATEVALUE("1/1/1900")',
        to: 'DATEVALUE("1/1/1998")',
        allowNulls: true,
        type: "reject",
        titleTemplate: "Birth Date validation error",
        messageTemplate: "Birth Date should be between 1899 and 1998 year."
    });

sheet.range("H1:H5").values([
    [ "Lorem" ],
    [ "Etiam" ],
    [ "Maecenas" ],
    [ "Aliquam" ],
    [ "Fusce" ]
]);

sheet.range("E10:E12").validation({
    dataType: "list",
    showButton: true,
    comparerType: "list",
    from: "H:H",
    allowNulls: true,
    type: "reject"
}).background("#fea");

sheet.range("E10").select();

kendo.spreadsheet.registerEditor("color", function(){
    var context, dlg, colorpicker, model;
    function create() {
        if (!dlg) {
            model = kendo.observable({
                value: "#000000",
                ok: function() {
                    context.callback(model.value);
                    dlg.close();
                },
                cancel: function() {
                    dlg.close();
                }
            });
            var el = $("<div data-visible='true' data-role='window' data-modal='true' data-resizable='false' data-title='Select color'>" +
                       "  <div data-role='flatcolorpicker' data-bind='value: value'></div>" +
                       "  <div style='margin-top: 1em; text-align: right'>" +
                       "    <button style='width: 5em' class='k-button' data-bind='click: ok'>OK</button>" +
                       "    <button style='width: 5em' class='k-button' data-bind='click: cancel'>Cancel</button>" +
                       "  </div>" +
                       "</div>");
            kendo.bind(el, model);
            dlg = el.getKendoWindow();
        }
    }
    function open() {
        create();
        dlg.open();
        dlg.center();
        var value = context.range.value();
        if (value != null) {
            model.set("value", value);
        }
    }
    return {
        edit: function(options) {
            context = options;
            open();
        },
        icon: "k-font-icon k-i-background"
    }
});

sheet.range("C10:C12").editor("color");
sheet.range("C10:C12").values([ ["red"], ["green"], ["blue"] ]);
