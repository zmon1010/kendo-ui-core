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
        var result;

        if (inPercentages(value)) {
            result = parseFloat(value);
        }
        else {
            result = (parseFloat(value) / total) * 100;
        }

        return result;
    }

    function inPercentages(value) {
        return (typeof(value) === STRING && value.indexOf(PERCENTAGE) !== -1);
    }

    function toPercentages(value) {
        return (parseFloat(value) + PERCENTAGE);
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
        toPercentages: toPercentages,
        inPercentages: inPercentages,
        setContentEditable: setContentEditable
    };

    extend(Editor, {
        ResizingUtils: ResizingUtils
    });
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
