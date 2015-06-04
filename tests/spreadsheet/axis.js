(function() {
    var Axis = kendo.spreadsheet.Axis;
    var PaneAxis = kendo.spreadsheet.PaneAxis;

    var axis;
    module("Sheet Axis", {
        setup: function() {
            axis = new Axis(1000, 15); // count, value
        }
    });

    test("calculates total", function() {
        equal(axis.total, 1000 * 15);
    });

    test("setting the value updates the total", function() {
        axis.value(10, 19, 10);

        equal(axis.total, 10 * 10 + (1000 - 10) * 15);
    });

    test("returns the visual range", function() {
        var visible = axis.visible(20, 200);
        equal(visible.offset, -5);
        equal(visible.start, 1);
        equal(visible.end, 13);
    });

    test("returns the visual range (last page)", function() {
        var visible = axis.visible(14000, 15100);
        equal(visible.offset, 95);
        equal(visible.start, 933);
        equal(visible.end, 999);
    });

    test("returns updated visual range (last page)", function() {
        axis.value(10, 19, 10);
        axis.value(30, 39, 10);

        var visible = axis.visible(130, 280);

        var visibleValues = visible.values;

        equal(visibleValues.at(8), 15);
        equal(visibleValues.at(12), 10);
        equal(visibleValues.at(22), 15);
    });


    module("PaneAxis", {
    });

    test("translate returns the same value if the axis is frozen", function() {
       axis = new PaneAxis(new  Axis(10, 2), 0, 2);

       equal(axis.translate(3, 4), 3);
    });

    test("translate adds the offset if the axis is not frozen", function() {
       axis = new PaneAxis(new  Axis(10, 3), 0);

       equal(axis.translate(3, 4), 7);
    });

    test("visible sets the offset of the result to zero if the axis is frozen", function() {
       axis = new PaneAxis(new  Axis(10, 4), 0, 2);

       equal(axis.visible(3, 44).offset, 0);
    });

    test("visible leaves the offset as it is when the axis is not frozen", function() {
       axis = new PaneAxis(new  Axis(10, 5), 0);

       ok(axis.visible(3, 44).offset !== 0);
    });

    test("range returns the start of the axis", function() {
       axis = new PaneAxis(new  Axis(10, 6), 3);

       equal(axis.range().start, 6 * 3);
    });

    test("range returns the end of the axis when frozen", function() {
       axis = new PaneAxis(new  Axis(10, 7), 3, 7);

       equal(axis.range().end, 7 * 7);
    });

    test("range uses the max parameter if not frozen and returns the difference", function() {
       axis = new PaneAxis(new  Axis(10, 8), 3);

       var max = 42;

       equal(axis.range(max).end, max - 3*8);
    });
})();
