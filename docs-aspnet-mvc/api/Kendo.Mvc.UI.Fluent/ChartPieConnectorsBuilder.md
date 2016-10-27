---
title: ChartPieConnectorsBuilder
---

# Kendo.Mvc.UI.Fluent.ChartPieConnectorsBuilder
Defines the fluent interface for configuring the chart connectors.




## Methods


### Width(System.Int32)
Sets the connectors width


#### Parameters

##### width `System.Int32`
The connectors width.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Pie(p => p.Sales)
            .Connectors(c => c
                .Width(3)
                );
            )
            .Render();
            %>


### Color(System.String)
Sets the connectors color


#### Parameters

##### color `System.String`
The connectors color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Pie(p => p.Sales)
            .Connectors(c => c
                .Color(red)
                );
            )
            .Render();
            %>


### Color(System.Func\<System.Object,System.Object\>)
Sets the function used to retrieve connector color.


#### Parameters

##### colorFunction `System.Func<System.Object,System.Object>`
The JavaScript function that will be executed
                to retrieve the color of each connector.





### Padding(System.Int32)
Sets the connectors padding


#### Parameters

##### padding `System.Int32`
The connectors padding.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Pie(p => p.Sales)
            .Connectors(c => c
                .Padding(10)
                );
            )
            .Render();
            %>



