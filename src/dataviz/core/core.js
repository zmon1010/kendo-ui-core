(function(f, define){
    define([
        "./kendo-core"
    ], f);
})(function(){

(function ($) {

    var dataviz = kendo.dataviz;
    var services = dataviz.services;
    var draw = kendo.drawing;

    dataviz.ExportMixin = {
        extend: function(proto, skipLegacy) {
            if (!proto.exportVisual) {
                throw new Error("Mixin target has no exportVisual method defined.");
            }

            proto.exportSVG = this.exportSVG;
            proto.exportImage = this.exportImage;
            proto.exportPDF = this.exportPDF;

            if (!skipLegacy) {
                proto.svg = this.svg;
                proto.imageDataURL = this.imageDataURL;
            }
        },

        exportSVG: function(options) {
            return draw.exportSVG(this.exportVisual(), options);
        },

        exportImage: function(options) {
            return draw.exportImage(this.exportVisual(options), options);
        },

        exportPDF: function(options) {
            return draw.exportPDF(this.exportVisual(), options);
        },

        svg: function() {
            if (draw.svg.Surface) {
                return draw.svg.exportGroup(this.exportVisual());
            } else {
                throw new Error("SVG Export failed. Unable to export instantiate kendo.drawing.svg.Surface");
            }
        },

        imageDataURL: function() {
            if (!kendo.support.canvas) {
                return null;
            }

            if (draw.canvas.Surface) {
                var container = $("<div />").css({
                    display: "none",
                    width: this.element.width(),
                    height: this.element.height()
                }).appendTo(document.body);

                var surface = new draw.canvas.Surface(container[0]);
                surface.draw(this.exportVisual());
                var image = surface._rootElement.toDataURL();

                surface.destroy();
                container.remove();

                return image;
            } else {
                throw new Error("Image Export failed. Unable to export instantiate kendo.drawing.canvas.Surface");
            }
        }
    };

    services.IntlService.register({
       format: function(format) {
           return kendo.format.apply(null, [format].concat(Array.prototype.slice.call(arguments, 1)));
       },
       toString: kendo.toString,
       parseDate: kendo.parseDate
    });

    services.TemplateService.register({
       compile: kendo.template
    });

    dataviz.Point2D = dataviz.Point;
    dataviz.Box2D = dataviz.Box;
    dataviz.mwDelta = function(e) {
        return dataviz.mousewheelDelta(e.originalEvent);
    };

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });