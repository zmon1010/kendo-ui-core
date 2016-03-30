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
                    id: "shape1"
                },{
                    id: "shape2",
                    x: 150,
                    y: 150
                }],
                connections: [{
                    from: "shape1",
                    to: "shape2"
                }],
                connectionDefaults: {
                    type: "polyline"
                }
            }, options))
            .getKendoDiagram();

        return diagram;
    }

    /*-----------------------------------------------*/
    module("Diagram connections", {
        teardown: function () {
            diagram.destroy();
        }
    });

    test("type polyline", function () {
        createDiagram();
        $.each(diagram.connections, function(index, item) {
            equal(this.options.type, "polyline");
        });
    });

    test("content visual with shape group", 0, function() {
        createDiagram({
            connectionDefaults: {
                content: {
                    visual: function(e) {
                        var g = new dataviz.diagram.Group();

                        g.append(new dataviz.diagram.TextBlock({
                            text: "Foo"
                        }));

                        g.append(new dataviz.diagram.TextBlock({
                            text: "Bar"
                        }));

                        return g;
                    }
                }
            }
        });
    });
})();
