kendo.support.kineticScrollNeeded = true;

var COLUMNS = 1000;
var ROWS = 1000;
var COLUMN_WIDTH = 64;
var ROW_HEIGHT = 20;

function Sheet() {
    this.widths = new kendo.spreadsheet.Axis(COLUMNS, COLUMN_WIDTH);
    this.heights = new kendo.spreadsheet.Axis(ROWS, ROW_HEIGHT);

    this.values = new kendo.spreadsheet.SparseRangeList(0, ROWS * COLUMNS - 1, "");
    this.colors = new kendo.spreadsheet.SparseRangeList(0, ROWS * COLUMNS - 1, "beige");
}

Sheet.prototype.view = function(left, right, top, bottom) {
    return {
        rows: this.heights.visible(top, bottom),
        columns: this.widths.visible(left, right)
    };
}

function HtmlTable(rowHeight, columnWidth) {
    this.rowHeight = rowHeight;
    this.columnWidth = columnWidth;
    this.cols = [];
    this.trs = [];
}

HtmlTable.prototype = {
    addColumn: function(width) {
        this.cols.push(kendo.dom.element("col", { style: { width: width + "px" } }));
    },

    addRow: function(height) {
        var attr = null;

        if (height != this.rowHeight) {
            attr = { style: { height: height + "px" } };
        }

        this.trs.push(kendo.dom.element("tr", attr));
    },

    addCell: function(rowIndex, text, style) {
        this.trs[rowIndex].children.push(kendo.dom.element("td", { style: style }, [ kendo.dom.text(text) ]));
    },

    toDomTree: function(x, y) {
        return kendo.dom.element("table", { style: { left: x + "px", top: y + "px" }},
            [
                kendo.dom.element("colgroup", null, this.cols),
                kendo.dom.element("tbody", null, this.trs)
            ]);
    }
}

function SheetView(wrapper) {
    this.wrapper = wrapper;
    var container = document.getElementById("container");
    var area = document.getElementById("area");

    if (kendo.support.kineticScrollNeeded) {
        area.removeChild(container);
        area.style.position = "relative";
        container = area;
    }

    this.container = container;

    this.tree = new kendo.dom.Tree(this.container);

    this.wrapper.onscroll = this.scroll.bind(this);
}

SheetView.prototype.scroll = function() {
    var top = this.wrapper.scrollTop;
    var bottom = top + this.wrapper.clientHeight;

    if (top < 0) {
        bottom -= top;
        top = 0;
    }

    var left = this.wrapper.scrollLeft;
    var right = left + this.wrapper.clientWidth;

    if (left < 0) {
        right -= left;
        left = 0;
    }

    this.renderAt(left, right, top, bottom);
}

SheetView.prototype.sheet = function(sheet) {
    this._sheet = sheet;
    this.container.style.height = sheet.heights.total + "px";
    this.container.style.width = sheet.widths.total + "px";
}

SheetView.prototype.render = function() {
    this.renderAt(0, this.wrapper.clientWidth, 0, this.wrapper.clientHeight);
}

SheetView.prototype.renderAt = function(left, right, top, bottom) {
    var sheet = this._sheet;
    var view = sheet.view(left, right, top, bottom);
    var rows = view.rows;
    var columns = view.columns;

    var table = new HtmlTable(ROW_HEIGHT, COLUMN_WIDTH);

    for (var ri = rows.start; ri <= rows.end; ri ++) {
        table.addRow(rows.values.at(ri));
    }

    for (ci = columns.start; ci <= columns.end; ci ++) {
        var startCellIndex = ci * ROWS + rows.start;
        var endCellIndex = ci * ROWS + rows.end;

        var values = sheet.values.iterator(startCellIndex, endCellIndex);
        var backgrounds = sheet.colors.iterator(startCellIndex, endCellIndex);

        table.addColumn(columns.values.at(ci));

        for (ri = rows.start; ri <= rows.end; ri ++) {
            var index = ci * ROWS + ri;
            table.addCell(ri - rows.start, values.at(index), { backgroundColor: backgrounds.at(index) } );
        }
    }

    this.tree.render([ table.toDomTree(columns.offset, rows.offset) ]);
}

///////////////////////////////////////////////////////////////////////////////////////////////

var sheet = new Sheet();

for (var i = 0, len = 100; i < len; i++) {
    for (var j = 0, len = 100; j < len; j++) {
        var idx = i * ROWS + j;
        sheet.values.value(idx, idx, ((i + 1)  * (j + 1)));
    }
}

sheet.widths.value(1, 5, 120);
sheet.widths.value(50, 50, 200);
sheet.heights.value(1, 1, 40);
sheet.heights.value(50, 50, 200);

sheet.colors.value(1, 50, "green");

var sheetView = new SheetView(document.getElementById("wrapper"));

sheetView.sheet(sheet);

sheetView.render();

/*
var Area = kendo.spreadsheet.Area;
var Address = kendo.spreadsheet.Address;
var Grid = kendo.spreadsheet.Grid;
var Sorter = kendo.spreadsheet.Sorter;

var grid = new Grid(ROWS, COLUMNS);
var sorter = new Sorter(grid, [ cellValues, colors ]);
*/

