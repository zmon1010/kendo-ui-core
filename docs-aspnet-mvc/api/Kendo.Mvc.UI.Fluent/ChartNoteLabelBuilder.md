---
title: ChartNoteLabelBuilder
---

# Kendo.Mvc.UI.Fluent.ChartNoteLabelBuilder
Defines the fluent interface for configuring the chart note label.




## Methods


### Position(Kendo.Mvc.UI.ChartNoteLabelPosition)
Sets the labels position


#### Parameters

##### position [Kendo.Mvc.UI.ChartNoteLabelPosition](/api/aspnet-mvc/Kendo.Mvc.UI/ChartNoteLabelPosition)
The labels position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note
                .Label(label => label
                    .Position(ChartNoteLabelPosition.Inside)
                )
            )
        )
        .Render();
    %>


### Text(System.String)
Sets the labels position


#### Parameters

##### text `System.String`
The labels position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .ValueAxis(a => a.Numeric()
            .Note(note => note
                .Data(data =>
                {
                    data.Add().Value(1).Text("A");
                    data.Add().Value(2).Text("B");
                })
            )
        )
        .Render();
    %>



