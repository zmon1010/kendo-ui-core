(function() {
    var dataviz = kendo.dataviz,

        g = kendo.geometry,
        Point = g.Point,

        m = dataviz.map,
        Extent = m.Extent,
        Location = m.Location;

    var map;
    function createMap(options) {
        destroyMap();

        var element = $("<div></div>").appendTo(QUnit.fixture);
        map = new kendo.dataviz.ui.Map(element, options);
        return map;
    }

    function destroyMap() {
        if (map) {
            map.destroy();
            map.element.remove();
            map = null;
        }
    }

    function touchZoom() {
        var element = map.scrollElement;
        press(element, 100, 100, 1);
        press(element, 110, 110, 2);
        move(element, 200, 200, 2);
        release(element, 200, 200, 2);
        release(element, 100, 100, 1);
    }

    // ------------------------------------------------------------
    module("Map / Events / zoomStart", {
        setup: function() { createMap(); },
        teardown: destroyMap
    });

    test("triggered for mousewheel", function() {
        map.bind("zoomStart", function(e) {
            ok(true);
        });

        mousewheel(map.element, -1);
    });

    test("cancellable (mousewheel)", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            e.preventDefault();
        });

        mousewheel(map.element, -1);

        equal(map.zoom(), 1);
    });

    test("triggered for touch", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            ok(true);
        });

        touchZoom();
    });

    test("cancellable (touch)", function() {
        map.zoom(1);
        map.bind("zoomStart", function(e) {
            e.preventDefault();
        });

        touchZoom();

        equal(map.zoom(), 1);
    });

    // ------------------------------------------------------------
    module("Map / Events / reset", {
        setup: function() { createMap(); },
        teardown: destroyMap
    });

    test("beforeReset triggered before reset", 2, function() {
        map.bind("beforeReset", function() {
            ok(true);
            map.bind("reset", function() {
                ok(true);
            });
        });

        map._reset();
    });

    test("fires reset after zooming", function() {
        map.bind("reset", function() {
            equal(map.zoom(), 5);
        });

        map.zoom(5);
    });

    test("fires reset after changing center", function() {
        map.bind("reset", function() {
            ok(map.center().equals(new m.Location(10, 20)));
        });

        map.center([10, 20]);
    });

    test("fires reset after setOptions", function() {
        map.bind("reset", function() {
            ok(map.options.foo, true);
        });

        map.setOptions({ foo: true });
    });

    // ------------------------------------------------------------
    (function() {
        module("Map / Events / pan", {
            setup: function() { createMap(); },
            teardown: destroyMap
        });

        function touchPan(x, y) {
            var element = map.scrollElement;
            x = kendo.util.valueOrDefault(x, 100);
            y = kendo.util.valueOrDefault(y, 100);
            press(element, 100, 100);
            map.scroller.scrollTo(100 + x, 100 + y);
            release(element, 100 + x, 100 + y);
        }

        test("panEnd is triggered for horizontal pan", function() {
            map.bind("panEnd", function(e) {
                ok(true);
            });

            touchPan(100, 0);
        });

        test("panEnd is triggered for vertical pan", function() {
            map.bind("panEnd", function(e) {
                ok(true);
            });

            touchPan(0, 100);
        });

        test("panEnd is triggered once", 1, function() {
            map.bind("panEnd", function(e) {
                ok(true);
            });

            touchPan(100, 100);
        });

        test("click is not triggered after panning", 0, function() {
            map.bind("click", function(e) {
                ok(false);
            });

            touchPan();
            map.scrollElement.trigger($.Event("click", {}));
        });
    })();
})();
