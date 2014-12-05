(function(){

var Exporter = kendo.PivotExcelExporter;
var DataSource = kendo.data.PivotDataSource;
var exporter;
var dataSource;

var PivotDataSource = kendo.data.PivotDataSource;
var PivotGrid = kendo.ui.PivotGrid;
var div;

module("PivotGrid Excel export", {
    setup: function() {
        kendo.ns = "kendo-";
        div = document.createElement("div");
        QUnit.fixture[0].appendChild(div);
    },
    teardown: function() {
        var component = $(div).data("kendoPivotGrid");
        if (component) {
            component.destroy();
        }
        kendo.destroy(QUnit.fixture);
        kendo.ns = "";
    }
});

function createPivot(options) {
    options = options || {};

    if (!options.dataSource) {
        options.dataSource = new kendo.data.PivotDataSource({
            schema: {
                axes: function() {
                    return {};
                }
            }
        });
    }

    return new PivotGrid($(div), options);
}

function createDataSource(columns, rows, data, measures) {
    return new PivotDataSource({
        measures: (measures || []).slice(),
        schema: {
            axes: "axes",
            data: "data"
        },
        transport: {
            read: function(options) {
                options.success({
                    axes: {
                        columns: {
                            tuples: (columns || []).slice()
                        },
                        rows: {
                            tuples: (rows || []).slice()
                        }
                    },
                    data: (data || []).slice()
                });
            }
        }
    });
}

function testWorkbook(options, callback) {
    exporter = new Exporter(options);

    exporter.workbook().then(callback);
}

test("Exporter creates columns array with correct length", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 },
        { value: 2 },
        { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, [], data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        equal(book.sheets[0].columns.length, 4);
    });
});

test("Exporter defines columns configuration", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 },
        { value: 2 },
        { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, [], data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var columns = book.sheets[0].columns;

        equal(columns[0].autoWidth, true);

        equal(columns[1].autoWidth, false);
        equal(columns[1].width, pivotgrid.options.columnWidth);

        equal(columns[2].autoWidth, false);
        equal(columns[2].width, pivotgrid.options.columnWidth);

        equal(columns[3].autoWidth, false);
        equal(columns[3].width, pivotgrid.options.columnWidth);
    });
});

test("Exporter add column configuration for row headers", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] }
    ];

    var rows = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 },
        { value: 2 },
        { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, rows, data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var columns = book.sheets[0].columns;
        equal(columns.length, 4);

        equal(columns[0].autoWidth, true);
        equal(columns[1].autoWidth, true);
        equal(columns[2].autoWidth, true);
        equal(columns[3].autoWidth, false);
    });
});

test("Exporter creates rows for row, column header and content data", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] }
    ];

    var rows = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 },
        { value: 2 },
        { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, rows, data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var rows = book.sheets[0].rows;
        equal(rows.length, 4);
    });
});

test("Exporter creates cells for column header with correct value and cell attributes", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 },
        { value: 2 },
        { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, [], data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var cells_level1 = book.sheets[0].rows[0].cells;
        var cells_level2 = book.sheets[0].rows[1].cells;
        var cells_level3 = book.sheets[0].rows[2].cells;

        equal(book.sheets[0].rows[0].type, "header");
        equal(book.sheets[0].rows[1].type, "header");
        equal(book.sheets[0].rows[2].type, "header");

        equal(cells_level1.length, 3);
        equal(cells_level1[0].value, "");
        equal(cells_level1[0].background, "#7a7a7a");
        equal(cells_level1[0].color, "#fff");
        equal(cells_level1[0].colSpan, 1);
        equal(cells_level1[0].rowSpan, 3);

        equal(cells_level1[1].value, "dim 0");
        equal(cells_level1[1].colSpan, 2);

        equal(cells_level1[2].value, "dim 0");
        equal(cells_level1[2].rowSpan, 3);

        equal(cells_level2.length, 2);
        equal(cells_level2[0].value, "dim 0_1");
        equal(cells_level2[1].value, "dim 0_1");
        equal(cells_level2[1].rowSpan, 2);

        equal(cells_level3.length, 1);
        equal(cells_level3[0].value, "dim 0_2");
    });
});

