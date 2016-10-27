---
title: ChartCandlestickSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartCandlestickSeriesBuilder
Defines the fluent interface for configuring candlestick series.



## Properties


### Series

Gets or sets the series.




## Methods


### Overlay(Kendo.Mvc.UI.ChartBarSeriesOverlay)
Sets the bar effects overlay


#### Parameters

##### overlay [Kendo.Mvc.UI.ChartBarSeriesOverlay](/api/aspnet-mvc/Kendo.Mvc.UI/ChartBarSeriesOverlay)
The candlestick effects overlay. The default is ChartBarSeriesOverlay.Glass




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Candlestick(s => s.Sales).Overlay(ChartBarSeriesOverlay.None))
        .Render();
    %>


### Highlight(System.Action\<Kendo.Mvc.UI.Fluent.ChartCandlestickSeriesHighlightBuilder\>)
Configures the series highlight


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartCandlestickSeriesHighlightBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartCandlestickSeriesHighlightBuilder)>
The configuration action.






