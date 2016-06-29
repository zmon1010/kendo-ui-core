(function (f, define) {
    define(["./kendo.data", "./kendo.slider"], f);
})(function () {

    var __meta__ = { // jshint ignore:line
        id: "mediaplayer",
        name: "MediaPlayer",
        category: "web",
        description: "",
        depends: ["data", "slider"]
    };

    (function ($, undefined) {
        var kendo = window.kendo,
        CHANGE = "change",
        PROGRESS = "progress",
        ERROR = "error",
        ui = kendo.ui,
        Widget = kendo.ui.Widget,
        //extend = $.extend,
        proxy = $.proxy,
        //each = $.each,
        templates = {
            htmlPlayer: "<video class='k-mediaplayer-media' width='320' height='240'> </video>"
        },
        //rendering = {},
        DataSource = kendo.data.DataSource;


        var MediaPlayer = Widget.extend({
            init: function (element, options) {
                var that = this;

                options = $.isArray(options) ? { dataSource: options } : options;

                Widget.fn.init.call(that, element, options);

                options = that.options;

                that._createHtmlPlayer();

                that._dataSource();

                if (that.options.autoBind) {
                    that.dataSource.fetch();
                }

                kendo.notify(that);
            },

            events: [

            ],

            options: {
                name: "MediaPlayer",
                autoBind: true,
                autoPlay: false,
                autoRepeat: false,
                volume: 100,
                fullScreen: false,
                mute: false,
                forwardSeek: false
            },

            _initData: function (options) {
                //var that = this;

                if (options.dataSource) {
                }
            },

            setDataSource: function (dataSource) {
                this.options.dataSource = dataSource;
                this._dataSource();

                if (this.options.autoBind) {
                    dataSource.fetch();
                }
            },

            _createHtmlPlayer: function () {
                var that = this;
                that.element.append(templates.htmlPlayer);
                that._media = that.element.find(".k-mediaplayer-media")[0];
            },

            setOptions: function (options) {
                if ("dataSource" in options) {
                    this._initData(options);
                }
                Widget.fn.setOptions.call(this, options);
            },

            destroy: function () {
                var that = this;
                Widget.fn.destroy.call(that);

                that._unbindDataSource();

                kendo.destroy(that.element);
            },

            play: function () {
                this._media.play();
                return this;
            },

            pause: function () {
                this._media.pause();
                return this;
            },

            fullScreen: function (value) {
                return this;
            },

            _dataSource: function () {
                var that = this;

                if (that.dataSource && that._refreshHandler) {
                    that._unbindDataSource();
                } else {
                    that._refreshHandler = proxy(that._refresh, that);
                    that._progressHandler = proxy(that._progress, that);
                    that._errorHandler = proxy(that._error, that);
                }

                that.dataSource = DataSource.create(that.options.dataSource)
                                    .bind(CHANGE, that._refreshHandler)
                                    .bind(PROGRESS, that._progressHandler)
                                    .bind(ERROR, that._errorHandler);
            },

            _unbindDataSource: function () {
                var that = this;

                that.dataSource.unbind(CHANGE, that._refreshHandler)
                                .unbind(PROGRESS, that._progressHandler)
                                .unbind(ERROR, that._errorHandler);
            },

            _refresh: function () {
                var data = this.dataSource.data()
                if (data && data[0]) {

                    var sourceElement = document.createElement("source");
                    sourceElement.setAttribute("src", data[0].url);
                    this.element.find(".k-mediaplayer-media").append(sourceElement);
                }
            },

            _error: function () {
            },

            _progress: function () {
            },

        });

        ui.plugin(MediaPlayer);

    })(window.kendo.jQuery);

    return window.kendo;

}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) { (a3 || a2)(); });
