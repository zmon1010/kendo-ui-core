(function(f, define) {
    define(["../main", "./resizing-utils", "./table-element-resizing"], f);
})(function() {

(function(kendo, undefined) {
    var abs = window.Math.abs;

    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;
    var TableElementResizing = Editor.TableElementResizing;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;
    var inPercentages = ResizingUtils.inPercentages;
    var toPixels = ResizingUtils.toPixels;

    var NS = ".kendoEditorRowResizing";
    var RESIZE_HANDLE_CLASS = "k-row-resize-handle";
    var RESIZE_HANDLE_MARKER_WRAPPER_CLASS = "k-row-resize-marker-wrapper";
    var RESIZE_MARKER_CLASS = "k-row-resize-marker";

    var HEIGHT = "height";
    var TR = "tr";
    var TBODY = "tbody";

    var RowResizing = TableElementResizing.extend({
        options: {
            tags: [TR],
            min: 20,
            rootElement: null,
            eventNamespace: NS,
            rtl: false,
            handle: {
                dataAttribute: "row",
                width: 0,
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

        elementBorderHovered: function(tableElement, e) {
            var that = this;
            var handleHeight = that.options.handle.height;
            var borderOffset = tableElement.offset().top + tableElement.outerHeight();
            var mousePosition = e.clientY + $(tableElement[0].ownerDocument).scrollTop();

            if ((mousePosition > (borderOffset - handleHeight)) && (mousePosition < (borderOffset + handleHeight))) {
                return true;
            }
            else {
                return false;
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
            var min = options.min;
            var tableBody =  $(that.element).find(TBODY);
            var tableBodyTopOffset = tableBody.offset().top;
            var resizeHandle = $(that.resizeHandle);
            var row = $(e.currentTarget).data("row");

            var handleOffset = constrain({
                value: resizeHandle.offset().top + e.y.delta,
                min: $(row).offset().top + min,
                max: abs(tableBodyTopOffset + tableBody.outerHeight() - options.handle.height - min)
            });

            resizeHandle.css({ top: handleOffset });
        },

        resize: function(e) { 
            var that = this;
            var options = that.options;
            var row = $(e.currentTarget).data(options.handle.dataAttribute);
            var newRowHeight;
            var currentRowHeight = $(row).outerHeight();
            var element = $(that.element);
            var initialTableHeight = element.outerHeight();

            that._setRowsComputedHeight();

            newRowHeight = constrain({
                value: currentRowHeight + e.y.initialDelta,
                min: options.min,
                max: element.children(TBODY).height()
            });

            row.style[HEIGHT] = toPixels(newRowHeight);

            that._setTableHeight(initialTableHeight + (newRowHeight -currentRowHeight));
        },

        _setRowsComputedHeight: function() {
            var that = this;
            var rows = $(that.element).find(TBODY).children(TR);
            var row;

            for (var i = 0; i < rows.length; i++) {
                row = rows[i];

                if (!inPercentages(row.style[HEIGHT])) {
                    row.style[HEIGHT] = toPixels($(row).outerHeight());
                }
            }
        },

        _setTableHeight: function(newHeight) {
            var element = this.element;

            if (!inPercentages(element.style[HEIGHT])) {
                element.style[HEIGHT] = toPixels(newHeight);
            }
        }
    });

    RowResizing.create = function(editor) {
        return TableElementResizing.initResizing(editor, {
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
