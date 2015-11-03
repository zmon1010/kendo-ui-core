(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.treeview" ], f);
})(function(){

    (function(kendo) {
        if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
            return;
        }

        var $ = kendo.jQuery;
        var Widget = kendo.ui.Widget;
        var classNames = {
            details: "k-details",
            button: "k-button",
            detailsSummary: "k-details-summary",
            detailsContent: "k-details-content",
            icon: "k-icon k-font-icon",
            iconCollapse: "k-i-collapse-se",
            iconExpand: "k-i-expand-e",
            iconSearch: "k-i-search",
            textbox: "k-textbox",
            wrapper: "k-spreadsheet-filter-menu",
            filterByCondition: "k-spreadsheet-condition-filter",
            filterByValue: "k-spreadsheet-value-filter",
            valuesTreeViewWrapper: "k-spreadsheet-value-treeview-wrapper",
            actionButtons: "k-action-buttons"
        };

        var Details = Widget.extend({
            init: function(element, options) {
                Widget.fn.init.call(this, element, options);

                this.element.addClass(FilterMenu.classNames.details);

                this._summary = this.element.find("." + FilterMenu.classNames.detailsSummary)
                    .on("click", this._toggle.bind(this));

                var iconClass = options.expanded ? FilterMenu.classNames.iconCollapse : FilterMenu.classNames.iconExpand;
                this._icon = $("<span />", { "class": FilterMenu.classNames.icon + " " + iconClass })
                    .prependTo(this._summary);

                this._container = kendo.wrap(this._summary.next(), true);

                if (!options.expanded) {
                    this._container.hide();
                }
            },
            options: {
                name: "Details"
            },
            events: [ "toggle" ],
            visible: function() {
                return this.options.expanded;
            },
            toggle: function(show) {
                var animation = kendo.fx(this._container).expand("vertical");

                animation.stop()[show ? "reverse" : "play"]();

                this._icon.toggleClass(FilterMenu.classNames.iconExpand, show)
                          .toggleClass(FilterMenu.classNames.iconCollapse, !show);

                this.options.expanded = !show;
            },
            _toggle: function() {
                var show = this.visible();
                this.toggle(show);
                this.trigger("toggle", { show: show });
            }
        });

        var FILTERMENU_MESSAGES = kendo.spreadsheet.messages.filterMenu = {
            sortAscending: "Sort range A to Z",
            sortDescending: "Sort range Z to A",
            filterByValue: "Filter by value",
            filterByCondition: "Filter by condition",
            apply: "Apply",
            search: "Search",
            clear: "Clear",
            blanks: "(Blanks)",
            operatorNone: "None",
            and: "AND",
            or: "OR",
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
                    gt:  "Date is after"
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
        };

        var templates = {
            filterByValue:
                "<div class='" + classNames.detailsSummary + "'>#= messages.filterByValue #</div>" +
                "<div class='" + classNames.detailsContent + "'>" +
                    //"<div class='k-textbox k-space-right'>" +
                        //"<input placeholder='#= messages.search #' />" +
                        //"<span class='k-icon k-font-icon k-i-search' />" +
                    //"</div>" +
                    "<div class='" + classNames.valuesTreeViewWrapper + "'>" +
                        "<div data-#=ns#role='treeview' " +
                            "data-#=ns#checkboxes='{ checkChildren: true }' "+
                            "data-#=ns#bind='events: { check: valuesChange, select: valueSelect }' "+
                            "/>" +
                    "</div>" +
                "</div>",
            filterByCondition:
                "<div class='" + classNames.detailsSummary + "'>#= messages.filterByCondition #</div>" +
                "<div class='" + classNames.detailsContent + "'>" +
                    '<select ' +
                        'data-#=ns#role="dropdownlist"' +
                        'data-#=ns#bind="value: customFilter.criteria[0].operator, source: operators"' +
                        'data-value-primitive="false"' +
                        'data-option-label="#=messages.operatorNone#"' +
                        'data-height="auto"' +
                        'data-text-field="text"' +
                        'data-value-field="unique">'+
                    '</select>'+
                    '<input data-#=ns#bind="value: customFilter.criteria[0].value" class="k-textbox" />'+
                "</div>",
            menuItem:
                "<li data-command='#=command#' data-dir='#=dir#'>" +
                    "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>#=text#" +
                "</li>",
            actionButtons:
                "<button data-#=ns#bind='click: apply' class='k-button k-primary'>#=messages.apply#</button>" +
                "<button data-#=ns#bind='click: clear' class='k-button'>#=messages.clear#</button>"
        };

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

        var FilterMenuViewModel = kendo.spreadsheet.FilterMenuViewModel = kendo.data.ObservableObject.extend({
            valuesChange: function(e) {
                var checked = function(item) { return item.checked && item.value; };
                var value = function(item) {
                    return item.dataType === "date" ? kendo.spreadsheet.dateToNumber(item.value) : item.value;
                };
                var data = e.sender.dataSource.data();
                var values = data[0].children.data().toJSON();
                var blanks = values.filter(function(item) {
                    return item.dataType === "blank";
                });

                blanks = blanks.length ? blanks[0].checked : false;
                values = values.filter(checked).map(value);

                this.set("valueFilter", {
                    values: values,
                    blanks: blanks
                });
            },
            valueSelect: function(e) {
                e.preventDefault();

                var node = e.sender.dataItem(e.node);
                node.set("checked", !node.checked);
            },
            validateCriteria: function(criteria) {
                return criteria.filter(function(item) {
                    var type = item.operator.type;

                    if (type === "number") {
                        return !!kendo.parseFloat(item.value);
                    } else if (type === "date") {
                        return !!kendo.parseDate(item.value);
                    } else if (type === "string") {
                        return !!item.value.toString();
                    } else {
                        return false;
                    }
                });
            },
            normalizeCriteria: function(criteria) {
                return criteria.map(function(item) {
                    item.type = item.operator.type;
                    item.operator = item.operator.value;

                    if (item.type === "number") {
                        item.value = kendo.parseFloat(item.value);
                    } else if (item.type === "date") {
                        item.value = kendo.parseDate(item.value);
                    } else {
                        item.value = item.value.toString();
                    }

                    return item;
                });
            },
            buildCustomFilter: function() {
                var customFilter = this.customFilter.toJSON();
                customFilter.criteria = this.validateCriteria(customFilter.criteria);
                customFilter.criteria = this.normalizeCriteria(customFilter.criteria);

                return customFilter;
            },
            reset: function() {
                this.set("customFilter", { logic: "and", criteria: [ { operator: null, value: null } ] });
                this.set("valueFilter", { values: [] });
            }
        });

        function flattern(operators) {
            var messages = FILTERMENU_MESSAGES.operators;
            var result = [];
            for (var type in operators) {
                for (var operator in operators[type]) {
                    result.push({
                        text: messages[type][operator],
                        value: operator,
                        unique: type + "_" + operator,
                        type: type
                    });
                }
            }
            return result;
        }

        var FilterMenu = Widget.extend({
            init: function(options) {
                var element = $("<div />", { "class": FilterMenu.classNames.wrapper }).appendTo(document.body);
                Widget.call(this, element, options);

                this.viewModel = new FilterMenuViewModel({
                    active: "value",
                    operators: flattern(this.options.operators),
                    clear: this.clear.bind(this),
                    apply: this.apply.bind(this)
                });

                this._setFilter();
                this._popup();
                this._sort();
                this._filterByCondition();
                this._filterByValue();
                this._actionButtons();
            },

            options: {
                name: "FilterMenu",
                column: 0,
                range: null,
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
                        gt:  "Date is after"
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

            close: function() {
                this.popup.close();
            },

            clear: function() {
                this.action({
                    command: "ClearFilterCommand",
                    options: {
                        column: this.options.column
                    }
                });
                this.viewModel.reset();
                this.close();
            },

            apply: function() {
                this._active();

                var options = {
                    operatingRange: this.options.range,
                    column: this.options.column
                };

                var valueFilter;
                var customFilter;

                if (this.viewModel.active === "value") {
                    this.viewModel.valuesChange({ sender: this.valuesTreeView });
                    valueFilter = this.viewModel.valueFilter.toJSON();

                    if (valueFilter.values && valueFilter.values.length) {
                        options.valueFilter = valueFilter;
                    }
                } else if (this.viewModel.active === "custom") {
                    customFilter = this.viewModel.buildCustomFilter();

                    if (customFilter.criteria.length) {
                        options.customFilter = customFilter;
                    }
                }

                this.action({ command: "ApplyFilterCommand", options: options });
            },

            action: function(options) {
                this.trigger("action", $.extend({ }, options));
            },

            getValues: function() {
                var values = [];
                var messages = FILTERMENU_MESSAGES;
                var column = this.options.column;
                var columnRange = this.options.range.resize({ top: 1 }).column(column);
                var sheet = this.options.range.sheet();

                columnRange.forEachCell(function(row, col, cell) {
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

                    cell.checked = !sheet.isHiddenRow(row);

                    values.push(cell);
                });

                values = distinctValues(values);

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

            _setFilter: function() {
                var column = this.options.column;
                var sheet = this.options.range.sheet();
                var filterObject = sheet.filter();
                var serializedFilter;
                var criterion;
                var type;
                var operator;

                if (filterObject) {
                    filterObject = filterObject.columns.filter(function(item) {
                        return item.index === column;
                    })[0];
                }

                if (filterObject) {
                    serializedFilter = filterObject.filter.toJSON();

                    if (serializedFilter.filter === "custom") {
                        criterion = serializedFilter.criteria.pop();

                        if (typeof criterion.operator === "string") {
                            type = criterion.value instanceof Date ? "date" : typeof criterion.value;
                            operator = criterion.operator;
                            serializedFilter.criteria.push({
                                operator: {
                                    text: this.options.operators[type][operator],
                                    type: type,
                                    value: operator,
                                    unique: type + "_" + operator
                                },
                                value: criterion.value
                            });
                        } else {
                            serializedFilter.criteria.push({
                                operator: {
                                    text: this.options.operators[criterion.type][criterion.operator],
                                    type: criterion.type,
                                    value: criterion.operator,
                                    unique: criterion.type + "_" + criterion.operator
                                },
                                value: criterion.value
                            });
                        }
                    }

                    this.viewModel.set("active", serializedFilter.filter);
                    this.viewModel.set(serializedFilter.filter + "Filter", serializedFilter);
                } else {
                    this.viewModel.reset();
                }
            },

            _popup: function() {
                this.popup = this.element.kendoPopup({
                    copyAnchorStyles: false
                }).data("kendoPopup");
            },

            _sort: function() {
                var template = kendo.template(FilterMenu.templates.menuItem);
                var messages = FILTERMENU_MESSAGES;
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
                        var dir = $(e.item).data("dir") === "asc";
                        var range = this.options.range.resize({ top: 1 });
                        var options = {
                            asc: dir,
                            sheet: false,
                            operatingRange: range
                        };

                        if (range.isSortable()) {
                            this.action({ command: "SortCommand", options: options });
                        } else {
                            this.close();
                        }
                    }.bind(this)
                }).data("kendoMenu");
            },

            _appendTemplate: function(template, className, details, expanded) {
                var compiledTemplate = kendo.template(template);
                var wrapper = $("<div class='" + className + "'/>").html(compiledTemplate({
                    messages: FILTERMENU_MESSAGES,
                    ns: kendo.ns
                }));

                this.element.append(wrapper);

                if (details) {
                    details = new Details(wrapper, { expanded: expanded, toggle: this._detailToggle.bind(this) }); // jshint ignore:line
                }

                kendo.bind(wrapper, this.viewModel);

                return wrapper;
            },

            _detailToggle: function(e) {
                this.element
                    .find("[data-role=details]")
                    .not(e.sender.element)
                    .data("kendoDetails")
                    .toggle(!e.show);
            },

            _filterByCondition: function() {
                var isExpanded = this.viewModel.active === "custom";
                this._appendTemplate(FilterMenu.templates.filterByCondition, FilterMenu.classNames.filterByCondition, true, isExpanded);
            },

            _filterByValue: function() {
                var isExpanded = this.viewModel.active === "value";
                var wrapper = this._appendTemplate(FilterMenu.templates.filterByValue, FilterMenu.classNames.filterByValue, true, isExpanded);

                this.valuesTreeView = wrapper.find("[data-role=treeview]").data("kendoTreeView");

                this.valuesTreeView.setDataSource(this.getValues());
            },

            _actionButtons: function() {
                this._appendTemplate(FilterMenu.templates.actionButtons, FilterMenu.classNames.actionButtons, false);
            },

            _active: function() {
                var activeContainer = this.element.find("[data-role=details]").filter(function(index, element) {
                    return $(element).data("kendoDetails").visible();
                });

                if (activeContainer.hasClass(FilterMenu.classNames.filterByValue)) {
                    this.viewModel.set("active", "value");
                } else if (activeContainer.hasClass(FilterMenu.classNames.filterByCondition)) {
                    this.viewModel.set("active", "custom");
                }
            }
        });

        kendo.spreadsheet.FilterMenu = FilterMenu;
        $.extend(true, FilterMenu, { classNames: classNames, templates: templates });

    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
