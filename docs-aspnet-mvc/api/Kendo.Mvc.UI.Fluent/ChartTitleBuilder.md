---
title: ChartTitleBuilder
---

# Kendo.Mvc.UI.Fluent.ChartTitleBuilder
Defines the fluent interface for configuring the ChartTitle.




## Methods


### Text(System.String)
Sets the title text


#### Parameters

##### text `System.String`
The text title.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Text("Chart"))
        .Render();
    %>


### Font(System.String)
Sets the title font


#### Parameters

##### font `System.String`
The title font (CSS format).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Font("16px Arial,Helvetica,sans-serif"))
        .Render();
    %>


### Color(System.String)
Sets the title color


#### Parameters

##### color `System.String`
The title color (CSS format).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Color("#ff0000").Text("Title"))
        .Render();
    %>


### Background(System.String)
Sets the title background color


#### Parameters

##### background `System.String`
The background color.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Background("red"))
        .Render();
    %>


### Position(Kendo.Mvc.UI.ChartTitlePosition)
Sets the title position


#### Parameters

##### position [Kendo.Mvc.UI.ChartTitlePosition](/api/aspnet-mvc/Kendo.Mvc.UI/ChartTitlePosition)
The title position.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Position(ChartTitlePosition.Bottom))
        .Render();
    %>


### Align(Kendo.Mvc.UI.ChartTextAlignment)
Sets the title alignment


#### Parameters

##### align [Kendo.Mvc.UI.ChartTextAlignment](/api/aspnet-mvc/Kendo.Mvc.UI/ChartTextAlignment)
The title alignment.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Align(ChartTextAlignment.Left))
        .Render();
    %>


### Visible(System.Boolean)
Sets the title visibility


#### Parameters

##### visible `System.Boolean`
The title visibility.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Visible(false))
        .Render();
    %>


### Margin(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the title margin


#### Parameters

##### top `System.Int32`
The title top margin.

##### right `System.Int32`
The title right margin.

##### bottom `System.Int32`
The title bottom margin.

##### left `System.Int32`
The title left margin.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Margin(20))
        .Render();
    %>


### Margin(System.Int32)
Sets the title margin


#### Parameters

##### margin `System.Int32`
The title margin.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Margin(20))
        .Render();
    %>


### Padding(System.Int32,System.Int32,System.Int32,System.Int32)
Sets the title padding


#### Parameters

##### top `System.Int32`
The title top padding.

##### right `System.Int32`
The title right padding.

##### bottom `System.Int32`
The title bottom padding.

##### left `System.Int32`
The title left padding.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Padding(20))
        .Render();
    %>


### Padding(System.Int32)
Sets the title padding


#### Parameters

##### padding `System.Int32`
The title padding.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Padding(20))
        .Render();
    %>


### Border(System.Int32,System.String,Kendo.Mvc.UI.ChartDashType)
Sets the title border


#### Parameters

##### width `System.Int32`
The title border width.

##### color `System.String`
The title border color.

##### dashType [Kendo.Mvc.UI.ChartDashType](/api/aspnet-mvc/Kendo.Mvc.UI/ChartDashType)
The title dash type.




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Title(title => title.Border(1, "#000", ChartDashType.Dot))
        .Render();
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.ChartBorderBuilder\>)
Configures the plot area border


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ChartBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ChartBorderBuilder)>
The border configuration action






