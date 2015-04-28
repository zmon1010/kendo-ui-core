(function() {
    var SparseRangeList = kendo.spreadsheet.SparseRangeList;

    module("Range List");

    test("starts empty", function() {
        var list = new SparseRangeList(0, 100, "default");

        equal(list.tree.values().length, 0);
    });

    test("splits ranges on insert", 10, function() {
        var list = new SparseRangeList(0, 100, "default");

        list.value(10, 20, "red");

        var values = list.intersecting(0, 100);

        equal(values.length, 3);

        equal(values[0].start, 0);
        equal(values[0].end, 9);
        equal(values[0].value, "default");

        equal(values[1].start, 10);
        equal(values[1].end, 20);
        equal(values[1].value, "red");

        equal(values[2].start, 21);
        equal(values[2].end, 100);
        equal(values[2].value, "default");
    });

    test("replaces range on match", 4, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(0, 100, "red");

        var values = list.intersecting(0, 100);

        equal(values.length, 1);
        equal(values[0].start, 0);
        equal(values[0].end, 100);
        equal(values[0].value, "red");
    });

    test("returns value for a given range", 1, function() {
        var list = new SparseRangeList(0, 100, "default");
        equal(list.value(10, 20), "default");
    });

    test("merges range when value is the same (start)", 4, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(15, 30, "red");

        var values = list.intersecting(0, 100);

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges range when value is the same (end)", 4, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(5, 15, "red");

        var values = list.intersecting(0, 100);

        equal(values.length, 3);
        equal(values[1].start, 5);
        equal(values[1].end, 20);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (end)", 4, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(21, 30, "red");

        var values = list.intersecting(0, 100);

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (start)", 4, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(21, 30, "red");
        list.value(10, 20, "red");

        var values = list.intersecting(0, 100);

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("preserves neighbour ranges with a different value", 1, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(10, 20, "red");
        var red = list.intersecting(0, 100)[1];
        list.value(21, 30, "blue");

        equal(list.intersecting(0, 100)[1], red);
    });
})();
