(function(){

var sharedStrings;
var styles;
var borders;

module("Worksheet", {
  setup: function() {
     sharedStrings = {
        uniqueCount: 0,
        count: 0,
        indexes: {}
     };
     styles = [];
     borders = [];
  }
});

function Worksheet(options) {
    options = options || [ { cells: [ { value: "foo" } ] } ];

    if ($.isArray(options)) {
        options = { rows: options };
    }

    return new kendo.ooxml.Worksheet(options, sharedStrings, styles, borders);
}

test("toXML creates a 'c' element for cells", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").length, 1);
});

test("toXML sets the 'r' attribute to the A1 reference of a cell", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("r"), "A1");
});

test("toXML sets the 'r' attribute to the A1 reference of a cell with index", function() {
    var worksheet = Worksheet([{
        cells: [{ index: 4 }]
    }]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("r"), "E1");
});

test("toXML exports only cells with data (mixed)", function() {
    var worksheet = Worksheet([{
        cells: [{ }, { index: 4 }]
    }]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").length, 2);
});

test("toXML exports only cells with data (indexed)", function() {
    var worksheet = Worksheet([{
        cells: [{ index: 1 }, { index: 4 }]
    }]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").length, 2);
});

test("toXML exports only cells with data (indexed on multiple rows)", function() {
    var worksheet = Worksheet([{
        cells: [{ index: 1 }, { index: 2 }]
    }, {
        cells: [{ index: 1 }, { index: 2 }]
    }]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").length, 4);
});

test("toXML exports cells in order (indexed)", function() {
    var worksheet = Worksheet([{
        cells: [{
            index: 2,
            value: 2
        }, {
            index: 4,
            value: 4
        }]
    }]);

    var dom = $(worksheet.toXML());
    var cells = dom.find("c");
    equal(cells.eq(0).attr("r"), "C1");
    equal(cells.eq(1).attr("r"), "E1");
});

test("toXML restarts index", function() {
    var worksheet = Worksheet([{
        cells: [{
            index: 2,
            value: "Bar"
        }, {
            value: "Foo"
        }]
    }]);

    var dom = $(worksheet.toXML());
    var cells = dom.find("c");
    equal(cells.length, 2);
    equal(cells.eq(0).attr("r"), "C1");
    equal(cells.eq(1).attr("r"), "D1");
});

test("toXML sets the tabSelected attribute to 1 if the sheet is first", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML(0));

    equal(dom.find("sheetView").attr("tabSelected"), "1");
});

test("toXML does not set the tabSelected attribute if the sheet is not first", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML(1));

    equal(dom.find("sheetView").attr("tabSelected"), null);
});

test("toXML does not set the tabSelected attribute if the sheet is not first", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML(1));

    equal(dom.find("sheetView").attr("tabSelected"), null);
});

test("toXML sets the showGridLines attribute to 0 if it's false", function() {
    var worksheet = Worksheet({
        showGridLines: false
    });

    var dom = $(worksheet.toXML(0));

    equal(dom.find("sheetView").attr("showGridLines"), "0");
});

test("toXML does not set the showGridLines attribute to 0 if it's true", function() {
    var worksheet = Worksheet({
        showGridLines: true
    });

    var dom = $(worksheet.toXML(0));

    equal(dom.find("sheetView").attr("showGridLines"), null);
});

test("toXML does not set the showGridLines attribute to 0 if it's undefined", function() {
    var worksheet = Worksheet({
    });

    var dom = $(worksheet.toXML(0));

    equal(dom.find("sheetView").attr("showGridLines"), null);
});

