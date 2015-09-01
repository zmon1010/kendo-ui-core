(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var DOT = ".";
        var sheetsBarClassNames = {
            sheetsBarActive: "k-spreadsheet-sheets-bar-active",
            sheetsBarInactive: "k-spreadsheet-sheets-bar-inactive",
            sheetsBarAdd: "k-spreadsheet-sheets-bar-add"
        };

        var SheetsBar = kendo.ui.Widget.extend({
            init: function(element, options) {
                kendo.ui.Widget.call(this, element, options);

                element = this.element;

                this.tree = new kendo.dom.Tree(element[0]);

                this.tree.render([this._addButton()]);

                element.on("click", "li", this._onSheetSelect.bind(this));

                element.on("click", DOT + sheetsBarClassNames.sheetsBarAdd, this._onAddSelect.bind(this));
            },

            options: {
                name: "SheetsBar"
            },

            events: [
                "select"
            ],

            //TODO:
            //1) add sheet -- ready
            //2) remove sheet from sheet tab
            //3) reorder sheets
            //4) rename sheet with double click
            //5) scroll when more sheets are rendered

            renderSheets: function(sheets, selectedIndex) {
                var dom = kendo.dom;
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

                    var elementContent = dom.element("span", {}, [dom.text(sheet.name())]);
                    sheetElements.push(dom.element("li", args, [elementContent]));
                }

                this.tree.render([this._addButton(), dom.element("ul", {}, sheetElements)]);
            },

            _onSheetSelect: function(e) {
                this.trigger("select", {name: $(e.target).text(), isAddButton: false});
            },

            _onAddSelect: function(e) {
                this.trigger("select", {isAddButton: true});
            },

            _addButton: function() {
                var dom = kendo.dom;
                return dom.element("a", {className: sheetsBarClassNames.sheetsBarAdd}, [dom.element("span", {className: "k-sprite k-icon k-font-icon k-i-plus"}, [])]);
            }
        });

        kendo.spreadsheet.SheetsBar = SheetsBar;
        $.extend(true, SheetsBar, { classNames: sheetsBarClassNames });
    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
