(function(f, define){
    define([ "../kendo.core", "./runtime", "./references" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var Workbook = kendo.Observable.extend({
        init: function(options, view) {
            kendo.Observable.fn.init.call(this);

            this.options = options;

            this._view = view;
            this._sheets = [];

            this._sheetsSearchCache = {};

            this._sheet = this.insertSheet({
                rows: this.options.rows,
                columns: this.options.columns,
                rowHeight: this.options.rowHeight,
                columnWidth: this.options.columnWidth,
                headerHeight: this.options.headerHeight,
                headerWidth: this.options.headerWidth,
                dataSource: this.options.dataSource
            });

            this.undoRedoStack = new kendo.util.UndoRedoStack();
            this.undoRedoStack.bind(["undo", "redo"], this._onUndoRedo.bind(this));

            this._context = new kendo.spreadsheet.FormulaContext(this);
            this._validationContext = new kendo.spreadsheet.ValidationFormulaContext(this);

            this.fromJSON(this.options);
        },

        clipboard: function() {
            if(!this._clipboard) {
                 this._clipboard = new kendo.spreadsheet.Clipboard(this);
            }
            return this._clipboard;
        },

        destroy: function() {
            this.unbind();

            if (this._clipboard) {
                this._clipboard.destroy();
            }
        },

        events: [
            "change"
        ],

        _sheetChange: function(e) {
            this.trigger("change", e);
        },

        _inputForRef: function(ref) {
            return new kendo.spreadsheet.Range(ref, this._sheet).input();
        },

        _onUndoRedo: function(e) {
            e.command.range().select();
        },

        execute: function(options) {
            var commandOptions = $.extend({ workbook: this }, options.options);
            var command = new kendo.spreadsheet[options.command](commandOptions);
            var sheet = this.activeSheet();

            if (commandOptions.origin) {
                command.origin(commandOptions.origin);
            }

            if (commandOptions.operatingRange) {
                command.range(commandOptions.operatingRange);
            } else if (commandOptions.editActiveCell) {
                command.range(sheet.activeCellSelection());
            } else {
                command.range(sheet.selection());
            }

            var result = command.exec();

            if (!result || result.reason !== "error") {
                this.undoRedoStack.push(command);
            }

            return result;
        },

        resetFormulas: function() {
            this._sheets.forEach(function(sheet){
                sheet.resetFormulas();
            });
        },

        resetValidations: function() {
            this._sheets.forEach(function(sheet){
                sheet.resetValidations();
            });
        },

        refresh: function(reason) {
            if (reason.recalc) {
                this.resetFormulas();
                this.resetValidations();
                this._sheet.recalc(this._context);
                this._sheet.revalidate(this._validationContext);
            }
        },

        activeSheet: function(sheet) {
            if (sheet === undefined) {
                return this._sheet;
            }

            if (!this.sheetByName(sheet.name())) {
                return;
            }

            this._sheet = sheet;

            //TODO: better way to get all reasons?
            sheet.triggerChange(kendo.spreadsheet.ALL_REASONS);
        },

        moveSheetToIndex: function(sheet, toIndex) {
            var fromIndex = this.sheetIndex(sheet);
            var sheets = this._sheets;

            if (fromIndex === -1) {
                return;
            }

            this._sheetsSearchCache = {};

            sheets.splice(toIndex, 0, sheets.splice(fromIndex, 1)[0]);

            this.trigger("change", { sheetSelection: true });
        },

        insertSheet: function(options) {
            options = options || {};
            var that = this;
            var insertIndex = typeof options.index === "number" ? options.index : that._sheets.length;
            var sheetName;
            var sheets = that._sheets;

            var getUniqueSheetName = function(sheetNameSuffix) {
                sheetNameSuffix = sheetNameSuffix ? sheetNameSuffix : 1;

                var name = "Sheet" + sheetNameSuffix;

                if (!that.sheetByName(name)) {
                    return name;
                }

                return getUniqueSheetName(sheetNameSuffix + 1);
            };

            if (options.name && that.sheetByName(options.name)) {
                return;
            }

            this._sheetsSearchCache = {};

            sheetName = options.name || getUniqueSheetName();

            var sheet = new kendo.spreadsheet.Sheet(
                options.rows || this.options.rows,
                options.columns || this.options.columns,
                options.rowHeight || this.options.rowHeight,
                options.columnWidth || this.options.columnWidth,
                options.headerHeight || this.options.headerHeight,
                options.headerWidth || this.options.headerWidth
            );

            sheet._workbook = this;

            sheet.name(sheetName);

            sheet.bind("change", this._sheetChange.bind(this));

            sheets.splice(insertIndex, 0, sheet);

            if (options.data) {
                sheet.fromJSON(options.data);
            }

            if (options.dataSource) {
                sheet.setDataSource(options.dataSource);
            }

            this.trigger("change", { sheetSelection: true });

            return sheet;
        },

        sheets: function() {
            return this._sheets.slice();
        },

        sheetByName: function (sheetName) {
            return this._sheets[this.sheetIndex(sheetName)];
        },

        sheetByIndex: function(index) {
            return this._sheets[index];
        },

        sheetIndex: function(sheet) {
            var sheets = this._sheets;
            var sheetName = (typeof sheet == "string" ? sheet : sheet.name()).toLowerCase();
            var idx = this._sheetsSearchCache[sheetName];

            if (idx >= 0) {
                return idx;
            }

            for(idx = 0; idx < sheets.length; idx++) {
                var name = sheets[idx].name().toLowerCase();
                this._sheetsSearchCache[name] = idx;

                if (name === sheetName) {
                    return idx;
                }
            }

            return -1;
        },

        renameSheet: function(sheet, newSheetName) {
            var oldSheetName = sheet.name();

            if (!newSheetName ||
                oldSheetName === newSheetName) {
                return;
            }

            sheet = this.sheetByName(oldSheetName);

            if (!sheet) {
                return;
            }

            this._sheetsSearchCache = {};

            // update references
            this._sheets.forEach(function(sheet){
                sheet._forFormulas(function(formula){
                    formula.renameSheet(oldSheetName, newSheetName);
                });
            });

            sheet.name(newSheetName);

            this.trigger("change", { sheetSelection: true });

            return sheet;
        },

        removeSheet: function(sheet) {
            var that = this;
            var sheets = that._sheets;
            var name = sheet.name();
            var index = that.sheetIndex(sheet);

            if (sheets.length === 1) {
                return;
            }

            this._sheetsSearchCache = {};

            if (index > -1) {
                sheet.unbind();

                sheets.splice(index, 1);

                if (that.activeSheet().name() === name) {
                    var newSheet = sheets[index === sheets.length ? index-1 : index];
                    that.activeSheet(newSheet);
                } else {
                    this.trigger("change", { recalc: true,  sheetSelection: true });
                }
            }
        },

        fromJSON: function(json) {
            if (json.sheets) {
                for (var idx = 0; idx < json.sheets.length; idx++) {
                    var sheet = this.sheetByIndex(idx);

                    if (!sheet) {
                        sheet = this.insertSheet();
                    }

                    sheet.fromJSON(json.sheets[idx]);

                    var dataSource = json.sheets[idx].dataSource;

                    if (dataSource) {
                        sheet.setDataSource(dataSource);
                    }
                }
            }

            if (json.activeSheet) {
                this.activeSheet(this.sheetByName(json.activeSheet));
            }
        },

        toJSON: function() {
            this.resetFormulas();
            this.resetValidations();
            return {
                activeSheet: this.activeSheet().name(),
                sheets: this._sheets.map(function(sheet) {
                    sheet.recalc(this._context);
                    return sheet.toJSON();
                }, this)
            };
        },

        saveAsExcel: function(options) {
            options = $.extend({}, this.options.excel, options);
            var data = this.toJSON();

            if (!this.trigger("excelExport", { workbook: data })) {
                var workbook = new kendo.ooxml.Workbook(data);

                kendo.saveAs({
                    dataURI: workbook.toDataURL(),
                    fileName: data.fileName || options.fileName,
                    proxyURL: options.proxyURL,
                    forceProxy: options.forceProxy
                });
            }
        }
    });

    kendo.spreadsheet.Workbook = Workbook;

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
