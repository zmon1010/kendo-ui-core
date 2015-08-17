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

    test("can copy returns false for union ranges", function() {
        sheet.range("A1:C1,B2").select();
        clipboard.copy();

        ok(!clipboard.canCopy())
    });

    test("canPaste returns false if merged cells are partially overlapped", function() {
        sheet.range("A1:C1").select();
        clipboard.copy();

        sheet.range("D1:F1").merge();
        sheet.range("C1").select();

        ok(!clipboard.canPaste())
    });

    test("canPaste returns true if no merged cells are affected", function() {
        sheet.range("A1:C1").select();
        clipboard.copy();

        sheet.range("C1").select();

        ok(clipboard.canPaste());
    });

    test("canPaste returns false if pasting into larger merged cell", function() {
        sheet.range("A1:C1").select();
        clipboard.copy();

        sheet.range("D1:G1").merge().select();

        ok(!clipboard.canPaste());
    });
})();
