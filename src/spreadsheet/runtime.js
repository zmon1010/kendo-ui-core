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

    var CalcError = defclass(null, function CalcError(code) {
        this.code = code;
    }, {
        toString: function() {
            return "#" + this.code + "!";
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

    function resolveCells(self, a, f) {
        var data = [];
        slice(a).forEach(function(x){
            if (x instanceof Ref) {
                x = self.ss.getData(x);
            }
            data = data.concat(x);
        });
        return Promise.when(data, f, self);
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
        return function() {
            return resolveCells(this, arguments, function(left, right){
                if (left == null) {
                    left = 0;
                }
                if (right == null) {
                    right = 0;
                }
                if (typeof left == "number" && typeof right == "number") {
                    return func.call(this, left, right);
                } else {
                    this.error(new CalcError("VALUE"));
                }
            });
        };
    }

    function binaryCompare(func) {
        return function() {
            return resolveCells(this, arguments, function(left, right){
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
                    return func.call(this, left, right);
                } else {
                    this.error(new CalcError("VALUE"));
                }
            });
        };
    }

    function unaryNumeric(func) {
        return function() {
            return resolveCells(this, arguments, function(exp){
                if (exp == null) {
                    exp = 0;
                }
                if (typeof exp == "number") {
                    return func.call(this, exp);
                } else {
                    this.error(new CalcError("VALUE"));
                }
            });
        };
    }

    var FUNCS = {

        sum: function(){
            return resolveCells(this, arguments, function(){
                var sum = 0;
                forNumbers(this, arguments, function(num){
                    sum += num;
                });
                return sum;
            });
        },

        average: function(){
            var sum = 0, count = 0;
            forNumbers(this, arguments, function(num){
                ++count;
                sum += num;
            });
            return sum / count;
        },

        // XXX: does more work than needed
        indirect: function(thing){
            try {
                if (typeof thing != "string") {
                    throw 1;
                }
                var x = calc.parse_formula(this.formula.sheet, 0, 0, thing);
                if (x.ast.type != "ref") {
                    throw 1;
                }
                var f = calc.compile(x);
                return f.refs[0];
            } catch(ex) {
                this.error(new CalcError("REF"));
            }
        },

        rand: function() {
            return Math.random();
        },

        /* -----[ binary ops ]----- */

        // arithmetic
        "binary+": binaryNumeric(function(left, right){
            return left + right;
        }),
        "binary-": binaryNumeric(function(left, right){
            return left - right;
        }),
        "binary*": binaryNumeric(function(left, right){
            return left * right;
        }),
        "binary/": binaryNumeric(function(left, right){
            if (right === 0) {
                this.error(new CalcError("DIV/0"));
            } else {
                return left / right;
            }
        }),
        "binary^": binaryNumeric(function(left, right){
            return Math.pow(left, right);
        }),

        // text concat
        "binary&": function() {
            return resolveCells(this, arguments, function(left, right){
                if (left == null) { left = ""; }
                if (right == null) { right = ""; }
                return "" + left + right;
            });
        },

        // boolean
        "binary=": function() {
            return resolveCells(this, arguments, function(left, right){
                return left === right;
            });
        },
        "binary<>": function() {
            return resolveCells(this, arguments, function(left, right){
                return left !== right;
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
        "binary:": function(left, right) {
            if (CellRef.is(left) && CellRef.is(right)) {
                return new RangeRef(left, right);
            } else {
                this.error(new CalcError("REF"));
            }
        },
        // union
        "binary,": function(left, right) {
            if (Ref.is(left) && Ref.is(right)) {
                return new UnionRef([ left, right ]);
            } else {
                this.error(new CalcError("REF"));
            }
        },
        // intersect
        "binary ": function(left, right) {
            if (Ref.is(left) && Ref.is(right)) {
                var x = left.intersect(right);
                if (NullRef.is(x)) {
                    this.error(new CalcError("NULL"));
                } else {
                    return x;
                }
            } else {
                this.error(new CalcError("REF"));
            }
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
            var self = this;
            return resolveCells(this, arguments, function(query, base){
                if (typeof query != "string" || typeof base != "string") {
                    return self.error(new CalcError("VALUE"));
                }
                query = query.toUpperCase();
                base = base.toUpperCase();
                var promise = new Promise();
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
                            self.error(new CalcError("CURRENCY"));
                        }
                    } else {
                        promise.resolve(val);
                    }
                }).fail(function() {
                    console.error(arguments);
                    self.error(new CalcError("NET"));
                });
                return promise;
            });
        };

        FUNCS.asum = function() {
            var promise = new Promise();
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

    /* -----[ Promise ]----- */

    var Promise = defclass(null, function Promise() {
        this.resolved = false;
        this.value = null;
        this._clients = [];
    }, {
        then: function(f) {
            this._clients.push(f);
            if (this.resolved) {
                this._execute();
            }
            return this;
        },
        resolve: function(value) {
            if (!this.resolved) {
                this.resolved = true;
                this.value = value;
                this._execute();
            }
        },
        _execute: function() {
            var a = this._clients, n = a.length;
            this._clients = [];
            for (var i = 0; i < n; ++i) {
                a[i](this.value);
            }
        }
    });

    Promise.when = function(a, func, obj) {
        var i = a.length, args = new Array(i), count = 0;
        while (--i >= 0) {
            var x = a[i];
            if (x instanceof Promise) {
                wait(x, i);
            } else {
                args[i] = x;
            }
        }
        if (!count) {
            return func.apply(obj, args);
        }
        var ret = new Promise();
        return ret;
        function wait(p, i) {
            if (p.resolved) {
                args[i] = p.value;
            } else {
                ++count;
                p.then(function(val){
                    args[i] = val;
                    if (!--count) {
                        ret.resolve(func.apply(obj, args));
                    }
                });
            }
        }
    };

    /* -----[ exports ]----- */

    exports.NULL = NULL;
    exports.Ref = Ref;
    exports.NullRef = NullRef;
    exports.NameRef = NameRef;
    exports.CellRef = CellRef;
    exports.RangeRef = RangeRef;
    exports.UnionRef = UnionRef;
    exports.CalcError = CalcError;
    exports.Promise = Promise;

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
            if ("value" in formula) {
                return formula.value;
            } else {
                var promise = new Promise();
                formula.inProgress = promise;
                promise.then(function(arg){
                    formula.inProgress = null;
                    SS.onFormula(formula, arg);
                });
                var context = {
                    ss: SS,
                    formula: formula,
                    resolve: function(val) {
                        formula.value = val;
                        promise.resolve(val);
                        return val;
                    },
                    error: function(val) {
                        promise.resolve(val);
                        return val;
                    }
                };
                func(context);
                return promise;
            }
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
