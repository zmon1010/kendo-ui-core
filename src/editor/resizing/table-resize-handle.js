(function(f, define) {
    define(["../main",  "../../kendo.draganddrop", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var global = window;
    var math = global.Math;
    var abs = math.abs;

    var $ = kendo.jQuery;
    var extend = $.extend;
    var noop = $.noop;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var Draggable = kendo.ui.Draggable;
    var Observable = kendo.Observable;

    var DRAG = "drag";
    var NS = ".kendoEditorTableResizeHandle";
    var HALF_INSIDE = "halfInside";
    var EAST = "east";
    var NORTH = "north";
    var NORTHEAST = "northeast";
    var NORTHWEST = "northwest";
    var SOUTH = "south";
    var SOUTHEAST = "southeast";
    var SOUTHWEST = "southwest";
    var WEST = "west";
    var HORIZONTAL = "horizontal";
    var VERTICAL = "vertical";
    var AND = "and";
    var HORIZONTAL_AND_VERTICAL = HORIZONTAL + AND + VERTICAL;
    var TABLE = "table";

    var TableResizeHandle = Observable.extend({
        init: function(options) {
            var that = this;

            Observable.fn.init.call(that);

            that.options = extend({}, that.options, options);
            that.element = $(that.options.template).appendTo(that.options.appendTo)[0];

            that._addStyles();
            that._initDraggable();
            that._initPositioningStrategy();
            that._initDraggingStrategy();

            $(that.element).data(TABLE, that.options.resizableElement);
        },

        destroy: function() {
            var that = this;

            $(that.element).off(NS).remove();
            that.element = null;
            
            that._destroyDraggable();
        },

        options: {
            appendTo: null,
            direction: SOUTHEAST,
            resizableElement: null,
            template: "<div class='k-table-resize-handle' unselectable='on' contenteditable='false'></div>"
        },

        events: [
            DRAG
        ],

        show: function() {
            var that = this;

            that._setPosition();
        },

        _setPosition: function() {
            var that = this;
            var position = that._positioningStrategy.getPosition();

            $(that.element).css({
                left: position.left,
                top: position.top
            });
        },

        _addStyles: function() {
            var that = this;

            function getDirectionClass(direction) {
                return {
                    "east": "k-resize-e",
                    "north": "k-resize-n",
                    "northeast": "k-resize-ne",
                    "northwest": "k-resize-nw",
                    "south": "k-resize-s",
                    "southeast": "k-resize-se",
                    "southwest": "k-resize-sw",
                    "west": "k-resize-w"
                }[direction];
            }

            $(that.element).addClass(getDirectionClass(that.options.direction));
        },

        _initPositioningStrategy: function() {
            var that = this;
            var options = that.options;
            var resizableElement = that.options.resizableElement;

            that._positioningStrategy = HandlePositioningStrategy.create({
                name: options.direction,
                handle: that.element,
                resizableElement: resizableElement
            });
        },

        _initDraggable: function() {
            var that = this;
            var element = that.element;

            if (that._draggable || !element) {
                return;
            }

            that._draggable = new Draggable(element, {
                drag: function(e) {
                    that.trigger(DRAG, that._draggingStrategy.adjustDragDelta({
                        deltaX: e.x.delta,
                        deltaY: e.y.delta
                    }));
                }
            });
        },

        _destroyDraggable : function() {
            var that = this;

            if (that._draggable) {
                that._draggable.destroy();
                that._draggable = null;
            }
        },

        _initDraggingStrategy: function() {
            var that = this;

            function getStrategyName(direction) {
                return {
                    "east": HORIZONTAL,
                    "north": VERTICAL,
                    "northeast": HORIZONTAL_AND_VERTICAL,
                    "northwest": HORIZONTAL_AND_VERTICAL,
                    "south": VERTICAL,
                    "southeast": HORIZONTAL_AND_VERTICAL,
                    "southwest": HORIZONTAL_AND_VERTICAL,
                    "west": HORIZONTAL
                }[direction];
            }

            that._draggingStrategy = HandleDraggingStrategy.create({
                name: getStrategyName(that.options.direction)
            });
        }
    });

    var StrategyFactory = Class.extend({
        init: function() {
            this._items = [];
        },

        register: function(name, type) {
            this._items.push({
                name: name,
                type: type
            });
        },

        create: function(options) {
            var items = this._items;
            var itemsLength = items.length;
            var name = options.name ? options.name.toLowerCase() : "";
            var match;
            var item;
            var i;

            for (i = 0; i < itemsLength; i++) {
                item = items[i];

                if (item.name.toLowerCase() === name) {
                    match = item;
                    break;
                }
            }

            if (match) {
                return new match.type(options);
            }
        }
    });

    var PositioningStrategyFactory = StrategyFactory.extend({});
    PositioningStrategyFactory.current = new PositioningStrategyFactory();

    var HandlePositioningStrategy = Class.extend({
        init: function(options) {
            var that = this;
            that.options = extend({}, that.options, options);
        },

        options: {
            handle: null,
            offset: HALF_INSIDE,
            resizableElement: null
        },

        getPosition: function() {
            var that = this;
            var position = that.applyOffset(that.calculatePosition());
            return position;
        },

        calculatePosition: noop,

        applyOffset: function(position) {
            var that = this;
            var options = that.options;
            var handle = $(options.handle);

            if (options.offset === HALF_INSIDE) {
                return {
                    left: abs(position.left - (handle.outerWidth() / 2)),
                    top: abs(position.top - (handle.outerHeight() / 2))
                };
            }
            else {
                return position;
            }
        }
    });

    HandlePositioningStrategy.create = function(options) {
        return PositioningStrategyFactory.current.create(options);
    };

    var EastPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left + resizableElement.outerWidth(),
                top: offset.top + (resizableElement.outerHeight() / 2)
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(EAST, EastPositioningStrategy);

    var NorthPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left + (resizableElement.outerWidth() / 2),
                top: offset.top
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(NORTH, NorthPositioningStrategy);

    var NortheastPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left + resizableElement.outerWidth(),
                top: offset.top
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(NORTHEAST, NortheastPositioningStrategy);

    var NorthwestPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left,
                top: offset.top
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(NORTHWEST, NorthwestPositioningStrategy);

    var SouthPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left + (resizableElement.outerWidth() / 2),
                top: offset.top + resizableElement.outerHeight()
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(SOUTH, SouthPositioningStrategy);

    var SoutheastPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left + resizableElement.outerWidth(),
                top: offset.top + resizableElement.outerHeight()
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(SOUTHEAST, SoutheastPositioningStrategy);

    var SouthwestPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left,
                top: offset.top + resizableElement.outerHeight()
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(SOUTHWEST, SouthwestPositioningStrategy);

    var WestPositioningStrategy = HandlePositioningStrategy.extend({
        calculatePosition: function() {
            var that = this;
            var resizableElement = $(that.options.resizableElement);
            var offset = resizableElement.offset();
            var position = {
                left: offset.left,
                top: offset.top + (resizableElement.outerHeight() / 2)
            };

            return position;
        }
    });
    PositioningStrategyFactory.current.register(WEST, WestPositioningStrategy);

    var DraggingStrategyFactory = StrategyFactory.extend({});
    DraggingStrategyFactory.current = new DraggingStrategyFactory();

    var HandleDraggingStrategy = Class.extend({
        init: function(options) {
            var that = this;
            that.options = extend({}, that.options, options);
        },

        options: {
            direction: "",
            deltaAdjustment: {}
        },

        adjustDragDelta: function(deltas) {
            return extend(deltas, this.options.deltaAdjustment);
        }
    });

    HandleDraggingStrategy.create = function(options) {
        return DraggingStrategyFactory.current.create(options);
    };

    var HorizontalDraggingStrategy = HandleDraggingStrategy.extend({
        options: {
            direction: HORIZONTAL,
            deltaAdjustment: {
                deltaY: 0
            }
        }
    });
    DraggingStrategyFactory.current.register(HORIZONTAL, HorizontalDraggingStrategy);

    var VerticalDraggingStrategy = HandleDraggingStrategy.extend({
        options: {
            direction: VERTICAL,
            deltaAdjustment: {
                deltaX: 0
            }
        }
    });
    DraggingStrategyFactory.current.register(VERTICAL, VerticalDraggingStrategy);

    var HorizontalAndVerticalDraggingStrategy = HandleDraggingStrategy.extend({
        options: {
            direction: HORIZONTAL_AND_VERTICAL
        }
    });
    DraggingStrategyFactory.current.register(HORIZONTAL_AND_VERTICAL, HorizontalAndVerticalDraggingStrategy);

    extend(Editor, {
        TableResizeHandle: TableResizeHandle
    });
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
