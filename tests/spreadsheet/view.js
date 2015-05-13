(function() {
    var View = kendo.spreadsheet.View;

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

        equal(rectangle.top, 1000)
        equal(rectangle.left, 1200)
        equal(rectangle.right, 1400)
        equal(rectangle.bottom, 1200)
    });
})();
