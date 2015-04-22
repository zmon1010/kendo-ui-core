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

    function AATree() {
        this.root = NilNode;
    }

    AATree.prototype.insert = function(value) {
        this.root = insert(this.root, value);
    }

    AATree.prototype.remove = function(value) {
        this.root = remove(this.root, value);
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

        console.profile("insert");
        for (var i = 0; i < 1e5; i ++) {
            tree.insert(parseInt(Math.sin(i) * 10000));
        }
        console.profileEnd("insert");

        console.profile("delete");
        for (var i = 0; i < 1e5; i ++) {
            tree.remove(parseInt(Math.sin(i) * 10000));
        }
        console.profileEnd("delete");

    });
    */
})();
