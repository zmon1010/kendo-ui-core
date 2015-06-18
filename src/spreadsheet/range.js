(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var Range = kendo.Class.extend({
        init: function(ref, sheet) {
            this._sheet = sheet;
            this._ref = ref;
        },
        _property: function(list, value) {
            if (value !== undefined) {
                this._ref.forEach(function(ref) {
                    ref = ref.toRangeRef();

                    for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col; ci++) {
                        var start = this._sheet._grid.index(ref.topLeft.row, ci);
                        var end = this._sheet._grid.index(ref.bottomRight.row, ci);

                        list.value(start, end, value);
                    }
                }.bind(this));

                return this;
            } else {
                var index = this._sheet._grid.cellRefIndex(this._ref.toRangeRef().topLeft);
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
            var refs = [];

            this._ref.forEach(function(ref) {
                if (ref instanceof kendo.spreadsheet.CellRef) {
                    refs.push(ref);
                    return;
                }

                currentRef = ref.toRangeRef();
                var intersecting = mergedCells.filter(function(ref) {
                    return ref.intersects(currentRef);
                }, this);

                var topLeftRow = currentRef.topLeft.row;
                var topLeftCol = currentRef.topLeft.col;
                var bottomRightRow = currentRef.bottomRight.row;
                var bottomRightCol = currentRef.bottomRight.col;

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

                currentRef = new RangeRef(
                    new CellRef(topLeftRow, topLeftCol),
                    new CellRef(bottomRightRow, bottomRightCol)
                );

                refs.push(currentRef);
                mergedCells.push(currentRef);
            }.bind(this));

            this._ref = refs.length === 1 ? refs[0] : new kendo.spreadsheet.UnionRef(refs);

            var value = this.value();
            var background = this.background();

            this.value(null);
            this.background(null);

            var topLeft = new Range(this._ref.toRangeRef().collapse(), this._sheet);

            topLeft.value(value);
            topLeft.background(background);

            return this;
        }
    });

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
