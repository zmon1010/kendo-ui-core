---
title: ChartAxisCrosshairBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAxisCrosshairBuilder
Defines the fluent interface for configuring ChartLine.




## Methods


### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisCrosshairTooltipBuilder\>)
Configures the crosshair tooltip


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisCrosshairTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisCrosshairTooltipBuilder)>
The tooltip configuration action





### Visible(System.Boolean)
Sets the crosshair visible


#### Parameters

##### visible `System.Boolean`
The crosshair visible.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => {
            .series.Bar(new double[] { 15.7, 16.7, 20, 23.5, 26.6 }).Name("World");
            .series.Bar(new double[] { 67.96, 68.93, 75, 74, 78 }).Name("United States");
        })
        .CategoryAxis(axis => axis
            .Categories("2005", "2006", "2007", "2008", "2009")
            .Crosshair(crosshair => crosshair
                .Visible(true)
            )
        )
        .Render();
    %>



