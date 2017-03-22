<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<demo:header />

<c:url value="/resources/js/cultures/kendo.culture.en-US.min.js" var="enUS"/>
<c:url value="/resources/js/cultures/kendo.culture.en-GB.min.js" var="enGB"/>
<c:url value="/resources/js/cultures/kendo.culture.de-DE.min.js" var="deDE"/>
<c:url value="/resources/js/cultures/kendo.culture.fr-FR.min.js" var="frFR"/>
<c:url value="/resources/js/cultures/kendo.culture.bg-BG.min.js" var="bgBG"/>

<script type="text/javascript" src="${enUS}"></script>
<script type="text/javascript" src="${enGB}"></script>
<script type="text/javascript" src="${deDE}"></script>
<script type="text/javascript" src="${frFR}"></script>
<script type="text/javascript" src="${bgBG}"></script>

    <div id="example">
        <div class="demo-section k-content">
            <ul class="fieldlist">
                <li class="culture">
                    <label for="culture">Choose culture:</label>
                      <kendo:dropDownList name="language" dataTextField="text" dataValueField="value" 
                    	change="changeCulture" value="en-US" style="width: 100%;">
	       				<kendo:dataSource data="${cultures}"></kendo:dataSource>
	   				</kendo:dropDownList>  
                    
                </li>
                <li class="language">
                    <label for="language">Choose language:</label>
                  	<kendo:dropDownList name="culture" dataTextField="text" dataValueField="value" 
                    	change="changeLanguage" value="en-US" style="width: 100%;">
	       				<kendo:dataSource data="${languages}"></kendo:dataSource>
	   				</kendo:dropDownList>  
                </li>
            </ul>
        </div>
        
        <div id="product-view" class="demo-section k-content">
            <kendo:dateInput name="dateinput" value="${date}" style="width:100%"></kendo:dateInput>
        </div>
    </div>
      <style>
            .fieldlist {
                margin: 0 0 -1em;
                padding: 0;
            }
    
            .fieldlist li {
                list-style: none;
                padding-bottom: 1em;
                line-height: 3em;
            }
    
            .fieldlist label {
                display: block;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 12px;
                color: #444;
            }
        </style>

        <script>
            function createDateInput() {
                var element = $("#dateinput");
                if (element.data("dateinput")) {
                    element.data("dateinput").destroy();
                    element.empty();
                }
                element.kendoDateInput({
                    format: "F" ,
                    value:new Date()
                });            
            }

            function changeCulture() {
                kendo.culture(this.value());

                $("#dateinput").data("kendoDateInput").setOptions({
                    format: kendo.culture().calendar.patterns.F
                });
            }
            
            function changeLanguage() {
                kendo.ui.progress($("#dateinput"), true);                
                var baseUrl = '../resources/js/messages/kendo.messages.';
                $.getScript(baseUrl + this.value() + ".min.js", function () {
                    kendo.ui.progress($("#dateinput"), false);
                    createDateInput();
                });
            }
        </script>
<demo:footer />
