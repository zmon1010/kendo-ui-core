(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var Axis = kendo.Class.extend({
        init: function(count, value) {
            this.values = new kendo.spreadsheet.RangeList(0, count - 1, value, true);
            this.scrollBarSize = kendo.support.scrollbar();
            this._refresh();
        },

        value: function(start, end, value) {
            if (value !== undefined) {
                this.values.value(start, end, value);
                this._refresh();
            } else {
                return this.values.iterator(start, end).at(0);
            }
        },

        sum: function(start, end) {
            var values = this.values.iterator(start, end);

            var sum = 0;

            for (var idx = start; idx <= end; idx ++) {
                sum += values.at(idx);
            }

            return sum;
        },

        visible: function(start, end) {
            var startSegment = null;
            var endSegment = null;
            var lastPage = false;

            if (end >= this.total + this.scrollBarSize) {
                lastPage = true;
            }

            var ranges = this.pixelValues.intersecting(start, end);

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

            offset = -offset;

            return {
                values: this.values.iterator(startIndex, endIndex),
                offset: offset,
                start: startIndex,
                end: endIndex
            };
        },

        _refresh: function() {
            var current = 0;
            this.pixelValues = this.values.map(function(range) {
                var start = current;
                current += (range.end - range.start + 1) * range.value;
                var end = current - 1;
                return new kendo.spreadsheet.ValueRange(start, end, range);
            });

            this.total = current;
        }
    });

    var PaneAxis = kendo.Class.extend({
        init: function(axis, start, count) {
           this._axis = axis;
           this._start = start;
           this._count = count;
        },

        size: function(start, end) {
            return this._axis.sum(start, end);
        },

        range: function(max) {
            var start = this.size(0, this._start - 1);

            var end = max - start;

            if (this._count) {
                end = this.size(this._start, this._start + this._count - 1);
            }

            return {
                start: start,
                end: end
            };
        },

        visible: function(start, end) {
            return this._axis.visible(start, end);
        },

        translate: function(value, offset) {
            if (!this._count) {
                return value + offset;
            }

            return value;
        },

        normalize: function(offset) {
            if (this._count) {
                return 0;
            }

            return offset;
        }
    });

    kendo.spreadsheet.Axis = Axis;
    kendo.spreadsheet.PaneAxis = PaneAxis;

})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
