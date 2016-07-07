(function (f, define) {
    define(["./kendo.data", "./kendo.slider", "./kendo.toolbar"], f);
})(function () {

    //todo: destroy, keep proxy instance, remove that if not necessary

    var __meta__ = { // jshint ignore:line
        id: "mediaplayer",
        name: "MediaPlayer",
        category: "web",
        description: "",
        depends: ["data", "slider", "toolbar"]
    };

    (function ($, undefined) {
        var kendo = window.kendo,
        CHANGE = "change",
        PROGRESS = "progress",
        ERROR = "error",
        STATE_PLAY = "k-i-play",
        STATE_PAUSE = "k-i-pause",
        TITLEBAR = "k-mediaplayer-titlebar",
        TITLE = "k-title",
        TOOLBAR = "k-mediaplayer-toolbar",
        SLIDER = "k-mediaplayer-seekbar",
        MEDIA = "k-mediaplayer-media",
        DOT = ".",
        ui = kendo.ui,
        Widget = kendo.ui.Widget,
        //extend = $.extend,
        proxy = $.proxy,
        //each = $.each,
        templates = {
            htmlPlayer: "<video class='" + MEDIA + "'> </video>",
            titleBar: "<div class='" + TITLEBAR + "'><span class='" + TITLE + "'>Video Title</span><a role='button' class='k-icon k-font-icon k-i-playlist-open' style='float: right;''>Open Playlist</a></div>",
            toolBar: "<div class='" + TOOLBAR + "'> </div>",
            slider: "<input class='" + SLIDER + "' value='0' />",
            toolTip: "#= kendo.toString(new Date(value), 'HH:mm:ss') #"
        },
        wrapper, slider, toolBar, titleBar,
        //rendering = {},
        DataSource = kendo.data.DataSource;


        var MediaPlayer = Widget.extend({
            init: function (element, options) {
                var that = this;

                wrapper = $(element),

                options = $.isArray(options) ? { dataSource: options } : options;

                Widget.fn.init.call(that, element, options);

                wrapper.addClass("k-mediaplayer k-widget");
            
                options = that.options;
                
                that._createHtmlPlayer(options);

                that._createTitlebar();

                that._createToolbar();

                that._createSlider();

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

            _msToTime: function(ms) {
                var baseTime = new Date(0);
                baseTime.setSeconds(ms);
                return baseTime;
            },

            _timeToSec: function(time) {
                var curTime = new Date(time).getTime();
                return curTime / 1000;
            },

            _createTitlebar: function() {
                var that = this;
                titleBar = wrapper.find(DOT + TITLEBAR);
                
                if (!titleBar || titleBar.length === 0) { 
                    wrapper.append(templates.titleBar);
                }
            },

            _createSlider: function() {
                var that = this;
                var sliderElement = wrapper.find(DOT + SLIDER);

                if (sliderElement.length === 0) { 
                    wrapper.append(templates.slider);
                }
                sliderElement = $(DOT + SLIDER);
                sliderElement.kendoSlider({
                    smallStep: 1000,
                    tickPlacement: "none",
                    showButtons: false,
                    change: function(e) {
                        that._media.currentTime = that._timeToSec(e.value);                          
                    },
                    tooltip: {
                        template: templates.toolTip
                    }
                });
                slider = sliderElement.data("kendoSlider");
            },

            _createToolbar: function () {
                var that = this;
                var toolBarElement = wrapper.find(DOT + TOOLBAR);

                if (toolBarElement.length === 0) { 
                    wrapper.append(templates.toolBar);
                    toolBarElement = $(DOT + TOOLBAR);
                    toolBarElement.width($(DOT + MEDIA).width());
                    toolBarElement.kendoToolBar({
                        resizable: true, 
                        click: proxy(that._toolbarClick, that),
                        items: [
                            { type: "button", id: "play", spriteCssClass: "k-icon k-font-icon k-i-play" },
                            { type: "separator" },
                            { 
                                template: "<span id='curSpan'>00:00:00</span> / <span id='maxSpan'>00:00:00</span>"
                            }
                        ]
                    });
                    toolBarElement.width("auto");
                } 
                toolBar = toolBarElement.data("kendoToolbar");
            },

            _toolbarClick: function (e) {
                var that = this;
                var target = $(e.target).children().first();
                var isPaused = that._media.paused;

                if (e.id === "play") {
                    if (isPaused) {
                        that.play();
                        target
                            .removeClass(STATE_PLAY)
                            .addClass(STATE_PAUSE);                        
                    } 
                    else {
                        that.pause();
                        target
                            .removeClass(STATE_PAUSE)
                            .addClass(STATE_PLAY);   
                    }
                }
            },

            _mediaTimeUpdate: function(e) {
                var that = this;
                var currentTime = that._msToTime(that._media.currentTime);
                $("#curSpan").text(kendo.toString(currentTime, 'HH:mm:ss'));
                slider.value(that._media.currentTime * 1000);
            },

            _mediaDurationChange: function(e) {
                var that = this;
                var durationTime = that._msToTime(that._media.duration);
                $("#maxSpan").text(kendo.toString(durationTime, 'HH:mm:ss'));
                slider.setOptions({
                    min: new Date(0).getTime(),
                    max: durationTime.getTime()
                });
                slider._distance = Math.round(slider.options.max - slider.options.min);
                slider._resize();
            },

            _createHtmlPlayer: function (options) {
                var that = this;
                wrapper.append(templates.htmlPlayer);
                that._media = wrapper.find(DOT + MEDIA)[0];
                $(that._media).css({
                    width: wrapper.width(),
                    height: wrapper.height() 
                });

                if (options.autoPlay) {
                    $(that._media).attr("autoplay", "");   
                }

                that._media.ontimeupdate = proxy(that._mediaTimeUpdate, that);
                that._media.ondurationchange = proxy(that._mediaDurationChange, that);                
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
                    wrapper.find(DOT + MEDIA).append(sourceElement);
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
