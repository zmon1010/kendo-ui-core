var S = $("#spreadsheet").kendoSpreadsheet().data("kendoSpreadsheet");

$("#pdf").on("click", function(){
    S.activeSheet().draw(kendo.spreadsheet.SHEETREF, {
        paperSize : "A4",
        margin    : "1cm",
        landscape : true
    }, function(group){
        kendo.drawing.pdf.saveAs(group, "sheet.pdf");
    });
});

var sheet = S.activeSheet();

sheet.batch(function(){
    sheet.range("A1:Z50")
        .formula('ROW() & ", " & COLUMN()')
        .fontFamily("DejaVu Serif");

    sheet.forEach("A1:Z50", function(row, col){
        if ((row + col) % 2 == 0) {
            sheet.range(row, col, 1, 1).background("#fea");
        }
    });

    sheet.range("D19:Q31")
        .merge()
        .value("Test merged cell")
        .fontSize(24)
        .italic(true)
        .background("yellow");

    sheet.range("A27:B28").merge().background("green");

    sheet.range("L1:L50").background("#cfc");

    sheet.range("D3:D4").merge().value("This is wrapped text").wrap(true);

    sheet.range("E5:H9")
        .borderLeft({ size: 3, color: "red" })
        .borderTop({ size: 2, color: "blue" })
        .borderRight({ size: 3, color: "red" })
        .borderBottom({ size: 1, color: "black" });

}, kendo.spreadsheet.ALL_REASONS);

$(document).ready(function(){
    var fonts = kendo.drawing.drawDOM.getFontFaces();
    //console.log(fonts);
    kendo.pdf.defineFont(fonts);
});
