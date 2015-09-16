(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.treeview" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var Widget = kendo.ui.Widget;
        var classNames = {
            reset: "k-reset",
            input: "k-input",
            wrapper: "k-spreadsheet-filter-menu",
            filterByCondition: "k-spreadsheet-condition-filter",
            filterByValue: "k-spreadsheet-value-filter",
            search: "k-spreadsheet-search-box",
            valueTreeViewWrapper: "k-spreadsheet-value-treeview-wrapper"
        };

        var Details = Widget.extend({
            init: function(element, options) {
                Widget.fn.init.call(this, element, options);

                this.element.addClass("k-details");

                this._summary = this.element.find(".k-details-summary")
                    .on("click", this.toggle.bind(this));

                this._icon = $("<span class='k-icon k-font-icon k-i-arrow-s' />")
                    .prependTo(this._summary);

                this._container = kendo.wrap(this._summary.next(), true);
            },
            options: {
                name: "Details"
            },
            toggle: function() {
                var show = this._container.is(":visible");
                var animation = kendo.fx(this._container).expand("vertical");

                animation.stop()[show ? "reverse" : "play"]();

                this._summary.toggleClass("k-details-summary-active", !show);
                this._icon.toggleClass("k-i-arrow-e", show)
                          .toggleClass("k-i-arrow-s", !show);
            }
        });

        var searchId = "spreadsheet_filter_search_" + kendo.guid();

        var templates = {
            filterByValue:
                "<div class='k-details-summary'><label for='" + searchId + "'>#= filterByValue #</label></div>" +
                "<div class='k-details-content'>" +
                    "<input id='" + searchId + "' class='" + classNames.input + " " + classNames.search + "' />" +
                    "<div class='" + classNames.valueTreeViewWrapper + "'><div /></div>" +
                "</div>",
            filterByCondition:
                "<div class='k-details-summary'><label>#= messages.filterByCondition #</label></div>" +
                "<div class='k-details-content'>" +
                    '<select data-#=ns#bind="value: filters[0].operator" data-height="auto" data-#=ns#role="dropdownlist">'+
                        '#for(var type in operators){#'+
                            '#for(var op in operators[type]){#' +
                                '<option value="#=op#">#=operators[type][op]#</option>' +
                            '#}#'+
                        '#}#'+
                    '</select>'+
                    '<input data-#=ns#bind="value:filters[0].value" class="k-textbox" />'+
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
                    '<input data-#=ns#bind="value: filters[1].value" class="k-textbox" />' +
                "</div>",
            menuItem:
                "<li data-command='#=command#' data-dir='#=dir#'>" +
                    "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>#=text#" +
                "</li>"
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

        var FilterMenu = Widget.extend({
            init: function(options) {
                var element = $("<div />", { "class": FilterMenu.classNames.wrapper }).appendTo(document.body);
                Widget.call(this, element, options);

                this._popup();
                this._sort();
                this._filterByCondition();
                this._filterByValue();
                this._actionButtons();
            },

            options: {
                name: "FilterMenu",
                messages: {
                    sortAscending: "Sort range A to Z",
                    sortDescending: "Sort range Z to A",
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
                "action"
            ],

            destroy: function() {
                Widget.fn.destroy.call(this);

                this.menu.destroy();
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
                    text: "All",
                    expanded: true,
                    checked: true,
                    items: values
                }];
            },

            _popup: function() {
                this.popup = this.element.kendoPopup().data("kendoPopup");
            },

            _sort: function() {
                var template = kendo.template(FilterMenu.templates.menuItem);
                var messages = this.options.messages;
                var items = [
                    { command: "sort", dir: "asc", text: messages.sortAscending, iconClass: "sort-asc" },
                    { command: "sort", dir: "desc", text: messages.sortDescending, iconClass: "sort-desc" }
                ];

                var ul = $("<ul />", {
                    "html": kendo.render(template, items)
                }).appendTo(this.element);

                this.menu = ul.kendoMenu({
                    orientation: "vertical",
                    select: function(e) {
                        var options = {
                            asc: $(e.item).data("dir") === "asc",
                            sheet: false,
                            range: true
                        }

                        this.trigger("action", { command: "SortCommand", options: options });
                    }.bind(this)
                }).data("kendoMenu");
            },

            _filterByCondition: function() {
                var template = kendo.template(FilterMenu.templates.filterByCondition);
                var element = $("<div />", {
                                "class": FilterMenu.classNames.filterByCondition,
                                "html": template({ messages: this.options.messages, operators: this.options.operators, ns: kendo.ns })
                              }).appendTo(this.element);

                this._filterByConditionDetails = new Details(element);

                kendo.init(element);
            },

            _filterByValue: function() {
                var template = kendo.template(FilterMenu.templates.filterByValue);
                var element = $("<div />", {
                                "class": FilterMenu.classNames.filterByValue,
                                "html": template(this.options.messages)
                              }).appendTo(this.element);

                this._filterByValueDetails = new Details(element);

                this.valuesTreeView = element.find("." + FilterMenu.classNames.valueTreeViewWrapper).children().first().kendoTreeView({
                    checkboxes: {
                        checkChildren: true
                    },
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
