(function(f, define){
    define([ "./tables" ], f);
})(function(){

(function($, undefined) {
    var kendo = window.kendo,
        Class = kendo.Class,
        extend = $.extend,
        proxy = $.proxy,
        Editor = kendo.ui.editor,
        dom = Editor.Dom,
        EditorUtils = Editor.EditorUtils,
        RangeUtils = Editor.RangeUtils;

    var immutable = function(node) {
        return node.getAttribute && node.getAttribute("contenteditable") == "false";
    };
    
    var immutableParent = function (node) {
        return dom.closestBy(node, immutable);
    };
    
    var Immutables = Class.extend({
        init: function (editor) {
            this.editor = editor;
        },
        
        bindEvents: function(){
            this.editor.bind('execute', proxy(this._executeHandler, this));
        },
        
        _executeHandler: function(e){ 
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
            var editor = this.editor;
            var keyboard = editor.keyboard;
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
    
    Editor.Immutables = Immutables;
})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); }); 