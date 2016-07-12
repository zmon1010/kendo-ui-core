(function () {

    var editor,
        imageBrowserOptions = {
            imageBrowser: {
                transport: {
                    read: "read",
                    destroy: "destroy",
                    create: "create",
                    thumbnailUrl: "thumbnailUrl",
                    uploadUrl: "uploadUrl",
                    imageUrl: "imageUrl"
                },
                change: "changeEvent",
                apply: "applyEvent"
            }
        },
        fileBrowserOptions = {
            fileBrowser: {
                transport: {
                    read: "read",
                    destroy: "destroy",
                    create: "create",
                    uploadUrl: "uploadUrl",
                    fileUrl: "imageUrl"
                },
                change: "changeEvent",
                apply: "applyEvent"
            }
        };

    editor_module("editor file and image browsers tests", {
        beforeEach: function () {
            editor = $("#editor-fixture").data("kendoEditor");
            editor.setOptions({ tools: ["insertImage", "insertFile"] });
        },
        afterEach: function () {
            removeMocksIn(kendo.ui);
        }
    });

    test('compare imageBrowser options after exec', function () {
        editor.setOptions(imageBrowserOptions);
        
        mockFunc(kendo.ui, "ImageBrowser", function (element, options) {
            deepEqual(imageBrowserOptions.imageBrowser, options, "The options passed to kendo.ui.ImageBrowser should be the same.");
            return { bind: function () { }};
        });

        editor.exec("insertImage");
    });

    test('compare fileBrowser options after exec', function () {
        editor.setOptions(fileBrowserOptions);

        mockFunc(kendo.ui, "FileBrowser", function (element, options) {
            deepEqual(fileBrowserOptions.fileBrowser, options, "The options passed to kendo.ui.FileBrowser should be the same.");
            return { bind: function () { } };
        });

        editor.exec("insertFile");
    });
})();
