(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

    (function(kendo) {
        var $ = kendo.jQuery;
        var sheetsBarClassNames = {
            sheetsBarActive: "k-spreadsheet-sheets-bar-active",
            sheetsBarInactive: "k-spreadsheet-sheets-bar-inactive"
        };

        var SheetsBar = kendo.ui.Widget.extend({
            init: function(element, options) {
                kendo.ui.Widget.call(this, element, options);

                element = this.element;

                this.tree = new kendo.dom.Tree(element[0]);

                element.on("click", this._onSelect.bind(this));
            },

            options: {
                name: "SheetsBar"
            },

            events: [
                "select"
            ],

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
                    var arguments = idx === selectedIndex ? { class: sheetsBarClassNames.sheetsBarActive } : { class: sheetsBarClassNames.sheetsBarInactive };

                    var elementContent = dom.element("span", {}, [dom.text(sheet.name())]);
                    sheetElements.push(dom.element("li", arguments, [elementContent]));
                }

                this.tree.render([dom.element("ul", {}, sheetElements)]);
            },

            _onSelect: function(e) {
                this.trigger("select", {name: $(e.target).text()});
            }
        });

        kendo.spreadsheet.SheetsBar = SheetsBar;
        $.extend(true, SheetsBar, { classNames: sheetsBarClassNames });
    })(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
