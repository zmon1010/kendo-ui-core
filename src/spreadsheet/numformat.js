(function(f, define){
    define([ "./calc", "../util/main" ], f);
})(function(){

    "use strict";

    // WARNING: removing the following jshint declaration and turning
    // == into === to make JSHint happy will break functionality.
    /* jshint eqnull:true, newcap:false, laxbreak:true, shadow:true, -W054 */
    /* global console */

    var calc = kendo.spreadsheet.calc;

    var LITERAL_CHARS = "$£+-/():!^&'~{}<>= ";
    var RX_COLORS = /^\[(black|green|white|blue|magenta|yellow|cyan|red)\]/i;
    var RX_CONDITION = /^\[(<=|>=|<>|<|>|=)([0-9.])\]/;

    /* The proper amount of suffering for whoever designed the Excel
       Custom Number Format would be to have him implement the
       formatter himself. */

    function parse(input) {
        input = calc.InputStream(input);
        var sections = [], haveTimePart = false;
        while (!input.eof()) {
            sections.push(readSection());
        }

        if (sections.length == 1 && !sections[0].cond) {
            sections[1] = sections[2] = sections[0];
        } else if (sections.length == 2 && !sections[0].cond && !sections[1].cond) {
            sections[2] = sections[0];
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
            } else if (sections.length === 0) {
                return { op: ">", value: 0 };
            } else if (sections.length === 1) {
                return { op: "<", value: 0 };
            } else if (sections.length === 2) {
                return { op: "=", value: 0 };
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
            if ((m = input.skip(/^(e)([+-])/i))) {
                return { type: "exp", ch: m[1], sign: m[2] };
            }
            if ((m = input.skip(/^#*0[#0]*/))) {
                return { type: "digit", pad: "0", width: m[0].length };
            }
            if ((m = input.skip(/^#+/))) {
                return { type: "digit", pad: null, width: m[0].length };
            }
            if ((m = input.skip(/^\?+/))) {
                return { type: "digit", pad: " ", width: m[0].length };
            }
            // dates
            if ((m = input.skip(/^(d{1,4}|m{1,5}|yy|yyyy)/i))) {
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
                return { type: "dec" };
              case "%":
                return { type: "percent" };
              case ",":
                return { type: "comma" };
            }

            // XXX: should we allow only LITERAL_CHARS here and error
            // out on invalid input?  The sloppiness of the "spec"
            // makes me believe we should grok any junk we get.
            return { type: "str", value: ch };
        }

        function readSection() {
            return {
                color : maybeColor(),
                cond  : maybeCondition(),
                body  : readFormat()
            };
        }
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
        var separeThousands = false;
        var hasDecimals = false;
        var percentCount = 0;
        var scaleCount = 0;
        var code = "";
        var intDigits = [], decDigits = [];

        if (format.cond) {
            code += "if (typeof value == 'number' && value "
                + format.cond.op + " " + format.cond.value + ") { ";
        } else {
            code += "if (typeof value == 'string') { ";
        }

        // will allow culture to be passed as an argument, but default
        // to current kendo culture
        code += "if (!culture) culture = kendo.culture(); ";

        if (format.color) {
            code += "output += "
                + JSON.stringify("<span style='color: " + format.color + "'>")
                + "; ";
        }

        function checkComma(a, b, c){
            if (a.type == "digit" && b.type == "comma") {
                if (c.type == "digit") {
                    separeThousands = true;
                } else {
                    scaleCount++;
                }
            }
        }

        while (!input.eof()) {
            input.ahead(3, checkComma);
            var tok = input.next();
            if (tok.type == "dec") {
                hasDecimals = true;
            }
            else if (tok.type == "percent") {
                percentCount++;
            }
            else if (tok.type == "digit") {
                if (hasDecimals) {
                    decDigits.push(tok);
                    tok.decimal = true;
                } else {
                    intDigits.push(tok);
                    tok.decimal = false;
                }
            }
        }

        fixWidths(intDigits);
        fixWidths(decDigits);

        if (percentCount > 0) {
            code += "value *= " + Math.pow(100, percentCount) + "; ";
        }
        if (scaleCount > 0) {
            code += "value /= " + Math.pow(1000, scaleCount) + "; ";
        }

        input.restart();
        while (!input.eof()) {
            var tok = input.next();
            if (tok.type == "dec") {
                code += "output += '.'; ";
            }
            else if (tok.type == "percent") {
                code += "output += '%'; ";
            }
            else if (tok.type == "str") {
                code += "output += " + JSON.stringify(tok.value) + "; ";
            }
            else if (tok.type == "text") {
                code += "output += JSON.stringify(value); ";
            }
            else if (tok.type == "space") {
                code += "output += runtime.space(" + JSON.stringify(tok.value) + "); ";
            }
            else if (tok.type == "fill") {
                code += "output += runtime.fill(" + JSON.stringify(tok.value) + "); ";
            }
            else if (tok.type == "digit") {
                code += "output += runtime.digits(culture, value, "
                    + tok.decimal + ", "
                    + separeThousands + ", "
                    + tok.width + ", "
                    + tok.follow + ", "
                    + JSON.stringify(tok.pad)
                    + "); ";
            }
            else if (tok.type == "date" || tok.type == "time" || tok.type == "eltime") {
                code += "output += runtime." + tok.type + "(culture, value, "
                    + JSON.stringify(tok.part) + ", " + tok.format + "); ";
            }
        }

        if (format.color) {
            code += "output += " + JSON.stringify("</span>") + "; ";
        }

        code += "return output; }";

        return code;
    }

    function fixWidths(digits) {
        digits.forEach(function(tok, i){
            var follow = 0;
            while (++i < digits.length) {
                follow += digits[i].width;
            }
            tok.follow = follow;
        });
    }

    var runtime = {
        space: function(str) {
            return "<span style='visibility: hidden'>"
                + kendo.htmlEncode(str) + "</span>";
        },
        date: function(culture, value, part, length) {
            var d = unpackDate(value);
            switch (part) {
              case "d":
                switch (length) {
                  case 1: return d.date;
                  case 2: return pad(d.date, 2, "0");
                  case 3: return culture.calendars.standard.days.namesAbbr[d.day];
                  case 4: return culture.calendars.standard.days.names[d.day];
                }
                break;
              case "m":
                switch (length) {
                  case 1: return d.month + 1;
                  case 2: return pad(d.month + 1, 2, "0");
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
        time: function(culture, value, part, length) {
            var t = unpackTime(value);
            switch (part) {
              case "h":
                switch (length) {
                  case 1: return t.hours;
                  case 2: return pad(t.hours, 2, "0");
                }
                break;
              case "m":
                switch (length) {
                  case 1: return t.minutes;
                  case 2: return pad(t.minutes, 2, "0");
                }
                break;
              case "s":
                switch (length) {
                  case 1: return t.seconds;
                  case 2: return pad(t.seconds, 2, "0");
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
            switch (length) {
              case 1: return value;
              case 2: return pad(value, 2, "0");
            }
            return "##";
        },
        fill: function(culture, value, part, length) {
            // XXX: how to implement this?
        },
        digit: function(culture, value, decimals, separeThousands, width, follow, padding) {
            if (!decimals) {
                value |= 0;
            }
            
        }
    };

    function pad(val, width, ch) {
        val += "";
        while (val.length < width) {
            val = ch + val;
        }
        return val;
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
        return new Date(
            Date.UTC(d.year, d.month, d.date,
                     t.hours, t.minutes, t.seconds, t.milliseconds)
        );
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

    ///

    // false&&(function(){
    //     var format = "[blue][>0]#,#,.00%%_) \"something\";[red][<=0](#,#.00%)";
    //     var tree = parse(format);
    //     console.log(JSON.stringify(tree, null, 2));

    //     var code = compileFormatPart(tree[0]);
    //     console.log(code);

    //     var code = compileFormatPart(tree[1]);
    //     console.log(code);
    // })();

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
