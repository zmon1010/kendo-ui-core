(function(f, define){
    define([ "../kendo.toolbar", "../kendo.colorpicker", "../kendo.combobox", "../kendo.dropdownlist", "../kendo.popup" ], f);
})(function(){

(function(kendo) {
    var ToolBar = kendo.ui.ToolBar;

    var SpreadsheetToolBar = ToolBar.extend({
        init: function(element, options) {
            ToolBar.fn.init.call(this, element, options);
            var handleClick = this._click.bind(this);

            this.bind({
                click: handleClick,
                toggle: handleClick
            });
        },
        _click: function(e) {
            var target = e.target;
            var value = null;

            if (e.checked !== false) {
                value = target.attr("data-value");
            }

            this.trigger("execute", {
                commandType: target.attr("data-command"),
                property: target.attr("data-property"),
                value: value
            });
        },
        events: ToolBar.fn.events.concat([ "execute" ]),
        options: {
            name: "SpreadsheetToolBar"
        },
        bindTo: function(spreadsheet) {
            this.spreadsheet = spreadsheet;
        },
        range: function() {
            var sheet = this.spreadsheet._sheet;

            return sheet.range(sheet.activeCell());
        },
        refresh: function() {
            var range = this.range();
            var tools = this._tools();

            function setValue(tool, value) {
                if (tool.toolbar) {
                    tool.toolbar.value(value);
                }

                if (tool.overflow) {
                    tool.overflow.value(value);
                }
            }

            function setToggle(tool, toggle) {
                var toolbar = tool.toolbar;
                var overflow = tool.overflow;
                var toggleable = (toolbar && toolbar.options.toggleable) ||
                                 (overflow && overflow.options.toggleable);

                if (!toggleable) {
                    toggle = false;
                }

                if (toolbar) {
                    toolbar.toggle(toggle);
                }

                if (overflow) {
                    overflow.toggle(toggle);
                }
            }

            for (var name in tools) {
                var tool = tools[name];
                var value = range[name]();

                if (tool instanceof Array) { //text alignment tool groups
                    for (var i = 0; i < tool.length; i++) {
                        setToggle(tool[i], tool[i].toolbar.element.attr("data-value") === value);
                    }
                } else if (tool.type === "button") {
                    setToggle(tool, !!value);
                } else if (tool.type === "colorPicker") {
                    setValue(tool, value);
                } else if (tool.type === "fontSize") {
                    setValue(tool, kendo.parseInt(value) || DEFAULT_FONT_SIZE);
                } else if (tool.type === "fontFamily") {
                    setValue(tool, value || DEFAULT_FONT_FAMILY);
                }
            }
        },
        _tools: function() {
            return this.element.find("[data-command]").toArray().reduce(function(tools, element) {
                element = $(element);
                var property = element.attr("data-property");
                var toolGroup;

                if (property) {
                    if (tools[property]) {
                        if (!(tools[property] instanceof Array)) {
                            tools[property] = new Array(tools[property]);
                        }
                        tools[property].push(this._getItem(element));
                    } else {
                        tools[property] = this._getItem(element);
                    }
                }

                return tools;
            }.bind(this), {});
        },
        destroy: function() {
            var bordersTool = this.element.find("[data-command=BorderChangeCommand]").data("borders");
            if (bordersTool) {
                bordersTool.destroy();
            }
            ToolBar.fn.destroy.call(this);
        }
    });

    kendo.spreadsheet.ToolBar = SpreadsheetToolBar;

    var colorPicker = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var colorPicker = $("<input />").kendoColorPicker({
                palette: "basic",
                toolIcon: options.toolIcon,
                change: function(e) {
                    toolbar.trigger("execute", {
                        commandType: "PropertyChangeCommand",
                        property: options.property,
                        value: this.value()
                    });
                }
            }).data("kendoColorPicker");

            this.colorPicker = colorPicker;
            this.element = colorPicker.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.element.attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });

            this.element.data({
                type: "colorPicker",
                colorPicker: this
            });
        },

        value: function(value) {
            if (value !== undefined) {
                this.colorPicker.value(value);
            } else {
                return this.colorPicker.value();
            }
        }
    });

    kendo.toolbar.registerComponent("colorPicker", colorPicker);

    var FONT_SIZES = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    var DEFAULT_FONT_SIZE = 12;

    var fontSize = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var comboBox = $("<input />").kendoComboBox({
                change: function(e) {
                    toolbar.trigger("execute", {
                        commandType: "PropertyChangeCommand",
                        property: options.property,
                        value: kendo.parseInt(this.value()) + "px"
                    });
                },
                dataSource: options.fontSizes || FONT_SIZES,
                value: DEFAULT_FONT_SIZE
            }).data("kendoComboBox");

            this.comboBox = comboBox;
            this.element = comboBox.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.element.width(options.width).attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });

            this.element.data({
                type: "fontSize",
                fontSize: this
            });
        },

        value: function(value) {
            if (value !== undefined) {
                this.comboBox.value(value);
            } else {
                return this.comboBox.value();
            }
        }
    });

    kendo.toolbar.registerComponent("fontSize", fontSize);

    var FONT_FAMILIES = ["Arial", "Courier New", "Georgia", "Times New Roman", "Trebuchet MS", "Verdana"];
    var DEFAULT_FONT_FAMILY = "Arial";

    var fontFamily = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var dropDownList = $("<select />").kendoDropDownList({
                change: function(e) {
                    toolbar.trigger("execute", {
                        commandType: "PropertyChangeCommand",
                        property: options.property,
                        value: this.value()
                    });
                },
                dataSource: options.fontFamilies || FONT_FAMILIES,
                value: DEFAULT_FONT_FAMILY
            }).data("kendoDropDownList");

            this.dropDownList = dropDownList;
            this.element = dropDownList.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.element.width(options.width).attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });

            this.element.data({
                type: "fontFamily",
                fontFamily: this
            });
        },

        value: function(value) {
            if (value !== undefined) {
                this.dropDownList.value(value);
            } else {
                return this.dropDownList.value();
            }
        }
    });

    kendo.toolbar.registerComponent("fontFamily", fontFamily);

    var borders = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            this.element = $("<a href='#' data-command='BorderChangeCommand' class='k-button k-button-icon'>" + 
                                "<span class='k-sprite k-icon k-i-all-borders'>" +
                                "</span><span class='k-icon k-i-arrow-s'></span>" +
                            "</a>");

            this.element.on("click", $.proxy(this.open, this));

            this.options = options;
            this.toolbar = toolbar;

            this._popupElement();
            this._popup();
            this._colorPicker();

            this.popupElement.on("click", ".k-spreadsheet-border-type-palette .k-button", $.proxy(this._click, this));

            this.element.data({
                type: "borders",
                borders: this
            });
        },

        open: function() {
            this.popup.toggle();
        },

        destroy: function() {
            this.popupElement.off("click");
            this.popup.destroy();
            this.popupElement.remove();
        },

        _popupElement: function() {
            var types = [
                "allBorders",
                "insideBorders",
                "insideHorizontalBorders",
                "insideVerticalBorders",
                "outsideBorders",
                "leftBorder",
                "topBorder",
                "rightBorder",
                "bottomBorder",
                "noBorders"
            ];

            var buttons = types.map(function(type) {
                return '<a href="#" data-border-type="' + type + '" class="k-button k-button-icon">' +
                            '<span class="k-sprite k-icon k-i-' + kendo.toHyphens(type) + '">' + type.replace(/([A-Z])/g, ' $1').toLowerCase() + '</span>' +
                       '</a>';
            }).join("");

            var popupElement = $("<div>", {
                "class": "k-spreadsheet-popup k-spreadsheet-border-palette",
                "html": "<div class='k-spreadsheet-border-type-palette'>" + buttons + "</div><div class='k-spreadsheet-border-style-palette'></div>"
            });

            this.popupElement = popupElement;
        },

        _popup: function() {
            var element = this.element;

            this.popup = this.popupElement.kendoPopup({
                anchor: element
            }).data("kendoPopup");
        },

        _colorPicker: function() {
            this.color = "#000";
            this.colorPicker = $("<input />").kendoColorPicker({
                palette: "basic",
                value: this.color,
                change: $.proxy(this._colorChange, this)
            }).data("kendoColorPicker");

            this.popupElement.find(".k-spreadsheet-border-style-palette").append(this.colorPicker.wrapper);
        },

        _colorChange: function(e) {
            this.color = e.value;
            if (this.type) {
                this._execute();
            }
        },

        _click: function(e) {
            this.type = $(e.currentTarget).data("borderType");
            this._execute();
        },

        _execute: function() {
            this.toolbar.trigger("execute", {
                commandType: "BorderChangeCommand",
                border: this.type,
                style: { size: "1px", color: this.color }
            });
        }
    });

    kendo.toolbar.registerComponent("borders", borders);

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
