<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/mediaplayer/videos" var="readUrl" />

<demo:header />
   <kendo:mediaPlayer name="mediaPlayer" autoPlay="true" playlist="true">
     <kendo:dataSource>
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${readUrl}"  />
            </kendo:dataSource-transport>
     </kendo:dataSource>
   </kendo:mediaPlayer>
<demo:footer />