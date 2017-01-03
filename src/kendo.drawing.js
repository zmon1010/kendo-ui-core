(function(f, define){
    define([
        "./drawing/util",
        "./drawing/kendo-drawing",
        "./drawing/surface-tooltip",
        "./drawing/surface",
        "./drawing/html"
    ], f);
})(function(){

    var __meta__ = { // jshint ignore:line
        id: "drawing",
        name: "Drawing API",
        category: "framework",
        description: "The Kendo UI low-level drawing API",
        depends: [ "core", "color", "popup" ]
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });