---
title: GridBoundColumnFilterableBuilder
---

# Kendo.Mvc.UI.Fluent.GridBoundColumnFilterableBuilder
Defines the fluent interface for configuring bound columns filterable options




## Methods


### UI(Kendo.Mvc.UI.GridFilterUIRole)
Sets the type of the input element of the filter menu




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
        columns.Bound(o => o.OrderDate)
        .Filterable(filterable =>
            filterable.UI(GridFilterUIRole.DatePicker)
        )
    )
    %>


### UI(System.Func\<System.Object,System.Object\>)
Sets JavaScript function which to modify the UI of the filter input.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
        columns.Bound(o => o.OrderDate)
        .Filterable(filterable =>
            filterable.UI(@<text>
                JavaScript function goes here
            </text>)
        )
    )
    %>


### UI(System.String)
Sets JavaScript function which to modify the UI of the filter input.


#### Parameters

##### handler `System.String`
JavaScript function name





### ItemTemplate(System.String)
Sets the template for the checkbox rendering when Multi checkbox filtering is enabled




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
        columns.Bound(o => o.OrderDate)
        .Filterable(filterable =>
            filterable.ItemTemplate("nameOfJavaScriptFunction")
        )
    )
    %>


### Multi(System.Boolean)
Enables / disabled the Multi Checkbox filtering support for this column.





### Search(System.Boolean)
Controls whether to show a search box when checkbox filtering is enabled.





### IgnoreCase(System.Boolean)
Toggles between case-insensitive (default) and case-sensitive searching.





### BindTo(System.Collections.IEnumerable)
Provide IEnumerable that will be used as DataSource for Multi CheckBox filtering on this column





### CheckAll(System.Boolean)
Enables / disabled the CheclAll checkboxes when Multi Checkbox filtering is enabled.





### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder\>)
Configures the DataSource options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyDataSourceBuilder)>
The DataSource configurator action.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Columns(columns =>
        columns.Bound(o => o.OrderDate)
        .Filterable(filterable =>
            filterable.Cell(cell =>
                cell.DataSource(ds =>
                    ds.Read("someAction", "someController")
                )
            )
        )
    )
    %>



