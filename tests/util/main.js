(function() {
    var util = kendo.util;

    module("kendo.util");

    test("now returns current time", function() {
        ok((util.now() - new Date().getTime()) < 2);
    });

})();
