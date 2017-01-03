(function() {
    var dataviz = kendo.dataviz;
    var CrosshairTooltip = dataviz.CrosshairTooltip;
    var chart, instance;

    function setupChart(options) {
        chart = createChart(options);
        instance = chart._instance;
    }

    function showTooltip(axisName, axisIndex) {
        instance.trigger("showTooltip", {
            anchor: {
                point: {
                    x: 0,
                    y: 0
                },
                align: {
                    horizontal: "left",
                    vertical: "top"
                }
            },
            style: {},
            crosshair: {
                options: {
                    tooltip: {}
                }
            },
            value: 1,
            axisName: axisName || "categoryAxis",
            axisIndex: axisIndex || 0
        });
    }

    // ------------------------------------------------------------
    module("crosshair tooltips", {
        setup: function() {
            setupChart();
        },
        teardown: destroyChart
    });

    test("creates crosshair tooltip", function() {
        showTooltip();

        ok(chart._crosshairTooltips.categoryAxis0 instanceof CrosshairTooltip);
    });

    test("does not create new tooltip if a corresponding instance is already available", function() {
        showTooltip();

        var tooltip = chart._crosshairTooltips.categoryAxis0;
        showTooltip();

        ok(tooltip === chart._crosshairTooltips.categoryAxis0);
    });

    test("creates new tooltip for different axis", function() {
        showTooltip();
        showTooltip("valueAxis", 1);

        equal(Object.keys(chart._crosshairTooltips).length, 2);
        ok(chart._crosshairTooltips.valueAxis1 instanceof CrosshairTooltip);
    });

    test("creates new tooltip for different axis index", function() {
        showTooltip();
        showTooltip("categoryAxis", 1);

        equal(Object.keys(chart._crosshairTooltips).length, 2);
        ok(chart._crosshairTooltips.categoryAxis1 instanceof CrosshairTooltip);
    });

    test("destroys tooltips on redraw", 2, function() {
        showTooltip();

        var tooltip = chart._crosshairTooltips.categoryAxis0;
        tooltip.destroy();
        tooltip.destroy =  function() {
            ok(true);
        };

        chart.redraw();

        equal(Object.keys(chart._crosshairTooltips).length, 0);
    });

    test("destroys tooltips on destroy", function() {
        showTooltip();

        var tooltip = chart._crosshairTooltips.categoryAxis0;
        tooltip.destroy();
        tooltip.destroy =  function() {
            ok(true);
        };

        chart.destroy();

        equal(Object.keys(chart._crosshairTooltips).length, 0);
    });

})();