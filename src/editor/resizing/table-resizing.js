(function(f, define) {
    define(["../main", "./table-resize-handle", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var min = math.min;
    var max = math.max;

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
    var toPixels = ResizingUtils.toPixels;
    var setContentEditable = ResizingUtils.setContentEditable;

    var DRAG = "drag";
    var NS = ".kendoEditorTableResizing";
    var MIN = "min";
    var MOUSE_OVER = "mouseover";
    var MOUSE_OUT = "mouseout";
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

    var TRUE = "true";
    var FALSE = "false";

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

            $(that.element).off(NS);
            that.element = null;

            $(that.options.rootElement).off(NS);

            that._destroyResizeHandles();
        },

        options: {
            rtl: false,
            rootElement: null,
            minWidth: 10,
            minHeight: 10,
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
            var dimensionLowercase = dimension.toLowerCase();
            var styleValue = element[0].style[dimensionLowercase];
            var elementOuterDimension = element[OUTER + dimension]();
            var rtlModifier = that.options.rtl ? (-1) : 1;
            var parentElement = element.parent();
            var parentDimension = parentElement[dimensionLowercase]();
            var parentScrollOffset = rtlModifier * (dimension === WIDTH ? parentElement.scrollLeft() : parentElement.scrollTop());
            var newDimensionValue;
            var ratioValue;
            var ratioTotalValue;
            var constrainedDimension = constrain({
                value: elementOuterDimension + delta,
                min: that.options[MIN + dimension],
                max: parentDimension + parentScrollOffset
            });

            if (delta === 0) {
                return;
            }

            if (inPercentages(styleValue)) {
                //detect resizing greater than 100%
                if (elementOuterDimension + delta > parentDimension) {
                    ratioValue = max(constrainedDimension, parentDimension);
                    ratioTotalValue = min(constrainedDimension, parentDimension);
                }
                else {
                    ratioValue = min(constrainedDimension, parentDimension);
                    ratioTotalValue = max(constrainedDimension, parentDimension);
                }

                newDimensionValue = toPercentages(calculatePercentageRatio(ratioValue, ratioTotalValue));
            }
            else {
                newDimensionValue = toPixels(constrainedDimension);
            }

            element[0].style[dimensionLowercase]= newDimensionValue;
        },

        showResizeHandles: function() {
            var that = this;

            that._initResizeHandles();
            that._showResizeHandles();
        },

        _initResizeHandles: function() {
            var that = this;
            var handles = that.handles;
            var options = that.options;
            var handleOptions = that.options.handles;
            var length = handleOptions.length;
            var i;

            if (handles && handles.length > 0) {
                return;
            }

            for (i = 0; i < length; i++) {
                that.handles.push(new TableResizeHandle(extend({
                    appendTo: options.rootElement,
                    resizableElement: that.element
                }, handleOptions[i])));
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
            var handle;

            for (i = 0; i < length; i++) {
                handle = handles[i];
                handle.bind(DRAG, proxy(that.resize, that));
                handle.bind(MOUSE_OVER, proxy(that._onResizeHandleMouseOver, that));
                handle.bind(MOUSE_OUT, proxy(that._onResizeHandleMouseOut, that));
            }
        },

        _onResizeHandleMouseOver: function() {
            setContentEditable(this.options.rootElement, FALSE);
        },

        _onResizeHandleMouseOut: function() {
            setContentEditable(this.options.rootElement, TRUE);
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
