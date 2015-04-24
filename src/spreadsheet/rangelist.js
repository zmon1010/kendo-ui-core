(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    function RangeTreeNode(level, value, left, right) {
        this.level = level;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    var NilNode = new RangeTreeNode(0);
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
            return new RangeTreeNode(1, value, NilNode, NilNode);
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

    Range.prototype.intersects = function(range) {
        return range.start <= this.end && range.end >= this.start;
    }

    function RangeTree() {
        this.root = NilNode;
    }

    RangeTree.prototype.insert = function(value) {
        this.root = insert(this.root, value);
    }

    RangeTree.prototype.remove = function(value) {
        this.root = remove(this.root, value);
    };

    RangeTree.prototype.findrange = function(value) {
        var node = this.root;
        while (node != NilNode) {
            if (value < node.value.start) {
                node = node.left;
            } else if (value > node.value.end) {
                node = node.right;
            } else {
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

    RangeTree.prototype.values = function() {
        var result = [];
        values(this.root, result);
        return result;
    }

    function intersecting(root, range, ranges) {
        if (root === NilNode) {
            return;
        }

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

    RangeTree.prototype.intersecting = function(range) {
        var ranges = [];
        intersecting(this.root, range, ranges);
        return ranges;
    };

    function map(tree, root, callback) {
        if (root === NilNode) {
            return;
        }

        map(tree, root.left, callback);
        tree.insert(callback(root.value));
        map(tree, root.right, callback);
    }

    RangeTree.prototype.map = function(callback) {
        var tree = new RangeTree();
        map(tree, this.root, callback);
        return tree;
    };

    function RangeList(start, end, value) {
        if (end == undefined) {
            this.tree = start;
        } else {
            this.tree = new RangeTree();
            this.tree.insert(new Range(start, end, value));
        }
    }

    RangeList.prototype.values = function() {
        return this.tree.values();
    }

    RangeList.prototype.map = function(callback) {
        return new RangeList(this.tree.map(callback));
    }

    RangeList.prototype.intersecting = function(start, end) {
        return this.tree.intersecting(new Range(start, end));
    }

    RangeList.prototype.value = function(start, end, value) {
        if (value === undefined) {
            return this.tree.intersecting(new Range(start, end))[0].value;
        }

        var ranges = this.tree.intersecting(new Range(start - 1, end + 1, value));

        var firstRange = ranges[0], lastRange = ranges[ranges.length - 1];

        if (firstRange.end < start) {
            if (firstRange.value === value) {
                start = firstRange.start;
            } else {
                ranges.shift();
            }
        }

        if (lastRange.start > end) {
            if (lastRange.value === value) {
                end = lastRange.end;
            } else {
                ranges.pop();
            }
        }

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

    kendo.spreadsheet = {
        RangeTree: RangeTree,
        RangeList: RangeList,
        Range: Range
    };

})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
