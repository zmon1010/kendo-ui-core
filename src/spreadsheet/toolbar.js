(function(f, define){
    define([ "../kendo.toolbar", "../kendo.colorpicker", "../kendo.combobox", "../kendo.dropdownlist", "../kendo.popup" ], f);
})(function(){

(function(kendo) {
    var $ = kendo.jQuery;

    var ToolBar = kendo.ui.ToolBar;

    var PropertyChangeCommand = kendo.spreadsheet.PropertyChangeCommand;

    var defaultTools = [
        [ "copy", "paste" ],
        [ "bold", "italic", "underline" ],
        "backgroundColor", "textColor",
        "borders",
        "fontSize", "fontFamily",
        [ "alignLeft", "alignCenter", "alignRight" ],
        [ "alignTop", "alignMiddle", "alignBottom" ],
        "textWrap",
        [ "formatCurrency", "formatPercentage", "formatDecreaseDecimal", "formatIncreaseDecimal" ],
        "format",
        "separator",
        "mergeCells"
    ];

    var toolDefaults = {
        bold:                  { type: "button", command: "PropertyChangeCommand", property: "bold",          value: true,     iconClass: "bold", togglable: true },
        italic:                { type: "button", command: "PropertyChangeCommand", property: "italic",        value: true,     iconClass: "italic", togglable: true },
        underline:             { type: "button", command: "PropertyChangeCommand", property: "underline",     value: true,     iconClass: "underline", togglable: true },
        alignLeft:             { type: "button", command: "PropertyChangeCommand", property: "textAlign",     value: "left",   iconClass: "justify-left", togglable: true },
        alignCenter:           { type: "button", command: "PropertyChangeCommand", property: "textAlign",     value: "center", iconClass: "justify-center", togglable: true },
        alignRight:            { type: "button", command: "PropertyChangeCommand", property: "textAlign",     value: "right",  iconClass: "justify-right", togglable: true },
        alignTop:              { type: "button", command: "PropertyChangeCommand", property: "verticalAlign", value: "top",    iconClass: "align-top", togglable: true },
        alignMiddle:           { type: "button", command: "PropertyChangeCommand", property: "verticalAlign", value: "middle", iconClass: "align-middle", togglable: true },
        alignBottom:           { type: "button", command: "PropertyChangeCommand", property: "verticalAlign", value: "bottom", iconClass: "align-bottom", togglable: true },
        formatCurrency:        { type: "button", command: "PropertyChangeCommand", property: "format",        value: "$?",     iconClass: "dollar" },
        formatPercentage:      { type: "button", command: "PropertyChangeCommand", property: "format",        value: "?.00%",  iconClass: "percent" },
        formatDecreaseDecimal: { type: "button", command: "AdjustDecimalsCommand",                            value: -1,       iconClass: "decrease-decimal" },
        formatIncreaseDecimal: { type: "button", command: "AdjustDecimalsCommand",                            value: +1,       iconClass: "increase-decimal" },
        format:                { type: "format",                                   property: "format",                         width: 100 },
        textWrap:              { type: "button", command: "TextWrapCommand",       property: "wrap",          value: true,     iconClass: "text-wrap", togglable: true },
        formatCells:           { type: "dialog", dialogName: "formatCells", overflow: "never" },
        backgroundColor:       { type: "colorPicker", property: "background", iconClass: "background" },
        textColor:             { type: "colorPicker", property: "color", iconClass: "text" },
        mergeCells:            { type: "splitButton", command: "MergeCellCommand", value: "cells", showText: "overflow", iconClass: "merge-cells",
                                 menuButtons: [
                                    { command: "MergeCellCommand", value: "cells",        name: "mergeCells", iconclass: "merge-cells" },
                                    { command: "MergeCellCommand", value: "horizontally", name: "mergeHorizontally", iconClass: "merge-horizontally" },
                                    { command: "MergeCellCommand", value: "vertically",   name: "mergeVertically", iconClass: "merge-vertically" },
                                    { command: "MergeCellCommand", value: "unmerge",      name: "unmerge", iconClass: "normal-layout" }
                                 ] },
        borders:               { type: "borders", iconClass: "all-borders" },
        fontFamily:            { type: "fontFamily", property: "fontFamily", width: 130, iconClass: "text" },
        fontSize:              { type: "fontSize", property: "fontSize", width: 60, iconClass: "font-size" },
        copy:                  { command: "CopyCommand", iconClass: "copy" },
        paste:                 { command: "PasteCommand", iconClass: "paste" },
        separator:             { type: "separator" }
    };

    var SpreadsheetToolBar = ToolBar.extend({
        init: function(element, options) {
            options.items = this._expandTools(options.tools || SpreadsheetToolBar.prototype.options.tools);

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
                var spriteCssClass = "k-icon k-font-icon k-i-" + options.iconClass;
                var type = options.type;
                var typeDefaults = {
                    splitButton: { spriteCssClass: spriteCssClass },
                    button: {
                        showText: "overflow"
                    },
                    colorPicker: {
                        toolIcon: spriteCssClass
                    }
                };

                var tool = $.extend({
                    name: options.name || toolName,
                    text: messages[options.name || toolName],
                    spriteCssClass: spriteCssClass,
                    attributes: {}
                }, typeDefaults[type], options);

                if (type == "splitButton") {
                    tool.menuButtons = tool.menuButtons.map(expandTool);
                }

                tool.attributes["data-tool"] = toolName;

                if (options.property) {
                    tool.attributes["data-property"] = options.property;
                }

                return tool;
            }

            return tools.reduce(function(tools, tool) {
                if ($.isArray(tool)) {
                    tools.push({ type: "buttonGroup", buttons: tool.map(expandTool) });
                } else {
                    tools.push(expandTool.call(this, tool));
                }

                return tools;
            }, []);
        },
        _click: function(e) {
            var toolName = e.target.attr("data-tool");
            var tool = toolDefaults[toolName];
            var commandType = tool.command;

            if (!commandType) {
                return;
            }

            var args = {
                property: tool.property || null,
                value: tool.value || null,
                workbook: e.sender.workbook
            };

            if (typeof args.value === "boolean") {
                args.value = e.checked ? true : null;
            }

            this.execute(new kendo.spreadsheet[commandType](args));
        },
        events: ToolBar.fn.events.concat([ "execute", "openDialog" ]),
        options: {
            name: "SpreadsheetToolBar",
            resizable: true,
            tools: defaultTools,
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
                mergeHorizontally: "Merge horizontally",
                mergeVertically: "Merge vertically",
                unmerge: "Unmerge",
                format: "Custom format...",
                formatCurrency: "Currency",
                formatPercentage: "Percentage",
                formatDecreaseDecimal: "Decrease decimal",
                formatIncreaseDecimal: "Increase decimal",
                textWrap: "Wrap text",
                fontFamily: "Font",
                fontSize: "Font size",
                borders: "Borders",
                textColor: "Text Color",
                backgroundColor: "Background"
            }
        },
        openDialog: function(popupName) {
            this.trigger("openDialog", { name: popupName });
        },
        execute: function(command) {
            this.trigger("execute", { command: command });
        },
        range: function() {
            var sheet = this.workbook().activeSheet();
            return sheet.range(sheet.activeCell());
        },
        workbook: function() {
            return this.options.workbook();
        },
        refresh: function() {
            var range = this.range();
            var tools = this._tools();

            function setToggle(tool, toggle) {
                var toolbar = tool.toolbar;
                var overflow = tool.overflow;
                var togglable = (toolbar && toolbar.options.togglable) ||
                                 (overflow && overflow.options.togglable);

                if (!togglable) {
                    return;
                }

                if (toolbar) {
                    toolbar.toggle(toggle);
                }

                if (overflow) {
                    overflow.toggle(toggle);
                }
            }

            function update(tool, value) {
                var toolbar = tool.toolbar;
                var overflow = tool.overflow;

                if (toolbar && toolbar.update) {
                    toolbar.update(value);
                }

                if (overflow && overflow.update) {
                    overflow.update(value);
                }
            }

            for (var i = 0; i < tools.length; i++) {
                var property = tools[i].property;
                var tool = tools[i].tool;
                var value = range[property]();

                if (tool.type === "button") {
                    setToggle(tool, !!value);
                } else {
                    update(tool, value);
                }
            }
        },
        _tools: function() {
            return this.element.find("[data-property]").toArray().reduce(function(tools, element) {
                element = $(element);
                var property = element.attr("data-property");

                tools.push({
                    property: property,
                    tool: this._getItem(element)
                });

                return tools;
            }.bind(this), []);
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

    var DropDownTool = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var dropDownList = $("<select />").kendoDropDownList({
                height: "auto"
            }).data("kendoDropDownList");

            this.dropDownList = dropDownList;
            this.element = dropDownList.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.attributes();
            this.addUidAttr();
            this.addOverflowAttr();

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
            var instance = e.sender;
            var value = instance.value();
            var popupName = instance.dataItem().popup;

            if (popupName) {
                this.toolbar.openDialog(popupName);
            } else {
                this.toolbar.execute(new PropertyChangeCommand({
                    property: this.options.property,
                    value: value == "null" ? null : value
                }));
            }
        },
        value: function(value) {
            if (value !== undefined) {
                this.dropDownList.value(value);
            } else {
                return this.dropDownList.value();
            }
        }
    });

    kendo.toolbar.registerComponent("dialog", kendo.toolbar.ToolBarButton.extend({
        init: function(options, toolbar) {
            kendo.toolbar.ToolBarButton.fn.init.call(this, options, toolbar);

            this._dialogName = options.dialogName;

            this.element.bind("click", this.open.bind(this))
                        .data("instance", this);
        },
        open: function() {
            this.toolbar.openDialog(this._dialogName);
        }
    }));

    var OverflowDialogButton = kendo.toolbar.OverflowButton.extend({
        init: function(options, toolbar) {
            kendo.toolbar.OverflowButton.fn.init.call(this, options, toolbar);

            this.element.children("a").append('<span class="k-sprite k-icon k-font-icon k-i-arrow-e"></span>');
            this.element.on("click", this._click.bind(this));
        },
        _click: $.noop
    });

    var ColorPicker = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var colorPicker = $("<input />").kendoColorPicker({
                palette: [ //metro palette
                    "#ffffff", "#000000", "#d6ecff", "#4e5b6f", "#7fd13b", "#ea157a", "#feb80a", "#00addc", "#738ac8", "#1ab39f",
                    "#f2f2f2", "#7f7f7f", "#a7d6ff", "#d9dde4", "#e5f5d7", "#fad0e4", "#fef0cd", "#c5f2ff", "#e2e7f4", "#c9f7f1",
                    "#d8d8d8", "#595959", "#60b5ff", "#b3bcca", "#cbecb0", "#f6a1c9", "#fee29c", "#8be6ff", "#c7d0e9", "#94efe3",
                    "#bfbfbf", "#3f3f3f", "#007dea", "#8d9baf", "#b2e389", "#f272af", "#fed46b", "#51d9ff", "#aab8de", "#5fe7d5",
                    "#a5a5a5", "#262626", "#003e75", "#3a4453", "#5ea226", "#af0f5b", "#c58c00", "#0081a5", "#425ea9", "#138677",
                    "#7f7f7f", "#0c0c0c", "#00192e", "#272d37", "#3f6c19", "#750a3d", "#835d00", "#00566e", "#2c3f71", "#0c594f"
                ],
                toolIcon: options.toolIcon,
                change: this._colorChange.bind(this)
            }).data("kendoColorPicker");

            this.colorPicker = colorPicker;
            this.element = colorPicker.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.attributes();
            this.addUidAttr();
            this.addOverflowAttr();

            this.element.attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });

            this.element.data({
                type: "colorPicker",
                colorPicker: this
            });
        },

        _colorChange: function(e) {
            this.toolbar.execute(new PropertyChangeCommand({
                property: this.options.property,
                value: e.sender.value()
            }));
        },

        update: function(value) {
            this.value(value);
        },

        value: function(value) {
            if (value !== undefined) {
                this.colorPicker.value(value);
            } else {
                return this.colorPicker.value();
            }
        }
    });

    var ColorPickerButton = OverflowDialogButton.extend({
        init: function(options, toolbar) {
            options.iconName = "text";
            OverflowDialogButton.fn.init.call(this, options, toolbar);
        },
        _click: function(e) {
            //TODO colorPicker dialog
            //this.toolbar.openDialog("formatCells");
        }
    });

    kendo.toolbar.registerComponent("colorPicker", ColorPicker, ColorPickerButton);

    var FONT_SIZES = [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
    var DEFAULT_FONT_SIZE = 12;

    var FontSize = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            var comboBox = $("<input />").kendoComboBox({
                change: this._valueChange.bind(this),
                dataSource: options.fontSizes || FONT_SIZES,
                value: DEFAULT_FONT_SIZE
            }).data("kendoComboBox");

            this.comboBox = comboBox;
            this.element = comboBox.wrapper;
            this.options = options;
            this.toolbar = toolbar;

            this.attributes();
            this.addUidAttr();
            this.addOverflowAttr();

            this.element.width(options.width).attr({
                "data-command": "PropertyChangeCommand",
                "data-property": options.property
            });

            this.element.data({
                type: "fontSize",
                fontSize: this
            });
        },

        _valueChange: function(e) {
            this.toolbar.execute(new PropertyChangeCommand({
                property: this.options.property,
                value: kendo.parseInt(e.sender.value()) + "px"
            }));
        },

        update: function(value) {
            this.value(kendo.parseInt(value) || DEFAULT_FONT_SIZE);
        },

        value: function(value) {
            if (value !== undefined) {
                this.comboBox.value(value);
            } else {
                return this.comboBox.value();
            }
        }
    });

    var FontSizeButton = OverflowDialogButton.extend({
        _click: function(e) {
            //TODO fontSize dialog
            //this.toolbar.openDialog("formatCells");
        }
    });

    kendo.toolbar.registerComponent("fontSize", FontSize, FontSizeButton);

    var FONT_FAMILIES = ["Arial", "Courier New", "Georgia", "Times New Roman", "Trebuchet MS", "Verdana"];
    var DEFAULT_FONT_FAMILY = "Arial";

    var FontFamily = DropDownTool.extend({
        init: function(options, toolbar) {
            DropDownTool.fn.init.call(this, options, toolbar);

            var ddl = this.dropDownList;
            ddl.setDataSource(options.fontFamilies || FONT_FAMILIES);
            ddl.value(DEFAULT_FONT_FAMILY);

            this.element.data({
                type: "fontFamily",
                fontFamily: this
            });
        },
        update: function(value) {
            this.value(value || DEFAULT_FONT_FAMILY);
        }
    });

    var FontFamilyButton = OverflowDialogButton.extend({
        _click: function(e) {
            //TODO fontSize dialog
            //this.toolbar.openDialog("formatCells");
        }
    });

    kendo.toolbar.registerComponent("fontFamily", FontFamily, FontFamilyButton);

    var Format = DropDownTool.extend({
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
                { format: "[h]:mm:ss", name: "Duration", sample: "168:05:00" },
                { popup: "formatCells", name: "More formats..." }
            ]);

            this.element.data({
                type: "format",
                format: this
            });
        }
    });

    var FormatButton = OverflowDialogButton.extend({
        _click: function(e) {
            this.toolbar.openDialog("formatCells");
        }
    });

    kendo.toolbar.registerComponent("format", Format, FormatButton);

    var BorderChangeTool = kendo.toolbar.Item.extend({
        init: function(options, toolbar) {
            this.element = $("<a href='#' data-command='BorderChangeCommand' class='k-button k-button-icon'>" +
                                "<span class='k-sprite k-font-icon k-icon k-i-all-borders'>" +
                                "</span><span class='k-font-icon k-icon k-i-arrow-s'></span>" +
                            "</a>");

            this.element.on("click", this.open.bind(this));

            this.options = options;
            this.toolbar = toolbar;

            this.attributes();
            this.addUidAttr();
            this.addOverflowAttr();

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
                            '<span class="k-sprite k-font-icon k-icon k-i-' + kendo.toHyphens(type) + '">' + type.replace(/([A-Z])/g, ' $1').toLowerCase() + '</span>' +
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
            this.colorPalette = $("<div />").kendoColorPalette({
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

            this.popupElement.find(".k-spreadsheet-border-style-palette").append(this.colorPalette.wrapper);
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
            this.toolbar.execute(new kendo.spreadsheet.BorderChangeCommand({
                border: this.type,
                style: { size: "1px", color: this.color }
            }));
        }
    });

    var BorderChangeButton = OverflowDialogButton.extend({
        _click: function(e) {
            //TODO fontSize dialog
            //this.toolbar.openDialog("formatCells");
        }
    });

    kendo.toolbar.registerComponent("borders", BorderChangeTool, BorderChangeButton);

    kendo.spreadsheet.ToolBar = SpreadsheetToolBar;

})(window.kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
