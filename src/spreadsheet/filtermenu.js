(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.treeview" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var classNames = {
            wrapper: "k-spreadsheet-filter-menu"
        };

        function flatternValues(values) {
            return [].concat.apply([], values);
        }

        function distinctValues(values) {
            var hash = {};
            var result = [];

            for (var i = 0; i < values.length; i++) {
                if (!hash[values[i]]) {
                    hash[values[i]] = true;
                    result.push(values[i]);
                }
            }

            return result;
        }

        var FilterMenu = kendo.ui.Widget.extend({
            init: function(options) {
                var element = $("<div />", { "class": FilterMenu.classNames.wrapper }).appendTo(document.body);
                kendo.ui.Widget.call(this, element, options);

                this._popup();
                this._sort();
                this._filterByCondition();
                this._filterByValue();
                this._actionButtons();
            },

            options: {
                name: "FilterMenu"
            },

            events: [

            ],

            destroy: function() {
                this.popup.destroy();
            },

            openFor: function(anchor) {
                this.popup.setOptions({ anchor: anchor });
                this.popup.open();
            },

            getValues: function() {
                var values = distinctValues(flatternValues(this.options.range.values()));

                return [{
                    text: "all",
                    expanded: true,
                    checked: true,
                    items: values.map(function(item) {
                        return { text: item }
                    }) 
                }];
            },

            _popup: function() {
                this.popup = this.element.kendoPopup().data("kendoPopup");
            },

            _sort: function() {
                var ul = $("<ul />");

                ul.appendTo(this.element).kendoMenu({
                    dataSource: [
                        { text: "Sort Ascending", spriteCssClass: "k-icon k-font-icon k-i-sort-asc" },
                        { text: "Sort Descending", spriteCssClass: "k-icon k-font-icon k-i-sort-desc" }
                    ],
                    orientation: "vertical"
                });
            },

            _filterByCondition: function() {
                var div = $("<div />");

                div.text("Filter by condition");

                div.appendTo(this.element);
            },

            _filterByValue: function() {
                var div = $("<div />");

                div.text("Filter by value");

                div.appendTo(this.element);

                this.valuesTree = $("<div />").appendTo(div).kendoTreeView({
                    checkboxes: {
                        checkChildren: true
                    },
                    dataSource: this.getValues()
                });
            },

            _actionButtons: function() {
                var div = $("<div />", {
                            "class": "k-action-buttons",
                            "html": "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +
                                    "<button class='k-button' data-bind='click: close'>Cancel</button>"
                          });

                div.appendTo(this.element);
            }
        });

        kendo.spreadsheet.FilterMenu = FilterMenu;
        $.extend(true, FilterMenu, { classNames: classNames });

    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
