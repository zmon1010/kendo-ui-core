(function(f, define){
    define([ "./tables" ], f);
})(function(){

(function($, undefined) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    proxy = $.proxy,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    EditorUtils = Editor.EditorUtils,
    RangeUtils = Editor.RangeUtils;

    var EditorImmutables = Class.extend({
        init: function (editor) {
            this.editor = editor;
        },
        
        bindEvents: function(){
            this.editor.bind('execute', proxy(this._executeHandler, this));
        },
        
        _executeHandler: function(e){ 
        }
    });

    Editor.EditorImmutables = EditorImmutables;
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); }); 