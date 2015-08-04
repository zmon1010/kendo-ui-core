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

            this._autoRefresh = true;

            this._sheets = {};
            this._sheetsByIndex = [];

            this._sheet = this.insertSheet({
                rows: this.options.rows,
                columns: this.options.columns,
                rowHeight: this.options.rowHeight,
                columnWidth: this.options.columnWidth,
                headerHeight: this.options.headerHeight,
                headerWidth: this.options.headerWidth
            });

            this._context = new kendo.spreadsheet.FormulaContext(this._sheets);

            this._resize();

            this._view.sheet(this.activeSheet());

            this.fromJSON(this.options);
        },

        _insertedSheetsCounter: 0,

        insertSheet: function(options) {
            options = options || {};
            var spreadsheet = this;
            var insertIndex = typeof options.index === "number" ? options.index : spreadsheet._sheetsByIndex.length;
            var sheetName;
            var options;
            var sheets = spreadsheet._sheets;
            var sheetsByIndex = spreadsheet._sheetsByIndex;
            var getUniqueSheetName = function() {
                var name = "Sheet" + (spreadsheet._insertedSheetsCounter+1);

                if (!sheets[name]) {
                    return name;
                }

                spreadsheet._insertedSheetsCounter++;
                return getUniqueSheetName();
            };

            if (options.name && sheets[options.name]) {
                return;
            }

            sheetName = options.name || getUniqueSheetName();

            var sheet = new kendo.spreadsheet.Sheet(
                options.rows || this.options.rows,
                options.columns || this.options.columns,
                options.rowHeight || this.options.rowHeight,
                options.columnWidth || this.options.columnWidth,
                options.headerHeight || this.options.headerHeight,
                options.headerWidth || this.options.headerWidth
            );

            sheet.name(sheetName);

            sheet.bind("change", spreadsheet._sheetChange.bind(spreadsheet));

            sheets[sheetName] = sheet;

            sheetsByIndex.splice(insertIndex, 0, sheetName);

            spreadsheet._insertedSheetsCounter++;

            return sheet;
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

            function apply(options) {
                var className = options.text[0].toLowerCase() + options.text.substr(1);
                return {
                    spriteCssClass: "k-icon k-i-" + className,
                    attributes: {
                        "data-command": "PropertyChangeCommand",
                        "data-property": options.property,
                        "data-value": options.value
                    },
                    text: options.text,
                    showText: "overflow"
                };
            }

            function toggle(options) {
                var button = apply(options);
                button.toggleable = true;
                return button;
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
                    resizable: false,
                    items: [
                        { type: "button", text: "Format cells", attributes: {
                            "data-command": "FormatCellsCommand"
                        } },
                        { type: "buttonGroup", buttons: [
                            toggle({ text: "Bold", property: "bold", value: true }),
                            toggle({ text: "Italic", property: "italic", value: true }),
                            toggle({ text: "Underline", property: "underline", value: true })
                        ] },
                        { type: "buttonGroup", buttons: [
                            toggle({ text: "Justify-left", property: "textAlign", value: "left" }),
                            toggle({ text: "Justify-center", property: "textAlign", value: "center" }),
                            toggle({ text: "Justify-right", property: "textAlign", value: "right" })
                        ] },
                        { type: "buttonGroup", buttons: [
                            toggle({ text: "Align-top", property: "verticalAlign", value: "top" }),
                            toggle({ text: "Align-middle", property: "verticalAlign", value: "middle" }),
                            toggle({ text: "Align-bottom", property: "verticalAlign", value: "bottom" })
                        ] },
                        { type: "buttonGroup", buttons: [
                            apply({ text: "Currency", property: "format", value: "$?" }),
                            apply({ text: "Percentage", property: "format", value: "?.00%" })
                        ] },
                        { type: "borders", overflow: "never" },
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
