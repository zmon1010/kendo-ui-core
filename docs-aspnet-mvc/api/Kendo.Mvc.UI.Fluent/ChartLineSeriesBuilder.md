---
title: ChartLineSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartLineSeriesBuilder
Defines the fluent interface for configuring line series.




## Methods


### Style(Kendo.Mvc.UI.ChartLineStyle)
Configures the style for line series.


#### Parameters

##### style [Kendo.Mvc.UI.ChartLineStyle](/api/aspnet-mvc/Kendo.Mvc.UI/ChartLineStyle)
The style. The default is normal.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Line(s => s.Sales)
        .Style(ChartLineStyle.Step);
    )
    %>


### ErrorBars(System.Action\<Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder\>)
Configures the series error bars


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/CategoricalErrorBarsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Line(s => s.Sales)
        .ErrorBars(e => e.Value(1))
    )
    %>



