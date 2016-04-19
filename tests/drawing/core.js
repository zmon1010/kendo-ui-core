(function() {
    var dataviz = kendo.dataviz,

        g = kendo.geometry,
        d = kendo.drawing,
        BaseNode = d.BaseNode,
        OptionsStore = d.OptionsStore;

    // ------------------------------------------------------------
    var node,
        child;

    module("BaseNode", {
        setup: function() {
            node = new BaseNode();
            child = new BaseNode();
            node.append(child);
        }
    });

    test("append adds child node", function() {
        deepEqual(node.childNodes[0], child);
    });

    test("append sets parent", function() {
        deepEqual(child.parent, node);
    });

    test("insertAt adds child node at position", function() {
        var child = new BaseNode();
        node.insertAt(child, 0);

        deepEqual(node.childNodes[0], child);
    });

    test("insertAt sets parent", function() {
        var child = new BaseNode();
        node.insertAt(child, 0);

        deepEqual(child.parent, node);
    });

    test("clear removes all child nodes", function() {
        node.append(new BaseNode());
        node.remove = function(i, c) {
            equal(i, 0);
            equal(c, 2);
        };

        node.clear();
    });

    test("remove updates childNodes", function() {
        node.remove(0, 1);

        equal(node.childNodes.length, 0);
    });

    test("remove unsets parent", function() {
        node.remove(0, 1);

        equal(child.parent, null);
    });

    test("remove clears child nodes", 2, function() {
        var clear = function() {
            ok(true);
        };
        var clearFalse = function() {
            ok(false);
        };
        var child2 = new BaseNode();
        var child3 = new BaseNode();
        var child4 = new BaseNode();
        node.append(child2);node.append(child3);node.append(child4);
        child.clear = child4.clear = clearFalse;
        child2.clear = child3.clear = clear;

        node.remove(1, 2);
    });

    test("remove clears nested nodes", function() {
        var grandChild = new BaseNode();
        grandChild.clear = function() { ok(true); };
        child.append(grandChild);

        node.remove(0, 1);
    });

    test("invalidate propagates to parent", function() {
        var child = new BaseNode();
        node.append(child);
        node.invalidate = function() { ok(true); };

        child.invalidate();
    });

    test("geometryChange triggers invalidate", function() {
        node.invalidate = function() { ok(true); };

        node.geometryChange();
    });

    test("optionsChange triggers invalidate", function() {
        node.invalidate = function() { ok(true); };

        node.optionsChange();
    });

    test("childrenChange loads added source elements", function() {
        node.load = function(items) { equal(items.length, 1); };

        node.childrenChange({ action: "add", items: [{}] });
    });

    test("childrenChange removes deleted source elements", function() {
        node.remove = function(index, count) {
            equal(index, 10);
            equal(count, 1);
        };

        node.childrenChange({ action: "remove", index: 10, items: [{}] });
    });

    // ------------------------------------------------------------
    var options;
    var ObserverClass = kendo.Class.extend({});
    kendo.deepExtend(ObserverClass.fn, kendo.mixins.ObserversMixin);

    module("Options Store", {
        setup: function() {
            options = new OptionsStore({
                foo: {
                    bar: { },
                    baz: true
                },
                bar: true,
                obj: new ObserverClass()
            });
        }
    });

    test("wraps value fields", function() {
        ok(options.foo instanceof OptionsStore);
    });

    test("wraps nested fields", function() {
        ok(options.foo.bar instanceof OptionsStore);
    });

    test("doesn't wrap kendo classes", function() {
        ok(!(options.obj instanceof OptionsStore));
    });

    test("sets observer on functions", function() {
        equal(options.obj.observers()[0], options);
    });

    test("clears previous field observer", function() {
        var previous = options.obj;
        options.set("obj", new ObserverClass());
        equal(previous.observers().length, 0);
    });

    test("set", function() {
        options.set("baz", true);
        equal(options.baz, true);
    });

    test("set triggers optionsChange", function() {
        options.addObserver({
            optionsChange: function(e) {
                equal(e.field, "baz");
                equal(e.value, true);
            }
        });

        options.set("baz", true);
    });

    test("nested set", function() {
        options.set("baz.baz", true);
        equal(options.baz.baz, true);
    });

    test("nested set on existing field triggers optionsChange", function() {
        options.addObserver({
            optionsChange: function(e) {
                equal(e.field, "foo.bar.baz");
            }
        });

        options.set("foo.bar.baz", true);
    });

    test("nested set on new field triggers optionsChange", function() {
        options.addObserver({
            optionsChange: function(e) {
                equal(e.field, "baz.baz");
            }
        });

        options.set("baz.baz", true);
    });

    test("get returns field", function() {
        equal(options.get("foo.baz"), true);
    });

    test("get returns nested field", function() {
        equal(options.get("foo.baz"), true);
    });

    // ------------------------------------------------------------
    (function() {
        var factory;

        module("SurfaceFactory", {
            setup: function() {
                factory = new d.SurfaceFactory();
            }
        });

        test("registers surfaces in ascending order", function() {
            factory.register("bar", $.noop, 1);
            factory.register("foo", $.noop, 0);

            equal(factory._items[0].name, "foo");
        });

        test("instantiates surface with options", function() {
            factory.register("foo", function(e, o) { ok(o.bar); }, 0);

            factory.create(null, { bar: true });
        });

        test("instantiates default surface", function() {
            factory.register("foo", function() { ok(true); }, 0);
            factory.register("bar", function() { ok(false); }, 1);

            factory.create();
        });

        test("instantiates preferred surface", function() {
            factory.register("foo", function() { ok(false); }, 0);
            factory.register("bar", function() { ok(true); }, 1);

            factory.create(null, { type: "bar" });
        });

        test("ignores case of preferred surface", function() {
            factory.register("foo", function() { ok(false); }, 0);
            factory.register("bar", function() { ok(true); }, 1);

            factory.create(null, { type: "Bar" });
        });

        test("instantiates default surface if the preferred is unavailable", function() {
            factory.register("foo", function() { ok(true); }, 0);
            factory.register("bar", function() { ok(false); }, 1);

            factory.create(null, { type: "baz" });
        });

        asyncTest("logs warning if no surfaces are registered", 1, function() {
            stubMethod(kendo, "logToConsole", function(message) {
                ok(message.indexOf("Warning: Unable to create Kendo UI Drawing Surface.") > -1);
                start();
            }, function() {
                factory.create();
            });
        });

    })();

    // ------------------------------------------------------------
    (function() {
        module("Namespaces");

        test("kendo.drawing is aliased as kendo.dataviz.drawing", function() {
            deepEqual(kendo.drawing, kendo.dataviz.drawing);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var TOLERANCE = 1;
        var SurfaceTooltip = d.SurfaceTooltip;
        var surface, container;
        var group, shape, shape2;
        var tooltip;

        function getPopupPosition() {
            var popup = tooltip.popup;
            return {
                left: parseInt(popup.wrapper.css("left"), 10),
                top: parseInt(popup.wrapper.css("top"), 10)
            };
        }

        var SurfaceMock = kendo.Observable.extend({
            init: function(element, options) {
                this.element = element;
                this.options = options;
                kendo.Observable.fn.init.call(this);
            },

            _elementOffset: function() {
                return {
                    left: 0,
                    top: 0
                };
            },

            destroy: function() {
                delete this.element;
            }
        });

        function createTooltip(surface, options) {
            if (tooltip) {
                tooltip.destroy();
            }

            tooltip = new SurfaceTooltip(surface, options);
        }

        function setup() {
            container = $("<div>").appendTo(QUnit.fixture);
            surface = new SurfaceMock(container);
        }

        function teardown() {
            tooltip.destroy();
            surface.destroy();
            container.remove();
            tooltip = null;
            container = null;
        }

        module("Surface / tooltip / initialization", {
            setup: setup,
            teardown: teardown
        });

        test("inits options", function() {
            createTooltip(surface, {
                position: "left",
                showOn: "click",
                offset: 10,
                autoHide: false,
                width: 100,
                height: 50,
                content: "foo",
                shared: true,
                hideDelay: 100
            });
            equal(tooltip.options.position, "left");
            equal(tooltip.options.showOn, "click");
            equal(tooltip.options.offset, 10);
            equal(tooltip.options.autoHide, false);
            equal(tooltip.options.width, 100);
            equal(tooltip.options.height, 50);
            equal(tooltip.options.content, "foo");
            equal(tooltip.options.shared, true);
            equal(tooltip.options.hideDelay, 100);
        });

        test("inits elements", function() {
            createTooltip(surface);
            ok(tooltip.element.hasClass("k-tooltip"));
            ok(tooltip.content.hasClass("k-tooltip-content"));
        });

        test("inits popup", function() {
            createTooltip(surface, {
                appendTo: container,
                animation: {
                    open: {
                        effects: "bar"
                    },
                    close: {
                        effects: "baz"
                    }
                }
            });

            ok(tooltip.popup.options.appendTo.is(container));
            ok(tooltip.popup.element.is(tooltip.element));
            equal(tooltip.popup.options.animation.open.effects, "bar");
            equal(tooltip.popup.options.animation.close.effects, "baz");
        });

        // ------------------------------------------------------------

        function testIsVisible(message, expected, testSetup, isVisible, delay) {
            if (kendo.isFunction(expected)) {
                delay = isVisible;
                isVisible = testSetup;
                testSetup = expected;
                expected = null;
            }
            asyncTest(message, expected, function() {
                testSetup();
                setTimeout(function() {
                    ok(tooltip.popup.visible() == isVisible);
                    start();
                }, delay || 0);
            });
        }

        module("Surface / tooltip / event handling", {
            setup: function() {
                setup();
                createTooltip(surface, {
                    animation: false,
                    showAfter: 0
                });
                shape = new d.Rect(new g.Rect([0, 0], [100, 100]));
                group = new d.Group();
            },
            teardown: teardown
        });

        testIsVisible("shows tooltip on click if the shape showOn option is equal to click", function() {
            shape.options.tooltip = {
                showOn: "click",
                content: "foo"
            };
            surface.trigger("click", { element: shape, type: "click"});
        }, true);

        asyncTest("shows tooltip on click with showAfter with delay", function() {
            shape.options.tooltip = {
                showOn: "click",
                content: "foo",
                showAfter: 50
            };
            surface.trigger("click", { element: shape, type: "click"});
            setTimeout(function() {
                ok(!tooltip.popup.visible());
            }, 20);
            setTimeout(function() {
                ok(tooltip.popup.visible());
                start();
            }, 70);
        });

        testIsVisible("does not show tooltip on click if the shape showOn option is not equal to click", function() {
            shape.options.tooltip = {
                showOn: "mouseenter",
                content: "foo"
            };
            surface.trigger("click", { element: shape, type: "click"});
        }, false);

        testIsVisible("shows tooltip on click if the parent group shape showOn option is equal to click", function() {
            group.append(shape);
            group.options.tooltip = {
                showOn: "click",
                content: "foo"
            };
            surface.trigger("click", { element: shape, type: "click"});
        }, true);

        testIsVisible("shows tooltip on mouseenter if the shape showOn option is equal to mouseenter", function() {
            shape.options.tooltip = {
                showOn: "mouseenter",
                content: "foo"
            };
            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
        }, true);

        asyncTest("shows tooltip on mouseenter with showAfter delay", function() {
            shape.options.tooltip = {
                showOn: "mouseenter",
                content: "foo",
                showAfter: 50
            };
            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
            setTimeout(function() {
                ok(!tooltip.popup.visible());
            }, 20);
            setTimeout(function() {
                ok(tooltip.popup.visible());
                start();
            }, 70);
        });

        testIsVisible("does not show tooltip on mouseenter if the shape showOn option is not equal to mouseenter", function() {
            shape.options.tooltip = {
                showOn: "click",
                content: "foo"
            };
            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
        }, false);

        testIsVisible("shows tooltip on mouseenter if the parent group shape showOn option is equal to mouseenter", function() {
            group.append(shape);
            group.options.tooltip = {
                showOn: "mouseenter",
                content: "foo"
            };
            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
        }, true);

        testIsVisible("hides tooltip on mouseleave with delay", 2, function() {
            shape.options.tooltip = {
                content: "foo"
            };
            tooltip.show(shape);
            surface.trigger("mouseleave", { element: shape, type: "mouseleave", originalEvent: {}});
            ok(tooltip.popup.visible());
        }, false);

        testIsVisible("does not hide tooltip on mouseleave if autoHide is false", function() {
            shape.options.tooltip = {
                content: "foo",
                autoHide: false
            };
            tooltip.show(shape);
            surface.trigger("mouseleave", { element: shape, type: "mouseleave", originalEvent: {}});
        }, true);

        testIsVisible("does not hide tooltip on mouseleave before hideDelay expires", function() {
            shape.options.tooltip = {
                content: "foo",
                autoHide: false,
                hideDelay: 100
            };
            tooltip.show(shape);
            surface.trigger("mouseleave", { element: shape, type: "mouseleave", originalEvent: {}});
        }, true, 50);

        asyncTest("does not hide element if the mouse moves from one element of a group to another from the same group and the shared option is true", 1, function() {
            var shape2 = new d.Rect(new g.Rect([50, 0], [100, 100]));
            group.append(shape, shape2);

            group.options.tooltip = {
                content: "foo",
                shared: true
            };

            tooltip.popup.bind("close", function() {
                ok(false);
            });

            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
            setTimeout(function() {
                surface.trigger("mouseleave", { element: shape, type: "mouseleave", originalEvent: {}});
                surface.trigger("mouseenter", { element: shape2, type: "mouseenter"});
                ok(tooltip.popup.visible());
                start();
            }, 0);
        });

        asyncTest("hides element if the mouse moves from one element of a group to another from the same group but the shared option is false", 2, function() {
            var shape2 = new d.Rect(new g.Rect([50, 0], [100, 100]));
            group.append(shape, shape2);

            group.options.tooltip = {
                content: "foo",
                shared: false
            };

            tooltip.popup.bind("close", function() {
                ok(true);
            });

            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
            setTimeout(function() {
                surface.trigger("mouseleave", { element: shape, type: "mouseleave", originalEvent: {}});
                surface.trigger("mouseenter", { element: shape2, type: "mouseenter"});
                ok(!tooltip.popup.visible());
                start();
            }, 0);
        });

        test("moves popup based on current cursor position on mousemove if position is set to cursor", function() {
            shape.options.tooltip = {
                position: "cursor",
                content: "foo",
                offset: 0
            };
            tooltip.show(shape);
            surface.trigger("mousemove", { element: shape, type: "mousemove", originalEvent: {
                clientX: 100,
                clientY: 200
            }});

            var width = tooltip.element.outerWidth();
            var height = tooltip.element.outerHeight();
            close(parseInt(tooltip.popup.wrapper.css("left"), 10), 100 - width / 2, TOLERANCE);
            close(parseInt(tooltip.popup.wrapper.css("top"), 10), 200 - height, TOLERANCE);
        });

        test("hides tooltip on surface mouseleave", function() {
            shape.options.tooltip = {
                content: "foo"
            };
            tooltip.show(shape);
            surface.element.trigger("mouseleave");
            ok(!tooltip.popup.visible());
        });

        test("does not hide tooltip on surface mouseleave if the related target is in the popup", function() {
            shape.options.tooltip = {
                content: "foo"
            };
            tooltip.show(shape);
            surface.element.trigger($.Event("mouseleave", {relatedTarget: tooltip.popup.wrapper}));
            ok(tooltip.popup.visible());
        });

        // ------------------------------------------------------------
        module("Surface / tooltip / position", {
            setup: function() {
                setup();
                createTooltip(surface, {
                    animation: false,
                    offset: 0,
                    width: 50,
                    height: 20
                });
                shape = new d.Rect(new g.Rect([100, 100], [100, 100]), {
                    tooltip: {
                        content: "foo"
                    }
                });
                group = new d.Group();
            },
            teardown: teardown
        });

        test("Applies top position by default", function() {
            tooltip.show(shape);
            var position = getPopupPosition();
            equal(position.left, 119);
            equal(position.top, 70);
        });

        test("Applies top position with offset", function() {
            tooltip.show(shape, {
                offset: 10
            });
            var position = getPopupPosition();
            equal(position.left, 119);
            equal(position.top, 60);
        });

        test("Applies left position", function() {
            tooltip.show(shape, {
                position: "left"
            });
            var position = getPopupPosition();
            equal(position.left, 39);
            equal(position.top, 135);
        });

        test("Applies left position with offset", function() {
            tooltip.show(shape, {
                position: "left",
                offset: 10
            });
            var position = getPopupPosition();
            equal(position.left, 29);
            equal(position.top, 135);
        });

        test("Applies right position", function() {
            tooltip.show(shape, {
                position: "right"
            });
            var position = getPopupPosition();
            equal(position.left, 200);
            equal(position.top, 135);
        });

        test("Applies right position with offset", function() {
            tooltip.show(shape, {
                position: "right",
                offset: 10
            });
            var position = getPopupPosition();
            equal(position.left, 210);
            equal(position.top, 135);
        });

        test("Applies bottom position", function() {
            tooltip.show(shape, {
                position: "bottom"
            });
            var position = getPopupPosition();
            equal(position.left, 119);
            equal(position.top, 200);
        });

        test("Applies bottom position with offset", function() {
            tooltip.show(shape, {
                position: "bottom",
                offset: 10
            });
            var position = getPopupPosition();
            equal(position.left, 119);
            equal(position.top, 210);
        });

        test("Applies cursor position", function() {
            tooltip._show(shape, shape, {
                position: "cursor",
                content: "foo",
                offset: 0,
                width: 50,
                height: 20
            }, {
                clientX: 300,
                clientY: 250
            });
            var position = getPopupPosition();
            equal(position.left, 269);
            equal(position.top, 220);
        });

        test("Applies cursor position with offset", function() {
            tooltip._show(shape, shape, {
                position: "cursor",
                content: "foo",
                offset: 10,
                width: 50,
                height: 20
            }, {
                clientX: 300,
                clientY: 250
            });
            var position = getPopupPosition();
            equal(position.left, 269);
            equal(position.top, 210);
        });

        test("uses group bbox if shared is set to true", function() {
            var shape2 = new d.Rect(new g.Rect([200, 100], [100, 100]));
            shape.options.set("tooltip", null);
            group.append(shape, shape2);
            group.options.tooltip = {
                shared: true,
                content: "foo"
            };
            tooltip.show(group);
            var position = getPopupPosition();
            equal(position.left, 169);
            equal(position.top, 70);
        });

        test("takes surface offset into account", function() {
            surface._offset = {
                x: -100,
                y: -100
            };
            tooltip.show(shape);
            var position = getPopupPosition();
            equal(position.left, 219);
            equal(position.top, 170);
        });

        // ------------------------------------------------------------
        module("Surface / tooltip / close button", {
            setup: function() {
                setup();
                createTooltip(surface, {
                    animation: false
                });
                shape = new d.Rect(new g.Rect([100, 100], [100, 100]), {
                    tooltip: {
                        content: "foo",
                        autoHide: false
                    }
                });
            },
            teardown: teardown
        });

        test("adds close button if autoHide is set false", function() {
            tooltip.show(shape);
            equal(tooltip.element.children(".k-tooltip-button").length, 1);
            ok(tooltip.element.hasClass("k-tooltip-closable"));
        });

        test("toolip is hidden on close button click", function() {
            tooltip.show(shape);
            tooltip.element.children(".k-tooltip-button").trigger("click");
            ok(!tooltip.popup.visible());
        });

        test("does not add multiple close buttons", function() {
            shape2 = new d.Rect(new g.Rect([100, 100], [100, 100]), {
                tooltip: {
                    content: "bar",
                    autoHide: false
                }
            });
            tooltip.show(shape);
            tooltip.show(shape2);
            equal(tooltip.element.children(".k-tooltip-button").length, 1);
        });

        test("removes close button if autoHide is true for the new shape", function() {
            shape2 = new d.Rect(new g.Rect([100, 100], [100, 100]), {
                tooltip: {
                    content: "bar",
                    autoHide: true
                }
            });
            tooltip.show(shape);
            tooltip.show(shape2);
            equal(tooltip.element.children(".k-tooltip-button").length, 0);
            ok(!tooltip.element.hasClass("k-tooltip-closable"));
        });

        // ------------------------------------------------------------
        module("Surface / tooltip / content", {
            setup: function() {
                setup();
                createTooltip(surface, {
                    animation: false
                });
                shape = new d.Rect(new g.Rect([100, 100], [100, 100]));
            },
            teardown: teardown
        });

        test("sets string content", function() {
            shape.options.tooltip = {
                content: "foo"
            };

            tooltip.show(shape);
            equal(tooltip.content.text(), "foo");
        });

        test("sets function content", function() {
            shape.options.tooltip = {
                content: function() {
                    return "bar";
                }
            };

            tooltip.show(shape);
            equal(tooltip.content.text(), "bar");
        });

        test("passes element and target to content function", function() {
            shape.options.tooltip = {
                content: function(e) {
                    ok(e.target === shape);
                    ok(e.element === shape);
                }
            };

            tooltip.show(shape);
        });

        test("element passed to the content function is the group with the tooltip options", function() {
            group = new d.Group();
            group.options.tooltip = {
                content: function(e) {
                    ok(e.element === group);
                    ok(e.target === shape);
                }
            };
            group.append(shape);
            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});
        });

        test("does not show tooltip for empty content", function() {
            shape.options.tooltip = {
                content: ""
            };

            tooltip.show(shape);
            ok(!tooltip.popup.visible());
        });

        // ------------------------------------------------------------
        module("Surface / tooltip / events", {
            setup: function() {
                setup();
                createTooltip(surface, {
                    animation: false
                });
                shape = new d.Rect(new g.Rect([100, 100], [100, 100]), {
                    tooltip: {
                        content: "foo"
                    }
                });
            },
            teardown: teardown
        });

        test("triggers tooltioOpen on surface on show", function() {
            surface.bind("tooltipOpen", function() {
                ok(true);
            });
            tooltip.show(shape);
        });

        test("does not show tooltip if tooltioOpen is prevented", function() {
            surface.bind("tooltipOpen", function(e) {
                e.preventDefault();
            });
            tooltip.show(shape);
            ok(!tooltip.popup.visible());
        });

        test("triggers tooltipClose on surface on hide", function() {
            surface.bind("tooltipClose", function() {
                ok(true);
            });

            tooltip.show(shape);
            tooltip.hide();
        });

        test("does not hide tooltip if tooltipClose is prevented", function() {
            surface.bind("tooltipClose", function(e) {
                e.preventDefault();
            });
            tooltip.show(shape);
            tooltip.hide();
            ok(tooltip.popup.visible());
        });

    })();
})();
