(function(f, define){
    define([ "../kendo.core", "../kendo.data" ], f);
})(function(){
(function(kendo) {
    /*jshint evil: true */
    var Filter = kendo.spreadsheet.Filter = kendo.Class.extend({
        matches: function() {
            throw new Error("The 'matches' method is not implemented.");
        },
        toJSON: function() {
            throw new Error("The 'toJSON' method is not implemented.");
        }
    });

    Filter.create = function(options) {
        var type = options.type;

        if (!type) {
            throw new Error("Filter type not specified.");
        }

        var constructor = kendo.spreadsheet[type.charAt(0).toUpperCase() + type.substring(1) + "Filter"];

        if (!constructor) {
            throw new Error("Filter type not recognized.");
        }

        return new constructor(options);
    };

    kendo.spreadsheet.ValueFilter = Filter.extend({
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

    kendo.spreadsheet.CustomFilter = Filter.extend({
        logic: "and",
        init: function(options) {
            if (options.logic !== undefined) {
                this.logic = options.logic;
            }

            if (options.criteria === undefined) {
                throw new Error("Must specify criteria.");
            }

            this.criteria = options.criteria;

            var expression = kendo.data.Query.filterExpr({
                logic: this.logic,
                filters: this.criteria
            }).expression;

            this._matches = new Function("d", "return " + expression);
        },
        matches: function(value) {
            if (value === null) {
                return false;
            }

            return this._matches(value);
        },
        toJSON: function() {
            return {
                type: "custom",
                logic: this.logic,
                criteria: this.criteria
            };
        }
    });
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
