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
            sheetsBarRemove: "k-spreadsheet-sheets-remove",
            sheetsBarItems: "k-spreadsheet-sheets-items",
            sheetsBarEditor: "k-spreadsheet-sheets-editor",
            sheetsBarScrollable: "k-spreadsheet-sheets-scrollable",
            sheetsBarNext: "k-spreadsheet-sheets-next",
            sheetsBarPrev: "k-spreadsheet-sheets-prev"
        };

        var SheetsBar = kendo.ui.Widget.extend({
            init: function(element, options) {
                var classNames = SheetsBar.classNames;

                kendo.ui.Widget.call(this, element, options);

                element = this.element;

                element.addClass("k-widget k-header");

                this._tree = new kendo.dom.Tree(element[0]);

                this._tree.render([this._addButton(), this._createSheetsWrapper([])]);

                this._createSortable();

                this._sortable.bind("start", this._onSheetReorderStart.bind(this));

                this._sortable.bind("end", this._onSheetReorderEnd.bind(this));

                element.on("click", DOT + classNames.sheetsBarRemove, this._onSheetRemove.bind(this));

                element.on("click", "li", this._onSheetSelect.bind(this));

                element.on("dblclick", "li" + DOT + classNames.sheetsBarActive, this._createEditor.bind(this));

                element.on("click", DOT + classNames.sheetsBarAdd, this._onAddSelect.bind(this));
            },

            options: {
                name: "SheetsBar",
                scrollable: {
                    distance: 200
                }
            },

            events: [
                "select",
                "reorder",
                "rename"
            ],

            _createEditor: function () {
                if (this._editor) {
                    return;
                }

                this._renderSheets(this._sheets, this._selectedIndex, true);
                this._editor = this.element
                                   .find(kendo.format("input{0}{1}",DOT,SheetsBar.classNames.sheetsBarEditor))
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
                var that = this;
                var wrapperOffsetWidth;
                var sheetsGroupScrollWidth;
                var scrollPrevButton;
                var scrollNextButton;
                var sheetsWrapper = that._sheetsWrapper();
                var sheetsGroup = that._sheetsGroup();
                var options = that.options;
                var classNames = SheetsBar.classNames;

                that._sheets = sheets;
                that._selectedIndex = selectedIndex;

                if (!that._scrollableAllowed()) {
                    that._renderHtml(isInEditMode, false);
                    return;
                }

                sheetsWrapper.addClass(classNames.sheetsBarScrollable + " k-tabstrip k-floatwrap k-tabstrip-bottom");

                wrapperOffsetWidth = sheetsWrapper[0].offsetWidth;
                sheetsGroupScrollWidth = sheetsGroup[0].scrollWidth;

                if (sheetsGroupScrollWidth > wrapperOffsetWidth && !that._scrollableModeActive) {

                    that._nowScrollingSheets = false;
                    that._isRtl = kendo.support.isRtl(that.element);

                    that._renderHtml(isInEditMode, true);

                    scrollPrevButton = sheetsWrapper.children(DOT + classNames.sheetsBarPrev);
                    scrollNextButton = sheetsWrapper.children(DOT + classNames.sheetsBarNext);

                    sheetsGroup.css({ marginLeft: scrollPrevButton.outerWidth() + 9, marginRight: scrollNextButton.outerWidth() + 12 });

                    scrollPrevButton.on("mousedown", function () {
                        that._nowScrollingSheets = true;
                        that._scrollSheetsByDelta(options.scrollable.distance * (that._isRtl ? 1 : -1));
                    });

                    scrollNextButton.on("mousedown", function () {
                        that._nowScrollingSheets = true;
                        that._scrollSheetsByDelta(options.scrollable.distance * (that._isRtl ? -1 : 1));
                    });

                    scrollPrevButton.add(scrollNextButton).on("mouseup", function () {
                        that._nowScrollingSheets = false;
                    });

                    that._scrollableModeActive = true;

                    that._toggleScrollButtons();
                } else if (that._scrollableModeActive && sheetsGroupScrollWidth <= wrapperOffsetWidth) {
                    that._scrollableModeActive = false;

                    sheetsWrapper.children(DOT + classNames.sheetsBarPrev).off();
                    sheetsWrapper.children(DOT + classNames.sheetsBarNext).off();

                    that._renderHtml(isInEditMode, false);
                    that._sheetsGroup().css({ marginLeft: "", marginRight: "" });
                } else {
                    that._renderHtml(isInEditMode, false);
                }
            },

            _renderHtml: function(isInEditMode, renderScrollButtons) {
                var idx;
                var sheetElements = [];
                var dom = kendo.dom;
                var element = dom.element;
                var sheets = this._sheets;
                var selectedIndex = this._selectedIndex;
                var classNames = SheetsBar.classNames;

                for (idx = 0; idx < sheets.length; idx++) {
                    var sheet = sheets[idx];
                    var isSelectedSheet = (idx === selectedIndex);
                    var attr = { className: "k-item k-state-default" };
                    var elementContent = [];

                    if (isSelectedSheet) {
                        attr.className += " k-state-active k-state-tab-on-top " + classNames.sheetsBarActive;
                    } else {
                        attr.className += " " + classNames.sheetsBarInactive;
                    }

                    if (isSelectedSheet && isInEditMode) {
                        elementContent.push(element("input", {
                            type: "text",
                            value: sheet.name(),
                            className: "k-textbox " + classNames.sheetsBarEditor,
                            maxlength: 50
                        }, []));
                    } else {
                        elementContent.push(element("span", {
                            className: "k-link",
                            title: sheet.name()
                        }, [dom.text(sheet.name())]));

                        var deleteIcon = element("span", {
                            className: "k-icon k-si-close"
                        }, []);

                        var deleteButton = element("button", {
                            className: "k-button k-button-icon"
                        }, [deleteIcon]);

                        elementContent.push(element("a", {
                            href: "#",
                            className: "k-link " + classNames.sheetsBarRemove
                        }, [deleteButton]));
                    }

                    sheetElements.push(element("li", attr, elementContent));
                }

                this._tree.render([this._addButton(),  this._createSheetsWrapper(sheetElements, renderScrollButtons)]);
            },

            _createSheetsWrapper: function(sheetElements, renderScrollButtons) {
                var element = kendo.dom.element;
                var childrenElements = [element("ul", { className: "k-reset k-tabstrip-items" }, sheetElements)];

                if (renderScrollButtons) {
                    childrenElements.push(element("span", {className: "k-button k-button-icon k-button-bare " + SheetsBar.classNames.sheetsBarPrev }, [
                        element("span", {className: "k-icon k-i-arrow-w"}, [])
                    ]));

                    childrenElements.push(element("span", {className: "k-button k-button-icon k-button-bare " + SheetsBar.classNames.sheetsBarNext }, [
                        element("span", {className: "k-icon k-i-arrow-e"}, [])
                    ]));
                }

                return element("div", { className: SheetsBar.classNames.sheetsBarItems }, childrenElements);
            },

            _createSortable: function() {
                this._sortable = new kendo.ui.Sortable(this.element, {
                    filter: kendo.format("ul li.{0},ul li.{1}", SheetsBar.classNames.sheetsBarActive, SheetsBar.classNames.sheetsBarInactive),
                    container: DOT + SheetsBar.classNames.sheetsBarItems,
                    axis: "x",
                    animation: false,
                    ignore: "input",
                    hint: function (element) {
                        var hint = $(element).clone();
                        return hint.wrap("<div class='k-widget k-tabstrip k-tabstrip-bottom k-spreadsheet-sheets-items-hint'><ul class='k-reset k-tabstrip-items'></ul></div>").closest("div");
                    }
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

            _onSheetRemove: function(e) {
                var removedSheetName = $(e.target).closest("li").text();

                if (this._editor) {
                    this._destroyEditor();
                    this._onSheetRename(this._editor.val());
                }

                this.trigger("remove", {name: removedSheetName});
            },

            _onSheetSelect: function(e) {
                var selectedSheetText = $(e.target).text();

                if ($(e.target).is(DOT + SheetsBar.classNames.sheetsBarEditor) || !selectedSheetText) {
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

            _onAddSelect: function() {
                this.trigger("select", {isAddButton: true});
            },

            _addButton: function() {
                var element = kendo.dom.element;
                return element("a", {
                    className: SheetsBar.classNames.sheetsBarAdd + " k-button k-button-icon"
                }, [element("span", {className: "k-sprite k-icon k-font-icon k-i-plus"}, [])]);
            },

            destroy: function() {
                this._sortable.destroy();
            },

            _scrollableAllowed: function() {
                var options = this.options;
                return options.scrollable && !isNaN(options.scrollable.distance);
            },

            _scrollSheetsToItem: function (item) {
                var that = this;
                var sheetsGroup = that._sheetsGroup();
                var currentScrollOffset = sheetsGroup.scrollLeft();
                var itemWidth = item.outerWidth();
                var itemOffset = that._isRtl ? item.position().left : item.position().left - sheetsGroup.children().first().position().left;
                var sheetsGroupWidth = sheetsGroup[0].offsetWidth;
                var sheetsGroupPadding = Math.ceil(parseFloat(sheetsGroup.css("padding-left")));
                var itemPosition;

                if (that._isRtl) {
                    if (itemOffset < 0) {
                        itemPosition = currentScrollOffset + itemOffset - (sheetsGroupWidth - currentScrollOffset) - sheetsGroupPadding;
                    } else if (itemOffset + itemWidth > sheetsGroupWidth) {
                        itemPosition = currentScrollOffset + itemOffset - itemWidth + sheetsGroupPadding * 2;
                    }
                } else {
                    if (currentScrollOffset + sheetsGroupWidth < itemOffset + itemWidth) {
                        itemPosition = itemOffset + itemWidth - sheetsGroupWidth + sheetsGroupPadding * 2;
                    } else if (currentScrollOffset > itemOffset) {
                        itemPosition = itemOffset - sheetsGroupPadding;
                    }
                }

                sheetsGroup.finish().animate({ "scrollLeft": itemPosition }, "fast", "linear", function () {
                    that._toggleScrollButtons();
                });
            },

            _sheetsGroup: function() {
                return this._sheetsWrapper().children("ul");
            },

            _sheetsWrapper: function() {
                return this.element.find(DOT + SheetsBar.classNames.sheetsBarItems);
            },

            _scrollSheetsByDelta: function (delta) {
                var that = this;
                var sheetsGroup = that._sheetsGroup();
                var scrLeft = sheetsGroup.scrollLeft();

                sheetsGroup.finish().animate({ "scrollLeft": scrLeft + delta }, "fast", "linear", function () {
                    if (that._nowScrollingSheets) {
                        that._scrollSheetsByDelta(delta);
                    } else {
                        that._toggleScrollButtons();
                    }
                });
            },

            _toggleScrollButtons: function () {
                var that = this;
                var ul = that._sheetsGroup();
                var wrapper = that._sheetsWrapper();
                var scrollLeft = ul.scrollLeft();

                wrapper.find(DOT + SheetsBar.classNames.sheetsBarPrev).toggle(that._isRtl ? scrollLeft < ul[0].scrollWidth - ul[0].offsetWidth - 1 : scrollLeft !== 0);
                wrapper.find(DOT + SheetsBar.classNames.sheetsBarNext).toggle(that._isRtl ? scrollLeft !== 0 : scrollLeft < ul[0].scrollWidth - ul[0].offsetWidth - 1);
            }
        });

        kendo.spreadsheet.SheetsBar = SheetsBar;
        $.extend(true, SheetsBar, { classNames: sheetsBarClassNames });
    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
