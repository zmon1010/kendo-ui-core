(function(f, define){
    define(['../kendo.core'], f);
})(function(){

(function($) {

    function createPromise() {
        return $.Deferred();
    }

    function promiseAll(promises) {
        return $.when.apply($, promises);
    }

    kendo.drawing.util = kendo.drawing.util || {};
    kendo.deepExtend(kendo.drawing.util, {
        createPromise: createPromise,
        promiseAll: promiseAll
    });

})(jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });