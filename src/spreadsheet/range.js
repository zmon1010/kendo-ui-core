(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var UnionRef = kendo.spreadsheet.UnionRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var styles = [
        "borderBottom", "borderRight", "color",
        "fontFamily", "underline", "fontSize",
        "italic", "bold", "textAlign",
        "verticalAlign", "background", "wrap"
    ];

    var Range = kendo.Class.extend({
        init: function(ref, sheet) {
            this._sheet = sheet;
            this._ref = ref;
        },

        _normalize: function(ref) {
            return this._sheet._grid.normalize(ref);
        },

        _set: function(name, value, parseStrings, recalc) {
            var sheet = this._sheet;
            this._ref.forEach(function(ref) {
                ref = ref.toRangeRef();
                // TODO: update this - should be changed to dependant formula
                if (name == "formula") {
                    sheet._set(ref, "compiledFormula", null);
                }
                sheet._set(ref, name, value, parseStrings);
            });
            sheet.triggerChange({ recalc: name == "formula" || name == "value" });
            return this;
        },

        _get: function(name) {
            return this._sheet._get(this._ref.toRangeRef(), name);
        },

        _property: function(name, value, parseStrings, recalc) {
            if (value === undefined) {
                return this._get(name);
            } else {
                return this._set(name, value, parseStrings, recalc);
            }
        },

        value: function(value, parseStrings) {
            return this._property("value", value, parseStrings, true);
        },

        _editableValue: function(value) {
            if (value !== undefined) {
                if ((/^=/).test(value)) {
                    this.formula(value);
                } else {
                    this._sheet.batch(function() {
                        this.formula(null);
                        this.value(value);
                    }.bind(this), { recalc: true });
                }

                return this;
            } else {
                value = this._get("value");
                var type = typeof value;
                var format = this._get("format");
                var formula = this._get("formula");

                if (formula) {
                    value = formula;
                } else if (format && kendo.spreadsheet.formatting.type(value, format) === "date") {
                    value = kendo.toString(kendo.spreadsheet.numberToDate(value), kendo.culture().calendar.patterns.d);
                } else if (type === "string") {
                    var parsed = kendo.spreadsheet.Sheet.parse(value, true);

                    if (parsed.type === "number") {
                        value = "'" + value;
                    }
                }

                return value;
            }
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

        format: function(value) {
            return this._property("format", value);
        },

        formula: function(value) {
            if (value === null) {
                var sheet = this._sheet;
                sheet.batch(function() {
                    this._property("formula", null);
                    this.value(null);
                }.bind(this), { recalc: true });

                return this;
            }

            return this._property("formula", value, false, true);
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
            }.bind(this), {});

            return this;
        },

        unmerge: function() {
            var mergedCells = this._sheet._mergedCells;

            this._ref.forEach(function(ref) {
                ref.intersecting(mergedCells).forEach(function(mergedRef) {
                    mergedCells.splice(mergedCells.indexOf(mergedRef), 1);
                });
            });

            this._sheet.triggerChange({});

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

            var ref = this._ref.toRangeRef();
            var topLeftRow = ref.topLeft.row;
            var topLeftCol = ref.topLeft.col;
            var bottomRightRow = ref.bottomRight.row;
            var bottomRightCol = ref.bottomRight.col;
            var ci, ri;

            if (values === undefined) {
                values = new Array(ref.height());

                for (var vi = 0; vi < values.length; vi++) {
                    values[vi] = new Array(ref.width());
                }

                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        values[ri - topLeftRow][ci - topLeftCol] = this._sheet._value(ri, ci);
                    }
                }

                return values;
            } else {
                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        var row = values[ri - topLeftRow];

                        if (row) {
                            var value = row[ci - topLeftCol];

                            if (value !== undefined) {
                                this._sheet._value(ri, ci, value);
                            }
                        }
                    }
                }

                this._sheet.triggerChange({ recalc: true });

                return this;
            }
        },

        clear: function(options) {
            var clearAll = !options || !Object.keys(options).length;

            var sheet = this._sheet;

            var reason = {
                recalc: clearAll || (options && options.contentsOnly === true)
            };

            sheet.batch(function() {

                if (reason.recalc) {
                    this.formula(null);
                }

                if (clearAll || (options && options.formatOnly === true)) {
                    styles.forEach(function(x) {
                        this[x](null);
                    }.bind(this));
                    this.format(null);
                    this.unmerge();
                }

            }.bind(this), reason);

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
