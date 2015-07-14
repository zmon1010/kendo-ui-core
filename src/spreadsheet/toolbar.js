(function(f, define){
    define([ "../kendo.toolbar", "../kendo.colorpicker" ], f);
})(function(){

(function(kendo) {
    var ToolBar = kendo.ui.ToolBar;

    var SpreadsheetToolBar = ToolBar.extend({
        init: function(element, options) {
            ToolBar.fn.init.call(this, element, options);

            this.bind({
                click: function(e) {
                    this.trigger("execute", {
                        commandType: e.target.attr("data-command")
                    });
                }.bind(this),
                toggle: function(e) {
                    var target = e.target;

                    this.trigger("execute", {
                        commandType: target.attr("data-command"),
                        property: target.attr("data-property"),
                        value: e.checked ? target.attr("data-value") : null
                    });
                }.bind(this)
            });
        },
        events: ToolBar.fn.events.concat([ "execute" ]),
        options: {
            name: "SpreadsheetToolBar"
        },
        bindTo: function(spreadsheet) {
            this.spreadsheet = spreadsheet;
        },
        range: function() {
            var sheet = this.spreadsheet._sheet;

            return sheet.range(sheet.activeCell());
        },
        refresh: function() {
            var range = this.range();
            var tools = this._tools();

            for (var name in tools) {
                var tool = tools[name];
                var value = range[name]();

                if (tool.type === "button") {
                    if (tool.toolbar) {
                        tool.toolbar.toggle(!!value);
                    }

                    if (tool.overflow) {
                        tool.overflow.toggle(!!value);
                    }
                } else if (tool.type === "colorPicker") {
                    if (tool.toolbar) {
                        tool.toolbar.value(value);
                    }

                    if (tool.overflow) {
                        tool.overflow.value(value);
                    }
                }
            }
        },
        _tools: function() {
            return this.element.find("[data-command]").toArray().reduce(function(tools, element) {
                element = $(element);
                var property = element.attr("data-property");

                if (property) {
                    tools[property] = this._getItem(element);
                }

                return tools;
            }.bind(this), {});
        }
    });

    kendo.spreadsheet.ToolBar = SpreadsheetToolBar;

    var colorPicker = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var colorPicker = $("<input />").kendoColorPicker({
                toolIcon: options.toolIcon,
                change: function(e) {
                    toolbar.trigger("execute", {
                        commandType: "PropertyChangeCommand",
                        property: options.property,
                        value: this.value()
                    });
                }
            }).data("kendoColorPicker");

            this.colorPicker = colorPicker;
            this.element = colorPicker.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.element.attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });

            this.element.data({
                type: "colorPicker",
                colorPicker: this
            });
        },

        value: function(value) {
            if (value !== undefined) {
                this.colorPicker.value(value);
            } else {
                return this.colorPicker.value();
            }
        }
    });

    kendo.toolbar.registerComponent("colorPicker", colorPicker);
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
