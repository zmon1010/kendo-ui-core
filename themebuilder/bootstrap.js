/*jshint scripturl: true */ // bootstrapper file for Kendo ThemeBuilder
(function() {
    var settings = window.kendoThemeBuilderSettings,
        doc = document,
        applicationRoot = (function() {
            var scripts = document.getElementsByTagName("script"),
                path = scripts[scripts.length-1].src.split('?')[0];

            return path.split("/").slice(0,-1).join("/") + "/";
        })(),
        FAST = "fast",
        // caution: variables below are updated during builds.
        // update build/theme_builder.rb if you change their names or values!
        KENDO_LOCATION = "http://kendo.cdn.telerik.com/2015.3.930/",
        JQUERY_LOCATION = "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js",
        LESSJS_LOCATION = "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.5.3/less.min.js",
        requiredJs = [ "scripts/less.js", "scripts/themebuilder.js", "scripts/constants.js", "scripts/less/type-default.js", "scripts/less/type-bootstrap.js", "scripts/less/type-flat.js", "scripts/less/type-fiori.js", "scripts/less/type-highcontrast.js", "scripts/less/type-material.js", "scripts/less/type-office365.js", "scripts/less/type-metro.js", "scripts/less/common-mixins.js", "scripts/less/themes-type.js", "scripts/less/themes-spreadsheet.js","scripts/less/themes-checkbox.js",  "scripts/less/themes-radiobutton.js", "scripts/less/common-spreadsheet.js", "scripts/less/type-nova.js" ],
        requiredCss = ["styles/styles.css"],
        bootstrapCss = "styles/bootstrap.css",
        // </generated variables>
        theme = settings && settings.theme || "black",
        JSZIP_LOCATION = KENDO_LOCATION + "js/jszip.min.js",
        KENDO_COMMON_CSS_LOCATION = KENDO_LOCATION + "styles/kendo.common-material.min.css",
        KENDO_THEME_CSS_LOCATION = KENDO_LOCATION + "styles/kendo." + theme + ".min.css",
        KENDO_ALL_LOCATION = KENDO_LOCATION + "js/kendo.all.min.js";

    (function(opt){
        if (opt) {
            if (opt.JQUERY_LOCATION) {
                // /**/ is to prevent the build script from modifying this one
                JQUERY_LOCATION /**/ = opt.JQUERY_LOCATION;
            }
            opt = opt.KENDO;
            if (opt) {
                KENDO_COMMON_CSS_LOCATION = opt.css_common;
                KENDO_THEME_CSS_LOCATION = opt.css_black;
                KENDO_ALL_LOCATION = opt.js;
            }
        }
    }(window.KENDO_THEMEBUILDER_OPTIONS));

    function ThemeBuilderInterface(options) {
        this._injectStyles();

        if (options && options.container) {
            this.container = $(options.container);
            this._createInterfaceFrame();
        }

        this.open();
    }

    ThemeBuilderInterface.prototype = {
        _injectStyles: function() {
            var bootStyles;

            bootStyles = doc.createElement("link");
            bootStyles.setAttribute("rel", "stylesheet");
            bootStyles.setAttribute("href", applicationRoot + bootstrapCss);

            doc.getElementsByTagName("head")[0].appendChild(bootStyles);
        },

        open: function() {
            if (!this.container) {
                this._injectStyles();
                this._showMessage(
                    "The Kendo UI ThemeBuilder bookmarklet is not available at this time.<br>" +
                    "Head to the <a href='http://demos.telerik.com/kendo-ui/beta/themebuilder'>ThemeBuilder web app</a> to modify themes."
                );
            }
        },

        close: function() {
            jQuery(this.container).animate({ height: 0 }, FAST).fadeOut(FAST);
        },

        _instance: function() {
            return this.iframe.themeBuilder;
        },

        reload: function() {
            this._instance().infer(document);
        },

        download: function() {
            this._instance().download();
        },

        _createInterfaceFrame: function () {
            var iframe = jQuery('<iframe />', {
                    id: "ktb-interface",
                    src: 'javascript:"<html></html>"',
                    frameBorder: '0'
                }).appendTo(this.container || document.body)[0],
                wnd = iframe.contentWindow || iframe,
                doc = wnd.document || iframe.contentDocument,
                map = jQuery.map;

            function stylesheet(url) {
                return "<link rel='stylesheet' href='" + url + "' />";
            }

            function script(url) {
                 return "<script src='" + url + "'></script>";
            }

            doc.open();
            doc.write([
                "<!DOCTYPE html><html><head><meta charset='utf-8' />",
                 stylesheet(KENDO_COMMON_CSS_LOCATION),
                 stylesheet(KENDO_THEME_CSS_LOCATION),
                 map(requiredCss, function(styleSheetName) {
                     return stylesheet(applicationRoot + styleSheetName);
                 }).join(""),
                 "</head><body>",
                 script(JQUERY_LOCATION),
                 script(LESSJS_LOCATION),
                 script(JSZIP_LOCATION),
                 script(KENDO_ALL_LOCATION),
                 map(requiredJs, function(scriptName) {
                     return script(applicationRoot + scriptName);
                 }).join(""),
                 "</body></html>"
            ].join(""));

            doc.close();

            this.iframe = wnd;
        },

        _showMessage: function (message) {
            var messageId = "ktb-message";
            var messageWrap;

            if (!doc.getElementById(messageId)) {
                messageWrap = doc.createElement("div");
                messageWrap.id = messageId;
                messageWrap.innerHTML =
                    "<p>" + message + "</p>" +
                    "<p><button type='button' onclick='" +
                        "var msg = document.getElementById(\"" + messageId + "\");" +
                        "msg.parentNode.removeChild(msg);" +
                        "return false;'>Close</button>" +
                    "</p>";

                doc.body.appendChild(messageWrap);
            }
        },

        // Shows error message on pages that we can not work with
        _initError: function() {
            this._showMessage(
                "It seems there are no Kendo widgets on this page, so the Kendo themebuilder will be of no use.<br>" +
                "Please try running it on a page with widgets."
            );
        }
    };

    window.kendo.ui.ThemeBuilderInterface = ThemeBuilderInterface;

    if (!settings || settings.autoRun !== false) {
        window.kendoThemeBuilder = new ThemeBuilderInterface();
    }
})();

