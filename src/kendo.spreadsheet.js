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
        "./spreadsheet/axismanager",
        "./spreadsheet/clipboard",
        "./spreadsheet/range",
        "./spreadsheet/sheet",
        "./spreadsheet/sheetsbar",
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
        "./spreadsheet/runtime.functions.2.js",
        "./spreadsheet/toolbar",
        "./spreadsheet/dialogs",
        "./spreadsheet/sheetbinder",
        "./spreadsheet/filtermenu",
        "./spreadsheet/editor"
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

    (function(kendo, undefined) {
        var $ = kendo.jQuery;

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

        var classNames = {
            wrapper: "k-widget k-spreadsheet"
        };

        var Spreadsheet = kendo.ui.Widget.extend({
            init: function(element, options) {
                Widget.fn.init.call(this, element, options);

                this.element.addClass(Spreadsheet.classNames.wrapper);

                this._view = new View(this.element, {
                    toolbar: this.options.toolbar
                });

                this._workbook = new Workbook(this.options);

                this._controller = new Controller(this._view, this._workbook);

                this._autoRefresh = true;

                this._workbook.bind("change", this._workbookChange.bind(this));

                this._resize();

                this._view.workbook(this._workbook);

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

            activeSheet: function(sheet) {
                return this._workbook.activeSheet(sheet);
            },

            moveSheetToIndex: function (sheet, index) {
                return this._workbook.moveSheetToIndex(sheet, index);
            },

            insertSheet: function(options) {
                return this._workbook.insertSheet(options);
            },

            sheets: function() {
                return this._workbook.sheets();
            },

            removeSheet: function(sheet) {
                return this._workbook.removeSheet(sheet);
            },

            sheetByName: function(sheetName) {
                return this._workbook.sheetByName(sheetName);
            },

            sheetIndex: function(sheet) {
                return this._workbook.sheetIndex(sheet);
            },

            sheetByIndex: function(index) {
                return this._workbook.sheetByIndex(index);
            },

            renameSheet: function(sheet, newSheetName) {
                return this._workbook.renameSheet(sheet, newSheetName);
            },

            refresh: function(reason) {
                if (!reason) {
                    reason = ALL_REASONS;
                }

                this._view.sheet(this._workbook.activeSheet());
                this._controller.sheet(this._workbook.activeSheet());

                this._workbook.refresh(reason);
                this._view.refresh(reason);
                this._controller.refresh();
                this._view.render();

                this.trigger("render");
                return this;
            },

            openDialog: function(name, options) {
                return this._view.openDialog(name, options);
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
                    this._controller.workbook(this._workbook);

                    this.activeSheet(this.activeSheet());
                } else {
                    this.refresh();
                }
            },

            destroy: function() {
                kendo.ui.Widget.fn.destroy.call(this);

                this._view.destroy();
            },

            options: {
                name: "Spreadsheet",
                toolbar: true,
                sheetsbar: true,
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
        $.extend(true, Spreadsheet, { classNames: classNames });
    })(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
