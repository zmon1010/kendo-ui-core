(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var Sorter = kendo.Class.extend({
        init: function(grid, lists) {
            this._grid = grid;
            this._lists = lists;
        },

        indices: function(rangeRef, list) {
            return list.sortedIndices(this._grid.cellRefIndex(rangeRef.topLeft),
                this._grid.cellRefIndex(rangeRef.bottomRight));
        },

        sortBy: function(ref, list) {
            var sortedIndices = this.indices(ref, list);
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

    kendo.spreadsheet.Sorter = Sorter;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
