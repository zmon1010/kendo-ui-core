(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Grid(columnCount, rowCount) {
        this.columnCount = columnCount;
        this.rowCount = rowCount;
    }

    Grid.prototype.index = function(column, row) {
        if (row === undefined) {
            var address = column;

            row = address.row;
            column = address.column;
        }

        return column * this.rowCount + row;
    }

    Grid.prototype.address = function(index) {
        return new Address(index % this.rowCount, (index / this.rowCount) >> 0);
    }

    Grid.prototype.forEachColumn = function(sample, max, callback) {
        var start = sample.start.row;
        var end = sample.end.row;
        var lastColumn = this.address(max).column;

        for (var ci = 0; ci <= lastColumn; ci++) {
            callback(ci * this.rowCount + start, ci * this.rowCount + end);
        }
    }

    function Address(column, row) {
        this.column = column;
        this.row = row;
    }

    function Area(start, end) {
        this.start = start;
        this.end = end;
    }

    kendo.spreadsheet.Grid = Grid;
    kendo.spreadsheet.Address = Address;
    kendo.spreadsheet.Area = Area;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
