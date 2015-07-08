(function() {
    var RangeList = kendo.spreadsheet.RangeList;

    module("Range List");

    test("starts with a single default range", function() {
        var list = new RangeList(0, 100, "default");

        var values = list.values();
        equal(values[0].start, 0);
        equal(values[0].end, 100);
        equal(values[0].value, "default");
    });

    test("splits ranges on insert", 10, function() {
        var list = new RangeList(0, 100, "default");

        list.value(10, 20, "red");

        var values = list.values();

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
        var list = new RangeList(0, 100, "default");
        list.value(0, 100, "red");

        var values = list.values();

        equal(values.length, 1);
        equal(values[0].start, 0);
        equal(values[0].end, 100);
        equal(values[0].value, "red");
    });

    test("returns value for a given range", 1, function() {
        var list = new RangeList(0, 100, "default");
        equal(list.value(10, 20), "default");
    });

    test("merges range when value is the same (start)", 4, function() {
        var list = new RangeList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(15, 30, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges range when value is the same (end)", 4, function() {
        var list = new RangeList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(5, 15, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 5);
        equal(values[1].end, 20);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (end)", 4, function() {
        var list = new RangeList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(21, 30, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (start)", 4, function() {
        var list = new RangeList(0, 100, "default");
        list.value(21, 30, "red");
        list.value(10, 20, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (end)", 1, function() {
        var list = new RangeList(0, 100, "default");
        list.value(10, 20, "red");
        var red = list.values()[1];
        list.value(21, 30, "blue");

        equal(list.values()[1], red);
    });

    test("returns sorted indices for a given range", 4, function() {
        var list = new RangeList(0, 100, 0);
        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);

        var indices = list.sortedIndices(11, 13, kendo.spreadsheet.Sorter.ascendingComparer);
        equal(indices.length, 3);
        equal(indices[0].index, 1);
        equal(indices[1].index, 0);
        equal(indices[2].index, 2);
    });

    test("sorts a range from given indices", 3, function() {
        var list = new RangeList(0, 100, 0);
        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);

        list.sort(11, 13, [{index: 1}, {index: 0}, {index: 2}]);

        var values = list.values();
        equal(values[1].value, 1);
        equal(values[2].value, 2);
        equal(values[3].value, 3);
    });

    test("copy copies the source value to the target", 1, function() {
        var list = new RangeList(0, 100, 0);

        list.value(11, 11, 2);
        list.value(12, 12, 1);

        list.copy(12, 12, 11);

        equal(list.value(11, 11), 1);
    });

    test("copy copies the multiple source values to the target position", 2, function() {
        var list = new RangeList(0, 100, 0);

        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);

        list.copy(12, 13, 11);

        equal(list.value(11, 11), 1);
        equal(list.value(12, 12), 3);
    });

    test("copy works in both directions", 1, function() {
        var list = new RangeList(0, 100, 0);

        list.value(11, 11, 2);
        list.value(12, 12, 1);

        list.copy(11, 11, 12);

        equal(list.value(12, 12), 2);
    });

    test("copy copies the multiple source values to the target position - both directions", 4, function() {
        var list = new RangeList(0, 100, 0);

        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);
        list.value(14, 14, 4);

        list.copy(11, 12, 13);

        equal(list.value(11, 11), 2);
        equal(list.value(12, 12), 1);
        equal(list.value(13, 13), 2);
        equal(list.value(14, 14), 1);
    });

    test("copy does not change values if target is same as source", 4, function() {
        var list = new RangeList(0, 100, 0);

        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);
        list.value(14, 14, 4);

        list.copy(11, 12, 11);

        equal(list.value(11, 11), 2);
        equal(list.value(12, 12), 1);
        equal(list.value(13, 13), 3);
        equal(list.value(14, 14), 4);
    });

    test("copy copies the multiple source values to the overlapping target position", 4, function() {
        var list = new RangeList(0, 100, 0);

        list.value(11, 11, 2);
        list.value(12, 12, 1);
        list.value(13, 13, 3);
        list.value(14, 14, 4);

        list.copy(11, 12, 12);

        equal(list.value(11, 11), 2);
        equal(list.value(12, 12), 2);
        equal(list.value(13, 13), 1);
        equal(list.value(14, 14), 4);
    });


})();
