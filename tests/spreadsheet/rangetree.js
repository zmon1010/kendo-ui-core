(function() {
    var RangeTree = kendo.spreadsheet.RangeTree;
    var Range = kendo.spreadsheet.Range;

    var tree;
    module("range tree", {
        setup: function() {
            tree = new RangeTree();
        }
    });

    function insert(value) {
       tree.insert(new Range(value, value, value));
    }

    test("supports insert", 1, function() {
        insert(1);
        equal(tree.root.value.value, 1);
    });


    test("insert greater number puts it on the right", 1, function() {
        insert(1);
        insert(2);

        equal(tree.root.right.value.value, 2);
    });

    test("insert lesser number skews it", 2, function() {
        insert(1);
        insert(0);
        equal(tree.root.value.value, 0);
        equal(tree.root.right.value.value, 1);
    });

    test("insert 2 greater number splits it", 3, function() {
        insert(1);
        insert(2);
        insert(3);

        equal(tree.root.value.value, 2);
        equal(tree.root.left.value.value, 1);
        equal(tree.root.right.value.value, 3);
    });

    test("map produces new tree", 6, function() {
        insert(1);
        insert(2);
        insert(3);

        var i = 0;
        tree = tree.map(function(range) {
            i ++;
            if (i == 1) {
                equal(range.value, 1);
            } else if (i == 2) {
                equal(range.value, 2);
            } else if (i == 3) {
                equal(range.value, 3);
            }

            return new Range(range.start, range.end, range.value * 2);
        });

        var values = tree.values();

        equal(values[1].value, 4);
        equal(values[0].value, 2);
        equal(values[2].value, 6);
    });

    test("removing an item works", 2, function() {
        insert(1);
        insert(2);
        insert(3);
        insert(4);
        insert(5);

        tree.remove(new Range(4, 4, 4));

        equal(tree.root.value.value, 2);
        equal(tree.root.right.value.value, 3);
    });

    test("values returns a list of the values", 3, function() {
        insert(1);
        insert(2);
        insert(3);

        var values = tree.values();

        equal(values[0].value, 1);
        equal(values[1].value, 2);
        equal(values[2].value, 3);
    });

    module("Range");

    test("range works in range tree", function() {
        var tree = new RangeTree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range1);
        tree.insert(range2);

        equal(tree.root.value, range1);
        equal(tree.root.right.value, range2);
    });

    test("range works in range tree in reverse insert mode", function() {
        var tree = new RangeTree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range2);
        tree.insert(range1);

        equal(tree.root.value, range1);
        equal(tree.root.right.value, range2);
    });

    test("insert 2 ranges splits the tree", 3, function() {
        var tree = new RangeTree();
        tree.insert(new Range(0, 9));
        tree.insert(new Range(10, 19));
        tree.insert(new Range(20, 29));

        equal(tree.root.value.start, 10);
        equal(tree.root.left.value.start, 0);
        equal(tree.root.right.value.start, 20);
    });

    test("intersects with works for overlaps", function() {
        var range1 = new Range(0, 9);
        var range2 = new Range(5, 14);
        var range3 = new Range(10, 19);
        var range4 = new Range(-10, -5);

        ok(range1.intersects(range2));
        ok(!range1.intersects(range3));
        ok(!range1.intersects(range4));
    });

    test("intersects with works on edges", function() {
        var range1 = new Range(0, 9);
        var range2 = new Range(9, 14);

        ok(range1.intersects(range2));
    });

    module("range tree search", {});

    test("find finds the correct range", 3, function() {
        var tree = new RangeTree();
        var range = new Range(0, 9);
        tree.insert(range);

        equal(tree.findrange(1), range);
        equal(tree.findrange(0), range);
        equal(tree.findrange(9), range);
    });

    test("find finds the correct second range", 1, function() {
        var tree = new RangeTree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range1);
        tree.insert(range2);

        equal(tree.findrange(12), range2);
    });

    test("intersecting finds all matching ranges", 4, function() {
        var tree = new RangeTree();
        tree.insert(new Range(0, 9));
        tree.insert(new Range(10, 19));
        tree.insert(new Range(20, 29));
        tree.insert(new Range(30, 39));
        tree.insert(new Range(40, 49));

        var found = tree.intersecting(15, 39);
        equal(found.length, 3);
        equal(found[0].start, 10);
        equal(found[1].end, 29);
        equal(found[2].end, 39);
    });
})();
