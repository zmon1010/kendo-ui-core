(function(f, define){
    define([
        "./util/undoredostack",
        "./spreadsheet/commands",
        "./spreadsheet/formulabar",
        "./spreadsheet/formulainput",
        "./spreadsheet/eventlistener",
        "./spreadsheet/rangelist",
        "./spreadsheet/propertybag",
        "./spreadsheet/references",
        "./spreadsheet/navigator",
        "./spreadsheet/range",
        "./spreadsheet/sheet",
        "./spreadsheet/workbook",
        "./spreadsheet/formulacontext",
        "./spreadsheet/view/eventhandler",
        "./spreadsheet/view",
        "./spreadsheet/grid",
        "./spreadsheet/axis",
        "./spreadsheet/filter",
        "./spreadsheet/sorter",
        "./spreadsheet/runtime",
        "./spreadsheet/calc",
        "./spreadsheet/numformat",
        "./spreadsheet/runtime.functions.js",
        "./spreadsheet/toolbar"
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

    var ALL_REASONS = {
        recalc: true,
        selection: true,
        activeCell: true,
        layout: true
    };

    var Spreadsheet = kendo.ui.Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.addClass("k-widget k-spreadsheet");

            this._view = new kendo.spreadsheet.View(this.element, {
                toolbar: this.options.toolbar
            });

            this._autoRefresh = true;

            this._workbook = new kendo.spreadsheet.Workbook(this.options);

            this._workbook.bind("change", this._workbookChange.bind(this));

            this._resize();

            this._view.workbook(this._workbook);

            this.fromJSON(this.options);
        },

        _resize: function() {
            this._view._resize();
        },

        _workbookChange: function(e) {
            if (this._autoRefresh) {
                this.refresh(e);
            }
        },

        activeSheet: function() {
            return this._workbook.activeSheet();
        },

        refresh: function(reason) {
            if (!reason) {
                reason = ALL_REASONS;
            }

            this._workbook.refresh(reason);

            this._view.refresh(reason);
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

        toJSON: function() {
            return {
                sheets: [this.activeSheet()].map(function(sheet) {
                    sheet.recalc(this._workbook._context);
                    return sheet.toJSON();
                }, this)
            };
        },

        fromJSON: function(json) {
            if (json.sheets) {
                this.activeSheet().fromJSON(json.sheets[0]);
            } else {
                this.refresh();
            }
        },

        options: {
            name: "Spreadsheet",
            toolbar: true,
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

    kendo.spreadsheet.ALL_REASONS = ALL_REASONS;
    kendo.ui.plugin(Spreadsheet);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
