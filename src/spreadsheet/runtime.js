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

    /* -----[ Context ]----- */

    var Context = Class.extend({
        init: function Context(callback, formula, ss, sheet, row, col) {
            this.callback = callback;
            this.formula = formula;
            this.ss = ss;
            this.sheet = sheet;
            this.row = row;
            this.col = col;
        },

        resolve: function(val) {
            this.formula.value = val;
            this.ss.onFormula(this.sheet, this.row, this.col, val);
            if (this.callback) {
                this.callback(val);
            }
        },

        error: function(val) {
            this.ss.onFormula(this.sheet, this.row, this.col, val);
            if (this.callback) {
                this.callback(val);
            }
            return val;
        },

        resolveCells: function(a, f) {
            var context = this, formulas = [];

            for (var i = 0; i < a.length; ++i) {
                var x = a[i];
                if (x instanceof Ref) {
                    if (!add(context.ss.getRefCells(x))) {
                        context.error(new CalcError("CIRCULAR"));
                        return;
                    }
                }
            }

            if (!formulas.length) {
                return f.call(context);
            }

            for (var pending = formulas.length, i = 0; i < formulas.length; ++i) {
                fetch(formulas[i]);
            }
            function fetch(cell) {
                cell.formula.exec(context.ss, cell.sheet, cell.row, cell.col, function(val){
                    if (!--pending) {
                        f.call(context);
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
        },

        cellValues: function(a, f) {
            var ret = [];
            for (var i = 0; i < a.length; ++i) {
                var val = a[i];
                if (val instanceof Ref) {
                    val = this.ss.getData(val);
                    ret = ret.concat(val);
                } else {
                    ret.push(val);
                }
            }
            if (f) {
                return f.apply(this, ret);
            }
            return ret;
        },

        forNumbers: function(a, f) {
            if (a instanceof Ref) {
                a = this.cellValues([ a ]);
            }
            else if (a instanceof Matrix) {
                a = a.data;
            }
            if (Array.isArray(a)) {
                for (var i = 0; i < a.length; ++i) {
                    this.forNumbers(a[i], f);
                }
            }
            if (typeof a == "number") {
                f(a);
            }
        },

        func: function(fname, callback, args) {
            fname = fname.toLowerCase();
            if (Object.prototype.hasOwnProperty.call(FUNCS, fname)) {
                return FUNCS[fname].call(this, callback, args);
            }
            this.error(new CalcError("NAME"));
        },

        bool: function(val) {
            if (val instanceof Ref) {
                val = this.ss.getData(val);
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
        },

        divide: function(callback, left, right) {
            if (right === 0) {
                this.error(new CalcError("DIV/0"));
            } else {
                callback(left / right);
            }
        },

        asMatrix: function(range) {
            if (range instanceof Matrix) {
                return range;
            }
            var self = this;
            if (range instanceof RangeRef) {
                var tl = range.topLeft;
                var cells = self.ss.getRefCells(range);
                var m = new Matrix(self);
                // XXX: infinite range?  tl.row / tl.col will be infinite, thus endless loop later
                // (i.e. in Matrix.each).
                cells.forEach(function(cell){
                    m.set(cell.row - tl.row,
                          cell.col - tl.col,
                          cell.value);
                });
                return m;
            }
            if (Array.isArray(range) && range.length > 0) {
                var m = new Matrix(self), row = 0;
                range.forEach(function(line){
                    var col = 0;
                    var h = 1;
                    line.forEach(function(el){
                        var isRange = el instanceof RangeRef;
                        if (el instanceof Ref && !isRange) {
                            el = self.ss.getData(el);
                        }
                        if (isRange || Array.isArray(el)) {
                            el = self.asMatrix(el);
                        }
                        if (el instanceof Matrix) {
                            el.each(function(el, r, c){
                                m.set(row + r, col + c, el);
                            });
                            h = Math.max(h, el.height);
                            col += el.width;
                        } else {
                            m.set(row, col++, el);
                        }
                    });
                    row += h;
                });
                return m;
            }
        }
    });

    var Matrix = Class.extend({
        init: function Matrix(context) {
            this.context = context;
            this.height = 0;
            this.width = 0;
            this.data = [];
        },
        get: function(row, col) {
            var line = this.data[row];
            var val = line ? line[col] : null;
            return val instanceof Ref ? this.context.ss.getData(val) : val;
        },
        set: function(row, col, data) {
            var line = this.data[row];
            if (line == null) {
                line = this.data[row] = [];
            }
            line[col] = data;
            if (row >= this.height) {
                this.height = row + 1;
            }
            if (col >= this.width) {
                this.width = col + 1;
            }
        },
        each: function(f, includeEmpty) {
            for (var row = 0; row < this.height; ++row) {
                for (var col = 0; col < this.width; ++col) {
                    var val = this.get(row, col);
                    if (includeEmpty || val != null) {
                        var val = f.call(this.context, val, row, col);
                        if (val !== undefined) {
                            return val;
                        }
                    }
                }
            }
        },
        map: function(f, includeEmpty) {
            var m = new Matrix(this.context);
            this.each(function(el, row, col){
                // here `this` is actually the context
                m.set(row, col, f.call(this, el, row, col));
            }, includeEmpty);
            return m;
        },
        eachRow: function(f) {
            for (var row = 0; row < this.height; ++row) {
                var val = f.call(this.context, row);
                if (val !== undefined) {
                    return val;
                }
            }
        },
        eachCol: function(f) {
            for (var col = 0; col < this.width; ++col) {
                var val = f.call(this.context, col);
                if (val !== undefined) {
                    return val;
                }
            }
        },
        toString: function() {
            return JSON.stringify(this.data);
        }
    });

    /* -----[ Formula ]----- */

    var Formula = Class.extend({
        init: function Formula(refs, handler, printer){
            this.refs = refs;
            this.handler = handler;
            this.print = printer;
            this.absrefs = null;
        },
        clone: function() {
            return new Formula(this.refs, this.handler, this.print);
        },
        exec: function(ss, sheet, row, col, callback) {
            if ("value" in this) {
                if (callback) {
                    callback(this.value);
                }
            } else {
                if (!this.absrefs) {
                    this.absrefs = this.refs.map(function(ref){
                        return ref.absolute(row, col);
                    }, this);
                }
                var ctx = new Context(callback, this, ss, sheet, row, col);
                ctx.resolveCells(this.absrefs, this.handler);
            }
        },
        reset: function() {
            delete this.value;
        },
        adjust: function(operation, start, delta, formulaRow, formulaCol) {
            this.absrefs = null;
            this.refs = this.refs.map(function(ref){
                if (ref instanceof CellRef) {
                    return deletesCell(ref) ? NULL : fixCell(ref);
                }
                else if (ref instanceof RangeRef) {
                    var del_start = deletesCell(ref.topLeft);
                    var del_end = deletesCell(ref.bottomRight);
                    if (del_start && del_end) {
                        return NULL;
                    }
                    if (del_start) {
                        // this case is rather tricky to handle with relative references.  what we
                        // want here is that the range top-left stays in place, even if the cell
                        // itself is being deleted.  So, we (1) convert it to absolute cell based on
                        // formula position, then make it relative to the location where the formula
                        // will end up after the deletion.
                        return new RangeRef(
                            ref.topLeft
                                .absolute(formulaRow, formulaCol)
                                .relative(
                                    operation == "row" ? fixNumber(formulaRow) : formulaRow,
                                    operation == "col" ? fixNumber(formulaCol) : formulaCol,
                                    ref.topLeft.rel
                                ),
                            fixCell(ref.bottomRight)
                        ).setSheet(ref.sheet, ref.hasSheet());
                    }
                    return new RangeRef(
                        fixCell(ref.topLeft),
                        fixCell(ref.bottomRight)
                    ).setSheet(ref.sheet, ref.hasSheet());
                }
                else if (!(ref instanceof NameRef)) {
                    throw new Error("Unknown reference in adjust");
                }
            });
            function deletesCell(ref) {
                if (delta >= 0) {
                    return false;
                }
                ref = ref.absolute(formulaRow, formulaCol);
                if (operation == "row") {
                    return ref.row >= start && ref.row < start - delta;
                } else {
                    return ref.col >= start && ref.col < start - delta;
                }
            }
            function fixCell(ref) {
                return new CellRef(
                    operation == "row" ? fixNumber(ref.row, ref.rel & 2, formulaRow) : ref.row,
                    operation == "col" ? fixNumber(ref.col, ref.rel & 1, formulaCol) : ref.col,
                    ref.rel
                ).setSheet(ref.sheet, ref.hasSheet());
            }
            function fixNumber(num, relative, base) {
                if (relative) {
                    var abs = base + num;
                    if (abs < start && start <= base) {
                        return num - delta;
                    } else if (base < start && start <= abs) {
                        return num + delta;
                    } else {
                        return num;
                    }
                } else {
                    if (num >= start) {
                        return num + delta;
                    } else {
                        return num;
                    }
                }
            }
        }
    });

    // spreadsheet functions --------

    function arrayHandler1(func) {
        return function doit(val) {
            var m = this.asMatrix(val);
            return m ? m.map(doit) : this.cellValues([ val ], func);
        };
    }

    function arrayHandler2(func) {
        return function doit(left, right) {
            var mleft = this.asMatrix(left);
            var mright = this.asMatrix(right);
            if (mleft && mright) {
                return mleft.map(function(el, row, col){
                    return doit.call(this, el, mright.get(row, col));
                });
            }
            else if (mleft) {
                return mleft.map(function(el){
                    return doit.call(this, el, right);
                });
            }
            else if (mright) {
                return mright.map(function(el){
                    return doit.call(this, left, el);
                });
            }
            else {
                return this.cellValues([ left, right ], func);
            }
        };
    }

    function binaryNumeric(func) {
        var handler = arrayHandler2(function(left, right){
            left = +left;
            right = +right;
            if (isNaN(left) || isNaN(right)) {
                return new CalcError("VALUE");
            }
            else {
                return func(left, right);
            }
        });
        return function(callback, args) {
            callback(handler.call(this, args[0], args[1]));
        };
    }

    function binaryCompare(func) {
        var handler = arrayHandler2(function(left, right){
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
            if (typeof left == "string" && typeof right == "string") {
                // string comparison is case insensitive
                left = left.toLowerCase();
                right = right.toLowerCase();
            }
            if (typeof right == typeof left) {
                return func.call(this, left, right);
            } else {
                return new CalcError("VALUE");
            }
        });
        return function(callback, args) {
            callback(handler.call(this, args[0], args[1]));
        };
    }

    function unaryNumeric(func) {
        var handler = arrayHandler1(function(exp){
            exp = +exp;
            if (isNaN(exp)) {
                return new CalcError("VALUE");
            } else {
                return func.call(this, exp);
            }
        });
        return function(callback, args) {
            callback(handler.call(this, args[0]));
        };
    }

    var FUNCS = {

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
                return new CalcError("DIV/0");
            }
            return left / right;
        }),
        "binary^": binaryNumeric(function(left, right){
            return Math.pow(left, right);
        }),

        // text concat
        "binary&": (function(){
            var handler = arrayHandler2(function(left, right){
                if (left == null) { left = ""; }
                if (right == null) { right = ""; }
                return "" + left + right;
            });
            return function(callback, args) {
                callback(handler.call(this, args[0], args[1]));
            };
        })(),

        // boolean
        "binary=": (function(){
            var handler = arrayHandler2(function(left, right){
                return left === right;
            });
            return function(callback, args) {
                callback(handler.call(this, args[0], args[1]));
            };
        })(),
        "binary<>": (function(){
            var handler = arrayHandler2(function(left, right){
                return left !== right;
            });
            return function(callback, args) {
                callback(handler.call(this, args[0], args[1]));
            };
        })(),
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
        }),

        /* -----[ conditional ]----- */

        "if": function(callback, args) {
            var self = this;
            var co = args[0], th = args[1], el = args[2];
            var comatrix = self.asMatrix(co);
            if (comatrix) {
                // XXX: calling both branches in this case, since we'll typically need values from
                // both.  We could optimize and call them only when first needed, but oh well.
                th(function(th){
                    el(function(el){
                        var thmatrix = self.asMatrix(th);
                        var elmatrix = self.asMatrix(el);
                        callback(comatrix.map(function(val, row, col){
                            if (self.bool(val)) {
                                return thmatrix ? thmatrix.get(row, col) : th;
                            } else {
                                return elmatrix ? elmatrix.get(row, col) : el;
                            }
                        }));
                    });
                });
            } else {
                if (self.bool(co)) {
                    th(callback);
                } else {
                    el(callback);
                }
            }
        },

        "not": (function(){
            var handler = arrayHandler1(function(x){
                return !this.bool(x);
            });
            return function(callback, args) {
                callback(handler.call(this, args[0]));
            };
        })(),

        /* -----[ error catching ]----- */

        "-catch": function(callback, args){
            var fname = args[0].toLowerCase();
            var prevCallback = this.callback;
            this.callback = function(ret) {
                this.callback = prevCallback;
                var val = this.cellValues([ ret ])[0];
                switch (fname) {
                  case "isblank":
                    if (ret instanceof CellRef) {
                        return callback(val == null || val === "");
                    }
                    return callback(false);
                  case "iserror":
                    return callback(val instanceof CalcError);
                  case "iserr":
                    return callback(val instanceof CalcError && val.code != "N/A");
                  case "islogical":
                    return callback(typeof val == "boolean");
                  case "isna":
                    return callback(val instanceof CalcError && val.code == "N/A");
                  case "isnontext":
                    return callback(typeof val != "string" || val === "");
                  case "isref":
                    // apparently should return true only for cell and range
                    return callback(ret instanceof CellRef || ret instanceof RangeRef);
                  case "istext":
                    return callback(typeof val == "string" && val !== "");
                  case "isnumber":
                    return callback(typeof val == "number");
                }
                this.error("CATCH");
            };
            args[1]();
        }

    };

    /* -----[ exports ]----- */

    exports.CalcError = CalcError;
    exports.Formula = Formula;
    exports.arrayHandler1 = arrayHandler1;
    exports.arrayHandler2 = arrayHandler2;

    exports.defineFunction = function(name, func) {
        FUNCS[name.toLowerCase()] = func;
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
