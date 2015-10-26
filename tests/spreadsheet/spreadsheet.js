(function() {
    var spreadsheet;
    var element;

    function initSpreadsheet(element, options) {
        spreadsheet = new kendo.ui.Spreadsheet(element, options);
    }

    module("Spreadsheet API", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { ассад: "asdsad"});
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

        spreadsheet.removeSheet(spreadsheet.sheets()[1]);
    });

    test("removeSheet method triggers render event when removed sheet the active one", function () {
        spreadsheet.insertSheet();

        spreadsheet.bind("render", function() {
            ok(true);
        });

        spreadsheet.removeSheet(spreadsheet.sheets()[0]);
    });

    test("sheets method calls corresponding method in workbook", function () {
        spreadsheet._workbook.sheets = function() {
            ok(true);
        };

        spreadsheet.sheets();
    });

    test("sheetByName method calls corresponding method in workbook", function () {
        spreadsheet._workbook.sheetByName = function(sheetName) {
            ok(sheetName);
            ok(true);
        };

        spreadsheet.sheetByName("SheetName");
    });

    test("sheetIndex method calls corresponding method in workbook", function () {
        spreadsheet._workbook.sheetIndex = function(sheet) {
            ok(sheet);
            ok(true);
        };

        spreadsheet.sheetIndex({});
    });

    test("sheetByIndex method calls corresponding method in workbook", function () {
        spreadsheet._workbook.sheetByIndex = function(index) {
            equal(index, 1);
            ok(true);
        };

        spreadsheet.sheetByIndex(1);
    });

    test("renameSheet method calls corresponding method in workbook", function () {
        spreadsheet._workbook.renameSheet = function(sheet, newSheetName) {
            equal(sheet, "sheet");
            equal(newSheetName, "newSheetName");
            ok(true);
        };

        spreadsheet.renameSheet("sheet", "newSheetName");
    });

    test("moveSheetToIndex method triggers change event", function () {
        spreadsheet.insertSheet();

        spreadsheet.bind("render", function() {
            ok(true);
        });

        spreadsheet.moveSheetToIndex(spreadsheet.sheets()[1], 0);
    });

    test("moveSheetToIndex method calls corresponding method in workbook", function () {
        spreadsheet.insertSheet();

        spreadsheet._workbook.moveSheetToIndex = function(sheet, index) {
            equal(sheet._name, "Sheet2");
            equal(index, 0);
        };

        spreadsheet.moveSheetToIndex(spreadsheet.sheets()[1], 0);
    });

    test("openDialog opens dialog", function() {
        spreadsheet.openDialog("formatCells");

        equal($(".k-spreadsheet-format-cells").length, 1);
    });

    test("dialogs allow to execute commands", function() {
        var dialog = spreadsheet.openDialog("formatCells");
        var opts = { bar: true };

        spreadsheet._workbook.execute = function(e) {
            equal(e.command, "foo");
            equal(e.options, opts);
        };

        dialog.trigger("action", {
            command: "foo",
            options: opts
        });
    });

    module("Spreadsheet options", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("activeSheet returns a sheet", function() {
        initSpreadsheet(element, { sheetsbar: false });
        ok(element.find('[data-role="sheetsbar"]').length == 0);
    });
})();
