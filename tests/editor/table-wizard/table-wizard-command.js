(function(){
    var editor;
    var content = '<div>test ||content</div>';
	var tableDataBase = {tableProperties: {columns: 1,rows: 1}, cellProperties: {}};

    editor_module("table wizard command create table", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.focus();
        }
    });

    function tableWizardCommand() {
        var range = createRangeFromText(editor, content);
        editor.selectRange(range);
        var command = kendo.ui.Editor.defaultTools.tableWizard.command({range:range});
        command.editor = editor;

        return command;
    }

    function testTableProperty(prop, value) {
        var data = $.extend(true, {}, tableDataBase);
        data.tableProperties[prop] = value;
        var table = tableWizardCommand().createNewTable(data);
        $(table).removeClass("k-table");
        equal(table[prop], value);
    }

    test('rows', function() {
        var table = tableWizardCommand().createNewTable(tableDataBase);
        equal(table.rows.length, tableDataBase.tableProperties.rows);
    });

    test('columns', function() {
        var table = tableWizardCommand().createNewTable(tableDataBase);
        equal(table.rows[0].cells.length, tableDataBase.tableProperties.columns);
    });

    test('table width', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {width: 250, widthUnit: "px"}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.style.width, "250px");
    });

    test('table height', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {height: 50, heightUnit: "em"}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.style.height, "50em");
    });

    test('cellSpacing', function() {
        testTableProperty("cellSpacing", "1");
    });

    test('table cellPadding', function() {
        testTableProperty("cellPadding", "2");
    });

    test('table id', function() {
        testTableProperty("id", "someId");
    });

    test('table className', function() {
        testTableProperty("className", "someClass");
    });

    test('summary', function() {
        testTableProperty("summary", "some summary");
    });

    test('table alignment', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {alignment: "right"}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.style.textAlign, "right");
    });

    test('table background color', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {bgColor: "#aaa000"}});
        var table = tableWizardCommand().createNewTable(data);

        ok(table.style.backgroundColor);
    });

    test('caption content', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {captionContent: "caption"}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.caption.innerHTML, "caption");
    });

    test('caption content', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {captionContent: "caption", captionAlignment: "right bottom"}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.caption.style.textAlign, "right");
        equal(table.caption.style.verticalAlign, "bottom");
    });

    test('table borders', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {borderWidth: 3, borderColor: "#a1b2c3", borderStyle: "Dashed"}});
        var table = tableWizardCommand().createNewTable(data);

        equal(parseFloat(table.style.borderWidth), 3);
        equal(table.style.borderStyle.toLowerCase(), "dashed");
        ok(table.style.borderColor);
    });

    test('table collapseBorders', function() {
        var data = $.extend(true, {}, tableDataBase, {tableProperties: {collapseBorders: true}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.style.borderCollapse, "collapse");
    });

    var tableCellData = {tableProperties: {columns: 2, rows: 1}, cellProperties: {}};

    function testCellProperty(prop, value) {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {}});
        data.cellProperties[prop] = value;
        var table = tableWizardCommand().createNewTable(data);
        var cell = table.rows[0].cells[0];

        equal(cell[prop], value);
    }

    test('table cell width', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {width: 250, widthUnit: "px"}});
        var table = tableWizardCommand().createNewTable(data);
        var row = table.rows[0];

        equal(row.cells[0].style.width, "250px");
        equal(row.cells[1].style.width, "");
    });

    test('table cell width when all cells is checked', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {width: 250, widthUnit: "px", selectAllCells: true}});
        var table = tableWizardCommand().createNewTable(data);

        equal(table.rows[0].cells[1].style.width, "250px");
    });

    test('table cell height', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {height: 50, heightUnit: "em"}});
        var table = tableWizardCommand().createNewTable(data);
        var row = table.rows[0];

        equal(row.cells[0].style.height, "50em");
        equal(row.cells[1].style.height, "");
    });

    test('table cell cellMargin', function() {
        testCellProperty("cellMargin", "3");
    });

    test('table cell cellPadding', function() {
        testCellProperty("cellPadding", "2");
    });

    test('table cell alignment', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {alignment: "center middle"}});
        var table = tableWizardCommand().createNewTable(data);
        var cell = table.rows[0].cells[0];

        equal(cell.style.textAlign, "center");
        equal(cell.style.verticalAlign, "middle");
    });

    test('table cell id', function() {
        testCellProperty("id", "someId");
    });

    test('table cell CSS class', function() {
        testCellProperty("className", "someClass");
    });

    test('table cell border', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {borderWidth: 3, borderColor: "#a1b2c3", borderStyle: "Dashed"}});
        var table = tableWizardCommand().createNewTable(data);
        var cell = table.rows[0].cells[0];

        equal(parseFloat(cell.style.borderWidth), 3);
        equal(cell.style.borderStyle.toLowerCase(), "dashed");
        ok(cell.style.borderColor);
    });

    test('table cell wrapText checked', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {wrapText: true}});
        var table = tableWizardCommand().createNewTable(data);
        var cell = table.rows[0].cells[0];

        equal(cell.style.whiteSpace, "");
    });

    test('table cell wrapText not checked', function() {
        var data = $.extend(true, {}, tableCellData, {cellProperties: {wrapText: false}});
        var table = tableWizardCommand().createNewTable(data);
        var cell = table.rows[0].cells[0];

        equal(cell.style.whiteSpace, "nowrap");
    });

    var tableData = {tableProperties: {columns: 1,rows: 1}, cellProperties: {}};
    var cellHtml = "<td>cell</td>";
    var rowHtml = "<tr>" + cellHtml + cellHtml + "</tr>";
    var singleRowTable = $("<table><tbody>" + rowHtml + "</tbody></table>");// 1 row, 2 columns
    var tableMultipleRows = $("<table><tbody>" + rowHtml + rowHtml + rowHtml + "</tbody></table>");// 3 row, 2 columns
    var tableWithHeaderRow = $("<table>" + "<thead>" + rowHtml + "</thead>" + "<tbody>" + rowHtml + rowHtml + "</tbody>" + "</table>");

    editor_module("table wizard command edit table", {
        setup: function() {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.focus();
        }
    });

    function tableWizardCommand() {
        var range = createRangeFromText(editor, content);
        editor.selectRange(range);
        var command = kendo.ui.Editor.defaultTools.tableWizard.command({range:range});
        command.editor = editor;
        return command;
    }

    function updateTable(table, data) {
        var cmd = tableWizardCommand();
        cmd.updateTable(data, table, [table.rows[0].cells[0]]);
    }

    function associateCellsWithHeader(table, associate) {
        var data = {tableProperties: { rows: table.rows.length, columns: table.rows[0].cells.length, cellsWithHeaders: associate }, cellProperties: {}};
        updateTable(table, data);
    }

    function assertAssociationCellsWithHeader(table, associated){
        var headerCells = table.tHead.rows[0].cells;
        var rows = table.tBodies[0].rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            for (var c = 0; c < row.cells.length; c++) {
                var cell = row.cells[c];
                (associated ? ok : notOk)(cell.getAttribute("headers"));
                (associated ? ok : notOk)(headerCells[c].id);
                equal(headerCells[c].id, cell.getAttribute("headers") || "");
            }
        }
    }

    test('increase rows', function() {
        var table = singleRowTable.clone().get(0);
        updateTable(table, {tableProperties: { rows: 3, columns: 1 }, cellProperties: {}});
        equal(table.rows.length, 3);
    });

    test('increase columns', function() {
        var table = singleRowTable.clone().get(0);
        updateTable(table, {tableProperties: { rows: 1, columns: 3 }, cellProperties: {}});
        equal(table.rows[0].cells.length, 3);
    });

    test('decrease rows', function() {
        var table = tableMultipleRows.clone().get(0);
        updateTable(table, {tableProperties: { rows: 1, columns: table.rows[0].cells.length }, cellProperties: {}});
        equal(table.rows.length, 1);
    });

    test('decrease columns', function() {
        var table = tableMultipleRows.clone().get(0);
        updateTable(table, {tableProperties: { rows: table.rows.length, columns: 1 }, cellProperties: {}});
        equal(table.rows[0].cells.length, 1);
    });

    test('edit table width', function() {
        var table = singleRowTable.clone().get(0);
        updateTable(table, {tableProperties: { rows: table.rows.length, columns: table.rows[0].cells.length, width: 40, widthUnit: "em" }, cellProperties: {}});
        equal(table.style.width, "40em");
    });

    test('edit table height', function() {
        var table = singleRowTable.clone().get(0);
        updateTable(table, {tableProperties: { rows: table.rows.length, columns: table.rows[0].cells.length, height: 40, heightUnit: "em" }, cellProperties: {}});
        equal(table.style.height, "40em");
    });

    test('add association cells with header', function() {
        var table = tableWithHeaderRow.clone().get(0);
        associateCellsWithHeader(table, true);

        assertAssociationCellsWithHeader(table, true);
    });

    test('remove association cells with header', function() {
        var table = tableWithHeaderRow.clone().get(0);
        associateCellsWithHeader(table, true);
        associateCellsWithHeader(table, false);

        assertAssociationCellsWithHeader(table, false);
    });

})();