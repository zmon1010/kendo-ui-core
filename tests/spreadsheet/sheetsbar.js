(function() {
    var element;
    var sheetsBar;


    module("Spreadsheet SheetsBar", {
        setup: function() {
            element = $("<div style='width:400px' class='" + kendo.spreadsheet.View.classNames.sheetsBar + "' />").appendTo(QUnit.fixture);
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
            ok(e.isAddButton);
        });

        var bar = element.data("kendoSheetsBar");

        bar.element.find("a").trigger("click");
    });

    test("sortable is initialized", function() {
        createSheetsBar();

        ok(!!element.data("kendoSortable"));
    });

    test("reorder event is triggered correctly", function() {
        createSheetsBar();

        sheetsBar.bind("reorder", function(e) {
            ok(true);
        });

        element.data("kendoSortable").trigger("end");
    });

    test("div element is wrapping the ul element to allow sortable to work with virtual dom", function() {
        createSheetsBar();

        equal(element.find("div.k-spreadsheet-sheets-items").length, 1);
    });

    test("double click on elements enters tab in edit mode", function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        var bar = element.data("kendoSheetsBar");

        bar.element.find("li:first").trigger("dblclick");

        equal(element.find("input.k-spreadsheet-sheets-editor").length, 1);
    });

    test("entering edit mode and clicking on another tab does not throw error", function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        var bar = element.data("kendoSheetsBar");

        bar.element.find("li:first").trigger("dblclick");
        bar.element.find("li:last").trigger("click");
        ok(true);
    });

    test("leaving edit mode destroys the editor", function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        var bar = element.data("kendoSheetsBar");

        bar.element.find("li:first").trigger("dblclick");
        bar.element.find("li:last").trigger("click");
        ok(!bar._editor);
    });

    test("editing sheet title trigger rename", function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var newTitle = "Foo";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        var bar = element.data("kendoSheetsBar");

        bar.bind("rename", function(e) {
            equal(e.name, newTitle);
        });

        bar.element.find("li:first").trigger("dblclick");
        bar._editor.val(newTitle);

        var event = $.Event("keydown");
        event.target = bar._editor;
        event.which = 13;

        bar._editor.trigger(event);
    });

    test("editing sheet title and pressing escape key cancel changes", 2, function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var newTitle = "Foo";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        var bar = element.data("kendoSheetsBar");

        bar.bind("rename", function(e) {
            ok(!e.name);
        });

        bar.element.find("li:first").trigger("dblclick");
        bar._editor.val(newTitle);

        var event = $.Event("keydown");
        event.target = bar._editor;
        event.which = 27;

        bar._editor.trigger(event);

        ok(!bar._editor);
    });

    test("delete button is rendered", function() {
        var name = "Sheet1";
        var sheets = [
            {name: function() {return name}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);

        equal(element.find(".k-spreadsheet-sheets-remove").length, 1);
    });

    test("delete trigger remove on click", function() {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];

        createSheetsBar();
        sheetsBar.renderSheets(sheets, 0);
        sheetsBar.bind("remove", function () {
            ok(true);
        });

        element.find(".k-spreadsheet-sheets-remove").trigger("click");
    });

    test('scrolling buttons are not rendered if sheet tabs fit', 3, function () {
        var name = "Sheet1";
        var name2 = "Sheet2";
        var sheets = [
            {name: function() {return name}},
            {name: function() {return name2}}
        ];
        createSheetsBar();

        sheetsBar.renderSheets(sheets, 0);
        var buttons = sheetsBar._sheetsWrapper().children(".k-button.k-button-icon.k-button-bare");

        equal(buttons.length, 2);
        ok(!buttons.eq(0).is(".k-tabstrip-prev:visible"));
        ok(!buttons.eq(1).is(".k-tabstrip-next:visible"));
    });

    test('scrolling buttons are rendered if sheet tabs do not fit', 3, function () {
        var sheets = [
            {name: function() {return "Sheet1"}},
            {name: function() {return "Sheet2"}},
            {name: function() {return "Sheet3"}},
            {name: function() {return "Sheet4"}},
            {name: function() {return "Sheet5"}},
            {name: function() {return "Sheet6"}},
            {name: function() {return "Sheet7"}},
            {name: function() {return "Sheet8"}},
            {name: function() {return "Sheet9"}},
            {name: function() {return "Sheet10"}}
        ];

        createSheetsBar();

        sheetsBar.renderSheets(sheets, 3);

        //XX: Second render is not needed in spreadsheet due to the renderSheets is called two times by spreadsheet
        //XX: If needed add additional renderHtml at beginning of the renderSheets method in order
        // to render sheets before calculating the scroll width.

        var buttons = sheetsBar._sheetsWrapper().children(".k-button.k-button-icon.k-button-bare");

        equal(buttons.length, 2);
        ok(buttons.eq(0).is(".k-tabstrip-prev"));
        ok(buttons.eq(1).is(".k-tabstrip-next"));
    });
})();
