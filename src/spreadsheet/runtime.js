// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./references.js" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, validthis:true, -W054 */
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
                this.handler.call(ctx);
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
                if (Array.isArray(type) && type[0] == "collect") {
                    force();
                    code += "var $" + name + " = this.cellValues(args.slice(i)).filter(function($"+name+"){ "
                        + "return " + cond(type[1]) + "; }, this); "
                        + "i = args.length; "
                        + "xargs.push($"+name+")";
                    resolve += "toResolve.push(args.slice(i)); ";
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
                    return "(" + cond("null") + " ? ($"+name+" = " + type[1] + ", true) : false)";
                }
                if (type[0] == "between") {
                    return "(" + force() + " >= " + type[1] + " && " + "$"+name+" <= " + type[2] + ")";
                }
                if (type[0] == "assert") {
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
            if (type == "divisor") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && "
                    + "($"+name+" == 0 ? ((err = 'DIV/0'), false) : true))";
            }
            if (type == "number+") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && $"+name+" >= 0)";
            }
            if (type == "number++") {
                return "((typeof " + force() + " == 'number' || typeof $"+name+" == 'boolean') && $"+name+" > 0)";
            }
            if (type == "string") {
                return "(typeof " + force() + " == 'string')";
            }
            if (type == "boolean") {
                return "(typeof " + force() + " == 'boolean')";
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
                                    result.set(row, col, handler.apply(this, xargs));
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
                    callback(handler.apply(this, xargs));
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

    function isLeapYear(yr) {
        // if (yr == 1900) {
        //     return true;        // Excel's Leap Year Bug™
        // }
        if (yr % 4) {
            return false;
        }
        if (yr % 100) {
            return true;
        }
        if (yr % 400) {
            return false;
        }
        return true;
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

        while (serial >= (tmp = daysInYear(year))) {
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
            year: year, month: month, date: serial, day: day
        };
    }

    function _packDate(year, month, date) {
        var serial = 0;
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

    exports.defineFunction = defineFunction;

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
            .setSheet(a.sheet || this.formula.sheet, a.hasSheet());
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
