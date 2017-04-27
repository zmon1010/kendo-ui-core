<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/listbox/events/read" var="readUrl" />

<demo:header />

<div class="demo-section k-content wide">
    <kendo:listBox name="optional" connectWith="selected" dropSources="${dropSources1}"
     add="onAdd" change="onChange" dataBound="onDataBound" dragstart="onDragStart" drag="onDrag"
     drop="onDrop" dragend="onDragEnd" remove="onRemove" reorder="onReorder" draggable="true"
     dataTextField="contactName" dataValueField="customerID">
        <kendo:listBox-toolbar tools="${tools}" ></kendo:listBox-toolbar>
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
    <kendo:listBox name="selected" add="onAdd" change="onChange" dataBound="onDataBound" dragstart="onDragStart" drag="onDrag"
     drop="onDrop" dragend="onDragEnd" remove="onRemove" reorder="onReorder" dataTextField="contactName" dataValueField="customerID" dropSources="${dropSources2}" selectable="multiple">
    	<kendo:dataSource data="${selected}"></kendo:dataSource>
    	<kendo:listBox-draggable>
    	<kendo:listBox-draggable-placeholder>
    	function placeholder(element) {
            		return element.clone().css({
                "opacity": 0.3,
                "border": "1px dashed #000000"
            });
        }
    	</kendo:listBox-draggable-placeholder>
    	</kendo:listBox-draggable>
    </kendo:listBox>
</div>

    <div class="demo-section k-content wide">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <script>
    function onAdd(e) {
        kendoConsole.log("add : " + getWidgetName(e) + " : " + e.dataItems.length + " item(s)");
    }

    function onChange(e) {
        kendoConsole.log("change : " + getWidgetName(e));
    }

    function onDataBound(e) {
        if ("kendoConsole" in window) {
            kendoConsole.log("dataBound : " + getWidgetName(e));
        }
    }

    function onRemove(e) {
        kendoConsole.log("remove : " + getWidgetName(e) + " : " + e.dataItems.length + " item(s)");
    };

    function onReorder(e) {
        kendoConsole.log("reorder : " + getWidgetName(e));
    }

    function onDragStart(e) {
        kendoConsole.log("dragstart : " + getWidgetName(e));
    }

    function onDrag(e) {
        kendoConsole.log("drag : " + getWidgetName(e));
    }

    function onDrop(e) {
        kendoConsole.log("drop : " + getWidgetName(e));
    }

    function onDragEnd(e) {
        kendoConsole.log("dragend : " + getWidgetName(e));
    }

    function getWidgetName(e) {
        var listBoxId = e.sender.element.attr("id");
        var widgetName = listBoxId === "optional" ? "left widget" : "right widget";
        return widgetName;
    }

    </script>


<style>
    #example .demo-section {
        max-width: none;
        width: 580px;
    }

    #example .k-listbox {
        width: 285px;
        height: 310px;
    }

    #example .k-listbox:first-child {
            margin-right: 1px;
    }
</style>
<demo:footer />