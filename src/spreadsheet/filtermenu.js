(function(f, define){
    define([ "../kendo.core", "../kendo.popup" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var classNames = {
            wrapper: "k-spreadsheet-filter-menu"
        };

        var FilterMenu = kendo.ui.Widget.extend({
            init: function(element, options) {
                this.anchor = element;

                element = $("<div />").appendTo(document.body);
                kendo.ui.Widget.call(this, element, options);

                this.element.addClass(FilterMenu.classNames.wrapper);

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

            _popup: function() {
                element.kendoPopup({

            _popup: function() {
                this.popup = this.element.kendoPopup({
                    anchor: this.anchor
                }).data("kendoPopup");
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
