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
        init: function(target, observer, handlers) {
            this._handlers = {};
            this.target = target;
            this._observer = observer || window;

            this.keyDownProxy = this.keyDown.bind(this);
            this.mouseProxy = this.mouse.bind(this);

            target.on("keydown", this.keyDownProxy);
            target.on("mousedown mousemove mouseup cut copy paste scroll wheel", this.mouseProxy);

            if (handlers) {
                for (var key in handlers) {
                    this.on(key, handlers[key]);
                }
            }
        },

        keyDown: function(e) {
            this.handleEvent(e, KEY_NAMES[e.keyCode]);
        },

        mouse: function(e) {
            var type = e.type;

            if (type === "mousedown") {
                this._mousePressed = true;
            }
            if (type === "mouseup") {
                this._mousePressed = false;
            }
            if (type === "mousemove" && this._mousePressed) {
                type = "mousedrag";
            }

            this.handleEvent(e, type);
        },

        handleEvent: function(e, name) {
            var eventKey = "";
            if (e.shiftKey) {
               eventKey += "shift+";
            }

            if (e.ctrlKey) {
               eventKey += "ctrl+";
            }

            eventKey += name;

            var catchAllHandler = this._handlers['*+' + name];

            if (catchAllHandler) {
                catchAllHandler.call(this._observer, e, eventKey);
            }

            var handler = this._handlers[eventKey];

            if (handler) {
                handler.call(this._observer, e, eventKey);
            }
        },

        on: function(event, callback) {
            var handlers = this._handlers;

            if (typeof callback === "string") {
                callback = this._observer[callback];
            }

            if (typeof event === "string") {
                event = event.split(",");
            }

            event.forEach(function(e) {
                handlers[e] = callback;
            });
        },

        destroy: function() {
            this.target.off("keydown", this.keyDownProxy);
            this.target.off("keydown", this.mouseProxy);
        }
    });

    kendo.spreadsheet.EventListener = EventListener;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
