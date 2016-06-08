(function(f, define) {
    define(["./main", "../kendo.resizable"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var Infinity = global.Infinity;
    var math = global.Math;
    var min = math.min;
    var max = math.max;
    var parseInt = global.parseInt;

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
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var TABLE = "table";
    var TD = "td";
    var TH = "th";
    var TR = "tr";
    var LAST_CHILD = ":last-child";

    function constrain(value, lowerBound, upperBound) {
        return max(min(parseInt(value, 10), upperBound === Infinity ? upperBound : parseInt(upperBound, 10)), parseInt(lowerBound, 10));
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
                //that.columnResizing = null;
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
            min: 10,
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

            if (that.resizable) {
                return !!that.resizable.resizing;
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
            var table = $(that.element);

            if (that.resizable) {
                that.resizable.destroy();
            }

            that.resizable = $(column).kendoResizable({
                handle: RESIZE_HANDLE_CLASS,
                start: function(e) {
                    var resizable = this;;

                    resizable.initialWidth = resizable.element.outerWidth();
                },

                resize: function(e) {
                    var resizable = this;
                    var resizingColumn = resizable.element;
                    var newWidth = constrain(resizable.initialWidth + e.x.initialDelta, that.options.min, table.outerWidth());

                    $(resizingColumn).outerWidth(newWidth);
                    that._resizeAdjacentColumns(resizingColumn, newWidth);
                },

                resizeend: function() {
                    var resizable = this;
                    resizable.initialWidth = null;
                    
                    that.resizeHandle.off(NS).remove();
                    that.resizeHandle = null;
                }
            }).data("kendoResizable");
        },

        _resizeAdjacentColumns: function(column, width) {
            var that = this;
            var columnIndex = $(column).index();
            var adjacentColumns = $(that.element).find(TR).children(that.options.tags.join(COMMA))
                .filter(function() {
                    return $(this).index() === columnIndex;
                });

            $(adjacentColumns).outerWidth(width);
        }
    });

    extend(Editor, {
        TableResizing: TableResizing,
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
