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

    function createAnchor(point, align) {
        var left = 0;
        var top = 0;
        if (point) {
            left = point.x;
            top = point.y;
        }
        return {
            point: { left: left, top: top },
            align: kendo.deepExtend({}, defaultAlign, align)
        }
    }

    function createMockPoint(options) {
        var point = {
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

        kendo.deepExtend(point, options);

        return point;
    }

    function createPoint(options) {
        pointMock = createMockPoint(options);
    }

    (function() {
        var element;

        function createTooltip(options) {
            destroyTooltip();

            chartElement = $("<div id='chart' style='height: 50px;'></div>").appendTo(QUnit.fixture);
            tooltip = new dataviz.Tooltip(chartElement, options);
            element = tooltip.element;
        }

        function showTooltip(options) {
            tooltip.show(kendo.deepExtend({
                anchor: createAnchor(),
                style: {},
                point: pointMock
            }, options));
            tooltip.move();
        }

        // ------------------------------------------------------------
        module("Tooltip", {
            setup: function() {
                createTooltip();
                createPoint();
            },
            teardown: destroyTooltip
        });

        test("does not render element initially", function() {
            equal($(".k-chart-tooltip").length, 0);
        });

        test("attaches to body on show", function() {
            showTooltip();

            equal(tooltip.element.parent("body").length, 1);
        });

        test("tooltip is not hidden when moving over the chart", 0, function() {
            showTooltip();

            tooltip.hide = function() {
                ok(false);
            }

            element.trigger($.Event("mouseout", { relatedTarget: chartElement[0] }));
        });

        test("tooltip is not hidden when moving over chart child element", 0, function() {
            showTooltip();

            tooltip.hide = function() {
                ok(false);
            }

            element.trigger($.Event("mouseout", { relatedTarget: $("<div>").appendTo(chartElement)[0] }));
        });

        test("tooltip is hidden when moving out of the chart", function() {
            showTooltip();

            tooltip.hide = function() {
                ok(true);
            }

            element.trigger($.Event("mouseout", { relatedTarget: document.body }));
        });

        test("triggers leave when moving out of the chart", function() {
            showTooltip();

            tooltip.bind("leave", function() {
                ok(true);
            });

            element.trigger($.Event("mouseout", { relatedTarget: document.body }));
        });

        test("detaches from body on destroy", function() {
            tooltip.destroy();

            equal($(".k-chart-tooltip").length, 0);
        });

        test("sets k-tooltip class", function(){
            ok(element.hasClass("k-tooltip"));
        });

        test("sets k-chart-tooltip class", function(){
            ok(element.hasClass("k-chart-tooltip"));
        });

        test("does not set k-chart-shared-tooltip class", function(){
            showTooltip();
            equal(element.hasClass("k-chart-shared-tooltip"), false);
        });

        test("renders div with display none attribute", function() {
            ok(element.css("display"), "none");
        });

        test("sets font", function() {
            createTooltip({ font: "16px Tahoma" });
            equal(element.css("fontSize"), "16px");
            equal(element.css("fontFamily"), "Tahoma");
        });

        test("sets styles", function() {
            showTooltip({
                style: {
                    font: "16px Tahoma",
                    backgroundColor: RED
                }
            });
            equal(element.css("fontSize"), "16px");
            equal(element.css("fontFamily"), "Tahoma");
            equal(element.css("backgroundColor"), RED);
        });

        test("sets k-chart-tooltip-inverse class", function() {
            showTooltip({
               className: "k-chart-tooltip-inverse"
            });
            ok(element.hasClass("k-chart-tooltip-inverse"));
        });

        test("remove already set k-chart-tooltip-inverse class", function() {
            showTooltip({
               className: "k-chart-tooltip-inverse"
            });

            ok(element.hasClass("k-chart-tooltip-inverse"));
            showTooltip({});

            ok(!element.hasClass("k-chart-tooltip-inverse"));
        });

        test("sets border width", function() {
            createTooltip({ border: { width: 1 } });
            equal(element.css("border-top-width"), "1px");
        });

        test("sets opacity", function() {
            createTooltip({ opacity: 0.5 });
            equal(element.css("opacity"), 0.5);
        });

        test("sets k-rtl class depending on direction", function() {
            createTooltip({ rtl: true });
            equal(element.hasClass("k-rtl"), true);

            createTooltip({ rtl: false });
            equal(element.hasClass("k-rtl"), false);
        });

        asyncTest("show displays tooltip for last point with a delay", function() {
            showTooltip();

            setTimeout(function() {
                equal(element.text(), "1");
                start();
            }, 120);
        });

        test("renders template", function() {
            createTooltip({ template: "${value}%" });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("renders compiled template", function() {
            createTooltip({ template: kendo.template("${value}%") });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("renders template when format is set", function() {
            createTooltip({ format: "{0} percent", template: "${value}%" });
            showTooltip();
            equal(element.text(), "1%");
        });

        test("template context has category", function() {
            createTooltip({ template: "${category}" });
            showTooltip();
            equal(element.text(), "category");
        });

        test("template context has series", function() {
            createTooltip({ template: "${series.name}" });
            showTooltip();
            equal(element.text(), "series");
        });

        test("template context has dataItem", function() {
            createTooltip({ template: "${dataItem.field}" });
            showTooltip();
            equal(element.text(), "value");
        });

         // ------------------------------------------------------------
        (function() {

            var size;
            module("Tooltip / position", {
                setup: function() {
                    createTooltip();
                    tooltip.options.animation.duration = 0;
                    tooltip.options.offsetX = 0;
                    tooltip.options.offsetY = 0;
                    size = tooltip._measure();
                },
                teardown: destroyTooltip
            });

            test("positions tooltip on anchor", function() {
                tooltip.anchor = createAnchor(new dataviz.Point(100, 200));

                tooltip.move();

                var tooltipOffset = tooltip.element.offset();

                equal(tooltipOffset.left, 100);
                equal(tooltipOffset.top, 200);
            });

            test("positions tooltip with center alignment", function() {
                tooltip.anchor = createAnchor(new dataviz.Point(100, 200), {
                    horizontal: "center"
                });

                tooltip.move();

                var tooltipOffset = tooltip.element.offset();

                equal(tooltipOffset.left, 100 - size.width / 2);
                equal(tooltipOffset.top, 200);
            });

            test("positions tooltip with right alignment", function() {
                tooltip.anchor = createAnchor(new dataviz.Point(100, 200), {
                    horizontal: "right"
                });

                tooltip.move();

                var tooltipOffset = tooltip.element.offset();

                equal(tooltipOffset.left, 100 - size.width);
                equal(tooltipOffset.top, 200);
            });

            test("positions tooltip with vertical center alignment", function() {
                tooltip.anchor = createAnchor(new dataviz.Point(100, 200), {
                    vertical: "center"
                });

                tooltip.move();

                var tooltipOffset = tooltip.element.offset();

                equal(tooltipOffset.left, 100);
                equal(tooltipOffset.top, 200 - size.height / 2);
            });

            test("positions tooltip with bottom alignment", function() {
                tooltip.anchor = createAnchor(new dataviz.Point(100, 200), {
                    vertical: "bottom"
                });

                tooltip.move();

                var tooltipOffset = tooltip.element.offset();

                equal(tooltipOffset.left, 100);
                equal(tooltipOffset.top, 200 - size.height);
            });
        })();

        // ------------------------------------------------------------
        module("Tooltip / currentPosition", {
            setup: function() {
                createTooltip();
                createPoint();
            },
            teardown: destroyTooltip
        });

        test("returns 0 if the tooltip fit in the window", function() {
            var result = tooltip._fit(200, 100, 400);

            equal(result, 0);
        });

        test("if element does not fit right should be position left", function() {
            var result = tooltip._fit(82, 42, 100);

            equal(result, -24);
        });

        test("if element does not fit right and does not fit left should be position right", function() {
            var result = tooltip._fit(42, 42, 100);

            equal(result, 0);
        });

        // ------------------------------------------------------------
        (function() {
            var scrollerElement;
            var scroller;

            function destroy() {
                if (tooltip) {
                    tooltip.destroy();
                }
                kendo.destroy(scrollerElement);
                scrollerElement.remove();
            }

            function createTooltipWithScroller(options) {
                scrollerElement = $("<div></div>").kendoMobileScroller({
                    zoom: true
                }).appendTo(QUnit.fixture);

                scroller = scrollerElement.data("kendoMobileScroller");

                chartElement = $("<div id='chart' style='height: 50px;'></div>").appendTo(scrollerElement);
                tooltip = new dataviz.Tooltip(chartElement, options);
                element = tooltip.element;
            }

            function assertPosition(transform) {
                tooltip.anchor = createAnchor(new dataviz.Point(10, 20));
                tooltip.options.animation.duration = 0;
                tooltip.options.offsetX = 0;
                tooltip.options.offsetY = 0;
                tooltip.move();

                var position = defaultPosition(tooltip.anchor).transform(transform);
                var offset = tooltip.element.offset();

                equal(offset.left, position.x);
                equal(offset.top, position.y);
            }

            function defaultPosition(anchor) {
                return new kendo.geometry.Point(anchor.point.left, anchor.point.top)
            }

            module("Tooltip / inside mobile scroller", {
                setup: function() {
                    createTooltipWithScroller();
                },
                teardown: destroy
            });

            test("scales offset by scroller scale", function() {
                scroller.movable.scaleTo(1.5);
                var transform = kendo.geometry.transform().scale(1.5);
                assertPosition(transform);
            });

            test("scales offset by scroller scale with center the scroller offset", function() {
                scroller.scrollTo(10, 20);
                scroller.movable.scaleTo(1.5);
                var transform = kendo.geometry.transform().scale(1.5, 1.5, [10, 20]);

                assertPosition(transform);
            });

            test("sets default offset if scroller is not scaled", function() {
                scroller.scrollTo(10, 20);
                assertPosition(kendo.geometry.transform());
            });

            // ------------------------------------------------------------
            module("Tooltip inside mobile scroller with role content", {
                setup: function() {
                    createTooltipWithScroller();
                    scrollerElement.attr(kendo.attr("role"), "content");
                },
                teardown: destroy
            });

            test("scales offset by scroller scale", function() {
                scroller.movable.scaleTo(1.5);
                var transform = kendo.geometry.transform().scale(1.5);
                assertPosition(transform);
            });

        })();

        (function() {

            function createTooltip(options) {
                createPoint({ options: { tooltip: { template: "foo" } } });

                destroyTooltip();

                chartElement = $("<div id='chart'></div>").appendTo(QUnit.fixture);
                tooltip = new dataviz.Tooltip(chartElement, options);
            }

            function showSharedTooltip(options) {
                showTooltip(kendo.deepExtend({
                    shared: true,
                    points: [pointMock],
                    series: [{}]
                }, options));
            }

            // ------------------------------------------------------------
            module("Tooltip / Shared", {
                setup: function() {
                    createTooltip();
                },
                teardown: destroyTooltip
            });

            test("shows shared tooltip", function() {
                showSharedTooltip();
                ok(tooltip.element.html().indexOf("foo") !== -1);
            });

            test("adds k-chart-shared-tooltip class", function() {
                showSharedTooltip();
                ok(tooltip.element.hasClass("k-chart-shared-tooltip"));
            });

            test("removes k-chart-shared-tooltip class if the tooltip is no longer shared", function() {
                showSharedTooltip();
                ok(tooltip.element.hasClass("k-chart-shared-tooltip"));
                showTooltip();
                ok(!tooltip.element.hasClass("k-chart-shared-tooltip"));
            });

            test("shows series color in default template if there are multiple series", function() {
                showSharedTooltip({ series: [{}, {}] });
                equal(tooltip.element.find("td").length, 3);
                equal(tooltip.element.find(".k-chart-shared-tooltip-marker").css("backgroundColor"), BLUE);
            });

            test("does not show series color in default template if there is single series", function() {
                showSharedTooltip({ series: [{}] });
                equal(tooltip.element.find("td").length, 2);
            });

            test("shows series name in default template", function() {
                showSharedTooltip();
                equal(tooltip.element.find("td").length, 2);
                ok(tooltip.element.html().indexOf("series") !== -1);
            });

            test("shows name cell if there is single series with name", function() {
                var noNamePoint = createMockPoint({});
                delete noNamePoint.series.name;
                showSharedTooltip({
                    points: [createMockPoint({ series: { name: "foo" }}), noNamePoint]
                });

                var row = tooltip.element.find("tr").last();
                var colspan = tooltip.element.find("tr").first().children().first().attr("colspan");
                equal(row.children().length, 2);
                equal(colspan, "2");
            });

            test("does not show name cell if there is no series with defined name", 3, function() {
                var noNamePoint = createMockPoint({});
                delete noNamePoint.series.name;
                var noNamePoint1 = createMockPoint({});
                delete noNamePoint1.series.name;
                showSharedTooltip({
                    points: [noNamePoint, noNamePoint1]
                });

                var colspan = tooltip.element.find("tr:first").nextAll("tr").each(function() {
                    equal($(this).children().length, 1);
                })
                .end()
                .children()
                .first().attr("colspan");

                equal(colspan, "1");
            });

            test("shows shared tooltip for series w/o name", function() {
                pointMock.series.name = null;
                showSharedTooltip();
                ok(tooltip.element.html().indexOf("foo") !== -1);
            });

            test("doesn't show empty series name in default template", function() {
                pointMock.series.name = null;
                showSharedTooltip();
                equal(tooltip.element.find("td").length, 2);
            });
        })();

    })();

    (function() {
        var chartElement;
        function createTooltip(options) {
            chartElement = $("<div id='chart' style='height: 50px;'></div>").appendTo(QUnit.fixture);
            tooltip = new dataviz.CrosshairTooltip(chartElement, options);
        }

        function destroyTooltip() {
            if (tooltip) {
                tooltip.destroy();
            }
        }

        function showTooltip(options) {
            tooltip.show(kendo.deepExtend({
                anchor: createAnchor(),
                style: {},
                crosshair: {
                    options: {
                        tooltip: {}
                    }
                },
                value: 1
            }, options));
            tooltip.move();
        }

        // ------------------------------------------------------------
        module("Crosshair / Tooltip", {
            setup: function() {
                createTooltip();
            },
            teardown: destroyTooltip
        });

        test("does not render element initially", function() {
            equal($(".k-chart-tooltip").length, 0);
        });

        test("attaches to body on show", function() {

            showTooltip();
            equal(tooltip.element.parent("body").length, 1);
        });

        test("applies style", function() {
            showTooltip({
                style: {
                    backgroundColor: "#fa7979"
                }
            });

            equal(tooltip.element.css("backgroundColor"), "rgb(250, 121, 121)");
        });

        test("adds k-chart-crosshair-tooltip class", function() {
            ok(tooltip.element.hasClass("k-chart-crosshair-tooltip"));
        });

        test("applies template", function() {
            showTooltip({
                crosshair: {
                    options: {
                        tooltip: {
                            template: "foo"
                        }
                    }
                }
            });

            ok(tooltip.element.html().indexOf("foo") >= 0);
        });

        test("detaches from body on destroy", function() {
            tooltip.destroy();

            equal($(".k-chart-tooltip").length, 0);
        });


    })();

})();
