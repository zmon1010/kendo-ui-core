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
    var NOVALUE = {};

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

    defineFunction("sumif", function(callback, args){
        assertArgs.call(this, args, 2, function(range, cmp){
            cmp = parseComparator(cmp);
            var sum = 0;
            forNumbers(this, cellValues(this, [range]), function(num){
                if (cmp(num)) {
                    sum += num;
                }
            });
            callback(sum);
        });
    });

    defineFunction("count", function(callback, args){
        var count = 0;
        cellValues(this, args).forEach(function(val){
            if (val != null && val !== "") {
                count++;
            }
        });
        callback(count);
    });

    defineFunction("countif", function(callback, args){
        assertArgs.call(this, args, 2, function(range, cmp){
            cmp = parseComparator(cmp);
            var count = 0;
            cellValues(this, [range]).forEach(function(val){
                if (cmp(val)) {
                    count++;
                }
            });
            callback(count);
        });
    });

    defNumeric("fact", 1, function(n){
        for (var i = 2, fact = 1; i <= n; ++i) {
            fact *= i;
        }
        return fact;
    });

    defNumeric("factdouble", 1, function(n){
        n = n|0;
        for (var i = 2 + (n&1), fact = 1; i <= n; i += 2) {
            fact *= i;
        }
        return fact;
    });

    defNumeric("combin", 2, function(n, k){
        if (n < 0 || k < 0 || k > n) {
            this.error(new CalcError("NUM"));
            return NOVALUE;
        }
        for (var f1 = k + 1, f2 = 1, p1 = 1, p2 = 1; f2 <= n - k; ++f1, ++f2) {
            p1 *= f1;
            p2 *= f2;
        }
        return p1/p2;
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
            var ret = func.apply(this, args);
            if (ret !== NOVALUE) {
                callback(ret);
            }
        });
    }

    function makeComparator(cmp, b) {
        return function(a) {
            if (typeof a != "string") {
                a = a == null ? "" : a + "";
            }
            return cmp(a, b);
        };
    }

    function compLT(a, b) { return a < b; }
    function compLTE(a, b) { return a <= b; }
    function compGT(a, b) { return a > b; }
    function compGTE(a, b) { return a >= b; }
    function compEQ(a, b) { return a === b; }

    function parseComparator(cmp) {
        var m;
        if ((m = /^=(.*)$/.exec(cmp))) {
            return makeComparator(compEQ, m[1]);
        }
        if ((m = /^<=(.*)$/.exec(cmp))) {
            return makeComparator(compLTE, m[1]);
        }
        if ((m = /^<(.*)$/.exec(cmp))) {
            return makeComparator(compLT, m[1]);
        }
        if ((m = /^>=(.*)$/.exec(cmp))) {
            return makeComparator(compGTE, m[1]);
        }
        if ((m = /^>(.*)$/.exec(cmp))) {
            return makeComparator(compGT, m[1]);
        }
        return makeComparator(compEQ, cmp);
    }

    function assertArgs(args, n, f) {
        if (args.length != n) {
            return this.error(new CalcError("N/A"));
        }
        f.apply(this, args);
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
