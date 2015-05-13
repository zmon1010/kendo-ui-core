(function(f, define){
    define([
        "./spreadsheet/rangelist",
        "./spreadsheet/sheet",
        "./spreadsheet/view",
        "./spreadsheet/grid",
        "./spreadsheet/axis",
        "./spreadsheet/sorter"
    ], f);
})(function(){
    var __meta__ = {
        id: "spreadsheet",
        name: "SpreadSheet",
        category: "web",
        description: "SpreadSheet component",
        depends: [],
        features: []
    };

    var Widget = kendo.ui.Widget,
        ROWS = 200,
        COLUMNS = 50,
        ROW_HEIGHT = 20,
        COLUMN_WIDTH = 64,
        FIXED = false;

    var Spreadsheet = kendo.ui.Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.view = new kendo.spreadsheet.View(this.element, FIXED);
            this.activeSheet = new kendo.spreadsheet.Sheet(COLUMNS, ROWS, COLUMN_WIDTH, ROW_HEIGHT, FIXED);
            this.view.sheet(this.activeSheet);
            this.view.render();
        },

        options: {
            name: "Spreadsheet"
        }
    });

    kendo.ui.plugin(Spreadsheet);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
