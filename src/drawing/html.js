(function(f, define){
    define([ "./kendo-drawing" ], f);
})(function(){

(function ($) {
    
    var kendo = window.kendo;
    var drawing = kendo.drawing;
    var drawDOM = drawing.drawDOM;

    drawing.drawDOM = function(element, options) {
        return drawDOM($(element)[0], options);
    };

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });