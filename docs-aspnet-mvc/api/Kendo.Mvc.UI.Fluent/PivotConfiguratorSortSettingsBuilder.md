---
title: PivotConfiguratorSortSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.PivotConfiguratorSortSettingsBuilder
Defines the fluent interface for configuring the PivotGridSortableSettings.




## Methods


### Enabled(System.Boolean)
Enables or disables sorting.




#### Example (ASPX)
    <%= Html.Kendo().PivotConfigurator()
    .Name("PivotConfigurator")
    .Sortable(sorting => sorting.Enabled((bool)ViewData["enableSorting"]))
    %>


### AllowUnsort(System.Boolean)
Enables or disables unsorted mode.


#### Parameters

##### value `System.Boolean`
The value.




#### Example (ASPX)
    <%= Html.Kendo().PivotConfigurator()
    .Name("PivotConfigurator")
    .Sortable(sorting => sorting.AllowUnsort(true))
    %>



