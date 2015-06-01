(function(){
    var context = window.parent,
        kendo = window.kendo,
        constant = function(property, target, values){
            return {
                target: target,
                property: property,
                values: values
            };
        },
        gradientConstant = function(target) {
            return {
                property: "background-image",
                editor: "ktb-gradient",
                infer: function() {
                    var background = cssPropertyFrom(target.slice(1), "background-image"),
                        match = /linear-gradient\((.*)\)$/i.exec(background);

                    return match ? match[1] : "none";
                }
            };
        },
        toProtocolRelative = function(url) {
            return url.replace(/^http(s?):\/\//i, "//");
        },
        cdnRoot = (function() {
            var scripts = document.getElementsByTagName("script"),
                script, path, i;

            for (i = 0; i < scripts.length; i++) {
                script = scripts[i];

                if (script.src.indexOf("kendo.all.min") > 0) {
                    break;
                }
            }

            path = script.src.split('?')[0];

            return toProtocolRelative(path.split("/").slice(0,-2).join("/") + "/");
        })(),
        BGCOLOR = "background-color",
        BORDERCOLOR = "border-color",
        COLOR = "color",
        cssPropertyFrom = function(cssClass, property) {
            var dummy = $("<div class='" + cssClass + "' />"), result;

            dummy.css("display", "none").appendTo(context.document.body);

            result = dummy.css(property);

            dummy.remove();

            return result;
        },
        webConstants = {
            "@image-folder": {
                readonly: true,
                infer: function() {
                    var result = cssPropertyFrom("k-icon", "background-image")
                            .replace(/url\(["']?(.*?)\/sprite\.png["']?\)$/i, "\"$1\""),
                        cdnRootRe = /cdn\.kendostatic\.com/i;

                    result = result.replace(cdnRootRe, "da7xgjtj801h2.cloudfront.net");

                    return toProtocolRelative(result);
                }
            },

            "@fallback-texture":                { readonly: true, value: "none" },

            "@texture":                         {
                property: "background-image",
                target: ".k-header",
                values: [ { text: "flat", value: "none" } ].concat(
                    [
                        "highlight", "glass", "brushed-metal", "noise",
                        "dots1", "dots2", "dots3", "dots4", "dots5",
                        "dots6", "dots7", "dots8", "dots9", "dots10",
                        "dots11", "dots12", "dots13", "leather1", "leather2",
                        "stripe1", "stripe2", "stripe3", "stripe4", "stripe5", "stripe6"
                    ].map(function(x) {
                        return { text: x, value: "url('" + cdnRoot + "styles/textures/" + x + ".png')" };
                    }
                )),
                infer: function() {
                    var background = cssPropertyFrom("k-header", "background-image"),
                        match = /^(.*),\s*[\-\w]*linear-gradient\(/i.exec(background);

                    return match ? match[1] : "none";
                }
            },

            "@theme-type": {
                editor: "ktb-combo",
                type: "file-import",
                values: [
                    { text: "Bootstrap", value: "type-bootstrap.less" },
                    { text: "Default", value: "type-default.less" },
                    { text: "Fiori", value: "type-fiori.less" },
                    { text: "Flat", value: "type-flat.less" },
                    { text: "High Contrast", value: "type-highcontrast.less" },
                    { text: "Material", value: "type-material.less" },
                    { text: "Metro", value: "type-metro.less" },
                    { text: "Office 365", value: "type-office365.less" }
                ],
                infer: function() {
                    return "type-bootstrap.less";
                }
            },

            "@accent":              constant(COLOR, "a.k-link"),
            "@base":                constant(BGCOLOR, ".k-button.k-state-active"),
            "@background":          constant(BGCOLOR, ".k-widget"),

            "@border-radius":       constant("border-radius", ".k-button"),

            "@normal-background":   constant(BGCOLOR, ".k-widget"),
            "@normal-gradient":     gradientConstant(".k-header"),
            "@normal-text-color":   constant(COLOR, ".k-widget"),

            "@hover-background":    constant(BGCOLOR, ".k-state-hover"),
            "@hover-gradient":      gradientConstant(".k-state-hover"),
            "@hover-text-color":    constant(COLOR, ".k-state-hover"),

            "@selected-background": constant(BGCOLOR, ".k-state-selected"),
            "@selected-gradient":   gradientConstant(".k-state-selected"),
            "@selected-text-color": constant(COLOR, ".k-state-selected"),

            "@error":               constant(BGCOLOR, ".k-widget.k-notification.k-notification-error"),
            "@warning":             constant(BGCOLOR, ".k-widget.k-notification.k-notification-warning"),
            "@success":             constant(BGCOLOR, ".k-widget.k-notification.k-notification-success"),
            "@info":                constant(BGCOLOR, ".k-widget.k-notification.k-notification-info")
        },
        datavizConstants = {
            "chart.title.color":                          constant(COLOR),
            "chart.legend.labels.color":                  constant(COLOR),
            "chart.chartArea.background":                 constant(COLOR),
            "chart.seriesDefaults.labels.color":          constant(COLOR),
            "chart.axisDefaults.line.color":              constant(COLOR),
            "chart.axisDefaults.labels.color":            constant(COLOR),
            "chart.axisDefaults.minorGridLines.color":    constant(COLOR),
            "chart.axisDefaults.majorGridLines.color":    constant(COLOR),
            "chart.axisDefaults.title.color":             constant(COLOR),
            "chart.seriesColors[0]":                      constant(COLOR),
            "chart.seriesColors[1]":                      constant(COLOR),
            "chart.seriesColors[2]":                      constant(COLOR),
            "chart.seriesColors[3]":                      constant(COLOR),
            "chart.seriesColors[4]":                      constant(COLOR),
            "chart.seriesColors[5]":                      constant(COLOR),
            "chart.tooltip.background":                   constant(COLOR),
            "chart.tooltip.color":                        constant(COLOR),
            "chart.tooltip.opacity":                      constant("opacity"),
            "gauge.pointer.color":                        constant(COLOR),
            "gauge.scale.rangePlaceholderColor":          constant(COLOR),
            "gauge.scale.labels.color":                   constant(COLOR),
            "gauge.scale.minorTicks.color":               constant(COLOR),
            "gauge.scale.majorTicks.color":               constant(COLOR),
            "gauge.scale.line.color":                     constant(COLOR)
        },
        webConstantsHierarchy = {
            "Widgets": {
                "@theme-type":          "Theme type",
                "@accent":              "Accent color",
                "@base":                "Widget base",
                "@background":          "Widget background",
                "@border-radius":       "Border radius",
                "@normal-background":   "Normal background",
                "@normal-text-color":   "Normal text",
                "@normal-gradient":     "Normal gradient",
                "@hover-background":    "Hovered background",
                "@hover-text-color":    "Hovered text",
                "@hover-gradient":      "Hovered gradient ",
                "@selected-background": "Selected background",
                "@selected-text-color": "Selected text",
                "@selected-gradient":   "Selected gradient",
                "@error":               "Error",
                "@warning":             "Warning",
                "@success":             "Success",
                "@info":                "Info",
                "@texture":             "Texture"
            }
        },
        datavizConstantsHierarchy = {
            "Title, legend & charting area": {
                "chart.title.color":                       "Title color",
                "chart.legend.labels.color":               "Legend text color",
                "chart.chartArea.background":              "Charting area"
            },

            "Axes": {
                "chart.seriesDefaults.labels.color":       "Series text color",
                "chart.axisDefaults.line.color":           "Axis line color",
                "chart.axisDefaults.labels.color":         "Axis labels color",
                "chart.axisDefaults.minorGridLines.color": "Minor grid lines color",
                "chart.axisDefaults.majorGridLines.color": "Major grid lines color",
                "chart.axisDefaults.title.color":          "Axis title color"
            },

            "Tooltip": {
                "chart.tooltip.background":                "Tooltip background",
                "chart.tooltip.color":                     "Tooltip text",
                "chart.tooltip.opacity":                   "Tooltip opacity"
            },

            "Series colors": {
                "chart.seriesColors[0]":                   "Color #1",
                "chart.seriesColors[1]":                   "Color #2",
                "chart.seriesColors[2]":                   "Color #3",
                "chart.seriesColors[3]":                   "Color #4",
                "chart.seriesColors[4]":                   "Color #5",
                "chart.seriesColors[5]":                   "Color #6"
            },

            "Gauge": {
                "gauge.pointer.color":                     "Pointer color",
                "gauge.scale.rangePlaceholderColor":       "Range placeholder color",
                "gauge.scale.labels.color":                "Scale labels text color",
                "gauge.scale.minorTicks.color":            "Minor ticks color",
                "gauge.scale.majorTicks.color":            "Major ticks color",
                "gauge.scale.line.color":                  "Scale line color"
            }
        };

    window.themeBuilder = new kendo.ThemeBuilder({
        webConstants: new kendo.LessTheme({
            constants: webConstants
        }),
        datavizConstants: new kendo.JsonConstants({
            constants: datavizConstants
        }),
        webConstantsHierarchy: webConstantsHierarchy,
        datavizConstantsHierarchy: datavizConstantsHierarchy
    });

    if (typeof context.kendoThemeBuilder != "undefined") {
        context.kendoThemeBuilder.open();
    }
})();
