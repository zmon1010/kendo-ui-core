(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    kendo.spreadsheet.PropertyBag = kendo.Class.extend({
        specs: [
            { name: "value", value: null, sortable: true, serializable: true },
            { name: "type",  value: null, sortable: true, serializable: false },
            { name: "format", value: null, sortable: true, serializable: true },
            { name: "formula", value: null, sortable: true, serializable: true },
            { name: "compiledFormula", value: null, sortable: true, serializable: false },
            { name: "background", value: null, sortable: true, serializable: true },
            { name: "borderBottom", value: null, sortable: false, serializable: true },
            { name: "borderRight", value: null, sortable: false, serializable: true },
            { name: "fontColor", value: null, sortable: true, serializable: true },
            { name: "fontFamily", value: null, sortable: true, serializable: true },
            { name: "fontLine", value: null, sortable: true, serializable: true },
            { name: "fontSize", value: null, sortable: true, serializable: true },
            { name: "fontStyle", value: null, sortable: true, serializable: true },
            { name: "fontWeight", value: null, sortable: true, serializable: true },
            { name: "horizontalAlignment", value: null, sortable: true, serializable: true },
            { name: "verticalAlignment", value: null, sortable: true, serializable: true },
            { name: "wrap", value: null, sortable: true, serializable: true }
        ],

        init: function(cellCount) {
            this._properties = {};

            this.specs.forEach(function(spec) {
               this._properties[spec.name] = new kendo.spreadsheet.SparseRangeList(0, cellCount, spec.value);
            }, this);
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
            this.specs.forEach(function(spec) {
                this._properties[spec.name].copy(sourceStart, sourceEnd, targetStart);
            }, this);
        },

        iterator: function(name, start, end) {
            return this._properties[name].iterator(start, end);
        },

        sortable: function() {
            return this.specs.filter(function(spec) { return spec.sortable; })
                              .map(function(spec) {
                                return this.get(spec.name);
                              }, this);
        },

        iterators: function(start, end, serializableOnly) {
            var specs = this.specs;

            if (serializableOnly) {
                specs = specs.filter(function(spec) {
                    return spec.serializable;
                });
            }

            return specs.map(function(spec) {
                var iterator = this.iterator(spec.name, start, end);

                return {
                    name: spec.name,
                    value: spec.value,
                    at: iterator.at.bind(iterator)
                };
            }, this);
        },

        forEach: function(start, end, callback, serializableOnly) {
            var iterators = this.iterators(start, end, serializableOnly);

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
