(function() {
    var element;
    var treemap;

    (function() {
        function angularTests(type) {
            function createTreeMap() {
                element = $("<div />").appendTo(QUnit.fixture);
                treemap = element.kendoTreeMap({
                    dataSource: [{
                        text: "foo",
                        items: [{
                            value: 1,
                            text: "bar"
                        }, {
                            value: 1,
                            text: "qux"
                        }]
                    }],
                    type: type
                }).getKendoTreeMap();
            }

            module("angular / " + type, {
                teardown: function() {
                    kendo.destroy(QUnit.fixture);
                }
            });

            test("cleans already rendered items", function() {
                createTreeMap();
                var expected = treemap.element.find(".k-leaf div,.k-treemap-title,.k-treemap-title-vertical");
                treemap.angular = function(command, fn) {
                    equal(command, "cleanup");

                    var result = fn();
                    result.elements.each(function(index, item) {
                        ok(expected[index] === item);
                    });
                    treemap.angular = $.noop;
                };

                treemap.dataSource.read();
            });

            test("cleans roots after the children are loaded", 2, function() {
                createTreeMap();
                var cleanAll = true;
                treemap.angular = function(command, fn) {
                    var result = fn();
                    if (command == "cleanup" && !cleanAll) {
                        equal(result.elements.length, 1);
                        equal(treemap.dataItem(result.elements.closest(".k-treemap-tile")).uid, treemap.dataSource.at(0).uid);
                    }
                    cleanAll = false;
                };

                treemap.dataSource.read();
            });

            test("compiles items with correct dataItems", 8, function() {
                createTreeMap();

                treemap.angular = function(command, fn) {
                    var result = fn();
                    if (command == "compile") {
                        equal(result.elements.length, 1);
                        equal(treemap.dataItem(result.elements.closest(".k-treemap-tile")).uid, result.data[0].dataItem.uid);
                    }
                };

                treemap.dataSource.read();
            });

            test("compiles text wrapper element", 8, function() {
                createTreeMap();

                treemap.angular = function(command, fn) {
                    var result = fn();
                    var tile = result.elements.closest(".k-treemap-tile")[0];
                    if (command == "compile") {
                        var dataItem = treemap.dataItem(tile);
                        ok(result.elements.parent()[0] === tile);
                        equal($.trim(result.elements.text()), dataItem.text);
                    }
                };

                treemap.dataSource.read();
            });
        }

        angularTests("squarified");
        angularTests("horizontal");
        angularTests("veritcal");

    })();

})();