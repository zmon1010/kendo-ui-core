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

    test("renders border color", function() {
        sheet.fromJSON(singleCell({ borderRight: { color: "rgb(255, 0, 0)" } }));

        equal(element.find(".k-spreadsheet-data td").css("borderRightColor"), "rgb(255, 0, 0)");
    });

    test("renders border size", function() {
        sheet.fromJSON(singleCell({ borderBottom: { size: "2px" } }));

        equal(element.find(".k-spreadsheet-data td").css("borderBottomWidth"), "2px");
    });

    test("does not render null border", function() {
        sheet.fromJSON(singleCell({ borderBottom: null }));

        equal(element.find(".k-spreadsheet-data td")[0].style.borderBottomStyle, "");
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

        equal(leftCell.css("borderRightWidth"), "3px");
        equal(rightCell.css("borderLeftWidth"), "0px");
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

        equal(topCell.css("borderBottomWidth"), "3px");
        equal(bottomCell.css("borderTopWidth"), "0px");
    });

    test("borderTop of first cell can be set", function() {
        sheet.fromJSON(singleCell({ borderTop: { size: "1px", color: "rgb(255, 0 0)" } }));

        ok(true);
    });

})();
