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

    function Ref(){}

    Ref.define = function(ctor) {
        ctor.prototype = new Ref();
        return ctor;
    };

    methods(Ref, {
        simplify: function() {
            return this;
        },
        setSheet: function(sheet) {
            this.sheet = sheet;
            return this;
        }
    });

    /* -----[ Null reference ]----- */

    var NullRef = Ref.define(function NullRef(){});

    var NULL = new NullRef();

    /* -----[ Name reference ]----- */

    var NameRef = Ref.define(function NameRef(name){
        this.name = name;
    });

    /* -----[ Cell reference ]----- */

    var CellRef = Ref.define(function CellRef(col, row, rel) {
        this.col = col;
        this.row = row;
        this.rel = rel;
    });

    methods(CellRef, {
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

    var RangeRef = Ref.define(function RangeRef(tl, br) {
        this.topLeft = tl;
        this.bottomRight = br;
        this.normalize();
    });

    methods(RangeRef, {
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

    /* -----[ Errors ]----- */

    function CalcError(type) {
        this.type = type;
    }

    methods(CalcError, {
        toString: function() {
            return "#" + this.type;
        }
    });

    // utils ------------------------

    function methods(obj, methods) {
        obj.is = function(thing) {
            return thing instanceof obj;
        };
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
        var n = a.length, ret = new Array(n - i);
        while (i < n) {
            ret[i] = a[i++];
        }
        return ret;
    }

    function last(a) {
        return a[a.length - 1];
    }

    // spreadsheet functions --------

    function withResolvedCells(f) {
        return function() {
            var SS = this;
            var promise = $.Deferred();
            var args = slice(arguments).map(function(x){
                if (x instanceof Ref) {
                    x = SS.fetch(x);
                }
                return x;
            });
            $.when.apply($, args).then(function(){
                var val = f.apply(SS, arguments);
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
            } else if (x.type == "num") {
                f(x.value);
            }
        }
    }

    var functions = {
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
        })
    };

    /* -----[ exports ]----- */

    exports.NULL = NULL;
    exports.Ref = Ref;
    exports.NullRef = NullRef;
    exports.NameRef = NameRef;
    exports.CellRef = CellRef;
    exports.RangeRef = RangeRef;
    exports.CalcError = CalcError;
    exports.functions = functions;

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
