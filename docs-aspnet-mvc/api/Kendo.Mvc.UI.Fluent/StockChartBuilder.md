---
title: StockChartBuilder
---

# Kendo.Mvc.UI.Fluent.StockChartBuilder
Defines the fluent interface for configuring the 1 component.




## Methods


### DateField(System.String)
Sets the field used by all date axes (including the navigator).


#### Parameters

##### dateField `System.String`
The date field.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .DateField("Date")
    %>


### AutoBind(System.Boolean)
Enables or disables automatic binding.


#### Parameters

##### autoBind `System.Boolean`
Gets or sets a value indicating if the chart
            should be data bound during initialization.
            The default value is true.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .DataSource(ds =>
    {
        ds.Ajax().Read(r => r.Action("SalesData", "Chart"));
    })
    .AutoBind(false)
    %>


### Navigator(System.Action\<Kendo.Mvc.UI.Fluent.ChartNavigatorBuilder\<T\>\>)
Configures the stock chart navigator.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartNavigatorBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartNavigatorBuilder)<T>>
The navigator configuration action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("StockChart")
    .Navigator(nav => nav
        .Series(series =>
        {
            series.Line(s => s.Volume);
        })
    )
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.ChartEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartEventBuilder)>
The client events configuration action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Events(events => events
        .OnLoad("onLoad")
    )
    %>


### Theme(System.String)
Sets the theme of the chart.


#### Parameters

##### theme `System.String`
The Chart theme.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
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
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .ChartArea(chartArea => chartArea.margin(20))
    %>


### PlotArea(System.Action\<Kendo.Mvc.UI.Fluent.PlotAreaBuilder\>)
Sets the Plot area.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.PlotAreaBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PlotAreaBuilder)>
The Plot area.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .PlotArea(plotArea => plotArea.margin(20))
    %>


### Title(System.String)
Sets the title of the chart.


#### Parameters

##### title `System.String`
The Chart title.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Title("Yearly sales")
    %>


### Title(System.Action\<Kendo.Mvc.UI.Fluent.ChartTitleBuilder\>)
Defines the title of the chart.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartTitleBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartTitleBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Title(title => title.Text("Yearly sales"))
    %>


### Legend(System.Boolean)
Sets the legend visibility.


#### Parameters

##### visible `System.Boolean`
A value indicating whether to show the legend.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Legend(false)
    %>


### Legend(System.Action\<Kendo.Mvc.UI.Fluent.ChartLegendBuilder\>)
Configures the legend.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartLegendBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartLegendBuilder)>
The configuration action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Legend(legend => legend.Visible(true).Position(ChartLegendPosition.Bottom))
    %>


### Series(System.Action\<Kendo.Mvc.UI.Fluent.ChartSeriesFactory\<T\>\>)
Defines the chart series.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartSeriesFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartSeriesFactory)<T>>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Series(series =>
    {
        series.Bar(s => s.SalesAmount);
    })
    %>


### SeriesDefaults(System.Action\<Kendo.Mvc.UI.Fluent.ChartSeriesDefaultsBuilder\<T\>\>)
Defines the options for all chart series of the specified type.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartSeriesDefaultsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartSeriesDefaultsBuilder)<T>>
The configurator.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .SeriesDefaults(series => series.Bar().Stack(true))
    %>


### Panes(System.Action\<Kendo.Mvc.UI.Fluent.ChartPanesFactory\>)
Defines the chart panes.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartPanesFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartPanesFactory)>
The add action.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .Panes(panes =>
    {
        panes.Add("volume");
    })
    %>


### AxisDefaults(System.Action\<Kendo.Mvc.UI.Fluent.ChartAxisDefaultsBuilder\<T\>\>)
Defines the options for all chart axes of the specified type.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartAxisDefaultsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartAxisDefaultsBuilder)<T>>
The configurator.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .AxisDefaults(axisDefaults => axisDefaults.MinorTickSize(5))
    %>


### CategoryAxis(System.Action\<Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder\<T\>\>)
Configures the category axis


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartCategoryAxisBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartCategoryAxisBuilder)<T>>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
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
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .ValueAxis(a => a.Numeric().TickSize(4))
    %>


### XAxis(System.Action\<Kendo.Mvc.UI.Fluent.ChartValueAxisFactory\<T\>\>)
Defines X-axis options for scatter charts


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartValueAxisFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartValueAxisFactory)<T>>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .XAxis(a => a.Numeric().Max(4))
    %>


### YAxis(System.Action\<Kendo.Mvc.UI.Fluent.ChartValueAxisFactory\<T\>\>)
Configures Y-axis options for scatter charts.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartValueAxisFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartValueAxisFactory)<T>>
The configurator




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("Chart")
    .YAxis(a => a.Numeric().Max(4))
    %>


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyAjaxDataSourceBuilder\<T\>\>)
Data Source configuration


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyAjaxDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyAjaxDataSourceBuilder)<T>>
Use the configurator to set different data binding options.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .DataSource(ds =>
    {
        ds.Ajax().Read(r => r.Action("SalesData", "Chart"));
    })
    %>


### SeriesColors(System.Collections.Generic.IEnumerable\<System.String\>)
Sets the series colors.


#### Parameters

##### colors `System.Collections.Generic.IEnumerable<System.String>`
A list of the series colors.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .SeriesColors(new string[] { "#f00", "#0f0", "#00f" })
    %>


### SeriesColors(System.String[])
Sets the series colors.


#### Parameters

##### colors `System.String[]`
The series colors.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .SeriesColors("#f00", "#0f0", "#00f")
    %>


### Tooltip(System.Action\<Kendo.Mvc.UI.Fluent.ChartTooltipBuilder\>)
Use it to configure the data point tooltip.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartTooltipBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartTooltipBuilder)>
Use the configurator to set data tooltip options.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
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
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Tooltip(true)
    %>


### Transitions(System.Boolean)
Enables or disabled animated transitions on initial load and refresh.


#### Parameters

##### transitions `System.Boolean`
A value indicating if transition animations should be played.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("Chart")
    .Transitions(false)
    %>


### Pdf(System.Action\<Kendo.Mvc.UI.Fluent.PDFSettingsBuilder\>)
Configures the PDF export settings.






