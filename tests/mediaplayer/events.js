(function () {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer initialization", {
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

    test("pause event should be fired", function () {
        mediaPlayer.play();
        mediaPlayer.bind("pause", function (e) {
            ok(true);
        });
        mediaPlayer.pause();
    });

    test("ready event should be fired", function () {
        mediaPlayer.bind("ready", function (e) {
            ok(true);
        });
        mediaPlayer._media = null;
        mediaPlayer.media({ title: "fakeTitle2", source: "http://localhost2" });
        mediaPlayer._media.oncanplay();
    });

    test("volume event should be fired", function () {
        mediaPlayer.bind("volumeChange", function (e) {
            ok(true);
        });
        mediaPlayer.mute(true);
    });

})();
