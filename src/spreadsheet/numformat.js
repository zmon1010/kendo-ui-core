(function(f, define){
    define([ "./calc" ], f);
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
        var sections = [];
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
                return { type: "digit", width: m[0].length };
            }
            if ((m = input.skip(/^\?+/))) {
                return { type: "digit", pad: " ", width: m[0].length };
            }
            // dates
            if ((m = input.skip(/^(d{1,4}|m{1,5}|yy|yyyy)/))) {
                return { type: "date", part: m[1].charAt(0), format: m[1].length };
            }
            // times
            if ((m = input.skip(/^(hh?|mm?|ss?)/))) {
                return { type: "time", part: m[1].charAt(0), format: m[1].length };
            }
            if ((m = input.skip(/^\[(hh?|mm?|ss?)\]/))) {
                return { type: "eltime", part: m[1].charAt(0), format: m[1].length };
            }
            switch ((ch = input.next())) { // JSHint sadness
              case ";":
                return null;
              case "\\":
                // quotes next character
                return { type: "char", value: input.next() };
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
            return { type: "char", value: ch };
        }

        function readSection() {
            return {
                color : maybeColor(),
                cond  : maybeCondition(),
                body  : readFormat()
            };
        }
    }

    function compile(format) {
        // deep thinking...
    }

    ///

    (function(){
        var format = "[blue][>0]#,#.00_) \"something\";[red][<=0](#,#.00)";
        var tree = parse(format);
        console.log(JSON.stringify(tree, null, 2));
    })();

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
