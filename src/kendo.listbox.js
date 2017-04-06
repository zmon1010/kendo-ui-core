/* jshint eqnull: true */
(function(f, define){
    define([ "./kendo.draganddrop", "./kendo.data", "./kendo.selectable" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "listbox",
    name: "ListBox",
    category: "web",
    depends: ["draganddrop", "data", "selectable"]
};

(function($, undefined) {
    var kendo = window.kendo;
    var kendoAttr = kendo.attr;
    var data = kendo.data;
    var keys = kendo.keys;
    var Widget = kendo.ui.Widget;
    var DataSource = data.DataSource;
    var Selectable = kendo.ui.Selectable;
    var DataBoundWidget = kendo.ui.DataBoundWidget;
    var Class = kendo.Class;

    var extend = $.extend;
    var noop = $.noop;
    var proxy = $.proxy;

    var DOT = ".";
    
    var KENDO_LISTBOX = "kendoListBox";
    var NS = DOT + KENDO_LISTBOX;
    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var ENABLED_ITEM_SELECTOR = ".k-item:not(.k-state-disabled)";
    var ENABLED_ITEMS_SELECTOR = ".k-list:not(.k-state-disabled) >" + ENABLED_ITEM_SELECTOR;
    var TOOLBAR_CLASS = "k-listbox-toolbar";
    var FOCUSED_CLASS = "k-state-focused";
    var DRAG_CLUE_CLASS = "k-drag-clue";
    var DROP_HINT_CLASS = "k-drop-hint";
    var LIST_CLASS = "k-reset k-list";
    var LIST_SELECTOR = ".k-reset.k-list";

    var CLICK = "click" + NS;
    var KEYDOWN = "keydown" + NS;
    var BLUR = "blur" + NS;
    var outerWidth = kendo._outerWidth;
    var outerHeight = kendo._outerHeight;
    var CHANGE = "change";
    var DATABOUND = "dataBound";
    var ADD = "add";
    var REMOVE = "remove";
    var RECEIVE = "receive";
    var REORDER = "reorder";
    var TRANSFER = "transfer";
    var MOVE_UP = "moveUp";
    var MOVE_DOWN = "moveDown";
    var TRANSFER_TO = "transferTo";
    var TRANSFER_FROM = "transferFrom";
    var TRANSFER_ALL_TO = "transferAllTo";
    var TRANSFER_ALL_FROM = "transferAllFrom";
    var BEFORE_MOVE = "beforeMove";
    var DRAGGEDCLASS = "paleClass";
    var UNIQUE_ID = "uid";
    var TABINDEX = "tabindex";

    var MOVE_UP_OFFSET = -1;
    var MOVE_DOWN_OFFSET = 1;
    var START = "start";
    var MOVE = "move";
    var END = "end";
    var DEFAULT_FILTER = "ul.k-reset.k-list>li.k-item";

    function getSortedDomIndices(items) {
        var indices = $.map(items, function(item) {
            return $(item).index();
        });

        return indices.sort();
    }

    function isUndefined(value) {
        return (typeof value === "undefined");
    }

    function defaultHint(element) {
        return element.clone().addClass(DRAG_CLUE_CLASS);
    }

    function defaultPlaceholder() {
        return $('<li>').addClass(DROP_HINT_CLASS);
    }

    var ListBox = DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            that._wrapper();
            element = that.element.attr("multiple", "multiple").hide();

            if (element[0] && !that.options.dataSource) {
                that.options.dataTextField = that.options.dataTextField || "text";
                that.options.dataValueField = that.options.dataValueField || "value";
            }
            that._templates();
            that._selectable();
            that._dataSource();
            that._createToolbar();
            that._createDraggable();
            that._createNavigatable();
        },

        destroy: function() {
            var that = this;

            DataBoundWidget.fn.destroy.call(that);

            that._unbindDataSource();
            that._destroySelectable();
            that._destroyToolbar();
            that.wrapper.off(NS);
            if(that._target){
                that._target = null;
            }
            if(that._draggable) {
                that._draggable.destroy();
            }

            kendo.destroy(that.element);
        },

        events: [
            CHANGE,
            DATABOUND,
            ADD,
            REMOVE,
            REORDER,
            START,
            MOVE,
            END,
            BEFORE_MOVE
        ],

        options: {
            name: "ListBox",
            autoBind: true,
            template: "",
            dataTextField: null,
            dataValueField: null,
            selectable: "single",
            reorderable: false,
            draggable: false,
            dropSources : [],
            hint: null,
            placeholder: null,
            disabled: null,
            filter: DEFAULT_FILTER,
            connectWith: "",
            navigatable: false
        },

        add: function(dataItems) {
            var that = this;
            var items = dataItems && dataItems.length ? dataItems : [dataItems];
            var itemsLength = items.length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                that._addItem(items[i]);
            }
        },

        _addItem: function(dataItem) {
            var that = this;
            var item = that.templates.itemTemplate(dataItem);

            $(item).attr(kendoAttr(UNIQUE_ID), dataItem.uid).appendTo(that._getList());
            that._unbindDataSource();
            that.dataSource.add(dataItem);
            that._bindDataSource();
        },

        _insertElementAt: function(item, index) {
            var that = this;
            var list = that._getList();

            if (index > 0) {
                $(item).insertAfter(list.children().eq(index - 1));
            } else {
                $(list).prepend(item);
            }
        },

        _createNavigatable: function() {
            var that = this;
            var options = that.options;
            var tabIndex;

            if(options.navigatable) {
                if(!that.options.selectable) {
                    throw new Error("Keyboard navigation requires selection to be enabled");
                }
                that.wrapper.on(CLICK, ENABLED_ITEMS_SELECTOR, proxy(that._click, that))
                            .on(KEYDOWN, proxy(that._keyDown, that))
                            .on(BLUR, LIST_SELECTOR, proxy(that._blur, that));

                tabIndex = that.element.attr(TABINDEX);            
                that._tabIndex = !isNaN(tabIndex) ? tabIndex : 0;
            }
        },

        _blur: function() {
            if(this._target) {
                this._target.removeClass(FOCUSED_CLASS);
            }
            this._target = null;
        },

        _click: function(e) {
            var that = this;
            var target = $(e.currentTarget);
            var oldTarget = that._target;

            if(oldTarget) {
                oldTarget.removeClass(FOCUSED_CLASS);
            }

            that._target = target;
            target.addClass(FOCUSED_CLASS);
            if(that._getList()[0] !== kendo._activeElement()){
                that.focus();
            }
        },

        _getNavigatableItem: function(key) {
            var that = this;
            var current;

            if(!that._target){
                current = that.items().filter(ENABLED_ITEM_SELECTOR).first();
            }  else {
                current = that._target;
            }

            if(key === keys.UP && that._target) {
                current = that._target.prev(ENABLED_ITEM_SELECTOR);
            }

            if(key === keys.DOWN && that._target) {
                current = that._target.next(ENABLED_ITEM_SELECTOR);
            }

            return current.length ? current : null;
        },

        _keyDown: function(e) {
            var that = this;
            var key = e.keyCode;
            var current = that._getNavigatableItem(key);
            var shouldPreventDefault;
            var index;

            if(key == keys.DELETE) {
                that.remove(that.select());
                if(that._target) {
                    that._target.removeClass(FOCUSED_CLASS);
                    that._target = null;
                }
                shouldPreventDefault = true;
            } else if(key === keys.DOWN || key === keys.UP) {
                if(that._target) {
                    that._target.removeClass(FOCUSED_CLASS);
                }
                if (e.shiftKey) {
                    if(e.ctrlKey) {
                        index = that.items().index(current);
                        if(!that.trigger(REORDER, { dataItem: that.dataItem(that._target), item: $(that._target) })) {
                            that.reorder(that._target, index);
                            return;
                        }
                    } else {
                        that.select(that._target);
                        that.select(current);
                    }
                } 
                that._target = current;
                that._target.addClass(FOCUSED_CLASS);
                shouldPreventDefault = true;
            } else if(key == keys.SPACEBAR) {
                if(e.ctrlKey && that._target) {
                   if(that._target.hasClass(SELECTED_STATE_CLASS)) {
                       that._target.removeClass(SELECTED_STATE_CLASS);
                   } else {
                       that.select(that._target);
                   }
                } else {
                    that.clearSelection();
                    that.select(that._target);
                } 
                shouldPreventDefault = true;
            } else if(e.ctrlKey && key == keys.RIGHT) {
                if(e.shiftKey) {
                   that._executeCommand(TRANSFER_ALL_TO);
                } else {
                   that._executeCommand(TRANSFER_TO);
                }
                shouldPreventDefault = true;
            } else if(e.ctrlKey && key == keys.LEFT) {
                if(e.shiftKey) {
                   that._executeCommand(TRANSFER_ALL_FROM);
                } else {
                   that._executeCommand(TRANSFER_FROM);
                }
                shouldPreventDefault = true;
            }
            
            if(shouldPreventDefault) {
                e.preventDefault();
            }
        },

        focus: function() {
            this._getList().focus();
        },

        _createDraggable: function() {
            var that = this;
            var options = that.options;

            if(options.draggable) {
                if(!that.options.selectable) {
                    throw new Error("Dragging requires selection to be enabled");
                }

                if(!that.options.placeholder) {
                    that.options.placeholder = defaultPlaceholder;
                }

                if(!that.options.hint) {
                    that.options.hint = defaultHint;
                }

                that._draggable = new kendo.ui.Draggable(that.wrapper, {
                    filter: options.filter,
                    hint: options.hint,
                    dragstart: proxy(that._dragstart, that),
                    dragcancel: proxy(that._clear, that),
                    drag: proxy(that._drag, that),
                    dragend: proxy(that._dragend, that)
                });
            }
        },

        _dragstart: function(e) {
            var that = this;
            var draggedElement = that.draggedElement = e.currentTarget;
            var disabled = that.options.disabled;
            var dataItem = that.dataItem(draggedElement);
            var eventData = { dataItem: dataItem, item: $(draggedElement), draggableEvent: e };

            that.placeholder = $(that.options.placeholder.call(that, draggedElement));

            if(disabled && draggedElement.is(disabled)) {
                e.preventDefault();
            } else {
                if(that.trigger(START, eventData)) {
                    e.preventDefault();
                } else {
                    that.clearSelection();
                    that.select(draggedElement);
                    draggedElement.addClass(DRAGGEDCLASS);
                }
            }
        },

        _clear: function() {
            this.placeholder.remove();
        },

        _findElementUnderCursor: function(e) {
            var elementUnderCursor = kendo.elementUnderCursor(e);
            var draggable = e.sender;

            if($.contains(draggable.hint[0], elementUnderCursor) || draggable.hint[0] === elementUnderCursor) {
                draggable.hint.hide();
                elementUnderCursor = kendo.elementUnderCursor(e);
                draggable.hint.show();
            }

            return elementUnderCursor;
        },

        _findTarget: function(e) {
            var that = this;
            var element = that._findElementUnderCursor(e);
            var list = that._getList()[0];
            var items;
            var node;

            if($.contains(list, element)) {
                if(!that.options.reorderable) {
                    return null;
                }

                items = that.items();
                node = items.filter(element)[0] || items.has(element)[0];
                return node && !$(node).hasClass(SELECTED_STATE_CLASS) ? { element: $(node) } : null;
            } else if (list == element && !that.items().length) {
                return { element: that.element, appendToBottom: true };
            } else {
                return that._searchConnectedListBox(element);
            }
        },

        _getElementCenter: function(element) {
            var center = element.length ? kendo.getOffset(element) : null;
            if(center) {
                center.top += outerHeight(element) / 2;
                center.left += outerWidth(element) / 2;
            }

            return center;
        },

        _searchConnectedListBox: function(element) {
            var connectedListBox;
            var items;
            var node;

            element = $(element);

            if(element.getKendoListBox()) {
                connectedListBox = element.getKendoListBox();
            }

            if(!connectedListBox) {
                connectedListBox = element.closest(".k-list-scroller.k-selectable").next().getKendoListBox();
            }

            if(connectedListBox && $.inArray(this.element[0].id, connectedListBox.options.dropSources) !== -1) {
                items = connectedListBox.items();
                node = items.filter(element)[0] || items.has(element)[0];
                if(node) {
                    return { element: $(node), listBox: connectedListBox };
                } else {
                    return null;
                }
            }
            return null;
        },

        _drag: function(e) {
            var that = this;
            var draggedElement = that.draggedElement;
            var target = that._findTarget(e);
            var cursorOffset = { left: e.x.location, top: e.y.location };
            var dataItem = that.dataItem(draggedElement);
            var eventData = { dataItem: dataItem, item: $(draggedElement), draggableEvent: e };
            var targetCenter;
            var offsetDelta;
            var direction;
            var sibling;
            var getSibling;

            if(target) {
                targetCenter = this._getElementCenter(target.element);

                offsetDelta = {
                    left: Math.round(cursorOffset.left - targetCenter.left),
                    top: Math.round(cursorOffset.top - targetCenter.top)
                };

                if(target.appendToBottom) {
                    that._movePlaceholder(target, null, eventData);
                    return;
                }

                if(offsetDelta.top < 0) {
                    direction = "prev";
                } else if(offsetDelta.top > 0) {
                    direction = "next";
                }

                if(direction) {
                    getSibling = (direction === "prev") ? jQuery.fn.prev : jQuery.fn.next;

                    sibling = getSibling.call(target.element);

                    while(sibling.length && !sibling.is(":visible")) {
                        sibling = getSibling.call(sibling);
                    }

                    if(sibling[0] != that.placeholder[0]) {
                        that._movePlaceholder(target, direction, eventData);
                    }
                }
            }
        },

        _movePlaceholder: function(target, direction, eventData) {
            var placeholder = this.placeholder;

            if (!this.trigger(BEFORE_MOVE, eventData)) {
                if (!direction) {
                    target.element.append(placeholder);
                } else if (direction === "prev") {
                    target.element.before(placeholder);
                } else if (direction === "next") {
                    target.element.after(placeholder);
                }

                this.trigger(MOVE, eventData);
            }
        },

        _dragend: function(e) {
            var that = this;
            var draggedItem = that.draggedElement;
            var items = that.items();
            var placeholderIndex = items.not(that.draggedElement).index(that.placeholder);
            var draggedIndex = items.index(that.draggedElement);
            var dataItem = that.dataItem(draggedItem);
            var eventData = { dataItem: dataItem, item: $(draggedItem), index: placeholderIndex, draggableEvent: e };
            var connectedListBox = that.placeholder.closest(".k-list-scroller.k-selectable").next().getKendoListBox();

            if(placeholderIndex >= 0) {
                if(placeholderIndex !== draggedIndex && !that.trigger(REORDER, $.extend({}, eventData, { action: REORDER }))) {
                     that.reorder(draggedItem, placeholderIndex);
                }
            } else if(connectedListBox) {
                if(!that.trigger(END, $.extend({}, eventData, { action: REMOVE }))) {
                   that._removeItem(draggedItem);
                }

                if(!connectedListBox.trigger(TRANSFER, $.extend({}, eventData, { action: RECEIVE }))) {
                    connectedListBox.add(dataItem);
                }
            }

            that._clear();
            that._draggable.dropped = true;
        },

        reorder: function(item, index) {
            var that = this;
            var dataSource = that.dataSource;
            var dataItem = that.dataItem(item);
            var dataItemAtIndex = dataSource.at(index);
            var itemAtIndex = that.items()[index];

            if (dataItem && itemAtIndex && dataItemAtIndex) {
                that._unbindDataSource();
                dataSource.remove(dataItem);
                dataSource.insert(index, dataItem);
                that._bindDataSource();
                that._removeElement(item);
                that._insertElementAt(item, index);
            }
        },

        remove: function(items) {
            var that = this;
            var itemsLength = (items || []).length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                that._removeItem($(items[i]));
            }
        },

        _removeItem: function(item) {
            var that = this;
            var dataSource = that.dataSource;
            var dataItem = that.dataItem(item);

            if (dataItem) {
                that._unbindDataSource();
                dataSource.remove(dataItem);
                that._bindDataSource();
                that._removeElement(item);
            }
        },

        _removeElement: function(item) {
            kendo.destroy(item);
            $(item).off().remove();
        },

        dataItem: function(element) {
            var uniqueIdAttr = kendoAttr(UNIQUE_ID);
            var uid = $(element).attr(uniqueIdAttr) || $(element).closest("[" + uniqueIdAttr + "]").attr(uniqueIdAttr);

           return this.dataSource.getByUid(uid);
        },

        _dataItems: function(items) {
            var dataItems = [];
            var listItems = $(items);
            var itemsLength = listItems.length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                dataItems.push(this.dataItem(listItems.eq(i)));
            }

            return dataItems;
        },

        items: function() {
            var list = this._getList();
            return list.children();
        },

        select: function(items) {
            var that = this;
            var selectable = that.selectable;
            var enabledItems;

            if (isUndefined(items)) {
                return selectable.value();
            }

            enabledItems = that.items().filter(items).filter(ENABLED_ITEMS_SELECTOR);

            if (!selectable.options.multiple) {
                selectable.clear();
                enabledItems = enabledItems.first();
            }

            return selectable.value(enabledItems);
        },

        clearSelection: function() {
            this.selectable.clear();
        },

        enable: function(items, enable) {
            var that = this;
            var enabled = isUndefined(enable) ? true : !!enable;
            var itemsLength = $(items).length;
            var i;

            for (i = 0; i < itemsLength; i++) {
                that._enableItem($(items[i]), enabled);
            }
        },

        _enableItem: function(item, enable) {
            var that = this;
            var dataItem = that.dataItem(item);

            if (dataItem) {
                if (enable) {
                    $(item).removeClass(DISABLED_STATE_CLASS);
                } else {
                    $(item)
                        .addClass(DISABLED_STATE_CLASS)
                        .removeClass(SELECTED_STATE_CLASS);
                }
            }
        },

        setDataSource: function(dataSource) {
            var that = this;

            that.options.dataSource = dataSource;

            that._dataSource();
        },

        _dataSource: function() {
            var that = this;
            var options = that.options;
            var dataSource = options.dataSource || {};

            dataSource = $.isArray(dataSource) ? { data: dataSource } : dataSource;
            dataSource.select = that.element;
            dataSource.fields = [
                { field: options.dataTextField },
                { field: options.dataValueField }];

            that._unbindDataSource();
            that.dataSource = DataSource.create(dataSource);
            that._bindDataSource();

            if (that.options.autoBind) {
                that.dataSource.fetch();
            }
        },

        _bindDataSource: function() {
            var that = this;
            var dataSource = that.dataSource;

            that._dataChangeHandler = proxy(that._refresh, that);

            if (dataSource) {
                dataSource.bind(CHANGE, that._dataChangeHandler);
            }
        },

        _unbindDataSource: function() {
            var that = this;
            var dataSource = that.dataSource;

            if (dataSource) {
                dataSource.unbind(CHANGE, that._dataChangeHandler);
            }
        },

        _wrapper: function () {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.k-multiselect");

            if (!wrapper[0]) {
                wrapper = element.wrap('<div class="k-widget k-listbox k-listbox-toolbar-top" deselectable="on" />').parent();
                wrapper[0].style.cssText = element[0].style.cssText;
                wrapper[0].title = element[0].title;
                $('<div class="k-list-scroller" />').insertBefore(element);
            }

            that.wrapper = wrapper.addClass(element[0].className).css("display", "");
            that._innerWrapper = $(wrapper[0].firstChild);
        },

        _templates: function () {
            var that = this;
            var options = this.options;
            var template;
            that.templates = {};

            if (options.template && typeof options.template == "string") {
                template = kendo.template(options.template);
            } else if (!options.template) {
                template =  kendo.template('<li class="k-item">${' + kendo.expr(options.dataTextField, "data") + "}</li>", { useWithBlock: false });
            } else {
                template = options.template;
            }

            that.templates.itemTemplate = template;
        },

        refresh: function() {
            var that = this;

            that._refresh();
            that.trigger(DATABOUND);
        },

        _refresh: function() {
            var that = this;
            var view = that.dataSource.view();
            var template = that.templates.itemTemplate;
            var html = "";

            html += "<ul class='" + LIST_CLASS + "'>";
            for (var idx = 0; idx < view.length; idx++) {
                html += template(view[idx]);
            }
            html+= "</ul>";
            that._innerWrapper.html(html);
            if(that.options.navigatable) {
                that._getList().attr(TABINDEX, that._tabIndex);
            }
            that.element.find("*").off().end().html(html);
            that._setItemIds();
            that._destroyToolbar();
            that._createToolbar();
        },

        _setItemIds: function() {
            var that = this;
            var items = that.items();
            var view = that.dataSource.view();
            var viewLength = view.length;
            var i;

            for (i = 0; i < viewLength; i++) {
                items.eq(i).attr(kendoAttr(UNIQUE_ID), view[i].uid);
            }
        },

        _selectable: function() {
            var that = this;
            var selectable = that.options.selectable;
            var selectableOptions = Selectable.parseOptions(selectable);

            that.selectable = new Selectable(that._innerWrapper, {
                aria: true,
                multiple: selectableOptions.multiple,
                filter: ENABLED_ITEM_SELECTOR,
                change: function() {
                    that.trigger(CHANGE);
                }
            });
        },

        _destroySelectable: function() {
            var that = this;

            if (that.selectable) {
                that.selectable.destroy();
                that.selectable = null;
            }
        },

        _getList: function() {
            return this.wrapper.find(LIST_SELECTOR);
        },

        _listItemComparer: function(item1, item2) {
            var indexItem1 = $(item1).index();
            var indexItem2 = $(item2).index();

            if (indexItem1 === indexItem2) {
                return 0;
            } else {
                return (indexItem1 > indexItem2 ? 1 : (-1));
            }
        },

        _createToolbar: function () {
            var that = this;

            if (!that.toolbar) {
                var prefix = '<li><a href="#" class="k-button k-button-icon k-tool" data-command="';
                that.toolbar = $(
                    "<div class='" + TOOLBAR_CLASS + "'><ul>" +
                    prefix + MOVE_UP + '"><span class="k-icon k-i-arrow-60-up"></span></span></li>' +
                    prefix + MOVE_DOWN + '"><span class="k-icon k-i-arrow-60-down"></span></span></li>' +
                    prefix + REMOVE + '"><span class="k-icon k-i-x"></span></span></li>' +
                    prefix + TRANSFER_TO + '"><span class="k-icon k-i-arrow-60-right"></span></span></li>' +
                    prefix + TRANSFER_FROM + '"><span class="k-icon k-i-arrow-60-left"></span></span></li>' +
                    prefix + TRANSFER_ALL_TO + '"><span class="k-icon k-i-arrow-double-60-right"></span></span></li>' +
                    prefix + TRANSFER_ALL_FROM + '"><span class="k-icon k-i-arrow-double-60-left"></span></span></li>' +
                    "</ul></div>").insertBefore(that._innerWrapper);


                that.toolbar.on(CLICK, "a.k-button", proxy(that._onToolbarClick, that));
            }
        },

        _destroyToolbar: function() {
            var that = this;

            kendo.destroy(that.toolbar);
            $(that.toolbar).off(NS).remove();
            that.toolbar = null;
        },

        _onToolbarClick: function(e) {
            var that = this;

            e.preventDefault();
            e.stopPropagation();

            that._executeCommand($(e.currentTarget).data("command"), { listBox: that });
        },

        _executeCommand: function(commandName, options) {
            var command = CommandFactory.current.create(commandName, options);

            if (command) {
                command.execute();
            }
        }
    });

    kendo.ui.plugin(ListBox);

    var CommandFactory = Class.extend({
        init: function() {
            this._commands = [];
        },

        register: function(commandName, commandType) {
            this._commands.push({
                commandName: commandName,
                commandType: commandType
            });
        },

        create: function(commandName, options) {
            var commands = this._commands;
            var itemsLength = commands.length;
            var name = commandName ? commandName.toLowerCase() : "";
            var match;
            var command;
            var i;

            for (i = 0; i < itemsLength; i++) {
                command = commands[i];

                if (command.commandName.toLowerCase() === name) {
                    match = command;
                    break;
                }
            }

            if (match) {
                return new match.commandType(options);
            }
        }
    });
    CommandFactory.current = new CommandFactory();

    var ListBoxCommand = Class.extend({
        init: function(options) {
            var that = this;

            that.options = extend({}, that.options, options);
            that.listBox = that.options.listBox;
        },

        options: {
            listBox: null
        },

        getItems: function() {
            return $(this.listBox.select());
        },

        execute: noop,
        updateSelection: noop
    });

    var RemoveItemsCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;
            var listBox = that.listBox;
            var items = that.getItems();

            if (!listBox.trigger(REMOVE, { dataItems: listBox._dataItems(items), items: items })) {
                listBox.remove(items);
                that.updateSelection();
            }
        },

        updateSelection: function() {
            this.listBox.clearSelection();
        }
    });
    CommandFactory.current.register(REMOVE, RemoveItemsCommand);

    var MoveItemsCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;

            if (that.canMoveItems()) {
                that.moveItems();
            }
        },

        canMoveItems: noop,

        moveItems: function() {
            var that = this;
            var listBox = that.listBox;
            var options = that.options;
            var items = that.getItems();
            var offset = options.offset;
            var domIndices = getSortedDomIndices(items);
            var movedItems = $.makeArray(items.sort(that.itemComparer));
            var moveAction = options.moveAction;
            var movedItem;

            if (!listBox.trigger(REORDER, { dataItems: listBox._dataItems(movedItems), items: $(movedItems), offset: offset })) {
                while (movedItems.length > 0 && domIndices.length > 0) {
                    movedItem = movedItems[moveAction]();

                    listBox.reorder(movedItem, domIndices[moveAction]() + offset);
                }
            }
        },

        options: {
            offset: 0,
            moveAction: "pop"
        },

        itemComparer: function(item1, item2) {
            var indexItem1 = $(item1).index();
            var indexItem2 = $(item2).index();

            if (indexItem1 === indexItem2) {
                return 0;
            } else {
                return (indexItem1 > indexItem2 ? 1 : (-1));
            }
        }
    });

    var MoveUpItemsCommand = MoveItemsCommand.extend({
        options: {
            offset: MOVE_UP_OFFSET,
            moveAction: "shift"
        },

        canMoveItems: function() {
            var items = this.getItems();
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && domIndices[0] > 0);
        }
    });
    CommandFactory.current.register(MOVE_UP, MoveUpItemsCommand);

    var MoveDownItemsCommand = MoveItemsCommand.extend({
        options: {
            offset: MOVE_DOWN_OFFSET,
            moveAction: "pop"
        },

        canMoveItems: function() {
            var that = this;
            var items = that.getItems();
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && $(domIndices).last()[0] < (that.listBox.items().length - 1));
        }
    });
    CommandFactory.current.register(MOVE_DOWN, MoveDownItemsCommand);

    var TransferItemsCommand = ListBoxCommand.extend({
        options: {
            itemSelector: ENABLED_ITEM_SELECTOR
        },

        execute: function() {
            var that = this;
            var sourceListBox = that.getSourceListBox();
            var items = that.getItems().filter(that.options.itemSelector);
            var dataItems = sourceListBox ? sourceListBox._dataItems(items) : [];
            var destinationListBox = that.getDestinationListBox();
            var updatedSelection = that.getUpdatedSelection(items);

            if (destinationListBox && items.length > 0) {
                if (!destinationListBox.trigger(ADD, { dataItems: dataItems, items: items })) {
                    destinationListBox.add(dataItems);
                }

                if (!sourceListBox.trigger(REMOVE, { dataItems: dataItems, items: items })) {
                    sourceListBox.remove(items);
                    that.updateSelection(updatedSelection);
                }
            }
        },

        getUpdatedSelection: function(items) {
            var that = this;
            var sourceListBox = that.getSourceListBox();
            var nextItem = $(items).nextAll(that.options.itemSelector)[0];

            if (nextItem) {
                return $(nextItem);
            } else {
                return sourceListBox ? sourceListBox.items().not(items).filter(that.options.itemSelector).first() : $();
            }
        },

        updateSelection: function(items) {
            var sourceListBox = this.getSourceListBox();

            if (sourceListBox) {
                $(sourceListBox.select(items));
            }
        },

        getSourceListBox: noop,
        getDestinationListBox: noop
    });

    var TransferItemsToCommand = TransferItemsCommand.extend({
        getSourceListBox: function() {
            return this.listBox;
        },

        getDestinationListBox: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.options.connectWith).data(KENDO_LISTBOX) : null;
        },

        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.select()) : $();
        }
    });
    CommandFactory.current.register(TRANSFER_TO, TransferItemsToCommand);

    var TransferItemsFromCommand = TransferItemsCommand.extend({
        getSourceListBox: function() {
            var destinationListBox = this.getDestinationListBox();
            return destinationListBox ? $(destinationListBox.options.connectWith).data(KENDO_LISTBOX) : null;
        },

        getDestinationListBox: function() {
            return this.listBox;
        },

        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? $(sourceListBox.select()) : $();
        }
    });
    CommandFactory.current.register(TRANSFER_FROM, TransferItemsFromCommand);

    var TransferAllItemsToCommand = TransferItemsToCommand.extend({
        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? sourceListBox.items() : $();
        }
    });
    CommandFactory.current.register(TRANSFER_ALL_TO, TransferAllItemsToCommand);

    var TransferAllItemsFromCommand = TransferItemsFromCommand.extend({
        getItems: function() {
            var sourceListBox = this.getSourceListBox();
            return sourceListBox ? sourceListBox.items() : $();
        }
    });
    CommandFactory.current.register(TRANSFER_ALL_FROM, TransferAllItemsFromCommand);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
