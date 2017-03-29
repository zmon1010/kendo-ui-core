(function(){

    var Upload = kendo.ui.Upload,
    uploadInstance,
    _supportsFormData,
    validJSON = "{\"status\":\"OK\"}",
    validChunkJSON = "{\"fileUid\":\"someUID\",\"uploaded\":false}",
    validUploadedChunkJSON = "{\"fileUid\":\"someUID\",\"uploaded\":true}",
    errorResponse = "ERROR!",
    lastFormData;

var formDataStub = {
    append: $.noop
};

function createUpload(options) {
    removeHTML();
    copyUploadPrototype();

    $('#uploadInstance').kendoUpload($.extend({
        async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload:true
        }
    }, options));

    var uploadInstance = $('#uploadInstance').data("kendoUpload");
    uploadInstance._module.createFormData = function() {
        lastFormData = { };

        return {
            append: function(name, value) {
                lastFormData[name] = value;
            }
        } };

    uploadInstance._module._postFormData = uploadInstance._module.postFormData;
    uploadInstance._module.postFormData = function(url, data, fileEntry) {
        fileEntry.data("request", { abort: function() { } });
    };

    return uploadInstance;
}

function simulateRequestSuccess(fileIndex, response) {
    var uploadInstance = $("#uploadInstance").data("kendoUpload");
    uploadInstance._module.onRequestSuccess(
        { target: { responseText: response || "", statusText: "OK", status: 200 } },
        $(".k-file", uploadInstance.wrapper).eq(fileIndex)
    );
}

function simulateRequestError(fileIndex, response) {
    var uploadInstance = $("#uploadInstance").data("kendoUpload");
    uploadInstance._module.onRequestError(
        { target: { responseText: response || "", statusText: "error", status: 500 } },
        $(".k-file", uploadInstance.wrapper).eq(fileIndex)
    );
}

function simulateUpload(index) {
    var i = index || 0;

    simulateFileSelect();
    simulateRequestSuccess(i);
}

function simulateUploadError() {
    simulateFileSelect();
    simulateRequestError(0);
}

function simulateRemove() {
    $.mockjax({
        url: "/removeAction",
        responseTime: 0,
        responseText: ""
    });
    simulateRemoveClick();
}

function simulateRemoveWithResponse(response) {
    $.mockjax({
        url: "/removeAction",
        responseTime: 0,
        responseText: response
    });

    simulateRemoveClick();
}

function simulateRemoveError() {
    $.mockjax({
        url: "/removeAction",
        status: 500,
        responseTime: 0,
        responseText: errorResponse
    });

    simulateRemoveClick();
}

function simulateUploadWithResponse(response, callback, index) {
    var i = index || 0;

    simulateFileSelect();
    simulateRequestSuccess(i, response);
}

function getFileUid(fileIndex) {
    var uploadInstance = $("#uploadInstance").data("kendoUpload");

    return uploadInstance.wrapper.find(".k-file").eq(fileIndex).attr("data-uid");
}

function moduleSetup() {
    _supportsFormData = Upload.prototype._supportsFormData;
    Upload.prototype._supportsFormData = function() { return true; };
    Upload.prototype._alert = function() { };
}

function moduleTeardown() {
    kendo.destroy($("#testbed_container"));
    removeHTML();
    Upload.prototype._supportsFormData = _supportsFormData;
    $.mockjax.clear();
}

// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload();
    },
    teardown: moduleTeardown
});

test("formData module is selected when FormData is supported", function() {
    equal(uploadInstance._module.name, "formDataUploadModule");
});

test("formData module is not selected when FormData is not supported", function() {
    Upload.prototype._supportsFormData = function() { return false; };

    uploadInstance = createUpload();

    ok(uploadInstance._module.name != "formDataUploadModule");
});

test("current input is hidden after choosing a file", function() {
    simulateFileSelect();
    equal($("input:not(:visible)", uploadInstance.wrapper).length, 1);
});

test("list element is created for each selected file", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };
    simulateFileSelect();
    
    equal($(".k-upload-files li.k-file", uploadInstance.wrapper).length, 2);
});

test("data-uid attribute for list element has the same value as the file uid", function() {
    simulateSingleFileSelect();

    var listItemUid = $(".k-file").data("uid");
    var fileUid = $(".k-file").data("fileNames")[0].uid;

    equal(listItemUid, fileUid);
});

test("file names are rendered for multiple files", 2, function() {
    uploadInstance._inputFiles = function () { return getFileListMock(); };
    simulateFileSelect();

    var fileNames = $(".k-file-name", uploadInstance.wrapper).map(function() { return $(this).text(); });

    equal(fileNames[0], "first.txt");
    equal(fileNames[1], "second.txt");
});

test("clicking cancel should remove file entry", function() {
    var requestStopped = false;
    uploadInstance._module.stopUploadRequest = function() { requestStopped = true; };

    simulateFileSelect();
    $(".k-i-cancel", uploadInstance.wrapper).trigger("click");

    ok(requestStopped);
});

test("FormData is created when a file is selected", 1, function() {
    uploadInstance._module.createFormData = function() { ok(true); return formDataStub; }

    simulateFileSelect();
});

