(function() {
    var workbook;
    var sheet;
    var clipboard;
    var defaults = {"prefix":"","name":"Spreadsheet","toolbar":true,"rows":200,"columns":10,"rowHeight":20,"columnWidth":64,"headerHeight":20,"headerWidth":32};
    var range;

    module("Clipboard API", {
        setup: function() {
            workbook = new kendo.spreadsheet.Workbook(defaults);
            sheet = workbook.activeSheet();
            clipboard = workbook.clipboard();
            range = sheet.range(0, 0);
        },
        teardown: function() {
            sheet.unbind();
        }
    });

    test("basic copy - paste works", function() {
        sheet.range("A1").value("test").select();
        clipboard.copy();
        sheet.range("B1").select();
        clipboard.paste();

        equal(sheet.range("B1").value(), "test");
    });

    test("paste on sheet edge truncates the clipboard contents", function() {
        sheet.range("A1:C1").value("test").select();
        clipboard.copy();
        sheet.range("I1:J1").select();
        clipboard.paste();

        equal(sheet.range("J1").value(), "test");
    });
})();
