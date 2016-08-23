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

    var K_TABLE = "k-table";
    var K_TABLE_RESIZING = "k-table-resizing";

    var DRAG_START = "dragStart";
    var DRAG = "drag";
    var DRAG_END = "dragEnd";
    var NS = ".kendoEditorTableResizing";
    var MIN = "min";
    var MOUSE_OVER = "mouseover";
    var MOUSE_OUT = "mouseout";
    var OUTER = "outer";

    var COLUMN = "td";
    var ROW = "tr";
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

    function isUndefined(value) { 
        return typeof(value) === "undefined";
    }

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
            appendHandlesTo: null,
            rtl: false,
            rootElement: null,
            minWidth: 10,
            minHeight: 10,
            handles: [{
                direction: NORTHWEST
            }, {
                direction: NORTH
            }, {
                direction: NORTHEAST
            }, {
                direction: EAST
            }, {
                direction: SOUTHEAST
            }, {
                direction: SOUTH
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

            that._resizeWidth(WIDTH, deltas.deltaX * rtlModifier);
            that._resizeHeight(HEIGHT, deltas.deltaY);

            that.showResizeHandles();
        },

        _resizeWidth: function(dimension, delta) {
            var that = this;
            var element = $(that.element);
            var dimensionLowercase = dimension.toLowerCase();
            var styleValue = element[0].style[dimensionLowercase];
            var elementOuterDimension = element[OUTER + dimension]();
            var parent = element.parent();
            var parentDimension = parent[dimensionLowercase]();
            var maxDimensionValue = that._getMaxDimensionValue(dimension);
            var newDimensionValue;
            var ratioValue;
            var ratioTotalValue;
            var constrainedDimension = constrain({
                value: elementOuterDimension + delta,
                min: that.options[MIN + dimension],
                max: maxDimensionValue
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

            that._setColumnsDimensions(dimension);

            element[0].style[dimensionLowercase] = newDimensionValue;
        },

        _resizeHeight: function(dimension, delta) {
            var that = this;
            var element = $(that.element);
            var dimensionLowercase = dimension.toLowerCase();
            var styleValue = element[0].style[dimensionLowercase];
            var elementOuterDimension = element[OUTER + dimension]();
            var parent = element.parent();
            var parentDimension = parent[dimensionLowercase]();
            var maxDimensionValue = that._getMaxDimensionValue(dimension);
            var newDimensionValue;
            var ratioValue;
            var ratioTotalValue;
            var constrainedDimension = constrain({
                value: elementOuterDimension + delta,
                min: that.options[MIN + dimension],
                max: maxDimensionValue
            });

            if (delta === 0) {
                return;
            }

            if (isUndefined(that._totalDragDeltaY)) {
                that._totalDragDeltaY = 0;
            }

            if (isUndefined(that._initialElementComputedHeight)) {
                that._initialElementComputedHeight = elementOuterDimension;
            }

            that._totalDragDeltaY += delta;

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
                //use total delta instead of delta as changing the height with a samll delta (e.g. 1px) on each drag does not work
                constrainedDimension = constrain({
                    value: that._initialElementComputedHeight + that._totalDragDeltaY,
                    min: that.options[MIN + dimension],
                    max: maxDimensionValue
                });

                newDimensionValue = toPixels(constrainedDimension);
            }

            element[0].style[dimensionLowercase]= newDimensionValue;
        },

        _getMaxDimensionValue: function(dimension) {
            var that = this;
            var element = $(that.element);
            var dimensionLowercase = dimension.toLowerCase();
            var rtlModifier = that.options.rtl ? (-1) : 1;
            var parent = $(that.element).parent();
            var parentElement = parent[0];
            var parentDimension = parent[dimensionLowercase]();
            var parentScrollOffset = rtlModifier * (dimension === WIDTH ? parent.scrollLeft() : parent.scrollTop());

            if (parentElement === element.closest(COLUMN)[0]) {
                if (parentElement.style[dimensionLowercase] === "" && !inPercentages(that.element.style[dimensionLowercase])) {
                    return Infinity;
                }
                else {
                    return (parentDimension + parentScrollOffset);
                }
            }
            else {
                return (parentDimension + parentScrollOffset);
            }
        },

        _setColumnsDimensions: function(dimension) {
            var that = this;
            var element = $(that.element);
            var parentElement = element.parent()[0];
            var parentColumn = element.closest(COLUMN);
            var dimensionLowercase = dimension.toLowerCase();
            var columns = parentColumn.closest(ROW).children();
            var columnsLength = columns.length;
            var i;

            function isWidthInPercentages(element) {
                var styleWidth = element.style.width;

                if (styleWidth !== "") {
                    return inPercentages(styleWidth) ? true : false;
                }
                else {
                    return $(element).hasClass(K_TABLE) ? true : false;
                }
            }

            if (dimension !== WIDTH) {
                return;
            }

            if (isWidthInPercentages(element[0]) && parentElement === parentColumn[0] && parentElement.style[dimensionLowercase] === "") {
                for (i = 0; i < columnsLength; i++) {
                    columns[i].style[dimensionLowercase] = toPixels($(columns[i]).width());
                }
            }
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
                    appendTo: options.appendHandlesTo,
                    resizableElement: that.element,
                    rootElement: options.rootElement
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
                handle.bind(DRAG_START, proxy(that._onResizeHandleDragStart, that));
                handle.bind(DRAG, proxy(that.resize, that));
                handle.bind(DRAG_END, proxy(that._onResizeHandleDragEnd, that));
                handle.bind(MOUSE_OVER, proxy(that._onResizeHandleMouseOver, that));
                handle.bind(MOUSE_OUT, proxy(that._onResizeHandleMouseOut, that));
            }
        },

        _onResizeHandleMouseOver: function() {
            setContentEditable(this.options.rootElement, FALSE);
        },

        _onResizeHandleMouseOut: function() {
            setContentEditable(this.options.rootElement, TRUE);
        },

        _onResizeHandleDragStart: function() {
            var that = this;
            var element = $(that.element);

            element.addClass(K_TABLE_RESIZING);

            that._totalDragDeltaY = 0;
            that._initialElementComputedHeight = element.outerHeight();
        },

        _onResizeHandleDragEnd: function() {
            $(this.element).removeClass(K_TABLE_RESIZING);
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
