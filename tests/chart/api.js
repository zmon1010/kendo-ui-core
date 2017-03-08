(function() {
    var dataviz = kendo.dataviz,
        draw = dataviz.drawing;
        Chart = dataviz.ui.Chart;

    (function() {
        var chart;

        function setupChart(options) {
            chart = createChart(options);
        }

        // ------------------------------------------------------------
        module("refresh / redraw", {
            setup: function() {
                setupChart({series: [{}]});
            },
            teardown: destroyChart
        });

        test("refresh applies axis defaults", function() {
            $.extend(chart.options, {
                axisDefaults: {
                    flag: true
                }
            });

            chart.refresh();

            ok(chart.options.categoryAxis.flag === true);
        });

        test("redraw applies axis defaults", function() {
            $.extend(chart.options, {
                axisDefaults: {
                    flag: true
                }
            });

            chart.redraw();

            ok(chart.options.categoryAxis.flag === true);
        });

        test("redraw only redraws specified pane", 1, function() {
            setupChart({
                panes: [{ name: "top" }, { name: "bottom" }]
            });

            var plotArea = chart._model._plotArea;
            plotArea.redraw = function(pane) {
                ok(pane === plotArea.panes[1]);
            };

            chart.redraw("bottom");
        });

        test("redraw redraws default pane if invalid name is specified", 1, function() {
            setupChart({
                panes: [{ name: "top" }, { name: "bottom" }]
            });

            var plotArea = chart._model._plotArea;
            plotArea.redraw = function(pane) {
                ok(pane === plotArea.panes[0]);
            };

            chart.redraw("middle");
        });

        test("removes category axis aliases after init", 1, function() {
            setupChart({
                panes: [{ name: "top" }, { name: "bottom" }],
                categoryAxes: [{}]
            });

            ok(!chart.options.categoryAxes);
        });

        test("redraw keeps categories when using categoryAxes alias", function() {
            setupChart({
                dataSource: {
                    data: [{
                        type: "alpha",
                        value: 100
                    }]
                },
                series: [{
                    type: "column",
                    data: [1000]
                }],
                panes: [{
                    name: "top"
                }],
                categoryAxes: [{
                    field: "type",
                    pane: "top"
                }]
            });

            chart.redraw("top");
            equal(chart._model._plotArea.categoryAxis.options.categories[0], "alpha");
        });

        test("removes value axis alias after init", 1, function() {
            setupChart({
                series: [{
                    type: "column",
                    data: [1000]
                }],
                panes: [{
                    name: "top"
                }],
                valueAxes: [{
                    field: "type",
                    pane: "top"
                }]
            });

            ok(!chart.options.valueAxes);
        });

        test("refresh applies series defaults", function() {
            $.extend(chart.options, {
                seriesDefaults: {
                    labels: { visible: true }
                }
            });

            chart.refresh();

            equal(chart.options.series[0].labels.visible, true);
        });

        test("redraw applies series defaults", function() {
            $.extend(chart.options, {
                seriesDefaults: {
                    labels: { visible: true }
                }
            });

            chart.redraw();

            equal(chart.options.series[0].labels.visible, true);
        });

        test("redraw replaces SVG element", function() {
            chart.element.find("svg").data("dirty", true);
            chart.redraw();

            ok(!chart.element.data("dirty") > 0);
        });

        test("redraw sets series defaults", function() {
            setupChart({
                series: [{
                    type: "column",
                    data: [1000],
                    color: function() { return "foo"; }
                }],
                seriesColors: ["red"]
            });

            chart.redraw();
            equal(chart.options.series[0]._defaults.color, "red");
        });

        test("refresh sets series defaults", function() {
            setupChart({
                series: [{
                    type: "column",
                    data: [1000],
                    color: function() { return "foo"; }
                }],
                seriesColors: ["red"]
            });

            chart.refresh();
            equal(chart.options.series[0]._defaults.color, "red");
        });

        test("refresh applies changes to data-bound series", function() {
            setupChart({
                dataSource: [{ value: 1 }],
                series: [{ field: "value" }]
            });

            chart.options.series[0].flag = true;
            chart.refresh();

            ok(chart.options.series[0].flag);
        });

        test("refresh applies color to new series", function() {
            setupChart({
                seriesColors: ["red", "blue"],
                series: [{}]
            });

            chart.options.series.push({});
            chart.refresh();

            equal(chart.options.series[1].color, "blue");
        });

        test("refresh cleans up generated cateories", function() {
            setupChart({
                dataSource: [{ value: 1 }],
                series: [{ field: "value" }],
                categoryAxis: { categories: [] }
            });

            chart.options.series = [];
            chart.refresh();

            equal(chart.options.categoryAxis.categories.length, 0);
        });

        test("redraw clears cached size", function() {
            chart.element.css("width", 1000);
            chart.resize();

            chart.element.css("width", 0);
            chart.redraw();

            chart.element.css("width", 1000);
            chart.resize();

            equal(chart._model.options.width, 1000);
        });

        test("redraw creates a new overlay with the view and viewElement", function() {
            var highlight = chart._highlight;
            ok(highlight.view === chart._view);
            ok(highlight.viewElement === chart._viewElement);
        });

        test("redraw unsets active point", function() {
            chart._instance._unsetActivePoint = function() { ok(true); };
            chart.redraw();
        });

        test("redraw resizes surface", function() {
            setupChart();

            chart.surface.resize = function() {
                ok(true);
            };
            chart.redraw();
        });

        // ------------------------------------------------------------
        (function() {
            module("chartArea size", {
                teardown: destroyChart
            });

            test("applies width in pixels", function() {
                setupChart({
                    chartArea: { width: 1000 }
                });
                equal(chart.element.width(), 1000);
            });

            test("applies height in pixels", function() {
                setupChart({
                    chartArea: { height: 500 }
                });
                equal(chart.element.height(), 500);
            });

            test("applies width in units", function() {
                setupChart({
                    chartArea: { width: "1000px" }
                });
                equal(chart.element.width(), 1000);
            });

            test("applies height", function() {
                setupChart({
                    chartArea: { height: "500px" }
                });
                equal(chart.element.height(), 500);
            });

            test("applies size to surface", function() {
                setupChart({
                    chartArea: {
                        height: 300,
                        width: 300
                    }
                });

                var size = chart.surface._size;
                equal(size.width, 300);
                equal(size.height, 300);
            });
        })();

        // ------------------------------------------------------------
        module("destroy", {
            setup: function() {
                setupChart({
                    series: [{}],
                    pannable: true,
                    zoomable: true
                });
            }
        });

        test("removes data", function() {
            chart.destroy();
            ok(!$("#container").data("kendoChart"));
        });

        test("destroys instance", 2, function() {
            chart._instance.destroy();
            chart._instance = { destroy: function() { ok(true); } };
            chart.destroy();
            ok(!chart._instance);
        });

        test("destroys tooltip", function() {
            chart._tooltip.destroy();
            chart._tooltip = { destroy: function() { ok(true); }, hide: $.noop };
            chart.destroy();
        });

        test("unbinds mouseleave from DOM container", function() {
            chart.destroy();
            ok(!($._data($("#container")[0], "events") || {}).mouseout);
        });

        test("unbinds DataSource change handler", function() {
            chart.destroy();
            equal(chart.dataSource._events["change"].length, 0);
        });


    })();

    (function() {
        var chart;

        function setupChart(options) {
            chart = createChart(kendo.deepExtend({
                series: [{
                    type: "bar",
                    data: [1, 2]
                }]
            }, options));
        }

        exportTests("Chart", createChart);
        legacyExportTests("Chart", createChart);
        saveAsPDFTests("Chart", createChart);

        // ------------------------------------------------------------
        module("Export", {
            setup: function() {
                setupChart();
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("svg() does not replace model", function() {
            var oldModel = chart._model;
            chart.svg();
            ok(oldModel === chart._model);
        });

        test("svg() does not replace surface", function() {
            var oldSurface = chart.surface;
            chart.svg();
            ok(oldSurface === chart.surface);
        });

        test("svg() encodes entities", function() {
            setupChart({ categoryAxis: { categories: ["Foo & Bar"] } });
            ok(chart.svg().indexOf("Foo &amp; Bar") > -1);
        });

        test("svg() preserves encoded entities", function() {
            setupChart({ categoryAxis: { categories: ["Foo &amp; Bar"] } });
            ok(chart.svg().indexOf("Foo &amp; Bar") > -1);
        });

        test("imageDataURL() does not replace model", function() {
            var oldModel = chart._model;
            chart.imageDataURL();
            ok(oldModel === chart._model);
        });

        test("imageDataURL() does not replace surface", function() {
            var oldSurface = chart.surface;
            chart.imageDataURL();
            ok(oldSurface === chart.surface);
        });

        test("exportVisual creates visual with the specified width and height", function() {
            var visual = chart.exportVisual({
                width: 300,
                height: 300
            });
            var bbox = visual.bbox();
            equal(bbox.size.width, 300);
            equal(bbox.size.height, 300);
        });

        test("exportVisual return surface export visual if width and height are not specified", function() {
            var visual = chart.exportVisual({
                foo: "bar"
            });
            ok(visual === chart.surface.exportVisual());
        });

        test("exportVisual does not replace surface", function() {
            var oldSurface = chart.surface;
            chart.exportVisual({
                width: 300,
                height: 300
            });
            ok(oldSurface === chart.surface);
        });

        test("exportVisual does not replace model", function() {
            var oldModel = chart._model;
            chart.exportVisual({
                width: 300,
                height: 300
            });
            ok(oldModel === chart._model);
        });

        test("exportVisual does not change chartArea size", function() {
            var chartArea = chart.options.chartArea;
            var width = chartArea.width;
            var height = chartArea.height;
            chart.exportVisual({
                width: 300,
                height: 300
            });
            equal(chart.options.chartArea.width, width);
            equal(chart.options.chartArea.height, height);
        });
    })();

    (function() {
        var chart;
        dataviz.ui.themes.foo = {
            chart: {
                foo: true,
                seriesDefaults: {
                    foo: true
                },
                seriesColors: ["#f00"]
            }
        };

        function setupChart(options) {
            chart = createChart(options);
        }

        // ------------------------------------------------------------
        module("setOptions", {
            teardown: destroyChart
        });

        test("extends original options", function() {
            setupChart();

            chart.setOptions({
                foo: true
            });

            ok(chart._originalOptions.foo);
        });

        test("applies theme", function() {
            setupChart();
            chart.setOptions({ theme: "foo" });

            ok(chart.options.foo);
        });

        test("does not taint original options with theme", function() {
            setupChart({ theme: "foo" });

            chart.setOptions({ theme: "" });

            ok(!chart.options.foo);
        });

        test("does not taint series options with theme", function() {
            setupChart({
                theme: "foo",
                series: [{ }]
            });

            chart.setOptions({ theme: "" });

            ok(!chart.options.series[0].foo);
        });

        test("does not taint series colors with theme", function() {
            setupChart({
                series: [{ }]
            });

            chart.setOptions({ theme: "foo" });
            chart.setOptions({ theme: "" });

            ok(!chart.options.series[0].color);
        });

        test("resets series after grouping", function() {
            setupChart({
                dataSource: {
                    data: [{
                        value: 1,
                        group: "A"
                    }, {
                        value: 1,
                        group: "B"
                    }],
                    group: {
                        field: "group"
                    }
                },
                series: [{
                    field: "value"
                }]
            });

            chart.setOptions({
                series: [{
                    data: [1, 2, 3]
                }]
            });

            chart.dataSource.read();

            equal(chart.options.series.length, 1);
        });

        test("setOptions keeps grouped series", function() {
            setupChart({
                dataSource: {
                    data: [{
                        value: 1,
                        group: "A"
                    }, {
                        value: 1,
                        group: "B"
                    }],
                    group: {
                        field: "group"
                    }
                },
                series: [{
                    field: "value"
                }]
            });

            chart.setOptions({ });

            equal(chart.options.series.length, 2);
        });

        test("extends axis options", function() {
            setupChart({
                valueAxis: { name: "foo" }
            });

            chart.setOptions({ valueAxis: { max: 1 } });
            equal(chart.options.valueAxis.name, "foo");
        });

        test("sets data source", function() {
            setupChart({
                series: [{ field: "foo" }]
            });

            chart.setOptions({
                dataSource: { data: [{ "foo": 1 }] }
            });

            equal(chart.options.series[0].data.length, 1);
        });

        test("does not extend data source", 0, function() {
            setupChart();

            var ds = { data: [{ "foo": 1 }], foo: { } };
            ds.foo.bar = ds.foo;

            chart.setOptions({
                dataSource: ds
            });
        });

        test("gets the data from the dataSource when it is set with the setDataSource method and the setOptions method is used", function(){
            var dataSource = new kendo.data.DataSource({
                data: [{foo: 1}]
            });

            setupChart({
                series: [{ field: "foo" }]
            });

            chart.setDataSource(dataSource);

            chart.setOptions({});
            ok(chart.options.series[0].data.length === 1);
        });

        test("calls redraw implicitly", function() {
            setupChart();

            stubMethod(Chart.fn, "redraw", function() {
                ok(true);
            }, function() {
                chart.setOptions({
                    foo: true
                });
            });
        });

        test("calls _onDataChanged implicitly when bound to a data source", function() {
            setupChart({
                series: [{ field: "foo" }],
                dataSource: { data: [{ "foo": 1 }] }
            });

            stubMethod(Chart.fn, "_onDataChanged", function() {
                ok(true);
            }, function() {
                chart.setOptions({
                    foo: true
                });
            });
        });

        asyncTest("binds mousemove handler if crosshairs are enabled with the new options", function() {
            setupChart();
            chart._instance._mousemove = function() {
                ok(true);
                start();
            };

            chart.setOptions({
                categoryAxis: {
                    crosshair:{
                        visible: true
                    }
                }
            });

            var e = new MouseEvent("mousemove", {});
            chart.element[0].dispatchEvent(e);
        });

        test("binds categories from series data", function() {
            setupChart({});
            chart.setOptions({
                series: [{
                    data: [{
                        value: 1,
                        foo: "A"
                    }],
                    categoryField: "foo"
                }]
            });
            equal(chart._plotArea.categoryAxis.options.categories[0], "A");
        });

        test("clears original option if null is passed", function() {
            setupChart({
                valueAxis: {
                    min: 1
                }
            });

            chart.setOptions({
                valueAxis: {
                    min: null
                }
            });
            ok(chart.options.valueAxis.min === undefined);
        });

        test("clears original option if undefined is passed", function() {
            setupChart({
                valueAxis: {
                    majorUnit: 1
                }
            });
            chart.setOptions({
                valueAxis: {
                    majorUnit: undefined
                }
            });
            ok(chart.options.valueAxis.majorUnit === undefined);
        });

        test("disables panning and zooming", function() {
            setupChart({
                pannable: true,
                zoomable: true
            });
            chart.setOptions({
                pannable: false,
                zoomable: false
            });

            ok(!chart._pannable);
            ok(!chart._zoomSelection);
            ok(!chart._mousewheelZoom);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        module("Events / render", {
            teardown: destroyChart
        });

        test("triggers render after chart is rendered", 1, function() {
            createChart({
                series: [{
                    data: [1, 2, 3]
                }],
                render: function(e) {
                    ok(e.sender.surface._instance._root.childNodes);
                }
            });
        });

        test("triggers render after dataBound", 1, function() {
            var dataBound = false;
            createChart({
                dataSource: [{
                    period: "Jan",
                    sales: 100
                }],
                series: [{
                    field: "sales"
                }],
                dataBound: function() {
                    dataBound = true;
                },
                render: function() {
                    ok(dataBound);
                }
            });
        });

        test("triggers render after rendering if autoBind is false", 1, function() {
            createChart({
                autoBind: false,
                dataSource: [{
                    period: "Jan",
                    sales: 100
                }],
                series: [{
                    field: "sales"
                }],
                dataBound: function() {
                    dataBound = true;
                },
                render: function() {
                    ok(true);
                }
            });
        });

        test("triggers render after setDataSource", 1, function() {
            var dataBound = false;
            var chart = createChart({
                series: [{
                    field: "sales"
                }],
                dataBound: function() {
                    dataBound = true;
                }
            });

            chart.bind("render", function() {
                ok(dataBound);
            });

            chart.setDataSource([{
                period: "Jan",
                sales: 100
            }]);
        });


        test("axes are accessible on render", 1, function() {
            var chart = createChart({
                categoryAxis: {
                    name: "cat"
                },
                render: function(e) {
                    ok(e.sender.findAxisByName("cat"));
                }
            });
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var vml;

        module("Deferred redraw", {
            setup: function() {
                vml = kendo.support.vml;
                kendo.support.vml = true;
            },
            teardown: function() {
                kendo.support.vml = vml;
                destroyChart();
            }
        });

        asyncTest("chart model is accessible in dataBound + setTimeout", function() {
            createChart({
                dataSource: [{ foo: 1 }],
                series: [{ field: "foo" }],
                dataBound: function(e) {
                    setTimeout(function() {
                        equal(e.sender._plotArea.charts[0].points[0].value, 1);
                        start();
                    });
                }
            });
        });

    })();


    // ------------------------------------------------------------
    (function() {
        var axis = {
            slot: function(from, to) {
                return {
                    from: from,
                    to: to
                };
            },
            range: function() {
                return "foo";
            },

            getValue: function(point) {
                return point;
            },

            valueRange: function() {
                return "baz";
            }
        },
        chartAxis;

        module("wrappers / ChartAxis", {
            setup: function() {
                chartAxis = new dataviz.ChartAxis(axis);
            }
        });

        test("slot returns axis slot", function() {
            var slot = chartAxis.slot(1, 2);
            equal(slot.from, 1);
            equal(slot.to, 2);
        });

        test("slot limits range by default", function() {
            chartAxis = new dataviz.ChartAxis({
                slot: function(a, b, limit){
                    equal(a, 1);
                    equal(b, undefined);
                    equal(limit, true);
                }
            });
            var slot = chartAxis.slot(1);
        });

        test("slot passes user set limit value", function() {
            chartAxis = new dataviz.ChartAxis({
                slot: function(a, b, limit){
                    equal(a, 1);
                    equal(b, 2);
                    equal(limit, false);
                }
            });
            var slot = chartAxis.slot(1, 2, false);
        });

        test("range returns axis range", function() {
            var range = chartAxis.range();
            equal(range, "foo");
        });

        test("value returns axis value", function() {
            var value = chartAxis.value("bar");
            equal(value, "bar");
        });

        test("value returns axis category", function() {
            chartAxis = new dataviz.ChartAxis({
                getCategory: function(point) {
                    return point;
                }
            });
            var value = chartAxis.value("bar");
            equal(value, "bar");
        });

        test("valueRange returns axis valueRange", function() {
            var range = chartAxis.valueRange();
            equal(range, "baz");
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var plotArea = {
            visual: {},
            _bgVisual: {}
        },
        chartPlotArea;

        module("wrappers / ChartPlotArea", {
            setup: function() {
                chartPlotArea = new dataviz.ChartPlotArea(plotArea);
            }
        });

        test("visual references plotArea visual", function() {
            ok(chartPlotArea.visual === plotArea.visual);
        });

        test("visual references plotArea _bgVisual", function() {
            ok(chartPlotArea.backgroundVisual === plotArea._bgVisual);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var defaultPane;
        var defaultChartPane;

        module("wrappers / ChartPane", {
            setup: function() {
                chart = createChart({
                    series: [{
                        name: "foo"
                    }, {
                        name: "bar",
                        axis:  "value"
                    }],
                    valueAxes: [{
                    }, {
                        name: "value",
                        pane: "second"
                    }],
                    panes: [{
                        name: "first"
                    }, {
                        name: "second"
                    }]
                });
                defaultPane = chart._plotArea.panes[0];
                defaultChartPane = chart.findPaneByIndex(0);
            },
            teardown: destroyChart
        });

        test("visual references pane visual", function() {
            ok(defaultChartPane.visual === defaultPane.visual);
        });

        test("chartsVisual references pane chartContainer visual", function() {
            ok(defaultChartPane.chartsVisual === defaultPane.chartContainer.visual);
        });

        test("name is equal to the pane name", function() {
            equal(defaultChartPane.name, "first");
        });

        test("series returns ChartSeries for default pane", function() {
            var series = defaultChartPane.series();
            equal(series.length, 1);
            equal(series[0]._options.name, "foo");
            ok(series[0] instanceof dataviz.ChartSeries);
        });

        test("series returns ChartSeries for named pane", function() {
            var pane = chart.findPaneByName("second");
            var series = pane.series();
            equal(series.length, 1);
            equal(series[0]._options.name, "bar");
            ok(series[0] instanceof dataviz.ChartSeries);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var chartSeries;

        function areHighlighted(elements, highlighted) {
            for (var idx = 0; idx < elements.length; idx++) {
                equal(elements[idx]._highlight.visible(), highlighted);
            }
        }

        function setup() {
            chart = createChart({
                series: [{
                    data: [{ value: 1, category: "foo" }, { value: 2, category: "bar" }],
                    field: "value",
                    categoryField: "category"
                }]
            });
            chartSeries = chart.findSeriesByIndex(0);
        }

        module("wrappers / ChartSeries", {
            setup: setup,
            teardown: destroyChart
        });

        test("points returns series points with or without filter", function() {
            var allPoints = chartSeries.points();

            equal(allPoints.length, 2);
            equal(allPoints[1].category, "bar");

            var filteredPoints = chartSeries.points(function(point) {
                return point.value === 2;
            });

            equal(filteredPoints.length, 1);
            equal(filteredPoints[0].category, "bar");
        });

        test("data retrieves and sets data", function() {
            var data = chartSeries.data();
            equal(data.length, 2);
            equal(data[0].category, "foo");
            data.pop();
            chartSeries.data(data);

            var chartData = chart.options.series[0].data;
            var categories = chart._plotArea.categoryAxis.options.categories;
            equal(chartData.length, 1);
            equal(chartData[0].category, "foo");
            equal(categories.length, 1);
            equal(categories[0], "foo");
        });

        test("findPoint retrieves point by filter", function() {
            var point = chartSeries.findPoint(function(point) {
                return point.value === 2;
            });
            equal(point.category, "bar");
        });

        test("toggleHighlight shows/hides highlight for the series points", function() {
            chartSeries.toggleHighlight(true);
            areHighlighted(chartSeries.points(), true);

            chartSeries.toggleHighlight(false);
            areHighlighted(chartSeries.points(), false);
        });

        test("toggleHighlight shows/hides highlight for filtered points", function() {
            var filter = function(point) {
                return point.value === 2;
            };
            chartSeries.toggleHighlight(true, filter);
            areHighlighted(chartSeries.points(filter), true);

            chartSeries.toggleHighlight(false, filter);
            areHighlighted(chartSeries.points(filter), false);
        });

        test("toggleHighlight shows/hides highlight for specific points", function() {
            var points = chartSeries.points(function(point) {
                return point.value === 2;
            });
            chartSeries.toggleHighlight(true, points);
            areHighlighted(points, true);

            chartSeries.toggleHighlight(false, points);
            areHighlighted(points, false);
        });

        // ------------------------------------------------------------
        module("wrappers / ChartSeries / toggleVisibility", {
            setup: setup,
            teardown: destroyChart
        });

        test("toggles series visible option", function() {
            chartSeries.toggleVisibility(false);
            equal(chart.options.series[0].visible, false);

            chartSeries.toggleVisibility(true);
            equal(chart.options.series[0].visible, true);
        });

        test("toggles filtered points visible option", function() {
            var filter = function(item) {
                return item.value === 1;
            };
            chartSeries.toggleVisibility(false, filter);

            var points = chart._plotArea.pointsBySeriesIndex(0);
            equal(points[0].options.visible, false);
            equal(points[1].options.visible, true);

            chartSeries.toggleVisibility(true, filter);
            var points = chart._plotArea.pointsBySeriesIndex(0);
            equal(points[0].options.visible, true);
        });

        // ------------------------------------------------------------
        module("wrappers / ChartSeries / toggleVisibility / grouped", {
            setup: function() {
                chart = createChart({
                    dataSource: {
                        data: [{
                            group: "A",
                            value: 1
                        }, {
                            group: "B",
                            value: 2
                        }],
                        group: { field: "group" }
                    },
                    series: [{
                        field: "value"
                    }]
                });
            },
            teardown: destroyChart
        });

        test("saves group visibility", function() {
            chartSeries = chart.findSeriesByName("B");
            chartSeries.toggleVisibility(false);
            equal(chart._seriesVisibility.groups.B, false);

            chartSeries.toggleVisibility(true);
            equal(chart._seriesVisibility.groups.B, true);
        });

        // ------------------------------------------------------------
        module("wrappers / ChartSeries / toggleVisibility / pie", {
            setup: function() {
                chart = createChart({
                    series: [{
                        type: "pie",
                        data: [{ value: 1, category: "foo" }, { value: 2, category: "bar" }],
                        field: "value",
                        categoryField: "category"
                    }]
                });
                chartSeries = chart.findSeriesByIndex(0);
            },
            teardown: destroyChart
        });

        test("shows/hides series points", function() {
            var filter = function(item) {
                return item.value === 1;
            };
            chartSeries.toggleVisibility(false, filter);
            var points = chart._plotArea.pointsBySeriesIndex(0);
            equal(points.length, 1);
            equal(points[0].value, 2);

            chartSeries.toggleVisibility(true, filter);
            var points = chart._plotArea.pointsBySeriesIndex(0);
            equal(points.length, 2);
            equal(points[0].value, 1);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        module("getAxis", {
            setup: function() {
                chart = createChart({
                    valueAxes: {
                        name: "value"
                    },
                    categoryAxis: {
                        name: "category"
                    }
                });
            },
            teardown: destroyChart
        });

        test("returns ChartAxis with the axis based on the name", function() {
            var axes = chart._plotArea.axes;
            var categoryAxis;
            var valueAxis;
            var axis = chart.getAxis("category");
            if (axes[0].options.name == "category") {
                categoryAxis = axes[0];
                valueAxis = axes[1];
            } else {
                categoryAxis = axes[1];
                valueAxis = axes[0];
            }
            ok(axis instanceof dataviz.ChartAxis);
            ok(axis._axis === categoryAxis);

            axis = chart.getAxis("value");
            ok(axis._axis === valueAxis);
        });

        test("returns nothing if there isn't an axis with matching name", function() {
            ok(chart.getAxis("foo") === undefined);
        });
    })();

        // ------------------------------------------------------------
    (function() {
        module("findSeries", {
            setup: function() {
                chart = createChart({
                series: [{ data: [1, 2]}, { data: [3, 4] }]
                });
            },
            teardown: destroyChart
        });

        test("returns ChartSeries based on passed function", function() {
            var series = chart.findSeries(function(series) {
                return $.inArray(3, series.data) >= 0;
            });

            ok(series instanceof dataviz.ChartSeries);
            equal(series.data()[0], 3);
        });

        test("returns nothing if the function does not return true for any series", function() {
            ok(chart.findSeries(function() {}) === undefined);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var chart;
        function setupChart(options) {
            chart = createChart(options);
        }

        module("toggleHighlight", {
            teardown: destroyChart
        });

        test("toggles donut chart point highlight by series and category", 6, function() {
            setupChart({
                series: [{
                    type: "donut",
                    name: "foo",
                    data: [{
                        value: 1,
                        category: "bar"
                    }]
                }, {
                    type: "donut",
                    name: "baz",
                    data: [{
                        value: 1,
                        category: "qux"
                    }],
                    value: 1
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                equal(point.series.name, "baz");
                equal(point.category, "qux");
                equal(show, showHighlight);
            };
            chart.toggleHighlight(showHighlight, {
                series: "baz",
                category: "qux"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, {
                series: "baz",
                category: "qux"
            });
        });

        test("does not toggle donut chart point highlight if there isn't point with matching series and category", 0, function() {
            setupChart({
                series: [{
                    type: "donut",
                    name: "foo",
                    data: [{
                        value: 1,
                        category: "bar"
                    }]
                }, {
                    type: "donut",
                    name: "baz",
                    data: [{
                        value: 1,
                        category: "qux"
                    }],
                    value: 1
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                ok(false);
            };
            chart.toggleHighlight(showHighlight, {
                series: "foo",
                category: "qux"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, {
                series: "baz",
                category: "bar"
            });
        });

        test("toggles pie chart point highlight by category", 4, function() {
            setupChart({
                series: [{
                    type: "pie",
                    data: [{
                        value: 1,
                        category: "foo"
                    }, {
                        value: 1,
                        category: "bar"
                    }]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                equal(point.category, "bar");
                equal(show, showHighlight);
            };
            chart.toggleHighlight(showHighlight, {
                category: "bar"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, "bar");
        });

        test("does not toggle pie chart point highlight if there isn't category with matching name", 0, function() {
            setupChart({
                series: [{
                    type: "pie",
                    data: [{
                        value: 1,
                        category: "foo"
                    }, {
                        value: 1,
                        category: "bar"
                    }]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                ok(false);
            };
            chart.toggleHighlight(showHighlight, {
                category: "baz"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, "baz");
        });

        test("toggles categorical chart series points highlight by series name", 8, function() {
            setupChart({
                series: [{
                    type: "column",
                    name: "column",
                    data: [1, 2]
                }, {
                    type: "line",
                    name: "line",
                    data: [3, 4]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                equal(point.series.name, "line");
                equal(show, showHighlight);
            };
            chart.toggleHighlight(showHighlight, {
                series: "line"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, "line");
        });

        test("does not toggle categorical chart points highlight if there isn't series with matching name", 0, function() {
            setupChart({
                series: [{
                    type: "column",
                    name: "column",
                    data: [1, 2]
                }, {
                    type: "line",
                    name: "line",
                    data: [3, 4]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                ok(false);
            };
            chart.toggleHighlight(showHighlight, {
                series: "foo"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, "foo");
        });

        test("toggles scatter chart series points highlight by series name", 8, function() {
            setupChart({
                series: [{
                    type: "scatter",
                    name: "A",
                    data: [[1, 2], [3, 4]]
                }, {
                    type: "scatter",
                    name: "B",
                    data: [[5, 6], [7, 8]]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                equal(point.series.name, "A");
                equal(show, showHighlight);
            };
            chart.toggleHighlight(showHighlight, {
                series: "A"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, "A");
        });

        test("does no toggle scatter chart points highlight if there isn't series with matching name", 0, function() {
            setupChart({
                series: [{
                    type: "scatter",
                    name: "A",
                    data: [[1, 2], [3, 4]]
                }, {
                    type: "scatter",
                    name: "B",
                    data: [[5, 6], [7, 8]]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                ok(false);
            };
            chart.toggleHighlight(showHighlight, {
                series: "foo"
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, "foo");
        });

        test("toggles chart points highlight using function", 4, function() {
            setupChart({
                series: [{
                    type: "column",
                    name: "column",
                    data: [1, 2]
                }, {
                    type: "line",
                    name: "line",
                    data: [3, 4]
                }]
            });

            var showHighlight = true;
            chart._highlight.togglePointHighlight = function(point, show) {
                equal(point.value, 1);
                equal(show, showHighlight);
            };

            chart.toggleHighlight(showHighlight, function(point) {
                return point.value === 1;
            });
            showHighlight = false;
            chart.toggleHighlight(showHighlight, function(point) {
                return point.value === 1;
            });
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var chart;

        module("show/hide Tooltip", {
            setup: function() {
                chart = createChart({
                    series: [{
                        data: [1, 2, 2]
                    }]
                });
            },
            teardown: destroyChart
        });

        test("shows tooltip for filtered point", function() {
           chart._tooltip.show = function(e) {
               var point = e.point;
               equal(point.value, 1);
           };
           chart.showTooltip(function(point) {
               return point.value === 1;
           });
        });

        test("shows tooltip for the first point if the filter matches multiple points", function() {
           chart._tooltip.show = function(e) {
               var point = e.point;
               equal(point.value, 2);
               equal(point.categoryIx, 1);
           };
           chart.showTooltip(function(point) {
               return point.value === 2;
           });
        });

        test("does nothing if no filter is passed", 0, function() {
            chart._tooltip.show = function() {
               ok(false);
            };
            chart.showTooltip();
        });

        test("does nothing if the filter returns no points", 0, function() {
            chart._tooltip.show = function() {
               ok(false);
            };

            chart.showTooltip(function() {
                return false;
            });
        });

        test("hide hides tooltip", function() {
            chart._tooltip.hide = function() {
               ok(true);
            };
            chart.hideTooltip();
        });
        // ------------------------------------------------------------
        module("show/hide Tooltip / shared", {
            setup: function() {
                chart = createChart({
                    series: [{
                        data: [1, 2, 2]
                    }, {
                        data: [3, 4, 5]
                    }],
                    tooltip: {
                        shared: true,
                        visible: true
                    }
                });
            },
            teardown: destroyChart
        });

        test("shows tooltip for filtered point", function() {
           chart._tooltip.show = function(e) {
               var points = e.points;
               equal(points[0].value, 1);
               equal(points[1].value, 3);
           };
           chart.showTooltip(function(point) {
               return point.value === 1;
           });
        });

        test("shows tooltip for the first point if the filter matches multiple points", function() {
           chart._tooltip.show = function(e) {
               var points = e.points;
               equal(points[0].value, 2);
               equal(points[1].value, 4);
               equal(points[0].categoryIx, 1);
           };
           chart.showTooltip(function(point) {
               return point.value === 2;
           });
        });

        test("does nothing if no filter is passed", 0, function() {
            chart._tooltip.show = function() {
               ok(false);
            };
            chart.showTooltip();
        });

        test("does nothing if the filter returns no points", 0, function() {
            chart._tooltip.show = function() {
               ok(false);
            };

            chart.showTooltip(function() {
                return false;
            });
        });

        test("hide hides tooltip", function() {
            chart._tooltip.hide = function() {
               ok(true);
            };
            chart.hideTooltip();
        });

    })();

    (function() {

        // ------------------------------------------------------------
        module("visual sender", {
            teardown: destroyChart
        });

        test("sender is the chart widget", function() {
            var sender;

            var chart = createChart({
                series: [{
                    type: "bar",
                    data: [1],
                    visual: function(e) {
                       sender = e.sender;
                    }
                }]
            });

            ok(sender === chart);
        });

        test("sender is the chart widget after partial redraw", function() {
            var partial;

            var chart = createChart({
                series: [{
                    type: "bar",
                    data: [1],
                    visual: function(e) {
                        if (partial) {
                            ok(chart === e.sender);
                        }
                    }
                }]
            });

            partial = true;
            var plotArea = chart._plotArea;
            plotArea.redraw(plotArea.panes);
        });

    })();

    (function() {

        // ------------------------------------------------------------
        module("custom gradients", {
            teardown: destroyChart
        });

        test("are recognized by the chart", function() {
            kendo.dataviz.Gradients.custom = {
              type: "linear",
              stops: [{
                offset: 0,
                color: "foo"
              }, {
                offset: 1,
                color: "bar"
              }]
            };

            var chart = createChart({
                series: [{
                    type: "bar",
                    data: [1],
                    overlay: {
                       gradient: "custom"
                    }
                }]
            });

            var overlayFill = chart._plotArea.charts[0].points[0].visual.children[1].options.fill;
            equal(overlayFill.stops[0].options.color, "foo");
            equal(overlayFill.stops[1].options.color, "bar");
        });
    })();
})();
