// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, -W054 */
    /* global console */

    var spreadsheet = kendo.spreadsheet;
    var exports = spreadsheet.calc;
    var runtime = exports.runtime;

    // Excel formula parser and compiler to JS.
    // some code adapted from http://lisperator.net/pltut/

    var OPERATORS = {};

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

    // "Sheet1!C2" -> { sheet: "Sheet1", row: 1, col: 2, rel: 3 } (spreadsheet.CellRef)
    function parseReference(name) {
        var m;
        if ((m = /^((.+)!)?(\$)?([A-Z]+)(\$)?([0-9]+)$/i.exec(name))) {
            var sheet  = m[1] && m[2];
            var relcol = m[3] ? 0 : 1, col = getcol(m[4]);
            var relrow = m[5] ? 0 : 2, row = getrow(m[6]);
            return new spreadsheet.CellRef(row, col, relcol | relrow).setSheet(sheet, !!sheet);
        }
        if ((m = /^((.*)!)?(.+)$/i.exec(name))) {
            var sheet  = m[1] && m[2];
            var name = m[3];
            return new spreadsheet.NameRef(name).setSheet(sheet, !!sheet);
        }
    }

    function parse(sheet, row, col, input) {
        var refs = [];

        if (typeof input == "string") {
            input = TokenStream(InputStream(input));
        }
        return {
            type: "exp",
            ast: parseExpression(true),
            refs: refs
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
            return maybeIntersect(
                maybeCall(
                    maybeBinary(parseAtom(commas), 0, commas)
                ),
                commas
            );
        }

        function parseSymbol(tok, addRef) {
            if (tok.upper == "TRUE" || tok.upper == "FALSE") {
                return tok.upper == "TRUE" ? TRUE : FALSE;
            }
            var ref = parseReference(tok.value);
            if (ref) {
                if (addRef) {
                    addReference(ref);
                }
                if (ref.sheet == null) {
                    ref.sheet = sheet;
                }
                if (ref.ref == "cell") {
                    if (ref.rel & 1) {
                        ref.col -= col;
                    }
                    if (ref.rel & 2) {
                        ref.row -= row;
                    }
                }
                return ref;
            }
            return tok;
        }

        function parseAtom(commas) {
            var exp = maybeRange();
            if (exp) {
                return exp;
            }
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
            else {
                input.croak("Parse error");
            }
            return maybeCall(exp);
        }

        function maybeIntersect(exp, commas) {
            if (is("punc", "(") || is("sym") || is("num")) {
                return {
                    type: "binary",
                    op: " ",
                    left: exp,
                    right: parseExpression(commas)
                };
            } else {
                return exp;
            }
        }

        function maybeCall(exp) {
            if (is("punc", "(")) {
                var fname;
                if (exp.type == "bool") {
                    fname = exp.value+"";
                } else if (exp.type == "ref" && exp.ref == "name") {
                    fname = exp.name;
                } else {
                    input.croak("Expecting function name");
                }
                refs.pop();     // not real reference
                var args = [];
                input.next();
                if (!is("punc", ")")) {
                    while (1) {
                        args.push(parseExpression(false));
                        if (input.eof() || is("punc", ")")) {
                            break;
                        }
                        skip("op", ",");
                    }
                }
                skip("punc", ")");
                exp = {
                    type: "call",
                    func: fname,
                    args: args
                };
            }
            return maybePercent(exp);
        }

        function maybePercent(exp) {
            if (is("op", "%")) {
                input.next();
                return {
                    type: "postfix",
                    op: "%",
                    exp: exp
                };
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
            return input.ahead(3, function(a, b, c){
                if ((a.type == "sym" || a.type == "num") &&
                    (b.type == "op" && b.value == ":") &&
                    (c.type == "sym" || c.type == "num"))
                {
                    var topLeft = getref(a, true);
                    var bottomRight = getref(c, false);
                    if (topLeft != null && bottomRight != null) {
                        if (bottomRight.hasSheet() && topLeft.sheet != bottomRight.sheet) {
                            input.croak("Invalid range");
                        } else {
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
        function print(node, prec) {
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
                // XXX: (FOO):(BAR) where FOO and BAR are NameRef-s — should parenthesize
                return withParens(node.op, prec, function(){
                    return print(node.left, OPERATORS[node.op])
                        + " + " + JSON.stringify(node.op) + " + "
                        + print(node.right, OPERATORS[node.op]);
                });
              case "call":
                return JSON.stringify(node.func + "(") + " + "
                    + (node.args.length > 0
                       ? node.args.map(function(arg){
                           return print(arg, 0);
                       }).join(" + ', ' + ")
                       : "''")
                    + " + ')'";
            }
        }
        function withParens(op, prec, f) {
            var needParens = (OPERATORS[op] < prec || (!prec && op == ","));
            var code = f();
            if (needParens) {
                return "'(' + " + code + " + ')'";
            } else {
                return code;
            }
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
              case "bool"    : return cpsAtom(node, k);
              case "prefix"  :
              case "postfix" : return cpsUnary(node, k);
              case "binary"  : return cpsBinary(node, k);
              case "call"    : return cpsCall(node, k);
            }
            throw new Error("Cannot CPS " + node.type);
        }

        function cpsAtom(node, k) {
            return k(node);
        }

        function cpsUnary(node, k) {
            return cps({
                type: "call",
                func: "unary" + node.op,
                args: [ node.exp ]
            }, k);
        }

        function cpsBinary(node, k) {
            return cps({
                type: "call",
                func: "binary" + node.op,
                args: [ node.left, node.right ]
            }, k);
        }

        function cpsIf(co, th, el, k) {
            return cps(co, function(co){
                return {
                    type: "if",
                    co: co,
                    th: cps(th, k),
                    el: cps(el || FALSE, k)
                };
            });
        }

        function cpsAnd(args, k) {
            if (args.length === 0) {
                return cpsAtom(TRUE, k);
            }
            return cps({
                type: "call",
                func: "IF",
                args: [
                    // first item
                    args[0],
                    // if true, apply AND for the rest
                    {
                        type: "call",
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
                type: "call",
                func: "IF",
                args: [
                    // first item
                    args[0],
                    // if true, return true
                    TRUE,
                    // otherwise apply OR for the rest
                    {
                        type: "call",
                        func: "OR",
                        args: args.slice(1)
                    }
                ]
            }, k);
        }

        function cpsNot(exp, k) {
            return cps(exp, function(exp){
                return k({
                    type: "not",
                    exp: exp
                });
            });
        }

        function cpsCall(node, k) {
            switch (node.func.toLowerCase()) {
              case "if":
                return cpsIf(node.args[0], node.args[1], node.args[2], k);
              case "not":
                return cpsNot(node.args[0], k);
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
                        type : "call",
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
            if (Object.prototype.hasOwnProperty.call(cache, code)) {
                return cache[code];
            }
            return (cache[code] = new Function("'use strict';return(" + code + ")")());
        };
    })({});

    var FORMULA_CACHE = {};

    function makeFormula(exp) {
        var printer = makePrinter(exp);
        var hash = printer.call(exp); // needs .refs
        if (Object.prototype.hasOwnProperty.call(FORMULA_CACHE, hash)) {
            // we need to clone because formulas cache the result; even if the formula is the same,
            // its value will depend on its location, hence we need different objects.  Still, using
            // this cache is a good idea because we'll reuse the same refs array, handler and
            // printer instead of allocating new ones (and we skip compiling it).
            return FORMULA_CACHE[hash].clone();
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

        var formula = new runtime.Formula(exp.refs, makeClosure(code), printer);
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
            else if (type == "call") {
                return "context.func(" + JSON.stringify(node.func)
                    + node.args.map(function(arg){
                        return ", " + js(arg);
                    }).join("")
                    + ")";
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
            else if (type == "not") {
                return "!context.bool(" + js(node.exp) + ")";
            }
            else if (type == "lambda") {
                return "function("
                    + node.vars.join(", ")
                    + "){ return(" + js(node.body) + ") }";
            }
            else if (type == "var") {
                return node.name;
            }
            else {
                throw new Error("Cannot compile expression " + type);
            }
        }
    }

    function TokenStream(input) {
        var tokens = [], index = 0;
        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : input.croak,
            ahead : ahead
        };
        function isDigit(ch) {
            return /[0-9]/i.test(ch);
        }
        function isIdStart(ch) {
            return /[a-z$_]/i.test(ch);
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
            return " \t\n".indexOf(ch) >= 0;
        }
        function readWhile(predicate) {
            var str = "";
            while (!input.eof() && predicate(input.peek(), str)) {
                str += input.next();
            }
            return str;
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
                upper : id.toUpperCase()
            };
        }
        function readEscaped(end) {
            var escaped = false, str = "";
            input.next();
            while (!input.eof()) {
                var ch = input.next();
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
        function readString() {
            return { type: "str", value: readEscaped('"') };
        }
        function readOperator() {
            return {
                type  : "op",
                value : readWhile(function(ch, op){
                    return (op + ch) in OPERATORS;
                })
            };
        }
        function readNext() {
            readWhile(isWhitespace);
            if (input.eof()) {
                return null;
            }
            var ch = input.peek();
            if (ch == '"') {
                return readString();
            }
            if (isDigit(ch)) {
                return readNumber();
            }
            if (isIdStart(ch)) {
                return readSymbol();
            }
            if (isOpChar(ch)) {
                return readOperator();
            }
            if (isPunc(ch)) {
                return {
                    type  : "punc",
                    value : input.next()
                };
            }
            input.croak("Can't handle character: " + ch);
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
            if (!f || !(a = f.apply(a, a))) {
                index = pos;
            }
            return a;
        }
        function eof() {
            return peek() == null;
        }
    }

    function InputStream(input) {
        var pos = 0, line = 1, col = 0;
        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : croak
        };
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
            throw new Error(msg + " (pos " + col + ")");
        }
    }

    //// exports

    exports.parse = function(sheet, row, col, input) {
        input += "";
        if (/^'/.test(input)) {
            return {
                type: "str",
                value: input.substr(1)
            };
        }
        if (/^=/.test(input)) {
            input = input.substr(1);
            if (/\S/.test(input)) {
                return parse(sheet, row, col, input);
            } else {
                return {
                    type: "str",
                    value: "=" + input
                };
            }
        }
        var num = parseFloat(input);
        if (!isNaN(num) && input.length > 0 && num == input) {
            return {
                type: "num",
                value: num
            };
        }
        return {
            type: "str",
            value: input
        };
    };

    exports.parseFormula = parse;
    exports.parseReference = parseReference;
    exports.compile = makeFormula;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
