(function() {
    var ThemeBuilder = kendo.ThemeBuilder,
        LessTheme = kendo.LessTheme,
        JsonConstants = kendo.JsonConstants,
        constant = function(target, property, values) {
            return {
                target: target,
                property: property,
                values: values
            };
        };

    module("themebuilder integration", {
        teardown: function() {
            kendo.destroy($("#kendo-themebuilder"));
            $("#kendo-themebuilder, head style[title='themebuilder'], .foo").remove();
        }
    });

    function updateStyleSheet(cssText, doc) {
        LessTheme.prototype.updateStyleSheet(cssText, doc);
    }

    test("updateStyleSheet() adds CSS to document", function() {
        updateStyleSheet(".foo { font-size: 8px; }", document);

        var element = $("<span class='foo' />").appendTo(document.body);

        equal(element.css("font-size"), "8px");
        equal($("style[title]").length, 1);
    });

    test("updateStyleSheet() updates existing stylesheet", function() {
        updateStyleSheet(".foo { font-size: 8px; }", document);

        updateStyleSheet("body { font-size: 10px; } .foo { color: #f00; }", document);

        var element = $("<span class='foo' />").appendTo("body");

        equal($("style[title]").length, 1);
        equal(element.css("font-size"), "10px");
    });

    test("render() renders color picker for box-shadow-color properties", function() {
        var constants = new LessTheme({
                less: { render: $.noop },
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            }),
            themeBuilder = new ThemeBuilder({
                webConstants: constants,
                webConstantsHierarchy: {
                    "Foos": {
                        "@foo-color": "foo color"
                    }
                }
            }, document);

        equal(themeBuilder.element.find("span.ktb-colorinput").length, 1);
    });

    test("value of box-shadow color picker gets processed as color", function() {

        var constants = new LessTheme({
                less: { render: $.noop },
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            });

        updateStyleSheet(".k-widget { box-shadow: 1px 1px 1px #b4d455; }", document);

        constants.infer(document);

        equal(constants.serialize(), "@foo-color: #b4d455;");
    });

    test("value of box-shadow color picker with inset shadow", function() {

        var constants = new LessTheme({
                constants: {
                    "@foo-color": constant(".k-widget", "box-shadow")
                }
            });

        updateStyleSheet(".k-widget { box-shadow: inset 1px 1px 1px #b4d455; }", document);

        constants.infer(document);

        equal(constants.serialize(), "@foo-color: #b4d455;");
    });

    test("LessTheme are inferred on init", function() {
        var constants = new LessTheme({
            less: { render: $.noop }
        });

        constants.infer = spy();

        var themebuilder = new ThemeBuilder({ webConstants: constants }, document);

        equal(constants.infer.calls, 1);
    });

    test("_propertyChange updates constant", function() {
        var color = "#b4d455",
            constants = new LessTheme({
                less: { render: $.noop },
                constants: {
                    "@foo": constant(".k-widget", "background-color")
                }
            }),
            themebuilder = new ThemeBuilder({
                webConstants: constants
            }, document);

        themebuilder._propertyChange({
            value: color,
            name: "@foo"
        });

        equal(constants.constants["@foo"].value, color);
    });

    test("changing input value triggers _propertyChange", 2, function() {
        var color = "#b4d455",
            themebuilder = new ThemeBuilder({
                webConstants: new LessTheme({
                    less: { render: $.noop },
                    constants: {
                        "@foo": constant(".k-widget", "background-color")
                    }
                }),
                webConstantsHierarchy: {
                    "Foos": {
                        "@foo": "foo color"
                    }
                }
            }, document);

        themebuilder._propertyChange = function(e) {
            equal(e.name, "@foo");
            equal(e.value, color);
        };

        var colorInput = themebuilder.element.find("[id='@foo']").data("kendoColorInput");

        colorInput.value(color);
        colorInput.trigger("change");
    });

    test("_propertyChange updates dataviz constant", function() {
        var color = "#b4d455",
            constants = new JsonConstants({
                constants: {
                    "title.color": { property: "color" }
                }
            }),
            themebuilder = new ThemeBuilder({
                datavizConstants: constants
            }, document);

        constants.applyTheme = $.noop;

        themebuilder._propertyChange({
            value: color,
            name: "title.color"
        });

        equal(constants.constants["title.color"].value, color);
    });
})();
