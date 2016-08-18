(function(f, define) {
    define(["../main", "../../kendo.resizable", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var ResizingUtils = Editor.ResizingUtils;
    var setContentEditable = ResizingUtils.setContentEditable;

    var NS = ".kendoEditorRowResizing";
    var RESIZE_HANDLE_CLASS = "k-row-resize-handle";
    var RESIZE_HINT_MARKER_CLASS = "k-row-resize-hint-marker";

    var MOUSE_DOWN = "mousedown";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";

    var TR = "tr";
    var TABLE = "table";
    var TBODY = "tbody";

    var COMMA = ",";
    var DOT = ".";
    var LAST_CHILD = ":last-child";
    var ROW = "row";

    var TRUE = "true";
    var FALSE = "false";

    var RowResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that.options = extend({}, that.options, options);
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

            that._destroyResizeHandle();
        },

        options: {
            tags: [TR],
            min: 20,
            rootElement: null,
            rtl: false,
            handle: {
                height: 10,
                template:
                    '<div class="' + RESIZE_HANDLE_CLASS + '">' +
                        '<div class="' + RESIZE_HINT_MARKER_CLASS + '"></div>' +
                    '</div>'
            }
        },

        resizingInProgress: function() {
            var that = this;
            var resizable = that.resizable;

            if (resizable) {
                return !!resizable.resizing;
            }

            return false;
        },

        _detectRowBorderHovering: function(e) {
            var that = this;
            var row = $(e.currentTarget);
            var resizeHandle = that.resizeHandle;
            var rootElement = that.options.rootElement;

            if (!that.resizingInProgress()) {
                if (!row.is(LAST_CHILD) && that._rowBorderHovered(row, e.clientY)) {
                    setContentEditable(rootElement, FALSE);

                    if (resizeHandle) {
                        if (resizeHandle.data(ROW) && resizeHandle.data(ROW) !== row[0]) {
                            that._initResizeHandle(row);
                        }
                    }
                    else {
                        that._initResizeHandle(row);
                    }
                }
                else {
                    if (resizeHandle) {
                        setContentEditable(rootElement, TRUE);
                        that._destroyResizeHandle();
                    }
                }
            }
        },

        _rowBorderHovered: function(tableElement, clientY) {
            var that = this;
            var options = that.options;
            var handleHeight = options.handle.height;
            var borderLeftOffset = tableElement.offset().top + tableElement.outerHeight();
            var mousePosition = clientY + $(tableElement[0].ownerDocument).scrollTop();

            if ((mousePosition > (borderLeftOffset - handleHeight)) && (mousePosition < (borderLeftOffset + handleHeight))) {
                return true;
            }
            else {
                return false;
            }
        },

        _initResizeHandle: function(tableElement) {
            var that = this;
            var tableBody = $(that.element).children(TBODY);
            var options = that.options;
            var handleOptions = options.handle;
            var handleHeight = handleOptions.height;

            that._destroyResizeHandle();

            that.resizeHandle = $(handleOptions.template).appendTo(options.rootElement);

            that.resizeHandle.css({
                top: tableElement.position().top + tableElement.outerHeight() - (handleHeight / 2),
                left: tableElement.position().left,
                width: tableBody.width(),
                height: handleHeight,
                position: "absolute"
            })
            .data(ROW, tableElement[0])
            .show()
            .on(MOUSE_DOWN + NS, function() {
                $(this).children(DOT + RESIZE_HINT_MARKER_CLASS).show();
            })
            .on(MOUSE_UP + NS, function() {
                $(this).children(DOT + RESIZE_HINT_MARKER_CLASS).hide();
            });

            that.resizeHandle.children(DOT + RESIZE_HINT_MARKER_CLASS).hide();
        },

        _destroyResizeHandle: function() {
            var that = this;

            if (that.resizeHandle) {
                that.resizeHandle.off(NS).remove();
                that.resizeHandle = null;
            }
        }
    });

    extend(Editor, {
        RowResizing: RowResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
