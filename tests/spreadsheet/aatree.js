(function() {
    function AATreeNode(level, value, left, right) {
        this.level = level;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    AATreeNode.prototype.compare = function(value) {
        return this.value - value;
    }

    var NilNode = new AATreeNode(0);
    NilNode.left = NilNode;
    NilNode.right = NilNode;

    function skew(root) {
        if (root.level !== 0) {
            if (root.left.level === root.level) {
                var temp = root;
                root = root.left;
                temp.left = root.right;
                root.right = temp;
            }

            root.right = skew(root.right);
        }

        return root;
    }

    function split(root) {
        if (root.right.right.level === root.level && root.level !== 0) {
            var temp = root;
            root = root.right;
            temp.right = root.left;
            root.left = temp;
            root.level += 1;
            root.right = split(root.right);
        }
        return root;
    }

    function insert(root, value) {
       if (root === NilNode) {
            return new AATreeNode(1, value, NilNode, NilNode);
        } else if (root.value - value > 0) {
            root.left = insert(root.left, value);
        } else {
            root.right = insert(root.right, value);
        }
        return split(skew(root));
    }

    function remove(root, value) {
        if (root !== NilNode) {
            var diff = root.value - value;
            if (diff === 0) {
                if (root.left !== NilNode && root.right !== NilNode) {
                    var heir = root.left;

                    while (heir.right !== NilNode) {
                        heir = heir.right;
                    }

                    root.value = heir.value;
                    root.left = remove(root.left, root.value);
                } else if (root.left === NilNode) {
                    root = root.right;
                } else {
                    root = root.left;
                }
            } else if (diff > 0) {
                root.left = remove(root.left, value);
            } else {
                root.right = remove(root.right, value);
            }
        }

        if (root.left.level  < (root.level - 1) || root.right.level < (root.level - 1)) {
            root.level -= 1;
            if (root.right.level > root.level) {
                root.right.level = root.level;
            }
            root = split(skew(root));
        }

        return root;
    }

    function Range(start, end, value) {
        this.start = start;
        this.end = end;
        this.value = value;
    }

    Range.prototype.valueOf = function() {
        return this.start;
    }

    /*
    range.prototype.within = function(index) {
        return index >= this.start && index <= this.end;
    }
    */

    Range.prototype.intersects = function(range) {
        return range.start <= this.end && range.end >= this.start;
    }

    function AATree() {
        this.root = NilNode;
    }

    AATree.prototype.insert = function(value) {
        this.root = insert(this.root, value);
    }

    AATree.prototype.remove = function(value) {
        this.root = remove(this.root, value);
    };

    AATree.prototype.findrange = function(value) {
        var node = this.root;
        while (node != NilNode)
        {
            if (value < node.value.start)
            {
                node = node.left;
            }
            else if (value > node.value.end)
            {
                node = node.right;
            }
            else
            {
                return node.value;
            }
        }

        return null;
    };

    function values(root, result) {
        if (root === NilNode) {
            return;
        }

        values(root.left, result);
        result.push(root.value);
        values(root.right, result);
    }

    AATree.prototype.values = function() {
        var result = [];
        values(this.root, result);
        return result;
    }

    function intersecting(root, range, ranges) {
        if (root == NilNode) return;

        var value = root.value;

        if (range.start < value.start) {
            intersecting(root.left, range, ranges);
        }

        if (value.intersects(range)) {
            ranges.push(value);
        }

        if (range.end > value.end) {
            intersecting(root.right, range, ranges);
        }
    }

    AATree.prototype.intersecting = function(range) {
        var ranges = [];
        intersecting(this.root, range, ranges);
        return ranges;
    };

    module("aa tree", {

    });

    test("supports insert", 1, function() {
        var tree = new AATree();
        tree.insert(1);

        equal(tree.root.value, 1);
    });

    test("insert greater number puts it on the right", 1, function() {
        var tree = new AATree();
        tree.insert(1);

        tree.insert(2);

        equal(tree.root.right.value, 2);
    });

    test("insert lesser number skews it", 2, function() {
        var tree = new AATree();
        tree.insert(1);
        tree.insert(0);

        equal(tree.root.value, 0);
        equal(tree.root.right.value, 1);
    });

    test("insert 2 greater number splits it", 3, function() {
        var tree = new AATree();
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);

        equal(tree.root.value, 2);
        equal(tree.root.left.value, 1);
        equal(tree.root.right.value, 3);
    });

    test("removing an item works", 2, function() {
        var tree = new AATree();
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);
        tree.insert(4);
        tree.insert(5);

        tree.remove(4);

        equal(tree.root.value, 2);
        equal(tree.root.right.value, 3);
    });

    test("values returns a list of the values", 3, function() {
        var tree = new AATree();
        tree.insert(1);
        tree.insert(2);
        tree.insert(3);

        var values = tree.values();

        equal(values[0], 1);
        equal(values[1], 2);
        equal(values[2], 3);
    });

    /*
    test("benchmark", 0, function() {
        var tree = new AATree();

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
        var tree = new AATree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range1);
        tree.insert(range2);

        equal(tree.root.value, range1);
        equal(tree.root.right.value, range2);
   });

   test("range works in AA tree in reverse insert mode", function() {
        var tree = new AATree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range2);
        tree.insert(range1);

        equal(tree.root.value, range1);
        equal(tree.root.right.value, range2);
   });

    test("insert 2 ranges splits the tree", 3, function() {
        var tree = new AATree();
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
        var tree = new AATree();
        var range = new Range(0, 9);
        tree.insert(range);

        equal(tree.findrange(1), range);
        equal(tree.findrange(0), range);
        equal(tree.findrange(9), range);
    });

    test("find finds the correct second range", 1, function() {
        var tree = new AATree();
        var range1 = new Range(0, 9);
        var range2 = new Range(10, 19);
        tree.insert(range1);
        tree.insert(range2);

        equal(tree.findrange(12), range2);
    });

    test("intersecting finds all matching ranges", 4, function() {
        var tree = new AATree();
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


    function CompressedList(start, end, value) {
        this.tree = new AATree();
        this.tree.insert(new Range(start, end, value));
    }

    CompressedList.prototype.values = function() {
        return this.tree.values();
    }

    CompressedList.prototype.value = function(start, end, value) {
        var ranges = this.tree.intersecting(new Range(start - 1, end + 1, value));

        for (var i = 0, length = ranges.length; i < length; i++) {
            var range = ranges[i];
            this.tree.remove(range);

            if (range.start < start) {
                if (range.value !== value) {
                    this.tree.insert(new Range(range.start, start - 1, range.value));
                } else {
                    start = range.start;
                }
            }

            if (range.end > end) {
                if (range.value !== value) {
                    this.tree.insert(new Range(end + 1, range.end, range.value));
                } else {
                    end = range.end;
                }
            }
        }

        this.tree.insert(new Range(start, end, value));
    }

    module("Compressed list");

    test("starts with a single default range", function() {
        var list = new CompressedList(0, 100, "default");

        var values = list.values();
        equal(values[0].start, 0);
        equal(values[0].end, 100);
        equal(values[0].value, "default");
    });

    test("splits ranges on insert", 9, function() {
        var list = new CompressedList(0, 100, "default");

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
        var list = new CompressedList(0, 100, "default");
        list.value(0, 100, "red");

        var values = list.values();

        equal(values.length, 1);
        equal(values[0].start, 0);
        equal(values[0].end, 100);
        equal(values[0].value, "red");
    });

    test("merges range when value is the same (start)", 4, function() {
        var list = new CompressedList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(15, 30, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges range when value is the same (end)", 4, function() {
        var list = new CompressedList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(5, 15, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 5);
        equal(values[1].end, 20);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (end)", 4, function() {
        var list = new CompressedList(0, 100, "default");
        list.value(10, 20, "red");
        list.value(21, 30, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    test("merges neighbour ranges with same value (start)", 4, function() {
        var list = new CompressedList(0, 100, "default");
        list.value(21, 30, "red");
        list.value(10, 20, "red");

        var values = list.values();

        equal(values.length, 3);
        equal(values[1].start, 10);
        equal(values[1].end, 30);
        equal(values[1].value, "red");
    });

    // Pontential performance tweak - do not perform unnecessary re-creaction of a range
    /*
    test("merges neighbour ranges with same value (end)", 1, function() {
        var list = new CompressedList(0, 100, "default");
        list.value(10, 20, "red");
        var red = list.values()[1];
        list.value(21, 30, "blue");

        equal(list.values()[1], red);
    });
    */
})();
