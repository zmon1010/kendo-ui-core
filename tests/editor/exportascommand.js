(function(){

var editor;

var Editor = kendo.ui.editor;

editor_module("editor exportAs command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.options.exportAs = undefined;
       editor.focus();
   }
});


function getExportAsCommand(range) {
    var command = new Editor.ExportAsCommand({
                    range: range,
                    exportType: "docx"
                });

    command.editor = editor;
    return command;
}

test('generateForm creates form with method POST', function() {
    var cmd = getExportAsCommand(editor.createRange())
    var form = cmd.generateForm();
    equal(form.attr("method"), "POST");
});

test('generateForm creates form with action exportAs.proxyURL option', function() {
    editor.options.exportAs = {
        proxyURL: "#"
    };
    var cmd = getExportAsCommand(editor.createRange())
    var form = cmd.generateForm();
    equal(form.attr("action"), "#");
});

test('valueIpunt value is the encoded value of the editor', function() {
    editor.options.exportAs = {
        proxyURL: "#"
    };
    editor.value("<div>foo</div>");
    var cmd = getExportAsCommand(editor.createRange())
    var valueInput = cmd.valueInput();
    equal(valueInput.attr("value"), "&lt;div&gt;foo&lt;/div&gt;");
});

test('exportTypeIput value is equal to command exportType attribute', function() {
    var cmd = getExportAsCommand(editor.createRange())
    var exportTypeInput = cmd.exportTypeInput();
    equal(exportTypeInput.attr("value"), "docx");
});

test('fileNameIpunt value is set with editor exportAs.fileName option', function() {
    editor.options.exportAs = {
        fileName: "editor-export"
    };
    var cmd = getExportAsCommand(editor.createRange())
    var fileNameInput = cmd.fileNameInput();
    equal(fileNameInput.attr("value"), "editor-export");
});


test('fileNameIpunt value is editor element id attribute, if exportAs.fileName option is not set', function() {
    var cmd = getExportAsCommand(editor.createRange())
    var fileNameInput = cmd.fileNameInput();
    equal(fileNameInput.attr("value"), "editor-fixture");
});

test('fileNameIpunt value is "editor", if element id is empty and exportAs.fileName option is not set', function() {
    editor.element.attr("id", "");
    var cmd = getExportAsCommand(editor.createRange())
    var fileNameInput = cmd.fileNameInput();
    equal(fileNameInput.attr("value"), "editor");
    editor.element.attr("id", "editor-fixture");
});

}());
