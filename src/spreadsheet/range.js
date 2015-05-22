(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Range(rangeRef, sheet) {
        this._sheet = sheet;
        this._rangeRef = rangeRef;
    }

    Range.prototype = {
        _property: function(list, value) {
            var ref = this._rangeRef;
            if (value !== undefined) {
                for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col; ci++) {
                    var start = this._sheet._grid.index(ref.topLeft.row, ci);
                    var end = this._sheet._grid.index(ref.bottomRight.row, ci);

                    list.value(start, end, value);
                }

                return this;
            } else {
                var index = this._sheet._grid.cellRefIndex(ref.topLeft);
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
        }
    };

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
