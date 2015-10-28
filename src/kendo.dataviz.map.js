(function(f, define){
    define([
        "./kendo.data", "./kendo.userevents", "./kendo.tooltip", "./kendo.mobile.scroller", "./kendo.draganddrop",
        "./kendo.drawing",

        "./dataviz/map/location",
        "./dataviz/map/attribution",
        "./dataviz/map/navigator",
        "./dataviz/map/zoom",
        "./dataviz/map/crs",
        "./dataviz/map/layers/base",
        "./dataviz/map/layers/shape",
        "./dataviz/map/layers/bubble",
        "./dataviz/map/layers/tile",
        "./dataviz/map/layers/bing",
        "./dataviz/map/layers/marker",
        "./dataviz/map/main"
    ], f);
})(function(){

    var __meta__ = { // jshint ignore:line
        id: "dataviz.map",
        name: "Map",
        category: "dataviz",
        description: "The Kendo DataViz Map displays spatial data",
        depends: [ "data", "userevents", "tooltip", "dataviz.core", "drawing", "mobile.scroller" ]
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
