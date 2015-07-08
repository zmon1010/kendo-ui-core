(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){
(function(kendo) {
    var Filter = kendo.Class.extend({
    });

    var ValueFilter = Filter.extend({
        values: [],

        dates: [],

        blanks: false,

        init: function(options) {
            if (options.values !== undefined) {
                this.values = options.values;
            }

            if (options.blanks !== undefined) {
                this.blanks = options.blanks;
            }

            if (options.dates !== undefined) {
                this.dates = options.dates;
            }
        },

        matches: function(value) {
            if (value === null) {
                return this.blanks;
            }

            if (value instanceof Date) {
                return this.dates.some(function(date) {
                    return date.year === value.getFullYear() &&
                        (date.month === undefined || date.month === value.getMonth()) &&
                        (date.day === undefined || date.day === value.getDate()) &&
                        (date.hours === undefined || date.hours === value.getHours()) &&
                        (date.minutes === undefined || date.minutes === value.getMinutes()) &&
                        (date.seconds === undefined || date.seconds === value.getSeconds());
                });
            }

            return this.values.indexOf(value) >= 0;
        },
        toJSON: function() {
            return {
                type: "value",
                values: this.values.slice(0)
            };
        }
    });

    kendo.spreadsheet.Filter = Filter;
    kendo.spreadsheet.ValueFilter = ValueFilter;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
