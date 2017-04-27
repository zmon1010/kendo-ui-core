<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/listbox/keyboard-navigation/read" var="readUrl" />
<demo:header />

<div class="demo-section k-content wide">
<div class="k-rtl">
    <kendo:listBox name="source" connectWith="destination" >   
      <kendo:listBox-toolbar position="left" tools="${sourceTools}"></kendo:listBox-toolbar>   
      <kendo:dataSource data="${source}">
      </kendo:dataSource> 
    </kendo:listBox>
    <kendo:listBox name="destination" selectable="source">
    	<kendo:listBox-toolbar position="left" tools="${destinationTools}"></kendo:listBox-toolbar>   
    	<kendo:dataSource data="${destinations}"></kendo:dataSource>   	 
    </kendo:listBox>
</div>
</div>
<style>
    .k-listbox-toolbar {
        order: 2;
        margin-right: 5px!important;
    }
	
    .k-i-arrow-60-right:before, .k-i-arrow-60-left:before,
    .k-i-arrow-double-60-right:before, .k-i-arrow-double-60-left:before {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }

    .k-i-arrow-60-right:before,
    .k-i-arrow-double-60-right:before{
        margin-left: -2px;
    }

    #example .demo-section {
        max-width: none;
        width: 695px;
    }

    #example .k-listbox {
        width: 342px;
        height: 200px;
    }
</style>

            
<demo:footer />