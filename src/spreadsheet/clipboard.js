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
            var content = {ref:  new CellRef(0,0,0), mergedCells: []};
            var clipboard = this;
            if(data.html) {
                var doc = clipboard.iframe.contentWindow.document;
                doc.open();
                doc.write(data.html);
                doc.close();
                var table = $(doc).find("table:first");
                if(table.length) {
                    var tbody = table.find("tbody:first");
                    tbody.find("tr").each(function(rowIndex, tr) {
                        $(tr).find("td").each(function(colIndex, td) {
                            var key = rowIndex + "," + colIndex;
                            var rowspan = parseInt($(td).attr("rowspan"), 10) -1 || 0;
                            var colspan = parseInt($(td).attr("colspan"), 10) -1 || 0;
                            var cellState = clipboard._populateCell($(td));
                            content[key] = cellState;
                            if(rowspan || colspan) {
                                var startCol = String.fromCharCode(65 + colIndex);
                                var endCol = String.fromCharCode(65 + colIndex + colspan);
                                var address = startCol + (rowIndex + 1) + ":" + endCol + (rowIndex + 1 + rowspan);
                                content.mergedCells.push(address);

                                for(var ri = 0; ri <= rowspan; ri++) {
                                    for(var ci = 0; ci <= colspan; ci++) {
                                        content[(rowIndex + ri) + "," + (colIndex + ci)] = cellState;
                                    }
                                }
                            }
                        });
                    });
                } else {
                    var element = $(doc.body).find(":not(style)");
                    content["0,0"] = clipboard._populateCell(element);
                }
            }else{
                content["0,0"] = {
                    value: data.plain
                };
            }
            return content;
        },

        _isInternal: function() {
            if(this._external.html === undefined) {
                return true;
            }
            return $("<div/>").html(this._external.html).find('table.kendo-clipboard').length ? true : false;
        },

        _populateCell: function(element) {
            var styles = window.getComputedStyle(element[0]);
            var text = element.text();
            var borders = this._borderObject(styles);

            return {
                value: text === "" ? null : text,
                format : null,
                background : styles["background-color"],
                borderBottom : borders.borderBottom,
                borderRight : borders.borderRight,
                borderLeft : borders.borderLeft,
                borderTop : borders.borderTop,
                color : styles["color"], // jshint ignore:line
                fontFamily : styles["font-family"],
                underline : styles["text-decoration"] == "underline" ? true : null,
                fontSize : styles["font-size"],
                italic : styles["font-style"] == "italic" ? true : null,
                bold : styles["font-weight"] == "bold" ? true : null,
                textAlign : this._strippedStyle(styles["text-align"]),
                verticalAlign : styles["vertical-align"],
                wrap : styles["word-wrap"] != "normal" ? true : null
            };
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
