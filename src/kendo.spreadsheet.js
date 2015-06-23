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
        "./spreadsheet/calc",
        "./spreadsheet/numformat",
        "./spreadsheet/runtime.functions.js"
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

            var scrollbar = kendo.support.scrollbar();

            this._fixedContainer.css({
                width: element.clientWidth - scrollbar,
                height: element.clientHeight - scrollbar
            }).on("wheel", this._passWheelEvent.bind(this));

            this._scroller = $("<div class=k-spreadsheet-scroller>").appendTo(this.element);

            this._view = new kendo.spreadsheet.View(this._scroller, this._fixedContainer);

            this._sheet = new kendo.spreadsheet.Sheet(
                this.options.rows,
                this.options.columns,
                this.options.rowHeight,
                this.options.columnWidth,
                this.options.headerHeight,
                this.options.headerWidth
            );

            this._autoRefresh = true;

            this._sheet.bind("change", function(e) {
                if (this._autoRefresh) {
                    this.refresh();
                }
            }.bind(this));

            this._sheet.name("sheet1");

            this._context = new kendo.spreadsheet.FormulaContext({ "sheet1": this._sheet });

            this._view.sheet(this.activeSheet());
            this._view.context(this._context);

            this.refresh();
        },

        _passWheelEvent: function(e) {
            var element = this._scroller[0];

            element.scrollTop += e.originalEvent.deltaY;
            element.scrollLeft += e.originalEvent.deltaX;

            e.preventDefault();
        },

        refresh: function() {
            this._view.refresh();
            this._view.render();
            this.trigger("render");
            return this;
        },

        autoRefresh: function(value) {
            if (value !== undefined) {
                this._autoRefresh = value;

                if (value === true) {
                    this.refresh();
                }

                return this;
            }

            return this._autoRefresh;
        },

        activeSheet: function() {
            return this._sheet;
        },

        toJSON: function() {
            return {
                sheets: [
                    this._sheet.toJSON()
                ]
            };
        },

        options: {
            name: "Spreadsheet",
            rows: 200,
            columns: 50,
            rowHeight: 20,
            columnWidth: 64,
            headerHeight: 20,
            headerWidth: 32
        },

        events: [
            "render"
        ]
    });

    kendo.ui.plugin(Spreadsheet);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
