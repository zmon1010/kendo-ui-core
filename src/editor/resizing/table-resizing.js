(function(f, define) {
    define(["../main", "./column-resizing"], f);
})(function() {

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var ColumnResizing = Editor.ColumnResizing;

    var NS = ".kendoEditor";
    var TABLE = "table";

    var TableResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that._initOptions(options);

            if ($(element).is(TABLE)) {
                that.element = element;
                that.columnResizing = new ColumnResizing(element, that.options);
            }
        },

        destroy: function() {
            var that = this;
            var element = that.element;
            var columnResizing = that.columnResizing;
            
            if (columnResizing) {
                columnResizing.destroy();
                that.columnResizing = null;
            }

            if (element) {
                $(element).off(NS);
                that.element = null;
            }
        },

        options: {
            rtl: false
        },

        resizingInProgress: function() {
            var that = this;
            var columnResizing = that.columnResizing;

            if (columnResizing) {
                return !!columnResizing.resizingInProgress();
            }

            return false;
        }
    });

    extend(Editor, {
        TableResizing: TableResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
