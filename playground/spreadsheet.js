var COLUMNS = 1000;
var ROWS = 1000;
var COLUMN_WIDTH = 64;
var ROW_HEIGHT = 20;

var widths = new kendo.spreadsheet.Axis(COLUMNS, COLUMN_WIDTH);
var heights = new kendo.spreadsheet.Axis(ROWS, ROW_HEIGHT);

var cellValues = new kendo.spreadsheet.SparseRangeList(0, ROWS * COLUMNS - 1, "");
var colors = new kendo.spreadsheet.SparseRangeList(0, ROWS * COLUMNS - 1, "beige");

for (var i = 0, len = 100; i < len; i++) {
    for (var j = 0, len = 100; j < len; j++) {
        var idx = i * ROWS + j;
        cellValues.value(idx, idx, ((i + 1)  * (j + 1)));
    }
}

var Area = kendo.spreadsheet.Area;
var Address = kendo.spreadsheet.Address;
var Grid = kendo.spreadsheet.Grid;
var Sorter = kendo.spreadsheet.Sorter;

var grid = new Grid(ROWS, COLUMNS);
var sorter = new Sorter(grid, [ cellValues, colors ]);

widths.value(1, 5, 120);
widths.value(50, 50, 200);
heights.value(1, 1, 40);
heights.value(50, 50, 200);

colors.value(1, 50, "green");

var wrapper = document.getElementById("wrapper");
var container = document.getElementById("container");
var area = document.getElementById("area");

function cellValue(index) {
    return cellValues.value(index, index);
}

function color(index) {
    return colors.value(index, index);
}

kendo.support.kineticScrollNeeded = true;

if (kendo.support.kineticScrollNeeded) {
    area.removeChild(container);
    area.style.position = "relative";
    container = area;
}


var tree = new kendo.dom.Tree(container);

var scrollBar = kendo.support.scrollbar();

wrapper.onscroll = scroll;

var viewportWidth = wrapper.clientWidth;
var viewportHeight = wrapper.clientHeight;

container.style.height = heights.total + "px";
container.style.width = widths.total + "px";


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

function drawTable(left, right, top, bottom) {
    var visibleRows = heights.visible(top, bottom);
    var visibleColumns = widths.visible(left, right);

    var rowStart = visibleRows.start;
    var rowEnd = visibleRows.end;
    var rowHeights = visibleRows.values;
    var y = - visibleRows.offset;

    var columnStart = visibleColumns.start;
    var columnEnd = visibleColumns.end;
    var columnWidths = visibleColumns.values;
    var x = - visibleColumns.offset;

    var table = new HtmlTable(ROW_HEIGHT, COLUMN_WIDTH);

    if (kendo.support.kineticScrollNeeded) {
        x += left;
        y += top;
    }

    for (var ri = rowStart; ri <= rowEnd; ri ++) {
        table.addRow(rowHeights.at(ri));
    }

    for (ci = columnStart; ci <= columnEnd; ci ++) {
        var startCellIndex = ci * ROWS + rowStart;
        var endCellIndex = ci * ROWS + rowEnd;

        var values = cellValues.iterator(startCellIndex, endCellIndex);
        var backgrounds = colors.iterator(startCellIndex, endCellIndex);

        table.addColumn(columnWidths.at(ci));

        for (ri = rowStart; ri <= rowEnd; ri ++) {
            var index = ci * ROWS + ri;
            table.addCell(ri - rowStart, values.at(index), { backgroundColor: backgrounds.at(index) } );
        }
    }

    tree.render([ table.toDomTree(x, y) ]);
}

drawTable(0, viewportWidth, 0, viewportHeight);

$("button").click(function() {
    var area = new Area(new Address(1, 0), new Address(1, 99));
    console.profile("sort")
    sorter.sortBy(area, cellValues);
    console.profileEnd("sort");
    drawTable(0, viewportWidth, 0, viewportHeight);
});

function scroll() {
    var top = wrapper.scrollTop;
    var bottom = top + viewportHeight;

    if (top < 0) {
        bottom -= top;
        top = 0;
    }

    var left = wrapper.scrollLeft;
    var right = left + viewportWidth;

    if (left < 0) {
        right -= left;
        left = 0;
    }

    drawTable(left, right, top, bottom);
}
