(function() {
    var spreadsheet;

    module("Spreadsheet API", {
        setup: function() {
            var element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("activeSheet returns a sheet", function() {
        ok(spreadsheet.activeSheet() instanceof kendo.spreadsheet.Sheet);
    })
})();
