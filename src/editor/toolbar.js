(function(f, define){
    define([ "./formatting" ], f);
})(function(){

(function($,undefined) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var editorNS = ui.editor;
    var Widget = ui.Widget;
    var extend = $.extend;
    var proxy = $.proxy;
    var keys = kendo.keys;
    var NS = ".kendoEditor";
    var EditorUtils = kendo.ui.editor.EditorUtils;
    var ToolTemplate = kendo.ui.editor.ToolTemplate;
    var Tool = kendo.ui.editor.Tool;

    var focusable = "a.k-tool:not(.k-state-disabled)," +
                    ".k-widget.k-colorpicker,.k-selectbox,.k-dropdown,.k-combobox .k-input";

    var OverflowAnchor = Tool.extend({
        initialize: function(ui, options) {
            ui.attr({ unselectable: "on" });
            ui.on("click", function() {
                debugger;
            });
        },

        options: {
            name: "overflowAnchor",
        },

        command: $.noop,
        destroy: $.noop

    });

    EditorUtils.registerTool("overflowAnchor", new OverflowAnchor({
        key: "",
        ctrl: true,
        template: new ToolTemplate({ template: EditorUtils.overflowAnchorTemplate })
    }));

    var Toolbar = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = extend({}, options, { name: "EditorToolbar" });

            Widget.fn.init.call(that, element, options);

            if (options.popup) {
                that._initPopup();
            }

            if (options.resizable && options.resizable.toolbar) {
                that._resizeHandler = kendo.onResize(function() {
                    that.resize();
                });

                that.element.addClass("k-toolbar-resizable");
            }
        },

        events: [
            "execute"
        ],

        groups: {
            basic: ["bold", "italic", "underline", "strikethrough"],
            scripts: ["subscript", "superscript" ],
            alignment: ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull" ],
            links: ["insertImage", "insertFile", "createLink", "unlink"],
            lists: ["insertUnorderedList", "insertOrderedList", "indent", "outdent"],
            tables: [ "createTable", "addColumnLeft", "addColumnRight", "addRowAbove", "addRowBelow", "deleteRow", "deleteColumn" ],
            advanced: [ "viewHtml", "cleanFormatting", "print", "pdf" ],
            fonts: [ "fontName", "fontSize" ],
            colors: [ "foreColor", "backColor" ]
        },

        overflowFlaseTools: [ "formatting", "createTable", "addColumnLeft", "addColumnRight", "addRowAbove", "addRowBelow", "deleteRow", "deleteColumn", "fontName", "fontSize", "foreColor", "backColor" ],

        _initPopup: function() {
            this.window = $(this.element)
                .wrap("<div class='editorToolbarWindow k-header' />")
                .parent()
                .prepend("<button class='k-button k-button-bare k-editortoolbar-dragHandle'><span class='k-icon k-i-move' /></button>")
                .kendoWindow({
                    title: false,
                    resizable: false,
                    draggable: {
                        dragHandle: ".k-editortoolbar-dragHandle"
                    },
                    animation: {
                        open: { effects: "fade:in" },
                        close: { effects: "fade:out" }
                    },
                    minHeight: 42,
                    visible: false,
                    autoFocus: false,
                    actions: [],
                    dragend: function() {
                        this._moved = true;
                    }
                })
                .on("mousedown", function(e){
                    if (!$(e.target).is(".k-icon")) {
                        e.preventDefault();
                    }
                })
                .data("kendoWindow");
        },

        _initOverflowPopup: function(ui) {
            var popupTemplate = "<ul class='k-overflow-popup'></ul>";

            this.overflowPopup = $(popupTemplate).appendTo("body").kendoPopup({
                anchor: ui,
                copyAnchorStyles: false,
                open: function(e) {
                    if (this.element.is(":empty")) {
                        e.preventDefault();
                    }
                }
            }).data("kendoPopup");
        },

        items: function() {
            var isResizable = this.options.resizable && this.options.resizable.toolbar,
                popup, result;

            result = this.element.children().find("> *, select");

            if (isResizable) {
                popup = this.overflowPopup;
                result = result.add(popup.element.children().find("> *"));
            }

            return result;
        },

        focused: function() {
            return this.element.find(".k-state-focused").length > 0;
        },

        toolById: function(name) {
            var id, tools = this.tools;

            for (id in tools) {
                if (id.toLowerCase() == name) {
                    return tools[id];
                }
            }
        },

        toolGroupFor: function(toolName) {
            var i, groups = this.groups;

            if (this.isCustomTool(toolName)) {
                return "custom";
            }

            for (i in groups) {
                if ($.inArray(toolName, groups[i]) >= 0) {
                    return i;
                }
            }
        },

        bindTo: function(editor) {
            var that = this,
                window = that.window;

            // detach from editor that was previously listened to
            if (that._editor) {
                that._editor.unbind("select", proxy(that.refreshTools, that));
            }

            that._editor = editor;

            if (that.options.resizable && that.options.resizable.toolbar) {
                editor.options.tools.unshift("overflowAnchor");
            }

            // re-initialize the tools
            that.tools = that.expandTools(editor.options.tools);
            that.render();

            that.element.find(".k-combobox .k-input").keydown(function(e) {
                var combobox = $(this).closest(".k-combobox").data("kendoComboBox"),
                    key = e.keyCode;

                if (key == keys.RIGHT || key == keys.LEFT) {
                    combobox.close();
                } else if (key == keys.DOWN) {
                    if (!combobox.dropDown.isOpened()) {
                        e.stopImmediatePropagation();
                        combobox.open();
                    }
                }
            });

            that._attachEvents();

            that.items().each(function initializeTool(x, y) {
                var toolName = that._toolName(this),
                    tool = that.tools[toolName],
                    options = tool && tool.options,
                    messages = editor.options.messages,
                    description = options && options.tooltip || messages[toolName],
                    ui = $(this);

                if (!tool || !tool.initialize) {
                    return;
                }

                if (toolName == "fontSize" || toolName == "fontName") {
                    var inheritText = messages[toolName + "Inherit"];

                    ui.find("input").val(inheritText).end()
                      .find("span.k-input").text(inheritText).end();
                }

                tool.initialize(ui, {
                    title: that._appendShortcutSequence(description, tool),
                    editor: that._editor
                });

                ui.closest(".k-widget", that.element).addClass("k-editor-widget");

                ui.closest(".k-colorpicker", that.element).next(".k-colorpicker").addClass("k-editor-widget");
            });

            editor.bind("select", proxy(that.refreshTools, that));

            that.update();

            if (window) {
                window.wrapper.css({top: "", left: "", width: ""});
            }
        },

        show: function() {
            var that = this,
                window = that.window,
                editorOptions = that.options.editor,
                wrapper, editorElement, editorOffset;

            if (window) {
                wrapper = window.wrapper;
                editorElement = editorOptions.element;

                if (!wrapper.is(":visible") || !that.window.options.visible) {

                    if (!wrapper[0].style.width) {
                        wrapper.width(editorElement.outerWidth() - parseInt(wrapper.css("border-left-width"), 10) - parseInt(wrapper.css("border-right-width"), 10));
                    }

                    // track content position when other parts of page change
                    if (!window._moved) {
                        editorOffset = editorElement.offset();
                        wrapper.css({
                            top: Math.max(0, parseInt(editorOffset.top, 10) - wrapper.outerHeight() - parseInt(that.window.element.css("padding-bottom"), 10)),
                            left: Math.max(0, parseInt(editorOffset.left, 10))
                        });
                    }

                    window.open();
                }
            }
        },

        hide: function() {
            if (this.window) {
                this.window.close();
            }
        },

        focus: function() {
            var TABINDEX = "tabIndex";
            var element = this.element;
            var tabIndex = this._editor.element.attr(TABINDEX);

            // Chrome can't focus something which has already been focused
            element.attr(TABINDEX, tabIndex || 0).focus()
                .find(focusable).first().focus();

            if (!tabIndex && tabIndex !== 0) {
                element.removeAttr(TABINDEX);
            }
        },

        _appendShortcutSequence: function(localizedText, tool) {
            if (!tool.key) {
                return localizedText;
            }

            var res = localizedText + " (";

            if (tool.ctrl) {
                res += "Ctrl + ";
            }

            if (tool.shift) {
                res += "Shift + ";
            }

            if (tool.alt) {
                res += "Alt + ";
            }

            res += tool.key + ")";

            return res;
        },

        _nativeTools: [
            "insertLineBreak",
            "insertParagraph",
            "redo",
            "undo"
        ],

        tools: {}, // tools collection is copied from defaultTools during initialization

        isCustomTool: function(toolName) {
            return !(toolName in kendo.ui.Editor.defaultTools);
        },

        // expand the tools parameter to contain tool options objects
        expandTools: function(tools) {
            var currentTool,
                i,
                nativeTools = this._nativeTools,
                options,
                defaultTools = kendo.deepExtend({}, kendo.ui.Editor.defaultTools),
                result = {},
                name;

            for (i = 0; i < tools.length; i++) {
                currentTool = tools[i];
                name = currentTool.name;

                if ($.isPlainObject(currentTool)) {
                    if (name && defaultTools[name]) {
                        // configured tool
                        result[name] = extend({}, defaultTools[name]);
                        extend(result[name].options, currentTool);
                    } else {
                        // custom tool
                        options = extend({ cssClass: "k-i-custom", type: "button", title: "" }, currentTool);
                        if (!options.name) {
                            options.name = "custom";
                        }

                        options.cssClass = "k-" + (options.name == "custom" ? "i-custom" : options.name);

                        if (!options.template && options.type == "button") {
                            options.template = editorNS.EditorUtils.buttonTemplate;
                            options.title = options.title || options.tooltip;
                        }

                        result[name] = {
                            options: options
                        };
                    }
                } else if (defaultTools[currentTool]) {
                    // tool by name
                    result[currentTool] = defaultTools[currentTool];
                }
            }

            for (i = 0; i < nativeTools.length; i++) {
                if (!result[nativeTools[i]]) {
                    result[nativeTools[i]] = defaultTools[nativeTools[i]];
                }
            }

            return result;
        },

        render: function() {
            var that = this,
                tools = that.tools,
                options, template, toolElement,
                toolName,
                editorElement = that._editor.element,
                element = that.element.empty(),
                groupName, newGroupName,
                toolConfig = that._editor.options.tools,
                browser = kendo.support.browser,
                group, i, groupPosition = 0,
                resizable = that.options.resizable && that.options.resizable.toolbar,
                overflowFlaseTools = this.overflowFlaseTools,
                overflow;

            function stringify(template) {
                var result;

                if (template.getHtml) {
                    result = template.getHtml();
                } else {
                    if (!$.isFunction(template)) {
                        template = kendo.template(template);
                    }

                    result = template(options);
                }

                return $.trim(result);
            }

            function endGroup() {
                if (group.children().length) {
                    if (resizable) {
                        group.data("position", groupPosition);
                        groupPosition++;
                    }

                    group.appendTo(element);
                }
            }

            function startGroup(toolName) {
                if (toolName !== "overflowAnchor") {
                    group = $("<li class='k-tool-group' role='presentation' />");
                    group.data("overflow", $.inArray(toolName, overflowFlaseTools) === -1 ? true : false)
                } else {
                    group = $("<li class='k-overflow-tools' />");
                }
            }

            element.empty();

            if (toolConfig.length) {
                toolName = toolConfig[0].name || toolConfig[0];
            }
            startGroup(toolName, overflowFlaseTools);

            for (i = 0; i < toolConfig.length; i++) {
                toolName = toolConfig[i].name || toolConfig[i];
                options = tools[toolName] && tools[toolName].options;

                if (!options && $.isPlainObject(toolName)) {
                    options = toolName;
                }

                template = options && options.template;

                if (toolName == "break") {
                    endGroup();
                    $("<li class='k-row-break' />").appendTo(that.element);
                    startGroup(toolName, overflowFlaseTools);
                }

                if (!template) {
                    continue;
                }

                newGroupName = that.toolGroupFor(toolName);

                if (groupName != newGroupName) {
                    endGroup();
                    startGroup(toolName, overflowFlaseTools);
                    groupName = newGroupName;
                }

                template = stringify(template);

                toolElement = $(template).appendTo(group);

                if (newGroupName == "custom") {
                    endGroup();
                    startGroup(toolName, overflowFlaseTools);
                }

                if (options.exec && toolElement.hasClass("k-tool")) {
                    toolElement.click(proxy(options.exec, editorElement[0]));
                }
            }

            endGroup();

            $(that.element).children(":has(> .k-tool)").addClass("k-button-group");

            if (that.options.popup && browser.msie && browser.version < 9) {
                that.window.wrapper.find("*").attr("unselectable", "on");
            }

            that.updateGroups();

            if (resizable) {
                that._initOverflowPopup(that.element.find(".k-overflow-anchor"));
            }

            that.angular("compile", function(){
                return { elements: that.element };
            });
        },

        updateGroups: function() {
            $(this.element).children().each(function() {
                $(this).children().filter(function(){
                    return this.style.display !== "none";
                })
                    .removeClass("k-group-end")
                    .first().addClass("k-group-start").end()
                    .last().addClass("k-group-end").end();
            });
        },

        decorateFrom: function(body) {
            this.items().filter(".k-decorated")
                .each(function() {
                    var selectBox = $(this).data("kendoSelectBox");

                    if (selectBox) {
                        selectBox.decorate(body);
                    }
                });
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            var id, tools = this.tools;

            for (id in tools) {
                if (tools[id].destroy) {
                    tools[id].destroy();
                }
            }

            if (this.window) {
                this.window.destroy();
            }

            if (this._resizeHandler) {
                kendo.unbindResize(this._resizeHandler);
            }

            if (this.overflowPopup) {
                this.overflowPopup.destroy();
            }
        },

        _attachEvents: function() {
            var that = this,
                buttons = "[role=button].k-tool",
                enabledButtons = buttons + ":not(.k-state-disabled)",
                disabledButtons = buttons + ".k-state-disabled";

            that.element
                .off(NS)
                .on("mouseenter" + NS, enabledButtons, function() { $(this).addClass("k-state-hover"); })
                .on("mouseleave" + NS, enabledButtons, function() { $(this).removeClass("k-state-hover"); })
                .on("mousedown" + NS, buttons, function(e) {
                    e.preventDefault();
                })
                .on("keydown" + NS, focusable, function(e) {
                    var current = this;
                    var focusElement,
                        keyCode = e.keyCode;

                    function move(direction, constrain) {
                        var tools = that.element.find(focusable);
                        var index = tools.index(current) + direction;

                        if (constrain) {
                            index = Math.max(0, Math.min(tools.length - 1, index));
                        }

                        return tools[index];
                    }

                    if (keyCode == keys.RIGHT || keyCode == keys.LEFT) {
                        if (!$(current).hasClass(".k-dropdown")) {
                            focusElement = move(keyCode == keys.RIGHT ? 1 : -1, true);
                        }
                    } else if (keyCode == keys.ESC) {
                        focusElement = that._editor;
                    } else if (keyCode == keys.TAB && !(e.ctrlKey || e.altKey)) {
                        // skip tabbing to disabled tools, and focus the editing area when running out of tools
                        if (e.shiftKey) {
                            focusElement = move(-1);
                        } else {
                            focusElement = move(1);

                            if (!focusElement) {
                                focusElement = that._editor;
                            }
                        }
                    }

                    if (focusElement) {
                        e.preventDefault();
                        focusElement.focus();
                    }
                })
                .on("click" + NS, enabledButtons, function(e) {
                    var button = $(this);
                    e.preventDefault();
                    e.stopPropagation();
                    button.removeClass("k-state-hover");
                    if (!button.is("[data-popup]")) {
                        that._editor.exec(that._toolName(this));
                    }
                })
                .on("click" + NS, disabledButtons, function(e) { e.preventDefault(); });

        },


        _toolName: function (element) {
            if (!element) {
                return;
            }

            var className = element.className;

            if (/k-tool\b/i.test(className)) {
                className = element.firstChild.className;
            }

            var tool = $.grep(className.split(" "), function (x) {
                return !/^k-(widget|tool|tool-icon|icon|state-hover|header|combobox|dropdown|selectbox|colorpicker)$/i.test(x);
            });

            return tool[0] ? tool[0].substring(tool[0].lastIndexOf("-") + 1) : "custom";
        },

        refreshTools: function() {
            var that = this,
                editor = that._editor,
                range = editor.getRange(),
                nodes = kendo.ui.editor.RangeUtils.textNodes(range);

            if (!nodes.length) {
                nodes = [range.startContainer];
            }

            that.items().each(function () {
                var tool = that.tools[that._toolName(this)];
                if (tool && tool.update) {
                    tool.update($(this), nodes);
                }
            });

            this.update();
        },

        update: function() {
            this.element.children().children().each(function() {
                var tool = $(this);
                tool.css("display", tool.hasClass("k-state-disabled") ? "none" : "");
            });
            this.updateGroups();
        },
        //>>>>>>>>>>>> resizable functionality

        _resize: function(e) {
            var containerWidth = e.width;
            var resizable = this.options.resizable && this.options.resizable.toolbar;
            var popup = this.overflowPopup;

            if (!resizable) {
                return;
            }

            if (popup.visible()) {
                popup.close();
            }

            this._refreshWidths();

            this._shrink(containerWidth);
            this._stretch(containerWidth);

            this.element
                .children("li.k-overflow-tools")
                .css("visibility", popup.element.is(":empty") ? "hidden" : "visible");
        },

        _refreshWidths: function() {
            this.element.children("li").each(function(idx, element) {
                var group = $(element);
                group.data("outerWidth", group.outerWidth(true));
            });
        },

        _shrink: function(width) {
            var group, visibleGroups;

            if (width < this._groupsWidth()) {
                visibleGroups = this._visibleGroups().filter(":not(.k-overflow-tools)");

                for (var i = visibleGroups.length - 1; i >= 0; i--) {
                    group = visibleGroups.eq(i);
                    if (width > this._groupsWidth()) {
                        break;
                    } else {
                        this._hideGroup(group);
                    }
                }
            }
        },

        _stretch: function(width) {
            var group, hiddenGroups;

            if (width > this._groupsWidth()) {
                hiddenGroups = this._hiddenGroups();

                for (var i = 0; i < hiddenGroups.length ; i++) {
                    group = hiddenGroups.eq(i);
                    if (width < this._groupsWidth() || !this._showGroup(group, width)) {
                        break;
                    }
                }
            }
        },

        _hiddenGroups: function() {
            var popup = this.overflowPopup;

            var hiddenGroups = this.element.children("li.k-tool-group").filter(":hidden");

            hiddenGroups = hiddenGroups.add(popup.element.children("li"));

            hiddenGroups.sort(function(a, b) {
                return ($(a).data("position") > $(b).data("position")) ? 1 : -1;
            });

            return hiddenGroups;
        },

        _visibleGroups: function() {
            return this.element.children("li.k-tool-group, li.k-overflow-tools").filter(":visible");
        },

        _groupsWidth: function() {
            var width = 0;

            this._visibleGroups().each(function() {
                width += $(this).data("outerWidth");
            });

            return Math.ceil(width);
        },

        _hideGroup: function(group) {
            if (group.data("overflow")) {
                var popup = this.overflowPopup;
                group.detach().prependTo(popup.element).addClass("k-overflow-tool-group");
            } else {
                group.hide();
            }
        },

        _showGroup: function(group, width) {
            var position, previous;

            if (group.length && width > this._groupsWidth() + group.data("outerWidth")) {
                if (group.hasClass("k-overflow-tool-group")) {
                    position = group.data("position");

                    previous = this.element.children().filter(function(idx, element) {
                        return $(element).data("position") === position - 1;
                    });

                    group.detach().insertAfter(previous).removeClass("k-overflow-tool-group");
                } else {
                    group.show();
                }

                return true;
            }

            return false;
        }

    });

$.extend(editorNS, {
    Toolbar: Toolbar
});

})(window.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
