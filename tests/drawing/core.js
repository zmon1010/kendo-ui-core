(function() {
    var dataviz = kendo.dataviz,
        d = kendo.drawing,
        g = kendo.geometry,
        Surface = d.Surface;

    // ------------------------------------------------------------
    (function() {
        module("Namespaces");

        test("kendo.drawing is aliased as kendo.dataviz.drawing", function() {
            deepEqual(kendo.drawing, kendo.dataviz.drawing);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var surface, instance, container;

        function createSurface(options) {
            if (surface) {
                surface.destroy();
            }

            surface = new Surface(container, options);
            instance = surface._instance;
        }

        module("Surface", {
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

        test("inits instance", function() {
            ok(instance);
        });

        test("inits tooltip", function() {
            ok(surface._tooltip);
        });

         test("does not create tooltip if kendo.ui.Popup is not available", function() {
            var Popup = kendo.ui.Popup;
            try {
                kendo.ui.Popup = null;
                createSurface();
                ok(!surface._tooltip);
            } finally {
                kendo.ui.Popup = Popup;
            }
        });

        test("draw calls the instance draw method", function() {
            var group = new d.Group();
            instance.draw = function(element) {
                ok(element === group);
            };
            surface.draw(group);
        });

        test("clear calls the instance clear method", function() {
            instance.clear = function() {
                ok(true);
            };
            surface.clear();
        });

        test("clear hides tooltip", function() {
            surface._tooltip.hide = function() {
                ok(true);
            };
            surface.clear();
        });

        test("exportVisual returns result from the instance exportVisual method", function() {
            surface._instance.exportVisual = function() {
                return "foo";
            };
            equal(surface.exportVisual(), "foo");
        });

        test("eventTarget returns result from the instance eventTarget method", function() {
            var arg = "bar";
            surface._instance.eventTarget = function(e) {
                equal(e, arg);
                return "foo";
            };
            equal(surface.eventTarget(arg), "foo");
        });

        test("showTooltip shows tooltips", function() {
            surface._tooltip.show = function() {
                ok(true);
            };
            surface.showTooltip();
        });

        test("hideTooltip shows tooltips", function() {
            surface._tooltip.hide = function() {
                ok(true);
            };
            surface.hideTooltip();
        });

        test("suspendTracking calls the instance suspendTracking method", function() {
            instance.suspendTracking = function() {
                ok(true);
            };
            surface.suspendTracking();
        });

        test("suspendTracking hides tooltip", function() {
            surface._tooltip.hide = function() {
                ok(true);
            };
            surface.suspendTracking();
        });

        test("resumeTracking calls the instance resumeTracking method", function() {
            instance.resumeTracking = function() {
                ok(true);
            };
            surface.resumeTracking();
        });

        test("setSize sets element dimensions and instance dimensions", function() {
            surface.setSize({
                width: 100,
                height: 100
            });

            deepEqual(surface._size, {
                width: 100,
                height: 100
            });
            deepEqual(surface._instance.currentSize(), {
                width: 100,
                height: 100
            });
            deepEqual({
                width: surface.element.width(),
                height: surface.element.height()
            }, {
                width: 100,
                height: 100
            });
        });

        test("_resize sets sets instance size and calls _resize", function() {
            surface._size = {
                width: 100,
                height: 100
            };
            instance._resize = function() {
                deepEqual(instance.currentSize(), {
                    width: 100,
                    height: 100
                });
            };
            surface._resize();
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

        test("destroy destroys instance", 2, function() {
            instance.destroy();
            instance.destroy = function() {
                ok(true);
            };

            surface.destroy();
            ok(!surface._instance);
        });
        
        test("destroy destroys tooltip", 2, function() {
            var tooltip = surface._tooltip;
            tooltip.destroy();
            tooltip.destroy = function() {
                ok(true);
            };

            surface.destroy();
            ok(!surface._tooltip);
        });

        // ------------------------------------------------------------
        module("Surface / instance events", {
            setup: function() {
                container = $("<div>").appendTo(QUnit.fixture);
                createSurface();
            },
            teardown: function() {
                surface.destroy();
                container.remove();
            }
        });

        test("triggers click on instance click", function() {
            surface.bind("click", function(e) {
                equal(e.type, "click");
                equal(e.foo, "bar");
            });
            instance.trigger("click", { type: "click", foo: "bar" });
        });

        test("triggers mouseenter on instance mouseenter", function() {
            surface.bind("mouseenter", function(e) {
                equal(e.type, "mouseenter");
                equal(e.foo, "bar");
            });
            instance.trigger("mouseenter", { type: "mouseenter", foo: "bar" });
        });


        test("triggers mouseleave on instance mouseleave", function() {
            surface.bind("mouseleave", function(e) {
                equal(e.type, "mouseleave");
                equal(e.foo, "bar");
            });
            instance.trigger("mouseleave", { type: "mouseleave", foo: "bar" });
        });

        test("triggers mousemove on instance mousemove", function() {
            surface.bind("mousemove", function(e) {
                equal(e.type, "mousemove");
                equal(e.foo, "bar");
            });
            instance.trigger("mousemove", { type: "mousemove", foo: "bar" });
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

            _instance: {
                _elementOffset: function() {
                    return {
                        left: 0,
                        top: 0
                    };
                },
            },

            destroy: function() {
                delete this.element;
            },

            getSize: function() {
                return {
                    width: 1000,
                    height: 1000
                };
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

        test("inits popup on demand", function() {
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

            ok(!tooltip.popup);

            var shape = new d.Rect(new g.Rect([0, 0], [100, 100]), { tooltip: { content: "foo" } });
            tooltip.show(shape);

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
                    if (!isVisible) {
                        ok(!tooltip.popup || tooltip.popup.visible() == isVisible);
                    } else {
                        ok(tooltip.popup && tooltip.popup.visible() == isVisible);
                    }
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

            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});

            tooltip.popup.bind("close", function() {
                ok(false);
            });

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

            surface.trigger("mouseenter", { element: shape, type: "mouseenter"});

            tooltip.popup.bind("close", function() {
                ok(true);
            });

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
            surface._instance._offset = {
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
