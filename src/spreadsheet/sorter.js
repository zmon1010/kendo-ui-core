(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var Sorter = kendo.Class.extend({
        init: function(grid, lists) {
            this._grid = grid;
            this._lists = lists;
        },

        indices: function(rangeRef, list, ascending) {
            var comparer = Sorter.ascendingComparer;

            if (ascending === false) {
                comparer = Sorter.descendingComparer;
            }

            return list.sortedIndices(this._grid.cellRefIndex(rangeRef.topLeft),
                this._grid.cellRefIndex(rangeRef.bottomRight), comparer);
        },

        sortBy: function(ref, list, ascending) {
            var sortedIndices = this.indices(ref, list, ascending);
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
        }
    });

    Sorter.ascendingComparer = function(a, b) {
        return a.value - b.value;
    };

    Sorter.descendingComparer = function(a, b) {
        return Sorter.ascendingComparer(b, a);
    }

    kendo.spreadsheet.Sorter = Sorter;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
