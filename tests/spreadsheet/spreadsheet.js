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

            spreadsheet = new kendo.ui.Spreadsheet(element, { });
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

    test("onEditorChange is prevented if model returns error", 1, function() {
        spreadsheet._workbook.execute = function () {
            return { reason: "error" };
        };

        var event = {
            preventDefault: function () {
                ok(true);
            }
        };

        spreadsheet._controller.onEditorChange(event);
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

    test("onEditorBlur prevent focus and navigation if editor is not deactivated", 0, function() {
        spreadsheet._controller.editor.isFiltered = function() {
            return false;
        };

        spreadsheet._controller.editor.isActive = function() {
            return true;
        };

        spreadsheet._controller.editor.deactivate = function() {
            return;
        };

        spreadsheet._controller.clipboardElement = {
            focus: function() {
                ok(true);
            }
        };

        spreadsheet._controller.navigator = {
            navigateInSelection: function() {
                ok(true);
            }
        };

        spreadsheet._controller.onEditorBlur();
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

    test("edit errors prevent executing toolbar commands", 1, function() {
        spreadsheet._workbook._view.editor.isActive = function(e) {
            return true;
        };

        spreadsheet._workbook._view.editor.deactivate = function() {
            //commands are executed on deativate event which is not called
            //when validaiton error occurs
            ok(true);
        };

        spreadsheet._workbook._view.openDialog = function() {
            ok(false);
        };

        spreadsheet._controller.onDialogRequest({ options: {}});
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

    test("editor value is set when revert action is received", 1, function() {
        spreadsheet._workbook._view.editor.value = function() {
            ok(true);
        }

        spreadsheet._controller.enableEditor(true, true, {
            action: "revert"
        });
    });

    test("editor value is not set when close action is received", 0, function() {
        spreadsheet._workbook._view.editor.value = function() {
            ok(false);
        }

        spreadsheet._controller.enableEditor(true, true, {
            action: "close"
        });
    });

    test("edit errors clear last command queue", 1, function() {
        spreadsheet._lastCommandRequest = {
            callback: function() {
                ok(false);
            },
            options: {}
        };

        spreadsheet._workbook.execute = function(e) {
            return {
                reason: "error"
            };
        };

        spreadsheet._controller._execute({});

        ok(spreadsheet._controller._lastCommandRequest === null);
    });

    test("edit errors does not try deactivate editor if it is not active", 1, function() {
        spreadsheet._workbook._view.editor.isActive = function(e) {
            return false;
        };

        spreadsheet._workbook._view.showError = function(options, callback) {
            ok(!callback);
        };

        spreadsheet._workbook.execute = function(e) {
            return {
                reason: "error"
            };
        };

        spreadsheet._controller._execute({});
    });

    test("edit cell execute queued toolbar commands", 2, function() {
        spreadsheet._workbook._view.editor.isActive = function(e) {
            return true;
        };

        spreadsheet._workbook._view.editor.deactivate = function() {
            ok(true);
            spreadsheet._workbook._view.editor.trigger("deactivate");
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
})();