test("file is passed to populateFormData", function() {
    var file = null;
    uploadInstance._module.populateFormData = function(data, sourceFiles) {
        file = sourceFiles[0];
    };

    simulateFileSelect();
    equal(file.name, "first.txt");
});

test("postFormData is issued when file is selected", function() {
    var postFormDataCalled = false;
    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    simulateFileSelect();
    ok(postFormDataCalled);
});

test("postFormData receives form data", 1, function() {
    uploadInstance._module.createFormData = function() { return formDataStub; }
    uploadInstance._module.postFormData = function(url, data) { equal(data, formDataStub); };

    simulateFileSelect();
});

test("postFormData receives user data", 1, function() {
    var myData = {};
    uploadInstance.bind("upload", function(e) {
        e.formData = myData;
    });
    uploadInstance._module.postFormData = function(url, data) { equal(data, myData); };

    simulateFileSelect();
});

test("user form data is not modified", 1, function() {
    var myData = {
        append: function() {
            ok(false);
        }
    };

    uploadInstance.bind("upload", function(e) {
        e.formData = myData;
    });

    uploadInstance._module.postFormData = function(url, data) { equal(data, myData); };

    simulateFileSelect();
});

test("original input is removed upon success", function() {
    uploadInstance.element.addClass("marker");
    simulateFileSelect();
    uploadInstance.element.removeClass("marker");

    var fileEntry = $(".k-file:first", uploadInstance.wrapper);

    uploadInstance._module.onRequestSuccess({ target: { responseText: "", status: 200 } }, fileEntry);

    equal($(".marker", uploadInstance.wrapper).length, 0);
});

test("original input is removed after all uploads succeed", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };

    uploadInstance.element.addClass("marker");
    simulateFileSelect();
    uploadInstance.element.removeClass("marker");

    var fileEntry = $(".k-file:nth-child(1)", uploadInstance.wrapper);
    uploadInstance._module.onRequestSuccess({ target: { responseText: "", status: 200 } }, fileEntry);

    equal($(".marker", uploadInstance.wrapper).length, 1);

    fileEntry = $(".k-file:nth-child(2)", uploadInstance.wrapper);
    uploadInstance._module.onRequestSuccess({ target: { responseText: "", status: 200 } }, fileEntry);

    equal($(".marker", uploadInstance.wrapper).length, 0);
});

test("original input is not removed if some uploads fail", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };

    uploadInstance.element.addClass("marker");
    simulateFileSelect();
    uploadInstance.element.removeClass("marker");

    simulateRequestError(0);
    equal($(".marker", uploadInstance.wrapper).length, 1);

    simulateRequestSuccess(1);
    equal($(".marker", uploadInstance.wrapper).length, 1);
});

test("progress bar is rendered on first update", function() {
    simulateFileSelect();
    uploadInstance._module.onRequestProgress({ loaded: 1, total: 1}, $(".k-file", uploadInstance.wrapper));
    equal($(".k-upload-files .k-file .k-progress", uploadInstance.wrapper).length, 1);
})

test("progress indicator is updated", function() {
    simulateFileSelect();

    uploadInstance._module.onRequestProgress({ loaded: 10, total: 100}, $(".k-file", uploadInstance.wrapper));
    equal($(".k-progress", uploadInstance.wrapper)[0].style.width, "10%");
});

test("postFormData is issued when clicking retry", function() {
    simulateUploadWithResponse(errorResponse);

    var postFormDataCalled = false;
    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    $(".k-i-retry", uploadInstance.wrapper).trigger("click");

    ok(postFormDataCalled);
});

test("Error event is raised when response code is above 299", function() {
    var errorFired = false;
    uploadInstance = createUpload({ error:
        function() {
            errorFired = true;
        }
    });

    simulateFileSelect();
    uploadInstance._module.onRequestSuccess(
        { target: { responseText: "", statusText: "ERROR", status: 500 } },
        $(".k-file", uploadInstance.wrapper).eq(0)
    );

    ok(errorFired);
});

uploadAsync(createUpload, simulateUpload, simulateUploadWithResponse, simulateRemove, errorResponse);
uploadSelection(createUpload);
uploadAsyncNoMultiple(createUpload, simulateUpload);

var removeApiTestParams = {
    createUpload: createUpload,
    simulateFileSelect: simulateFileSelect,
    simulateUpload: simulateUpload,
    getFileUid: getFileUid,
    simulateUploadWithResponse: simulateUploadWithResponse,
    errorResponse: errorResponse
};

removeApi(removeApiTestParams);

validation(removeApiTestParams);

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / autoUpload = false", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({ async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;', autoUpload: false } });
    },
    teardown: moduleTeardown
});

test("upload doesn't start before upload button click", function() {
    var postFormDataCalled = false;
    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    simulateFileSelect();

    ok(!postFormDataCalled);
});

test("upload starts on upload button click", function() {
    var postFormDataCalled = false;
    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    ok(postFormDataCalled);
});

