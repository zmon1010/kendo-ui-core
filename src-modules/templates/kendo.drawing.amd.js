(function(f, define){
    define([ "./util", "../kendo.color", '../util/text-metrics' ], f);
})(function(){

(function ($) {

/* jshint eqnull:true */
/* jshint -W069 */
/* jshint latedef: nofunc */

<%= contents %>

kendo.drawing.Segment = kendo.geometry.Segment;
kendo.dataviz.drawing = kendo.drawing;
kendo.dataviz.geometry = kendo.geometry;
kendo.drawing.util.measureText = kendo.util.measureText;
kendo.drawing.util.objectKey = kendo.util.objectKey;
kendo.drawing.Color = kendo.Color;
kendo.util.encodeBase64 = kendo.drawing.util.encodeBase64;

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
