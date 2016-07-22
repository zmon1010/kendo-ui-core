<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />
   <kendo:mediaPlayer name="mediaPlayer" autoPlay="true">
     <kendo:mediaPlayer-media title="Digital Transformation: A New Way of Thinking" source="https://www.youtube.com/watch?v=gNlya720gbk" >         
     </kendo:mediaPlayer-media>
   </kendo:mediaPlayer>
<demo:footer />