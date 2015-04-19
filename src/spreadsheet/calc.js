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
                ref   : "cell",
                sheet : sheet,
                col   : col,
                row   : row,
                rel   : relcol | relrow
            };
        }
        if ((m = /^((.*)!)?(.+)$/i.exec(name))) {
            return {
                type  : "ref",
                ref   : "name",
                sheet : m[1] && m[2],
                name  : m[3]
            };
        }
    }

    // "Sheet1", 2, 3 -> "Sheet1!C2"
    function make_reference(sheet, col, row, abs) {
        var aa = "";
        while (col > 0) {
            aa = String.fromCharCode(64 + col % 26) + aa;
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

    function make_row(sheet, row, abs) {
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
        var aa = "";
        while (col > 0) {
            aa = String.fromCharCode(64 + col % 26) + aa;
            col = Math.floor(col / 26);
        }
        return make_row(sheet, aa, abs);
    }

    function adjust(num, delta, should) {
        return should ? num + delta : num;
    }

    function parse(sheet, col, row, input) {
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
                if (exp.type != "ref" && exp.rel != "name") {
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
        // - A1:B3 (ref: "range")
        // - A:A   (ref: "col")
        // - 2:2   (ref: "row")
        function maybe_range() {
            return input.ahead(3, function(a, b, c){
                if ((a.type == "sym" || a.type == "num") &&
                    (b.type == "op" && b.value == ":") &&
                    (c.type == "sym" || c.type == "num"))
                {
                    var left = getref(a);
                    var right = getref(c);
                    if (left != null && right != null) {
                        if (left.ref != right.ref) {
                            input.croak("Incompatible references in range");
                        }
                        return {
                            type  : "ref",
                            ref   : "range",
                            sheet : right.sheet = left.sheet,
                            left  : corner(left, right, 0),
                            right : corner(left, right, 1)
                        };
                    }
                }
            });
        }

        function getref(tok) {
            if (tok.type == "num" && tok.value == tok.value|0) {
                return {
                    type  : "ref",
                    ref   : "row",
                    rel   : true,
                    row   : tok.value - row
                };
            }
            var ref = parse_symbol(tok);
            if (ref.type == "ref") {
                if (ref.ref == "name") {
                    var name = ref.name;
                    var abs = name.charAt(0) == "$";
                    if (abs) {
                        name = name.substr(1);
                    }
                    var r = /^[0-9]+$/.test(name);
                    ref = {
                        type  : "ref",
                        ref   : r ? "row" : "col",
                        sheet : ref.sheet,
                        rel   : !abs
                    };
                    if (r) {
                        ref.row = getrow(name) - (abs ? 0 : row);
                    } else {
                        ref.col = getcol(name) - (abs ? 0 : col);
                    }
                }
                return ref;
            }
        }

        function corner(a, b, side) {
            if (a.ref == "row") {
                return (adjust(a.row, row, a.rel) < adjust(b.row, row, a.rel)
                        ? (side ? b : a)
                        : (side ? a : b));
            }
            if (a.ref == "col") {
                return (adjust(a.col, col, a.rel) < adjust(b.col, col, a.rel)
                        ? (side ? b : a)
                        : (side ? a : b));
            }
            if (a.ref == "cell") {
                var tmp;
                var r1 = a.row, c1 = a.col, r2 = b.row, c2 = b.col;
                var rr1 = a.rel & 2, rc1 = a.rel & 1;
                var rr2 = b.rel & 2, rc2 = b.rel & 1;
                if (adjust(r1, row, rr1) > adjust(r2, row, rr2)) {
                    tmp = r1; r1 = r2; r2 = tmp;
                    tmp = rr1; rr1 = rr2; rr2 = tmp;
                }
                if (adjust(c1, col, rc1) > adjust(c2, col, rc2)) {
                    tmp = c1; c1 = c2; c2 = tmp;
                    tmp = rc1; rc1 = rc2; rc2 = tmp;
                }
                return {
                    type  : "ref",
                    ref   : "cell",
                    sheet : a.sheet,
                    row   : side ? r2 : r1,
                    col   : side ? c2 : c1,
                    rel   : side ? (rr2 | rc2) : (rr1 | rc1)
                };
            }
        }
    }

    function print(sheet, col, row, ast) {
        return print(ast);

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
                ret = print_ref(node);
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
            function print_ref(node, noSheet) {
                if (node.ref == "cell") {
                    return make_reference(
                        noSheet ? null : node.sheet, // sheet name
                        node.col + (node.rel & 1 ? col : 0),                // col
                        node.row + (node.rel & 2 ? row : 0),                // row
                        node.rel^3                                          // whether to add the $
                    );
                }
                else if (node.ref == "col") {
                    return make_col(
                        noSheet ? null : node.sheet,
                        node.col + (node.rel ? col : 0),
                        !node.rel
                    );
                }
                else if (node.ref == "row") {
                    return make_row(
                        noSheet ? null : node.sheet,
                        node.row + (node.rel ? row : 0),
                        !node.rel
                    );
                }
                else if (node.ref == "name") {
                    if (!node.sheet) {
                        return node.name;
                    } else {
                        return node.sheet + "!" + node.name;
                    }
                }
                else if (node.ref == "range") {
                    return print(node.left)
                        + ":"
                        + print(node.right);
                }
                else {
                    throw new Error("Unknown reference type in print " + node.type);
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
              case "num"     :
              case "str"     :
              case "bool"    : return cps_atom(node, k);
              case "prefix"  :
              case "postfix" : return cps_unary(node, k);
              case "binary"  : return cps_binary(node, k);
              case "call"    : return cps_call(node, k);
              case "ref"     : return cps_ref(node, k);
            }
            throw new Error("Cannot CPS " + node.type);
        }

        function cps_atom(node, k) {
            return k(node);
        }

        function cps_unary(node, k) {
            return cps(node.exp, function(exp){
                return k({
                    type: node.type,
                    op: node.op,
                    exp: exp
                });
            });
        }

        function cps_binary(node, k) {
            return cps(node.left, function(left){
                return cps(node.right, function(right){
                    return k({
                        type: "binary",
                        op: node.op,
                        left: left,
                        right: right
                    });
                });
            });
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

        function cps_ref(node, k) {
            if (node.ref == "cell" || node.ref == "range") {
                // constant reference
                return cps_atom(node, k);
            }
            return {
                type: "call",
                func: "-fetch",
                args: [
                    make_continuation(k),
                    node
                ]
            };
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
                type : "cont",
                vars : [ cont ],
                body : k({ type: "var", name: cont })
            };
        }
    }

    function compile(exp) {
        var references = [];
        var the_col = exp.col;
        var the_row = exp.row;
        var the_sheet = exp.sheet;
        var code = compile(exp.cps);

        code = [
            '"use strict"',
            "var references = [" + references.map(function(code){
                return "\n    " + code;
            }).join(",") + " ]",
            "var formula = function(SS) {",
            "  var formula = this",
            "  var promise = $.Deferred()",
            "  promise.always(function(arg){ formula.inProgress = false; SS.onFormula(formula, arg) })",
            "  var error = function(){ promise.reject.apply(promise, arguments) }",
            "  if ('value' in formula) { promise.resolve(formula.value) }"
                + "  else if (formula.inProgress) { error(Runtime.makeError('CIRCULAR')) }\n"
                + "  else formula.inProgress = true, " + code,
            "  return promise",
            "}",
            "return Runtime.makeFormula({ refs: references, func: formula, sheet: "
                + JSON.stringify(the_sheet)
                + ", col: " + the_col
                + ", row: " + the_row + " })"
        ].join(";\n");

        return new Function("Runtime", code)(exports.Runtime);
        // return code;

        // function adjust(num) {
        //     return num;
        // }

        function get_reference(code) {
            var index = references.length;
            references[index] = code;
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
                return "Runtime.unary(SS, promise, '" + node.op + "', " + compile(node.exp) + ")";
            }
            else if (type == "binary") {
                return "Runtime.binary(SS, promise, '" + node.op + "', " + compile(node.left) + ", " + compile(node.right) + ")";
            }
            else if (type == "return") {
                return "promise.resolve(formula.value = " + compile(node.value) + ")";
            }
            else if (type == "call") {
                var args = node.args.slice();
                var cont = args[0] && args[0].type == "cont" ? args[0] : null;
                if (cont) {
                    args.shift();
                }
                if (/^-/.test(node.func)) {
                    ret = "SS." + node.func.substr(1)
                        + "(" + args.map(compile).join(", ") + ")";
                } else {
                    ret = "SS.func(" + JSON.stringify(node.func)
                        + args.map(function(arg){
                            return ", " + compile(arg);
                        }).join("")
                        + ")";
                }
                if (cont) {
                    ret += ".then(" + compile(cont) + ").fail(error)";
                }
                return ret;
            }
            else if (type == "ref") {
                if (node.ref == "cell") {
                    ret = cellref(node);
                } else if (node.ref == "range") {
                    ret = "Runtime.makeRangeRef("
                        + JSON.stringify(node.sheet || the_sheet) + ", "
                        + in_range(node.left, 0) + ", "
                        + in_range(node.right, 1) + ")";
                } else if (node.ref == "name") {
                    ret = "Runtime.makeNameRef("
                        + JSON.stringify(node.sheet || the_sheet) + ", "
                        + JSON.stringify(node.name) + ")";
                }
                return get_reference(ret);
            }
            else if (type == "bool") {
                return "" + node.value;
            }
            else if (type == "if") {
                return "(" + compile(node.co) + " ? " + compile(node.th) + " : " + compile(node.el) + ")";
            }
            else if (type == "not") {
                return "!" + compile(node.exp);
            }
            else if (type == "lambda" || type == "cont") {
                return "function("
                    + node.vars.join(", ")
                    + "){ " + compile(node.body) + " }";
            }
            else if (type == "var") {
                return node.name;
            }
            else {
                throw new Error("Cannot compile expression " + type);
            }
        }

        function cellref(node) {
            return "Runtime.makeCellRef("
                + JSON.stringify(node.sheet || the_sheet) + ", "
                + adjust(node.col, the_col, node.rel & 1) + ", "
                + adjust(node.row, the_row, node.rel & 2) + ", "
                + node.rel + ")";
        }

        function in_range(node, side) {
            if (node.type == "ref") {
                if (node.ref == "row") {
                    return "Runtime.makeCellRef("
                        + JSON.stringify(node.sheet || the_sheet) + ", "
                        + (side ? "Infinity" : "-Infinity") + ", "
                        + adjust(node.row, the_row, node.rel) + ", "
                        + (node.rel ? 2 : 0) + ")";
                }
                if (node.ref == "col") {
                    return "new Runtime.CellRef("
                        + JSON.stringify(node.sheet || the_sheet) + ", "
                        + adjust(node.col, the_col, node.rel) + ", "
                        + (side ? "Infinity" : "-Infinity") + ", "
                        + (node.rel ? 1 : 0) + ")";
                }
                if (node.ref == "cell") {
                    return cellref(node);
                }
            }
            return compile(node);
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
                return parse(sheet, col, row, TokenStream(InputStream(input)));
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

    // (function(){
    //     var exp = "=SUM(A1:C3)";
    //     //exp = "=print( IF(true, \"FOO\", \"BAR\") )";
    //     var ast = exports.parse("Sheet1", 5, 5, exp);
    //     ast.cps = to_cps(ast, function(ret){
    //         return {
    //             type: "return",
    //             value: ret
    //         };
    //     });
    //     var formula = compile(ast);
    //     console.log(JSON.stringify(ast.cps, null, 2));
    //     console.log("---");
    //     console.log(formula);
    //     console.log(formula.func+"");
    // })();

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