test("upload button is rendered on subsequent select", function() {
    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");
    uploadInstance._module.onRequestSuccess({ target: { responseText: "" } }, $(".k-file", uploadInstance.wrapper));
    simulateFileSelect();

    equal($(".k-upload-selected", uploadInstance.wrapper).length, 1);
});

test("upload button click does not start upload if it is already in progress", function() {
    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    var counter = 0;
    uploadInstance._module.performUpload = function(fileEntry) { counter++; }

    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    equal(counter, 1);
});

test("upload button click does not start upload after completion", function() {
    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");
    uploadInstance._module.onRequestSuccess({ target: { responseText: "" } }, $(".k-file", uploadInstance.wrapper));

    $(".k-file").addClass("complete");

    var counter = 0;
    uploadInstance._module.performUpload = function(fileEntry) {
        ok(fileEntry.is(":not(.complete)"), "performUpload should not be called for completed upload");
        counter++;
    }

    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    equal(counter, 1);
});

test("upload button click does not start upload after completion", function() {
    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    var postFormDataCalled = false;
    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    ok(!postFormDataCalled);
});

test("upload button click does not start upload if it is already in progress", function() {
    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");
    uploadInstance._module.onRequestSuccess({ target: { responseText: "" } }, $(".k-file", uploadInstance.wrapper));

    var postFormDataCalled = false;
    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    ok(!postFormDataCalled);
});

test("clicking remove should call remove action for completed files", function() {
    var removeCalled = false;
    uploadInstance._submitRemove = function(data, onSuccess) {
        removeCalled = true;
    };

    simulateFileSelect();
    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");
    uploadInstance._module.onRequestSuccess({ target: { responseText: "", status: 200 } }, $(".k-file", uploadInstance.wrapper));

    $(".k-i-close", uploadInstance.wrapper).trigger("click");
    ok(removeCalled);
});

test("clicking remove should remove original file input", function() {
    uploadInstance.element.addClass("marker");
    simulateFileSelect();
    uploadInstance.element.removeClass("marker");

    simulateRemoveClick();

    equal($(".marker", uploadInstance.wrapper).length, 0);
});

test("clicking remove should remove original file input when all related files are removed", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };

    uploadInstance.element.addClass("marker");
    simulateFileSelect();
    uploadInstance.element.removeClass("marker");

    simulateRemoveClick();
    simulateRemoveClick();

    equal($(".marker", uploadInstance.wrapper).length, 0);
});

test("clicking remove should not remove original file input if some related files are not uploaded", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };

    uploadInstance.element.addClass("marker");
    simulateFileSelect();
    uploadInstance.element.removeClass("marker");

    simulateRemoveClick();

    equal($(".marker", uploadInstance.wrapper).length, 1);
});

