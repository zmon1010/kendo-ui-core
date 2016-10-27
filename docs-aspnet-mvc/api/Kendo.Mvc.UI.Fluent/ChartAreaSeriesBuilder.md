---
title: ChartAreaSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartAreaSeriesBuilder
Defines the fluent interface for configuring area series.




## Methods


### Line(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType,Kendo.Mvc.UI.ChartAreaStyle)
Configures the area chart line.


#### Parameters

##### width `System.Int32`
The line width.

##### color `System.String`
The line color.

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The line dashType.

##### style [Kendo.Mvc.UI.ChartAreaStyle](/api/aspnet-mvc/Kendo.Mvc.UI/ChartAreaStyle)
The line style.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Area(s => s.Sales)
            .Line(2, "red", ChartDashType.Dot, ChartAreaStyle.Smooth)
        )
        .Render();
    %>


### Line(System.Action\<Kendo.Mvc.UI.Fluent.ChartAreaLineBuilder\>)
Configures the area chart line.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAreaLineBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAreaLineBuilder)>
The configuration action.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Area(s => s.Sales)
            .Line(line => line.Opacity(0.2))
        )
        .Render();
    %>


### ErrorBars(System.Action\<Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder\>)
Configures the series error bars


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.CategoricalErrorBarsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/CategoricalErrorBarsBuilder)>
The configuration action.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Area(s => s.Sales)
            .ErrorBars(e => e.Value(1))
        )
        .Render();
    %>



