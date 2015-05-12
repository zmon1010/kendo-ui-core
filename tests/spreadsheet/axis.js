(function() {
    var Axis = kendo.spreadsheet.Axis;

    var axis;
    module("Sheet Axis", {
        setup: function() {
            axis = new Axis(999, 15); // count, value
        }
    });

    test("calculates total", function() {
        equal(axis.total, 15000);
    });

    test("updates total", function() {
        axis.value(10, 19, 10)
        equal(axis.total, 14950);
    });

    test("updates visual range", function() {
        axis.visible(20, 200);
        equal(axis.offset, 5);
        equal(axis.start, 1);
        equal(axis.end, 13);
    });

    test("updates visual range (last page)", function() {
        axis.visible(14000, 15100);
        equal(axis.offset, -95);
        equal(axis.start, 933);
        equal(axis.end, 999);
    });

    test("updates visual range (last page)", function() {
        axis.value(10, 19, 10)
        axis.value(30, 39, 10)
        axis.visible(130, 280);

        var visibleValues = axis.visibleValues;

        equal(visibleValues.length, 3);
        equal(visibleValues[0].value, 15);
        equal(visibleValues[1].value, 10);
        equal(visibleValues[2].value, 15);
    });
})();
