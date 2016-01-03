(function(f, define){
    define([ "../kendo.core", "./main" ], f);
})(function(){

(function ($) {

    // Imports =================================================================
    var doc = document,

        kendo = window.kendo,
        Class = kendo.Class,

        util = kendo.util,
        defined = util.defined;

    // Text metrics calculations ===============================================
    var LRUCache = Class.extend({
        init: function(size) {
            this._size = size;
            this._length = 0;
            this._map = {};
        },

        put: function(key, value) {
            var lru = this,
                map = lru._map,
                entry = { key: key, value: value };

            map[key] = entry;

            if (!lru._head) {
                lru._head = lru._tail = entry;
            } else {
                lru._tail.newer = entry;
                entry.older = lru._tail;
                lru._tail = entry;
            }

            if (lru._length >= lru._size) {
                map[lru._head.key] = null;
                lru._head = lru._head.newer;
                lru._head.older = null;
            } else {
                lru._length++;
            }
        },

        get: function(key) {
            var lru = this,
                entry = lru._map[key];

            if (entry) {
                if (entry === lru._head && entry !== lru._tail) {
                    lru._head = entry.newer;
                    lru._head.older = null;
                }

                if (entry !== lru._tail) {
                    if (entry.older) {
                        entry.older.newer = entry.newer;
                        entry.newer.older = entry.older;
                    }

                    entry.older = lru._tail;
                    entry.newer = null;

                    lru._tail.newer = entry;
                    lru._tail = entry;
                }

                return entry.value;
            }
        }
    });

    var defaultMeasureBox = $("<div style='position: absolute !important; top: -4000px !important; width: auto !important; height: auto !important;" +
                      "padding: 0 !important; margin: 0 !important; border: 0 !important;" +
                      "line-height: normal !important; visibility: hidden !important; white-space: nowrap!important;' />")[0];

    function zeroSize() {
        return { width: 0, height: 0, baseline: 0 };
    }

    var TextMetrics = Class.extend({
        init: function(options) {
            this._cache = new LRUCache(1000);
            this._initOptions(options);
        },

        options: {
            baselineMarkerSize: 1
        },

        measure: function(text, style, box) {
            if (!text) {
                return zeroSize();
            }

            var styleKey = util.objectKey(style),
                cacheKey = util.hashKey(text + styleKey),
                cachedResult = this._cache.get(cacheKey);

            if (cachedResult) {
                return cachedResult;
            }

            var size = zeroSize();
            var measureBox = box ? box : defaultMeasureBox;
            var baselineMarker = this._baselineMarker().cloneNode(false);

            for (var key in style) {
                var value = style[key];
                if (defined(value)) {
                    measureBox.style[key] = value;
                }
            }

            $(measureBox).text(text);
            measureBox.appendChild(baselineMarker);
            doc.body.appendChild(measureBox);

            if ((text + "").length) {
                size.width = measureBox.offsetWidth - this.options.baselineMarkerSize;
                size.height = measureBox.offsetHeight;
                size.baseline = baselineMarker.offsetTop + this.options.baselineMarkerSize;
            }

            if (size.width > 0 && size.height > 0) {
                this._cache.put(cacheKey, size);
            }

            measureBox.parentNode.removeChild(measureBox);

            return size;
        },

        _baselineMarker: function() {
            return $("<div class='k-baseline-marker' " +
              "style='display: inline-block; vertical-align: baseline;" +
              "width: " + this.options.baselineMarkerSize + "px; height: " + this.options.baselineMarkerSize + "px;" +
              "overflow: hidden;' />")[0];
        }

    });

    TextMetrics.current = new TextMetrics();

    function measureText(text, style, measureBox) {
        return TextMetrics.current.measure(text, style, measureBox);
    }

    // Preloads specified fonts and calls callback when:
    // a) done
    // b) not supported
    function loadFonts(fonts, callback) {
        var promises = [];

        if (fonts.length > 0 && document.fonts) {
            try {
                promises = fonts.map(function(font) {
                    return document.fonts.load(font);
                });
            } catch(e) {
                // Silence font-loading errors
                kendo.logToConsole(e);
            }

            Promise.all(promises).then(callback, callback);
        } else {
            callback();
        }
    }

    // Exports ================================================================
    kendo.util.TextMetrics = TextMetrics;
    kendo.util.LRUCache = LRUCache;
    kendo.util.loadFonts = loadFonts;
    kendo.util.measureText = measureText;

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
