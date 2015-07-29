(function(f, define){
    define([
        "./util/undoredostack",
        "./spreadsheet/commands",
        "./spreadsheet/formulabar",
        "./spreadsheet/eventlistener",
        "./spreadsheet/rangelist",
        "./spreadsheet/propertybag",
        "./spreadsheet/references",
        "./spreadsheet/navigator",
        "./spreadsheet/range",
        "./spreadsheet/sheet",
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

            this.toolbar.refresh();
        },

        execute: function(command) {
            command.range(this._sheet.selection());
            command.exec();
            this.undoRedoStack.push(command);
        },

        _chrome: function() {
            var formulaBar = $("<div />").prependTo(this.element);
            this.formulaBar = new kendo.spreadsheet.FormulaBar(formulaBar, {
                change: function(e) {
                    this.execute(new kendo.spreadsheet.EditCommand({
                        value: e.value
                    }));
                }.bind(this)
            });

            this._toolbar();
        },

        _toolbar: function() {
            var element;

            function toggleable(options) {
                var className = options.text[0].toLowerCase() + options.text.substr(1);
                return {
                    spriteCssClass: "k-icon k-i-" + className,
                    attributes: {
                        "data-command": "PropertyChangeCommand",
                        "data-property": options.property,
                        "data-value": options.value
                    },
                    text: options.text,
                    togglable: true,
                    showText: "overflow"
                };
            }

            if (this.toolbar) {
                this.toolbar.destroy();
                this.element.children(".k-toolbar").remove();
            }

            if (this.options.toolbar) {
                element = $("<div />").prependTo(this.element);
                this.toolbar = new kendo.spreadsheet.ToolBar(element, {
                    execute: function(e) {
                        this.execute(new kendo.spreadsheet[e.commandType](e));
                    }.bind(this),
                    items: [
                        { type: "button", text: "Format cells", attributes: {
                            "data-command": "FormatCellsCommand"
                        } },
                        { type: "buttonGroup", buttons: [
                            toggleable({ text: "Bold", property: "bold", value: "bold" }),
                            toggleable({ text: "Italic", property: "italic", value: "italic" }),
                            toggleable({ text: "Underline", property: "underline", value: "underline" })
                        ] },
                        { type: "buttonGroup", buttons: [
                            toggleable({ text: "Justify-left", property: "textAlign", value: "left" }),
                            toggleable({ text: "Justify-center", property: "textAlign", value: "center" }),
                            toggleable({ text: "Justify-right", property: "textAlign", value: "right" })
                        ] },
                        { type: "buttonGroup", buttons: [
                            toggleable({ text: "Align-top", property: "verticalAlign", value: "top" }),
                            toggleable({ text: "Align-middle", property: "verticalAlign", value: "middle" }),
                            toggleable({ text: "Align-bottom", property: "verticalAlign", value: "bottom" })
                        ] },
                        { type: "fontFamily", property: "fontFamily", width: 130, overflow: "never" },
                        { type: "fontSize", property: "fontSize", width: 60, overflow: "never" },
                        { type: "colorPicker", property: "background", toolIcon: "k-backColor", overflow: "never" },
                        { type: "colorPicker", property: "color", toolIcon: "k-foreColor", overflow: "never" }
                    ]
                });

                this.toolbar.bindTo(this);
            }
        },

        refresh: function(reason) {
            if (!reason) {
                reason = ALL_REASONS;
            }

            if (reason.recalc) {
                this._sheet.recalc(this._context);
            }

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

    kendo.spreadsheet.ALL_REASONS = ALL_REASONS;
    kendo.ui.plugin(Spreadsheet);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
