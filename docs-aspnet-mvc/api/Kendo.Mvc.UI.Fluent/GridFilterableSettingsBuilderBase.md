---
title: GridFilterableSettingsBuilderBase
---

# Kendo.Mvc.UI.Fluent.GridFilterableSettingsBuilderBase
Defines the base fluent interface for configuring the grid filterable settings.




## Methods


### Enabled(System.Boolean)
Enables or disables filtering




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Filterable(filtering => filtering.Enabled((bool)ViewData["enableFiltering"]))
    %>


### Operators(System.Action\<Kendo.Mvc.UI.Fluent.FilterableOperatorsBuilder\>)
Configures the Filter menu operators.



#### Returns




### Messages(System.Action\<Kendo.Mvc.UI.Fluent.FilterableMessagesBuilder\>)
Configures Filter menu messages.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.FilterableMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/FilterableMessagesBuilder)>




#### Returns




### Extra(System.Boolean)
Specify if the extra input fields should be visible within the filter menu. Default is true.


#### Parameters

##### value `System.Boolean`
True to show the extra inputs, otherwise false



#### Returns




### Mode(Kendo.Mvc.UI.GridFilterMode)
Specify the filter mode - you can choose between having separate header row and the filter menu available by clicking the icon. Default is the filter menu.
            Multiple filter modes can be set by combining the flags:




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Filterable(f => f.Mode(GridFilterMode.Row | GridFilterMode.Menu))
    %>



