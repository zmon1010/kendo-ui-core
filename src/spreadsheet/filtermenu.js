(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.treeview" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var classNames = {
            reset: "k-reset",
            input: "k-input",
            wrapper: "k-spreadsheet-filter-menu",
            filterByCondition: "k-spreadsheet-condition-filter",
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
                "<dt><span class='k-icon k-font-icon k-i-arrow-e'></span><span>#= messages.filterByCondition #</span></dt>" +
                "<dd class='" + classNames.reset + "'>" +
                    '<select data-#=ns#bind="value: filters[0].operator" data-height="auto" data-#=ns#role="dropdownlist">'+
                        '#for(var type in operators){#'+
                            '#for(var op in operators[type]){#' +
                                '<option value="#=op#">#=operators[type][op]#</option>' +
                            '#}#'+
                        '#}#'+
                    '</select>'+
                    '<input data-#=ns#bind="value:filters[0].value" class="k-textbox" type="text" />'+
                    '<select class="k-filter-and" data-#=ns#bind="value: logic" data-#=ns#role="dropdownlist">'+
                        '<option value="and">#=messages.and#</option>'+
                        '<option value="or">#=messages.or#</option>'+
                    '</select>'+
                    '<select data-#=ns#bind="value: filters[1].operator" data-height="auto" data-#=ns#role="dropdownlist">'+
                        '#for(var type in operators){#'+
                            '#for(var op in operators[type]){#' +
                                '<option value="#=op#">#=operators[type][op]#</option>' +
                            '#}#'+
                        '#}#'+
                    '</select>'+
                    '<input data-#=ns#bind="value: filters[1].value" class="k-textbox" type="text" />'+
                "</dd>"
        };

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
                    filterByCondition: "Filter by condition",
                    apply: "Apply",
                    cancel: "Cancel",
                    blanks: "(Blanks)",
                    and: "And",
                    or: "Or"
                },
                operators: {
                    string: {
                        contains: "Text contains",
                        doesnotcontain: "Text does not contain",
                        startswith: "Text starts with",
                        endswith: "Text ends with"
                    },
                    date: {
                        eq:  "Date is",
                        neq: "Date is not",
                        lt:  "Date is before",
                        gt:  "Date is after",
                    },
                    number: {
                        eq: "Is equal to",
                        neq: "Is not equal to",
                        gte: "Is greater than or equal to",
                        gt: "Is greater than",
                        lte: "Is less than or equal to",
                        lt: "Is less than"
                    }
                }
            },

            events: [

            ],

            destroy: function() {
                this.valuesTreeView.destroy();
                this.popup.destroy();
            },

            openFor: function(anchor) {
                this.popup.setOptions({ anchor: anchor });
                this.popup.open();
            },

            getValues: function() {
                var values = [];
                var messages = this.options.messages;

                this.options.range.forEachCell(function(row, col, cell) {
                    var formatter;

                    if (cell.value === undefined) {
                        cell.dataType = "blank";
                    } else if (cell.format) {
                        cell.dataType = kendo.spreadsheet.formatting.type(cell.value, cell.format);
                    } else {
                        cell.dataType = typeof cell.value;
                    }

                    if (cell.value !== null && cell.format) {
                        formatter = kendo.spreadsheet.formatting.compile(cell.format);
                        cell.text = formatter(cell.value).text();
                    } else {
                        cell.text = cell.value ? cell.value : messages.blanks;
                    }

                    if (cell.dataType === "date") {
                        cell.value = kendo.spreadsheet.numberToDate(cell.value);
                    }

                    values.push(cell);
                });

                var values = distinctValues(values);

                values.sort(function(a, b) {
                    if (a.dataType === b.dataType) {
                        return 0;
                    }

                    if (a.dataType === "blank" || b.dataType === "blank") {
                        return a.dataType === "blank" ? -1 : 1;
                    }

                    if (a.dataType === "number" || b.dataType === "number") {
                        return a.dataType === "number" ? -1 : 1;
                    }

                    if (a.dataType === "date" || b.dataType === "date") {
                        return a.dataType === "date" ? -1 : 1;
                    }

                    return 0;
                });

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
                                "html": template({ messages: this.options.messages, operators: this.options.operators, ns: kendo.ns })
                              }).appendTo(this.element);

                kendo.init(element);
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
                var messages = this.options.messages;
                var div = $("<div />", {
                            "class": "k-action-buttons",
                            "html": "<button class='k-button k-primary'>" + messages.apply + "</button>" +
                                    "<button class='k-button'>" + messages.cancel + "</button>"
                          });

                div.appendTo(this.element);
            }
        });

        kendo.spreadsheet.FilterMenu = FilterMenu;
        $.extend(true, FilterMenu, { classNames: classNames, templates: templates });

    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
