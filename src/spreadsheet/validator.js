(function(f, define){
    define([ "../kendo.core", "./runtime", "./references" ], f);
})(function(){

    (function(kendo) {
        //TODO: Init by sheet
        var Validator = kendo.Observable.extend({
            //TODO:
            //1) Add validation / Remove validation / Update validation
            //2) IsRangeContainsValidation
            //3) Validation tooltip / validation mark on cells without valid value.
            //4) Ignore blank option
            //5) List validation type - get values from range

            init: function(options) {
                kendo.Observable.prototype.init.call(this);
            },

            options: {
                messages: {
                    //The integer portion of the number, ddddd, represents the number of days since 1900-Jan-0.  For example, the date 19-Jan-2000 is stored as 36,544, since 36,544 days have passed since 1900-Jan-0.  The number 1 represents 1900-Jan-1.  It should be noted that the number 0 does not represent 1899-Dec-31.
                    date: {
                        greaterThan: " ", //greater
                        lessThan: " ", //lower
                        between: " ", //
                        equalTo: " ",
                        notEqualTo: " ",
                        greaterThanOrEqualTo: " ", // >=
                        lessThanOrEqualTo: " ",// <=
                        //special case?
                        notBetween: " "
                    },
                    //The fractional portion of the number, ttttt, represents the fractional portion of a 24 hour day.  For example, 6:00 AM is stored as 0.25, or 25% of a 24 hour day.  Similarly, 6PM is stored at 0.75,  or 75% percent of a 24 hour day.
                    time: {
                        greaterThan: " ", //greater
                        lessThan: " ", //lower
                        between: " ", //
                        equalTo: " ",
                        notEqualTo: " ",
                        greaterThanOrEqualTo: " ", // >=
                        lessThanOrEqualTo: " ",// <=
                        notBetween: " "
                    },
                    number: {
                        greaterThan: " ", //greater
                        lessThan: " ", //lower
                        between: " ", //
                        equalTo: " ",
                        notEqualTo: " ",
                        greaterThanOrEqualTo: " ", // >=
                        lessThanOrEqualTo: " ",// <=
                        notBetween: " "
                    },
                    text: {
                        greaterThan: " ", //greater
                        lessThan: " ", //lower
                        between: " ", //
                        equalTo: " ",
                        notEqualTo: " ",
                        greaterThanOrEqualTo: " ", // >=
                        lessThanOrEqualTo: " ",// <=
                        notBetween: " "
                    },
                    //special case:
                    list: " "
                }
            }
        });

        kendo.spreadsheet.Validator = Validator;
    })(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
