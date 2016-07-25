(function() {
    var g = kendo.geometry,
        Point = g.Point,

        d = kendo.drawing,
        Group = d.Group,
        Rect = d.Rect,
        ShapesQuadTree = d.ShapesQuadTree,
        QuadNode = d.QuadNode;

    // ------------------------------------------------------------
    (function() {
        var tree, shape1, shape2, shape3, group;
        var options = {
            fill: {
                color: "red"
            }
        };

        module("ShapesQuadTree", {
            setup: function() {
                shape1 = new Rect(new g.Rect([0, 0], [100, 100]), options);
                shape2 = new Rect(new g.Rect([50, 0], [100, 100]), options);
                group = new Group();
                group.append(shape1, shape2);

                shape3 = new Rect(new g.Rect([0, 50], [100, 100]), options);
                tree = new ShapesQuadTree();

                tree.add([group, shape3]);
            }
        });

        test("detects inserted shape", function() {
            ok(shape3 === tree.pointShape(new Point(50, 120)));
        });

        test("does not detect shapes without bounding box", function() {
            var shape = new d.Path(options);
            tree.add([shape]);
            ok(shape !== tree.pointShape(new Point(0, 0)));
        });

        test("detects shapes from a group", function() {
            ok(shape1 === tree.pointShape(new Point(20, 30)));
        });

        test("detects shapes with higher zIndex in a visual tree", function() {
            ok(shape2 === tree.pointShape(new Point(60, 30)));
        });

        test("detects shapes with higher root zIndex", function() {
            ok(shape3 === tree.pointShape(new Point(20, 70)));
        });

        test("detects shapes with changed geometry", function() {
            shape1.geometry().origin.setX(200);
            ok(shape1 === tree.pointShape(new Point(220, 50)));
            ok(!tree.pointShape(new Point(20, 30)));
        });

        test("detects shapes without initial bounding box after change of geometry", function() {
            var shape = new d.Path(options);
            tree.add([shape]);
            shape.moveTo(0, 0).lineTo(100, 0).lineTo(100, 100).lineTo(0, 100).close();
            ok(shape === tree.pointShape(new Point(50, 50)));
        });

        test("detects shapes with changed stroke", function() {
            shape2.stroke("red", 20);
            ok(shape2 === tree.pointShape(new Point(160, 50)));
        });

        test("detects shapes with changed transformation", function() {
            shape2.transform(g.transform().translate(2000, 0));
            ok(shape2 === tree.pointShape(new Point(2100, 50)));
            ok(!tree.pointShape(new Point(125, 50)));
        });

        test("detects shapes with changed parent transformation", function() {
            group.transform(g.transform().translate(2000, 0));
            ok(shape2 === tree.pointShape(new Point(2100, 50)));
            ok(!tree.pointShape(new Point(125, 50)));
        });

        test("detects shapes added to existing elements", function() {
            var shape = new Rect(new g.Rect([250, 0], [100, 100]), options);
            group.append(shape);
            ok(shape === tree.pointShape(new Point(300, 50)));
        });

        test("does not detect shapes removed from existing elements", function() {
            group.remove(shape1);
            ok(!tree.pointShape(new Point(20, 30)));
        });

        test("does not detect removed shapes", function() {
            tree.remove(group);
            ok(!tree.pointShape(new Point(20, 30)));
        });

        test("detects newly inserted elements", function() {
            var shape = new Rect(new g.Rect([250, 0], [100, 100]), options);
            tree.add(shape);
            ok(shape === tree.pointShape(new Point(300, 50)));
        });

        test("newly inserted shapes have higher zIndex", function() {
            var shape = new Rect(new g.Rect([50, 0], [100, 100]), options);
            tree.add(shape);
            ok(shape === tree.pointShape(new Point(60, 30)));
        });

        test("remove cleans elements", function() {
            tree.remove(shape1);
            ok(!shape1._quadNode);
            equal($.inArray(tree, shape1._observers), -1);
        });

        test("remove cleans groups", function() {
            tree.remove(group);

            ok(!shape1._quadNode);
            equal($.inArray(tree, shape1._observers), -1);
            equal($.inArray(tree, group._observers), -1);
        });

        test("clear cleans all elements", function() {
            tree.clear();

            ok(!shape1._quadNode);
            ok(!shape3._quadNode);
            equal($.inArray(tree, shape1._observers), -1);
            equal($.inArray(tree, shape3._observers), -1);
            equal($.inArray(tree, group._observers), -1);
        });

    })();

    (function() {
        var rect = new g.Rect([0,0], [100, 100]);
        var bbox = new g.Rect([0,0], [10, 10]);
        var node;

        function createShapes(count) {
            var shapes = [];
            for (var idx = 0; idx < count; idx++) {
                shapes.push(new d.Path());
            }
            return shapes;
        }

        module("QuadNode", {
            setup: function() {
               node = new QuadNode(rect);
            }
        });

        test("does not insert shape outside of the node rect", function() {
            var inserted = node.insert(new d.Path(), new g.Rect([100,100], [10, 10]));

            equal(inserted, false);
            equal(node.shapes.length, 0);
            equal(node.children.length, 0);
        });

        test("inserts into shapes until the size is smaller than four", function() {
            for (var idx = 0; idx < 4; idx++) {
               equal(node.insert(new d.Path(), bbox), true);
            }

            equal(node.shapes.length, 4);
            equal(node.children.length, 0);
        });

        test("inserts additional shapes into children", function() {
            for (var idx = 0; idx < 4; idx++) {
               equal(node.insert(new d.Path(), bbox), true);
            }

            var shape = new d.Path();
            equal(node.insert(shape, bbox), true);
            equal(node.shapes.length, 4);
            equal(node.children[0].shapes.length, 1);
            ok(node.children[0].shapes[0].shape === shape);
        });

        test("inserts additional shapes into the shapes array if the shape bbox does not fit in any child", function() {
            for (var idx = 0; idx < 4; idx++) {
               equal(node.insert(new d.Path(), bbox), true);
            }
            var shape = new d.Path();

            equal(node.insert(shape, new g.Rect([30, 30], [50, 50])), true);
            equal(node.shapes.length, 5);
            ok(node.shapes[4].shape === shape);

        });

    })();


})();