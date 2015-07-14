(function(f, define){
    define([ "../kendo.toolbar" ], f);
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
                }.bind(this),
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
                if (name.match(/(font)/)) {
                    var active = !!range[name]();
                    tools[name].toggle(active);
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

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
