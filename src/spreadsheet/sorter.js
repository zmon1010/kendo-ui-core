(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Sorter(grid, lists) {
        this.grid = grid;
        this.lists = lists;
    }

    Sorter.prototype.indices = function(rangeRef, list) {
        return list.sortedIndices(this.grid.cellRefIndex(rangeRef.topLeft), this.grid.cellRefIndex(rangeRef.bottomRight));
    }

    Sorter.prototype.sortBy = function(area, list) {
        var sortedIndices = this.indices(area, list);
        var lists = this.lists;
        var length = lists.length;
        var ends = [];
        var lastEnd = 0;

        for (var i = 0; i < length; i++) {
            ends[i] = lists[i].lastRangeStart();
            lastEnd = Math.max(lastEnd, ends[i]);
        }

        this.grid.forEachColumn(area, lastEnd, function(start, end) {
            for (var i = 0; i < length; i++) {
                if (start < ends[i]) {
                    lists[i].sort(start, end, sortedIndices);
                }
            }
        });
    }

    kendo.spreadsheet.Sorter = Sorter;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
