(function() {
    var element;
    var treemap;
    var roots;
    var TOLERANCE = 1;
    function createTreeMap(options, width, height) {
        element = $("<div />").css({
            width: width,
            height: height
        }).appendTo(QUnit.fixture);
        treemap = element.kendoTreeMap(options).getKendoTreeMap();
        roots =  treemap._root.children;
    }

    function testSizes(expected, type) {
        createTreeMap({
            dataSource: [{
                text: "root",
                items: [{value: 1, text: "item1"}, {value: 1, text: "item2"}, {value: 1, text: "item3"}]
            }],
            type: type
        }, 400, 400);

        element.css({
            width: 600,
            height: 600
        });
        treemap.resize();

        var root = element.children();
        equal(root.width(), element.width());
        equal(root.height(), element.height());

        root.children(".k-treemap-wrap").children().each(function(index) {
            var element = $(this);
            close(element.width(), expected[index].width, TOLERANCE);
            close(element.height(), expected[index].height, TOLERANCE);
            close(parseFloat(element.css("left")), expected[index].left, TOLERANCE);
            close(parseFloat(element.css("top")), expected[index].top, TOLERANCE);
        });
    }

    module("resize", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("updates tiles", function() {
        testSizes([{ width: 380.8, height: 261.8, left: 0, top: 0 }, 
            { width: 380.8, height: 261.8, left: 0, top: 281.5 }, 
            { width: 181.8, height: 542.8, left: 401.333, top: 0 }]);
    });

    test("updates tiles(horizontal)", function() {
        testSizes([{ width: 542.8, height: 180.8, left: 0, top: 0 }, 
            { width: 542.8, height: 180.8, left: 0, top: 200.667 }, 
            { width: 542.8, height: 181.8, left: 0, top: 401.333 }], "horizontal");
    });

    test("updates tiles(vertical)", function() {
        testSizes([{ width: 180.8, height: 542.8, left: 0, top: 0 },
            { width: 180.8, height: 542.8, left: 200.667, top: 0 },
            { width: 181.8, height: 542.8, left: 401.333, top: 0 }], "vertical");
    });

})();