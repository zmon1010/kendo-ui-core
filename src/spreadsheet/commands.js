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
    var Command = kendo.spreadsheet.Command = kendo.Class.extend({
        init: function(options) {
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
            this.range().sheet().batch(function() {
                this._forEachCell(function(row, col, cell) {
                    var property = this._property === "_editableValue" ? "value" : this._property;
                    var sheet = this._range.sheet();
                    var value = this._state[row + "," + col];

                    sheet.range(row, col)[property](value);
                });
            }.bind(this), {});
        },
        getState: function() {
            this._forEachCell(function(row, col, cell) {
                var property = this._property === "_editableValue" ? "value" : this._property;
                this._state[row + "," + col] = cell[property] || null;
            });
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

    var EditCommand = kendo.spreadsheet.EditCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "_editableValue";
            PropertyChangeCommand.fn.init.call(this, options);
        }
    });

    var AdjustDecimalsCommand = kendo.spreadsheet.AdjustDecimalsCommand = Command.extend({
        init: function(options) {
            this._decimals = options.decimals;
            options.property = "format";
            Command.fn.init.call(this, options);
        },
        exec: function() {
            var sheet = this.range().sheet();
            var decimals = this._decimals;

            this.getState();

            sheet.batch(function() {
                this._forEachCell(function(row, col, cell) {
                    var format = kendo.spreadsheet.formatting.adjustDecimals(cell.format, decimals);
                    sheet.range(row, col).format(format);
                });
            }.bind(this));
        }
    });

    var BorderChangeCommand = kendo.spreadsheet.BorderChangeCommand = Command.extend({
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
        undo: function() {
            this.range().sheet().batch(function() {
                this._forEachCell(function(row, col, cell) {
                    var sheet = this._range.sheet();
                    var value = this._state[row + "," + col];

                    sheet.range(row, col)
                        .borderTop(value.borderTop)
                        .borderLeft(value.borderLeft)
                        .borderRight(value.borderRight)
                        .borderBottom(value.borderBottom);
                });
            }.bind(this), {});
        },
        getState: function() {
            var range = this.range();
            var ref = range._ref;

            this._forEachCell(function(row, col, cell) {
                this._state[row + "," + col] = {
                    borderTop: cell.borderTop || null,
                    borderLeft: cell.borderLeft || null,
                    borderRight: cell.borderRight || null,
                    borderBottom: cell.borderBottom || null
                };
            });
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

    var MergeCellCommand = kendo.spreadsheet.MergeCellCommand = Command.extend({
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
            this._state.cells = {};
            this._state.mergedCells = this.range().intersectingMerged();

            this._forEachCell(function(row, col, cell) {
                var property = this._property === "_editableValue" ? "value" : this._property;
                this._state.cells[row + "," + col] = cell;
            });
        },
        undo: function() {
            if (this._type !== "unmerge") {
                this.range().unmerge();
                this.activate(this.range().topLeft());
            }

            this.range().sheet().batch(function() {
                var sheet = this._range.sheet();
                var mergedCells = this._state.mergedCells;

                this._forEachCell(function(row, col, cell) {
                    var properties = this._state.cells[row + "," + col];

                    for (var property in properties) {
                        sheet.range(row, col)[property](properties[property]);
                    }
                });

                for (var i = 0; i < mergedCells.length; i++) {
                    sheet.range(mergedCells[i]).merge();
                }
            }.bind(this), {});
        },
        all: function() {
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

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
