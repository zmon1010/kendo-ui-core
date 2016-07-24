(function(f, define){
    define([ "./runtime" ], f);
})(function(){
    "use strict";

    var $ = kendo.jQuery;

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var spreadsheet = kendo.spreadsheet;

    var exports = {};
    spreadsheet.validation = exports;
    var calc = spreadsheet.calc;
    var Class = kendo.Class;
    var TRANSPOSE_FORMAT = "_matrix({0})";
    var DATE_FORMAT = 'DATEVALUE("{0}")';

    calc.runtime.defineFunction("_matrix", function(m){
        return m;
    }).args([
        [ "m", "matrix" ]
    ]);

    function compileValidation(sheet, row, col, validation) {
        var validationHandler;
        var comparer;
        var parsedFromDate;
        var parsedToDate;

        if (typeof validation === "string") {
            validation = JSON.parse(validation);
        }

        if (validation.from) {
            if (validation.dataType === "list") {
                validation.from = kendo.format(TRANSPOSE_FORMAT, validation.from);
            }

            if (validation.dataType === "date") {
                parsedFromDate = calc.runtime.parseDate(validation.from);
                if (parsedFromDate) {
                    validation.from = kendo.format(DATE_FORMAT, validation.from);
                    validation.fromIsDateValue = true;
                }
            }

            validation.from = calc.compile(calc.parseFormula(sheet, row, col, validation.from));
        }

        if (validation.to) {
            if (validation.dataType === "date") {
                parsedToDate = calc.runtime.parseDate(validation.to);
                if (parsedToDate) {
                    validation.to = kendo.format(DATE_FORMAT, validation.to);
                    validation.toIsDateValue = true;
                }
            }

            validation.to = calc.compile(calc.parseFormula(sheet, row, col, validation.to));
        }

        if (validation.dataType == "custom") {
            comparer = exports.validationComparers.custom;
        } else if (validation.dataType == "list") {
            comparer = exports.validationComparers.list;
        } else {
            comparer = exports.validationComparers[validation.comparerType];
        }

        if (!comparer) {
            throw kendo.format("'{0}' comparer is not implemented.", validation.comparerType);
        }

        validationHandler = function (valueToCompare) { //add 'valueFormat' arg when add isDate comparer
            var toValue = this.to && this.to.value ? this.to.value : undefined;

            if (valueToCompare === null || valueToCompare === "") {
                if (this.allowNulls) {
                    this.value = true;
                } else {
                    this.value = false;
                }
            } else if (this.dataType == "custom") {
                this.value = comparer(valueToCompare, this.from.value,  toValue);
            } else if (this.dataType == "list") {
                var data = this._getListData();

                this.value = comparer(valueToCompare, data, toValue);
            } else {
                //TODO: TYPE CHECK IS REQUIRED ONLY FOR DATE TYPE WHEN SPECIAL COMPARER (ISDATE) IS USED
                this.value = comparer(valueToCompare, this.from.value,  toValue);
            }

            return this.value;
        };

        return new kendo.spreadsheet.validation.Validation($.extend(validation, {
            handler: validationHandler,
            sheet: sheet,
            row: row,
            col: col
        }));
    }

    var Validation = Class.extend({
        init: function Validation(options){
            this.handler = options.handler;
            this.from = options.from;
            this.to = options.to;
            this.dataType = options.dataType; //date, time etc
            this.comparerType =  options.comparerType; //greaterThan, EqaulTo etc
            this.type = options.type ? options.type : "warning"; //info, warning, reject
            this.allowNulls = options.allowNulls ? true : false;
            this.fromIsDateValue = options.fromIsDateValue ? true : false;
            this.toIsDateValue = options.toIsDateValue ? true : false;
            this.showButton = options.showButton;

            //TODO: address to be range / cell ref, and adjust it based on it
            this.sheet = options.sheet;
            this.row = options.row;
            this.col = options.col;

            if (options.tooltipMessageTemplate) {
                this.tooltipMessageTemplate = options.tooltipMessageTemplate;
            }

            if (options.tooltipTitleTemplate) {
                this.tooltipTitleTemplate = options.tooltipTitleTemplate;
            }

            if (options.messageTemplate) {
                this.messageTemplate = options.messageTemplate;
            }

            if (options.titleTemplate) {
                this.titleTemplate = options.titleTemplate;
            }
        },

        _formatMessages: function(format) {
            var from = this.from ? this.from.value : "";
            var to = this.to ? this.to.value : "";

            var fromFormula = this.from ? this.from.toString() : "";
            var toFormula = this.to ? this.to.toString() : "";
            var dataType = this.dataType;
            var type = this.type;
            var comparerType = this.comparerType;

            return kendo.format(format, from, to, fromFormula, toFormula, dataType, type, comparerType);
        },

        _setMessages: function() {
            this.title = "";
            this.message = "";

            if (this.tooltipTitleTemplate) {
                this.tooltipTitle = this._formatMessages(this.tooltipTitleTemplate);
            }

            if (this.tooltipMessageTemplate) {
                this.tooltipMessage = this._formatMessages(this.tooltipMessageTemplate);
            }

            if (this.titleTemplate) {
                this.title = this._formatMessages(this.titleTemplate);
            }

            if (this.messageTemplate) {
                this.message = this._formatMessages(this.messageTemplate);
            }
        },

        _getListData: function() {
            if (!this.from.value || !this.from.value.data) {
                return [];
            }

            var cube = this.from.value.data;
            var i;
            var y;
            var data = [];

            for (i = 0; i < cube.length; i++ ) {
                var array = cube[i];

                if (array) {
                    for (y = 0; y < array.length; y++ ) {
                        data.push(array[y]);
                    }
                }
            }

            return data;
        },

        clone: function(sheet, row, col) {
            var options = this._getOptions();

            if (options.from) {
                options.from = options.from.clone(sheet, row, col);
            }

            if (options.to) {
                options.to = options.to.clone(sheet, row, col);
            }

            return new Validation($.extend(options,
                { handler: this.handler },
                { sheet: sheet, row: row, col: col }
            ));
        },

        exec: function(ss, compareValue, compareFormat, callback) {
            var self = this;

            var calculateFromCallBack = function() {

                self.value = self.handler.call(self, compareValue, compareFormat);
                self._setMessages();
                if (callback) {
                    callback(self.value);
                }
            };

            if (self.to) {
                self.to.exec(ss, function() {
                    self.from.exec(ss, calculateFromCallBack);
                });
            } else {
                self.from.exec(ss, calculateFromCallBack);
            }
        },

        reset: function() {
            if (this.from) {
                this.from.reset();
            }
            if (this.to) {
                this.to.reset();
            }
            delete this.value;
        },

        adjust: function(affectedSheet, operation, start, delta) {
            if (this.from) {
                this.from.adjust(affectedSheet, operation, start, delta);
            }
            if (this.to) {
                this.to.adjust(affectedSheet, operation, start, delta);
            }
            if (this.sheet.toLowerCase() == affectedSheet.toLowerCase()) {
                var formulaRow = this.row;
                var formulaCol = this.col;
                switch (operation) {
                  case "row":
                    if (formulaRow >= start) {
                        this.row += delta;
                    }
                    break;
                  case "col":
                    if (formulaCol >= start) {
                        this.col += delta;
                    }
                    break;
                }
            }
        },

        toJSON: function() {
            var options = this._getOptions();

            if (options.from) {
                options.from = options.from.toString();

                if (options.dataType === "list") {
                    options.from = options.from.replace(/^_matrix\((.*)\)$/i, "$1");
                }

                if (options.dataType === "date") {
                    if (this.fromIsDateValue) {
                        options.from = options.from.replace(/^DATEVALUE\("(.*)"\)$/i, "$1");
                    }
                }
            }

            if (options.to) {
                options.to = options.to.toString();

                if (options.dataType === "date") {
                    if (this.toIsDateValue) {
                        options.to = options.to.replace(/^DATEVALUE\("(.*)"\)$/i, "$1");
                    }
                }
            }




            return options;
        },

        _getOptions: function () {
            return {
                from: this.from,
                to: this.to,
                dataType: this.dataType,
                type: this.type,
                comparerType: this.comparerType,
                row: this.row,
                col: this.col,
                sheet: this.sheet,
                allowNulls: this.allowNulls,
                tooltipMessageTemplate: this.tooltipMessageTemplate,
                tooltipTitleTemplate: this.tooltipTitleTemplate,
                //TODO: export generated messages instead?
                messageTemplate: this.messageTemplate,
                titleTemplate: this.titleTemplate,
                showButton: this.showButton
            };
        }
    });
    exports.compile = compileValidation;
    exports.validationComparers = {
        greaterThan: function (valueToCompare, from) {
            return valueToCompare > from;
        },

        lessThan: function (valueToCompare, from) {
            return valueToCompare < from;
        },

        between: function (valueToCompare, from, to) {
            return valueToCompare >= from && valueToCompare <= to;
        },

        equalTo: function (valueToCompare, from) {
            return valueToCompare == from;
        },

        notEqualTo: function (valueToCompare, from) {
            return valueToCompare != from;
        },

        greaterThanOrEqualTo: function (valueToCompare, from) {
            return valueToCompare >= from;
        },

        lessThanOrEqualTo: function (valueToCompare, from) {
            return valueToCompare <= from;
        },

        notBetween: function (valueToCompare, from, to) {
            return valueToCompare < from || valueToCompare > to;
        },

        custom: function (valueToCompare, from) {
            return from;
        },

        list: function (valueToCompare, data) {
            return data.indexOf(valueToCompare) > -1;
        }
    };

    exports.Validation = Validation;


}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
