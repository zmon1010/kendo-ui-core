(function(f, define){
    define([
        "../kendo.core",
        "../kendo.binder",
        "../kendo.window",
        "../kendo.list",
        "../kendo.tabstrip"
    ], f);
})(function(){

(function(kendo) {
    var Command = kendo.spreadsheet.Command = kendo.data.ObservableObject.extend({
        range: function(range) {
            if (range !== undefined) {
                this._range = range;
            }

            return this._range;
        },
        redo: function() {
            this.exec();
        }
    });

    var PropertyChangeCommand = kendo.spreadsheet.PropertyChangeCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this);
            this._property = options.property;
            this._value = options.value;
        },
        exec: function() {
            var range = this.range();
            this._state = range[this._property]();
            range[this._property](this._value);
        },
        undo: function() {
            this.range()[this._property](this._state);
        }
    });

    var EditCommand = kendo.spreadsheet.EditCommand = PropertyChangeCommand.extend({
        init: function(options) {
            options.property = "_editableValue";
            PropertyChangeCommand.fn.init.call(this, options);
        }
    });

    var PopupCommand = kendo.spreadsheet.PopupCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this);
            this._className = options && options.className;
            this._dialogOptions = options && options.dialogOptions;
        },
        popup: function() {
            return this._popup;
        },
        template: "",
        exec: function() {
            this._popup = $("<div class='k-spreadsheet-window k-action-window' />")
                .addClass(this._className || "")
                .append(this.template)
                .appendTo(document.body)
                .kendoWindow($.extend({
                    scrollable: false,
                    resizable: false,
                    maximizable: false,
                    modal: true,
                    width: 400,
                    title: this.title,
                    open: function() {
                        this.center();
                    },
                    deactivate: function() {
                        this.destroy();
                    }
                }, this._dialogOptions))
                .data("kendoWindow");

            kendo.bind(this._popup.element, this);
        }
    });

    var FormatCellsCommand = kendo.spreadsheet.FormatCellsCommand = PopupCommand.extend({
        init: function(options) {
            options = options || {};
            options.className = "k-spreadsheet-format-cells";

            PopupCommand.fn.init.call(this, options);

            this._immediate = "format" in options;
            this._allFormats = (options.formats || this.options.formats).slice(0);
            this._useCategory(this.categoryFilter());
            this.format = options.format || this.formats[0].value;
        },
        options: {
            formats: [
                { category: "Number", value: "?.00%", name: "100.00%" },
                { category: "Currency", value: "$?", name: "U.S. Dollar" },
                { category: "Date", value: "m/d", name: "3/14" },
                { category: "Date", value: "m/d/yy", name: "3/14/01" },
                { category: "Date", value: "mm/dd/yy", name: "03/14/01" },
                { category: "Date", value: "d-mmm", name: "14-Mar" },
                { category: "Date", value: "d-mmm-yy", name: "14-Mar-01" },
                { category: "Date", value: "dd-mmm-yy", name: "14-Mar-01" },
                { category: "Date", value: "mmm-yy", name: "Mar-01" },
                { category: "Date", value: "mmmm-yy", name: "March-01" },
                { category: "Date", value: "mmmm dd, yyyy", name: "March 14, 2001" },
                { category: "Date", value: "m/d/yy hh:mm AM/PM", name: "3/14/01 1:30 PM" },
                { category: "Date", value: "m/d/yy h:mm", name: "3/14/01 13:30" },
                { category: "Date", value: "mmmmm", name: "M" },
                { category: "Date", value: "mmmmm-yy", name: "M-01" },
                { category: "Date", value: "m/d/yyyy", name: "3/14/2001" },
                { category: "Date", value: "d-mmm-yyyy", name: "14-Mar-2001" }
            ]
        },
        _useCategory: function(category) {
            var formats = this._allFormats.filter(function(x) { return x.category == category; });
            this.set("formats", formats);
            this._category = category;
        },
        categoryFor: function(format) {
            var formats = this._allFormats;
            var category = formats[0].category;

            for (var i = 0; i < formats.length; i++) {
                if (formats[i].format == format) {
                    category = formats[i].category;
                    break;
                }
            }

            return category;
        },
        categoryFilter: function(category) {
            if (category !== undefined) {
                this._useCategory(category);
            }

            return this._category || this.categoryFor(this.format);
        },
        categories: function() {
            var category = function (x) { return x.category; };
            var unique = function (x, index, self) { return self.indexOf(x) === index; };

            return this._allFormats.map(category).filter(unique);
        },
        preview: function() {
            var format = this.get("format");
            var value = this.range().value() || 0;

            if (format && format.length) {
                // get formatted text from virtual dom node
                value = kendo.spreadsheet.formatting.format(value, format);
                return value.children[0].nodeValue;
            } else {
                return value;
            }
        },
        _apply: function() {
            var range = this.range();
            this._state = range.format();
            range.format(this.format);
        },
        exec: function() {
            if (this._immediate) {
                this._apply();
            } else {
                var range = this.range();
                this.format = range.format();

                if (range.value() instanceof Date) {
                    this.categoryFilter("Date");
                }

                PopupCommand.fn.exec.call(this);
            }
        },
        undo: function() {
            this.range().format(this._state);
        },
        redo: function() {
            this.range().format(this.format);
        },
        apply: function() {
            this._apply();
            this.close();
        },
        close: function() {
            this.popup().close();
        },
        title: "Format Cells",
        template: "<button class='k-button k-primary' data-bind='click: apply'>Apply</button>" +

                  "<div class='k-spreadsheet-preview' data-bind='text: preview' />" +

                  "<div class='k-simple-tabs' " +
                      "data-role='tabstrip' " +
                      "data-bind='source: categories, value: categoryFilter' " +
                      "data-animation='false' />" +

                  "<script type='text/x-kendo-template' id='format-item-template'>" +
                      "#: data.name #" +
                  "</script>" +

                  "<ul data-role='staticlist' tabindex='0' " +
                      "class='k-list k-reset' " +
                      "data-template='format-item-template' " +
                      "data-value-primitive='true' " +
                      "data-value-field='value' " +
                      "data-bind='source: formats, value: format' />"
    });

    var BorderChangeCommand = kendo.spreadsheet.BorderChangeCommand = Command.extend({
        init: function(options) {
            Command.fn.init.call(this);
            this._type = options.border;
            this._style = options.style;
        },
        exec: function() {
            this[this._type](this._style);
        },
        undo: function() {
            //TODO
        },
        noBorders: function() {
            this.range().borderLeft(null).borderTop(null).borderRight(null).borderBottom(null);
        },
        allBorders: function(style) {
            this.range().borderLeft(style).borderTop(style).borderRight(style).borderBottom(style);
        },
        leftBorder: function(style) {
            this.range().leftColumn().borderLeft(style);
        },
        rightBorder: function(style) {
            this.range().rightColumn().borderRight(style);
        },
        topBorder: function(style) {
            this.range().topRow().borderTop(style);
        },
        bottomBorder: function(style) {
            this.range().bottomRow().borderBottom(style);
        },
        outsideBorders: function(style) {
            var range = this.range();

            range.leftColumn().borderLeft(style);
            range.topRow().borderTop(style);
            range.rightColumn().borderRight(style);
            range.bottomRow().borderBottom(style);
        },
        insideBorders: function(style) {
            this.allBorders(style);
            this.outsideBorders(null);
        },
        insideHorizontalBorders: function(style) {
            var range = this.range();

            range.borderBottom(style);
            range.bottomRow().borderBottom(null);
        },
        insideVerticalBorders: function(style) {
            var range = this.range();

            range.borderRight(style);
            range.rightColumn().borderRight(null);
        }
    });

})(kendo);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
