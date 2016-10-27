---
title: ChartBubbleSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartBubbleSeriesBuilder
Defines the fluent interface for configuring bubble series.




## Methods


### NegativeValues(System.Action\<Kendo.Mvc.UI.Fluent.ChartNegativeValueSettingsBuilder\>)
Configures the bubble chart behavior for negative values.
            By default negative values are not visible.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNegativeValueSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNegativeValueSettingsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Bubble(s => s.x, s => s.y, s => s.size)
        .NegativeValues(n => n
            .Visible(true)
            );
        )
    %>


### Border(System.Int32,System.String)
Sets the bubble border


#### Parameters

##### width `System.Int32`
The bubble border width.

##### color `System.String`
The bubble border color (CSS syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bubble(s => s.x, s => s.y, s => s.size)
            .Border(1, "Red");
        )
        .Render();
    %>


### Markers(System.Action\<Kendo.Mvc.UI.Fluent.ChartMarkersBuilder\>)
Not applicable to bubble series





### Markers(System.Boolean)
Not applicable to bubble series





### Highlight(System.Action\<Kendo.Mvc.UI.Fluent.ChartBubbleSeriesHighlightBuilder\>)
Configures the bubble highlight


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBubbleSeriesHighlightBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBubbleSeriesHighlightBuilder)>
The configuration action.






