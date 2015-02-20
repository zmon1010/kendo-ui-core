(function() {

    var dataviz = kendo.dataviz,
        highlight;

    function createHighlight() {
        highlight = new dataviz.Highlight();
    }

    function elementStub(options) {
        return kendo.deepExtend({
            hasHighlight: function() {
                return this._hasHighlight;
            },
            _hasHighlight: true,
            highlightVisual: function() {
                return "foo";
            },
            options: {}
        }, options);
    }

    (function() {

        module("Highlight", {
            setup: createHighlight
        });

        test("show toggles highlight", 1, function() {
            highlight.show(elementStub({
                toggleHighlight: function(visible) {
                    equal(visible, true);
                }
            }));
        });

        test("hide toggles highlight on currently highlighted elements", function() {
            var stub = elementStub({
                toggleHighlight: function () {}
            });
            highlight.show(stub);
            stub.toggleHighlight = function(visible) {
                equal(visible, false);
            };
            highlight.hide();
        });

        test("Does not toggle highlight if element does not have toggleHighlight method", function() {
            highlight.show({ });
            ok(true);
        });

        test("Does not toggle highlight if element does not have highlight", 0, function() {
            highlight.show(elementStub({
                _hasHighlight: false,
                toggleHighlight: function() {
                    ok(false);
                }
            }));
        });

        test("isHighlighted returns true if element is highlighted", function() {
            var stub = elementStub({
                toggleHighlight: function () {}
            });
            highlight.show(stub);
            equal(highlight.isHighlighted(stub), true);
        });

        test("isHighlighted returns false if element is not highlighted", function() {
            highlight.show(elementStub({
                toggleHighlight: $.noop
            }));

            equal(highlight.isHighlighted({}), false);
        });
        // ------------------------------------------------------------
        module("Highlight / Multiple points", {
            setup: createHighlight
        });

        test("show toggles highlight", 2, function() {
            highlight.show([elementStub({
                toggleHighlight: function(visible) {
                    equal(visible, true);
                }
            }), elementStub({
                toggleHighlight: function(visible) {
                    equal(visible, true);
                }
            })]);
        });

        test("hide toggles highlight on currently highlighted elements", 2, function() {
            var stub = elementStub({
                toggleHighlight: function () {}
            });
            highlight.show([stub, stub]);
            stub.toggleHighlight = function(visible) {
                equal(visible, false);
            };
            highlight.hide();
        });

        test("Does not toggle highlight if element does not have toggleHighlight method", function() {
            highlight.show([{}, {}]);
            ok(true);
        });

        test("Does not toggle highlight if element does not have highlight", 0, function() {
            var stub = elementStub({
                _hasHighlight: false,
                toggleHighlight: function() {
                    ok(false);
                }
            });
            highlight.show([stub, stub]);
        });

        // ------------------------------------------------------------
        module("Highlight / toggle handler", {
            setup: createHighlight
        });

        test("show toggles toggle handler", 1, function() {
            highlight.show(elementStub({
                toggleHighlight: $.noop,
                options: {
                    highlight: {
                        toggle: function(e) {
                            equal(e.show, true);
                        }
                    }
                }
            }));
        });

        test("hide toggles the toggle handler", 2, function() {
            var shouldShow = true;
            var stub = elementStub({
                toggleHighlight: $.noop,
                options: {
                    highlight: {
                        toggle: function(e) {
                            equal(e.show, shouldShow);
                        }
                    }
                }
            });
            highlight.show(stub);
            shouldShow = false;
            highlight.hide();
        });

        test("show toggles the default highlight if the toggle handler does not prevent the default action", 1, function() {
            highlight.show(elementStub({
                toggleHighlight: function(show) {
                    equal(show, true);
                },
                options: {
                    highlight: {
                        toggle: $.noop
                    }
                }
            }));
        });

        test("show does toggle the default highlight if the toggle handler prevents the default action", 0, function() {
            highlight.show(elementStub({
                toggleHighlight: function(show) {
                    ok(false);
                },
                options: {
                    highlight: {
                        toggle: function(e) {
                            e.preventDefault();
                        }
                    }
                }
            }));
        });

        test("hide toggles the default highlight if toggle handler does not prevent the default action", 0, function() {
            var hide = false;
            var stub = elementStub({
                toggleHighlight: function() {
                    if (hide) {
                        ok(false);
                    }
                },
                options: {
                    highlight: {
                        toggle: $.noop,
                    }
                }
            });
            hide = true;
            highlight.hide();
        });

        test("Does not toggle highlight if element does not have highlight", 0, function() {
            highlight.show(elementStub({
                _hasHighlight: false,
                toggleHighlight: function() {
                    ok(false);
                }
            }));
        });

        test("show and hide pass point dataItem, category, series, value and highlight visual as arguments", 10, function() {
            var stub = elementStub({
                dataItem: "bar",
                category: "baz",
                series: "qux",
                value: "norf",
                toggleHighlight: $.noop,
                options: {
                    highlight: {
                        toggle: function(e) {
                            equal(e.visual, "foo");
                            equal(e.dataItem, "bar");
                            equal(e.category, "baz");
                            equal(e.series, "qux");
                            equal(e.value, "norf");
                        }
                    }
                }
            });
            highlight.show(stub);
            highlight.show();
        });

    })();

})();
