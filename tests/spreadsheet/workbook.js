(function() {
    var element;
    var workbook;

    var defaults = kendo.ui.Spreadsheet.prototype.options;

    module("Workbook API", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            var defaultOptions = kendo.ui.Spreadsheet.prototype.options;

            workbook = new kendo.spreadsheet.Workbook(defaultOptions);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("sheetIndex method works correctly", function() {
        workbook.insertSheet();

        equal(workbook.sheetIndex(workbook.sheets()[1]), 1);
    });

    test("sheetByIndex method works correctly", function() {
        workbook.insertSheet();

        equal(workbook.sheetByIndex(1).name(), "Sheet2");
    });

    test("insertSheet method insert sheet correctly to sheets dictionary", function() {
        workbook.insertSheet();

        equal(workbook._sheets.length, 2);
    });

    test("insertSheet method insert sheet by name", function() {
        var sheetName = "custom #$% __)1Name";
        workbook.insertSheet({name: sheetName});

        equal(workbook.sheetByName(sheetName).name(), sheetName);
    });

    test("insertSheet method insert sheet index", function() {
        var sheetName = "custom #$% __)1Name";
        workbook.insertSheet({name: sheetName});

        equal(workbook.sheetByName(sheetName).name(), sheetName);
    });

    test("insertSheet method insert sheet at specified index", function() {
        var sheetIndex = 0;
        var name = "customSheet";
        workbook.insertSheet({index: sheetIndex, name: "customSheet"});

        equal(workbook.sheetByIndex(0).name(), name);
    });

    test("insertSheet method insert sheet with unique name", function() {
        workbook.insertSheet();

        equal(workbook.sheetByIndex(1).name(), "Sheet2");
    });

    test("insertSheet method does not insert sheet with existing name", function() {
        workbook.insertSheet({name: "Sheet1"});

        equal(workbook._sheets.length, 1);
    });

    test("insertSheet method insert sheet and adds 'change' event handler", function() {
        workbook.insertSheet();

        equal(workbook.sheetByIndex(1)._events.change.length, 1);
    });

    test("insertSheet method insert sheet by options", function() {
        var sheetName = "custom #$% __)1Name";
        var rows = 12;
        var columns = 23;
        var rowHeight = 8;
        var columnWidth = 32;
        var headerHeight = 19;
        var headerWidth = 17;

        workbook.insertSheet({
            name: sheetName,
            rows: rows,
            columns: columns,
            rowHeight: rowHeight,
            columnWidth: columnWidth,
            headerHeight: headerHeight,
            headerWidth: headerWidth
        });

        equal(workbook.sheetByName(sheetName).name(),sheetName);
    });

    test("insertSheet method support data option", function() {
        var sheetName = "custom #$% __)1Name";

        var data = { rows: [ { cells: [ { background: "red" }, { background: "green" } ] } ] };

        workbook.insertSheet({
            name: sheetName,
            data: data
        });

        equal(workbook.sheetByName(sheetName).range("A1").background(), "red");
        equal(workbook.sheetByName(sheetName).range("B1").background(), "green");
    });

    test("renameSheet method renames sheet correctly", function() {
        var newName = "0-89-09";
        var oldName = workbook.activeSheet(undefined, function() {}).name();

        var renamedSheet = workbook.renameSheet(workbook.activeSheet(), newName);

        //old name is removed
        ok(!workbook.sheetByName(oldName));

        //new name is applied correctly
        equal(workbook.sheetByName(newName).name(), newName);
        equal(workbook.activeSheet().name(), newName);
        ok(renamedSheet.name() === newName);
    });

    test("sheetByName method works correctly", function() {
        var name = workbook._sheets[0].name();

        equal(workbook.sheetByName(name).name(), name);
    });

    test("removeSheet method works correctly", function() {
        workbook.insertSheet();

        var sheet = workbook.sheetByIndex(0);
        var name = workbook.sheetByIndex(1).name();

        workbook.removeSheet(sheet);

        ok(jQuery.isEmptyObject(sheet._events));

        equal(workbook.sheetByIndex(0).name(), name);
    });

    test("removeSheet method does not remove sheet when current sheet is the last one", function() {
        var sheet = workbook._sheets[0];

        workbook.removeSheet(sheet);

        equal(workbook.sheets().length, 1);
    });

    test("removeSheet method changes sheet if current sheet is activeSheet and index is 0", function() {
        workbook.insertSheet();

        var sheet = workbook.sheetByIndex(0);
        var name = workbook.sheetByIndex(1).name();

        workbook.removeSheet(sheet);

        equal(workbook.activeSheet().name(), name);
    });

    test("removeSheet method changes sheet if current sheet is activeSheet and index is 1", function() {
        workbook.insertSheet();

        var sheet = workbook.sheetByIndex(1);
        var name = workbook.sheetByIndex(0).name();

        workbook.removeSheet(sheet);

        equal(workbook.activeSheet().name(), name);
    });

    test("activeSheet sets active sheet", function() {
        workbook.insertSheet();

        var sheet = workbook._sheets[1];

        workbook.activeSheet(sheet);

        equal(workbook.activeSheet().name(), sheet.name());
    });

    test("sheets method returns correctly all sheets", function() {
        equal(workbook.sheets().length, 1);

        workbook.insertSheet();

        equal(workbook.sheets().length, 2);
    });

    test("sheetByName save sheets indexes to cache", function() {
        var sheet = workbook.insertSheet();

        workbook.sheetByName(sheet.name());

        equal(workbook._sheetsSearchCache[sheet.name().toLowerCase()], 1);
    });

    test("sheetIndex save found sheets to cache", function() {
        workbook.insertSheet();

        workbook.sheetIndex(workbook.sheets()[1]);

        equal(workbook._sheetsSearchCache[workbook.sheets()[1].name().toLowerCase()], 1);
    });

    test("removeSheet restart found sheets cache", function() {
        workbook.insertSheet();

        workbook.sheetIndex(workbook.sheets()[1]);

        workbook.removeSheet(workbook.sheets()[1]);

        equal(workbook._sheetsSearchCache[workbook.sheets()[0].name()], undefined);
    });

    test("renameSheet restart found sheets cache", function() {
        workbook.insertSheet();

        workbook.sheetIndex(workbook.sheets()[1]);

        workbook.renameSheet(workbook.sheets()[1], "newName");

        equal(workbook._sheetsSearchCache[workbook.sheets()[0].name()], undefined);
    });

    test("moveSheetToIndex moves the sheet correctly", function() {
        workbook.insertSheet();

        var sheet = workbook.sheets()[1];
        var name = workbook.sheets()[1].name();

        workbook.moveSheetToIndex(sheet, 0);

        equal(workbook.sheets()[0].name(), name);
    });

    test("moveSheetToIndex trigger workbook change with correct reason", function() {
        workbook.insertSheet();

        var sheet = workbook.sheets()[1];
        var name = workbook.sheets()[1].name();

        workbook.bind("change", function (reason) {
            ok(reason.sheetSelection === true);
        });

        workbook.moveSheetToIndex(sheet, 0);
    });

    test("insertSheet trigger workbook change with correct reason", function() {
        workbook.bind("change", function (reason) {
            ok(reason.sheetSelection === true);
        });

        workbook.insertSheet();
    });

    test("sheet insertRow triggers workbook change", function() {
        var sheet = workbook.activeSheet();

        workbook.bind("change", function (reason) {
            ok(reason.ref);
            ok(reason.insertRow);
            equal(reason.insertRow.index, 2);
        });

        sheet.insertRow(2);
    });

    test("sheet deleteRow triggers workbook change", function() {
        var sheet = workbook.activeSheet();

        workbook.bind("change", function (reason) {
            ok(reason.ref);
            ok(reason.deleteRow);
            equal(reason.deleteRow.index, 2);
        });

        sheet.deleteRow(2);
    });

    test("sheet insertColumn triggers workbook change", function() {
        var sheet = workbook.activeSheet();

        workbook.bind("change", function (reason) {
            ok(reason.ref);
            ok(reason.insertColumn);
            equal(reason.insertColumn.index, 2);
        });

        sheet.insertColumn(2);
    });

    test("sheet insertRow triggers workbook change", function() {
        var sheet = workbook.activeSheet();

        workbook.bind("change", function (reason) {
            ok(reason.ref);
            ok(reason.insertRow);
            equal(reason.insertRow.index, 2);
        });

        sheet.insertRow(2);
    });

    test("renameSheet trigger workbook change with correct reason", function() {
        workbook.insertSheet();

        workbook.sheetIndex(workbook.sheets()[1]);

        workbook.bind("change", function (reason) {
            ok(reason.sheetSelection === true);
        });

        workbook.renameSheet(workbook.sheets()[1], "newName");
    });

    test("removeSheet trigger workbook change with correct reason", function() {
        workbook.insertSheet();

        workbook.sheetIndex(workbook.sheets()[1]);

         workbook.bind("change", function (reason) {
            ok(reason.sheetSelection === true);
        });

        workbook.removeSheet(workbook.sheets()[1]);
    });

    test("insertSheet set sheet datasource is passed in the options", function() {
        var dataSource = new kendo.data.DataSource({});

        var sheet = workbook.insertSheet({ dataSource: dataSource });

        strictEqual(sheet.dataSourceBinder.dataSource, dataSource);
    });

    test("execute sets activeCellSelection to command range if in edit mode", function() {
        stub(workbook.activeSheet(), {
            activeCellSelection: workbook.activeSheet().activeCellSelection
        });

        workbook.execute({
            command: "EditCommand",
            options: {
                value: "",
                editActiveCell: true
            }
        });

        equal(workbook.activeSheet().calls("activeCellSelection"), 1);
    });

    test("execute sets command range to operatingRange, if set", function() {
        var sheet = workbook.insertSheet({ rows: 4, columns: 4 });

        sheet.range("A1:B2").values([ [ 1, 2 ], [ 3, 4 ] ]).filter(true);

        workbook.execute({
            command: "ApplyFilterCommand",
            options: {
                operatingRange: sheet.range("A1:B2"),
                valueFilter: {
                    values: [ 1 ]
                }
            }
        });

        var stack = workbook.undoRedoStack.stack;
        equal(stack[stack.length-1].range()._ref.toString(), "A1:B2");
    });

    // ------------------------------------------------------------
    (function() {
        var readExcel;
        var workbook;

        module("Workbook API / fromFile", {
            setup: function() {
                element = $("<div>").appendTo(QUnit.fixture);
                workbook = new kendo.spreadsheet.Workbook({});

                readExcel = kendo.spreadsheet.readExcel;
                kendo.spreadsheet.readExcel = function() {};
            },
            teardown: function() {
                kendo.destroy(QUnit.fixture);

                kendo.spreadsheet.readExcel = readExcel;
            }
        });

        test("clears sheets", function() {
            var sheet = workbook.sheetByIndex(0);
            workbook.fromFile({});

            ok(sheet != workbook.sheetByIndex(0));
        });

        test("clears sheet search cache", function() {
            workbook.insertSheet({ name: "Foo" });
            workbook.sheetIndex("Foo");

            workbook.fromFile({});

            equal(workbook.sheetIndex("Foo"), -1);
        });

        test("unbinds sheets", function() {
            var sheet = workbook.sheetByIndex(0);
            sheet.unbind = function() {
                ok(true);
            };

            workbook.fromFile({});
        });

        test("reads file", function() {
            var FILE = {};

            kendo.spreadsheet.readExcel = function(file) {
                equal(file, FILE);
            };

            workbook.fromFile(FILE);
        });
    })();

})();
