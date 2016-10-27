---
title: ChartAreaLineBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAreaLineBuilder
Defines the fluent interface for configuring ChartAreaLineBuilder.




## Methods


### Opacity(System.Double)
Sets the line opacity.


#### Parameters

##### opacity `System.Double`
The line opacity.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Area(s => s.Sales)
            .Line(line => line.Opacity(0.2))
        )
        .Render();
    %>


### Style(Kendo.Mvc.UI.ChartAreaStyle)
Configures the line style for area series.


#### Parameters

##### style [Kendo.Mvc.UI.ChartAreaStyle](/api/aspnet-mvc/Kendo.Mvc.UI/ChartAreaStyle)
The style. The default is normal.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Area(s => s.Sales)
        .Line(line => line.Style(ChartAreaStyle.Step))
    )
    %>



