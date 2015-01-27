(function() {
    var barcode;
    var encodingStub;
    var dataviz = kendo.dataviz;
    var geom = kendo.geometry;
    var draw = kendo.drawing;
    var measureText = draw.util.measureText;
    var Barcode = dataviz.ui.Barcode;

    var EncodingStub = function(pattern) {
        this.encode = function(value, width, height) {
            this.value = value;
            this.width = width;
            this.height = height;
            return {
                pattern: pattern,
                baseUnit: 3
            };
        };
    };

    function createBarcode(options, encoding) {
        QUnit.fixture.html("<div id='container'></div>")

        $("#container").kendoBarcode(options);

        barcode = $("#container").data("kendoBarcode");

        if (encoding) {
            barcode.encoding = encodingStub = encoding;
            barcode.redraw();
        }
    }

    function teardown() {
        kendo.destroy(QUnit.fixture);
    }

    (function() {
        var background;

        module("rendering / background", {
            setup: function() {
                createBarcode({
                    type: "code128",
                    width: 200,
                    height: 100,
                    background: "red",
                    border: {
                        width: 2,
                        color: "blue",
                        dashType: "dot"
                    },
                    value: "FOO"
                });

                background = barcode.visual.children[0];
            },
            teardown: teardown
        });

        test("renders background", function() {
            ok(background);
        });

        test("renders background with specified width and height without half border", function() {
            sameLinePath(background, draw.Path.fromPoints([[1, 1], [199, 1], [199, 99], [1, 99]]).close());
        });

        test("sets color", function() {
            equal(background.options.fill.color, "red");
        });

        test("sets border color", function() {
            equal(background.options.stroke.color, "blue");
        });

        test("sets border width", function() {
            equal(background.options.stroke.width, 2);
        });

        test("sets border dashType", function() {
            equal(background.options.stroke.dashType, "dot");
        });

    })();

    (function() {
        var textHeight = measureText("foo", {font: SANS12}).height;
        var barHeight = 100 - 14 - (textHeight + 10);
        var bars;

        module("rendering / bars", {
            setup: function() {
                encodingStub = new EncodingStub([3, 4, {
                    width: 3
                }, {
                    width: 2,
                    y1: 5,
                    y2: 20
                }]);

                createBarcode({
                    type: "code128",
                    value: "foo",
                    width: 200,
                    height: 100,
                    color: "red",
                    padding: {
                        top: 5,
                        bottom: 5,
                        left: 10,
                        right: 10
                    },
                    border: {
                        width: 2
                    },
                    text: {
                        visible: true,
                        font: SANS12,
                        margin: 5
                    }
                }, encodingStub);

                bars = barcode._bandsGroup.children;
            },
            teardown: teardown
        });

        test("passes width without padding and border to encoding", function() {
            equal(encodingStub.width, 176);
        });

        test("passes height without padding, border and text box height to encoding", function() {
            equal(encodingStub.height, barHeight);
        });

        test("does not render white bars", 2, function() {
            for (var i = 0; i < bars.length; i++) {
                equal(bars[i].options.fill.color, "red");
            }
        });

        test("bars are rendered in content box with white bars width added to position", function() {
            var bbox = bars[0].bbox();
            equal(bbox.origin.x, 21);
            equal(bbox.size.width, 12);
        });

        test("pattern width is taken from width field if pattern is an object", function() {
            var bbox = bars[1].bbox();
            equal(bbox.origin.x, 42);
            equal(bbox.topRight().x, 48);
        });

        test("bars start vertically after padding and border", function() {
            var bbox = bars[0].bbox();
            equal(bbox.origin.y, 7);
            equal(bbox.bottomLeft().y, 7 + barHeight);
        });

        test("y1 and y2 positions are taken from pattern if pattern is an object", function() {
            var bbox = bars[1].bbox();
            equal(bbox.origin.y, 12);
            equal(bbox.bottomLeft().y, 27);
        });

    })();

    (function() {
        var textSize = measureText("foo", {font: SANS12});
        var textbox;
        var text;

        function createBarcodeWithText(options) {
            createBarcode($.extend({
                type: "code128",
                width: 200,
                height: 100,
                value: "foo",
                text: {
                    visible: true,
                    font: SANS12,
                    margin: 5,
                    color: "red"
                }
            }, options));

            textbox = barcode._textbox;
            if (textbox) {
                text = textbox.visual.children[0];
            }
        }

        module("rendering / text", {
            setup: function() {},
            teardown: teardown
        });

        test("renders text", function() {
            createBarcodeWithText();
            ok(textbox);
        });

        test("does not render text if visible is set to false", function() {
            createBarcodeWithText({
                text: {
                    visible: false
                }
            });
            ok(!textbox);
        });

        test("sets text to value", function() {
            createBarcodeWithText();
            equal(text.content(), "foo");
        });

        test("adds checksum to text if checksum is set to true and encoding has checksum", function() {
            createBarcodeWithText({
                checksum: true
            });

            equal(text.content(), "foo 54");
        });

        test("does not change text value if checksum is set to true and encoding has no checksum", function() {
            createBarcodeWithText({
                value: "FOO",
                type: "code39",
                checksum: true
            });

            equal(text.content(), "FOO");
        });

        test("sets text color", function() {
            createBarcodeWithText();
            equal(text.options.fill.color, "red");
        });

        test("sets text font", function() {
            createBarcodeWithText();
            equal(text.options.font, SANS12);
        });
    })();
})();
