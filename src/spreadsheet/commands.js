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
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var Command = kendo.spreadsheet.Command = kendo.Class.extend({
        init: function(options) {
            this.options = options;
            this._workbook = options.workbook;
            this._property = options && options.property;
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

    kendo.spreadsheet.ClearContentCommand = Command.extend({
        exec: function() {
            this.getState();
            this.range().clearContent();
        }
    });

    kendo.spreadsheet.EditCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "input";
            PropertyChangeCommand.fn.init.call(this, options);
        },
        rejectState: function(validationState) {
            this.undo();

            return {
                title: validationState.title,
                body: validationState.message,
                reason: "error"
            };
        },
        exec: function() {
            var range = this.range();
            var value = this._value;
            this.getState();
            try {
                range.input(value);

                var validationState = range._getValidationState();
                if (validationState) {
                    return this.rejectState(validationState);
                }
            } catch(ex1) {
                if (ex1 instanceof kendo.spreadsheet.calc.ParseError) {
                    // it's a formula. maybe a closing paren fixes it?
                    try {
                        range.input(value + ")");

                        var validationState = range._getValidationState();
                        if (validationState) {
                            return this.rejectState(validationState);
                        }
                    } catch(ex2) {
                        if (ex2 instanceof kendo.spreadsheet.calc.ParseError) {
                            range.input("'" + value);

                            return {
                                title : "Error in formula",
                                body  : ex1+"",
                                reason: "error"
                            };
                        }
                    }
                } else {
                    throw ex1;
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

    kendo.spreadsheet.FreezePanesCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._type = options.value;
        },
        exec: function() {
            this.getState();
            this._topLeft = this.range().topLeft();
            this[this._type]();
        },
        getState: function() {
            this._state = this.range().sheet().getState();
        },
        undo: function() {
            this.range().sheet().setState(this._state);
        },
        panes: function() {
            var topLeft = this._topLeft;
            var sheet = this.range().sheet();

            sheet.frozenColumns(topLeft.col).frozenRows(topLeft.row);
        },
        rows: function() {
            var topLeft = this._topLeft;
            var sheet = this.range().sheet();

            sheet.frozenRows(topLeft.row);
        },
        columns: function() {
            var topLeft = this._topLeft;
            var sheet = this.range().sheet();

            sheet.frozenColumns(topLeft.col);
        },
        unfreeze: function() {
            var sheet = this.range().sheet();
            sheet.frozenRows(0).frozenColumns(0);
        }
    });

    kendo.spreadsheet.PasteCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._clipboard = this._workbook.clipboard();
        },
        getState: function() {
            this._range = this._workbook.activeSheet().range(this._clipboard.pasteRef());
            this._state = this._range.getState();
        },
        exec: function() {
            var status = this._clipboard.canPaste();
            this._clipboard.menuInvoked = true;
            if(!status.canPaste) {
                if(status.menuInvoked) {
                    return { reason: "useKeyboard" };
                }
                if(status.pasteOnMerged) {
                    return { reason: "modifyMerged" };
                }
                return;
            }
            this.getState();
            this._clipboard.paste();

            var sheet = this._workbook.activeSheet();
            var range = sheet.range(this._clipboard.pasteRef());
            range.forEachRow(function(row) {
                var maxHeight = row.sheet().rowHeight(row.topLeft().row);
                row.forEachCell(function(row, col, cell) {
                    var width = sheet.columnWidth(col);
                    maxHeight = Math.max(maxHeight, kendo.spreadsheet.util.getTextHeight(cell.value, width, cell.fontSize, cell.wrap));
                });
                sheet.rowHeight(row.topLeft().row, maxHeight);
            });
        }
    });

    kendo.spreadsheet.ToolbarPasteCommand = Command.extend({
        exec: function() {
            if(kendo.support.clipboard.paste) {
                this._workbook._view.clipboard.focus().select();

                //reason : focusclipbord
                document.execCommand('paste');
            } else {
                return { reason: "useKeyboard" };
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
            var status = this._clipboard.canCopy();
            this._clipboard.menuInvoked = true;
            if(!status.canCopy) {
                if(status.menuInvoked) {
                    return { reason: "useKeyboard" };
                } else if(status.multiSelection) {
                    return { reason: "unsupportedSelection" };
                }
                return;
            }
            this._clipboard.copy();
        }
    });

    kendo.spreadsheet.ToolbarCopyCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._clipboard = options.workbook.clipboard();
        },
        undo: $.noop,
        exec: function() {
            if(kendo.support.clipboard.copy) {
                var clipboard = this._workbook._view.clipboard;
                var textarea = document.createElement('textarea');
                $(textarea).addClass("k-spreadsheet-clipboard").val(clipboard.html()).appendTo(document.body).focus().select();
                document.execCommand('copy');
                clipboard.trigger("copy");
                $(textarea).remove();
            } else {
                return { reason: "useKeyboard" };
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

    kendo.spreadsheet.AutoFillCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
        },
        origin: function(origin) {
            this._origin = origin;
        },
        exec: function() {
            this.getState();
            this._range.fillFrom(this._origin);
        }
    });

    kendo.spreadsheet.ToolbarCutCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._clipboard = options.workbook.clipboard();
        },
        exec: function() {
            if(kendo.support.clipboard.copy) {
                var clipboard = this._workbook._view.clipboard;
                var textarea = document.createElement('textarea');
                $(textarea).val(clipboard.html()).appendTo(document.body).focus().select();
                document.execCommand('copy');
                clipboard.trigger("cut");
                $(textarea).remove();
            } else {
                return { reason: "useKeyboard" };
            }
        }
    });

    kendo.spreadsheet.FilterCommand = Command.extend({
        undo: function() {
            this.range().filter(this._state);
        },
        exec: function() {
            var range = this.range();

            this._state = range.hasFilter();

            if (range.hasFilter()) {
                range.filter(false);
            } else if (!range.intersectingMerged().length) {
                range.filter(true);
            } else {
               return { reason: "error", type: "filterRangeContainingMerges" };
            }
        }
    });

    kendo.spreadsheet.SortCommand = Command.extend({
        undo: function() {
            var sheet = this.range().sheet();
            sheet.setState(this._state);
        },
        exec: function() {
            var range = this.range();
            var sheet = range.sheet();
            var activeCell = sheet.activeCell();
            var col = activeCell.topLeft.col;
            var ascending = this.options.asc;

            this._state = sheet.getState();

            if (this.options.sheet) {
                this.expandRange().sort({ column: col, ascending: ascending });
            } else {
                range.sort({ column: col, ascending: ascending });
            }
        },
        expandRange: function() {
            var sheet = this.range().sheet();
            return new kendo.spreadsheet.Range(sheet._sheetRef, sheet);
        }
    });

    var ApplyFilterCommand = kendo.spreadsheet.ApplyFilterCommand = Command.extend({
        column: function() {
            return this.options.column || 0;
        },
        undo: function() {
            var sheet = this.range().sheet();

            sheet.clearFilter(this.column());

            if (this._state.length) {
                this.range().filter(this._state);
            }
        },
        getState: function() {
            var sheet = this.range().sheet();
            var currentFilter = sheet.filter();

            if (currentFilter) {
                this._state = currentFilter.columns.filter(function(c) {
                    return c.index == this.column();
                }.bind(this));
            }
        },
        exec: function() {
            var range = this.range();
            var column = this.column();
            var filter;

            if (this.options.valueFilter) {
                filter = new kendo.spreadsheet.ValueFilter(this.options.valueFilter);
            } else if (this.options.customFilter) {
                filter = new kendo.spreadsheet.CustomFilter(this.options.customFilter);
            }

            this.getState();

            range.clearFilter(column);

            range.filter({
                column: column,
                filter: filter
            });
        }
    });

    kendo.spreadsheet.ClearFilterCommand = ApplyFilterCommand.extend({
        exec: function() {
            var range = this.range();
            var column = this.column();

            this.getState();
            range.clearFilter(column);
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

            if (!sheet.axisManager().canAddRow()) {
                return { reason: "error", type: "shiftingNonblankCells" };
            }

            this._state = sheet.getState();

            if (this._value === "above") {
                sheet.axisManager().addRowAbove();
            } else {
                sheet.axisManager().addRowBelow();
            }
        }
    });

    kendo.spreadsheet.EditValidationCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._value = options.value;
        },
        exec: function() {
            this.range().validation(this._value);
        }
    });

    kendo.spreadsheet.SaveAsCommand = Command.extend({
        exec: function() {
            this.options.workbook.saveAsExcel({
                fileName: this.options.fileName
            });
        }
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
