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
            var sheet = this._sheet;
            var mergedCells = sheet._mergedCells;

            this._ref = this._ref.map(function(ref) {
                if (ref instanceof kendo.spreadsheet.CellRef) {
                    return ref;
                }

                var currentRef = ref.toRangeRef().union(mergedCells, function(ref) {
                    mergedCells.splice(mergedCells.indexOf(ref), 1);
                });

                var range = new Range(currentRef, sheet);
                var value = range.value();
                var background = range.background();

                range.value(null);
                range.background(null);

                var topLeft = new Range(currentRef.collapse(), sheet);

                topLeft.value(value);
                topLeft.background(background);

                mergedCells.push(currentRef);
                return currentRef;
            });

            return this;
        },

        unmerge: function() {
            var mergedCells = this._sheet._mergedCells;

            this._ref.forEach(function(ref) {
                this._intersectingMergedRefs(ref).forEach(function(mergedRef) {
                    mergedCells.splice(mergedCells.indexOf(mergedRef), 1);
                });
            }.bind(this));

            return this;
        },

        _intersectingMergedRefs: function(ref) {
            return this._sheet._mergedCells.filter(function(mergedRef) {
                return mergedRef.intersects(ref);
            });
        },

        select: function() {
            this._sheet.select(this._ref);
            return this;
        }
    });

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
