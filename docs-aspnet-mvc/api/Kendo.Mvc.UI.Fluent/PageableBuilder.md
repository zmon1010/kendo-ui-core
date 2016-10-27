---
title: PageableBuilder
---

# Kendo.Mvc.UI.Fluent.PageableBuilder
Defines the fluent interface for configuring Pageable




## Methods


### PageSizes(System.Collections.IEnumerable)
Sets the page sizes of the grid.


#### Parameters

##### pageSizes `System.Collections.IEnumerable`
The values shown in the pageSize dropdown





### PageSizes(System.Boolean)
Sets the page sizes of the grid.


#### Parameters

##### enabled `System.Boolean`
A value indicating whether to enable the page sizes dropdown





### ButtonCount(System.Int32)
Sets the number of buttons displayed in the numeric pager. Default is 10.


#### Parameters

##### value `System.Int32`
The value





### Enabled(System.Boolean)
Enables or disables paging.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Pageable(paging => paging.Enabled((bool)ViewData["enablePaging"]))
    %>



