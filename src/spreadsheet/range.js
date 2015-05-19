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
        _property: function(list, value) {
            if (value !== undefined) {
                for (var ci = this._columnStart; ci <= this._columnEnd; ci++) {
                    var start = this._sheet._grid.index(this._rowStart, ci);
                    var end = this._sheet._grid.index(this._rowEnd, ci);

                    list.value(start, end, value);
                }

                return this;
            } else {
                var index = this._sheet._grid.index(this._rowEnd, this._columnStart);

                return list.value(index, index);
            }
        },
        value: function(value) {
            return this._property(this._sheet._values, value);
        },
        background: function(value) {
            return this._property(this._sheet._backgrounds, value);
        }
    }

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
