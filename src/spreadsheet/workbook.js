(function(f, define){
    define([ "../kendo.core", "./runtime", "./references" ], f);
})(function(){

(function(kendo) {
    var Sheet = kendo.spreadsheet.Sheet;
    var Range = kendo.spreadsheet.Range;

    var Workbook = kendo.Observable.extend({
        init: function(options) {

            kendo.Observable.fn.init.call(this);

            this.options = options;

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

            this.undoRedoStack = new kendo.util.UndoRedoStack();
            this.undoRedoStack.bind(["undo", "redo"], this._onUndoRedo.bind(this));

            this._context = new kendo.spreadsheet.FormulaContext(this);
        },

        events: [
            "change"
        ],

        _sheetChange: function(e) {
            this.trigger("change", e);
        },

        _editableValueForRef: function(ref) {
            return new kendo.spreadsheet.Range(ref, this._sheet)._editableValue();
        },

        _onUndoRedo: function(e) {
            e.command.range().select();
        },

        execute: function(command) {
            command.range(this._sheet.selection());
            command.exec();
            this.undoRedoStack.push(command);
        },

        refresh: function(reason) {
            if (reason.recalc) {
                this._sheet.recalc(this._context);
            }
        },

        activeSheet: function(sheet) {
            if (sheet === undefined) {
                return this._sheet;
            }

            if (!this.getSheetByName(sheet.name())) {
                return;
            }

            this._sheet = sheet;
            this._view.sheet(sheet);
            sheet.triggerChange(ALL_REASONS);
            return;
        },

        insertSheet: function(options) {
            options = options || {};
            var spreadsheet = this;
            var insertIndex = typeof options.index === "number" ? options.index : spreadsheet._sheetsByIndex.length;
            var sheetName;
            var sheets = spreadsheet._sheets;
            var sheetsByIndex = spreadsheet._sheetsByIndex;
            var getUniqueSheetName = function(sheetNameSuffix) {
                sheetNameSuffix = sheetNameSuffix ? sheetNameSuffix : 1;

                var name = "Sheet" + sheetNameSuffix;

                if (!sheets[name]) {
                    return name;
                }

                return getUniqueSheetName(sheetNameSuffix + 1);
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

            sheet.bind("change", this._sheetChange.bind(this));

            sheets[sheetName] = sheet;

            sheetsByIndex.splice(insertIndex, 0, sheetName);

            return sheet;
        },

        getSheets: function() {
            var idx;
            var sheets = [];

            for (idx = 0; idx < this._sheetsByIndex.length; idx++) {
                sheets.push(this.getSheetByName(this._sheetsByIndex[idx]));
            }

            return sheets;
        },

        getSheetByName: function (sheetName) {
            return this._sheets[sheetName];
        },

        renameSheet: function(sheet, newSheetName) {
            var that = this;
            var sheets = that._sheets;
            var sheetsByIndex = that._sheetsByIndex;
            var oldSheetName = sheet.name();

            if (!newSheetName ||
                oldSheetName === newSheetName) {
                return;
            }

            sheet = this.getSheetByName(oldSheetName);

            if (!sheet) {
                return;
            }

            sheet.name(newSheetName);

            if (sheets.hasOwnProperty(oldSheetName)) {
                sheets[newSheetName] = sheets[oldSheetName];
                delete sheets[oldSheetName];
            }

            sheetsByIndex[sheetsByIndex.indexOf(oldSheetName)] = newSheetName;

            return sheet;
        },

        removeSheet: function(sheet) {
            var that = this;
            var sheets = that._sheets;
            var sheetByIndex = that._sheetsByIndex;
            var name = sheet.name();
            var index = sheetByIndex.indexOf(name);

            if (sheetByIndex.length === 1) {
                return;
            }

            if (index > -1 && sheets.hasOwnProperty(name)) {
                sheet.unbind();

                sheetByIndex.splice(index, 1);
                delete sheets[name];

                if (that.activeSheet().name() === name) {
                    var newSheet = sheets[sheetByIndex[index === sheetByIndex.length ? index-1 : index]];
                    that.activeSheet(newSheet);
                } else {
                    this.refresh({recalc: true});
                }
            }
        },
    });

    kendo.spreadsheet.Workbook = Workbook;

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
