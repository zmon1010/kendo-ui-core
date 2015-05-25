// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./sheet.js", "./references.js" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, validthis:true */
    /* global console */

    var calc = {};
    var spreadsheet = kendo.spreadsheet;
    spreadsheet.calc = calc;
    var exports = calc.runtime = {};
    var Class = kendo.Class;

    var Ref = spreadsheet.Ref;
    var NameRef = spreadsheet.NameRef;
    var CellRef = spreadsheet.CellRef;
    var RangeRef = spreadsheet.RangeRef;
    var UnionRef = spreadsheet.UnionRef;
    var NULL = spreadsheet.NULLREF;

    /* -----[ Errors ]----- */

    var CalcError = Class.extend({
        init: function CalcError(code) {
            this.code = code;
        },
        toString: function() {
            return "#" + this.code + "!";
        }
    });

    /* -----[ Formula ]----- */

    var Formula = Class.extend({
        init: function Formula(refs, handler){
            this.refs = refs;
            this.handler = handler;
        },
        exec: function(SS, sheet, row, col, callback) {
            var formula = this;
            if ("value" in formula) {
                if (callback) {
                    callback(formula.value);
                }
            } else {
                resolveCells({
                    ss: SS,
                    formula: formula,
                    sheet: sheet,
                    row: row,
                    col: col,
                    resolve: function(val) {
                        val = cellValues(this, [ val ])[0];
                        if (val == null) {
                            val = 0;
                        }
                        formula.value = val;
                        SS.onFormula(sheet, row, col, val);
                        if (callback) {
                            callback(val);
                        }
                    },
                    error: function(val) {
                        SS.onFormula(sheet, row, col, val);
                        if (callback) {
                            callback(val);
                        }
                    }
                }, formula.refs, this.handler);
            }
        },
        reset: function() {
            delete this.value;
        },
        adjust: function(operation, start, delta, arow, acol) {
            this.refs = this.refs.map(function(ref){
                return ref.adjust(operation, start, delta, arow, acol);
            });
        }
    });

    // utils ------------------------

    function slice(a, i) {
        if (i == null) {
            i = 0;
        }
        var n = a.length, ret = new Array(n - i), j = 0;
        while (i < n) {
            ret[j++] = a[i++];
        }
        return ret;
    }

    // spreadsheet functions --------

    function resolveCells(context, a, f) {
        var formulas = [];

        for (var i = 0; i < a.length; ++i) {
            var x = a[i];
            if (x instanceof Ref) {
                if (!add(context.ss.getRefCells(x.absolute(context.row, context.col)))) {
                    context.error(new CalcError("CIRCULAR"));
                    return;
                }
            }
        }

        if (!formulas.length) {
            return f(context);
        }

        for (var pending = formulas.length, i = 0; i < formulas.length; ++i) {
            fetch(formulas[i]);
        }
        function fetch(cell) {
            cell.formula.exec(context.ss, cell.sheet, cell.row, cell.col, function(val){
                if (!--pending) {
                    f(context);
                }
            });
        }
        function add(a) {
            for (var i = 0; i < a.length; ++i) {
                var cell = a[i];
                if (cell.formula) {
                    if (cell.formula === context.formula) {
                        return false;
                    }
                    formulas.push(cell);
                }
            }
            return true;
        }
    }

    function cellValues(self, a, f) {
        var ret = [];
        for (var i = 0; i < a.length; ++i) {
            var val = a[i];
            if (val instanceof Ref) {
                val = self.ss.getData(a[i].absolute(self.row, self.col));
            }
            ret = ret.concat(val);
        }
        if (f) {
            return f.apply(self, ret);
        }
        return ret;
    }

    function forNumbers(self, a, f) {
        for (var i = 0; i < a.length; ++i) {
            var x = a[i];
            if (Array.isArray(x)) {
                forNumbers(self, x, f);
            } else if (typeof x == "number") {
                f(x);
            }
        }
    }

    function binaryNumeric(func) {
        return function(callback, args) {
            cellValues(this, args, function(left, right){
                if (left == null) {
                    left = 0;
                }
                if (right == null) {
                    right = 0;
                }
                if (typeof left == "number" && typeof right == "number") {
                    func.call(this, callback, left, right);
                } else {
                    this.error(new CalcError("VALUE"));
                }
            });
        };
    }

    function binaryCompare(func) {
        return function(callback, args) {
            cellValues(this, args, function(left, right){
                if (typeof left == "string" && typeof right != "string") {
                    right = right == null ? "" : right + "";
                }
                if (typeof left != "string" && typeof right == "string") {
                    left = left == null ? "" : left + "";
                }
                if (typeof left == "number" && right == null) {
                    right = 0;
                }
                if (typeof right == "number" && left == null) {
                    left = 0;
                }
                if (typeof right == typeof left) {
                    callback(func.call(this, left, right));
                } else {
                    this.error(new CalcError("VALUE"));
                }
            });
        };
    }

    function unaryNumeric(func) {
        return function(callback, args) {
            cellValues(this, args, function(exp){
                if (exp == null) {
                    exp = 0;
                }
                if (typeof exp == "number") {
                    callback(func.call(this, exp));
                } else {
                    this.error(new CalcError("VALUE"));
                }
            });
        };
    }

    function DIVIDE(callback, left, right){
        if (right === 0) {
            this.error(new CalcError("DIV/0"));
        } else {
            callback(left / right);
        }
    }

    var FUNCS = {

        sum: function(callback, args){
            args = cellValues(this, args);
            var sum = 0;
            forNumbers(this, args, function(num){
                sum += num;
            });
            callback(sum);
        },

        average: function(callback, args){
            args = cellValues(this, args);
            var sum = 0, count = 0;
            forNumbers(this, args, function(num){
                ++count;
                sum += num;
            });
            DIVIDE.call(this, callback, sum, count);
        },

        // XXX: does more work than needed
        indirect: function(callback, args){
            cellValues(this, args, function(thing){
                try {
                    if (typeof thing != "string") {
                        throw 1;
                    }
                    var ref = calc.parseFormula(this.sheet, 0, 0, thing);
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
        },

        rand: function(callback) {
            callback(Math.random());
        },

        /* -----[ binary ops ]----- */

        // arithmetic
        "binary+": binaryNumeric(function(callback, left, right){
            callback(left + right);
        }),
        "binary-": binaryNumeric(function(callback, left, right){
            callback(left - right);
        }),
        "binary*": binaryNumeric(function(callback, left, right){
            callback(left * right);
        }),
        "binary/": binaryNumeric(DIVIDE),
        "binary^": binaryNumeric(function(callback, left, right){
            callback(Math.pow(left, right));
        }),

        // text concat
        "binary&": function(callback, args) {
            cellValues(this, args, function(left, right){
                if (left == null) { left = ""; }
                if (right == null) { right = ""; }
                callback("" + left + right);
            });
        },

        // boolean
        "binary=": function(callback, args) {
            cellValues(this, args, function(left, right){
                callback(left === right);
            });
        },
        "binary<>": function(callback, args) {
            cellValues(this, args, function(left, right){
                callback(left !== right);
            });
        },
        "binary<": binaryCompare(function(left, right){
            return left < right;
        }),
        "binary<=": binaryCompare(function(left, right){
            return left <= right;
        }),
        "binary>": binaryCompare(function(left, right){
            return left > right;
        }),
        "binary>=": binaryCompare(function(left, right){
            return left >= right;
        }),

        // range
        "binary:": function(callback, args) {
            var left = args[0], right = args[1];
            if (left instanceof CellRef && right instanceof CellRef) {
                callback(new RangeRef(left, right).setSheet(left.sheet || this.formula.sheet, left.hasSheet()));
            } else {
                this.error(new CalcError("REF"));
            }
        },
        // union
        "binary,": function(callback, args) {
            var left = args[0], right = args[1];
            if (left instanceof Ref && right instanceof Ref) {
                callback(new UnionRef([ left, right ]));
            } else {
                this.error(new CalcError("REF"));
            }
        },
        // intersect
        "binary ": function(callback, args) {
            var left = args[0], right = args[1];
            if (left instanceof Ref && right instanceof Ref) {
                var x = left.intersect(right);
                if (x === NULL) {
                    this.error(new CalcError("NULL"));
                } else {
                    callback(x);
                }
            } else {
                this.error(new CalcError("REF"));
            }
        },

        /* -----[ unary ops ]----- */

        "unary+": unaryNumeric(function(exp) {
            return exp;
        }),
        "unary-": unaryNumeric(function(exp) {
            return -exp;
        }),
        "unary%": unaryNumeric(function(exp) {
            return exp/100;
        })

    };

    {// XXX: just for testing, remove at some point

        FUNCS.currency = function(callback, args) {
            cellValues(this, args, function(query, base){
                var self = this;
                if (typeof query != "string" || typeof base != "string") {
                    return self.error(new CalcError("VALUE"));
                }
                query = query.toUpperCase();
                base = base.toUpperCase();
                $.ajax({
                    url: "http://api.fixer.io/latest",
                    data: {
                        base: base
                    }
                }).done(function(response) {
                    var rates = response.rates;
                    var val = rates[query];
                    if (val == null) {
                        if (query == base) {
                            callback(1);
                        } else {
                            self.error(new CalcError("CURRENCY"));
                        }
                    } else {
                        callback(val);
                    }
                }).fail(function() {
                    console.error(arguments);
                    self.error(new CalcError("NET"));
                });
            });
        };

        FUNCS.asum = function(callback, args) {
            var self = this;
            setTimeout(function(){
                var sum = 0;
                var values = cellValues(self, args);
                forNumbers(self, values, function(num){
                    sum += num;
                });
                callback(sum);
            }, 500);
        };

    }

    /* -----[ exports ]----- */

    exports.CalcError = CalcError;
    exports.Formula = Formula;

    exports.bool = function(context, val) {
        if (val instanceof Ref) {
            val = context.ss.getData(val.absolute(context.row, context.col));
        }
        if (typeof val == "string") {
            return val.toLowerCase() == "true";
        }
        if (typeof val == "number") {
            return val !== 0;
        }
        if (typeof val == "boolean") {
            return val;
        }
        return val != null;
    };

    exports.func = function(context, fname, callback) {
        var args = slice(arguments, 3);
        return FUNCS[fname.toLowerCase()].call(context, callback, args);
    };

    exports.defineFunction = function(name, func) {
        FUNCS[name.toLowerCase()] = func;
    };

    exports.resolveCells = resolveCells;

    exports.forNumbers = forNumbers;

    exports.cellValues = cellValues;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
