(function(f, define){
    define([
        "./spreadsheet/rangelist",
        "./spreadsheet/references",
        "./spreadsheet/range",
        "./spreadsheet/sheet",
        "./spreadsheet/formulacontext",
        "./spreadsheet/view",
        "./spreadsheet/grid",
        "./spreadsheet/axis",
        "./spreadsheet/sorter",
        "./spreadsheet/runtime",
        "./spreadsheet/calc"
    ], f);
})(function(){
    var __meta__ = {
        id: "spreadsheet",
        name: "Spreadsheet",
        category: "web",
        description: "Spreadsheet component",
        depends: [],
        features: []
    };

    var Widget = kendo.ui.Widget;

    var Spreadsheet = kendo.ui.Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.addClass("k-spreadsheet");
            this._fixedContainer = $("<div class=k-spreadsheet-fixed-container>").appendTo(this.element);
            this._scroller = $("<div class=k-spreadsheet-scroller>").appendTo(this.element);
            this._view = new kendo.spreadsheet.View(this._scroller, this._fixedContainer);

            this._sheet = new kendo.spreadsheet.Sheet(
                this.options.rows,
                this.options.columns,
                this.options.rowHeight,
                this.options.columnWidth
                );

            this._sheet.name("sheet1");

            this._context = new kendo.spreadsheet.FormulaContext({ "sheet1": this._sheet });

            this._view.sheet(this.activeSheet());
            this._view.context(this._context);

            this.refresh();
        },

        refresh: function() {
            this._view.render();
        },

        activeSheet: function() {
            return this._sheet;
        },

        options: {
            name: "Spreadsheet",
            rows: 200,
            columns: 50,
            rowHeight: 20,
            columnWidth: 64
        }
    });

    kendo.ui.plugin(Spreadsheet);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
