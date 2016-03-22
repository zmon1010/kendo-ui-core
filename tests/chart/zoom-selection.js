(function() {

    (function() {
        var chart;
        var zoom;
        var chartOptions = {
            categoryAxis: {
                categories: ["A", "B", "C", "D"],
                name: "foo",
                min: 1,
                max: 2
            }
        };

        function setup(options, zoomOptions){
            chart = createChart(kendo.deepExtend({
                zoomable: true
            }, options));

            zoom = new kendo.dataviz.MousewheelZoom(chart, kendo.deepExtend({
                key: "none"
            }, zoomOptions));
        }

        // ------------------------------------------------------------
        module("MousewheelZoom", {
            teardown: function() {
                destroyChart();
            }
        });

        test("updateRanges returns updated ranges based on delta", function() {
            setup(chartOptions);

            var ranges = zoom.updateRanges(1);

            equal(ranges.foo.min, 0);
            equal(ranges.foo.max, 3);
        });

        test("updateRanges does not update range if the axis is locked", function() {
            setup(chartOptions, {
                lock: "x"
            });

            var ranges = zoom.updateRanges(1);

            ok(!ranges.foo);
        });

        test("zoom updates plotArea axes options", function() {
            setup(chartOptions);

            var ranges = zoom.updateRanges(1);
            zoom.zoom();
            var options = chart._plotArea.options.categoryAxis;

            equal(options.min, 0);
            equal(options.max, 3);
        });

        test("zoom redraws plotArea", function() {
            setup(chartOptions);

            var ranges = zoom.updateRanges(1);
            chart._plotArea.redraw = function() {
                ok(true)
            };
            zoom.zoom();
        });

        test("Scatter Chart w/multiple axes", function() {
            setup({
                xAxis: [{}, {}],
                yAxis: [{}, {}],
                series: [{
                    type: "scatterLine",
                    data: []
                }]
            });
            zoom.updateRanges(2);
            zoom.zoom();

            ok(true);
        });
    })();

    (function() {
        var chart;
        var plotArea;
        var pane;
        var zoom;
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

        function setup(options, zoomOptions){
            chart = createChart(options);

            plotArea = chart._plotArea;
            pane = plotArea.panes[0];
            pane.clipBox = function() {
                return new kendo.dataviz.Box2D(0, 0, 300, 300);
            };
            plotArea.paneByPoint = function() {
                return pane;
            };

            zoom = new kendo.dataviz.ZoomSelection(chart, kendo.deepExtend({
                key: "none"
            }, zoomOptions));
            zoom._elementOffset = function() {
                return {
                    left: 0,
                    top: 0
                };
            };
        }

        // ------------------------------------------------------------
        module("ZoomSelection / start", {
            teardown: function() {
                destroyChart();
                zoom.destroy();
            }
        });

        test("start sets zoom pane", function() {
            setup(chartOptions);

            zoom.start(eventArg);

            ok(zoom._zoomPane === plotArea.panes[0]);
        });

        test("start returns true if a pane is found based on the event", function() {
            setup(chartOptions);

            equal(zoom.start(eventArg), true);
        });

        test("start returns false if a pane is not found based on the event", function() {
            setup(chartOptions);
            plotArea.paneByPoint = $.noop;

            equal(zoom.start(eventArg), false);
        });

        test("start returns true if the set key is pressed", function() {
            setup(chartOptions, {
                key: "shift"
            });

            equal(zoom.start(createEventArg({
                event: {
                    shiftKey: true
                }
            })), true);
        });

        test("start returns false if the set key is not pressed", function() {
            setup(chartOptions, {
                key: "shift"
            });

            equal(zoom.start(createEventArg({
                event: {
                    shiftKey: false
                }
            })), false);
        });

        // ------------------------------------------------------------
        module("ZoomSelection / move", {
            teardown: function() {
                destroyChart();
                zoom.destroy();
            }
        });

        test("move updates the selection marquee", function() {
            setup(chartOptions);
            zoom.start(createEventArg());

            zoom.move(createEventArg({
                x: {
                    location: 10,
                    startLocation: 110,
                    initialDelta: 100
                },
                y: {
                    location: 10,
                    startLocation: 110,
                    initialDelta: 100
                }
            }));

            equal(zoom._marquee.width(), 100);
            equal(zoom._marquee.height(), 100);
            equal(parseInt(zoom._marquee.css("left"), 10), 10);
            equal(parseInt(zoom._marquee.css("top"), 10), 10);
        });

        test("move limits the selection marquee to the pane clipbox", function() {
            setup(chartOptions);
            zoom.start(createEventArg());

            zoom.move(createEventArg({
                x: {
                    location: 500,
                    startLocation: 100,
                    initialDelta: 400
                },
                y: {
                    location: 500,
                    startLocation: 100,
                    initialDelta: 400
                }
            }));

            equal(zoom._marquee.width(), 200);
            equal(zoom._marquee.height(), 200);
            equal(parseInt(zoom._marquee.css("left"), 10), 100);
            equal(parseInt(zoom._marquee.css("top"), 10), 100);
        });

        test("move takes the size and position from the pane clipbox if an axis is locked", function() {
            setup(chartOptions, {
                lock: "y"
            });
            zoom.start(createEventArg());

            zoom.move(createEventArg({
                x: {
                    location: 10,
                    startLocation: 110,
                    initialDelta: 100
                },
                y: {
                    location: 10,
                    startLocation: 110,
                    initialDelta: 100
                }
            }));

            equal(zoom._marquee.width(), 100);
            equal(zoom._marquee.height(), 300);
            equal(parseInt(zoom._marquee.css("left"), 10), 10);
            equal(parseInt(zoom._marquee.css("top"), 10), 0);
        });

        // ------------------------------------------------------------
        module("ZoomSelection / end", {
            teardown: function() {
                destroyChart();
                zoom.destroy();
            }
        });

        test("returns updated axis limits based on the selected area", function() {
            setup(chartOptions);
            zoom.start(createEventArg());

            var ranges = zoom.end(createEventArg({
                x: {
                    location: 100,
                    initialDelta: 100
                },
                y: {
                    location: 100,
                    initialDelta: 100
                }
            }));

            var categoryAxis = plotArea.categoryAxis;
            var axisRange = categoryAxis.pointsRange({x: 0, y: 0}, {x: 100, y: 100});
            equal(axisRange.min, ranges.foo.min);
            equal(axisRange.max, ranges.foo.max);
        });

        test("does not update axis limits if it is locked", function() {
            setup(chartOptions, {
                lock: "x"
            });
            zoom.start(createEventArg());

            var ranges = zoom.end(createEventArg({
                x: {
                    location: 100,
                    initialDelta: 100
                },
                y: {
                    location: 100,
                    initialDelta: 100
                }
            }));

            ok(!ranges.foo);
        });


    })();

})();
