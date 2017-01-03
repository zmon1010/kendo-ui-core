(function() {
    var dataviz = kendo.dataviz,
        draw = dataviz.drawing,
        Chart = dataviz.ui.Chart,
        chart;

    function setupChart(options) {
        chart = createChart(options);
    }

    // ------------------------------------------------------------
    (function() {
        function createEvent(relatedTarget) {
            var relatedTarget = relatedTarget === undefined ? document.body : relatedTarget;
            return $.Event("mouseleave", { relatedTarget: relatedTarget});
        }

        function tap(index) {
            var plotArea = chart._model.children[1];
            clickChart(chart, getChartDomElement(plotArea)[0]);
        }

        module("mouseleve", {
            setup: function() {
                setupChart({
                    valueAxis: {
                        crosshair: {
                            visible: true
                        }
                    },
                    tooltip:{
                        visible: true
                    }
                });
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("hides elements", function() {
            chart._instance.hideElements = function() {
                ok(true);
            };
            chart.element.trigger(createEvent());
        });

        test("does not hide elements if the relatedTarget is from the tooltip element", 0, function() {
            chart._instance.hideElements = function() {
                ok(false);
            };
            chart.element.trigger(createEvent(chart._tooltip.element));
        });

        asyncTest("is supressesed on tap", 0, function() {
            setTimeout(function() {
                $(chart.element).trigger("mouseleave");
            }, 0);

            tap();

            chart._instance.hideElements = function() {
                ok(false);
            };

            $(chart.element).trigger("mouseleave");

            setTimeout(function() {
                start();
            }, 0);

        });

    })();

    // ------------------------------------------------------------
    (function() {
        module("tooltip leave", {
            setup: function() {
                setupChart({
                    valueAxis: {
                        crosshair: {
                            visible: true
                        }
                    },
                    tooltip:{
                        visible: true
                    }
                });
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("hides crosshairs ", function() {
            chart._plotArea.crosshairs[0].hide = function() {
                ok(true);
            };
            chart._tooltip.trigger("leave");
        });

        test("hides highlight ", function() {
            chart._highlight.hide = function() {
                ok(true);
            };
            chart._tooltip.trigger("leave");
        });

    })();

})();