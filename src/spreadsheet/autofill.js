// -*- fill-column: 100 -*-

(function(f, define){
    define([ "./runtime", "./range" ], f);
})(function(){
    "use strict";

    // jshint eqnull:true

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var spreadsheet = kendo.spreadsheet;
    var Range = spreadsheet.Range;
    var runtime = spreadsheet.calc.runtime;
    var Formula = runtime.Formula;

    // `srcRange`: the range containing data that we wish to fill.  `direction`: 0↓, 1→, 2↑, 3←.  So
    // when bit 0 is set we're doing horizontal filling, and when bit 1 is set we're doing it in
    // reverse order.
    Range.prototype.fillFrom = function(srcRange, direction) {
        if (typeof srcRange == "string") {
            srcRange = this._sheet.range(srcRange);
        }
        var n, src = srcRange._ref.toRangeRef();
        var dest = this._ref.toRangeRef();
        var data = srcRange._properties();
        if (direction == null) {
            // try to determine based on ranges location/geometry
            if (src.topLeft.col == dest.topLeft.col) {
                // assume vertical filling
                direction = src.topLeft.row < dest.topLeft.row ? 0 : 2;
            } else if (src.topLeft.row == dest.topLeft.row) {
                direction = src.topLeft.col < dest.topLeft.col ? 1 : 3;
            } else {
                throw new Error("Cannot determine fill direction");
            }
        }
        var horizontal = direction & 1;
        var descending = direction & 2;
        if ((horizontal && src.height() != dest.height()) ||
            (!horizontal && src.width() != dest.width())) {
            throw new Error("Incompatible auto-fill ranges");
        }
        if (!horizontal) {
            data = transpose(data);
            n = dest.height();
        } else {
            n = dest.width();
        }
        var fill = new Array(data.length);
        for (var i = 0; i < data.length; ++i) {
            var s = data[i];
            var f = findSeries(s);
            var a = fill[i] = new Array(n);
            for (var j = 0; j < n; ++j) {
                var idx = descending ? -j - 1 : s.length + j;
                var srcIdx = descending ? s.length - (j % s.length) - 1 : (j % s.length);
                a[descending ? n - j - 1 : j] = f(idx, srcIdx);
            }
        }
        if (!horizontal) {
            fill = transpose(fill);
        }
        this._properties(fill);
        return this;
    };

    // This is essentially the FORECAST function, see ./runtime.functions.2.js.
    // It receives an array of values, and returns a function that "predicts"
    // the value in cell N.
    function linearRegression(data) {
        var N = data.length;
        var mx = (N + 1) / 2, my = data.reduce(function(a, b){
            return a + b;
        }, 0) / N;
        var s1 = 0, s2 = 0;
        for (var i = 0; i < N; i++) {
            var t1 = (i + 1) - mx, t2 = data[i] - my;
            s1 += t1 * t2;
            s2 += t1 * t1;
        }
        if (!s2) {
            return function(N){
                return data[N % data.length];
            };
        }
        var b = s1 / s2, a = my - b * mx;
        return function(N) {
            return a + b * (N + 1);
        };
    }

    function findSeries(properties) {
        function findStep(a) {
            var diff = a[1] - a[0];
            for (var i = 2; i < a.length; ++i) {
                if (a[i] - a[i-1] != diff) {
                    return null;
                }
            }
            return diff;
        }
        function getData(a) {
            return a.map(function(v){
                return v.number;
            });
        }
        var series = [];
        var data = properties.map(function(x){
            return x.formula || x.value;
        });
        forEachSeries(data, function(begin, end, type, a){
            var f, values;
            if (type == "number") {
                values = getData(a);
                if (values.length == 1 && (begin > 0 || end < data.length || properties[begin].format)) {
                    values.push(values[0] + 1);
                }
                f = linearRegression(values);
            } else if (type == "string" || type == "formula") {
                // formulas are simply copied over; the sheet will internally clone the objects
                f = function(N, i) {
                    return data[i];
                };
            } else if (Array.isArray(type)) {
                if (a.length == 1) {
                    f = function(N) {
                        return type[(a[0].number + N) % type.length];
                    };
                } else {
                    // figure out the step
                    var diff = findStep(getData(a));
                    if (diff == null) {
                        // seemingly no pattern, just repeat those strings
                        f = function(N) {
                            return a[(N) % a.length].value;
                        };
                    } else {
                        f = function(N) {
                            var idx = a[0].number + diff * N;
                            return type[idx % type.length];
                        };
                    }
                }
            } else if (type != "null") {
                values = getData(a);
                if (values.length == 1) {
                    values.push(values[0] + 1);
                }
                values = linearRegression(values);
                f = function(N, i) {
                    return data[i].replace(/^(.*\D)\d+/, "$1" + values(N, i));
                };
            } else {
                f = function() { return null; };
            }
            var s = { f: f, begin: begin, end: end, len: end - begin };
            for (var i = begin; i < end; ++i) {
                series[i] = s;
            }
        });
        return function(N, i) {
            var s = series[i];
            var q = N / data.length | 0;
            var r = N % data.length;
            var n = q * s.len + r - s.begin;
            var value = s.f(n, i);
            var props = clone(properties[i]);
            if (value instanceof Formula) {
                props.formula = value;
            } else {
                props.value = value;
            }
            return props;
        };
    }

    function clone(obj) {
        var copy = {};
        Object.keys(obj || {}).forEach(function(key){
            copy[key] = obj[key];
        });
        return copy;
    }

    function forEachSeries(data, f) {
        var prev = null, start = 0, a = [], type;
        for (var i = 0; i < data.length; ++i) {
            type = getType(data[i]);
            a.push(type);
            if (prev != null && type.type !== prev.type) {
                f(start, i, prev.type, a.slice(start, i));
                start = i;
            }
            prev = type;
        }
        f(start, i, prev.type, a.slice(start, i));
    }

    function getType(el) {
        if (typeof el == "number") {
            return { type: "number", number: el };
        }
        if (typeof el == "string") {
            var lst = findStringList(el);
            if (lst) {
                return lst;
            }
            var m = /^(.*\D)(\d+)/.exec(el);
            if (m) {
                el = el.replace(/^(.*\D)\d+/, "$1-######");
                return { type: el, match: m, number: parseFloat(m[2]) };
            }
            return { type: "string" };
        }
        if (typeof el == "boolean") {
            return { type: "boolean" };
        }
        if (el == null) {
            return { type: "null" };
        }
        if (el instanceof Formula) {
            return { type: "formula" };
        }
        window.console.error(el);
        throw new Error("Cannot fill data");
    }

    function stringLists() {
        var culture = kendo.culture();
        return [
            culture.calendars.standard.days.namesAbbr,
            culture.calendars.standard.days.names,
            culture.calendars.standard.months.namesAbbr,
            culture.calendars.standard.months.names
        ];
    }

    function findStringList(str) {
        var strl = str.toLowerCase();
        var lists = stringLists();
        for (var i = 0; i < lists.length; ++i) {
            var a = lists[i];
            for (var j = a.length; --j >= 0;) {
                var el = a[j].toLowerCase();
                if (el == strl) {
                    return { type: a, number: j, value: str };
                }
            }
        }
    }

    function transpose(a) {
        var height = a.length, width = a[0].length;
        var t = [];
        for (var i = 0; i < width; ++i) {
            t[i] = [];
            for (var j = 0; j < height; ++j) {
                t[i][j] = a[j][i];
            }
        }
        return t;
    }

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
