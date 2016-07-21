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

    test("attaches a mediaplayer object to a target", function () {
        ok(div.data("kendoMediaPlayer") instanceof MediaPlayer);
    });

    test("adds css classes to wrapper", function () {
        ok(mediaPlayer.element.is(".k-mediaplayer.k-widget"));
    });

    test("adds toolbar widget", function () {
        ok(mediaPlayer.toolbar().element.is(".k-mediaplayer-toolbar.k-toolbar"));
    });

    test("adds volume slider widget", function () {
        ok(mediaPlayer._volumeSlider.wrapper.is(".k-mediaplayer-volume.k-slider"));
    });

    test("adds seekbar slider widget", function () {
        ok(mediaPlayer._slider.wrapper.is(".k-mediaplayer-seekbar.k-slider"));
    });

    test("adds titlebar element", function () {
        ok(mediaPlayer._titleBar.is(".k-mediaplayer-titlebar"));
    });

    test("adds play/pause toolbar button", function () {
        ok(mediaPlayer.toolbar().options.items.find(function (el) {
            return el.id === "play";
        }));
    });

    test("adds volume toolbar button", function () {
        ok(mediaPlayer.toolbar().options.items.find(function (el) {
            return el.id === "volume";
        }));
    });

    test("adds dropdown template to toolbar", function () {
        ok(mediaPlayer.toolbar().options.items.find(function (el) {
            return el.id === "videoQuality";
        }));
    });

    test("adds dropdown widget to toolbar", function () {
        ok(mediaPlayer.dropdown() instanceof kendo.ui.DropDownList);
    });

    test("adds fullscreen toolbar button", function () {
        ok(mediaPlayer.toolbar().options.items.find(function (el) {
            return el.id === "fullscreen";
        }));
    });
})();
