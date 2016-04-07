(function() {
    var cleaner;

    module("ScriptCleaner", {
        beforeEach: function () {
            cleaner = new kendo.ui.editor.ScriptCleaner();
        }
    });

    test("not applicable when options.none", function () {
        cleaner.options.none = true;
        ok(!cleaner.applicable("<script>"));
    });

    test("applicable when script is defined", function () {
        ok(cleaner.applicable("<script>"));
    });

})();
