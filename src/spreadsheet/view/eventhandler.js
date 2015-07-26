(function(f, define){
    define([ "../../kendo.core" ], f);
})(function(){

(function(kendo) {
    var ACTIONS = {
       "up": "up",
       "down": "down",
       "left": "left",
       "right": "right",
       "home": "first-col",
       "ctrl+left": "first-col",
       "end": "last-col",
       "ctrl+right": "last-col",
       "ctrl+up": "first-row",
       "ctrl+down": "last-row",
       "ctrl+home": "first",
       "ctrl+end": "last",
       "pageup": "prev-page",
       "pagedown": "next-page"
    };

    var ENTRY_ACTIONS = {
        "tab": "next"
    };


    var CONTAINER_EVENTS = {
        "wheel": "onWheel",
        "mousedown": "onMouseDown"
    };

    var CLIPBOARD_EVENTS = {
        "*+pageup": "onPageUp",
        "*+pagedown": "onPageDown",
        "mouseup": "onMouseUp",
        "cut": "onCut",
        "paste": "onPaste"
    };

    var ACTION_KEYS = [];
    var SHIFT_ACTION_KEYS = [];
    var ENTRY_ACTION_KEYS = [];

    for (var key in ACTIONS) {
        ACTION_KEYS.push(key);
        SHIFT_ACTION_KEYS.push("shift+" + key);
    }

    for (key in ENTRY_ACTIONS) {
        ENTRY_ACTION_KEYS.push(key);
    }

    CLIPBOARD_EVENTS[ACTION_KEYS] = "onAction";
    CLIPBOARD_EVENTS[SHIFT_ACTION_KEYS] = "onShiftAction";
    CLIPBOARD_EVENTS[ENTRY_ACTION_KEYS] = "onEntryAction";

    var ViewEventHandler = kendo.Class.extend({
        init: function(view) {
            this.view = view;
            this.container = $(view.container);
            this.clipboard = $(view.clipboard);
            this.scroller = view.scroller;

            $(view.scroller).on("scroll", this.onScroll.bind(this));
            this.listener = new kendo.spreadsheet.EventListener(this.container, this, CONTAINER_EVENTS);
            this.keyListener = new kendo.spreadsheet.EventListener(this.clipboard, this, CLIPBOARD_EVENTS);
        },

        sheet: function(sheet) {
            this.navigator = new kendo.spreadsheet.SheetNavigator(sheet, this.view.scroller.clientHeight);
        },

        refresh: function() {
            this._viewPortHeight = this.view.scroller.clientHeight;
            this.navigator.height(this._viewPortHeight);
        },

        onScroll: function() {
            this.view.render();
        },

        onWheel: function(event) {
            var deltaX = event.originalEvent.deltaX;
            var deltaY = event.originalEvent.deltaY;

            if (event.originalEvent.deltaMode === 1) {
                deltaX *= 10;
                deltaY *= 10;
            }

            this.scroller.scrollLeft += deltaX;
            this.scroller.scrollTop += deltaY;

            event.preventDefault();
        },

        onAction: function(event, action) {
            this.navigator.moveActiveCell(ACTIONS[action]);
            event.preventDefault();
        },

        onPageUp: function() {
            this.scroller.scrollTop -= this._viewPortHeight;
        },

        onEntryAction: function(event, action) {
            this.navigator.navigateInSelection(ENTRY_ACTIONS[action]);
            event.preventDefault();
        },

        onPageDown: function() {
            this.scroller.scrollTop += this._viewPortHeight;
        },

        onShiftAction: function(event, action) {
            action = ACTIONS[action.replace("shift+", "")];

            var activeCell = this.view._sheet.activeCell();
            var selectionTopLeft = this.view._sheet.select().topLeft;
            var selectionBottomRight = this.view._sheet.select().bottomRight;

            // There may be a third, indeterminate state, caused by a merged cell.
            // In this state, all key movements are treated as shrinks.
            // The navigator will reverse them if it detects this it will cause the selection to exclude the active cell.
            var leftMode = activeCell.topLeft.col == selectionTopLeft.col;
            var rightMode = activeCell.bottomRight.col == selectionBottomRight.col;
            var topMode = activeCell.topLeft.row == selectionTopLeft.row;
            var bottomMode = activeCell.bottomRight.row == selectionBottomRight.row;

            switch(action) {
                case "left":
                    action = rightMode ? "expand-left" : "shrink-left";
                    break;
                case "right":
                    action = leftMode ? "expand-right" : "shrink-right";
                    break;
                case "up":
                    action = bottomMode ? "expand-up" : "shrink-up";
                    break;
                case "down":
                    action = topMode ? "expand-down" : "shrink-down";
                    break;
                case "prev-page":
                    action = bottomMode ? "expand-page-up" : "shrink-page-up";
                    break;
                case "next-page":
                    action = topMode ? "expand-page-down" : "shrink-page-down";
                    break;
            }

            this.navigator.modifySelection(action);

            event.preventDefault();
        },

        onMouseDown: function(event, action) {
            var clipboard = this.clipboard;
            var offset = this.container.offset();
            var left = event.pageX - offset.left;
            var top = event.pageY - offset.top;

            var object = this.view.objectAt(left, top);

            if (object.type === "cell") {
                this.view._sheet.select(object.ref);
            }

            clipboard.css({ left: left - 4, top: top - 4 });

            setTimeout(function() {
                clipboard.select().focus();
            });
        },

        onMouseUp: function(event, action) {
            this.clipboard.css({
                left: -10000,
                top: -10000
            });
        },

        onCut: function(event, action) {
            var selection = this.view._sheet.selection();
            setTimeout(function() { selection.value(""); });
        },

        onPaste: function(event, action) {
            var selection = this.view._sheet.selection();
            var clipboard = this.clipboard;

            setTimeout(function() {
                selection.value(clipboard.val());
            });
        }
    });

    kendo.spreadsheet.ViewEventHandler = ViewEventHandler;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
