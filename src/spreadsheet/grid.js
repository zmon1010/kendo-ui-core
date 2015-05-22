(function(f, define){
    define([ "../kendo.core", "./references" ], f);
})(function(){

(function(kendo) {
    var CellRef = kendo.spreadsheet.CellRef;

    function Grid(rowCount, columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }

    Grid.prototype.index = function(row, column) {
        return column * this.rowCount + row;
    }

    Grid.prototype.cellRefIndex = function(ref) {
        return this.index(ref.row, ref.col);
    }

    Grid.prototype.cellRef = function(index) {
        return new CellRef(index % this.rowCount, (index / this.rowCount) >> 0);
    }

    Grid.prototype.normalize = function(cellRef) {
        var clone = cellRef.clone();
        clone.col = Math.max(0, Math.min(this.columnCount - 1, cellRef.col));
        clone.row = Math.max(0, Math.min(this.rowCount - 1, cellRef.row));
        return clone;
    }

    Grid.prototype.forEachColumn = function(sample, max, callback) {
        var start = sample.topLeft.row;
        var end = sample.bottomRight.row;
        var lastColumn = this.cellRef(max).col;

        for (var ci = 0; ci <= lastColumn; ci++) {
            callback(ci * this.rowCount + start, ci * this.rowCount + end);
        }
    }

    kendo.spreadsheet.Grid = Grid;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
