var TAGNAMES = {
    editor         : "textarea",
    numerictextbox : "input",
    datepicker     : "input",
    datetimepicker : "input",
    timepicker     : "input",
    autocomplete   : "input",
    colorpicker    : "input",
    maskedtextbox  : "input",
    multiselect    : "input",
    upload         : "input",
    validator      : "form",
    button         : "button",
    mobilebutton        : "a",
    mobilebackbutton    : "a",
    mobiledetailbutton  : "a",
    listview       : "ul",
    mobilelistview : "ul",
    treeview       : "ul",
    menu           : "ul",
    contextmenu    : "ul",
    actionsheet    : "ul"
};

Object.keys(kendo.ui.roles).forEach(function(name) {
    registerElement(name, kendo.ui.roles[name]);
});

var jsonRegExp = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/;
var jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}|^\[[A-Za-z_]*\]$/;
var numberRegExp = /^(\+|-?)\d+(\.?)\d*$/;

function parseOption(element, option) {
    var value = element.getAttribute(option);

    if (value === null) {
        value = undefined;
    } else if (value === "null") {
        value = null;
    } else if (value === "true") {
        value = true;
    } else if (value === "false") {
        value = false;
    } else if (numberRegExp.test(value)) {
        value = parseFloat(value);
    } else if (jsonRegExp.test(value) && !jsonFormatRegExp.test(value)) {
        value = new Function("return (" + value + ")")();
    }

    return value;
}

function parseOptions(element, options) {
    var result = {};

    Object.keys(options).concat("dataSource").forEach(function(name) {
        if (element.hasAttribute(name)) {
            result[name] = parseOption(element, name);
        }
    });

    return result;
}

function cloneEvent(e) {
    var result = {};

    Object.keys(e).forEach(function(key) {
        if (key[0] != "_") {
            result[key] = e[key];
        }
    });

    return result;
}

function eventHandler(eventName, e) {
    var event = document.createEvent("CustomEvent");

    event.initCustomEvent(eventName, /*bubbles*/ false, /*cancelable*/true, cloneEvent(e));

    this.dispatchEvent(event);

    if (event.defaultPrevented) {
        e.preventDefault();
    }
}

function registerElement(name, widget) {
    var options = widget.prototype.options;

    var prototype = Object.create(HTMLElement.prototype);

    var hasValue = options.hasOwnProperty("value");

    if (hasValue) {
        Object.defineProperty(prototype, "value", {
            get: function() {
                return this.widget.value();
            },
            set: function(value) {
                this.widget.value(value);
            }
        });
    }

    prototype.createdCallback = function() {
        var element = document.createElement(TAGNAMES[name] || "div");

        this.appendChild(element);

        this.widget = new widget(element, parseOptions(this, options));

        widget.prototype.events.forEach(function(eventName) {
            this.widget.bind(eventName, eventHandler.bind(this, eventName));
        }.bind(this));
    };

    prototype.detachedCallback = function() {
        this.widget.destroy();
    };

    document.registerElement("kendo-" + name, {
        prototype: prototype
    });
}

