---
title: GridSortSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.GridSortSettingsBuilder
Defines the fluent interface for configuring the Sortable.




## Methods


### Enabled(System.Boolean)
Enables or disables sorting.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Sorting(sorting => sorting.Enabled((bool)ViewData["enableSorting"]))
    %>


### SortMode(Kendo.Mvc.UI.GridSortMode)
Sets the sort mode of the grid.


#### Parameters

##### value [Kendo.Mvc.UI.GridSortMode](/api/aspnet-mvc/Kendo.Mvc.UI/GridSortMode)
The value.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Sorting(sorting => sorting.SortMode(GridSortMode.MultipleColumns))
    %>


### AllowUnsort(System.Boolean)
Enables or disables unsorted mode.


#### Parameters

##### value `System.Boolean`
The value.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Sorting(sorting => sorting.AllowUnsort(true))
    %>



