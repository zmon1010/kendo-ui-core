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
            sheetsBarItems: "k-spreadsheet-sheets-items"
        };

        var SheetsBar = kendo.ui.Widget.extend({
            init: function(element, options) {
                kendo.ui.Widget.call(this, element, options);

                element = this.element;

                this._tree = new kendo.dom.Tree(element[0]);

                this._tree.render([this._addButton(), this._sheetsWrapper([])]);

                this._createSortable();

                this._sortable.bind("end", this._onSheetReorder.bind(this));

                element.on("click", "li", this._onSheetSelect.bind(this));

                element.on("click", DOT + sheetsBarClassNames.sheetsBarAdd, this._onAddSelect.bind(this));
            },

            options: {
                name: "SheetsBar"
            },

            events: [
                "select",
                "reorder"
            ],

            //TODO:
            //1) add sheet -- ready
            //2) remove sheet from sheet tab
            //3) reorder sheets --ready
            //4) rename sheet with double click
            //5) scroll when more sheets are rendered

            renderSheets: function(sheets, selectedIndex) {
                var dom = kendo.dom;
                var element = dom.element;
                var idx;
                var sheetElements = [];

                if (!sheets || selectedIndex < 0) {
                    return;
                }

                this._sheets = sheets;
                this._selectedIndex = selectedIndex;

                for (idx = 0; idx < this._sheets.length; idx++) {
                    var sheet = this._sheets[idx];
                    var args = idx === selectedIndex ? { className: sheetsBarClassNames.sheetsBarActive } : { className: sheetsBarClassNames.sheetsBarInactive };

                    var elementContent = element("span", {}, [dom.text(sheet.name())]);
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
                    animation: false
                });
            },

            _onSheetReorder: function(e) {
                e.preventDefault();
                this.trigger("reorder", {oldIndex: e.oldIndex, newIndex: e.newIndex});
            },

            _onSheetSelect: function(e) {
                this.trigger("select", {name: $(e.target).text(), isAddButton: false});
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
