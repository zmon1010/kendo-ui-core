(function() {
    var element;
    var sheet;
    var spreadsheet;

    module("spreadsheet view", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);

            spreadsheet = new kendo.ui.Spreadsheet(element);

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

})();
