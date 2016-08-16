(function(f, define) {
    define(["../main", "../../kendo.resizable", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var abs = math.abs;
    var parseFloat = global.parseFloat;

    var $ = kendo.jQuery;
    var extend = $.extend;
    var isArray = $.isArray;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;
    var getElementWidth = ResizingUtils.getElementWidth;
    var calculatePercentageRatio = ResizingUtils.calculatePercentageRatio;
    var inPercentages = ResizingUtils.inPercentages;
    var inPixels = ResizingUtils.inPixels;
    var toPercentages = ResizingUtils.toPercentages;
    var toPixels = ResizingUtils.toPixels;
    var setContentEditable = ResizingUtils.setContentEditable;

    var NS = ".kendoEditorColumnResizing";
    var RESIZE_HANDLE_CLASS = ".k-resize-handle";
    var RESIZE_HINT_MARKER_CLASS = ".k-resize-hint-marker";

    var COLUMN = "column";
    var COMMA = ",";
    var LAST_CHILD = ":last-child";
    var MOUSE_DOWN = "mousedown";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";
    var PX = "px";

    var TABLE = "table";
    var TBODY = "tbody";
    var TD = "td";
    var TH = "th";
    var TR = "tr";

    var TRUE = "true";
    var FALSE = "false";

    var WIDTH = "width";

    var ColumnResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that.options = extend({}, that.options, options);

            that.options.tags = isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;
                $(element).on(MOUSE_MOVE + NS, that.options.tags.join(COMMA), proxy(that._detectColumnBorderHovering, that));
            }
        },

        destroy: function() {
            var that = this;

            if (that.element) {
                $(that.element).off(NS);
                that.element = null;
            }

            that._destroyResizable();
            that._destroyResizeHandle();
        },

        options: {
            tags: [TD, TH],
            min: 20,
            rootElement: null,
            rtl: false,
            handle: {
                width: 10,
                template:
                    '<div class="k-resize-handle">' +
                        '<div class="k-resize-hint-marker"></div>' +
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

        _detectColumnBorderHovering: function(e) {
            var that = this;
            var column = $(e.currentTarget);
            var resizeHandle = that.resizeHandle;
            var rootElement = that.options.rootElement;

            if (!that.resizingInProgress()) {
                if (!column.is(LAST_CHILD) && that._columnBorderHovered(column, e.clientX)) {
                    setContentEditable(rootElement, FALSE);

                    if (resizeHandle) {
                        if (resizeHandle.data(COLUMN) && resizeHandle.data(COLUMN) !== column[0]) {
                            that._destroyResizable();
                            that._destroyResizeHandle();
                            that._createResizeHandle(column);
                            that._initResizable(column);
                        }
                    }
                    else {
                        that._createResizeHandle(column);
                        that._initResizable(column);
                    }
                }
                else {
                    if (resizeHandle) {
                        setContentEditable(rootElement, TRUE);
                        that._destroyResizable();
                        that._destroyResizeHandle();
                    }
                }
            }
        },

        _columnBorderHovered: function(column, clientX) {
            var that = this;
            var options = that.options;
            var handleWidth = options.handle.width;
            var borderLeftOffset = column.offset().left + (options.rtl ? 0 : column.outerWidth());
            var mousePosition = clientX + $(column[0].ownerDocument).scrollLeft();

            if ((mousePosition > (borderLeftOffset - handleWidth)) && (mousePosition < (borderLeftOffset + handleWidth))) {
                return true;
            }
            else {
                return false;
            }
        },

        _createResizeHandle: function(column) {
            var that = this;
            var tableBody = $(that.element).children(TBODY);
            var options = that.options;
            var handleOptions = options.handle;
            var handleWidth = handleOptions.width;

            if (!that.resizeHandle) {
                that.resizeHandle = $(handleOptions.template).appendTo(column);
            }

            that.resizeHandle.css({
                top: tableBody.position().top,
                left: column.offset().left + (options.rtl ? 0 : column.outerWidth()) - (handleWidth / 2),
                width: handleWidth,
                height: tableBody.height()
            })
            .data(COLUMN, column[0])
            .show()
            .on(MOUSE_DOWN + NS, function() {
                $(this).children(RESIZE_HINT_MARKER_CLASS).show();
            })
            .on(MOUSE_UP +NS, function() {
                $(this).children(RESIZE_HINT_MARKER_CLASS).hide();
            })
            .children(RESIZE_HINT_MARKER_CLASS).hide();
        },

        _destroyResizeHandle: function() {
            var that = this;

            if (that.resizeHandle) {
                that.resizeHandle.off(NS).remove();
                that.resizeHandle = null;
            }
        },

        _initResizable: function(column) {
            var that = this;

            that._destroyResizable();

            that.resizable = $(column).kendoResizable({
                handle: RESIZE_HANDLE_CLASS,
                resize: function(e) {
                    var resizable = this;
                    var column = $(resizable.element);
                    var columnResizing = that;
                    var options = columnResizing.options;
                    var handleWidth = options.handle ? options.handle.width : 0;
                    var min = options.min;
                    var rtl = options.rtl;
                    var columnWidth = column.outerWidth();
                    var columnLeftOffset = column.offset().left;
                    var adjacentColumn = column.next();
                    var adjacentColumnWidth = adjacentColumn ? adjacentColumn.outerWidth() : 0;
                    
                    var leftOffset = constrain({
                        value: e.x.location,
                        min: abs(columnLeftOffset - (rtl ? adjacentColumnWidth : 0) + min),
                        max: abs(columnLeftOffset + columnWidth + (rtl ? 0 : adjacentColumnWidth) - handleWidth - min)
                    });

                    $(columnResizing.resizeHandle).css({ left: leftOffset });
                },
                resizeend: function(e) {
                    var resizable = this;
                    var column = resizable.element;
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

                    that._destroyResizeHandle();
                    setContentEditable(options.rootElement, TRUE);
                }
            }).data("kendoResizable");
        },

        _destroyResizable: function() {
            var that = this;

            if (that.resizable) {
                that.resizable.destroy();
                that.resizable = null;
            }
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
            var initialWidth;
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

    extend(Editor, {
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
