(function() {
    var spreadsheet;
    var element;

    function initSpreadsheet(element, options) {
        spreadsheet = new kendo.ui.Spreadsheet(element, options);
    }

    // ------------------------------------------------------------
    module("Spreadsheet API", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            initSpreadsheet(element, { rows: 10, columns: 10, toolbar: false });
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

    test("refresh does not trigger render method when editor is changed", 0, function() {
        spreadsheet.bind("render", function() {
            ok(true);
        }).refresh({ editorChange: true });
    });

    test("refresh does call view render method when editor is changed", 0, function() {
        spreadsheet._view.render = function() {
            ok(true);
        };

        spreadsheet.refresh({ editorChange: true });
    });

    test("refresh does not set view and controller sheet when editor is changed", 0, function() {
        spreadsheet._view.sheet = function() {
            ok(true);
        };

        spreadsheet._controller.sheet = function() {
            ok(true);
        };

        spreadsheet.refresh({ editorClose: true });
    });

    test("refresh does not refresh workbook when editor is changed", 0, function() {
        spreadsheet._workbook.refresh = function() {
            ok(true);
        };

        spreadsheet.refresh({ editorClose: true });
    });

    test("refresh disables formulabar when active cell is disabled", 1, function() {
        var range = spreadsheet.activeSheet().range("A1");

        range.enable(false);
        spreadsheet.activeSheet().activeCell(new kendo.spreadsheet.CellRef(0, 0));

        spreadsheet.refresh();

        equal(spreadsheet._view.editor.barInput.enable(), false);
    });

    test("workbook change event is triggered when edit command execute returns no response", 1, function() {
        spreadsheet._workbook.execute = function () {
            return;
        };

        spreadsheet._workbook.bind("change", function(reason) {
            ok(reason.editorClose);
        });

        spreadsheet._controller._execute({ command: "EditCommand" });
    });

    test("onMouseDown is prevented if editor is not deactivated", 1, function() {
        spreadsheet._workbook.execute = function () {
            return { reason: "error" };
        };

        spreadsheet._controller.editor.isActive = function() {
            return true;
        };

        spreadsheet._controller.editor.deactivate = function() {
            return;
        };

        spreadsheet._controller.objectAt = function() {
            return {};
        };

        var event = {
            preventDefault: function () {
                ok(true);
            }
        };

        spreadsheet._controller.onMouseDown(event);
    });

    test("onMouseDown is prevented if editor is not deactivated", 1, function() {
        spreadsheet._controller.editor.isActive = function() {
            return true;
        };

        spreadsheet._controller.editor.deactivate = function() {
            return;
        };

        spreadsheet._controller.objectAt = function() {
            return {};
        };

        var event = {
            preventDefault: function () {
                ok(true);
            }
        };

        spreadsheet._controller.onMouseDown(event);
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
            equal(sheet.name(), "Sheet2");
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

    test("executing toolbar commands does not try deactvate the editor", 1, function() {
        spreadsheet._workbook._view.editor.isActive = function(e) {
            return false;
        };

        spreadsheet._workbook._view.editor.deactivate = function() {
            ok(false);
        };

        spreadsheet.enableEditor = function(enable) {
            ok(false);
        };

        spreadsheet._workbook._view.openDialog = function() {
            ok(true);
        };

        spreadsheet._controller.onDialogRequest({ options: {}});
    });

    test("fromFile forwards call to workbook", function() {
        var BLOB = {};
        var NAME = "foo";

        spreadsheet._workbook.fromFile = function(blob, name) {
            equal(blob, BLOB);
            equal(name, NAME);
        };

        spreadsheet.fromFile(BLOB, NAME);
    });

    test("cellContextMenu returns the menu instance", function () {
        equal(spreadsheet.cellContextMenu(), spreadsheet._view.cellContextMenu);
    });

    test("rowHeaderContextMenu returns the menu instance", function () {
        equal(spreadsheet.rowHeaderContextMenu(), spreadsheet._view.rowHeaderContextMenu);
    });

    test("colHeaderContextMenu returns the menu instance", function () {
        equal(spreadsheet.colHeaderContextMenu(), spreadsheet._view.colHeaderContextMenu);
    });

    asyncTest("activeSheet method triggers selectSheet event", 2, function () {
        var newSheet = spreadsheet.insertSheet();
        var oldSheet = spreadsheet.activeSheet();

        spreadsheet.bind("selectSheet", function(e) {
            start();
            equal(spreadsheet, e.sender);
            equal(newSheet, e.sheet);
        });

        spreadsheet.activeSheet(newSheet);
    });

    asyncTest("selectSheet event", 1, function () {
        var newSheet = spreadsheet.insertSheet();
        var oldSheet = spreadsheet.activeSheet();

        spreadsheet.bind("selectSheet", function(e) {
            setTimeout(function() {
                start();
                equal(oldSheet.name(), spreadsheet.activeSheet().name());
            });

            e.preventDefault();
        });

        spreadsheet.activeSheet(newSheet);
    });

    asyncTest("renameSheet method triggers renameSheet event", 3, function () {
        var activeSheet = spreadsheet.activeSheet();
        var oldName = activeSheet.name();
        var newName = "newName";

        spreadsheet.bind("renameSheet", function(e) {
            start();
            equal(spreadsheet, e.sender);
            equal(activeSheet, e.sheet);
            equal(newName, e.newSheetName);
        });

        spreadsheet.renameSheet(activeSheet, newName);
    });

    asyncTest("renameSheet event can be prevented", 1, function () {
        var activeSheet = spreadsheet.activeSheet();
        var oldName = activeSheet.name();

        spreadsheet.bind("renameSheet", function(e) {
            setTimeout(function() {
                start();
                equal(oldName, spreadsheet.activeSheet().name());
            });

            e.preventDefault();
        });

        spreadsheet.bind("change", function(e) {
            ok(false);
        });

        spreadsheet.renameSheet(activeSheet, "newName");
    });

    asyncTest("insertSheet method triggers insertSheet event", 1, function () {
        spreadsheet.bind("insertSheet", function(e) {
            start();
            equal(spreadsheet, e.sender);
        });

        spreadsheet.insertSheet();
    });

    asyncTest("insertSheet event can be prevented", 1, function () {
        var sheetsCount = spreadsheet.sheets().length;

        spreadsheet.bind("insertSheet", function(e) {
            setTimeout(function() {
                start();
                equal(sheetsCount, spreadsheet.sheets().length);
            });

            e.preventDefault();
        });

        spreadsheet.bind("change", function(e) {
            ok(false);
        });

        spreadsheet.insertSheet();
    });

    asyncTest("removeSheet method triggers removeSheet event", 2, function () {
        spreadsheet.insertSheet();

        spreadsheet.bind("removeSheet", function(e) {
            start();
            equal(spreadsheet, e.sender);
            equal(spreadsheet.activeSheet(), e.sheet);
        });

        spreadsheet.removeSheet(spreadsheet.activeSheet());
    });

    asyncTest("removeSheet event can be prevented", 1, function () {
        spreadsheet.insertSheet();

        var sheetsCount = spreadsheet.sheets().length;

        spreadsheet.bind("removeSheet", function(e) {
            setTimeout(function() {
                start();
                equal(sheetsCount, spreadsheet.sheets().length);
            });

            e.preventDefault();
        });

        spreadsheet.bind("change", function(e) {
            ok(false);
        });

        spreadsheet.removeSheet(spreadsheet.activeSheet());
    });
    // ------------------------------------------------------------
    module("Spreadsheet options", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("sheetsbar option is working", function() {
        initSpreadsheet(element, { sheetsbar: false });
        ok(element.find('[data-role="sheetsbar"]').length == 0);
    });

    test("loads sheets from options", function() {
        initSpreadsheet(element, {
            toolbar: false,
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

})();
