(function(f, define){
    define([ "./kendo.core", "./kendo.drawing", "./pdf/core", "./pdf/mixins" ], f);

}) (function(){

var __meta__ = { // jshint ignore:line
    id: "pdf",
    name: "PDF export",
    description: "PDF Generation framework",
    mixin: true,
    category: "framework",
    depends: [ "core", "drawing" ]
};

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
