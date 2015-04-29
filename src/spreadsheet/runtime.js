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
    }, {
        type: "ref",
        ref: "name"
    });

    /* -----[ Cell reference ]----- */

    var CellRef = defclass(Ref, function CellRef(col, row, rel) {
        this.col = col;
        this.row = row;
        this.rel = rel;
    }, {
        type: "ref",
        ref: "cell",
        intersect: function(ref) {
            if (CellRef.is(ref)) {
                if (ref.row == this.row && ref.col == this.col && ref.sheet == this.sheet) {
                    return this;
                } else {
                    return NULL;
                }
            }
            return ref.intersect(this);
        },
        toString: function() {
            return calc.make_reference(null, this.col, this.row, this.rel);
        }
    });

    /* -----[ Range reference ]----- */

    var RangeRef = defclass(Ref, function RangeRef(tl, br) {
        this.topLeft = tl;
        this.bottomRight = br;
        this.normalize();
    }, {
        type: "ref",
        ref: "range",
        _containsRange: function(range) {
            return this._containsCell(range.topLeft)
                && this._containsCell(range.bottomRight);
        },
        _containsCell: function(cell) {
            return cell.sheet == this.topLeft.sheet
                && cell.row >= this.topLeft.row
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
            var sheet = this.topLeft.sheet;
            if (sheet != ref.topLeft.sheet) {
                return NULL;
            }
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
                                Math.max(a_top, b_top)).setSheet(sheet),
                    // bottomRight
                    new CellRef(Math.min(a_right, b_right),
                                Math.min(a_bottom, b_bottom)).setSheet(sheet)
                );
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
                                   this.topLeft.row,
                                   this.topLeft.rel).setSheet(this.topLeft.sheet);
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

    function resolveCells(context, a, f) {
        var formulas = [];

        for (var i = 0; i < a.length; ++i) {
            var x = a[i];
            if (Ref.is(x)) {
                add(context.ss.getRefCells(x));
            }
        }

        if (!formulas.length) {
            return f(context);
        }

        for (var pending = formulas.length, i = 0; i < formulas.length; ++i) {
            fetch(formulas[i]);
        }
        function fetch(cell) {
            cell.formula.func(context.ss, function(val){
                if (!--pending) {
                    f(context);
                }
            });
        }
        function add(a) {
            for (var i = 0; i < a.length; ++i) {
                var cell = a[i];
                if (cell.formula) {
                    formulas.push(cell);
                }
            }
        }
    }

    function cellValues(self, a, f) {
        var ret = [];
        for (var i = 0; i < a.length; ++i) {
            ret = ret.concat(self.ss.getData(a[i]));
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
                    callback(func.call(this, left, right));
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
            forNumbers(this, arguments, function(num){
                ++count;
                sum += num;
            });
            return sum / count;
        },

        // XXX: does more work than needed
        indirect: function(callback, args){
            cellValues(this, args, function(thing){
                try {
                    if (typeof thing != "string") {
                        throw 1;
                    }
                    var x = calc.parse_formula(this.formula.sheet, 0, 0, thing);
                    if (x.ast.type != "ref") {
                        throw 1;
                    }
                    var f = calc.compile(x), ref = f.refs[0];
                    resolveCells(this, [ ref ], function(){
                        callback(ref);
                    });
                } catch(ex) {
                    console.error(ex);
                    this.error(new CalcError("REF"));
                }
            });
        },

        rand: function(callback) {
            callback(Math.random());
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
        "binary&": function(callback, args) {
            cellValues(this, args, function(left, right){
                if (left == null) { left = ""; }
                if (right == null) { right = ""; }
                callback(left + right);
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
            if (CellRef.is(left) && CellRef.is(right)) {
                callback(new RangeRef(left, right));
            } else {
                this.error(new CalcError("REF"));
            }
        },
        // union
        "binary,": function(callback, args) {
            var left = args[0], right = args[1];
            if (Ref.is(left) && Ref.is(right)) {
                callback(new UnionRef([ left, right ]));
            } else {
                this.error(new CalcError("REF"));
            }
        },
        // intersect
        "binary ": function(callback, args) {
            var left = args[0], right = args[1];
            if (Ref.is(left) && Ref.is(right)) {
                var x = left.intersect(right);
                if (NullRef.is(x)) {
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

    exports.func = function(context, fname, callback) {
        var args = slice(arguments, 3);
        return FUNCS[fname.toLowerCase()].call(context, callback, args);
    };

    exports.makeFormula = function(formula) {
        var func = formula.func;
        formula.func = function(SS, callback) {
            if ("value" in formula) {
                if (callback) {
                    callback(formula.value);
                }
            } else {
                resolveCells({
                    ss: SS,
                    formula: formula,
                    resolve: function(val) {
                        formula.value = val = cellValues(this, [ val ])[0];
                        SS.onFormula(formula, val);
                        if (callback) {
                            callback(val);
                        }
                    },
                    error: function(val) {
                        SS.onFormula(formula, val);
                        if (callback) {
                            callback(val);
                        }
                    }
                }, formula.refs, func);
            }
        };
        return formula;
    };

    exports.makeCellRef = function(sheet, col, row, rel) {
        return new CellRef(col, row, rel).setSheet(sheet);
    };

    exports.makeRangeRef = function(tl, br) {
        return new RangeRef(tl, br);
    };

    exports.makeNameRef = function(sheet, name) {
        return new NameRef(name).setSheet(sheet);
    };

    exports.makeError = function(type) {
        return new CalcError(type);
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
