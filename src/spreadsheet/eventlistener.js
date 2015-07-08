(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {

    var KEY_NAMES = {
        9: 'tab',
        13: 'enter',
        27: 'esc',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        35: 'end',
        36: 'home',
        32: 'spacebar',
        33: 'pageup',
        34: 'pagedown'
    };
    var EventListener = kendo.Class.extend({
        init: function (target) {
            this._handlers = {};
            this.target = target;

            this.keyDownProxy = this.keyDown.bind(this);
            this.mouseProxy = this.mouse.bind(this);

            target.on("keydown", function(e) {
                this.handleEvent(e, KEY_NAMES[e.keyCode]);
            }.bind(this));

            target.on("mousedown", function(e) {
                this.handleEvent(e, e.type);
            }.bind(this));
        },

        keyDown: function(e) {
            this.handleEvent(e, KEY_NAMES[e.keyCode]);
        },

        mouse: function(e) {
            this.handleEvent(e, e.type);
        },

        handleEvent: function(e, name) {
            var eventKey = "";
            if (e.ctrlKey) {
               eventKey = "ctrl+";
            }

            if (e.shiftKey) {
               eventKey += "shift+";
            }

            eventKey += name;

            var handler = this._handlers[eventKey];

            if (handler) {
                handler(e, eventKey);
            }
        },

        on: function(event, callback) {
            var handlers = this._handlers;

            if (event instanceof Array) {
                event.forEach(function(e) {
                    handlers[e] = callback;
                });
            }  else {
                handlers[event] = callback;
            }
        },

        destroy: function() {
            this.target.off("keydown", this.keyDownProxy);
            this.target.off("keydown", this.mouseProxy);
        }
    });

    kendo.spreadsheet.EventListener = EventListener;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
