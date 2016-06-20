(function(f, define) {
    define(["./main", "../kendo.resizable"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var abs = math.abs;
    var min = math.min;
    var max = math.max;
    var parseFloat = global.parseFloat;

    var $ = kendo.jQuery;
    var extend = $.extend;
    var isArray = $.isArray;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;

    var NS = ".kendoEditor";
    var RESIZE_HANDLE_CLASS = ".k-resize-handle";
    var COLUMN = "column";
    var COMMA = ",";
    var MOUSE_MOVE = "mousemove";
    var PERCENTAGE = "%";
    var STRING = "string";
    var TABLE = "table";
    var TD = "td";
    var TH = "th";
    var TR = "tr";
    var WIDTH = "width";
    var LAST_CHILD = ":last-child";

    function constrain(value, lowerBound, upperBound) {
        return max(min(parseFloat(value), parseFloat(upperBound)), parseFloat(lowerBound));
    }

    function calculatePercentageRatio(value, total) {
        var result;

        if (inPercentages(value)) {
            result = parseFloat(value);
        }
        else {
            result = (parseFloat(value) / total) * 100;
        }

        return result;
    }

    function inPercentages(value) {
        return (typeof(value) === STRING && value.indexOf(PERCENTAGE) !== -1);
    }

    function toPercentages(value) {
        return (parseFloat(value) + PERCENTAGE);
    }

    function getColumnWidth(column) {
        var columnStyleWidth = column.style[WIDTH];
        var width = columnStyleWidth !== "" ? columnStyleWidth : $(column).width();
        return width;
    }

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
                that.columnResizing = null;
            }

            if (element) {
                $(element).off(NS);
                that.element = null;
            }
        },

        resizingInProgress: function() {
            var that = this;

            if (that.columnResizing) {
                return !!that.columnResizing.resizingInProgress();
            }

            return false;
        }
    });

    var ColumnResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that._initOptions(options);
            that.options.tags = isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;

                $(element).on(MOUSE_MOVE + NS, that.options.tags.join(COMMA), proxy(that._detectColumnBorderHover, that));
            }
        },

        destroy: function() {
            var that = this;

            if (that.element) {
                $(that.element).find(RESIZE_HANDLE_CLASS).off(NS).remove();
                $(that.element).off(NS);
                that.element = null;
            }

            if (that.resizable) {
                that.resizable.destroy();
                that.resizable = null;
            }
        },

        options: {
            tags: [TD, TH],
            min: 5,
            handle: {
                width: 10,
                height: 10,
                template:
                    '<div class="k-resize-handle">' +
                        '<div class="k-resize-handle-inner"></div>' +
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

        _detectColumnBorderHover: function(e) {
            var that = this;
            var handleWidth = that.options.handle.width;
            var column = $(e.currentTarget);
            var offset = column.offset();
            var borderLeftOffset = offset.left + column[0].offsetWidth;
            var clientX = e.clientX;
            var resizeHandle = that.resizeHandle;
            
            if (!column.is(LAST_CHILD) && (clientX > (borderLeftOffset - handleWidth)) && (clientX < (borderLeftOffset + handleWidth))) {
                if (resizeHandle) {
                    if (resizeHandle.data(COLUMN) && resizeHandle.data(COLUMN) !== column[0] && !that.resizingInProgress()) {
                        if (that.resizable) {
                            that.resizable.destroy();
                            that.resizable = null;
                        }

                        that.resizeHandle.off(NS).remove();
                        that.resizeHandle = null;

                        that._createResizeHandle(column);
                        that._initResizable(column);
                    }
                    else {
                        if (that.resizingInProgress()) {
                            resizeHandle.hide();
                        }
                        else {
                            resizeHandle.show();
                        }
                    }
                }
                else {
                    that._createResizeHandle(column);
                    that._initResizable(column);
                }
            }
            else {
                if (resizeHandle) {
                    resizeHandle.hide();
                }
            }
        },

        _createResizeHandle: function(column) {
            var that = this;
            var options = that.options;
            var handleOptions = options.handle;
            var handleWidth = handleOptions.width;

            if (!that.resizeHandle) {
                that.resizeHandle = $(handleOptions.template);
                column.append(that.resizeHandle);
            }

            that.resizeHandle.css({
                top: column.position().top,
                left: column.offset().left + column[0].offsetWidth - (handleWidth / 2),
                width: handleWidth,
                height: column[0].offsetHeight
            })
            .data(COLUMN, column[0])
            .show();
        },

        _initResizable: function(column) {
            var that = this;

            if (that.resizable) {
                that.resizable.destroy();
            }

            that.resizable = $(column).kendoResizable({
                handle: RESIZE_HANDLE_CLASS,
                resize: function(e) {
                    var resizable = this;
                    var column = resizable.element;
                    var columnWidth = getColumnWidth(column[0]);
                    var resizingData = that._calculateResizingData(column, e.x.initialDelta);
                    var newWidth = resizingData.newWidth;
                    var deltaWidth = resizingData.deltaWidth;
                    var adjacentColumnWidth = resizingData.adjacentColumnWidth;

                    that._resizeColumn(column, newWidth);
                    that._resizeTopAndBottomColumns(column, newWidth);
                    that._resizeAdjacentColumns(column.index(), columnWidth, adjacentColumnWidth, deltaWidth);
                },
                resizeend: function() {
                    that.resizeHandle.off(NS).remove();
                    that.resizeHandle = null;
                }
            }).data("kendoResizable");
        },

        _calculateResizingData: function(column, deltaX) {
            var that = this;
            var tableWidth = $(that.element).width();
            var min = that.options.min;
            var adjacentColumn = column.next();
            var adjacentColumnWidth = adjacentColumn[0] ? getColumnWidth(adjacentColumn[0]) : 0;
            var adjacentColumnWidthValue;
            var columnWidth = getColumnWidth(column[0]);
            var columnWidthValue = parseFloat(columnWidth);
            var differenceInPercentages;
            var deltaWidth;
            var newWidth;
            var resizingData = {};

            if(inPercentages(columnWidth)) { 
                differenceInPercentages = calculatePercentageRatio(deltaX, tableWidth);
                adjacentColumnWidthValue = calculatePercentageRatio(adjacentColumnWidth, tableWidth);
                newWidth = constrain(columnWidthValue + differenceInPercentages, min, abs(columnWidthValue + adjacentColumnWidthValue - min));
                deltaWidth = toPercentages(newWidth - columnWidthValue);
                newWidth = toPercentages(newWidth);
            }
            else {
                columnWidthValue = column.width();
                adjacentColumnWidthValue = adjacentColumn.width();
                newWidth = constrain(columnWidthValue + deltaX, min, columnWidthValue + adjacentColumnWidthValue - min);
                deltaWidth = columnWidthValue - newWidth;
            }

            resizingData = {
                adjacentColumnWidth: adjacentColumnWidthValue,
                deltaWidth: deltaWidth,
                newWidth: newWidth
            };

            return resizingData;
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
            var that = this;
            var tableWidth = $(that.element).width();

            if (inPercentages(newWidth)) {
                $(column).width(newWidth);
            }
            else {
                $(column).width(toPercentages(calculatePercentageRatio(newWidth, tableWidth)));
            }
        },

        _resizeAdjacentColumns: function(columnIndex, initialColumnWidth, initialAdjacentColumnWidth, deltaWidth) {
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
            var delta = (-1) * parseFloat(deltaWidth);
            var initialColumnWidthInPercentages = calculatePercentageRatio(initialColumnWidth, tableWidth);
            var adjacentColumnWidth;
            var newWidth;

            if (inPercentages(deltaWidth)) {
                adjacentColumnWidth = calculatePercentageRatio(getColumnWidth(adjacentColumn, tableWidth));
                newWidth = constrain(adjacentColumnWidth + delta, min, abs(initialColumnWidthInPercentages + adjacentColumnWidth - min));
                $(adjacentColumn).width(toPercentages(newWidth));
            }
            else {
                newWidth = constrain(initialAdjacentColumnWidth + parseFloat(deltaWidth), min,
                    abs(parseFloat(initialColumnWidth) + initialAdjacentColumnWidth - min));

                $(adjacentColumn).width(toPercentages(calculatePercentageRatio(newWidth, tableWidth)));
            }
        }
    });

    extend(Editor, {
        TableResizing: TableResizing,
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
