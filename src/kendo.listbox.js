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
    var Widget = kendo.ui.Widget;
    var DataSource = data.DataSource;
    var Selectable = kendo.ui.Selectable;
    var DataBoundWidget = kendo.ui.DataBoundWidget;
    var Class = kendo.Class;

    var extend = $.extend;
    var proxy = $.proxy;

    var DOT = ".";
    var COMMA = ",";

    var KENDO_LISTBOX = "kendoListBox";
    var NS = DOT + KENDO_LISTBOX;
    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var ENABLED_ITEM_SELECTOR = ".k-listbox-list:not(.k-state-disabled) > .k-item:not(.k-state-disabled)";
    var TOOLBAR_CLASS = "k-listbox-toolbar";
    var LISTBOX_CLASS = "k-listbox";
    var REMOVE_TOOL_CLASS = "k-listbox-remove";
    var MOVE_UP_TOOL_CLASS = "k-listbox-moveup";
    var MOVE_DOWN_TOOL_CLASS = "k-listbox-movedown";
    var TRANSFER_TO_TOOL_CLASS = "k-listbox-transfer-to";
    var TRANSFER_FROM_TOOL_CLASS = "k-listbox-transfer-from";
    var LIST_CLASS = "k-listbox-list";
    var TOOLS_CLASS_NAMES = [
        DOT + REMOVE_TOOL_CLASS,
        DOT + MOVE_UP_TOOL_CLASS,
        DOT + MOVE_DOWN_TOOL_CLASS,
        DOT + TRANSFER_TO_TOOL_CLASS,
        DOT + TRANSFER_FROM_TOOL_CLASS
    ];

    var CLICK = "click" + NS;
    var CHANGE = "change";
    var DATABOUND = "dataBound";
    var REMOVE = "remove";
    var REORDER = "reorder";
    var TRANSFER = "transfer";
    var MOVE_UP = "moveUp";
    var MOVE_DOWN = "moveDown";
    var TRANSFER_TO = "transferTo";
    var TRANSFER_FROM = "transferFrom";
    var UNIQUE_ID = "uid";

    var MOVE_UP_OFFSET = -1;
    var MOVE_DOWN_OFFSET = 1;
    
    function getSortedDomIndices(items) {
        var indices = $.map(items, function(item) {
            return $(item).index();
        });

        return indices.sort();
    }

    function isUndefined(value) {
        return (typeof value === "undefined");
    }

    var ListBox = DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            that.wrapper = element = that.element.addClass(LISTBOX_CLASS);

            that._templates();
            that._selectable();
            that._dataSource();
            that._createToolbar();
        },

        destroy: function() {
            var that = this;

            DataBoundWidget.fn.destroy.call(that);

            that._unbindDataSource();
            that._destroySelectable();
            that._destroyToolbar();

            kendo.destroy(that.element);
        },

        events: [
            CHANGE,
            DATABOUND,
            REMOVE,
            REORDER,
            TRANSFER
        ],

        options: {
            name: "ListBox",
            autoBind: true,
            template: "",
            dataTextField: null,
            selectable: "single"
        },

        _add: function(dataItem) {
            var that = this;
            var item = that.options.template(dataItem);
            
            that._getList().append(item);
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

        reorder: function(item, index) {
            var that = this;
            var dataSource = that.dataSource;
            var model = that._modelFromElement(item);
            var dataItemAtIndex = dataSource.at(index);
            var itemAtIndex = that.items()[index];

            if (model && itemAtIndex && dataItemAtIndex) {
                that._unbindDataSource();
                dataSource.remove(model);
                dataSource.insert(index, model);
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
            var model = that._modelFromElement(item);

            if (model) {
                that._unbindDataSource();
                dataSource.remove(model);
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
            var uniqueId = $(element).closest("[" + uniqueIdAttr + "]").attr(uniqueIdAttr);

            return this.dataSource.getByUid(uniqueId);
        },

        items: function() {
            var list = this._getList();
            return list.children();
        },

        transfer: function(items) {
            var that = this;
            var destinationListBox = $(that.options.connectWith).data(KENDO_LISTBOX);
            var itemsLength = $(items).length;
            var i;

            if (destinationListBox instanceof kendo.ui.ListBox) {
                for (i = 0; i < itemsLength; i++) {
                    that._transferItem($(items[i]), destinationListBox);
                }
            }
        },

        _transferItem: function(item, destinationListBox) {
            var that = this;
            var model = that._modelFromElement(item);

            if (model && destinationListBox) {
                destinationListBox._add(model);
                that.remove(item);
            }
        },

        select: function(items) {
            var that = this;
            var selectable = that.selectable;
            var enabledItems;

            if (isUndefined(items)) {
                return selectable.value();
            }

            enabledItems = that.items().filter(items).filter(ENABLED_ITEM_SELECTOR);

            if (!selectable.options.multiple) {
                selectable.clear();
                enabledItems = enabledItems.first();
            }

            return selectable.value(enabledItems);
        },

        clearSelection: function() {
            this.selectable.clear();
        },

        _modelFromElement: function(element) {
            var uid = $(element || {}).attr(kendoAttr(UNIQUE_ID));

            return this.dataSource.getByUid(uid);
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
            var model = that._modelFromElement(item);

            if (model) {
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

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            if (options.dataTextField) {
                dataSource.fields = [{ field: options.dataTextField }];
            }

            that._unbindDataSource();
            that.dataSource = DataSource.create(that.options.dataSource);
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

        _templates: function() {
            var options = this.options;
            var template = options.template;

            if (!template) {
                template = kendo.template('<li class="k-item">${' + kendo.expr(options.dataTextField, "data") + "}</li>", { useWithBlock: false });
            } else {
                template = kendo.template(template);
            }

            this.options.template = template;
        },

        refresh: function() {
            var that = this;

            that._refresh();
            that.trigger(DATABOUND);
        },

        _refresh: function() {
            var that = this;
            var view = that.dataSource.view();
            var template = that.options.template;
            var html = "";

            html += "<ul class='" + LIST_CLASS + "'>";
            for (var idx = 0; idx < view.length; idx++) {
                html += template(view[idx]);
            }
            html+= "</ul>";

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

            that.selectable = new Selectable(that.element, {
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
            return this.element.find(DOT + LIST_CLASS);
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

        _createToolbar: function() {
            var that = this;

            if (!that.toolbar) {
                that.toolbar = $(
                    "<div class='" + TOOLBAR_CLASS + "'>" +
                        "<span class='k-button k-listbox-tool k-listbox-remove' data-command='" + REMOVE + "'>Remove</span>" +
                        "<span class='k-button k-listbox-tool k-listbox-moveup' data-command='" + MOVE_UP + "'>Move up</span>" +
                        "<span class='k-button k-listbox-tool k-listbox-movedown' data-command='" + MOVE_DOWN + "'>Move down</span>" +
                        "<span class='k-button k-listbox-tool k-listbox-transfer-to' data-command='" + TRANSFER_TO + "'>Transfer to</span>" +
                        "<span class='k-button k-listbox-tool k-listbox-transfer-from' data-command='" + TRANSFER_FROM + "'>Transfer from</span>" +
                    "</div>").appendTo(that.wrapper);

                
                that.toolbar.on(CLICK, TOOLS_CLASS_NAMES.join(COMMA), proxy(that._onToolbarClick, that));
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
            
            var selectedItems = that.select();
            that._executeCommand($(e.currentTarget).data("command"), { items: selectedItems });
        },
        
        _executeCommand: function(commandName, options) {
            var command = CommandFactory.current.create(commandName, { listBox: this, items: options.items });

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
            that.items = $(that.options.items);
        },

        options: {
            listBox: null,
            items: []
        },

        execute: $.noop,

        getItems: function() {
            return $(this.listBox.select());
        }
    });

    var RemoveItemsCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;
            var listBox = that.listBox;
            var items = that.getItems();
            var itemsLength = items.length;
            var model;
            var item;
            var i;

            for (i = 0; i < itemsLength; i++) {
                item = items.eq(i);
                model = listBox.dataItem(item);

                if (model && !listBox.trigger(REMOVE, { model: model, item: item })) {
                    listBox.remove(item);
                }
            }
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

        canMoveItems: $.noop,

        moveItems: function() {
            var that = this;
            var listBox = that.listBox;
            var options = that.options;
            var items = that.items;
            var offset = options.offset;
            var domIndices = getSortedDomIndices(items);
            var movedItems = $.makeArray(items.sort(that.itemComparer));
            var moveAction = options.moveAction;
            var movedItem;
            var movedDataItem;

            while (movedItems.length > 0 && domIndices.length > 0) {
                movedItem = movedItems[moveAction]();
                movedDataItem = listBox.dataItem(movedItem);

                if (movedItem && movedDataItem && !listBox.trigger(REORDER, { model: movedDataItem, item: $(movedItem) })) {                    
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
            var items = this.items;
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
            var items = that.items;
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && $(domIndices).last()[0] < (that.listBox.items().length - 1));
        }
    });
    CommandFactory.current.register(MOVE_DOWN, MoveDownItemsCommand);

    var TransferItemsToCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;
            var listBox = that.listBox;
            var items = that.getItems();
            var itemsLength = items.length;
            var model;
            var item;
            var i;

            for (i = 0; i < itemsLength; i++) {
                item = items.eq(i);
                model = listBox.dataItem(item);

                if (model && !listBox.trigger(TRANSFER, { model: model, item: item })) {
                    listBox.transfer(item);
                }
            }
        }
    });
    CommandFactory.current.register(TRANSFER_TO, TransferItemsToCommand);

    var TransferItemsFromCommand = ListBoxCommand.extend({
        execute: function() {
            var that = this;
            var sourceListBox = that._getSourceListBox();
            var items = sourceListBox ? sourceListBox.select() : $();
            var itemsLength = items.length;
            var item;
            var model;
            var i;

            if (sourceListBox) {
                for (i = 0; i < itemsLength; i++) {
                    item = items.eq(i);
                    model = sourceListBox.dataItem(item);

                    if (model && !sourceListBox.trigger(TRANSFER, { model: model, item: $(item) })) {
                        sourceListBox.transfer(item);
                    }
                }       
            }
        },

        _getSourceListBox: function() {
            var that = this;
            var listBoxElements = $(DOT + LISTBOX_CLASS);
            var listBoxId = "#" + that.listBox.element.attr("id");
            var sourceListBox;
            var i;

            for (i = 0; i < listBoxElements.length; i++) {
                sourceListBox = $(listBoxElements[i]).data(KENDO_LISTBOX);

                if (sourceListBox && sourceListBox.options.connectWith === listBoxId) {
                    return sourceListBox;
                }
            }

            return null;
        }
    });
    CommandFactory.current.register(TRANSFER_FROM, TransferItemsFromCommand);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
