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
        "./spreadsheet/controller",
        "./spreadsheet/view",
        "./spreadsheet/grid",
        "./spreadsheet/axis",
        "./spreadsheet/filter",
        "./spreadsheet/sorter",
        "./spreadsheet/runtime",
        "./spreadsheet/calc",
        "./spreadsheet/numformat",
        "./spreadsheet/runtime.functions.js",
        "./spreadsheet/toolbar",
        "./spreadsheet/sheetbinder"
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
    var Workbook = kendo.spreadsheet.Workbook;
    var Controller = kendo.spreadsheet.Controller;
    var View = kendo.spreadsheet.View;

    var ALL_REASONS = {
        recalc: true,
        selection: true,
        activeCell: true,
        layout: true,
        sheetSelection: true
    };

    var Spreadsheet = kendo.ui.Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.addClass("k-widget k-spreadsheet");

            this._view = new View(this.element, {
                toolbar: this.options.toolbar
            });

            this._controller = new Controller(this._view);

            this._autoRefresh = true;

            this._workbook = new Workbook(this.options);

            this._workbook.bind("change", this._workbookChange.bind(this));

            this._resize();

            this._view.workbook(this._workbook);

            this._activeSheet(this._workbook.activeSheet());

            this.refresh();
        },

        _resize: function() {
            this._view._resize();
        },

        _workbookChange: function(e) {
            if (this._autoRefresh) {
                this.refresh(e);
            }
        },

        _activeSheet: function(sheet) {
            this._controller.sheet(sheet);
            this._view.sheet(sheet);
        },

        activeSheet: function(sheet) {
            return this._workbook.activeSheet(sheet, this._activeSheet.bind(this));
        },

        moveSheetToIndex: function (sheet, index) {
            return this._workbook.moveSheetToIndex(sheet, index);
        },

        insertSheet: function(options) {
            return this._workbook.insertSheet(options);
        },

        getSheets: function() {
            return this._workbook.getSheets();
        },

        removeSheet: function(sheet) {
            var that = this;

            var sheetRefreshCallback = function() {
                that.refresh({recalc: true});
            };

            return this._workbook.removeSheet(sheet, this._activeSheet.bind(this), sheetRefreshCallback);
        },

        getSheetByName: function(sheetName) {
            return this._workbook.getSheetByName(sheetName);
        },

        getSheetIndex: function(sheet) {
            return this._workbook.getSheetIndex(sheet);
        },

        getSheetByIndex: function(index) {
            return this._workbook.getSheetByIndex(index);
        },

        renameSheet: function(sheet, newSheetName) {
            return this._workbook.renameSheet(sheet, newSheetName);
        },

        refresh: function(reason) {
            if (!reason) {
                reason = ALL_REASONS;
            }

            this._workbook.refresh(reason);

            this._view.refresh(reason);
            this._controller.refresh();
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
            return this._workbook.toJSON();
        },

        fromJSON: function(json) {
            if (json.sheets) {
                this._workbook.unbind();

                this._workbook = new Workbook($.extend({}, this.options, { sheets: json.sheets }));

                this._workbook.bind("change", this._workbookChange.bind(this));

                this._view.workbook(this._workbook);

                this.activeSheet(this.activeSheet());
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
