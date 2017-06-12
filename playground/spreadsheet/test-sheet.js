var spreadsheet = $("#spreadsheet").kendoSpreadsheet({
}).data("kendoSpreadsheet");

var sheet = spreadsheet.activeSheet();
var sheet2 = spreadsheet.insertSheet();
var calc = kendo.spreadsheet.calc;

kendo.spreadsheet.defineFunction("json.encode", function(x){
    return JSON.stringify(x);
}).args([
    [ "x", "anyvalue" ]
]);

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
        icon: "k-i-background"
    }
});

sheet.batch(function(){

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
    sheet.range("E6").value(new Date);

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

    var listvalidation = {
        dataType: "list",
        showButton: true,
        comparerType: "list",
        from: "H1:H5",
        allowNulls: true,
        type: "reject"
    };
    sheet.range("E10:E12").validation(listvalidation).background("#fea");
    sheet.range("AX1:AX12").validation(listvalidation).background("#fea");

    sheet.range("C10:C12").editor("color");
    sheet.range("C10:C12").values([ ["red"], ["green"], ["blue"] ]);

    sheet.range("A5").format("@");
    sheet.range("A5").input("1/2/2016");
    sheet.range("B5").input("=A5+1");
    console.log(sheet.range("A5").value());

    sheet.range("A15").format(" _(* #,##0.00_);_(* (#,##0.00);_(* \"\"-\"\"_)").value(1231231231);

    spreadsheet.defineName("Foo", "Sheet1!$A$1:$C$3");
    spreadsheet.defineName("Bar", "Sheet1!$A$1, Sheet1!$B$2, Sheet1!$C$3");
    spreadsheet.defineName("NoSheet", "$B$2:$D$5");
    spreadsheet.defineName("TEST", "SUM($A$1:$C$3)", true);
    spreadsheet.defineName("Sheet1!Const_PI", "3.14", true);
    spreadsheet.defineName("Const_Str", '"this is string"', true);
    spreadsheet.defineName("TESTREL", "SUM(Sheet1!R[-2]C[-2]:R[-1]C[-1])", true);
    spreadsheet.defineName("TOTAL", "SUM(Sheet1!R1C[]:R[-1]C[])", true);
    spreadsheet.defineName("Das_Ist_Long_Name", "$G$1:$G$20");
    sheet.range("D3").input("=SUM(foo)");
    sheet.range("D4").input("=SUM(Bar)");
    sheet.range("C4").input("=TESTREL");

    sheet.range("G14").validation({
        dataType: "number",
        allowNulls: false,
        comparerType: "greaterThan",
        from: 10
    });

    spreadsheet._workbook.defineName("Foo", kendo.spreadsheet.calc.parseReference("Sheet1!A1:C3"));
    sheet.range("D3").input("=SUM(foo)");

    sheet.range("F16").input("=TEST+TEST");
    sheet.range("G20").input("=TOTAL");
    sheet.range("G19").input("=Const_PI");
    sheet.range("J1").input("=SUM(NoSheet)");

    sheet.range("F1").input('=json.encode(E1)');
    sheet.range("E1").select();

    sheet.range("C15").input("5%");
    sheet.range("C16").input("3.2");
    sheet.range("D15").input("=CEILING(C15*C16, 0.01)");
    sheet.range("D16").input("=ROUNDUP(C15*C16, 2)");

    spreadsheet.bind("change", function(ev){
        console.log(ev);
    });

    sheet.range("F5").format("d mmm yyyy").value(20000);
    sheet.range("E2").format('_(#.##0_);_((#.##0);_("-"??_);_(@_)').value(0).background("yellow");

}, { recalc: true });

sheet2.batch(function(){
    sheet2.range("A2:A10").formula("ROW()");
    sheet2.range("B11").formula("AGGREGATE(1, 5, A1:A8)").background("yellow");
}, { recalc: true });
