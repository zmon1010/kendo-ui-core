(function() {
    var element;
    var sheetsBar;


    module("Spreadsheet SheetsBar", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function createSheetsBar(options) {
        options = options || {};
        sheetsBar = new kendo.spreadsheet.SheetsBar(element, options);
    }

    test("initialized correctly", function() {
        createSheetsBar();

        var bar = element.data("kendoSheetsBar");
        ok(bar instanceof kendo.spreadsheet.SheetsBar);
    });

    test("renders all sheets", function() {
        var name = "Sheet1";

        var sheets = [
            {name: function() {return name}},
            {name: function() {return name}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        var bar = element.data("kendoSheetsBar");
        equal(bar.element.find("li").length, 2);
    });

    test("renders sheets correctly", function() {
        var name = "Sheet1";

        createSheetsBar();
        sheetsBar.renderSheets([{name: function() {return name}}], 0);

        var bar = element.data("kendoSheetsBar");
        equal(bar.element.find("li:first").text(), name);
    });

    test("renders active sheet correctly", function() {
        var name = "Sheet1";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 1);

        var bar = element.data("kendoSheetsBar");
        equal(bar.element.find("li:last").text(), name);
        ok(bar.element.find("li:first").hasClass("k-spreadsheet-sheets-bar-inactive"));
    });

    test("renders inactive sheet correctly", function() {
        var name = "Sheet1";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 1);

        var bar = element.data("kendoSheetsBar");
        equal(bar.element.find("li:last").text(), name);
        ok(bar.element.find("li:last").hasClass("k-spreadsheet-sheets-bar-active"));
    });

    test("clicks on elements trigger select event", function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 1);

        sheetsBar.bind("select", function(e) {
           equal(e.name, name);
        });

        var bar = element.data("kendoSheetsBar");

        bar.element.find("li:first").trigger("click");
    });

    test("render add sheet button", function() {
        var name = "Sheet1";

        var sheets = [
            {name: function() {return name}}
        ];

        createSheetsBar();

        var bar = element.data("kendoSheetsBar");

        equal(bar.element.find("a").length, 1);
        ok(bar.element.find("a").hasClass("k-spreadsheet-sheets-bar-add"));
    });


    test("clicks on add button trigger select event", function() {
        createSheetsBar();

        sheetsBar.bind("select", function(e) {
            debugger;
            ok(e.isAddButton);
        });

        var bar = element.data("kendoSheetsBar");

        bar.element.find("a").trigger("click");
    });
})();
