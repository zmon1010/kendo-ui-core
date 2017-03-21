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

    var proxy = $.proxy;

    var NS = ".kendoListBox";
    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var ENABLED_ITEM_SELECTOR = ".k-listBox:not(.k-state-disabled) > .k-item:not(.k-state-disabled)";

    var CHANGE = "change";
    var DATABOUND = "dataBound";
    var REMOVE = "remove";
    var REORDER = "reorder";
    var TRANSFER = "transfer";
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

            that.wrapper = element = that.element;

            that._templates();

            that._selectable();

            that._dataSource();
        },

        destroy: function() {
            var that = this;

            DataBoundWidget.fn.destroy.call(that);

            that._unbindDataSource();
            that._destroySelectable();

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
            enabled: true,
            template: "",
            dataTextField: null,
            selectable: "single"
        },

        _add: function(dataItem) {
            this.dataSource.add(dataItem);
        },

        moveUp: function(items) {
            var that = this;

            if (that._canMoveUp(items)) {
                that._moveItems(items, MOVE_UP_OFFSET);
            }
        },

        _canMoveUp: function(items) {
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && domIndices[0] > 0);
        },

        moveDown: function(items) {
            var that = this;

            if (that._canMoveDown(items)) {
                that._moveItems(items, MOVE_DOWN_OFFSET);
            }
        },

        _canMoveDown: function(items) {
            var domIndices = getSortedDomIndices(items);

            return (domIndices.length > 0 && $(domIndices).last()[0] < (this.items().length - 1));
        },

        _moveItems: function(items, offset) {
            var that = this;
            var domIndices = getSortedDomIndices(items);
            var movedItems = $.makeArray(items.sort(that._listItemComparer));

            while (movedItems.length > 0 && domIndices.length > 0) {
                if (offset < 0) {
                    that._reorderItem(movedItems.shift(), domIndices.shift() + offset);
                } else {
                    that._reorderItem(movedItems.pop(), domIndices.pop() + offset);
                }
            }
        },

        reorder: function(item, index) {
            this._reorderItem(item, index);
        },

        _reorderItem: function(item, index) {
            var that = this;
            var dataSource = that.dataSource;
            var model = that._modelFromElement(item);
            var dataItemAtIndex = dataSource.at(index);
            var itemAtIndex = that.items()[index];

            if (model && itemAtIndex && dataItemAtIndex) {
                dataSource.remove(model);
                dataSource.insert(index, model);
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
                $(item).off(NS).remove();
                dataSource.remove(model);
            }
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
            var destinationListBox = $(that.options.connectWith).getKendoListBox();
            var itemsLength = (items || []).length;
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

            enabledItems = that._getEnabledItems(items);

            if (!selectable.options.multiple) {
                selectable.clear();
                enabledItems = enabledItems.first();
            }

            return selectable.value(enabledItems);
        },

        clearSelection: function() {
            this.selectable.clear();
        },

        _getEnabledItems: function(items) {
            var enabledItems = $(this._getList().find(items)).filter(ENABLED_ITEM_SELECTOR);
            return enabledItems;
        },

        _modelFromElement: function(element) {
            var uid = $(element || {}).attr(kendoAttr(UNIQUE_ID));

            return this.dataSource.getByUid(uid);
        },

        enable: function(enable) {
            var that = this;
            var enabled = isUndefined(enable) ? true : !!enable;

            that.options.enabled = enabled;

            if (enabled) {
                that.wrapper.removeClass(DISABLED_STATE_CLASS);
                that._getList().removeClass(DISABLED_STATE_CLASS);
            } else {
                that.wrapper.addClass(DISABLED_STATE_CLASS);
                that._getList().addClass(DISABLED_STATE_CLASS);
                that.items().removeClass(SELECTED_STATE_CLASS);
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

            html+= "<ul class='k-listBox'>";
            for (var idx = 0; idx < view.length; idx++) {
                html += template(view[idx]);
            }
            html+= "</ul>";
            that.element.html(html);

            that._setItemIds();
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
                delete that.selectable;
            }
        },

        _getList: function() {
            return this.element.find(".k-listBox");
        },

        _listItemComparer: function(item1, item2) {
            var indexItem1 = $(item1).index();
            var indexItem2 = $(item2).index();

            if (indexItem1 === indexItem2) {
                return 0;
            } else {
                return (indexItem1 > indexItem2 ? 1 : (-1));
            }
        }
    });

    kendo.ui.plugin(ListBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
