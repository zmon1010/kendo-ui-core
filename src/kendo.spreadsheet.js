(function(f, define){
    define([
        "./spreadsheet/rangelist",
        "./spreadsheet/grid",
        "./spreadsheet/sorter"
    ], f);
})(function(){
    var __meta__ = {
        id: "spreadsheet",
        name: "SpreadSheet",
        category: "web",
        description: "SpreadSheet component",
        depends: [],
        features: []
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
