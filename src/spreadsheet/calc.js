// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime" ], f);
})(function(){
    "use strict";

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, -W054 */
    /* jshint latedef: nofunc */

    var spreadsheet = kendo.spreadsheet;
    var exports = spreadsheet.calc;
    var runtime = exports.runtime;

    // Excel formula parser and compiler to JS.
    // some code adapted from http://lisperator.net/pltut/

    var OPERATORS = Object.create(null);

    var ParseError = kendo.Class.extend({
        init: function ParseError(message, pos) {
            this.message = message;
            this.pos = pos;
        },
        toString: function() {
            return this.message;
        }
    });

    (function(ops){
        ops.forEach(function(cls, i){
            cls.forEach(function(op){
                OPERATORS[op] = ops.length - i;
            });
        });
    })([
        [ ":" ],
        [ " " ],
        [ "," ],
        [ "%" ],
        [ "^" ],
        [ "*", "/" ],
        [ "+", "-" ],
        [ "&" ],
        [ "=", "<", ">", "<=", ">=", "<>" ]
    ]);

    var TRUE = { type: "bool", value: true };
    var FALSE = { type: "bool", value: false };

    function getcol(str) {
        str = str.toUpperCase();
        for (var col = 0, i = 0; i < str.length; ++i) {
            col = col * 26 + str.charCodeAt(i) - 64;
        }
        return col - 1;
    }

    function getrow(str) {
        return parseFloat(str) - 1;
    }

    // XXX: rewrite this with the TokenStream.
    function parseReference(name, noThrow) {
        if (name.toLowerCase() == "#sheet") {
            return spreadsheet.SHEETREF;
        }
        if (name.indexOf(",") >= 0) {
            return new spreadsheet.UnionRef(name.split(/\s*,\s*/g).map(parseReference));
        }
        var m;
        if ((m = /^(([A-Z0-9]+)!)?\$?([A-Z]+)\$?([0-9]+)$/i.exec(name))) {
            return new spreadsheet.CellRef(getrow(m[4]), getcol(m[3]), 0)
                .setSheet(m[2], !!m[2]);
        }
        if ((m = /^(([A-Z0-9]+)!)?\$?([A-Z]+)\$?([0-9]+):(([A-Z0-9]+)!)?\$?([A-Z]+)\$?([0-9]+)$/i.exec(name))) {
            return new spreadsheet.RangeRef(
                new spreadsheet.CellRef(getrow(m[4]), getcol(m[3]), 0)
                    .setSheet(m[2], !!m[2]),
                new spreadsheet.CellRef(getrow(m[8]), getcol(m[7]), 0)
                    .setSheet(m[6], !!m[6])
            ).setSheet(m[2], !!m[2]);
        }
        if ((m = /^(([A-Z0-9]+)!)?\$?([A-Z]+):(([A-Z0-9]+)!)?\$?([A-Z]+)$/i.exec(name))) {
            return new spreadsheet.RangeRef(
                new spreadsheet.CellRef(-Infinity, getcol(m[3]), 0)
                    .setSheet(m[2], !!m[2]),
                new spreadsheet.CellRef(+Infinity, getcol(m[6]), 0)
                    .setSheet(m[5], !!m[5])
            ).setSheet(m[2], !!m[2]);
        }
        if ((m = /^(([A-Z0-9]+)!)?\$?([0-9]+):(([A-Z0-9]+)!)?\$?([0-9]+)$/i.exec(name))) {
            return new spreadsheet.RangeRef(
                new spreadsheet.CellRef(getrow(m[3]), -Infinity, 0)
                    .setSheet(m[2], !!m[2]),
                new spreadsheet.CellRef(getrow(m[6]), +Infinity, 0)
                    .setSheet(m[5], !!m[5])
            ).setSheet(m[2], !!m[2]);
        }
        if (!noThrow) {
            throw new Error("Cannot parse reference: " + name);
        }
    }

    function parseFormula(sheet, row, col, input) {
        var refs = [];

        if (typeof input == "string") {
            input = TokenStream(InputStream(input));
        }
        return {
            type: "exp",
            ast: parseExpression(true),
            refs: refs,
            sheet: sheet,
            row: row,
            col: col
        };

        function addReference(ref) {
            ref.index = refs.length;
            refs.push(ref);
            return ref;
        }

        function skip(type, value) {
            if (is(type, value)) {
                return input.next();
            } else {
                var tok = input.peek();
                if (tok) {
                    input.croak("Expected " + type + " «" + value + "» but found " + tok.type + " «" + tok.value + "»");
                } else {
                    input.croak("Expected " + type + " «" + value + "»");
                }
            }
        }

        function is(type, value) {
            var tok = input.peek();
            return tok != null
                && (type == null || tok.type === type)
                && (value == null || tok.value === value)
                ? tok : null;
        }

        function parseExpression(commas) {
            return maybeBinary(maybeIntersect(parseAtom(commas)), 0, commas);
        }

        function maybeRef(name) {
            var m;
            if ((m = /^((.+)!)?(\$)?([A-Z]+)(\$)?([0-9]+)$/i.exec(name))) {
                var thesheet  = m[1] && m[2];
                var relcol = m[3] ? 0 : 1, thecol = getcol(m[4]);
                var relrow = m[5] ? 0 : 2, therow = getrow(m[6]);
                if (relcol) {
                    thecol -= col;
                }
                if (relrow) {
                    therow -= row;
                }
                return new spreadsheet.CellRef(therow, thecol, relcol | relrow)
                    .setSheet(thesheet || sheet, !!thesheet);
            }
            if ((m = /^((.*)!)?(.+)$/i.exec(name))) {
                var thesheet  = m[1] && m[2];
                var name = m[3];
                return new spreadsheet.NameRef(name)
                    .setSheet(thesheet || sheet, !!thesheet);
            }
        }

        function parseSymbol(tok, addRef) {
            if (tok.upper == "TRUE" || tok.upper == "FALSE") {
                return tok.upper == "TRUE" ? TRUE : FALSE;
            }
            var ref = maybeRef(tok.value);
            if (ref) {
                if (addRef) {
                    addReference(ref);
                }
                return ref;
            }
            return tok;
        }

        function parseAtom(commas) {
            var exp = maybeRange() || maybeCall();
            if (!exp) {
                if (is("punc", "(")) {
                    input.next();
                    exp = parseExpression(true);
                    skip("punc", ")");
                }
                else if (is("num") || is("str")) {
                    exp = input.next();
                }
                else if (is("sym")) {
                    exp = parseSymbol(input.next(), true);
                }
                else if (is("op", "+") || is("op", "-")) {
                    exp = {
                        type: "prefix",
                        op: input.next().value,
                        exp: parseExpression(commas)
                    };
                }
                else if (is("punc", "{")) {
                    input.next();
                    exp = parseArray();
                }
                else if (!input.peek()) {
                    input.croak("Incomplete expression");
                }
                else {
                    input.croak("Parse error");
                }
            }
            return maybePercent(exp);
        }

        function parseArray() {
            var row = [], value = [ row ], first = true;
            while (!input.eof() && !is("punc", "}")) {
                if (first) {
                    first = false;
                } else if (is("punc", ";")) {
                    value.push(row = []);
                    input.next();
                } else {
                    skip("op", ",");
                }
                row.push(parseExpression(false));
            }
            skip("punc", "}");
            return {
                type: "matrix",
                value: value
            };
        }

        function maybeIntersect(exp) {
            if (is("punc", "(") || is("sym") || is("num")) {
                return {
                    type: "binary",
                    op: " ",
                    left: exp,
                    right: parseExpression(false)
                };
            } else {
                return exp;
            }
        }

        function maybeCall() {
            return input.ahead(2, function(fname, b){
                if (fname.type == "sym" && b.type == "punc" && b.value == "(") {
                    fname = fname.value;
                    input.skip(2);
                    var args = [];
                    if (!is("punc", ")")) {
                        while (1) {
                            if (is("op", ",")) {
                                args.push({ type: "null" });
                                input.next();
                                continue;
                            }
                            args.push(parseExpression(false));
                            if (input.eof() || is("punc", ")")) {
                                break;
                            }
                            skip("op", ",");
                        }
                    }
                    skip("punc", ")");
                    return {
                        type: "func",
                        func: fname,
                        args: args
                    };
                }
            });
        }

        function maybePercent(exp) {
            if (is("op", "%")) {
                input.next();
                return maybePercent({
                    type: "postfix",
                    op: "%",
                    exp: exp
                });
            } else {
                return exp;
            }
        }

        function maybeBinary(left, my_prec, commas) {
            var tok = is("op");
            if (tok && (commas || tok.value != ",")) {
                var his_prec = OPERATORS[tok.value];
                if (his_prec > my_prec) {
                    input.next();
                    var right = maybeBinary(parseAtom(commas), his_prec, commas);
                    return maybeBinary({
                        type: "binary",
                        op: tok.value,
                        left: left,
                        right: right
                    }, my_prec, commas);
                }
            }
            return left;
        }

        // Attempt to resolve constant ranges at parse time.  This helps handling row or column
        // ranges (i.e. A:A), printing ranges in normalized form, determining a formula's
        // dependencies.  However, the following can also be a valid range, and we can't analyze it
        // statically:
        //
        // ( INDIRECT(A1) : INDIRECT(A2) )
        //
        // therefore support for the range operators must also be present at run-time.
        //
        // This function will only deal with constant ranges like:
        //
        // - A1:B3
        // - A:A
        // - 2:2
        function maybeRange() {
            return input.ahead(4, function(a, b, c, d){
                if (looksLikeRange(a, b, c, d)) {
                    var topLeft = getref(a, true);
                    var bottomRight = getref(c, false);
                    if (topLeft != null && bottomRight != null) {
                        if (bottomRight.hasSheet() && topLeft.sheet.toLowerCase() != bottomRight.sheet.toLowerCase()) {
                            input.croak("Invalid range");
                        } else {
                            input.skip(3);
                            return addReference(
                                new spreadsheet.RangeRef(topLeft, bottomRight)
                                    .setSheet(topLeft.sheet, topLeft.hasSheet())
                            );
                        }
                    }
                }
            });
        }

        function getref(tok, isFirst) {
            if (tok.type == "num" && tok.value == tok.value|0) {
                return new spreadsheet.CellRef(
                    getrow(tok.value) - row,
                    isFirst ? -Infinity : +Infinity,
                    2
                ).setSheet(sheet, false);
            }
            var ref = parseSymbol(tok);
            if (ref.type == "ref") {
                if (ref.ref == "name") {
                    var name = ref.name;
                    var abs = name.charAt(0) == "$";
                    if (abs) {
                        name = name.substr(1);
                    }
                    if (/^[0-9]+$/.test(name)) {
                        // row ref
                        return new spreadsheet.CellRef(
                            getrow(name) - (abs ? 0 : row),
                            isFirst ? -Infinity : +Infinity,
                            (abs ? 0 : 2)
                        ).setSheet(ref.sheet || sheet, ref.hasSheet());
                    } else {
                        // col ref
                        return new spreadsheet.CellRef(
                            isFirst ? -Infinity : +Infinity,
                            getcol(name) - (abs ? 0 : col),
                            (abs ? 0 : 1)
                        ).setSheet(ref.sheet || sheet, ref.hasSheet());
                    }
                }
                return ref;
            }
        }
    }

    function makePrinter(exp) {
        return makeClosure("function(row, col){return(" + print(exp.ast, 0) + ")}");
        function print(node, prec) { // jshint ignore:line, because you are stupid.
            switch (node.type) {
              case "num":
              case "bool":
                return JSON.stringify(node.value);
              case "str":
                return JSON.stringify(JSON.stringify(node.value));
              case "ref":
                return "this.refs[" + node.index + "].print(row, col)";
              case "prefix":
                return withParens(node.op, prec, function(){
                    return JSON.stringify(node.op) + " + " + print(node.exp, OPERATORS[node.op]);
                });
              case "postfix":
                return withParens(node.op, prec, function(){
                    return print(node.exp, OPERATORS[node.op]) + " + " + JSON.stringify(node.op);
                });
              case "binary":
                return withParens(node.op, prec, function(){
                    var left = parenthesize(
                        print(node.left, OPERATORS[node.op]),
                        node.left instanceof spreadsheet.NameRef && node.op == ":"
                    );
                    var right = parenthesize(
                        print(node.right, OPERATORS[node.op]),
                        node.right instanceof spreadsheet.NameRef && node.op == ":"
                    );
                    return left + " + " + JSON.stringify(node.op) + " + " + right;
                });
              case "func":
                return JSON.stringify(node.func + "(") + " + "
                    + (node.args.length > 0
                       ? node.args.map(function(arg){
                           return print(arg, 0);
                       }).join(" + ', ' + ")
                       : "''")
                    + " + ')'";
              case "matrix":
                return "'{ ' + " + node.value.map(function(el){
                    return el.map(function(el){
                        return print(el, 0);
                    }).join(" + ', ' + ");
                }).join(" + '; ' + ") + "+ ' }'";
              case "null":
                return "''";
            }
            throw new Error("Cannot make printer for node " + node.type);
        }
        function parenthesize(code, cond) {
            return cond ? "'(' + " + code + " + ')'" : code;
        }
        function withParens(op, prec, f) {
            var needParens = (OPERATORS[op] < prec || (!prec && op == ","));
            return parenthesize(f(), needParens);
        }
    }

    function toCPS(ast, k) {
        var GENSYM = 0;
        return cps(ast, k);

        function cps(node, k){
            switch (node.type) {
              case "ref"     :
              case "num"     :
              case "str"     :
              case "null"    :
              case "bool"    : return cpsAtom(node, k);
              case "prefix"  :
              case "postfix" : return cpsUnary(node, k);
              case "binary"  : return cpsBinary(node, k);
              case "func"    : return cpsFunc(node, k);
              case "lambda"  : return cpsLambda(node, k);
              case "matrix"  : return cpsMatrix(node.value, k, true);
            }
            throw new Error("Cannot CPS " + node.type);
        }

        function cpsAtom(node, k) {
            return k(node);
        }

        function cpsUnary(node, k) {
            return cps({
                type: "func",
                func: "unary" + node.op,
                args: [ node.exp ]
            }, k);
        }

        function cpsBinary(node, k) {
            return cps({
                type: "func",
                func: "binary" + node.op,
                args: [ node.left, node.right ]
            }, k);
        }

        function cpsIf(co, th, el, k) {
            return cps(co, function(co){
                // compile THEN and ELSE into a lambda which takes a callback to invoke with the
                // result of the branches, and the IF itself will become a call the internal "if"
                // function.
                var rest = makeContinuation(k);
                var thenK = gensym("T");
                var elseK = gensym("E");
                return {
                    type: "func",
                    func: "if",
                    args: [
                        rest,
                        co, // condition
                        { // then
                            type: "lambda",
                            vars: [ thenK ],
                            body: cps(th || TRUE, function(th){
                                return {
                                    type: "call",
                                    func: { type: "var", name: thenK },
                                    args: [ th ]
                                };
                            })
                        },
                        { // else
                            type: "lambda",
                            vars: [ elseK ],
                            body: cps(el || FALSE, function(el){
                                return {
                                    type: "call",
                                    func: { type: "var", name: elseK },
                                    args: [ el ]
                                };
                            })
                        }
                    ]
                };
            });
        }

        function cpsAnd(args, k) {
            if (args.length === 0) {
                return cpsAtom(TRUE, k);
            }
            return cps({
                type: "func",
                func: "IF",
                args: [
                    // first item
                    args[0],
                    // if true, apply AND for the rest
                    {
                        type: "func",
                        func: "AND",
                        args: args.slice(1)
                    },
                    // otherwise return false
                    FALSE
                ]
            }, k);
        }

        function cpsOr(args, k) {
            if (args.length === 0) {
                return cpsAtom(FALSE, k);
            }
            return cps({
                type: "func",
                func: "IF",
                args: [
                    // first item
                    args[0],
                    // if true, return true
                    TRUE,
                    // otherwise apply OR for the rest
                    {
                        type: "func",
                        func: "OR",
                        args: args.slice(1)
                    }
                ]
            }, k);
        }

        function cpsFunc(node, k) {
            switch (node.func.toLowerCase()) {
              case "if":
                return cpsIf(node.args[0], node.args[1], node.args[2], k);
              case "and":
                return cpsAnd(node.args, k);
              case "or":
                return cpsOr(node.args, k);
              case "true":
                return k(TRUE);
              case "false":
                return k(FALSE);
            }
            // actual function
            return (function loop(args, i){
                if (i == node.args.length) {
                    return {
                        type : "func",
                        func : node.func,
                        args : args
                    };
                }
                else {
                    return cps(node.args[i], function(value){
                        return loop(args.concat([ value ]), i + 1);
                    });
                }
            })([ makeContinuation(k) ], 0);
        }

        function cpsLambda(node, k) {
            var cont = gensym("K");
            var body = cps(node.body, function(body){
                return { type: "call",
                         func: { type: "var", value: cont },
                         args: [ body ] };
            });
            return k({ type: "lambda",
                       vars: [ cont ].concat(node.vars),
                       body: body });
        }

        function cpsMatrix(elements, k, isMatrix) {
            var a = [];
            return (function loop(i){
                if (i == elements.length) {
                    return k({
                        type: "matrix",
                        value: a
                    });
                } else {
                    return (isMatrix ? cpsMatrix : cps)(elements[i], function(val){
                        a[i] = val;
                        return loop(i + 1);
                    });
                }
            })(0);
        }

        function makeContinuation(k) {
            var cont = gensym("R");
            return {
                type : "lambda",
                vars : [ cont ],
                body : k({ type: "var", name: cont })
            };
        }

        function gensym(name) {
            if (!name) {
                name = "";
            }
            name = "_" + name;
            return name + (++GENSYM);
        }
    }

    var makeClosure = (function(cache){
        return function(code) {
            var f = cache[code];
            if (!f) {
                f = cache[code] = new Function("'use strict';return(" + code + ")")();
            }
            return f;
        };
    })(Object.create(null));

    var FORMULA_CACHE = Object.create(null);

    function makeFormula(exp) {
        var printer = makePrinter(exp);
        var hash = printer.call(exp); // needs .refs
        var formula = FORMULA_CACHE[hash];
        if (formula) {
            // we need to clone because formulas cache the result; even if the formula is the same,
            // its value will depend on its location, hence we need different objects.  Still, using
            // this cache is a good idea because we'll reuse the same refs array, handler and
            // printer instead of allocating new ones (and we skip compiling it).
            return formula.clone(exp.sheet, exp.row, exp.col);
        }
        var code = js(toCPS(exp.ast, function(ret){
            return {
                type: "return",
                value: ret
            };
        }));

        code = [
            "function(){",
            "var context = this, refs = context.formula.absrefs",
            code,
            "}"
        ].join(";\n");

        formula = new runtime.Formula(exp.refs, makeClosure(code), printer, exp.sheet, exp.row, exp.col);
        FORMULA_CACHE[hash] = formula;
        return formula;

        function js(node){
            var type = node.type;
            if (type == "num") {
                return node.value + "";
            }
            else if (type == "str") {
                return JSON.stringify(node.value);
            }
            else if (type == "return") {
                return "context.resolve(" + js(node.value) + ")";
            }
            else if (type == "func") {
                return "context.func(" + JSON.stringify(node.func) + ", "
                    + js(node.args[0]) + ", " // the callback
                    + jsArray(node.args.slice(1)) // the arguments
                    + ")";
            }
            else if (type == "call") {
                return js(node.func) + "(" + node.args.map(js).join(", ") + ")";
            }
            else if (type == "ref") {
                return "refs[" + node.index + "]";
            }
            else if (type == "bool") {
                return "" + node.value;
            }
            else if (type == "if") {
                return "(context.bool(" + js(node.co) + ") ? " + js(node.th) + " : " + js(node.el) + ")";
            }
            else if (type == "lambda") {
                return "(function("
                    + node.vars.join(", ")
                    + "){ return(" + js(node.body) + ") })";
            }
            else if (type == "var") {
                return node.name;
            }
            else if (type == "matrix") {
                return jsArray(node.value);
            }
            else if (type == "null") {
                return "null";
            }
            else {
                throw new Error("Cannot compile expression " + type);
            }
        }

        function jsArray(a) {
            return "[ " + a.map(js).join(", ") + " ]";
        }
    }

    function TokenStream(input, forEditor) {
        var tokens = [], index = 0;
        var readWhile = input.readWhile;
        var addPos = forEditor ? function(thing) {
            var begin = input.pos();
            thing = thing();
            thing.begin = begin;
            thing.end = input.pos();
            return thing;
        } : function(thing) {
            return thing();
        };

        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : input.croak,
            ahead : ahead,
            skip  : skip
        };

        function isDigit(ch) {
            return (/[0-9]/i.test(ch));
        }
        function isIdStart(ch) {
            return (/[a-z$_]/i.test(ch) || ch.toLowerCase() != ch.toUpperCase());
        }
        function isId(ch) {
            return isIdStart(ch) || isDigit(ch) || ch == "!" || ch == ".";
        }
        function isOpChar(ch) {
            return ch in OPERATORS;
        }
        function isPunc(ch) {
            return ";(){}[]".indexOf(ch) >= 0;
        }
        function isWhitespace(ch) {
            return " \t\n\xa0".indexOf(ch) >= 0;
        }
        function readNumber() {
            // XXX: TODO: exponential notation
            var has_dot = false;
            var number = readWhile(function(ch){
                if (ch == ".") {
                    if (has_dot) {
                        return false;
                    }
                    has_dot = true;
                    return true;
                }
                return isDigit(ch);
            });
            return { type: "num", value: parseFloat(number) };
        }
        function readSymbol() {
            var id = readWhile(isId);
            return {
                type  : "sym",
                value : id,
                upper : id.toUpperCase(),
                space : isWhitespace(input.peek())
            };
        }
        function readString() {
            input.next();
            return { type: "str", value: input.readEscaped('"') };
        }
        function readOperator() {
            return {
                type  : "op",
                value : readWhile(function(ch, op){
                    return (op + ch) in OPERATORS;
                })
            };
        }
        function readPunc() {
            return {
                type  : "punc",
                value : input.next()
            };
        }
        function readNext() {
            readWhile(isWhitespace);
            if (input.eof()) {
                return null;
            }
            var ch = input.peek(), m;
            if (ch == '"') {
                return addPos(readString);
            }
            if (isDigit(ch)) {
                return addPos(readNumber);
            }
            if (isIdStart(ch)) {
                return addPos(readSymbol);
            }
            if (isOpChar(ch)) {
                return addPos(readOperator);
            }
            if (isPunc(ch)) {
                return addPos(readPunc);
            }
            if ((m = input.lookingAt(/^#([a-z\/]+)[?!]/i))) {
                return addPos(function(){
                    input.skip(m);
                    return { type: "error", value: m[1] };
                });
            }
            if (!forEditor) {
                input.croak("Can't handle character: " + ch);
            }
            return addPos(function(){
                return { type: "error", value: input.next() };
            });
        }
        function peek() {
            while (tokens.length <= index) {
                tokens.push(readNext());
            }
            return tokens[index];
        }
        function next() {
            var tok = peek();
            if (tok) {
                index++;
            }
            return tok;
        }
        function ahead(n, f) {
            var pos = index, a = [], eof = { type: "eof" };
            while (n-- > 0) {
                a.push(next() || eof);
            }
            index = pos;
            return f.apply(a, a);
        }
        function skip(n) {
            index += n;
        }
        function eof() {
            return peek() == null;
        }
    }

    function InputStream(input) {
        var pos = 0, line = 1, col = 0;
        return {
            next        : next,
            peek        : peek,
            eof         : eof,
            croak       : croak,
            readWhile   : readWhile,
            readEscaped : readEscaped,
            lookingAt   : lookingAt,
            skip        : skip,
            forward     : forward,
            pos         : location
        };
        function location() { // jshint ignore:line, :-(
            return pos;
        }
        function next() {
            var ch = input.charAt(pos++);
            if (ch == "\n") {
                line++;
                col = 0;
            } else {
                col++;
            }
            return ch;
        }
        function peek() {
            return input.charAt(pos);
        }
        function eof() {
            return peek() === "";
        }
        function croak(msg) {
            throw new ParseError(msg, pos);
        }
        function skip(ch) {
            if (typeof ch == "string") {
                if (input.substr(pos, ch.length) != ch) {
                    croak("Expected " + ch);
                }
                forward(ch.length);
            } else if (ch instanceof RegExp) {
                var m = ch.exec(input.substr(pos));
                if (m) {
                    forward(m[0].length);
                    return m;
                }
            } else {
                // assuming RegExp match data
                forward(ch[0].length);
            }
        }
        function forward(n) {
            while (n-- > 0) {
                next();
            }
        }
        function readEscaped(end) {
            var escaped = false, str = "";
            while (!eof()) {
                var ch = next();
                if (escaped) {
                    str += ch;
                    escaped = false;
                } else if (ch == "\\") {
                    escaped = true;
                } else if (ch == end) {
                    break;
                } else {
                    str += ch;
                }
            }
            return str;
        }
        function readWhile(predicate) {
            var str = "";
            while (!eof() && predicate(peek(), str)) {
                str += next();
            }
            return str;
        }
        function lookingAt(rx) {
            return rx.exec(input.substr(pos));
        }
    }

    //// exports

    exports.parse = function(sheet, row, col, input) {
        if (input instanceof Date) {
            return { type: "date", value: runtime.dateToSerial(input) };
        }
        if (typeof input == "number") {
            return { type: "number", value: input };
        }
        if (typeof input == "boolean") {
            return { type: "boolean", value: input };
        }
        input += "";
        if (/^'/.test(input)) {
            return {
                type: "string",
                value: input.substr(1)
            };
        }
        if (/^[0-9.]+%$/.test(input)) {
            var str = input.substr(0, input.length - 1);
            var num = parseFloat(str);
            if (!isNaN(num) && num == str) {
                return {
                    type: "percent",
                    value: num / 100
                };
            }
        }
        if (/^=/.test(input)) {
            input = input.substr(1);
            if (/\S/.test(input)) {
                return parseFormula(sheet, row, col, input);
            } else {
                return {
                    type: "string",
                    value: "=" + input
                };
            }
        }
        if (input.toLowerCase() == "true") {
            return { type: "boolean", value: true };
        }
        if (input.toLowerCase() == "false") {
            return { type: "boolean", value: false };
        }
        var date = runtime.parseDate(input);
        if (date) {
            return { type: "date", value: runtime.dateToSerial(date) };
        }
        var num = parseFloat(input);
        if (!isNaN(num) && input.length > 0 && num == input) {
            return {
                type: "number",
                value: num
            };
        }
        return {
            type: "string",
            value: input
        };
    };

    function looksLikeRange(a, b, c, d) {
        // We need c.space here to resolve an ambiguity:
        //
        //   - A1:C3 (A2, A3) -- parse as intersection between range and union
        //
        //   - A1:CHOOSE(2, A1, A2, A3) -- parse as range operator where the
        //     bottom-right side is returned by the CHOOSE function
        //
        // note no space between CHOOSE and the paren in the second example.
        // I believe this is the Right Way™.
        return ((a.type == "sym" || a.type == "num") &&
                (b.type == "op" && b.value == ":") &&
                (c.type == "sym" || c.type == "num") &&
                !(d.type == "punc" && d.value == "(" && !c.space));
    }

    function tokenize(input) {
        var tokens = [];
        input = TokenStream(InputStream(input), true);
        while (!input.eof()) {
            tokens.push(input.ahead(4, maybeRange) ||
                        input.ahead(2, maybeCall) ||
                        next());
        }
        var tok = tokens[0];
        if (tok.type == "op" && tok.value == "=") {
            tok.type = "startexp";
        }
        return tokens;

        function maybeRange(a, b, c, d) {
            if (looksLikeRange(a, b, c, d)) {
                var ref = parseReference(a.value + ":" + c.value, true);
                if (ref) {
                    input.skip(3);
                    return {
                        type: "ref",
                        ref: ref,
                        begin: a.begin,
                        end: c.end
                    };
                }
            }
        }
        function next() {
            var tok = input.next();
            if (tok.type == "sym") {
                var ref = parseReference(tok.value, true);
                if (ref) {
                    tok.type = "ref";
                    tok.ref = ref;
                } else if (tok.upper == "TRUE") {
                    tok.type = "bool";
                    tok.value = true;
                } else if (tok.upper == "FALSE") {
                    tok.type = "bool";
                    tok.value = false;
                }
            }
            return tok;
        }
        function maybeCall(fname, b) {
            if (fname.type == "sym" && b.type == "punc" && b.value == "(") {
                input.skip(1);
                fname.type = "func";
                return fname;
            }
        }
    }


    exports.parseFormula = parseFormula;
    exports.parseReference = parseReference;
    exports.compile = makeFormula;

    exports.InputStream = InputStream;
    exports.ParseError = ParseError;
    exports.tokenize = tokenize;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
