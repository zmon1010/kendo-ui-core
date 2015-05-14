(function() {
    var View = kendo.spreadsheet.View;
    var Sheet = kendo.spreadsheet.Sheet;

    module("spreadsheet view", {
        setup: function() {
        }
    });

    test("calculates current scrolled rectangle", function() {
        var markup = $("<div style='width: 200px; height:200px; overflow:scroll'><div style='height: 2000px; width: 2000px'>Foo</div></div>").appendTo(QUnit.fixture);

        var view = new View(markup[0]);

        markup.scrollTop(1000);
        markup.scrollLeft(1200);

        var rectangle = view.visibleRectangle();

        equal(rectangle.top, 1000);
        equal(rectangle.left, 1200);
        equal(rectangle.right, 1400 - kendo.support.scrollbar());
        equal(rectangle.bottom, 1200 - kendo.support.scrollbar());
    });

    test("builds correct table", function() {
        var sheet = new kendo.spreadsheet.Sheet(10, 10, 10, 10);

        for (var i = 0, len = 100; i < len; i++) {
            sheet.values.value(i, i, i);
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
})();
