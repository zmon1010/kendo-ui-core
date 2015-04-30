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

    test("does not insert range with default value", 1, function() {
        var list = new SparseRangeList(0, 100, "default");
        list.value(10, 20, "default");

        var values = list.intersecting(0, 100);

        equal(values.length, 1);
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

    test("returns sorted indices for a given range", 4, function() {
        var list = new SparseRangeList(0, 100, 0);
        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);

        var indices = list.sortedIndices(11, 13);
        equal(indices.length, 3);
        equal(indices[0].index, 1);
        equal(indices[1].index, 0);
        equal(indices[2].index, 2);
    });

    test("returns sorted indices for a given range with holes", 5, function() {
        var list = new SparseRangeList(0, 100, 0);
        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(14, 14, 3);


        var start = 11;
        var indices = list.sortedIndices(start, start + 3);

        equal(indices.length, 4);

        equal(indices[0].index, 13 - start);
        equal(indices[1].index, 12 - start);
        equal(indices[2].index, 11 - start);
        equal(indices[3].index, 14 - start);
    });

    test("sorts a range from given indices", 4, function() {
        var list = new SparseRangeList(0, 100, 0);
        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(14, 14, 3);

        list.sort(11, 14, [{ index: 2}, {index: 1},{index: 0}, {index: 3}]);

        var values = list.intersecting(0, 100);
        equal(values.length, 5);

        equal(values[1].value, 1);
        equal(values[2].value, 2);
        equal(values[3].value, 3);
    });

    test("finds its last range start", 1, function() {
        var list = new SparseRangeList(0, 100, 0);
        list.value(10, 10, 3);
        list.value(40, 50, 4);
        equal(list.lastRangeStart(), 51);
    })

    test("finds its last range start when empty", 1, function() {
        var list = new SparseRangeList(0, 100, 0);
        equal(list.lastRangeStart(), 0);
    })
})();
