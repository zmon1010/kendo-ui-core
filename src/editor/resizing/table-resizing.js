(function(f, define) {
    define(["../main", "./column-resizing", "./table-resize-handle", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var parseFloat = global.parseFloat;

    var $ = kendo.jQuery;
    var extend = $.extend;
    var proxy = $.proxy;

    var browser = kendo.support.browser;
    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var ColumnResizing = Editor.ColumnResizing;
    var TableResizeHandle = Editor.TableResizeHandle;
    var ResizingUtils = Editor.ResizingUtils;
    var constrain = ResizingUtils.constrain;

    var CLICK = "click";
    var DRAG = "drag";
    var NS = ".kendoEditorTableResizing";
    var MIN = "min";
    var OUTER = "outer";
    var TABLE = "table";

    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";

    var WIDTH = "Width";
    var HEIGHT = "Height";

    var TableResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that.options = extend({}, that.options, options);
            that.handles = [];

            if ($(element).is(TABLE)) {
                that.element = element;
                that.columnResizing = new ColumnResizing(element, that.options);
                $(that.options.rootElement).on(CLICK + NS, TABLE, proxy(that.showResizeHandles, that));
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

            $(element).off(NS);
            that.element = null;

            $(that.options.rootElement).off(NS);

            that._destroyResizeHandles();
        },

        options: {
            rtl: false,
            rootElement: null,
            minWidth: 50,
            minHeight: 50,
            handles: [{
                direction: EAST
            }, {
                direction: NORTH
            }, {
                direction: NORTHEAST
            }, {
                direction: NORTHWEST
            }, {
                direction: SOUTH
            }, {
                direction: SOUTHEAST
            }, {
                direction: SOUTHWEST
            }, {
                direction: WEST
            }]
        },

        resizingInProgress: function() {
            var that = this;
            var columnResizing = that.columnResizing;

            if (columnResizing) {
                return !!columnResizing.resizingInProgress();
            }

            return false;
        },

        resize: function(args) {
            var that = this;
            var deltas = extend({}, {
                deltaX: 0,
                deltaY: 0
            }, args);

            that._resizeDimension(WIDTH, deltas.deltaX);
            that._resizeDimension(HEIGHT, deltas.deltaY);

            that.showResizeHandles();
        },

        _resizeDimension: function(dimension, delta) {
            var that = this;
            var element = $(that.element);
            var style = element[0].style;
            var dimensionLowercase = dimension.toLowerCase();
            var styleValue = style[dimensionLowercase] !== "" ? parseFloat(style[dimensionLowercase]) : 0;
            var computedStyleValue = element[dimensionLowercase]();
            var currentValue = styleValue < computedStyleValue ? computedStyleValue : styleValue;

            var constrainedValue = constrain({
                value: currentValue + parseFloat(delta),
                min: that.options[MIN + dimension],
                max: element.parent()[OUTER + dimension]()
            });

            element[dimensionLowercase](constrainedValue);
        },

        showResizeHandles: function() {
            var that = this;

            //table resizing is natively supported in IE and Firefox
            if (!browser.msie && !browser.mozilla) {
                that._initResizeHandles();
                that._showResizeHandles();
            }
        },

        _initResizeHandles: function() {
            var that = this;
            var options = that.options;
            var resizeHandles = that.options.handles;
            var length = resizeHandles.length;
            var i;

            if (that.handles.length > 0) {
                return;
            }

            for (i = 0; i < length; i++) {
                that.handles.push(new TableResizeHandle(extend({
                    appendTo: options.rootElement,
                    resizableElement: that.element
                }, resizeHandles[i])));
            }

            that._bindToResizeHandlesEvents();
        },

        _destroyResizeHandles: function() {
            var that = this;
            var length = that.handles ? that.handles.length : 0;

            for (var i = 0; i < length; i++) {
                that.handles[i].destroy();
            }
        },

        _showResizeHandles: function() {
            var that = this;
            var handles = that.handles || [];
            var length = handles.length;
            var i;

            for (i = 0; i < length; i++) {
                that.handles[i].show();
            }
        },

        _bindToResizeHandlesEvents: function() {
            var that = this;
            var handles = that.handles || [];
            var length = handles.length;
            var i;

            for (i = 0; i < length; i++) {
                that.handles[i].bind(DRAG, proxy(that.resize, that));
            }
        }
    });

    extend(Editor, {
        TableResizing: TableResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
