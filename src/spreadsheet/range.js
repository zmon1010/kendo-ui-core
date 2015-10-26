(function(f, define){
    define([ "../kendo.core", "../util/text-metrics" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var UnionRef = kendo.spreadsheet.UnionRef;

    var styles = [
        "color", "fontFamily", "underline",
        "italic", "bold", "textAlign",
        "verticalAlign", "background"
    ];

    var borders = {
        borderTop: { complement: "borderBottom", direction: { top: -1, bottom: -1 } },
        borderLeft: { complement: "borderRight", direction: { left: -1, right: -1 } },
        borderRight: { complement: "borderLeft", direction: { left: 1, right: 1 }  },
        borderBottom: { complement: "borderTop", direction: { top: 1, bottom: 1 }  }
    };

    var Range = kendo.Class.extend({
        init: function(ref, sheet) {
            this._sheet = sheet;
            this._ref = ref;
        },

        _normalize: function(ref) {
            return this._sheet._grid.normalize(ref);
        },

        _set: function(name, value, noTrigger) {
            var sheet = this._sheet;
            this._ref.forEach(function(ref) {
                //TODO: set validation formula as OBJECT or JSON STRINGIFY?!!
                sheet._set(ref.toRangeRef(), name, value);
            });
            if (!noTrigger) {
                sheet.triggerChange({
                    recalc : name == "formula" || name == "value" || name == "validation",
                    value  : value,
                    ref    : this._ref
                });
            }
            return this;
        },

        _get: function(name) {
            return this._sheet._get(this._ref.toRangeRef(), name);
        },

        _property: function(name, value) {
            if (value === undefined) {
                return this._get(name);
            } else {
                return this._set(name, value);
            }
        },

        value: function(value) {
            if (value !== undefined) {
                // When value is set through the public API we must clear the
                // formula.  Don't trigger change (third parameter), it'll be
                // done when setting the value below
                this._set("formula", null, true);
            }
            return this._property("value", value);
        },

        resize: function(direction) {
            var ref = this._resizedRef(direction);
            return new Range(ref, this._sheet);
        },

        _resizedRef: function(direction) {
            return this._ref.map(function(ref) {
                return ref.toRangeRef().resize(direction);
            });
        },

        _border: function(property, value) {
            var result;
            var complement = borders[property].complement;
            var direction = borders[property].direction;
            var sheet = this._sheet;

            sheet.batch(function() {
                result = this._property(property, value);

                if (value !== undefined) {
                    this._resizedRef(direction).forEach(function(ref) {
                        if (ref !== kendo.spreadsheet.NULLREF) {
                            new Range(ref, sheet)._property(complement, null);
                        }
                    });
                }
            }.bind(this), {});

            return result;
        },

        _collapsedBorder: function(property) {
            var result = this._property(property);
            var complement = borders[property].complement;
            var direction = borders[property].direction;

            this._resizedRef(direction).forEach(function(ref) {
                if (!result && ref !== kendo.spreadsheet.NULLREF) {
                    var range = new Range(ref, this._sheet);
                    result = range._property(complement);
                }
            }.bind(this));

            return result;
        },

        borderTop: function(value) {
            return this._border("borderTop", value);
        },
        borderRight: function(value) {
            return this._border("borderRight", value);
        },
        borderBottom: function(value) {
            return this._border("borderBottom", value);
        },
        borderLeft: function(value) {
            return this._border("borderLeft", value);
        },

        collapsedBorderTop: function() {
            return this._collapsedBorder("borderTop");
        },
        collapsedBorderRight: function() {
            return this._collapsedBorder("borderRight");
        },
        collapsedBorderBottom: function() {
            return this._collapsedBorder("borderBottom");
        },
        collapsedBorderLeft: function() {
            return this._collapsedBorder("borderLeft");
        },

        input: function(value) {
            if (value !== undefined) {
                var tl = this._ref.toRangeRef().topLeft;
                var x = kendo.spreadsheet.calc.parse(this._sheet.name(), tl.row, tl.col, value);
                this._sheet.batch(function() {
                    var formula = null;
                    if (x.type == "exp") {
                        formula = kendo.spreadsheet.calc.compile(x);
                    } else if (x.type == "date") {
                        this.format(toExcelFormat(kendo.culture().calendar.patterns.d));
                    }
                    this.formula(formula);
                    if (!formula) {
                        // value() will clear the formula.  Lucky for us,
                        // x.value is undefined so it actually won't, but let's
                        // be explicit and only set value if formula is not
                        // present.
                        this.value(x.value);
                    }
                }.bind(this), { recalc: true, value: value, ref: this._ref });

                return this;
            } else {
                value = this._get("value");
                var format = this._get("format");
                var formula = this._get("formula");

                if (formula) {
                    // it's a Formula object which stringifies to the
                    // formula as text (without the starting `=`).
                    value = "=" + formula;
                } else if (format && kendo.spreadsheet.formatting.type(value, format) === "date") {
                    value = kendo.toString(kendo.spreadsheet.numberToDate(value), kendo.culture().calendar.patterns.d);
                } else if (typeof value == "string" &&
                           (/^[=']/.test(value) ||
                            (/^(?:true|false)$/i).test(value) ||
                            looksLikeANumber(value))) {
                    value = "'" + value;
                }

                return value;
            }
        },

        format: function(value) {
            return this._property("format", value);
        },

        formula: function(value) {
            if (value === undefined) {
                var f = this._get("formula");
                return f ? "" + f : null; // stringify if present
            }
            return this._property("formula", value);
        },

        validation: function(value) {
            //TODO: Accept objects only?

            if (value === undefined) {
                var f = this._get("validation");

                return f ? f.toJSON() : null; // stringify if present
            }
            return this._property("validation", value);
        },

        merge: function() {
            this._ref = this._sheet._merge(this._ref);
            return this;
        },

        unmerge: function() {
            var mergedCells = this._sheet._mergedCells;

            this._ref.forEach(function(ref) {
                ref.toRangeRef().intersecting(mergedCells).forEach(function(mergedRef) {
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

        _properties: function(props) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            if (this._ref === kendo.spreadsheet.NULLREF) {
                if (props !== undefined) {
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
            var sheet = this._sheet;

            if (props === undefined) {
                props = new Array(ref.height());
                sheet.forEach(ref, function(row, col, data){
                    row -= topLeftRow;
                    col -= topLeftCol;
                    var line = props[row] || (props[row] = []);
                    line[col] = data;
                });
                return props;
            }
            else {
                var data;
                ref = ref.clone();
                var setProp = function(propName) {
                    var propValue = data[propName];
                    ref.topLeft.row = ref.bottomRight.row = ri;
                    ref.topLeft.col = ref.bottomRight.col = ci;
                    sheet._set(ref, propName, propValue);
                };
                for (ci = topLeftCol; ci <= bottomRightCol; ci ++) {
                    for (ri = topLeftRow; ri <= bottomRightRow; ri ++) {
                        var row = props[ri - topLeftRow];
                        if (row) {
                            data = row[ci - topLeftCol];
                            if (data) {
                                Object.keys(data).forEach(setProp);
                            }
                        }
                    }
                }
                sheet.triggerChange({ recalc: true });
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
                    this.validation(null);
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

        isSortable: function() {
            return !(this._ref instanceof UnionRef || this._ref === kendo.spreadsheet.NULLREF);
        },

        sort: function(spec) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            if (this._ref === kendo.spreadsheet.NULLREF) {
                throw new Error("Unsupported for NULLREF.");
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

        isFilterable: function() {
            return !(this._ref instanceof UnionRef);
        },

        filter: function(spec) {
            if (this._ref instanceof UnionRef) {
                throw new Error("Unsupported for multiple ranges.");
            }

            if (spec === false) {
                this.clearFilters();
            } else {
                spec = spec === true ? [] : spec instanceof Array ? spec : [spec];

                this._sheet._filterBy(this._ref.toRangeRef(), spec.map(function(spec, index) {
                   return {
                       index: spec.column === undefined ? index : spec.column,
                       filter: spec.filter
                   };
                }));
            }

            return this;
        },

        clearFilter: function(spec) {
            this._sheet.clearFilter(spec);
        },

        clearFilters: function() {
            var filter = this._sheet.filter();
            var spec = [];

            if (filter) {
                for (var i = 0; i < filter.columns.length; i++) {
                    spec.push(i);
                }

                this._sheet.batch(function() {
                    this.clearFilter(spec);
                    this._filter = null;
                }, { layout: true, filter: true });
            }
        },

        hasFilter: function() {
            var filter = this._sheet.filter();
            return !!filter;
        },

        leftColumn: function() {
            return new Range(this._ref.leftColumn(), this._sheet);
        },

        rightColumn: function() {
            return new Range(this._ref.rightColumn(), this._sheet);
        },

        topRow: function() {
            return new Range(this._ref.topRow(), this._sheet);
        },

        bottomRow: function() {
            return new Range(this._ref.bottomRow(), this._sheet);
        },

        column: function(column) {
            return new Range(this._ref.toColumn(column), this._sheet);
        },

        forEachRow: function(callback) {
            this._ref.forEachRow(function(ref) {
                callback(new Range(ref, this._sheet));
            }.bind(this));
        },

        forEachColumn: function(callback) {
            this._ref.forEachColumn(function(ref) {
                callback(new Range(ref, this._sheet));
            }.bind(this));
        },

        sheet: function() {
            return this._sheet;
        },

        topLeft: function() {
            return this._ref.toRangeRef().topLeft;
        },

        intersectingMerged: function() {
            var sheet = this._sheet;
            var mergedCells = [];

            sheet._mergedCells.forEach(function(ref) {
                if (ref.intersects(this._ref)) {
                    mergedCells.push(ref.toString());
                }
            }.bind(this));

            return mergedCells;
        },

        getState: function(propertyName) {
            var state = {ref: this._ref.first()};
            var properties = [propertyName];
            if (!propertyName) {
                properties = kendo.spreadsheet.ALL_PROPERTIES;
                state.mergedCells = this.intersectingMerged();
            }

            if (propertyName === "border") {
                properties = ["borderLeft", "borderTop", "borderRight", "borderBottom"];
            }

            this.forEachCell(function(row, col, cell) {
                var cellState = state[row + "," + col] = {};

                properties.forEach(function(property) {
                    if (property === "input") {
                        property = "value";
                    }
                    cellState[property] = cell[property] || null;
                });
            });

            return state;
        },

        setState: function(state) {
            var sheet = this._sheet;
            var origin = this._ref.first();
            var rowDelta = state.ref.row - origin.row;
            var colDelta = state.ref.col - origin.col;

            sheet.batch(function() {
                if (state.mergedCells) {
                    this.unmerge();
                }

                this.forEachCell(function(row, col) {
                    var cellState = state[(row + rowDelta)  + "," + (col + colDelta)];
                    var range = sheet.range(row, col);

                    for (var property in cellState) {
                        if (property != "value") {
                            // make sure value comes last (after the loop),
                            // because if we set value here and get get to
                            // formula later and cellState.formula is null,
                            // it'll clear the value.
                            range._set(property, cellState[property]);
                        }
                    }

                    if (!cellState.formula) {
                        // only need to set the value if we don't have a
                        // formula.  Go through the lower level setter rather
                        // than range.value(...), because range.value will clear
                        // the formula!  chicken and egg issues.
                        range._set("value", cellState.value);
                    }
                });

                if (state.mergedCells) {
                    state.mergedCells.forEach(function(merged) {
                        merged = sheet._ref(merged).relative(rowDelta, colDelta, 3);
                        sheet.range(merged).merge();
                    }, this);
                }
            }.bind(this), { recalc: true });
        },

        forEachCell: function(callback) {
            this._ref.forEach(function(ref) {
                this._sheet.forEach(ref.toRangeRef(), callback.bind(this));
            }.bind(this));
        },

        hasValue: function() {
            var result = false;

            this.forEachCell(function(row, col, cell) {
                if (Object.keys(cell).length !== 0) {
                    result = true;
                }
            });

            return result;
        },

        wrap: function(flag) {
            if (flag === undefined) {
                return !!this._property("wrap");
            }

            this.forEachRow(function(range) {
                var maxHeight = range.sheet().rowHeight(range.topLeft().row);

                range.forEachCell(function(row, col, cell) {
                    var width = this._sheet.columnWidth(col);
                    maxHeight = Math.max(maxHeight, kendo.spreadsheet.util.getTextHeight(cell.value, width, cell.fontSize, true));
                });

                range.sheet().rowHeight(range.topLeft().row, maxHeight);
            }.bind(this));

            this._property("wrap", flag);

            return this;
        },

        fontSize: function(size) {
            if (size === undefined) {
                return this._property("fontSize");
            }

            this.forEachRow(function(range) {
                var maxHeight = range.sheet().rowHeight(range.topLeft().row);

                range.forEachCell(function(row, col, cell) {
                    var width = this._sheet.columnWidth(col);
                    maxHeight = Math.max(maxHeight, kendo.spreadsheet.util.getTextHeight(cell.value, width, size, cell.wrap));
                });

                range.sheet().rowHeight(range.topLeft().row, maxHeight);
            }.bind(this));

            this._property("fontSize", size);

            return this;
        }
    });

    // use $.each instead of forEach to work in oldIE
    $.each(styles, function(i, property) {
        Range.prototype[property] = function(value) {
            return this._property(property, value);
        };
    });

    function toExcelFormat(format) {
        return format.replace(/M/g, "m").replace(/'/g, '"').replace(/tt/, "am/pm");
    }

    function looksLikeANumber(str) {
        // XXX: could do with just a regexp instead of calling parse.
        return !(/^=/.test(str)) && kendo.spreadsheet.calc.parse(null, 0, 0, str).type == "number";
    }

    var measureBox = $('<div style="position: absolute !important; top: -4000px !important; height: auto !important;' +
                        'padding: 1px !important; margin: 0 !important; border: 1px solid black !important;' +
                        'line-height: normal !important; visibility: hidden !important;' +
                        'white-space: normal !important; word-break: break-all !important;" />'
                     )[0];

    function getTextHeight(text, width, fontSize, wrap) {
        var styles = {
            "baselineMarkerSize" : 0,
            "width" : width + "px",
            "font-size" : (fontSize || 12) + "px",
            "word-break" : (wrap === true) ? "break-all" : "normal"
        };

        return kendo.util.measureText(text, styles, measureBox).height;
    }

    kendo.spreadsheet.util = { getTextHeight: getTextHeight };
    kendo.spreadsheet.Range = Range;
})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
