(function() {

    module("Source processing for Kendo UI Dojo", {
        setup: function() {
            $.extend(dojo, {
                configuration: {
                    cdnRoot: "http://mysite.com/myversion"
                }
            });
        }
    })

    test("add base redirect tag", function() {
        var result = dojo.addBaseRedirectTag(
            "<html><head></head><body></body></html>",
            "http://kendo.com/someUrl"
        );
        ok(result.indexOf('<base href="http://kendo.com/someUrl">') !== -1);
    });

    test("fixes line ednings", function() {
        var initial = "this is some text\n and there are \n 2 new lines and \n one at the end";
        var result = dojo.fixLineEndings(initial);
        equal(result.match(/&#10/g).length, 3);
    });

    test("update scripts/styles to reference the CDN", function() {
        var initial = '<html><head><script src="/kendo.js"></script></head><body></body></html>';
        var expected = '<html><head><script src="http://mysite.com/myversion/kendo.js"></script></head><body></body></html>';
        equal(dojo.fixCDNReferences(initial), expected);
    });

    test("changes CSS reference", function() {
        var initial = '<html><head><link rel="stylesheet" href="kendo.default.min.css" /></head><body></body></html>';
        var expected = '<html><head><link rel="stylesheet" href="kendo.material.min.css" /></head><body></body></html>';
        equal(dojo.replaceTheme(initial, "material"), expected);
    });

    test("does not change CSS reference if no theme is provided", function() {
        var initial = '<html><head><link rel="stylesheet" href="kendo.default.min.css" /></head><body></body></html>';
        equal(dojo.replaceTheme(initial), initial);
    });

    test("changes all CSS references", function() {
        var initial = '<html><head><link rel="stylesheet" href="kendo.default.min.css" /><link rel="stylesheet" href="kendo.dataviz.default.min.css"></head><body></body></html>';
        var expected = '<html><head><link rel="stylesheet" href="kendo.material.min.css" /><link rel="stylesheet" href="kendo.dataviz.material.min.css"></head><body></body></html>';
        equal(dojo.replaceTheme(initial, "material"), expected);
    });

    test("changes common CSS reference", function() {
        var initial = '<html><head><link rel="stylesheet" href="kendo.common.min.css" /></head><body></body></html>';
        var expected = '<html><head><link rel="stylesheet" href="kendo.common-material.min.css" /></head><body></body></html>';
        equal(dojo.replaceCommon(initial, "common-material"), expected);
    });

    test("does not change common CSS reference if no common is provided", function() {
        var initial = '<html><head><link rel="stylesheet" href="kendo.common.min.css" /></head><body></body></html>';
        equal(dojo.replaceCommon(initial), initial);
    });
})();

