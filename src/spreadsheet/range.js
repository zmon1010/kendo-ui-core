(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var Range = kendo.Class.extend({
        init: function(rangeRef, sheet) {
            this._sheet = sheet;
            this._ref = rangeRef;
        },
        _property: function(list, value) {
            var ref = this._ref;
            if (value !== undefined) {
                for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col; ci++) {
                    var start = this._sheet._grid.index(ref.topLeft.row, ci);
                    var end = this._sheet._grid.index(ref.bottomRight.row, ci);

                    list.value(start, end, value);
                }

                return this;
            } else {
                var index = this._sheet._grid.cellRefIndex(ref.topLeft);
                return list.value(index, index);
            }
        },
        value: function(value) {
            return this._property(this._sheet._values, value);
        },
        background: function(value) {
            return this._property(this._sheet._backgrounds, value);
        },
        formula: function(value) {
            return this._property(this._sheet._formulas, value);
        },
        merge: function() {
            var mergedCells = this._sheet._mergedCells;

            var intersecting = mergedCells.filter(function(ref) {
                return ref.intersects(this._ref);
            }, this);

            var topLeftRow = this._ref.topLeft.row;
            var topLeftCol = this._ref.topLeft.col;
            var bottomRightRow = this._ref.bottomRight.row;
            var bottomRightCol = this._ref.bottomRight.col;

            intersecting.forEach(function(ref) {
                if (ref.topLeft.row < topLeftRow) {
                    topLeftRow = ref.topLeft.row;
                }

                if (ref.topLeft.col < topLeftCol) {
                    topLeftCol = ref.topLeft.col;
                }

                if (ref.bottomRight.row > bottomRightRow) {
                    bottomRightRow = ref.bottomRight.row;
                }

                if (ref.bottomRight.col > bottomRightCol) {
                    bottomRightCol = ref.bottomRight.col;
                }

                mergedCells.splice(mergedCells.indexOf(ref), 1);
            });

            this._ref = new RangeRef(
                new CellRef(topLeftRow, topLeftCol),
                new CellRef(bottomRightRow, bottomRightCol)
            );

            mergedCells.push(this._ref);

            var value = this.value();

            this.value(null);

            var topLeft = new Range(this._ref.collapse(), this._sheet);

            topLeft.value(value);

            return this;
        }
    });

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
