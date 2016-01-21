// ------------------------------------------------------------
(function() {
    var chart;
    var zoom;

    module("MousewheelZoom", {
        setup: function() {
            chart = createChart({
                xAxis: [{}, {}],
                yAxis: [{}, {}],
                series: [{
                    type: "scatterLine",
                    data: []
                }],
                pannable: true,
                zoomable: true
            });

            zoom = new kendo.dataviz.MousewheelZoom(chart, {
                key: "none"
            });
        },
        teardown: function() {
            destroyChart();
        }
    });

    test("Scatter Chart w/multiple axes", function() {
        zoom.updateRanges(2);
        zoom.zoom();

        ok(true);
    });
})();
