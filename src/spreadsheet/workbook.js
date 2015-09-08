(function(f, define){
    define([ "../kendo.core", "./runtime", "./references" ], f);
})(function(){

(function(kendo) {

    var Workbook = kendo.Observable.extend({
        init: function(options) {

            kendo.Observable.fn.init.call(this);

            this.options = options;

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

            if (this.options.sheets) {
                this.fromJSON(this.options.sheets);
            }
        },

        clipboard: function() {
            if(!this._clipboard) {
                 this._clipboard = new kendo.spreadsheet.Clipboard(this);
            }
            return this._clipboard;
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

        execute: function(command) {
            command.range(this._sheet.selection());
            command.exec();
            this.undoRedoStack.push(command);
        },

        resetFormulas: function() {
            this._sheets.forEach(function(sheet){
                sheet.resetFormulas();
            });
        },

        refresh: function(reason) {
            if (reason.recalc) {
                this.resetFormulas();
                this._sheet.recalc(this._context);
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
            var sheets = this._sheets;
            var idx = this._sheetsSearchCache[sheetName];

            if (idx >= 0) {
                return sheets[idx];
            }

            for (idx = 0; idx < sheets.length; idx++) {
                var sheet = sheets[idx];
                var name = sheet.name();
                this._sheetsSearchCache[name] = idx;

                if (name === sheetName) {
                    return sheet;
                }
            }
        },

        sheetByIndex: function(index) {
           return this._sheets[index];
        },

        sheetIndex: function(sheet) {
            var sheets = this._sheets;
            var sheetName = sheet.name();
            var idx = this._sheetsSearchCache[sheetName];

            if (idx >= 0) {
                return idx;
            }

            for(idx = 0; idx < sheets.length; idx++) {
                var name = sheets[idx].name();
                this._sheetsSearchCache[name] = idx;

                if (name === sheetName) {
                    return idx;
                }
            }

            return -1;
        },

        renameSheet: function(sheet, newSheetName) {
            var that = this;
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

        fromJSON: function(sheets) {
            var idx;

            for (idx = 0; idx < sheets.length; idx++) {
                var sheet = this.sheetByIndex(idx);

                if (!sheet) {
                    sheet = this.insertSheet();
                }

                sheet.fromJSON(sheets[idx]);
            }
        },

        toJSON: function() {
            this.resetFormulas();
            return {
                sheets: this._sheets.map(function(sheet) {
                    sheet.recalc(this._context);
                    return sheet.toJSON();
                }, this)
            };
        }
    });

    kendo.spreadsheet.Workbook = Workbook;

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
