---
title: ChartScatterLineSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartScatterLineSeriesBuilder
Defines the fluent interface for configuring scatter line series.




## Methods


### ErrorBars(System.Action\<Kendo.Mvc.UI.Fluent.ScatterErrorBarsBuilder\>)
Configures the scatter line series error bars.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ScatterErrorBarsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .ScatterLine(s => s.x, s => s.y)
        .ErrorBars(e => e.XValue(1))
    )
    %>


### Style(Kendo.Mvc.UI.ChartScatterLineStyle)
Configures the style for scatterLine series.


#### Parameters

##### style [Kendo.Mvc.UI.ChartScatterLineStyle](/api/aspnet-mvc/Kendo.Mvc.UI/ChartScatterLineStyle)
The style. The default is normal.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .ScatterLine(s => s.x, s => s.y)
        .Style(ChartScatterLineStyle.Smooth);
    )
    %>



