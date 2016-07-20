(function() {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer initialization", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture); 
            mediaPlayer = new MediaPlayer(div);
            htmlPlayerMock = {
                _isPlaying: false,
                muted: false,
                currentTime: 0,
                duration: 0,
                volume: 0,

                play: function() {
                    _isPlaying = true;
                },
                pause: function() {
                    _isPlaying = false;
                },
                remove: function() {
                }
            };
            mediaPlayer._media = htmlPlayerMock;
            mediaPlayer._currentUrl = "http://something.mp4";
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("pause event should be fired", function() {
        mediaPlayer.bind("pause", function(e) {
            ok(true);
        });
        mediaPlayer.pause();
    });

    test("stop event should be fired", function() {
        mediaPlayer.bind("end", function(e) {
            ok(true);
        });
        mediaPlayer.stop();
    });

    test("volume event should be fired", function() {
        mediaPlayer.bind("volumeChange", function(e) {
            ok(true);
        });
        mediaPlayer.mute(true);
    });

})();
