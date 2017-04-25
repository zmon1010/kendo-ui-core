<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<demo:header />

<div class="demo-section k-content wide">
	<label for="optional" id="employees">Employees</label>
    <label for="selected">Developers</label>
    <br />
    <kendo:listBox name="optional" connectWith="#selected" title="Optional">
        <kendo:listBox-toolbar tools="${tools}"></kendo:listBox-toolbar>
        <kendo:dataSource data="${data}"></kendo:dataSource>    
    </kendo:listBox> 
	
    <kendo:listBox name="selected" selectable="multiple" title="Selected">
    	<kendo:dataSource data="${selected}"></kendo:dataSource>
    </kendo:listBox>
</div>

<style>
	.demo-section label {
        padding-left: 8px;
        margin-bottom: 8px;
        font-weight: bold;
        display: inline-block;        
    }
    #employees {
        width: 270px;
    }
    #example .demo-section {
        max-width: none;
        width: 515px;
    }

    #example .k-listbox {
        width: 236px;
        height: 310px;
    }

        #example .k-listbox:first-of-type {
            width: 270px;
            margin-right: 1px;
        }
</style>
            
<demo:footer />