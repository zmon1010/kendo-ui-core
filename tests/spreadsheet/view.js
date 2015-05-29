(function() {
    var View = kendo.spreadsheet.View;
    var Sheet = kendo.spreadsheet.Sheet;

    module("spreadsheet view", {
        setup: function() {
        }
    });

    /*
    test("builds correct table", function() {
        var sheet = new kendo.spreadsheet.Sheet(10, 10, 10, 10);

        for (var i = 0, len = 100; i < len; i++) {
            sheet._values.value(i, i, i);
        }

        var element = $("<div style='width:110px;height:110px' />").appendTo(QUnit.fixture);
        var view = new View(element);
        view.sheet(sheet);

        view.tree.render = function(arr) {
            var table = arr[0];
            var tbody = table.children[1];
            equal(tbody.children[0].children[0].children[0].nodeValue, "0");
            equal(tbody.children[0].children[9].children[0].nodeValue, "90");
            equal(tbody.children[9].children[0].children[0].nodeValue, "9");
            equal(tbody.children[9].children[9].children[0].nodeValue, "99");
        }

        view.render();
    });
    */

})();
