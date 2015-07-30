(function() {
    var EventListener = kendo.spreadsheet.EventListener;
    var element;
    var listener;

    module("event emitter", {
        setup: function() {
            element = $("<div>").appendTo(QUnit.fixture);
            listener = new EventListener(element);
            $.fn.pressKey = function(key, ctrl, shift, alt) {
                this.trigger({ type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt });
            };

            $.fn.triggerMouseDown = function(eventData) {
                this.trigger($.extend({ type: "mousedown" }, eventData));
            };

            $.fn.triggerMouseMove = function(eventData) {
                this.trigger($.extend({ type: "mousemove" }, eventData));
            };

            $.fn.triggerMouseUp = function(eventData) {
                this.trigger($.extend({ type: "mouseup" }, eventData));
            };
        },
        teardown: function() {
            listener.destroy();
        }
    });

    test("handles arrows", 1, function() {
        listener.on("down", function() {
            ok(true);
        });

        element.pressKey(kendo.keys.DOWN);
    });

    test("handles multiple events", 2, function() {
        listener.on(["down", "up"], function() {
            ok(true);
        });

        element.pressKey(kendo.keys.DOWN);
        element.pressKey(kendo.keys.UP);
    });

    test("recognizes control key", 1, function() {
        listener.on(["ctrl+down"], function() {
            ok(true);
        });

        element.pressKey(kendo.keys.DOWN, true);
    });

    test("recognizes shift key", 1, function() {
        listener.on(["shift+down"], function() {
            ok(true);
        });

        element.pressKey(kendo.keys.DOWN, false, true);
    });

    test("recognizes shift and ctrl key", 1, function() {
        listener.on(["shift+ctrl+down"], function() {
            ok(true);
        });

        element.pressKey(kendo.keys.DOWN, true, true);
    });

    test("recognizes mousedown", 1, function() {
        listener.on("mousedown", function() {
            ok(true);
        });

        element.trigger({ type: "mousedown" });
    });

    test("recognizes *", 2, function() {
        listener.on(["*+down"], function() {
            ok(true);
        });

        element.pressKey(kendo.keys.DOWN, false, true);
        element.pressKey(kendo.keys.DOWN, false, false);
    });

    test("handles mouse drags", 1, function() {
        listener.on("mousedrag", function() {
            ok(true);
        });

        element.triggerMouseDown();
        element.triggerMouseMove();
        element.triggerMouseUp();
    });
})();
