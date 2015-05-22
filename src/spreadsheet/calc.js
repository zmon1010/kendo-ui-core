// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, -W054 */
    /* global console */

    var exports = kendo.spreadsheet.calc;
    var Runtime = exports.Runtime;

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

    var REL_COL = 1;
    var REL_ROW = 2;

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

    // "Sheet1!C2" -> { sheet: "Sheet1", row: 2, col: 3 }
    function parseReference(name) {
        var m;
        if ((m = /^((.+)!)?(\$)?([A-Z]+)(\$)?([0-9]+)$/i.exec(name))) {
            var sheet  = m[1] && m[2];
            var relcol = m[3] ? 0 : REL_COL, col = getcol(m[4]);
            var relrow = m[5] ? 0 : REL_ROW, row = getrow(m[6]);
            return new Runtime.CellRef(row, col, relcol | relrow).setSheet(sheet, !!sheet);
        }
        if ((m = /^((.*)!)?(.+)$/i.exec(name))) {
            var sheet  = m[1] && m[2];
            var name = m[3];
            return new Runtime.NameRef(name).setSheet(sheet, !!sheet);
        }
    }

    // "Sheet1", 2, 3 -> "Sheet1!C2"
    function makeReference(sheet, row, col, rel) {
        var aa = "";

        ++row;
        ++col;

        if (!isFinite(row)) {
            row = "";
        }
        else if (rel != null && !(rel & REL_ROW)) {
            row = "$" + row;
        }

        if (!isFinite(col)) {
            col = "";
        }
        else {
            while (col > 0) {
                aa = String.fromCharCode(64 + col % 26) + aa;
                col = Math.floor(col / 26);
            }
            if (rel != null && !(rel & REL_COL)) {
                aa = "$" + aa;
            }
        }

        if (sheet) {
            return sheet + "!" + aa + row;
        } else {
            return aa + row;
        }
    }

    function parse(sheet, row, col, input) {
        if (typeof input == "string") {
            input = TokenStream(InputStream(input));
        }
        return {
            type: "exp",
            ast: parseExpression(true)
        };

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

        function parseSymbol(tok) {
            if (tok.upper == "TRUE" || tok.upper == "FALSE") {
                return tok.upper == "TRUE" ? TRUE : FALSE;
            }
            var ref = parseReference(tok.value);
            if (ref) {
                if (ref.sheet == null) {
                    ref.sheet = sheet;
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
                exp = parseSymbol(input.next());
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
                if (exp.type != "ref" || exp.ref != "name") {
                    input.croak("Expecting function name");
                }
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
                    func: exp.name,
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
                            return new Runtime.RangeRef(topLeft, bottomRight).setSheet(topLeft.sheet, topLeft.hasSheet());
                        }
                    }
                }
            });
        }

        function getref(tok, isFirst) {
            if (tok.type == "num" && tok.value == tok.value|0) {
                return new Runtime.CellRef(tok.value - 1, isFirst ? -Infinity : +Infinity, 2).setSheet(sheet, false);
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
                        return new Runtime.CellRef(
                            getrow(name),
                            isFirst ? -Infinity : +Infinity,
                            (abs ? 0 : REL_ROW)
                        ).setSheet(ref.sheet || sheet, ref.hasSheet());
                    } else {
                        // col ref
                        return new Runtime.CellRef(
                            isFirst ? -Infinity : +Infinity,
                            getcol(name),
                            (abs ? 0 : REL_COL)
                        ).setSheet(ref.sheet || sheet, ref.hasSheet());
                    }
                }
                return ref;
            }
        }
    }

    function print(sheet, row, col, exp, orig) {
        var references = orig.formula.refs, refindex = 0;
        return print(exp.ast);

        function print(node, prec){
            var type = node.type, ret = "", op = node.op, parens = false;
            if (type == "num") {
                ret = node.value + "";
            }
            else if (type == "str") {
                ret = '"' + node.value.replace(/\x22/g, "\\\"") + '"';
            }
            else if (type == "prefix") {
                openParen();
                ret += op + print(node.exp, OPERATORS[op]);
                closeParen();
            }
            else if (type == "postfix") {
                openParen();
                ret += print(node.exp, OPERATORS[op]) + op;
                closeParen();
            }
            else if (type == "binary") {
                openParen();
                var left_name = (node.op == ":" && node.left.type == "ref" && node.left.ref == "name");
                var right_name = (node.op == ":" && node.right.type == "ref" && node.right.ref == "name");
                if (left_name) {
                    ret += "(";
                }
                ret += print(node.left, OPERATORS[op]);
                if (left_name) {
                    ret += ")";
                }
                ret += op;
                if (right_name) {
                    ret += "(";
                }
                ret += print(node.right, OPERATORS[op]);
                if (right_name) {
                    ret += ")";
                }
                closeParen();
            }
            else if (type == "call") {
                ret = node.func + "(" + node.args.map(function(arg){
                    return print(arg, 0);
                }).join(", ") + ")";
            }
            else if (type == "ref") {
                node = references[refindex++]; // pick up adjusted references
                ret = node.print(row, col, orig);
            }
            else if (type == "bool") {
                ret = (node.value+"").toUpperCase();
            }
            else {
                throw new Error("Unsupported node in print: " + type);
            }

            return ret;

            function openParen() {
                if (OPERATORS[op] < prec || (!prec && op == ",")) {
                    ret += "(";
                    parens = true;
                }
            }
            function closeParen() {
                if (parens) {
                    ret += ")";
                }
            }
        }
    }

    var GENSYM = 0;

    function gensym(name) {
        if (!name) {
            name = "";
        }
        name = "_" + name;
        return name + (++GENSYM);
    }

    function toCPS(node, k) {
        GENSYM = 0;
        return cps(node.ast, k);

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
    }

    var makeClosure = (function(cache){
        return function(code) {
            if (Object.prototype.hasOwnProperty.call(cache, code)) {
                return cache[code];
            }
            return (cache[code] = new Function("Runtime", code)(Runtime));
        };
    })({});

    function makeFormula(cps) {
        var references = [];
        var code = js(cps);

        code = [
            "return function(context) { 'use strict'",
            //"/* " + print(the_sheet, the_col, the_row, exp) + " */",
            "  var formula = context.formula",
            code,
            "}"
        ].join(";\n");

        return new Runtime.Formula(references, makeClosure(code));

        function getReference(ref) {
            var index = references.length;
            references[index] = ref;
            return "formula.refs[" + index + "]";
        }

        function js(node){
            var type = node.type;
            if (type == "num") {
                return node.value + "";
            }
            else if (type == "str") {
                return JSON.stringify(node.value);
            }
            else if (type == "prefix" || type == "postfix") {
                return "Runtime.unary(context, '" + node.op + "', " + js(node.exp) + ")";
            }
            else if (type == "binary") {
                return "Runtime.binary(context, '" + node.op + "', " + js(node.left) + ", " + js(node.right) + ")";
            }
            else if (type == "return") {
                return "context.resolve(" + js(node.value) + ")";
            }
            else if (type == "call") {
                return "Runtime.func(context, " + JSON.stringify(node.func)
                    + node.args.map(function(arg){
                        return ", " + js(arg);
                    }).join("")
                    + ")";
            }
            else if (type == "ref") {
                return getReference(node);
            }
            else if (type == "bool") {
                return "" + node.value;
            }
            else if (type == "if") {
                return "(Runtime.bool(context, " + js(node.co) + ") ? " + js(node.th) + " : " + js(node.el) + ")";
            }
            else if (type == "not") {
                return "!Runtime.bool(context, " + js(node.exp) + ")";
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
            return isIdStart(ch) || isDigit(ch) || ch == "!";
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
        input = input+"";
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

    exports.parseReference = parseReference;
    exports.makeReference = makeReference;
    exports.print = print;
    exports.compile = function(x) {
        return makeFormula(toCPS(x, function(ret){
            return {
                type: "return",
                value: ret
            };
        }));
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
