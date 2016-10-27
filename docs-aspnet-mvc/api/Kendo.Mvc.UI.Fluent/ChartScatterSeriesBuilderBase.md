---
title: ChartScatterSeriesBuilderBase
---

# Kendo.Mvc.UI.Fluent.ChartScatterSeriesBuilderBase
Defines the fluent interface for configuring scatter series.




## Methods


### Labels(System.Action\<Kendo.Mvc.UI.Fluent.ChartPointLabelsBuilder\>)
Configures the scatter chart labels.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartPointLabelsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartPointLabelsBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .Labels(labels => labels
            .Position(ChartBarLabelsPosition.Above)
            .Visible(true)
            );
        )
    %>


### Labels(System.Boolean)
Sets the visibility of scatter chart labels.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is false.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .Labels(true);
    )
    %>


### Markers(System.Action\<Kendo.Mvc.UI.Fluent.ChartMarkersBuilder\>)
Configures the scatter chart markers.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartMarkersBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartMarkersBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .Markers(markers => markers
            .Type(ChartMarkerShape.Triangle)
            );
        )
    %>


### Markers(System.Boolean)
Sets the visibility of scatter chart markers.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is true.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .Scatter(s => s.x, s => s.y)
        .Markers(true);
    )
    %>


### XAxis(System.String)
Sets the axis name to use for this series.


#### Parameters

##### axis `System.String`
The axis name for this series.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Scatter(s => s.X, s => s.Y).Name("Scatter").XAxis("secondary"))
    .XAxis(axis => axis.Numeric())
    .XAxis(axis => axis.Numeric("secondary"))
    %>


### YAxis(System.String)
Sets the axis name to use for this series.


#### Parameters

##### axis `System.String`
The axis name for this series.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.Scatter(s => s.Sales).Name("Sales").YAxis("secondary"))
    .YAxis(axis => axis.Numeric())
    .YAxis(axis => axis.Numeric("secondary"))
    %>


### Axis(System.String)
Not applicable to scatter series





### CategoryAxis(System.String)
Not applicable to scatter series





### XField(System.String)
Sets the X field for the series


#### Parameters

##### xField `System.String`
The value X field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Scatter(Model.Records).XField("X").YField("Y"))
        .Render();
    %>


### YField(System.String)
Sets the Y field for the series


#### Parameters

##### yField `System.String`
The value Y field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Scatter(Model.Records).XField("X").YField("Y"))
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
        .Series(series => series.Bar(Model.Records).Field("Value").NoteTextField("NoteText"))
        .Render();
    %>


### Fields(System.String,System.String)
Sets the X and Y fields for the series


#### Parameters

##### xField `System.String`
The X field for the series

##### yField `System.String`
The Y field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Scatter(Model.Records).Fields("X", "Y"))
        .Render();
    %>



