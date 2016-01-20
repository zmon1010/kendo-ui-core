(function(f, define){
    define([ "./kendo.dataviz", "./kendo.mobile" ], f);
})(function(){
    "bundle all";
    return window.kendo;
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
