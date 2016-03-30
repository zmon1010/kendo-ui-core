///<reference path="qunit-1.12.0.js" />

(function ($, undefined) {
    var kendo = window.kendo;
    var deepExtend = kendo.deepExtend;
    var diagram = kendo.dataviz.diagram;
    var Point = diagram.Point;
    var supportMobileOs;
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

        test("does not move shapes if dragging is disabled", function() {
            var shape = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                editable: {
                    drag: false
                }
            });
            adorner.shapes = [shape];
            adorner.start(new Point(100, 0));

            adorner.move(new Point(), new Point(110, 0));
            equal(shape.bounds().x, 0);
            equal(shape.bounds().y, 0);
        });

        test("moves only draggable shapes", function() {
            var shape1 = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                editable: {
                    drag: false
                }
            });
            var shape2 = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                editable: {
                    drag: true
                }
            });
            adorner.shapes = [shape1, shape2];
            adorner.start(new Point(100, 0));

            adorner.move(new Point(), new Point(110, 0));
            equal(shape1.bounds().x, 0);
            equal(shape1.bounds().y, 0);
            equal(shape2.bounds().x, 10);
            equal(shape2.bounds().y, 0);
        });

        test("updates bounds when not all shapes are draggable", function() {
            var shape1 = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                editable: {
                    drag: false
                }
            });
            var shape2 = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                editable: {
                    drag: true
                }
            });
            adorner.shapes = [shape1, shape2];
            adorner.start(new Point(100, 0));

            adorner.move(new Point(), new Point(110, 0));
            var bounds = adorner._innerBounds;

            equal(bounds.x, 0);
            equal(bounds.y, 0);
            equal(bounds.width, 110);
            equal(bounds.height, 100);
        });

        test("snap shape movement if snap is enabled", function() {
            var shape = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100
            });
            adorner.shapes = [shape];
            adorner.start(new Point(0, 0));
            adorner.move(new Point(), new Point(5, 0));
            equal(shape.position().x, 0);
            adorner.move(new Point(), new Point(10, 0));
            equal(shape.position().x, 10);
        });

        test("no snap movement if snap is disabled", function() {
            var shape = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100
            });
            d.options.editable.drag.snap = false;
            adorner.shapes = [shape];
            adorner.start(new Point(0, 0));
            adorner.move(new Point(), new Point(5, 0));
            equal(shape.position().x, 5);
        });

        test("takes snap size option into account", function() {
            var shape = d.addShape({
                x: 0,
                y: 0,
                width: 100,
                height: 100
            });
            d.options.editable.drag.snap = { size: 30 };
            adorner.shapes = [shape];
            adorner.start(new Point(0, 0));
            adorner.move(new Point(), new Point(25, 0));
            equal(shape.position().x, 0);
            adorner.move(new Point(), new Point(30, 0));
            equal(shape.position().x, 30);
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

        // ------------------------------------------------------------
        module("ScrollerTool", {
            setup: function() {
                supportMobileOs = kendo.support.mobileOS;
                kendo.support.mobileOS = false;
            },
            teardown: function() {
                kendo.support.mobileOS = supportMobileOs;
                teardown();
            }
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

        // ------------------------------------------------------------
        module("ScrollerTool / custom key", {
            setup: function() {
                supportMobileOs = kendo.support.mobileOS;
                kendo.support.mobileOS = false;
            },
            teardown: function() {
                kendo.support.mobileOS = supportMobileOs;
                teardown();
            }
        });

        test("activates if key is set to none and no key is pressed", function() {
            setupTool({
                pannable: {
                    key: "none"
                }
            });

            ok(scrollerTool.tryActivate({}, getMeta()));
        });

        test("does not activate if key is set to none and there is a hovered item", function() {
            setupTool({
                pannable: {
                    key: "none"
                }
            });

            toolservice.hoveredItem = true;
            ok(!scrollerTool.tryActivate({}, getMeta()));
        });

        test("activates on ctrl if key is not set", function() {
            setupTool({
                pannable: {}
            });

            ok(scrollerTool.tryActivate({}, getMeta("ctrl")));
        });

        test("activates on ctrl if key is not set and there is a hovered item", function() {
            setupTool({
                pannable: {}
            });

            toolservice.hoveredItem = true;
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

            toolservice.hoveredItem = true;
            ok(scrollerTool.tryActivate({}, getMeta("alt")));
        });

        test("activates if specific key is set and pressed and there is a hovered item", function() {
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

    })();

    (function() {
        var PointerTool = diagram.PointerTool;
        var toolservice;
        var pointertool;
        var resizingAdorner;
        var shape;
        function setupTool(options) {
            setupDiagram(options);
            shape = d.addShape({ x: 10, y: 20, data: "Rectangle", dataItem: {} });
            toolservice = d.toolService;
            resizingAdorner = d._resizingAdorner;
            for (var i = 0; i < toolservice.tools.length; i++) {
                if (toolservice.tools[i] instanceof PointerTool) {
                    pointertool = toolservice.tools[i];
                    break;
                }
            }
        }

        module("PointerTool", {
            setup: function() {
                supportMobileOs = kendo.support.mobileOS;
                kendo.support.mobileOS = false;
            },
            teardown: function() {
                kendo.support.mobileOS = supportMobileOs;
                teardown();
            }
        });

        test("selects hovered item if diagram is selectable", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = shape;
            pointertool.start(new Point(), {});
            ok(shape.isSelected);
        });

        test("selects hovered item if diagram selectable key is not pressed", function() {
            setupTool({
                selectable: {
                    key: "shift"
                }
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

        test("adds item to selection if ctrl is pressed", 1, function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = shape;
            toolservice.diagram.select = function(item, options) {
                if (item) {
                    equal(options.addToSelection, true);
                }
            };
            pointertool.start(new Point(), { ctrlKey: true});
        });

        test("does not add item to selection if ctrl is pressed but multiple selection is disabled", 1, function() {
            setupTool({
                selectable: {
                    multiple: false
                }
            });
            toolservice.hoveredItem = shape;
            toolservice.diagram.select = function(item, options) {
                if (item) {
                    equal(options.addToSelection, false);
                }
            };
            pointertool.start(new Point(), { ctrlKey: true});
        });
        // ------------------------------------------------------------
        module("PointerTool / start", {
            setup: function() {
                setupTool({});
            },
            teardown: teardown
        });

        test("triggers dragStart event with the selected shapes", 2, function() {
            d.bind("dragStart", function(e) {
                equal(e.shapes.length, 1);
                ok(e.shapes[0] === shape);
            });
            d.select(shape);

            pointertool.start(new Point(20, 30));
        });

        test("dragStart event argument contains empty connections array", 2, function() {
            d.bind("dragStart", function(e) {
                ok(e.connections);
                equal(e.connections.length, 0);
            });
            d.select(shape);

            pointertool.start(new Point(20, 30));
        });

        test("does not trigger dragStart if resizing handle is hit", 0, function() {
            d.bind("dragStart", function() {
                ok(false);
            });
            d.select(shape);

            var point = resizingAdorner._getHandleBounds(new Point(-1,-1)).offset(resizingAdorner._bounds.x, resizingAdorner._bounds.y).center();
            pointertool.start(point);
        });

        test("preventing the default action on dragStart ends service", 1, function() {
            d.bind("dragStart", function(e) {
                e.preventDefault();
            });
            d.select(shape);
            toolservice.end = function() {
                ok(true);
            }
            pointertool.start(new Point(20, 30));
        });

        // ------------------------------------------------------------
        module("PointerTool / move", {
            setup: function() {
                setupTool({});
                d.select(shape);
                pointertool.start(new Point(20, 30));

            },
            teardown: teardown
        });

        test("triggers drag event with moved shapes", 2, function() {
            d.bind("drag", function(e) {
                equal(e.shapes.length, 1);
                equal(e.shapes[0].bounds().x, 20);
            });

            pointertool.move(new Point(30, 30));
        });

        test("drag event argument contains empty connections array", 2, function() {
            d.bind("drag", function(e) {
                ok(e.connections);
                equal(e.connections.length, 0);
            });

            pointertool.move(new Point(30, 30));
        });

        test("drag event is not triggered if resizing", 0, function() {
            d.bind("drag", function(e) {
                ok(false);
            });
            pointertool.handle = new Point(-1, -1);
            pointertool.move(new Point(30, 30));
        });

        // ------------------------------------------------------------
        module("PointerTool / end", {
            setup: function() {
                setupTool({});
                d.select(shape);
                pointertool.start(new Point(20, 30));
                pointertool.move(new Point(30, 30));
            },
            teardown: teardown
        });

        test("triggers dragEnd event with moved shapes", 2, function() {
            d.bind("dragEnd", function(e) {
                equal(e.shapes.length, 1);
                equal(e.shapes[0].bounds().x, 20);
            });

            pointertool.end(new Point(30, 30));
        });

        test("dragEnd event argument contains empty connections array", 2, function() {
            d.bind("dragEnd", function(e) {
                ok(e.connections);
                equal(e.connections.length, 0);
            });

            pointertool.end(new Point(30, 30));
        });

        test("does not trigger dragEnd if resizing", 0, function() {
            d.bind("dragEnd", function(e) {
                ok(false);
            });
            pointertool.handle = new Point(-1, -1);
            pointertool.end(new Point(30, 30));
        });

        test("reverts changes if the default action is prevented on dragEnd", 1, function() {
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            pointertool.end(new Point(30, 30));
            equal(shape.bounds().x, 10);
        });

        test("does not update shapes model if the default action is prevented on dragEnd", 0, function() {
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            shape.updateModel = function() {
                ok(false)
            };

            pointertool.end(new Point(30, 30));
        });

        test("does not sync diagram if the default action is prevented on dragEnd", 0, function() {
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            d._syncShapeChanges = function() {
                ok(false)
            };

            pointertool.end(new Point(30, 30));
        });

        test("refreshes resizing adorner if the default action is prevented on dragEnd", 2, function() {
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            resizingAdorner.refresh = resizingAdorner.refreshBounds = function() {
                ok(true);
            };

            pointertool.end(new Point(30, 30));
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

        // ------------------------------------------------------------
        module("SelectionTool", {
            setup: function() {
                supportMobileOs = kendo.support.mobileOS;
                kendo.support.mobileOS = false;
            },
            teardown: function() {
                kendo.support.mobileOS = supportMobileOs;
                teardown();
            }
        });

        test("does not activate if diagram is not selectable", function() {
            setupTool({
                selectable: false
            });
            ok(!selectiontool.tryActivate(new Point(), getMeta()));
        });

        test("does not activate if multiple selection is disabled", function() {
            setupTool({
                selectable: {
                    multiple: false
                }
            });
            ok(!selectiontool.tryActivate(new Point(), getMeta()));
        });

        test("activates if diagram is selectable", function() {
            setupTool({
                selectable: true
            });
            ok(selectiontool.tryActivate(new Point(), getMeta()));
        });

        test("activates if multiple selection is enabled", function() {
            setupTool({
                selectable: {
                    multiple: true
                }
            });
            ok(selectiontool.tryActivate(new Point(), getMeta()));
        });

        test("does not activate if there is a hovered item", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredItem = {};
            ok(!selectiontool.tryActivate(new Point(), getMeta()));
        });

        test("does not activate if there is a hovered adorner", function() {
            setupTool({
                selectable: true
            });
            toolservice.hoveredAdorner = {};
            ok(!selectiontool.tryActivate(new Point(), getMeta()));
        });

        // ------------------------------------------------------------
        module("SelectionTool / custom key", {
            setup: function() {
                supportMobileOs = kendo.support.mobileOS;
                kendo.support.mobileOS = false;
            },
            teardown: function() {
                kendo.support.mobileOS = supportMobileOs;
                teardown();
            }
        });

        test("activates if key is set to none", function() {
            setupTool({
                selectable: {
                    key: "none"
                }
            });

            ok(selectiontool.tryActivate({}, getMeta()));
        });

        test("does not activate if key is set to none and some key is pressed", function() {
            setupTool({
                selectable: {
                    key: "none"
                }
            });

            ok(!selectiontool.tryActivate({}, getMeta("ctrl")));
        });

        test("does not activate if key is set to none but multiple selection is disabled", function() {
            setupTool({
                selectable: {
                    multiple: false,
                    key: "none"
                }
            });
            ok(!selectiontool.tryActivate(new Point(), {}));
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

        test("does not activate if key is set and pressed but multiple selection is disabled", function() {
            setupTool({
                selectable: {
                    key: "ctrl",
                    multiple: false
                }
            });

            ok(!selectiontool.tryActivate({}, getMeta("ctrl")));
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var ConnectionEditTool = diagram.ConnectionEditTool;
        var toolservice;
        var connectionEditTool;
        var connection;

        var ConnectionEditAdornerMock = function() {
            this.calls = {
                start: 0,
                move: 0,
                stop: 0
            };
            this.start = function() {
                this.calls.start++;
            };
            this._hitTest = $.noop;
            this.move = function() {
                this.calls.move++;
            };
            this.stop = function() {
                this.calls.stop++;
            };
            this._getCursor = $.noop;
        };

        function setupConnection(options) {
            connection = new diagram.Connection(new Point(), new Point(), options);
            connection.diagram = {
                select: $.noop
            };
            connection.adorner = new ConnectionEditAdornerMock();
            toolservice.diagram.select = $.noop;
        }

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

        test("does not start adorner if editable drag is disabled", function() {
            setupTool({
                selectable: true
            });
            var p = new Point();
            setupConnection({
                editable: {
                    drag: false
                }
            });

            toolservice.hoveredItem = connection;
            connectionEditTool.tryActivate(p, getMeta());
            connectionEditTool.start(p, getMeta());

            equal(connection.adorner.calls.start, 0);
        });

        test("does not move adorner if editable drag is disabled", function() {
            setupTool({
                selectable: true
            });
            var p = new Point();
            setupConnection({
                editable: {
                    drag: false
                }
            });

            toolservice.hoveredItem = connection;
            connectionEditTool.tryActivate(p, getMeta());
            connectionEditTool.move(p, getMeta());

            equal(connection.adorner.calls.move, 0);
        });

        test("does not stop adorner and add undo unit if editable drag is disabled", function() {
            setupTool({
                selectable: true
            });
            var p = new Point();
            setupConnection({
                editable: {
                    drag: false
                }
            });

            toolservice.startPoint = p;
            toolservice.hoveredItem = connection;
            connectionEditTool.tryActivate(p, getMeta());
            connectionEditTool.end(p, getMeta());

            equal(connection.adorner.calls.stop, 0);
            equal(toolservice.diagram.undoRedoService.count(), 0);
        });

        // ------------------------------------------------------------
        module("ConnectionEditTool / start", {
            setup: function() {
                setupTool({});
                connection = d.connect(new Point(), new Point(10, 10), {
                    editable: true
                });

                connectionEditTool._c = connection;
            },
            teardown: teardown
        });

        test("triggers dragStart event with the connection passed in the event argument", 2, function() {
            d.bind("dragStart", function(e) {;
                equal(e.connections.length, 1);
                ok(e.connections[0] === connection);
            });

            connectionEditTool.start(new Point(), {});
        });

        test("triggers dragStart event with the connection handle name passed in the argument", 3, function() {
            d.one("dragStart", function(e) {;
                equal(e.connectionHandle, "source");
            });

            connectionEditTool.start(new Point(), {});

            d.one("dragStart", function(e) {;
                equal(e.connectionHandle, "target");
            });

            connectionEditTool.start(new Point(10, 10), {});

            d.one("dragStart", function(e) {;
                equal(e.connectionHandle, undefined);
            });

            connectionEditTool.start(new Point(100, 100), {});
        });

        test("dragStart event argument contains empty shapes array", 1, function() {
            d.bind("dragStart", function(e) {;
                equal(e.shapes.length, 0);
            });

            connectionEditTool.start(new Point(), {});
        });

        test("ends service if the default action is prevented in the dragStart event", 1, function() {
            d.bind("dragStart", function(e) {;
                e.preventDefault();
            });

            toolservice.end = function() {
                ok(true);
            };
            connectionEditTool.start(new Point(), {});
        });

        // ------------------------------------------------------------
        module("ConnectionEditTool / move", {
            setup: function() {
                setupTool({});
                connection = d.connect(new Point(), new Point(10, 10), {
                    editable: true
                });
                connectionEditTool._c = connection;
                toolservice.startPoint = new Point();
            },
            teardown: teardown
        });

        test("triggers drag event with the moved connection passed in the event argument", 4, function() {
            d.bind("drag", function(e) {;
                equal(e.connections.length, 1);
                ok(e.connections[0] === connection);
                var source = connection.source();
                equal(source.x, 20);
                equal(source.y, 20);
            });

            connectionEditTool.start(new Point(), {});
            connectionEditTool.move(new Point(20, 20), {});
        });

        test("triggers drag event with the connection handle name passed in the argument", 3, function() {
            d.one("drag", function(e) {;
                equal(e.connectionHandle, "source");
            });

            connectionEditTool.start(new Point(), {});
            connectionEditTool.move(new Point(20, 20), {});
            connectionEditTool.end(new Point());

            d.one("drag", function(e) {;
                equal(e.connectionHandle, "target");
            });

            connectionEditTool.start(new Point(10, 10), {});
            connectionEditTool.move(new Point(20, 20), {});
            connectionEditTool.end(new Point(10, 10));

            d.one("drag", function(e) {;
                equal(e.connectionHandle, undefined);
            });

            connectionEditTool.start(new Point(100, 100), {});
            connectionEditTool.move(new Point(20, 20), {});
        });

        // ------------------------------------------------------------
        module("ConnectionEditTool / end", {
            setup: function() {
                setupTool({});
                connection = d.connect(new Point(), new Point(10, 10), {
                    editable: true
                });
                connectionEditTool._c = connection;
                toolservice.startPoint = new Point();
                connectionEditTool.start(new Point(), {});
                connectionEditTool.move(new Point(20, 20));
            },
            teardown: teardown
        });

        test("triggers dragEnd event with the moved connection passed in the event argument", 4, function() {
            d.bind("dragEnd", function(e) {;
                equal(e.connections.length, 1);
                ok(e.connections[0] === connection);
                var source = connection.source();
                equal(source.x, 20);
                equal(source.y, 20);
            });

            connectionEditTool.end(new Point(20, 20), {});
        });

        test("triggers dragEnd event with the moved connection handle passed in the event argument", 1, function() {
            d.bind("dragEnd", function(e) {;
                equal(e.connectionHandle, "source");
            });

            connectionEditTool.end(new Point(20, 20), {});
        });

        test("dragEnd event argument contains empty shapes array", 1, function() {
            d.bind("dragEnd", function(e) {;
                equal(e.shapes.length, 0);
            });

            connectionEditTool.end(new Point(20, 20), {});
        });

        test("adds undo unit", 1, function() {
            connectionEditTool.end(new Point(20, 20), {});
            equal(d.undoRedoService.count(), 2);
        });

        test("updates connection model", 1, function() {
            connection.updateModel = function() {
                ok(true);
            };
            connectionEditTool.end(new Point(20, 20), {});
        });

        test("syncs connection changes", 1, function() {
            d._syncConnectionChanges = function() {
                ok(true);
            };
            connectionEditTool.end(new Point(20, 20), {});
        });

        test("does not persist changes if the default action is prevented in the dragEnd event", 1, function() {
            d.bind("dragEnd", function(e) {;
                e.preventDefault();
            });
            d._syncConnectionChanges = function() {
                ok(false);
            };
            connectionEditTool.end(new Point(20, 20), {});

            equal(d.undoRedoService.count(), 1);
        });

        test("reverts connection changes if the default action is prevented in the dragEnd event", function() {
            d.bind("dragEnd", function(e) {;
                e.preventDefault();
            });

            connectionEditTool.end(new Point(20, 20), {});
            var source = connection.source();
            equal(source.x, 0);
            equal(source.y, 0);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var ConnectionTool = diagram.ConnectionTool;
        var ConnectorVisual = diagram.ConnectorVisual;
        var connectionTool;
        var toolservice;
        var shape;

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
            shape = d.addShape({});
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
            shape = d.addShape({});
            toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
            d.bind("add", function(e) {
                ok(true);
            });
            connectionTool.start(new Point(), {});
        });

        test("does not add connection and ends service if the default action  is prevented", 2, function() {
            setupTool();
            shape = d.addShape({});
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

        test("does not add connection and ends service if dragging is disabled", 2, function() {
            setupTool();
            shape = d.addShape({});
            toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
            d.options.connectionDefaults.editable.drag = false;

            toolservice.end = function() {
                ok(true);
            };
            connectionTool.start(new Point(), {});

            equal(shape.connections().length, 0);
        });

        // ------------------------------------------------------------
        module("ConnectionTool / start", {
            setup: function() {
                setupTool();
                shape = d.addShape({});
                toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
            },
            teardown: teardown
        });

        test("triggers dragStart with the new connection passed in the event argument", 2, function() {
            d.bind("dragStart", function(e) {
                equal(e.connections.length, 1);
                ok(e.connections[0].source().shape === shape);
            });
            connectionTool.start(new Point(), {});
        });

        test("triggers dragStart with the target set for the connection handle", 1, function() {
            d.bind("dragStart", function(e) {
                equal(e.connectionHandle, "target");
            });
            connectionTool.start(new Point(), {});
        });

        test("dragStart event argument contains an empty shapes array", 1, function() {
            d.bind("dragStart", function(e) {
                equal(e.shapes.length, 0);
            });
            connectionTool.start(new Point(), {});
        });

        test("connection is not added if the default action is prevented in the dragStart event", 1, function() {
            d.bind("dragStart", function(e) {
                e.preventDefault();
            });
            connectionTool.start(new Point(), {});
            equal(d.connections.length, 0);
        });

        test("ends toolservice if the default action is prevented in the dragStart event", 1, function() {
            d.bind("dragStart", function(e) {
                e.preventDefault();
            });
            toolservice.end = function() {
                ok(true);
            };
            connectionTool.start(new Point(), {});
        });

        // ------------------------------------------------------------
        module("ConnectionTool / move", {
            setup: function() {
                setupTool();
                shape = d.addShape({});
                toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
                connectionTool.start(new Point(), {});
            },
            teardown: teardown
        });

        test("triggers drag with the moved connection passed in the event argument", 4, function() {
            d.bind("drag", function(e) {
                equal(e.connections.length, 1);
                ok(e.connections[0].source().shape === shape);
                var target = e.connections[0].target();
                equal(target.x, 10);
                equal(target.y, 10);
            });

            connectionTool.move(new Point(10, 10), {});
        });

        test("triggers drag with target set for the connection handle", 1, function() {
            d.bind("drag", function(e) {
                equal(e.connectionHandle, "target");
            });

            connectionTool.move(new Point(10, 10), {});
        });

        test("triggers drag with the moved connection passed in the event argument", 4, function() {
            d.bind("drag", function(e) {
                equal(e.connections.length, 1);
                ok(e.connections[0].source().shape === shape);
                var target = e.connections[0].target();
                equal(target.x, 10);
                equal(target.y, 10);
            });

            connectionTool.move(new Point(10, 10), {});
        });

        test("drag event argument contains empty shapes array", 1, function() {
            d.bind("drag", function(e) {
                equal(e.shapes.length, 0);
            });

            connectionTool.move(new Point(10, 10), {});
        });

        // ------------------------------------------------------------
        module("ConnectionTool / end", {
            setup: function() {
                setupTool();
                shape = d.addShape({});
                toolservice._hoveredConnector = new ConnectorVisual(shape.getConnector("auto"));
                connectionTool.start(new Point(), {});
            },
            teardown: teardown
        });

        test("triggers dragEnd with the moved connection passed in the event argument", 4, function() {
            d.bind("dragEnd", function(e) {
                equal(e.connections.length, 1);
                ok(e.connections[0].source().shape === shape);
                var target = e.connections[0].target();
                equal(target.x, 10);
                equal(target.y, 10);
            });

            connectionTool.end(new Point(10, 10), {});
        });

        test("triggers dragEnd with target set for the connection handle", 1, function() {
            d.bind("dragEnd", function(e) {
                equal(e.connectionHandle, "target");
            });

            connectionTool.end(new Point(10, 10), {});
        });

        test("dragEnd event argument contains empty shapes array", 1, function() {
            d.bind("dragEnd", function(e) {
                equal(e.shapes.length, 0);
            });

            connectionTool.end(new Point(10, 10), {});
        });

        test("connection is removed if the default action is prevented in the dragEnd", 1, function() {
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            connectionTool.end(new Point(10, 10), {});
            equal(d.connections.length, 0);
        });

        test("add connection unit is removed if the default action is prevented in the dragEnd", 1, function() {
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            connectionTool.end(new Point(10, 10), {});
            equal(d.undoRedoService.count(), 1);
        });

        test("syncs connection changes", 1, function() {
            d._syncConnectionChanges = function() {
                ok(true);
            };

            connectionTool.end(new Point(10, 10), {});
        });

        test("does not sync connection changes if the default action is prevented in the dragEnd event", 0, function() {
            d._syncConnectionChanges = function() {
                ok(false);
            };
            d.bind("dragEnd", function(e) {
                e.preventDefault();
            });

            connectionTool.end(new Point(10, 10), {});
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

        test("uses source handle if the point is within a predefined distance from the source point", function() {
            setupDiagram();

            var connection = d.connect(new Point(0, 0), new Point(10, 10));

            connection.select(true);
            var adorner = connection.adorner;
            var sourcePoint = connection.sourcePoint();
            var point = new Point(sourcePoint.x - adorner.options.handles.width / 2 - 10, sourcePoint.y);

            connection.adorner.start(point);
            equal(connection.adorner.handle, -1);
        });

        test("uses source handle if the point is within a predefined distance from the source and target points but the source point is closer", function() {
            setupDiagram();

            var connection = d.connect(new Point(0, 10), new Point(10, 10));

            connection.select(true);
            var adorner = connection.adorner;
            var sourcePoint = connection.sourcePoint();
            var point = new Point(sourcePoint.x + 3, sourcePoint.y);

            connection.adorner.start(point);
            equal(connection.adorner.handle, -1);
        });

        test("uses target handle if the point is within a predefined distance from the target point", function() {
            setupDiagram();

            var connection = d.connect(new Point(0, 10), new Point(10, 10));

            connection.select(true);
            var adorner = connection.adorner;
            var targetPoint = connection.targetPoint();
            var point = new Point(targetPoint.x + adorner.options.handles.width / 2 + 10, targetPoint.y);

            connection.adorner.start(point);
            equal(connection.adorner.handle, 1);
        });

        test("uses target handle if the point is within a predefined distance from the source and target points but the target point is closer", function() {
            setupDiagram();

            var connection = d.connect(new Point(0, 10), new Point(10, 10));

            connection.select(true);
            var adorner = connection.adorner;
            var targetPoint = connection.targetPoint();
            var point = new Point(targetPoint.x - 3, targetPoint.y);

            connection.adorner.start(point);
            equal(connection.adorner.handle, 1);
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
            setup: function() {
               setupTool({});
            },
            teardown: teardown
        });

        test("does not set hoveredItem if there is a hovered adorner on the same position", function() {
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
            var shape, connection;
            module("ToolService / hit test", {
                setup: function() {
                    setupTool({});
                    shape = d.addShape({
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100
                    });
                    connection = d.addConnection(new diagram.Connection(new Point(0, 50), new Point(100, 50)));
                },
                teardown: teardown
            });

            test("finds shape", function() {
                ok(shape === toolservice._hitTest(new Point(50, 10)));
            });

            test("finds shape over a connection if the shape has bigger zIndex", function() {
                d.toFront([shape]);
                ok(shape === toolservice._hitTest(new Point(30, 50)));
            });

            test("finds shape over a connection if the position is over a connector", function() {
                ok(shape === toolservice._hitTest(new Point(0, 50)));
            });

            test("finds shape over a connection if the current active tool is ConnectionTool", function() {
                toolservice.activeTool = {
                    type: "ConnectionTool"
                };
                ok(shape === toolservice._hitTest(new Point(30, 50)));
            });

            test("finds connection", function() {
                connection = d.addConnection(new diagram.Connection(new Point(0, 200), new Point(100, 200)));
                ok(connection === toolservice._hitTest(new Point(0, 200)));
            });

            test("finds connection over shape if the connection has bigger zIndex", function() {
                ok(connection === toolservice._hitTest(new Point(30, 50)));
            });

        })();

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

            test("should not remove the selected items if remove is disabled", 0, function () {
                triggerDel(function() {
                    shape.options.editable.remove = false;

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

    test("UndoRedoService pop removes last unit", function () {
        var undoRedoService = new diagram.UndoRedoService();
        undoRedoService.add({foo: "bar"}, false);
        undoRedoService.add({}, false);
        undoRedoService.pop();

        equal(undoRedoService.count(), 1);
        equal(undoRedoService.stack[0].foo, "bar");
    });

    test("UndoRedoService pop does nothing if there are no units", function () {
        var undoRedoService = new diagram.UndoRedoService();
        undoRedoService.pop();

        equal(undoRedoService.count(), 0);
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
        var sameSideDistance;

        function initRouter() {
            sourceShape = new diagram.Shape({width: 100, height: 100});
            targetShape = new diagram.Shape({x: 300, y: 300, width: 100, height: 100});
            connection = new diagram.Connection(sourceShape, targetShape);
            router = new CascadingRouter(connection);
            sameSideDistance = sourceShape.bounds().width / router.SAME_SIDE_DISTANCE_RATIO;
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

            var y = sourcePosition.y - sameSideDistance;
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

            var y = targetPosition.y + sameSideDistance;
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

            var x = sourcePosition.x - sameSideDistance;
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

            var x = targetPosition.x + sameSideDistance;
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