test("toXML sets the 'r' attribute to the alphanumeric when index is greater than 26", function() {
    var cells = new Array(27);

    cells.push({})

    var worksheet = Worksheet([ { cells: cells } ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("r"), "AB1");
});

test("toXML skips empty cells", function() {
    var row = new Array(25);

    var worksheet = Worksheet([
        { cells: [,,{}] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").length, 1);
});

test("toXML sets the t attribute to 's' when the value is a string", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("t"), "s");
});

test("toXML doesn't set the 't' attribute the value is a date", function() {
    var worksheet = Worksheet([
        { cells: [{ value: new Date() }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("t"), null);
});

test("toXML sets the 't' attribute to 'n' when the value is a number", function() {
    var worksheet = Worksheet([
        { cells: [{ value: 1 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("t"), "n");
});

test("toXML stores numbers", function() {
    var worksheet = Worksheet([
        { cells: [{ value: 1 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c > v").text(), "1");
});

test("toXML sets the 't' attribute to 'b' when the value is a boolean", function() {
    var worksheet = Worksheet([
        { cells: [{ value: true }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("t"), "b");
});

test("toXML doesn't set the 't' attribute when the value isn't primitive", function() {
    var worksheet = Worksheet([
        { cells: [{ value: {} }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("t"), null);
});

test("toXML doesn't store value that isn't primitive", function() {
    var worksheet = Worksheet([
        { cells: [{ value: {} }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c>v").text(), "");
});

test("toXML stores 'true' as '1'", function() {
    var worksheet = Worksheet([
        { cells: [{ value: true }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").text(), "1");
});

test("toXML stores 'false' as '0'", function() {
    var worksheet = Worksheet([
        { cells: [{ value: false }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").text(), "0");
});

test("toXML sets the 's' attribute of dates", function() {
    var worksheet = Worksheet([
        { cells: [{ value: new Date() }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("s"), "1");
});

test("toXML stores dates as offsets from epoch", function() {
    // see http://xlsxwriter.readthedocs.org/en/latest/working_with_dates_and_time.html
    var date = new Date(2013, 0, 1, 12, 0);

    var worksheet = Worksheet([
        { cells: [{ value: date }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c > v").text(), "41275.5");
});

tzTest("Pacific", "toXML stores dates as offsets from epoch (PDT)", function() {
    var date = new Date("2015/11/01");
    var worksheet = Worksheet([
        { cells: [{ value: date }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c > v").text(), "42309");
});

tzTest("Pacific", "toXML stores dates as offsets from epoch (PDT -> PST transition)", function() {
    var date = new Date("2015/11/01 02:15:00");
    var worksheet = Worksheet([
        { cells: [{ value: date }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c > v").text(), "42309.09375");
});

test("toXML adds strings to sharedStrings", function() {
    var worksheet = Worksheet();

    worksheet.toXML();

    equal(sharedStrings.indexes["$foo"], 0);
});

test("toXML increments count of sharedStrings", function() {
    var worksheet = Worksheet();

    worksheet.toXML();

    equal(sharedStrings.count, 1);
});

test("toXML increments uniqueCount of sharedStrings", function() {
    var worksheet = Worksheet();

    worksheet.toXML();

    equal(sharedStrings.uniqueCount, 1);
});

test("toXML increments shared string count when existing value is used", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo"}, { value: "foo" } ]  }
    ]);

    worksheet.toXML();

    equal(sharedStrings.count, 2);
});

test("toXML doesn't increment uniqueCount when existing value is used", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo"}, { value: "foo" } ]  }
    ]);

    worksheet.toXML();

    equal(sharedStrings.uniqueCount, 1);
});

test("toXML creates a new shared string", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo"}, { value: "bar" } ]  }
    ]);

    worksheet.toXML();

    equal(sharedStrings.uniqueCount, 2);
    equal(sharedStrings.count, 2);
    equal(sharedStrings.indexes["$bar"], 1);
});

test("toXML creates a 'v' element for the value", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").children("v").length, 1);
});

test("toXML creates a 'f' element for the formula", function() {
    var worksheet = Worksheet([
        { cells: [{ value: 0, formula: "SUM(A1:A10)" }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").children("f").text(), "SUM(A1:A10)");
});

test("toXML uses the shared string index as the toXML value", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").children("v").text(), sharedStrings.indexes["$foo"]);
});

test("keeps the order of strings when numberic values are stored as strings", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo"}, { value: "0" } ]  }
    ]);

    worksheet.toXML();

    for (var index in sharedStrings.indexes) {
        equal(index, "$foo");
        break;
    }
});

test("toXML creates a 'row' element", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("> sheetData > row").length, 1);
});

test("toXML sets the 'r' attribute", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("r"), "1");
});

test("toXML sets the 'r' attribute to index plus one", function() {
    var worksheet = Worksheet({
        rows: [{
            height: 100,
            cells: [],
            index: 1
        }]
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("r"), "2");
});

test("toXML exports rows in order (indexed)", function() {
    var worksheet = Worksheet({
        rows: [{
            height: 100,
            cells: [],
            index: 1
        }, {
            height: 100,
            cells: [],
            index: 0
        }]
    });

    var dom = $(worksheet.toXML());
    var cells = dom.find("row");
    equal(cells.eq(0).attr("r"), "1");
    equal(cells.eq(1).attr("r"), "2");
});

test("toXML sets the 'ht' attribute to the row height", function() {
    var worksheet = Worksheet({
        rows: [{
            height: 100,
            cells: []
        }]
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("ht"), "75");
});

test("toXML does not set the 'ht' attribute if the row has no height set", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("ht"), null);
});

test("toXML sets the 'customHeight' attribute if row height is set", function() {
    var worksheet = Worksheet({
        rows: [{
            height: 100,
            cells: []
        }]
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("customHeight"), "1");
});

test("toXML does not set the 'customHeight' attribute if row height is not set", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("customHeight"), null);
});

test("toXML renders cells as children elements", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo" }, { value: "bar" } ] }
    ]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c:first v").text(), "0");
    equal(dom.find("c:last v").text(), "1");
});

test("toXML adds styles", function() {
    var worksheet = Worksheet([
        { cells: [ { bold: true, value: "foo" } ] }
    ]);

    worksheet.toXML();

    equal(styles.length, 1);
});

test("toXML sets style index plus one as 's' attribute", function() {
    var worksheet = Worksheet([
        { cells: [ { bold: true, value: "foo" } ] }
    ]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").attr("s"), 1);
});

test("toXML reuses styles", function() {
    var worksheet = Worksheet([
        { cells: [ { italic: true, value: "foo" } ] },
        { cells: [ { bold: true, value: "foo" } ] },
        { cells: [ { bold: true, value: "foo" } ] }
    ]);

    var dom = $(worksheet.toXML());
    equal(dom.find("row:last c:last").attr("s"), 2);
});

test("toXML does not set the 's' attribute if style is not set", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo" } ] }
    ]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").attr("s"), null);
});

test("toXML adds borders", function() {
    var worksheet = Worksheet([
        { cells: [ { borderLeft: { size: 1 }, value: "foo" } ] }
    ]);

    worksheet.toXML();

    equal(borders.length, 1);
});

test("toXML reuses border styles", function() {
    var worksheet = Worksheet([
        { cells: [ { value: "foo" } ] },
        { cells: [ { borderLeft: { size: 1 }, value: "foo" } ] },
        { cells: [ { borderLeft: { size: 1 }, value: "foo" } ] }
    ]);

    var dom = $(worksheet.toXML());
    equal(dom.find("row:last c:last").attr("s"), 1);
});

test("toXML creates a 'pane' element when the freezePane option (legacy) is set", function() {
    var worksheet = Worksheet({
        freezePane: {
            colSplit: 1
        }
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("pane").length, 1);
    equal(dom.find("pane").attr("topLeftCell"), "B1");
});

test("toXML sets the 'xSplit' attribute when the colSplit option (legacy) is set", function() {
    var worksheet = Worksheet({
        freezePane: {
            colSplit: 2
        }
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("pane").attr("xSplit"), 2);
});

test("toXML sets the 'ySplit' attribute when the rowSplit option (legacy) is set", function() {
    var worksheet = Worksheet({
        freezePane: {
            rowSplit: 2
        }
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("pane").attr("ySplit"), 2);
    equal(dom.find("pane").attr("topLeftCell"), "A3");
});

test("toXML creates a 'pane' element when frozenColumns option is set", function() {
    var worksheet = Worksheet({
        frozenColumns: 1
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("pane").length, 1);
    equal(dom.find("pane").attr("topLeftCell"), "B1");
});

test("toXML sets the 'xSplit' attribute when the frozenColumns option is set", function() {
    var worksheet = Worksheet({
        frozenColumns: 2
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("pane").attr("xSplit"), 2);
});

test("toXML sets the 'ySplit' attribute when the frozenRows option is set", function() {
    var worksheet = Worksheet({
        frozenRows: 2
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("pane").attr("ySplit"), 2);
    equal(dom.find("pane").attr("topLeftCell"), "A3");
});

test("toXML does not create empty 'cols' element", function() {
    var worksheet = Worksheet({
        columns: []
    });

    var dom = $(worksheet.toXML());
    equal(dom.find("cols").length, 0);
});

test("toXML creates 'col' element for every item in the columns option that has width set", function() {
    var worksheet = Worksheet({
        columns: [{ width: 10}, { width: 10 }]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(dom.find("col").length, 2);
});

test("toXML sets the 'min' and 'max' attribute of the 'col' element to the column index plus one", function() {
    var worksheet = Worksheet({
        columns: [{ width: 10 }]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(dom.find("col").attr("min"), 1);
    equal(dom.find("col").attr("max"), 1);
});

test("toXML sets the 'min' and 'max' attribute of the 'col' element to explicit column index plus one", function() {
    var worksheet = Worksheet({
        columns: [{ width: 10, index: 4 }]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(dom.find("col").attr("min"), 5);
    equal(dom.find("col").attr("max"), 5);
});

test("toXML sets the 'customWidth' attribute of the 'col' element when width is set", function() {
    var worksheet = Worksheet({
        columns: [{
           width: 1
        }]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(dom.find("col").attr("customWidth"), 1);
});


test("toXML sets the 'width' attribute of the 'col' element according to formula", function() {
// see: http://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column(v=office.14).aspx
// for some reason though subtracting 5 px padding didn't work and we don't do it

    var worksheet = Worksheet({
        columns: [{
           width: 500
        }]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(Math.round(dom.find("col").attr("width")), 71);
});

test("toXML sets the 'defaultColWidth' attribute of the 'sheetFormatPr' element to the default column width", function() {
    var worksheet = Worksheet({
        columns: [{}],
        defaults: {
            columnWidth: 500
        }
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(Math.round(dom.find("sheetFormatPr").attr("defaultColWidth")), 71);
});

test("toXML sets the 'defaultRowHeight' attribute of the 'sheetFormatPr' element to the default row height", function() {
    var worksheet = Worksheet({
        columns: [{}],
        defaults: {
            rowHeight: 100
        }
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(Math.round(dom.find("sheetFormatPr").attr("defaultRowHeight")), 75);
});

test("toXML calculates the 'width' attribute based on string length", function() {
// see: http://msdn.microsoft.com/en-us/library/documentformat.openxml.spreadsheet.column(v=office.14).aspx
// for some reason though subtracting 5 px padding didn't work and we don't do it

    var worksheet = Worksheet({
        columns: [{
           autoWidth: true
        }],
        rows: [
            { cells: [ { value: "foo" }] }
        ]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(Math.round(dom.find("col").attr("width")), 4);
});

test("toXML calculates the 'width' attribute based on formatted string length", function() {
    var worksheet = Worksheet({
        columns: [{
           autoWidth: true
        }],
        rows: [
            { cells: [ { value: 100, format: "$#####.00" }] }
        ]
    });

    var dom = $($.parseXML(worksheet.toXML()));
    equal(Math.round(dom.find("col").attr("width")), 8);
});

test("toXML creates the 'mergeCell' element for cells with colSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").length, 1);
});

test("toXML creates the 'mergeCell' element for cells with rowSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ rowSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").length, 1);
});

test("toXML sets the 'ref' attribute of the 'mergeCell' element for cells with colSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").attr("ref"), "A1:B1");
});

test("toXML sets the 'ref' attribute of the 'mergeCell' element for cells with rowSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ rowSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").attr("ref"), "A1:A2");
});

test("toXML creates the 'mergeCell' element for cells with rowSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ rowSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").length, 1);
});


test("toXML adds extra cells after cell with colSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 3 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").length, 3);
});

test("toXML adds missing cells after cell with rowSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ rowSpan: 3 }, {}] },
        { cells: [ {} ] },
        { cells: [ {} ] }
    ]);

    var dom = $(worksheet.toXML());

    var cells = dom.find("c");
    equal(cells.length, 6);

    var refs = [];
    cells.each(function() {
        refs.push($(this).attr("r"));
    });
    deepEqual(refs, ["A1", "B1", "A2", "B2", "A3", "B3"]);
});

test("toXML creates empty extra cells after cell with colSpan", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c:last").children().length, 0);
});

test("toXML adjusts the ref of cells after colspan", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 3 }, { }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c:last").attr("r"), "D1");
});

test("toXML sets the 'count' attribute of the 'mergeCells' element for colSpans", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 3 }, { }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCells").attr("count"), 1);
});

test("toXML sets the 'count' attribute of the 'mergeCells' element for merged sheet cells", function() {
    var worksheet = Worksheet({
        mergedCells: ["C3:E5"]
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCells").attr("count"), 1);
});

test("toXML creates 'mergeCell' elements for merged sheet cells", function() {
    var worksheet = Worksheet({
        mergedCells: ["C3:E5"]
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").length, 1);
    equal(dom.find("mergeCell").attr("ref"), "C3:E5");
});

test("toXML sets the 'count' attribute of the 'mergeCells' element for spans and mergedCells", function() {
    var worksheet = Worksheet({
        mergedCells: ["C3:E5"],
        rows: [{
            cells: [{ colSpan: 3 }, { }]
        }],
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCells").attr("count"), 2);
});

test("toXML creates 'mergeCell' elements for multiple cells with colSpan attribute", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 3 }, { }, { colSpan: 2}] },
        { cells: [{ colSpan: 3 }, { }, { colSpan: 2}] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").length, 4);
});

test("toXML creates one mergeCell for a cell with both colSpan and rowSpan set", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 2, rowSpan: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("mergeCell").length, 1);
    equal(dom.find("mergeCell").attr("ref"), "A1:B2");
});

test("toXML drops cells overlapping with a colspan", function() {
    var worksheet = Worksheet([
        { cells: [{ colSpan: 3, value: 1 }, { index: 2, value: 2 }] }
    ]);

    var dom = $(worksheet.toXML());

    var cells = dom.find("c");
    equal(cells.length, 3);
    equal(cells.find("v").length, 1);
});

test("toXML drops cells overlapping with a rowspan", function() {
    var worksheet = Worksheet([
        { cells: [{ rowSpan: 3 }] },
        { cells: [{ }]}
    ]);

    var dom = $(worksheet.toXML());

    equal(dom.find("c").length, 3);
});

test("toXML creates 'autoFilter' element when the filter option is set", function() {
    var worksheet = Worksheet({
        columns: [ {}, {}, {} ],
        filter: { from: 1, to: 2 }
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("autoFilter").attr("ref"), "B1:C1");
});

test("toXML creates 'autoFilter' element for the first row if freezePane (legacy) rowSplit is zero", function() {
    var worksheet = Worksheet({
        freezePane: {
            rowSplit: 0
        },
        columns: [ {}, {}, {} ],
        filter: { from: 1, to: 2 }
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("autoFilter").attr("ref"), "B1:C1");
});

test("toXML creates 'autoFilter' element for the last row of the freezed pane (legacy)", function() {
    var worksheet = Worksheet({
        freezePane: {
            rowSplit: 3
        },
        columns: [ {}, {}, {} ],
        filter: { from: 1, to: 2 }
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("autoFilter").attr("ref"), "B3:C3");
});

test("toXML creates 'autoFilter' element for the first row if frozenRows is zero", function() {
    var worksheet = Worksheet({
        frozenRows: 0,
        columns: [ {}, {}, {} ],
        filter: { from: 1, to: 2 }
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("autoFilter").attr("ref"), "B1:C1");
});

test("toXML creates 'autoFilter' element for the last frozen row", function() {
    var worksheet = Worksheet({
        frozenRows: 3,
        columns: [ {}, {}, {} ],
        filter: { from: 1, to: 2 }
    });

    var dom = $(worksheet.toXML());

    equal(dom.find("autoFilter").attr("ref"), "B3:C3");
});

test("toXML offsets cells if first has merged rows", function() {
    var worksheet = Worksheet({
        rows: [ {
            cells: [
                {"value":"","colSpan":2,"rowSpan":2},
                {"value":"dim 0","colSpan":1,"rowSpan":1}
            ]
        }, {
            cells: [
                {"value":"dim 0_1","colSpan":1,"rowSpan":1}
            ]
        } ]
    });

    var xml = worksheet.toXML();
    var dom = $(xml);
    var cell1 = dom.find("row:eq(1) > c:eq(0)");
    var cell2 = dom.find("row:eq(1) > c:eq(1)");
    var cell3 = dom.find("row:eq(1) > c:eq(2)");

    equal(cell1.attr("r"), "A2");
    equal(cell1.find("v").length, 0);

    equal(cell2.attr("r"), "B2");
    equal(cell2.find("v").length, 0);

    equal(cell3.attr("r"), "C2");
    equal(cell3.find("v").text(), "2");
});

test("toXML offsets cells if second cell is merged in 3 rows", function() {
    var worksheet = Worksheet({
        rows: [ {
            cells: [
                { "value":"cell 0", "colSpan":1, "rowSpan":1 },
                { "value":"cell 1", "colSpan":1, "rowSpan":3 },
                { "value":"cell 2", "colSpan":1, "rowSpan":1 }
            ]
        }, {
            cells: [
                { "value":"cell 0_1", "colSpan":1, "rowSpan":1 },
                { "value":"cell 2_1", "colSpan":1, "rowSpan":1 }
            ]
        }, {
            cells: [
                { "value":"cell 0_2", "colSpan":1, "rowSpan":1 },
                { "value":"cell 2_2", "colSpan":1, "rowSpan":1 }
            ]
        } ]
    });

    var dom = $(worksheet.toXML());
    var cell0_1 = dom.find("row:eq(1) > c:eq(0)");
    var cell1_1 = dom.find("row:eq(1) > c:eq(1)");
    var cell2_1 = dom.find("row:eq(1) > c:eq(2)");

    equal(cell0_1.attr("r"), "A2");
    equal(cell1_1.attr("r"), "B2");
    equal(cell1_1.find("v").length, 0);
    equal(cell2_1.attr("r"), "C2");

    var cell0_2 = dom.find("row:eq(2) > c:eq(0)");
    var cell1_2 = dom.find("row:eq(2) > c:eq(1)");
    var cell2_2 = dom.find("row:eq(2) > c:eq(2)");

    equal(cell0_2.attr("r"), "A3");
    equal(cell1_2.attr("r"), "B3");
    equal(cell1_2.find("v").length, 0);
    equal(cell2_2.attr("r"), "C3");

    var mergeCell = dom.find("mergeCell");

    equal(mergeCell.eq(0).attr("ref"), "B1:B3");
});


test("toXML renders third level cells after second cell is merged in 2 rows", function() {
    var worksheet = Worksheet({
        rows: [ {
            cells: [
                { "value":"cell 0", "colSpan":1, "rowSpan":1 },
                { "value":"cell 1", "colSpan":1, "rowSpan":2 },
                { "value":"cell 2", "colSpan":1, "rowSpan":1 }
            ]
        }, {
            cells: [
                { "value":"cell 0_1", "colSpan":1, "rowSpan":1 },
                { "value":"cell 2_1", "colSpan":1, "rowSpan":1 }
            ]
        }, {
            cells: [
                { "value":"cell 0_2", "colSpan":1, "rowSpan":1 },
                { "value":"cell 1_2", "colSpan":1, "rowSpan":1 },
                { "value":"cell 2_2", "colSpan":1, "rowSpan":1 }
            ]
        } ]
    });

    var dom = $(worksheet.toXML());
    var cell0_1 = dom.find("row:eq(1) > c:eq(0)");
    var cell1_1 = dom.find("row:eq(1) > c:eq(1)");
    var cell2_1 = dom.find("row:eq(1) > c:eq(2)");

    equal(cell0_1.attr("r"), "A2");
    equal(cell1_1.attr("r"), "B2");
    equal(cell2_1.attr("r"), "C2");

    var cell0_2 = dom.find("row:eq(2) > c:eq(0)");
    var cell1_2 = dom.find("row:eq(2) > c:eq(1)");
    var cell2_2 = dom.find("row:eq(2) > c:eq(2)");

    equal(cell0_2.attr("r"), "A3");
    equal(cell1_2.attr("r"), "B3");
    equal(cell2_2.attr("r"), "C3");

    var mergeCell = dom.find("mergeCell");
    equal(mergeCell.eq(0).attr("ref"), "B1:B2");
});

test("toXML merges cells when render multiline row headers", function() {
    var worksheet = Worksheet({
        rows: [
            {
                "cells":[
                    {"value":"row 0","colSpan":1,"rowSpan":2},
                    {"value":"row 0_1","colSpan":1,"rowSpan":1},
                    {"value":"row 0_2","colSpan":1,"rowSpan":1}
                ]
            }, {
                "cells":[
                    {"value":"row 0_1","colSpan":2,"rowSpan":1}
                ]
            }, {
                "cells":[
                    {"value":"row 0","colSpan":3,"rowSpan":1}
                ]
            }
        ]
    });

    var dom = $(worksheet.toXML());

    var mergeCell = dom.find("mergeCell");

    equal(mergeCell.length, 3);
    equal(mergeCell.eq(0).attr("ref"), "A1:A2");
    equal(mergeCell.eq(1).attr("ref"), "B2:C2");
    equal(mergeCell.eq(2).attr("ref"), "A3:C3");
});

test("toXML outputs cells with correct value when render multiline row headers", function() {
    var worksheet = Worksheet({
        rows: [
            {
                "cells":[
                    {"value":"row 0","colSpan":1,"rowSpan":2},
                    {"value":"row 0_1","colSpan":1,"rowSpan":1},
                    {"value":"row 0_2","colSpan":1,"rowSpan":1}
                ]
            }, {
                "cells":[
                    {"value":"row 0_1","colSpan":2,"rowSpan":1}
                ]
            }, {
                "cells":[
                    {"value":"row 0","colSpan":3,"rowSpan":1}
                ]
            }
        ]
    });

    var dom = $(worksheet.toXML());

    var rows = dom.find("row");
    var row1_cells = rows.eq(0).find("c");

    equal(row1_cells.eq(0).attr("r"), "A1")
    equal(row1_cells.eq(0).find("v").text(), 0);

    equal(row1_cells.eq(1).attr("r"), "B1")
    equal(row1_cells.eq(1).find("v").text(), 1);

    equal(row1_cells.eq(2).attr("r"), "C1")
    equal(row1_cells.eq(2).find("v").text(), 2);

    var row2_cells = rows.eq(1).find("c");

    equal(row2_cells.eq(0).attr("r"), "A2")
    equal(row2_cells.eq(0).find("v").length, 0);

    equal(row2_cells.eq(1).attr("r"), "B2")
    equal(row2_cells.eq(1).find("v").text(), "1");

    equal(row2_cells.eq(2).attr("r"), "C2")
    equal(row2_cells.eq(2).find("v").length, 0);

    var row3_cells = rows.eq(2).find("c");

    equal(row3_cells.eq(0).attr("r"), "A3")
    equal(row3_cells.eq(0).find("v").text(), "0");

    equal(row3_cells.eq(1).attr("r"), "B3")
    equal(row3_cells.eq(1).find("v").length, 0);

    equal(row3_cells.eq(2).attr("r"), "C3")
    equal(row3_cells.eq(2).find("v").length, 0);
});

test("toXML outputs data cells correctly when render multiline row and column headers", function() {
    var worksheet = Worksheet({
        rows: [
            {
                "cells":[
                    {"value":"","colSpan":3,"rowSpan":2},
                    {"value":"col 0","colSpan":1,"rowSpan":1},
                    {"value":"col 0","colSpan":1,"rowSpan":2}
                ]
            },
            {
                "cells":[
                    {"value":"col 0_1","colSpan":1,"rowSpan":1}
                ]
            },
            {
                "cells":[
                    {"value":"row 0","colSpan":1,"rowSpan":2},
                    {"value":"row 0_1","colSpan":1,"rowSpan":1},
                    {"value":"row 0_2","colSpan":1,"rowSpan":1},
                    {"value":"1","colSpan":1,"rowSpan":1},
                    {"value":"2","colSpan":1,"rowSpan":1}
                ]
            }, {
                "cells":[
                    {"value":"row 0_1","colSpan":2,"rowSpan":1},
                    {"value":"1","colSpan":1,"rowSpan":1},
                    {"value":"2","colSpan":1,"rowSpan":1}
                ]
            }, {
                "cells":[
                    {"value":"row 0","colSpan":3,"rowSpan":1},
                    {"value":"1","colSpan":1,"rowSpan":1},
                    {"value":"2","colSpan":1,"rowSpan":1}
                ]
            }
        ]
    });

    var dom = $(worksheet.toXML());

    var rows = dom.find("row");
    var data1_cells = rows.eq(2).find("c");
    var data2_cells = rows.eq(3).find("c");
    var data3_cells = rows.eq(4).find("c");

    equal(data1_cells.length, 5);
    equal(data1_cells.eq(3).attr("r"), "D3")
    equal(data1_cells.eq(3).find("v").length, 1);

    equal(data1_cells.eq(4).attr("r"), "E3")
    equal(data1_cells.eq(4).find("v").length, 1);

    equal(data2_cells.length, 5);
    equal(data2_cells.eq(3).attr("r"), "D4")
    equal(data2_cells.eq(3).find("v").length, 1);

    equal(data2_cells.eq(4).attr("r"), "E4")
    equal(data2_cells.eq(4).find("v").length, 1);

    equal(data3_cells.length, 5);
    equal(data3_cells.eq(3).attr("r"), "D5")
    equal(data3_cells.eq(3).find("v").length, 1);

    equal(data3_cells.eq(4).attr("r"), "E5")
    equal(data3_cells.eq(4).find("v").length, 1);
});

test("toXML outputs empty data cells for continues cells with rowSpan", function() {
    var worksheet = Worksheet({
        rows: [
            {
                "cells": [
                    {"background":"#7a7a7a","color":"#fff","value":"","colSpan":4,"rowSpan":1},
                    {"background":"#7a7a7a","color":"#fff","value":"dim 0","colSpan":1,"rowSpan":1}
                ],
                "type":"header"
            }, {
                "cells": [
                    {"background":"#7a7a7a","color":"#fff","value":"dim 0","colSpan":1,"rowSpan":1},
                    {"background":"#7a7a7a","color":"#fff","value":"dim 0_1","colSpan":1,"rowSpan":1},
                    {"background":"#7a7a7a","color":"#fff","value":"dim 1","colSpan":2,"rowSpan":1},
                    {"background":"#dfdfdf","color":"#333","value":"2","colSpan":1,"rowSpan":1}
                ],
                "type":"data"
            }, {
                "cells": [
                    {"background":"#7a7a7a","color":"#fff","value":"dim 0","colSpan":2,"rowSpan":3},
                    {"background":"#7a7a7a","color":"#fff","value":"dim 1","colSpan":1,"rowSpan":2},
                    {"background":"#7a7a7a","color":"#fff","value":"dim 1_1","colSpan":1,"rowSpan":1},
                    {"background":"#dfdfdf","color":"#333","value":"3","colSpan":1,"rowSpan":1}
                ],
                "type": "data"
            }, {
                "cells": [
                    {"background":"#7a7a7a","color":"#fff","value":"dim 1_2","colSpan":1,"rowSpan":1},
                    {"background":"#dfdfdf","color":"#333","value":"4","colSpan":1,"rowSpan":1}
                ],
                "type": "data"
            }, {
                "cells": [
                    {"background":"#7a7a7a","color":"#fff","value":"dim 1","colSpan":2,"rowSpan":1},
                    {"background":"#dfdfdf","color":"#333","value":"1","colSpan":1,"rowSpan":1}
                ],
                "type":"data"
            }
        ]
    });

    var dom = $(worksheet.toXML());

    var rows = dom.find("row");
    var cells = rows.eq(3).find("c");

    equal(cells.length, 5);
    equal(cells.eq(0).attr("r"), "A4")
    equal(cells.eq(0).find("v").length, 0);

    equal(cells.eq(1).attr("r"), "B4")
    equal(cells.eq(1).find("v").length, 0);

    equal(cells.eq(2).attr("r"), "C4")
    equal(cells.eq(2).find("v").length, 0);

    equal(cells.eq(3).attr("r"), "D4")
    equal(cells.eq(3).find("v").length, 1);

    equal(cells.eq(4).attr("r"), "E4")
    equal(cells.eq(4).find("v").length, 1);
});

test("toXML has no side effects", function() {
    var worksheet = Worksheet({
        rows: [{
            cells: [{ colSpan: 4, rowSpan: 2 },
                    { colSpan: 1, rowSpan: 1 }]
        }]
    });

    equal(worksheet.toXML(), worksheet.toXML());
});

test("toXML serializes hyperlinks in sheet", function() {
    var worksheet = Worksheet({
        hyperlinks: [
            { ref: "A1", target: "http://example.com/foo" },
            { ref: "B1", target: "http://example.com/bar" }
        ],
        rows: [{
            cells: [{
                value: "foo"
            }, {
                value: "bar"
            }],
        }]
    });

    var dom = $(worksheet.toXML());
    var hyperlinks = dom.find("hyperlink");

    equal(dom.find("hyperlinks").length, 1);
    equal(hyperlinks.length, 2);
    equal(hyperlinks.eq(0).attr("ref"), "A1");
    equal(hyperlinks.eq(0).attr("r:id"), "rId0");
    equal(hyperlinks.eq(1).attr("ref"), "B1");
    equal(hyperlinks.eq(1).attr("r:id"), "rId1");
});

test("relsToXML serializes sheet hyperlinks", function() {
    var worksheet = Worksheet({
        hyperlinks: [
            { ref: "A1", target: "http://example.com/foo" },
            { ref: "B1", target: "http://example.com/bar" }
        ],
        rows: [{
            cells: [{
                value: "foo"
            }, {
                value: "bar"
            }],
        }]
    });

    var dom = $(worksheet.relsToXML());
    var rels = dom.find("Relationship");

    equal(rels.length, 2);
    equal(rels.eq(0).attr("Target"), "http://example.com/foo");
    equal(rels.eq(1).attr("Target"), "http://example.com/bar");
});

}());