var noAutoConfig = { async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;', autoUpload: false } };
asyncNoAuto(createUpload, simulateUploadWithResponse, noAutoConfig, simulateRemove, errorResponse);

    module("Upload / FormDataUpload / chunkSize = 1000", {
        setup: function() {
            moduleSetup();
        },
        teardown: moduleTeardown
    });

    test("success event increases chunk index", function() {
        var response = null;
        var uploadInstance = createUpload({ 
        async: {
            saveUrl:"javascript:;",
            removeUrl:"/removeAction",
            autoUpload: false,
            chunkSize:1000
            },
            success:function(e) {
                response = e.response;
            }
        });
         uploadInstance._module.temp_getCurrentChunk = uploadInstance._module._getCurrentChunk;
        uploadInstance._module._getCurrentChunk = function(file){return file};
        uploadInstance._module.metaData["someUID"] = {chunkIndex:1};
        simulateUploadWithResponse(validChunkJSON);
        uploadInstance._module._getCurrentChunk = uploadInstance._module.temp_getCurrentChunk;
        equal(uploadInstance._module.metaData["someUID"].chunkIndex, 2);
    });

        test("success event resets chunk index", function() {
        var response = null;
        var uploadInstance = createUpload({ 
        async: {
            saveUrl:"javascript:;",
            removeUrl:"/removeAction",
            autoUpload: false,
            concurrent:false,
            chunkSize:1000
            },
            success:function(e) {
                response = e.response;
            }
        });
        simulateFileSelect();
        simulateFileSelect();
        uploadInstance._module.temp_getCurrentChunk = uploadInstance._module._getCurrentChunk;
        uploadInstance._module._getCurrentChunk = function(file){return file};
        uploadInstance._module.metaData["someUID"] = {chunkIndex:1};
        simulateUploadWithResponse(validUploadedChunkJSON);
        uploadInstance._module._getCurrentChunk = uploadInstance._module.temp_getCurrentChunk;
        equal(uploadInstance._module.metaData["someUID"].chunkIndex, 0);
    });

  test("prepareChunk is  called when chunkSize is set and autoUpload is false", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: false,
                chunkSize:1000
        }
        });
        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" } }]);
            });

            return fileEntries;
        };
        var prepareChunk = stub(uploadInstance._module, "prepareChunk");
        simulateFileSelect();
        uploadInstance._module.onSaveSelected();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(prepareChunk.calls("prepareChunk"), 1);
    });

 test("performUpload is called two times when chunkSize and concurent are set and autoUpload is false", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: false,
                concurrent: true,
                chunkSize:1000
        }
        });
        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            fileEntries.push(this.enqueueFiles(files)[0]);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }}]);
            });

            return fileEntries;
        };
        var performUpload = stub(uploadInstance._module, "performUpload");
        simulateFileSelect();
        uploadInstance._module.onSaveSelected();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(performUpload.calls("performUpload"), 2);
    });

 test("performUpload is  called when chunkSize and concurent are set and autoUpload is false", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: false,
                chunkSize:1000
        }
        });
        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            fileEntries.push(this.enqueueFiles(files)[0]);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }}]);
            });

            return fileEntries;
        };
        var performUpload = stub(uploadInstance._module, "performUpload");
        simulateFileSelect();
        uploadInstance._module.onSaveSelected();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(performUpload.calls("performUpload"), 1);
    });

    test("prepareChunk is  called when chunkSize is set", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        }
        });
        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" } }]);
            });

            return fileEntries;
        };
        var prepareChunk = stub(uploadInstance._module, "prepareChunk");
        simulateFileSelect();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(prepareChunk.calls("prepareChunk"), 1);
    });

 test("performUpload is called two times when chunkSize and concurent are set", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                concurrent: true,
                chunkSize:1000
        }
        });
        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            fileEntries.push(this.enqueueFiles(files)[0]);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }}]);
            });

            return fileEntries;
        };
        var performUpload = stub(uploadInstance._module, "performUpload");
        simulateFileSelect();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(performUpload.calls("performUpload"), 2);
    });

 test("performUpload is  called when chunkSize and concurent are set", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        }
        });
        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            fileEntries.push(this.enqueueFiles(files)[0]);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }}]);
            });

            return fileEntries;
        };
        var performUpload = stub(uploadInstance._module, "performUpload");
        simulateFileSelect();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(performUpload.calls("performUpload"), 1);
    });

    test("pause event is triggered on click", function() {
        var flag = false;
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        },
        pause:
            function(e) {
                flag = true;
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" } }]);
            });

            return fileEntries;
        };

        simulateFileSelect();
        $(".k-i-pause", uploadInstance.wrapper).trigger("click");
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        
        equal(flag, true);
    });

    test("pause message appears when one or more files are paused", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        }});

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" } }]);
            });

            return fileEntries;
        };

        simulateFileSelect();
        $(".k-i-pause", uploadInstance.wrapper).trigger("click");
       
        uploadInstance._updateHeaderUploadStatus();
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;

        equal(uploadInstance.wrapper.find(".k-upload-status").find(".k-i-pause").length, 1);
    });

      test("resume event is triggered on click", function() {
        var flag = false;
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        },
        resume:
            function(e) {
                flag = true;
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }, uid:$(this).data("uid") }]);
            });

            return fileEntries;
        };

        simulateFileSelect();
        $(".k-i-pause", uploadInstance.wrapper).trigger("click");
        $(".k-i-play", uploadInstance.wrapper).trigger("click");
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        equal(flag, true);
    });

      test("_hideUploadProgress is not called when chunkSize is set", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        }
        });

        var hideUploadProgress = stub(uploadInstance, "_hideUploadProgress");
        uploadInstance._onUploadError({target:{}}, {responseText:"sometext"});

        equal(hideUploadProgress.calls("_hideUploadProgress"), 0);
    });

     test("_clearFileAction is not called when skipClear is true", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        }
        });

        var clearFileAction = stub(uploadInstance, "_clearFileAction");
        uploadInstance._fileAction({target:{}}, "sometext", true);

        equal(clearFileAction.calls("_clearFileAction"), 0);
    });

      test("_retryAfter is called when retryAfter is set", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                retryAfter:300,
                chunkSize:1000
        }
        });

        var retryAfter = stub(uploadInstance, "_retryAfter");
        uploadInstance._onUploadError({target:{}}, {responseText:"sometext"});

        equal(retryAfter.calls("_retryAfter"), 1);
    });

      test("_retryAfter is not called when retryAfter is not set", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
        }
        });

        var retryAfter = stub(uploadInstance, "_retryAfter");
        uploadInstance._onUploadError({target:{}}, {responseText:"sometext"});

        equal(retryAfter.calls("_retryAfter"), 0);
    });

    test("onCancel adds canceled uid", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }, uid:$(this).data("uid") }]);
                $(this).data("request", { abort: function(){}});
                $(this).data("uid", "someuid");
            });

            return fileEntries;
        };

        simulateFileSelect();

        uploadInstance._module.onCancel({target:uploadInstance.wrapper.find(".k-file")})
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        equal(uploadInstance._module.cancelled["someuid"], true);
    });

        test("onPause adds paused uid", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }, uid:$(this).data("uid") }]);
                $(this).data("request", { abort: function(){}});
                $(this).data("uid", "someuid");
            });

            return fileEntries;
        };

        simulateFileSelect();

        uploadInstance._module.onPause({target:uploadInstance.wrapper.find(".k-file")})
        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        equal(uploadInstance._module.paused["someuid"], true);
    });

        test("onResume removes paused uid", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }, uid:$(this).data("uid") }]);
                $(this).data("request", { abort: function(){}});
            });

            return fileEntries;
        };

        simulateFileSelect();
        var fileEntry = uploadInstance.wrapper.find(".k-file");

        uploadInstance._module.prepareChunk(fileEntry);
        uploadInstance._module.onPause({target:fileEntry});

        uploadInstance._module.onResume({target:fileEntry});

        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        equal(uploadInstance._module.paused[fileEntry.data("files")[0].uid], undefined);
    });

            test("onRetry removes paused uid", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }, uid:$(this).data("uid") }]);
                $(this).data("request", { abort: function(){}});
            });

            return fileEntries;
        };

        simulateFileSelect();
        var fileEntry = uploadInstance.wrapper.find(".k-file");

        uploadInstance._module.prepareChunk(fileEntry);
        uploadInstance._module.onPause({target:fileEntry});

        uploadInstance._module.onRetry({target:fileEntry});

        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        equal(uploadInstance._module.paused[fileEntry.data("files")[0].uid], undefined);
    });

        test("_getCurrentChunk is called when file is selected", function() {
        uploadInstance = createUpload({
           async: {
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload: true,
                chunkSize:1000
            }
        });

        uploadInstance._module._prepareUpload = uploadInstance._module.prepareUpload;
        uploadInstance._module.prepareUpload = function(sourceElement, files) {
            var fileEntries = this.enqueueFiles(files);
            $.each(fileEntries, function() {
                $(this).data("files", [{ rawFile: { name: "someFile", type: "zip", size: "2000" }, uid:$(this).data("uid") }]);
                $(this).data("request", { abort: function(){}});
            });

            return fileEntries;
        };

        simulateFileSelect();

        var _getCurrentChunk = stub(uploadInstance._module, "_getCurrentChunk");
        uploadInstance._onUploadError({target:{}}, {responseText:"sometext"});

        uploadInstance._module.prepareUpload = uploadInstance._module._prepareUpload;
        equal(_getCurrentChunk.calls("_getCurrentChunk"), 0);
        equal(0,0);
    });
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    module("Upload / FormDataUpload / Events", {
        setup: moduleSetup,
        teardown: moduleTeardown
    });

    test("user data set in upload event is sent to the server", function() {
        uploadInstance = createUpload({ upload:
            function(e) {
                e.data = { myId : 42 };
            }
        });

        simulateFileSelect();

        equal(lastFormData.myId, 42);
    });

    test("upload event contains XHR reference", 1, function() {
        uploadInstance = createUpload({ upload:
            function(e) {
                ok(e.XMLHttpRequest);
            }
        });

        simulateFileSelect();
    });

    test("user data can be updated on retry", function() {
        var id = 1;

        uploadInstance = createUpload({ upload:
            function(e) {
                e.data = { myId : id++ };
            }
        });

        simulateUploadWithResponse(errorResponse);

        $(".k-i-retry", uploadInstance.wrapper).trigger("click");

        equal(lastFormData.myId, 2);
    });

    test("Anti-Forgery Token is sent to the server", function() {
        $(document.body).append("<input type='hidden' name='__RequestVerificationToken' value='42' />");

        uploadInstance = createUpload();
        simulateFileSelect();

        equal(lastFormData["__RequestVerificationToken"], "42");

        $("input[name='__RequestVerificationToken']").remove();
    });

    test("Rails CSRF token is sent to the server", function() {
        $("head").append('<meta content="authenticity_token" name="csrf-param" />');
        $("head").append('<meta content="42" name="csrf-token" />');

        uploadInstance = createUpload();
        simulateFileSelect();

        equal(lastFormData["authenticity_token"], 42);

        $("meta[name='csrf-param'], meta[name='csrf-token']").remove();
    });

    test("Anti-Forgery Token with AppPath sent to the server", function() {
        $(document.body).append("<input type='hidden' name='__RequestVerificationToken_test' value='42' />");

        uploadInstance = createUpload();
        simulateFileSelect();

        equal(lastFormData["__RequestVerificationToken_test"], "42");

        $("input[name='__RequestVerificationToken_test']").remove();
    });

    test("Multiple Anti-Forgery Tokens are sent to the server", function() {
        $(document.body).append("<input type='hidden' name='__RequestVerificationToken_1' value='42' />");
        $(document.body).append("<input type='hidden' name='__RequestVerificationToken_2' value='24' />");

        uploadInstance = createUpload();
        simulateFileSelect();

        equal(lastFormData["__RequestVerificationToken_1"], "42");
        equal(lastFormData["__RequestVerificationToken_2"], "24");

        $("input[name^='__RequestVerificationToken']").remove();
    });

    test("saveUrl set in upload event is applied", function() {
        uploadInstance = createUpload({ upload:
            function() {
                this.options.async.saveUrl = "foo";
            }
        });

        uploadInstance._module.postFormData = function (url) {
            equal(url, "foo");
        };

        simulateFileSelect();
    });

    test("cancelling upload event prevents the upload operation", function() {
        uploadInstance = createUpload({ upload:
            function(e) {
                e.preventDefault();
            }
        });

        var uploadStarted = false;
        uploadInstance._module.postFormData = function () { uploadStarted = true; };

        simulateFileSelect();

        ok(!uploadStarted);
    });

    test("error is fired when server returns error", function() {
        var errorFired = false;
        uploadInstance = createUpload({ error:
            function() {
                errorFired = true;
            }
        });

        simulateUploadError();

        ok(errorFired);
    });

    test("error event arguments contain original XHR when the server returns error", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadError();

        notEqual(xhr, null);
    });

    test("error event arguments contain XHR object with status when server returns non-JSON", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadWithResponse(errorResponse);

        equal(xhr.status, "200");
    });

    test("error event arguments contain XHR object with status when server returns error", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadError();

        equal(xhr.status, "500");
    });

    test("error event arguments contain XHR object with statusText when server returns non-JSON", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadWithResponse(errorResponse);

        equal(xhr.statusText, "OK");
    });

    test("error event arguments contain XHR object with statusText when server returns error", function() {
        var xhr = null;
        uploadInstance = createUpload({ error:
            function(e) {
                xhr = e.XMLHttpRequest;
            }
        });

        simulateUploadError();

        equal(xhr.statusText, "error");
    });

    test("complete is fired when all uploads complete successfully", function() {
        var completeFired = false;
        uploadInstance = createUpload({ complete:
            function(e) {
                completeFired = true;
            }
        });

        simulateFileSelect();
        simulateFileSelect();

        simulateRequestSuccess(0);

        ok(!completeFired);

        simulateRequestSuccess(1);

        ok(completeFired);
    });

    test("complete is fired when all uploads complete either successfully or with error", function() {
        var completeFired = false;
        uploadInstance = createUpload({ complete:
            function(e) {
                completeFired = true;
            }
        });

        simulateFileSelect();
        simulateFileSelect();

        simulateRequestSuccess(0);

        ok(!completeFired);

        simulateRequestError(1);

        ok(completeFired);
    });

    test("complete is fired when upload fails", 1, function() {
        uploadInstance = createUpload({ complete:
            function(e) {
                ok(true);
            }
        });

        simulateFileSelect();
        simulateRequestError(0);
    });

