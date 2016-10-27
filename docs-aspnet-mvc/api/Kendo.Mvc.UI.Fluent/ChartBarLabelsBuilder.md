---
title: ChartBarLabelsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartBarLabelsBuilder
Defines the fluent interface for configuring the chart data labels.




## Methods


### Position(Kendo.Mvc.UI.ChartBarLabelsPosition)
Sets the labels position


#### Parameters

##### position [Kendo.Mvc.UI.ChartBarLabelsPosition](/api/aspnet-mvc/Kendo.Mvc.UI/ChartBarLabelsPosition)
The labels position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Labels(labels => labels
                .Position(ChartBarLabelsPosition.InsideEnd)
                .Visible(true)
                );
            )
            .Render();
            %>



