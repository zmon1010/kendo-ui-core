<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<div class="demo-section k-content" style="width: 644px; max-width: none">
<kendo:mediaPlayer name="mediaPlayer" autoPlay="true" play="onPlay" pause="onPause" end="onEnd"
	ready="onReady" timeChange="onTimeChange" volumeChange="onVolumeChange">
	<kendo:mediaPlayer-media
		title="Digital Transformation: A New Way of Thinking"
		source="https://www.youtube.com/watch?v=gNlya720gbk" />
</kendo:mediaPlayer>
</div>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>
    function onPlay() {
        kendoConsole.log("event :: play");
    }

    function onPause() {
        kendoConsole.log("event :: pause");
    }

    function onEnd() {
        kendoConsole.log("event :: end");
    }

    function onReady() {
        kendoConsole.log("event :: ready");
    }

    function onTimeChange() {
        kendoConsole.log("event :: timeChange");
    }

    function onVolumeChange() {
        kendoConsole.log("event :: volumeChange");
    }
</script>
<style>
.k-mediaplayer {
	float: left;
	width: 640px;
	height: 360px;
}
</style>
