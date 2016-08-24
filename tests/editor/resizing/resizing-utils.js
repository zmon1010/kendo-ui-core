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

    module("editor resizing utils inPixels", {
    });

    test("should not match number", function() {
        equal(utils.inPixels(123), false);
    });

    test("should match integer number", function() {
        equal(utils.inPixels("123px"), true);
    });

    test("should match float number", function() {
        equal(utils.inPixels("123.45px"), true);
    });

    test("should not match number in percentages", function() {
        equal(utils.inPixels("123%"), false);
    });

    test("should not match float number in percentages", function() {
        equal(utils.inPixels("123.45%"), false);
    });

    test("should not match number without unit", function() {
        equal(utils.inPixels("123"), false);
    });

    test("should not match float number without unit", function() {
        equal(utils.inPixels("123.45"), false);
    });

    module("editor resizing utils toPixels", {
    });

    test("should add pixels to number", function() {
        equal(utils.toPixels(123), "123px");
    });

    test("should not add pixels to string in pixels", function() {
        equal(utils.toPixels("123px"), "123px");
    });

    test("should add pixels to string in percentages", function() {
        equal(utils.toPixels("123%"), "123px");
    });
})();