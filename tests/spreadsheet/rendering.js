(function() {
    var spreadsheet;
    var element;

    module("Spreadsheet rendering", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("adds wrapper classes", function() {
        ok(element.hasClass("k-spreadsheet"));
        ok(element.hasClass("k-widget"));
    });
})();
