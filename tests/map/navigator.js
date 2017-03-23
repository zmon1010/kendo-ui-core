(function() {
    var dom;

    // ------------------------------------------------------------
    module("Map / Navigator", {
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("adds css classes to wrapper", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.is(".k-widget.k-navigator.k-header.k-shadow"));
    });

    test("creates north button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(0)").is(".k-button.k-navigator-up"));
        ok(dom.find("button:eq(0) span").is(".k-icon.k-i-arrow-60-up"));
    });

    test("creates east button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(1)").is(".k-button.k-navigator-right"));
        ok(dom.find("button:eq(1) span").is(".k-icon.k-i-arrow-60-right"));
    });

    test("creates south button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(2)").is(".k-button.k-navigator-down"));
        ok(dom.find("button:eq(2) span").is(".k-icon.k-i-arrow-60-down"));
    });

    test("creates west button", function() {
        dom = $("<div>").kendoNavigator();

        ok(dom.find("button:eq(3)").is(".k-button.k-navigator-left"));
        ok(dom.find("button:eq(3) span").is(".k-icon.k-i-arrow-60-left"));
    });

    test("clicking north triggers the pan event with positive y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 1);
                equal(e.x, 0);
            }
        });

        dom.find(".k-navigator-up").trigger("click");
    });

    test("clicking south triggers the pan event with negative y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, -1);
                equal(e.x, 0);
            }
        });

        dom.find(".k-navigator-down").trigger("click");
    });

    test("clicking east triggers the pan event with positive x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, 1);
            }
        });

        dom.find(".k-navigator-right").trigger("click");
    });

    test("clicking west triggers the pan event with negative x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, -1);
            }
        });

        dom.find(".k-navigator-left").trigger("click");
    });

    test("pressing up triggers the pan event with positive y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 1);
                equal(e.x, 0);
            }
        });

        keydown(dom, kendo.keys.UP);
    });

    test("pressing down triggers the pan event with negative y argument and zero x argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, -1);
                equal(e.x, 0);
            }
        });

        keydown(dom, kendo.keys.DOWN);
    });

    test("pressing right triggers the pan event with positive x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, 1);
            }
        });

        keydown(dom, kendo.keys.RIGHT);
    });

    test("pressing left triggers the pan event with negative x argument and zero y argument", 2, function() {
        dom = $("<div>").kendoNavigator({
            pan: function(e) {
                equal(e.y, 0);
                equal(e.x, -1);
            }
        });

        keydown(dom, kendo.keys.LEFT);
    });

    test("pan event x argument is multiplied by panStep", function() {
        dom = $("<div>").kendoNavigator({
            panStep: 100,
            pan: function(e) {
                equal(e.x, 100);
            }
        });

        dom.find(".k-navigator-right").trigger("click");
    });

    test("pan event y argument is multiplied by panStep", function() {
        dom = $("<div>").kendoNavigator({
            panStep: 100,
            pan: function(e) {
                equal(e.y, 100);
            }
        });

        dom.find(".k-navigator-up").trigger("click");
    });

    test("tab index is set on navigator", function() {
        dom = $("<div>").kendoNavigator();
        equal(dom.attr("tabIndex"), 0);
    });

    test("tab index is set on parent widget", function() {
        var parent = $("<div data-role='foo'>");

        dom = $("<div>");
        dom.appendTo(parent);

        dom.kendoNavigator();

        equal(parent.attr("tabIndex"), 0);
    });

    test("keyboard events fired on parent widget are processed", function() {
        var parent = $("<div data-role='foo'>");

        dom = $("<div>");
        dom.appendTo(parent);

        dom.kendoNavigator({
            pan: function() { ok(true); }
        });

        keydown(parent, kendo.keys.UP);
    });

    test("navigation buttons have aria-label", function() {
        dom = $("<div>").kendoNavigator();

        equal(dom.find("button.k-navigator-up").attr("aria-label"), "move up");
        equal(dom.find("button.k-navigator-right").attr("aria-label"), "move right");
        equal(dom.find("button.k-navigator-down").attr("aria-label"), "move down");
        equal(dom.find("button.k-navigator-left").attr("aria-label"), "move left");
    });
})();