uploadSelect(createUpload);

uploadUploadEvent(createUpload);

var successEventTestsParameters = {
    createUpload: createUpload,
    simulateUpload: simulateUpload,
    simulateUploadWithResponse: simulateUploadWithResponse,
    validJSON: validJSON,
    simulateRemove: simulateRemove,
    simulateRemoveWithResponse: simulateRemoveWithResponse
};
uploadSuccess(successEventTestsParameters);

var errorEventTestsParameters = {
    createUpload: createUpload,
    simulateUpload: simulateUpload,
    simulateUploadWithResponse: simulateUploadWithResponse,
    errorResponse: errorResponse,
    validJSON: validJSON,
    simulateRemoveWithResponse: simulateRemoveWithResponse,
    simulateRemove: simulateRemove,
    simulateRemoveError: simulateRemoveError
};
uploadError(errorEventTestsParameters);

uploadCancel(createUpload);

var removeEventTestsParameters = {
    createUpload: createUpload,
    simulateUpload: simulateUpload,
    simulateRemove: simulateRemove
};
uploadRemoveEvent(removeEventTestsParameters);

var clearEventTestsParameters = {
    createUpload: createUpload,
    simulateFileSelect: simulateFileSelect,
    noAutoConfig: noAutoConfig
};
uploadClearEvent(clearEventTestsParameters);

