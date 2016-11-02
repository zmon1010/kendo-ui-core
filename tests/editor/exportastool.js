(function() {

    //stub the _exec function
    kendo.ui.editor.ExportAsTool.fn._exec = function() { };

    module("editor exportAs tool", {
        setup: function() {
            QUnit.fixture.append(
                '<textarea cols="20" rows="4" id="editor"></textarea>'
            );
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function exportAsTool(editor) {
        return editor.toolbar.items().filter(".k-exportAs").data("kendoSelectBox");
    }

    test("default tool items", function() {
        var editor = new kendo.ui.Editor("#editor", {
            tools: ["bold", "exportAs"]
        });

        var tool = exportAsTool(editor);
        var dataItems = tool.dataItems();

        equal(dataItems.length, 6);
        equal(dataItems[0].value, "");
        equal(dataItems[0].text, "Export As");
        equal(dataItems[1].value, "docx");
        equal(dataItems[1].text, "Docx");
        equal(dataItems[2].value, "rtf");
        equal(dataItems[2].text, "Rtf");
        equal(dataItems[3].value, "pdf");
        equal(dataItems[3].text, "Pdf");
        equal(dataItems[4].value, "html");
        equal(dataItems[4].text, "Html");
        equal(dataItems[5].value, "txt");
        equal(dataItems[5].text, "Plain Text");
    });

    test("default tool items are set from the tool declaration", function() {
        var editor = new kendo.ui.Editor("#editor", {
            tools: ["bold",
                {
                    name: "exportAs",
                    items: [{value: "rtf", text: "Rtf"}]
                }
            ]
        });

        var tool = exportAsTool(editor);
        var dataItems = tool.dataItems();

        equal(dataItems.length, 2);
        equal(dataItems[0].value, "");
        equal(dataItems[0].text, "Export As");
        equal(dataItems[1].value, "rtf");
        equal(dataItems[1].text, "Rtf");
    });

    test("item click does not change the tool text", function() {
        var editor = new kendo.ui.Editor("#editor", { tools: ["bold","exportAs"] });
        var tool = exportAsTool(editor);
        $(tool.items()[0]).click();
        equal(tool.text(), "Export As");
    });
})();
