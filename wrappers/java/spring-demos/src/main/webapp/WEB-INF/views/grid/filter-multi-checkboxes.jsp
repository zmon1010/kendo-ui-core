<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/grid/editing/create" var="createUrl" />
<c:url value="/grid/editing/read" var="readUrl" />
<c:url value="/grid/editing/update" var="updateUrl" />
<c:url value="/grid/editing/destroy" var="destroyUrl" />

<c:url value="/grid/detailtemplate/employees/" var="transportReadUrl" />
<c:url value="/grid/detailtemplate/orders/" var="transportNestedReadUrl" />


<demo:header />
	<h4>Client Operations</h4>
    <kendo:grid name="client" pageable="true" sortable="true" scrollable="true" filterable="true" navigatable="true" editable="true">
        <kendo:grid-toolbar>
            <kendo:grid-toolbarItem name="create"/>
            <kendo:grid-toolbarItem name="save"/>
            <kendo:grid-toolbarItem name="cancel"/>
        </kendo:grid-toolbar>
        <kendo:grid-columns>
            <kendo:grid-column title="Product Name" field="productName" >
            	<kendo:grid-column-filterable multi="true"/>
            </kendo:grid-column>
            <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" >
            	<kendo:grid-column-filterable multi="true"/>
            </kendo:grid-column>
            <kendo:grid-column title="Units In Stock" field="unitsInStock" >
            	<kendo:grid-column-filterable multi="true"/>
            </kendo:grid-column>
            <kendo:grid-column title="Discontinued" field="discontinued" >
            	<kendo:grid-column-filterable multi="true"/>
            </kendo:grid-column>
            <kendo:grid-column command="destroy" title="&nbsp;" />
        </kendo:grid-columns>
        <kendo:dataSource pageSize="10" batch="true">
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-create url="${createUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-read url="${readUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-update url="${updateUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-destroy url="${destroyUrl}" dataType="json" type="POST" contentType="application/json" />
                <kendo:dataSource-transport-parameterMap>
                	<script>
	                	function parameterMap(options,type) { 
	                		if(type==="read"){
	                			return JSON.stringify(options);
	                		} else {
	                			return JSON.stringify(options.models);
	                		}
	                	}
                	</script>
                </kendo:dataSource-transport-parameterMap>
            </kendo:dataSource-transport>
            <kendo:dataSource-schema>
                <kendo:dataSource-schema-model id="productId">
                    <kendo:dataSource-schema-model-fields>
                        <kendo:dataSource-schema-model-field name="productName" type="string">
                        	<kendo:dataSource-schema-model-field-validation required="true" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="unitPrice" type="number">
                        	<kendo:dataSource-schema-model-field-validation required="true" min="1" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="unitsInStock" type="number">
                        	<kendo:dataSource-schema-model-field-validation required="true" min="0" />
                        </kendo:dataSource-schema-model-field>
                        <kendo:dataSource-schema-model-field name="discontinued" type="boolean" />
                    </kendo:dataSource-schema-model-fields>
                </kendo:dataSource-schema-model>
            </kendo:dataSource-schema>
        </kendo:dataSource>
    </kendo:grid>
    
	<h4>Server Operations</h4>
	<kendo:grid name="server" pageable="true" sortable="true" filterable="true" >
	    <kendo:grid-columns>
	        <kendo:grid-column title="First Name" field="firstName" width="120px" >
	        	<kendo:grid-column-filterable multi="true"/>
	        </kendo:grid-column>
	        <kendo:grid-column title="Last Name" field="lastName" width="120px" >
	        	<kendo:grid-column-filterable multi="true"/>
	        </kendo:grid-column>
	        <kendo:grid-column title="Country" field="country" width="120px" >
	        	<kendo:grid-column-filterable multi="true"/>
	        </kendo:grid-column>
	        <kendo:grid-column title="City" field="city" width="120px" >
	        	<kendo:grid-column-filterable multi="true"/>
	        </kendo:grid-column>
	        <kendo:grid-column title="Title" field="title" >
	        	<kendo:grid-column-filterable multi="true"/>
	        </kendo:grid-column>
	    </kendo:grid-columns>
	    <kendo:dataSource pageSize="5" serverPaging="true" serverSorting="true">
	        <kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
	        <kendo:dataSource-transport>
	            <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST" contentType="application/json" />
	            <kendo:dataSource-transport-parameterMap>
	            	<script>
	             		function parameterMap(options) { 
	            			return JSON.stringify(options);
	             		}
	            	</script>
	            </kendo:dataSource-transport-parameterMap>
	        </kendo:dataSource-transport>
	    </kendo:dataSource>
	</kendo:grid>
	<style>
       	.k-multicheck-wrap{
        	overflow-x: hidden;
        }
	</style>
<demo:footer />
