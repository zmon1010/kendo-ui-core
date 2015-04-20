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
            var self = this;
            var promise = $.Deferred();
            var args = slice(arguments).map(function(x){
                if (x instanceof Ref) {
                    x = self.ss.fetch(x);
                }
                return x;
            });
            $.when.apply($, args).then(function(){
                var val = f.apply(self, arguments);
                if (CalcError.is(val)) {
                    promise.reject(val);
                } else {
                    promise.resolve(val);
                }
            });
            return promise;
        };
    }

    function forNumbers(a, f) {
        for (var i = 0; i < a.length; ++i) {
            var x = a[i];
            if (Array.isArray(x)) {
                forNumbers(x, f);
            } else if (typeof x == "number") {
                f(x);
            } else if (x != null && x.type == "num") {
                // XXX: should have a proper way to figure out if it's a cell
                //      this is different from our CellRef objects; it's a cell coming
                //      from the spreadsheet itself.  the only assumptions we make
                //      is that it has a type and a value.
                f(x.value);
            }
        }
    }

    var FUNCS = {

        sum: withResolvedCells(function(){
            var sum = 0;
            forNumbers(arguments, function(num){
                sum += num;
            });
            return sum;
        }),

        average: withResolvedCells(function(){
            var sum = 0, count = 0;
            forNumbers(arguments, function(num){
                ++count;
                sum += num;
            });
            return sum / count;
        }),

        indirect: withResolvedCells(function(thing){
            thing = this.ss.getData(thing);
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
        }

    };

    function binaryNumeric(func) {
        return function(left, right) {
            left = this.ss.getData(left) || 0;
            right = this.ss.getData(right) || 0;
            if (typeof left == "number" && typeof right == "number") {
                return func(left, right, this.promise);
            }
            this.promise.reject(new CalcError("VALUE"));
        };
    }

    function binaryCompare(func) {
        return function(left, right) {
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
                return func(left, right, this.promise);
            }
            this.promise.reject(new CalcError("VALUE"));
        };
    }

    var BINARY = {
        // arithmetic
        "+": binaryNumeric(function(left, right){
            return left + right;
        }),
        "-": binaryNumeric(function(left, right){
            return left - right;
        }),
        "*": binaryNumeric(function(left, right){
            return left * right;
        }),
        "/": binaryNumeric(function(left, right, promise){
            if (right === 0) {
                promise.reject(new CalcError("DIV/0"));
            } else {
                return left / right;
            }
        }),
        "^": binaryNumeric(function(left, right){
            return Math.pow(left, right);
        }),

        // text concat
        "&": function(left, right) {
            left = this.ss.getData(left);
            right = this.ss.getData(right);
            if (left == null) { left = ""; }
            if (right == null) { right = ""; }
            return "" + left + right;
        },

        // boolean
        "=": function(left, right) {
            left = this.ss.getData(left);
            right = this.ss.getData(right);
            return left === right;
        },
        "<>": function(left, right) {
            left = this.ss.getData(left);
            right = this.ss.getData(right);
            return left !== right;
        },
        "<": binaryCompare(function(left, right){
            return left < right;
        }),
        "<=": binaryCompare(function(left, right){
            return left <= right;
        }),
        ">": binaryCompare(function(left, right){
            return left > right;
        }),
        ">=": binaryCompare(function(left, right){
            return left >= right;
        }),

        // range
        ":": function(left, right) {
            if (CellRef.is(left) && CellRef.is(right)) {
                return new RangeRef(left, right);
            }
            this.promise.reject(new CalcError("REF"));
        },
        // union
        ",": function(left, right) {
            if (Ref.is(left) && Ref.is(right)) {
                return new UnionRef([ left, right ]);
            }
            this.promise.reject(new CalcError("REF"));
        },
        // intersect
        " ": function(left, right) {
            if (Ref.is(left) && Ref.is(right)) {
                var x = left.intersect(right);
                if (NullRef.is(x)) {
                    this.promise.reject(new CalcError("NULL"));
                } else {
                    return x;
                }
            } else {
                this.promise.reject(new CalcError("REF"));
            }
        }
    };

    function unaryNumeric(func) {
        return function(exp) {
            exp = this.ss.getData(exp) || 0;
            if (typeof exp == "number") {
                return func(exp, this.promise);
            }
            this.promise.reject(new CalcError("VALUE"));
        };
    }

    var UNARY = {
        "+": unaryNumeric(function(exp) {
            return exp;
        }),
        "-": unaryNumeric(function(exp) {
            return -exp;
        }),
        "%": unaryNumeric(function(exp) {
            return exp/100;
        })
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

    exports.binary = function(context, op, left, right) {
        return BINARY[op].call(context, left, right);
    };

    exports.unary = function(context, op, exp) {
        return UNARY[op].call(context, exp);
    };

    exports.func = function(context, fname) {
        var args = slice(arguments, 2);
        return FUNCS[fname].apply(context, args);
    };

    exports.makeFormula = function(args) {
        return args;
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
