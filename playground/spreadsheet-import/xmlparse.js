XML = (function(){

    "use strict";

    var CHAR = String.fromCharCode;

    // XXX: add more here?
    var ENTITIES = {
        "amp"  : "&",
        "lt"   : "<",
        "gt"   : ">",
        "quot" : '"',
        "nbsp" : "\xA0"
    };

    function CODE(str) {
        var out = [];
        for (var i = 0; i < str.length; ++i) {
            out.push(str.charCodeAt(i));
        }
        return out;
    }

    function UCS2(code) {
        if (code > 0xFFFF) {
            code -= 0x10000;
            return CHAR(code >>> 10 & 0x3FF | 0xD800) +
                CHAR(0xDC00 | code & 0x3FF);
        } else {
            return CHAR(code);
        }
    }

    var START_CDATA     = CODE("<![CDATA[");
    var END_CDATA       = CODE("]]>");
    var END_COMMENT     = CODE("-->");
    var START_COMMENT   = CODE("!--");
    var END_SHORT_TAG   = CODE("/>");
    var END_TAG         = CODE("</");
    var END_DECLARATION = CODE("?>");
    var QUESTION_MARK   = CODE("?");
    var LESS_THAN       = CODE("<");
    var GREATER_THAN    = CODE(">");
    var SEMICOLON       = CODE(";");
    var EQUAL           = CODE("=");
    var AMPERSAND       = CODE("&");
    var QUOTE           = CODE('"');
    var SHARP           = CODE("#");
    var LOWERCASE_X     = CODE("x");
    var UPPERCASE_X     = CODE("X");

    function parse(data, callbacks) {
        var index = 0;
        var stack = [];
        var object = {
            is: function(selector) {
                var i = stack.length, j = selector.length;
                while (--i >= 0 && --j >= 0) {
                    if (stack[i].$tag != selector[j]) {
                        return false;
                    }
                }
                return j < 0 ? stack[stack.length - 1] : null;
            },
            stack: stack
        };

        function push(attrs) {
            stack.push(attrs);
        }

        function pop() {
            stack.pop();
        }

        function readByte() {
            return data[index++];
        }

        function peekByte() {
            return data[index];
        }

        function readChar() {
            var code = data[index++];
            if (!(code & 0xF0 ^ 0xF0)) {// 4 bytes
                return UCS2( ((code & 0x03) << 18) |
                             ((data[index++] & 0x3F) << 12) |
                             ((data[index++] & 0x3F) << 6) |
                             (data[index++] & 0x3F) );
            }
            if (!(code & 0xE0 ^ 0xE0)) {// 3 bytes
                return UCS2( ((code & 0x0F) << 12) |
                             ((data[index++] & 0x3F) << 6) |
                             (data[index++] & 0x3F) );
            }
            if (!(code & 0xC0 ^ 0xC0)) {// 2 bytes
                return UCS2( ((code & 0x1F) << 6) |
                             (data[index++] & 0x3F) );
            }
            return CHAR(code);
        }

        function eof() {
            return index >= data.length;
        }

        function croak(msg) {
            throw new Error(msg + ", at " + index);
        }

        function readWhile(pred) {
            var a = [];
            while (!eof() && pred(peekByte())) {
                a.push(readByte());
            }
            return a;
        }

        function readAsciiWhile(pred) {
            return CHAR.apply(null, readWhile(pred));
        }

        function skipWhitespace() {
            readWhile(isWhitespace);
        }

        function eat(a) {
            var save = index;
            for (var i = 0; i < a.length; ++i) {
                if (readByte() != a[i]) {
                    index = save;
                    return false;
                }
            }
            return true;
        }

        function skip(code) {
            if (!eat(code)) {
                croak("Expecting " + code.join(", "));
            }
        }

        function isWhitespace(code) {
            return code == 9 || code == 10 || code == 13 || code == 32;
        }

        function isDigit(code) {
            return code >= 48 && code <= 57;
        }

        function isHexDigit(code) {
            return (code >= 48 && code <= 57)
                || ((code|=32) >= 97 && code <= 102); // a..f or A..F
        }

        function isNameStart(code) {
            return code == 58                         // :
                || code == 95                         // _
                || ((code|=32) >= 97 && code <= 122); // a..z or A..Z
        }

        function isName(code) {
            return code == 45                         // -
                || isDigit(code)
                || isNameStart(code);
        }

        function xmlComment() {
            var body = "";
            while (!eof()) {
                if (eat(END_COMMENT)) {
                    return call("comment", body);
                }
                body += readChar();
            }
        }

        function xmlTag() {
            if (eat(QUESTION_MARK)) {
                return xmlDecl();
            }
            if (eat(START_COMMENT)) {
                return xmlComment();
            }
            var name = xmlName(), attrs = xmlAttrs(name);
            push(attrs);
            if (eat(END_SHORT_TAG)) {
                call("enter", name, attrs, true);
            } else {
                skip(GREATER_THAN);
                call("enter", name, attrs);
                xmlContent(name);
                if (name != xmlName()) {
                    croak("Bad closing tag");
                }
                call("leave", name, attrs);
                skipWhitespace();
                skip(GREATER_THAN);
            }
            pop();
        }

        function xmlContent(name) {
            var body = "";
            while (!eof()) {
                if (eat(END_TAG)) {
                    return body && call("text", body);
                } else if (eat(START_CDATA)) {
                    while (!eof() && !eat(END_CDATA)) {
                        body += readChar();
                    }
                } else if (eat(LESS_THAN)) {
                    body && call("text", body);
                    xmlTag();
                    body = "";
                } else if (eat(AMPERSAND)) {
                    body += xmlEntity();
                } else {
                    body += readChar();
                }
            }
            croak("Unclosed tag " + name);
        }

        function xmlName() {
            if (!isNameStart(peekByte())) {
                croak("Expecting XML name");
            }
            return readAsciiWhile(isName);
        }

        function xmlString() {
            skip(QUOTE);
            var str = "";
            while (!eof()) {
                if (eat(QUOTE)) {
                    return str;
                } else if (eat(AMPERSAND)) {
                    str += xmlEntity();
                } else {
                    str += readChar();
                }
            }
            croak("Unfinished string");
        }

        function xmlEntity() {
            var ret;
            if (eat(SHARP)) {
                if (eat(LOWERCASE_X) || eat(UPPERCASE_X)) {
                    ret = parseInt(readAsciiWhile(isHexDigit), 16);
                } else {
                    ret = parseInt(readAsciiWhile(isDigit), 10);
                }
                if (isNaN(ret)) {
                    croak("Bad numeric entity");
                }
                ret = UCS2(ret);
            } else {
                var name = xmlName();
                ret = ENTITIES[name];
                if (ret == null) {
                    croak("Unknown entity " + name);
                }
            }
            skip(SEMICOLON);
            return ret;
        }

        function xmlDecl() {
            call("decl", xmlName(), xmlAttrs());
            skip(END_DECLARATION);
        }

        function xmlAttrs(name) {
            var map = { $tag: name };
            while (!eof()) {
                skipWhitespace();
                var code = peekByte();
                if (code == 63 || code == 62 || code == 47) { // ?, > or /
                    break;
                }
                map[xmlName()] = ( skip(EQUAL), xmlString() );
            }
            return map;
        }

        function call(what, thing, arg) {
            var f = callbacks && callbacks[what];
            if (f) {
                f.call(object, thing, arg);
            }
        }

        while (!eof()) {
            skipWhitespace();
            skip(LESS_THAN);
            xmlTag();
            skipWhitespace();
        }

    }

    return {
        parse: parse
    };

})();



// //XXX: drop
// if (typeof process != "undefined") {

//     var FS = require("fs");
//     var filename = process.argv[2];

//     function toArrayBuffer(buffer) {
//         var ab = new ArrayBuffer(buffer.length);
//         var view = new Uint8Array(ab);
//         for (var i = 0; i < buffer.length; ++i) {
//             view[i] = buffer[i];
//         }
//         return ab;
//     }

//     var IL = 0;
//     function indent() {
//         var n = IL;
//         var out = "";
//         while (n-- > 0) {
//             out += "  ";
//         }
//         return out;
//     }

//     var data = FS.readFileSync(filename);
//     data = toArrayBuffer(data);
//     data = new Uint8Array(data);
//     XML.parse(data, {
//         decl: function() {
//             console.log(indent() + "*** DECL", arguments);
//         },
//         enter: function() {
//             console.log(indent() + "*** ENTER", arguments);
//             IL++;
//         },
//         leave: function() {
//             IL--;
//             // console.log(indent() + "*** LEAVE", arguments);
//         },
//         text: function(txt) {
//             console.log(indent() + "*** TEXT: [" + txt + "]");
//         },
//         comment: function(txt) {
//             console.log(indent() + "*** COMMENT: [" + txt + "]");
//         }
//     });

// }
