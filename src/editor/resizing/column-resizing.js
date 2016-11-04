(function(f, define) {
    define(["../main", "./resizing-utils", "./table-element-resizing"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var abs = math.abs;

    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;
    var TableElementResizing = Editor.TableElementResizing;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;
    var calculatePercentageRatio = ResizingUtils.calculatePercentageRatio;
    var getScrollBarWidth = ResizingUtils.getScrollBarWidth;
    var inPercentages = ResizingUtils.inPercentages;
    var toPercentages = ResizingUtils.toPercentages;
    var toPixels = ResizingUtils.toPixels;
    var outerWidth = kendo._outerWidth;

    var NS = ".kendoEditorColumnResizing";
    var RESIZE_HANDLE_CLASS = "k-column-resize-handle";
    var RESIZE_MARKER_CLASS = "k-column-resize-marker";

    var BODY = "body";
    var TBODY = "tbody";
    var TD = "td";
    var TH = "th";
    var TR = "tr";

    var COMMA = ",";
    var WIDTH = "width";

    var ColumnResizing = TableElementResizing.extend({
        options: {
            tags: [TD, TH],
            min: 20,
            rootElement: null,
            eventNamespace: NS,
            rtl: false,
            handle: {
                dataAttribute: "column",
                width: 10,
                height: 0,
                classNames: {
                    handle: RESIZE_HANDLE_CLASS,
                    marker: RESIZE_MARKER_CLASS
                },
                template:
                    '<div class="k-column-resize-handle-wrapper" unselectable="on" contenteditable="false">' +
                        '<div class="' + RESIZE_HANDLE_CLASS + '">' +
                            '<div class="' + RESIZE_MARKER_CLASS + '"></div>' +
                        '</div>' +
                    '</div>'
            }
        },

        elementBorderHovered: function(column, e) {
            var that = this;
            var options = that.options;
            var handleWidth = options.handle.width;
            var borderOffset = column.offset().left + (options.rtl ? 0 : outerWidth(column));
            var mousePosition = e.clientX + $(column[0].ownerDocument).scrollLeft();

            if ((mousePosition > (borderOffset - handleWidth)) && (mousePosition < (borderOffset + handleWidth))) {
                return true;
            }
            else {
                return false;
            }
        },

        setResizeHandlePosition: function(column) {
            var that = this;
            var tableBody = $(that.element).children(TBODY);
            var options = that.options;
            var rtl = options.rtl;
            var handleWidth = options.handle.width;
            var rootElement = $(options.rootElement);
            var scrollTopOffset = rootElement.is(BODY) ? 0 : rootElement.scrollTop();
            var scrollLeftOffset = rootElement.is(BODY) ? 0 : rootElement.scrollLeft();
            var columnWidthOffset = rtl ? 0 : outerWidth(column);
            var scrollBarWidth = rtl ? getScrollBarWidth(rootElement[0]) : 0;

            that.resizeHandle.css({
                top: tableBody.position().top + scrollTopOffset,
                left: column.position().left + columnWidthOffset + (scrollLeftOffset - scrollBarWidth) - (handleWidth / 2),
                position: "absolute"
            });
        },

        setResizeHandleDimensions: function() {
            var that = this;
            var tableBody = $(that.element).children(TBODY);

            that.resizeHandle.css({
                width: that.options.handle.width,
                height: tableBody.height()
            });
        },

        setResizeHandleDragPosition: function(e) {
            var that = this;
            var column = $($(e.currentTarget).data(that.options.handle.dataAttribute));
            var options = that.options;
            var handleWidth = options.handle ? options.handle.width : 0;
            var min = options.min;
            var rtl = options.rtl;
            var columnWidth = outerWidth(column);
            var columnLeftOffset = column.position().left;
            var adjacentColumnWidth = outerWidth(column.next());
            var resizeHandle = $(that.resizeHandle);
            var rootElement = $(options.rootElement);
            var scrollLeftOffset = rootElement.is(BODY) ? 0 : rootElement.scrollLeft();
            var scrollBarWidth = rtl ? getScrollBarWidth(rootElement[0]) : 0;

            var handleOffset = constrain({
                value: resizeHandle.position().left + (scrollLeftOffset - scrollBarWidth) + e.x.delta,
                min: columnLeftOffset + (scrollLeftOffset - scrollBarWidth) - (rtl ? adjacentColumnWidth : 0) + min,
                max: columnLeftOffset + columnWidth + (scrollLeftOffset - scrollBarWidth) + (rtl ? 0 : adjacentColumnWidth) - handleWidth - min
            });

            resizeHandle.css({ left: handleOffset });
        },

        resize: function(e) {
            var that = this;
            var column = $($(e.currentTarget).data(that.options.handle.dataAttribute));
            var options = that.options;
            var rtlModifier = options.rtl ? (-1) : 1;
            var min = options.min;
            var initialDeltaX = rtlModifier * e.x.initialDelta;
            var newWidth;
            var initialAdjacentColumnWidth;
            var initialColumnWidth;

            that._setTableComputedWidth();
            that._setColumnsComputedWidth();

            initialColumnWidth = outerWidth(column);
            initialAdjacentColumnWidth = outerWidth(column.next());

            newWidth = constrain({
                value: initialColumnWidth + initialDeltaX,
                min: min,
                max: initialColumnWidth + initialAdjacentColumnWidth - min
            });

            that._resizeColumn(column[0], newWidth);
            that._resizeTopAndBottomColumns(column[0], newWidth);
            that._resizeAdjacentColumns(column.index(), initialAdjacentColumnWidth, initialColumnWidth, (initialColumnWidth - newWidth));
        },

        _setTableComputedWidth: function() {
            var element = this.element;

            if (element.style[WIDTH] === "") {
                element.style[WIDTH] = toPixels(outerWidth($(element)));
            }
        },

        _setColumnsComputedWidth: function() {
            var that = this;
            var tableBody = $(that.element).children(TBODY);
            var tableBodyWidth = outerWidth(tableBody);
            var columns = tableBody.children(TR).children(TD);
            var length = columns.length;
            var currentColumnsWidths = columns.map(function() {
                return outerWidth($(this));
            });
            var i;

            for (i = 0; i < length; i++) {
                if (inPercentages(columns[i].style[WIDTH])) {
                    columns[i].style[WIDTH] = toPercentages(calculatePercentageRatio(currentColumnsWidths[i], tableBodyWidth));
                }
                else {
                    columns[i].style[WIDTH] = toPixels(currentColumnsWidths[i]);
                }
            }
        },

        _resizeTopAndBottomColumns: function(column, newWidth) {
            var that = this;
            var columnIndex = $(column).index();
            var topAndBottomColumns = $(that.element).children(TBODY).children(TR).children(that.options.tags.join(COMMA))
                .filter(function() {
                    var cell = this;
                    return ($(cell).index() === columnIndex && cell !== column);
                });
            var length = topAndBottomColumns.length;
            var i;

            for (i = 0; i < length; i++) {
                that._resizeColumn(topAndBottomColumns[i], newWidth);
            }
        },

        _resizeColumn: function(column, newWidth) {
            if (inPercentages(column.style[WIDTH])) {
                column.style[WIDTH] = toPercentages(calculatePercentageRatio(newWidth, outerWidth($(this.element).children(TBODY))));
            }
            else {
                column.style[WIDTH] = toPixels(newWidth);
            }
        },

        _resizeAdjacentColumns: function(columnIndex, initialAdjacentColumnWidth, initialColumnWidth, deltaWidth) {
            var that = this;
            var adjacentColumns = $(that.element).children(TBODY).children(TR).children(that.options.tags.join(COMMA))
                .filter(function() {
                    return ($(this).index() === (columnIndex + 1));
                });
            var length = adjacentColumns.length;
            var i;

            for (i = 0; i < length; i++) {
                that._resizeAdjacentColumn(adjacentColumns[i], initialAdjacentColumnWidth, initialColumnWidth, deltaWidth);
            }
        },

        _resizeAdjacentColumn: function(adjacentColumn, initialAdjacentColumnWidth, initialColumnWidth, deltaWidth) {
            var that = this;
            var min = that.options.min;
            var newWidth;

            newWidth = constrain({
                value: initialAdjacentColumnWidth + deltaWidth,
                min: min,
                max: abs(initialColumnWidth + initialAdjacentColumnWidth - min)
            });

            that._resizeColumn(adjacentColumn, newWidth);
        }
    });

    ColumnResizing.create = function(editor) {
        TableElementResizing.create(editor, {
            name: "columnResizing",
            type: ColumnResizing,
            eventNamespace: NS
        });
    };

    ColumnResizing.dispose = function(editor) {
        TableElementResizing.dispose(editor, {
            eventNamespace: NS
        });
    };

    extend(Editor, {
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
