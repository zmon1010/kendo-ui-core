---
title: ChartPlotBandsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartPlotBandsBuilder
Defines the fluent interface for configuring plot band.




## Methods


### From(System.Object)
Sets the plot band start position.


#### Parameters

##### from `System.Object`
The plot band start position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis
            .PlotBands(plotBands => plotBands
                .Add().From(1).Color("Red");
            )
        )
        .Render();
    %>


### To(System.Object)
Sets the plot band end position.


#### Parameters

##### to `System.Object`
The plot band end position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis
            .PlotBands(plotBands => plotBands
                .Add().To(2).Color("Red");
            )
        )
        .Render();
    %>


### Color(System.String)
Sets the plot band background color


#### Parameters

##### color `System.String`
The plot band background color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis
            .PlotBands(plotBands => plotBands
                .Add().Color("Red");
            )
        )
        .Render();
    %>


### Opacity(System.Double)
Sets the plot band opacity


#### Parameters

##### opacity `System.Double`
The plot band opacity.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .CategoryAxis(axis => axis
            .PlotBands(plotBands => plotBands
                .Add().Opacity(0.5);
            )
        )
        .Render();
    %>



