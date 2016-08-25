(function(f, define) {
    define(["../main", "./resizing-utils", "./table-element-resizing"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var abs = math.abs;
    var parseFloat = global.parseFloat;

    var $ = kendo.jQuery;
    var extend = $.extend;

    var Editor = kendo.ui.editor;
    var TableElementResizing = Editor.TableElementResizing;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;
    var getElementWidth = ResizingUtils.getElementWidth;
    var calculatePercentageRatio = ResizingUtils.calculatePercentageRatio;
    var inPercentages = ResizingUtils.inPercentages;
    var toPercentages = ResizingUtils.toPercentages;
    var toPixels = ResizingUtils.toPixels;

    var NS = ".kendoEditorColumnResizing";
    var RESIZE_HANDLE_CLASS = "k-column-resize-handle";
    var RESIZE_MARKER_CLASS = "k-column-resize-marker";

    var COMMA = ",";
    var PX = "px";

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
            var options = that.options;
            var handleOptions = options.handle;
            var handleWidth = handleOptions.width;

            that.resizeHandle.css({
                width: handleWidth,
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
            var adjacentColumn = column.next();
            var adjacentColumnWidth = adjacentColumn ? adjacentColumn.outerWidth() : 0;
                    
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
            var initialDeltaX = rtlModifier * e.x.initialDelta;
            var newWidth;
            var initialAdjacentColumnWidth;
            var initialColumnWidth;

            that._setElementComputedWidth();

            newWidth = that._calculateNewWidth(column, initialDeltaX);
            initialAdjacentColumnWidth = column.next().outerWidth();
            initialColumnWidth = column.outerWidth();

            that._resizeColumn(column[0], newWidth);
            that._resizeTopAndBottomColumns(column, newWidth);
            that._resizeAdjacentColumns(column.index(), initialAdjacentColumnWidth, initialColumnWidth, initialDeltaX);
        },

        _setElementComputedWidth: function() {
            var element = this.element;

            if (!inPercentages(element.style[WIDTH])) {
                element.style[WIDTH] = toPixels($(element).outerWidth());
            }
        },

        _calculateNewWidth: function(column, deltaX) {
            var that = this;
            var tableWidth = $(that.element).outerWidth();
            var min = that.options.min;
            var minInPercentages = calculatePercentageRatio(min, tableWidth);
            var adjacentColumn = column.next()[0];
            var adjacentColumnWidth = adjacentColumn ? getElementWidth(adjacentColumn) : 0;
            var adjacentColumnWidthValue;
            var columnWidth = getElementWidth(column[0]);
            var columnWidthValue = parseFloat(columnWidth);
            var columnOuterWidth = column.outerWidth();
            var differenceInPercentages;
            var newWidth;

            if (inPercentages(columnWidth)) { 
                differenceInPercentages = calculatePercentageRatio(deltaX, tableWidth);
                adjacentColumnWidthValue = calculatePercentageRatio(adjacentColumnWidth, tableWidth);

                newWidth = constrain({
                    value: columnWidthValue + differenceInPercentages,
                    min: minInPercentages,
                    max: abs(columnWidthValue + adjacentColumnWidthValue - minInPercentages)
                });

                newWidth = toPercentages(newWidth);
            }
            else {
                newWidth = constrain({
                    value: columnOuterWidth + deltaX,
                    min: min,
                    max: columnOuterWidth + $(adjacentColumn).outerWidth() - min
                });
            }

            return newWidth;
        },

        _resizeTopAndBottomColumns: function(column, newWidth) {
            var that = this;
            var columnIndex = column.index();
            var topAndBottomColumns = $(that.element).find(TR).children(that.options.tags.join(COMMA))
                .filter(function() {
                    var cell = $(this);
                    return (cell.index() === columnIndex && cell[9] !== column[0]);
                });
            var length = topAndBottomColumns.length;
            var i;

            for (i = 0; i < length; i++) {
                that._resizeColumn(topAndBottomColumns[i], newWidth);
            }
        },

        _resizeColumn: function(column, newWidth) {
            if (inPercentages(newWidth)) {
                column.style[WIDTH] = toPercentages(newWidth);
            }
            else {
                column.style[WIDTH]= toPixels(newWidth);
            }
        },

        _resizeAdjacentColumns: function(columnIndex, initialAdjacentColumnWidth, initialColumnWidth, deltaWidth) {
            var that = this;
            var adjacentColumns = $(that.element).find(TR).children(that.options.tags.join(COMMA))
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
            var tableWidth = $(that.element).width();
            var options = that.options;
            var min = options.min;
            var minInPercentages = calculatePercentageRatio(min, tableWidth);
            var delta = (-1) * parseFloat(deltaWidth);
            var initialColumnWidthInPercentages = calculatePercentageRatio(initialColumnWidth, tableWidth);
            var adjacentColumnWidth;
            var newWidth;
            var columnWidth;

            if (inPercentages(getElementWidth(adjacentColumn))) {
                adjacentColumnWidth = calculatePercentageRatio(initialAdjacentColumnWidth, tableWidth);
                newWidth = constrain({
                    value: adjacentColumnWidth + calculatePercentageRatio(delta, tableWidth),
                    min: minInPercentages,
                    max: abs(initialColumnWidthInPercentages + adjacentColumnWidth - minInPercentages)
                });

                $(adjacentColumn).width(toPercentages(newWidth));
            }
            else {
                columnWidth = inPercentages(initialColumnWidth) ? (parseFloat(initialColumnWidth) * tableWidth / 100) : initialColumnWidth;

                newWidth = constrain({
                    value: parseFloat(initialAdjacentColumnWidth) + parseFloat(delta),
                    min: min,
                    max: abs(parseFloat(columnWidth) + parseFloat(initialAdjacentColumnWidth) -min)
                });

                adjacentColumn.style[WIDTH] = newWidth + PX;
            }
        }
    });

    ColumnResizing.create = function(editor) {
        return TableElementResizing.initResizing(editor, {
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
