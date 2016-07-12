(function(f, define) {
    define(["../main"], f);
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

    var NS = ".kendoEditorTableResizeHandle";
    var HALF_INSIDE = "halfInside";
    var SOUTHEAST = "southeast";

    function getDirectionClass(direction) {
        var directionClasses = {
            "southeast": "k-resize-se"
        };

        return directionClasses[direction];
    }

    var TableResizeHandle = Class.extend({
        init: function(options) {
            var that = this;

            that.options = extend({}, that.options, options);

            that.element = $(that.options.template).appendTo(that.options.appendTo)[0];

            $(that.element).addClass(getDirectionClass(that.options.direction));

            $(that.element).css({
                width: that.options.width,
                height: that.options.height
            });

            that._positioningStrategy = HandlePositioningStrategy.create({
                name: that.options.direction,
                handle: that.element,
                resizableElement: that.options.resizableElement
            });
        },

        destroy: function() {
            var that = this;

            $(that.element).off(NS).remove();
            that.element = null;
        },

        options: {
            appendTo: null,
            direction: SOUTHEAST,
            resizableElement: null,
            template: "<div class='k-table-resize-handle'></div>",
            width: 20,
            height: 20
        },

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
        }
    });

    var PositioningStrategyFactory = Class.extend({
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

    extend(Editor, {
        TableResizeHandle: TableResizeHandle
    });
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