// ------------------------------------------------------------
module("Upload / FormDataUpload / batch = true", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({ async: {
                batch: true,
                saveUrl:"javascript:;",
                removeUrl:"/removeAction",
                autoUpload:true
            }
        });
    },
    teardown: moduleTeardown
});

test("list element is created for all selected file", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };
    simulateFileSelect();

    equal($(".k-upload-files li.k-file", uploadInstance.wrapper).length, 1);
});

test("data-uid value is the same for the list item and all selected files", function(){
    uploadInstance._inputFiles = function () { return getFileListMock() };
    simulateFileSelect();

    var listItemUid = $(".k-file").data("uid");
    var firstFileUid = $(".k-file").data("fileNames")[0].uid;
    var secondFileUid = $(".k-file").data("fileNames")[1].uid;

    equal(listItemUid, firstFileUid);
    equal(listItemUid, secondFileUid);
});

test("file names are rendered for multiple files", 2, function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };
    simulateFileSelect();

    var fileNames = $(".k-file-name", uploadInstance.wrapper).map(
        function() { return $(this).text(); }
    );

    equal(fileNames[0], "first.txt");
    equal(fileNames[1], "second.txt");
});

test("files are passed to populateFormData", 2, function() {
    uploadInstance._module.populateFormData = function(formData, sourceFiles) {
        equal(sourceFiles[0].name, "first.txt");
        equal(sourceFiles[1].name, "second.txt");
    };

    uploadInstance._inputFiles = function () { return getFileListMock() };
    simulateFileSelect();
});

