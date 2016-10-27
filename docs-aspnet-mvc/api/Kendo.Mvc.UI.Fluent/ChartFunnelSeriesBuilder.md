---
title: ChartFunnelSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartFunnelSeriesBuilder
Defines the fluent interface for configuring funnel series.



## Properties


### Series

Gets or sets the series.




## Methods


### Name(System.String)
Sets the name of the series.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Funnel(s => s.Sales, s => s.DateString).Name("Sales"))
    %>


### SegmentSpacing(System.Double)
Sets the segmentSpacing of the chart.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Funnel(s => s.Sales, s => s.DateString).SegmentSpacing(5))
        .Render();
    %>


### Opacity(System.Double)
Sets the opacity of the funnel series.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Funnel(s => s.Sales, s => s.DateString).Opacity(0.3))
        .Render();
    %>


### NeckRatio(System.Double)
Sets the neck ratio of the funnel chart.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Funnel(s => s.Sales, s => s.DateString).NeckRatio(3))
        .Render();
    %>


### DynamicSlope(System.Boolean)
Sets the dynamic slope of the funnel chart.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Funnel(s => s.Sales, s => s.DateString).DynamicSlope(true))
        .Render();
    %>


### DynamicHeight(System.Boolean)
Sets the dynamic height of the funnel chart.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Funnel(s => s.Sales, s => s.DateString).DynamicHeight(true))
        .Render();
    %>


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.ChartFunnelLabelsBuilder\>)
Configures the funnel chart labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartFunnelLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartFunnelLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Funnel(s => s.Sales, s => s.DateString)
        .Labels(labels => labels
            .Color("red")
            .Visible(true)
            );
        )
    %>


### Labels(System.Boolean)
Sets the visibility of funnel chart labels.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is false.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Funnel(s => s.Sales, s => s.DateString)
        .Labels(true);
    )
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the funnel segments border


#### Parameters

##### width `System.Int32`
The funnel segments border width.

##### color `System.String`
The funnel segments border color (CSS syntax).

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The funnel segments border dash type.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Funnel(s => s.Sales, s => s.DateString).Border(1, "#000", ChartDashType.Dot))
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the funnel border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action





### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.ChartTooltipBuilder\>)
Configure the series tooltip.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartTooltipBuilder)>
Use the configurator to set the tooltip options.





### Tooltip(System.Boolean)
Sets the tooltip visibility.


#### Parameters

##### visible `System.Boolean`
A value indicating if the tooltip should be displayed.





### Visual(System.String)
Sets the series visual handler


#### Parameters

##### handler `System.String`
The handler name.





### Visual(System.Func\<System.Object,System.Object\>)
Sets the series visual handler


#### Parameters

##### handler `System.Func<System.Object,System.Object>`
The handler






