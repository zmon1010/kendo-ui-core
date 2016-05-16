(function() {
    var dataviz = kendo.dataviz;
    var deepExtend = kendo.deepExtend;
    var StockChart = dataviz.ui.StockChart;

    var chart;
    var plotArea;

    function createStockChart(options) {
        var div = $("<div id='container' />").appendTo(QUnit.fixture);
        chart = div.kendoStockChart(options).data("kendoStockChart");
    }

    // ------------------------------------------------------------
    module("API", {
        setup: () => createStockChart({}),
        teardown: () => destroyChart()
    });

    test("setOptions doesn't throw an error", 0, function() {
        chart.setOptions({});
    });

})();
