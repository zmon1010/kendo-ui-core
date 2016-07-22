(function () {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer localization", {
        setup: function () {
            div = $("<div />").appendTo(QUnit.fixture);
            mediaPlayer = new MediaPlayer(div, { media: { title: "fakeTitle", source: "fakeUrl.mp4" } });
            htmlPlayerMock = {
                muted: false,
                currentTime: 0,
                duration: 0,
                volume: 0,

                play: function () { },
                pause: function () { },
                remove: function () { }
            };
            mediaPlayer._media = htmlPlayerMock;
        },
        teardown: function () {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("play tooltip is set properly", function () {
        var el = mediaPlayer.toolbar().element;

        mediaPlayer._playStateToggle(true);
        ok(
            el.find("#play span").attr("title") === mediaPlayer.options.messages.pause ||
            el.find("#play").attr("title") === mediaPlayer.options.messages.pause
        );
    });

    test("pause tooltip is set properly", function () {
        var el = mediaPlayer.toolbar().element;

        mediaPlayer._playStateToggle(false);
        ok(
            el.find("#play span").attr("title") === mediaPlayer.options.messages.play ||
            el.find("#play").attr("title") === mediaPlayer.options.messages.play
        );
    });

    test("mute tooltip is set properly", function () {
        var el = mediaPlayer.toolbar().element;

        ok(
            el.find("#volume span").attr("title") === mediaPlayer.options.messages.mute ||
            el.find("#volume").attr("title") === mediaPlayer.options.messages.mute
        );
    });

    test("fullscreen tooltip is set properly", function () {
        var el = mediaPlayer.toolbar().element;

        ok(
            el.find("#fullscreen span").attr("title") === mediaPlayer.options.messages.fullscreen ||
            el.find("#fullscreen").attr("title") === mediaPlayer.options.messages.fullscreen
        );
    });

    test("volume tooltip is set properly", function () {
        ok(mediaPlayer.toolbar().element.find("#volumeTemplate").attr("title") === mediaPlayer.options.messages.volume);
    });

    test("quality tooltip is set properly", function () {
        ok(mediaPlayer.dropdown().wrapper.attr("title") === mediaPlayer.options.messages.quality);
    });
})();
