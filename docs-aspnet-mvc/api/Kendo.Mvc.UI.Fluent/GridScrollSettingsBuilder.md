---
title: GridScrollSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.GridScrollSettingsBuilder
Defines the fluent interface for configuring Scrollable




## Methods


### Enabled(System.Boolean)
Enables or disables scrolling.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Scrollable(s => s.Enabled((bool)ViewData["enableScrolling"]))
    %>


### Height(System.Int32)
Sets the height of the scrollable area in pixels.


#### Parameters

##### pixelHeight `System.Int32`
The height in pixels.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Scrollable(s => s.Height(400))
    %>


### Height(System.String)
Sets the height of the scrollable.


#### Parameters

##### value `System.String`
The height in pixels.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Scrollable(s => s.Height("20em")) // use "auto" to remove the default height and make the Grid expand automatically
    %>


### Virtual(System.Boolean)
Enables or disabled virtual scrolling.


#### Parameters

##### value `System.Boolean`
boolean flag




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    .Scrollable(s => s.Virtual(true))
    %>



