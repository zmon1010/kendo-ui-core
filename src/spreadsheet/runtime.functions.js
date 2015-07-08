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

    defineFunction("product", function(numbers){
        return numbers.reduce(function(prod, num){
            return prod * num;
        }, 1);
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
        [ "values", [ "#collect", "anyvalue" ] ]
    ]);

    defineFunction("count", function(numbers){
        return numbers.length;
    }).args([
        [ "numbers", [ "#collect", "number" ] ]
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
        [ "values", [ "#collect", "anyvalue" ] ]
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

    (function(def){
        def("large", function(numbers, nth){
            return numbers.sort(descending)[nth];
        });
        def("small", function(numbers, nth){
            return numbers.sort(ascending)[nth];
        });
    })(function(name, handler){
        defineFunction(name, function(matrix, nth){
            var numbers = [];
            var error = matrix.each(function(val){
                if (val instanceof CalcError) {
                    return val;
                }
                if (typeof val == "number") {
                    numbers.push(val);
                }
            });
            if (error) {
                return error;
            }
            if (nth > numbers.length) {
                return new CalcError("NUM");
            }
            return handler(numbers, nth - 1);
        }).args([
            [ "array", "matrix" ],
            [ "nth", "*number++" ]
        ]);
    });

    function _var_sp(numbers, divisor) {
        var n = numbers.length;
        if (n < 2) {
            return new CalcError("NUM");
        }
        var avg = numbers.reduce(function(sum, num){
            return sum + num;
        }, 0) / n;
        return numbers.reduce(function(sum, num){
            return sum + Math.pow(num - avg, 2);
        }, 0) / divisor;
    }

    function _stdev_sp(numbers, divisor) {
        var v = _var_sp(numbers, divisor);
        if (v instanceof CalcError) {
            return v;
        }
        return Math.sqrt(v);
    }

    // https://support.office.com/en-sg/article/STDEV-S-function-7d69cf97-0c1f-4acf-be27-f3e83904cc23
    defineFunction("stdev.s", function(numbers){
        return _stdev_sp(numbers, numbers.length - 1);
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    // https://support.office.com/en-sg/article/STDEV-P-function-6e917c05-31a0-496f-ade7-4f4e7462f285
    defineFunction("stdev.p", function(numbers){
        return _stdev_sp(numbers, numbers.length);
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("var.s", function(numbers){
        return _var_sp(numbers, numbers.length - 1);
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("var.p", function(numbers){
        return _var_sp(numbers, numbers.length);
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("median", function(numbers){
        var n = numbers.length;
        if (n < 1) {
            return new CalcError("N/A");
        }
        numbers.sort(ascending);
        if (n % 2) {
            return numbers[n >> 1];
        }
        return (numbers[n >> 1] + numbers[n >> 1 + 1]) / 2;
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

    defineFunction("mode.sngl", function(numbers){
        numbers.sort(ascending);
        var prev = null, count = 0, max = 1, mode = null;
        for (var i = 0; i < numbers.length; ++i) {
            var n = numbers[i];
            if (n != prev) {
                count = 1;
                prev = n;
            } else {
                count++;
            }
            if (count > max) {
                max = count;
                mode = n;
            }
        }
        return mode == null ? new CalcError("N/A") : mode;
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

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

    function _percentile(numbers, rank) {
        numbers.sort(ascending);
        var n = numbers.length;
        var k = rank | 0, d = rank - k;
        if (k === 0) {
            return numbers[0];
        }
        if (k >= n) {
            return numbers[n - 1];
        }
        --k;
        return numbers[k] + d * (numbers[k + 1] - numbers[k]);
    }

    function _percentile_inc(numbers, p){
        // algorithm from https://en.wikipedia.org/wiki/Percentile#Microsoft_Excel_method
        var rank = p * (numbers.length - 1) + 1;
        return _percentile(numbers, rank);
    }

    function _percentile_exc(numbers, p){
        // https://en.wikipedia.org/wiki/Percentile#NIST_method
        var rank = p * (numbers.length + 1);
        return _percentile(numbers, rank);
    }

    defineFunction("percentile.inc", _percentile_inc).args([
        [ "numbers", [ "collect", "number", 1 ] ],
        [ "p", [ "and", "number", [ "[between]", 0, 1 ] ] ]
    ]);

    defineFunction("percentile.exc", _percentile_exc).args([
        [ "numbers", [ "collect", "number", 1 ] ],
        [ "p", [ "and", "number", [ "(between)", 0, 1 ] ] ]
    ]);

    defineFunction("quartile.inc", function(numbers, quarter){
        return _percentile_inc(numbers, quarter / 4);
    }).args([
        [ "numbers", [ "collect", "number", 1 ] ],
        [ "quarter", [ "values", 0, 1, 2, 3, 4 ] ]
    ]);

    defineFunction("quartile.exc", function(numbers, quarter){
        return _percentile_exc(numbers, quarter / 4);
    }).args([
        [ "numbers", [ "collect", "number", 1 ] ],
        [ "quarter", [ "values", 0, 1, 2, 3, 4 ] ]
    ]);

    runtime.defineAlias("quartile", "quartile.inc");
    runtime.defineAlias("percentile", "percentile.inc");

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

    /* -----[ String functions ]----- */

    defineFunction("char", function(code){
        return String.fromCharCode(code);
    }).args([
        [ "code", "*integer+" ]
    ]);

    // From XRegExp
    var RX_NON_PRINTABLE = /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;

    defineFunction("clean", function(text){
        return text.replace(RX_NON_PRINTABLE, "");
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("code", function(text){
        return text.charAt(0);
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("concatenate", function(){
        var out = "";
        for (var i = 0; i < arguments.length; ++i) {
            out += arguments[i];
        }
        return out;
    }).args([
        [ "+",
          [ "text", "*string" ] ]
    ]);

    defineFunction("dollar", function(number, decimals){
        var format = "$#,##0.DECIMALS;($#,##0.DECIMALS)";
        var dec = "";
        while (decimals-- > 0) { dec += "0"; }
        format = format.replace(/DECIMALS/g, dec);
        return spreadsheet.formatting.format(number, format).text();
    }).args([
        [ "number", "*number" ],
        [ "decimals", [ "or", "*integer++", [ "null", 2 ] ] ]
    ]);

    defineFunction("exact", function(a, b){
        return a === b;
    }).args([
        [ "text1", "*string" ],
        [ "text2", "*string" ]
    ]);

    defineFunction("find", function(substring, string, start){
        var pos = string.indexOf(substring, start - 1);
        return pos < 0 ? new CalcError("VALUE") : pos + 1;
    }).args([
        [ "substring", "*string" ],
        [ "string", "*string" ],
        [ "start", [ "or", "*integer++", [ "null", 1 ] ] ]
    ]);

    defineFunction("fixed", function(number, decimals, noCommas){
        var format = noCommas ? "0.DECIMALS" : "#,##0.DECIMALS";
        var dec = "";
        while (decimals-- > 0) { dec += "0"; }
        format = format.replace(/DECIMALS/g, dec);
        return spreadsheet.formatting.format(number, format).text();
    }).args([
        [ "number", "*number" ],
        [ "decimals", [ "or", "*integer++", [ "null", 2 ] ] ],
        [ "noCommas", [ "or", "*boolean", [ "null", false ] ] ]
    ]);

    defineFunction("left", function(text, length){
        return text.substr(0, length);
    }).args([
        [ "text", "*string" ],
        [ "length", [ "or", "*integer+", [ "null", 1 ] ] ]
    ]);

    defineFunction("right", function(text, length){
        return text.substr(-length);
    }).args([
        [ "text", "*string" ],
        [ "length", [ "or", "*integer+", [ "null", 1 ] ] ]
    ]);

    defineFunction("len", function(text){
        return text.length;
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("lower", function(text){
        return text.toLowerCase();
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("upper", function(text){
        return text.toUpperCase();
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("ltrim", function(text){
        return text.replace(/^\s+/, "");
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("rtrim", function(text){
        return text.replace(/\s+$/, "");
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("trim", function(text){
        return text.replace(/^\s+|\s+$/, "");
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("mid", function(text, start, length){
        return text.substr(start - 1, length);
    }).args([
        [ "text", "*string" ],
        [ "start", "*integer++" ],
        [ "length", "*integer+" ]
    ]);

    defineFunction("proper", function(text){
        return text.toLowerCase().replace(/\b./g, function(s){
            return s.toUpperCase();
        });
    }).args([
        [ "text", "*string" ]
    ]);

    defineFunction("replace", function(text, start, length, newText){
        return text.substr(0, --start) + newText + text.substr(start + length);
    }).args([
        [ "text", "*string" ],
        [ "start", "*integer++" ],
        [ "length", "*integer+" ],
        [ "newText", "*string" ]
    ]);

    defineFunction("rept", function(text, number){
        var out = "";
        while (number-- > 0) { out += text; }
        return out;
    }).args([
        [ "text", "*string" ],
        [ "number", "*integer+" ]
    ]);

    defineFunction("search", function(substring, string, start){
        var pos = string.toLowerCase().indexOf(substring.toLowerCase(), start - 1);
        return pos < 0 ? new CalcError("VALUE") : pos + 1;
    }).args([
        [ "substring", "*string" ],
        [ "string", "*string" ],
        [ "start", [ "or", "*integer++", [ "null", 1 ] ] ]
    ]);

    defineFunction("substitute", function(text, oldText, newText, nth){
        if (oldText === newText) {
            return text;
        }
        var pos = -1;
        function replace() {
            text = text.substring(0, pos) + newText + text.substring(pos + oldText.length);
        }
        while ((pos = text.indexOf(oldText, pos + 1)) >= 0) {
            if (nth == null) {
                replace();
            } else if (--nth === 0) {
                replace();
                break;
            }
        }
        return text;
    }).args([
        [ "text", "*string" ],
        [ "oldText", "*string" ],
        [ "newText", "*string" ],
        [ "nth", [ "or", "*integer++", "null" ] ]
    ]);

    defineFunction("t", function(value){
        return typeof value == "string" ? value : "";
    }).args([
        [ "value", "*anyvalue" ]
    ]);

    defineFunction("text", function(value, format){
        return spreadsheet.formatting.format(value, format).text();
    }).args([
        [ "value", "*anyvalue" ],
        [ "format", "*string" ]
    ]);

    defineFunction("value", function(value){
        if (typeof value == "number") {
            return value;
        }
        if (typeof value == "boolean") {
            return +value;
        }
        // XXX: this is dirty.  we need it so we can parse i.e. "$12,345.50"
        value = (value+"").replace(/[$€,]/g, "");
        value = parseFloat(value);
        return isNaN(value) ? new CalcError("VALUE") : value;
    }).args([
        [ "value", "*anyvalue" ]
    ]);

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

    function ascending(a, b) {
        return a === b ? 0 : a < b ? -1 : 1;
    }

    function descending(a, b) {
        return a === b ? 0 : a < b ? 1 : -1;
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
