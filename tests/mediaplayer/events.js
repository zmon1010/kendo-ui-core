(function () {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer initialization", {
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

    test("pause event should be fired", function () {
        mediaPlayer.bind("pause", function (e) {
            ok(true);
        });
        mediaPlayer.pause();
    });

    test("stop event should be fired", function () {
        mediaPlayer.bind("end", function (e) {
            ok(true);
        });
        mediaPlayer.stop();
    });

    test("volume event should be fired", function () {
        mediaPlayer.bind("volumeChange", function (e) {
            ok(true);
        });
        mediaPlayer.mute(true);
    });

})();
