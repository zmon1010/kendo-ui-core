(function() {
    var util = kendo.util;

    // ------------------------------------------------------------
    module("Generic Helpers");

    test("sqr returns a * a", function() {
        equal(util.sqr(2), 4);
    });

    // ------------------------------------------------------------
    module("Hashing");

    test("objectKey serializes object key/values", function() {
        equal(util.objectKey({ foo: true }), "footrue");
    });

    test("objectKey sorts keys", function() {
        equal(util.objectKey({ foo: true, bar: false }), "barfalsefootrue");
    });

    test("hashKey matches pre-computed FNV-1 hashes", function() {
        equal(util.hashKey("footrue"), 0xBFE48FAB, "Case #1");
        equal(util.hashKey("barfalse"), 0xEC55C421, "Case #2");
    });

    // ------------------------------------------------------------
    module("Template helpers");

    test("renderPos renders position class", function() {
        equal(util.renderPos("top"), "k-pos-top");
    });

    test("renderPos renders multiple position classes", function() {
        equal(util.renderPos("topLeft"), "k-pos-top k-pos-left");
    });

    test("renderPos returns empty string", function() {
        equal(util.renderPos(), "");
    });

})();
