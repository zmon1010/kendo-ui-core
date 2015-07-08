(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var UnionRef = kendo.spreadsheet.UnionRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var styles = [
        "fontColor", "fontFamily", "fontLine", "fontSize", "fontStyle", "fontWeight",
        "horizontalAlignment", "verticalAlignment", "background", "wrap"
    ];

    var Range = kendo.Class.extend({
        init: function(ref, sheet) {
            this._sheet = sheet;
            this._ref = ref;
        },

        _normalize: function(ref) {
            return this._sheet._grid.normalize(ref);
        },

        _property: function(list, value, recalc) {
            if (value !== undefined) {
                this._ref.forEach(function(ref) {
                    ref = ref.toRangeRef();

                    var topLeft = this._normalize(ref.topLeft);
                    var bottomRight = this._normalize(ref.bottomRight);

                    for (var ci = topLeft.col; ci <= bottomRight.col; ci++) {
                        var start = this._sheet._grid.index(topLeft.row, ci);
                        var end = this._sheet._grid.index(bottomRight.row, ci);

                        list.value(start, end, value);
                    }
                }.bind(this));

                this._sheet.triggerChange(recalc);

                return this;
            } else {
                var index = this._sheet._grid.cellRefIndex(this._normalize(this._ref.toRangeRef().topLeft));
                return list.value(index, index);
            }
        },
        value: function(value, parse) {
            var type = null;

            if (value !== undefined) {
                var result = kendo.spreadsheet.Sheet.parse(value, parse);

                this._sheet.batch(function() {
                    this._property(this._sheet._types, result.type);
                    this._property(this._sheet._values, result.value);
                    if (result.type === "date") {
                        this._property(this._sheet._formats, toExcelFormat(kendo.culture().calendar.patterns.d));
                    }
                }.bind(this), true);

                return this;
            } else {
                type = this._property(this._sheet._types);
                value = this._property(this._sheet._values);

                if (type === "date") {
                    value = kendo.spreadsheet.calc.runtime.serialToDate(value);
                }

                return value;
            }
        },
        editValue: function() {
            var value = this._property(this._sheet._values);
            var type = this._property(this._sheet._types);
            var formula = this._property(this._sheet._formulas);
            var parsed;

            if (formula) {
                value = formula;
            } else if (type === "date") {
                value = kendo.spreadsheet.calc.runtime.serialToDate(value);
                value = kendo.toString(value, kendo.culture().calendar.patterns.d);
            } else if (type === "string") {
                parsed = kendo.spreadsheet.Sheet.parse(value, true);

                if (parsed.type == "number") {
                    value = "'" + value;
                }
            }

            return value;
        },
        type: function() {
            return this._property(this._sheet._types);
        },
        borderLeft: function(value) {
            var ref = this._ref.resize({ left: -1, right: -1 });
            var result = new Range(ref, this._sheet).borderRight(value);
            return value === undefined ? result : this;
        },
        borderTop: function(value) {
            var ref = this._ref.resize({ top: -1, bottom: -1 });
            var result = new Range(ref, this._sheet).borderBottom(value);
            return value === undefined ? result : this;
        },
        borderBottom: function(value) {
            return this._jsonProperty("borderBottom", value);
        },
        borderRight: function(value) {
            return this._jsonProperty("borderRight", value);
        },

        _jsonProperty: function(property, value) {
            if (value !== undefined) {
                value = JSON.stringify(value);
            }

            var result = this._property(this._sheet["_" + property], value);

            if (value === undefined) {
                result = JSON.parse(result);
            }

            return result;
        },

        format: function(value) {
            return this._property(this._sheet._formats, value);
        },

        formula: function(value) {
            if (value === null) {

                var sheet = this._sheet;
                sheet.batch(function() {
                    this._property(this._sheet._formulas, null);
                    this.value(null);
                }.bind(this), true);

                return this;
            }

            return this._property(this._sheet._formulas, value, true);
        },

        merge: function() {
            var sheet = this._sheet;
            var mergedCells = sheet._mergedCells;

            sheet.batch(function() {
                this._ref = this._ref.map(function(ref) {
                    if (ref instanceof kendo.spreadsheet.CellRef) {
                        return ref;
                    }

                    var currentRef = ref.toRangeRef().union(mergedCells, function(ref) {
                        mergedCells.splice(mergedCells.indexOf(ref), 1);
                    });

                    var range = new Range(currentRef, sheet);
                    var value = range.value();
                    var background = range.background();

                    range.value(null);
                    range.background(null);

                    var topLeft = new Range(currentRef.collapse(), sheet);

                    topLeft.value(value);
                    topLeft.background(background);

                    mergedCells.push(currentRef);
                    return currentRef;
                });
            }.bind(this));

            return this;
        },

        unmerge: function() {
            var mergedCells = this._sheet._mergedCells;

            this._ref.forEach(function(ref) {
                ref.intersecting(mergedCells).forEach(function(mergedRef) {
                    mergedCells.splice(mergedCells.indexOf(mergedRef), 1);
                });
            });

            this._sheet.triggerChange();

            return this;
        },

        select: function() {
            this._sheet.select(this._ref);

            return this;
        },

        values: function(values) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            var result = this._sheet.values(this._ref.toRangeRef(), values);

            if (values === undefined) {
                return result;
            }

            return this;
        },

        clear: function(options) {

            var clearAll = !options || !Object.keys(options).length;

            var sheet = this._sheet;

            sheet.batch(function() {

                if (clearAll || (options && options.contentsOnly === true)) {
                    this.formula(null);
                }

                if (clearAll || (options && options.formatOnly === true)) {

                    styles.forEach(function(x) {
                        this[x](null);
                    }.bind(this));
                    this.format(null);
                    this.unmerge();
                }

            }.bind(this));

            return this;
        },

        clearContent: function() {
            return this.clear({ contentsOnly: true });
        },

        clearFormat: function() {
            return this.clear({ formatOnly: true });
        },

        sort: function(spec) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            this._sheet._sortBy(this._ref.toRangeRef(), spec instanceof Array ? spec : [spec]);

            return this;
        },
        filter: function(spec) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            this._sheet._filterBy(this._ref.toRangeRef(), spec instanceof Array ? spec : [spec]);

            return this;
        },
        clearFilter: function(spec) {
            this._sheet._clearFilter(spec instanceof Array ? spec : [spec]);
        }
    });

    styles.forEach(function(x) {
        Range.prototype[x] = function(value) {
            return this._property(this._sheet["_" + x], value);
        };
    });

    function toExcelFormat(format) {
        return format.replace(/M/g, "m").replace(/'/g, '"').replace(/tt/, "am/pm");
    }

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
