function validation(params) {
    var createUpload = params.createUpload;
    var autoConfig = { 
        async: {
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;' 
        }
    };

    var noAutoConfig = { 
        async: {
            "saveUrl": 'javascript:;',
            "removeUrl": 'javascript:;',
            autoUpload: false 
        }
    };

    test("Upload without validation allows selection of any file type", 2, function() {
        var uploadInstance = createUpload(noAutoConfig);
        var allFiles;

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.txt");

        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors === undefined);
        ok(allFiles[1].validationErrors === undefined);
    });

    test("Upload with file extension validation adds validation error", 2, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));
        var allFiles;

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.txt");

        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors === undefined);
        ok(allFiles[1].validationErrors && allFiles[1].validationErrors[0] === "invalidFileExtension");
    });

    test("Upload with file extension validation adds validation message", 1, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateFileSelect("second.png");

        equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidFileExtension);
    });

    test("Upload with max file size validation adds validation error", 2, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                maxFileSize: 1
            }
        }));
        var allFiles;

        simulateMultipleFileSelect();
        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors === undefined);
        ok(allFiles[1].validationErrors && allFiles[1].validationErrors[0] === "invalidMaxFileSize");
    });

    test("Upload with max file size validation adds validation message", 1, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                maxFileSize: 1
            }
        }));

        simulateSingleFileSelect("first.png", 2);

        equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidMaxFileSize);
    });

    test("Upload with min file size validation adds validation error", 2, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                minFileSize: 2
            }
        }));
        var allFiles;

        simulateMultipleFileSelect();
        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors && allFiles[0].validationErrors[0] === "invalidMinFileSize");
        ok(allFiles[1].validationErrors === undefined);
    });

    test("Upload with min file size validation adds validation message", 1, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                minFileSize: 2
            }
        }));

        simulateSingleFileSelect("first.png", 1);

        equal($(".k-file span.k-file-validation-message").text(), uploadInstance.localization.invalidMinFileSize);
    });

    test("Upload file extension validation works for multiple allowed extensions", 3, function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg", ".png"]
            }
        }));
        var allFiles;

        simulateFileSelect("first.jpg");
        simulateFileSelect("second.png");
        simulateFileSelect("third.txt");

        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors === undefined);
        ok(allFiles[1].validationErrors === undefined);
        ok(allFiles[2].validationErrors && allFiles[2].validationErrors[0] === "invalidFileExtension");
    });

    test("Upload adds multiple validation errors when file fails on multiple criteria", function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"],
                minFileSize: 2
            }
        }));
        var allFiles;

        simulateSingleFileSelect("first.png", 1);
        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors && allFiles[0].validationErrors.length === 2);
    });

    test("Upload files button is not displayed when only invalid files are selected", function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.png");

        ok($(".k-upload-selected", uploadInstance.wrapper).length === 0);
    });

    test("Upload files button is displayed when there is at least one valid file", function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.png");
        simulateSingleFileSelect("first.jpg");

        ok($(".k-upload-selected", uploadInstance.wrapper).length === 1);
    });

    test("Upload files button is hidden when after removing a file only invalid ones are left", function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.jpg");
        simulateSingleFileSelect("first.png");
        simulateRemoveClick(0);

        ok($(".k-upload-selected", uploadInstance.wrapper).length === 0);
    });

    test("Upload request is not initiated when selecting invalid file", function(){
        var uploadFired = false;

        var uploadInstance = createUpload($.extend({}, autoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            },
            upload: function() {
                uploadFired = true;
            }
        }));

        simulateFileSelect("first.txt");

        ok(!uploadFired);
    });

    test("Invalid file can be removed normally from the list", function(){
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"]
            }
        }));

        simulateSingleFileSelect("first.png");
        simulateRemoveClick(0);

        equal($(".k-file", uploadInstance.wrapper).length, 0);
    });

    test("Upload clears validation errors on a new try", function() {
        var uploadInstance = createUpload($.extend({}, noAutoConfig, {
            validation: {
                allowedExtensions: [".jpg"],
                minFileSize: 2
            }
        }));
        var allFiles;

        simulateSingleFileSelect("first.png", 1);
        allFiles = uploadInstance.getFiles();

        ok(allFiles[0].validationErrors);
        equal(allFiles[0].validationErrors.length, 2);

        simulateRemoveClick(0);
        allFiles = uploadInstance.getFiles();
        
        notOk(allFiles.length);

        simulateSingleFileSelect("first.jpg", 3);

        allFiles = uploadInstance.getFiles();

        notOk(allFiles[0].validationErrors);
    });
}