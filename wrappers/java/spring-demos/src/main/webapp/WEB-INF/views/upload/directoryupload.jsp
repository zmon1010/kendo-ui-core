<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/upload/async/chunksave" var="saveUrl" />
<c:url value="/upload/async/remove" var="removeUrl" />

<div class="demo-section k-content">
            <div class="box">
                <h4>Information</h4>
                <p>
                    The example shows how directories can be selected and dropped over the control.
                    This feature is only supported by browsers that support HTML5 directory and DataTransferItem features.
                </p>
            </div>

	    <kendo:upload name="files" directory="true" directoryDrop="true">
	        <kendo:upload-async chunkSize="2000" saveUrl="${saveUrl}" removeUrl="${removeUrl}"/>
	    </kendo:upload>
</div>

<demo:footer />
