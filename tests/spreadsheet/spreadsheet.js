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

    test("insertSheet method insert sheet correctly to sheetsByIndex collection", function() {
        spreadsheet.insertSheet();

        equal(spreadsheet._sheetsByIndex.length, 2);
    });

    test("insertSheet method insert sheet correctly to sheets dictionary", function() {
        spreadsheet.insertSheet();

        equal(spreadsheet._sheetsByIndex.length, 2);
    });

    test("insertSheet method insert sheet by name", function() {
        var sheetName = "custom #$% __)1Name";
        spreadsheet.insertSheet({name: sheetName});

        equal(spreadsheet._sheets[sheetName].name(), sheetName);
    });

    test("insertSheet method insert sheet index", function() {
        var sheetName = "custom #$% __)1Name";
        spreadsheet.insertSheet({name: sheetName});

        equal(spreadsheet._sheets[sheetName].name(), sheetName);
    });

    test("insertSheet method insert sheet at specified index", function() {
        var sheetIndex = 0;
        var name = "customSheet";
        spreadsheet.insertSheet({index: sheetIndex, name: "customSheet"});

        equal(spreadsheet._sheetsByIndex[0], name);
    });

    test("insertSheet method insert sheet with unique name", function() {
        spreadsheet.insertSheet();

        equal(spreadsheet._sheets[spreadsheet._sheetsByIndex[1]].name(), "Sheet2");
    });

    test("insertSheet method does not insert sheet with existing name", function() {
        spreadsheet.insertSheet({name: "Sheet1"});

        equal(spreadsheet._sheetsByIndex.length, 1);
    });

    test("insertSheet method insert sheet and adds 'change' event handler", function() {
        spreadsheet.insertSheet();

        equal(spreadsheet._sheets[spreadsheet._sheetsByIndex[1]]._events.change.length, 1);
    });

    test("insertSheet method insert sheet to formula context", function() {
        spreadsheet.insertSheet();

        ok(spreadsheet._context.sheets[spreadsheet._sheetsByIndex[1]]);
    });

    test("insertSheet method insert sheet by options", function() {
        var sheetName = "custom #$% __)1Name";
        var rows = 12;
        var columns = 23;
        var rowHeight = 8;
        var columnWidth = 32;
        var headerHeight = 19;
        var headerWidth = 17;

        spreadsheet.insertSheet({
            name: sheetName,
            rows: rows,
            columns: columns,
            rowHeight: rowHeight,
            columnWidth: columnWidth,
            headerHeight: headerHeight,
            headerWidth: headerWidth
        });

        equal(spreadsheet._sheets[sheetName].name(),sheetName);
    });
})();
