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
                return this._external !== undefined;
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

        paste: function() {
            var content = {};
            var sheet = this.workbook.activeSheet();
            if($("<div/>").html(this._external).find("table.kendo-clipboard").length) {
                content = this.contents;
            }else{
                var rows = [];
                var cols = [];
                content = this.parse(this._external);
                for (var key in content) {
                    var address = key.split(",");
                    rows.push(address[0]);
                    cols.push(address[1]);
                }
                var topLeft = new CellRef(Math.min.apply(null, rows), Math.min.apply(null, cols));
                var bottomRight = new CellRef(Math.max.apply(null, rows), Math.max.apply(null, cols));
                this.origin = new RangeRef(topLeft, bottomRight, 0);
                $.extend(true, content, {ref: new CellRef(0,0,0), mergedCells: []});
                this._external = undefined;
            }
            var pasteRef = this.pasteRef();
            sheet.range(pasteRef).clear().setState(content);
            sheet.triggerChange({recalc: true});

        },

        external: function(html) {
            if(html){
                this._external = html;
            }else{
                return this._external;
            }
        },

        parse: function(html) {
            var doc = this.iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
            var table = $(doc).find("table:first");
            if(table.length){
                var tbody = table.find("tbody:first");
                var colgroup = table.find("colgroup:first");
                var contents = {};
                tbody.find("tr").each(function(rowIndex, tr) {
                    $(tr).find("td").each(function(colIndex, td) {
                        var key = rowIndex + "," + colIndex;
                        var styles = window.getComputedStyle(td);
                        contents[key] = {
                            "value" : $(td).text() === "" ? null : $(td).text(),
                            "format" : null,
                            "compiledFormula" : null,
                            "background" : styles["background-color"],
                            "borderBottom" : styles["border-bottom"],
                            "borderRight" : styles["border-right"],
                            "borderLeft" : styles["border-left"],
                            "borderTop" : styles["border-top"],
                            "color" : styles["color"],
                            "fontFamily" : styles["font-family"],
                            "underline" : window.getComputedStyle(td)["text-decoration"] == "underline" ? true : false,
                            "fontSize" : styles["font-size"],
                            "italic" : window.getComputedStyle(td)["font-style"] == "italic" ? true : false,
                            "bold" : window.getComputedStyle(td)["font-weight"] == "bold" ? true : false,
                            "textAlign" : styles["text-align"],
                            "verticalAlign" : styles["vertical-align"],
                            "wrap" : styles["word-wrap"]
                        };
                    });
                });
                return contents;
            }
            return html;
        }
    });

    kendo.spreadsheet.Clipboard = Clipboard;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
