(function(){

var uploadInstance, _supportsDrop,
    Upload = kendo.ui.Upload;

function createUpload(options) {
    removeHTML();
    copyUploadPrototype();

    $('#uploadInstance').kendoUpload(options);
    return $('#uploadInstance').data("kendoUpload");
}

function moduleSetup() {
    uploadInstance = createUpload();
    _supportsDrop = Upload.prototype._supportsDrop;
}

function moduleTeardown() {
    Upload.prototype._supportsDrop = _supportsDrop;
    removeHTML();
}

// -----------------------------------------------------------------------------------
module("enable / disable / toggle", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("disable renders k-state-disabled class", function () {
    uploadInstance.disable();
    ok(uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("enable removes k-state-disabled class", function () {
    uploadInstance.disable();
    uploadInstance.enable();
    ok(!uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("enable does not disable the upload", function () {
    uploadInstance.enable();
    ok(!uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("initially disabled state is applied", function () {
    uploadInstance = createUpload({ enabled: false });
    ok(uploadInstance.wrapper.hasClass("k-state-disabled"));
});

test("toggle alternates between states", function() {
    uploadInstance.toggle();
    ok(uploadInstance.wrapper.hasClass("k-state-disabled"));
    uploadInstance.toggle();
    ok(!uploadInstance.wrapper.hasClass("k-state-disabled"));
});

// ------------------------------------------------------------
module("destroy", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("unbinds form submit handler", function() {
    kendo.destroy($("#uploadInstance"));
    ok(!($("#parentForm").data("events") || {}).submit);
});

test("unbinds form reset handler", function() {
    kendo.destroy($("#uploadInstance"));
    ok(!($("#parentForm").data("events") || {}).reset);
});

test("unbinds drop zone handlers", function() {
    Upload.prototype._supportsDrop = function() { return true; };
    uploadInstance = createUpload();

    kendo.destroy($("#uploadInstance"));

    var dropZoneEvents = $(".k-dropzone").data("events") || {};
    ok(!dropZoneEvents.dragenter);
    ok(!dropZoneEvents.dragover);
    ok(!dropZoneEvents.drop);

    var documentEvents = $(document).data("events") || {};
    ok(!documentEvents.dragenter);
    ok(!documentEvents.dragover);
});

// ----------------------------------------------------------------
module("getFiles", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("getFiles returns the correct file name for each file", 2, function() {
    simulateMultipleFileSelect();

    var allFiles = uploadInstance.getFiles();

    equal(allFiles[0].name, "first.txt");
    equal(allFiles[1].name, "second.txt");
});

test("getFiles returns the correct file size for each file", 2, function() {
    simulateMultipleFileSelect();

    var allFiles = uploadInstance.getFiles();

    equal(allFiles[0].size, 1);
    equal(allFiles[1].size, 2);
});

// ----------------------------------------------------------------
module("focus", {
    setup: moduleSetup,
    teardown: moduleTeardown
});

test("focus adds k-state-focused to the upload button", function() {
    uploadInstance.focus();

    ok($(".k-upload-button", uploadInstance.wrapper).hasClass("k-state-focused"));
});

test("focus method sets the document's active element to the upload's element", function() {
    uploadInstance.focus();

    equal(document.activeElement.id, uploadInstance.element.attr("id"));
});

})();
