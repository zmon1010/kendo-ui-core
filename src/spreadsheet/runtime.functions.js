// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime.js" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, validthis:true */

    var spreadsheet = kendo.spreadsheet;
    var calc = spreadsheet.calc;
    var runtime = calc.runtime;
    var defineFunction = runtime.defineFunction;
    var CalcError = runtime.CalcError;
    var RangeRef = spreadsheet.RangeRef;
    var CellRef = spreadsheet.CellRef;
    var Ref = spreadsheet.Ref;

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
    defNumeric("mod", 2, function(left, right){
        return left % right;
    });

    defineFunction("sum", function(callback, args){
        var sum = 0;
        this.forNumbers(args, function(num){
            sum += num;
        });
        callback(sum);
    });

    defineFunction("counta", function(callback, args){
        callback(this.cellValues(args).length);
    });

    defineFunction("count", function(callback, args){
        var count = 0;
        this.cellValues(args).forEach(function(val){
            if (typeof val == "number" || val instanceof Date) {
                count++;
            }
        });
        callback(count);
    });

    defineFunction("countunique", function(callback, args){
        var count = 0, seen = [];
        this.cellValues(args).forEach(function(val){
            if (seen.indexOf(val) < 0) {
                count++;
                seen.push(val);
            }
        });
        callback(count);
    });

    defineFunction("countblank", function(callback, args){
        var count = 0;
        this.cellValues(args).forEach(function(val){
            if (val === "") {
                count++;
            }
        });
        callback(count);
    });

    /* -----[ the "*IFS" functions ]----- */

    // helper function: take `args` like COUNTIFS (see Excel docs) and
    // calls `f` for each cell matching all criteria.  `f` receives
    // `chunks` (parsed args containing matrix and predicate) and
    // row,col of matching cells.
    function forIFS(args, f) {
        var chunks = [], nrows, ncols, i = 0;
        while (i < args.length) {
            var matrix = this.asMatrix(args[i++]);
            var crit = args[i++];
            if (!matrix || !crit) {
                return this.error(new CalcError("N/A"));
            }
            if (nrows == null) {
                ncols = matrix.width;
                nrows = matrix.height;
            } else {
                if (matrix.width != ncols || matrix.height != nrows) {
                    return this.error(new CalcError("REF"));
                }
            }
            chunks.push({ matrix: matrix, pred: parseComparator(crit) });
        }
        ROW: for (var row = 0; row < nrows; ++row) {
            COL: for (var col = 0; col < ncols; ++col) {
                for (i = 0; i < chunks.length; ++i) {
                    var val = chunks[i].matrix.get(row, col);
                    if (!chunks[i].pred(val == null || val === "" ? 0 : val)) {
                        continue COL;
                    }
                }
                f(chunks, row, col);
            }
        }
    }

    defineFunction("countifs", function(callback, args){
        var count = 0;
        var error = forIFS.call(this, args, function(){
            count++;
        });
        if (!error) {
            callback(count);
        }
    });

    defineFunction("sumifs", function(callback, args){
        // hack: insert a predicate that filters out non-numeric
        // values; should also accept blank cells.  it's safe to
        // modify args.
        args.splice(1, 0, numericPredicate);
        var sum = 0;
        var error = forIFS.call(this, args, function(chunks, row, col){
            // range to sum up is the first argument, hence chunks[0]
            var val = chunks[0].matrix.get(row, col);
            if (val) {
                sum += val;
            }
        });
        callback(sum);
    });

    // similar to sumifs, but compute average of matching cells
    defineFunction("averageifs", function(callback, args){
        args.splice(1, 0, numericPredicate);
        var sum = 0, count = 0;
        var error = forIFS.call(this, args, function(chunks, row, col){
            var val = chunks[0].matrix.get(row, col);
            if (val == null || val === "") {
                val = 0;
            }
            sum += val;
            count++;
        });
        if (!error) {
            this.divide(callback, sum, count);
        }
    });

    defineFunction("countif", function(callback, args){
        assertArgs.call(this, args, 2, function(range, cmp){
            cmp = parseComparator(cmp);
            var count = 0;
            this.cellValues([range]).forEach(function(val){
                if (cmp(val)) {
                    count++;
                }
            });
            callback(count);
        });
    });

    // sumif and averageif are actually quite different, in that they may take a range reference as
    // "criterion", in which case they return a matrix (the sum/average of numbers that match each
    // cell in the criterion range).
    (function(handle){
        handle("sumif", function(numbers){
            var sum = 0;
            for (var i = numbers.length; --i >= 0;) {
                sum += numbers[i];
            }
            return sum;
        });
        handle("averageif", function(numbers){
            var n = numbers.length, i = n;
            if (!i) {
                return new CalcError("DIV/0");
            }
            var sum = 0;
            while (--i >= 0) {
                sum += numbers[i];
            }
            return sum / n;
        });
    })(function(fname, handler){
        defineFunction(fname, function(callback, args){
            var self = this;
            if (args.length < 2 || args.length > 3) {
                return self.error(new CalcError("N/A"));
            }

            var numRange = args[0];
            if (args.length == 3) {
                numRange = args[2];
            }
            var critRange = args[0];
            var numMatrix = self.asMatrix(numRange), critMatrix;
            if (numRange === critRange) {
                critMatrix = numMatrix;
            } else {
                critMatrix = self.asMatrix(critRange);
            }

            var predicate = args[1];
            var predMatrix = self.asMatrix(predicate);
            if (predMatrix) {
                return callback(predMatrix.map(function(predicate){
                    return sumOf(predicate);
                }));
            }
            return callback(sumOf(self.cellValues([ predicate ])[0]));

            function sumOf(pred) {
                pred = parseComparator(pred);
                var a = [];
                critMatrix.each(function(n, row, col){
                    if (pred(n)) {
                        a.push(numMatrix.get(row, col));
                    }
                });
                return handler(a);
            }
        });
    });

    /* -----[  ]----- */

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
            return this.error(new CalcError("NUM"));
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
        this.forNumbers(args, function(num){
            sum += num;
            ++count;
        });
        this.divide(callback, sum, count);
    });

    defineFunction("averagea", function(callback, args){
        var sum = 0, count = 0;
        this.cellValues(args).forEach(function(num){
            if (typeof num != "string") {
                sum += num;
            }
            ++count;
        });
        this.divide(callback, sum, count);
    });

    // https://support.office.com/en-sg/article/AVEDEV-function-ec78fa01-4755-466c-9a2b-0c4f9eacaf6d
    defineFunction("avedev", function(callback, args){
        if (args.length < 2) {
            return this.error(new CalcError("NUM"));
        }
        var sum = 0, numbers = [];
        this.forNumbers(args, function(num){
            sum += num;
            numbers.push(num);
        });
        var avg = sum / numbers.length;
        sum = 0;
        numbers.forEach(function(num){
            sum += Math.abs(num - avg);
        });
        this.divide(callback, sum, numbers.length);
    });

    /* -----[ Other ]----- */

    // XXX: does more work than needed
    defineFunction("indirect", function(callback, args){
        this.cellValues(args, function(thing){
            try {
                if (typeof thing != "string") {
                    throw 1;
                }
                var ref = calc.parseFormula(this.sheet, this.row, this.col, thing);
                if (!(ref.ast instanceof Ref)) {
                    throw 1;
                }
                ref = ref.ast.absolute(this.row, this.col);
                this.resolveCells([ ref ], function(){
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

    defNumeric("true", 0, function(){ return true; });
    defNumeric("false", 0, function(){ return false; });

    //// utils

    function defNumeric(name, nargs, func) {
        if (nargs == 1) {
            func = runtime.arrayHandler1(func);
        } else if (nargs == 2) {
            func = runtime.arrayHandler2(func);
        } else if (nargs > 2) {
            throw new Error("Use defNumeric for functions of at most 2 arguments");
        }
        return defineFunction(name, function(callback, args){
            if (args.length != nargs) {
                return this.error(new CalcError("N/A"));
            }
            // XXX: type checking
            // args = this.cellValues(args);
            // for (var i = 0; i < args.length; ++i) {
            //     var num = args[i];
            //     if (num == null || num === "") {
            //         num = 0;
            //     }
            //     if (typeof num != "number") {
            //         return this.error(new CalcError("VALUE"));
            //     }
            //     args[i] = num;
            // }
            var ret = func.apply(this, args);
            if (!(ret instanceof CalcError)) {
                callback(ret);
            }
        });
    }

    function makeComparator(cmp, x) {
        if (typeof x == "string") {
            var num = parseFloat(x);
            if (!isNaN(num)) {
                x = num;
            }
        }
        return function(a) {
            var b = x;
            if (typeof a == "string" && typeof b == "string") {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }
            return cmp(a, b);
        };
    }

    function compLT(a, b) { return a < b; }
    function compLTE(a, b) { return a <= b; }
    function compGT(a, b) { return a > b; }
    function compGTE(a, b) { return a >= b; }
    function compNE(a, b) { return a != b; }
    function compEQ(a, b) {
        if (b instanceof RegExp) {
            return b.test(a);
        }
        return a == b;
    }

    var RXCACHE = {};

    function parseComparator(cmp) {
        if (typeof cmp == "function") {
            return cmp;
        }
        var m;
        if ((m = /^=(.*)$/.exec(cmp))) {
            return makeComparator(compEQ, m[1]);
        }
        if ((m = /^<>(.*)$/.exec(cmp))) {
            return makeComparator(compNE, m[1]);
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
        if (/[?*]/.exec(cmp)) {
            // has wildchars
            var rx;
            if (Object.prototype.hasOwnProperty.call(RXCACHE, cmp)) {
                rx = RXCACHE[cmp];
            } else {
                rx = cmp.replace(/(~\?|~\*|[\]({\+\.\|\^\$\\})\[]|[?*])/g, function(s){
                    switch (s) {
                      case "~?" : return "\\?";
                      case "~*" : return "\\*";
                      case "?"  : return ".";
                      case "*"  : return ".*";
                      default   : return "\\" + s;
                    }
                });
                rx = RXCACHE[cmp] = new RegExp("^" + rx + "$", "i");
            }
            return makeComparator(compEQ, rx);
        }
        return makeComparator(compEQ, cmp);
    }

    function assertArgs(args, n, f) {
        if (args.length != n) {
            return this.error(new CalcError("N/A"));
        }
        f.apply(this, args);
    }

    function numericPredicate(val) {
        return typeof val == "number"
            || typeof val == "boolean"
            || val == null
            || val === "";
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
