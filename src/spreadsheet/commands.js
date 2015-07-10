(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var Command = kendo.spreadsheet.Command = kendo.Class.extend({
        init: function(options) {
            this._sheet = options.sheet;
            this._ref = options.ref;
        },
        range: function() {
            return this._sheet.range(this._ref);
        },
        redo: function() {
            this.exec();
        }
    });

    var PropertyChangeCommand = kendo.spreadsheet.PropertyChangeCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this, options);
            this._property = options.property;
            this._value = options.value;
        },
        exec: function() {
            var range = this.range();
            this._state = range[this._property]();
            range[this._property](this._value).select();
        },
        undo: function() {
            this.range()[this._property](this._state).select();
        }
    });

    var EditCommand = kendo.spreadsheet.EditCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "_editableValue";
            PropertyChangeCommand.fn.init.call(this, options);
        }
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
