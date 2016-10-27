---
title: GridEventBuilder
---

# Kendo.Mvc.UI.Fluent.GridEventBuilder
Defines the fluent API for configuring the Kendo Grid for ASP.NET MVC events.




## Methods


### Change(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Change client-side event.

For additional information check the [change event](/api/javascript/ui/grid#events-change) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Change(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Change(System.String)
Defines the name of the JavaScript function that will handle the the Change client-side event.

For additional information check the [change event](/api/javascript/ui/grid#events-change) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Change("gridChange"))
    )


### Cancel(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Cancel client-side event.

For additional information check the [cancel event](/api/javascript/ui/grid#events-cancel) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Cancel(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Cancel(System.String)
Defines the name of the JavaScript function that will handle the the Cancel client-side event.

For additional information check the [cancel event](/api/javascript/ui/grid#events-cancel) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Cancel("gridCancel"))
    )


### Edit(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Edit client-side event.

For additional information check the [edit event](/api/javascript/ui/grid#events-edit) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Edit(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Edit(System.String)
Defines the name of the JavaScript function that will handle the the Edit client-side event.

For additional information check the [edit event](/api/javascript/ui/grid#events-edit) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Edit("gridEdit"))
    )


### ExcelExport(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the excelExport client-side event.

For additional information check the [excelExport event](/api/javascript/ui/grid#events-excelExport) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ExcelExport(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ExcelExport(System.String)
Defines the name of the JavaScript function that will handle the excelExport client-side event.

For additional information check the [excelExport event](/api/javascript/ui/grid#events-excelExport) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ExcelExport("gridExcelExport"))
    )


### PdfExport(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the pdfExport client-side event.

For additional information check the [pdfExport event](/api/javascript/ui/grid#events-pdfExport) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.PdfExport(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### PdfExport(System.String)
Defines the name of the JavaScript function that will handle the pdfExport client-side event.

For additional information check the [pdfExport event](/api/javascript/ui/grid#events-pdfExport) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.PdfExport("gridPdfExport"))
    )


### Save(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Save client-side event.

For additional information check the [save event](/api/javascript/ui/grid#events-save) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Save(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Save(System.String)
Defines the name of the JavaScript function that will handle the the Save client-side event.

For additional information check the [save event](/api/javascript/ui/grid#events-save) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Save("gridSave"))
    )


### SaveChanges(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the SaveChanges client-side event.

For additional information check the [saveChanges event](/api/javascript/ui/grid#events-saveChanges) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.SaveChanges(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### SaveChanges(System.String)
Defines the name of the JavaScript function that will handle the the SaveChanges client-side event.

For additional information check the [saveChanges event](/api/javascript/ui/grid#events-saveChanges) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.SaveChanges("gridSaveChanges"))
    )


### DetailExpand(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DetailExpand client-side event.

For additional information check the [detailExpand event](/api/javascript/ui/grid#events-detailExpand) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DetailExpand(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### DetailExpand(System.String)
Defines the name of the JavaScript function that will handle the the DetailExpand client-side event.

For additional information check the [detailExpand event](/api/javascript/ui/grid#events-detailExpand) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DetailExpand("gridDetailExpand"))
    )


### DetailInit(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DetailInit client-side event.

For additional information check the [detailInit event](/api/javascript/ui/grid#events-detailInit) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DetailInit(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### DetailInit(System.String)
Defines the name of the JavaScript function that will handle the the DetailInit client-side event.

For additional information check the [detailInit event](/api/javascript/ui/grid#events-detailInit) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DetailInit("gridDetailInit"))
    )


### DetailCollapse(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DetailCollapse client-side event.

For additional information check the [detailCollapse event](/api/javascript/ui/grid#events-detailCollapse) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DetailCollapse(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### DetailCollapse(System.String)
Defines the name of the JavaScript function that will handle the the DetailCollapse client-side event.

For additional information check the [detailCollapse event](/api/javascript/ui/grid#events-detailCollapse) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DetailCollapse("gridDetailCollapse"))
    )


### Remove(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Remove client-side event.

For additional information check the [remove event](/api/javascript/ui/grid#events-remove) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Remove(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Remove(System.String)
Defines the name of the JavaScript function that will handle the the Remove client-side event.

For additional information check the [remove event](/api/javascript/ui/grid#events-remove) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Remove("gridRemove"))
    )


### DataBound(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DataBound client-side event.

For additional information check the [dataBound event](/api/javascript/ui/grid#events-dataBound) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DataBound(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### DataBound(System.String)
Defines the name of the JavaScript function that will handle the the DataBound client-side event.

For additional information check the [dataBound event](/api/javascript/ui/grid#events-dataBound) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DataBound("gridDataBound"))
    )


### Page(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Page client-side event.

For additional information check the [page event](/api/javascript/ui/grid#events-page) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Page(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Page(System.String)
Defines the name of the JavaScript function that will handle the the Page client-side event.

For additional information check the [page event](/api/javascript/ui/grid#events-page) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Page("gridPaging"))
    )


### Group(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Group client-side event.

For additional information check the [group event](/api/javascript/ui/grid#events-group) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Group(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Group(System.String)
Defines the name of the JavaScript function that will handle the the Group client-side event.

For additional information check the [group event](/api/javascript/ui/grid#events-group) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Group("gridGrouping"))
    )


### Filter(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Filter client-side event.

For additional information check the [filter event](/api/javascript/ui/grid#events-filter) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Filter(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Filter(System.String)
Defines the name of the JavaScript function that will handle the the Filter client-side event.

For additional information check the [filter event](/api/javascript/ui/grid#events-filter) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Filter("gridFiltering"))
    )


### Sort(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Sort client-side event.

For additional information check the [sort event](/api/javascript/ui/grid#events-sort) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Sort(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Sort(System.String)
Defines the name of the JavaScript function that will handle the the Sort client-side event.

For additional information check the [sort event](/api/javascript/ui/grid#events-sort) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.Sort("gridSorting"))
    )


### DataBinding(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the DataBinding client-side event.

For additional information check the [dataBinding event](/api/javascript/ui/grid#events-dataBinding) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DataBinding(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### DataBinding(System.String)
Defines the name of the JavaScript function that will handle the the DataBinding client-side event.

For additional information check the [dataBinding event](/api/javascript/ui/grid#events-dataBinding) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.DataBinding("gridDataBinding"))
    )


### ColumnResize(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the ColumnResize client-side event.

For additional information check the [columnResize event](/api/javascript/ui/grid#events-columnResize) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnResize(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnResize(System.String)
Defines the name of the JavaScript function that will handle the the ColumnResize client-side event.

For additional information check the [columnResize event](/api/javascript/ui/grid#events-columnResize) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnResize("gridColumnResize"))
    )


### ColumnReorder(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the ColumnReorder client-side event.

For additional information check the [columnReorder event](/api/javascript/ui/grid#events-columnReorder) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnReorder(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnReorder(System.String)
Defines the name of the JavaScript function that will handle the the ColumnReorder client-side event.

For additional information check the [columnReorder event](/api/javascript/ui/grid#events-columnReorder) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnReorder("gridColumnReorder"))
    )


### ColumnHide(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the ColumnHide client-side event.

For additional information check the [columnHide event](/api/javascript/ui/grid#events-columnHide) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnHide(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnHide(System.String)
Defines the name of the JavaScript function that will handle the the ColumnHide client-side event.

For additional information check the [columnHide event](/api/javascript/ui/grid#events-columnHide) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnHide("gridColumnHide"))
    )


### ColumnShow(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the ColumnShow client-side event.

For additional information check the [columnShow event](/api/javascript/ui/grid#events-columnShow) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnShow(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnShow(System.String)
Defines the name of the JavaScript function that will handle the the ColumnShow client-side event.

For additional information check the [columnShow event](/api/javascript/ui/grid#events-columnShow) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnShow("gridColumnShow"))
    )


### ColumnMenuInit(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the ColumnMenuInit client-side event.

For additional information check the [columnMenuInit event](/api/javascript/ui/grid#events-columnMenuInit) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnMenuInit(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnMenuInit(System.String)
Defines the name of the JavaScript function that will handle the ColumnMenuInit client-side event.

For additional information check the [columnMenuInit event](/api/javascript/ui/grid#events-columnMenuInit) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnMenuInit("gridColumnMenuInit"))
    )


### FilterMenuInit(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the FilterMenuInit client-side event.

For additional information check the [filterMenuInit event](/api/javascript/ui/grid#events-filterMenuInit) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.FilterMenuInit(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### FilterMenuInit(System.String)
Defines the name of the JavaScript function that will handle the FilterMenuInit client-side event.

For additional information check the [filterMenuInit event](/api/javascript/ui/grid#events-filterMenuInit) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.FilterMenuInit("gridFilterMenuInit"))
    )


### ColumnLock(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the ColumnLock client-side event.

For additional information check the [columnLock event](/api/javascript/ui/grid#events-columnLock) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnLock(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnLock(System.String)
Defines the name of the JavaScript function that will handle the the ColumnLock client-side event.

For additional information check the [columnLock event](/api/javascript/ui/grid#events-columnLock) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnLock("gridColumnLock"))
    )


### ColumnUnlock(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the ColumnUnlock client-side event.

For additional information check the [columnUnlock event](/api/javascript/ui/grid#events-columnUnlock) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnUnlock(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### ColumnUnlock(System.String)
Defines the name of the JavaScript function that will handle the the ColumnUnlock client-side event.

For additional information check the [columnUnlock event](/api/javascript/ui/grid#events-columnUnlock) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Events(events => events.ColumnUnlock("gridColumnUnlock"))
    )


### Navigate(System.Func\<System.Object,System.Object\>)
Defines the name of the JavaScript function that will handle the the Navigate client-side event.

For additional information check the [navigate event](/api/javascript/ui/grid#events-navigate) documentation.


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Navigatable()
        .Events(events => events.Navigate(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Navigate(System.String)
Defines the name of the JavaScript function that will handle the the Navigate client-side event.

For additional information check the [navigate event](/api/javascript/ui/grid#events-navigate) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    @(Html.Kendo().Grid()
        .Name("Grid")
        .Navigatable()
        .Events(events => events.Navigate("gridNavigate"))
    )



