<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:url value="/listbox/keyboard-navigation/read" var="readUrl" />
<demo:header />

<div class="demo-section k-content wide">
      <kendo:listBox name="listbox1" connectWith="listbox2" selectable="multiple"
      navigatable="true" dataTextField="productName" dataValueField="productId" dropSources="${dropSources1}">   
      <kendo:listBox-toolbar tools="${tools}"></kendo:listBox-toolbar>   
        <kendo:dataSource>
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
    <kendo:listBox name="listbox2" dataTextField="productName" dataValueField="productId" selectable="single">
    	<kendo:dataSource data="${data}"></kendo:dataSource>   	 
    </kendo:listBox>
</div>

    <div class="box wide">
                <div class="box-col">
            <h4>Focus</h4>
            <ul class="keyboard-legend">
                <li>
                    <span class="button-preview">
                        <span class="key-button wider">Alt</span>
                        +
                        <span class="key-button">w</span>
                    </span>
                    <span class="button-descr">
                        focuses the widget
                    </span>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>Supported keys and user actions</h4>
            <ul class="keyboard-legend">
                <li>
                    <span class="button-preview">
                        <span class="key-button wider leftAlign">up arrow</span>
                    </span>
                    <span class="button-descr">
                        selects previous item
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button wider leftAlign">down arrow</span>
                    </span>
                    <span class="button-descr">
                        selects next item
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">del</span>
                    </span>
                    <span class="button-descr">
                        deletes selected items
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button wider leftAlign">space</span>
                    </span>
                    <span class="button-descr">
                        selects/deselects item
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">shift</span>
                        <span class="key-button wider leftAlign">up arrow</span>
                    </span>
                    <span class="button-descr">
                        adds the previous item to the selected items
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">shift</span>
                        <span class="key-button wider leftAlign">down arrow</span>
                    </span>
                    <span class="button-descr">
                        adds the next item to the selected items
                    </span>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>&nbsp;</h4>
            <ul class="keyboard-legend">
                <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button wider leftAlign">right arrow</span>
                    </span>
                    <span class="button-descr">
                        adds the selected items to the connected ListBox
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button wider leftAlign">left arrow</span>
                    </span>
                    <span class="button-descr">
                        adds the selected items from the connected ListBox to the current
                    </span>
                </li>
                  <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button wider leftAlign">up arrow</span>
                    </span>
                    <span class="button-descr">
                        moves the focus to the previous item
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button wider leftAlign">down arrow</span>
                    </span>
                    <span class="button-descr">
                        moves the focus to the next item
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button">shift</span>
                        <span class="key-button wider leftAlign">up arrow</span>
                    </span>
                    <span class="button-descr">
                        shifts selected items upwards
                    </span>
                </li>
                <li>
                    <span class="button-preview">
                        <span class="key-button">ctrl</span>
                        <span class="key-button">shift</span>
                        <span class="key-button wider leftAlign">down arrow</span>
                    </span>
                    <span class="button-descr">
                        shifts selected items downwards
                    </span>
                </li>
            </ul>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            $(document).on("keydown.examples", function (e) {
                if (e.altKey && e.keyCode === 87) {
                    $("#listbox1").data("kendoListBox").focus();
                }
            });
        });
    </script>

<style>
    #example .demo-section {
        max-width: none;
        width: 534px;
    }

    #example .k-listbox {
        width: 255px;
        height: 310px;
    }

        #example .k-listbox:first-child {
            width: 270px;
            margin-right: 1px;
        }
</style>

            
<demo:footer />