(function(f, define){
    define([ "./runtime" ], f);
})(function(){
    "use strict";

    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var spreadsheet = kendo.spreadsheet;

    var exports = {};
    spreadsheet.validation = exports;
    var calc = spreadsheet.calc;
    var Class = kendo.Class;

    function compileValidation(sheet, row, col, validation) {
        var validationHandler;

        if (typeof validation === "string") {
            validation = JSON.parse(validation);
        }

        if (validation.from) {
            validation.from = calc.compile(calc.parseFormula(sheet, row, col, validation.from));
        }

        if (validation.to) {
            validation.to = calc.compile(calc.parseFormula(sheet, row, col, validation.to));
        }


        var comparer = validation.dataType == "custom" ? exports.validationComparers.custom : exports.validationComparers[validation.comparerType];

        if (!comparer) {
            throw kendo.format("'{0}' comparer is not implemented.", validation.comparerType);
        }

        validationHandler = function (valueToCompare) { //add 'valueFormat' arg when add isDate comparer
            var toValue = this.to && this.to.value ? this.to.value : undefined;

            if ( this.dataType == "custom") {
                this.value = comparer(valueToCompare, this.from.value,  toValue);
            } else if (valueToCompare === null) {
                if (this.allowNulls) {
                    this.value = true;
                } else {
                    this.value = false;
                }
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

        _setMessages: function() {
            var from = this.from ? this.from.value : "";
            var to = this.to ? this.to.value : "";

            this.title = "Default Title";
            this.message = "Default message (you need customized one use the validation dialog to do so)";

            if (this.tooltipTitleTemplate) {
                this.tooltipTitle = kendo.format(this.tooltipTitleTemplate, from, to);
            }

            if (this.tooltipMessageTemplate) {
                this.tooltipMessage = kendo.format(this.tooltipMessageTemplate, from, to);
            }

            if (this.titleTemplate) {
                this.title = kendo.format(this.titleTemplate, from, to);
            }

            if (this.messageTemplate) {
                this.message = kendo.format(this.messageTemplate, from, to);
            }

            //TEMPLATES ARE DROPPED FOR NOW, ONLY FORMAT IS SUPPORTED
            //TODO: Add support for templates? In this case the validation UI should be modified to return template
            //var options = {
            //    from: this.from ? this.from.value : "",
            //    to: this.to ? this.to.value : "",
            //    fromFormula: this.from ? this.from.toString() : "",
            //    toFormula: this.from ? this.from.toString() : "",
            //    dataType: this.dataType,
            //    type: this.type,
            //    comparerType: this.comparerType
            //};
            //if (this.tooltipTitleTemplate) {
            //    this.tooltipTitle = kendo.template(this.tooltipTitleTemplate)(options);
            //}
            //if (this.tooltipMessageTemplate) {
            //    this.tooltipMessage = kendo.template(this.tooltipMessageTemplate)(options);
            //}
            //if (this.titleTemplate) {
            //    this.title = kendo.template(this.titleTemplate)(options);
            //}
            //if (this.messageTemplate) {
            //    this.message = kendo.template(this.messageTemplate)(options);
            //}
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


}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
