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

    function skew(node) {
        if (node.left.level === node.level) {
            var temp = node;
            node = node.left;
            temp.left = node.right;
            node.right = temp;
        }

        return node;
    }

    function split(node) {
        if (node.right.right.level === node.level) {
            var temp = node;
            node = node.right;
            temp.right = node.left;
            node.left = temp;
            node.level += 1;
        }

        return node;
    }

    function insert(node, value) {
        if (node === NilNode) {
            return new RangeTreeNode(1, value, NilNode, NilNode);
        } else if (node.value.start - value.start > 0) {
            node.left = insert(node.left, value);
        } else {
            node.right = insert(node.right, value);
        }

        return split(skew(node));
    }

    function remove(node, value) {
        if (node === NilNode) {
            return node;
        }

        var diff = node.value.start - value.start;
        if (diff === 0) {
            if (node.left !== NilNode && node.right !== NilNode) {
                var heir = node.left;

                while (heir.right !== NilNode) {
                    heir = heir.right;
                }

                node.value = heir.value;
                node.left = remove(node.left, node.value);
            } else if (node.left === NilNode) {
                node = node.right;
            } else {
                node = node.left;
            }
        } else if (diff > 0) {
            node.left = remove(node.left, value);
        } else {
            node.right = remove(node.right, value);
        }

        if (node.left.level < (node.level - 1) || node.right.level < (node.level - 1)) {
            node.level -= 1;
            if (node.right.level > node.level) {
                node.right.level = node.level;
            }

            node = skew(node);
            node.right = skew(node.right);
            node.right.right = skew(node.right.right);
            node = split(node);
            node.right = split(node.right);
        }

        return node;
    }

    function Range(start, end, value) {
        this.start = start;
        this.end = end;
        this.value = value;
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

    function values(node, result) {
        if (node === NilNode) {
            return;
        }

        values(node.left, result);
        result.push(node.value);
        values(node.right, result);
    }

    RangeTree.prototype.values = function() {
        var result = [];
        values(this.root, result);
        return result;
    }

    function intersecting(node, range, ranges) {
        if (node === NilNode) {
            return;
        }

        var value = node.value;

        if (range.start < value.start) {
            intersecting(node.left, range, ranges);
        }

        if (value.intersects(range)) {
            ranges.push(value);
        }

        if (range.end > value.end) {
            intersecting(node.right, range, ranges);
        }
    }

    RangeTree.prototype.intersecting = function(start, end) {
        var ranges = [];
        intersecting(this.root, new Range(start, end), ranges);
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
        return this.tree.intersecting(start, end);
    }

    RangeList.prototype.insert = function(start, end, value) {
        return this.tree.insert(new Range(start, end, value));
    }

    RangeList.prototype.value = function(start, end, value) {
        if (value === undefined) {
            return this.intersecting(start, end)[0].value;
        }

        var ranges = this.tree.intersecting(start - 1, end + 1);

        if (ranges.length) {
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
                var rangeValue = range.value;
                var rangeStart = range.start;
                var rangeEnd = range.end;

                this.tree.remove(range);

                if (rangeStart < start) {
                    if (rangeValue !== value) {
                        this.insert(rangeStart, start - 1, rangeValue);
                    } else {
                        start = rangeStart;
                    }
                }

                if (rangeEnd > end) {
                    if (rangeValue !== value) {
                        this.insert(end + 1, rangeEnd, rangeValue);
                    } else {
                        end = rangeEnd;
                    }
                }
            }
        }

        this.insert(start, end, value);
    }

    RangeList.prototype.expandedValues = function(start, end) {
        var ranges = this.intersecting(start, end);
        var result = [];

        var rangeIndex = 0;

        for (var i = start; i <= end; i++) {
            if (ranges[rangeIndex].end < i) {
                rangeIndex ++;
            }

            result.push({ index: i - start, value: ranges[rangeIndex].value });
        }

        return result;
    }

    function valueComparer(a, b) { return a.value - b.value; }

    RangeList.prototype.sortedIndices = function(start, end) {
        var result = this.expandedValues(start, end);
        result.sort(valueComparer);
        return result;
    }

    RangeList.prototype.sort = function(start, end, indices) {
        if (this.intersecting(start, end).length === 1) {
            // console.log("skipping");
            return;
        }

        var values = this.expandedValues(start, end);

        for (var i = 0, len = indices.length; i < len; i++) {
            this.value(i + start, i + start, values[indices[i].index].value);
        }
    }

    function SparseRangeList(start, end, value) {
        this.tree = new RangeTree();
        this.range = new Range(start, end, value);
    }

    SparseRangeList.prototype = Object.create(RangeList.prototype);

    SparseRangeList.prototype.intersecting = function(start, end) {
        var ranges = this.tree.intersecting(start, end);
        var result = [];

        if (!ranges.length) {
            return [this.range];
        }

        for (var i = 0, len = ranges.length; i < len; i++) {
            var range = ranges[i];
            if (range.start > start) {
                result.push(new Range(start, range.start - 1, this.range.value));
            }

            result.push(range);
            start = range.end + 1;
        }

        if (range.end < end) {
            result.push(new Range(range.end + 1, end, this.range.value));
        }

        return result;
    }

    SparseRangeList.prototype.insert = function(start, end, value) {
        if (value !== this.range.value) {
            this.tree.insert(new Range(start, end, value));
        }
    }

    kendo.spreadsheet = {
        RangeTree: RangeTree,
        RangeList: RangeList,
        SparseRangeList: SparseRangeList,
        Range: Range
    };

})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
