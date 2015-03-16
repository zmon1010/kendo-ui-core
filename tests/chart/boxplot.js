// ------------------------------------------------------------
(function() {
    var chart;

    module("Chart / Box Plot /", {
        teardown: destroyChart
    });

    test("setting 0 for median doesn't blow up", function() {
        createChart({
            series: [{
                type: "boxPlot",
                data: [{"LowerQ1": 1, "Q1": 1, "Median": 2, "Mean": 0, "Q3": 3, "UpperQ3": 4}],
                lowerField: "LowerQ1",
                q1Field: "Q1",
                medianField: "Median",
                q3Field: "Q3",
                upperField: "UpperQ3",
                meanField: "Mean"
            }]
        });

        ok(true);
    });
})();
