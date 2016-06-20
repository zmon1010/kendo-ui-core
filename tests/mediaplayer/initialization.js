(function() {
    var MediaPlayer = kendo.ui.MediaPlayer,
        div;

    module("kendo.ui.MediaPlayer initialization", {
        setup: function() {
            div = $("<div />").appendTo(QUnit.fixture); 
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("MediaPlayer attaches a mediaplayer object to a target", function() {
        var mediaplayer = new MediaPlayer(div);
        ok(div.data("kendoMediaPlayer") instanceof MediaPlayer);
    });
	
})();
