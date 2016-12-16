(function(f, define){
    define([
        "../kendo.core",
        "../kendo.color",
        "../kendo.drawing"
    ], f);
}) (function(){

(function(kendo){

// WARNING: removing the following jshint declaration and turning
// == into === to make JSHint happy will break functionality.
/* jshint eqnull:true */
/* jshint -W069 */
/* jshint loopfunc:true */
/* jshint newcap:false */
/* jshint latedef: nofunc */

<%= contents %>

kendo.drawing.exportPDF = kendo.pdf.exportPDF;
kendo.drawing.pdf = kendo.pdf;

})(kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
