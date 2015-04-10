// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./calc" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true */
    /* global console */

    var exports = kendo.spreadsheet.calc.Runtime = {};

    /* -----[ References ]----- */

    function Ref(){}

    Ref.define = function(ctor) {
        ctor.prototype = new Ref();
        ctor.is = function(thing) {
            return thing instanceof ctor;
        };
        return ctor;
    };

    methods(Ref, {
        simplify: function() {
            return this;
        }
    });

    /* -----[ Null reference ]----- */

    var NullRef = Ref.define(function NullRef(){});

    var NULL = new NullRef();

    /* -----[ Cell reference ]----- */

    var CellRef = Ref.define(function CellRef(col, row) {
        this.col = col;
        this.row = row;
    });

    /* -----[ Column reference ]----- */

    var ColRef = Ref.define(function ColRef(left, right) {
        this.left = left;
        this.right = right;
    });

    /* -----[ Row reference ]----- */

    var RowRef = Ref.define(function RowRef(top, bottom) {
        this.top = top;
        this.bottom = bottom;
    });

    /* -----[ Range reference ]----- */

    var RangeRef = Ref.define(function RangeRef(tl, br) {
        this.topLeft = tl;
        this.bottomRight = br;
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
            if (ColRef.is(ref) || RowRef.is(ref)) {
                // a range is limited
                return false;
            }
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
                );
            } else {
                return NULL;
            }
        },
        _intersectCol: function(ref) {
            if (this.topLeft.col <= ref.right &&
                this.bottomRight.col >= ref.left)
            {
                return new RangeRef(
                    // topLeft
                    new CellRef(Math.max(this.topLeft.col, ref.left),
                                this.topLeft.row),
                    new CellRef(Math.min(this.bottomRight.col, ref.right),
                                this.bottomRight.row)
                    // bottomRight
                );
            } else {
                return NULL;
            }
        },
        _intersectRow: function(ref) {
            if (this.topLeft.row <= ref.bottom &&
                this.bottomRight.row >= ref.top)
            {
                return new RangeRef(
                    // topLeft
                    new CellRef(this.topLeft.col,
                                Math.max(this.topLeft.row, ref.top)),
                    // bottomRight
                    new CellRef(this.bottomRight.col,
                                Math.min(this.bottomRight.row, ref.bottom))
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
            if (ColRef.is(ref)) {
                return this._intersectCol(ref).simplify();
            }
            if (RowRef.is(ref)) {
                return this._intersectRow(ref).simplify();
            }
        },

        simplify: function() {
            if (this.topLeft.row == this.bottomRight.row &&
                this.topLeft.col == this.bottomRight.col)
            {
                return new CellRef(this.topLeft.col,
                                   this.topLeft.row);
            }
            return this;
        }
    });

    // utils ------------------------

    function methods(obj, methods) {
        for (var i in methods) {
            if (Object.prototype.hasOwnProperty.call(methods, i)) {
                obj.prototype[i] = methods[i];
            }
        }
    }

    // (function(){
    //     var col = new ColRef(3, 6);
    //     var tl = new CellRef(1, 1);
    //     var br = new CellRef(10, 10);
    //     var r = new RangeRef(tl, br);
    //     var r2 = new RangeRef(
    //         new CellRef(10, 10),
    //         new CellRef(12, 12)
    //     );
    //     console.log(r.intersect(r2));
    // })();

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
