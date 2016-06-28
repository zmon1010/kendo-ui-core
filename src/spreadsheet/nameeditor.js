(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    if (kendo.support.browser.msie && kendo.support.browser.version < 9) {
        return;
    }

    var $ = kendo.jQuery;

    var CLASS_NAMES = {
        input: "k-spreadsheet-name-editor",
        list: "k-spreadsheet-name-list"
    };

    var NameEditor = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);
            element.addClass(CLASS_NAMES.input);
            this.input = $("<input />").appendTo(element)
                .on("keydown", this._on_keyDown.bind(this))
                .on("focus", this._on_focus.bind(this));
            var icon = $("<span class='k-icon k-i-arrow-s'></span>")
                .appendTo(element);
            icon.on("click", function(){
                var data = [];
                this._workbook.forEachName(function(_, def){
                    data.push({ name: def.name, value: def.value });
                });
                var dataSource = new kendo.data.DataSource({ data: data });
                this.listWidget().setDataSource(dataSource);
                dataSource.read();
                this._popup.open();
            }.bind(this));
        },
        value: function(val) {
            if (val === undefined) {
                return this.input.val();
            } else {
                this.input.val(val);
            }
        },
        listWidget: function() {
            if (!this._list) {
                this._list = new kendo.ui.StaticList(
                    $("<ul />")
                        .addClass(CLASS_NAMES.list)
                        .insertAfter(this.input),
                    {
                        autoBind: false,
                        selectable: true,
                        change: this._on_listChange.bind(this),
                        dataValueField: "name",
                        template: "#:data.name#"
                    }
                );
                this._popup = new kendo.ui.Popup(this._list.element, {
                    anchor: this.element
                });
            }
            return this._list;
        },
        // blur: function() {
        //     this.input.blur();
        // },
        // focus: function() {
        //     this.input.focus();
        //     this.input.select();
        // },

        _on_keyDown: function(ev) {
            switch (ev.keyCode) {
              case 27:
                this.input.val(this._prevValue);
                this.trigger("cancel");
                break;
              case 13:
                this.trigger("enter");
                break;
            }
        },
        _on_focus: function() {
            this._prevValue = this.input.val();
        },
        _on_listChange: function() {
            
        }
    });

    kendo.spreadsheet.NameEditor = NameEditor;
})(window.kendo);
}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
