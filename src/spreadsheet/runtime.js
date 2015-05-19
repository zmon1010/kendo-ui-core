// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./sheet.js" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, validthis:true */
    /* global console */

    var calc = {};
    kendo.spreadsheet.calc = calc;
    var exports = calc.Runtime = {};

    /* -----[ References ]----- */

    var Ref = defclass(null, function Ref(){}, {
        type: "ref",
        hasSheet: function() {
            return this._hasSheet;
        },
        simplify: function() {
            return this;
        },
        setSheet: function(sheet, hasSheet) {
            this.sheet = sheet;
            if (hasSheet != null) {
                this._hasSheet = hasSheet;
            }
            return this;
        },
        adjust: function(){
            return this;
        }
    });

    /* -----[ Null reference ]----- */

    var NullRef = defclass(Ref, function NullRef(){}, {
        print: function() {
            return "#NULL!";
        }
    });

    var NULL = new NullRef();

    /* -----[ Name reference ]----- */

    var NameRef = defclass(Ref, function NameRef(name){
        this.name = name;
    }, {
        ref: "name",
        print: function(tcol, trow, orig) {
            var ret = this.name;
            if (this.hasSheet()) {
                ret = this.sheet + "!" + ret;
            }
            return ret;
        }
    });

    /* -----[ Cell reference ]----- */

    var CellRef = defclass(Ref, function CellRef(col, row, rel) {
        this.col = col;
        this.row = row;
        this.rel = rel;
    }, {
        ref: "cell",
        clone: function() {
            return new CellRef(this.col, this.row, this.rel)
                .setSheet(this.sheet, this.hasSheet());
        },
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
        print: function(tcol, trow, orig) {
            var col = this.col, row = this.row, rel = this.rel;
            if (rel & 1) {
                // relative col
                col = col - orig.col + tcol;
            }
            if (rel & 2) {
                // relative row
                row = row - orig.row + trow;
            }
            if ((isFinite(col) && col < 1) || (isFinite(row) && row < 1)) {
                return "#REF!";
            }
            return calc.make_reference(this._hasSheet && this.sheet, col, row, rel);
        },
        adjust: function(operation, start, delta) {
            var ret = this.clone();
            switch (operation) {
              case "col":
                if (ret.col == start && delta < 0) {
                    return NULL;
                }
                if (ret.col >= start) {
                    ret.col += delta;
                }
                break;
              case "row":
                if (ret.row == start && delta < 0) {
                    return NULL;
                }
                if (ret.row >= start) {
                    ret.row += delta;
                }
                break;
            }
            return (ret.col < 1 || ret.row < 1) ? NULL : ret;
        }
    });

    /* -----[ Range reference ]----- */

    var RangeRef = defclass(Ref, function RangeRef(tl, br) {
        // we want to drop any sheet information from the cells here.
        this.topLeft = new CellRef(tl.col, tl.row, tl.rel);
        this.bottomRight = new CellRef(br.col, br.row, br.rel);
        this.normalize();
    }, {
        ref: "range",
        _containsRange: function(range) {
            return this._containsCell(range.topLeft)
                && this._containsCell(range.bottomRight);
        },
        _containsCell: function(cell) {
            return cell.sheet == this.sheet
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
            if (this.sheet != ref.sheet) {
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
                                Math.max(a_top, b_top)),
                    // bottomRight
                    new CellRef(Math.min(a_right, b_right),
                                Math.min(a_bottom, b_bottom))
                ).setSheet(this.sheet, this.hasSheet());
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
                return new CellRef(
                    this.topLeft.col,
                    this.topLeft.row,
                    this.topLeft.rel
                ).setSheet(this.sheet, this.hasSheet());
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

        print: function(tcol, trow, orig) {
            var ret = this.topLeft.print(tcol, trow, orig)
                + ":"
                + this.bottomRight.print(tcol, trow, orig);
            if (this.hasSheet()) {
                ret = this.sheet + "!" + ret;
            }
            return ret;
        },

        adjust: function(operation, start, delta) {
            var tl = this.topLeft.adjust(operation, start, delta);
            var br = this.bottomRight.adjust(operation, start, delta);
            if (NullRef.is(tl) && NullRef.is(br)) {
                return NULL;
            }
            switch (operation) {
              case "col":
                if (NullRef.is(tl)) {
                    this.topLeft.col = start;
                    tl = this.topLeft;
                }
                else if (NullRef.is(br)) {
                    this.bottomRight.col = start;
                    br = this.bottomRight;
                }
                break;
              case "row":
                if (NullRef.is(tl)) {
                    this.topLeft.row = start;
                    tl = this.topLeft;
                }
                else if (NullRef.is(br)) {
                    this.bottomRight.row = start;
                    br = this.bottomRight;
                }
                break;
            }
            this.topLeft = tl;
            this.bottomRight = br;
            return this.simplify();
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

    var CalcError = defclass(null, function CalcError(code) {
        this.code = code;
    }, {
        toString: function() {
            return "#" + this.code + "!";
        }
    });

    /* -----[ Formula ]----- */

    var Formula = defclass(null, function Formula(refs, handler){
        this.refs = refs;
        this.handler = handler;
    }, {
        exec: function(SS, sheet, col, row, callback) {
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
                    col: col,
                    row: row,
                    resolve: function(val) {
                        val = cellValues(this, [ val ])[0];
                        if (val == null) {
                            val = 0;
                        }
                        formula.value = val;
                        SS.onFormula(sheet, col, row, val);
                        if (callback) {
                            callback(val);
                        }
                    },
                    error: function(val) {
                        SS.onFormula(sheet, col, row, val);
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
        adjust: function(operation, start, delta) {
            this.refs = this.refs.map(function(ref){
                return ref.adjust(operation, start, delta);
            });
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
                if (!add(context.ss.getRefCells(x))) {
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
            cell.formula.exec(context.ss, cell.sheet, cell.col, cell.row, function(val){
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
                    var ref = calc.parse_formula(this.sheet, 0, 0, thing);
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
                callback(new RangeRef(left, right).setSheet(left.sheet || this.formula.sheet, left.hasSheet()));
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

    exports.makeFormula = function(refs, handler) {
        return new Formula(refs, handler);
    };

    exports.makeCellRef = function(col, row, rel) {
        return new CellRef(col, row, rel);
    };

    exports.makeRangeRef = function(tl, br) {
        return new RangeRef(tl, br);
    };

    exports.makeNameRef = function(name) {
        return new NameRef(name);
    };

    exports.makeError = function(type) {
        return new CalcError(type);
    };

    exports.Ref = Ref;
    exports.NullRef = NullRef;
    exports.CellRef = CellRef;
    exports.RangeRef = RangeRef;
    exports.NameRef = NameRef;
    exports.UnionRef = UnionRef;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
