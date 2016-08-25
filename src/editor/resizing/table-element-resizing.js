(function(f, define) {
    define(["../main", "../../kendo.resizable", "./resizing-utils"], f);
})(function() {

(function(kendo, undefined) {
    var $ = kendo.jQuery;
    var extend = $.extend;
    var noop = $.noop;
    var proxy = $.proxy;

    var Editor = kendo.ui.editor;
    var Class = kendo.Class;
    var ResizingUtils = Editor.ResizingUtils;
    var setContentEditable = ResizingUtils.setContentEditable;

    var MOUSE_DOWN = "mousedown";
    var MOUSE_ENTER = "mouseenter";
    var MOUSE_LEAVE = "mouseleave";
    var MOUSE_MOVE = "mousemove";
    var MOUSE_UP = "mouseup";

    var COMMA = ",";
    var DOT = ".";
    var LAST_CHILD = ":last-child";

    var TABLE = "table";

    var TRUE = "true";
    var FALSE = "false";

    var TableElementResizing = Class.extend({
        init: function(element, options) {
            var that = this;

            that.options = extend({}, that.options, options);

            that.options.tags = $.isArray(that.options.tags) ? that.options.tags : [that.options.tags];

            if ($(element).is(TABLE)) {
                that.element = element;
                $(element).on(MOUSE_MOVE + that.options.eventNamespace, that.options.tags.join(COMMA), proxy(that.detectElementBorderHovering, that));
            }
        },
        
        destroy: function() {
            var that = this;

            if (that.element) {
                $(that.element).off(that.options.eventNamespace);
                that.element = null;
            }

            that._destroyResizeHandle();
        },

        options: {
            tags: [],
            min: 0,
            rootElement: null,
            eventNamespace: "",
            rtl: false,
            handle: {
                dataAttribute: "",
                height: 0,
                width: 0,
                classNames: {},
                template: ""
            }
        },

        resizingInProgress: function() {
            var that = this;
            var resizable = that._resizable;

            if (resizable) {
                return !!resizable.resizing;
            }

            return false;
        },

        resize: noop,

        detectElementBorderHovering: function(e) {
            var that = this;
            var options = that.options;
            var handleOptions = options.handle;
            var tableElement = $(e.currentTarget);
            var resizeHandle = that.resizeHandle;
            var rootElement = options.rootElement;
            var dataAttribute = handleOptions.dataAttribute;

            if (!that.resizingInProgress()) {
                if (!tableElement.is(LAST_CHILD) && that.elementBorderHovered(tableElement, e)) {
                    setContentEditable(rootElement, FALSE);

                    if (resizeHandle) {
                        if (resizeHandle.data(dataAttribute) && resizeHandle.data(dataAttribute) !== tableElement[0]) {
                            that.showResizeHandle(tableElement, e);
                        }
                    }
                    else {
                        that.showResizeHandle(tableElement, e);
                    }
                }
                else {
                    if (resizeHandle) {
                        setContentEditable(rootElement, TRUE);
                        that._destroyResizeHandle();
                    }
                }
            }
        },

        elementBorderHovered: noop,

        showResizeHandle: function(tableElement, e) {
            var that = this;

            if (e.which !== 0) {
                //prevent showing when a mouse button is still being pressed
                return;
            }

            that._initResizeHandle();
            that.setResizeHandlePosition(tableElement);
            that.setResizeHandleDimensions();
            that.setResizeHandleDataAttributes(tableElement[0]);
            that.attachResizeHandleEventHandlers();

            that._initResizable(tableElement);

            that._hideResizeMarker();
            that.resizeHandle.show();
        },

        _initResizeHandle: function() {
            var that = this;
            var options = that.options;

            that._destroyResizeHandle();

            that.resizeHandle = $(options.handle.template).appendTo(options.rootElement);
        },

        setResizeHandlePosition: noop,

        setResizeHandleDimensions: noop,

        setResizeHandleDataAttributes: function(tableElement) {
            var that = this;

            that.resizeHandle.data(that.options.handle.dataAttribute, tableElement);
        },

        attachResizeHandleEventHandlers: function() {
            var that = this;
            var options = that.options;
            var eventNamespace = options.eventNamespace;
            var markerClass = options.handle.classNames.marker;
            var resizeHandle = that.resizeHandle;

            that.resizeHandle
                .on(MOUSE_DOWN + eventNamespace, function() {
                    resizeHandle.find(DOT + markerClass).show();
                })
                .on(MOUSE_UP + eventNamespace, function() {
                    resizeHandle.find(DOT + markerClass).hide();
                });
        },

        _hideResizeMarker: function() {
            var that = this;
        
            that.resizeHandle.find(DOT + that.options.handle.classNames.marker).hide();
        },

        _destroyResizeHandle: function() {
            var that = this;

            if (that.resizeHandle) {
                that._destroyResizable();
                that.resizeHandle.off(that.options.eventNamespace).remove();
                that.resizeHandle = null;
            }
        },

        _initResizable: function(tableElement) {
            var that = this;

            if (!that.resizeHandle) {
                return;
            }

            that._destroyResizable();

            that._resizable = new kendo.ui.Resizable(tableElement, {
                draggableElement: that.resizeHandle[0],
                resize: proxy(that.onResize, that),
                resizeend: proxy(that.onResizeEnd, that)
            });
        },

        _destroyResizable: function() {
            var that = this;

            if (that._resizable) {
                that._resizable.destroy();
                that._resizable = null;
            }
        },

        onResize: function(e) {
            this.setResizeHandleDragPosition(e);
        },

        setResizeHandleDragPosition: noop,

        onResizeEnd: function(e) {
            var that = this;

            that.resize(e);
            that._destroyResizeHandle();
            setContentEditable(that.options.rootElement, TRUE);
        }
    });

    var ResizingFactory = Class.extend({
        init: function() {
        },

        create: function(editor, options) {
            var that = this;
            var resizingName = options.name;
            var NS = options.eventNamespace;

            $(editor.body)
                .on(MOUSE_ENTER + NS, TABLE, function(e) {
                    var table = e.currentTarget;
                    var resizing =  editor[resizingName];

                    e.stopPropagation();

                    if (resizing) {
                        if (resizing.element !== table && !resizing.resizingInProgress()) {
                            that._destroyResizing(editor, options);
                            that._initResizing(editor, table, options);
                        }
                    }
                    else {
                        that._initResizing(editor, table, options);
                    }
                })
                .on(MOUSE_LEAVE + NS, TABLE, function(e) {
                    var parentTable;
                    var resizing = editor[resizingName];

                    e.stopPropagation();

                    if (resizing && !resizing.resizingInProgress()) {
                        parentTable = $(resizing.element).parents(TABLE)[0];

                        if (parentTable && !$.contains(resizing.element, e.target)) {
                            that._destroyResizing(editor, options);
                            that._initResizing(editor, parentTable, options);
                        }
                    }
                })
                .on(MOUSE_LEAVE + NS, function() {
                    var resizing = editor[resizingName];

                    if (resizing && !resizing.resizingInProgress()) {
                        that._destroyResizing(editor, options);
                    }
                });
        },

        _initResizing: function(editor, tableElement, options) {
            var resizingName = options.name;
            var resizingType = options.type;

            editor[resizingName] = new resizingType(tableElement, {
                rtl: kendo.support.isRtl(editor.element),
                rootElement: editor.body
            });
        },

        _destroyResizing: function(editor, options) {
            var resizingName = options.name;

            if (editor[resizingName]) {
                editor[resizingName].destroy();
                editor[resizingName] = null;
            }
        }
    });
    ResizingFactory.current = new ResizingFactory();

    TableElementResizing.initResizing = function(editor, options) {
        return ResizingFactory.current.create(editor, options);
    };

    extend(Editor, {
        TableElementResizing: TableElementResizing
    });

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
