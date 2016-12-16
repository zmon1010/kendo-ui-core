(function() {
    var chart;

    function setupChart(options) {
        chart = createChart(options);
    }

    (function() {

        // ------------------------------------------------------------
        module("options", {
            teardown: destroyChart
        });

        test("applies options set to the widget prototype", function() {
            kendo.dataviz.ui.Chart.fn.options.foo = "bar";

            setupChart({series: [{}]});
            equal(chart._instance.options.foo, "bar");
        });

        // ------------------------------------------------------------
        module("proxies", {
            setup: function() {
                setupChart({series: [{}]});
            },
            teardown: destroyChart
        });

        function testProxy(name) {
            test("chart calls instance " + name + "method with passed parameters", function() {
                chart._instance[name] = function(a, b, c) {
                    equal(a, "foo");
                    equal(b, "bar");
                    equal(c, "baz");
                };
                chart[name]("foo", "bar", "baz");
            });

            test(name + " does not throw error if instance is undefined", function() {
                var instance = chart._isntance;
                delete chart._instance;
                chart[name]();

                ok(true);

                chart._instance = instance;
            });
        }

        function testProxies(names) {
            for (var idx = 0; idx < names.length; idx++) {
                testProxy(names[idx]);
            }
        }

        testProxies(["getAxis", "findAxisByName", "plotArea", "toggleHighlight", "showTooltip",
            "hideTooltip", "exportVisual", "_resize", "_redraw", "_noTransitionsRedraw", "_legendItemHover", "_eventCoordinates"]);

    })();

    (function() {
        var members = ["options", "_originalOptions", "surface", "_plotArea", "_model",
            "_highlight", "_selections", "_pannable", "_zoomSelection", "_mousewheelZoom"];

        // ------------------------------------------------------------
        module("members", {
            setup: function() {
                setupChart({
                    series: [{ data: [1] }],
                    categoryAxis: {
                        select: {
                            from: 0,
                            to: 1
                        }
                    },
                    pannable: true,
                    zoomable: true
                });
            },
            teardown: destroyChart
        });

        function sameMembers() {
            var instance = chart._instance;
            for (var idx = 0; idx < members.length; idx++) {
                ok(chart[members[idx]] === instance[members[idx]]);
            }
        }

        test("copies instance members", function() {
            sameMembers();
        });

        test("updates instance members after redraw", function() {
            chart.redraw();
            sameMembers();
        });

    })();

})();