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
    var inPercentages = ResizingUtils.inPercentages;
    var toPercentages = ResizingUtils.toPercentages;
    var toPixels = ResizingUtils.toPixels;

    var NS = ".kendoEditorColumnResizing";
    var RESIZE_HANDLE_CLASS = "k-column-resize-handle";
    var RESIZE_MARKER_CLASS = "k-column-resize-marker";

    var COMMA = ",";

    var TBODY = "tbody";
    var TD = "td";
    var TH = "th";
    var TR = "tr";

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
                    '<div class="' + RESIZE_HANDLE_CLASS + '" unselectable="on" contenteditable="false">' +
                        '<div class="' + RESIZE_MARKER_CLASS + '"></div>' +
                    '</div>'
            }
        },

        elementBorderHovered: function(column, e) {
            var that = this;
            var options = that.options;
            var handleWidth = options.handle.width;
            var borderOffset = column.offset().left + (options.rtl ? 0 : column.outerWidth());
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
            var handleWidth = options.handle.width;

            that.resizeHandle.css({
                top: tableBody.position().top,
                left: column.offset().left + (options.rtl ? 0 : column.outerWidth()) - (handleWidth / 2),
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
            var columnWidth = column.outerWidth();
            var columnLeftOffset = column.offset().left;
            var adjacentColumnWidth = column.next().outerWidth() || 0;
                    
            var handleOffset = constrain({
                value: e.x.location,
                min: abs(columnLeftOffset - (rtl ? adjacentColumnWidth : 0) + min),
                max: abs(columnLeftOffset + columnWidth + (rtl ? 0 : adjacentColumnWidth) - handleWidth - min)
            });

            $(that.resizeHandle).css({ left: handleOffset });
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

            initialColumnWidth = column.outerWidth();
            initialAdjacentColumnWidth = column.next().outerWidth() || 0;

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
            var elementWidth = $(element).outerWidth();

            if (inPercentages(element.style[WIDTH])) {
                element.style[WIDTH] = toPercentages(calculatePercentageRatio(elementWidth, $(element).parent().width()));
            }
            else {
                element.style[WIDTH] = toPixels(elementWidth);
            }
        },

        _setColumnsComputedWidth: function() {
            var that = this;
            var tableBody = $(that.element).children(TBODY);
            var tableBodyWidth = tableBody.outerWidth();
            var columns = tableBody.children(TR).children(TD);
            var length = columns.length;
            var currentColumnsWidths = columns.map(function() {
                return $(this).outerWidth();
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
                column.style[WIDTH] = toPercentages(calculatePercentageRatio(newWidth, $(this.element).children(TBODY).outerWidth()));
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

    extend(Editor, {
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
