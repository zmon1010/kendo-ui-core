// -*- fill-column: 100 -*-

(function(f, define){
    define([], f);
})(function(){

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, laxbreak:true */

    "use strict";

    var spreadsheet = kendo.spreadsheet;
    var Class = kendo.Class;

    function columnName(colIndex) {
        var letter = Math.floor(colIndex / 26) - 1;
        return (letter >= 0 ? columnName(letter) : "") + String.fromCharCode(65 + (colIndex % 26));
    }

    function displayRef(sheet, row, col, rel) {
        var aa = "";

        ++row;

        if (!isFinite(row)) {
            row = "";
        }
        else if (rel != null && !(rel & 2)) {
            row = "$" + row;
        }

        if (!isFinite(col)) {
            col = "";
        }
        else {
            aa = columnName(col);
            if (rel != null && !(rel & 1)) {
                aa = "$" + aa;
            }
        }

        if (sheet) {
            return sheet + "!" + aa + row;
        } else {
            return aa + row;
        }
    }

    /* -----[ References ]----- */

    var Ref = Class.extend({
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
        absolute: function(){
            return this;
        },
        relative: function(){
            return this;
        },
        toString: function() {
            return this.print(0, 0);
        },
        forEach: function(callback) {
            callback(this);
        },
        map: function(callback) {
            return callback(this);
        }
    });

    Ref.display = displayRef;

    /* -----[ Null reference ]----- */

    var NULL = new (Ref.extend({
        init: function NullRef(){},
        print: function() {
            return "#NULL!";
        },
        forEach: $.noop
    }))();

    /* -----[ Name reference ]----- */

    var NameRef = Ref.extend({
        ref: "name",
        init: function NameRef(name){
            this.name = name;
        },
        print: function(tcol, trow) {
            var ret = this.name;
            if (this.hasSheet()) {
                ret = this.sheet + "!" + ret;
            }
            return ret;
        }
    });

    /* -----[ Cell reference ]----- */

    var CellRef = Ref.extend({
        ref: "cell",
        init: function CellRef(row, col, rel) {
            this.row = row;
            this.col = col;
            this.rel = rel || 0;
        },
        clone: function() {
            return new CellRef(this.row, this.col, this.rel)
                .setSheet(this.sheet, this.hasSheet());
        },
        intersect: function(ref) {
            if (ref instanceof CellRef) {
                if (ref.row == this.row && ref.col == this.col && ref.sheet == this.sheet) {
                    return this;
                } else {
                    return NULL;
                }
            }
            return ref.intersect(this);
        },
        print: function(trow, tcol) {
            var col = this.col, row = this.row, rel = this.rel;
            if (trow == null) {
                if (isFinite(col)) {
                    col = rel & 1 ? ("C[" + col + "]") : ("C" + (col + 1));
                } else {
                    col = "";
                }
                if (isFinite(row)) {
                    row = rel & 2 ? ("R[" + row + "]") : ("R" + (row + 1));
                } else {
                    row = "";
                }
                return row + col;
            } else {
                if (rel & 1) {
                    // relative col, add target
                    col += tcol;
                }
                if (rel & 2) {
                    // relative row, add target
                    row += trow;
                }
                if ((isFinite(col) && col < 0) || (isFinite(row) && row < 0)) {
                    return "#REF!";
                }
                return displayRef(this._hasSheet && this.sheet, row, col, rel);
            }
        },
        absolute: function(arow, acol) {
            if (this.rel & 3 === 0) {
                return this;    // already absolute
            }
            var ret = this.clone();
            ret.rel = 0;
            if (this.rel & 1) {
                // relative col, add anchor
                ret.col += acol;
            }
            if (this.rel & 2) {
                // relative row, add anchor
                ret.row += arow;
            }
            return ret;
        },
        toRangeRef: function() {
            return new RangeRef(this, this);
        },

        relative: function(arow, acol, rel) {
            var row = rel & 2 ? this.row - arow : this.row;
            var col = rel & 1 ? this.col - acol : this.col;
            return new CellRef(row, col, rel)
                .setSheet(this.sheet, this.hasSheet());
        },
        height: function() {
            return 1;
        },
        width: function() {
            return 1;
        }
    });

    /* -----[ Range reference ]----- */

    var RangeRef = Ref.extend({
        ref: "range",
        init: function RangeRef(tl, br) {
            // we want to drop any sheet information from the cells here.
            this.topLeft = new CellRef(tl.row, tl.col, tl.rel);
            this.bottomRight = new CellRef(br.row, br.col, br.rel);
            this.normalize();
        },
        clone: function() {
            return new RangeRef(this.topLeft, this.bottomRight)
                .setSheet(this.sheet, this.hasSheet());
        },
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
            if (ref instanceof CellRef) {
                return this._containsCell(ref);
            }
            if (ref instanceof RangeRef) {
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
                    new CellRef(Math.max(a_top, b_top),
                                Math.max(a_left, b_left)),
                    // bottomRight
                    new CellRef(Math.min(a_bottom, b_bottom),
                                Math.min(a_right, b_right))
                ).setSheet(this.sheet, this.hasSheet());
            } else {
                return NULL;
            }
        },

        intersect: function(ref) {
            if (ref === NULL) {
                return ref;
            }
            if (ref instanceof CellRef) {
                return this._containsCell(ref) ? ref : NULL;
            }
            if (ref instanceof RangeRef) {
                return this._intersectRange(ref).simplify();
            }
            if (ref instanceof UnionRef) {
                return ref.intersect(this);
            }
            throw new Error("Unknown reference");
        },

        intersects: function(ref) {
            return this.intersect(ref) !== NULL;
        },

        simplify: function() {
            if (this.topLeft.row == this.bottomRight.row &&
                this.topLeft.col == this.bottomRight.col)
            {
                return new CellRef(
                    this.topLeft.row,
                    this.topLeft.col,
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
                this.topLeft = new CellRef(r1, c1, rc1 | rr1);
                this.bottomRight = new CellRef(r2, c2, rc2 | rr2);
            }
            return this;
        },

        print: function(trow, tcol) {
            var ret = this.topLeft.print(trow, tcol)
                + ":"
                + this.bottomRight.print(trow, tcol);
            if (this.hasSheet()) {
                ret = this.sheet + "!" + ret;
            }
            return ret;
        },


        absolute: function(arow, acol) {
            return new RangeRef(
                this.topLeft.absolute(arow, acol),
                this.bottomRight.absolute(arow, acol)
            ).setSheet(this.sheet, this.hasSheet());
        },

        height: function() {
            if (this.topLeft.rel != this.bottomRight.rel) {
                throw new Error("Mixed relative/absolute references");
            }
            return this.bottomRight.row - this.topLeft.row + 1;
        },

        width: function() {
            if (this.topLeft.rel != this.bottomRight.rel) {
                throw new Error("Mixed relative/absolute references");
            }
            return this.bottomRight.col - this.topLeft.col + 1;
        },

        collapse: function() {
            return this.topLeft.toRangeRef();
        },

        leftColumn: function() {
            return new RangeRef(this.topLeft, new CellRef(this.bottomRight.row, this.topLeft.col));
        },

        topRow: function() {
            return new RangeRef(this.topLeft, new CellRef(this.topLeft.row, this.bottomRight.col));
        },

        toRangeRef: function() {
            return this;
        },

        intersecting: function(refs) {
            return refs.filter(function(ref) {
                return ref.intersects(this);
            }, this);
        },

        union: function(refs, callback) {
            refs = this.intersecting(refs);

            var topLeftRow = this.topLeft.row;
            var topLeftCol = this.topLeft.col;
            var bottomRightRow = this.bottomRight.row;
            var bottomRightCol = this.bottomRight.col;

            refs.forEach(function(ref) {
                if (ref.topLeft.row < topLeftRow) {
                    topLeftRow = ref.topLeft.row;
                }

                if (ref.topLeft.col < topLeftCol) {
                    topLeftCol = ref.topLeft.col;
                }

                if (ref.bottomRight.row > bottomRightRow) {
                    bottomRightRow = ref.bottomRight.row;
                }

                if (ref.bottomRight.col > bottomRightCol) {
                    bottomRightCol = ref.bottomRight.col;
                }

                if (callback) {
                    callback(ref);
                }
            });

            return new RangeRef(
                new CellRef(topLeftRow, topLeftCol),
                new CellRef(bottomRightRow, bottomRightCol)
            );
        }
    });

    /* -----[ Union reference ]----- */

    var UnionRef = Ref.extend({
        init: function UnionRef(refs){
            this.refs = refs;
        },
        intersect: function(ref) {
            var a = [];
            for (var i = 0; i < this.refs.length; ++i) {
                var x = ref.intersect(this.refs[i]);
                if (x !== NULL) {
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
        absolute: function(arow, acol) {
            return new UnionRef(this.refs.map(function(ref){
                return ref.absolute(arow, acol);
            }));
        },
        forEach: function(callback) {
            this.refs.forEach(callback);
        },
        toRangeRef: function() {
            return this.refs[0].toRangeRef();
        },

        map: function(callback) {
            return new UnionRef(this.refs.map(callback));
        }
    });

    /* -----[ exports ]----- */

    spreadsheet.NULLREF = NULL;
    spreadsheet.SHEETREF = new RangeRef(new CellRef(0, 0), new CellRef(Infinity, Infinity));
    spreadsheet.Ref = Ref;
    spreadsheet.NameRef = NameRef;
    spreadsheet.CellRef = CellRef;
    spreadsheet.RangeRef = RangeRef;
    spreadsheet.UnionRef = UnionRef;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
