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

    function Run(start, end, value) {
        this.start = start;
        this.end = end;
        this.value = value;
    }

    Run.prototype.valueOf = function() {
        return this.start;
    }

    /*
    Run.prototype.within = function(index) {
        return index >= this.start && index <= this.end;
    }
    */

    Run.prototype.intersects = function(run) {
        return run.start < this.end && run.end > this.start;
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

    AATree.prototype.findRun = function(value) {
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

    function intersecting(root, run, runs) {
        if (root == NilNode) return;

        var value = root.value;

        if (run.start < value.start) {
            intersecting(root.left, run, runs);
        }

        if (value.intersects(run)) {
            runs.push(value);
        }

        if (run.end > value.end) {
            intersecting(root.right, run, runs);
        }
    }

    AATree.prototype.intersecting = function(run) {
        var runs = [];
        intersecting(this.root, run, runs);
        return runs;
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
        var run1 = new Run(0, 9);
        var run2 = new Run(10, 19);
        tree.insert(run1);
        tree.insert(run2);

        equal(tree.root.value, run1);
        equal(tree.root.right.value, run2);
   });

   test("range works in AA tree in reverse insert mode", function() {
        var tree = new AATree();
        var run1 = new Run(0, 9);
        var run2 = new Run(10, 19);
        tree.insert(run2);
        tree.insert(run1);

        equal(tree.root.value, run1);
        equal(tree.root.right.value, run2);
   });

    test("insert 2 ranges splits the tree", 3, function() {
        var tree = new AATree();
        tree.insert(new Run(0, 9));
        tree.insert(new Run(10, 19));
        tree.insert(new Run(20, 29));

        equal(tree.root.value.start, 10);
        equal(tree.root.left.value.start, 0);
        equal(tree.root.right.value.start, 20);
    });

    test("intersects with works for overlaps", function() {
        var run1 = new Run(0, 9);
        var run2 = new Run(5, 14);
        var run3 = new Run(10, 19);
        var run4 = new Run(-10, -5);

        ok(run1.intersects(run2));
        ok(!run1.intersects(run3));
        ok(!run1.intersects(run4));
    });

    module("AA tree search", {});

    test("find finds the correct range", 3, function() {
        var tree = new AATree();
        var run = new Run(0, 9);
        tree.insert(run);

        equal(tree.findRun(1), run);
        equal(tree.findRun(0), run);
        equal(tree.findRun(9), run);
    });

    test("find finds the correct second range", 1, function() {
        var tree = new AATree();
        var run1 = new Run(0, 9);
        var run2 = new Run(10, 19);
        tree.insert(run1);
        tree.insert(run2);

        equal(tree.findRun(12), run2);
    });

    test("intersecting finds all matching ranges", 4, function() {
        var tree = new AATree();
        tree.insert(new Run(0, 9));
        tree.insert(new Run(10, 19));
        tree.insert(new Run(20, 29));
        tree.insert(new Run(30, 39));
        tree.insert(new Run(40, 49));

        var found = tree.intersecting(new Run(15, 39));
        equal(found.length, 3);
        equal(found[0].start, 10);
        equal(found[1].end, 29);
        equal(found[2].end, 39);
    });
})();
