(function() {
    var chart;
    var plotArea;
    var pane;
    var pannable;
    var eventArg = createEventArg();
    var chartOptions = {
        categoryAxis: {
            categories: ["A", "B", "C", "D"],
            name: "foo",
            min: 1,
            max: 2
        }
    };

    function createEventArg(options) {
        return kendo.deepExtend({
            event: { },
            x: {
                startLocation: 0,
                location: 0,
                client: 0,
                initialDelta: 0
            },
            y: {
                startLocation: 0,
                initialDelta: 0,
                location: 0,
                client: 0
            }
        }, options);
    }

    function setup(options, panOptions){
        chart = createChart(options || chartOptions);

        plotArea = chart._plotArea;
        pane = plotArea.panes[0];

        pannable = new kendo.dataviz.Pannable(plotArea, kendo.deepExtend(panOptions));
    }

    // ------------------------------------------------------------
    module("Pannable / start", {
        teardown: function() {
            destroyChart();
        }
    });

    test("activates panning if no key is pressed by default", function() {
        setup();
        pannable.start(eventArg);
        equal(pannable._active, true);
    });

    test("does not activate panning if a key is pressed default", function() {
        setup();
        pannable.start(createEventArg({
            event: {
                ctrlKey: true
            }
        }));
        ok(!pannable._active);
    });

    test("activates panning if the set key is pressed", function() {
        setup(chartOptions, {
            key: "ctrl"
        });
        pannable.start(createEventArg({
            event: {
                ctrlKey: true
            }
        }));
        ok(pannable._active);
    });

    test("does not activate panning if the set key is not pressed", function() {
        setup(chartOptions, {
            key: "ctrl"
        });
        pannable.start(eventArg);
        ok(!pannable._active);
    });

    // ------------------------------------------------------------
    module("Pannable / move", {
        teardown: function() {
            destroyChart();
        }
    });

    test("returns updated ranges based on delta", function() {
        setup();
        pannable.start(eventArg);
        var range = pannable.move(createEventArg({
            x: {
                delta: 10
            }
        })).foo;
        var newAxisRange = plotArea.categoryAxis.pan(-10);
        equal(range.min, newAxisRange.min);
        equal(range.max, newAxisRange.max);
    });

    test("does not return range for locked axes", function() {
        setup(chartOptions, {
            lock: "x"
        });
        pannable.start(eventArg);
        var range = pannable.move(createEventArg({
            x: {
                delta: 10
            }
        })).foo;
        ok(!range);
    });

    // ------------------------------------------------------------
    module("Pannable / pan", {
        setup: function() {
            setup();
            pannable.start(eventArg);
            var range = pannable.move(createEventArg({
                x: {
                    delta: 10
                }
            })).foo;
        },
        teardown: function() {
            destroyChart();
        }
    });

    test("redraws plotArea with the current ranges", 3, function() {
        var newAxisRange = plotArea.categoryAxis.pan(-10);
        plotArea.redraw = function() {
            ok(true);
        };

        pannable.pan();

        equal(plotArea.options.categoryAxis.min, newAxisRange.min);
        equal(plotArea.options.categoryAxis.max, newAxisRange.max);
    });

})();