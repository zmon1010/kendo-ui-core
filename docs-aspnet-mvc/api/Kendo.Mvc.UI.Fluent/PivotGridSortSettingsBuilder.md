---
title: PivotGridSortSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.PivotGridSortSettingsBuilder
Defines the fluent interface for configuring the PivotGridSortableSettings.




## Methods


### Enabled(System.Boolean)
Enables or disables sorting.




#### Example (ASPX)
    <%= Html.Kendo().PivotGrid()
    .Name("PivotGrid")
    .Sortable(sorting => sorting.Enabled((bool)ViewData["enableSorting"]))
    %>


### AllowUnsort(System.Boolean)
Enables or disables unsorted mode.


#### Parameters

##### value `System.Boolean`
The value.




#### Example (ASPX)
    <%= Html.Kendo().PivotGrid()
    .Name("PivotGrid")
    .Sortable(sorting => sorting.AllowUnsort(true))
    %>



