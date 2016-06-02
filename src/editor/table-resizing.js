(function(f, define) {
    define(["./main"], f);
})(function() {

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;

    var NS = ".kendoEditor";
    var MOUSE_OVER = "mouseover";
    var MOUSE_MOVE = "mousemove";
    var COMMA = ",";
    var TABLE = "table";
    var TD = "td";

    var TableResizing = Class.extend({
        init: function(element, options) {
            var that = this;
            
            that.element = element;

            that.columnResizing = new ColumnResizing($(element).find(TABLE)[0], {});

            if (!$(element).is(TABLE)) {
                $(element).on(MOUSE_OVER + NS, TABLE, function(e) {
                    console.log("table move" + e.currentTarget.id);
                });
            }
        }
    });

    var ColumnResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that._initOptions(options);
            that.options.tags = $.isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;
                
                $(element).on(MOUSE_MOVE + NS, that.options.tags.join(COMMA), proxy(that._detectCellBorderHover, that));
            }
        },

        options: {
            tags: [TD],
            handle: {
                width: 20,
                height: 10,
                appendTo: "#qunit-fixture",
                template:
                    '<div class="k-resize-handle">' +
                        '<div class="k-resize-handle-inner"></div>' +
                      '</div>'
            }
        },

        _detectCellBorderHover: function(e) {
            var that = this;
            var handleWidth = that.options.handle.width;
            var cell = $(e.currentTarget);
            var offset = cell.offset();
            var columnWidth = offset.left + cell.outerWidth();
            var clientX = e.clientX;
            
            if ((clientX > (columnWidth - handleWidth)) && (clientX < (columnWidth + handleWidth))) {
                that._createResizeHandle(cell);
            }
            else {
                if (that.resizeHandle) {
                    that.resizeHandle.hide();
                }
            }
        },

        _createResizeHandle: function(cell) {
            var that = this;
            var options = that.options;
            var handleOptions = options.handle;
            var handleWidth = handleOptions.width;
            var resizeHandle = that.resizeHandle;
            var left;
            var isRtl = false;
            var resizeHandle;
            var appentTo = handleOptions.appendTo;

            if (!resizeHandle) {
                resizeHandle = that.resizeHandle = $(handleOptions.template);

                $(handleOptions.appendTo).append(resizeHandle);
            }

            if (!isRtl) {
                left = cell[0].offsetWidth;
            }

            resizeHandle.css({
                top: cell.position().top,
                left: left - handleWidth,
                width: handleWidth,
                height: handleOptions.height
            });

            resizeHandle.show();
        }
    });

    extend(Editor, {
        TableResizing: TableResizing,
        ColumnResizing: ColumnResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
