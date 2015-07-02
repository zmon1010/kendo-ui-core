(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var Sorter = kendo.Class.extend({
        init: function(grid, lists) {
            this._grid = grid;
            this._lists = lists;
        },

        indices: function(rangeRef, list, ascending, indices) {
            var comparer = Sorter.ascendingComparer;

            if (ascending === false) {
                comparer = Sorter.descendingComparer;
            }

            return list.sortedIndices(this._grid.cellRefIndex(rangeRef.topLeft),
                this._grid.cellRefIndex(rangeRef.bottomRight), comparer, indices);
        },

        sortBy: function(ref, list, ascending, indices) {
            var sortedIndices = this.indices(ref, list, ascending, indices);
            var lists = this._lists;
            var length = lists.length;
            var ends = [];
            var lastEnd = 0;

            for (var i = 0; i < length; i++) {
                ends[i] = lists[i].lastRangeStart();
                lastEnd = Math.max(lastEnd, ends[i]);
            }

            this._grid.forEachColumn(ref, lastEnd, function(start, end) {
                for (var i = 0; i < length; i++) {
                    if (start < ends[i]) {
                        lists[i].sort(start, end, sortedIndices);
                    }
                }
            });

            return sortedIndices;
        }
    });

    Sorter.ascendingComparer = function(a, b) {
        if (a === null && b === null) {
            return 0;
        }

        if (a === null) {
            return 1;
        }

        if (b === null) {
            return -1;
        }

        var typeA = typeof a;
        var typeB = typeof b;

        if (typeA === "number") {
            if (typeB === "number") {
                return a - b;
            } else {
               return -1;
            }
        }

        if (typeA === "string") {
            switch (typeB) {
                case "number":
                    return 1;
                case "string":
                    return a.localeCompare(b);
                default:
                    return -1;
            }
        }

        if (typeA === "boolean") {
            switch (typeB) {
                case "number":
                    return 1;
                case "string":
                    return 1;
                case "boolean":
                    return a - b;
                default:
                    return -1;
            }
        }

        if (a instanceof kendo.spreadsheet.calc.runtime.CalcError) {
            if (b instanceof kendo.spreadsheet.calc.runtime.CalcError) {
                return 0;
            } else {
                return 1;
            }
        }

        throw new Error("Cannot compare " + a + " and " + b);
    };

    Sorter.descendingComparer = function(a, b) {
        if (a === null && b === null) {
            return 0;
        }

        if (a === null) {
            return 1;
        }

        if (b === null) {
            return -1;
        }

        return Sorter.ascendingComparer(b, a);
    };

    kendo.spreadsheet.Sorter = Sorter;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
