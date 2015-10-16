(function(f, define) {
    define([
        "../kendo.core"
    ], f);
})(function() {

(function () {
    // Imports ================================================================
    var math = Math,
        kendo = window.kendo,
        deepExtend = kendo.deepExtend;

    // Constants
    var DEG_TO_RAD = math.PI / 180,
        MAX_NUM = Number.MAX_VALUE,
        MIN_NUM = -Number.MAX_VALUE,
        UNDEFINED = "undefined";

    // Generic utility functions ==============================================
    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    function round(value, precision) {
        var power = pow(precision);
        return math.round(value * power) / power;
    }

    // Extracted from round to get on the V8 "fast path"
    function pow(p) {
        if (p) {
            return math.pow(10, p);
        } else {
            return 1;
        }
    }

    function limitValue(value, min, max) {
        return math.max(math.min(value, max), min);
    }

    function rad(degrees) {
        return degrees * DEG_TO_RAD;
    }

    function deg(radians) {
        return radians / DEG_TO_RAD;
    }

    function isNumber(val) {
        return typeof val === "number" && !isNaN(val);
    }

    function valueOrDefault(value, defaultValue) {
        return defined(value) ? value : defaultValue;
    }

    function sqr(value) {
        return value * value;
    }

    function objectKey(object) {
        var parts = [];
        for (var key in object) {
            parts.push(key + object[key]);
        }

        return parts.sort().join("");
    }

    // Computes FNV-1 hash
    // See http://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function
    function hashKey(str) {
        // 32-bit FNV-1 offset basis
        // See http://isthe.com/chongo/tech/comp/fnv/#FNV-param
        var hash = 0x811C9DC5;

        for (var i = 0; i < str.length; ++i)
        {
            hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
            hash ^= str.charCodeAt(i);
        }

        return hash >>> 0;
    }

    function hashObject(object) {
        return hashKey(objectKey(object));
    }

    var now = Date.now;
    if (!now) {
        now = function() {
            return new Date().getTime();
        };
    }

    // Array helpers ==========================================================
    function arrayLimits(arr) {
        var length = arr.length,
            i,
            min = MAX_NUM,
            max = MIN_NUM;

        for (i = 0; i < length; i ++) {
            max = math.max(max, arr[i]);
            min = math.min(min, arr[i]);
        }

        return {
            min: min,
            max: max
        };
    }

    function arrayMin(arr) {
        return arrayLimits(arr).min;
    }

    function arrayMax(arr) {
        return arrayLimits(arr).max;
    }

    function sparseArrayMin(arr) {
        return sparseArrayLimits(arr).min;
    }

    function sparseArrayMax(arr) {
        return sparseArrayLimits(arr).max;
    }

    function sparseArrayLimits(arr) {
        var min = MAX_NUM,
            max = MIN_NUM;

        for (var i = 0, length = arr.length; i < length; i++) {
            var n = arr[i];
            if (n !== null && isFinite(n)) {
                min = math.min(min, n);
                max = math.max(max, n);
            }
        }

        return {
            min: min === MAX_NUM ? undefined : min,
            max: max === MIN_NUM ? undefined : max
        };
    }

    function last(array) {
        if (array) {
            return array[array.length - 1];
        }
    }

    function append(first, second) {
        first.push.apply(first, second);
        return first;
    }

    // Template helpers =======================================================
    function renderTemplate(text) {
        return kendo.template(text, { useWithBlock: false, paramName: "d" });
    }

    function renderAttr(name, value) {
        return (defined(value) && value !== null) ? " " + name + "='" + value + "' " : "";
    }

    function renderAllAttr(attrs) {
        var output = "";
        for (var i = 0; i < attrs.length; i++) {
            output += renderAttr(attrs[i][0], attrs[i][1]);
        }

        return output;
    }

    function renderStyle(attrs) {
        var output = "";
        for (var i = 0; i < attrs.length; i++) {
            var value = attrs[i][1];
            if (defined(value)) {
                output += attrs[i][0] + ":" + value + ";";
            }
        }

        if (output !== "") {
            return output;
        }
    }

    function renderSize(size) {
        if (typeof size !== "string") {
            size += "px";
        }

        return size;
    }

    function renderPos(pos) {
        var result = [];

        if (pos) {
            var parts = kendo.toHyphens(pos).split("-");

            for (var i = 0; i < parts.length; i++) {
                result.push("k-pos-" + parts[i]);
            }
        }

        return result.join(" ");
    }

    function isTransparent(color) {
        return color === "" || color === null || color === "none" || color === "transparent" || !defined(color);
    }

    function arabicToRoman(n) {
        var literals = {
            1    : "i",       10   : "x",       100  : "c",
            2    : "ii",      20   : "xx",      200  : "cc",
            3    : "iii",     30   : "xxx",     300  : "ccc",
            4    : "iv",      40   : "xl",      400  : "cd",
            5    : "v",       50   : "l",       500  : "d",
            6    : "vi",      60   : "lx",      600  : "dc",
            7    : "vii",     70   : "lxx",     700  : "dcc",
            8    : "viii",    80   : "lxxx",    800  : "dccc",
            9    : "ix",      90   : "xc",      900  : "cm",
            1000 : "m"
        };
        var values = [ 1000,
                       900 , 800, 700, 600, 500, 400, 300, 200, 100,
                       90  , 80 , 70 , 60 , 50 , 40 , 30 , 20 , 10 ,
                       9   , 8  , 7  , 6  , 5  , 4  , 3  , 2  , 1 ];
        var roman = "";
        while (n > 0) {
            if (n < values[0]) {
                values.shift();
            } else {
                roman += literals[values[0]];
                n -= values[0];
            }
        }
        return roman;
    }

    function romanToArabic(r) {
        r = r.toLowerCase();
        var digits = {
            i: 1,
            v: 5,
            x: 10,
            l: 50,
            c: 100,
            d: 500,
            m: 1000
        };
        var value = 0, prev = 0;
        for (var i = 0; i < r.length; ++i) {
            var v = digits[r.charAt(i)];
            if (!v) {
                return null;
            }
            value += v;
            if (v > prev) {
                value -= 2 * prev;
            }
            prev = v;
        }
        return value;
    }

    function memoize(f) {
        var cache = Object.create(null);
        return function() {
            var id = "";
            for (var i = arguments.length; --i >= 0;) {
                id += ":" + arguments[i];
            }
            if (id in cache) {
                return cache[id];
            }
            return f.apply(this, arguments);
        };
    }

    // Exports ================================================================
    deepExtend(kendo, {
        util: {
            MAX_NUM: MAX_NUM,
            MIN_NUM: MIN_NUM,

            append: append,
            arrayLimits: arrayLimits,
            arrayMin: arrayMin,
            arrayMax: arrayMax,
            defined: defined,
            deg: deg,
            hashKey: hashKey,
            hashObject: hashObject,
            isNumber: isNumber,
            isTransparent: isTransparent,
            last: last,
            limitValue: limitValue,
            now: now,
            objectKey: objectKey,
            round: round,
            rad: rad,
            renderAttr: renderAttr,
            renderAllAttr: renderAllAttr,
            renderPos: renderPos,
            renderSize: renderSize,
            renderStyle: renderStyle,
            renderTemplate: renderTemplate,
            sparseArrayLimits: sparseArrayLimits,
            sparseArrayMin: sparseArrayMin,
            sparseArrayMax: sparseArrayMax,
            sqr: sqr,
            valueOrDefault: valueOrDefault,
            romanToArabic: romanToArabic,
            arabicToRoman: arabicToRoman,
            memoize: memoize
        }
    });

    kendo.drawing.util = kendo.util;
    kendo.dataviz.util = kendo.util;

})();

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
