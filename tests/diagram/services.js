///<reference path="qunit-1.12.0.js" />

(function ($, undefined) {
    var kendo = window.kendo;
    var deepExtend = kendo.deepExtend;
    var diagram = kendo.dataviz.diagram;
    var Point = diagram.Point;
    var element;
    var d;

    function setup() {
        setupDiagram();
        addShapes();
    }

    function getMeta(enabled) {
        var meta = {
            ctrlKey: false,
            altKey: false,
            shiftKey: false
        };
        if (enabled) {
            meta[enabled + "Key"] = true;
        }
        return meta;
    }

    function addShapes() {
        d.addShape({ x: 10, y: 20, data: "Rectangle", dataItem: {} });
        d.addShape({ x: 50, y: 100, data: "Rectangle", dataItem: {} });
        d.addShape({ x: 30, y: 200, data: "Rectangle", dataItem: {} });
        d.addShape({ x: 500, y: 100, data: "Rectangle", dataItem: {} });
    }

    function setupDiagram(options) {
        element = $('<div id=canvas />').appendTo(QUnit.fixture);
        element.kendoDiagram(deepExtend({
            theme: "black"
        }, options));
        d = element.data("kendoDiagram");
    }

    function teardown() {
        kendo.destroy(QUnit.fixture);
        element.remove();
    }

    module("ToolService", {
        setup: setup,
        teardown: teardown
    });

    test("toolservice ends tool on start if there is active tool", function() {
        d.toolService.activeTool = {
            end: function(p, meta) {
                ok(true);
            }
        };
        d.toolService.start(new Point(), {});
    });

    module("Selection tests", {
        setup: setup,
        teardown: teardown
    });

    test("Select/Deselect all", function () {
        d.selectAll();

        equal(d.shapes.length + d.connections.length, d.select().length);
    });

    test("Select/Deselect any", function () {
        d.shapes[2].select(true);
        d.shapes[3].select(true);

        equal(2, d.select().length);

        d.shapes[2].select(false);
        d.shapes[3].select(false);
        equal(0, d.select().length);
    });

    test("Drag group - 2 shapes and connection", function () {
        var s1 = d.shapes[0], s2 = d.shapes[1];
        var c = d.connect(s1, s2);
        s1.select(true);
        s2.select(true);
        c.select(true);

        var s1c = s1.bounds().center().minus(new diagram.Point(5, 5));

        d.toolService.start(s1c);
        var endpoint = s1c.plus(new diagram.Point(5, 5));
        d.toolService.move(endpoint);
        d.toolService.end(endpoint);

        ok(c.sourceConnector !== undefined, "Connection is attached to the source.");
        ok(c.targetConnector !== undefined, "Connection is attached to the target.");
    });

    test("Dragging shapes does not add undo unit if the shapes positions have not changed", function () {
        var shape1 = d.shapes[0], shape2 = d.shapes[1];
        var stackCount = d.undoRedoService.count();

        shape1.select(true);
        shape2.select(true);

        var shape1Center = shape1.bounds().center().minus(new diagram.Point(5, 5));

        d.toolService.start(shape1Center);
        d.toolService.move(shape1.bounds().center());
        d.toolService.end(shape1Center);

        equal(d.undoRedoService.count(), stackCount);
    });

    (function() {
        var adorner;
        var visual;
        var drawingContainer;

        module("Resizing/Selection adorner / initialization", {
            setup: function() {
                setupDiagram();
                adorner = d._resizingAdorner;
                visual = adorner.visual;
                drawingContainer = visual.drawingContainer();
            },
            teardown: teardown
        });

        test("creates visual group", function() {
            ok(visual instanceof diagram.Group);
        });

        test("creates bounds rectangle", function() {
            ok(adorner.rect instanceof diagram.Rectangle);
        });

        test("appends bounds rectangle to visual group", function() {
            ok($.inArray(adorner.rect.drawingContainer(), drawingContainer.children) >= 0);
        });

        test("creates handles", function() {
            var map = adorner.map;
            equal(map.length, 8);
            for (var i = 0; i < 8; i++) {
                ok(map[i].visual instanceof diagram.Rectangle);
            }
        });

        test("adds handles to visual group", function() {
            var map = adorner.map;
            for (var i = 0; i < 8; i++) {
                ok($.inArray(map[i].visual.drawingContainer(), drawingContainer.children) >= 0);
            }
        });

        // ------------------------------------------------------------
        module("Resizing/Selection adorner / editable", {
            setup: function() {
                setupDiagram({
                    editable: {
                        resize: false,
                        rotate: false
                    }
                });
                adorner = d._resizingAdorner;
                visual = adorner.visual;
                drawingContainer = visual.drawingContainer();
            },
            teardown: teardown
        });

        test("does not create handles if resizing is disabled", function() {
            equal(adorner.map.length, 0);
        });

        // ------------------------------------------------------------
        module("Resizing/Selection adorner", {
            setup: function() {
                setupDiagram();
                adorner = d._resizingAdorner;
                addShapes();
            },
            teardown: teardown
        });

        test("bounds", function () {
            var shape = d.shapes[0];
            shape.select(true);
            deepEqual(shape.bounds("transformed").inflate(adorner.options.offset, adorner.options.offset), adorner.bounds(), "Adoner has correct bounds");
        });

        test("correct cursor", function () {
            var last = d.shapes[d.shapes.length - 1];

            last.select(true);
            var delta = new Point(adorner.options.offset + 4, adorner.options.offset + 4);
            var testP = last.bounds().bottomRight().plus(delta);

            equal(adorner._getCursor(testP), "se-resize", "Cursor is correct.");
        });
    })();

    (function() {
        var ScrollerTool = diagram.ScrollerTool;
        var toolservice;
        var scrollerTool;
        var shape;

        function setupTool(options) {
            setupDiagram(options);
            shape = d.addShape({ x: 10, y: 20, data: "Rectangle", dataItem: {} });
            toolservice = d.toolService;
            for (var i = 0; i < toolservice.tools.length; i++) {
                if (toolservice.tools[i] instanceof ScrollerTool) {
                    scrollerTool = toolservice.tools[i];
                    break;
                }
            }
        }

        module("ScrollerTool", {
            teardown: teardown
        });

        test("activates if ctrl is pressed", function() {
            setupTool({});

            ok(scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate if ctrl is not pressed", function() {
            setupTool({});

            ok(!scrollerTool.tryActivate({}, getMeta()));
        });

        test("does not activate there is a hovered adorner", function() {
            setupTool({});

            toolservice.hoveredAdorner = true;

            ok(!scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate there is a hovered connector", function() {
            setupTool({});

            toolservice._hoveredConnector = true;

            ok(!scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate if panning is disabled", function() {
            setupTool({
                pannable: false
            });

            ok(!scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        module("ScrollerTool / custom key", {
            teardown: teardown
        });

        test("activates if key is set to none and no key is pressed", function() {
            setupTool({
                pannable: {
                    key: "none"
                }
            });

            ok(scrollerTool.tryActivate({}, getMeta()));
        });

        test("activates on ctrl if key is not set", function() {
            setupTool({
                pannable: {}
            });

            ok(scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate if key is set to none and a key is pressed", function() {
            setupTool({
                pannable: {
                    key: "none"
                }
            });

            ok(!scrollerTool.tryActivate({}, getMeta("alt")));
        });

        test("activates if specific key is set and pressed", function() {
            setupTool({
                pannable: {
                    key: "alt"
                }
            });

            ok(scrollerTool.tryActivate({}, getMeta("alt")));
        });

        test("does not activate if specific key is set but not pressed", function() {
            setupTool({
                pannable: {
                    key: "alt"
                }
            });

            ok(!scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate if ctrl key is set and pressed and there is a hoveredItem", function() {
            setupTool({
                pannable: {
                    key: "ctrl"
                }
            });

            toolservice.hoveredItem = true;
            ok(!scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

    })();

    (function() {
        var PointerTool = diagram.PointerTool;
        var toolservice;
        var pointertool;
        var shape;
        function setupTool(options) {
            setupDiagram(options);
            shape = d.addShape({ x: 10, y: 20, data: "Rectangle", dataItem: {} });
            toolservice = d.toolService;
            for (var i = 0; i < toolservice.tools.length; i++) {
                if (toolservice.tools[i] instanceof PointerTool) {
                    pointertool = toolservice.tools[i];
                    break;
                }
            }
        }

        module("PointerTool", {
            teardown: teardown
        });

        test("selects hovered item if diagram is selectable", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = shape;
            pointertool.start(new Point(), {});
            ok(shape.isSelected);
        });

        test("does not select hovered item if diagram is not selectable", function() {
            setupTool({
                selectable: false
            });
            toolservice.hoveredItem = shape;
            pointertool.start(new Point(), {});
            ok(!shape.isSelected);
        });
    })();

    (function() {
        var SelectionTool = diagram.SelectionTool;
        var toolservice;
        var selectiontool;

        function setupTool(options) {
            setupDiagram(options);
            toolservice = d.toolService;
            for (var i = 0; i < toolservice.tools.length; i++) {
                if (toolservice.tools[i] instanceof SelectionTool) {
                    selectiontool = toolservice.tools[i];
                    break;
                }
            }
        }

        module("SelectionTool", {
            teardown: teardown
        });

        test("does not activate if diagram is not selectable", function() {
            setupTool({
                selectable: false
            });
            ok(!selectiontool.tryActivate(new Point(), {}));
        });

        test("activates if diagram is selectable", function() {
            setupTool({
                selectable: true
            });
            ok(selectiontool.tryActivate(new Point(), {}));
        });

        test("does not activate if there is a hovered item", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = {};
            ok(!selectiontool.tryActivate(new Point(), {}));
        });

        test("does not activate if there is a hovered adorner", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredAdorner = {};
            ok(!selectiontool.tryActivate(new Point(), {}));
        });

        module("SelectionTool / custom key", {
            teardown: teardown
        });

        test("activates if key is set to none", function() {
            setupTool({
                selectable: {
                    key: "none"
                }
            });

            ok(selectiontool.tryActivate({}, getMeta()));
        });

        test("activates if key is not set", function() {
            setupTool({
                selectable: {}
            });

            ok(selectiontool.tryActivate({}, getMeta()));
        });

        test("activates if key is set and pressed", function() {
            setupTool({
                selectable: {
                    key: "ctrl"
                }
            });

            ok(selectiontool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate if key is set but not pressed", function() {
            setupTool({
                selectable: {
                    key: "ctrl"
                }
            });

            ok(!selectiontool.tryActivate({}, getMeta()));
        });
    })();

    (function() {
        var ConnectionEditTool = diagram.ConnectionEditTool;
        var toolservice;
        var connectionEditTool;

        function setupTool(options) {
            setupDiagram(options);
            toolservice = d.toolService;
            for (var i = 0; i < toolservice.tools.length; i++) {
                if (toolservice.tools[i] instanceof ConnectionEditTool) {
                    connectionEditTool = toolservice.tools[i];
                    break;
                }
            }
        }

        module("ConnectionEditTool", {
            teardown: teardown
        });

        test("does not activate if diagram is not selectable", function() {
            setupTool({
                selectable: false
            });
            ok(!connectionEditTool.tryActivate(new Point(), {}));
        });

        test("activates if diagram is selectable and the hovered item is a connection", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = new diagram.Connection(new Point(), new Point());
            ok(connectionEditTool.tryActivate(new Point(), {}));
        });

        test("does not activate if the connection is already selected and ctrl is pressed", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = new diagram.Connection(new Point(), new Point());
            toolservice.hoveredItem.isSelected = true;
            ok(!connectionEditTool.tryActivate(new Point(), getMeta("ctrl")));
        });

        test("does not bomb if the connection is not selectable", function() {
            setupTool({
                selectable: true
            });

            var p = new Point();
            var meta = {};

            toolservice.hoveredItem = new diagram.Connection(p, p, { selectable: false });
            toolservice.hoveredItem.diagram = d;

            connectionEditTool.tryActivate(p, meta);
            connectionEditTool.start(p, meta);
            connectionEditTool.move(p);
            connectionEditTool.end(p, meta);

            ok(true);
        });

    })();

    (function() {
        var ConnectionTool = diagram.ConnectionTool;
        var ConnectorVisual = diagram.ConnectorVisual;
        var toolservice;
        var connectionTool;

        function moveToShape(sourceConnector, targetShape) {
            toolservice._hoveredConnector = new ConnectorVisual(sourceConnector);
            connectionTool.start(new Point(), {});
            toolservice.hoveredItem = targetShape;
            var bounds = targetShape.bounds();

            connectionTool.end(new Point(bounds.x + 10, bounds.y + 10));
        }

        function setupTool(options) {
            setupDiagram(options);
            toolservice = d.toolService;
            for (var i = 0; i < toolservice.tools.length; i++) {
                if (toolservice.tools[i] instanceof ConnectionTool) {
                    connectionTool = toolservice.tools[i];
                    break;
                }
            }
        }

        module("ConnectionTool", {
            teardown: teardown
        });

        test("sets the target shape auto connector", function() {
            setupTool();
            var shape1 = d.addShape({ x: 0, y: 0});
            var shape2 = d.addShape({ x: 200, y: 200});
            moveToShape(shape1.getConnector("auto"), shape2);
            ok(d.connections[0].target() === shape2.getConnector("auto"));
        });

        test("sets the target shape closest connector if there is no auto connector", function() {
            setupTool();
            var shape1 = d.addShape({ x: 0, y: 0});
            var shape2 = d.addShape({ x: 200, y: 200, connectors: [{name: "left"}, {name: "right"}]});
            moveToShape(shape1.getConnector("auto"), shape2);
            ok(d.connections[0].target() === shape2.getConnector("left"));
        });

         test("adds connection from the source connector to the current point", function() {
            setupTool();
            var shape = d.addShape({});
            var sourceConnector = shape.getConnector("auto");
            var point = new Point();
            toolservice._hoveredConnector = new ConnectorVisual(sourceConnector);
            connectionTool.start(new Point(), {});
            var connection = shape.connections()[0];
            ok(connection.source() === sourceConnector);
            ok(connection.target().equals(point));
        });

        test("triggers add on start", 1, function() {
            setupTool();
            var shape = d.addShape({});
            toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
            d.bind("add", function(e) {
                ok(true);
            });
            connectionTool.start(new Point(), {});
        });

        test("does not add connection and ends service if the default action  is prevented", function() {
            setupTool();
            var shape = d.addShape({});
            toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
            d.bind("add", function(e) {
                e.preventDefault();
            });
            toolservice.end = function() {
                ok(true);
            };
            connectionTool.start(new Point(), {});

            equal(shape.connections().length, 0);
        });

    })();

    (function() {
        var ConnectionEditAdorner = diagram.ConnectionEditAdorner;
        var toolservice;
        var adorner;

        function moveToShape(connection, shape) {
            connection.select(true);
            connection.adorner.start(connection.targetPoint());
            d.toolService.hoveredItem = shape;
            var bounds = shape.bounds();
            connection.adorner.stop(new Point(bounds.x + 10, bounds.y + 10));
        }

        module("ConnectionEditAdorner", {
            teardown: teardown
        });

        test("sets the target shape auto connector", function() {
            setupDiagram();

            var connection = d.connect(new Point(0, 0), new Point(10, 10));
            var shape = d.addShape({ x: 100, y: 100});
            moveToShape(connection, shape);
            ok(connection.target() === shape.getConnector("auto"));
        });

        test("sets the target shape closest connector if there is no auto connector", function() {
            setupDiagram();

            var connection = d.connect(new Point(0, 0), new Point(10, 10));
            var shape = d.addShape({ x: 100, y: 100, connectors: [{name: "left"}, {name: "right"}]});
            moveToShape(connection, shape);
            ok(connection.target() === shape.getConnector("left"));
        });
    })();

    (function() {
        var toolservice;
        var shape1, shape2;

        function setupTool(options) {
            setupDiagram(options);
            toolservice = d.toolService;
        }

        module("ToolService", {
            teardown: teardown
        });

        test("does not set hoveredItem if there is a hovered adorner on the same position", function() {
            setupTool({});
            shape1 = d.addShape({ x: 10, y: 20, data: "Rectangle", dataItem: {}, width: 100, height: 100 });
            shape2 = d.addShape({ x: 30, y: 20, data: "Rectangle", dataItem: {}, width: 100, height: 100 });

            shape1.select(true);
            var handleBounds = d._resizingAdorner._getHandleBounds({x: 1, y: 0});
            handleBounds.offset(d._resizingAdorner._bounds.x, d._resizingAdorner._bounds.y);
            var point = new Point(handleBounds.x + handleBounds.width / 2, handleBounds.y + + handleBounds.height / 2);
            toolservice.start(point, {});
            ok(!toolservice.hoveredItem);
        });

        // ------------------------------------------------------------
        (function() {
            var shape;

            function triggerDel(callback) {
                shape = d.addShape({});
                shape.select(true);
                if (callback) {
                    callback();
                }
                toolservice.keyDown(46);
            }
            module("ToolService /keydown / del", {
                setup: function() {
                    setupTool();
                },
                teardown: teardown
            });

            test("should trigger remove for selected items", function () {
                triggerDel(function() {
                    d.bind("remove", function(e) {
                        ok(e.shape === shape);
                    });
                });
            });

            test("should remove the selected items", function () {
                triggerDel(function() {
                    d.remove = function(items) {
                        ok(shape === items[0]);
                    };
                });
            });

            test("should not remove the selected items if the default action is prevented", 0, function () {
                triggerDel(function() {
                    d.bind("remove", function(e) {
                        e.preventDefault();
                    });
                    d.remove = function(items) {
                        ok(false);
                    };
                });
            });

            test("should sync the changes", function () {
                d._syncChanges = function() {
                    ok(true);
                };
                triggerDel();
            });
        })();

    })();

    (function() {
        var Selector = diagram.Selector;
        var selector;
        module("Selector", {});

        test("Selector extends its visual options with diagram selectable options", function() {
            var diagram = {
                options: {
                    selectable: {
                        stroke: {
                            color: "#919191"
                        },
                        fill: {
                            color: "#919191"
                        }
                    }
                }
            };
            selector = new Selector(diagram);
            var rectangle = selector.visual;
            var options = rectangle.options;
            equal(options.stroke.color, "#919191");
            equal(options.fill.color, "#919191");
        });
    })();

    // ------------------------------------------------------------
    module("Tooling tests. Ensure the tools are activated correctly.", {
        setup: setup,
        teardown: teardown
    });

    test("Connectors activated", function () {
        var s1 = d.shapes[0];
        var s1c = s1.bounds().center();
        d.toolService.move(s1c);

        ok(d._connectorsAdorner, "The adorner is visible");
        //equal(d.toolService._hoveredConnector, s1.getConnector("Auto"), "Auto (center) connector is hovered");
    });

    test("ConnectionTool - create connection", function () {
        d.clear();
        d.addShape({ x: 0, y: 0, dataItem: {} });
        var s1 = d.shapes[0];
        var s1c = s1.bounds().center();
        d.toolService.start(s1c);
        d.toolService.move(s1c);
        d.toolService.end(s1c);

        d.toolService.start(s1c);
        d.toolService.move(s1c);
        var target = new Point(300, 300);
        d.toolService.move(target);

        ok(d.toolService.newConnection, "New Connection is present");
        equal(target, d.toolService.newConnection.targetPoint(), "New Connection target is ok");

        var c = d.toolService.newConnection;
        d.toolService.end(target);
        ok(!d.toolService.newConnection, "New Connection is empty");

        equal(target, c.targetPoint(), "Connection target is ok");
        //equal(d.toolService._hoveredConnector, s1.getConnector("Auto"), "Auto (center) connector is hovered");
    });

    // ------------------------------------------------------------
    // module("Hitesting tests", {
        // setup: setup,
        // teardown: teardown
    // });

    // ------------------------------------------------------------
    QUnit.module("UndoRedo tests", {
        setup: setup,
        teardown: teardown
    });

    test("UndoRedoService basic", function () {
        var ur = new diagram.UndoRedoService();
        var unit = new Task("Counting unit.");
        ur.begin();
        ur.addCompositeItem(unit);
        ur.commit();
        ok(unit.Count == 1, "Unit was executed");
        ur.undo();
        ok(ur.count() > 0, "The units are still there.");
        QUnit.equal(unit.Count, 0, "Unit undo was executed");
        ur.redo();
        ok(unit.Count == 1, "Unit was executed");
        QUnit.throws(function () {
            ur.Redo();
        }, "Supposed to raise an exception since we are passed the length of the stack.");
        ur.undo();
        ok(unit.Count == 0, "Unit was executed");
        ur = new diagram.UndoRedoService();
        unit = new Task("Counting unit.");
        ur.add(unit);
        ok(unit.Count == 1, "Unit was executed");
    });

    test("Delete shape, undo, connection attached", function () {
        var s1 = d.shapes[0];
        var s2 = d.shapes[1];

        var c1 = d.connect(s1, s2);

        ok(c1.sourceConnector !== undefined, "Source attached");
        ok(c1.sourceConnector.options.name == "Auto", "Attached to Auto");

        d.remove(s1, true);

        d.undo();

        ok(c1.sourceConnector !== undefined, "Source attached after undo");
        ok(c1.sourceConnector.options.name == "Auto", "Attached to Auto");
    });

    test("Delete Connection, undo, connection attached", function () {
        var s1 = d.shapes[0];
        var s2 = d.shapes[1];

        var c1 = d.connect(s1, s2);

        ok(c1.sourceConnector !== undefined, "Source attached");
        ok(c1.sourceConnector.options.name == "Auto", "Attached to Auto");

        d.remove(c1, true);

        d.undo();

        var lastC = d.connections[d.connections.length - 1];

        ok(lastC.sourceConnector !== undefined, "Source attached after undo");
        ok(lastC.sourceConnector.options.name == "Auto", "Attached to Auto");

        ok(lastC.targetConnector !== undefined, "Target attached after undo");
        ok(lastC.targetConnector.options.name == "Auto", "Attached to Auto");
    });

     // ------------------------------------------------------------
    (function() {
        var CascadingRouter = diagram.CascadingRouter;
        var router;
        var connection;
        var sourceShape;
        var targetShape;
        var sourceConnector;
        var targetConnector;
        var sourcePosition;
        var targetPosition;

        function initRouter() {
            sourceShape = new diagram.Shape({width: 100, height: 100});
            targetShape = new diagram.Shape({x: 300, y: 300, width: 100, height: 100});
            connection = new diagram.Connection(sourceShape, targetShape);
            router = new CascadingRouter(connection);
        }

        module("CascadingRouter / connector side", {
            setup: initRouter
        });

        test("determines connector side based on the closest position", function() {
            var targetPoint = new Point();
            equal(router._connectorSide(sourceShape.getConnector("top"), targetPoint), "Top");
            equal(router._connectorSide(sourceShape.getConnector("bottom"), targetPoint), "Bottom");
            equal(router._connectorSide(sourceShape.getConnector("left"), targetPoint), "Left");
            equal(router._connectorSide(sourceShape.getConnector("right"), targetPoint), "Right");
        });

        test("determines connector side based on the closest position for rotated shapes", function() {
            var targetPoint = new Point();
            sourceShape.rotate(90);
            equal(router._connectorSide(sourceShape.getConnector("top"), targetPoint), "Right");
            equal(router._connectorSide(sourceShape.getConnector("bottom"), targetPoint), "Left");
            equal(router._connectorSide(sourceShape.getConnector("left"), targetPoint), "Top");
            equal(router._connectorSide(sourceShape.getConnector("right"), targetPoint), "Bottom");
        });

        test("determines connector side based on the closest position for custom connectors", function() {
            var targetPoint = new Point();
            sourceShape.redraw({
                connectors: [{name: "foo", position: function(shape) {
                    var bounds = shape.bounds();
                    return new Point(bounds.x + 10, bounds.y + 20);
                }}]
            });
            equal(router._connectorSide(sourceShape.getConnector("foo"), targetPoint), "Left");
        });

        test("determines the connector side based on the target point if the side distance is the same", function() {
            sourceShape.redraw({
                connectors: [{name: "foo", position: function(shape) {
                    var bounds = shape.bounds();
                    return new Point(bounds.x + 10, bounds.y + 10);
                }}]
            });
            equal(router._connectorSide(sourceShape.getConnector("foo"), new Point(-100, -50)), "Left");
            equal(router._connectorSide(sourceShape.getConnector("foo"), new Point(-50, -100)), "Top");
        });

        // ------------------------------------------------------------
        module("CascadingRouter / connectors routes / top source", {
            setup: function() {
               initRouter();
               sourceConnector = sourceShape.getConnector("top");
               sourcePosition = sourceConnector.position();
            }
        });

        test("left target uses single intermediate point with source x and target y", function() {
            targetConnector = targetShape.getConnector("left");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, targetPosition.y);
        });

        test("right target uses single intermediate point with source x and target y", function() {
            targetConnector = targetShape.getConnector("right");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, targetPosition.y);
        });

        test("bottom target uses two intermediate points with source x and target x and middle y", function() {
            targetConnector = targetShape.getConnector("bottom");
            targetPosition = targetConnector.position();

            var middle = sourcePosition.y + (targetPosition.y - sourcePosition.y) / 2;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, middle);
            equal(points[1].x, targetPosition.x);
            equal(points[1].y, middle);
        });

        test("top target uses two intermediate points with source x and target x and min y minus same side distance", function() {
            targetConnector = targetShape.getConnector("top");
            targetPosition = targetConnector.position();

            var y = sourcePosition.y - router.SAME_SIDE_DISTANCE;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, y);
            equal(points[1].x, targetPosition.x);
            equal(points[1].y, y);
        });

        // ------------------------------------------------------------
        module("CascadingRouter / connectors routes / bottom source", {
            setup: function() {
               initRouter();
               sourceConnector = sourceShape.getConnector("bottom");
               sourcePosition = sourceConnector.position();
            }
        });

        test("left target uses single intermediate point with source x and target y", function() {
            targetConnector = targetShape.getConnector("left");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, targetPosition.y);
        });

        test("right target uses single intermediate point with source x and target y", function() {
            targetConnector = targetShape.getConnector("right");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, targetPosition.y);
        });

        test("bottom target uses two intermediate points with source x and target x and max y plus same side distance", function() {
            targetConnector = targetShape.getConnector("bottom");
            targetPosition = targetConnector.position();

            var y = targetPosition.y + router.SAME_SIDE_DISTANCE;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, y);
            equal(points[1].x, targetPosition.x);
            equal(points[1].y, y);
        });

        test("top target uses two intermediate points with source x and target x and middle y", function() {
            targetConnector = targetShape.getConnector("top");
            targetPosition = targetConnector.position();

            var middle = sourcePosition.y + (targetPosition.y - sourcePosition.y) / 2;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, sourcePosition.x);
            equal(points[0].y, middle);
            equal(points[1].x, targetPosition.x);
            equal(points[1].y, middle);
        });

        // ------------------------------------------------------------
        module("CascadingRouter / connectors routes / left source", {
            setup: function() {
               initRouter();
               sourceConnector = sourceShape.getConnector("left");
               sourcePosition = sourceConnector.position();
            }
        });

        test("left target uses two intermediate points with source y and target y and min x minus same side distance", function() {
            targetConnector = targetShape.getConnector("left");
            targetPosition = targetConnector.position();

            var x = sourcePosition.x - router.SAME_SIDE_DISTANCE;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, x);
            equal(points[0].y, sourcePosition.y);
            equal(points[1].x, x);
            equal(points[1].y, targetPosition.y);
        });

        test("right target uses two intermediate points with source y and target y and middle x", function() {
            targetConnector = targetShape.getConnector("right");
            targetPosition = targetConnector.position();

            var middle = sourcePosition.x + (targetPosition.x - sourcePosition.x) / 2;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, middle);
            equal(points[0].y, sourcePosition.y);
            equal(points[1].x, middle);
            equal(points[1].y, targetPosition.y);
        });

        test("bottom target uses single intermediate point with target x and source y", function() {
            targetConnector = targetShape.getConnector("bottom");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, targetPosition.x);
            equal(points[0].y, sourcePosition.y);
        });

        test("top target uses single intermediate point with target x and source y", function() {
            targetConnector = targetShape.getConnector("top");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, targetPosition.x);
            equal(points[0].y, sourcePosition.y);
        });

        // ------------------------------------------------------------
        module("CascadingRouter / connectors routes / right source", {
            setup: function() {
               initRouter();
               sourceConnector = sourceShape.getConnector("right");
               sourcePosition = sourceConnector.position();
            }
        });

        test("left target uses two intermediate points with source y and target y and middle x", function() {
            targetConnector = targetShape.getConnector("left");
            targetPosition = targetConnector.position();

            var middle = sourcePosition.x + (targetPosition.x - sourcePosition.x) / 2;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, middle);
            equal(points[0].y, sourcePosition.y);
            equal(points[1].x, middle);
            equal(points[1].y, targetPosition.y);
        });

        test("right target uses two intermediate points with source y and target y and max x plus same side distance", function() {
            targetConnector = targetShape.getConnector("right");
            targetPosition = targetConnector.position();

            var x = targetPosition.x + router.SAME_SIDE_DISTANCE;
            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 2);
            equal(points[0].x, x);
            equal(points[0].y, sourcePosition.y);
            equal(points[1].x, x);
            equal(points[1].y, targetPosition.y);
        });

        test("bottom target uses single intermediate point with target x and source y", function() {
            targetConnector = targetShape.getConnector("bottom");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, targetPosition.x);
            equal(points[0].y, sourcePosition.y);
        });

        test("top target uses single intermediate point with target x and source y", function() {
            targetConnector = targetShape.getConnector("top");
            targetPosition = targetConnector.position();

            var points = router.routePoints(sourcePosition, targetPosition, sourceConnector, targetConnector);

            equal(points.length, 1);
            equal(points[0].x, targetPosition.x);
            equal(points[0].y, sourcePosition.y);
        });


    })();

})(kendo.jQuery);

