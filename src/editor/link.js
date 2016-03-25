(function(f, define){
    define([ "./lists" ], f);
})(function(){

(function($, undefined) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    proxy = $.proxy,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    InlineFormatter = Editor.InlineFormatter,
    InlineFormatFinder = Editor.InlineFormatFinder,
    textNodes = RangeUtils.textNodes,
    registerTool = Editor.EditorUtils.registerTool;

var HTTP_PROTOCOL = "http://";
var protocolRegExp = /^\w*:\/\//;
var linkWordRegExp = /\s?([\w\/$-_.+!*'(),\ufeff]+)$/i;
var endLinkCharsRegExp = /[\w\/\$\-_\*\)]/i;

var LinkFormatFinder = Class.extend({
    findSuitable: function (sourceNode) {
        return dom.parentOfType(sourceNode, ["a"]);
    }
});

var LinkFormatter = Class.extend({
    init: function() {
        this.finder = new LinkFormatFinder();
    },

    apply: function (range, attributes) {
        var nodes = textNodes(range);
        var markers, doc, formatter, a, parent;

        if (attributes.innerHTML) {
            doc = RangeUtils.documentFromRange(range);
            markers = RangeUtils.getMarkers(range);

            range.deleteContents();
            a = dom.create(doc, "a", attributes);
            range.insertNode(a);

            parent = a.parentNode;
            if (dom.name(parent) == "a") {
                dom.insertAfter(a, parent);
            }

            if (dom.emptyNode(parent)) {
                dom.remove(parent);
            }

            // move range and markers after inserted link
            var ref = a;
            for (var i = 0; i < markers.length; i++) {
                dom.insertAfter(markers[i], ref);
                ref = markers[i];
            }

            if (markers.length) {
                dom.insertBefore(doc.createTextNode("\ufeff"), markers[1]);
                dom.insertAfter(doc.createTextNode("\ufeff"), markers[1]);
                range.setStartBefore(markers[0]);
                range.setEndAfter(markers[markers.length-1]);
            }
        } else {
            formatter = new InlineFormatter([{ tags: ["a"]}], attributes);
            formatter.finder = this.finder;
            formatter.apply(nodes);
        }
    }
});

var UnlinkCommand = Command.extend({
    init: function(options) {
        options.formatter = /** @ignore */ {
            toggle : function(range) {
                new InlineFormatter([{ tags: ["a"]}]).remove(textNodes(range));
            }
        };
        this.options = options;
        Command.fn.init.call(this, options);
    }
});

var LinkCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
        this.formatter = new LinkFormatter();

        if (!options.url) {
            this.attributes = null;
            this.async = true;
        } else {
            this.exec = function() {
                this.formatter.apply(options.range, {
                    href: options.url,
                    innerHTML: options.text || options.url,
                    target: options.target
                });
            };
        }
    },

    _dialogTemplate: function() {
        return kendo.template(
            '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container">' +
                "<div class='k-edit-label'>" +
                    "<label for='k-editor-link-url'>#: messages.linkWebAddress #</label>" +
                "</div>" +
                "<div class='k-edit-field'>" +
                    "<input type='text' class='k-input k-textbox' id='k-editor-link-url'>" +
                "</div>" +
                "<div class='k-edit-label k-editor-link-text-row'>" +
                    "<label for='k-editor-link-text'>#: messages.linkText #</label>" +
                "</div>" +
                "<div class='k-edit-field k-editor-link-text-row'>" +
                    "<input type='text' class='k-input k-textbox' id='k-editor-link-text'>" +
                "</div>" +
                "<div class='k-edit-label'>" +
                    "<label for='k-editor-link-title'>#: messages.linkToolTip #</label>" +
                "</div>" +
                "<div class='k-edit-field'>" +
                    "<input type='text' class='k-input k-textbox' id='k-editor-link-title'>" +
                "</div>" +
                "<div class='k-edit-label'></div>" +
                "<div class='k-edit-field'>" +
                    "<input type='checkbox' class='k-checkbox' id='k-editor-link-target'>" +
                    "<label for='k-editor-link-target' class='k-checkbox-label'>#: messages.linkOpenInNewWindow #</label>" +
                "</div>" +
                "<div class='k-edit-buttons k-state-default'>" +
                    '<button class="k-dialog-insert k-button k-primary">#: messages.dialogInsert #</button>' +
                    '<button class="k-dialog-close k-button">#: messages.dialogCancel #</button>' +
                "</div>" +
            "</div>"
        )({
            messages: this.editor.options.messages
        });
    },

    exec: function () {
        var messages = this.editor.options.messages;

        this._initialText = "";
        this._range = this.lockRange(true);
        var nodes = textNodes(this._range);

        var a = nodes.length ? this.formatter.finder.findSuitable(nodes[0]) : null;
        var img = nodes.length && dom.name(nodes[0]) == "img";

        var dialog = this.createDialog(this._dialogTemplate(), {
            title: messages.createLink,
            close: proxy(this._close, this),
            visible: false
        });

        if (a) {
            this._range.selectNodeContents(a);
            nodes = textNodes(this._range);
        }

        this._initialText = this.linkText(nodes);

        dialog
            .find(".k-dialog-insert").click(proxy(this._apply, this)).end()
            .find(".k-dialog-close").click(proxy(this._close, this)).end()
            .find(".k-edit-field input").keydown(proxy(this._keydown, this)).end()
            .find("#k-editor-link-url").val(this.linkUrl(a)).end()
            .find("#k-editor-link-text").val(this._initialText).end()
            .find("#k-editor-link-title").val(a ? a.title : "").end()
            .find("#k-editor-link-target").attr("checked", a ? a.target == "_blank" : false).end()
            .find(".k-editor-link-text-row").toggle(!img);

        this._dialog = dialog.data("kendoWindow").center().open();

        $("#k-editor-link-url", dialog).focus().select();
    },

    _keydown: function (e) {
        var keys = kendo.keys;

        if (e.keyCode == keys.ENTER) {
            this._apply(e);
        } else if (e.keyCode == keys.ESC) {
            this._close(e);
        }
    },

    _apply: function (e) {
        var element = this._dialog.element;
        var href = $("#k-editor-link-url", element).val();
        var title, text, target;
        var textInput = $("#k-editor-link-text", element);

        if (href && href != HTTP_PROTOCOL) {

            if (href.indexOf("@") > 0 && !/^(\w+:)|(\/\/)/i.test(href)) {
                href = "mailto:" + href;
            }

            this.attributes = { href: href };

            title = $("#k-editor-link-title", element).val();
            if (title) {
                this.attributes.title = title;
            }

            if (textInput.is(":visible")) {
                text = textInput.val();
                if (!text && !this._initialText) {
                    this.attributes.innerHTML = href;
                } else if (text && (text !== this._initialText)) {
                    this.attributes.innerHTML = dom.stripBom(text);
                }
            }

            target = $("#k-editor-link-target", element).is(":checked");
            this.attributes.target = target ? "_blank" : null;

            this.formatter.apply(this._range, this.attributes);
        }

        this._close(e);

        if (this.change) {
            this.change();
        }
    },

    _close: function (e) {
        e.preventDefault();
        this._dialog.destroy();

        dom.windowFromDocument(RangeUtils.documentFromRange(this._range)).focus();

        this.releaseRange(this._range);
    },

    linkUrl: function(anchor) {
        if (anchor) {
            // IE < 8 returns absolute url if getAttribute is not used
            return anchor.getAttribute("href", 2);
        }

        return HTTP_PROTOCOL;
    },

    linkText: function (nodes) {
        var text = "";
        var i;

        for (i = 0; i < nodes.length; i++) {
            text += nodes[i].nodeValue;
        }

        return dom.stripBom(text || "");
    },

    redo: function () {
        var range = this.lockRange(true);

        this.formatter.apply(range, this.attributes);
        this.releaseRange(range);
    }

});

    var AutoLinkCommand = Command.extend({
        init: function (options) {
            Command.fn.init.call(this, options);

            this.formatter = new LinkFormatter();
        },
        exec: function () {
            var range = this.getRange();
            var traverser = new LeftDomTextTraverser({
                node: range.startContainer,
                offset: range.startOffset
            });
            var detection = new DomTextLinkDetection(traverser);

            var detectedLink = detection.detectLink();
            if (detectedLink) {
                var linkRange = range.cloneRange();
                linkRange.setStart(detectedLink.start.node, detectedLink.start.offset);
                linkRange.setEnd(detectedLink.end.node, detectedLink.end.offset);

                range = this.lockRange();
                var linkMarker = new kendo.ui.editor.Marker();
                linkMarker.add(linkRange);
                this.formatter.apply(linkRange, {
                    href: this._ensureWebProtocol(detectedLink.text)
                });

                linkMarker.remove(linkRange);

                this.releaseRange(range);
            }
        },

        _ensureWebProtocol: function (linkText) {
            var hasProtocol = this._hasProtocolPrefix(linkText);
            return hasProtocol ? linkText : this._prefixWithWebProtocol(linkText);
        },

        _hasProtocolPrefix: function(linkText) {
            return protocolRegExp.test(linkText);
        },

        _prefixWithWebProtocol: function(linkText) {
            return HTTP_PROTOCOL + linkText;
        }
    });

var UnlinkTool = Tool.extend({
    init: function(options) {
        this.options = options;
        this.finder = new InlineFormatFinder([{tags:["a"]}]);

        Tool.fn.init.call(this, $.extend(options, {command:UnlinkCommand}));
    },

    initialize: function(ui, options) {
        Tool.fn.initialize.call(this, ui, options);
        ui.addClass("k-state-disabled");
    },

    update: function (ui, nodes) {
        ui.toggleClass("k-state-disabled", !this.finder.isFormatted(nodes))
          .removeClass("k-state-hover");
    }
});

    var DomTextLinkDetection = Class.extend({
        init: function (traverser) {
            this.traverser = traverser;
            this.start = DomPos();
            this.end = DomPos();
            this.text = "";
        },

        detectLink: function () {
            var node = this.traverser.node;
            var offset = this.traverser.offset;
            if (dom.isDataNode(node)) {
                var text = node.data.substring(0, offset);
                if(/\s{2}$/.test(text)) {
                    return;
                }
            } else if(offset === 0) {//heuristic for new line
                var p = dom.closestEditableOfType(node, dom.blockElements);
                if (p && p.previousSibling) {
                    this.traverser.init({
                        node: p.previousSibling
                    });
                }
            }

            this.traverser.traverse($.proxy(this._detectEnd, this));
            if (!this.end.blank()) {
                this.traverser.init(this.end);
                this.traverser.traverse($.proxy(this._detectStart, this));

                if (!protocolRegExp.test(this.text) && !/^w{3}\./i.test(this.text)) {
                    this.start = DomPos();
                }
            }

            if (this.start.blank()) {
                return null;
            } else {
                return {
                    start: this.start,
                    end: this.end,
                    text: this.text
                };
            }
        },

        _detectEnd: function(text, node, offset) {
            var i = lastIndexOfRegExp(text, endLinkCharsRegExp);
            if(i > -1) {
                this.end.node = node;
                this.end.offset = i + 1;

                return false;
            }
        },

        _detectStart: function(text, node, offset) {
            var i = lastIndexOfRegExp(text, /\s/);
            var ii = i + 1;
            this.text = text.substring(ii) + this.text;

            this.start.node = node;
            this.start.offset = ii;

            if (i > -1) {
                return false;
            }
        }
    });

    function lastIndexOfRegExp(str, search) {
        var i = str.length;
        while (i-- && !search.test(str[i])) {}

        return i;
    }

    var DomPos = function() {
        return {
            node: null,
            offset: null,
            blank: function() {
                return this.node === null && this.offset === null;
            }
        };
    };

    var LeftDomTextTraverser = Class.extend({
        init: function (options) {
            this.node = options.node;
            this.offset = options.offset || (dom.isDataNode(this.node) && this.node.length) || 0;
        },

        traverse: function (callback) {
            if (!callback) {
                return;
            }
            this.cancel = false;
            this._traverse(callback, this.node, this.offset);
        },

        _traverse: function (callback, node, offset) {
            if(!node || this.cancel) {
                return;
            }
            if (node.nodeType === 3) {
                var text = node.data;
                if (offset !== undefined) {
                    text = text.substring(0, offset);
                }
                this.cancel = (callback(text, node, offset) === false);
            }
            else {
                this._traverseNodes(callback, node.childNodes);
            }

            this._traverse(callback, node.previousSibling);
        },

        _traverseNodes: function(callback, nodes) {
            for (var i = nodes.length - 1; i >= 0; i--) {
                var node = nodes[i];
                if (node.nodeType === 3) {
                    this._traverse(callback, node);
                }
                else {
                    this._traverseNodes(callback, node.childNodes);
                }
            }
        }
    });

extend(kendo.ui.editor, {
    LinkFormatFinder: LinkFormatFinder,
    LinkFormatter: LinkFormatter,
    UnlinkCommand: UnlinkCommand,
    LinkCommand: LinkCommand,
    AutoLinkCommand: AutoLinkCommand,
    UnlinkTool: UnlinkTool,
    DomTextLinkDetection: DomTextLinkDetection,
    LeftDomTextTraverser: LeftDomTextTraverser
});

registerTool("createLink", new Tool({ key: "K", ctrl: true, command: LinkCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Create Link"})}));
registerTool("unlink", new UnlinkTool({ key: "K", ctrl: true, shift: true, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Remove Link"})}));
// registerTool("autoLinkDetection", new Tool({ key: 32, preventTyping: false, command: AutoLinkDetection }));
registerTool("autoLink", new Tool({ key: 32, keyPressCommand: true, command: AutoLinkCommand }));

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
