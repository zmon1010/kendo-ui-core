(function() {
    var util = kendo.drawing.util;

    // ------------------------------------------------------------
    var metrics;

    function measure(text, style, box) {
        return metrics.measure(text, style, box);
    }

    module("Text Metrics", {
        setup: function() {
            metrics = new util.TextMetrics();
        }
    });

    test("width varies on text length", function() {
        ok(measure("Foo").width > measure("Fo").width);
    });

    test("empty text measures as 0", function() {
        equal(measure("").width, 0);
    });

    test("width varies with font size", function() {
        ok(measure("Foo", { font: "12px Arial" }).width >
           measure("Foo", { font: "10px Arial" }).width);
    });

    test("height varies with font size", function() {
        ok(measure("Foo", { font: "12px Arial" }).height >
           measure("Foo", { font: "10px Arial" }).height);
    });

    test("height doesn't vary on text length", function() {
        equal(measure("Foo").height, measure("Foooo").height);
    });

    test("baseline varies with font size", function() {
        ok(measure("Foo", { font: "12px Arial" }).baseline >
           measure("Foo", { font: "10px Arial" }).baseline);
    });

    test("baseline doesn't vary on text length", function() {
        equal(measure("Foo").baseline, measure("Foooo").baseline);
    });

    test("measureText alias is exported", function() {
        ok(util.measureText("Foo"));
    });

    var measureBox = $('<div style="position: absolute !important; top: -4000px !important; height: auto !important;' +
                        'padding: 0 !important; margin: 0 !important; border: 0 !important;' +
                        'line-height: normal !important; visibility: hidden !important;' +
                        'white-space: normal !important; word-break: break-all !important;" />'
                     )[0];

    test("height varies with element styles (width, text-wrap, word-break)", function() {
        ok(measure("FooBarBazFooBarBaz", { width: "20px" }, measureBox).height>
           measure("FooBarBazFooBarBaz", { width: "80px" }, measureBox).height);
    });

    // ------------------------------------------------------------
    var lru;

    module("Text Metrics / LRUCache", {
        setup: function() {
            lru = new util.LRUCache(4);
            lru.put("a", 1);
            lru.put("b", 2);
            lru.put("c", 3);
        }
    });

    test("put sets head", function() {
        deepEqual(lru._head.value, 1);
    });

    test("put sets tail", function() {
        deepEqual(lru._tail.value, 3);
    });

    test("put sets newer ref", function() {
        equal(lru._head.newer.value, 2);
    });

    test("put sets older ref", function() {
        equal(lru._tail.older.value, 2);
    });

    test("put does not clean last element if within size", function() {
        lru.put("d", 4);
        equal(lru._head.value, 1);
    });

    test("put cleans last element if exceeding size", function() {
        lru.put("d", 4);
        lru.put("e", 5);
        equal(lru._head.value, 2);
        deepEqual(lru._head.older, null);
        deepEqual(lru._map["a"], null);
    });

    test("get retrieves value by key", function() {
        equal(lru.get("a"), 1);
    });

    test("get retrieves single value", function() {
        lru = new util.LRUCache(1);
        lru.put("a", 1);
        equal(lru.get("a"), 1);
    });

    test("get moves head to tail", function() {
        equal(lru.get("a"), 1);
        equal(lru._tail.value, 1);
    });

    test("get patches head reference", function() {
        equal(lru.get("a"), 1);
        equal(lru._head.value, 2);
        equal(lru._head.older, null);
    });

    test("get moves middle to tail", function() {
        equal(lru.get("b"), 2);
        equal(lru._tail.value, 2);
    });

    test("get patches middle references", function() {
        equal(lru.get("b"), 2);
        deepEqual(lru._head.newer.older, lru._head);
    });

    test("get keeps tail in place", function() {
        equal(lru.get("c"), 3);
        equal(lru._tail.value, 3);
    });
})();
