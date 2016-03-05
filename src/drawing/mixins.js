(function(f, define){
    define([ "./core" ], f);
})(function(){

(function () {

    // Imports ================================================================
    var kendo = window.kendo,
        deepExtend = kendo.deepExtend,
        defined = kendo.util.defined,
        g = kendo.geometry;

    // Constants ==============================================================
        var GRADIENT = "gradient";
        var IDENTITY_MATRIX_HASH = g.Matrix.IDENTITY.toString();

    // Mixins =================================================================
    var Paintable = {
        extend: function(proto) {
            proto.fill = this.fill;
            proto.stroke = this.stroke;
        },

        fill: function(color, opacity) {
            var options = this.options;

            if (defined(color)) {
                if (color && color.nodeType != GRADIENT) {
                    var newFill = {
                        color: color
                    };
                    if (defined(opacity)) {
                        newFill.opacity = opacity;
                    }
                    options.set("fill", newFill);
                } else {
                    options.set("fill", color);
                }

                return this;
            } else {
                return options.get("fill");
            }
        },

        stroke: function(color, width, opacity) {
            if (defined(color)) {
                this.options.set("stroke.color", color);

                if (defined(width)) {
                   this.options.set("stroke.width", width);
                }

                if (defined(opacity)) {
                   this.options.set("stroke.opacity", opacity);
                }

                return this;
            } else {
                return this.options.get("stroke");
            }
        }
    };

    var Traversable = {
        extend: function(proto, childrenField) {
            proto.traverse = function(callback) {
                var children = this[childrenField];

                for (var i = 0; i < children.length; i++) {
                    var child = children[i];

                    if (child.traverse) {
                        child.traverse(callback);
                    } else {
                        callback(child);
                    }
                }

                return this;
            };
        }
    };

    var Measurable = {
        extend: function(proto) {
            proto.bbox = this.bbox;
            proto.geometryChange = this.geometryChange;
        },

        bbox: function(transformation) {
            var combinedMatrix = g.toMatrix(this.currentTransform(transformation));
            var matrixHash = combinedMatrix ? combinedMatrix.toString() : IDENTITY_MATRIX_HASH;
            var bbox;

            if (this._bboxCache && this._matrixHash == matrixHash) {
                bbox = this._bboxCache.clone();
            } else {
                bbox = this._bbox(combinedMatrix);
                this._bboxCache = bbox ? bbox.clone() : null;
                this._matrixHash = matrixHash;
            }

            var strokeWidth = this.options.get("stroke.width");
            if (strokeWidth && bbox) {
                bbox.expand(strokeWidth / 2);
            }

            return bbox;
        },

        geometryChange: function() {
            delete this._bboxCache;
            this.trigger("geometryChange", {
                element: this
            });
        }
    };

    // Exports ================================================================
    deepExtend(kendo.drawing, {
        mixins: {
            Paintable: Paintable,
            Traversable: Traversable,
            Measurable: Measurable
        }
    });

})();

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
