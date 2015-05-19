(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Grid(rowCount, columnCount) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
    }

    Grid.prototype.index = function(row, column) {
        if (column === undefined) {
            var address = row;

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

    function Address(row, column) {
        this.row = row;
        this.column = column;
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
