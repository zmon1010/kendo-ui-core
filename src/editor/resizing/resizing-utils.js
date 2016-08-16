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

    var CONTENT_EDITABLE = "contenteditable";
    var PERCENTAGE = "%";
    var PIXEL = "px";
    var REGEX_NUMBER_IN_PERCENTAGES = /(\d+)(\.?)(\d*)%/;
    var REGEX_NUMBER_IN_PIXELS = /(\d+)(\.?)(\d*)px/;
    var STRING = "string";
    var UNDEFINED = "undefined";
    var WIDTH = "width";

    function constrain(options) {
        var value = options.value;
        var lowerBound = options.min;
        var upperBound = options.max;

        return max(min(parseFloat(value), parseFloat(upperBound)), parseFloat(lowerBound));
    }

    function getElementWidth(element) {
        return (element.style[WIDTH] !== "" ? element.style[WIDTH] : $(element).width());
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

    function setContentEditable(domElement, enabled) {
        var element = $(domElement);

        if (element && (typeof(element.attr(CONTENT_EDITABLE)) !== UNDEFINED)) {
            element.attr(CONTENT_EDITABLE, enabled);
        }
    }

    var ResizingUtils = {
        constrain: constrain,
        getElementWidth: getElementWidth,
        calculatePercentageRatio: calculatePercentageRatio,
        inPercentages: inPercentages,
        inPixels: inPixels,
        setContentEditable: setContentEditable,
        toPercentages: toPercentages,
        toPixels: toPixels
    };

    extend(Editor, {
        ResizingUtils: ResizingUtils
    });
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
