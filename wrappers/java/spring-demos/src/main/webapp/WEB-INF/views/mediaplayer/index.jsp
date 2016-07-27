<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />
<kendo:mediaPlayer name="mediaPlayer" autoPlay="true">
	<kendo:mediaPlayer-media
		title="Digital Transformation: A New Way of Thinking"
		source="https://www.youtube.com/watch?v=gNlya720gbk" />
</kendo:mediaPlayer>
<style>
.k-mediaplayer {
	float: left;
	width: 640px;
	height: 360px;
}
</style>
<demo:footer />