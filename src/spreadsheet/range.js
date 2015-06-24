(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var UnionRef = kendo.spreadsheet.UnionRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var Range = kendo.Class.extend({
        init: function(ref, sheet) {
            this._sheet = sheet;
            this._ref = ref;
        },
        _property: function(list, value) {
            if (value !== undefined) {
                this._ref.forEach(function(ref) {
                    ref = ref.toRangeRef();

                    for (var ci = ref.topLeft.col; ci <= ref.bottomRight.col; ci++) {
                        var start = this._sheet._grid.index(ref.topLeft.row, ci);
                        var end = this._sheet._grid.index(ref.bottomRight.row, ci);

                        list.value(start, end, value);
                    }
                }.bind(this));

                this._sheet.triggerChange();

                return this;
            } else {
                var index = this._sheet._grid.cellRefIndex(this._ref.toRangeRef().topLeft);
                return list.value(index, index);
            }
        },
        _styleProperty: function(name, value) {
            var style = this._style();

            if (style === null) {
                style = {};
            }

            if (value !== undefined) {

                if (value === null) {
                    delete style[name];
                } else {
                    style[name] = value;
                }

                this._style(style);

                return this;
            }

            return style[name];

        },
        value: function(value) {
            return this._property(this._sheet._values, value);
        },
        fontColor: function(value) {
            return this._styleProperty("fontColor", value);
        },
        fontFamily: function(value) {
            return this._styleProperty("fontFamily", value);
        },
        fontLine: function(value) {
            return this._styleProperty("fontLine", value);
        },
        fontSize: function(value) {
            return this._styleProperty("fontSize", value);
        },
        fontStyle: function(value) {
            return this._styleProperty("fontStyle", value);
        },
        fontWeight: function(value) {
            return this._styleProperty("fontWeight", value);
        },
        horizontalAlignment: function(value) {
            return this._styleProperty("horizontalAlignment", value);
        },
        verticalAlignment: function(value) {
            return this._styleProperty("verticalAlignment", value);
        },
        background: function(value) {
            return this._styleProperty("background", value);
        },
        wrap: function(value) {
            return this._styleProperty("wrap", value);
        },
        _style: function(value) {
            if (value !== undefined) {
                value = JSON.stringify(value);

                if (value === "{}") {
                    value = null;
                }

                return this._property(this._sheet._styles, value);
            }

            return JSON.parse(this._property(this._sheet._styles, value));
        },

        formula: function(value) {
            return this._property(this._sheet._formulas, value);
        },

        format: function(value) {
            return this._property(this._sheet._formats, value);
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

            if (clearAll || (options && options.contentsOnly === true)) {
                this.value(null);
            }

            if (clearAll || (options && options.formatOnly === true)) {
                this._style(null);
            }

            return this;
        },

        clearContent: function() {
            return this.clear({ contentsOnly: true });
        },

        clearFormat: function() {
            return this.clear({ formatOnly: true });
        }
    });

    kendo.spreadsheet.Range = Range;
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
