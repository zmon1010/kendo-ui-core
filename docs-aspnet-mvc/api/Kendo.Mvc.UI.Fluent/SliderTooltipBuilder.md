---
title: SliderTooltipBuilder
---

# Kendo.Mvc.UI.Fluent.SliderTooltipBuilder
Defines the fluent API for configuring the Kendo Slider for ASP.NET MVC tooltip




## Methods


### Format(System.String)
Gets or sets the format for displaying the value in the tooltip.


#### Parameters

##### value `System.String`
The value.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    .Tooltip(tooltip => tooltip.Format("{0:P}"))
    %>


### Enabled(System.Boolean)
Display tooltip while drag.


#### Parameters

##### value `System.Boolean`
The value.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    .Tooltip(tooltip => tooltip.Enable(false))
    %>


### Template(System.String)
Gets or sets the template for displaying the value in the tooltip.


#### Parameters

##### template `System.String`
The template.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    .Tooltip(tooltip => tooltip.template("${value}"))
    %>



