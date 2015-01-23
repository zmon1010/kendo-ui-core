function baseSurfaceTests(name, TSurface) {
    var dataviz = kendo.dataviz,
        d = kendo.drawing,
        Group = d.Group;

    var container;
    var surface;

    function createSurface(options) {
        if (surface) {
            surface.destroy();
        }

        surface = new TSurface(container, options);
    }

    // ------------------------------------------------------------
    module("Surface Base Tests / " + name, {
        setup: function() {
            container = $("<div>").appendTo(QUnit.fixture);
            createSurface();
        },
        teardown: function() {
            surface.destroy();
            container.remove();
        }
    });

    test("sets initial options", function() {
        createSurface({ foo: true });
        ok(surface.options.foo);
    });

    test("does not set initial width", function() {
        equal(surface.element[0].style.width, "");
    });

    test("sets initial width", function() {
        createSurface({ width: "500px" });
        equal(surface.element[0].style.width, "500px");
    });

    test("does not set initial height", function() {
        equal(surface.element[0].style.height, "");
    });

    test("sets initial height", function() {
        createSurface({ height: "500px" });
        equal(surface.element[0].style.height, "500px");
    });

    test("draw attaches element to root node", function() {
        var group = new Group();
        surface.draw(group);

        deepEqual(surface._root.childNodes[0].srcElement, group);
    });

    test("draw attaches element to export visual", function() {
        var group = new Group();
        surface.draw(group);

        equal(surface.exportVisual().children[0], group);
    });

    test("draw appends element to export visual", function() {
        surface.draw(new Group());
        surface.draw(new Group());

        equal(surface.exportVisual().children.length, 2);
    });

    test("draw doesn't reparent visual", function() {
        var parent = new Group();
        var child = new Group();
        parent.append(child);

        surface.draw(parent);

        equal(child.parent, parent);
    });

    test("clear removes element from root node", function() {
        var group = new Group();
        surface.draw(group);
        surface.clear();

        equal(surface._root.childNodes.length, 0);
    });

    test("clear removes elements from export visual", function() {
        surface.draw(new Group());
        surface.clear();

        equal(surface.exportVisual().children.length, 0);
    });

    test("size returns element dimensions", function() {
        surface.size({ width: 1000, height: 1000 });

        deepEqual(surface.size(), {
            width: 1000,
            height: 1000
        });
    });

    test("size sets element dimensions", function() {
        surface.size({
            width: 100,
            height: 100
        });

        deepEqual(surface.size(), {
            width: 100,
            height: 100
        });
    });

    test("size caches size even if element is hidden", function() {
        $(container).css("display", "none");
        surface._resize = function() {
            deepEqual(surface._size, {
                width: 100,
                height: 100
            });
        };

        surface.size({
            width: 100,
            height: 100
        });
    });
}

function baseSurfaceEventTests(name, TSurface) {
    var dataviz = kendo.dataviz,
        d = kendo.drawing,
        Group = d.Group;

    var container;
    var surface;

    function createSurface(options) {
        if (surface) {
            surface.destroy();
        }

        surface = new TSurface(container, options);
    }

    // ------------------------------------------------------------
    module("Surface Base Tests / " + name + " /Events", {
        setup: function() {
            container = $("<div>").appendTo(QUnit.fixture);
            createSurface();
        },
        teardown: function() {
            surface.destroy();
            container.remove();
        }
    });

    test("binds initial handlers", function() {
        createSurface({
            click: function() { ok(true); }
        });

        surface.trigger("click");
    });

    test("clicking a node triggers click", function() {
        surface.draw(new Group());
        surface.bind("click", function() { ok(true); });

        $(surface._root.childNodes[0].element).trigger("click");
    });

    test("click has reference to element", function() {
        var group = new Group();
        surface.draw(group);
        surface.bind("click", function(e) { deepEqual(e.element, group); });

        $(surface._root.childNodes[0].element)
            .trigger("click", { toElement: surface._root.childNodes[0].element });
    });

    // ------------------------------------------------------------
    var node;

    module("Surface Base Tests / " + name + " / Events / eventTarget", {
        setup: function() {
            container = $("<div>").appendTo(QUnit.fixture);
            createSurface();
            surface.draw(new Group());
            node = surface._root.childNodes[0];
        },
        teardown: function() {
            surface.destroy();
            container.remove();
        }
    });

    test("eventTarget locates node", function() {
        var e = { target: node.element };
        equal(surface.eventTarget(e), node.srcElement);
    });

    test("eventTarget locates node from nested element", function() {
        var nested = $("<div>").appendTo(node.element);
        var e = { target: nested[0] };
        equal(surface.eventTarget(e), node.srcElement);
    });

    test("eventTarget locates node for touch events", function() {
        var e = { touch: { initialTouch : node.element } };
        equal(surface.eventTarget(e), node.srcElement);
    });

    test("evetTarget returns undefined for root element", function() {
        var e = { target: surface._root.element };
        equal(surface.eventTarget(e), undefined);
    });

    test("evetTarget returns undefined for surface element", function() {
        var e = { target: surface.element };
        equal(surface.eventTarget(e), undefined);
    });

    test("evetTarget returns undefined for external elements", function() {
        var e = { target: document.body };
        equal(surface.eventTarget(e), undefined);
    });
}
