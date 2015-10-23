(function(f, define){
    define([ "../kendo.core", "../kendo.colorpicker", "../kendo.popup" ], f);
})(function(){

    (function(kendo) {
        if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
            return;
        }

        var $ = kendo.jQuery;
        var BORDER_TYPES = [ "allBorders", "insideBorders", "insideHorizontalBorders", "insideVerticalBorders", "outsideBorders", "leftBorder", "topBorder", "rightBorder", "bottomBorder", "noBorders" ];

        var messages = kendo.spreadsheet.messages.borderPalette = {
            allBorders: "All borders",
            insideBorders: "Inside borders",
            insideHorizontalBorders: "Inside horizontal borders",
            insideVerticalBorders: "Inside vertical borders",
            outsideBorders: "Outside borders",
            leftBorder: "Left border",
            topBorder: "Top border",
            rightBorder: "Right border",
            bottomBorder: "Bottom border",
            noBorders: "No border"
        };

        var BorderPalette = kendo.ui.Widget.extend({
            init: function(element, options) {
                kendo.ui.Widget.call(this, element, options);

                this.element = element;
                this.color = "#000";

                this.element.addClass("k-spreadsheet-border-palette");

                this._borderTypePalette();
                this._borderColorPalette();

                this.element.on("click", ".k-spreadsheet-border-type-palette .k-button", this._click.bind(this));
            },

            options: {
                name: "BorderPalette",
                messages: messages
            },

            events: [
                "change"
            ],

            _borderTypePalette: function() {
                var messages = this.options.messages;
                var buttons = BORDER_TYPES.map(function(type) {
                    return '<a title="' + messages[type] + '" href="#" data-border-type="' + type + '" class="k-button k-button-icon">' +
                                '<span class="k-sprite k-font-icon k-icon k-i-' + kendo.toHyphens(type) + '"></span>' +
                           '</a>';
                }).join("");

                var element = $("<div />", {
                    "class": "k-spreadsheet-border-type-palette",
                    "html": buttons
                });

                element.appendTo(this.element);
            },

            _borderColorPalette: function() {
                var element = $("<div />", {
                    "class": "k-spreadsheet-border-style-palette"
                });

                var colorPalette = this.colorPalette = $("<div />").kendoColorPalette({
                    palette: [ //metro palette
                        "#ffffff", "#000000", "#d6ecff", "#4e5b6f", "#7fd13b", "#ea157a", "#feb80a", "#00addc", "#738ac8", "#1ab39f",
                        "#f2f2f2", "#7f7f7f", "#a7d6ff", "#d9dde4", "#e5f5d7", "#fad0e4", "#fef0cd", "#c5f2ff", "#e2e7f4", "#c9f7f1",
                        "#d8d8d8", "#595959", "#60b5ff", "#b3bcca", "#cbecb0", "#f6a1c9", "#fee29c", "#8be6ff", "#c7d0e9", "#94efe3",
                        "#bfbfbf", "#3f3f3f", "#007dea", "#8d9baf", "#b2e389", "#f272af", "#fed46b", "#51d9ff", "#aab8de", "#5fe7d5",
                        "#a5a5a5", "#262626", "#003e75", "#3a4453", "#5ea226", "#af0f5b", "#c58c00", "#0081a5", "#425ea9", "#138677",
                        "#7f7f7f", "#0c0c0c", "#00192e", "#272d37", "#3f6c19", "#750a3d", "#835d00", "#00566e", "#2c3f71", "#0c594f"
                    ],
                    value: this.color,
                    change: this._colorChange.bind(this)
                }).data("kendoColorPalette");

                element
                    .append(colorPalette.wrapper)
                    .appendTo(this.element);
            },

            _colorChange: function(e) {
                this.color = e.value;
                if (this.type) {
                    this.trigger("change", { type: this.type, color: this.color });
                }
            },

            _click: function(e) {
                this.type = $(e.currentTarget).data("borderType");
                this.trigger("change", { type: this.type, color: this.color });
            },

            destroy: function() {
                this.colorPalette.destroy();
                this.element.off("click");
            }
        });

        kendo.spreadsheet.BorderPalette = BorderPalette;

    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
