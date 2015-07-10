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

        _property: function(name, value, recalc) {
            if (value !== undefined) {
                this._ref.forEach(function(ref) {
                    ref = ref.toRangeRef();

                    var topLeft = this._normalize(ref.topLeft);
                    var bottomRight = this._normalize(ref.bottomRight);

                    for (var ci = topLeft.col; ci <= bottomRight.col; ci++) {
                        var start = this._sheet._grid.index(topLeft.row, ci);
                        var end = this._sheet._grid.index(bottomRight.row, ci);

                        this._sheet._properties.set(name, start, end, value);
                    }
                }.bind(this));

                this._sheet.triggerChange(recalc);

                return this;
            } else {
                var index = this._sheet._grid.cellRefIndex(this._normalize(this._ref.toRangeRef().topLeft));
                return this._sheet._properties.get(name, index);
            }
        },
        value: function(value, parseStrings) {
            var type = null;

            if (value !== undefined) {
                this._sheet.batch(function() {
                    this._ref.forEach(function(ref) {
                        ref = ref.toRangeRef();
                        var topLeft = this._normalize(ref.topLeft);

                        var bottomRight = this._normalize(ref.bottomRight);

                        for (var ci = topLeft.col; ci <= bottomRight.col; ci++) {
                            for (var ri = topLeft.row; ri <= bottomRight.row; ri++) {
                               this._sheet._setValue(ri, ci, value, parseStrings);
                            }
                        }
                    }.bind(this));
                }.bind(this), true);

                return this;
            } else {
                var topLeft = this._normalize(this._ref.toRangeRef().topLeft);

                return this._sheet._getValue(topLeft.row, topLeft.col);
            }
        },
        _editableValue: function(value) {
            var formula, type, parsed;

            if (value !== undefined) {
                if ((/^=/).test(value)) {
                    this.formula(value);
                } else {
                    this._sheet.batch(function() {
                        this.formula(null);
                        this.value(value);
                    }.bind(this), true);
                }

                return this;
            } else {
                value = this._property("value");
                type = this._property("type");
                formula = this._property("formula");

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
            }
        },
        type: function() {
            return this._property("type");
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

            var result = this._property(property, value);

            if (value === undefined) {
                result = JSON.parse(result);
            }

            return result;
        },

        format: function(value) {
            return this._property("format", value);
        },

        formula: function(value) {
            if (value === null) {

                var sheet = this._sheet;
                sheet.batch(function() {
                    this._property("formula", null);
                    this.value(null);
                }.bind(this), true);

                return this;
            }

            return this._property("formula", value, true);
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

            if (this._ref === kendo.spreadsheet.NULLREF) {
                if (values !== undefined) {
                    throw new Error("Unsupported for NULLREF.");
                } else {
                    return [];
                }
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

            if (spec === undefined) {
                spec = { column: 0 };
            }

            spec = spec instanceof Array ? spec : [spec];

            this._sheet._sortBy(this._ref.toRangeRef(), spec.map(function(spec, index) {
                if (typeof spec === "number") {
                    spec = { column: spec };
                }

                return {
                    index: spec.column === undefined ? index : spec.column,
                    ascending: spec.ascending === undefined ? true : spec.ascending
                };
            }));

            return this;
        },
        filter: function(spec) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            spec = spec instanceof Array ? spec : [spec];

            this._sheet._filterBy(this._ref.toRangeRef(), spec.map(function(spec, index) {
               return {
                   index: spec.column === undefined ? index : spec.column,
                   filter: spec.filter
               };
            }));

            return this;
        },
        clearFilter: function(spec) {
            this._sheet._clearFilter(spec instanceof Array ? spec : [spec]);
        }
    });

    styles.forEach(function(x) {
        Range.prototype[x] = function(value) {
            return this._property(x, value);
        };
    });

    function toExcelFormat(format) {
        return format.replace(/M/g, "m").replace(/'/g, '"').replace(/tt/, "am/pm");
    }

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
