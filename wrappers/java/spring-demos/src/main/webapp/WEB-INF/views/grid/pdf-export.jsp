<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>
<%@taglib prefix="demo" tagdir="/WEB-INF/tags"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:url value="/grid/pdf-export/read" var="transportReadUrl" />
<c:url value="/grid/pdf-export/save" var="saveUrl" />

<demo:header />

<style>
    /*
        Use the DejaVu Sans font for display and embedding in the PDF file.
        The standard PDF fonts have no support for Unicode characters.
    */
    .k-grid {
        font-family: "DejaVu Sans", "Arial", sans-serif;
    }

    /* Hide the Grid header and pager during export */
    .k-pdf-export .k-grid-toolbar,
    .k-pdf-export .k-pager-wrap
    {
        display: none;
    }
</style>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="../resources/shared/js/pako.min.js"></script>
<div class="box wide">
       <p style="margin-bottom: 1em"><b>Important:</b></p>

       <p style="margin-bottom: 1em">This page loads pako_deflate.min.js.  This enables compression
       in the PDF, and it is required if your dataset is very large.
       Chrome is known to crash on grids with lots of pages when pako is
       not loaded.</p>

       <p>In order for the output to be precise, and for Unicode support,
       you must declare TrueType fonts.  Please read the information about
       fonts
       <a href="http://docs.telerik.com/kendo-ui/framework/drawing/drawing-dom#custom-fonts-and-pdf">here</a>
       and <a href="http://docs.telerik.com/kendo-ui/framework/drawing/pdf-output#using-custom-fonts">here</a>.
       This demo renders the grid in "DejaVu Sans" font family, which is
       declared in kendo.common.css, but it also declares the paths to the
       font files using <tt>kendo.pdf.defineFont</tt>, because the
       stylesheet is hosted on a different domain.
       </p>
   </div>

    <kendo:grid name="grid" style="height:500px;" rowTemplate="row-template" altRowTemplate="alt-row-template"
                height="500" scrollable="true" pageable="true">
        <kendo:grid-toolbar>
            <kendo:grid-toolbarItem name="pdf" />
        </kendo:grid-toolbar>
        <kendo:grid-pdf allPages="true" proxyURL="${saveUrl}" fileName="Kendo UI Grid Export.pdf" />
        <kendo:grid-columns>
            <kendo:grid-column title="Picture" width="140px" />
            <kendo:grid-column title="Details" field="title" width="350px" />
            <kendo:grid-column title="Country" field="country" />
            <kendo:grid-column title="EmployeeID" field="employeeId" />
        </kendo:grid-columns>
        <kendo:dataSource serverPaging="true" serverSorting="true" serverFiltering="true" pageSize="5">
            <kendo:dataSource-transport>
                <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>
                <kendo:dataSource-transport-parameterMap>
                    function(options){return JSON.stringify(options);}
                </kendo:dataSource-transport-parameterMap>
            </kendo:dataSource-transport>
            <kendo:dataSource-schema data="data" total="total" />
        </kendo:dataSource>
    </kendo:grid>

    <script id="row-template" type="text/x-kendo-template">
        <tr data-uid="#: uid #">
            <td class="photo">
               <img src="<c:url value='/resources/web/Employees/' />#:employeeId#.jpg" alt="#: employeeId #" />
            </td>
            <td class="details">
               <span class="name">#: firstName# #: lastName# </span>
               <span class="title">Title: #: title #</span>
            </td>
            <td class="country">
               #: country #
            </td>
            <td class="employeeID">
               #: employeeId #
            </td>
        </tr>
    </script>

    <script id="alt-row-template" type="text/x-kendo-template">
        <tr class="k-alt" data-uid="#: uid #">
            <td class="photo">
               <img src="<c:url value='/resources/web/Employees/' />#:employeeId#.jpg" alt="#:employeeId #" />
            </td>
            <td class="details">
               <span class="name">#: firstName# #: lastName# </span>
               <span class="title">Title: #: title #</span>
            </td>
            <td class="country">
               #: country #
            </td>
            <td class="employeeID">
               #: employeeId #
            </td>
        </tr>
    </script>

 <style>
    .employeeID,
    .country {
        font-size: 50px;
        font-weight: bold;
        color: #898989;
    }
    .name {
        display: block;
        font-size: 1.6em;
    }
    .title {
        display: block;
        padding-top: 1.6em;
    }
    td.photo, .employeeID {
        text-align: center;
    }
    .k-grid-header .k-header {
        padding: 10px 20px;
    }
    .k-grid tr {
        background: -moz-linear-gradient(top,  rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.05)), color-stop(100%,rgba(0,0,0,0.15)));
        background: -webkit-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
        background: -o-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
        background: -ms-linear-gradient(top,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
        background: linear-gradient(to bottom,  rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.15) 100%);
        padding: 20px;
    }
    .k-grid tr.k-alt {
        background: -moz-linear-gradient(top,  rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.2)), color-stop(100%,rgba(0,0,0,0.1)));
        background: -webkit-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
        background: -o-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
        background: -ms-linear-gradient(top,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
        background: linear-gradient(to bottom,  rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 100%);
    }
</style>
<demo:footer />
