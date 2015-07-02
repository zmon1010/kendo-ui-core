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
        equal(visible.values.start, 1);
        equal(visible.values.end, 13);
    });

    test("returns the visual range (last page)", function() {
        var visible = axis.visible(14000, 15100);
        equal(visible.offset, 95);
        equal(visible.values.start, 933);
        equal(visible.values.end, 999);
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

    test("hiding updates total", function() {
        axis.hide(1);

        equal(axis.total, 999 * 15);
    });

    test("hidden values are not summed", function() {
        axis.hide(1);

        equal(axis.sum(0, 2), 2 * 15);
    });

    test("hidden values are invisible (first value hidden)", function() {
        axis.hide(0);

        var visible = axis.visible(0, 30);

        equal(visible.values.start, 1)
        equal(visible.values.end, 3)
    });

    test("hidden values are invisible (second value hidden)", function() {
        axis.hide(1);

        var visible = axis.visible(0, 30);

        equal(visible.values.start, 0)
        equal(visible.values.end, 3)
    });

    test("hidden return true for hidden values", function() {
        axis.hide(1);
        equal(axis.hidden(1), true)
    });

    test("values are not hidden by default", function() {
        equal(axis.hidden(1), false)
    });

    test("unhidden values update total", function() {
        axis.hide(1);
        axis.unhide(1);

        equal(axis.total, 1000 * 15);
    });

    test("unhidden values are not hidden", function() {
        axis.hide(1);
        axis.unhide(1);

        equal(axis.hidden(1), false);
    });

    test("visible values cannot be unhidden", function() {
        axis.unhide(1);

        equal(axis.total, 1000 * 15);
    });

    module("PaneAxis", {
    });

    test("visible sets the offset of the result to zero if the axis is frozen", function() {
       axis = new PaneAxis(new  Axis(10, 4), 0, 2, 10);

       equal(axis.visible(3, 44).offset, 10);
    });

    test("visible leaves the offset as it is when the axis is not frozen", function() {
       axis = new PaneAxis(new  Axis(10, 5), 0, 10);

       ok(axis.visible(3, 44).offset !== 0);
    });
})();
