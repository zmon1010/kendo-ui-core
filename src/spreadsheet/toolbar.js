(function(f, define){
    define([ "../kendo.toolbar", "../kendo.colorpicker", "../kendo.combobox", "../kendo.dropdownlist", "../kendo.popup" ], f);
})(function(){

(function(kendo) {
    var $ = kendo.jQuery;

    var ToolBar = kendo.ui.ToolBar;

    var defaultTools = [
        [ "bold", "italic", "underline" ],
        [ "alignLeft", "alignCenter", "alignRight" ],
        [ "alignTop", "alignMiddle", "alignBottom" ],
        [ "formatCurrency", "formatPercentage", "formatDecreaseDecimal", "formatIncreaseDecimal" ],
        "format", "mergeCells", "borders",
        "fontFamily", "fontSize",
        "backgroundColor", "textColor"
    ];

    var toolDefaults = {
        bold:                  { type: "toggle", property: "bold", value: true },
        italic:                { type: "toggle", property: "italic", value: true },
        underline:             { type: "toggle", property: "underline", value: true },
        alignLeft:             { type: "toggle", property: "textAlign", value: "left", iconClass: "justify-left" },
        alignCenter:           { type: "toggle", property: "textAlign", value: "center", iconClass: "justify-center" },
        alignRight:            { type: "toggle", property: "textAlign", value: "right", iconClass: "justify-right" },
        alignTop:              { type: "toggle", property: "verticalAlign", value: "top", iconClass: "align-top" },
        alignMiddle:           { type: "toggle", property: "verticalAlign", value: "middle", iconClass: "align-middle" },
        alignBottom:           { type: "toggle", property: "verticalAlign", value: "bottom", iconClass: "align-bottom" },
        formatCurrency:        { property: "format", value: "$?" },
        formatPercentage:      { property: "format", value: "?.00%" },
        formatDecreaseDecimal: { command: "AdjustDecimalsCommand", value: -1, iconClass: "decrease-decimal" },
        formatIncreaseDecimal: { command: "AdjustDecimalsCommand", value: +1, iconClass: "increase-decimal" },
        format:                { type: "format", property: "format", width: 100, overflow: "never" },
        backgroundColor:       { type: "colorPicker", property: "background", iconClass: "background" },
        textColor:             { type: "colorPicker", property: "color", iconClass: "text" },
        mergeCells:            { type: "splitButton", command: "MergeCellCommand", value: "all", iconClass: "merge-cells",
                                 menuButtons: [
                                     "mergeAll", "mergeHorizontally", "mergeVertically", "unmerge"
                                 ] },
        borders:               { type: "borders", overflow: "never" },
        fontFamily:            { type: "fontFamily", property: "fontFamily", width: 130, overflow: "never" },
        fontSize:              { type: "fontSize", property: "fontSize", width: 60, overflow: "never" },
        mergeAll:              { iconClass: "merge-cells", command: "MergeCellCommand", value: "all" },
        mergeHorizontally:     { iconClass: "merge-cells", command: "MergeCellCommand", value: "horizontally" },
        mergeVertically:       { iconClass: "merge-cells", command: "MergeCellCommand", value: "vertically" },
        unmerge:               { iconClass: "merge-cells", command: "MergeCellCommand", value: "unmerge" }
    };

    var SpreadsheetToolBar = ToolBar.extend({
        init: function(element, options) {
            options.items = this._expandTools(options.tools || defaultTools);

            ToolBar.fn.init.call(this, element, options);
            var handleClick = this._click.bind(this);

            this.bind({
                click: handleClick,
                toggle: handleClick
            });
        },
        _expandTools: function(tools) {
            var messages = this.options.messages;

            function expandTool(toolName) {
                // expand string to object, add missing tool properties
                var options = $.isPlainObject(toolName) ? toolName : toolDefaults[toolName] || {};
                var iconClass = "k-icon k-i-" + (options.iconClass || toolName);
                var type = options.type;
                var typeDefaults = {
                    splitButton: { spriteCssClass: iconClass },
                    button: {
                        showText: "overflow"
                    },
                    toggle: {
                        togglable: true,
                        showText: "overflow"
                    },
                    colorPicker: {
                        toolIcon: iconClass,
                        overflow: "never"
                    }
                };

                var tool = $.extend({
                    name: toolName,
                    text: messages[toolName],
                    spriteCssClass: iconClass,
                    attributes: {}
                }, typeDefaults[type], options);

                if (type == "splitButton") {
                    tool.menuButtons = tool.menuButtons.map(expandTool);
                }

                if (options.command) {
                    tool.attributes["data-command"] = options.command;
                } else if (options.property) {
                    tool.attributes["data-command"] = "PropertyChangeCommand";
                    tool.attributes["data-property"] = options.property;
                }

                if (options.value) {
                    tool.attributes["data-value"] = options.value;
                }

                return tool;
            }

            return tools.reduce(function(tools, tool) {
                if ($.isArray(tool)) {
                    tools.push({ type: "buttonGroup", buttons: tool.map(expandTool) });
                } else {
                    tools.push(expandTool(tool));
                }

                return tools;
            }, []);
        },
        _click: function(e) {
            var target = e.target;
            var commandType = target.attr("data-command");
            var args = {
                commandType: commandType
            };

            if (!commandType) {
                return;
            }

            if (commandType == "PropertyChangeCommand") {
                args.value = null;
                args.property = target.attr("data-property");

                if (e.checked !== false) {
                    args.value = !!target.attr("data-value");
                }
            } else if (commandType == "AdjustDecimalsCommand") {
                args.decimals = parseInt(target.attr("data-value"), 10);
            }

            this.trigger("execute", args);
        },
        events: ToolBar.fn.events.concat([ "execute" ]),
        options: {
            name: "SpreadsheetToolBar",
            resizable: false,
            messages: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline",
                alignLeft: "Align left",
                alignCenter: "Align center",
                alignRight: "Align right",
                alignTop: "Align top",
                alignMiddle: "Align middle",
                alignBottom: "Align bottom",
                mergeCells: "Merge cells",
                mergeAll: "Merge all",
                mergeHorizontally: "Merge horizontally",
                mergeVertically: "Merge vertically",
                unmerge: "Unmerge"
            }
        },
        range: function() {
            return this.options.range();
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
                    return;
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

                if (tool instanceof Array) { // text alignment tool groups
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
            // TODO: move to ToolBar.destroy to take care of these
            this.element.find("[data-command],.k-button").each(function() {
                var element = $(this);
                var instance = element.data("instance");
                if (instance && instance.destroy) {
                    instance.destroy();
                }
            });

            ToolBar.fn.destroy.call(this);
        }
    });

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

    var DropDownTool = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var dropDownList = $("<select />").kendoDropDownList({
                height: "auto"
            }).data("kendoDropDownList");

            this.dropDownList = dropDownList;
            this.element = dropDownList.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            dropDownList.bind("open", this._open.bind(this));
            dropDownList.bind("change", this._change.bind(this));

            this.element.width(options.width).attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });
        },
        _open: function() {
            var ddl = this.dropDownList;
            var list = ddl.list;
            var listWidth;

            list.css({
                whiteSpace: "nowrap",
                width: "auto"
            });

            listWidth = list.width();

            if (listWidth) {
                listWidth += 20;
            } else {
                listWidth = ddl._listWidth;
            }

            list.css("width", listWidth + kendo.support.scrollbar());

            ddl._listWidth = listWidth;
        },
        _change: function(e) {
            var value = e.sender.value();
            this.toolbar.trigger("execute", {
                commandType: "PropertyChangeCommand",
                property: this.options.property,
                value: value == "null" ? null : value
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

    kendo.toolbar.registerComponent("fontFamily", DropDownTool.extend({
        init: function(options, toolbar) {
            DropDownTool.fn.init.call(this, options, toolbar);

            var ddl = this.dropDownList;
            ddl.setDataSource(options.fontFamilies || FONT_FAMILIES);
            ddl.value(DEFAULT_FONT_FAMILY);

            this.element.data({
                type: "fontFamily",
                fontFamily: this
            });
        }
    }));

    kendo.toolbar.registerComponent("format", DropDownTool.extend({
        _revertTitle: function(e) {
            e.sender.value("");
            e.sender.wrapper.width("auto");
        },
        init: function(options, toolbar) {
            DropDownTool.fn.init.call(this, options, toolbar);

            var ddl = this.dropDownList;
            ddl.bind("change", this._revertTitle.bind(this));
            ddl.bind("dataBound", this._revertTitle.bind(this));
            ddl.setOptions({
                dataValueField: "format",
                dataValuePrimitive: true,
                valueTemplate: "123",
                template:
                    "# if (data.sample) { #" +
                        "<span class='k-spreadsheet-sample'>#: data.sample #</span>" +
                    "# } #" +
                    "#: data.name #"
            });
            ddl.setDataSource([
                { format: null, name: "Automatic" },
                { format: "?.00", name: "Number", sample: "1,499.99" },
                { format: "?.00%", name: "Percent", sample: "14.50%" },
                { format: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)', name: "Financial", sample: "(1,000.12)" },
                { format: "$?", name: "Currency", sample: "$1,499.99" },
                { format: "m/d/yyyy", name: "Date", sample: "4/21/2012" },
                { format: "h:mm:ss AM/PM", name: "Time", sample: "5:49:00 PM" },
                { format: "m/d/yyyy h:mm", name: "Date time", sample: "4/21/2012 5:49:00" },
                { format: "[h]:mm:ss", name: "Duration", sample: "168:05:00" }
            ]);

            this.element.data({
                type: "format",
                format: this
            });
        }
    }));

    kendo.toolbar.registerComponent("dialog", kendo.toolbar.ToolBarButton.extend({
        init: function(options, toolbar) {
            kendo.toolbar.ToolBarButton.fn.init.call(this, options, toolbar);

            this._dialogName = options.dialogName;

            this.element.bind("click", this.open.bind(this))
                        .data("instance", this);
        },
        open: function() {
            kendo.spreadsheet.dialogs.open(this._dialogName, this.toolbar.range());
        }
    }));

    var BorderChangeTool = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            this.element = $("<a href='#' data-command='BorderChangeCommand' class='k-button k-button-icon'>" +
                                "<span class='k-sprite k-icon k-i-all-borders'>" +
                                "</span><span class='k-icon k-i-arrow-s'></span>" +
                            "</a>");

            this.element.on("click", this.open.bind(this));

            this.options = options;
            this.toolbar = toolbar;

            this._popupElement();
            this._popup();
            this._colorPicker();

            this.popupElement.on("click", ".k-spreadsheet-border-type-palette .k-button", this._click.bind(this));

            this.element.data({
                type: "borders",
                instance: this
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
                change: this._colorChange.bind(this)
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

    kendo.toolbar.registerComponent("borders", BorderChangeTool);

    kendo.spreadsheet.ToolBar = SpreadsheetToolBar;

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