test("getFiles returns all files selected at once", function() {
    uploadInstance._inputFiles = function () { return getFileListMock() };
    simulateFileSelect();

    var allFiles = uploadInstance.getFiles();

    equal(allFiles.length, 2);
});

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / Templates / autoUpload = false", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({
            async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;', autoUpload: false },
            template: "<div class='myTemplate'><span class='k-progress'></span><span class='fileInfo'>#=name# #=size# #=files[0].extension#</span><button type='button' class='k-upload-action'></button></div>"
        });
    },
    teardown: moduleTeardown
});

test("k-upload-action button should contain remove icon", function() {
    simulateSingleFileSelect("image.jpg", 500);
    equal($(".k-file button.k-upload-action > span.k-i-close", uploadInstance.wrapper).length, 1);
});

test("progress bar is rendered in the template", function() {
    simulateSingleFileSelect("image.jpg", 500);
    equal($('.k-progress', uploadInstance.wrapper).length, 1);
});

test("separate template is rendered for each of the selected files", function() {
    simulateMultipleFileSelect();
    equal($('.k-file > .myTemplate', uploadInstance.wrapper).length, 2);
});


// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / Templates / autoUpload = false / batch = true", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({
            async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;', autoUpload: false, batch: true },
            template: "<div class='myTemplate'>" +
                      "<span class='fileInfo'><span class='fileName'>#=name#</span><span class='fileSize'>#=size#</span>" +
                      "#=files[0].extension#</span>" +
                      "<button type='button' class='k-upload-action'></button><span class='k-progress'></span></div>"
        });
    },
    teardown: moduleTeardown
});

test("single template is rendered when selecting multiple files", function() {
    simulateMultipleFileSelect();
    equal($('.k-file > .myTemplate', uploadInstance.wrapper).length, 1);
});

test("file name represents the concatenated file names", function() {
    simulateMultipleFileSelect();
    equal($('.k-file .fileName', uploadInstance.wrapper).text(), "first.txt, second.txt");
});

test("size represents the total size of the files", function() {
    simulateMultipleFileSelect();
    equal($('.k-file .fileSize', uploadInstance.wrapper).text(), "3");
});


// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / Templates / autoUpload = true", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({
            async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;' },
            template: "<div class='myTemplate'><span class='k-icon'></span><span class='fileInfo'>#=name# #=size# #=files[0].extension#</span><button type='button' class='k-upload-action'></button><span class='k-progress'></span></div>"
        });
    },
    teardown: moduleTeardown
});

test("k-upload-action button should contain retry icon on unsuccessful upload", function(){
    simulateUploadWithResponse(errorResponse);
    equal($(".k-file button.k-upload-action > span.k-i-retry", uploadInstance.wrapper).length, 1);
});

test("k-upload-action button should contain retry title on unsuccessful upload", function(){
    simulateUploadWithResponse(errorResponse);
    equal($(".k-file button.k-upload-action .k-icon", uploadInstance.wrapper).attr("title"), "Retry");
});

test("k-upload-action button should contain remove icon on successful upload", function(){
    simulateUpload();
    equal($(".k-file button.k-upload-action > span.k-i-close", uploadInstance.wrapper).length, 1);
});

test("k-upload-action button should contain remove title on successful upload", function(){
    simulateUpload();
    equal($(".k-file button.k-upload-action .k-icon", uploadInstance.wrapper).attr("title"), "Remove");
});

test("k-progress should have 100% width on successful upload", function(){
    simulateUpload();
    equal($(".k-file .k-progress", uploadInstance.wrapper)[0].style.width, "100%");
});

test("loading status icon is rendered while uploading", function(){
    var requestStopped = false;
    uploadInstance._module.stopUploadRequest = function() { requestStopped = true; };
    simulateFileSelect();
    equal($('.k-icon.k-i-loading', uploadInstance.wrapper).length, 1);
});

test("k-upload-action button should contain cancel icon while uploading", function(){
    var requestStopped = false;
    uploadInstance._module.stopUploadRequest = function() { requestStopped = true; };
    simulateFileSelect();
    equal($(".k-file button.k-upload-action > span.k-i-cancel", uploadInstance.wrapper).length, 1);
});

test("k-upload-action button should contain cancel title while uploading", function(){
    var requestStopped = false;
    uploadInstance._module.stopUploadRequest = function() { requestStopped = true; };
    simulateFileSelect();
    equal($(".k-file button.k-upload-action .k-icon", uploadInstance.wrapper).attr("title"), "Cancel");
});

test("progress bar is rendered in the template", function() {
    var requestStopped = false;
    uploadInstance._module.stopUploadRequest = function() { requestStopped = true; };
    simulateFileSelect();
    equal($('.k-progress', uploadInstance.wrapper).length, 1);
});


// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / Initial files", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({
            async: {"saveUrl": 'javascript:;', "removeUrl": 'javascript:;' },
            files: [
                { name: "test.doc", size: 50, extension: ".doc"},
                { name: "test1.jpg", size: 60, extension: ".jpg" }
            ]
        });
    },
    teardown: moduleTeardown
});

