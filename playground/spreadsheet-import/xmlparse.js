XML = (function(){

    "use strict";

    var CHAR = String.fromCharCode;
    var CODE_LT = 60;                  // <
    var CODE_GT = 62;                  // >
    var CODE_QM = 63;                  // ?
    var CODE_A = 65;                   // A
    var CODE_Z = 90;                   // Z
    var CODE_a = 97;                   // a
    var CODE_z = 122;                  // z
    var CODE_x = 120;                  // x
    var CODE_X = 88;                   // X
    var CODE_COLON = 58;               // :
    var CODE_DASH = 45;                // -
    var CODE_UNDERSCORE = 95;          // _
    var CODE_EQ = 61;                  // =
    var CODE_QUOTE = 34;               // "
    var CODE_AMP = 38;                 // &
    var CODE_SMC = 59;                 // ;
    var CODE_SHARP = 35;               // #
    var CODE_SLASH = 47;               // /

    // XXX: add more here?
    var ENTITIES = {
        "amp"  : "&",
        "lt"   : "<",
        "gt"   : ">",
        "quot" : '"',
        "nbsp" : "\xA0"
    };

    function UCS2(code) {
        if (code > 0xFFFF) {
            code -= 0x10000;
            return CHAR(code >>> 10 & 0x3FF | 0xD800) +
                CHAR(0xDC00 | code & 0x3FF);
        } else {
            return CHAR(code);
        }
    }

    function parse(data, callbacks) {
        var index = 0;

        function readByte() {
            return data[index++];
        }

        function peekByte() {
            return data[index];
        }

        // function peekChar() {
        //     var code = data[index];
        //     if (!(code & 0xF0 ^ 0xF0)) {// 4 bytes
        //         return UCS2( ((code & 0x03) << 18) |
        //                      ((data[index+1] & 0x3F) << 12) |
        //                      ((data[index+2] & 0x3F) << 6) |
        //                      (data[index+3] & 0x3F) );
        //     }
        //     if (!(code & 0xE0 ^ 0xE0)) {// 3 bytes
        //         return UCS2( ((code & 0x0F) << 12) |
        //                      ((data[index+1] & 0x3F) << 6) |
        //                      (data[index+2] & 0x3F) );
        //     }
        //     if (!(code & 0xC0 ^ 0xC0)) {// 2 bytes
        //         return UCS2( ((code & 0x1F) << 6) |
        //                      (data[index+1] & 0x3F) );
        //     }
        //     return CHAR(code);
        // }

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

        function skip(code) {
            if (peekByte() != code) {
                croak("Expecting " + CHAR(code));
            }
            readByte();
        }

        function eat() {
            var save = index;
            for (var i = 0; i < arguments.length; ++i) {
                if (readByte() != arguments[i]) {
                    index = save;
                    return false;
                }
            }
            return true;
        }

        function lookingAt() {
            var save = index;
            for (var i = 0; i < arguments.length; ++i) {
                if (readByte() != arguments[i]) {
                    index = save;
                    return false;
                }
            }
            index = save;
            return true;
        }

        function isWhitespace(code) {
            return code == 9 || code == 10 || code == 13 || code == 32;
        }

        function isDigit(code) {
            return code >= 48 && code <= 57;
        }

        function isNameStartChar(code) {
            return (code >= CODE_A && code <= CODE_Z)
                || (code >= CODE_a && code <= CODE_z)
                || code == CODE_COLON
                || code == CODE_UNDERSCORE;
        }

        function isNameChar(code) {
            return code == CODE_DASH
                || isDigit(code)
                || isNameStartChar(code);
        }

        function xmlTag() {
            skipWhitespace();
            skip(CODE_LT);
            if (eat(CODE_QM)) {
                return xmlDecl();
            }
            var name = xmlName(), attrs = xmlAttrs();
            if (eat(CODE_SLASH, CODE_GT)) {
                call("tag", name, attrs);
            } else {
                call("enter", name, attrs);
                skip(CODE_GT);
                xmlContent();
                if (name != xmlName()) {
                    croak("Bad closing tag");
                }
                skipWhitespace();
                skip(CODE_GT);
                call("leave", name, attrs);
            }
        }

        function xmlContent() {
            var content = "";
            while (!eof()) {
                if (eat(CODE_LT, CODE_SLASH)) {
                    call("text", content);
                    return;
                } else if (lookingAt(CODE_LT)) {
                    xmlTag();
                } else if (lookingAt(CODE_AMP)) {
                    content += xmlEntity();
                } else {
                    content += readChar();
                }
            }
        }

        function xmlName() {
            if (!isNameStartChar(peekByte())) {
                croak("Expecting XML name");
            }
            return readAsciiWhile(isNameChar);
        }

        function xmlString() {
            skip(CODE_QUOTE);
            var str = "";
            while (!eof()) {
                var code = peekByte();
                if (code == CODE_QUOTE) {
                    break;
                } else if (code == CODE_AMP) {
                    str += xmlEntity();
                } else {
                    str += readChar();
                }
            }
            skip(CODE_QUOTE);
            return str;
        }

        function xmlEntity() {
            skip(CODE_AMP);
            var ret;
            if (eat(CODE_SHARP)) {
                if (eat(CODE_x) || eat(CODE_X)) {
                    ret = parseInt(readAsciiWhile(function(code){
                        return /[0-9a-f]/i.test(CHAR(code)); // XXX: "optimize"?
                    }), 16);
                } else {
                    ret = parseInt(readAsciiWhile(isDigit), 10);
                }
                if (isNaN(ret)) {
                    croak("Bad number entity");
                }
                ret = UCS2(ret);
            } else {
                ret = ENTITIES[xmlName()];
                if (ret == null) {
                    croak("Unknown entity");
                }
            }
            skip(CODE_SMC);
            return ret;
        }

        function xmlDecl() {
            call("decl", xmlName(), xmlAttrs());
            skip(CODE_QM);
            skip(CODE_GT);
        }

        function xmlAttr(map) {
            var name = xmlName();
            skipWhitespace();
            skip(CODE_EQ);
            skipWhitespace();
            var value = xmlString();
            map[name] = value;
        }

        function xmlAttrs() {
            var map = {};
            while (!eof()) {
                skipWhitespace();
                var code = peekByte();
                if (code == CODE_QM || code == CODE_GT || code == CODE_SLASH) {
                    break;
                }
                xmlAttr(map);
            }
            return map;
        }

        function call(what, thing, name) {
            var f = callbacks && callbacks[what];
            if (f) {
                f(thing, name);
            }
        }

        while (!eof()) {
            xmlTag();
        }

    }

    return {
        parse: parse
    };

})();





var FS = require("fs");
var filename = process.argv[2];

function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

var data = FS.readFileSync(filename);
data = toArrayBuffer(data);
data = new Uint8Array(data);
XML.parse(data, {
    decl: function() {
        console.log("*** DECL");
        console.log(arguments);
    },
    enter: function() {
        console.log("*** ENTER");
        console.log(arguments);
    },
    leave: function() {
        console.log("*** LEAVE");
        console.log(arguments);
    },
    text: function(txt) {
        console.log("*** TEXT");
        console.log(txt);
    }
});
