(function(f, define){
    define([ "../kendo.core" ], f);
})(function(){

(function(kendo) {
    var FormulaInput = kendo.ui.Widget.extend({
        init: function(element, options) {
            kendo.ui.Widget.call(this, element, options);

            element = this.element;

            element.addClass("k-spreadsheet-formula-input")
                   .attr("contenteditable", true);

            if (this.options.relative === "absolute") {
                //make element absolute positioned
            }

            this.element.on("blur", this._blur.bind(this));
        },

        options: {
            name: "FormulaInput",
            position: "relative"
        },

        events: [
            "change"
        ],

        _blur: function(e) {
            this.trigger("change", {
                value: this.element.html()
            });
        },

        setup: function(options) {
            this.value("test"); //options.value);
            this.position(options.rectangle);
        },

        position: function(rectangle) {
            this.element
                .css("position", "absolute")
                .offset({
                    top: rectangle.top,
                    left: rectangle.left
                });
        },

        value: function(value) {
            if (value === undefined) {
                return this.element.html();
            }

            this.element.html(value);
        },

        destroy: function() {
        }
    });

    kendo.spreadsheet.FormulaInput = FormulaInput;
})(kendo);
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
