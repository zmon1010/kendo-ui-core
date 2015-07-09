(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var UndoRedoStack = kendo.Class.extend({
        init: function() {
            this.clear();
        },

        push: function (command) {
            this.stack = this.stack.slice(0, this.currentCommandIndex + 1);
            this.currentCommandIndex = this.stack.push(command) - 1;
        },

        undo: function () {
            if (this.canUndo()) {
                this.stack[this.currentCommandIndex--].undo();
            }
        },

        redo: function () {
            if (this.canRedo()) {
                this.stack[++this.currentCommandIndex].redo();
            }
        },

        clear: function() {
            this.stack = [];
            this.currentCommandIndex = -1;
        },

        canUndo: function () {
            return this.currentCommandIndex >= 0;
        },

        canRedo: function () {
            return this.currentCommandIndex != this.stack.length - 1;
        }
    });

    kendo.deepExtend(kendo, {
        util: {
            UndoRedoStack: UndoRedoStack
        }
    });
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
