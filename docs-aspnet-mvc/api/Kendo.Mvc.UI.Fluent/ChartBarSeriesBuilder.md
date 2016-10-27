---
title: ChartBarSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartBarSeriesBuilder
Defines the fluent interface for configuring bar series.




## Methods


### ErrorBars(System.Action\<Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder\>)
Configures the series error bars


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/CategoricalErrorBarsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Bar(s => s.Sales)
        .ErrorBars(e => e.Value(1))
    )
    %>



