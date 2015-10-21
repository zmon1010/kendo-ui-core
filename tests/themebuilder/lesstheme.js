(function() {
    var LessTheme = kendo.LessTheme;


    var constant = function(target, property, values) {
            return {
                target: target,
                property: property,
                values: values
            };
        },
        BGCOLOR = "background-color",
        COLOR = "color",
        extend = $.extend;

    module("themebuilder LESS themes (web)");

    function createConstants(constants) {
        return new LessTheme({
            less: {
                render: function(code, callback) {
                    callback(null, { css: "rendered css" });
                }
            },
            constants: constants
        });
    }

    function updateCssAndInfer(constants, css, document) {
        constants.updateStyleSheet(css, document);
        constants.infer(document);
    }

    test("deserialize() single variable", function() {
        var constants = createConstants({
            "@foo": constant()
        });

        constants.deserialize("@foo: #b4d455;");

        equal(constants.constants["@foo"].value, "#b4d455");
    });

    test("deserialize() multiple variables", function() {
        var constants = createConstants({
            "@foo": constant(),
            "@bar": constant()
        });

        constants.deserialize("@foo: #b4d455;\n@bar: #000;");

        equal(constants.constants["@foo"].value, "#b4d455");
        equal(constants.constants["@bar"].value, "#000");
    });

    test("deserialize() keeps constant types in tact", function() {
        var constants = createConstants({
            "@foo": extend(constant(".foo", BGCOLOR), { value: "#f11f11" })
        });

        constants.deserialize("@foo: #b4d455;");

        equal(constants.constants["@foo"].target, ".foo");
        equal(constants.constants["@foo"].property, BGCOLOR);
    });

    test("deserialize() from CSS", function() {
        var theme = createConstants({
            "@foo": constant(".foo", COLOR)
        });

        theme.deserialize(".foo { color: #cccccc; }", document);

        equal(theme.constants["@foo"].value, "#cccccc");
    });

    test("infer() infers nested className selectors", function() {
        var constants = createConstants({
            "@foo": constant(".bar .baz", "font-size")
        });

        updateCssAndInfer(constants, ".bar { font-size: 8px; }\n.bar .baz { font-size: 10px; }", document);

        equal(constants.constants["@foo"].value, "10px");
    });

    test("infer() selectors with multiple classNames", function() {
        var constants = createConstants({
            "@foo": constant(".foo.bar", "font-size")
        });

        updateCssAndInfer(constants, ".foo { font-size: 8px; }\n.foo.bar { font-size: 10px; }", document);

        equal(constants.constants["@foo"].value, "10px");
    });

    test("infer() infers nested tagName selectors", function() {
        var constants = createConstants({
            "@foo": constant("dl dt", "font-size")
        });

        updateCssAndInfer(constants, "dl { font-size: 8px; }\ndl dt { font-size: 10px; }", document);

        equal(constants.constants["@foo"].value, "10px");
    });

    test("infer() infers basic property value", function() {
        var constants = createConstants({
            "@foo": constant(".bar", "font-size")
        });

        updateCssAndInfer(constants, ".bar { font-size: 9px; }", document);

        equal(constants.constants["@foo"].value, "9px");
    });

    test("infer() infers colors correctly", function() {
        var constants = createConstants({
            "@foo": constant(".bar", "background-color")
        });

        updateCssAndInfer(constants, ".bar { background-color: #f11f11; }", document);

        equal(constants.constants["@foo"].value, "#f11f11");
    });

    test("infer() with multiple constants", function() {
        var constants = createConstants({
            "@foo": constant(".foo", "background-color"),
            "@bar": constant(".foo", "border-color")
        });

        constants.updateStyleSheet(
            ".foo { background-color: #f11f11; border-color: #f00f00; }", document
        );

        constants.infer(document);

        equal(constants.constants["@foo"].value, "#f11f11");
        equal(constants.constants["@bar"].value, "#f00f00");
    });

    test("infer() of border-radius", function() {
        var constants = createConstants({
            "@foo": constant(".foo", "border-radius")
        });

        constants.updateStyleSheet(".foo { border-radius: 3px; }", document);

        constants.infer(document);

        equal(constants.constants["@foo"].value, "3px");
    });

    test("infer() of computed constants", function() {
        var constants = createConstants({
            "@foo": {
                infer: function() {
                    return "10px";
                }
            }
        });

        updateCssAndInfer(constants, ".bar { font-size: 20px; }", document);

        equal(constants.constants["@foo"].value, "10px");
    });

    test("infer() of readonly constants with value", function() {
        var constants = createConstants({
            "@foo": {
                readonly: true,
                value: "10px"
            }
        });

        updateCssAndInfer(constants, ".bar { font-size: 20px; }", document);

        equal(constants.constants["@foo"].value, "10px");
    });

    test("infer() of selector with tagName", function() {
        var constants = createConstants({
            "@foo": constant("a.foo", "font-size")
        });

        updateCssAndInfer(constants, ".foo:link { font-size: 20px; } .foo { font-size: 10px; }", document);

        equal(constants.constants["@foo"].value, "20px");
    });

    test("source('less') returns less source", 1, function() {
        var constants = createConstants({
            "@foo": extend(constant(".bar", "background-color"), { value: "#f00" })
        });

        constants.source("less", function(source) {
            equal(source, "@foo: #f00;");
        });
    });

    test("source('less') honors file imports", function() {
        var constants = createConstants({
            "@typefile": {
                readonly: true,
                type: "file-import",
                value: "foo.less"
            }
        });

        equal(constants.serialize(), "@import \"foo.less\";");
    });
})();
