(function(f, define){
    define([ "./kendo.data", "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "kendo.treeview.draganddrop",
    name: "Hierarchical Drag & Drop",
    category: "framework",
    depends: [ "core", "draganddrop" ],
    advanced: true
};

(function($, undefined){
    var kendo = window.kendo;
    var ui = kendo.ui;
    var proxy = $.proxy;
    var extend = $.extend;
    var DRAGSTART = "dragstart";
    var DRAG = "drag";
    var DROP = "drop";
    var VISIBILITY = "visibility";
    var KSTATEHOVER = "k-state-hover";

    var HierarchicalDragAndDrop = ui.HierarchicalDragAndDrop = kendo.Class.extend({
        init: function (widget, options) {
            this.widget = widget;
            this.hovered = widget.element;
            this.options = options;

            this._draggable = new ui.Draggable(widget.element, {
                filter: options.filter,
                autoScrolL: options.autoScroll,
                cursorOffset: {
                    left: 10,
                    top: kendo.support.mobileOS ? -40 / kendo.support.zoomLevel() : 10
                },
                hint: proxy(this._hint, this),
                dragstart: proxy(this.dragstart, this),
                dragcancel: proxy(this.dragcancel, this),
                drag: proxy(this.drag, this),
                dragend: proxy(this.dragend, this),
                $angular: widget.options.$angular
            });
        },

        _hint: function(element) {
            return "<div class='k-header k-drag-clue'>" +
                        "<span class='k-icon k-drag-status' />" +
                        this.options.hintText(element) +
                    "</div>";
        },

        _removeTouchHover: function() {
            if (kendo.support.touch && this.hovered) {
                this.hovered.find("." + KSTATEHOVER).removeClass(KSTATEHOVER);
                this.hovered = false;
            }
        },

        _hintStatus: function(newStatus) {
            var statusElement = this._draggable.hint.find(".k-drag-status")[0];

            if (newStatus) {
                statusElement.className = "k-icon k-drag-status " + newStatus;
            } else {
                return $.trim(statusElement.className.replace(/k-(icon|drag-status)/g, ""));
            }
        },

        dragstart: function (e) {
            var widget = this.widget;
            var sourceNode = this.sourceNode = e.currentTarget.closest(this.options.itemSelector);

            if (widget.trigger(DRAGSTART, { sourceNode: sourceNode[0] })) {
                e.preventDefault();
            }

            this.dropHint = $("<div class='k-drop-hint' />")
                .css(VISIBILITY, "hidden")
                .appendTo(widget.element);
        },

        drag: function (e) {
            var options = this.options;
            var widget = this.widget;
            var sourceNode = this.sourceNode;
            var target = this.dropTarget = $(kendo.eventTarget(e));
            var container = target.closest(options.allowedContainers);
            var hoveredItem, itemHeight, itemTop, itemContent, delta;
            var insertOnTop, insertOnBottom, addChild;
            var itemData, position, statusClass;

            if (!container.length) {
                // dragging outside of allowed widgets
                statusClass = "k-denied";
                this._removeTouchHover();
            } else if (options.contains(sourceNode[0], target[0])) {
                // dragging item within itself
                statusClass = "k-denied";
            } else {
                // moving or reordering item
                statusClass = "k-insert-middle";

                itemData = options.itemFromTarget(target);
                hoveredItem = itemData.item;

                if (hoveredItem.length) {
                    this._removeTouchHover();
                    itemHeight = hoveredItem.outerHeight();
                    itemContent = itemData.content;

                    if (options.reorderable === false) {
                        addChild = true;
                        insertOnTop = false;
                        insertOnBottom = false;
                    } else {
                        delta = itemHeight / (itemContent.length > 0 ? 4 : 2);
                        itemTop = kendo.getOffset(hoveredItem).top;

                        insertOnTop = e.y.location < (itemTop + delta);
                        insertOnBottom = (itemTop + itemHeight - delta) < e.y.location;
                        addChild = itemContent.length && !insertOnTop && !insertOnBottom;
                    }

                    this.hovered = addChild ? container : false;

                    this.dropHint.css(VISIBILITY, addChild ? "hidden" : "visible");

                    if (this._lastHover && this._lastHover[0] != itemContent[0]) {
                        this._lastHover.removeClass(KSTATEHOVER);
                    }

                    this._lastHover = itemContent.toggleClass(KSTATEHOVER, addChild);

                    if (addChild) {
                        statusClass = "k-add";
                    } else {
                        position = hoveredItem.position();
                        position.top += insertOnTop ? 0 : itemHeight;

                        this.dropHint.css(position)
                            [insertOnTop ? "prependTo" : "appendTo"]
                            (options.dropHintContainer(hoveredItem));

                        if (insertOnTop && itemData.first) {
                            statusClass = "k-insert-top";
                        }

                        if (insertOnBottom && itemData.last) {
                            statusClass = "k-insert-bottom";
                        }
                    }
                } else if (target[0] != this.dropHint[0]) {
                    if (container[0] != widget.element[0]) {
                        // moving node to different widget without children
                        statusClass = "k-add";
                    } else {
                        statusClass = "k-denied";
                    }
                }
            }

            // TODO: trigger events via callbacks
            widget.trigger(DRAG, {
                sourceNode: sourceNode[0],
                dropTarget: target[0],
                pageY: e.y.location,
                pageX: e.x.location,
                statusClass: statusClass.substring(2),
                setStatusClass: function (value) {
                    statusClass = value;
                }
            });

            if (statusClass == "k-denied" && this._lastHover) {
                this._lastHover.removeClass(KSTATEHOVER);
            }

            if (statusClass.indexOf("k-insert") !== 0) {
                this.dropHint.css(VISIBILITY, "hidden");
            }

            this._hintStatus(statusClass);
        },

        dragcancel: function() {
            this.dropHint.remove();
        },

        dragend: function () {
            var that = this,
                widget = that.widget,
                dropPosition = "over",
                sourceNode = that.sourceNode,
                destinationNode,
                dropHint = that.dropHint,
                dropTarget = that.dropTarget,
                e, dropPrevented;

            if (dropHint.css(VISIBILITY) == "visible") {
                dropPosition = this.options.dropPositionFrom(dropHint);
                destinationNode = dropHint.closest(this.options.itemSelector);
            } else if (dropTarget) {
                destinationNode = dropTarget.closest(this.options.itemSelector);

                // moving node to root element
                if (!destinationNode.length) {
                    destinationNode = dropTarget.closest(this.options.allowedContainers);
                }
            }

            e = {
                sourceNode: sourceNode[0],
                destinationNode: destinationNode[0],
                valid: that._hintStatus() != "k-denied",
                setValid: function(newValid) {
                    this.valid = newValid;
                },
                dropTarget: dropTarget[0],
                dropPosition: dropPosition
            };

            dropPrevented = widget.trigger(DROP, e);

            dropHint.remove();
            that._removeTouchHover();
            if (this._lastHover) {
                this._lastHover.removeClass(KSTATEHOVER);
            }

            if (!e.valid || dropPrevented) {
                that._draggable.dropped = e.valid;
                return;
            }

            that._draggable.dropped = true;

            this.options.dragEnd(sourceNode, destinationNode, dropPosition);
        },

        destroy: function() {
            this._lastHover = this.hovered = null;
            this._draggable.destroy();
        }
    });

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
