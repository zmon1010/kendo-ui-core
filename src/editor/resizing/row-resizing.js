(function(f, define) {
    define(["../main", "../../kendo.draggable", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var abs = window.Math.abs;

    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;

    var NS = ".kendoEditorRowResizing";
    var RESIZE_HANDLE_CLASS = "k-row-resize-handle";
    var RESIZE_HANDLE_MARKER_WRAPPER_CLASS = "k-row-resize-marker-wrapper";
    var RESIZE_MARKER_CLASS = "k-row-resize-marker";

    var TR = "tr";
    var TBODY = "tbody";

    var RowResizing = Editor.TableElementResizing.extend({
        options: {
            tags: [TR],
            min: 20,
            rootElement: null,
            eventNamespace: NS,
            rtl: false,
            handle: {
                axis: "y",
                dataAttribute: "row",
                resizeDimension: "height",
                offset: "top",
                scrollOffset: "top",
                eventCoordinate: "clientY",
                height: 10,
                classNames: {
                    handle: RESIZE_HANDLE_CLASS,
                    marker: RESIZE_MARKER_CLASS
                },
                template:
                    '<div class="' + RESIZE_HANDLE_CLASS + '">' +
                        '<div class="' + RESIZE_HANDLE_MARKER_WRAPPER_CLASS + '">' +
                            '<div class="' + RESIZE_MARKER_CLASS + '"></div>' +
                        '</div>'+
                    '</div>'
            }
        },

        setResizeHandlePosition: function(row) {
            var that = this;
            var options = that.options;
            var handleHeight = options.handle.height;
            var rowPosition = row.position();

            that.resizeHandle.css({
                top: rowPosition.top + row.outerHeight() - (handleHeight / 2),
                left: rowPosition.left,
                position: "absolute"
            });
        },

        setResizeHandleDimensions: function() {
            var that = this;

            that.resizeHandle.css({
                width: $(that.element).children(TBODY).width(),
                height: that.options.handle.height
            });
        },

        setResizeHandleDragPosition: function(e) {
            var that = this;
            var options = that.options;
            var handleOptions = options.handle;
            var min = options.min;
            var tableBody =  $(that.element).find(TBODY);
            var tableBodyTopOffset = tableBody.offset().top;
            var resizeHandle = $(that.resizeHandle);

            var handleOffset = constrain({
                value: resizeHandle.offset().top + e.y.delta,
                min: abs(tableBodyTopOffset + min),
                max: abs(tableBodyTopOffset + tableBody.outerHeight() - handleOptions.height - min)
            });

            resizeHandle.css("top", handleOffset);
        }
    });

    RowResizing.create = function(editor) {
        return Editor.TableElementResizing.initResizing(editor, {
            name: "rowResizing",
            type: RowResizing,
            eventNamespace: NS
        });
    };

    extend(Editor, {
        RowResizing: RowResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
