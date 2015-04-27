(function() {
    var RangeTree = kendo.spreadsheet.RangeTree;
    var RangeList = kendo.spreadsheet.RangeList;
    var Range = kendo.spreadsheet.Range;

    var tree;
    module("aa tree", {
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

    /*
     test("benchmark", 0, function() {
     var tree = new RangeTree();

     for (var i = 0; i < 1e5; i ++) {
     tree.insert(parseInt(Math.sin(i) * 10000));
     }

     for (var i = 0; i < 1e5; i ++) {
     tree.remove(parseInt(Math.sin(i) * 10000));
     }
     });
    */

    module("Range");

    test("range works in AA tree", function() {
        var tree = new RangeTree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range1);
        tree.insert(range2);

        equal(tree.root.value, range1);
        equal(tree.root.right.value, range2);
    });

    test("range works in AA tree in reverse insert mode", function() {
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

    module("AA tree search", {});

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

        var found = tree.intersecting(new Range(15, 39));
        equal(found.length, 3);
        equal(found[0].start, 10);
        equal(found[1].end, 29);
        equal(found[2].end, 39);
    });

    module("Compressed list");

    test("starts with a single default range", function() {
        var list = new RangeList(0, 100, "default");

        var values = list.values();
        equal(values[0].start, 0);
        equal(values[0].end, 100);
        equal(values[0].value, "default");
    });

    test("splits ranges on insert", 9, function() {
        var list = new RangeList(0, 100, "default");

        list.value(10, 20, "red");

        var values = list.values();

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
})();
