(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var Command = kendo.Class.extend({
        init: function(options) {
            this.options = options;
        },
        range: function() {
            var options = this.options;
            return new kendo.spreadsheet.Range(options.ref, options.sheet);
        }
    });

    var EditCommand = Command.extend({
        exec: function() {
            var range = this.range();
            this._state = range.editValue();
            range.editValue(this.options.value);
        },
        undo: function() {
            this.range().editValue(this._state);
        },
        redo: function() {
            this.exec();
        }
    });

    kendo.deepExtend(kendo.spreadsheet, {
        Command: Command,
        EditCommand: EditCommand
    });
})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
