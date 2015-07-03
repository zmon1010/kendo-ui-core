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
    var UnionRef = spreadsheet.UnionRef;
    var Matrix = runtime.Matrix;
    var Ref = spreadsheet.Ref;

    /* -----[ Math functions ]----- */

    [ "abs", "cos", "sin", "acos", "asin", "tan", "atan", "exp", "log" ].forEach(function(name){
        defineFunction(name, Math[name]).args([
            [ "n", "*number" ]
        ]);
    });

    defineFunction("power", function(a, b){
        return Math.pow(a, b);
    }).args([
        [ "a", "*number" ],
        [ "b", "*number" ]
    ]);

    defineFunction("mod", function(a, b){
        return a % b;
    }).args([
        [ "a", "*number" ],
        [ "b", "*divisor" ]
    ]);

    defineFunction("sum", function(numbers){
        return numbers.reduce(function(sum, num){
            return sum + num;
        }, 0);
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("min", function(numbers){
        if (numbers.length) {
            return Math.min.apply(Math, numbers);
        } else {
            return new CalcError("N/A");
        }
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("max", function(numbers){
        if (numbers.length) {
            return Math.max.apply(Math, numbers);
        } else {
            return new CalcError("N/A");
        }
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("counta", function(values){
        return values.length;
    }).args([
        [ "values", [ "collect", "anyvalue" ] ]
    ]);

    defineFunction("count", function(numbers){
        return numbers.length;
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("countunique", function(values){
        var count = 0, seen = [];
        values.forEach(function(val){
            if (seen.indexOf(val) < 0) {
                count++;
                seen.push(val);
            }
        });
        return count;
    }).args([
        [ "values", [ "collect", "anyvalue" ] ]
    ]);

    defineFunction("countblank", function(){
        var count = 0;
        function add(val) {
            if (val == null || val === "") {
                count++;
            }
        }
        function loop(args){
            for (var i = 0; i < args.length; ++i) {
                var x = args[i];
                if (x instanceof Matrix) {
                    x.each(add, true);
                } else {
                    add(x);
                }
            }
        }
        loop(arguments);
        return count;
    }).args([
        [ "+", [ "args", [ "or", "matrix", "anyvalue" ] ] ]
    ]);

    /* -----[ the "*IFS" functions ]----- */

    // helper function: take `args` like COUNTIFS (see Excel docs) and
    // calls `f` for each cell matching all criteria.  `f` receives
    // `chunks` (parsed args containing matrix and predicate) and
    // row,col of matching cells.
    function forIFS(args, f) {
        var chunks = [], i = 0, matrix = args[0];
        while (i < args.length) {
            chunks.push({
                matrix: args[i++],
                pred: parseComparator(args[i++])
            });
        }
        ROW: for (var row = 0; row < matrix.height; ++row) {
            COL: for (var col = 0; col < matrix.width; ++col) {
                for (i = 0; i < chunks.length; ++i) {
                    var val = chunks[i].matrix.get(row, col);
                    if (!chunks[i].pred(val == null || val === "" ? 0 : val)) {
                        continue COL;
                    }
                }
                f(row, col);
            }
        }
    }

    var ARGS_COUNTIFS = [
        [ "m1", "matrix" ],
        [ "c1", "anyvalue" ],
        [ [ "m2", [ "and", "matrix",
                    [ "assert", "$m1.width == $m2.width" ],
                    [ "assert", "$m1.height == $m2.height" ] ] ],
          [ "c2", "anyvalue" ] ]
    ];

    defineFunction("countifs", function(){
        var count = 0;
        forIFS(arguments, function(){ count++; });
        return count;
    }).args(ARGS_COUNTIFS);

    var ARGS_SUMIFS = [
        [ "range", "matrix" ]
    ].concat(ARGS_COUNTIFS);

    defineFunction("sumifs", function(m){
        // hack: insert a predicate that filters out non-numeric
        // values; should also accept blank cells.  it's safe to
        // modify args.
        var args = Array.prototype.slice.call(arguments);
        args.splice(1, 0, numericPredicate);
        var sum = 0;
        forIFS(args, function(row, col){
            var val = m.get(row, col);
            if (val) {
                sum += val;
            }
        });
        return sum;
    }).args(ARGS_SUMIFS);

    // similar to sumifs, but compute average of matching cells
    defineFunction("averageifs", function(m){
        var args = Array.prototype.slice.call(arguments);
        args.splice(1, 0, numericPredicate);
        var sum = 0, count = 0;
        forIFS(args, function(row, col){
            var val = m.get(row, col);
            if (val == null || val === "") {
                val = 0;
            }
            sum += val;
            count++;
        });
        return count ? sum / count : new CalcError("DIV/0");
    }).args(ARGS_SUMIFS);

    defineFunction("countif", function(matrix, criteria){
        criteria = parseComparator(criteria);
        var count = 0;
        matrix.each(function(val){
            if (criteria(val)) {
                count++;
            }
        });
        return count;
    }).args([
        [ "range", "matrix" ],
        [ "criteria", "*anyvalue" ]
    ]);

    var ARGS_SUMIF = [
        [ "range", "matrix" ],
        [ "criteria", "*anyvalue" ],
        [ "sumRange", [ "or",
                        [ "and", "matrix",
                          [ "assert", "$sumRange.width == $range.width" ],
                          [ "assert", "$sumRange.height == $range.height" ] ],
                        [ "null", "$range" ] ] ]
    ];

    defineFunction("sumif", function(range, criteria, sumRange){
        var sum = 0;
        criteria = parseComparator(criteria);
        range.each(function(val, row, col){
            if (criteria(val)) {
                var v = sumRange.get(row, col);
                if (numericPredicate(v)) {
                    sum += v || 0;
                }
            }
        });
        return sum;
    }).args(ARGS_SUMIF);

    defineFunction("averageif", function(range, criteria, sumRange){
        var sum = 0, count = 0;
        criteria = parseComparator(criteria);
        range.each(function(val, row, col){
            if (criteria(val)) {
                var v = sumRange.get(row, col);
                if (numericPredicate(v)) {
                    sum += v || 0;
                    count++;
                }
            }
        });
        return count ? sum / count : new CalcError("DIV/0");
    }).args(ARGS_SUMIF);

    /* -----[  ]----- */

    defineFunction("fact", function(n){
        for (var i = 2, fact = 1; i <= n; ++i) {
            fact *= i;
        }
        return fact;
    }).args([
        [ "n", "*number+" ]
    ]);

    defineFunction("factdouble", function(n){
        n = n|0;
        for (var i = 2 + (n&1), fact = 1; i <= n; i += 2) {
            fact *= i;
        }
        return fact;
    }).args([
        [ "n", "*number+" ]
    ]);

    defineFunction("combin", function(n, k){
        for (var f1 = k + 1, f2 = 1, p1 = 1, p2 = 1; f2 <= n - k; ++f1, ++f2) {
            p1 *= f1;
            p2 *= f2;
        }
        return p1/p2;
    }).args([
        [ "n", "*number++" ],
        [ "k", [ "and", "*number++",
                 [ "assert", "$k <= $n" ] ] ]
    ]);

    /* -----[ Statistical functions ]----- */

    defineFunction("average", function(numbers){
        if (!numbers.length) {
            return new CalcError("DIV/0");
        }
        var sum = numbers.reduce(function(sum, num){
            return sum + num;
        }, 0);
        return sum / numbers.length;
    }).args([
        // most numeric functions must treat booleans as numbers (1 for TRUE
        // and 0 for FALSE), but AVERAGE shouldn't.
        [ "numbers", [ "collect", [ "and", "number",
                                    [ "not", "boolean" ] ] ] ]
    ]);

    defineFunction("averagea", function(values){
        var sum = 0, count = 0;
        values.forEach(function(num){
            if (typeof num != "string") {
                sum += num;
            }
            ++count;
        });
        return count ? sum / count : new CalcError("DIV/0");
    }).args([
        [ "values", [ "collect", "anyvalue" ] ]
    ]);

    // https://support.office.com/en-sg/article/AVEDEV-function-ec78fa01-4755-466c-9a2b-0c4f9eacaf6d
    defineFunction("avedev", function(numbers){
        if (numbers.length < 2) {
            return new CalcError("NUM");
        }
        var avg = numbers.reduce(function(sum, num){
            return sum + num;
        }, 0) / numbers.length;
        return numbers.reduce(function(sum, num){
            return sum + Math.abs(num - avg);
        }, 0) / numbers.length;
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    /* -----[ lookup functions ]----- */

    defineFunction("address", function(row, col, abs, a1, sheet){
        // by some lucky coincidence, we get the corret `rel` value by just subtracting 1 from the
        // abs argument
        var cell = new CellRef(row - 1, col - 1, abs - 1);
        if (sheet) {
            cell.setSheet(sheet, true);
        }
        return a1 ? cell.print(0, 0) : cell.print();
    }).args([
        [ "row", "number++" ],
        [ "col", "number++" ],
        [ "abs", [ "or", [ "null", 1 ], [ "values", 1, 2, 3, 4 ]]],
        [ "a1", [ "or", [ "null", true ], "boolean" ]],
        [ "sheet", [ "or", "null", "string" ]]
    ]);

    defineFunction("areas", function(ref){
        var count = 0;
        (function loop(x){
            if (x instanceof CellRef || x instanceof RangeRef) {
                count++;
            } else if (x instanceof UnionRef) {
                x.refs.forEach(loop);
            }
            // XXX: NameRef if we add support
        })(ref);
        return count;
    }).args([
        [ "ref", "ref" ]
    ]);

    defineFunction("choose", function(index){
        if (index >= arguments.length) {
            return new CalcError("N/A");
        } else {
            return arguments[index];
        }
    }).args([
        [ "index", "*number++" ],
        [ "+", [ "value", "anything" ] ]
    ]);

    defineFunction("column", function(ref){
        if (!ref) {
            return this.col + 1;
        }
        if (ref instanceof CellRef) {
            return ref.col + 1;
        }
        return this.asMatrix(ref).mapCol(function(col){
            return col + ref.topLeft.col + 1;
        });
    }).args([
        [ "ref", [ "or", "area", "null" ]]
    ]);

    defineFunction("columns", function(m){
        return m instanceof Ref ? m.width() : m.width;
    }).args([
        [ "ref", [ "or", "area", "#matrix" ] ]
    ]);

    defineFunction("formulatext", function(ref){
        var cell = this.ss.getRefCells(ref)[0]; // XXX: overkill, but oh well.
        if (!cell.formula) {
            return new CalcError("N/A");
        }
        return cell.formula.print(cell.row, cell.col);
    }).args([
        [ "ref", "ref" ]
    ]);

    defineFunction("hlookup", function(value, m, row, approx){
        var resultCol = null;
        m.eachCol(function(col){
            var data = m.get(0, col);
            if (approx) {
                if (data > value) {
                    return true;
                }
                resultCol = col;
            } else if (data === value) {
                resultCol = col;
                return true;
            }
        });
        if (resultCol == null) {
            return new CalcError("N/A");
        }
        return m.get(row - 1, resultCol);
    }).args([
        [ "value", "anyvalue" ],
        [ "range", "matrix" ],
        [ "row", "number++" ],
        [ "approx", [ "or", "boolean", [ "null", true ]]]
    ]);

    defineFunction("index", function(m, row, col){
        if (row == null && col == null) {
            return new CalcError("N/A");
        }
        if (m.width > 1 && m.height > 1) {
            if (row != null && col != null) {
                return m.get(row - 1, col - 1);
            }
            if (row == null) {
                return m.mapRow(function(row){
                    return m.get(row, col - 1);
                });
            }
            if (col == null) {
                return m.mapCol(function(col){
                    return m.get(row - 1, col);
                });
            }
        }
        if (m.width == 1) {
            return m.get(row - 1, 0);
        }
        if (m.height == 1) {
            return m.get(0, col - 1);
        }
        return new CalcError("REF");
    }).args([
        [ "range", "matrix" ],
        [ "row", [ "or", "number++", "null" ]],
        [ "col", [ "or", "number++", "null" ]]
    ]);

    defineFunction("indirect", function(thing){
        try {
            // XXX: does more work than needed.  we could go for parseReference, but that one
            // doesn't (yet?) support "SheetName!" prefix.
            var exp = calc.parseFormula(this.sheet, this.row, this.col, thing);
            if (!(exp.ast instanceof Ref)) {
                throw 1;
            }
            return exp.ast.absolute(this.row, this.col);
        } catch(ex) {
            return new CalcError("REF");
        }
    }).args([
        [ "thing", "string" ]
    ]);

    // XXX: LOOKUP.  seems to be deprecated in favor of HLOOKUP/VLOOKUP

    // XXX: double-check this one.
    defineFunction("match", function(val, m, type){
        var index = 1, cmp;
        if (type === 0) {
            cmp = parseComparator(val);
        } else if (type === -1) {
            cmp = parseComparator("<=" + val);
        } else if (type === 1) {
            cmp = parseComparator(">=" + val);
        }
        if (m.each(function(el, row, col){
            if (el != null && cmp(el)) {
                if (type !== 0 && val != el) {
                    --index;
                }
                return true;
            }
            index++;
        }, true) && index > 0) {
            return index;
        } else {
            return new CalcError("N/A");
        }
    }).args([
        [ "value", "anyvalue" ],
        [ "range", "matrix" ],
        [ "type", [ "or",
                    [ "values", -1, 0, 1 ],
                    [ "null", 1 ]]]
    ]);

    defineFunction("offset", function(ref, rows, cols, height, width){
        var topLeft = (ref instanceof CellRef ? ref : ref.topLeft).clone();
        topLeft.row += rows;
        topLeft.col += cols;
        if (topLeft.row < 0 || topLeft.col < 0) {
            return new CalcError("VALUE");
        }
        if (height > 1 || width > 1) {
            return new RangeRef(topLeft, new CellRef(topLeft.row + height - 1,
                                                     topLeft.col + width - 1))
                .setSheet(ref.sheet, ref.hasSheet());
        }
        return topLeft;
    }).args([
        [ "ref", "area" ],
        [ "rows", "*number" ],
        [ "cols", "*number" ],
        [ "height", [ "or", "*number++", [ "null", "$ref.height()" ]]],
        [ "width", [ "or", "*number++", [ "null", "$ref.width()" ]]]
    ]);

    defineFunction("row", function(ref){
        if (!ref) {
            return this.row + 1;
        }
        if (ref instanceof CellRef) {
            return ref.row + 1;
        }
        return this.asMatrix(ref).mapRow(function(row){
            return row + ref.topLeft.row + 1;
        });
    }).args([
        [ "ref", [ "or", "area", "null" ]]
    ]);

    defineFunction("rows", function(m){
        return m instanceof Ref ? m.height() : m.height;
    }).args([
        [ "ref", [ "or", "area", "#matrix" ] ]
    ]);

    defineFunction("transpose", function(m){
        return m.transpose();
    }).args([
        [ "range", "matrix" ]
    ]);

    defineFunction("vlookup", function(value, m, col, approx){
        var resultRow = null;
        m.eachRow(function(row){
            var data = m.get(row, 0);
            if (approx) {
                if (data > value) {
                    return true;
                }
                resultRow = row;
            } else if (data === value) {
                resultRow = row;
                return true;
            }
        });
        if (resultRow == null) {
            return new CalcError("N/A");
        }
        return m.get(resultRow, col - 1);
    }).args([
        [ "value", "anyvalue" ],
        [ "range", "matrix" ],
        [ "col", "number++" ],
        [ "approx", [ "or", "boolean", [ "null", true ]]]
    ]);

    /* -----[ Other ]----- */

    defineFunction("rand", function() {
        return Math.random();
    }).args([]);

    defineFunction("randbetween", function(min, max){
        return min + Math.floor((max - min + 1) * Math.random());
    }).args([
        [ "min", "number" ],
        [ "max", [ "and", "number", [ "assert", "$max >= $min" ] ] ]
    ]);

    defineFunction("true", function(){
        return true;
    }).args([]);

    defineFunction("false", function(){
        return true;
    }).args([]);

    //// utils

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

    function lc(a) {
        if (typeof a == "string") {
            return a.toLowerCase();
        }
        return a;
    }

    function compLT(a, b) { return lc(a) < lc(b); }
    function compLTE(a, b) { return lc(a) <= lc(b); }
    function compGT(a, b) { return lc(a) > lc(b); }
    function compGTE(a, b) { return lc(a) >= lc(b); }
    function compNE(a, b) { return lc(a) != lc(b); }
    function compEQ(a, b) {
        if (b instanceof RegExp) {
            return b.test(a);
        }
        return lc(a) == lc(b);
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

    function numericPredicate(val) {
        return typeof val == "number"
            || typeof val == "boolean"
            || val == null
            || val === "";
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
