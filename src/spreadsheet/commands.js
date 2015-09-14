(function(f, define){
    define([
        "../kendo.core",
        "../kendo.binder",
        "../kendo.window",
        "../kendo.list",
        "../kendo.tabstrip"
    ], f);
})(function(){

(function(kendo) {
    var $ = kendo.jQuery;

    var Command = kendo.spreadsheet.Command = kendo.Class.extend({
        init: function(options) {
            this.options = options;
            this._property = options.property;
            this._state = {};
        },
        range: function(range) {
            if (range !== undefined) {
                this._range = range;
            }

            return this._range;
        },
        redo: function() {
            this.exec();
        },
        undo: function() {
            this.range().setState(this._state);
        },
        getState: function() {
            this._state = this.range().getState(this._property);
        },
        _forEachCell: function(callback) {
            var range = this.range();
            var ref = range._ref;

            ref.forEach(function(ref) {
                range.sheet().forEach(ref.toRangeRef(), callback.bind(this));
            }.bind(this));
        }
    });

    var PropertyChangeCommand = kendo.spreadsheet.PropertyChangeCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._value = options.value;
        },
        exec: function() {
            var range = this.range();
            this.getState();
            range[this._property](this._value);
        }
    });

    kendo.spreadsheet.EditCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "input";
            PropertyChangeCommand.fn.init.call(this, options);
        },
        exec: function() {
            try {
                return PropertyChangeCommand.fn.exec.apply(this, arguments);
            } catch(ex) {
                if (ex instanceof kendo.spreadsheet.calc.ParseError) {
                    // XXX: error handling.  We should ask the user
                    // whether to accept the formula as text (prepend
                    // '), or re-edit.  ex.pos+1 will be the index of
                    // the character where the error occurred.
                    window.alert(ex);
                    // store as string for now
                    this.range().input("'" + this._value);
                } else {
                    throw ex;
                }
            }
        }
    });

    kendo.spreadsheet.TextWrapCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "wrap";
            PropertyChangeCommand.fn.init.call(this, options);

            this._value = options.value;
        },
        getState: function() {
            var rowHeight = {};
            this.range().forEachRow(function(range) {
                var index = range.topLeft().row;

                rowHeight[index] = range.sheet().rowHeight(index);
            });

            this._state = this.range().getState(this._property);
            this._rowHeight = rowHeight;
        },
        undo: function() {
            var sheet = this.range().sheet();
            var rowHeight = this._rowHeight;

            this.range().setState(this._state);

            for (var row in rowHeight) {
                sheet.rowHeight(row, rowHeight[row]);
            }
        }
    });

    kendo.spreadsheet.AdjustDecimalsCommand = Command.extend({
        init: function(options) {
            this._decimals = options.decimals;
            options.property = "format";
            Command.fn.init.call(this, options);
        },
        exec: function() {
            var sheet = this.range().sheet();
            var decimals = this._decimals;
            var formatting = kendo.spreadsheet.formatting;

            this.getState();

            sheet.batch(function() {
                this.range().forEachCell(function(row, col, cell) {
                    var format = cell.format;

                    if (format || decimals > 0) {
                        format = formatting.adjustDecimals(format || "#", decimals);
                        sheet.range(row, col).format(format);
                    }
                });
            }.bind(this));
        }
    });

    kendo.spreadsheet.BorderChangeCommand = Command.extend({
        init: function(options) {
            options.property = "border";
            Command.fn.init.call(this, options);
            this._type = options.border;
            this._style = options.style;
        },
        exec: function() {
            this.getState();
            this[this._type](this._style);
        },
        noBorders: function() {
            var range = this.range();
            range.sheet().batch(function() {
                range.borderLeft(null).borderTop(null).borderRight(null).borderBottom(null);
            }.bind(this), {});
        },
        allBorders: function(style) {
            var range = this.range();
            range.sheet().batch(function() {
                range.borderLeft(style).borderTop(style).borderRight(style).borderBottom(style);
            }.bind(this), {});
        },
        leftBorder: function(style) {
            this.range().leftColumn().borderLeft(style);
        },
        rightBorder: function(style) {
            this.range().rightColumn().borderRight(style);
        },
        topBorder: function(style) {
            this.range().topRow().borderTop(style);
        },
        bottomBorder: function(style) {
            this.range().bottomRow().borderBottom(style);
        },
        outsideBorders: function(style) {
            var range = this.range();
            range.sheet().batch(function() {
                range.leftColumn().borderLeft(style);
                range.topRow().borderTop(style);
                range.rightColumn().borderRight(style);
                range.bottomRow().borderBottom(style);
            }.bind(this), {});
        },
        insideBorders: function(style) {
            this.range().sheet().batch(function() {
                this.allBorders(style);
                this.outsideBorders(null);
            }.bind(this), {});
        },
        insideHorizontalBorders: function(style) {
            var range = this.range();

            range.sheet().batch(function() {
                range.borderBottom(style);
                range.bottomRow().borderBottom(null);
            }.bind(this), {});
        },
        insideVerticalBorders: function(style) {
            var range = this.range();

            range.sheet().batch(function() {
                range.borderRight(style);
                range.rightColumn().borderRight(null);
            }.bind(this), {});
        }
    });

    kendo.spreadsheet.MergeCellCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._type = options.value;
        },
        exec: function() {
            this.getState();
            this[this._type]();
        },
        activate: function(ref) {
            this.range().sheet().activeCell(ref);
        },
        getState: function() {
            this._state = this.range().getState();
        },
        undo: function() {
            if (this._type !== "unmerge") {
                this.range().unmerge();
                this.activate(this.range().topLeft());
            }
            this.range().setState(this._state);
        },
        cells: function() {
            var range = this.range();
            var ref = range._ref;

            range.merge();
            this.activate(ref);
        },
        horizontally: function() {
            var ref = this.range().topRow()._ref;

            this.range().forEachRow(function(range) {
                range.merge();
            });

            this.activate(ref);
        },
        vertically: function() {
            var ref = this.range().leftColumn()._ref;

            this.range().forEachColumn(function(range) {
                range.merge();
            });

            this.activate(ref);
        },
        unmerge: function() {
            var range = this.range();
            var ref = range._ref.topLeft;

            range.unmerge();
            this.activate(ref);
        }
    });

    kendo.spreadsheet.PasteCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._workbook = options.workbook;
            this._clipboard = this._workbook.clipboard();
        },
        getState: function() {
            this._range = this._workbook.activeSheet().range(this._clipboard.pasteRef());
            this._state = this._range.getState();
        },
        exec: function() {
            if(this._clipboard.canPaste()) {
                this.getState();
                this._clipboard.paste();
            }
        }
    });

    kendo.spreadsheet.CopyCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._clipboard = options.workbook.clipboard();
        },
        undo: $.noop,
        exec: function() {
            if(this._clipboard.canCopy()) {
                this._clipboard.copy();
            }
        }
    });

    kendo.spreadsheet.CutCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._clipboard = options.workbook.clipboard();
        },
        exec: function() {
            if(this._clipboard.canCopy()) {
                this.getState();
                this._clipboard.cut();
            }
        }
    });

    kendo.spreadsheet.FilterCommand = Command.extend({
        exec: function() {
            var range = this.range();

            if (range.hasFilter()) {
                range.filter(false);
            } else {
                range.filter(true);
            }
        }
    });

    kendo.spreadsheet.HideLineCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this.axis = options.axis;
        },

        undo: function() {
            var sheet = this.range().sheet();
            sheet.setAxisState(this._state);
        },

        exec: function() {
            var sheet = this.range().sheet();
            this._state = sheet.getAxisState();

            if (this.axis == "row") {
                sheet.axisManager().hideSelectedRows();
            } else {
                sheet.axisManager().hideSelectedColumns();
            }
        }
    });

    kendo.spreadsheet.UnHideLineCommand = kendo.spreadsheet.HideLineCommand.extend({
        exec: function() {
            var sheet = this.range().sheet();
            this._state = sheet.getAxisState();

            if (this.axis == "row") {
                sheet.axisManager().unhideSelectedRows();
            } else {
                sheet.axisManager().unhideSelectedColumns();
            }
        }
    });

    var DeleteCommand = kendo.spreadsheet.DeleteCommand = Command.extend({
        undo: function() {
            var sheet = this.range().sheet();
            sheet.setState(this._state);
        }
    });

    kendo.spreadsheet.DeleteRowCommand = DeleteCommand.extend({
        exec: function() {
            var sheet = this.range().sheet();
            this._state = sheet.getState();
            sheet.axisManager().deleteSelectedRows();
        }
    });

    kendo.spreadsheet.DeleteColumnCommand = DeleteCommand.extend({
        exec: function() {
            var sheet = this.range().sheet();
            this._state = sheet.getState();
            sheet.axisManager().deleteSelectedColumns();
        }
    });

    /*
     *
        addColumnLeft:         { type: "button", command: "AddColumnCommand",    value: "left",  iconClass: "add-column-left"  },
        addColumnRight:        { type: "button", command: "AddColumnCommand",    value: "right", iconClass: "add-column-right" },
        addRowBelow:           { type: "button", command: "AddRowCommand",       value: "below", iconClass: "add-row-below"    },
        addRowAbove:           { type: "button", command: "AddRowCommand",       value: "above", iconClass: "add-row-above"    },
    *
    */

    var AddCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._value = options.value;
        },
        undo: function() {
            var sheet = this.range().sheet();
            sheet.setState(this._state);
        }
    });

    kendo.spreadsheet.AddColumnCommand = AddCommand.extend({
        exec: function() {
            var sheet = this.range().sheet();
            this._state = sheet.getState();

            if (this._value === "left") {
                sheet.axisManager().addColumnLeft();
            } else {
                sheet.axisManager().addColumnRight();
            }
        }
    });

    kendo.spreadsheet.AddRowCommand = AddCommand.extend({
        exec: function() {
            var sheet = this.range().sheet();
            this._state = sheet.getState();

            if (this._value === "above") {
                sheet.axisManager().addRowAbove();
            } else {
                sheet.axisManager().addRowBelow();
            }
        }
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
