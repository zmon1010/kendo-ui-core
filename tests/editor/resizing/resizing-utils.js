(function() {
    var utils = kendo.ui.editor.ResizingUtils;

    module("editor resizing utils inPercentages", {
    });

    test("should match integer number", function() {
        equal(utils.inPercentages("123%"), true);
    });

    test("should match float number", function() {
        equal(utils.inPercentages("123.45%"), true);
    });

    test("should not match number in pixels", function() {
        equal(utils.inPercentages("123px"), false);
    });

    test("should not match float number in pixels", function() {
        equal(utils.inPercentages("123.45px"), false);
    });

    test("should not match number without unit", function() {
        equal(utils.inPercentages("123"), false);
    });

    test("should not match float number without unit", function() {
        equal(utils.inPercentages("123.45"), false);
    });
})();