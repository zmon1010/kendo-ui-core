<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<div class="box wide">
     <h4>API Functions</h4>
     <div class="box-col">
         <ul class="options">
             <li>
                 <button id="play" class="k-button">Play video</button>
             </li>
             <li>
                 <button id="stop" class="k-button">Stop video</button>
             </li>
             <li>
                 <button id="pause" class="k-button">Pause video</button>
             </li>
             <li>
                 <button id="fullScreen" class="k-button">Enter full-screen</button>
             </li>
             </ul>
     </div>
     <div class="box-col">
         <ul class="options">
             <li>
                 <button id="toggleMute" class="k-button">Toggle mute</button>
             </li>
             <li>
                 <button id="isEnded" class="k-button">Video has ended</button>
             </li>
             <li>
                 <button id="isPaused" class="k-button">Video is paused</button>
             </li>
             <li>
                 <button id="isPlaying" class="k-button">Video is playing</button>
             </li>
         </ul>
     </div>
     <div class="box-col">
         <ul class="options">
             <li>
                 <button id="volume" class="k-button">Set volume</button>
                 <input id="volumeValue" value="50" style="float:none" />
             </li>
             <li>
                 <button id="seek" class="k-button">Seek to</button>
                 <input id="seekValue" value="50" style="float:none" />
             </li>
         </ul>
     </div>
</div>
<div class="demo-section k-content" style="width: 644px; max-width: none">
<kendo:mediaPlayer name="mediaPlayer" autoPlay="true">
	<kendo:mediaPlayer-media
		title="Digital Transformation: A New Way of Thinking"
		source="https://www.youtube.com/watch?v=gNlya720gbk" />
</kendo:mediaPlayer>
</div>
<script>
    $(document).ready(function () {
        var mediaPlayer = $("#mediaPlayer").data("kendoMediaPlayer");

        var setVolume = function () {
            mediaPlayer.volume($("#volumeValue").val());
        };

        var seekTo = function () {
            mediaPlayer.seek($("#seekValue").data("kendoNumericTextBox").value()*1000);
        };

        $("#play").click(function () {
            mediaPlayer.play();
        });

        $("#stop").click(function () {
            mediaPlayer.stop();
        });

        $("#pause").click(function () {
            mediaPlayer.pause();
        });

        $("#fullScreen").click(function () {
            mediaPlayer.fullScreen(true);
        });

        $("#volume").click(function () {
            mediaPlayer.volume($("#value").val());
        });

        $("#toggleMute").click(function () {
            mediaPlayer.mute(!mediaPlayer.mute());
        });

        $("#isEnded").click(function () {
            alert(mediaPlayer.isEnded());
        });

        $("#isPaused").click(function () {
            alert(mediaPlayer.isPaused());
        });

        $("#isPlaying").click(function () {
            alert(mediaPlayer.isPlaying());
        });

        $("#volumeValue").kendoNumericTextBox({
            change: setVolume,
            min: 0,
            max: 100,
            format: "#",
            decimals: 0
        });

        $("#seekValue").kendoNumericTextBox({
            change: seekTo,
            min: 0,
            max: 97,
            format: "#",
            decimals: 0
        });

        $("#seek").click(seekTo);

        $("#volume").click(setVolume);
    });
</script>
<style>
.k-mediaplayer {
	float: left;
	width: 640px;
	height: 360px;
}
</style>