(function(){

    var container;
    var drawing = kendo.drawing;

    module("[drawDOM]", {
        setup: function() {
            container = createContainer();
        },
        teardown: function() {
            container.remove();
        }
    });

    test("Draws jQuery element", function(){
        container.html("<span style='font: bold 16px monospace'>Foo bar</span>");
        drawing.drawDOM(container).done(function(group){
            ok(true);
        });
    });

    // ------------------------------------------------------------
    (function() {
        var container;
        var element;
        var widget;

        module("[drawDOM] / Exportable Widgets", {
            setup: function() {
                container = createContainer();
                element = $("<div />").kendoExportable().appendTo(container);
                widget = element.getKendoExportable();
            },
            teardown: function() {
                container.remove();
            }
        });

        test("calls exportVisual", function(){
            widget.exportVisual = function() {
                ok(true);
                return new drawing.Group();
            };

            drawing.drawDOM(container);
        });

        test("calls exportDOMVisual", function(){
            widget.exportDOMVisual = function() {
                ok(true);
                return new drawing.Group();
            };

            drawing.drawDOM(container);
        });

        test("does not call exportVisual if exportDOMVisual is defined", function(){
            widget.exportVisual = function() {
                ok(false);
            };

            widget.exportDOMVisual = function() {
                ok(true);
                return new drawing.Group();
            };

            drawing.drawDOM(container);
        });

        test("appends exportVisual result", function(){
            drawing.drawDOM(container).done(function(group) {
                ok(group.children[0] instanceof drawing.Group);
            });
        });

        test("positions widget", function(){
            element.css({
                position: "absolute",
                left: "50px",
                top: "100px"
            });

            drawing.drawDOM(container).done(function(group) {
                deepEqual(group.bbox().origin.toArray(), [50, 100]);
            });
        });

        test("does not apply transformation to exported visual", function() {
            var visual = new drawing.Group();
            widget.exportVisual = function() {
                return visual;
            };

            drawing.drawDOM(container).done(function() {
                ok(!visual.transform());
            });
        });

        test("ignores children", function(){
            element.append($("<div>Foo</div>"));

            drawing.drawDOM(container).done(function(group) {
                equal(group.children.length, 1);
            });
        });
    })();

    /* -----[ utils ]----- */

    var Exportable = kendo.ui.Widget.extend({
        options: {
            name: "Exportable"
        },

        exportVisual: function() {
            var path = new drawing.Path().moveTo(0, 0).lineTo(1, 1);
            var group = new drawing.Group();
            group.append(path);

            return group;
        }
    });
    kendo.ui.plugin(Exportable);

    function find(group, predicate) {
        return findMany(group, predicate)[0];
    }

    function findMany(group, predicate) {
        var result = [];
        (function dive(node){
            if (predicate(node)) result.push(node);
            if (node instanceof drawing.Group || node instanceof drawing.MultiPath) {
                for (var i = 0; i < node.children.length; ++i) {
                    dive(node.children[i]);
                }
            }
        })(group);
        return result;
    }

    function createContainer() {
        return $("<div style='position: absolute !important; left: 0 !important; top: 0 !important;' />").appendTo(QUnit.fixture);
    }

})();
