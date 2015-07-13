(function(f, define){
    define([
        "./util/undoredostack",
        "./spreadsheet/commands",
        "./spreadsheet/formulabar",
        "./spreadsheet/eventlistener",
        "./spreadsheet/rangelist",
        "./spreadsheet/propertybag",
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

    var Spreadsheet = kendo.ui.Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.element.addClass("k-widget k-spreadsheet");

            this.undoRedoStack = new kendo.util.UndoRedoStack();
            this.undoRedoStack.bind(["undo", "redo"], this._onUndoRedo.bind(this));

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

        _onUndoRedo: function(e) {
            e.command.range().select();
        },

        _resize: function() {
            var toolbarHeight = this.toolbar ? this.toolbar.element.outerHeight() : 0;
            var formulaBarHeight = this.formulaBar.element.outerHeight();

            this._viewElement().height(this.element.height() - toolbarHeight - formulaBarHeight);
        },

        _editableValueForRef: function(ref) {
            return new kendo.spreadsheet.Range(ref, this._sheet)._editableValue();
        },

        _sheetChange: function(e) {
            if (this._autoRefresh) {
                this.refresh(e);
            }

            this.formulaBar.value(this._editableValueForRef(e.sender.activeCell()));
        },

        _execCommand: function(commandType, options) {
            var sheet = this._sheet;
            var command = new commandType($.extend({
                ref: sheet.select(),
                sheet: sheet
            }, options));
            command.exec();
            this.undoRedoStack.push(command);
        },

        _chrome: function() {
            var formulaBar = $("<div />").prependTo(this.element);
            this.formulaBar = new kendo.spreadsheet.FormulaBar(formulaBar, {
                change: function(e) {
                    this._execCommand(kendo.spreadsheet.EditCommand, {
                        value: e.value
                    });
                }.bind(this)
            });

            this._toolbar();
        },

        _toolbar: function() {
            var element;
            var toggle = function(value) {
                    return function(e) {
                        this._execCommand(kendo.spreadsheet.PropertyChangeCommand, {
                            property: e.id,
                            value: e.checked ? value : null
                        });
                    }.bind(this);
                }.bind(this);

            function toggleable(options) {
                var className = options.text.toLowerCase();
                return {
                    spriteCssClass: "k-tool-icon k-" + className,
                    id: options.property,
                    attributes: { "data-property": options.property },
                    text: options.text,
                    togglable: true,
                    toggle: toggle(options.value),
                    showText: "overflow"
                };
            }

            if (this.toolbar) {
                this.toolbar.destroy();
                this.element.children(".k-toolbar").remove();
            }

            if (this.options.toolbar) {
                element = $("<div />").prependTo(this.element);
                this.toolbar = new kendo.spreadsheet.toolbar(element, {
                    items: [
                        { type: "button", text: "Format cells", attributes: { "data-property": "format" }, click: function() {
                            this._execCommand(kendo.spreadsheet.FormatCellsCommand);
                        }.bind(this) },
                        { type: "buttonGroup", buttons: [
                            toggleable({ text: "Bold", property: "fontWeight", value: "bold" }),
                            toggleable({ text: "Italic", property: "fontStyle", value: "italic" }),
                            toggleable({ text: "Underline", property: "fontLine", value: "underline" })
                        ] }
                    ]
                });

                this.toolbar.bindTo(this);
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
