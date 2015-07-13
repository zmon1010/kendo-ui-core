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
        getActiveRange: function() {
            var sheet = this.spreadsheet._sheet;
 
            return sheet.range(sheet.activeCell());
        },
        refresh: function() {
            var activeRange = this.getActiveRange();
 
            var tools = this._tools();

            for (var name in tools) {
                if (name.match(/(font)/)) {
                    tools[name].toolbar.toggle(activeRange[name]() ? true : false, true);
                }
            }
        },
        _tools: function() {
            var elements = this.element.children();
            var tool, tools = {};

            for (var i = 0; i < elements.length; i++) {
                if (elements.eq(i).is(".k-overflow-anchor")) {
                    continue;
                }

                tool = this._getItem(elements.eq(i));

                if (tool.type === "buttonGroup") {
                    elements.eq(i).children().each(function(idx, button) {
                        tools[button.dataset.property] = this._getItem(button);
                    }.bind(this));
                } else {
                    tools[elements.eq(i).data("property")] = tool;
                }

            }

            return tools;
        }
    });
 
    kendo.spreadsheet.toolbar = SpreadsheetToolBar;

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
