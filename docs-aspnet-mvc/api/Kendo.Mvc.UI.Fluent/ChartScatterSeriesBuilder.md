---
title: ChartScatterSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartScatterSeriesBuilder
Defines the fluent interface for configuring scatter series.




## Methods


### ErrorBars(System.Action\<Kendo.Mvc.UI.Fluent.ScatterErrorBarsBuilder\>)
Configures the scatter series error bars.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ScatterErrorBarsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ScatterErrorBarsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .ErrorBars(e => e.XValue(1))
    )
    %>



