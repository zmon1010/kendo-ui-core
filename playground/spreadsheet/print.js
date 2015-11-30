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
sheet.range("A1:Z50")
    .formula('ROW() & ":" & COLUMN()')
    .fontFamily("DejaVu Serif");

sheet.range("D19:Q31")
    .merge()
    .value("Test merged cell")
    //.fontSize(24)
    .italic(true)
    .background("yellow");

sheet.range("A27:B28").merge().background("green");

$(document).ready(function(){
    var fonts = kendo.drawing.drawDOM.getFontFaces();
    //console.log(fonts);
    kendo.pdf.defineFont(fonts);
});
