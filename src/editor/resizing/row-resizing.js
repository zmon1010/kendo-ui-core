(function(f, define) {
    define(["../main", "../../kendo.resizable", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var abs = math.abs;
    var parseFloat = global.parseFloat;

    var $ = kendo.jQuery;
    var extend = $.extend;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    
    var COMMA = ",";
    var MOUSE_MOVE = "mousemove";
    var NS = ".kendoEditorRowResizing";
    var ROW = "tr";
    var TABLE = "table";

    var RowResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that._initOptions(options);
            that.options.tags = $.isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;
                $(element).on(MOUSE_MOVE + NS, that.options.tags.join(COMMA), proxy(that._detectRowBorderHovering, that));
            }
        },

        destroy: function() {
            var that = this;

            $(that.element).off(NS);
            that.element = null;
        },

        options: {
            tags: [ROW]
        },

        _detectRowBorderHovering: function() {

        }
    });

    extend(Editor, {
        RowResizing: RowResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
