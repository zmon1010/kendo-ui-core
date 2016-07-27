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
    var TableResizeHandle = Editor.TableResizeHandle;
    var ResizingUtils = Editor.ResizingUtils;
    var calculatePercentageRatio = ResizingUtils.calculatePercentageRatio;
    var constrain = ResizingUtils.constrain;
    var inPercentages = ResizingUtils.inPercentages;
    var toPercentages = ResizingUtils.toPercentages;

    var DRAG = "drag";
    var NS = ".kendoEditorTableResizing";
    var MAX_PERCENTAGE_VALUE = 100;
    var MIN = "min";
    var OUTER = "outer";
    var TABLE = "table";
    var WIDTH = "Width";
    var HEIGHT = "Height";

    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";

    var TableResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that.options = extend({}, that.options, options);
            that.handles = [];

            if ($(element).is(TABLE)) {
                that.element = element;
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
            var rtlModifier = that.options.rtl ? (-1) : 1;

            that._resizeDimension(WIDTH, deltas.deltaX * rtlModifier);
            that._resizeDimension(HEIGHT, deltas.deltaY);

            that.showResizeHandles();
        },

        _resizeDimension: function(dimension, delta) {
            var that = this;
            var element = $(that.element);
            var style = element[0].style;
            var dimensionLowercase = dimension.toLowerCase();
            var styleValue = style[dimensionLowercase];
            var dimensionValue = styleValue !== "" ? parseFloat(styleValue) : 0;
            var elementOuterWidth = element[OUTER + dimension]();
            var currentValue = dimensionValue < elementOuterWidth ? elementOuterWidth : dimensionValue;
            var constrainedValue;

            if (inPercentages(styleValue)) {
                constrainedValue = constrain({
                    value: dimensionValue + calculatePercentageRatio(delta, elementOuterWidth),
                    min: calculatePercentageRatio(that.options[MIN + dimension], elementOuterWidth),
                    max: MAX_PERCENTAGE_VALUE
                });

                constrainedValue = toPercentages(constrainedValue);
            }
            else {
                constrainedValue = constrain({
                    value: currentValue + parseFloat(delta),
                    min: that.options[MIN + dimension],
                    max: element.parent()[dimensionLowercase]()
                });
            }

            element[dimensionLowercase](constrainedValue);
        },

        showResizeHandles: function() {
            var that = this;

            that._initResizeHandles();
            that._showResizeHandles();
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

    var TableResizingFactory = Class.extend({
        create: function(element, options) {
            //table resizing is natively supported in IE and Firefox
            if (!browser.msie && !browser.mozilla) {
                return new TableResizing(element, options);
            }
            else {
                return null;
            }
        }
    });
    TableResizingFactory.current = new TableResizingFactory();

    TableResizing.create = function(element, options) {
        return TableResizingFactory.current.create(element, options);
    };

    extend(Editor, {
        TableResizing: TableResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
