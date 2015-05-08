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
        return col;
    }

    function getrow(str) {
        return parseFloat(str);
    }

    // "Sheet1!C2" -> { sheet: "Sheet1", row: 2, col: 3 }
    function parse_reference(name) {
        var m;
        if ((m = /^((.+)!)?(\$)?([A-Z]+)(\$)?([0-9]+)$/i.exec(name))) {
            var sheet  = m[1] && m[2];
            var relcol = m[3] ? 0 : REL_COL, col = getcol(m[4]);
            var relrow = m[5] ? 0 : REL_ROW, row = getrow(m[6]);
            return new Runtime.makeCellRef(col, row, relcol | relrow).setSheet(sheet, !!sheet);
        }
        if ((m = /^((.*)!)?(.+)$/i.exec(name))) {
            var sheet  = m[1] && m[2];
            var name = m[3];
            return new Runtime.makeNameRef(name).setSheet(sheet, !!sheet);
        }
    }

    // "Sheet1", 2, 3 -> "Sheet1!C2"
    function make_reference(sheet, col, row, rel) {
        var aa = "";

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

    function make_row(sheet, row, abs) {
        if (!isFinite(row)) {
            return "";
        }
        if (abs) {
            row = "$" + row;
        }
        if (sheet) {
            return sheet + "!" + row;
        } else {
            return row;
        }
    }

    function make_col(sheet, col, abs) {
        if (!isFinite(col)) {
            return "";
        }
        var aa = "";
        while (col > 0) {
            aa = String.fromCharCode(64 + col % 26) + aa;
            col = Math.floor(col / 26);
        }
        return make_row(sheet, aa, abs);
    }

    function parse(sheet, col, row, input) {
        if (typeof input == "string") {
            input = TokenStream(InputStream(input));
        }
        return {
            type: "exp",
            ast: parse_expression(input, true)
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

        function parse_expression(commas) {
            return maybe_intersect(
                maybe_call(
                    maybe_binary(parse_atom(commas), 0, commas)
                ),
                commas
            );
        }

        function parse_symbol(tok) {
            if (tok.upper == "TRUE" || tok.upper == "FALSE") {
                return tok.upper == "TRUE" ? TRUE : FALSE;
            }
            var ref = parse_reference(tok.value);
            if (ref) {
                if (ref.sheet == null) {
                    ref.sheet = sheet;
                }
                return ref;
            }
            return tok;
        }

        function parse_atom(commas) {
            var exp = maybe_range();
            if (exp) {
                return exp;
            }
            if (is("punc", "(")) {
                input.next();
                exp = parse_expression(true);
                skip("punc", ")");
            }
            else if (is("num") || is("str")) {
                exp = input.next();
            }
            else if (is("sym")) {
                exp = parse_symbol(input.next());
            }
            else if (is("op", "+") || is("op", "-")) {
                exp = {
                    type: "prefix",
                    op: input.next().value,
                    exp: parse_expression(commas)
                };
            }
            else {
                input.croak("Parse error");
            }
            return maybe_call(exp);
        }

        function maybe_intersect(exp, commas) {
            if (is("punc", "(") || is("sym") || is("num")) {
                return {
                    type: "binary",
                    op: " ",
                    left: exp,
                    right: parse_expression(commas)
                };
            } else {
                return exp;
            }
        }

        function maybe_call(exp) {
            if (is("punc", "(")) {
                if (exp.type != "ref" || exp.ref != "name") {
                    input.croak("Expecting function name");
                }
                var args = [];
                input.next();
                if (!is("punc", ")")) {
                    while (1) {
                        args.push(parse_expression(false));
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
            return maybe_percent(exp);
        }

        function maybe_percent(exp) {
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

        function maybe_binary(left, my_prec, commas) {
            var tok = is("op");
            if (tok && (commas || tok.value != ",")) {
                var his_prec = OPERATORS[tok.value];
                if (his_prec > my_prec) {
                    input.next();
                    var right = maybe_binary(parse_atom(commas), his_prec, commas);
                    return maybe_binary({
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

        function maybe_range() {
            return input.ahead(3, function(a, b, c){
                if ((a.type == "sym" || a.type == "num") &&
                    (b.type == "op" && b.value == ":") &&
                    (c.type == "sym" || c.type == "num"))
                {
                    var topLeft = getref(a, true);
                    var bottomRight = getref(c, false);
                    if (topLeft != null && bottomRight != null) {
                        if (topLeft.sheet != bottomRight.sheet) {
                            input.croak("Invalid range");
                        } else {
                            return Runtime.makeRangeRef(topLeft, bottomRight).setSheet(topLeft.sheet, topLeft.hasSheet());
                        }
                    }
                }
            });
        }

        function getref(tok, isFirst) {
            if (tok.type == "num" && tok.value == tok.value|0) {
                return Runtime.makeCellRef(isFirst ? -Infinity : +Infinity, tok.value, 2).setSheet(sheet, false);
            }
            var ref = parse_symbol(tok);
            if (ref.type == "ref") {
                if (ref.ref == "name") {
                    var name = ref.name;
                    var abs = name.charAt(0) == "$";
                    if (abs) {
                        name = name.substr(1);
                    }
                    if (/^[0-9]+$/.test(name)) {
                        // row ref
                        return Runtime.makeCellRef(
                            isFirst ? -Infinity : +Infinity,
                            getrow(name),
                            (abs ? 0 : REL_ROW)
                        ).setSheet(ref.sheet || sheet, ref.hasSheet());
                    } else {
                        // col ref
                        return Runtime.makeCellRef(
                            getcol(name),
                            isFirst ? -Infinity : +Infinity,
                            (abs ? 0 : REL_COL)
                        ).setSheet(ref.sheet || sheet, ref.hasSheet());
                    }
                }
                return ref;
            }
        }
    }

    function print(sheet, col, row, exp, orig) {
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
                open_paren();
                ret += op + print(node.exp, OPERATORS[op]);
                close_paren();
            }
            else if (type == "postfix") {
                open_paren();
                ret += print(node.exp, OPERATORS[op]) + op;
                close_paren();
            }
            else if (type == "binary") {
                open_paren();
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
                close_paren();
            }
            else if (type == "call") {
                ret = node.func + "(" + node.args.map(function(arg){
                    return print(arg, 0);
                }).join(", ") + ")";
            }
            else if (type == "ref") {
                ret = node.print(col, row, orig);
            }
            else if (type == "bool") {
                ret = (node.value+"").toUpperCase();
            }
            else {
                throw new Error("Unsupported node in print: " + type);
            }

            return ret;

            function open_paren() {
                if (OPERATORS[op] < prec || (!prec && op == ",")) {
                    ret += "(";
                    parens = true;
                }
            }
            function close_paren() {
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

    function to_cps(node, k) {
        GENSYM = 0;
        return cps(node.ast, k);

        function cps(node, k){
            switch (node.type) {
              case "ref"     :
              case "num"     :
              case "str"     :
              case "bool"    : return cps_atom(node, k);
              case "prefix"  :
              case "postfix" : return cps_unary(node, k);
              case "binary"  : return cps_binary(node, k);
              case "call"    : return cps_call(node, k);
            }
            throw new Error("Cannot CPS " + node.type);
        }

        function cps_atom(node, k) {
            return k(node);
        }

        function cps_unary(node, k) {
            return cps({
                type: "call",
                func: "unary" + node.op,
                args: [ node.exp ]
            }, k);
        }

        function cps_binary(node, k) {
            return cps({
                type: "call",
                func: "binary" + node.op,
                args: [ node.left, node.right ]
            }, k);
        }

        function cps_if(co, th, el, k) {
            return cps(co, function(co){
                return {
                    type: "if",
                    co: co,
                    th: cps(th, k),
                    el: cps(el || FALSE, k)
                };
            });
        }

        function cps_and(args, k) {
            if (args.length === 0) {
                return cps_atom(TRUE, k);
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

        function cps_or(args, k) {
            if (args.length === 0) {
                return cps_atom(FALSE, k);
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

        function cps_not(exp, k) {
            return cps(exp, function(exp){
                return k({
                    type: "not",
                    exp: exp
                });
            });
        }

        function cps_call(node, k) {
            switch (node.func.toLowerCase()) {
              case "if":
                return cps_if(node.args[0], node.args[1], node.args[2], k);
              case "not":
                return cps_not(node.args[0], k);
              case "and":
                return cps_and(node.args, k);
              case "or":
                return cps_or(node.args, k);
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
            })([ make_continuation(k) ], 0);
        }

        function make_continuation(k) {
            var cont = gensym("R");
            return {
                type : "lambda",
                vars : [ cont ],
                body : k({ type: "var", name: cont })
            };
        }
    }

    var make_closure = (function(cache){
        return function(code) {
            if (Object.prototype.hasOwnProperty.call(cache, code)) {
                return cache[code];
            }
            return cache[code] = new Function("Runtime", code)(Runtime);
        };
    })({});

    function compile(exp) {
        var references = [];
        var code = compile(exp.cps);

        code = [
            "return function(context) { 'use strict'",
            //"/* " + print(the_sheet, the_col, the_row, exp) + " */",
            "  var formula = context.formula, SS = context.ss",
            code,
            "}"
        ].join(";\n");

        return Runtime.makeFormula(references, make_closure(code));

        function get_reference(ref) {
            var index = references.length;
            references[index] = ref;
            return "formula.refs[" + index + "]";
        }

        function compile(node){
            var type = node.type, ret;
            if (type == "num") {
                return node.value + "";
            }
            else if (type == "str") {
                return JSON.stringify(node.value);
            }
            else if (type == "prefix" || type == "postfix") {
                return "Runtime.unary(context, '" + node.op + "', " + compile(node.exp) + ")";
            }
            else if (type == "binary") {
                return "Runtime.binary(context, '" + node.op + "', " + compile(node.left) + ", " + compile(node.right) + ")";
            }
            else if (type == "return") {
                return "context.resolve(" + compile(node.value) + ")";
            }
            else if (type == "call") {
                return "Runtime.func(context, " + JSON.stringify(node.func)
                    + node.args.map(function(arg){
                        return ", " + compile(arg);
                    }).join("")
                    + ")";
            }
            else if (type == "ref") {
                return get_reference(node);
            }
            else if (type == "bool") {
                return "" + node.value;
            }
            else if (type == "if") {
                return "(Runtime.bool(context, " + compile(node.co) + ") ? " + compile(node.th) + " : " + compile(node.el) + ")";
            }
            else if (type == "not") {
                return "!Runtime.bool(context, " + compile(node.exp) + ")";
            }
            else if (type == "lambda") {
                return "function("
                    + node.vars.join(", ")
                    + "){ return(" + compile(node.body) + ") }";
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
        function is_digit(ch) {
            return /[0-9]/i.test(ch);
        }
        function is_id_start(ch) {
            return /[a-z$_]/i.test(ch);
        }
        function is_id(ch) {
            return is_id_start(ch) || is_digit(ch) || ch == "!";
        }
        function is_op_char(ch) {
            return ch in OPERATORS;
        }
        function is_punc(ch) {
            return ";(){}[]".indexOf(ch) >= 0;
        }
        function is_whitespace(ch) {
            return " \t\n".indexOf(ch) >= 0;
        }
        function read_while(predicate) {
            var str = "";
            while (!input.eof() && predicate(input.peek(), str)) {
                str += input.next();
            }
            return str;
        }
        function read_number() {
            // XXX: TODO: exponential notation
            var has_dot = false;
            var number = read_while(function(ch){
                if (ch == ".") {
                    if (has_dot) {
                        return false;
                    }
                    has_dot = true;
                    return true;
                }
                return is_digit(ch);
            });
            return { type: "num", value: parseFloat(number) };
        }
        function read_symbol() {
            var id = read_while(is_id);
            return {
                type  : "sym",
                value : id,
                upper : id.toUpperCase()
            };
        }
        function read_escaped(end) {
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
        function read_string() {
            return { type: "str", value: read_escaped('"') };
        }
        function read_operator() {
            return {
                type  : "op",
                value : read_while(function(ch, op){
                    return (op + ch) in OPERATORS;
                })
            };
        }
        function read_next() {
            read_while(is_whitespace);
            if (input.eof()) {
                return null;
            }
            var ch = input.peek();
            if (ch == '"') {
                return read_string();
            }
            if (is_digit(ch)) {
                return read_number();
            }
            if (is_id_start(ch)) {
                return read_symbol();
            }
            if (is_op_char(ch)) {
                return read_operator();
            }
            if (is_punc(ch)) {
                return {
                    type  : "punc",
                    value : input.next()
                };
            }
            input.croak("Can't handle character: " + ch);
        }
        function peek() {
            while (tokens.length <= index) {
                tokens.push(read_next());
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

    exports.parse_formula = parse;
    exports.parse = function(sheet, col, row, input) {
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
                return parse(sheet, col, row, input);
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

    exports.parse_reference = parse_reference;
    exports.make_reference = make_reference;
    exports.print = print;
    exports.compile = function(x) {
        x.cps = to_cps(x, function(ret){
            return {
                type: "return",
                value: ret
            };
        });
        return compile(x);
    };

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