test("Exporter generate rows for row header and data", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] }
    ];

    var rows = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 },
        { value: 2 },
        { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, rows, data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var rows = book.sheets[0].rows;

        var cells_level1 = book.sheets[0].rows[1].cells;
        var cells_level2 = book.sheets[0].rows[2].cells;
        var cells_level3 = book.sheets[0].rows[3].cells;

        equal(book.sheets[0].rows[1].type, "data");
        equal(book.sheets[0].rows[2].type, "data");
        equal(book.sheets[0].rows[3].type, "data");

        //header
        equal(cells_level1.length, 4);
        equal(cells_level1[0].value, "dim 0");
        equal(cells_level1[0].background, "#7a7a7a");
        equal(cells_level1[0].color, "#fff");
        equal(cells_level1[0].colSpan, 1);
        equal(cells_level1[0].rowSpan, 2);

        //header
        equal(cells_level1[1].value, "dim 0_1");
        equal(cells_level1[1].colSpan, 1);
        equal(cells_level1[1].rowSpan, 1);

        //header
        equal(cells_level1[2].value, "dim 0_2");
        equal(cells_level1[2].colSpan, 1);
        equal(cells_level1[2].rowSpan, 1);

        //data
        equal(cells_level1[3].value, "3");
        equal(cells_level1[3].colSpan, 1);
        equal(cells_level1[3].rowSpan, 1);
        equal(cells_level1[3].background, "#dfdfdf");
        equal(cells_level1[3].color, "#333");

        //header
        equal(cells_level2.length, 2);
        equal(cells_level2[0].value, "dim 0_1");
        equal(cells_level2[0].colSpan, 2);
        equal(cells_level2[0].rowSpan, 1);

        //data
        equal(cells_level2[1].value, "2");
        equal(cells_level2[1].colSpan, 1);
        equal(cells_level2[1].rowSpan, 1);
        equal(cells_level2[1].background, "#dfdfdf");
        equal(cells_level2[1].color, "#333");

        //header
        equal(cells_level3.length, 2);
        equal(cells_level3[0].value, "dim 0");
        equal(cells_level3[0].colSpan, 3);
        equal(cells_level3[0].rowSpan, 1);

        //data
        equal(cells_level3[1].value, "1");
        equal(cells_level3[1].colSpan, 1);
        equal(cells_level3[1].rowSpan, 1);
        equal(cells_level3[1].background, "#dfdfdf");
        equal(cells_level3[1].color, "#333");
    });
});

test("Exporter generate rows for expanded rows and columns", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] }
    ];

    var rows = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 }, { value: 2 }, { value: 3 },
        { value: 1 }, { value: 2 }, { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, rows, data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var rows = book.sheets[0].rows;

        var column_level1 = rows[0].cells;
        var column_level2 = rows[1].cells;

        equal(column_level1.length, 3);
        equal(column_level2.length, 1);
        equal(column_level2[0].value, "dim 0_1");
    });
});

test("Exporter generate rows for row header and data", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] }
    ];

    var rows = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0_1", levelNum: "2", children: [] } ] }
    ];

    var data = [
        { value: 1 }, { value: 2 }, { value: 3 },
        { value: 1 }, { value: 2 }, { value: 3 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, rows, data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var pane = book.sheets[0].freezePane;

        equal(pane.colSplit, 3);
        equal(pane.rowSplit, 2);
    });
});

test("Exporter honours two level row headers when creating first empty cell", function() {
    var columns = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] } ] }
    ];

    var rows = [
        { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] } ] },
        { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1_1", parentName: "dim 1", levelNum: "1", children: [] } ] },
        { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1_2", parentName: "dim 1", levelNum: "1", children: [] } ] }
    ];

    var data = [
        { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },
        { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }
    ];

    var pivotgrid = createPivot({
        autoBind: false,
        dataSource: createDataSource(columns, rows, data)
    });

    var options = {
        widget: pivotgrid
    };

    testWorkbook(options, function(book) {
        var cells_level1 = book.sheets[0].rows[0].cells;

        equal(cells_level1.length, 3);
        equal(cells_level1[0].value, "");
        equal(cells_level1[0].colSpan, 4);
        equal(cells_level1[0].rowSpan, 2);
    });
});

}());
