(function(f, define) {
    define(["../main", "./resizing-utils", "./table-element-resizing"], f);
})(function() {

(function(kendo, undefined) {
    var math = window.Math;
    var abs = math.abs;

    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;
    var TableElementResizing = Editor.TableElementResizing;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;
    var calculatePercentageRatio = ResizingUtils.calculatePercentageRatio;
    var inPercentages = ResizingUtils.inPercentages;
    var toPercentages = ResizingUtils.toPercentages;
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
            var handleHeight = that.options.handle[HEIGHT];
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
            var handleHeight = options.handle[HEIGHT];
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
                height: that.options.handle[HEIGHT]
            });
        },

        setResizeHandleDragPosition: function(e) {
            var that = this;
            var options = that.options;
            var min = options.min;
            var tableBody =  $(that.element).children(TBODY);
            var tableBodyTopOffset = tableBody.offset().top;
            var resizeHandle = $(that.resizeHandle);
            var row = $(e.currentTarget).data(options.handle.dataAttribute);

            var handleOffset = constrain({
                value: resizeHandle.offset().top + e.y.delta,
                min: $(row).offset().top + min,
                max: abs(tableBodyTopOffset + tableBody.outerHeight() - options.handle[HEIGHT] - min)
            });

            resizeHandle.css({ top: handleOffset });
        },

        resize: function(e) { 
            var that = this;
            var options = that.options;
            var row = $(e.currentTarget).data(options.handle.dataAttribute);
            var currentRowHeight = $(row).outerHeight();
            var element = $(that.element);
            var initialTableHeight = element.outerHeight();
            var tableBody = element.children(TBODY);
            var tableBodyHeight = tableBody.height();
            var initialStyleHeight = row.style[HEIGHT];
            var newRowHeight = constrain({
                value: currentRowHeight + e.y.initialDelta,
                min: options.min,
                max: abs(tableBodyHeight - options.min)
            });

            that._setRowsHeightInPixels();
            row.style[HEIGHT] = toPixels(newRowHeight);
            that._setTableHeight(initialTableHeight + (newRowHeight - currentRowHeight));

            if (inPercentages(initialStyleHeight)) {
                //resize rows in percentages as late as possible to prevent incorrect precision calculations
                that._setRowsHeightInPercentages();
            }
        },

        _setRowsHeightInPixels: function() {
            var that = this;
            var rows = $(that.element).children(TBODY).children(TR);
            var length = rows.length;
            var currentRowsHeights = rows.map(function() {
                return $(this).outerHeight();
            });
            var i;

            for (i = 0; i < length; i++) {
                rows[i].style[HEIGHT] = toPixels(currentRowsHeights[i]);
            }
        },

        _setRowsHeightInPercentages: function() {
            var that = this;
            var tableBody = $(that.element).children(TBODY);
            var tableBodyHeight = tableBody.height();
            var rows = tableBody.children(TR);
            var length = rows.length;
            var currentRowsHeights = rows.map(function() {
                return $(this).outerHeight();
            });
            var i;

            for (i = 0; i < length; i++) {
                rows[i].style[HEIGHT] = toPercentages(calculatePercentageRatio(currentRowsHeights[i], tableBodyHeight));
            }
        },

        _setTableHeight: function(newHeight) {
            var element = this.element;

            if (inPercentages(element.style[HEIGHT])) {
                element.style[HEIGHT] = toPercentages(calculatePercentageRatio(newHeight, $(element).parent().height()));
            }
            else {
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
