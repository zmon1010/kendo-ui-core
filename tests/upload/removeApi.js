function removeApi(params) {
    var createUpload = params.createUpload;
    var simulateFileSelect = params.simulateFileSelect;
    var simulateUpload = params.simulateUpload;
    var getFileUid = params.getFileUid;
    var simulateUploadWithResponse = params.simulateUploadWithResponse;
    var errorResponse = params.errorResponse;
    
    asyncTest("removeFileByUid removes successfully uploaded file", function() {
        var uploadInstance = createUpload();

        simulateUpload();

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.removeFileByUid(getFileUid(0));

        setTimeout(function(){
            equal($(".k-file", uploadInstance.wrapper).length, 0);
            start();
        }, 100);
    });

    test("removeFileByUid removes unsuccessfully uploaded file", function() {
        var uploadInstance = createUpload();
        
        simulateUploadWithResponse(errorResponse);

        uploadInstance.removeFileByUid(getFileUid(0));
        
        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("removeFileByUid removes currently uploaded file", function() {
        var uploadInstance = createUpload();
        
        simulateFileSelect();
        
        uploadInstance.removeFileByUid(getFileUid(0));
        
        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    asyncTest("Removing a file with removeFileByUid correctly updates the header status", 2, function() {
        var uploadInstance = createUpload();

        simulateUpload();
        simulateUploadWithResponse(errorResponse, undefined, 1);
   
        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });

        uploadInstance.removeFileByUid(getFileUid(1));

        setTimeout(function(){
            var statusTotal = uploadInstance.wrapper.find(".k-upload-status-total span");

            ok(statusTotal.hasClass("k-i-tick"));
            ok(!statusTotal.hasClass("k-warning"));

            start();
        }, 100);
    });

    test("Removing a file with removeFileByUid triggers remove request", function() {
        var uploadInstance = createUpload();
        var removeCalled = false;
        
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        uploadInstance.removeFileByUid(getFileUid(0));

        ok(removeCalled);
    });

    asyncTest("removeAllFiles removes all files", function() {
        var uploadInstance = createUpload();
        
        simulateFileSelect();
        simulateUpload();
        simulateUploadWithResponse(errorResponse);

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });
        
        uploadInstance.removeAllFiles();
        
        setTimeout(function() {
            equal($(".k-file", uploadInstance.wrapper).length, 0);
            start();
        }, 100);
    });

    test("removeAllFiles triggers remove requests", function() {
        var uploadInstance = createUpload();
        
        simulateUpload(0);
        simulateUpload(1);
        simulateUpload(2);

        var removeCalledCount = 0;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalledCount += 1;
        };

        uploadInstance.removeAllFiles();
        equal(removeCalledCount, 3);
    });

    test("clearFileByUid removes successfully uploaded file", function() {
        var uploadInstance = createUpload();
        
        simulateUpload();

        uploadInstance.clearFileByUid(getFileUid(0));
        
        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("clearFileByUid removes unsuccessfully uploaded file", function() {
        var uploadInstance = createUpload();
        
        simulateUploadWithResponse(errorResponse);
        
        uploadInstance.clearFileByUid(getFileUid(0));
        
        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("clearFileByUid removes currently uploaded file", function() {
        var uploadInstance = createUpload();
        
        simulateFileSelect();
        
        uploadInstance.clearFileByUid(getFileUid(0));
        
        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    asyncTest("Clearing a file with clearFileByUid correctly updates the header status", 2, function() {
        var uploadInstance = createUpload();

        simulateUpload();
        simulateUploadWithResponse(errorResponse, undefined, 1);
        
        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });
        
        uploadInstance.clearFileByUid(getFileUid(1));
        
        setTimeout(function(){
            var statusTotal = uploadInstance.wrapper.find(".k-upload-status-total span");
        
            ok(statusTotal.hasClass("k-i-tick"));
            ok(!statusTotal.hasClass("k-warning"));
            
            start();
        }, 100);
        
    });

    test("Clearing a file with clearFileByUid does not trigger remove request", function() {
        var uploadInstance = createUpload();
        var removeCalled = false;
        
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalled = true;
        };

        simulateUpload();
        uploadInstance.clearFileByUid(getFileUid(0));

        ok(!removeCalled);
    });

    asyncTest("clearAllFiles clears all files", function() {
        var uploadInstance = createUpload();
        
        simulateFileSelect();
        simulateUpload();
        simulateUploadWithResponse(errorResponse);

        $.mockjax({
            url: "/removeAction",
            responseTime: 0,
            responseText: ""
        });
        
        uploadInstance.clearAllFiles();
        
        setTimeout(function() {
            equal($(".k-file", uploadInstance.wrapper).length, 0);
            start();
        }, 100);
    });

    test("clearAllFiles does not trigger remove requests", function() {
        var uploadInstance = createUpload();
        
        simulateUpload();
        simulateUpload();
        simulateUpload();

        var removeCalledCount = 0;
        uploadInstance._submitRemove = function(data, onSuccess) {
            removeCalledCount += 1;
        };

        uploadInstance.clearAllFiles();
        equal(removeCalledCount, 0);
    });
}