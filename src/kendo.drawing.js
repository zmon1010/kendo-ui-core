(function(f, define){
    define([
        "./kendo.color",
        "./util/main",
        "./util/text-metrics",
        "./util/base64",
        "./mixins/observers",
        "./drawing/geometry",
        "./drawing/core",
        "./drawing/mixins",
        "./drawing/shapes",
        "./drawing/parser",
        "./drawing/svg",
        "./drawing/canvas",
        "./drawing/vml",
        "./drawing/html",
        "./drawing/animation"
    ], f);
})(function(){

    var __meta__ = { // jshint ignore:line
        id: "drawing",
        name: "Drawing API",
        category: "framework",
        description: "The Kendo UI low-level drawing API",
        depends: [ "core", "color" ]
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
