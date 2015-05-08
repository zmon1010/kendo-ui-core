var COLUMNS = 16384;
var ROWS = 1048576;
var COLUMN_WIDTH = 64;
var ROW_HEIGHT = 20;


var widths = new kendo.spreadsheet.RangeList(0, COLUMNS, COLUMN_WIDTH, true);
var heights = new kendo.spreadsheet.RangeList(0, ROWS, ROW_HEIGHT, true);
var cellValues = new kendo.spreadsheet.SparseRangeList(0, ROWS * COLUMNS - 1, "");
var colors = new kendo.spreadsheet.SparseRangeList(0, ROWS * COLUMNS - 1, "beige");

for (var i = 0, len = 100; i < len; i++) {
    for (var j = 0, len = 100; j < len; j++) {
        var idx = i * ROWS + j;
        cellValues.value(idx, idx, 10000 - ((i + 1)  * (j + 1)));
    }
}

var Area = kendo.spreadsheet.Area;
var Address = kendo.spreadsheet.Address;
var Grid = kendo.spreadsheet.Grid;
var Sorter = kendo.spreadsheet.Sorter;

var grid = new Grid(ROWS, COLUMNS);
var sorter = new Sorter(grid, [ cellValues, colors ]);

$("button").click(function() {
    var area = new Area(new Address(1, 0), new Address(1, 99));
    console.profile("sort")
    sorter.sortBy(area, cellValues);
    console.profileEnd("sort");
    drawTable(0, viewportWidth, 0, viewportHeight);
});

colors.value(1, 50, "green");
widths.value(1, 5, 120);
widths.value(50, 50, 200);

heights.value(1, 1, 40);
heights.value(50, 50, 200);

var wrapper = document.getElementById("wrapper");
var container = document.getElementById("container");
var area = document.getElementById("area");


var viewportWidth = wrapper.clientWidth;
var viewportHeight = wrapper.clientHeight;
container.style.width = viewportWidth + "px";
container.style.height = viewportHeight + "px";

var currentHeight = 0;

var pxHeights = heights.map(function(range) {
    var start = currentHeight;
    currentHeight += (range.end - range.start + 1) * range.value;
    var end = currentHeight - 1;
    return new kendo.spreadsheet.Range(start, end, range);
});

var currentWidth = 0;

var pxWidths = widths.map(function(range) {
    var start = currentWidth;
    currentWidth += (range.end - range.start + 1) * range.value;
    var end = currentWidth - 1;
    return new kendo.spreadsheet.Range(start, end, range);
});

function cellValue(index) {
    return cellValues.value(index, index);
}

function color(index) {
    return colors.value(index, index);
}

var maxWidth = wrapper.scrollWidth - (wrapper.offsetWidth - viewportWidth);
var maxHeight = wrapper.scrollHeight - (wrapper.offsetHeight - viewportHeight);

kendo.support.kineticScrollNeeded = true;

if (kendo.support.kineticScrollNeeded) {
    area.removeChild(container);
    area.style.position = "relative";
    container = area;
}

var tree = new kendo.dom.Tree(container);

function visibleRange(list, start, end, max) {
    var startSegment = null;
    var endSegment = null;
    var lastPage = false

    if (end >= max) {
        lastPage = true;
    }

    var ranges = list.intersecting(start, end);

    startSegment = ranges[0];
    endSegment = ranges[ranges.length - 1];

    var startOffset = start - startSegment.start; // 10px;

    var startIndex = ((startOffset / startSegment.value.value) >> 0) + startSegment.value.start;

    var offset = startOffset - (startIndex - startSegment.value.start) * startSegment.value.value;

    var endOffset = end - endSegment.start;
    var endIndex = ((endOffset / endSegment.value.value) >> 0) + endSegment.value.start;

    if (endIndex > endSegment.value.end) {
        endIndex = endSegment.value.end;
    }

    if (lastPage) {
        offset += endSegment.value.value - (endOffset - (endIndex - endSegment.value.start) * endSegment.value.value);
    }

    return {
        offset: offset,
        start: startIndex,
        end: endIndex
    };
}

wrapper.onscroll = scroll;

var totalHeight = currentHeight - 1;
var totalWidth = currentWidth - 1;

function drawTable(left, right, top, bottom) {
    var rows = visibleRange(pxHeights, top, bottom, maxHeight);
    var columns = visibleRange(pxWidths, left, right, maxWidth);
    var rowStart = rows.start;
    var rowEnd = rows.end;
    var columnStart = columns.start;
    var columnEnd = columns.end;

    var x = - columns.offset - 1;
    var y = - rows.offset - 1;

    if (kendo.support.kineticScrollNeeded) {
        x += left / ((totalWidth - wrapper.clientWidth) / (wrapper.scrollWidth - wrapper.clientWidth));
        y += top / ((totalHeight - wrapper.clientHeight) / (wrapper.scrollHeight - wrapper.clientHeight));
    }

    var cols = [];
    var trs = [];

    var columnWidths = widths.intersecting(columnStart, columnEnd);


    var rowHeights = heights.intersecting(rowStart, rowEnd);

    var rhIndex = 0;

    for (var ri = rowStart; ri <= rowEnd; ri ++) {
        while (rowHeights[rhIndex].end < ri) {
            rhIndex ++;
        }

        var height = rowHeights[rhIndex].value;
        var attr = null;

        if (height != ROW_HEIGHT) {
            attr = { style: { height: height + "px" } };
        }

        trs.push(tree.element("tr", attr));
    }

    var cwIndex = 0;

    for (ci = columnStart; ci <= columnEnd; ci ++) {
        var startCellIndex = ci * ROWS + rowStart;
        var endCellIndex = ci * ROWS + rowEnd;

        var values = cellValues.intersecting(startCellIndex, endCellIndex);
        var backgrounds = colors.intersecting(startCellIndex, endCellIndex);

        var vIndex = 0, bIndex = 0;

        while (columnWidths[cwIndex].end < ci) {
            cwIndex ++;
        }

        cols.push(tree.element("col", { style: { width: columnWidths[cwIndex].value + "px" } }));

        for (ri = rowStart; ri <= rowEnd; ri ++) {
            var index = ci * ROWS + ri;
            var tr = trs[ri - rowStart];
            var td = tree.element("td");
            tr.children.push(td);

            while (values[vIndex].end < index) {
                vIndex ++;
            }

            while (backgrounds[bIndex].end < index) {
                bIndex ++;
            }

            td.children[0] = tree.text(values[vIndex].value);
            td.attr = { style: { backgroundColor: backgrounds[bIndex].value } };
        }
    }

    var tableAttr = {
        style: {}
    };

    tableAttr.style.left = x + "px";
    tableAttr.style.top = y + "px";

    tree.render([
        tree.element("table", tableAttr,
            [
                tree.element("colgroup", null, cols),
                tree.element("tbody", null, trs)
            ])
    ]);
}

drawTable(0, viewportWidth, 0, viewportHeight);

function scroll() {
    var top = Math.floor(wrapper.scrollTop * ((totalHeight - wrapper.clientHeight) / (wrapper.scrollHeight - wrapper.clientHeight)));
    var bottom = top + viewportHeight;

    if (top < 0) {
        bottom -= top;
        top = 0;
    }

    var left = Math.floor(wrapper.scrollLeft * ((totalWidth - wrapper.clientWidth) / (wrapper.scrollWidth - wrapper.clientWidth)));
    var right = left + viewportWidth;

    if (left < 0) {
        right -= left;
        left = 0;
    }

    drawTable(left, right, top, bottom);
}
