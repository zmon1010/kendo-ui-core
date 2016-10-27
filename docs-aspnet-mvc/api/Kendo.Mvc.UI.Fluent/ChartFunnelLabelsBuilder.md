---
title: ChartFunnelLabelsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartFunnelLabelsBuilder
Defines the fluent interface for configuring the chart data labels.




## Methods


### Align(Kendo.Mvc.UI.ChartFunnelLabelsAlign)
Sets the labels align


#### Parameters

##### align [Kendo.Mvc.UI.ChartFunnelLabelsAlign](/api/aspnet-mvc/Kendo.Mvc.UI/ChartFunnelLabelsAlign)
The labels align.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Funnel(p => p.Sales)
            .Labels(labels => labels
                .Align(ChartFunnelLabelsAlign.Center)
                .Visible(true)
                );
            )
            .Render();
            %>


### Position(Kendo.Mvc.UI.ChartFunnelLabelsPosition)
Sets the labels position


#### Parameters

##### position [Kendo.Mvc.UI.ChartFunnelLabelsPosition](/api/aspnet-mvc/Kendo.Mvc.UI/ChartFunnelLabelsPosition)
The labels position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Funnel(p => p.Sales)
            .Labels(labels => labels
                .Position(ChartFunnelLabelsPosition.Center)
                .Visible(true)
                );
            )
            .Render();
            %>



