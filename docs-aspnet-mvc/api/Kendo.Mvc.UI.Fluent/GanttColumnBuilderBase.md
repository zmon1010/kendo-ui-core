---
title: GanttColumnBuilderBase
---

# Kendo.Mvc.UI.Fluent.GanttColumnBuilderBase
Defines the fluent interface for configuring columns.



## Properties


### Column

Gets or sets the column.




## Methods


### Title(System.String)
Sets the title displayed in the header of the column.


#### Parameters

##### text `System.String`
The text.




#### Example (ASPX)
    <%= Html.Kendo().Gantt(Model)
    .Name("Gantt")
    .Columns(columns => columns.Bound(o => o.OrderID).Title("ID"))
    %>


### Editable(System.Boolean)
Makes the column editable or not.By default a column is not editable.




#### Example (ASPX)
    <%= Html.Kendo().Gantt(Model)
    .Name("Gantt")
    .Columns(columns => columns.Bound(o => o.OrderID).Editable(true))
    %>


### Sortable(System.Boolean)
Makes the column sortable or not. By default a column is not sortable.




#### Example (ASPX)
    <%= Html.Kendo().Gantt(Model)
    .Name("Gantt")
    .Columns(columns => columns.Bound(o => o.OrderID).Sortable(true))
    %>


### Width(System.Int32)
Sets the width of the column in pixels.


#### Parameters

##### pixelWidth `System.Int32`
The width in pixels.




#### Example (ASPX)
    <%= Html.Kendo().Gantt(Model)
    .Name("Gantt")
    .Columns(columns => columns.Bound(o => o.OrderID).Width(100))
    %>


### Format(System.String)
Gets or sets the format for displaying the data.


#### Parameters

##### value `System.String`
The value.




#### Example (ASPX)
    <%= Html.Kendo().Gantt(Model)
    .Name("Gantt")
    .Columns(columns => columns.Bound(o => o.OrderDate).Format("{0:dd/MM/yyyy}"))
    %>



