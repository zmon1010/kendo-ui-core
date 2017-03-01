(function() {
    var dataviz = kendo.dataviz;
    var chartElement;
    var tooltip;
    var pointMock;
    var TOLERANCE = 1;
    var defaultAlign = {
        horizontal: "left",
        vertical: "top"
    };
    var RED = "rgb(255, 0, 0)";
    var GREEN = "rgb(0, 255, 0)";
    var BLUE = "rgb(0, 0, 255)";

    function destroyTooltip() {
        if (tooltip) {
            tooltip.destroy();
        }

        if (chartElement) {
            chartElement.remove();
        }
    }

    function createAnchor(point) {
        var left = 0;
        var top = 0;
        if (point) {
            left = point.x;
            top = point.y;
        }
        return {
            point: { left: left, top: top },
            align: defaultAlign
        }
    }

    function createPoint(options) {
        pointMock = {
            value: 1,
            options: {
                aboveAxis: true,
                color: RED
            },
            series: {
                color: BLUE,
                name: "series",
                labels: {
                    color: GREEN
                }
            },
            category: "category",
            dataItem: {
                field: "value"
            }
        };

        kendo.deepExtend(pointMock, options);
    }

    (function() {
        var element;

        function createTooltip(options) {
            createPoint();

            destroyTooltip();

            chartElement = $("<div id='chart'></div>").appendTo(QUnit.fixture);
            tooltip = new dataviz.SparklineTooltip(chartElement, options);
        }

        function showTooltip(options) {
            tooltip.show(kendo.deepExtend({
                anchor: createAnchor(),
                style: {},
                points: [pointMock],
                shared: true,
                series: [{}]
            }, options));
            tooltip.move();
        }

        // ------------------------------------------------------------
        module("Sparkline Tooltip", {
            setup: function() {
                createTooltip();
            },
            teardown: destroyTooltip
        });

        test("defaults to zero animation duration", function() {
            equal(tooltip.options.animation.duration, 0);
        });

        test("does not render element initially", function() {
            equal($(".k-chart-tooltip").length, 0);
        });

        test("attaches to body on show", function() {
            showTooltip();

            equal(tooltip.element.parent("body").length, 1);
        });

        test("hides element on hide", function() {
            showTooltip();
            tooltip.hide();

            equal(tooltip.element.css("display"), "none");
        });

        test("detaches from body on destroy", function() {
            tooltip.destroy();

            equal($(".k-chart-tooltip").length, 0);
        });
    })();

})();