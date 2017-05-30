(function() {
    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        Sparkline = dataviz.ui.Sparkline,
        TOLERANCE = 1;

    (function() {
        var sparkline,
            plotArea;

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
        module("Options / Defaults", {
            setup: function() {
                createSparkline({ });
            },
            teardown: destroySparkline
        });

        test("tooltip is visible by default", function() {
            ok(sparkline.options.tooltip.visible);
        });
        test("legend is not visible by default", function() {
            ok(!sparkline.options.legend.visible);
        });

        test("axes are not visible by default", function() {
            ok(!sparkline.options.axisDefaults.visible);
        });

        test("chartArea has 2px margin", function() {
            equal(sparkline.options.chartArea.margin, 2);
        });

        test("transitions are disabled", function() {
            ok(!sparkline.options.transitions);
        });

        // ------------------------------------------------------------
        module("Dimensions", {
            setup: function() {
                createSparkline();
            },
            teardown: function() {
                destroySparkline();
            }
        });

        test("auto height equals line height of empty container", function() {
            QUnit.close($(sparkline._instance.stage).height(), 19, TOLERANCE);
        });

        test("custom height is preserved", function() {
            destroySparkline();

            var div = $("<div id='container' />").css("height", "30").appendTo(QUnit.fixture);
            sparkline = div.kendoSparkline().data("kendoSparkline");

            equal(sparkline.element.innerHeight(), 30);
        });

        test("sets default container width for 2 points", function() {
            createSparkline([1, 2]);
            equal(sparkline.element.width(), 14);
        });

        test("sets default container width for 4 points", function() {
            createSparkline([1, 2, 3, 4]);
            equal(sparkline.element.width(), 24);
        });

        test("sets container width based on custom pointWidth", function() {
            createSparkline({ data: [1, 2], pointWidth: 10 });

            equal(sparkline.element.width(), 24);
        });

        test("sets default container width for bullet series", function() {
            createSparkline({ data: [[1, 2]], type: "bullet" });
            equal(sparkline.element.width(), 150);
        });

        test("sets default container width for bar series", function() {
            createSparkline({ data: [1], type: "bar" });
            equal(sparkline.element.width(), 150);
        });

        test("sets default container width after replacing existing widget", function() {
            createSparkline([1, 2]);
            createSparkline([1, 2, 3, 4]);
            equal(sparkline.element.width(), 24);
        });

        test("sets default container width when binding to inline data", function() {
            createSparkline({
                series: [{
                    data: [1, 2]
                }]
            });
            equal(sparkline.element.width(), 14);
        });

        test("custom width is preserved", function() {
            destroySparkline();

            var div = $("<div id='container' />").css("width", "30").appendTo(QUnit.fixture);
            div.kendoSparkline();

            sparkline = div.data("kendoSparkline");

            equal($(sparkline._instance.stage).width(), 30);
        });

        test("custom width is preserved after resize", function() {
            destroySparkline();

            var div = $("<div id='container' />").css("width", "30").appendTo(QUnit.fixture);
            div.kendoSparkline();

            div.css("width", 100);

            sparkline = div.data("kendoSparkline");
            sparkline.resize();

            equal($(sparkline._instance.stage).width(), 100);
        });

        test("custom width is preserved for bullet series", function() {
            destroySparkline();

            var div = $("<div id='container' />").css("width", "30").appendTo(QUnit.fixture);
            div.kendoSparkline({ type: "bullet" });

            sparkline = div.data("kendoSparkline");
            equal($(sparkline._instance.stage).width(), 30);
        });

        test("custom width is preserved for bar series", function() {
            destroySparkline();

            var div = $("<div id='container' />").css("width", "30").appendTo(QUnit.fixture);
            div.kendoSparkline({ type: "bar" });

            sparkline = div.data("kendoSparkline");
            equal($(sparkline._instance.stage).width(), 30);
        });

        // ------------------------------------------------------------
        module("Series", {
            teardown: destroySparkline
        });

        test("bullet wrap the options data array", function() {
            var data = [1,2];
            createSparkline({ data: data, type: "bullet" });
            deepEqual(sparkline._plotArea.series[0].data[0], data);
        });

        test("bar is stacked by default", function() {
            createSparkline({ data: [1], type: "bar" });
            deepEqual(sparkline._plotArea.series[0].stack, true);
        });

        test("crosshair is disabled for bullet sparkline", function() {
            createSparkline({ data: [1], type: "bullet" });
            equal(sparkline.options.categoryAxis.crosshair.visible, false);
        });

        test("crosshair is disabled for bullet seriesDefaults", function() {
            createSparkline({ data: [1], seriesDefaults: { type: "bullet" } });
            equal(sparkline.options.categoryAxis.crosshair.visible, false);
        });

        test("crosshair can be enabled for bullet sparkline", function() {
            createSparkline({ data: [1], type: "bullet",
                categoryAxis: {
                    crosshair: {
                        visible: true
                    }
                }
            });
            equal(sparkline.options.categoryAxis.crosshair.visible, true);
        });

        test("crosshair can be enabled for bullet sparkline", function() {
            createSparkline({
                series: [{ data: [1], type: "bullet" }],
                categoryAxis: {
                    crosshair: {
                        visible: true
                    }
                }
            });
            equal(sparkline.options.categoryAxis.crosshair.visible, true);
        });

        test("crosshair is disabled for bullet series", function() {
            createSparkline({ series: [{ data: [1], type: "bullet" }] });
            equal(sparkline.options.categoryAxis.crosshair.visible, false);
        });

        test("crosshair is disabled for bar sparkline", function() {
            createSparkline({ data: [1], type: "bar" });
            equal(sparkline.options.categoryAxis.crosshair.visible, false);
        });

        test("crosshair can be enabled for bar sparkline", function() {
            createSparkline({ data: [1], type: "bar",
                categoryAxis: {
                    crosshair: {
                        visible: true
                    }
                }
            });
            equal(sparkline.options.categoryAxis.crosshair.visible, true);
        });

        test("crosshair is disabled for bar seriesDefaults", function() {
            createSparkline({ data: [1], seriesDefaults: { type: "bar" } });
            equal(sparkline.options.categoryAxis.crosshair.visible, false);
        });

        test("crosshair is disabled for bar series", function() {
            createSparkline({ series: [{ data: [1], type: "bar" }] });
            equal(sparkline.options.categoryAxis.crosshair.visible, false);
        });

        test("crosshair can be enabled for bar sparkline", function() {
            createSparkline({
                series: [{ data: [1], type: "bar" }],
                categoryAxis: {
                    crosshair: {
                        visible: true
                    }
                }
            });
            equal(sparkline.options.categoryAxis.crosshair.visible, true);
        });

        // ------------------------------------------------------------
        module("Axes", {
            teardown: destroySparkline
        });

        test("renders plot bands for value axis", function() {
            createSparkline({
                series: [{ data: [1], type: "bar" }],
                valueAxis: {
                    plotBands: [{
                        from: 0,
                        to: 0.5,
                        color: "red"
                    }]
                }
            });

            sparkline._plotArea.panes[0].visual.traverse(function(visual) {
                if (visual.options.fill && visual.options.fill.color === "red") {
                    ok(true);
                }
            });
        });
    })();

    // ------------------------------------------------------------
    (function() {

        module("rtl", {
            teardown: destroyChart
        });

        test("sets rtl to true if k-rtl is detected", function() {
            var chart = $("<div id='container' class='k-rtl' />").appendTo(QUnit.fixture).kendoSparkline({
                data: [1, 2, 2]
            }).getKendoSparkline();

            equal(chart._instance.chartService.rtl, true);
        });

        test("sets rtl to false if k-rtl is detected but the direction is ltr", function() {
            var chart = $("<div id='container' class='k-rtl' style='direction:ltr;' />").appendTo(QUnit.fixture).kendoSparkline({
                data: [1, 2, 2]
            }).getKendoSparkline();

            equal(chart._instance.chartService.rtl, false);
        });

        test("sets tooltip direction", function() {
            var chart = $("<div id='container' class='k-rtl' />").appendTo(QUnit.fixture).appendTo(QUnit.fixture).kendoSparkline({
                data: [1, 2, 2]
            }).getKendoSparkline();

            equal(chart._tooltip.options.rtl, true);
        });
    })();
})();
