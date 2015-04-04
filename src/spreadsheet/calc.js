(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true */

    kendo.spreadsheet = {};
    var exports = kendo.spreadsheet.calc = {};

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
        [ "," ],
        [ "%" ],
        [ "^" ],
        [ "*", "/" ],
        [ "+", "-" ],
        [ "&" ],
        [ "=", "<", ">", "<=", ">=", "<>" ]
    ]);

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
            var relcol = m[3] ? 0 : 1, col = getcol(m[4]);
            var relrow = m[5] ? 0 : 2, row = getrow(m[6]);
            return {
                type  : "ref",
                sheet : sheet,
                col   : col,
                row   : row,
                rel   : relcol | relrow
            };
        }
    }

    // "Sheet1", 2, 3 -> "Sheet1!C2"
    function make_reference(sheet, row, col, abs) {
        var aa = "";
        while (col > 0) {
            aa += String.fromCharCode(64 + col % 26);
            col = Math.floor(col / 26);
        }
        if (abs & 2) {
            row = "$" + row;
        }
        if (abs & 1) {
            aa = "$" + aa;
        }
        if (sheet) {
            return sheet + "!" + aa + row;
        } else {
            return aa + row;
        }
    }

    function parse(sheet, row, col, input) {
        return {
            type: "exp",
            sheet: sheet,
            row: row,
            col: col,
            ast: parse_expression(input, true)
        };

        function skip(type, value) {
            if (is(type, value)) {
                return input.next();
            } else {
                var tok = input.peek();
                input.croak("Expected " + type + " (" + value + ") but found " + tok.type + " (" + tok.value + ")");
            }
        }
        function is(type, value) {
            var tok = input.peek();
            return tok != null &&
                (type == null || tok.type === type) &&
                (value == null || tok.value === value) ? tok : null;
        }
        function parse_expression(commas) {
            return maybe_intersect(
                maybe_call(
                    maybe_binary(parse_atom(commas), 0, commas)
                ),
                commas
            );
        }
        function parse_symbol() {
            var tok = input.next();
            var ref = parse_reference(tok.value);
            if (ref) {
                if (!ref.sheet) {
                    ref.sheet = sheet;
                }
                // update relative references
                if (ref.rel & 1) { // relative col
                    ref.col -= col;
                }
                if (ref.rel & 2) { // relative row
                    ref.row -= row;
                }
            }
            return ref || tok;
        }
        function parse_atom(commas) {
            var exp;
            if (is("punc", "(")) {
                input.next();
                exp = parse_expression(true);
                skip("punc", ")");
            }
            else if (is("num") || is("str")) {
                exp = input.next();
            }
            else if (is("sym")) {
                exp = parse_symbol();
            }
            else if (is("op", "+") || is("op", "-")) {
                exp = {
                    type: "prefix",
                    op: input.next().value,
                    exp: parse_expression(commas)
                };
            }
            else {
                input.croak("Unexpected");
            }
            return maybe_call(exp);
        }
        function maybe_intersect(exp, commas) {
            if (is("punc", "(") || is("sym")) {
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
                if (exp.type != "sym") {
                    input.croak("Expecting function name");
                }
                var args = [];
                input.next();
                while (!input.eof()) {
                    args.push(parse_expression(false));
                    if (is("punc", ")")) {
                        break;
                    }
                    skip("op", ",");
                }
                skip("punc", ")");
                exp = {
                    type: "call",
                    func: exp,
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
                    var binary = {
                        type: "binary",
                        op: tok.value,
                        left: left,
                        right: right
                    };
                    return maybe_binary(binary, my_prec, commas);
                }
            }
            return left;
        }
    }

    function print(sheet, row, col, ast) {
        return (function print(node, prec){
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
                ret += print(node.left, OPERATORS[op])
                    +  op
                    +  print(node.right, OPERATORS[op]);
                close_paren();
            }
            else if (type == "call") {
                ret = print(node.func, 0) + "(" + node.args.map(function(arg){
                    return print(arg, 0);
                }).join(", ") + ")";
            }
            else if (type == "sym") {
                ret = node.value;
            }
            else if (type == "ref") {
                ret = make_reference(
                    node.sheet == sheet ? null : node.sheet, // sheet name
                    node.row + (node.rel & 2 ? row : 0),     // row
                    node.col + (node.rel & 1 ? col : 0),     // col
                    node.rel^3                               // whether to add the $
                );
            }
            return ret;
        })(ast);
    }

    function TokenStream(input) {
        var current = null;
        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : input.croak
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
                value : id
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
            var op = read_while(function(ch, op){
                return (op + ch) in OPERATORS;
            });
            return {
                type  : "op",
                value : op
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
            return current || (current = read_next());
        }
        function next() {
            var tok = current;
            current = null;
            return tok || read_next();
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
            throw new Error(msg + " (" + line + ":" + col + ")");
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
            return parse(sheet, row, col, TokenStream(InputStream(input.substr(1))));
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

    return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
