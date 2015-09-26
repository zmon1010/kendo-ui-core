(function() {
    var element;
    var spreadsheet;
    var saveAsExcel = kendo.ui.Spreadsheet.fn.saveAsExcel;

    module("Excel Export", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
            spreadsheet = new kendo.ui.Spreadsheet(element);
            kendo.ui.Grid.fn.saveAsExcel = $.noop;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.ui.Grid.fn.saveAsExcel = saveAsExcel;
        }
    });

    test("renders toolbar button for save command", function() {
        equal(element.find("span.k-icon.k-i-xlsa").length, 1);
    });

    test("the excelExport event is triggered", 1, function() {
        spreadsheet.bind("excelExport", function() {
            ok(true);
        });

        stubMethod(kendo.ooxml.Workbook.fn, "toDataURL", function() {
            return "";
        }, function() {
            stubMethod(kendo, "saveAs", function(options) { }, function() {
                kendo.ui.Spreadsheet.fn.saveAsExcel = saveAsExcel;
                element.getKendoSpreadsheet().saveAsExcel();
            });
        });
    });

    test("the excelExport event is cancellable", 0, function() {
        spreadsheet.bind("excelExport", function(e) {
            e.preventDefault();
        });

        stubMethod(kendo.ooxml.Workbook.fn, "toDataURL", function() {
            return "";
        }, function() {
            stubMethod(kendo, "saveAs", function(options) {
                ok(false);
            }, function() {
                kendo.ui.Spreadsheet.fn.saveAsExcel = saveAsExcel;
                element.getKendoSpreadsheet().saveAsExcel();
            });
        });
    });

    test("saveAsExcel passes through forceProxy option", function() {
        spreadsheet.options.excel.forceProxy = true;

        stubMethod(kendo.ooxml.Workbook.fn, "toDataURL", function() {
            return "";
        }, function() {
            stubMethod(kendo, "saveAs", function(options) {
                ok(options.forceProxy);
            }, function() {
                kendo.ui.Spreadsheet.fn.saveAsExcel = saveAsExcel;
                element.getKendoSpreadsheet().saveAsExcel();
            });
        });
    });

}());
