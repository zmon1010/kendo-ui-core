<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/listbox/templates/read" var="readUrl" />
<demo:header />

	<%
    String template = "<span class=\"k-state-default\" style=\"background-image: url('../resources/web/Customers/#:data.customerId#.jpg')\"></span>" +
                      "<span class=\"k-state-default\"><h3>#: data.contactName #</h3><p>#: data.companyName #</p></span>";
    %>

<div class="demo-section k-content wide">
      <kendo:listBox name="optional" connectWith="#selected" template="<%=template%>" dropSources="${dropSources1}">      
        <kendo:listBox-draggable>
        	<kendo:listBox-draggable-placeholder>
        	<script>
    			function customPlaceholder(draggedItem) {
        			return draggedItem
                			.clone()
                			.addClass("custom-placeholder")
                			.removeClass("k-ghost");
    			}
			</script>
        	</kendo:listBox-draggable-placeholder>
        </kendo:listBox-draggable>
        <kendo:listBox-toolbar tools="${tools}"></kendo:listBox-toolbar>
        <kendo:dataSource pageSize="10">
            <kendo:dataSource-transport>
            <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options,type) { 	                		
	                		return JSON.stringify(options);	                		
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json"/>
            </kendo:dataSource-transport>
        </kendo:dataSource>    
    </kendo:listBox>
    <kendo:listBox name="selected" dropSources="${dropSources2}" template="<%=template%>">
    	<kendo:dataSource data="${selected}"></kendo:dataSource>
    	 <kendo:listBox-draggable>
        	<kendo:listBox-draggable-placeholder>
        	<script>
    			function customPlaceholder(draggedItem) {
        			return draggedItem
                			.clone()
                			.addClass("custom-placeholder")
                			.removeClass("k-ghost");
    			}
			</script>
        	</kendo:listBox-draggable-placeholder>
        </kendo:listBox-draggable>
    </kendo:listBox>
</div>

<style>
    #example .demo-section {
        max-width: none;
        width: 695px;
    }

    #example .k-listbox {
        width: 326px;
        height: 310px;
    }

        #example .k-listbox:first-child {
            width: 360px;
            margin-right: 1px;
        }

    .k-ghost {
        display:none;
    }

    .custom-placeholder {
        opacity: 0.4;
    }

    #example .k-item {
        line-height: 1em;
    }

    /* Material Theme padding adjustment*/

    .k-material #example .k-item,
    .k-material #example .k-item.k-state-hover,
    .k-materialblack #example .k-item,
    .k-materialblack #examplel .k-item.k-state-hover {
        padding-left: 5px;
        border-left: 0;
    }

    .k-item > span {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        margin: 20px 10px 10px 5px;
    }

    #example .k-item > span:first-child,
    .k-item.k-drag-clue > span:first-child {
        -moz-box-shadow: inset 0 0 30px rgba(0,0,0,.3);
        -webkit-box-shadow: inset 0 0 30px rgba(0,0,0,.3);
        box-shadow: inset 0 0 30px rgba(0,0,0,.3);
        margin: 10px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-size: 100%;
        background-repeat: no-repeat;
    }

    #example h3,
    .k-item.k-drag-clue h3 {
        font-size: 1.2em;
        font-weight: normal;
        margin: 0 0 1px 0;
        padding: 0;
    }

    #example p {
        margin: 0;
        padding: 0;
        font-size: .8em;
    }
</style>
            
<demo:footer />