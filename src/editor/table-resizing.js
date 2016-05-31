(function(f, define) {
    define(["./main"], f);
})(function() {

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;
    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var NS = ".kendoEditor";
    var MOUSE_OVER = "mouseover";
    var MOUSE_MOVE = "mousemove";
    var COMMA = ",";
    var TABLE = "table";
    var TD = "td";

    var TableResizing = Class.extend({
        init: function(element, options) {
            var that = this;
            
            that.element = element;

            that.columnResizing = new ColumnResizing($(element).find(TABLE)[0], {});

            if (!$(element).is(TABLE)) {
                $(element).on(MOUSE_OVER + NS, TABLE, function(e) {
                    console.log("table move" + e.currentTarget.id);
                });
            }
        }
    });

    var ColumnResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that._initOptions(options);
            that.options.tags = $.isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;
                
                $(element).on(MOUSE_MOVE + NS, that.options.tags.join(COMMA), function(e) {
                    console.log("column move" + e.currentTarget.id);
                });
            }
        },

        options: {
            tags: [TD]
        }
    });



    extend(Editor, {
        TableResizing: TableResizing,
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
