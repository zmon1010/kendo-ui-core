(function() {
    var spreadsheet;
    var element;

    module("Spreadsheet API", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("activeSheet returns a sheet", function() {
        ok(spreadsheet.activeSheet() instanceof kendo.spreadsheet.Sheet);
    });

    test("refresh triggers the render method", function() {
        spreadsheet.bind("render", function() {
            ok(true);
        }).refresh();
    });

    test("renders when the active sheet changes", 1, function() {
        spreadsheet.bind("render", function() {
            ok(true);
        }).activeSheet().trigger("change");
    });

    test("doesn't render when autoRefresh is set to false", 0, function() {
        spreadsheet.bind("render", function() {
            ok(false);
        }).autoRefresh(false).activeSheet().trigger("change");
    });

    test("setting autoRefresh to true renders the spreadhseet", 1, function() {
        spreadsheet.bind("render", function() {
            ok(true);
        }).autoRefresh(false).autoRefresh(true);
    });

    test("loads sheets from options", function() {
        kendo.destroy(QUnit.fixture);
        spreadsheet = new kendo.ui.Spreadsheet(element, {
            sheets: [
                {
                    rows: [
                        {
                            cells: [
                                {
                                    background: "red"
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        equal(spreadsheet.activeSheet().range("A1").background(), "red");
    });

    test("insertSheet method calls corresponding method in workbook", function () {
        spreadsheet._workbook.insertSheet = function(options) {
            equal(options.index, 1);
            ok(true);
        };

        spreadsheet.insertSheet({index: 1});
    });

    test("removeSheet method triggers render event when removed sheet is not the active one", function () {
        spreadsheet.insertSheet();

        spreadsheet.bind("render", function() {
            ok(true);
        });

        spreadsheet.removeSheet(spreadsheet.getSheets()[1]);
    });

    test("removeSheet method triggers render event when removed sheet the active one", function () {
        spreadsheet.insertSheet();

        spreadsheet.bind("render", function() {
            ok(true);
        });

        spreadsheet.removeSheet(spreadsheet.getSheets()[0]);
    });

    test("getSheets method calls corresponding method in workbook", function () {
        spreadsheet._workbook.getSheets = function() {
            ok(true);
        };

        spreadsheet.getSheets();
    });

    test("getSheetByName method calls corresponding method in workbook", function () {
        spreadsheet._workbook.getSheetByName = function(sheetName) {
            ok(sheetName);
            ok(true);
        };

        spreadsheet.getSheetByName("SheetName");
    });

    test("getSheetIndex method calls corresponding method in workbook", function () {
        spreadsheet._workbook.getSheetIndex = function(sheet) {
            ok(sheet);
            ok(true);
        };

        spreadsheet.getSheetIndex({});
    });

    test("getSheetByIndex method calls corresponding method in workbook", function () {
        spreadsheet._workbook.getSheetByIndex = function(index) {
            equal(index, 1);
            ok(true);
        };

        spreadsheet.getSheetByIndex(1);
    });

    test("renameSheet method calls corresponding method in workbook", function () {
        spreadsheet._workbook.renameSheet = function(sheet, newSheetName) {
            equal(sheet, "sheet");
            equal(newSheetName, "newSheetName");
            ok(true);
        };

        spreadsheet.renameSheet("sheet", "newSheetName");
    });
})();
