(function() {
    var element;
    var sheet;
    var spreadsheet;

    module("spreadsheet view", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element, { rows: 3, columns: 3 });

            sheet = spreadsheet.activeSheet();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function singleCell(cell) {
        return { rows: [ { cells: [ cell ] } ] };
    }

    function firstDataCell(element) {
        return element.find(".k-spreadsheet-data td").eq(0);
    }

    test("renders border color", function() {
        sheet.fromJSON(singleCell({ borderRight: { color: "rgb(255, 0, 0)" } }));

        equal(firstDataCell(element).css("borderRightColor"), "rgb(255, 0, 0)");
    });

    test("renders border size", function() {
        sheet.fromJSON(singleCell({ borderBottom: { size: "2px" } }));

        equal(firstDataCell(element)[0].style.borderBottomWidth, "2px");
    });

    test("renders fontSize", function() {
        sheet.fromJSON(singleCell({ fontSize: 8 }));

        equal(firstDataCell(element).css("fontSize"), "8px");
    });

    test("does not render null border", function() {
        sheet.fromJSON(singleCell({ borderBottom: null }));

        equal(firstDataCell(element)[0].style.borderBottomStyle, "");
    });

    test("renders border color on cells with background and no border", function() {
        sheet.fromJSON(singleCell({ background: "rgb(255, 0, 0)" }));

        equal(firstDataCell(element).css("borderBottomColor"), "rgb(255, 0, 0)");
        equal(firstDataCell(element).css("borderRightColor"), "rgb(255, 0, 0)");
        equal(firstDataCell(element).css("borderLeftColor"), "rgb(255, 0, 0)");
        equal(firstDataCell(element).css("borderTopColor"), "rgb(255, 0, 0)");
    });

    test("borderLeft renders right border on previous cell", function() {
        sheet.fromJSON({ rows: [
            { cells: [
                { },
                { borderLeft: { size: "3px" } }
            ] }
        ] });

        var leftCell = element.find(".k-spreadsheet-data tr:eq(0) td:eq(0)");
        var rightCell = element.find(".k-spreadsheet-data tr:eq(0) td:eq(1)");

        equal(leftCell[0].style.borderRightWidth, "3px");
    });

    test("borderLeft of first cell can be set", function() {
        sheet.fromJSON(singleCell({ borderLeft: { size: "1px", color: "rgb(255, 0 0)" } }));

        ok(true);
    });

    test("borderTop renders bottom border on cell above", function() {
        sheet.fromJSON({ rows: [
            { cells: [
                { }
            ] },
            { cells: [
                { borderTop: { size: "3px" } }
            ] }
        ] });

        var topCell = element.find(".k-spreadsheet-data tr:eq(0) td:eq(0)");
        var bottomCell = element.find(".k-spreadsheet-data tr:eq(1) td:eq(1)");

        equal(topCell[0].style.borderBottomWidth, "3px");
    });

    test("borderTop of first cell can be set", function() {
        sheet.fromJSON(singleCell({ borderTop: { size: "1px", color: "rgb(255, 0 0)" } }));

        ok(true);
    });

    test("add 'k-dirty-cell' of first cell when value is not valid", function() {
        var cell = singleCell({
            borderTop: { size: "1px", color: "rgb(255, 0 0)" },
            validation: { from: "10", comparerType: "equalTo", messageTemplate: "Enter valid value!" }
        });
        sheet.fromJSON(cell);

        var topCell = element.find(".k-spreadsheet-data tr:eq(0) td:eq(0)");

        ok(topCell.hasClass("k-dirty-cell"));
    });

    test("add 'k-dirty' element to invalid cell", function() {
        var cell = singleCell({
            borderTop: { size: "1px", color: "rgb(255, 0 0)" },
            validation: { from: "10", comparerType: "equalTo", messageTemplate: "Enter valid value!" }
        });
        sheet.fromJSON(cell);

        var topCell = element.find(".k-spreadsheet-data tr:eq(0) td:eq(0)");
        var flagSpan = topCell.children(".k-dirty");

        equal(flagSpan.length, 1);
        ok(flagSpan[0].nodeName, "SPAN");
    });

    test("add cell title if element is not valid", function() {
        var title = "Enter valid value!";
        var cell = singleCell({
            borderTop: { size: "1px", color: "rgb(255, 0 0)" },
            validation: { from: "10", comparerType: "equalTo", messageTemplate: title }
        });
        sheet.fromJSON(cell);

        var topCell = element.find(".k-spreadsheet-data tr:eq(0) td:eq(0)");

        equal(topCell.attr("title"), title);
    });

    test("renders tabstrip", function() {
        ok(spreadsheet._view.tabstrip instanceof kendo.ui.TabStrip);
        ok($(".k-tabstrip").length);
    });

    test("renders quickAccessToolBar", function() {
        ok($(".k-spreadsheet-quick-access-toolbar").length);
        equal($(".k-spreadsheet-quick-access-toolbar").children().length, 2);
    });

    test("shifts tabstrip tabGroup elements", function() {
        var tabstrip = spreadsheet._view.tabstrip;
        var quickAccessToolBar = $(".k-spreadsheet-quick-access-toolbar");

        equal(tabstrip.tabGroup.css("padding-left"), quickAccessToolBar.outerWidth() + "px");
    });

    test("createFilterMenu creates filter menu for column range", function() {
        sheet.range("A1:B3").filter(true);

        var filterMenu = spreadsheet._view.createFilterMenu(0);

        ok(filterMenu instanceof kendo.spreadsheet.FilterMenu);
        equal(filterMenu.options.range._ref.print(), "R1C1:R3C2");
        equal(filterMenu.options.column, 0);
    });

    test("createFilterMenu creates filter menu for correct column range", function() {
        sheet.range("A1:B3").filter(true);

        var filterMenu = spreadsheet._view.createFilterMenu(1);

        ok(filterMenu instanceof kendo.spreadsheet.FilterMenu);
        equal(filterMenu.options.range._ref.print(), "R1C1:R3C2");
        equal(filterMenu.options.column, 1);
    });

    test("createFilterMenu reuses filter menu if opened twice", function() {
        sheet.range("A1:B3").filter(true);

        var view = spreadsheet._view;
        var filterMenu = view.createFilterMenu(1);

        equal(view.createFilterMenu(1), filterMenu);
    });

    test("do not render clipboard content if in edit mode", function() {
        var view = spreadsheet._view;

        stub(view, {
            renderClipboardContents: view.renderClipboardContents
        });

        sheet._edit(true);
        view.render();

        equal(view.calls("renderClipboardContents"), 0);
    });

    test("renderes filter headers", function() {
        sheet.range("A1:B3").filter(true);

        equal(element.find(".k-spreadsheet-filter").length, 2);
    });

    test("renders filtered state of filter headers", function() {
        sheet.range("A1:B3").filter({
            column: 0,
            filter: new kendo.spreadsheet.ValueFilter({
                values: [ 1 ]
            })
        })

        var activeBottom = element.find(".k-spreadsheet-filter.k-state-active");
        equal(activeBottom.length, 1);
        equal(activeBottom.index(), 1);
    });

    test("renders one filter header on merged cell", function() {
        sheet.range("A1:B3").merge().filter(true);

        equal(element.find(".k-spreadsheet-filter").length, 1);
    });
})();
