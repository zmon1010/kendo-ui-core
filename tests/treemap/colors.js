(function() {
    var element;
    var treemap;
    var roots;

    function createTreeMap(options) {
        element = $("<div />").appendTo(QUnit.fixture);
        treemap = element.kendoTreeMap(options).getKendoTreeMap();
        roots =  treemap._root.children;
    }

    module("Color range", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("items from the same group use color range if colors is an array", function() {
        createTreeMap({
            dataSource: [{
                items: [{value: 1}, {value: 1}, {value: 1}]
            }],
            colors: [["#0c81c5", "#c5dceb"]]
        });

        equal(roots[0].color, "#0c81c5");
        equal(roots[1].color, "#3A98CF");
        equal(roots[2].color, "#69AFD8");
    });

    test("items from next group use next color range", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }, {
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }]
            }],
            colors: [["#0c81c5", "#c5dceb"], ["#449000", "#dae9cc"]]
        });
        var firstGroup = roots[0].children;
        var secondGroup = roots[1].children;

        equal(firstGroup[0].color, "#0c81c5");
        equal(firstGroup[1].color, "#4A9FD2");
        equal(secondGroup[0].color, "#449000");
        equal(secondGroup[1].color, "#76AE44");
    });

    test("first color range is used when all specified colors are already used", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }, {
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }, {
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }]
            }],
            colors: [["#0c81c5", "#c5dceb"], ["#449000", "#dae9cc"]]
        });
        var thirdGroup = roots[2].children;

        equal(thirdGroup[0].color, "#0c81c5");
        equal(thirdGroup[1].color, "#4A9FD2");
    });

    test("nodes with children do not change the color used by the children groups", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }]
            }],
            colors: [["#0c81c5", "#c5dceb"], ["#449000", "#dae9cc"]]
        });
        var firstGroup = roots[0].children;

        equal(firstGroup[0].color, "#0c81c5");
        equal(firstGroup[1].color, "#4A9FD2");
    });

    test("child groups use next color range", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{
                        value: 1
                    }, {
                        value: 1,
                        items: [{value: 1}, {value: 1}]
                    }]
                }, {
                    value: 1
                }]
            }],
            colors: [["#0c81c5", "#c5dceb"], ["#449000", "#dae9cc"], ["#ffae00", "#f5e5c3"]]
        });
        var childGroup = roots[0].children[1].children;

        equal(childGroup[0].color, "#ffae00");
        equal(childGroup[1].color, "#F8C041");
    });

    //----------------------------------------------------------------------------------
    module("Solid colors", {
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("items from the same group use same", function() {
        createTreeMap({
            dataSource: [{
                items: [{value: 1}, {value: 1}, {value: 1}]
            }],
            colors: ["#0c81c5"]
        });

        equal(roots[0].color, "#0c81c5");
        equal(roots[1].color, "#0c81c5");
        equal(roots[2].color, "#0c81c5");
    });

    test("items from next group use next color", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }, {
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }]
            }],
            colors: ["#0c81c5", "#449000"]
        });
        var firstGroup = roots[0].children;
        var secondGroup = roots[1].children;

        equal(firstGroup[0].color, "#0c81c5");
        equal(firstGroup[1].color, "#0c81c5");
        equal(secondGroup[0].color, "#449000");
        equal(secondGroup[1].color, "#449000");
    });

    test("first color range is used when all specified colors are already used", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }, {
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }, {
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }]
            }],
            colors: ["#0c81c5", "#449000"]
        });
        var thirdGroup = roots[2].children;

        equal(thirdGroup[0].color, "#0c81c5");
        equal(thirdGroup[1].color, "#0c81c5");
    });

    test("nodes with children do not change the color used by the children groups", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{value: 1}, {value: 1}]
                }]
            }],
            colors: ["#0c81c5", "#449000"]
        });
        var firstGroup = roots[0].children;

        equal(firstGroup[0].color, "#0c81c5");
        equal(firstGroup[1].color, "#0c81c5");
    });

    test("child groups use next color", function() {
        createTreeMap({
            dataSource: [{
                items: [{
                    value: 1,
                    items: [{
                        value: 1
                    }, {
                        value: 1,
                        items: [{value: 1}, {value: 1}]
                    }]
                }, {
                    value: 1
                }]
            }],
            colors: ["#0c81c5", "#449000", "#ffae00"]
        });
        var childGroup = roots[0].children[1].children;

        equal(childGroup[0].color, "#ffae00");
        equal(childGroup[1].color, "#ffae00");
    });

})();