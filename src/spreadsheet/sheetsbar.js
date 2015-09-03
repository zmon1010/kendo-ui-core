(function(f, define){
    define([ "../kendo.core", "../kendo.sortable" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var DOT = ".";
        var sheetsBarClassNames = {
            sheetsBarActive: "k-spreadsheet-sheets-bar-active",
            sheetsBarInactive: "k-spreadsheet-sheets-bar-inactive",
            sheetsBarAdd: "k-spreadsheet-sheets-bar-add",
            sheetsBarItems: "k-spreadsheet-sheets-items",
            sheetsBarEditor: "k-spreadsheet-sheets-editor"
        };

        var SheetsBar = kendo.ui.Widget.extend({
            init: function(element, options) {
                kendo.ui.Widget.call(this, element, options);

                element = this.element;

                this._tree = new kendo.dom.Tree(element[0]);

                this._tree.render([this._addButton(), this._sheetsWrapper([])]);

                this._createSortable();

                this._sortable.bind("start", this._onSheetReorderStart.bind(this));

                this._sortable.bind("end", this._onSheetReorderEnd.bind(this));

                element.on("click", "li", this._onSheetSelect.bind(this));

                element.on("dblclick", "li" + DOT + sheetsBarClassNames.sheetsBarActive, this._createEditor.bind(this));

                element.on("click", DOT + sheetsBarClassNames.sheetsBarAdd, this._onAddSelect.bind(this));
            },

            options: {
                name: "SheetsBar"
            },

            events: [
                "select",
                "reorder",
                "rename"
            ],

            //TODO:
            //1) add sheet -- ready
            //2) remove sheet from sheet tab
            //3) reorder sheets --ready
            //4) rename sheet with double click --ready
            //5) scroll when more sheets are rendered (last one)

            _createEditor: function (e) {
                if (this._editor) {
                    return;
                }

                this._renderSheets(this._sheets, this._selectedIndex, true);
                this._editor = this.element
                                   .find(kendo.format("input{0}{1}",DOT,sheetsBarClassNames.sheetsBarEditor))
                                   .focus()
                                   .on("keydown", this._onEditorKeydown.bind(this))
                                   .on("blur", this._onEditorBlur.bind(this));
            },

            _destroyEditor: function() {
                this._editor.off();
                this._editor = null;
                this._renderSheets(this._sheets, this._selectedIndex, false);
            },

            renderSheets: function(sheets, selectedIndex) {
                if (!sheets || selectedIndex < 0) {
                    return;
                }

                this._renderSheets(sheets, selectedIndex, false);
            },

            _renderSheets: function(sheets, selectedIndex, isInEditMode) {
                var dom = kendo.dom;
                var element = dom.element;
                var idx;
                var sheetElements = [];

                this._sheets = sheets;
                this._selectedIndex = selectedIndex;

                for (idx = 0; idx < this._sheets.length; idx++) {
                    var sheet = this._sheets[idx];
                    var isSelectedSheet = (idx === selectedIndex);
                    var args = isSelectedSheet ? { className: sheetsBarClassNames.sheetsBarActive } : { className: sheetsBarClassNames.sheetsBarInactive };
                    var elementContent;

                    if (isSelectedSheet && isInEditMode) {
                        elementContent = element("input", {
                            type: "text",
                            value: sheet.name(),
                            className: "k-textbox " + sheetsBarClassNames.sheetsBarEditor,
                            maxlength: 50
                        }, []);
                    } else {
                        elementContent = element("span", {
                            title: sheet.name()
                        }, [dom.text(sheet.name())]);
                    }

                    sheetElements.push(element("li", args, [elementContent]));
                }

                this._tree.render([this._addButton(),  this._sheetsWrapper(sheetElements)]);
            },

            _sheetsWrapper: function(sheetElements) {
                return kendo.dom.element("div", { className: sheetsBarClassNames.sheetsBarItems }, [kendo.dom.element("ul", {}, sheetElements)]);
            },

            _createSortable: function() {
                this._sortable = new kendo.ui.Sortable(this.element, {
                    filter: kendo.format("ul li.{0},ul li.{1}", sheetsBarClassNames.sheetsBarActive, sheetsBarClassNames.sheetsBarInactive),
                    container: DOT + sheetsBarClassNames.sheetsBarItems,
                    axis: "x",
                    animation: false,
                    ignore: "input"
                });
            },

            _onEditorKeydown: function(e) {
                if (this._editor) {
                    if (e.which === 13) {
                        this._destroyEditor();
                        this._onSheetRename($(e.target).val());
                    }

                    if (e.which === 27) {
                        this._destroyEditor();
                        this._onSheetRename();
                    }
                }
            },

            _onEditorBlur: function(e) {
                if (this._editor) {
                    this._destroyEditor();
                    this._onSheetRename($(e.target).val());
                }
            },

            _onSheetReorderEnd: function(e) {
                e.preventDefault();
                this.trigger("reorder", {oldIndex: e.oldIndex, newIndex: e.newIndex});
            },

            _onSheetReorderStart: function(e) {
                if (this._editor) {
                    e.preventDefault();
                }
            },

            _onSheetSelect: function(e) {
                var selectedSheetText = $(e.target).text();

                if ($(e.target).is(DOT + sheetsBarClassNames.sheetsBarEditor)) {
                    e.preventDefault();
                    return;
                }

                if (this._editor) {
                    var editorValue = this._editor.val();
                    this._destroyEditor();
                    this._onSheetRename(editorValue);
                }

                this.trigger("select", {name: selectedSheetText, isAddButton: false});
            },

            _onSheetRename: function(newSheetName) {
                this.trigger("rename", {name: newSheetName, sheetIndex: this._selectedIndex });
            },

            _onAddSelect: function(e) {
                this.trigger("select", {isAddButton: true});
            },

            _addButton: function() {
                var element = kendo.dom.element;
                return element("a", {className: sheetsBarClassNames.sheetsBarAdd}, [element("span", {className: "k-sprite k-icon k-font-icon k-i-plus"}, [])]);
            },

            destroy: function() {
                this._sortable.destroy();
            }
        });

        kendo.spreadsheet.SheetsBar = SheetsBar;
        $.extend(true, SheetsBar, { classNames: sheetsBarClassNames });
    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
