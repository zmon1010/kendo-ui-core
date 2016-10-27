---
title: ChartBoxPlotSeriesBuilder
---

# Kendo.Mvc.UI.Fluent.ChartBoxPlotSeriesBuilder
Defines the fluent interface for configuring bar series.




## Methods


### Aggregate(System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>,System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>,System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>,System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>,System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>,System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>,System.Nullable\<Kendo.Mvc.UI.ChartSeriesAggregate\>)
Sets the aggregate function for date series.
            This function is used when a category (an year, month, etc.) contains two or more points.


#### Parameters

##### lower System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Lower aggregate name.

##### q1 System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Q1 aggregate name.

##### median System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Median aggregate name.

##### q3 System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Q3 aggregate name.

##### upper System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Upper aggregate name.

##### mean System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Mean aggregate name.

##### outliers System.Nullable<[Kendo.Mvc.UI.ChartSeriesAggregate](/api/aspnet-mvc/Kendo.Mvc.UI/ChartSeriesAggregate)>
Outliers aggregate name.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
        .Aggregate(
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.Max,
            ChartSeriesAggregate.First
        )
    )
    %>


### Gap(System.Double)
Set distance between category clusters. 
            
            A value of 1 means that there is a total of 1 point width between categories. 
            The distance is distributed evenly on each side.
            The default value is 1




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper).Gap(1.5))
    %>


### Spacing(System.Double)
Sets a value indicating the distance between points in the same category.


#### Parameters

##### spacing `System.Double`
Value of 1 means that the distance between points in the same category.
            The default value is 0.3




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper).Spacing(1))
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the points border


#### Parameters

##### width `System.Int32`
The points border width.

##### color `System.String`
The points border color (CSS syntax).

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The points border dash type.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper).Border("1", "#000", ChartDashType.Dot))
        .Render();
    %>


### Line(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Configures the ohlc chart lines.


#### Parameters

##### width `System.Int32`
The lines width.

##### color `System.String`
The lines color.

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The lines dashType.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
            .Line(2, "red", ChartDashType.Dot)
        )
        .Render();
    %>


### Line(System.Int32)
Configures the ohlc line width.


#### Parameters

##### width `System.Int32`
The lines width.





### Line(System.Int32,System.String)
Configures the ohlc lines.


#### Parameters

##### width `System.Int32`
The lines width.

##### color `System.String`
The lines color.





### Line(System.Action\<Kendo.Mvc.UI.Fluent.ChartLineBuilder\>)
Configures the ohlc chart lines.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartLineBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartLineBuilder)>
The configuration action.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series
            .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
            .Line(line => line.Opacity(0.2))
        )
        .Render();
    %>


### Outliers(System.Action\<Kendo.Mvc.UI.Fluent.ChartMarkersBuilder\>)
Configures the box plot chart outliers.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartMarkersBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartMarkersBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
        .Outliers(outliers => outliers
            .Type(ChartMarkerShape.Triangle)
            );
        )
    %>


### Outliers(System.Boolean)
Sets the visibility of box plot chart outliers.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is true.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
        .Outliers(true);
    )
    %>


### Extremum(System.Action\<Kendo.Mvc.UI.Fluent.ChartMarkersBuilder\>)
Configures the box plot chart extremum.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartMarkersBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartMarkersBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
        .Extremum(extremum => extremum
            .Type(ChartMarkerShape.Triangle)
            );
        )
    %>


### Extremum(System.Boolean)
Sets the visibility of box plot chart extremum.


#### Parameters

##### visible `System.Boolean`
The visibility. The default value is true.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => series
        .BoxPlot(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper)
        .Extremum(true);
    )
    %>


### CategoryField(System.String)
Sets the category field for the series


#### Parameters

##### categoryField `System.String`
The category field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").CategoryField("Category"))
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
        .Series(series => series.BoxPlot(Model.Records).Field("Value").ColorField("Color"))
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
        .Series(series => series.BoxPlot(Model.Records).Field("Value").NoteTextField("NoteText"))
        .Render();
    %>


### LowerField(System.String)
Sets the lower field for the series


#### Parameters

##### lowerField `System.String`
The lower field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.Bar(Model.Records).Field("Value").LowerField("Lower"))
        .Render();
    %>


### Q1Field(System.String)
Sets the q1 field for the series


#### Parameters

##### q1Field `System.String`
The q1 field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").Q1Field("Q1"))
        .Render();
    %>


### MedianField(System.String)
Sets the median field for the series


#### Parameters

##### medianField `System.String`
The median field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").MedianField("Median"))
        .Render();
    %>


### Q3Field(System.String)
Sets the q3 field for the series


#### Parameters

##### q3Field `System.String`
The q3 field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").Q3Field("Q3"))
        .Render();
    %>


### UpperField(System.String)
Sets the upper field for the series


#### Parameters

##### upperField `System.String`
The upper field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").UpperField("Upper"))
        .Render();
    %>


### MeanField(System.String)
Sets the mean field for the series


#### Parameters

##### meanField `System.String`
The mean field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").MeanField("Mean"))
        .Render();
    %>


### OutliersField(System.String)
Sets the outliers field for the series


#### Parameters

##### outliersField `System.String`
The outliers field for the series




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Series(series => series.BoxPlot(Model.Records).Field("Value").OutliersField("Outliers"))
        .Render();
    %>



