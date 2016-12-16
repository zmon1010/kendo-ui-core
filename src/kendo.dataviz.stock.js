(function(f, define){
    define([ "./dataviz/stock-chart/kendo-stock-chart", "./dataviz/stock-chart/stock-chart" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dataviz.stockchart",
    name: "StockChart",
    category: "dataviz",
    description: "StockChart widget and associated financial series.",
    depends: [ "dataviz.chart" ]
};

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });