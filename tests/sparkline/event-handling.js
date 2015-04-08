(function() {
    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        Sparkline = dataviz.ui.Sparkline,
        sparkline;

    function createSparkline(options) {
        destroySparkline();

        var div = $("<div id='container' />").appendTo(QUnit.fixture);
        div.kendoSparkline(options);

        sparkline = div.data("kendoSparkline");
    }

    function destroySparkline() {
        if (sparkline) {
            sparkline.destroy();
            sparkline.element.remove();
            sparkline = null;
        }
    }

    // ------------------------------------------------------------
    (function() {
        module("tooltip leave", {
            setup: function() {
                createSparkline({
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
                destroySparkline();
            }
        });

        test("hides crosshairs ", function() {
            sparkline._plotArea.crosshairs[0].hide = function() {
                ok(true);
            };
            sparkline._tooltip.trigger("leave");
        });

        test("hides highlight ", function() {
            sparkline._highlight.hide = function() {
                ok(true);
            };
            sparkline._tooltip.trigger("leave");
        });

    })();

})();