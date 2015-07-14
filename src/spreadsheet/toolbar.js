(function(f, define){
    define([ "../kendo.toolbar" ], f);
})(function(){

(function(kendo) {

    var SpreadsheetToolBar = kendo.ui.ToolBar.extend({
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
            var elements = this.element.find("[data-command]");
            var tool, property, tools = {};

            for (var i = 0; i < elements.length; i++) {
                tool = this._getItem(elements.eq(i));

                property = elements.eq(i).data("property");

                if (property) {
                    tools[property] = tool;
                }
            }

            return tools;
        }
    });

    kendo.spreadsheet.ToolBar = SpreadsheetToolBar;

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
