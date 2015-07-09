(function(f, define){
    define([
        "./kendo.toolbar",
        "./util/undoredostack",
        "./spreadsheet/chrome",
        "./spreadsheet/eventlistener",
        "./spreadsheet/rangelist",
        "./spreadsheet/references",
        "./spreadsheet/range",
        "./spreadsheet/sheet",
        "./spreadsheet/formulacontext",
        "./spreadsheet/view",
        "./spreadsheet/grid",
        "./spreadsheet/axis",
        "./spreadsheet/filter",
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

            this.element.addClass("k-widget k-spreadsheet");

            this._chrome();

            this._view = new kendo.spreadsheet.View(this._viewElement());

            this._sheet = new kendo.spreadsheet.Sheet(
                this.options.rows,
                this.options.columns,
                this.options.rowHeight,
                this.options.columnWidth,
                this.options.headerHeight,
                this.options.headerWidth
            );

            this._autoRefresh = true;

            this._sheet.bind("change", this._sheetChange.bind(this));

            var context = {};

            this._sheet.name("Sheet1");

            context[this._sheet.name()] = this._sheet;

            this._context = new kendo.spreadsheet.FormulaContext(context);

            this._resize();

            this._view.sheet(this.activeSheet());

            this.fromJSON(this.options);
        },

        _viewElement: function() {
            var view = this.element.children(".k-spreadsheet-view");

            if (!view.length) {
                view = $("<div class='k-spreadsheet-view' />").appendTo(this.element);
            }

            return view;
        },

        _resize: function() {
            var toolbarHeight = this.toolbar ? this.toolbar.element.outerHeight() : 0;
            var formulaBarHeight = this._formulaBar.element.outerHeight();

            this._viewElement().height(this.element.height() - toolbarHeight - formulaBarHeight);
        },

        _editValueForRef: function(ref) {
            return new kendo.spreadsheet.Range(ref, this._sheet).editValue();
        },

        _sheetChange: function(e) {
            if (this._autoRefresh) {
                this.refresh(e);
            }

            this._formulaBar.value(this._editValueForRef(e.sender.activeCell()));
        },

        _chrome: function() {
            var formulaBar = $("<div />").prependTo(this.element);
            this._formulaBar = new kendo.spreadsheet.FormulaBar(formulaBar);

            this._toolbar();
        },

        _toolbar: function() {
            function toolIcon(name) {
                return {
                    spriteCssClass: "k-tool-icon k-" + name.toLowerCase(),
                    text: name,
                    togglable: true,
                    showText: "overflow"
                };
            }

            if (this.toolbar) {
                this.toolbar.destroy();
                this.element.children(".k-toolbar").remove();
            }

            if (this.options.toolbar) {
                this.toolbar = $("<div />")
                    .prependTo(this.element)
                    .kendoToolBar({
                        items: [
                            { type: "buttonGroup", buttons: [
                                toolIcon("bold"),
                                toolIcon("italic"),
                                toolIcon("underline")
                            ] }
                        ]
                    }).data("kendoToolBar");
            }
        },

        refresh: function(e) {
            if (!e || e.recalc === true) {
                this._sheet.recalc(this._context);
            }
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
                sheets: [this._sheet].map(function(sheet) {
                    sheet.recalc(this._context);
                    return sheet.toJSON();
                }, this)
            };
        },

        fromJSON: function(json) {
            if (json.sheets) {
                this._sheet.fromJSON(json.sheets[0]);
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

    kendo.ui.plugin(Spreadsheet);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
