(function(f, define){
    define([
        "./dataviz/core/kendo-core",
        "./dataviz/core/core"
    ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dataviz.core",
    name: "Core",
    description: "The DataViz core functions",
    category: "dataviz",
    depends: [ "core", "drawing" ],
    hidden: true
};

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });