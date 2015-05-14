(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Range(sheet, row, column, numRows, numColumns) {
        this._sheet = sheet;
        this._rowStart = row;
        this._columnStart = column;

        if (numRows === undefined) {
            numRows = 1;
        }

        this._rowEnd = row + numRows - 1;

        if (numColumns === undefined) {
            numColumns = 1;
        }

        this._columnEnd = column + numColumns - 1;
    }

    Range.prototype = {
        value: function(value) {
            if (value !== undefined) {
                for (var ci = this._columnStart; ci <= this._columnEnd; ci++) {
                    var start = this._sheet._grid.index(ci, this._rowStart);
                    var end = this._sheet._grid.index(ci, this._rowEnd);
                    this._sheet._values.value(start, end, value);
                }
            } else {
                var index = this._sheet._grid.index(this._columnStart, this._rowEnd);

                return this._sheet._values.value(index, index);
            }
        }
    }

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
