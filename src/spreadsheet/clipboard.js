(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var RangeRef = kendo.spreadsheet.RangeRef;
    var CellRef = kendo.spreadsheet.CellRef;

    var Clipboard = kendo.Class.extend({
        init: function(workbook) {
            this.workbook = workbook;
            this.origin = kendo.spreadsheet.NULLREF;
            this.iframe = document.createElement("iframe");
            this.iframe.className = "k-spreadsheet-clipboard-paste";
            this._external = {};
            this._uid = kendo.guid();
            document.body.appendChild(this.iframe);
        },

        canCopy: function() {
            var selection = this.workbook.activeSheet().select();
            if (selection === kendo.spreadsheet.NULLREF) {
                return false;
            }
            if (selection instanceof kendo.spreadsheet.UnionRef) {
                return false;
            }
            return true;
        },

        canPaste: function() {
            var sheet = this.workbook.activeSheet();
            var ref = this.pasteRef();
            if(ref === kendo.spreadsheet.NULLREF) {
                return this._external.hasOwnProperty("html") || this._external.hasOwnProperty("plain");
            }
            return ref.eq(sheet.unionWithMerged(ref));
        },

        copy: function() {
            var sheet = this.workbook.activeSheet();
            this.origin = sheet.select();
            this.contents = sheet.selection().getState();
        },

        cut: function() {
            var sheet = this.workbook.activeSheet();
            this.copy();
            sheet.range(sheet.select()).clear();
        },

        pasteRef: function() {
            var sheet = this.workbook.activeSheet();
            var destination = sheet.activeCell().first();
            var originActiveCell = this.origin.first();
            var rowDelta = originActiveCell.row - destination.row;
            var colDelta = originActiveCell.col - destination.col;

            return this.origin.relative(rowDelta, colDelta, 3);
        },

        destroy: function() {
            document.body.removeChild(this.iframe);
        },

        paste: function() {
            var content = {};
            var sheet = this.workbook.activeSheet();
            if(this._isInternal()) {
                content = this.contents;
            }else{
                var rows = [];
                var cols = [];
                content = this.parse(this._external);
                for (var key in content) {
                    if(key === "mergedCells" || key === "ref") {
                        continue;
                    }
                    var address = key.split(",");
                    rows.push(address[0]);
                    cols.push(address[1]);
                }
                var topLeft = new CellRef(Math.min.apply(null, rows), Math.min.apply(null, cols));
                var bottomRight = new CellRef(Math.max.apply(null, rows), Math.max.apply(null, cols));
                this.origin = new RangeRef(topLeft, bottomRight, 0);
            }
            var pasteRef = this.pasteRef();
            sheet.range(pasteRef).clear().setState(content);
            sheet.triggerChange({recalc: true});

        },

        external: function(data) {
            if(data.html || data.plain){
                this._external = data;
            }else{
                return this._external;
            }
        },

        parse: function(data) {
            var state = {ref:  new CellRef(0,0,0), mergedCells: []};
            if(data.html) {
                var doc = this.iframe.contentWindow.document;
                doc.open();
                doc.write(data.html);
                doc.close();
                var table = $(doc).find("table:first");
                if(table.length) {
                    state = this._parseHTML(table.find("tbody:first"));
                } else {
                    if (!data.plain) {
                        var element = $(doc.body).find(":not(style)");
                        state["0,0"] = this._cellState(element.text());
                    } else {
                        state = this._parseTSV(data.plain);
                    }
                }
            } else {
                state = this._parseTSV(data.plain);
            }
            return state;
        },

        _parseHTML: function(tbody) {
            var that = this;
            var state = {ref:  new CellRef(0,0,0), mergedCells: []};
            tbody.find("tr").each(function(rowIndex, tr) {
                $(tr).find("td").each(function(colIndex, td) {
                    var key = rowIndex + "," + colIndex;
                    var rowspan = parseInt($(td).attr("rowspan"), 10) -1 || 0;
                    var colspan = parseInt($(td).attr("colspan"), 10) -1 || 0;
                    var cellState = that._cellState($(td));

                    state[key] = cellState;

                    if(rowspan || colspan) {
                        var startCol = String.fromCharCode(65 + colIndex);
                        var endCol = String.fromCharCode(65 + colIndex + colspan);
                        var address = startCol + (rowIndex + 1) + ":" + endCol + (rowIndex + 1 + rowspan);

                        state.mergedCells.push(address);

                        for(var ri = 0; ri <= rowspan; ri++) {
                            for(var ci = 0; ci <= colspan; ci++) {
                                state[(rowIndex + ri) + "," + (colIndex + ci)] = cellState;
                            }
                        }
                    }
                });
            });
            return state;
        },

        _parseTSV: function(data) {
            var state = {ref:  new CellRef(0,0,0), mergedCells: []};
            if(data.indexOf("\t") === -1 && data.indexOf("\n") == -1) {
                state["0,0"] = {
                    value: data
                };
            } else {
                var rows = data.split("\n");
                for(var ri = 0; ri < rows.length; ri++) {
                    var cols = rows[ri].split("\t");
                    for(var ci = 0; ci < cols.length; ci++) {
                        state[ri + "," + ci] = {value: cols[ci]};
                    }
                }
            }
            return state;
        },

        _isInternal: function() {
            if(this._external.html === undefined) {
                return true;
            }
            return $("<div/>").html(this._external.html).find("table.kendo-clipboard-"+ this._uid).length ? true : false;
        },

        _cellState: function(element) {
            var styles = window.getComputedStyle(element[0]);
            var text = element.text();
            var borders = this._borderObject(styles);
            var state = {
                value: text === "" ? null : text,
                borderBottom : borders.borderBottom,
                borderRight : borders.borderRight,
                borderLeft : borders.borderLeft,
                borderTop : borders.borderTop,
                fontSize : parseInt(styles["font-size"], 10)
            };

            if(styles["background-color"] !== "rgb(0, 0, 0)" && styles["background-color"] !== "rgba(0, 0, 0, 0)") {
                state.background = styles["background-color"];
            }
            if(styles.color !== "rgb(0, 0, 0)" && styles.color !== "rgba(0, 0, 0, 0)") {
                state.color = styles.color;
            }
            if(styles["text-decoration"] == "underline") {
                state.underline = true;
            }
            if(styles["font-style"] == "italic") {
                state.italic = true;
            }
            if(styles["font-weight"] == "bold") {
                state.bold = true;
            }
            if(this._strippedStyle(styles["text-align"]) !== "right") {
                state.textAlign = this._strippedStyle(styles["text-align"]);
            }
            if(styles["vertical-align"] !== "middle") {
                state.verticalAlign = styles["vertical-align"];
            }
            if(styles["word-wrap"] !== "normal" ) {
                state.wrap = true;
            }

            return state;
        },

        _strippedStyle: function(style) {
            var prefixes = [
                "-ms-",
                "-moz-",
                "-webkit-"
            ];

            prefixes.forEach(function(prefix) {
                style = style.replace(prefix, "");
            });
            return style;
        },

        _borderObject: function(styles) {
            var borderObject = {};
            var borders = [
                "borderBottom",
                "borderRight",
                "borderLeft",
                "borderTop"
            ];

            borders.forEach(function(key) {
                if(styles[key + "Style"] == "none") {
                    borderObject[key] = null;
                    return;
                }
                borderObject[key] = {
                    size: "1px",
                    color: styles[key + "Color"]
                };
            });

            return borderObject;
        }
    });
    kendo.spreadsheet.Clipboard = Clipboard;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
