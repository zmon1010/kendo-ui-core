(function () {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer API", {
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

    test("play function should change the icon state", function () {
        var playButton = div.find("#play.k-button.k-button-icon span");
        mediaPlayer.play();
        ok(playButton.hasClass("k-i-pause"));
    });

    test("pause function should change the icon state", function () {
        var playButton = div.find("#play.k-button.k-button-icon span");
        mediaPlayer.pause();
        ok(playButton.hasClass("k-i-play"));
    });

    test("stop function should change the icon state", function () {
        var playButton = div.find("#play.k-button.k-button-icon span");
        mediaPlayer.stop();
        ok(playButton.hasClass("k-i-play"));
    });

    test("isPlaying should return correct result in all states", function () {
        var passed = 0;
        mediaPlayer.play();
        passed += +mediaPlayer.isPlaying();
        mediaPlayer.pause();
        passed += +!mediaPlayer.isPlaying();
        mediaPlayer.play();
        mediaPlayer.stop();
        passed += +!mediaPlayer.isPlaying();
        ok(passed === 3);
    });

    test("isPaused should return correct result in all states", function () {
        var passed = 0;
        mediaPlayer.play();
        passed += +!mediaPlayer.isPaused();
        mediaPlayer.pause();
        passed += +mediaPlayer.isPaused();
        mediaPlayer.play();
        mediaPlayer.stop();
        passed += +mediaPlayer.isPaused();
        ok(passed === 3);
    });

    test("seek function should properly set time in seconds internally", function () {
        mediaPlayer.seek(120 * 1000); //sec
        ok(mediaPlayer._media.currentTime === 120);
    });

    test("mute function should not change the volume", function () {
        mediaPlayer.volume(97);
        mediaPlayer.mute(true);
        ok(mediaPlayer.volume() === 97);
    });

    test("destroy function should stop playing", function () {
        mediaPlayer.play();
        mediaPlayer.destroy();
        ok(mediaPlayer.isPaused());
    });

    test("changing player source using the media function should update the title", function () {
        var titlebar = mediaPlayer.titlebar();
        mediaPlayer.media({ source: "http://localhost", title: "new title" });
        ok(titlebar.text() === "new title");
    });

    test("setting player source without title will still fallback to url when setting the titlebar text", function () {
        var titlebar = mediaPlayer.titlebar();
        mediaPlayer.media({ source: "http://localhost" });
        ok(titlebar.text() === "http://localhost");
    });

    test("media function should enable the dropdown if mutiple sources are passed", function () {
        mediaPlayer.media({ 
            title: "Test", 
            source: [{
                quality: "Q1", 
                url: "http://localhost" 
            }, {
                quality: "Q2",
                url: "http://localhost"
            }]
        });
        ok(mediaPlayer.toolbar().wrapper.is(":visible"));
    });    

    test("media function should disable the dropdown when single source is set", function () {
        mediaPlayer.media({ 
            title: "Test", 
            source: [{
                quality: "Q1", 
                url: "http://localhost" 
            }, {
                quality: "Q2",
                url: "http://localhost"
            }]
        });
        mediaPlayer.media({ 
            title: "Test", 
            source: "http://localhost"
        });   
        ok(mediaPlayer.dropdown().wrapper.is(":hidden"));
    });   
})();
