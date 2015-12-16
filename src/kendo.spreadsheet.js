(function(f, define){
    define([
        "./util/undoredostack",
        "./util/text-metrics",
        "./util/parse-xml",
        "./kendo.excel",
        "./kendo.progressbar",
        "./kendo.pdf",
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
        "./spreadsheet/excel-reader",
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
        "./spreadsheet/runtime.functions",
        "./spreadsheet/runtime.functions.2",
        "./spreadsheet/toolbar",
        "./spreadsheet/dialogs",
        "./spreadsheet/sheetbinder",
        "./spreadsheet/filtermenu",
        "./spreadsheet/editor",
        "./spreadsheet/autofill",
        "./spreadsheet/print"
    ], f);
})(function(){
    var __meta__ = { // jshint ignore:line
        id: "spreadsheet",
        name: "Spreadsheet",
        category: "web",
        description: "Spreadsheet component",
        depends: [
            "core", "binder", "colorpicker", "combobox", "data", "dom", "dropdownlist",
            "menu", "ooxml", "popup", "sortable", "tabstrip", "toolbar", "treeview",
            "window", "validator", "excel", "pdf", "drawing" ]
    };

    (function(kendo, undefined) {
        if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
            return;
        }

        var $ = kendo.jQuery;

        var Widget = kendo.ui.Widget;
        var Workbook = kendo.spreadsheet.Workbook;
        var Controller = kendo.spreadsheet.Controller;
        var View = kendo.spreadsheet.View;
        var NS = ".kendoSpreadsheet";

        var ALL_REASONS = {
            recalc: true,
            selection: true,
            activeCell: true,
            layout: true,
            sheetSelection: true,
            resize: true,
            editorChange: false,
            editorClose: false
        };

        var classNames = {
            wrapper: "k-widget k-spreadsheet"
        };

        var Spreadsheet = kendo.ui.Widget.extend({
            init: function(element, options) {
                Widget.fn.init.call(this, element, options);

                this.element.addClass(Spreadsheet.classNames.wrapper);

                this._view = new View(this.element, {
                    toolbar: this.options.toolbar,
                    sheetsbar:this.options.sheetsbar
                });

                this._workbook = new Workbook(this.options, this._view);

                this._controller = new Controller(this._view, this._workbook);

                this._autoRefresh = true;

                this._bindWorkbookEvents();

                this._view.workbook(this._workbook);

                this.refresh();

                this._resizeHandler = function() { this.resize(); }.bind(this);
                $(window).on("resize" + NS, this._resizeHandler);
            },

            _resize: function() {
                this.refresh({ layout: true });
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

                if (!reason.editorClose) {
                    this._view.sheet(this._workbook.activeSheet());
                    this._controller.sheet(this._workbook.activeSheet());

                    this._workbook.refresh(reason);
                }

                if (!reason.editorChange) {
                    this._view.refresh(reason);
                    this._controller.refresh();

                    this._view.render();
                    this.trigger("render");
                }

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
                    this._workbook.destroy();

                    this._workbook = new Workbook($.extend({}, this.options, json));

                    this._bindWorkbookEvents();

                    this._view.workbook(this._workbook);
                    this._controller.workbook(this._workbook);

                    this.activeSheet(this.activeSheet());
                } else {
                    this.refresh();
                }
            },

            fromFile: function(blob, name) {
                return this._workbook.fromFile(blob, name);
            },

            saveAsPDF: function(options) {
                this._workbook.saveAsPDF(options || $.extend(this.options.pdf, {workbook: this._workbook}));
            },

            saveAsExcel: function(options) {
                this._workbook.saveAsExcel(options);
            },

            draw: function(options, callback) {
                this._workbook.draw(options, callback);
            },

            _workbookExcelExport: function(e) {
                if (this.trigger("excelExport", e)) {
                    e.preventDefault();
                }
            },

            _workbookExcelImport: function(e) {
                if (this.trigger("excelImport", e)) {
                    e.preventDefault();
                } else {
                    this._initProgress(e.promise);
                }
            },

            _initProgress: function(deferred) {
                var loading =
                    $("<div class='k-loading-mask' " +
                           "style='width: 100%; height: 100%; top: 0;'>" +
                        "<div class='k-loading-color'/>" +
                    "</div>")
                    .appendTo(this.element);

                var pb = $("<div class='k-loading-progress'>")
                .appendTo(loading)
                .kendoProgressBar({
                    type: "chunk", chunkCount: 10,
                    min: 0, max: 1, value: 0
                }).data("kendoProgressBar");

                deferred.progress(function(e) {
                    pb.value(e.progress);
                })
                .always(function() {
                    kendo.destroy(loading);
                    loading.remove();
                });
            },

            _workbookPdfExport: function(e) {
                if (this.trigger("pdfExport", e)) {
                    e.preventDefault();
                }
            },

            _bindWorkbookEvents: function() {
                this._workbook.bind("change", this._workbookChange.bind(this));
                this._workbook.bind("excelExport", this._workbookExcelExport.bind(this));
                this._workbook.bind("excelImport", this._workbookExcelImport.bind(this));
                this._workbook.bind("pdfExport", this._workbookPdfExport.bind(this));
            },

            destroy: function() {
                kendo.ui.Widget.fn.destroy.call(this);

                this._workbook.destroy();
                this._controller.destroy();
                this._view.destroy();

                if (this._resizeHandler) {
                    $(window).off("resize" + NS, this._resizeHandler);
                }
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
                headerWidth: 32,
                excel: {
                    proxyURL: "",
                    fileName: "Workbook.xlsx"
                },
                pdf: {
                    // which part of the workbook to be exported
                    area      : "workbook",
                    fileName  : "Workbook.pdf",
                    proxyURL  : "",
                    // paperSize can be an usual name, i.e. "A4", or an array of two Number-s specifying the
                    // width/height in points (1pt = 1/72in), or strings including unit, i.e. "10mm".  Supported
                    // units are "mm", "cm", "in" and "pt".  The default "auto" means paper size is determined
                    // by content.
                    paperSize : "a4",
                    // True to reverse the paper dimensions if needed such that width is the larger edge.
                    landscape : true,
                    // An object containing { left, top, bottom, right } margins with units.
                    margin    : null,
                    // Optional information for the PDF Info dictionary; all strings except for the date.
                    title     : null,
                    author    : null,
                    subject   : null,
                    keywords  : null,
                    creator   : "Kendo UI PDF Generator",
                    // Creation Date; defaults to new Date()
                    date      : null
                }
            },

            events: [
                "pdfExport",
                "excelExport",
                "excelImport",
                "render"
            ]
        });

        kendo.spreadsheet.ALL_REASONS = ALL_REASONS;
        kendo.ui.plugin(Spreadsheet);
        $.extend(true, Spreadsheet, { classNames: classNames });
    })(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
