function uploadClearEvent(params) {
    var createUpload = params.createUpload;
    var simulateFileSelect = params.simulateFileSelect;
    var noAutoConfig = params.noAutoConfig;
    test("clear event is fired when clear button is clicked", function() {
        var noAutoConfigClearEvent = $.extend({}, noAutoConfig, { clear: function(e) {

            ok(true)
            }
        });
        var uploadInstance = createUpload(noAutoConfigClearEvent);

        simulateFileSelect();
        $(".k-clear-selected", uploadInstance.wrapper).trigger("click");       
    });

     test("cancelling clear event prevents files to be removed", function() {
        var noAutoConfigClearEvent = $.extend({}, noAutoConfig, { clear: function(e) {

            e.preventDefault();
            }
        });
        var uploadInstance = createUpload(noAutoConfigClearEvent);

        simulateFileSelect();
        $(".k-clear-selected", uploadInstance.wrapper).trigger("click");
        equal($(".k-upload-files li.k-file", uploadInstance.wrapper).length, 1);
    });

    
}