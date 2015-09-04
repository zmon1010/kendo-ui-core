(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.treeview" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var classNames = {
            reset: "k-reset",
            input: "k-input",
            wrapper: "k-spreadsheet-filter-menu",
            filterByValue: "k-spreadsheet-value-filter",
            search: "k-spreadsheet-search-box",
            valueTreeViewWrapper: "k-spreadsheet-value-treeview-wrapper"
        };
        var templates = {
            filterByValue:
                "<dt><span class='k-icon k-font-icon k-i-arrow-e'></span><span>#= filterByValue #</span></dt>" +
                "<dd class='" + classNames.reset + "'>" +
                    "<input type='text' class='" + classNames.input + " " + classNames.search + "' />" +
                    "<div class='" + classNames.valueTreeViewWrapper + "'><div></div></div>" +
                "</dd>",
            filterByCondition:
                "<dt><span class='k-icon k-font-icon k-i-arrow-e'></span><span>#= filterByCondition #</span></dt>" +
                "<dd class='" + classNames.reset + "'>" +
                    "condition filtering" +
                "</dd>"
        }

        function flatternValues(values) {
            return [].concat.apply([], values);
        }

        function distinctValues(values) {
            var hash = {};
            var result = [];

            for (var i = 0; i < values.length; i++) {
                if (!hash[values[i].value]) {
                    hash[values[i].value] = true;
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
                name: "FilterMenu",
                messages: {
                    filterByValue: "Filter by value",
                    filterByCondition: "Filter by condition"
                }
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
                var values = [];

                this.options.range.forEachCell(function(row, col, cell) {
                    var formatter;

                    if (cell.value !== null && cell.format) {
                        cell.dataType = kendo.spreadsheet.formatting.type(cell.value, cell.format);
                    } else if (cell.value !== null) {
                        cell.dataType = "string";
                    }

                    if (cell.value !== null && cell.format) {
                        formatter = kendo.spreadsheet.formatting.compile(cell.format);
                        cell.text = formatter(cell.value).text();
                    } else {
                        cell.text = cell.value ? cell.value : "(Blanks)";
                    }

                    if (cell.dataType === "date") {
                        cell.value = kendo.spreadsheet.numberToDate(cell.value);
                    }

                    values.push(cell);
                });

                var values = distinctValues(values);

                return [{
                    text: "all",
                    expanded: true,
                    checked: true,
                    items: values
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
                var template = kendo.template(FilterMenu.templates.filterByCondition);
                var element = $("<dl/>", {
                                "class": FilterMenu.classNames.filterByCondition,
                                "html": template(this.options.messages)
                              }).appendTo(this.element);
            },

            _filterByValue: function() {
                var template = kendo.template(FilterMenu.templates.filterByValue);
                var element = $("<dl/>", {
                                "class": FilterMenu.classNames.filterByValue,
                                "html": template(this.options.messages)
                              }).appendTo(this.element);

                this.valuesTreeView = element.find("." + FilterMenu.classNames.valueTreeViewWrapper).children().first().kendoTreeView({
                    checkboxes: {
                        checkChildren: true
                    },
                    dataTextField: "text",
                    dataSource: this.getValues()
                }).data("kendoTreeView");
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
        $.extend(true, FilterMenu, { classNames: classNames, templates: templates });

    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
