(function(f, define) {
    define(["../main"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var min = math.min;
    var max = math.max;
    var parseFloat = global.parseFloat;

    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;

    var PERCENTAGE = "%";
    var PIXEL = "px";
    var REGEX_NUMBER_IN_PERCENTAGES = /(\d+)(\.?)(\d*)%/;
    var REGEX_NUMBER_IN_PIXELS = /(\d+)(\.?)(\d*)px/;
    var STRING = "string";

    function constrain(options) {
        var value = options.value;
        var lowerBound = options.min;
        var upperBound = options.max;

        return max(min(parseFloat(value), parseFloat(upperBound)), parseFloat(lowerBound));
    }

    function getScrollBarWidth(element) {
        if  (!$(element).is("body") && element.scrollHeight > element.clientHeight) {
            return kendo.support.scrollbar();
        }

        return 0;
    }

    function calculatePercentageRatio(value, total) {
        if (inPercentages(value)) {
            return parseFloat(value);
        }
        else {
            return ((parseFloat(value) / total) * 100);
        }
    }

    function inPercentages(value) {
        return (typeof(value) === STRING && REGEX_NUMBER_IN_PERCENTAGES.test(value));
    }

    function inPixels(value) {
        return (typeof(value) === STRING && REGEX_NUMBER_IN_PIXELS.test(value));
    }

    function toPercentages(value) {
        return (parseFloat(value) + PERCENTAGE);
    }

    function toPixels(value) {
        return (parseFloat(value) + PIXEL);
    }

    var ResizingUtils = {
        constrain: constrain,
        getScrollBarWidth: getScrollBarWidth,
        calculatePercentageRatio: calculatePercentageRatio,
        inPercentages: inPercentages,
        inPixels: inPixels,
        toPercentages: toPercentages,
        toPixels: toPixels
    };

    extend(Editor, {
        ResizingUtils: ResizingUtils
    });
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
