(function() {
    var spreadsheet;
    var element;

    module("Spreadsheet toolbar", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createSpreadsheet(options) {
        options = options || { toolbar: true };
        spreadsheet = new kendo.ui.Spreadsheet(element, options);
    }

    test("does not render if option is not set", function() {
        createSpreadsheet({ toolbar: false });

        equal(element.find(".k-toolbar").length, 0);
    });

    test("renders if option is set", function() {
        createSpreadsheet({ toolbar: true });

        equal(element.find(".k-toolbar").length, 1);
    });

    test("sets toolbar field", function() {
        createSpreadsheet();

        ok(spreadsheet.toolbar instanceof kendo.ui.ToolBar);
    });
})();
