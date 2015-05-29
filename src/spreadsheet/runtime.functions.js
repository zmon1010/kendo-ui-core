// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime.js" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, validthis:true */

    var spreadsheet = kendo.spreadsheet;
    var calc = spreadsheet.calc;
    var runtime = calc.runtime;
    var forNumbers = runtime.forNumbers;
    var cellValues = runtime.cellValues;
    var defineFunction = runtime.defineFunction;
    var CalcError = runtime.CalcError;
    var resolveCells = runtime.resolveCells;
    var divide = runtime.divide;

    /* -----[ Math functions ]----- */

    defNumeric("abs", 1, Math.abs);
    defNumeric("cos", 1, Math.cos);
    defNumeric("sin", 1, Math.sin);
    defNumeric("acos", 1, Math.acos);
    defNumeric("asin", 1, Math.asin);
    defNumeric("tan", 1, Math.tan);
    defNumeric("atan", 1, Math.atan);
    defNumeric("exp", 1, Math.exp);
    defNumeric("log", 1, Math.log);
    defNumeric("power", 2, Math.pow);

    defineFunction("sum", function(callback, args){
        var sum = 0;
        forNumbers(this, cellValues(this, args), function(num){
            sum += num;
        });
        callback(sum);
    });

    /* -----[ Statistical functions ]----- */

    defineFunction("average", function(callback, args){
        var sum = 0, count = 0;
        forNumbers(this, cellValues(this, args), function(num){
            sum += num;
            ++count;
        });
        divide.call(this, callback, sum, count);
    });

    // https://support.office.com/en-sg/article/AVEDEV-function-ec78fa01-4755-466c-9a2b-0c4f9eacaf6d
    defineFunction("avgdev", function(callback, args){
        var sum = 0, numbers = [];
        forNumbers(this, cellValues(this, args), function(num){
            sum += num;
            numbers.push(num);
        });
        var avg = sum / numbers.length;
        sum = 0;
        numbers.forEach(function(num){
            sum += Math.abs(num - avg);
        });
        divide.call(this, callback, sum, numbers.length);
    });

    /* -----[ Other ]----- */

    // XXX: does more work than needed
    defineFunction("indirect", function(callback, args){
        cellValues(this, args, function(thing){
            try {
                if (typeof thing != "string") {
                    throw 1;
                }
                var ref = calc.parseFormula(this.sheet, this.row, this.col, thing);
                if (ref.ast.type != "ref") {
                    throw 1;
                }
                ref = ref.ast;
                resolveCells(this, [ ref ], function(){
                    callback(ref);
                });
            } catch(ex) {
                this.error(new CalcError("REF"));
            }
        });
    });

    defineFunction("rand", function(callback) {
        callback(Math.random());
    });

    //// utils

    function defNumeric(name, nargs, func) {
        return defineFunction(name, function(callback, args){
            if (args.length != nargs) {
                return this.error(new CalcError("N/A"));
            }
            args = cellValues(this, args);
            for (var i = 0; i < args.length; ++i) {
                var num = args[i];
                if (num == null || num === "") {
                    num = 0;
                }
                if (typeof num != "number") {
                    return this.error(new CalcError("VALUE"));
                }
                args[i] = num;
            }
            callback(func.apply(null, args));
        });
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
