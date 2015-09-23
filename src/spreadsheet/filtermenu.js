(function(f, define){
    define([ "../kendo.core", "../kendo.popup", "../kendo.treeview" ], f);
})(function(){

    (function(kendo) {
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
                    .on("click", this.toggle.bind(this));

                this._icon = $("<span />", { "class": FilterMenu.classNames.icon + " " + FilterMenu.classNames.iconCollapse })
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

                this._icon.toggleClass(FilterMenu.classNames.iconExpand, show)
                          .toggleClass(FilterMenu.classNames.iconCollapse, !show);
            }
        });

        var templates = {
            filterByValue:
                "<div class='" + classNames.detailsSummary + "'>#= messages.filterByValue #</div>" +
                "<div class='" + classNames.detailsContent + "'>" +
                    //"<div class='k-textbox k-space-right'>" +
                        //"<input placeholder='#= messages.search #' />" +
                        //"<span class='k-icon k-font-icon k-i-search' />" +
                    //"</div>" +
                    "<div class='" + classNames.valuesTreeViewWrapper + "'>" +
                        "<div data-role='treeview' data-checkboxes='{ checkChildren: true }' />" +
                    "</div>" +
                "</div>",
            filterByCondition:
                "<div class='" + classNames.detailsSummary + "'>#= messages.filterByCondition #</div>" +
                "<div class='" + classNames.detailsContent + "'>" +
                    '<select data-#=ns#bind="value: customFilter.criteria[0].operator" data-height="auto" data-#=ns#role="dropdownlist">'+
                        '<option value="">None</option>' +
                        '#for(var type in operators){#'+
                            '#for(var op in operators[type]){#' +
                                '<option value="#=op#">#=operators[type][op]#</option>' +
                            '#}#'+
                        '#}#'+
                    '</select>'+
                    '<input data-#=ns#bind="value: customFilter.criteria[0].value" class="k-textbox" />'+
                    '<select class="k-filter-and" data-#=ns#bind="value: customFilter.logic" data-#=ns#role="dropdownlist">'+
                        '<option value="and">#=messages.and#</option>'+
                        '<option value="or">#=messages.or#</option>'+
                    '</select>'+
                    '<select data-#=ns#bind="value: customFilter.criteria[1].operator" data-height="auto" data-#=ns#role="dropdownlist">'+
                        '<option value="">None</option>' +
                        '#for(var type in operators){#'+
                            '#for(var op in operators[type]){#' +
                                '<option value="#=op#">#=operators[type][op]#</option>' +
                            '#}#'+
                        '#}#' +
                    '</select>'+
                    '<input data-#=ns#bind="value: customFilter.criteria[1].value" class="' + classNames.textbox + '" />' +
                "</div>",
            menuItem:
                "<li data-command='#=command#' data-dir='#=dir#'>" +
                    "<span class='k-icon k-font-icon k-i-#=iconClass#'></span>#=text#" +
                "</li>",
            actionButtons:
                "<div class='" + classNames.actionButtons + "'>" +
                    "<button data-#=ns#bind='click: apply' class='k-button k-primary'>#=messages.apply#</button>" +
                    "<button data-#=ns#bind='click: close' class='k-button'>#=messages.cancel#</button>" +
                "</div>"
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

        var FilterMenu = Widget.extend({
            init: function(options) {
                var element = $("<div />", { "class": FilterMenu.classNames.wrapper }).appendTo(document.body);
                Widget.call(this, element, options);

                this.viewModel = kendo.observable({
                    customFilter: {
                        logic: "and",
                        criteria: [
                            { operator: "", value: "" },
                            { operator: "", value: "" }
                        ]
                    },
                    close: this.close.bind(this),
                    apply: this.apply.bind(this)
                });

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
                messages: {
                    sortAscending: "Sort range A to Z",
                    sortDescending: "Sort range Z to A",
                    filterByValue: "Filter by value",
                    filterByCondition: "Filter by condition",
                    apply: "Apply",
                    search: "Search",
                    cancel: "Cancel",
                    blanks: "(Blanks)",
                    and: "AND",
                    or: "OR"
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

            apply: function() {
                var customFilter = this.viewModel.customFilter.toJSON();

                customFilter.criteria = customFilter.criteria.filter(function(item) {
                    return item.operator && item.value;
                });

                //this.action({ command: "ApplyFilterCommand", options: options });
            },

            action: function(options) {
                this.trigger("action", $.extend({ }, options));
            },

            getValues: function() {
                var values = [];
                var messages = this.options.messages;
                var column = this.options.column;
                var columnRange = this.options.range.column(column);

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
                            operatingRange: this.options.range
                        };

                        this.action({ command: "SortCommand", options: options });
                    }.bind(this)
                }).data("kendoMenu");
            },

            _appendTemplate: function(template, details) {
                var compiledTemplate = kendo.template(template);
                var wrapper = $("<div />").html(compiledTemplate({
                    messages: this.options.messages,
                    operators: this.options.operators,
                    ns: kendo.ns
                }));

                this.element.append(wrapper);

                if (details) {
                    var details = new Details(wrapper); // jshint ignore:line
                }

                kendo.bind(wrapper, this.viewModel);

                return wrapper;
            },

            _filterByCondition: function() {
                this._appendTemplate(FilterMenu.templates.filterByCondition, true);
            },

            _filterByValue: function() {
                var wrapper = this._appendTemplate(FilterMenu.templates.filterByValue, true);

                this.valuesTreeView = wrapper.find("[data-role=treeview]").data("kendoTreeView");

                this.valuesTreeView.bind("select", function(e) {
                    e.preventDefault();

                    var node = this.dataItem(e.node);
                    node.set("checked", !node.checked);
                });

                this.valuesTreeView.setDataSource(this.getValues());
            },

            _actionButtons: function() {
                this._appendTemplate(FilterMenu.templates.actionButtons, false);
            }
        });

        kendo.spreadsheet.FilterMenu = FilterMenu;
        $.extend(true, FilterMenu, { classNames: classNames, templates: templates });

    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
