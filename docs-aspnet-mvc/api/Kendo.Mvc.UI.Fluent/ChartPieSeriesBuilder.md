---
title: ChartPieSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartPieSeriesBuilder
Defines the fluent interface for configuring pie series.



## Properties


### Series

Gets or sets the series.




## Methods


### Name(System.String)
Sets the name of the series.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Pie(s => s.Sales, s => s.DateString).Name("Sales"))
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
    .Series(series => series.Pie(s => s.Sales, s => s.DateString).Opacity(0.5))
    %>


### Padding(System.Int32)
Sets the padding of the chart.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(s => s.Sales, s => s.DateString).Padding(100))
        .Render();
    %>


### StartAngle(System.Int32)
Sets the start angle of the first pie segment.


#### Parameters

##### startAngle `System.Int32`
The pie start angle(in degrees).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(s => s.Sales, s => s.DateString).StartAngle(100))
        .Render();
    %>


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.ChartPieLabelsBuilder\>)
Configures the pie chart labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartPieLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartPieLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Pie(s => s.Sales, s => s.DateString)
        .Labels(labels => labels
            .Color("red")
            .Visible(true)
            );
        )
    %>


### Labels(System.Boolean)
Sets the visibility of pie chart labels.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is false.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Pie(s => s.Sales, s => s.DateString)
        .Labels(true);
    )
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the pie segments border


#### Parameters

##### width `System.Int32`
The pie segments border width.

##### color `System.String`
The pie segments border color (CSS syntax).

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The pie segments border dash type.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(s => s.Sales, s => s.DateString).Border(1, "#000", ChartDashType.Dot))
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the pie border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action





### Overlay(Kendo.Mvc.UI.ChartPieSeriesOverlay)
Sets the pie segments effects overlay


#### Parameters

##### overlay [Kendo.Mvc.UI.ChartPieSeriesOverlay](/api/aspnet-mvc/Kendo.Mvc.UI/ChartPieSeriesOverlay)
The pie segment effects overlay.
            The default value is set in the theme.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(s => s.Sales, s => s.DateString).Overlay(ChartPieSeriesOverlay.None))
        .Render();
    %>


### Connectors(System.Action\<Kendo.Mvc.UI.Fluent.ChartPieConnectorsBuilder\>)
Configures the pie chart connectors.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartPieConnectorsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartPieConnectorsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Pie(s => s.Sales, s => s.DateString)
        .Connectors(c => c
            .Color("red")
            );
        )
    %>


### Highlight(System.Action\<Kendo.Mvc.UI.Fluent.ChartPieSeriesHighlightBuilder\>)
Configures the pie highlight


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartPieSeriesHighlightBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartPieSeriesHighlightBuilder)>
The configuration action.





### Field(System.String)
Sets the value field for the series


#### Parameters

##### field `System.String`
The value field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(Model.Records).Field("Value"))
        .Render();
    %>


### CategoryField(System.String)
Sets the category field for the series


#### Parameters

##### categoryField `System.String`
The category field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(Model.Records).Field("Value").CategoryField("Category"))
        .Render();
    %>


### ColorField(System.String)
Sets the color field for the series


#### Parameters

##### colorField `System.String`
The color field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(Model.Records).Field("Value").ColorField("Color"))
        .Render();
    %>


### NoteTextField(System.String)
Sets the note text field for the series


#### Parameters

##### noteTextField `System.String`
The note text field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(Model.Records).Field("Value").NoteTextField("NoteText"))
        .Render();
    %>


### ExplodeField(System.String)
Sets the explode field for the series


#### Parameters

##### explodeField `System.String`
The explode field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(Model.Records).Field("Value").ExplodeField("Explode"))
        .Render();
    %>


### VisibleInLegendField(System.String)
Sets the visibleInLegend field for the series


#### Parameters

##### visibleInLegendField `System.String`
The visibleInLegend field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Pie(Model.Records).Field("Value").VisibleInLegendField("VisibleInLegend"))
        .Render();
    %>


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






