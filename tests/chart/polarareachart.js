(function() {
    var dataviz = kendo.dataviz,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        Ring = dataviz.Ring,
        TOLERANCE = 1,
        chartBox = new Box2D(0, 0, 800, 600),
        view,
        plotArea,
        chart,
        pointsXY;

    function getFirstSegment(chart) {
        return chart._segments[0].visual.children[0];
    }

    function createChart(series, options) {
        view = new ViewStub();
        plotArea = new dataviz.PolarPlotArea(series,
            kendo.deepExtend({
                xAxis: {
                    majorGridLines: { visible: false },
                    visible: false
                },
                yAxis: {
                    majorGridLines: { visible: false },
                    visible: false
                },
                plotArea: {
                    padding: 35
                }
            }, options)
        );

        chart = plotArea.charts[0];

        plotArea.reflow(chartBox);
        plotArea.renderVisual();
        pointsXY = mapSegments(getFirstSegment(chart).segments);
    }

    // ------------------------------------------------------------
    module("Polar Area Chart / Positive values", {
        setup: function() {
            createChart([{
                type: "polarArea",
                data: [[45, 1], [60, 2], [75, 1]]
            }]);
        }
    });

    test("starts and ends on plot center", function() {
        arrayClose(pointsXY[0], [400, 300]);
        arrayClose(pointsXY[4], [400, 300]);
    });

    test("points are ordered by angular position", function() {
        createChart([{
            type: "polarArea",
            data: [[60, 2], [45, 1], [75, 1]]
        }]);

        arrayClose(pointsXY.slice(1, 4), [
            [494, 206], [533, 71], [434, 172]
        ], TOLERANCE);
    });

    // ------------------------------------------------------------
    (function() {
        module("Polar Area Chart / Missing values");

        test("omits points if missingValues is set to interpolate", function() {
            createChart([{
                type: "polarArea",
                data: [[45, 2], null, [60, 4], [null, 1], [80, 3], [100, null]],
                missingValues: "interpolate"
            }]);
            equal(chart.points[1], undefined);
            equal(chart.points[3], undefined);
            equal(chart.points[5], undefined);
        });

        test("does not omit point if missingValues is set to zero and point have x value", function() {
            createChart([{
                type: "polarArea",
                data: [[45, 2], [100, null]],
                missingValues: "zero"
            }]);

            equal(chart.points[1].value.x, 100);
            equal(chart.points[1].value.y, 0);
        });

        test("omits point if missingValues is set to zero and point does not have x value", function() {
            createChart([{
                type: "polarArea",
                data: [[45, 2], null, [60, 4], [null, 1], [80, 3], [100, null]],
                missingValues: "zero"
            }]);
            equal(chart.points[1], undefined);
            equal(chart.points[3], undefined);
        });

        test("does not omit point if missingValues is set to gap and point have x value", function() {
            createChart([{
                type: "polarArea",
                data: [[45, 2], [100, 3], [120, null]],
                missingValues: "gap"
            }]);

            equal(chart.points[2].value.x, 120);
            equal(chart.points[2].value.y, null);
        });

        test("omits point if missingValues is set to gap and point does not have x value", function() {
            createChart([{
                type: "polarArea",
                data: [[45, 2], null, [60, 4], [null, 1], [80, 3], [100, null]],
                missingValues: "gap"
            }]);
            equal(chart.points[1], undefined);
            equal(chart.points[3], undefined);
        });

        test("splits into segments with sorted by x points if missingValues is set to gap and there are missing values", function() {
            createChart([{
                type: "polarArea",
                data: [[45, 2], [130, 3], null, [60, 4], [120, 5], [100, null], [null, 1]],
                missingValues: "gap"
            }]);

            equal(chart._segments.length, 2);
            deepEqual(chart._segments[0].linePoints[0].value, {
                x: 45,
                y: 2
            });
            deepEqual(chart._segments[0].linePoints[1].value, {
                x: 60,
                y: 4
            });
            deepEqual(chart._segments[1].linePoints[0].value, {
                x: 120,
                y: 5
            });
            deepEqual(chart._segments[1].linePoints[1].value, {
                x: 130,
                y: 3
            });
        });

    })();

    // ------------------------------------------------------------

    (function() {
        module("PolarArea Chart / Values exceeding axis min or max options ", {});

        test("values are limited", 1, function() {
            var plotArea = {
                axisX: {
                    getSlot: function(a,b,limit) {
                        return new Ring(Point2D());
                    }
                },
                axisY: {
                    getSlot: function(a,b, limit) {
                        ok(limit);
                        return Box2D();
                    }
                }
            };

            var chart = new dataviz.PolarAreaChart(plotArea, {series: [{
                type: "polarArea",
                data: [[45, 1]]
            }]});

            chart.reflow();
        });
    })();
})();
