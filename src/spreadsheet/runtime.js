// -*- fill-column: 100 -*-

(function(f, define){
    define([ "../kendo.core.js" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, validthis:true */
    /* global console */

    var calc = {};
    kendo.spreadsheet = { calc: calc };
    var exports = kendo.spreadsheet.calc.Runtime = {};

    /* -----[ References ]----- */

    var Ref = defclass(null, function Ref(){}, {
        simplify: function() {
            return this;
        },
        setSheet: function(sheet) {
            this.sheet = sheet;
            return this;
        }
    });

    /* -----[ Null reference ]----- */

    var NullRef = defclass(Ref, function NullRef(){});

    var NULL = new NullRef();

    /* -----[ Name reference ]----- */

    var NameRef = defclass(Ref, function NameRef(name){
        this.name = name;
    });

    /* -----[ Cell reference ]----- */

    var CellRef = defclass(Ref, function CellRef(col, row, rel) {
        this.col = col;
        this.row = row;
        this.rel = rel;
    }, {
        intersect: function(ref) {
            if (CellRef.is(ref)) {
                if (ref.row == this.row && ref.col == this.col) {
                    return this;
                } else {
                    return NULL;
                }
            }
            return ref.intersect(this);
        },
        toString: function() {
            return calc.make_reference(null, this.col, this.row);
        }
    });

    /* -----[ Range reference ]----- */

    var RangeRef = defclass(Ref, function RangeRef(tl, br) {
        this.topLeft = tl;
        this.bottomRight = br;
        this.normalize();
    }, {
        _containsRange: function(range) {
            return this._containsCell(range.topLeft)
                && this._containsCell(range.bottomRight);
        },
        _containsCell: function(cell) {
            return cell.row >= this.topLeft.row
                && cell.col >= this.topLeft.col
                && cell.row <= this.bottomRight.row
                && cell.col <= this.bottomRight.col;
        },
        contains: function(ref) {
            if (CellRef.is(ref)) {
                return this._containsCell(ref);
            }
            if (RangeRef.is(ref)) {
                return this._containsRange(ref);
            }
            return false;
        },

        _intersectRange: function(ref) {
            var a_left    = this.topLeft.col;
            var a_top     = this.topLeft.row;
            var a_right   = this.bottomRight.col;
            var a_bottom  = this.bottomRight.row;
            var b_left    = ref.topLeft.col;
            var b_top     = ref.topLeft.row;
            var b_right   = ref.bottomRight.col;
            var b_bottom  = ref.bottomRight.row;
            if (a_left <= b_right &&
                b_left <= a_right &&
                a_top <= b_bottom &&
                b_top <= a_bottom)
            {
                return new RangeRef(
                    // topLeft
                    new CellRef(Math.max(a_left, b_left),
                                Math.max(a_top, b_top)),
                    // bottomRight
                    new CellRef(Math.min(a_right, b_right),
                                Math.min(a_bottom, b_bottom))
                ).setSheet(this.sheet);
            } else {
                return NULL;
            }
        },
        intersect: function(ref) {
            if (NullRef.is(ref)) {
                return ref;
            }
            if (CellRef.is(ref)) {
                return this._containsCell(ref) ? ref : NULL;
            }
            if (RangeRef.is(ref)) {
                return this._intersectRange(ref).simplify();
            }
            if (UnionRef.is(ref)) {
                return ref.intersect(this);
            }
            console.error("Unknown reference", ref);
        },

        simplify: function() {
            if (this.topLeft.row == this.bottomRight.row &&
                this.topLeft.col == this.bottomRight.col)
            {
                return new CellRef(this.topLeft.col,
                                   this.topLeft.row).setSheet(this.sheet);
            }
            return this;
        },

        normalize: function() {
            var a = this.topLeft, b = this.bottomRight;
            var r1 = a.row, c1 = a.col, r2 = b.row, c2 = b.col;
            var rr1 = a.rel & 2, rc1 = a.rel & 1;
            var rr2 = b.rel & 2, rc2 = b.rel & 1;
            var tmp, changes = false;
            if (r1 > r2) {
                changes = true;
                tmp = r1; r1 = r2; r2 = tmp;
                tmp = rr1; rr1 = rr2; rr2 = tmp;
            }
            if (c1 > c2) {
                changes = true;
                tmp = c1; c1 = c2; c2 = tmp;
                tmp = rc1; rc1 = rc2; rc2 = tmp;
            }
            if (changes) {
                this.topLeft = new CellRef(c1, r1, rc1 | rr1);
                this.bottomRight = new CellRef(c2, r2, rc2 | rr2);
            }
            return this;
        },

        toString: function() {
            return this.topLeft() + ":" + this.bottomRight();
        }
    });

    /* -----[ Union reference ]----- */

    var UnionRef = defclass(Ref, function UnionRef(refs){
        this.refs = refs;
    }, {
        intersect: function(ref) {
            var a = [];
            for (var i = 0; i < this.refs.length; ++i) {
                var x = ref.intersect(this.refs[i]);
                if (!NullRef.is(x)) {
                    a.push(x);
                }
            }
            if (a.length > 0) {
                return new UnionRef(a).simplify();
            }
            return NULL;
        },
        simplify: function() {
            if (this.refs.length == 1) {
                return this.refs[0].simplify();
            }
            return this;
        },

        toString: function() {
            return this.refs.join(",");
        }
    });

    /* -----[ Errors ]----- */

    var CalcError = defclass(null, function CalcError(type) {
        this.type = type;
    }, {
        toString: function() {
            return "#" + this.type + "!";
        }
    });

    // utils ------------------------

    function defclass(base, ctor, proto) {
        if (base) {
            ctor.prototype = new base();
        }
        ctor.is = function(thing) {
            return thing instanceof ctor;
        };
        if (proto) {
            methods(ctor, proto);
        }
        return ctor;
    }

    function methods(obj, methods) {
        for (var i in methods) {
            if (Object.prototype.hasOwnProperty.call(methods, i)) {
                obj.prototype[i] = methods[i];
            }
        }
    }

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

    function last(a) {
        return a[a.length - 1];
    }

    // spreadsheet functions --------

    function withResolvedCells(f) {
        return function() {
            var promise = $.Deferred();
            resolveCells(this, arguments, function(){
                var val = f.apply(this, arguments);
                if (CalcError.is(val)) {
                    promise.reject(val);
                } else {
                    promise.resolve(val);
                }
            });
            return promise;
        };
    }

    function resolveCells(self, a, f) {
        var args = slice(a).map(function(x){
            if (x instanceof Ref) {
                x = self.ss.fetch(x);
            }
            return x;
        });
        $.when.apply($, args).then(function(){
            for (var i = 0, args = []; i < arguments.length; ++i) {
                args[i] = self.ss.getData(arguments[i]);
            }
            f.apply(self, args);
        });
    }

    function forNumbers(self, a, f) {
        for (var i = 0; i < a.length; ++i) {
            var x = self.ss.getData(a[i]);
            if (Array.isArray(x)) {
                forNumbers(self, x, f);
            } else if (typeof x == "number") {
                f(x);
            }
        }
    }

    function binaryNumeric(func) {
        return function(left, right) {
            var promise = $.Deferred();
            left = this.ss.getData(left) || 0;
            right = this.ss.getData(right) || 0;
            if (typeof left == "number" && typeof right == "number") {
                func(left, right, promise);
            } else {
                promise.reject(new CalcError("VALUE"));
            }
            return promise;
        };
    }

    function binaryCompare(func) {
        return function(left, right) {
            var promise = $.Deferred();
            left = this.ss.getData(left);
            right = this.ss.getData(right);
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
            if (typeof right == "number" && typeof left == "number") {
                func(left, right, promise);
            } else {
                promise.reject(new CalcError("VALUE"));
            }
            return promise;
        };
    }

    function unaryNumeric(func) {
        return function(exp) {
            var promise = $.Deferred();
            exp = this.ss.getData(exp) || 0;
            if (typeof exp == "number") {
                func(exp, promise);
            } else {
                promise.reject(new CalcError("VALUE"));
            }
            return promise;
        };
    }

    var FUNCS = {

        sum: withResolvedCells(function(){
            var sum = 0;
            forNumbers(this, arguments, function(num){
                sum += num;
            });
            return sum;
        }),

        average: withResolvedCells(function(){
            var sum = 0, count = 0;
            forNumbers(this, arguments, function(num){
                ++count;
                sum += num;
            });
            return sum / count;
        }),

        indirect: withResolvedCells(function(thing){
            try {
                if (typeof thing != "string") {
                    throw 1;
                }
                var x = calc.parse_formula(this.formula.sheet, 0, 0, thing);
                if (x.ast.type != "ref") {
                    throw 1;
                }
                var f = calc.compile(x);
                var ref = f.refs[0];
                // return through ss.fetch to make sure the data is in.
                return this.ss.fetch(ref);
            } catch(ex) {
                this.error(new CalcError("REF"));
            }
        }),

        rand: function() {
            var promise = $.Deferred();
            promise.resolve(Math.random());
            return promise;
        },

        "-fetch": function(ref) {
            return this.ss.fetch(ref);
        },

        /* -----[ binary ops ]----- */

        // arithmetic
        "binary+": binaryNumeric(function(left, right, promise){
            promise.resolve(left + right);
        }),
        "binary-": binaryNumeric(function(left, right, promise){
            promise.resolve(left - right);
        }),
        "binary*": binaryNumeric(function(left, right, promise){
            promise.resolve(left * right);
        }),
        "binary/": binaryNumeric(function(left, right, promise){
            if (right === 0) {
                promise.reject(new CalcError("DIV/0"));
            } else {
                promise.resolve(left / right);
            }
        }),
        "binary^": binaryNumeric(function(left, right, promise){
            promise.resolve(Math.pow(left, right));
        }),

        // text concat
        "binary&": function(left, right) {
            var promise = $.Deferred();
            left = this.ss.getData(left);
            right = this.ss.getData(right);
            if (left == null) { left = ""; }
            if (right == null) { right = ""; }
            promise.resolve("" + left + right);
            return promise;
        },

        // boolean
        "binary=": function(left, right) {
            var promise = $.Deferred();
            left = this.ss.getData(left);
            right = this.ss.getData(right);
            promise.resolve(left === right);
            return promise;
        },
        "binary<>": function(left, right) {
            var promise = $.Deferred();
            left = this.ss.getData(left);
            right = this.ss.getData(right);
            promise.resolve(left !== right);
            return promise;
        },
        "binary<": binaryCompare(function(left, right, promise){
            promise.resolve(left < right);
        }),
        "binary<=": binaryCompare(function(left, right, promise){
            promise.resolve(left <= right);
        }),
        "binary>": binaryCompare(function(left, right, promise){
            promise.resolve(left > right);
        }),
        "binary>=": binaryCompare(function(left, right, promise){
            promise.resolve(left >= right);
        }),

        // range
        "binary:": function(left, right) {
            var promise = $.Deferred();
            if (CellRef.is(left) && CellRef.is(right)) {
                promise.resolve(new RangeRef(left, right));
            } else {
                promise.reject(new CalcError("REF"));
            }
            return promise;
        },
        // union
        "binary,": function(left, right) {
            var promise = $.Deferred();
            if (Ref.is(left) && Ref.is(right)) {
                promise.resolve(new UnionRef([ left, right ]));
            } else {
                promise.reject(new CalcError("REF"));
            }
            return promise;
        },
        // intersect
        "binary ": function(left, right) {
            var promise = $.Deferred();
            if (Ref.is(left) && Ref.is(right)) {
                var x = left.intersect(right);
                if (NullRef.is(x)) {
                    promise.reject(new CalcError("NULL"));
                } else {
                    promise.resolve(x);
                }
            } else {
                promise.reject(new CalcError("REF"));
            }
            return promise;
        },

        /* -----[ unary ops ]----- */

        "unary+": unaryNumeric(function(exp, promise) {
            promise.resolve(exp);
        }),
        "unary-": unaryNumeric(function(exp, promise) {
            promise.resolve(-exp);
        }),
        "unary%": unaryNumeric(function(exp, promise) {
            promise.resolve(exp/100);
        })

    };

    {// XXX: just for testing, remove at some point

        FUNCS.currency = function() {
            var promise = $.Deferred();
            resolveCells(this, arguments, function(query, base){
                if (typeof query != "string" || typeof base != "string") {
                    return promise.reject(new CalcError("VALUE"));
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
                            promise.resolve(1);
                        } else {
                            promise.reject(new CalcError("CURRENCY"));
                        }
                    } else {
                        promise.resolve(val);
                    }
                }).fail(function() {
                    console.error(arguments);
                    promise.reject(new CalcError("NET"));
                });
            });
            return promise;
        };

        FUNCS.asum = function() {
            var promise = $.Deferred();
            var self = this, args = arguments;
            setTimeout(function(){
                resolveCells(self, args, function(){
                    var sum = 0;
                    forNumbers(self, arguments, function(num){
                        sum += num;
                    });
                    promise.resolve(sum);
                });
            }, 500);
            return promise;
        };

    }

    /* -----[ exports ]----- */

    exports.NULL = NULL;
    exports.Ref = Ref;
    exports.NullRef = NullRef;
    exports.NameRef = NameRef;
    exports.CellRef = CellRef;
    exports.RangeRef = RangeRef;
    exports.UnionRef = UnionRef;
    exports.CalcError = CalcError;

    exports.bool = function(context, val) {
        val = context.ss.getData(val);
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

    exports.func = function(context, fname) {
        var args = slice(arguments, 2);
        return FUNCS[fname.toLowerCase()].apply(context, args);
    };

    exports.makeFormula = function(formula) {
        var func = formula.func;
        formula.func = function(SS) {
            if (formula.inProgress) {
                return formula.inProgress;
            }
            var promise = $.Deferred();
            if ("value" in formula) {
                promise.resolve(formula.value);
                return promise;
            }
            formula.inProgress = promise;
            promise.always(function(arg){
                formula.inProgress = null;
                SS.onFormula(formula, arg);
            });
            var error = function(){
                promise.reject.apply(promise, arguments);
            };
            var context = {
                ss: SS,
                formula: formula,
                promise: promise,
                error: error
            };
            SS.fetchMany(formula.refs).then(function(){
                func(context);
            });
            return promise;
        };
        return formula;
    };

    exports.makeCellRef = function(sheet, col, row, rel) {
        return new CellRef(col, row, rel).setSheet(sheet);
    };

    exports.makeRangeRef = function(sheet, tl, br) {
        return new RangeRef(tl, br).setSheet(sheet);
    };

    exports.makeNameRef = function(sheet, name) {
        return new NameRef(name).setSheet(sheet);
    };

    exports.makeError = function(type) {
        return new CalcError(type);
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
