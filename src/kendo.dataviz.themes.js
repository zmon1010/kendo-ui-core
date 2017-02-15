(function(f, define){
    define([
        "./kendo.dataviz.core",
        "./dataviz/themes/chart-base-theme",
        "./dataviz/themes/auto-theme",
        "./dataviz/themes/themes"
    ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dataviz.themes",
    name: "Themes",
    description: "Built-in themes for the DataViz widgets",
    category: "dataviz",
    depends: [ "dataviz.core" ],
    hidden: true
};

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
