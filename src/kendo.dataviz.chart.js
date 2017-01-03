(function(f, define){
    define([
        "./dataviz/chart/kendo-chart",
        "./dataviz/chart/chart"
    ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dataviz.chart",
    name: "Chart",
    category: "dataviz",
    description: "The Chart widget uses modern browser technologies to render high-quality data visualizations in the browser.",
    depends: [ "data", "userevents", "drawing", "dataviz.core", "dataviz.themes" ],
    features: [{
        id: "dataviz.chart-pdf-export",
        name: "PDF export",
        description: "Export Chart as PDF",
        depends: [ "pdf" ]
    }]
};

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
