(function(f, define) {
    define(["./main", "../kendo.resizable"], f);
})(function() {

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;
    var isArray = $.isArray;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;

    var NS = ".kendoEditor";
    var RESIZE_HANDLE_CLASS = ".k-resize-handle";
    var BODY = "body";
    var COMMA = ",";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var TABLE = "table";
    var TD = "td";
    var TH = "th";
    var LAST_CHILD = ":last-child";

    var TableResizing = Class.extend({
        init: function(element, options) {
            var that = this;
            
            that._initOptions(options);

            if ($(element).is(TABLE)) {
                that.element = element;
                that.columnResizing = new ColumnResizing(element, {});
            }
        },

        destroy: function() {
            var that = this;
            var element = that.element;
            var columnResizing = that.columnResizing;
            
            if (columnResizing) {
                columnResizing.destroy();
            }
            if (element) {
                $(element).off(NS);
                that.element = null;
            }
        }
    });

    var ColumnResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that._initOptions(options);
            that.options.tags = isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;

                $(element)
                    .on(MOUSE_MOVE + NS, that.options.tags.join(COMMA), proxy(that._detectCellBorderHover, that))
                    .on(MOUSE_LEAVE + NS, that.options.tags.join(COMMA), function(e) {
                        e.stopPropagation();
                        $(e.currentTarget).children(RESIZE_HANDLE_CLASS).off(NS).remove();
                    });
            }
        },

        destroy: function() {
            var that = this;

            if (that.element) {
                $(that.element).find(RESIZE_HANDLE_CLASS).remove();
                $(that.element).off(NS);
                that.element = null;
            }
        },

        options: {
            tags: [TD, TH],
            handle: {
                width: 10,
                height: 10,
                template:
                    '<div class="k-resize-handle">' +
                        '<div class="k-resize-handle-inner"></div>' +
                    '</div>'
            }
        },

        _detectCellBorderHover: function(e) {
            var that = this;
            var handleWidth = that.options.handle.width;
            var cell = $(e.currentTarget);
            var offset = cell.offset();
            var borderLeftOffset = offset.left + cell[0].offsetWidth;
            var clientX = e.clientX;
            var resizeHandle;
            
            if (!cell.is(LAST_CHILD) && (clientX > (borderLeftOffset - handleWidth)) && (clientX < (borderLeftOffset + handleWidth))) {
                that._createResizeHandle(cell);
                that._initResizable(cell);
            }
            else {
                resizeHandle = that.resizeHandle;

                if (resizeHandle) {
                    resizeHandle.hide();
                }
            }
        },

        _createResizeHandle: function(cell) {
            var that = this;
            var options = that.options;
            var handleOptions = options.handle;
            var handleWidth = handleOptions.width;
            var resizeHandle = that.resizeHandle;
            var totalCellsWidth;
            var isRtl = false;

            if (!resizeHandle) {
                resizeHandle = that.resizeHandle = $(handleOptions.template);

                cell.append(resizeHandle);
            }

            if (!isRtl) {
                totalCellsWidth = cell[0].offsetWidth;
            }

            resizeHandle.css({
                top: cell.position().top,
                left: cell.offset().left + totalCellsWidth - (handleWidth / 2),
                width: handleWidth,
                height: cell[0].offsetHeight
            })
            .show();
        },

        _initResizable: function(cell) {
            var that = this;

            that.resizable = $(cell).kendoResizable({
                handle: RESIZE_HANDLE_CLASS
            }).data("kendoResizable");
        }
    });

    extend(Editor, {
        TableResizing: TableResizing,
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
