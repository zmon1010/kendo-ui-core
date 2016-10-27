---
title: SparklineBuilder
---

# Kendo.Mvc.UI.Fluent.SparklineBuilder
Defines the fluent interface for configuring the 1 component.




## Methods


### Data(System.Collections.IEnumerable)
Sets the Sparkline data.


#### Parameters

##### data `System.Collections.IEnumerable`
The data for the default Sparkline series.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Data(new int[] { 1, 2 })
    %>


### Data(System.Double)
Sets the Sparkline data.


#### Parameters

##### data `System.Double`
The data for the default Sparkline series.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Data(new int[] { 1, 2 })
    %>


### Type(Kendo.Mvc.UI.SparklineType)
Sets the type of the sparkline.


#### Parameters

##### theme [Kendo.Mvc.UI.SparklineType](/api/aspnet-mvc/Kendo.Mvc.UI/SparklineType)
The Sparkline type.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Type(SparklineType.Area)
    %>


### PointWidth(System.Double)
Sets the per-point width of the sparkline.


#### Parameters

##### theme `System.Double`
The Sparkline per-point width.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .PointWidth(2)
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.ChartEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartEventBuilder)>
The client events configuration action.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Events(events => events
        .OnLoad("onLoad")
    )
    %>


### Theme(System.String)
Sets the theme of the chart.


#### Parameters

##### theme `System.String`
The Sparkline theme.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Theme("Telerik")
    %>


### RenderAs(Kendo.Mvc.UI.RenderingMode)
Sets the preferred rendering engine.
            If it is not supported by the browser, the Chart will switch to the first available mode.


#### Parameters

##### renderAs [Kendo.Mvc.UI.RenderingMode](/api/aspnet-mvc/Kendo.Mvc.UI/RenderingMode)
The preferred rendering engine.





### ChartArea(System.Action\<Kendo.Mvc.UI.Fluent.ChartAreaBuilder\>)
Sets the Chart area.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAreaBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAreaBuilder)>
The Chart area.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .ChartArea(chartArea => chartArea.margin(20))
    %>


### PlotArea(System.Action\<Kendo.Mvc.UI.Fluent.PlotAreaBuilder\>)
Sets the Plot area.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.PlotAreaBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PlotAreaBuilder)>
The Plot area.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .PlotArea(plotArea => plotArea.margin(20))
    %>


### Series(System.Action\<Kendo.Mvc.UI.Fluent.SparklineSeriesFactory\<T\>\>)
Defines the chart series.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SparklineSeriesFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SparklineSeriesFactory)<T>>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline(Model)
    .Name("Sparkline")
    .Series(series =>
    {
        series.Bar(s => s.SalesAmount);
    })
    %>


### SeriesDefaults(System.Action\<Kendo.Mvc.UI.Fluent.SparklineSeriesDefaultsBuilder\<T\>\>)
Defines the options for all chart series of the specified type.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.SparklineSeriesDefaultsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/SparklineSeriesDefaultsBuilder)<T>>
The configurator.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline(Model)
    .Name("Sparkline")
    .SeriesDefaults(series => series.Bar().Stack(true))
    %>


### AxisDefaults(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisDefaultsBuilder\<T\>\>)
Defines the options for all chart axes of the specified type.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisDefaultsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisDefaultsBuilder)<T>>
The configurator.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline(Model)
    .Name("Sparkline")
    .AxisDefaults(axisDefaults => axisDefaults.MinorTickSize(5))
    %>


### CategoryAxis(System.Action\<Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder\<T\>\>)
Configures the category axis


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartCategoryAxisBuilder)<T>>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().Sparkline(Model)
    .Name("Sparkline")
    .CategoryAxis(axis => axis
        .Categories(s => s.DateString)
    )
    %>


### ValueAxis(System.Action\<Kendo.Mvc.UI.Fluent.ChartValueAxisFactory\<T\>\>)
Defines value axis options


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartValueAxisFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartValueAxisFactory)<T>>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().Sparkline(Model)
    .Name("Sparkline")
    .ValueAxis(a => a.Numeric().TickSize(4))
    %>


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyAjaxDataSourceBuilder\<T\>\>)
Data Source configuration


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyAjaxDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyAjaxDataSourceBuilder)<T>>
Use the configurator to set different data binding options.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .DataSource(ds =>
    {
        ds.Ajax().Read(r => r.Action("SalesData", "Sparkline"));
    })
    %>


### AutoBind(System.Boolean)
Enables or disables automatic binding.


#### Parameters

##### autoBind `System.Boolean`
Gets or sets a value indicating if the chart
            should be data bound during initialization.
            The default value is true.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .DataSource(ds =>
    {
        ds.Ajax().Read(r => r.Action("SalesData", "Sparkline"));
    })
    .AutoBind(false)
    %>


### SeriesColors(System.Collections.Generic.IEnumerable\<System.String\>)
Sets the series colors.


#### Parameters

##### colors `System.Collections.Generic.IEnumerable<System.String>`
A list of the series colors.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .SeriesColors(new string[] { "#f00", "#0f0", "#00f" })
    %>


### SeriesColors(System.String[])
Sets the series colors.


#### Parameters

##### colors `System.String[]`
The series colors.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .SeriesColors("#f00", "#0f0", "#00f")
    %>


### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.ChartTooltipBuilder\>)
Use it to configure the data point tooltip.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartTooltipBuilder)>
Use the configurator to set data tooltip options.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Tooltip(tooltip =>
    {
        tooltip.Visible(true).Format("{0:C}");
    })
    %>


### Tooltip(System.Boolean)
Sets the data point tooltip visibility.


#### Parameters

##### visible `System.Boolean`
A value indicating if the data point tooltip should be displayed.
            The tooltip is not visible by default.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Tooltip(true)
    %>


### Transitions(System.Boolean)
Enables or disabled animated transitions on initial load and refresh.


#### Parameters

##### transitions `System.Boolean`
A value indicating if transition animations should be played.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Transitions(false)
    %>



