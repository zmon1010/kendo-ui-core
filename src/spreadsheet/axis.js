(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function Axis(count, value) {
        this.values = new kendo.spreadsheet.RangeList(0, count, value, true);
        this.scrollBarSize = kendo.support.scrollbar();
        this._refresh();
    }

    Axis.prototype._refresh = function() {
        var current = 0;
        this.pxValues = this.values.map(function(range) {
            var start = current;
            current += (range.end - range.start + 1) * range.value;
            var end = current - 1;
            return new kendo.spreadsheet.Range(start, end, range);
        });

        this.total = current;
    };

    Axis.prototype.value = function(start, end, value) {
        this.values.value(start, end, value);
        this._refresh();
    };

    Axis.prototype.visible = function(start, end) {
        var startSegment = null;
        var endSegment = null;
        var lastPage = false;

        if (end >= this.total + this.scrollBarSize) {
            lastPage = true;
        }

        var ranges = this.pxValues.intersecting(start, end);

        startSegment = ranges[0];
        endSegment = ranges[ranges.length - 1];

        var startOffset = start - startSegment.start;

        var startIndex = ((startOffset / startSegment.value.value) >> 0) + startSegment.value.start;

        var offset = startOffset - (startIndex - startSegment.value.start) * startSegment.value.value;

        var endOffset = end - endSegment.start;
        var endIndex = ((endOffset / endSegment.value.value) >> 0) + endSegment.value.start;

        if (endIndex > endSegment.value.end) {
            endIndex = endSegment.value.end;
        }

        if (lastPage) {
            offset += endSegment.value.value - (endOffset - (endIndex - endSegment.value.start) * endSegment.value.value);
        }

        this.visibleValues = this.values.intersecting(startIndex, endIndex);
        this.offset = offset;
        this.start = startIndex;
        this.end = endIndex;
    };

    kendo.spreadsheet.Axis = Axis;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
