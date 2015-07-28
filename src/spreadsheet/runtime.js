// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./references" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, validthis:true, -W054, loopfunc: true */
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
        init: function Context(callback, formula, ss) {
            this.callback = callback;
            this.formula = formula;
            this.ss = ss;
            this.sheet = formula.sheet;
            this.row = formula.row;
            this.col = formula.col;
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

            if ((function loop(a){
                for (var i = 0; i < a.length; ++i) {
                    var x = a[i];
                    if (x instanceof Ref) {
                        if (!add(context.ss.getRefCells(x))) {
                            context.error(new CalcError("CIRCULAR"));
                            return true;
                        }
                    }
                    if (Array.isArray(x)) {
                        // make sure we resolve cells in literal matrices
                        if (loop(x)) {
                            return true;
                        }
                    }
                }
            })(a)) {
                // some circular dep was detected, stop here.
                return;
            }

            if (!formulas.length) {
                return f.call(context);
            }

            for (var pending = formulas.length, i = 0; i < formulas.length; ++i) {
                fetch(formulas[i]);
            }
            function fetch(cell) {
                cell.formula.exec(context.ss, function(val){
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
                } else if (Array.isArray(val)) {
                    ret = ret.concat(this.cellValues(val));
                } else if (val instanceof Matrix) {
                    ret = ret.concat(this.cellValues(val.data));
                } else {
                    ret.push(val);
                }
            }
            if (f) {
                return f.apply(this, ret);
            }
            return ret;
        },

        force: function(val) {
            if (val instanceof Ref) {
                return this.ss.getData(val);
            }
            return val;
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

        asMatrix: function(range) {
            if (range instanceof Matrix) {
                return range;
            }
            var self = this;
            if (range instanceof RangeRef) {
                var tl = range.topLeft;
                var top = tl.row, left = tl.col;
                var cells = self.ss.getRefCells(range);
                var m = new Matrix(self);
                if (isFinite(range.width())) {
                    m.width = range.width();
                }
                if (isFinite(range.height())) {
                    m.height = range.height();
                }
                if (!isFinite(top)) {
                    top = 0;
                }
                if (!isFinite(left)) {
                    left = 0;
                }
                cells.forEach(function(cell){
                    m.set(cell.row - top,
                          cell.col - left,
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
        clone: function() {
            var m = new Matrix(this.context);
            m.height = this.height;
            m.width = this.width;
            m.data = this.data.map(function(row){ return row.slice(); });
            return m;
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
                        val = f.call(this.context, val, row, col);
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
        mapRow: function(f) {
            var m = new Matrix(this.context);
            this.eachRow(function(row){
                m.set(row, 0, f.call(this.context, row));
            });
            return m;
        },
        mapCol: function(f) {
            var m = new Matrix(this.context);
            this.eachCol(function(col){
                m.set(0, col, f.call(this.context, col));
            });
            return m;
        },
        toString: function() {
            return JSON.stringify(this.data);
        },
        transpose: function() {
            var m = new Matrix(this.context);
            this.each(function(el, row, col){
                m.set(col, row, el);
            });
            return m;
        },
        unit: function(n) {
            this.width = this.height = n;
            var a = this.data = new Array(n);
            for (var i = n; --i >= 0;) {
                var row = a[i] = new Array(n);
                for (var j = n; --j >= 0;) {
                    row[j] = i == j ? 1 : 0;
                }
            }
            return this;
        },
        determinant: function() {
            // have to thank my father for this function.
            // http://docere.ro/o-aplicatie-pentru-browser-cu-determinanti-si-sisteme-liniare/
            var a = this.clone().data;
            var n = a.length;
            var d = 1, C, L, i, k;
            for (C = 0; C < n; C++) {
                for (L = C; (L < n) && (!a[L][C]); L++) {}
                if (L == n) {
                    return 0;
                }
                if (L != C) {
                    d = -d;
                    for (k = C; k < n; k++) {
                        var t = a[C][k];
                        a[C][k] = a[L][k];
                        a[L][k] = t;
                    }
                }
                for (i = C+1; i < n; i++) {
                    for (k = C+1; k < n; k++) {
                        a[i][k] -= a[C][k] * a[i][C] / a[C][C];
                    }
                }
                d *= a[C][C];
            }
            return d;
        },
        inverse: function() {
            var n = this.width;
            var m = this.augment(new Matrix(this.context).unit(n));
            var a = m.data;
            var tmp;

            // Gaussian elimination
            // https://en.wikipedia.org/wiki/Gaussian_elimination#Finding_the_inverse_of_a_matrix

            // 1. Get zeros below main diagonal
            for (var k = 0; k < n; ++k) {
                var imax = argmax(k, n, function(i){ return a[i][k]; });
                if (!a[imax][k]) {
                    return null; // singular matrix
                }
                if (k != imax) {
                    tmp = a[k];
                    a[k] = a[imax];
                    a[imax] = tmp;
                }
                for (var i = k+1; i < n; ++i) {
                    for (var j = k+1; j < 2*n; ++j) {
                        a[i][j] -= a[k][j] * a[i][k] / a[k][k];
                    }
                    a[i][k] = 0;
                }
            }

            // 2. Get 1-s on main diagonal, dividing by pivot
            for (var i = 0; i < n; ++i) {
                for (var f = a[i][i], j = 0; j < 2*n; ++j) {
                    a[i][j] /= f;
                }
            }

            // 3. Get zeros above main diagonal.  Actually, we only care to compute the right side
            // here (that will be the inverse), so in the inner loop below we go while j >= n,
            // instead of j >= k.
            for (var k = n; --k >= 0;) {
                for (var i = k; --i >= 0;) {
                    if (a[i][k]) {
                        for (var j = 2*n; --j >= n;) {
                            a[i][j] -= a[k][j] * a[i][k];
                        }
                    }
                }
            }

            return m.slice(0, n, n, n);
        },
        augment: function(m) {
            var ret = this.clone(), n = ret.width;
            m.each(function(val, row, col){
                ret.set(row, col + n, val);
            });
            return ret;
        },
        slice: function(row, col, height, width) {
            var m = new Matrix(this.context);
            for (var i = 0; i < height; ++i) {
                for (var j = 0; j < width; ++j) {
                    m.set(i, j, this.get(row + i, col + j));
                }
            }
            return m;
        }

        // XXX: debug
        // dump: function() {
        //     this.data.forEach(function(row){
        //         console.log(row.map(function(val){
        //             var str = val.toFixed(3).replace(/\.?0*$/, function(s){
        //                 return [ "", " ", "  ", "   ", "    " ][s.length];
        //             });
        //             if (val >= 0) { str = " " + str; }
        //             return str;
        //         }).join("  "));
        //     });
        // }
    });

    function argmax(i, end, f) {
        var max = f(i), pos = i;
        while (++i < end) {
            var v = f(i);
            if (v > max) {
                max = v;
                pos = i;
            }
        }
        return pos;
    }

    /* -----[ Formula ]----- */

    var Formula = Class.extend({
        init: function Formula(refs, handler, printer, sheet, row, col){
            this.refs = refs;
            this.handler = handler;
            this.print = printer;
            this.absrefs = null;
            this.sheet = sheet;
            this.row = row;
            this.col = col;
        },
        clone: function(sheet, row, col) {
            return new Formula(this.refs, this.handler, this.print, sheet, row, col);
        },
        exec: function(ss, callback) {
            if ("value" in this) {
                if (callback) {
                    callback(this.value);
                }
            } else {
                if (!this.absrefs) {
                    this.absrefs = this.refs.map(function(ref){
                        return ref.absolute(this.row, this.col);
                    }, this);
                }
                var ctx = new Context(callback, this, ss);
                this.handler.call(ctx);
            }
        },
        reset: function() {
            delete this.value;
        },
        adjust: function(operation, start, delta) {
            var formulaRow = this.row;
            var formulaCol = this.col;
            switch (operation) {
              case "row":
                if (formulaRow >= start) {
                    this.row += delta;
                }
                break;
              case "col":
                if (formulaCol >= start) {
                    this.col += delta;
                }
                break;
            }
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

    var FUNCS = {

        /* -----[ conditional ]----- */

        "if": function(callback, args) {
            var self = this;
            var co = args[0], th = args[1], el = args[2];
            // XXX: I don't like this resolveCells here.  We should try to declare IF with
            // defineFunction.
            this.resolveCells([ co ], function(){
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
            });
        },

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

    // Lasciate ogni speranza, voi ch'entrate.
    //
    // XXX: document this function.
    function compileArgumentChecks(args) {
        var arrayArgs = "function arrayArgs(args) { var xargs = [], width = 0, height = 0, arrays = [], i = 0; ";
        var resolve = "function resolve(args, callback) { var toResolve = [], i = 0; ";
        var name, out, forced, main = "'use strict'; function check(args) { var xargs = [], i = 0, m, err = 'VALUE'; ", haveForced = false;
        var canBeArrayArg = false, hasArrayArgs = false;
        main += args.map(comp).join("");
        main += "if (i < args.length) return new CalcError('N/A'); ";
        main += "return xargs; } ";
        arrayArgs += "return { args: xargs, width: width, height: height, arrays: arrays }; } ";

        var f;
        if (haveForced) {
            resolve += "this.resolveCells(toResolve, callback); } ";
            f = new Function("CalcError", main + resolve + arrayArgs + " return { resolve: resolve, check: check, arrayArgs: arrayArgs };");
        } else {
            f = new Function("CalcError", main + " return { check: check };");
        }
        f = f(CalcError);
        if (!hasArrayArgs) {
            delete f.arrayArgs;
        }
        return f;

        function comp(x) {
            name = x[0];
            var code = "{ ";
            if (Array.isArray(name)) {
                arrayArgs += "while (i < args.length) { ";
                resolve += "while (i < args.length) { ";
                code += "while (i < args.length) { ";
                code += x.map(comp).join("");
                code += "} ";
                resolve += "} ";
                arrayArgs += "} ";
            } else if (name == "+") {
                arrayArgs += "while (i < args.length) { ";
                resolve += "while (i < args.length) { ";
                code += "do { ";
                code += x.slice(1).map(comp).join("");
                code += "} while (i < args.length); ";
                resolve += "} ";
                arrayArgs += "} ";
            } else {
                var type = x[1];
                if (Array.isArray(type) && /^#?collect/.test(type[0])) {
                    var n = type[2];
                    force();
                    code += "try {"
                        + "var $" + name + " = this.cellValues(args.slice(i";
                    if (n) {
                        code += ", i + " + n;
                    }
                    code += ")).filter(function($"+name+"){ ";
                    if (type[0] == "collect") {
                        code += "if ($"+name+" instanceof CalcError) throw $"+name+"; ";
                    }
                    code += "return " + cond(type[1]) + "; }, this); ";
                    if (n) {
                        code += "i += " + n + "; ";
                    } else {
                        code += "i = args.length; ";
                    }
                    code += "xargs.push($"+name+")"
                        + "} catch(ex) { if (ex instanceof CalcError) return ex; throw ex; } ";
                    resolve += "toResolve.push(args.slice(i)); ";
                } else if (type == "rest") {
                    code += "xargs.push(args.slice(i)); i = args.length; ";
                } else {
                    code += "var $" + name + " = args[i++]; if ($"+name+" instanceof CalcError) return $"+name+"; "
                        + typeCheck(type) + "xargs.push($"+name+"); ";
                }
            }
            code += "} ";
            return code;
        }

        function force() {
            if (forced) {
                return "$"+name+"";
            }
            haveForced = true;
            forced = true;
            resolve += "toResolve.push(args[i++]); ";
            return "($"+name+" = this.force($"+name+"))";
        }

        function typeCheck(type) {
            canBeArrayArg = false;
            forced = false;
            var ret = "if (!(" + cond(type) + ")) return new CalcError(err); ";
            if (!forced) {
                resolve += "i++; ";
            }
            if (canBeArrayArg) {
                arrayArgs += "var $" + name + " = this.asMatrix(args[i]); "
                    + "if ($" + name + ") { "
                    + "xargs.push($" + name + "); "
                    + "width = Math.max(width, $" + name + ".width); "
                    + "height = Math.max(height, $" + name + ".height); "
                    + "arrays.push(true) } else { "
                    + "xargs.push(args[i]); "
                    + "arrays.push(false); } i++; ";
            } else {
                arrayArgs += "xargs.push(args[i++]); arrays.push(false); ";
            }
            return ret;
        }

        function cond(type) {
            if (Array.isArray(type)) {
                if (type[0] == "or") {
                    return "(" + type.slice(1).map(cond).join(") || (") + ")";
                }
                if (type[0] == "and") {
                    return "(" + type.slice(1).map(cond).join(") && (") + ")";
                }
                if (type[0] == "values") {
                    return "(" + type.slice(1).map(function(val){
                        return force() + " === " + val;
                    }).join(") || (") + ")";
                }
                if (type[0] == "null") {
                    return "(" + cond("null") + " ? (($"+name+" = " + type[1] + "), true) : false)";
                }
                if (type[0] == "between" || type[0] == "[between]") {
                    return "(" + force() + " >= " + type[1] + " && " + "$"+name+" <= " + type[2] + ")";
                }
                if (type[0] == "(between)") {
                    return "(" + force() + " > " + type[1] + " && " + "$"+name+" < " + type[2] + ")";
                }
                if (type[0] == "assert") {
                    if (type[2]) {
                        return "((" + type[1] + ") ? true : (err = " + JSON.stringify(type[2]) + ", false))";
                    }
                    return "(" + type[1] + ")";
                }
                if (type[0] == "not") {
                    return "!(" + cond(type[1]) + ")";
                }
                throw new Error("Unknown array type condition: " + type[0]);
            }
            if (/^\*/.test(type)) {
                canBeArrayArg = hasArrayArgs = true;
                type = type.substr(1);
            }
            if (type == "number") {
                return "(typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean')";
            }
            if (type == "integer") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') ? ($"+name+" |= 0, true) : false)";
            }
            if (type == "date") {
                return "((typeof " + force() + " == 'number') ? ($"+name+" |= 0, true) : false)";
            }
            if (type == "datetime") {
                return "(typeof " + force() + " == 'number')";
            }
            if (type == "divisor") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && "
                    + "($"+name+" == 0 ? ((err = 'DIV/0'), false) : true))";
            }
            if (type == "number+") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && $"+name+" >= 0)";
            }
            if (type == "integer+") {
                return "(((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && $"+name+" >= 0) ? ($"+name+" |= 0, true) : false)";
            }
            if (type == "number++") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && $"+name+" > 0)";
            }
            if (type == "integer++") {
                return "(((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && $"+name+" > 0) ? ($"+name+" |= 0, true) : false)";
            }
            if (type == "string") {
                return "(typeof " + force() + " == 'string')";
            }
            if (type == "boolean") {
                return "(typeof " + force() + " == 'boolean')";
            }
            if (type == "logical") {
                return "(typeof " + force() + " == 'boolean' || (typeof $"+name+" == 'number' ? ($"+name+" = !!$"+name+", true) : false))";
            }
            if (type == "matrix") {
                force();
                return "((m = this.asMatrix($"+name+")) ? ($"+name+" = m) : false)";
            }
            if (type == "#matrix") {
                return "((m = this.asMatrix($"+name+")) ? ($"+name+" = m) : false)";
            }
            if (type == "ref") {
                return "($"+name+" instanceof kendo.spreadsheet.Ref)";
            }
            if (type == "area") {
                return "($"+name+" instanceof kendo.spreadsheet.CellRef || $"+name+" instanceof kendo.spreadsheet.RangeRef)";
            }
            if (type == "cell") {
                return "($"+name+" instanceof kendo.spreadsheet.CellRef)";
            }
            if (type == "null") {
                return "(" + force() + " == null)";
            }
            if (type == "anyvalue") {
                return "(" + force() + " != null && i <= args.length)";
            }
            if (type == "anything") {
                return "(i <= args.length)";
            }
            if (type == "blank") {
                return "(" + force() + " == null || $"+name+" === '')";
            }
            throw new Error("Can't check for type: " + type);
        }
    }

    function makeSyncFunction(handler, resolve, check, arrayArgs) {
        return function(callback, args) {
            function doit() {
                if (arrayArgs) {
                    var x = arrayArgs.call(this, args);
                    args = x.args;
                    if (x.width > 0 && x.height > 0) {
                        var result = new Matrix(this);
                        for (var row = 0; row < x.height; ++row) {
                            for (var col = 0; col < x.width; ++col) {
                                var xargs = [];
                                for (var i = 0; i < args.length; ++i) {
                                    if (x.arrays[i]) {
                                        xargs[i] = args[i].get(row, col);
                                    } else {
                                        xargs[i] = args[i];
                                    }
                                }
                                xargs = check.call(this, xargs);
                                if (xargs instanceof CalcError) {
                                    result.set(row, col, xargs);
                                } else {
                                    try {
                                        result.set(row, col, handler.apply(this, xargs));
                                    } catch(ex) {
                                        if (ex instanceof CalcError) {
                                            result.set(row, col, ex);
                                        } else {
                                            throw ex;
                                        }
                                    }
                                }
                            }
                        }
                        return callback(result);
                    }
                }
                var xargs = check.call(this, args);
                if (xargs instanceof CalcError) {
                    callback(xargs);
                } else {
                    var val;
                    try {
                        val = handler.apply(this, xargs);
                    } catch(ex) {
                        if (ex instanceof CalcError) {
                            val = ex;
                        } else {
                            throw ex;
                        }
                    }
                    callback(val);
                }
            }
            if (resolve) {
                resolve.call(this, args, doit);
            } else {
                doit.call(this);
            }
        };
    }

    // XXX: the duplication here sucks.  the only difference vs the above function is that this one
    // will insert the callback as first argument when calling the handler, and thus supports async
    // handlers.
    function makeAsyncFunction(handler, resolve, check, arrayArgs) {
        return function(callback, args) {
            function doit() {
                if (arrayArgs) {
                    var x = arrayArgs.call(this, args);
                    args = x.args;
                    if (x.width > 0 && x.height > 0) {
                        var result = new Matrix(this);
                        var count = x.width * x.height;
                        var makeCallback = function(row, col) {
                            return function(value) {
                                result.set(row, col, value);
                                --count;
                                if (count === 0) {
                                    return callback(result);
                                }
                            };
                        };
                        for (var row = 0; row < x.height && count > 0; ++row) {
                            for (var col = 0; col < x.width && count > 0; ++col) {
                                var xargs = [];
                                for (var i = 0; i < args.length; ++i) {
                                    if (x.arrays[i]) {
                                        xargs[i] = args[i].get(row, col);
                                    } else {
                                        xargs[i] = args[i];
                                    }
                                }
                                xargs = check.call(this, xargs);
                                if (xargs instanceof CalcError) {
                                    result.set(row, col, xargs);
                                    --count;
                                    if (count === 0) {
                                        return callback(result);
                                    }
                                } else {
                                    xargs.unshift(makeCallback(row, col));
                                    handler.apply(this, xargs);
                                }
                            }
                        }
                        return;
                    }
                }
                var x = check.call(this, args);
                if (x instanceof CalcError) {
                    callback(x);
                } else {
                    x.unshift(callback);
                    handler.apply(this, x);
                }
            }
            if (resolve) {
                resolve.call(this, args, doit);
            } else {
                doit.call(this);
            }
        };
    }

    function defineFunction(name, func) {
        name = name.toLowerCase();
        FUNCS[name] = func;
        return {
            args: function(args, log) {
                var code = compileArgumentChecks(args);
                // XXX: DEBUG
                if (log) {
                    if (code.arrayArgs) {console.log(code.arrayArgs.toString());}
                    if (code.resolve) {console.log(code.resolve.toString());}
                    if (code.check) {console.log(code.check.toString());}
                }
                FUNCS[name] = makeSyncFunction(func, code.resolve, code.check, code.arrayArgs);
                return this;
            },
            argsAsync: function(args, log) {
                var code = compileArgumentChecks(args);
                // XXX: DEBUG
                if (log) {
                    if (code.arrayArgs) {console.log(code.arrayArgs.toString());}
                    if (code.resolve) {console.log(code.resolve.toString());}
                    if (code.check) {console.log(code.check.toString());}
                }
                FUNCS[name] = makeAsyncFunction(func, code.resolve, code.check, code.arrayArgs);
                return this;
            }
        };
        function fname(name) {
            return name.replace(/[^a-z0-9_]/g, function(s){
                return "$" + s.charCodeAt(0) + "$";
            });
        }
    }

    /* -----[ date calculations ]----- */

    var DAYS_IN_MONTH = [ 31, 28, 31,
                          30, 31, 30,
                          31, 31, 30,
                          31, 30, 31 ];

    var ORDINAL_ADD_DAYS = [
        [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], // non-leap year
        [ 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ]  // leap year
    ];

    function isLeapYear(yr) {
        if (yr % 4) {
            return 0;
        }
        if (yr % 100) {
            return 1;
        }
        if (yr % 400) {
            return 0;
        }
        return 1;
    }

    function daysInYear(yr) {
        return isLeapYear(yr) ? 366 : 365;
    }

    function daysInMonth(yr, mo) {
        return (isLeapYear(yr) && mo == 1) ? 29 : DAYS_IN_MONTH[mo];
    }

    function unpackDate(serial) {
        // This uses the Google Spreadsheet approach: treat 1899-12-31
        // as day 1, allowing to avoid implementing the "Leap Year
        // Bug" yet still be Excel compatible for dates starting
        // 1900-03-01.
        return _unpackDate(serial - 1);
    }

    function packDate(date, month, year) {
        return _packDate(date, month, year) + 1;
    }

    var MS_IN_MIN = 60 * 1000;
    var MS_IN_HOUR = 60 * MS_IN_MIN;
    var MS_IN_DAY = 24 * MS_IN_HOUR;

    function unpackTime(serial) {
        var frac = serial - (serial|0);
        if (frac < 0) {
            frac++;
        }
        var ms = Math.round(MS_IN_DAY * frac);
        var hours = Math.floor(ms / MS_IN_HOUR);
        ms -= hours * MS_IN_HOUR;
        var minutes = Math.floor(ms / MS_IN_MIN);
        ms -= minutes * MS_IN_MIN;
        var seconds = Math.floor(ms / 1000);
        ms -= seconds * 1000;
        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: ms
        };
    }

    function serialToDate(serial) {
        var d = unpackDate(serial), t = unpackTime(serial);
        return new Date(d.year, d.month, d.date,
                        t.hours, t.minutes, t.seconds, t.milliseconds);
    }

    // Unpack date by assuming serial is number of days since
    // 1900-01-01 (that being day 1).  Negative numbers are allowed
    // and go backwards in time.
    function _unpackDate(serial) {
        serial |= 0;            // discard time part
        var month, tmp;
        var backwards = serial <= 0;
        var year = 1900;
        var day = serial % 7;   // 1900-01-01 was a Monday
        if (backwards) {
            serial = -serial;
            year--;
            day = (day + 7) % 7;
        }

        while (serial > (tmp = daysInYear(year))) {
            serial -= tmp;
            year += backwards ? -1 : 1;
        }

        if (backwards) {
            month = 11;
            while (serial >= (tmp = daysInMonth(year, month))) {
                serial -= tmp;
                month--;
            }
            serial = tmp - serial;
        } else {
            month = 0;
            while (serial > (tmp = daysInMonth(year, month))) {
                serial -= tmp;
                month++;
            }
        }

        return {
            year  : year,
            month : month,
            date  : serial,
            day   : day,
            ord   : ORDINAL_ADD_DAYS[isLeapYear(year)][month] + serial
        };
    }

    function _packDate(year, month, date) {
        var serial = 0;
        year += Math.floor(month / 12);
        month %= 12;
        if (month < 0) {
            // no need to decrease year because e.g. Math.floor(-1/12) is -1, so
            // it's already subtracted.
            month += 12;
        }
        if (year >= 1900) {
            for (var i = 1900; i < year; ++i) {
                serial += daysInYear(i);
            }
        } else {
            for (var i = 1899; i >= year; --i) {
                serial -= daysInYear(i);
            }
        }
        for (var i = 0; i < month; ++i) {
            serial += daysInMonth(year, i);
        }
        serial += date;
        return serial;
    }

    function packTime(hours, minutes, seconds, ms) {
        return (hours + minutes/60 + seconds/3600 + ms/3600000) / 24;
    }

    function dateToSerial(date) {
        var time = packTime(date.getHours(),
                            date.getMinutes(),
                            date.getSeconds(),
                            date.getMilliseconds());
        date = packDate(date.getFullYear(),
                        date.getMonth(),
                        date.getDate());
        if (date < 0) {
            return date - 1 + time;
        } else {
            return date + time;
        }
    }

    /* -----[ exports ]----- */

    exports.CalcError = CalcError;
    exports.Formula = Formula;
    exports.Matrix = Matrix;

    exports.packDate = packDate;
    exports.unpackDate = unpackDate;
    exports.packTime = packTime;
    exports.unpackTime = unpackTime;
    exports.serialToDate = serialToDate;
    exports.dateToSerial = dateToSerial;
    exports.daysInMonth = daysInMonth;
    exports.isLeapYear = isLeapYear;
    exports.daysInYear = daysInYear;

    spreadsheet.dateToNumber = dateToSerial;
    spreadsheet.numberToDate = serialToDate;

    exports.defineFunction = defineFunction;
    exports.defineAlias = function(alias, name) {
        FUNCS[alias] = FUNCS[name];
    };
    exports.FUNCS = FUNCS;

    /* -----[ Excel operators ]----- */

    var ARGS_NUMERIC = [
        [ "a", "*number" ],
        [ "b", "*number" ]
    ];

    var ARGS_ANYVALUE = [
        [ "a", "*anyvalue" ],
        [ "b", "*anyvalue" ]
    ];

    defineFunction("binary+", function(a, b){
        return a + b;
    }).args(ARGS_NUMERIC);

    defineFunction("binary-", function(a, b){
        return a - b;
    }).args(ARGS_NUMERIC);

    defineFunction("binary*", function(a, b){
        return a * b;
    }).args(ARGS_NUMERIC);

    defineFunction("binary/", function(a, b){
        return a / b;
    }).args([
        [ "a", "*number" ],
        [ "b", "*divisor" ]
    ]);

    defineFunction("binary^", function(a, b){
        return Math.pow(a, b);
    }).args(ARGS_NUMERIC);

    defineFunction("binary&", function(a, b){
        if (a == null) { a = ""; }
        if (b == null) { b = ""; }
        return "" + a + b;
    }).args([
        [ "a", [ "or", "*number", "*string", "*boolean", "*null" ] ],
        [ "b", [ "or", "*number", "*string", "*boolean", "*null" ] ]
    ]);

    defineFunction("binary=", function(a, b){
        return a === b;
    }).args(ARGS_ANYVALUE);

    defineFunction("binary<>", function(a, b){
        return a !== b;
    }).args(ARGS_ANYVALUE);

    defineFunction("binary<", binaryCompare(function(a, b){
        return a < b;
    })).args(ARGS_ANYVALUE);

    defineFunction("binary<=", binaryCompare(function(a, b){
        return a <= b;
    })).args(ARGS_ANYVALUE);

    defineFunction("binary>", binaryCompare(function(a, b){
        return a > b;
    })).args(ARGS_ANYVALUE);

    defineFunction("binary>=", binaryCompare(function(a, b){
        return a >= b;
    })).args(ARGS_ANYVALUE);

    defineFunction("unary+", function(a){
        return a;
    }).args([
        [ "a", "*number" ]
    ]);

    defineFunction("unary-", function(a){
        return -a;
    }).args([
        [ "a", "*number" ]
    ]);

    defineFunction("unary%", function(a){
        return a / 100;
    }).args([
        [ "a", "*number" ]
    ]);

    // range operator
    defineFunction("binary:", function(a, b){
        return new RangeRef(a, b)
            .setSheet(a.sheet || this.sheet, a.hasSheet());
    }).args([
        [ "a", "cell" ],
        [ "b", "cell" ]
    ]);

    // union operator
    defineFunction("binary,", function(a, b){
        return new UnionRef([ a, b ]);
    }).args([
        [ "a", "ref" ],
        [ "b", "ref" ]
    ]);

    // intersection operator
    defineFunction("binary ", function(a, b){
        return a.intersect(b);
    }).args([
        [ "a", "ref" ],
        [ "b", "ref" ]
    ]);

    /* -----[ conditionals ]----- */

    defineFunction("not", function(a){
        return !this.bool(a);
    }).args([
        [ "a", "*anyvalue" ]
    ]);

    /// utils

    function binaryCompare(func) {
        return function(left, right){
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
                return func(left, right);
            } else {
                return new CalcError("VALUE");
            }
        };
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
