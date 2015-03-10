(function() {
    var tolerance = 0.0001,
        dataviz = kendo.dataviz,
        toolbar,
        diagram;

    function createDiagram() {
        QUnit.fixture.html('<div id="canvas" />');
        diagram = $("#canvas").kendoDiagram({
            dataSource: setupDiagramDataSource(),
            connectionsDataSource: setupDiagramDataSource()
        }).getKendoDiagram();
    }

    function createToolBar(options) {
        QUnit.fixture.html('<div id="diagram" />');
        diagram = {
            element: $("#diagram")
        };

        toolbar = new dataviz.diagram.DiagramToolBar(diagram, options || {});
    }

    // ------------------------------------------------------------
    module("ToolBar / Actions", {
        teardown: function() {
            toolbar.destroy();
        }
    });

    test("should create edit action", function () {
        createToolBar({ tools: ["edit"] });
        equal(toolbar.element.find("a").data("action"), "edit");
    });

    test("should create delete action", function () {
        createToolBar({ tools: ["delete"] });
        equal(toolbar.element.find("a").data("action"), "delete");
    });

    test("should create rotateAnticlockwise action", function () {
        createToolBar({ tools: ["rotateAnticlockwise"] });
        equal(toolbar.element.find("a").data("action"), "rotateAnticlockwise");
    });

    test("should create rotateClockwise action", function () {
        createToolBar({ tools: ["rotateClockwise"] });
        equal(toolbar.element.find("a").data("action"), "rotateClockwise");
    });

    test("should create rotateAnticlockwise action with custom step", function () {
        createToolBar({ tools: [{ name: "rotateAnticlockwise", step: 45 }] });
        equal(toolbar.element.find("a").data("step"), 45);
    });

    test("should create rotateClockwise action with custom step", function () {
        createToolBar({ tools: [{ name: "rotateClockwise", step: 45 }] });
        equal(toolbar.element.find("a").data("step"), 45);
    });

    test("should create custom tool", function () {
        createToolBar({ tools: [{ type: "button", text: "foo"}] });
        ok(toolbar.element.find(":contains(foo)").length !== 0);
    });

    // ------------------------------------------------------------
    module("ToolBar / Actions / delete", {
        setup: function() {
            createDiagram();
        },
        teardown: function() {
            diagram.destroy();
        }
    });

    test("should trigger remove for selected shapes", function () {
        var shape = diagram.shapes[0];
        diagram.bind("remove", function(e) {
            ok(e.shape === shape);
        });

        shape.select(true);
        diagram.toolBar["delete"]();
    });

    test("should remove the selected shapes", function () {
        var shape = diagram.shapes[0];
        diagram.remove = function(items) {
            ok(shape === items[0]);
        };

        shape.select(true);
        diagram.toolBar["delete"]();
    });

    test("should note remove the selected shapes if the default action is prevented", 0, function () {
        var shape = diagram.shapes[0];
        diagram.bind("remove", function(e) {
            e.preventDefault();
        });
        diagram.remove = function(items) {
            ok(false);
        };

        shape.select(true);
        diagram.toolBar["delete"]();
    });

    test("should sync the shape changes", function () {
        var shape = diagram.shapes[0];
        diagram.dataSource.bind("sync", function() {
            ok(true);
        });
        shape.select(true);
        diagram.toolBar["delete"]();
    });

    test("should trigger remove for selected connections", function () {
        var connection = diagram.connections[0];
        diagram.bind("remove", function(e) {
            ok(e.connection === connection);
        });

        connection.select(true);
        diagram.toolBar["delete"]();
    });

    test("should remove the selected connections", function () {
        var connection = diagram.connections[0];
        diagram.remove = function(items) {
            ok(connection === items[0]);
        };

        connection.select(true);
        diagram.toolBar["delete"]();
    });

    test("should not remove the selected connections if the default action is prevented", 0, function () {
        var connection = diagram.connections[0];
                diagram.bind("remove", function(e) {
            e.preventDefault();
        });
        diagram.remove = function(items) {
            ok(false);
        };

        connection.select(true);
        diagram.toolBar["delete"]();
    });

    test("should sync the connection changes", function () {
        var connection = diagram.connections[0];
        diagram.connectionsDataSource.bind("sync", function() {
            ok(true);
        });
        connection.select(true);
        diagram.toolBar["delete"]();
    });
})();
