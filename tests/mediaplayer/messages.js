(function () {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer localization", {
        setup: function () {
            div = $("<div />").appendTo(QUnit.fixture);
            mediaPlayer = new MediaPlayer(div, { media: { title: "fakeTitle", source: "http://localhost" } });
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
        mediaPlayer._playStateToggle(true);
        ok(
            mediaPlayer._playButton.attr("title") === mediaPlayer.options.messages.pause ||
            mediaPlayer._playButton.parent().find("#play").attr("title") === mediaPlayer.options.messages.pause
        );
    });

    test("pause tooltip is set properly", function () {
        mediaPlayer._playStateToggle(false);
        ok(
            mediaPlayer._playButton.attr("title") === mediaPlayer.options.messages.play ||
            mediaPlayer._playButton.parent().attr("title") === mediaPlayer.options.messages.play
        );
    });

    test("mute tooltip is set properly", function () {
        ok(
            mediaPlayer._volumeButton.children("span").attr("title") === mediaPlayer.options.messages.mute ||
            mediaPlayer._volumeButton.attr("title") === mediaPlayer.options.messages.mute
        );
    });

    test("unmute tooltip is set properly", function () {
        mediaPlayer.mute(true);
        ok(
            mediaPlayer._volumeButton.children("span").attr("title") === mediaPlayer.options.messages.unmute ||
            mediaPlayer._volumeButton.attr("title") === mediaPlayer.options.messages.unmute
        );
    });

    test("fullscreen tooltip is set properly", function () {
        ok(
            mediaPlayer._fullscreenButton.children("span").attr("title") === mediaPlayer.options.messages.fullscreen ||
            mediaPlayer._fullscreenButton.attr("title") === mediaPlayer.options.messages.fullscreen
        );
    });

    test("quality tooltip is set properly", function () {
        ok(mediaPlayer.dropdown().wrapper.attr("title") === mediaPlayer.options.messages.quality);
    });
})();
