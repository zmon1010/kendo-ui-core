(function(f, define){
    define([
        "./kendo.core",
        "./kendo.fx",
        "./kendo.router",
        "./kendo.view",
        "./kendo.data.odata",
        "./kendo.data.xml",
        "./kendo.data",
        "./kendo.data.signalr",
        "./kendo.binder",
        "./kendo.userevents",
        "./kendo.draganddrop",
        "./kendo.mobile.scroller",
        "./kendo.popup",
        "./kendo.tooltip",
        "./kendo.drawing",
        "./kendo.dataviz.core",
        "./kendo.dataviz.themes",
        "./kendo.dataviz.chart",
        "./kendo.dataviz.chart.polar",
        "./kendo.dataviz.chart.funnel",
        "./kendo.dataviz.gauge",
        "./kendo.dataviz.barcode",
        "./kendo.dataviz.qrcode",
        "./kendo.dataviz.stock",
        "./kendo.dataviz.sparkline",
        "./kendo.dataviz.map",
        "./kendo.dataviz.diagram",
        "./kendo.dataviz.treemap",
        "./kendo.angular",
        "./kendo.webcomponents",
        "./kendo.angular2"
    ], f);
})(function(){
    "bundle all";
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
