(function() {
    var style;
    var diagram;

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
    module("Auto theme", {
        setup: function() {
            style = $(
                "<style>" +
                    ".k-var--accent { background-color: rgb(1, 1, 1) }" +
                    ".k-var--accent-contrast { background-color: rgb(2, 2, 2) }" +
                    ".k-var--normal-text-color { background-color: red }" +
                    ".k-var--normal-background { background-color: blue }" +
                "</style>"
            ).appendTo(document.head);

            diagram = createDiagram({ theme: "default-v2" });
        },
        teardown: function () {
            style.remove();

            diagram.destroy();
        }
    });

    var styles = [];
    function mapStyle(path, value) {
        styles.push({
            path: path,
            value: value
        });
    }

    mapStyle("shapeDefaults.fill.color", "rgb(1, 1, 1)");
    mapStyle("shapeDefaults.content.color", "rgb(2, 2, 2)");
    mapStyle("shapeDefaults.connectorDefaults.fill.color", "rgb(255, 0, 0)");
    mapStyle("shapeDefaults.connectorDefaults.stroke.color", "rgb(2, 2, 2)");
    mapStyle("shapeDefaults.connectorDefaults.hover.fill.color", "rgb(2, 2, 2)");
    mapStyle("shapeDefaults.connectorDefaults.hover.stroke.color", "rgb(255, 0, 0)");

    mapStyle("editable.resize.handles.fill.color", "rgb(0, 0, 255)");
    mapStyle("editable.resize.handles.stroke.color", "rgb(255, 0, 0)");
    mapStyle("editable.resize.handles.hover.fill.color", "rgb(255, 0, 0)");
    mapStyle("editable.resize.handles.hover.stroke.color", "rgb(255, 0, 0)");

    mapStyle("selectable.stroke.color", "rgb(255, 0, 0)");

    mapStyle("connectionDefaults.stroke.color", "rgb(255, 0, 0)");
    mapStyle("connectionDefaults.content.color", "rgb(255, 0, 0)");

    mapStyle("connectionDefaults.selection.handles.fill.color", "rgb(2, 2, 2)");
    mapStyle("connectionDefaults.selection.handles.stroke.color", "rgb(255, 0, 0)");
    mapStyle("connectionDefaults.selection.stroke.color", "rgb(255, 0, 0)");

    function styleTest(style) {
        var path = style.path;
        var value = style.value;
        var props = path.split('.');

        test("setting " + path, function() {
            var diagramStyle = diagram.options[props.shift()];
            while(props.length) {
                diagramStyle = diagramStyle[props.shift()];
            }

            equal(diagramStyle, value);
        });
    }

    styles.forEach(styleTest);
})();
