---
title: ChartSeriesBuilderBase
---

# Kendo.Mvc.UI.Fluent.ChartSeriesBuilderBase
Defines the fluent interface for configuring series.



## Properties


### Series

Gets or sets the series.




## Methods


### Name(System.String)
Sets the series title displayed in the legend.


#### Parameters

##### text `System.String`
The title.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Bar(s => s.Sales).Name("Sales"))
    %>


### GroupNameTemplate(System.String)
Sets the name template for auto-generated series when binding to grouped data.


#### Parameters

##### groupNameTemplate `System.String`
The name template for auto-generated series when binding to grouped data.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("_StockData", "Scatter_Charts"))
            .Group(group => group.Add(model => model.Symbol))
        )
        .Series(series => series.Bar(s => s.Sales)
            .Name("Sales")
            .GroupNameTemplate("#= series.name # for #= group.field # #= group.value #")
        )
        .Render();
    %>


### Opacity(System.Double)
Sets the series opacity.


#### Parameters

##### opacity `System.Double`
The series opacity in the range from 0 (transparent) to 1 (opaque).
            The default value is 1.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Bar(s => s.Sales).Opacity(0.5))
    %>


### Color(System.String)
Sets the bar fill color


#### Parameters

##### color `System.String`
The bar fill color (CSS syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Bar(s => s.Sales).Color("Red"))
        .Render();
    %>


### Color(System.Func\<System.Object,System.Object\>)
Sets the function used to retrieve point color.


#### Parameters

##### colorFunction `System.Func<System.Object,System.Object>`
The JavaScript function that will be executed
                to retrieve the color of each point.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Color(
                @<text>
                    function(point) {
                    return point.value > 5 ? "red" : "green";
                    }
                    </text>
                )
            )
            .Render();
            %>


### ColorHandler(System.Func\<System.Object,System.Object\>)
Sets the function used to retrieve point color.


#### Parameters

##### colorFunction `System.Func<System.Object,System.Object>`
The JavaScript function that will be executed
                to retrieve the color of each point.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ColorHandler(
                @<text>
                    function(point) {
                    return point.value > 5 ? "red" : "green";
                    }
                    </text>
                )
            )
            .Render();
            %>


### ColorHandler(System.String)
Sets the function used to retrieve point color.


#### Parameters

##### colorFunction `System.String`
The JavaScript function that will be executed
                to retrieve the color of each point.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .ColorHandler("pointColor")
        )
        .Render();
    %>


### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.ChartTooltipBuilder\>)
Configure the data point tooltip for the series.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartTooltipBuilder)>
Use the configurator to set data tooltip options.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series.Bar(s => s.Sales)
        .Tooltip(tooltip =>
        {
            tooltip.Visible(true).Format("{0:C}");
        })
    )
    %>


### Tooltip(System.Boolean)
Sets the data point tooltip visibility.


#### Parameters

##### visible `System.Boolean`
A value indicating if the data point tooltip should be displayed.
            The tooltip is not visible by default.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series.Bar(s => s.Sales).Tooltip(true))
    %>


### Axis(System.String)
Sets the axis name to use for this series.


#### Parameters

##### axis `System.String`
The axis name for this series.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Bar(s => s.Sales).Name("Sales").Axis("secondary"))
    .ValueAxis(axis => axis.Numeric())
    .ValueAxis(axis => axis.Numeric("secondary"))
    .CategoryAxis(axis => axis.AxisCrossingValue(0, 10))
    %>


### CategoryAxis(System.String)
Sets the axis name to use for this series.


#### Parameters

##### categoryAxis `System.String`
The category axis name for this series.





### Highlight(System.Action\<Kendo.Mvc.UI.Fluent.ChartSeriesHighlightBuilder\>)
Configures the series highlight


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartSeriesHighlightBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartSeriesHighlightBuilder)>
The configuration action.





### Highlight(System.Boolean)
Configures the highlight visibility


#### Parameters

##### configurator `System.Boolean`
The highlight visibility.





### Visible(System.Boolean)
Sets the labels visibility


#### Parameters

##### visible `System.Boolean`
The labels visibility.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Bar(s => s.Sales).Visible(false))
        .Render();
    %>


### VisibleInLegend(System.Boolean)
Sets the labels visibility in the legend


#### Parameters

##### visible `System.Boolean`
The series visibility in the legend.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Bar(s => s.Sales).VisibleInLegend(false))
        .Render();
    %>


### Notes(System.Action\<Kendo.Mvc.UI.Fluent.ChartNoteBuilder\>)
Configures the series notes


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNoteBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNoteBuilder)>
The configuration action.





### Aggregate(System.Func\<System.Object,System.Object\>)
Sets the function used to retrieve point color.


#### Parameters

##### aggregateFunction `System.Func<System.Object,System.Object>`
The JavaScript function that will be executed
                to retrieve the value of each aggregated point.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Aggregate(
                @<text>
                    function(values) {
                    return values[0];
                    }
                    </text>
                )
            )
            .Render();
            %>


### Aggregate(System.String)
Sets the function used to retrieve point color.


#### Parameters

##### aggregateFunction `System.String`
The JavaScript function that will be executed
                to retrieve the value of each aggregated point.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .Bar(s => s.Sales)
            .Aggregate("myAggregate")
        )
        .Render();
    %>
    <script>
    function myAggregate(values) {
    return values[0];
    }
    </script>


### ZIndex(System.Double)
Sets the series stacking order relative to other series.


#### Parameters

##### zIndex `System.Double`
The stacking order of series, relative to other series.
            The series with the highest Z-index will be placed on top.
            
            Series with no Z-index will use the default stacking order based on series type.
            For example line series will be on top with bar and area following below.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => {
        series.Area(s => s.Sales).ZIndex(2);
        series.Column(s => s.Price).ZIndex(1);
    })
    %>



