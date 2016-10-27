---
title: ChartDonutSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartDonutSeriesBuilder
Defines the fluent interface for configuring donut series.



## Properties


### Series

Gets or sets the series.




## Methods


### Margin(System.Int32)
Sets the margin of the donut series.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Donut(s => s.Sales, s => s.DateString).Margin(10))
        .Render();
    %>


### HoleSize(System.Int32)
Sets the the size of the donut hole.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Donut(s => s.Sales, s => s.DateString).HoleSize(40))
        .Render();
    %>


### Size(System.Int32)
Sets the size of the donut series.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Donut(s => s.Sales, s => s.DateString).Size(20))
        .Render();
    %>



