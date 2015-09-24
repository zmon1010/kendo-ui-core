(function() {
    var tolerance = 0.0001,
        dataviz = kendo.dataviz,
        Point = dataviz.diagram.Point,
        Rect = dataviz.diagram.Rect,
        diagram;

    function createDiagram(options) {
        diagram = $('<div id="diagram" style="width: 800px; height: 600px;" />')
            .appendTo(QUnit.fixture)
            .kendoDiagram(kendo.deepExtend({
                shapes: [{
                    id: "rect",
                    type: "Rectangle",
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },{
                    id: "rect1",
                    type: "Rectangle",
                    x: 200,
                    y: 200,
                    width: 100,
                    height: 100
                }]
            }, options))
            .getKendoDiagram();

        return diagram;
    }

    /*-----------------------------------------------*/
    module("Diagram API / selectAll", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items", function () {
        diagram.selectAll();
        $.each(diagram.shapes, function(index, item) {
            ok(this.isSelected);
        });
    });

    /*-----------------------------------------------*/
    module("Diagram API / select", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items from an array", function () {
        diagram.select(diagram.shapes);

        $.each(diagram.shapes, function() {
            ok(this.isSelected);
        });
    });

    test("select an item", function () {
        diagram.select(diagram.shapes[0]);

        ok(diagram.shapes[0].isSelected);
    });

    test("without parametters return all selected items", function () {
        diagram.select(diagram.shapes[0]);
        var items = diagram.select();

        deepEqual(diagram.shapes[0], items[0]);
    });

    /*-----------------------------------------------*/
    module("Diagram API / selectArea", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items in an area", function () {
        diagram.selectArea(new Rect(0, 0, 100, 100));
        ok(diagram.shapes[0].isSelected);
        ok(!diagram.shapes[1].isSelected);
    });

    /*-----------------------------------------------*/
    module("Diagram API / deselect", {
        setup: function () {
            createDiagram();
            diagram.selectAll();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("deselect all array items", function () {
        diagram.deselect(diagram.shapes);
        $.each(diagram.shapes, function() {
            ok(this.isSelected === false);
        });
    });

    test("deselect item", function () {
        var item = diagram.shapes[0]
        diagram.deselect(item);
        ok(item.isSelected === false);
    });

    test("deselect all items", function () {
        diagram.deselect();
        $.each(diagram.shapes, function() {
            ok(this.isSelected === false);
        });
    });

    /*-----------------------------------------------*/
    module("Diagram API / export", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Does not define svg legacy method", function() {
        ok(!diagram.svg);
    });

    test("Does not define imageDataUrl legacy method", function() {
        ok(!diagram.imageDataURL);
    });

    test("Exports root visual to exclude adorners", function() {
        equal(diagram.exportVisual().children[0], diagram.canvas.drawingElement.children[0]);
    });

    test("Exports visual with 1:1 scale", function() {
        diagram.zoom(0.2);
        var visual = diagram.exportVisual();
        deepEqual(visual.bbox().size.toArray(), [300, 300]);
    });

    test("Exports DOM visual with applied scrolling", function() {
        diagram.pan(new Point(100, 100));
        var visual = diagram.exportDOMVisual();
        deepEqual(visual.bbox().origin.toArray(), [-100, -100]);
    });

    test("Exports DOM visual with applied clipping", function() {
        var visual = diagram.exportDOMVisual();
        var clip = visual.options.get("clip").bbox();
        deepEqual(clip.origin.toArray(), [0, 0]);
        deepEqual(clip.size.toArray(), [800, 600]);
    });

    test("Does not transform clip box", function() {
        diagram.pan(new Point(100, 100));
        var visual = diagram.exportDOMVisual();
        ok(!visual.transform());
    });

    exportTests("Diagram", createDiagram);
    saveAsPDFTests("Diagram", createDiagram);


    /*-----------------------------------------------*/
    module("Diagram API / save", {
        teardown: function () {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("saves shapes options", function() {
        createDiagram();
        var shapes = diagram.save().shapes;
        deepEqual(shapes, [diagram.shapes[0].options, diagram.shapes[1].options]);
    });

    test("saves connections from and to connectors", function() {
        createDiagram({
            connections: [{
                from: {
                    id: "rect",
                    connector: "Bottom"
                },
                to: {
                    id: "rect1",
                    connector: "Top"
                }
            }]
        });

        var connection = diagram.save().connections[0];
        equal(connection.from.shapeId, "rect");
        equal(connection.from.connector, "Bottom");
        equal(connection.to.shapeId, "rect1");
        equal(connection.to.connector, "Top");
    });

    test("saves connections from and to shapes", function() {
        createDiagram({
            connections: [{
                from: {
                    id: "rect"
                },
                to: {
                    id: "rect1"
                }
            }]
        });

        var connection = diagram.save().connections[0];
        equal(connection.from.shapeId, "rect");
        equal(connection.to.shapeId, "rect1");
    });

    test("saves connections from and to points", function() {
        createDiagram({
            connections: [{
                from: {
                    x: 100,
                    y: 200
                },
                to: {
                    x: 300,
                    y: 400
                }
            }]
        });

        var connection = diagram.save().connections[0];
        equal(connection.from.x, 100);
        equal(connection.from.y, 200);
        equal(connection.to.x, 300);
        equal(connection.to.y, 400);
    });

    test("saves connections source and target points if from and to are null", function() {
        createDiagram({
            connections: [{
                from: {
                    x: 100,
                    y: 200
                },
                to: {
                    x: 300,
                    y: 400
                }
            }]
        });
        diagram.connections[0].source(null);
        diagram.connections[0].target(null);

        var connection = diagram.save().connections[0];
        equal(connection.from.x, 100);
        equal(connection.from.y, 200);
        equal(connection.to.x, 300);
        equal(connection.to.y, 400);
    });

})();
