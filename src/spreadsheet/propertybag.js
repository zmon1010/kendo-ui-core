(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    kendo.spreadsheet.PropertyBag = kendo.Class.extend({
        init: function() {
            this._specs = [];
            this._properties = {};
        },

        register: function(spec) {
            this._specs.push(spec);
            this._properties[spec.name] = new kendo.spreadsheet.SparseRangeList(0, spec.count, spec.value);
        },

        get: function(name, index) {
            var properties = this._properties[name];

            if (index === undefined) {
                return properties;
            }

            return properties.value(index, index);
        },

        set: function(name, start, end, value) {
            var properties = this._properties[name];

            if (value === undefined) {
                value = end;
                end = start;
            }

            properties.value(start, end, value);
        },

        copy: function(sourceStart, sourceEnd, targetStart) {
            this._specs.forEach(function(spec) {
                this._properties[spec.name].copy(sourceStart, sourceEnd, targetStart);
            }, this);
        },

        iterator: function(name, start, end) {
            return this._properties[name].iterator(start, end);
        },

        sortable: function() {
            return this._specs.filter(function(spec) { return spec.sortable; })
                              .map(function(spec) {
                                return this.get(spec.name);
                              }, this);
        },

        iterators: function(start, end) {
           return this._specs.map(function(spec) {
                var iterator = this.iterator(spec.name, start, end);
                return {
                    name: spec.name,
                    value: spec.value,
                    at: iterator.at.bind(iterator)
                };
           }, this);
        },

        forEach: function(start, end, callback) {
            var iterators = this.iterators(start, end);

            for (var index = start; index <= end; index++) {
                var values = {};

                iterators.forEach(function(iterator) {
                    var value = iterator.at(index);
                    if (value !== iterator.value) {
                        values[iterator.name] = value;
                    }
                });

                callback(values);
            }
        }
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
