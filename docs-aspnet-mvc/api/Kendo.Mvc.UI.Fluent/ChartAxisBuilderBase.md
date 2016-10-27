---
title: ChartAxisBuilderBase
---

# Kendo.Mvc.UI.Fluent.ChartAxisBuilderBase
Defines the fluent interface for configuring axes.



## Properties


### Axis

Gets or sets the axis.




## Methods


### MajorTicks(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisTicksBuilder\>)
Configures the major ticks.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisTicksBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisTicksBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .ValueAxis(axis => axis
        .MajorTicks(ticks => ticks
            .Visible(false)
        )
    )
    %>


### Crosshair(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisCrosshairBuilder\>)
Configures the major ticks.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisCrosshairBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisCrosshairBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .ValueAxis(axis => axis
        .Crosshair(crosshair => crosshair
            .Visible(false)
        )
    )
    %>


### Name(System.String)
Sets the axis name.


#### Parameters

##### name `System.String`
The axis name.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .ValueAxis(axis => axis
        .Name("axisName")
    )
    %>


### MinorTicks(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisTicksBuilder\>)
Configures the minor ticks.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisTicksBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisTicksBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .ValueAxis(axis => axis
        .MinorTicks(ticks => ticks
            .Visible(false)
        )
    )
    %>


### MajorGridLines(System.Action\<Kendo.Mvc.UI.Fluent.ChartMajorGridLinesBuilder\>)
Configures the major grid lines.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartMajorGridLinesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartMajorGridLinesBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .MajorGridLines(lines => lines.Visible(true))
    )
    %>


### MajorGridLines(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets color and width of the major grid lines and enables them.


#### Parameters

##### color `System.Int32`
The major gridlines width

##### width `System.String`
The major gridlines color (CSS syntax)

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The major gridlines line dashType.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .MajorGridLines(2, "red", ChartDashType.Dot)
    )
    %>


### MinorGridLines(System.Action\<Kendo.Mvc.UI.Fluent.ChartMinorGridLinesBuilder\>)
Configures the minor grid lines.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartMinorGridLinesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartMinorGridLinesBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .MinorGridLines(lines => lines.Visible(true))
    )
    %>


### MinorGridLines(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets color and width of the minor grid lines and enables them.


#### Parameters

##### color `System.Int32`
The minor gridlines width

##### width `System.String`
The minor gridlines color (CSS syntax)

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The minor grid lines dash type




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .MinorGridLines(2, "red", ChartDashType.Dot)
    )
    %>


### Line(System.Action\<Kendo.Mvc.UI.Fluent.ChartLineBuilder\>)
Configures the axis line.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartLineBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartLineBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Line(line => line.Color("#f00"))
    )
    %>


### Line(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets color and width of the lines and enables them.


#### Parameters

##### color `System.Int32`
The axis line width

##### width `System.String`
The axis line color (CSS syntax)

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The axis line dashType.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Line(2, "#f00", ChartDashType.Dot)
    )
    %>


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisLabelsBuilder\>)
Configures the axis labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Labels(labels => labels
            .Color("Red")
            .Visible(true)
            );
        )
    %>


### Labels(System.Boolean)
Sets the visibility of numeric axis chart labels.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is false.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis.Labels(true))
    %>


### PlotBands(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisPlotBandsFactory\<T,T\>\>)
Defines the plot bands items.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisPlotBandsFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisPlotBandsFactory)<T,T>>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .PlotBands.Add()
        .From(1)
        .To(2)
    )
    %>


### Title(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisTitleBuilder\>)
Configures the chart axis title.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisTitleBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisTitleBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Title(title => title.Text("Axis"))
    )
    %>


### Title(System.String)
Sets the axis title.


#### Parameters

##### title `System.String`
The axis title.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Title("Axis")
    )
    %>


### Pane(System.String)
Renders the axis in the pane with the specified name.


#### Parameters

##### pane `System.String`
The pane name.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Panes(panes => {
        panes.Add().Title("Value");
        panes.Add("volumePane").Title("Volume");
    })
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Pane("volumePane")
    )
    %>


### Color(System.String)
Sets the color for all axis elements. Can be overriden by individual settings.


#### Parameters

##### color `System.String`
The axis color.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Color("#ff0000")
    )
    %>


### Reverse(System.Boolean)
Sets the axis reverse option.


#### Parameters

##### reverse `System.Boolean`
A value indicating if the axis labels should be rendered in reverse.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Reverse(true)
    )
    %>


### Reverse
Reverse the axis.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
        .Reverse()
    )
    %>


### Visible(System.Boolean)
Sets the axis visibility


#### Parameters

##### visible `System.Boolean`
The axis visibility.





### StartAngle(System.Double)
The angle (degrees) where the 0 value is placed.
            It defaults to 0.


#### Parameters

##### startAngle `System.Double`
Angles increase counterclockwise and 0 is to the right. Negative values are acceptable.





### NarrowRange(System.Boolean)
A value indicating if the automatic axis range should snap to 0.


#### Parameters

##### narrowRange `System.Boolean`
The narrowRange value.





### Background(System.String)
Sets the axis background color


#### Parameters

##### visible `System.String`
The axis visibility.






