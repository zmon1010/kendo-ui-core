// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./calc", "../kendo.dom" ], f);
})(function(){
    "use strict";

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, -W054 */
    /* jshint latedef: nofunc */

    var calc = kendo.spreadsheet.calc;

    var RX_COLORS = /^\[(black|green|white|blue|magenta|yellow|cyan|red)\]/i;
    var RX_CONDITION = /^\[(<=|>=|<>|<|>|=)(-?[0-9.]+)\]/;

    /* The proper amount of suffering for whoever designed the Excel
       Custom Number Format would be to have him implement the
       formatter himself. */

    function parse(input) {
        input = calc.InputStream(input);
        var sections = [], haveTimePart = false, haveConditional = false, decimalPart;

        while (!input.eof()) {
            var sec = readSection();
            sections.push(sec);
            if (sec.cond) {
                haveConditional = true;
            }
        }

        // From https://support.office.com/en-us/article/Create-or-delete-a-custom-number-format-78f2a361-936b-4c03-8772-09fab54be7f4:
        //
        //    A number format can have up to four sections of code, separated by semicolons. These
        //    code sections define the format for positive numbers, negative numbers, zero values,
        //    and text, in that order.
        //
        //    You do not have to include all code sections in your custom number format. If you
        //    specify only two code sections for your custom number format, the first section is
        //    used for positive numbers and zeros, and the second section is used for negative
        //    numbers. If you specify only one code section, it is used for all numbers. If you want
        //    to skip a code section and include a code section that follows it, you must include
        //    the ending semicolon for the section that you skip.
        //
        // However, if sections have conditionals, it is not clear if:
        //
        //    - still at most four are allowed
        //    - is the last section still for text
        //
        // We will assume that if no sections have conditionals, then there must be at most 4, and
        // they will be interpreted in the order above.  If the first section contains a
        // conditional, then there can be any number of them; if the last one is not conditional
        // then it will be interpreted as text format.

        function addPlainText() {
            sections.push({
                cond: "text",
                body: [ { type: "text" } ]
            });
        }

        if (haveConditional) {
            addPlainText();
        }
        else if (sections.length == 1) {
            sections[0].cond = "num";
            addPlainText();
        }
        else if (sections.length == 2) {
            sections[0].cond = { op: ">=", value: 0 };
            sections[1].cond = { op: "<", value: 0 };
            addPlainText();
        }
        else if (sections.length >= 3) {
            sections[0].cond = { op: ">", value: 0 };
            sections[1].cond = { op: "<", value: 0 };
            sections[2].cond = { op: "=", value: 0 };
            addPlainText();
            if (sections.length > 3) {
                sections[3].cond = "text";
                sections = sections.slice(0, 4);
            }
        }

        return sections;

        function maybeColor() {
            var m = input.skip(RX_COLORS);
            if (m) {
                return m[1].toLowerCase();
            }
        }

        function maybeCondition() {
            var m = input.skip(RX_CONDITION);
            if (m) {
                var val = parseFloat(m[2]);
                if (!isNaN(val)) {
                    return { op: m[1], value: val };
                }
            }
        }

        function readFormat() {
            var format = [], tok;
            LOOP: while (!input.eof() && (tok = readNext())) {
                format.push(tok);
            }
            return format;
        }

        function readNext() {
            var ch, m;
            // numbers
            if ((m = input.skip(/^([#0?]+),([#0?]+)/))) {
                // thousands separator.  seems convenient to treat
                // this as a single token.
                return { type: "digit", sep: true, format: m[1] + m[2], decimal: decimalPart };
            }
            if ((m = input.skip(/^[#0?]+/))) {
                return { type: "digit", sep: false, format: m[0], decimal: decimalPart };
            }
            // XXX: handle this one!
            if ((m = input.skip(/^(e)([+-])/i))) {
                return { type: "exp", ch: m[1], sign: m[2] };
            }
            // dates
            if ((m = input.skip(/^(d{1,4}|m{1,5}|yyyy|yy)/i))) {
                // Disambiguate between month/minutes.  This means
                // there is no way to display minutes before hours or
                // seconds.  Dear whoever-invented-this format, you
                // are an idiot.
                var type = "date", m = m[1].toLowerCase();
                if (haveTimePart && (m == "m" || m == "mm")) {
                    type = "time";
                }
                haveTimePart = false;
                return { type: type, part: m.charAt(0), format: m.length };
            }
            // time (interpret as a date)
            if ((m = input.skip(/^(hh?|ss?)/i))) { // m and mm are handled above
                haveTimePart = true;
                m = m[1].toLowerCase();
                return { type: "time", part: m.charAt(0), format: m.length };
            }
            // elapsed time (interpret as interval of days)
            if ((m = input.skip(/^\[(hh?|mm?|ss?)\]/i))) {
                haveTimePart = true;
                m = m[1].toLowerCase();
                return { type: "eltime", part: m.charAt(0), format: m.length };
            }
            if ((m = input.skip(/^(am\/pm|a\/p)/i))) {
                m = m[1].split("/");
                return { type: "ampm", am: m[0], pm: m[1] };
            }
            switch ((ch = input.next())) { // JSHint sadness
              case ";":
                return null;
              case "\\":
                // quotes next character
                return { type: "str", value: input.next() };
              case '"':
                return { type: "str", value: input.readEscaped(ch) };
              case "@":
                return { type: "text" };
              case "_":
                // whitespace of the width of following character
                return { type: "space", value: input.next() };
              case "*":
                // fills cell width with the following character
                return { type: "fill", value: input.next() };
              case ".":
                if (input.lookingAt(/^\s*[#0?]/)) {
                    decimalPart = true;
                    return { type: "dec" };
                }
                return { type: "str", value: "." };
              case "%":
                return { type: "percent" };
              case ",":
                return { type: "comma" };
            }

            // whatever we can't make sense of, output literally.
            return { type: "str", value: ch };
        }

        function readSection() {
            decimalPart = false;
            var color = maybeColor(), cond = maybeCondition();
            if (!color && cond) {
                color = maybeColor();
            }
            return {
                color : color,
                cond  : cond,
                body  : readFormat()
            };
        }
    }

    function print(sections) {
        return sections.map(printSection).join(";");

        function printSection(sec) {
            var out = "";
            if (sec.color) {
                out += "[" + sec.color + "]";
            }
            if (sec.cond) {
                if (!(sec.cond == "text" || sec.cond == "num")) {
                    out += "[" + sec.cond.op + sec.cond.value + "]";
                }
            }
            out += sec.body.map(printToken).join("");
            return out;
        }

        function printToken(tok) {
            if (tok.type == "digit") {
                if (tok.sep) {
                    return tok.format.charAt(0) + "," + tok.format.substr(1);
                } else {
                    return tok.format;
                }
            }
            else if (tok.type == "exp") {
                return tok.ch + tok.sign;
            }
            else if (tok.type == "date" || tok.type == "time") {
                return padLeft("", tok.format, tok.part);
            }
            else if (tok.type == "ampm") {
                return tok.am + "/" + tok.pm;
            }
            else if (tok.type == "str") {
                return JSON.stringify(tok.value);
            }
            else if (tok.type == "text") {
                return "@";
            }
            else if (tok.type == "space") {
                return "_" + tok.value;
            }
            else if (tok.type == "fill") {
                return "*" + tok.value;
            }
            else if (tok.type == "dec") {
                return ".";
            }
            else if (tok.type == "percent") {
                return "%";
            }
            else if (tok.type == "comma") {
                return ",";
            }
        }
    }

    function adjustDecimals(sections, x) {
        sections.forEach(function(sec) {
            var diff = x;
            if (sec.cond == "text") {
                return;
            }
            var body = sec.body, adjusted = false, i = body.length;
            while (diff !== 0 && --i >= 0) {
                var tok = body[i];
                if (tok.type == "digit") {
                    if (tok.decimal) {
                        adjusted = true;
                        if (diff > 0) {
                            tok.format += padLeft("", diff, "0");
                        } else if (diff < 0) {
                            var tmp = tok.format.length;
                            tok.format = tok.format.substr(0, tmp + diff);
                            diff += tmp - tok.format.length;
                        }
                        if (tok.format.length === 0) {
                            body.splice(i, 1);
                            while (--i >= 0) {
                                tok = body[i];
                                if (tok.type == "digit" && tok.decimal) {
                                    ++i;
                                    break;
                                }
                                if (tok.type == "dec") {
                                    body.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (diff > 0) {
                        break;
                    }
                }
            }
            if (!adjusted && diff > 0) {
                // no decimal part was found, insert one after the last digit token.
                body.splice(
                    i + 1, 0, {
                        type    : "dec"
                    }, {
                        type    : "digit",
                        sep     : false,
                        decimal : true,
                        format  : padLeft("", diff, "0")
                    }
                );
            }
        });
    }

    function TokenStream(parts) {
        var index = 0;
        return {
            next: function() {
                return parts[index++];
            },
            eof: function() {
                return index >= parts.length;
            },
            ahead: function(n, f) {
                if (index + n <= parts.length) {
                    var val = f.apply(null, parts.slice(index, index + n));
                    if (val) {
                        index += n;
                    }
                    return val;
                }
            },
            restart: function() {
                index = 0;
            }
        };
    }

    function compileFormatPart(format) {
        var input = TokenStream(format.body);
        var hasDate = false;
        var hasTime = false;
        var hasAmpm = false;
        var percentCount = 0;
        var scaleCount = 0;
        var code = "";
        var separeThousands = false;
        var declen = 0;
        var intFormat = [], decFormat = [];
        var condition = format.cond;
        var preamble = "";

        if (condition == "text") {
            preamble = "if (typeof value == 'string') { ";
        }
        else if (condition == "num") {
            preamble = "if (typeof value == 'number') { ";
        }
        else if (condition) {
            var op = condition.op == "=" ? "==" : condition.op;
            preamble = "if (typeof value == 'number' && value "
                + op + " " + condition.value + ") { ";
            code += "value = Math.abs(value); ";
        }

        if (format.color) {
            code += "element.attr.style = { color: " + JSON.stringify(format.color) + "}; ";
        }

        function checkComma(a, b) {
            if ((a.type == "digit" && b.type == "comma") ||
                (a.type == "comma" && a.hidden && b.type == "comma"))
            {
                b.hidden = true;
                scaleCount++;
            }
        }

        while (!input.eof()) {
            input.ahead(2, checkComma);
            var tok = input.next();
            if (tok.type == "percent") {
                percentCount++;
            }
            else if (tok.type == "digit") {
                if (tok.decimal) {
                    declen += tok.format.length;
                    decFormat.push(tok.format);
                } else {
                    intFormat.push(tok.format);
                    if (tok.sep) {
                        separeThousands = true;
                    }
                }
            }
            else if (tok.type == "time") {
                hasTime = true;
            }
            else if (tok.type == "date") {
                hasDate = true;
            }
            else if (tok.type == "ampm") {
                hasAmpm = hasTime = true;
            }
        }

        if (percentCount > 0) {
            code += "value *= " + Math.pow(100, percentCount) + "; ";
        }
        if (scaleCount > 0) {
            code += "value /= " + Math.pow(1000, scaleCount) + "; ";
        }
        if (intFormat.length) {
            code += "var intPart = runtime.formatInt(culture, value, " + JSON.stringify(intFormat) + ", " + declen + ", " + separeThousands + "); ";
        }
        if (decFormat.length) {
            code += "var decPart = runtime.formatDec(culture, value, " + JSON.stringify(decFormat) + ", " + declen + "); ";
        }
        if (intFormat.length || decFormat.length) {
            code += "type = 'number'; ";
        }
        if (hasDate) {
            code += "var date = runtime.unpackDate(value); ";
        }
        if (hasTime) {
            code += "var time = runtime.unpackTime(value); ";
        }
        if (hasDate || hasTime) {
            code += "type = 'date'; ";
        }

        if (percentCount > 0 || scaleCount > 0 || intFormat.length || decFormat.length || hasDate || hasTime) {
            if (!preamble) {
                preamble = "if (typeof value == 'number') { ";
            }
        }

        input.restart();
        while (!input.eof()) {
            var tok = input.next();
            if (tok.type == "dec") {
                code += "output += culture.numberFormat['.']; ";
            }
            else if (tok.type == "comma" && !tok.hidden) {
                code += "output += ','; ";
            }
            else if (tok.type == "percent") {
                code += "output += culture.numberFormat.percent.symbol; ";
            }
            else if (tok.type == "str") {
                code += "output += " + JSON.stringify(tok.value) + "; ";
            }
            else if (tok.type == "text") {
                code += "type = 'text'; ";
                code += "output += value; ";
            }
            else if (tok.type == "space") {
                code += "element.children.push(dom.text(output)); ";
                code += "output = ''; ";
                code += "element.children.push(dom.element('span', { style: { visibility: 'hidden' }}, [ dom.text(" + JSON.stringify(tok.value) + ") ])); ";
            }
            else if (tok.type == "fill") {
                code += "output += runtime.fill(" + JSON.stringify(tok.value) + "); ";
            }
            else if (tok.type == "digit") {
                code += "output += " + (tok.decimal ? "decPart" : "intPart") + ".shift(); ";
            }
            else if (tok.type == "date") {
                code += "output += runtime.date(culture, date, "
                    + JSON.stringify(tok.part) + ", " + tok.format + "); ";
            }
            else if (tok.type == "time") {
                code += "output += runtime.time(culture, time, "
                    + JSON.stringify(tok.part) + ", " + tok.format + ", " + hasAmpm + "); ";
            }
            else if (tok.type == "eltime") {
                code += "output += runtime.eltime(culture, value, "
                    + JSON.stringify(tok.part) + ", " + tok.format + "); ";
            }
            else if (tok.type == "ampm") {
                // XXX: should use culture?  As per the "spec", Excel
                // displays whatever the token was (AM/PM, a/p etc.)
                code += "output += time.hours < 12 ? " + JSON.stringify(tok.am) + " : " + JSON.stringify(tok.pm) + "; ";
            }
        }

        code += "element.children.push(dom.text(output)); ";
        code += "element.__dataType = type; ";
        code += "return element; ";

        if (preamble) {
            code = preamble + code + "}";
        }

        return code;
    }

    var CACHE = Object.create(null);

    function compile(format) {
        var f = CACHE[format];
        if (!f) {
            var tree = parse(format);
            var code = tree.map(compileFormatPart).join("\n");
            code = "return function(value, culture){ "
                + "'use strict'; "
                + "if (!culture) culture = kendo.culture(); "
                + "var output = '', type = null, element = dom.element('span'); " + code + "; return element; };";
            f = CACHE[format] = new Function("runtime", "dom", code)(runtime, kendo.dom);
        }
        return f;
    }

    var runtime = {

        unpackDate: calc.runtime.unpackDate,
        unpackTime: calc.runtime.unpackTime,

        space: function(str) {
            return "<span style='visibility: hidden'>"
                + kendo.htmlEncode(str) + "</span>";
        },

        date: function(culture, d, part, length) {
            switch (part) {
              case "d":
                switch (length) {
                  case 1: return d.date;
                  case 2: return padLeft(d.date, 2, "0");
                  case 3: return culture.calendars.standard.days.namesAbbr[d.day];
                  case 4: return culture.calendars.standard.days.names[d.day];
                }
                break;
              case "m":
                switch (length) {
                  case 1: return d.month + 1;
                  case 2: return padLeft(d.month + 1, 2, "0");
                  case 3: return culture.calendars.standard.months.namesAbbr[d.month];
                  case 4: return culture.calendars.standard.months.names[d.month];
                  case 5: return culture.calendars.standard.months.names[d.month].charAt(0);
                }
                break;
              case "y":
                switch (length) {
                  case 2: return d.year % 100;
                  case 4: return d.year;
                }
                break;
            }
            return "##";
        },

        time: function(culture, t, part, length, ampm) {
            switch (part) {
              case "h":
                var h = ampm ? t.hours % 12 : t.hours;
                switch (length) {
                  case 1: return h;
                  case 2: return padLeft(h, 2, "0");
                }
                break;
              case "m":
                switch (length) {
                  case 1: return t.minutes;
                  case 2: return padLeft(t.minutes, 2, "0");
                }
                break;
              case "s":
                switch (length) {
                  case 1: return t.seconds;
                  case 2: return padLeft(t.seconds, 2, "0");
                }
                break;
            }
            return "##";
        },

        eltime: function(culture, value, part, length) {
            switch (part) {
              case "h":
                value = value * 24;
                break;
              case "m":
                value = value * 24 * 60;
                break;
              case "s":
                value = value * 24 * 60 * 60;
                break;
            }
            value |= 0;
            switch (length) {
              case 1: return value;
              case 2: return padLeft(value, 2, "0");
            }
            return "##";
        },

        fill: function(ch) {
            // XXX: how to implement this?
            return ch;
        },

        // formatting integer part is slightly different than decimal
        // part, so they're implemented in two functions.  For the
        // integer part we need to walk the value and the format
        // backwards (right-to-left).

        formatInt: function(culture, value, parts, declen, sep) {
            // toFixed is perfect for rounding our value; if there is
            // no format for decimals, for example, we want the number
            // rounded up.
            value = value.toFixed(declen).replace(/\..*$/, "");

            if (declen > 0) {
                // if the rounded number is zero and we have decimal
                // format, consider it a non-significant digit (Excel
                // won't display the leading zero for 0.2 in format
                // #.#).
                if (value === "0") { value = ""; }
                else if (value === "-0") { value = "-"; }
            }

            var iv = value.length - 1;
            var result = [];
            var len = 0, str;

            function add(ch) {
                if (sep && len && len % 3 === 0 && ch != " ") {
                    str = culture.numberFormat[","] + str;
                }
                str = ch + str;
                len++;
            }

            for (var j = parts.length; --j >= 0;) {
                var format = parts[j];
                str = "";
                for (var k = format.length; --k >= 0;) {
                    var chf = format.charAt(k);
                    if (iv < 0) {
                        if (chf == "0") {
                            add("0");
                        } else if (chf == "?") {
                            add(" ");
                        }
                    } else {
                        add(value.charAt(iv--));
                    }
                }
                if (j === 0) {
                    while (iv >= 0) {
                        add(value.charAt(iv--));
                    }
                }
                result.unshift(str);
            }

            return result;
        },

        // for decimal part we walk in normal direction and pad on the
        // right if required (for '0' or '?' chars).

        formatDec: function(culture, value, parts, declen) {
            value = value.toFixed(declen);
            var pos = value.indexOf(".");
            if (pos >= 0) {
                value = value.substr(pos + 1).replace(/0+$/, "");
            } else {
                value = "";
            }

            var iv = 0;
            var result = [];

            for (var j = 0; j < parts.length; ++j) {
                var format = parts[j];
                var str = "";
                for (var k = 0; k < format.length; ++k) {
                    var chf = format.charAt(k);
                    if (iv < value.length) {
                        str += value.charAt(iv++);
                    } else if (chf == "0") {
                        str += "0";
                    } else if (chf == "?") {
                        str += " ";
                    }
                }
                result.push(str);
            }

            return result;
        }
    };

    function padLeft(val, width, ch) {
        val += "";
        while (val.length < width) {
            val = ch + val;
        }
        return val;
    }

    /* -----[ exports ]----- */

    kendo.spreadsheet.formatting = {
        compile : compile,
        parse: parse,
        format: function(value, format, culture) {
            return compile(format)(value, culture);
        },
        type: function(value, format) {
            return compile(format)(value).__dataType;
        },
        adjustDecimals: function(format, diff) {
            var ast = parse(format);
            adjustDecimals(ast, diff);
            return print(ast);
        }
    };

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
