(function(f, define){
    define([ "./runtime" ], f);
})(function(){

    "use strict";

    var spreadsheet = kendo.spreadsheet;

    var exports = {};
    spreadsheet.validation = exports;
    var calc = spreadsheet.calc;
    var Class = kendo.Class;

    var VALIDATIONMESSAGE = "Please enter a valid #=dataType# value {0}.";
    var VALIDATIONTITLE = "Validation #=type#";
    var VALIDATIONCOMPARERS = {
        greaterThan: { type: "greaterThan",  text: "greater than #=from#"},
        lessThan: { type: "lessThan",  text: "less than #=from#"},
        between: { type: "between",  text: "between #=from# and #=to#"},
        equalTo: { type: "equalTo",  text: "equal to #=from#"},
        notEqualTo: { type: "notEqualTo",  text: "not equal to #=from#"},
        greaterThanOrEqualTo: { type: "greaterThanOrEqualTo",  text: "greater than or equal to #=from#"},
        lessThanOrEqualTo: { type: "lessThanOrEqualTo",  text: "less than or equal to #=from#"},
        notBetween: { type: "notBetween",  text: "not between #=from# and #=to#"},
        custom: { type: "custom",  text: "that satisfies the formula: #=fromFormula#"}
    };

    function parseValidation(sheet, row, col, validation) {
        if (typeof validation === "string") {
            validation = JSON.parse(validation);
        }

        if (validation.from) {
            validation.from = calc.parseFormula(sheet, row, col, validation.from);
        }

        if (validation.to) {
            validation.to = calc.parseFormula(sheet, row, col, validation.to);
        }

        return {
            from: validation.from,
            to: validation.to,
            sheet: sheet,
            row: row,
            col: col,
            comparerType: validation.comparerType,
            dataType: validation.dataType,
            type: validation.type,
            allowNulls: validation.allowNulls,
            tooltipMessageTemplate: validation.tooltipMessageTemplate,
            tooltipTitleTemplate: validation.tooltipTitleTemplate,
            messageTemplate: validation.messageTemplate,
            titleTemplate: validation.titleTemplate
        };
    }

    function compileValidation(validation) {
        var validationHandler;

        if (validation.from) {
            validation.from = calc.compile(validation.from);
        }

        if (validation.to) {
            validation.to = calc.compile(validation.to);
        }

        var comparer = exports.validationComparers[validation.comparerType];

        if (!comparer) {
            throw kendo.format("'{0}' comparer is not implemented.", validation.comparerType);
        }

        validationHandler = function (valueToCompare, valueFormat) {

            if (this.allowNulls && valueToCompare === null) {
                this.value = true;
            } else {
                //TODO: MAKE WORKS FOR OTHER TYPES, DIFF THAN DATE:
                var type = valueFormat ? spreadsheet.formatting.type(valueToCompare, valueFormat) : "";

                var toValue = this.to && this.to.value ? this.to.value : undefined;

                this.value = !type || type == this.dataType ? comparer(valueToCompare, this.from.value,  toValue) : "type error";
            }

            return this.value;
        };

        return new kendo.spreadsheet.validation.Validation($.extend(validation, { handler: validationHandler }));
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

            //TODO: address to be range / cell ref, and adjust it based on it
            this.sheet = options.sheet;
            this.row = options.row;
            this.col = options.col;

            this.tooltipMessageTemplate = options.tooltipMessageTemplate ? options.tooltipMessageTemplate : "";
            this.tooltipTitleTemplate = options.tooltipTitleTemplate ? options.tooltipTitleTemplate : "";

            this.messageTemplate = options.messageTemplate ? options.messageTemplate : this._validationMessage();
            this.titleTemplate = options.titleTemplate ? options.titleTemplate : this._validationTitle();
        },

        _setMessages: function() {
            var options = {
                from: this.from ? this.from.value : "",
                to: this.to ? this.to.value : "",
                fromFormula: this.from ? this.from.toString() : "",
                toFormula: this.from ? this.from.toString() : "",
                dataType: this.dataType,
                type: this.type,
                comparerType: this.comparerType
            };

            //TODO: Use kendo.format instead of templates?
            if (this.tooltipMessageTemplate && this.tooltipTitleTemplate) {
                this.tooltipMessage = kendo.template(this.tooltipMessageTemplate)(options);
                this.tooltipTitle = kendo.template(this.tooltipTitleTemplate)(options);
            }

            this.message = kendo.template(this.messageTemplate)(options);
            this.title = kendo.template(this.titleTemplate)(options);
        },

        _validationTitle: function() {
            return kendo.format(VALIDATIONTITLE);
        },

        _validationMessage: function() {
            var validationTypeText = kendo.format(VALIDATIONCOMPARERS[this.comparerType].text);

            return kendo.format(VALIDATIONMESSAGE, validationTypeText);
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
            }

            if (options.to) {
                options.to = options.to.toString();
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
                titleTemplate: this.titleTemplate
            };
        }
    });
    exports.parse = parseValidation;
    exports.compile = compileValidation;
    exports.validationComparers = {
        greaterThan: function (valueToCompare, from) {
            return valueToCompare > from;
        },

        lessThan: function (valueToCompare, from) {
            return valueToCompare < from;
        },

        between: function (valueToCompare, from, to) {
            return valueToCompare > from && valueToCompare < to;
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
        }
    };

    exports.Validation = Validation;


}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
