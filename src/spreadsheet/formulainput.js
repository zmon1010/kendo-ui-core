(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo, window) {

    /* jshint eqnull:true */
    /* jshint latedef: nofunc */

    var $ = kendo.jQuery;
    var Widget = kendo.ui.Widget;
    var ns = ".kendoFormulaInput";
    var keys = kendo.keys;
    var classNames = {
        wrapper: "k-spreadsheet-formula-input"
    };
    var styles = [
        "font-family",
        "font-size",
        "font-stretch",
        "font-style",
        "font-weight",
        "letter-spacing",
        "text-transform",
        "line-height"
    ];

    //move to core
    var KEY_NAMES = {
        27: 'esc',
        37: 'left',
        39: 'right',
        35: 'end',
        36: 'home',
        32: 'spacebar'
    };

    var PRIVATE_FORMULA_CHECK = /[a-z0-9]$/i;
    var FORMULA_START_SYMBOLS = {
        "=": true,
        "(": true,
        ",": true,
        " ": true
    };

    var FormulaInput = Widget.extend({
        init: function(element, options) {
            Widget.call(this, element, options);

            element = this.element;

            element.addClass(FormulaInput.classNames.wrapper)
                .attr("contenteditable", true)
                .attr("spellcheck", false);

            if (this.options.autoScale) {
                element.on("input", this.scale.bind(this));
            }

            this._formulaSource();

            this._formulaList();

            this._popup();

            element.on("keydown", this._keydown.bind(this));
            element.on("keyup", this._keyup.bind(this));
            element.on("blur", this._blur.bind(this));
        },

        options: {
            name: "FormulaInput",
            autoScale: false,
            filterOperator: "startswith",
            scalePadding: 30,
            minLength: 1
        },

        getPos: function() {
            var div = this.element[0];
            var sel = window.getSelection();
            var a = lookup(sel.focusNode, sel.focusOffset);
            var b = lookup(sel.anchorNode, sel.anchorOffset);
            if (a != null && b != null) {
                if (a > b) {
                    var tmp = a;
                    a = b;
                    b = tmp;
                }
                return { begin: a, end: b, collapsed: a == b };
            }
            function lookup(lookupNode, pos) {
                try {
                    (function loop(node){
                        if (node === lookupNode) {
                            throw pos;
                        } else if (node.nodeType == 1 /* Element */) {
                            for (var i = node.firstChild; i; i = i.nextSibling) {
                                loop(i);
                            }
                        } else if (node.nodeType == 3 /* Text */) {
                            pos += node.nodeValue.length;
                        }
                    })(div);
                } catch(index) {
                    return index;
                }
            }
        },

        setPos: function(begin, end) {
            var eiv = this.element[0];
            begin = lookup(eiv, begin);
            if (end != null) {
                end = lookup(eiv, end);
            } else {
                end = begin;
            }
            if (begin.node && end.node) {
                var r = document.createRange();
                r.setStart(begin.node, begin.pos);
                r.setEnd(end.node, end.pos);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(r);
            }
            function lookup(node, pos) {
                try {
                    (function loop(node){
                        if (node.nodeType == 3 /* Text */) {
                            var len = node.nodeValue.length;
                            if (len >= pos) {
                                throw node;
                            }
                            pos -= len;
                        } else if (node.nodeType == 1 /* Element */) {
                            for (var i = node.firstChild; i; i = i.nextSibling) {
                                loop(i);
                            }
                        }
                    })(node);
                } catch(el) {
                    return { node: el, pos: pos };
                }
            }
        },

        // length: function() {
        //     return this.element.text().length;
        // },

        _formulaSource: function() {
            var result = [];
            var value;

            for (var key in kendo.spreadsheet.calc.runtime.FUNCS) {
                if (PRIVATE_FORMULA_CHECK.test(key)) {
                    value = key.toUpperCase();
                    result.push({ value: value, text: value });
                }
            }

            this.formulaSource = new kendo.data.DataSource({ data: result });
        },

        _formulaList: function() {
            this.list = new kendo.ui.StaticList($('<ul class="k-spreadsheet-formula-list" />').insertAfter(this.element), {
                autoBind: false,
                selectable: true,
                change: this._formulaListChange.bind(this),
                dataSource: this.formulaSource,
                dataValueField: "value",
                template: "#:data.value#"
            });

            this.list.element.on("mousedown", function(e) {
                e.preventDefault();
            });
        },

        _formulaListChange: function() {
            var selection = window.getSelection();
            var node = selection.focusNode;

            var value = this.list.value()[0];
            var startIdx, endIdx;
            var nodeValue;

            if (!node || !value || this._mute) {
                return;
            }

            if (node.nodeType === 3) {
                nodeValue = node.nodeValue;
                startIdx = endIdx = selection.focusOffset;

                startIdx = this._startIdx(nodeValue, startIdx);
                endIdx = this._endIdx(nodeValue, endIdx);

                if (nodeValue[endIdx] !== "(") {
                    value += "(";
                }

                node.nodeValue = nodeValue.substr(0, startIdx) + value + nodeValue.substring(endIdx);

                this.caretAt(node, startIdx + value.length);
                this._sync();
            }

            this.scale();
            this.popup.close();
        },

        _popup: function() {
            this.popup = new kendo.ui.Popup(this.list.element, {
                anchor: this.element
            });
        },

        _blur: function() {
            this.popup.close();
        },

        _isFormula: function() {
            return this.element.text()[0] === "=";
        },

        _keydown: function(e) {
            var key = e.keyCode;

            if (KEY_NAMES[key]) {
                this.popup.close();
                this._navigated = true;
            } else  if (this._move(key)) {
                this._navigated = true;
                e.preventDefault();
            }
        },

        _keyup: function() {
            var value;
            var popup = this.popup;

            if (this._isFormula() && !this._navigated) {
                value = this._searchValue();

                this.filter(value);

                if (!value || !this.formulaSource.view().length) {
                    popup.close();

                } else {
                    popup[popup.visible() ? "position" : "open"]();
                    this.list.focusFirst();
                }
            }

            this._navigated = false;
        },

        _startIdx: function(value, idx) {
            while(idx > 0) {
                if (FORMULA_START_SYMBOLS[value[idx - 1]]) {
                    break;
                }

                idx -= 1;
            }

            return idx;
        },

        _endIdx: function(value, idx) {
            while(idx < value.length) {
                if (FORMULA_START_SYMBOLS[value[idx]]) {
                    break;
                }

                idx += 1;
            }

            return idx;
        },

        _move: function(key) {
            var list = this.list;
            var pressed = false;

            if (key === keys.DOWN) {
                list.focusNext();
                if (!list.focus()) {
                    list.focusFirst();
                }
                pressed = true;
            } else if (key === keys.UP) {
                list.focusPrev();
                if (!list.focus()) {
                    list.focusLast();
                }
                pressed = true;
            } else if (key === keys.ENTER) {
                list.select(list.focus());
                this.popup.close();
                pressed = true;
            } else if (key === keys.TAB) {
                list.select(list.focus());
                this.popup.close();
                pressed = true;
            } else if (key === keys.PAGEUP) {
                list.focusFirst();
                pressed = true;
            } else if (key === keys.PAGEDOWN) {
                list.focusLast();
                pressed = true;
            }

            return pressed;
        },

        _searchValue: function() {
            var selection = window.getSelection();

            var idx = selection.focusOffset;
            var value = selection.focusNode.nodeValue;

            if (!value) {
                return value;
            }

            return value.substr(this._startIdx(value, idx), this._endIdx(value, idx) - 1);
        },

        _sync: function() {
            if (this._editorToSync && this.isActive()) {
                this._editorToSync.value(this.value());
            }
        },

        _textContainer: function() {
            var computedStyles = kendo.getComputedStyles(this.element[0], styles);

            computedStyles.position = "absolute";
            computedStyles.visibility = "hidden";
            computedStyles.top = -3333;
            computedStyles.left = -3333;

            this._span = $("<span/>").css(computedStyles).insertAfter(this.element);
        },

        activeFormula: function() {
            var selection = window.getSelection();
            var currentIdx = selection.focusOffset;
            var node = selection.focusNode;
            var formula = null;

            if (!node || !node.nodeValue) {
                return formula;
            }

            var value = node.nodeValue.substr(0, currentIdx);
            var braketIdx = value.lastIndexOf("(");
            var commaIdx = value.lastIndexOf(",");
            var startIdx = braketIdx;

            if (braketIdx > value.lastIndexOf(")")) {
                if (commaIdx > startIdx) {
                    startIdx = commaIdx;
                }

                if ((startIdx + 1) === currentIdx) {
                    value = value.substr(this._startIdx(value, braketIdx), braketIdx - 1);
                    formula = kendo.spreadsheet.calc.runtime.FUNCS[value.toLowerCase()];
                }
            }

            return formula;
        },

        isActive: function() {
            return this.element.is(":focus");
        },

        caretAt: function(node, idx) {
            if (!node || !this.isActive()) {
                return;
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.setStart(node, idx);

            selection.removeAllRanges();
            selection.addRange(range);
        },

        caretToEnd: function() {
            var nodes = this.element[0].childNodes;
            var length = nodes.length;

            if (!length || !this.isActive()) {
                return;
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.setStartAfter(nodes[nodes.length - 1]);

            selection.removeAllRanges();
            selection.addRange(range);
        },

        filter: function(value) {
            if (!value || value.length < this.options.minLength) {
                return;
            }

            this._mute = true;
            this.list.select(-1);
            this._mute = false;

            this.formulaSource.filter({
                field: this.list.options.dataValueField,
                operator: this.options.filterOperator,
                value: value
            });
        },

        hide: function() {
            this.element.hide();
        },

        show: function() {
            this.element.show();
        },

        position: function(rectangle) {
            if (!rectangle) {
                return;
            }

            this.element
                .show()
                .css({
                    "top": rectangle.top + "px",
                    "left": rectangle.left + "px"
                });
        },

        ref: function(ref) {
            var formula = this.activeFormula();
            var selection = window.getSelection();

            if (formula) {
                var index = selection.focusOffset;
                var node = selection.focusNode;
                var nodeValue = node.nodeValue;
                var refString = ref.toString();

                var value = nodeValue.substring(index);
                var replace_regexp = /^(\s)*([\w|\$])*(:)?([\w|\$])*/;

                nodeValue = nodeValue.substr(0, index) + value.replace(replace_regexp, refString);
                node.nodeValue = nodeValue;

                this.caretAt(selection.focusNode, index);
                this.scale();
                this._sync();
            }
        },

        resize: function(rectangle) {
            if (!rectangle) {
                return;
            }

            this.element.css({
                width: rectangle.width,
                height: rectangle.height
            });
        },

        syncWith: function(formulaInput) {
            var eventName = "input" + ns;

            this._editorToSync = formulaInput;
            this.element.off(eventName).on(eventName, this._sync.bind(this));
        },

        scale: function() {
            var element = this.element;
            var width;

            if (!this._span) {
                this._textContainer();
            }

            this._span.html(element.html());

            width = this._span.width() + this.options.scalePadding;

            if (width > element.width()) {
                element.width(width);
            }
        },

        value: function(value) {
            if (value === undefined) {
                return this.element.text();
            }

            if (/^=/.test(value)) {
                this._syntaxHighlight(value);
            } else {
                this.element.text(value);
            }
        },

        _syntaxHighlight: function(formula) {
            formula = formula.substr(1);
            var tokens = kendo.spreadsheet.calc.tokenize(formula);

            // will get the references array here
            var references = [];

            tokens.reverse().forEach(function(tok){
                if (tok.type == "ref") {
                    references.push(tok.ref);
                }
                var begin = tok.begin.pos, end = tok.end.pos;
                var text = kendo.htmlEncode(formula.substring(begin, end));
                formula = formula.substr(0, begin) +
                    "<span class='k-syntax-" + tok.type + "'>" + text + "</span>" +
                    formula.substr(end);
            });
            this.element.html("=" + formula);

            // XXX: highlight references on the sheet now
        },

        destroy: function() {
            this._editorToSync = null;

            this.element.off(ns);

            this.popup.destroy();
            this.popup = null;

            Widget.fn.destroy.call(this);
        }
    });

    kendo.spreadsheet.FormulaInput = FormulaInput;
    $.extend(true, FormulaInput, { classNames: classNames });
})(kendo, window);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
