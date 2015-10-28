(function(f, define){
    define([ "./kendo.web", "./kendo.dataviz", "./kendo.mobile", "./kendo.drawing", "./kendo.dom"  ], f);
})(function(){
    "bundle all";
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