test("list element is created for each initial file", function(){
    equal($('.k-file', uploadInstance.wrapper).length, 2);
});

test("list elements contain k-file-success class", function(){
    ok($('.k-file', uploadInstance.wrapper).is('.k-file-success'));
});

test("file entries contain 'fileNames' data", function(){
    var firstFileEntry = $('.k-file', uploadInstance.wrapper);
    var expectedFileNamesData = [ { name: "test.doc", size: 50, extension: ".doc"} ];
    var firstFileEntryData = firstFileEntry.data('fileNames');

    delete firstFileEntryData[0].uid;

    deepEqual(firstFileEntryData, expectedFileNamesData);
});

test("file entries contain 'files' data", function(){
    var firstFileEntry = $('.k-file', uploadInstance.wrapper);
    var expectedFilesData = [ { name: "test.doc", size: 50, extension: ".doc"} ];
    var firstFileEntryData = firstFileEntry.data('files');

    delete firstFileEntryData[0].uid;

    deepEqual(firstFileEntryData, expectedFilesData);
});

test("remove icon is rendered for each file entry", function() {
    equal($(".k-i-close", uploadInstance.wrapper).length, 2);
});

test("initial file entries have progress-bar with 0% width", function(){
    equal($(".k-file .k-progress", uploadInstance.wrapper)[0].style.width, "");
});

test("k-upload-pct text is '100%'  for each initially rendered file entry", function(){
    equal($(".k-upload-pct:first", uploadInstance.wrapper).text(), "");
});

// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / Initial files without remove", {
    setup: function() {
        moduleSetup();
        uploadInstance = createUpload({
            async: {"saveUrl": 'javascript:;' },
            files: [
                { name: "test.doc", size: 50, extension: ".doc"},
                { name: "test1.jpg", size: 60, extension: ".jpg" }
            ]
        });
    },
    teardown: moduleTeardown
});

test("remove icon is not rendered for the file entries", function() {
    equal($(".k-i-close", uploadInstance.wrapper).length, 0);
});

// -----------------------------------------------------------------------------------
module("Upload / FormDataUpload / Files prior to initialization", {
    setup: function() {
        moduleSetup();
    },
    teardown: moduleTeardown
});

test("select event is not fired when no files are selected prior to initialization", function(){
    var selectFired = false;

    uploadInstance = createUpload({
        select: function(){
            selectFired = true;
        }
    });

    ok(!selectFired);
});

test("select event is fired when files are selected prior to initialization", function(){
    var selectFired = false;
    removeHTML();
    copyUploadPrototype();

    simulateFileSelect();

    uploadInstance = $('#uploadInstance').kendoUpload({
        async: {
            autoUpload: false,
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;'
        },
        select: function(){
            selectFired = true;
        }
    }).data("kendoUpload");

    ok(selectFired);
});

test("files selected prior to initialization are added to the list", function(){
    removeHTML();
    copyUploadPrototype();

    simulateFileSelect();

    uploadInstance = $('#uploadInstance').kendoUpload({
        async: {
            autoUpload: false,
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;'
        }
    }).data("kendoUpload");

    equal($('.k-file', uploadInstance.wrapper).length, 1);
});

test("files selected prior to initialization issue postFormData", function(){
    var postFormDataCalled = false;

    removeHTML();
    copyUploadPrototype();

    simulateFileSelect();

    uploadInstance = $('#uploadInstance').kendoUpload({
        async: {
            autoUpload: false,
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;'
        }
    }).data("kendoUpload");

    uploadInstance._module.postFormData = function() { postFormDataCalled = true; };

    $(".k-upload-selected", uploadInstance.wrapper).trigger("click");

    ok(postFormDataCalled);
});

// ------------------------------------------------------------
(function() {
    var xhr;
    var headers = {};

    function stubXHR(options) {
        var uploadInstance = createUpload(options);
        uploadInstance._module.postFormData = uploadInstance._module._postFormData;
        uploadInstance._module.createXHR = function() {
            xhr = {
                append: $.noop,
                addEventListener: $.noop,
                setRequestHeader: function(name, value) {
                    headers[name] = value;
                },
                upload: {
                    addEventListener: $.noop
                },
                open: $.noop,
                send: $.noop
            };

            return xhr;
        };
    }

    module("Upload / FormDataUpload / withCredentials", {
        setup: moduleSetup,
        teardown: moduleTeardown
    });

    test("default values is true", function() {
        stubXHR();
        simulateFileSelect();

        ok(xhr.withCredentials);
    });

    test("sets withCredentials to false", function() {
        stubXHR({
            async: {
                saveUrl:"javascript:;",
                autoUpload:true,
                withCredentials: false
            }
        });
        simulateFileSelect();

        ok(!xhr.withCredentials);
    });

    // ------------------------------------------------------------
    (function() {
        module("Upload / FormDataUpload / Headers", {
            setup: moduleSetup,
            teardown: moduleTeardown
        });

        test("Sets Accept header", function() {
            stubXHR();
            simulateFileSelect();

            equal(headers["Accept"], "*/*; q=0.5, application/json");
        });
    })();
})();

})();
