(function(){

var TableWizardDialog = kendo.ui.editor.TableWizardDialog,
    editor,
	dialog,
	tableView,
    cellView,
    accessibilityView,
    data,
	options = {
        visible: false,
        closeCallback: function () {},
        table: {
            tableProperties: {
                width: "100",
                height: "80",
                widthUnit: "px",
                heightUnit: "em",
                columns: "6",
                rows: "4",
                cellSpacing: "2",
                cellPadding: "1",
                alignment: "right",
                bgColor: "#9a3f3f",
                className: "classNameValue",
                id: "idValue",
                borderWidth: "1",
                borderColor: "#000000",
                borderStyle: "Solid",
                collapseBorders: true,
                captionContent: "caption",
                captionAlignment: "right bottom",
                summary: "summary",
                cellsWithHeaders: false
            },
            selectedCells: [{
                selectAllCells: true,
                width: "20",
                height: "10",
                widthUnit: "em",
                heightUnit: "px",
                cellMargin: "4",
                cellPadding: "3",
                alignment: "left middle",
                bgColor: "#aaaaaa",
                className: "class",
                id: "id",
                borderWidth: "3",
                borderColor: "#000000",
                borderStyle: "Dashed",
                wrapText: true
            }]
        },
        isRtl: false
    };

editor_module("TableWizard dialog - loading and getting values", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        options.messages = editor.options.messages;
        options.dialogOptions = editor.options.dialogOptions;
        dialog = new TableWizardDialog(options);
        dialog.open();
        tableView = dialog.components.tableView;
        cellView = dialog.components.cellView;
        accessibilityView = dialog.components.accessibilityView;
        data = dialog.options.table;
    },
    teardown: function() {
        dialog.destroy();
        $(".k-window-content").kendoWindow("destroy");
    }
});

//loading values in dialog
test('loading table values', function() {
    equal(tableView.width.value(), 100);
    equal(tableView.widthUnit.value(), "px");
    equal(tableView.height.value(), 80);
    equal(tableView.heightUnit.value(), "em");
    equal(tableView.columns.value(), 6);
    equal(tableView.rows.value(), 4);
    equal(tableView.cellSpacing.value(), 2);
    equal(tableView.cellPadding.value(), 1);
    equal(tableView.alignment.value(), "right");
    equal(tableView.bgColor.value(), "#9a3f3f");
    equal(tableView.className.value, "classNameValue");
    equal(tableView.id.value, "idValue");
    equal(tableView.borderWidth.value(), "1");
    equal(tableView.borderColor.value(), "#000000");
    equal(tableView.borderStyle.value(), "Solid");
    equal(tableView.collapseBorders.checked, true);
});

test('loading selected cell values', function() {
    equal(cellView.selectAllCells.checked, false);
    equal(cellView.width.value(), 20);
    equal(cellView.widthUnit.value(), "em");
    equal(cellView.height.value(), 10);
    equal(cellView.heightUnit.value(), "px");
    equal(cellView.cellMargin.value(), 4);
    equal(cellView.cellPadding.value(), 3);
    equal(cellView.alignment.value(), "left middle");
    equal(cellView.bgColor.value(), "#aaaaaa");
    equal(cellView.className.value, "class");
    equal(cellView.id.value, "id");
    equal(cellView.borderWidth.value(), "3");
    equal(cellView.borderColor.value(), "#000000");
    equal(cellView.borderStyle.value(), "Dashed");
    equal(cellView.wrapText.checked, true);
});

test('loading accessibility tab values', function() {
    equal(accessibilityView.captionContent.value, "caption");
    equal(accessibilityView.captionAlignment.value(), "right bottom");
    equal(accessibilityView.summary.value, "summary");
    equal(accessibilityView.cellsWithHeaders.checked, false);
});

//getting values from dialog
test('getting table properties from dialog', function() {
    dialog.collectDialogValues();
    equal(data.tableProperties.width, 100);
    equal(data.tableProperties.height, 80);
    equal(data.tableProperties.widthUnit, "px");
    equal(data.tableProperties.heightUnit, "em");
    equal(data.tableProperties.columns, 6);
    equal(data.tableProperties.rows, 4);
    equal(data.tableProperties.cellSpacing, 2);
    equal(data.tableProperties.cellPadding, 1);
    equal(data.tableProperties.alignment, "right");
    equal(data.tableProperties.bgColor, "#9a3f3f");
    equal(data.tableProperties.className, "classNameValue");
    equal(data.tableProperties.id, "idValue");
    equal(data.tableProperties.borderWidth, "1");
    equal(data.tableProperties.borderColor, "#000000");
    equal(data.tableProperties.borderStyle, "Solid");
    equal(data.tableProperties.collapseBorders, true);
    equal(data.tableProperties.captionContent, "caption");
    equal(data.tableProperties.captionAlignment, "right bottom");
    equal(data.tableProperties.summary, "summary");
    equal(data.tableProperties.cellsWithHeaders, false);
});

test('getting cell properties from dialog', function() {
    dialog.collectDialogValues();
    equal(data.cellProperties.width, 20);
    equal(data.cellProperties.height, 10);
    equal(data.cellProperties.widthUnit, "em");
    equal(data.cellProperties.heightUnit, "px");
    equal(data.cellProperties.cellMargin, 4);
    equal(data.cellProperties.cellPadding, 3);
    equal(data.cellProperties.alignment, "left middle");
    equal(data.cellProperties.bgColor, "#aaaaaa");
    equal(data.cellProperties.className, "class");
    equal(data.cellProperties.id, "id");
    equal(data.cellProperties.borderWidth, "3");
    equal(data.cellProperties.borderColor, "#000000");
    equal(data.cellProperties.borderStyle, "Dashed");
    equal(data.cellProperties.wrapText, true);
});

}());