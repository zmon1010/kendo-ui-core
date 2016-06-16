(function(f, define){
    define([ "./tables" ], f);
})(function(){

(function($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class,
        Editor = kendo.ui.editor,
        dom = Editor.Dom,
        template = kendo.template,
        RangeUtils = Editor.RangeUtils,
        IMMUTABALE = "k-immutable";

    var rootCondition = function(node) {
        return $(node).is("body,.k-editor");
    };
    
    var immutable = function(node) {
        return node.getAttribute && node.getAttribute("contenteditable") == "false";
    };
    
    var immutableParent = function (node) {
        return dom.closestBy(node, immutable, rootCondition);
    };

    var trimImmutableContainers = function(range) {
        var startImmutableParent = immutableParent(range.startContainer);
        var endImmutableParent = immutableParent(range.endContainer);
        var rangeInImmutable = false;

        if (startImmutableParent && startImmutableParent === endImmutableParent){
            rangeInImmutable = true;
        } else if (startImmutableParent || endImmutableParent) {
            if (startImmutableParent){
                range.setStartAfter(startImmutableParent);
            }
            if (endImmutableParent){
                range.setEndBefore(endImmutableParent);
            }

            var nodes = RangeUtils.editableTextNodes(range);
            if (nodes.length === 0){
                rangeInImmutable = true;
            }
        }

        return rangeInImmutable;
    };
    
    var Immutables = Class.extend({
        init: function (editor) {
            this.editor = editor;
            this.serializedImmutables = {};
            this.options = $.extend({}, editor && editor.options && editor.options.immutables);
        },

        serialize: function(node) {
            var result = this._toHtml(node);
            var id = this.randomId();
            this.serializedImmutables[id] = node;
            if (result.indexOf(IMMUTABALE) === -1) {
                result = result.replace(/>/, ' ' + IMMUTABALE + '="' + id + '">');
            }
            return result;
        },

        _toHtml: function(node){
            var serialization = this.options.serialization;
            var serializationType = typeof serialization;
            var nodeName;

            switch (serializationType) {
                case "string":
                    return template(serialization)(node);
                case "function":
                    return serialization(node);
                default:
                    nodeName = dom.name(node);
                    return "<" + nodeName + "></" + nodeName + ">";
            }
        },

        deserialize: function(node) {
            var that = this;
            var deserialization = this.options.deserialization;

            $('[' + IMMUTABALE+ ']', node).each(function() {
                var id = this.getAttribute(IMMUTABALE);
                var immutable = that.serializedImmutables[id];
                if (kendo.isFunction(deserialization)) {
                    deserialization(this, immutable);
                }
                $(this).replaceWith(immutable);
            });

            that.serializedImmutables = {};
        },

        randomId: function(length) {
            var result = '';
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for (var i = length || 10; i > 0; --i) {
                result += chars.charAt(Math.round(Math.random() * (chars.length - 1)));
            }
            return result;
        },

        keydown: function(e, range) {
            if (this._cancelTyping(e, range) || this._cancelDeleting(e, range)) {
                e.preventDefault();
                return true;
            }
            return false;
        },
        
        _cancelTyping: function(e, range) {
            var editor = this.editor;
            var keyboard = editor.keyboard;
            
            return keyboard.isTypingKey(e) && !keyboard.typingInProgress && !this.canDeleteSelection(range);
        },
        
        _cancelDeleting: function(e, range) {
            var keys = kendo.keys;
            var backspace = e.keyCode === keys.BACKSPACE;
            var del = e.keyCode == keys.DELETE;
            
            if (!backspace && !del) {
                return false;
            }
            var cancelDeleting = false;
            if (!range.collapsed) {
                cancelDeleting = !this.canDeleteSelection(range);
            } else {
                var nextImmutable = this.nextImmutable(range, del);
                if (nextImmutable) {
                    this._removeImmutable(nextImmutable, range);
                    cancelDeleting = true;
                }
            }
            return cancelDeleting;
        },
        
        canDeleteSelection: function(range) {
            return !immutableParent(range.startContainer) && !immutableParent(range.endContainer); 
        },
        
        nextImmutable: function(range, forwards) {
            var commonContainer = range.commonAncestorContainer;
            if (dom.isBom(commonContainer) || ((forwards && RangeUtils.isEndOf(range, commonContainer)) || (!forwards && RangeUtils.isStartOf(range, commonContainer)))) {
                var next = this._nextNode(commonContainer, forwards);
                return immutableParent(next);
            }
        },
        
        _removeImmutable: function(immutable, range) {
            var startRestorePoint = new Editor.RestorePoint(range);
            dom.remove(immutable);
            Editor._finishUpdate(this.editor, startRestorePoint);
        },
        
        _nextNode: function(node, forwards) {
            var sibling = forwards ? "nextSibling" : "previousSibling";
			var current = node, next;
			while(current && !next) {
                next = current[sibling];
                if (next && dom.isDataNode(next) && /^\s|[\ufeff]$/.test(next.nodeValue)){
                    current = next;
                    next = current[sibling];
                }
                if (!next){
                    current = current.parentNode;    
                }
			}
			return next;
		}
    });

    Immutables.immutable = immutable;
    Immutables.immutableParent = immutableParent;
    Immutables.trimImmutableContainers = trimImmutableContainers;
    
    Editor.Immutables = Immutables;
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); }); 