// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./calc" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true */

    var exports = kendo.spreadsheet.calc.Runtime = {};

    function Ref(){}

    CellRef.prototype = new Ref();
    ColRef.prototype = new Ref();
    RowRef.prototype = new Ref();
    NameRef.prototype = new Ref();

    function CellRef(row, col) {
        this.row = row;
        this.col = col;
    }

    function ColRef(col) {
        this.col = col;
    }

    function RowRef(row) {
        this.row = row;
    }

    function RangeRef(tl, br) {
        this.topLeft = tl;
        this.bottomRight = br;
    }

    function NameRef(name) {
        this.name = name;
    }

    function extend(obj, methods) {
        for (var i in methods) {
            if (Object.prototype.hasOwnProperty.call(methods, i)) {
                obj.prototype[i] = methods[i];
            }
        }
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
